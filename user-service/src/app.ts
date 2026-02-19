import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { userRouter } from './routes/userRoutes';

export const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/users', userRouter);
