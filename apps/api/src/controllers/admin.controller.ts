import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { logger } from '../index';
import bcrypt from 'bcrypt';

export async function getDashboardStats(req: Request, res: Response, next: NextFunction) {
  try {
    const totalTenants = await prisma.tenant.count({ where: { deletedAt: null } });
    const totalOrders = await prisma.order.count();
    
    // Tính tổng doanh thu từ các đơn hàng đã thành công (COMPLETED)
    const revenueSum = await prisma.order.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    });

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: {
        totalTenants,
        totalOrders,
        totalRevenue: revenueSum._sum.amount || 0,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as any;
    const skip = (page - 1) * limit;

    const where: any = {
      ...(status && { status }),
    };

    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: orders,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function approveOrder(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    // 1. Kiểm tra đơn hàng tồn tại
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Đơn hàng duyệt không tồn tại.',
        },
      });
    }

    if (order.status !== 'WAITING_CONFIRM') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ORDER_NOT_WAITING',
          message: 'Đơn hàng này không còn ở trạng thái chờ xác nhận thanh toán.',
        },
      });
    }

    // 2. Nếu là thuê (RENT), kiểm tra xem Subdomain đã bị ai đăng ký trước đó chưa
    if (order.type === 'RENT' && order.subdomain) {
      const existingTenant = await prisma.tenant.findUnique({
        where: { slug: order.subdomain },
      });

      // GIẢI QUYẾT SUBDOMAIN CONFLICT (ĐIỂM 4 BẢN VÁ): Chuyển đơn sang chờ xử lý đổi slug
      if (existingTenant) {
        const conflictOrder = await prisma.order.update({
          where: { id, version: order.version },
          data: {
            status: 'PENDING_SUBDOMAIN_CONFLICT',
            adminNotes: `Duyệt thất bại do trùng lặp subdomain [${order.subdomain}]. Chờ liên hệ khách hàng đổi tên.`,
            version: { increment: 1 },
          },
        });

        logger.warn(`Duyệt đơn hàng ${order.orderNumber} thất bại: Subdomain conflict [${order.subdomain}]. Đơn hàng chuyển sang PENDING_SUBDOMAIN_CONFLICT.`);

        return res.status(200).json({
          success: true,
          data: conflictOrder,
          meta: {
            conflict: true,
            message: 'Phát hiện trùng lặp subdomain. Đơn hàng chuyển sang hàng chờ liên hệ thay đổi.',
          },
        });
      }
    }

    // 3. THỰC HIỆN KÍCH HOẠT DỊCH VỤ TRONG TRANSACTION BÊ TÔNG
    const result = await prisma.$transaction(async (tx) => {
      // Cập nhật trạng thái đơn hàng thành COMPLETED
      const completedOrder = await tx.order.update({
        where: { id, version: order.version },
        data: {
          status: 'COMPLETED',
          paidAt: new Date(),
          version: { increment: 1 },
        },
      });

      let tenantId: string | null = null;

      if (order.type === 'RENT' && order.subdomain) {
        // Tạo User Owner cho Tenant Admin
        const tempPassword = 'UserAdmin123!';
        const passwordHash = await bcrypt.hash(tempPassword, 10);
        
        const tenantOwner = await tx.user.create({
          data: {
            email: order.email,
            passwordHash,
            fullName: order.fullName,
            role: 'TENANT_ADMIN',
            isActive: true,
          },
        });

        // Tạo Tenant
        const tenant = await tx.tenant.create({
          data: {
            name: order.fullName + ' Office',
            slug: order.subdomain as string,
            templateId: order.templateId,
            status: 'ACTIVE',
          },
        });

        tenantId = tenant.id;

        // Gắn ngược tenantId vào user owner
        await tx.user.update({
          where: { id: tenantOwner.id },
          data: { tenantId: tenant.id },
        });

        // Tạo CompanyInfo mặc định
        await tx.companyInfo.create({
          data: {
            tenantId: tenant.id,
            name: tenant.name,
            email: order.email,
            phone: order.phone,
          },
        });

        // Tạo SeoConfig mặc định
        await tx.seoConfig.create({
          data: {
            tenantId: tenant.id,
            metaTitle: tenant.name,
            enableSitemap: true,
          },
        });

        // Tạo Menu mặc định cho Website Tenant
        const menu = await tx.menu.create({
          data: {
            tenantId: tenant.id,
            name: 'Menu Chính',
            location: 'header',
            isActive: true,
          },
        });

        await tx.menuItem.create({
          data: {
            menuId: menu.id,
            label: 'Trang chủ',
            url: '/',
            sortOrder: 1,
          },
        });

        // Tạo Subscription thời hạn 30 ngày mặc định
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);

        await tx.subscription.create({
          data: {
            tenantId: tenant.id,
            orderId: order.id,
            plan: order.plan || 'BASIC',
            status: 'ACTIVE',
            amount: order.amount || 399000,
            startDate,
            endDate,
          },
        });

        // Ghi nhận tenantId ngược lại vào Order để tham chiếu lịch sử
        await tx.order.update({
          where: { id },
          data: { tenantId: tenant.id },
        });
      }

      return { completedOrder, tenantId };
    });

    logger.info(`Duyệt thành công đơn hàng: ${order.orderNumber}. Kích hoạt Tenant ID: ${result.tenantId || 'N/A'}`);

    res.status(200).json({
      success: true,
      data: result.completedOrder,
    });
  } catch (error) {
    next(error);
  }
}

export async function rejectOrder(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { adminNotes } = req.body;

  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Đơn hàng từ chối không tồn tại.',
        },
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id, version: order.version },
      data: {
        status: 'REJECTED',
        adminNotes: adminNotes || 'Giao dịch chuyển tiền không hợp lệ hoặc sai số tiền.',
        version: { increment: 1 },
      },
    });

    logger.info(`Đã từ chối đơn hàng: ${order.orderNumber} - Lý do: ${adminNotes}`);

    res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
}
