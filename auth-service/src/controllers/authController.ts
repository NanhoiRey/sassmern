import { Request, Response } from 'express';
import { createUser, validateUser } from '../services/authService';
import { generateTokens, verifyRefreshToken } from '../services/tokenService';
import { env } from '../config/env';
import jwt from 'jsonwebtoken';
import axios from 'axios';



const setRefreshTokenCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: false, // en producción debe ser true
    sameSite: 'lax',
    domain: env.cookieDomain,
    path: '/auth/refresh'
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await createUser(email, password);
    

    await axios.post('http://localhost:4002/users/sync', {
      id: user._id,
      email: user.email,
      role: user.role
    });

    const { accessToken, refreshToken } = generateTokens(user);

    setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
 } catch (error: any) { 
    console.error("ERROR EN REGISTER:", error); 
    return res.status(400).json({ message: error.message || 'Error en registro' }); }
};




export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error en login' });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: 'No hay refresh token' });
    }

    const payload: any = verifyRefreshToken(token);

    const newAccessToken = jwt.sign(
      {
        sub: payload.sub,
        email: payload.email,
        role: payload.role
      },
      env.jwtAccessSecret,
      { expiresIn: env.jwtAccessExpiresIn }
    );

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Refresh token inválido o expirado' });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    domain: env.cookieDomain,
    path: '/auth/refresh'
  });

  return res.status(200).json({ message: 'Logout correcto' });
};
