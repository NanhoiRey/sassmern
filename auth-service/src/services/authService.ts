import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User';

export const createUser = async (email: string, password: string): Promise<IUser> => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('Email ya registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  return user.save();
};

export const validateUser = async (email: string, password: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};
