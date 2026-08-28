/**
 * Source Code Download Routes (V2)
 * 
 * Secure endpoints for BUY_SOURCE customers to download purchased template source code.
 * - Requires authentication
 * - Verifies order ownership and COMPLETED status
 * - Creates audit log for every download
 */

import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { csrfMiddleware } from '../middlewares/csrf.middleware';
import { prisma } from '@repo/database';
import { logger } from '../index';
import path from 'path';
import fs from 'fs';

const router = Router();

// All source routes require authentication
router.use(authMiddleware);

/**
 * GET /api/source/:orderId/info
 * Get source download information for a completed BUY_SOURCE order
 */
router.get('/:orderId/info', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.userId || (req as any).user?.id;
    const userRole = req.user?.role;

    // Find the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            slug: true,
            priceBuySource: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Đơn hàng không tồn tại.' },
      });
    }

    // Authorization: SUPER_ADMIN can access any; customers only their own
    if (userRole !== 'SUPER_ADMIN') {
      if (order.userId !== userId) {
        return res.status(403).json({
          success: false,
          error: { code: 'FORBIDDEN', message: 'Bạn không có quyền truy cập đơn hàng này.' },
        });
      }
    }

    // Check order type and status
    if (order.type !== 'BUY_SOURCE') {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ORDER_TYPE', message: 'Đơn hàng này không phải loại mua source code.' },
      });
    }

    if (order.status !== 'COMPLETED') {
      return res.status(403).json({
        success: false,
        error: { 
          code: 'ORDER_NOT_COMPLETED', 
          message: 'Đơn hàng chưa được thanh toán và xác nhận. Vui lòng liên hệ Admin.',
        },
      });
    }

    return res.json({
      success: true,
      data: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        templateName: order.template.name,
        templateSlug: order.template.slug,
        purchaseDate: order.paidAt || order.updatedAt,
        downloadAvailable: true,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/source/:orderId/download
 * Download the source code package for a completed BUY_SOURCE order
 * Creates an audit log entry for every download
 */
router.get('/:orderId/download', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.userId || (req as any).user?.id;
    const userRole = req.user?.role;

    // Find the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Đơn hàng không tồn tại.' },
      });
    }

    // Authorization: SUPER_ADMIN can access any; customers only their own
    if (userRole !== 'SUPER_ADMIN') {
      if (order.userId !== userId) {
        logger.warn(`[Source] IDOR attempt: user ${userId} tried to download order ${orderId}`);
        return res.status(403).json({
          success: false,
          error: { code: 'FORBIDDEN', message: 'Bạn không có quyền truy cập đơn hàng này.' },
        });
      }
    }

    // Check order type and status
    if (order.type !== 'BUY_SOURCE') {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ORDER_TYPE', message: 'Đơn hàng này không phải loại mua source code.' },
      });
    }

    if (order.status !== 'COMPLETED') {
      return res.status(403).json({
        success: false,
        error: { 
          code: 'ORDER_NOT_COMPLETED', 
          message: 'Đơn hàng chưa được thanh toán và xác nhận.',
        },
      });
    }

    // Check source file exists
    // Source packages are stored at: /uploads/source-packages/{template-slug}.zip
    const sourceDir = path.resolve(process.cwd(), 'uploads', 'source-packages');
    const sourceFile = path.join(sourceDir, `${order.template.slug}.zip`);

    if (!fs.existsSync(sourceFile)) {
      logger.error(`[Source] Source file not found: ${sourceFile}`);
      return res.status(404).json({
        success: false,
        error: { 
          code: 'SOURCE_NOT_AVAILABLE', 
          message: 'Gói source code chưa sẵn sàng. Vui lòng liên hệ Admin.',
        },
      });
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId,
        tenantId: order.tenantId,
        action: 'SOURCE_DOWNLOAD',
        entityType: 'Order',
        entityId: orderId,
        newValues: {
          templateSlug: order.template.slug,
          orderNumber: order.orderNumber,
          downloadedAt: new Date().toISOString(),
        },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      },
    });

    logger.info(`[Source] Download initiated: order=${orderId}, user=${userId}, template=${order.template.slug}`);

    // Stream the file
    const filename = `${order.template.name}-source.zip`;
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/zip');

    const stream = fs.createReadStream(sourceFile);
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
});

export default router;

