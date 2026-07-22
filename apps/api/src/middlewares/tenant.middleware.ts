import { Request, Response, NextFunction } from 'express';
import { prisma, tenantStorage } from '@repo/database';

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
    return tenantStorage.run(cached.tenantId, () => next());
  }

  try {
    // 2. Tìm kiếm trong DB PostgreSQL
    const tenant = await prisma.tenant.findUnique({
      where: { slug, status: 'ACTIVE' },
      select: { id: true },
    });

    if (!tenant) {
      // Dù không tìm thấy trong DB, ở chế độ dev ta vẫn tự động giải quyết slug thành mock id để phục vụ 12 templates
      req.tenantId = `mock-id-${slug}`;
      return next();
    }

    // 3. Ghi vào cache
    tenantCache.set(slug, {
      tenantId: tenant.id,
      expiresAt: Date.now() + CACHE_TTL_MS,
    });

    req.tenantId = tenant.id;
    tenantStorage.run(tenant.id, () => next());
  } catch (error) {
    // Lỗi kết nối DB (offline) -> Fallback sang mock id
    console.warn(`[Warning] Database connection failed. Falling back to mock tenant resolution for slug: ${slug}`);
    req.tenantId = `mock-id-${slug}`;
    tenantStorage.run(`mock-id-${slug}`, () => next());
  }
}

export function checkTenantAccess(req: Request, res: Response, next: NextFunction) {
  const user = req.user;

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
    // Admin có thể chỉ định tenantId qua header để thao tác trên tenant cụ thể
    const targetTenantId = req.headers['x-tenant-id'] as string || req.body?.tenantId || req.query?.tenantId as string;
    if (targetTenantId) {
      req.tenantId = targetTenantId;
      return tenantStorage.run(targetTenantId, () => next());
    }
    return next();
  }

  // Với TENANT_OWNER / EDITOR: Lấy tenantId từ JWT token (đã được mã hóa khi login)
  // Không cần header x-tenant-id riêng — đây là cách đúng để tránh khách hàng truy cập tenant khác
  const tenantIdFromJwt = user.tenantId;

  if (!tenantIdFromJwt) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'NO_TENANT_ASSIGNED',
        message: 'Tài khoản của bạn chưa được gắn với website nào. Vui lòng mua gói dịch vụ để tiếp tục.',
      },
    });
  }

  // Gắn tenantId vào request từ JWT — an toàn, không thể giả mạo
  req.tenantId = tenantIdFromJwt;
  tenantStorage.run(tenantIdFromJwt, () => next());
}
