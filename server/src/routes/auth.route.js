import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { signup, signin, logout, refreshToken } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', authMiddleware, logout);
router.post('/refresh', refreshToken);

export default router;