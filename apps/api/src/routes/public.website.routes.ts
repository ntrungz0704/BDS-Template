import { Router } from 'express';
import {
  getCompanyInfo,
  getPublicProjects,
  getPublicProjectDetail,
  getPublicPosts,
  getPublicPostDetail,
  submitContactForm,
  getThemeSettings,
  getPageContent,
  resolveDomain,
  getTenantStatus,
} from '../controllers/public.website.controller';
import { resolveTenantSlug } from '../middlewares/tenant.middleware';
import { subscriptionMiddleware } from '../middlewares/subscription.middleware';
import rateLimit from 'express-rate-limit';

const router = Router();

// Giới hạn tần suất gửi form liên hệ (Chống spam - Chỉ áp dụng ở Production)
const contactLimiter = process.env.NODE_ENV === 'production'
  ? rateLimit({
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
    })
  : (req: any, res: any, next: any) => next();

// Internal endpoint — called by Next.js Middleware to resolve custom domains
// Protected by x-internal-token header check
router.get('/resolve-domain', resolveDomain);

// Phân giải slug subdomain động cho tất cả các API public
router.use('/:tenantSlug', resolveTenantSlug);
router.use('/:tenantSlug', subscriptionMiddleware);

router.get('/:tenantSlug/status', getTenantStatus);

router.get('/:tenantSlug/company-info', getCompanyInfo);
router.get('/:tenantSlug/projects', getPublicProjects);
router.get('/:tenantSlug/projects/:slug', getPublicProjectDetail);
router.get('/:tenantSlug/posts', getPublicPosts);
router.get('/:tenantSlug/posts/:slug', getPublicPostDetail);

// Theme settings & Page content (for runtime rendering)
router.get('/:tenantSlug/theme', getThemeSettings);
router.get('/:tenantSlug/pages/:pageSlug', getPageContent);

// POST gửi form đăng ký tư vấn kèm rate limit
router.post('/:tenantSlug/contact', contactLimiter, submitContactForm);

export default router;

