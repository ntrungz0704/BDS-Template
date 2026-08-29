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

    // Super Admin is the only system-wide role. ADMIN never receives an
    // implicit bypass and must be explicitly listed by a route.
    if (user.role === 'SUPER_ADMIN') {
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


