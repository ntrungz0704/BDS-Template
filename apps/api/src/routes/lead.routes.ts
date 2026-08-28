/**
 * Lead CRM Routes
 *
 * All routes require JWT auth + TENANT_OWNER/EDITOR/STAFF role.
 * Tenant isolation is enforced automatically by Prisma Extension.
 *
 * GET    /api/cms/leads                    → List leads (with filter/search/pagination)
 * GET    /api/cms/leads/kanban             → Kanban column counts
 * GET    /api/cms/leads/:id               → Lead detail + timeline
 * POST   /api/cms/leads                    → Create lead
 * PUT    /api/cms/leads/:id               → Update lead metadata
 * PATCH  /api/cms/leads/:id/status        → Change Kanban status
 * POST   /api/cms/leads/:id/notes         → Add note
 * POST   /api/cms/leads/:id/activities    → Log activity
 * DELETE /api/cms/leads/:id               → Soft delete
 */

import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';
import {
  listLeads,
  getKanbanSummary,
  getLeadById,
  createLead,
  updateLead,
  changeLeadStatus,
  addLeadNote,
  addLeadActivity,
  deleteLead,
} from '../controllers/lead.controller';

const router = Router();

// ── Auth & Authorization ────────────────────────────────────────────────────
router.use(authMiddleware);
router.use(requireRole(['TENANT_OWNER', 'EDITOR', 'STAFF']));
router.use(checkTenantAccess);

// ── Lead Operations ─────────────────────────────────────────────────────────
router.get('/', listLeads);
router.get('/kanban', getKanbanSummary);
router.get('/:id', getLeadById);
router.post('/', csrfMiddleware, createLead);
router.put('/:id', csrfMiddleware, updateLead);
router.patch('/:id/status', csrfMiddleware, changeLeadStatus);
router.post('/:id/notes', csrfMiddleware, addLeadNote);
router.post('/:id/activities', csrfMiddleware, addLeadActivity);
router.delete('/:id', csrfMiddleware, deleteLead);

export default router;

