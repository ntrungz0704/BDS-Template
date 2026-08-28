import { Router } from 'express';
import {
  getPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.cms.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';
import { subscriptionMiddleware } from '../middlewares/subscription.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

// Middleware xác thực bảo mật & cách ly tenant chéo
router.use(authMiddleware);
router.use(requireRole(['TENANT_OWNER', 'EDITOR']));
router.use(checkTenantAccess);
router.use(subscriptionMiddleware);

router.get('/', getPosts);
router.get('/:id', getPostDetail);

// Các API thay đổi dữ liệu cần kiểm tra chống CSRF Token (Double Submit Cookie)
router.post('/', csrfMiddleware, createPost);
router.put('/:id', csrfMiddleware, updatePost);
router.delete('/:id', csrfMiddleware, deletePost);

export default router;

