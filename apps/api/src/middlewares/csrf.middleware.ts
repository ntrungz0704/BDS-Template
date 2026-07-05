import { Request, Response, NextFunction } from 'express';

export function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
  // Chỉ kiểm tra CSRF đối với các phương thức thay đổi dữ liệu nhạy cảm
  const unsafeMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  
  if (!unsafeMethods.includes(req.method)) {
    return next();
  }

  // Đọc giá trị CSRF Token từ cookie và so khớp với Header do Client gửi lên
  const cookieCsrfToken = req.cookies?.csrf_token;
  const headerCsrfToken = req.headers['x-csrf-token'];

  if (!cookieCsrfToken || !headerCsrfToken || cookieCsrfToken !== headerCsrfToken) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'CSRF_ERROR',
        message: 'Yêu cầu bị từ chối do thiếu hoặc sai lệch token chống giả mạo (CSRF Token).',
      },
    });
  }

  next();
}
