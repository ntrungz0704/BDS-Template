import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const EXEMPT_PUBLIC_PATHS = new Set([
  '/api/auth/register',
  '/api/auth/login',
  '/api/auth/refresh',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/verify-email',
  '/api/auth/resend-verification',
  '/api/marketplace/orders',
  '/api/marketplace/contact',
  '/api/marketplace/webhook/sepay',
  '/api/ai/sync-guest-history',
  '/api/ai/chat',
]);

function isExemptPath(path: string): boolean {
  if (EXEMPT_PUBLIC_PATHS.has(path)) return true;
  // Dynamic public contact paths like /api/website/:tenantSlug/contact or /api/cms/forms/submit
  if (path.startsWith('/api/website/') && path.endsWith('/contact')) return true;
  if (path === '/api/cms/forms/submit') return true;
  return false;
}

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

  const rawPath = req.path || '';
  const cleanUrl = req.originalUrl ? req.originalUrl.split('?')[0] : '';

  // Public endpoints do not require CSRF token validation
  if (isExemptPath(rawPath) || isExemptPath(cleanUrl)) {
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

  // Standard double-submit: cookie matches header
  if (cookieCsrfToken && headerCsrfToken && tokensMatch(cookieCsrfToken, headerCsrfToken)) {
    return next();
  }

  // Cross-domain fallback: when API and frontend are on different domains,
  // the csrf_token cookie is scoped to the API domain and JavaScript on the
  // frontend domain cannot read it. In this case, the frontend captures the
  // CSRF token from the login/refresh response body and stores it in
  // localStorage, then sends it as x-csrf-token header. We trust the header
  // alone when there is no same-origin cookie to compare against.
  // This is safe because:
  // 1. The token was delivered only in the JSON response body (not auto-attached)
  // 2. An attacker's cross-site request cannot read the JSON response (CORS)
  // 3. The header cannot be set by a cross-origin form submission
  if (!cookieCsrfToken && headerCsrfToken && typeof headerCsrfToken === 'string' && headerCsrfToken.length >= 32) {
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
