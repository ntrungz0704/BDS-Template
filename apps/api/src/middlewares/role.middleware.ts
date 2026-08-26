import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@repo/types';

export function requireRole(allowedRoles: (UserRole | 'CUSTOMER_OWNER')[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Yêu cầu đăng nhập để thực hiện hành động này.',
        },
      });
    }

    // Super Admin & Admin được quyền truy cập mọi tính năng
    if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
      return next();
    }

    // Đối với các route quản trị CMS của Tenant: Khách hàng (CUSTOMER, TENANT_OWNER, USER, EDITOR, STAFF)
    // đều có toàn quyền chỉnh sửa dữ liệu trên Tenant riêng của mình (đã được cách ly qua tenantStorage)
    const isTenantRoute = allowedRoles.some((r) =>
      ['TENANT_OWNER', 'CUSTOMER_OWNER', 'EDITOR', 'STAFF'].includes(r as string)
    );

    if (
      isTenantRoute &&
      ['TENANT_OWNER', 'CUSTOMER_OWNER', 'CUSTOMER', 'USER', 'EDITOR', 'STAFF'].includes(user.role as string)
    ) {
      return next();
    }

    // Normalize roles: TENANT_OWNER and CUSTOMER_OWNER are equivalent
    const normalizedUserRole = user.role === 'TENANT_OWNER' ? 'CUSTOMER_OWNER' : user.role;
    const normalizedAllowed = allowedRoles.map(r => r === 'TENANT_OWNER' ? 'CUSTOMER_OWNER' : r);

    if (!normalizedAllowed.includes(user.role as any) && !normalizedAllowed.includes(normalizedUserRole as any)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Bạn không có quyền thực hiện hành động này.',
        },
      });
    }

    next();
  };
}

