/**
 * Tenant Onboarding Routes
 *
 * These routes handle the first-time setup flow for new tenants.
 * All routes require JWT authentication (the tenant must be logged in).
 *
 * POST /api/tenants/onboard       → Complete onboarding
 * GET  /api/tenants/onboard/status → Check onboarding status
 */

import { Router } from 'express';
import { completeTenantOnboarding, getOnboardingStatus } from '../controllers/tenant.onboarding.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';

const router = Router();

// All routes require a valid JWT + tenant context
router.use(authMiddleware);
router.use(checkTenantAccess);

router.post('/onboard', completeTenantOnboarding);
router.get('/onboard/status', getOnboardingStatus);

export default router;

