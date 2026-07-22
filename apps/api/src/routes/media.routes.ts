import { Router } from 'express';
import multer from 'multer';
import { uploadMedia, getMedia, deleteMedia, createFolder } from '../modules/media/media.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';
import { subscriptionMiddleware } from '../middlewares/subscription.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() }); // We use memory storage to process via Sharp before saving

router.use(authMiddleware);
router.use(requireRole(['TENANT_OWNER', 'EDITOR']));
router.use(checkTenantAccess);
router.use(subscriptionMiddleware);

router.post('/upload', upload.single('file'), uploadMedia);
router.get('/', getMedia);
router.delete('/:id', deleteMedia);
router.post('/folder', createFolder);

export default router;
