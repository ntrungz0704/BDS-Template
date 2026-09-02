import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { logger } from '../index';

// Map quản lý các kết nối SSE đang mở theo userId
// userId -> Set<Response> (hỗ trợ nhiều tab của cùng 1 user)
const sseClients = new Map<string, Set<Response>>();

/**
 * Gửi thông báo theo thời gian thực tới user qua Server-Sent Events
 */
export async function sendRealtimeNotification(
  userId: string,
  data: {
    type?: string;
    title: string;
    content: string;
    actionUrl?: string;
    entityType?: string;
    entityId?: string;
  }
) {
  try {
    // 1. Lưu thông báo vào Database
    const notification = await prisma.notification.create({
      data: {
        userId,
        type: data.type || 'SYSTEM',
        title: data.title,
        content: data.content,
        actionUrl: data.actionUrl || null,
        entityType: data.entityType || null,
        entityId: data.entityId || null,
        isRead: false,
      },
    });

    // 2. Nếu user có tab đang mở SSE, push ngay lập tức
    const clients = sseClients.get(userId);
    if (clients && clients.size > 0) {
      const payload = JSON.stringify({
        event: 'notification',
        data: notification,
      });

      for (const client of clients) {
        try {
          client.write(`event: notification\ndata: ${payload}\n\n`);
        } catch {
          clients.delete(client);
        }
      }
    }

    return notification;
  } catch (err: any) {
    logger.warn(`[Notification] Không thể gửi thông báo cho user ${userId}: ${err.message}`);
    return null;
  }
}

/**
 * GET /api/notifications
 * Lấy danh sách thông báo của user đang đăng nhập
 */
export async function getNotifications(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Yêu cầu đăng nhập.' } });
    }

    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, isRead: false } }),
    ]);

    return res.json({
      success: true,
      data: {
        notifications,
        unreadCount,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/notifications/:id/read
 * Đánh dấu 1 thông báo là đã đọc
 */
export async function markNotificationAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Yêu cầu đăng nhập.' } });
    }

    const notification = await prisma.notification.findFirst({
      where: { id, userId },
    });

    if (!notification) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Thông báo không tồn tại.' } });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true, readAt: new Date() },
    });

    return res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/notifications/read-all
 * Đánh dấu tất cả thông báo của user là đã đọc
 */
export async function markAllNotificationsAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Yêu cầu đăng nhập.' } });
    }

    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });

    return res.json({ success: true, message: 'Đã đánh dấu tất cả thông báo là đã đọc.' });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/notifications/stream
 * SSE Realtime Notification Stream
 */
export function streamNotifications(req: Request, res: Response) {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).end();
    return;
  }

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no', // Disable buffering for Nginx
  });

  // Gửi sự kiện ping ban đầu để xác nhận kết nối
  res.write(`event: connected\ndata: ${JSON.stringify({ status: 'connected', timestamp: Date.now() })}\n\n`);

  // Lưu connection vào client map
  if (!sseClients.has(userId)) {
    sseClients.set(userId, new Set());
  }
  sseClients.get(userId)!.add(res);

  // Heartbeat ping mỗi 25s để giữ kết nối không bị timeout bởi proxy / CDN
  const heartbeat = setInterval(() => {
    try {
      res.write(': heartbeat\n\n');
    } catch {
      clearInterval(heartbeat);
    }
  }, 25000);

  // Clean up khi client đóng tab/ngắt kết nối
  req.on('close', () => {
    clearInterval(heartbeat);
    const userConnections = sseClients.get(userId);
    if (userConnections) {
      userConnections.delete(res);
      if (userConnections.size === 0) {
        sseClients.delete(userId);
      }
    }
  });
}
