import { Router } from 'express';
import { login, refresh, logout, getMe, getUserTenants, switchTenant, updateProfile } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import rateLimit from 'express-rate-limit';

import passwordRoutes from './password.routes';
import emailVerificationRoutes from './email-verification.routes';
import { changePassword } from '../controllers/password.controller';

// Rate limiters for sensitive auth endpoints (skip in local development)
const isDev = process.env.NODE_ENV !== 'production';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 10000 : 30,
  skip: () => isDev,
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Quá nhiều lần thử. Vui lòng đợi 15 phút.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

// Các routes không yêu cầu xác thực
router.use('/', passwordRoutes);
router.use('/', emailVerificationRoutes);

router.all('/register', (_req, res) => res.status(410).json({
  success: false,
  error: {
    code: 'PUBLIC_REGISTRATION_DISABLED',
    message: 'Tài khoản chỉ được tạo bởi Super Admin sau khi xác minh nhu cầu khách hàng.',
  },
}));
router.post('/login', loginLimiter, login);
router.post('/refresh', refresh);

// Routes yêu cầu người dùng phải đăng nhập trước
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getMe);
router.put('/profile', authMiddleware, updateProfile);
router.post('/change-password', authMiddleware, changePassword);
router.get('/tenants', authMiddleware, getUserTenants);
router.post('/switch-tenant', authMiddleware, switchTenant);

export default router;

