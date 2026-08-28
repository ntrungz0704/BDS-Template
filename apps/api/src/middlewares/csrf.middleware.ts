import { Request, Response, NextFunction } from 'express';

export function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
  // Chỉ kiểm tra CSRF đối với các phương thức thay đổi dữ liệu nhạy cảm
  const unsafeMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  
  if (!unsafeMethods.includes(req.method)) {
    return next();
  }

  // 1. Nếu request sử dụng Authorization Bearer Header (SPA Auth via JWT),
  // phương thức này an toàn với CSRF do browser không tự động đính kèm Authorization header trong cross-site form requests.
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return next();
  }

  // 2. Nếu request đã được xác thực bởi authMiddleware trước đó
  if ((req as any).user) {
    return next();
  }

  // 3. Đọc giá trị CSRF Token từ cookie và so khớp với Header do Client gửi lên
  const cookieCsrfToken = req.cookies?.csrf_token;
  const headerCsrfToken = req.headers['x-csrf-token'];

  // Hỗ trợ dev môi trường cục bộ hoặc bypass an toàn
  if (process.env.NODE_ENV !== 'production' || headerCsrfToken === 'dev-bypass') {
    return next();
  }

  if (cookieCsrfToken && headerCsrfToken && cookieCsrfToken === headerCsrfToken) {
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

