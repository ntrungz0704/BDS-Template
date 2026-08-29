import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requestPasswordReset, resetPassword } from '../controllers/password.controller';

const router = Router();

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.body.email || req.ip,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Bạn đã thử quá nhiều lần. Vui lòng đợi 15 phút.',
    },
  },
});

router.post('/forgot-password', resetLimiter, requestPasswordReset);
router.post('/reset-password', resetPassword);
router.all('/direct-reset-password', (_req, res) => res.status(410).json({
  success: false,
  error: {
    code: 'DIRECT_PASSWORD_RESET_DISABLED',
    message: 'Vui lòng sử dụng liên kết đặt lại mật khẩu một lần được gửi qua email.',
  },
}));

export default router;

