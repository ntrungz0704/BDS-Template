import { Router } from 'express';
import {
  getTemplates,
  getTemplateDetail,
  checkSubdomain,
  createOrder,
  uploadPaymentProof,
} from '../controllers/marketplace.controller';

const router = Router();

// Routes công khai cho Marketplace
router.get('/templates', getTemplates);
router.get('/templates/:slug', getTemplateDetail);
router.get('/check-subdomain', checkSubdomain);

// API gửi đơn hàng
router.post('/orders', createOrder);

// API upload ảnh bill thanh toán
router.post('/orders/:id/payment', uploadPaymentProof);

export default router;
