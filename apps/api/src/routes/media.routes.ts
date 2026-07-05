import { Router } from 'express';
import { getCloudinarySignature, registerMedia, deleteMedia } from '../controllers/media.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

// Tất cả APIs Media đều yêu cầu đăng nhập và cách ly Tenant chéo
router.use(authMiddleware);
router.use(requireRole(['TENANT_ADMIN', 'TENANT_EDITOR']));
router.use(checkTenantAccess);

router.get('/signature', getCloudinarySignature);

// API thay đổi dữ liệu yêu cầu chống CSRF (Double Submit Cookie)
router.post('/', csrfMiddleware, registerMedia);
router.delete('/:id', csrfMiddleware, deleteMedia);

export default router;
