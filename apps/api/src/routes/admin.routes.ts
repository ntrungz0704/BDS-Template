import { Router } from 'express';
import { 
  getDashboardStats, 
  getOrders, 
  approveOrder, 
  rejectOrder,
  getTenants,
  createTenantManually,
  updateTenantStatus,
  getUsers,
  updateUserStatus,
  getTemplates,
  updateTemplateStatus,
  getTemplateDraft,
  updateTemplateDraft,
  publishTemplateDraft,
  getTemplateVersions,
  archiveTemplateVersion,
  rollbackTemplateVersion,
  compareTemplateVersions,
  migrateTenantsToLatest,
  repairUserTenants,
} from '../controllers/admin.controller';
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

// Các API quản trị Tenants, Users, Templates mới
router.get('/tenants', getTenants);
router.post('/tenants', csrfMiddleware, createTenantManually);
router.put('/tenants/:id/status', csrfMiddleware, updateTenantStatus);

router.get('/users', getUsers);
router.put('/users/:id/status', csrfMiddleware, updateUserStatus);

router.get('/templates', getTemplates);
router.put('/templates/:id/status', csrfMiddleware, updateTemplateStatus);

// Template Studio Endpoints
router.get('/templates/:id/draft', getTemplateDraft);
router.put('/templates/:id/draft', csrfMiddleware, updateTemplateDraft);
router.post('/templates/:id/publish', csrfMiddleware, publishTemplateDraft);

// Template Version Manager Endpoints
router.get('/templates/:id/versions', getTemplateVersions);
router.get('/templates/:id/versions/compare', compareTemplateVersions);
router.put('/templates/:id/versions/:versionId/archive', csrfMiddleware, archiveTemplateVersion);
router.post('/templates/:id/versions/:versionId/rollback', csrfMiddleware, rollbackTemplateVersion);
router.post('/templates/:id/migrate-tenants', csrfMiddleware, migrateTenantsToLatest);

// ── Maintenance / Dev Tools ─────────────────────────────────────────────────
// Repair: Fix user roles & tenantId for users with completed orders
router.post('/repair/user-tenants', repairUserTenants);

export default router;
