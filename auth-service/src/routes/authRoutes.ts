import { Router } from 'express';
import { register, login, refresh, logout } from '../controllers/authController';
import { requireAuth } from '../middleware/requireAuth';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);




authRouter.get('/me', requireAuth, (req, res) => {
  res.json({
    message: 'Ruta protegida OK',
    user: req.user
  });
});
