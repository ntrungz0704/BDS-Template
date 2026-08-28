import { Router } from 'express';
import { acceptInvite, completeInviteRegistration, inviteMember, listMembers, removeMember, resendInvite, updateMemberRole } from '../controllers/membership.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';
import { subscriptionMiddleware } from '../middlewares/subscription.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

// Public routes (token-based)
router.post('/accept-invite', acceptInvite);
router.post('/complete-registration', completeInviteRegistration);

// Protected routes (need auth + tenant access)
router.use(authMiddleware);
router.use(requireRole(['TENANT_OWNER', 'EDITOR']));
router.use(checkTenantAccess);
router.use(subscriptionMiddleware);
router.use(csrfMiddleware);

router.get('/', listMembers);
router.post('/invite', requireRole(['TENANT_OWNER']), inviteMember);
router.put('/:id/role', requireRole(['TENANT_OWNER']), updateMemberRole);
router.delete('/:id', requireRole(['TENANT_OWNER']), removeMember);
router.post('/:id/resend', requireRole(['TENANT_OWNER']), resendInvite);

export default router;

