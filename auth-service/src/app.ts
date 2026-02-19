import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { env } from './config/env';
import { connectDB } from './config/db';
import { authRouter } from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use('/auth', authRouter);

connectDB();

export { app };
