import { Router } from 'express';
import { sendVerificationEmail, verifyEmail } from '../controllers/email-verification.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/send-verification', authMiddleware, sendVerificationEmail);
router.get('/verify-email', verifyEmail);
router.post('/verify-email', verifyEmail);

export default router;
