import { Router } from 'express';
import { getDashboardStats, getOrders, approveOrder, rejectOrder } from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

// Toàn bộ các API Admin bắt buộc phải là Super Admin
router.use(authMiddleware);
router.use(requireRole(['SUPER_ADMIN']));

router.get('/stats', getDashboardStats);
router.get('/orders', getOrders);

// Phê duyệt và từ chối đơn hàng yêu cầu chống CSRF
router.put('/orders/:id/approve', csrfMiddleware, approveOrder);
router.put('/orders/:id/reject', csrfMiddleware, rejectOrder);

export default router;
