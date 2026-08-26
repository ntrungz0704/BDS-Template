/**
 * CMS Builder Routes — Theme, Pages & Sections
 *
 * All routes require:
 *   1. JWT Auth (authMiddleware)
 *   2. TENANT_OWNER or EDITOR role
 *   3. Tenant access isolation (tenant can only access their own data)
 *   4. CSRF token for all state-changing requests
 *
 * Endpoint Groups:
 *   GET    /api/cms/builder/theme              → Get current tenant theme settings
 *   PUT    /api/cms/builder/theme              → Update theme settings
 *   GET    /api/cms/builder/pages              → List all pages for tenant
 *   POST   /api/cms/builder/pages              → Create new page
 *   GET    /api/cms/builder/pages/:slug        → Get page with sections
 *   PUT    /api/cms/builder/pages/:slug        → Update page metadata
 *   DELETE /api/cms/builder/pages/:slug        → Delete page (non-system only)
 *   GET    /api/cms/builder/pages/:slug/sections     → Get all sections for page
 *   POST   /api/cms/builder/pages/:slug/sections     → Create section
 *   PUT    /api/cms/builder/sections/:id       → Update section content/settings
 *   PATCH  /api/cms/builder/sections/:id/visibility  → Toggle section visibility
 *   PATCH  /api/cms/builder/sections/reorder   → Reorder sections
 *   DELETE /api/cms/builder/sections/:id       → Delete section
 *   GET    /api/cms/builder/versions/:entityType/:entityId → Version history
 *   POST   /api/cms/builder/versions/restore   → Restore a version
 *   GET    /api/cms/builder/domain             → Get domain settings
 *   PUT    /api/cms/builder/domain             → Update domain settings
 */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';
import { checkTrialOrSubscription, enforceSaveQuota } from '../middlewares/trial.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';
import { 
  getTheme,
  updateTheme,
  resetThemeToDefault,
  getPages,
  createPage,
  getPage,
  updatePage,
  deletePage,
  getPageSections,
  createSection,
  updateSection,
  toggleSectionVisibility,
  reorderSections,
  deleteSection,
  getVersionHistory,
  restoreVersion,
  getDomainSettings,
  updateDomainSettings,
  getSubscription,
  verifyDomainDns,
  provisionDomainSsl,
  checkTenantUpdate,
  previewTenantUpdate,
  applyTenantUpdate,
  rollbackTenantUpdate,
  getCompanyInfo,
  updateCompanyInfo,
  getSeoConfig,
  updateSeoConfig
 } from '../controllers/cms.builder.controller';

const router = Router();

// ── Authentication & Authorization ─────────────────────────────────────
router.use(authMiddleware);
router.use(requireRole(['TENANT_OWNER', 'EDITOR']));
router.use(checkTenantAccess);
router.use(checkTrialOrSubscription);
router.use(enforceSaveQuota);

// ── Theme Settings ──────────────────────────────────────────────────────
router.get('/theme', getTheme);
router.put('/theme', csrfMiddleware, updateTheme);
router.post('/theme/reset', csrfMiddleware, resetThemeToDefault);

// ── Pages ───────────────────────────────────────────────────────────────
router.get('/pages', getPages);
router.post('/pages', csrfMiddleware, createPage);
router.get('/pages/:slug', getPage);
router.put('/pages/:slug', csrfMiddleware, updatePage);
router.delete('/pages/:slug', csrfMiddleware, deletePage);

// ── Sections (scoped to page) ───────────────────────────────────────────
router.get('/pages/:slug/sections', getPageSections);
router.post('/pages/:slug/sections', csrfMiddleware, createSection);

// ── Sections (by ID) ────────────────────────────────────────────────────
router.put('/sections/:id', csrfMiddleware, updateSection);
router.patch('/sections/:id/visibility', csrfMiddleware, toggleSectionVisibility);
router.patch('/sections/reorder', csrfMiddleware, reorderSections);
router.delete('/sections/:id', csrfMiddleware, deleteSection);

// ── Version History ─────────────────────────────────────────────────────
router.get('/versions/:entityType/:entityId', getVersionHistory);
router.post('/versions/restore', csrfMiddleware, restoreVersion);

// ── SEO Settings ────────────────────────────────────────────────────────
router.get('/seo', getSeoConfig);
router.put('/seo', csrfMiddleware, updateSeoConfig);

// ── Domain Settings ─────────────────────────────────────────────────────
router.get('/domain', getDomainSettings);
router.put('/domain', csrfMiddleware, updateDomainSettings);
router.post('/domain/verify-dns', csrfMiddleware, verifyDomainDns);
router.post('/domain/provision-ssl', csrfMiddleware, provisionDomainSsl);

// ── Subscription Info ──────────────────────────────────────────
router.get('/subscription', getSubscription);

// ── Company Info (Cài đặt Thông tin công ty) ──────────────────────────────
router.get('/company-info', getCompanyInfo);
router.put('/company-info', csrfMiddleware, updateCompanyInfo);


// ── Tenant Self-Service Upgrade / Rollback ──────────────────────────
router.get('/upgrade/check', checkTenantUpdate);
router.get('/upgrade/preview', previewTenantUpdate);
router.post('/upgrade/apply', csrfMiddleware, applyTenantUpdate);
router.post('/upgrade/rollback', csrfMiddleware, rollbackTenantUpdate);

// ── Guard against template access ───────────────────────────────────────
router.all('/templates*', (req, res) => {
  res.status(403).json({
    success: false,
    message: 'Forbidden: CMS customers cannot access global templates endpoints.'
  });
});

export default router;
