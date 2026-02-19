import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { IUser } from '../models/User';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const generateTokens = (user: IUser): Tokens => {
  const payload = {
    sub: user._id,
    email: user.email,
    role: user.role
  };

  const accessToken = jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn
  });

  const refreshToken = jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.jwtAccessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};
