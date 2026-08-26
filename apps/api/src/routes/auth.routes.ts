import { Router } from 'express';
import { login, register, refresh, logout, getMe, getUserTenants, switchTenant, updateProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import rateLimit from 'express-rate-limit';

import passwordRoutes from './password.routes';
import emailVerificationRoutes from './email-verification.routes';

// Rate limiters for sensitive auth endpoints
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 login attempts per 15 min per IP
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Qua nhieu lan thu. Vui long doi 15 phut.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Max 5 register attempts per 15 min per IP
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Qua nhieu lan dang ky. Vui long doi 15 phut.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

// Các routes không yêu cầu xác thực
router.use('/', passwordRoutes);
router.use('/', emailVerificationRoutes);

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);
router.post('/refresh', refresh);

// Routes yêu cầu người dùng phải đăng nhập trước
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getMe);
router.put('/profile', authMiddleware, updateProfile);
router.get('/tenants', authMiddleware, getUserTenants);
router.post('/switch-tenant', authMiddleware, switchTenant);

export default router;
