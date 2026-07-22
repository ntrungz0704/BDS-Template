import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';

export async function subscriptionMiddleware(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;

  // Nếu không có tenantId trong context (ví dụ: route công cộng chưa phân giải), bỏ qua check
  if (!tenantId) {
    return next();
  }

  // Super Admin được phép bỏ qua mọi giới hạn subscription
  if (req.user?.role === 'SUPER_ADMIN') {
    return next();
  }

  try {
    // 1. Kiểm tra trạng thái Tenant trước
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { status: true, slug: true }
    });

    if (!tenant) {
      return next();
    }

    if (tenant.status === 'SUSPENDED') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'TENANT_SUSPENDED',
          message: 'Website này đã bị khóa hoặc tạm ngưng hoạt động bởi Quản trị viên.',
        },
      });
    }

    // 2. Tìm thông tin Subscription của Tenant
    const subscription = await prisma.subscription.findUnique({
      where: { tenantId },
    });

    // Nếu không tìm thấy subscription (ví dụ: đang dùng thử hoặc chưa kích hoạt qua order)
    if (!subscription) {
      return next();
    }

    const now = new Date();
    const endDate = new Date(subscription.endDate);
    
    // Grace period mặc định là 7 ngày
    const gracePeriodDays = 7;
    const gracePeriodEndDate = new Date(endDate.getTime() + gracePeriodDays * 24 * 60 * 60 * 1000);

    // Trạng thái 1: Subscription còn hiệu lực
    if (now <= endDate) {
      return next();
    }

    // Trạng thái 2: Trong thời gian Grace Period (7 ngày kể từ lúc hết hạn)
    if (now > endDate && now <= gracePeriodEndDate) {
      // Cho phép đọc dữ liệu (GET)
      if (req.method === 'GET') {
        return next();
      }

      // Cho phép gửi Lead Form (POST liên hệ tư vấn)
      const isLeadSubmission = req.method === 'POST' && (
        req.path.endsWith('/contact') || 
        req.path.includes('/forms') ||
        req.path.includes('/leads')
      );
      if (isLeadSubmission) {
        return next();
      }

      // Chặn mọi hành động ghi/sửa đổi khác của CMS
      return res.status(403).json({
        success: false,
        error: {
          code: 'SUBSCRIPTION_GRACE_PERIOD_RESTRICTED',
          message: 'Website của bạn đã hết hạn gói dịch vụ. Bạn chỉ có thể đọc dữ liệu và gia hạn gói cước.',
        },
      });
    }

    // Trạng thái 3: Đã quá hạn và quá luôn thời gian gia hạn (Grace Period)
    if (now > gracePeriodEndDate) {
      // Cho phép gia hạn hoặc liên hệ hỗ trợ
      const isExempted = 
        req.path.includes('/subscription') || 
        req.path.includes('/billing') || 
        req.path.includes('/support');
        
      if (isExempted) {
        return next();
      }

      // Chặn hoàn toàn mọi truy cập khác (bao gồm cả đọc dữ liệu public)
      return res.status(403).json({
        success: false,
        error: {
          code: 'SUBSCRIPTION_EXPIRED',
          message: 'Website này đã tạm ngưng hoạt động do hết hạn gói cước thanh toán.',
        },
      });
    }

    next();
  } catch (error) {
    console.error('[Subscription Middleware] Error:', error);
    next();
  }
}
