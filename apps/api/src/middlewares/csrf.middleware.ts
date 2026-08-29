import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const EXEMPT_PUBLIC_AUTH_PATHS = new Set([
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
  '/api/auth/resend-verification',
]);

function tokensMatch(cookieToken: unknown, headerToken: unknown): boolean {
  if (typeof cookieToken !== 'string' || typeof headerToken !== 'string') {
    return false;
  }

  const cookieBuffer = Buffer.from(cookieToken);
  const headerBuffer = Buffer.from(headerToken);
  return cookieBuffer.length === headerBuffer.length && crypto.timingSafeEqual(cookieBuffer, headerBuffer);
}

export function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
  // Chỉ kiểm tra CSRF đối với các phương thức thay đổi dữ liệu nhạy cảm
  const unsafeMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  
  if (!unsafeMethods.includes(req.method)) {
    return next();
  }

  // Public authentication endpoints do not act on an existing session.
  if (EXEMPT_PUBLIC_AUTH_PATHS.has(req.path) || EXEMPT_PUBLIC_AUTH_PATHS.has(req.originalUrl.split('?')[0])) {
    return next();
  }

  const accessCookie = req.cookies?.access_token;
  const refreshCookie = req.cookies?.refresh_token;
  const usesAmbientCookieAuth = Boolean(accessCookie || refreshCookie);

  // A request authenticated only with an Authorization header is not sent
  // automatically by a browser and is therefore not susceptible to CSRF.
  if (!usesAmbientCookieAuth) {
    return next();
  }

  // Cookie-authenticated mutations must always use a double-submit token,
  // including in development and on refresh/logout endpoints.
  const cookieCsrfToken = req.cookies?.csrf_token;
  const headerCsrfToken = req.headers['x-csrf-token'];

  if (tokensMatch(cookieCsrfToken, headerCsrfToken)) {
    return next();
  }

  return res.status(403).json({
    success: false,
    error: {
      code: 'CSRF_ERROR',
      message: 'Yêu cầu bị từ chối do thiếu hoặc sai lệch token chống giả mạo (CSRF Token).',
    },
  });
}

