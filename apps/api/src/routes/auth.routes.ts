import { Router } from 'express';
import { login, register, refresh, logout } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Các routes không yêu cầu xác thực
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Routes yêu cầu người dùng phải đăng nhập trước
router.post('/logout', authMiddleware, logout);

export default router;
