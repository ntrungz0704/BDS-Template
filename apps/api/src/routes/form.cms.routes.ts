import { Router } from 'express';
import {
  getSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from '../controllers/form.cms.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';
import { subscriptionMiddleware } from '../middlewares/subscription.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

router.use(authMiddleware);
router.use(requireRole(['TENANT_OWNER', 'EDITOR', 'STAFF']));
router.use(checkTenantAccess);
router.use(subscriptionMiddleware);

router.get('/', getSubmissions);
router.put('/:id/status', csrfMiddleware, updateSubmissionStatus);
router.delete('/:id', csrfMiddleware, deleteSubmission);

export default router;

