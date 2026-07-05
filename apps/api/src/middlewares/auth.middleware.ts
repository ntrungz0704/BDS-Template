import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserSessionPayload } from '@repo/types';

// Mở rộng kiểu dữ liệu Request của Express để chứa thông tin User và Tenant Context
declare global {
  namespace Express {
    interface Request {
      user?: UserSessionPayload;
      tenantId?: string;
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Đọc access token từ HttpOnly Cookie
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Yêu cầu đăng nhập để truy cập tài nguyên này.',
      },
    });
  }

  try {
    const accessSecret = process.env.JWT_ACCESS_SECRET || 'super-secret-access-key-should-be-long-and-random-123456';
    const decoded = jwt.verify(token, accessSecret) as UserSessionPayload;
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Phiên đăng nhập đã hết hạn. Vui lòng làm mới token.',
        },
      });
    }
    
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Token xác thực không hợp lệ.',
      },
    });
  }
}
