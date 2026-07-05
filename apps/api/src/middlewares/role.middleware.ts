import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@repo/types';

export function requireRole(allowedRoles: UserRole[]) {
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

    // Super Admin được quyền bypass qua toàn bộ mọi kiểm tra phân quyền
    if (user.role === 'SUPER_ADMIN') {
      return next();
    }

    if (!allowedRoles.includes(user.role)) {
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
