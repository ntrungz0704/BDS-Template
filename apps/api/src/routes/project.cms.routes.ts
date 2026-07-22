import { Router } from 'express';
import {
  getProjects,
  getProjectDetail,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.cms.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { checkTenantAccess } from '../middlewares/tenant.middleware';
import { subscriptionMiddleware } from '../middlewares/subscription.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

// Toàn bộ các routes CMS yêu cầu đăng nhập và có quyền TENANT_ADMIN hoặc TENANT_EDITOR
router.use(authMiddleware);
router.use(requireRole(['TENANT_OWNER', 'EDITOR']));
router.use(checkTenantAccess); // Middleware cách ly tenant chéo
router.use(subscriptionMiddleware); // Middleware kiểm soát subscription gói cước

router.get('/', getProjects);
router.get('/:id', getProjectDetail);

// Các API thay đổi dữ liệu yêu cầu kiểm tra chống CSRF Token (Double Submit Cookie)
router.post('/', csrfMiddleware, createProject);
router.put('/:id', csrfMiddleware, updateProject);
router.delete('/:id', csrfMiddleware, deleteProject);

export default router;
