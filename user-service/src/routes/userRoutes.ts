

import { Router } from 'express';
import { getMe, updateMe, getUserById, createUserSync } from '../controllers/userController';
import { requireAuth } from '../middleware/requireAuth';

console.log("createUserSync:", createUserSync);

export const userRouter = Router();

userRouter.post('/sync', createUserSync);

userRouter.get('/me', requireAuth, getMe);
userRouter.put('/me', requireAuth, updateMe);
userRouter.get('/:id', requireAuth, getUserById);
