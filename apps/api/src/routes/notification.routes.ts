import { Router } from 'express';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  streamNotifications,
} from '../controllers/notification.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';

const router = Router();

// Yêu cầu xác thực đăng nhập
router.use(authMiddleware);

// Realtime SSE Stream
router.get('/stream', streamNotifications);

// REST APIs
router.get('/', getNotifications);
router.patch('/:id/read', csrfMiddleware, markNotificationAsRead);
router.post('/read-all', csrfMiddleware, markAllNotificationsAsRead);

export default router;
