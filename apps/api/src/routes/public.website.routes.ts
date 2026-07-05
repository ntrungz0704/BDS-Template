import { Router } from 'express';
import {
  getCompanyInfo,
  getPublicProjects,
  getPublicProjectDetail,
  getPublicPosts,
  getPublicPostDetail,
  submitContactForm,
} from '../controllers/public.website.controller';
import { resolveTenantSlug } from '../middlewares/tenant.middleware';
import rateLimit from 'express-rate-limit';

const router = Router();

// Giới hạn tần suất gửi form liên hệ (chống spam từ robot)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 5, // Tối đa 5 lần gửi mỗi IP
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_SUBMISSIONS',
      message: 'Bạn đã gửi quá nhiều yêu cầu tư vấn. Vui lòng thử lại sau 1 giờ.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Phân giải slug subdomain động cho tất cả các API public
router.use('/:tenantSlug', resolveTenantSlug);

router.get('/:tenantSlug/company-info', getCompanyInfo);
router.get('/:tenantSlug/projects', getPublicProjects);
router.get('/:tenantSlug/projects/:slug', getPublicProjectDetail);
router.get('/:tenantSlug/posts', getPublicPosts);
router.get('/:tenantSlug/posts/:slug', getPublicPostDetail);

// POST gửi form đăng ký tư vấn kèm rate limit
router.post('/:tenantSlug/contact', contactLimiter, submitContactForm);

export default router;
