import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  role: string;
  name?: string;
  avatar?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
    name: { type: String },
    avatar: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
