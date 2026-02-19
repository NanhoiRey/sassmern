import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB conectado (Users Service)');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1);
  }
};
