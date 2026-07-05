import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';

// In-memory cache đơn giản lưu trữ slug -> tenantId trong 5 phút để tránh quá tải DB queries
const tenantCache = new Map<string, { tenantId: string; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 phút

export async function resolveTenantSlug(req: Request, res: Response, next: NextFunction) {
  // Lấy slug từ params hoặc header (Next.js middleware sẽ truyền header này sang API)
  const slug = req.params.tenantSlug || req.headers['x-tenant-slug'] as string;

  if (!slug) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_TENANT_IDENTIFIER',
        message: 'Không tìm thấy thông tin định danh Website.',
      },
    });
  }

  // 1. Kiểm tra cache
  const cached = tenantCache.get(slug);
  if (cached && cached.expiresAt > Date.now()) {
    req.tenantId = cached.tenantId;
    return next();
  }

  try {
    // 2. Tìm kiếm trong DB PostgreSQL
    const tenant = await prisma.tenant.findUnique({
      where: { slug, status: 'ACTIVE' },
      select: { id: true },
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TENANT_NOT_FOUND',
          message: 'Website không tồn tại hoặc đã bị khóa hoạt động.',
        },
      });
    }

    // 3. Ghi vào cache
    tenantCache.set(slug, {
      tenantId: tenant.id,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    req.tenantId = tenant.id;
    next();
  } catch (error) {
    next(error);
  }
}

export function checkTenantAccess(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const targetTenantId = req.headers['x-tenant-id'] as string || req.body.tenantId || req.query.tenantId as string;

  if (!user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Yêu cầu đăng nhập.',
      },
    });
  }

  // Super Admin có quyền xem và chỉnh sửa dữ liệu của mọi tenant
  if (user.role === 'SUPER_ADMIN') {
    return next();
  }

  if (!targetTenantId) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_TENANT_ID',
        message: 'Thiếu tham số định danh Tenant ID để kiểm tra quyền.',
      },
    });
  }

  // Chặn truy cập chéo dữ liệu giữa các tenant khác nhau
  if (user.tenantId !== targetTenantId) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'ACCESS_DENIED',
        message: 'Truy cập trái phép. Bạn không thể thay đổi dữ liệu của Tenant khác.',
      },
    });
  }

  req.tenantId = targetTenantId;
  next();
}
