import { Router } from 'express';
import {
  getTemplates,
  getTemplateDetail,
  checkSubdomain,
  createOrder,
  uploadPaymentProof,
  getMarketplaceStats,
  downloadTemplateSource,
  quickApproveOrder,
  handleSepayWebhook,
  getOrderStatus,
  simulatePayment,
  getMyOrders,
} from '../controllers/marketplace.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

// Routes công khai cho Marketplace
router.get('/templates', getTemplates);
router.get('/templates/:slug', getTemplateDetail);
router.get('/check-subdomain', checkSubdomain);
router.get('/stats', getMarketplaceStats);

// API gửi đơn hàng (cho phép guest checkout — không bắt buộc auth)
router.post('/orders', createOrder);

// API lịch sử đơn hàng của khách (yêu cầu đăng nhập)
router.get('/orders/my-orders', authMiddleware, getMyOrders);

// API kiểm tra trạng thái đơn hàng realtime (polling)
router.get('/orders/:orderNumber/status', getOrderStatus);

// Webhook tự động nhận thông báo tiền về từ SePay (Công khai cho SePay server gọi)
router.post('/webhook/sepay', handleSepayWebhook);

// Dev Sandbox: Giả lập thanh toán thành công ngay lập tức để test
router.post('/orders/:orderNumber/simulate-payment', simulatePayment);

// API upload ảnh bill thanh toán thủ công — Yêu cầu đăng nhập + kiểm tra chủ sở hữu đơn hàng
router.post('/orders/:id/payment', authMiddleware, uploadPaymentProof);

// API tải mã nguồn — Yêu cầu đăng nhập + đơn hàng đã thanh toán (COMPLETED, type=BUY)
router.get('/templates/:slug/download', authMiddleware, downloadTemplateSource);

// Route duyệt nhanh đơn hàng (Yêu cầu xác thực + Role guard + CSRF)
router.post(
  '/orders/:id/quick-approve',
  authMiddleware,
  requireRole(['SUPER_ADMIN', 'ADMIN']),
  csrfMiddleware,
  quickApproveOrder
);

export default router;

