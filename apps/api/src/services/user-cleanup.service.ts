import { prisma } from '../index';
import { logger } from '../index';
import { vercelDomainService } from './vercel-domain.service';

export interface PurgeTarget {
  email?: string;
  phone?: string;
  userId?: string;
}

/**
 * Xóa sạch hoàn toàn (hard delete) 100% dữ liệu của một tài khoản:
 * - Tất cả các Tenant/Website đã tạo từ đơn hàng của tài khoản này
 * - Tất cả các Pages, Sections, Themes, CompanyInfo, SeoConfig, DomainSettings, Subscriptions
 * - Tất cả các Dự Án, Tin Tức, Menu, Lead CRM, Media, RecycleBin
 * - Tất cả Đơn Hàng (Orders) và ExportJobs
 * - Tất cả Giỏ Hàng (Cart & CartItems), Wishlists, Reviews
 * - Tất cả Token đăng nhập (RefreshTokens, PasswordResetTokens, EmailTokens)
 * - Tất cả Lịch sử Chat AI, Thông báo, AuditLogs
 * - Cuối cùng xóa bản ghi Người Dùng (User)
 */
export async function purgeUserAccount(target: PurgeTarget): Promise<{
  deletedUserCount: number;
  deletedOrderCount: number;
  deletedTenantCount: number;
}> {
  const normalizedEmail = target.email ? target.email.trim().toLowerCase() : undefined;
  const cleanPhone = target.phone ? target.phone.replace(/\D/g, '') : undefined;
  const userId = target.userId;

  logger.info(`[PURGE] Bắt đầu dọn dẹp triệt để tài khoản: email=${normalizedEmail || 'N/A'}, phone=${cleanPhone || 'N/A'}, userId=${userId || 'N/A'}`);

  // 1. Tìm tất cả Users thỏa điều kiện
  const users = await prisma.user.findMany({
    where: {
      OR: [
        ...(normalizedEmail ? [{ email: { equals: normalizedEmail, mode: 'insensitive' as const } }] : []),
        ...(cleanPhone ? [{ phone: { contains: cleanPhone.slice(-9) } }] : []),
        ...(userId ? [{ id: userId }] : []),
      ],
    },
    select: { id: true, email: true, phone: true, tenantId: true },
  });

  const userIds = users.map((u) => u.id);

  // 2. Tìm tất cả Orders liên quan
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        ...(userIds.length > 0 ? [{ userId: { in: userIds } }] : []),
        ...(normalizedEmail ? [{ email: { equals: normalizedEmail, mode: 'insensitive' as const } }] : []),
        ...(cleanPhone ? [{ phone: { contains: cleanPhone.slice(-9) } }] : []),
      ],
    },
    select: { id: true, tenantId: true, subdomain: true, orderNumber: true },
  });

  const orderIds = orders.map((o) => o.id);

  // 3. Gom danh sách các Tenant IDs cần xóa
  const tenantIdSet = new Set<string>();
  users.forEach((u) => {
    if (u.tenantId) tenantIdSet.add(u.tenantId);
  });
  orders.forEach((o) => {
    if (o.tenantId) tenantIdSet.add(o.tenantId);
  });

  // Tìm thêm tenants thuộc memberships của user
  if (userIds.length > 0) {
    const memberships = await prisma.tenantMembership.findMany({
      where: { userId: { in: userIds } },
      select: { tenantId: true },
    });
    memberships.forEach((m) => tenantIdSet.add(m.tenantId));
  }

  const tenantIds = Array.from(tenantIdSet);

  logger.info(`[PURGE] Tìm thấy ${users.length} users, ${orders.length} orders, ${tenantIds.length} tenants cần xóa.`);

  // 4. Dọn dẹp dữ liệu con của từng Tenant
  for (const tId of tenantIds) {
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tId },
        select: { id: true, slug: true, domain: true },
      });

      if (tenant) {
        // Gỡ domain khỏi Vercel nếu có
        const platformDomain = process.env.PLATFORM_DOMAIN || 'templates.aireviewbds.com';
        const fullSubdomain = `${tenant.slug}.${platformDomain}`;
        vercelDomainService.removeDomainFromVercel(fullSubdomain).catch(() => {});
        if (tenant.domain) {
          vercelDomainService.removeDomainFromVercel(tenant.domain).catch(() => {});
        }
      }

      // Xóa TenantSection
      await prisma.tenantSection.deleteMany({ where: { tenantId: tId } });
      // Xóa TenantPage
      await prisma.tenantPage.deleteMany({ where: { tenantId: tId } });
      // Xóa TenantThemeSettings
      await prisma.tenantThemeSettings.deleteMany({ where: { tenantId: tId } });
      // Xóa CompanyInfo
      await prisma.companyInfo.deleteMany({ where: { tenantId: tId } });
      // Xóa SeoConfig
      await prisma.seoConfig.deleteMany({ where: { tenantId: tId } });
      // Xóa TenantDomainSettings
      await prisma.tenantDomainSettings.deleteMany({ where: { tenantId: tId } });
      // Xóa Subscription
      await prisma.subscription.deleteMany({ where: { tenantId: tId } });
      // Xóa Project
      await prisma.project.deleteMany({ where: { tenantId: tId } });
      // Xóa Post
      await prisma.post.deleteMany({ where: { tenantId: tId } });
      // Xóa Banner
      await prisma.banner.deleteMany({ where: { tenantId: tId } });
      // Xóa Menu & MenuItem
      const menus = await prisma.menu.findMany({ where: { tenantId: tId }, select: { id: true } });
      if (menus.length > 0) {
        await prisma.menuItem.deleteMany({ where: { menuId: { in: menus.map((m) => m.id) } } });
        await prisma.menu.deleteMany({ where: { tenantId: tId } });
      }
      // Xóa Lead CRM (LeadNote, LeadActivity, Lead)
      const leads = await prisma.lead.findMany({ where: { tenantId: tId }, select: { id: true } });
      if (leads.length > 0) {
        const leadIds = leads.map((l) => l.id);
        await prisma.leadNote.deleteMany({ where: { leadId: { in: leadIds } } });
        await prisma.leadActivity.deleteMany({ where: { leadId: { in: leadIds } } });
        await prisma.lead.deleteMany({ where: { tenantId: tId } });
      }
      // Xóa ContactFormSubmissions
      await prisma.contactFormSubmission.deleteMany({ where: { tenantId: tId } });
      // Xóa Media & Folders
      await prisma.mediaUsage.deleteMany({ where: { media: { tenantId: tId } } });
      await prisma.mediaRecycleBin.deleteMany({ where: { tenantId: tId } });
      await prisma.mediaAsset.deleteMany({ where: { tenantId: tId } });
      await prisma.media.deleteMany({ where: { tenantId: tId } });
      await prisma.mediaFolder.deleteMany({ where: { tenantId: tId } });
      // Xóa Category & Tag
      await prisma.category.deleteMany({ where: { tenantId: tId } });
      await prisma.tag.deleteMany({ where: { tenantId: tId } });
      // Xóa ApiKey, Webhook
      await prisma.webhookDelivery.deleteMany({ where: { webhook: { tenantId: tId } } });
      await prisma.tenantWebhook.deleteMany({ where: { tenantId: tId } });
      await prisma.tenantApiKey.deleteMany({ where: { tenantId: tId } });
      // Xóa Membership
      await prisma.tenantMembership.deleteMany({ where: { tenantId: tId } });
      // Xóa AiChatSession
      const aiSessions = await prisma.aiChatSession.findMany({ where: { tenantId: tId }, select: { id: true } });
      if (aiSessions.length > 0) {
        await prisma.aiChatMessage.deleteMany({ where: { sessionId: { in: aiSessions.map((s) => s.id) } } });
        await prisma.aiChatSession.deleteMany({ where: { tenantId: tId } });
      }

      // Tách user khác khỏi tenant này nếu có
      await prisma.user.updateMany({
        where: { tenantId: tId },
        data: { tenantId: null },
      });

      // Tách order khỏi tenant này
      await prisma.order.updateMany({
        where: { tenantId: tId },
        data: { tenantId: null },
      });

      // Cuối cùng xóa Tenant
      await prisma.tenant.delete({ where: { id: tId } });
      logger.info(`[PURGE] Đã xóa Tenant ${tId} thành công.`);
    } catch (tErr: any) {
      logger.warn(`[PURGE] Lỗi khi dọn tenant ${tId}: ${tErr.message}`);
    }
  }

  // 5. Xóa toàn bộ Orders
  if (orderIds.length > 0) {
    try {
      await prisma.exportJob.deleteMany({ where: { orderId: { in: orderIds } } });
      await prisma.subscription.deleteMany({ where: { orderId: { in: orderIds } } });
      await prisma.order.deleteMany({ where: { id: { in: orderIds } } });
      logger.info(`[PURGE] Đã xóa ${orderIds.length} orders thành công.`);
    } catch (oErr: any) {
      logger.warn(`[PURGE] Lỗi khi dọn orders: ${oErr.message}`);
    }
  }

  // 6. Xóa toàn bộ dữ liệu User
  if (userIds.length > 0) {
    try {
      // Cart & CartItems
      const carts = await prisma.cart.findMany({ where: { userId: { in: userIds } }, select: { id: true } });
      if (carts.length > 0) {
        await prisma.cartItem.deleteMany({ where: { cartId: { in: carts.map((c) => c.id) } } });
        await prisma.cart.deleteMany({ where: { userId: { in: userIds } } });
      }

      // Wishlist
      await prisma.wishlist.deleteMany({ where: { userId: { in: userIds } } });
      // CustomerProfile
      await prisma.customerProfile.deleteMany({ where: { userId: { in: userIds } } });
      // Review
      await prisma.review.deleteMany({ where: { userId: { in: userIds } } });
      // Notifications
      await prisma.notification.deleteMany({ where: { userId: { in: userIds } } });
      // RefreshToken
      await prisma.refreshToken.deleteMany({ where: { userId: { in: userIds } } });
      // PasswordResetToken
      await prisma.passwordResetToken.deleteMany({ where: { userId: { in: userIds } } });
      // EmailVerificationToken
      await prisma.emailVerificationToken.deleteMany({ where: { userId: { in: userIds } } });
      // AuditLog
      await prisma.auditLog.deleteMany({ where: { userId: { in: userIds } } });
      // Membership
      await prisma.tenantMembership.deleteMany({ where: { userId: { in: userIds } } });
      // AiChat
      const userAiSessions = await prisma.aiChatSession.findMany({ where: { userId: { in: userIds } }, select: { id: true } });
      if (userAiSessions.length > 0) {
        await prisma.aiChatMessage.deleteMany({ where: { sessionId: { in: userAiSessions.map((s) => s.id) } } });
        await prisma.aiChatSession.deleteMany({ where: { userId: { in: userIds } } });
      }

      // Xóa Users
      await prisma.user.deleteMany({ where: { id: { in: userIds } } });
      logger.info(`[PURGE] Đã xóa ${userIds.length} users thành công.`);
    } catch (uErr: any) {
      logger.warn(`[PURGE] Lỗi khi dọn users: ${uErr.message}`);
    }
  }

  return {
    deletedUserCount: users.length,
    deletedOrderCount: orders.length,
    deletedTenantCount: tenantIds.length,
  };
}
