console.log(">>> userController.ts loaded");

import { Request, Response } from 'express';
import { User } from '../models/User';

export const getMe = async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id);
  res.json(user);
};

export const updateMe = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(
    req.user!.id,
    req.body,
    { new: true }
  );
  res.json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};


export const createUserSync = async (req: Request, res: Response) => {
  console.log("SYNC BODY:", req.body);
  const { id, email, role } = req.body;

  let user = await User.findById(id);

  if (!user) {
    user = await User.create({
      _id: id,
      email,
      role
    });
  }

  res.json(user);
};
