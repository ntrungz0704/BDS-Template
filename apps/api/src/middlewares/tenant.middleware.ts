import { Request, Response, NextFunction } from 'express';
import { prisma, tenantStorage } from '@repo/database';

export async function resolveTenantSlug(req: Request, res: Response, next: NextFunction) {
  // Public website APIs are explicitly namespaced by a validated route slug.
  // Caller-controlled headers never select a tenant.
  const slug = req.params.tenantSlug?.toLowerCase().trim();

  if (!slug || !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(slug)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_TENANT_IDENTIFIER',
        message: 'Không tìm thấy thông tin định danh Website.',
      },
    });
  }

  try {
    let tenant = await prisma.tenant.findFirst({
      where: { slug, status: 'ACTIVE', deletedAt: null },
      select: { id: true },
    });

    if (!tenant) {
      // 1. Fallback: Tìm qua TenantDomainSettings
      const domainSetting = await prisma.tenantDomainSettings.findFirst({
        where: {
          OR: [
            { subdomain: slug },
            { customDomain: slug },
          ],
        },
        select: { tenantId: true },
      });
      if (domainSetting?.tenantId) {
        tenant = await prisma.tenant.findUnique({
          where: { id: domainSetting.tenantId, status: 'ACTIVE', deletedAt: null },
          select: { id: true },
        });
      }
    }

    if (!tenant) {
      // 2. Fallback: Tìm qua Order nếu slug từng thuộc về đơn hàng đó
      const order = await prisma.order.findFirst({
        where: {
          OR: [
            { subdomain: slug },
            { orderNumber: slug },
            { subdomain: { contains: slug, mode: 'insensitive' } },
          ],
        },
        select: { tenantId: true },
      });
      if (order?.tenantId) {
        tenant = await prisma.tenant.findUnique({
          where: { id: order.tenantId, status: 'ACTIVE', deletedAt: null },
          select: { id: true },
        });
      }
    }

    if (!tenant) {
      // 3. Fallback: Tìm qua prefix slug (ví dụ chu-tung-bds-01-3456 -> chu-tung)
      const basePrefix = slug.replace(/-(bds-\d+|lp-\d+).*$/i, '');
      if (basePrefix && basePrefix !== slug) {
        tenant = await prisma.tenant.findFirst({
          where: {
            OR: [
              { slug: basePrefix },
              { slug: { startsWith: basePrefix, mode: 'insensitive' } },
            ],
            status: 'ACTIVE',
            deletedAt: null,
          },
          select: { id: true },
        });
      }
    }

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: 'TENANT_NOT_FOUND', message: 'Website không tồn tại.' },
      });
    }

    req.tenantId = tenant.id;
    tenantStorage.run(tenant.id, () => next());
  } catch (error) {
    console.error(`[Error] Database connection failed for tenant resolution: ${(error as Error).message}`);
    return res.status(503).json({
      success: false,
      error: { code: 'SERVICE_UNAVAILABLE', message: 'Hệ thống đang bảo trì. Vui lòng thử lại sau.' },
    });
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

  const tenantId = user.tenantId;
  if (!tenantId) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'TENANT_CONTEXT_REQUIRED',
        message: 'Phiên đăng nhập chưa chọn website. Vui lòng chọn website từ danh sách được cấp quyền.',
      },
    });
  }

  // Block internal ADMIN accounts from CMS tenant access early (before DB queries)
  if (user.role === 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'TENANT_ACCESS_DENIED',
        message: 'Tài khoản Admin nội bộ không được truy cập CMS tenant.',
      },
    });
  }

  try {
    const tenant = await prisma.tenant.findFirst({
      where: { id: tenantId, deletedAt: null },
      select: { id: true, status: true },
    });
    if (!tenant) {
      return res.status(403).json({
        success: false,
        error: { code: 'TENANT_ACCESS_DENIED', message: 'Website không tồn tại hoặc không còn khả dụng.' },
      });
    }
    if (tenant.status === 'SUSPENDED') {
      return res.status(403).json({
        success: false,
        error: { code: 'TENANT_SUSPENDED', message: 'Website đang bị tạm khóa do vi phạm hoặc chưa thanh toán.' },
      });
    }

    if (user.role !== 'SUPER_ADMIN') {
      const membership = await prisma.tenantMembership.findFirst({
        where: { userId: user.userId, tenantId, status: 'ACTIVE' },
        select: { id: true },
      });
      if (!membership) {
        return res.status(403).json({
          success: false,
          error: { code: 'TENANT_ACCESS_DENIED', message: 'Bạn không có quyền truy cập website này.' },
        });
      }
    }

    req.tenantId = tenantId;
    tenantStorage.run(tenantId, () => next());
  } catch (error) {
    console.error(`[Error] Database connection failed for tenant access check: ${(error as Error).message}`);
    return res.status(503).json({
      success: false,
      error: { code: 'SERVICE_UNAVAILABLE', message: 'Hệ thống đang bảo trì. Vui lòng thử lại sau.' },
    });
  }
}
