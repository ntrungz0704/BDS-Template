import { Router } from 'express';
import {
  getTemplates,
  getTemplateDetail,
  checkSubdomain,
  createOrder,
  createContactSubmission,
  uploadPaymentProof,
  getMarketplaceStats,
  quickApproveOrder,
  handleSepayWebhook,
  getOrderStatus,
  simulatePayment,
  getMyOrders,
  downloadTemplateSource,
  requestExportPackage,
  getExportPackageStatus,
  downloadExportByToken,
} from '../controllers/marketplace.controller';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

// Routes công khai cho Marketplace
router.get('/templates', getTemplates);
router.get('/templates/:slug', getTemplateDetail);
router.get('/templates/:slug/download', authMiddleware, downloadTemplateSource);
router.get('/check-subdomain', checkSubdomain);
router.get('/stats', getMarketplaceStats);

// Checkout hỗ trợ cả khách vãng lai và tài khoản đã đăng nhập
router.post('/orders', optionalAuthMiddleware, createOrder);
router.post('/contact', createContactSubmission);

// API lịch sử đơn hàng của khách (yêu cầu đăng nhập)
router.get('/orders/my-orders', authMiddleware, getMyOrders);

// API kiểm tra trạng thái đơn hàng realtime (polling)
router.get('/orders/:orderNumber/status', optionalAuthMiddleware, getOrderStatus);

// Webhook SePay. Controller bắt buộc kiểm tra webhook secret trong production.
router.post('/webhook/sepay', handleSepayWebhook);

// Dev Sandbox: controller tự chặn hoàn toàn khi chạy production.
router.post('/orders/:orderNumber/simulate-payment', simulatePayment);

// API upload ảnh bill thanh toán thủ công — Yêu cầu đăng nhập + kiểm tra chủ sở hữu đơn hàng
router.post('/orders/:id/payment', authMiddleware, uploadPaymentProof);

// Route duyệt nhanh đơn hàng (Yêu cầu xác thực + Role guard + CSRF)
router.post(
  '/orders/:id/quick-approve',
  authMiddleware,
  requireRole(['SUPER_ADMIN']),
  csrfMiddleware,
  quickApproveOrder
);

// Single-Tenant Export Engine (Dành riêng cho đơn hàng Mua Đứt)
router.post('/orders/:orderNumber/request-export', authMiddleware, requestExportPackage);
router.get('/orders/:orderNumber/export-status', authMiddleware, getExportPackageStatus);
router.get('/exports/download/:token', optionalAuthMiddleware, downloadExportByToken);

export default router;
