import { Router } from 'express';
import {
  getTemplates,
  getTemplateDetail,
  checkSubdomain,
  createOrder,
  uploadPaymentProof,
  getMarketplaceStats,
  downloadTemplateSource,
} from '../controllers/marketplace.controller';
import { approveOrder } from '../controllers/admin.controller';

const router = Router();

// Routes công khai cho Marketplace
router.get('/templates', getTemplates);
router.get('/templates/:slug', getTemplateDetail);
router.get('/templates/:slug/download', downloadTemplateSource);
router.get('/check-subdomain', checkSubdomain);
router.get('/stats', getMarketplaceStats);

// API gửi đơn hàng
router.post('/orders', createOrder);

// API upload ảnh bill thanh toán
router.post('/orders/:id/payment', uploadPaymentProof);

// API Duyệt nhanh đơn hàng phục vụ testing
router.post('/orders/:id/quick-approve', approveOrder);

export default router;
