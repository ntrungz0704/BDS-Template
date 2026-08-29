import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

// Customer-facing and automatic source delivery is disabled. Phase 9 will add
// an audited, Admin-only packaging and expiring-delivery workflow.
router.use(authMiddleware);
router.use(requireRole(['SUPER_ADMIN']));
router.all('*', (_req, res) => res.status(410).json({
  success: false,
  error: {
    code: 'SOURCE_DELIVERY_DISABLED',
    message: 'Bàn giao source chỉ được thực hiện thủ công bởi Super Admin.',
  },
}));

export default router;
