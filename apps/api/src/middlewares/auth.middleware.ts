import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserSessionPayload } from '@repo/types';

// Mở rộng kiểu dữ liệu Request của Express để chứa thông tin User và Tenant Context
declare global {
  namespace Express {
    interface Request {
      user?: UserSessionPayload;
      tenantId?: string;
      authMode?: 'cookie' | 'bearer';
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Đọc access token từ HttpOnly Cookie hoặc Authorization Bearer Header
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const cookieToken = req.cookies?.access_token;
  const token = cookieToken || bearerToken;

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
    const accessSecret = process.env.JWT_ACCESS_SECRET || 'bds-platform-secure-jwt-access-secret-production-2026-fallback-key-32chars';
    const decoded = jwt.verify(token, accessSecret) as UserSessionPayload;
    
    req.user = decoded;
    req.authMode = cookieToken ? 'cookie' : 'bearer';
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

export function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const cookieToken = req.cookies?.access_token;
  const token = cookieToken || bearerToken;

  if (!token) {
    return next();
  }

  try {
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    if (accessSecret) {
      const decoded = jwt.verify(token, accessSecret) as UserSessionPayload;
      req.user = decoded;
      req.authMode = cookieToken ? 'cookie' : 'bearer';
    }
  } catch (error) {
    // Ignore invalid/expired token in optional auth
  }

  next();
}
