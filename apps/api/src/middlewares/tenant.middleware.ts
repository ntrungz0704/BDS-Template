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
      if (process.env.NODE_ENV === 'production') {
        return res.status(404).json({
          success: false,
          error: {
            code: 'TENANT_NOT_FOUND',
            message: 'Website không tồn tại.',
          },
        });
      }
      // Dev fallback only
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
    if (process.env.NODE_ENV === 'production') {
      console.error(`[Error] Database connection failed for tenant resolution: ${(error as Error).message}`);
      return res.status(503).json({
        success: false,
        error: {
          code: 'SERVICE_UNAVAILABLE',
          message: 'Hệ thống đang bảo trì. Vui lòng thử lại sau.',
        },
      });
    }
    console.warn(`[Warning] Database connection failed. Falling back to mock tenant resolution for slug: ${slug}`);
    req.tenantId = `mock-id-${slug}`;
    tenantStorage.run(`mock-id-${slug}`, () => next());
  }
}

export async function checkTenantAccess(req: Request, res: Response, next: NextFunction) {
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

  // 1. Super Admin: lấy targetTenantId hoặc lấy tenant đầu tiên trong hệ thống
  if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
    let targetTenantId = (req.headers['x-tenant-id'] as string) || req.body?.tenantId || (req.query?.tenantId as string);
    if (!targetTenantId) {
      const firstTenant = await prisma.tenant.findFirst({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        select: { id: true },
      });
      targetTenantId = firstTenant?.id || 'tenant-default';
    }
    req.tenantId = targetTenantId;
    return tenantStorage.run(targetTenantId, () => next());
  }

  // 2. Với User thường: Lấy tenantId từ JWT hoặc fallback tìm trong DB
  let tenantId = user.tenantId;

  if (!tenantId) {
    // Tìm trong DB xem user đã được cấp Tenant sau khi duyệt đơn chưa
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { tenantId: true },
    });

    if (dbUser?.tenantId) {
      tenantId = dbUser.tenantId;
    } else {
      // Tìm qua bảng tenant_memberships
      const membership = await prisma.tenantMembership.findFirst({
        where: { userId: user.userId, status: 'ACTIVE' },
        select: { tenantId: true },
        orderBy: { createdAt: 'desc' },
      });
      if (membership?.tenantId) {
        tenantId = membership.tenantId;
      }
    }
  }

  if (!tenantId) {
    // Nếu vẫn chưa có tenant, tìm xem có tenant nào mới tạo theo email của user không
    const emailTenant = await prisma.tenant.findFirst({
      where: {
        OR: [
          { users: { some: { email: user.email } } },
          { memberships: { some: { user: { email: user.email } } } },
        ],
        deletedAt: null,
      },
      select: { id: true },
      orderBy: { createdAt: 'desc' },
    });
    if (emailTenant) {
      tenantId = emailTenant.id;
    }
  }

  if (!tenantId) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'NO_TENANT_ASSIGNED',
        message: 'Tài khoản của bạn chưa được gắn với website nào. Vui lòng đặt mua template hoặc chờ Admin duyệt kích hoạt.',
      },
    });
  }

  req.tenantId = tenantId;
  tenantStorage.run(tenantId, () => next());
}
