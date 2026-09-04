import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { z } from 'zod';
import { logger } from '../index';
import crypto from 'crypto';
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';
import { approveOrder } from './admin.controller';
import { websiteProvisioningService } from '../services/website-provisioning.service';
import { TemplatePackagingService } from '../services/template-packaging.service';
import { ExportJobService } from '../services/export-job.service';
import { resolveTemplateAlias } from '../utils/template-aliases';
import { extractTemplateCode, formatSiteSlug } from '@repo/utils';
import { sendRealtimeNotification } from './notification.controller';

// Định nghĩa schemas Zod validation
const createOrderSchema = z.object({
  templateId: z.string().min(1, 'ID Template không được để trống.'),
  type: z.enum(['BUY', 'RENT', 'BUY_SOURCE']),
  fullName: z.string().min(2, 'Họ và tên tối thiểu phải có 2 ký tự.'),
  email: z.string().email('Định dạng email không hợp lệ.'),
  phone: z.string().regex(/^(0|\+84)[0-9]{9,10}$/, 'SĐT phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.'),
  subdomain: z.string().optional(),
  note: z.string().optional(),
});

function resolvePurchaseType(type: 'BUY' | 'RENT' | 'BUY_SOURCE') {
  return type === 'BUY_SOURCE' ? 'SOURCE_TEMPLATE' : 'SAAS';
}

const uploadPaymentSchema = z.object({
  transactionCode: z.string().min(3, 'Mã giao dịch tối thiểu 3 ký tự.'),
  billImageUrl: z.string().url('URL ảnh hóa đơn không hợp lệ.'),
});

const contactSubmissionSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên tối thiểu 2 ký tự.'),
  phone: z.string().regex(/^(0|\+84)[0-9]{9,10}$/, 'SĐT phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.'),
  email: z.string().email('Định dạng email không hợp lệ.').optional().or(z.literal('')),
  selectedTemplate: z.string().optional(),
  packageInterest: z.string().optional(),
  message: z.string().optional(),
});

export async function getTemplates(req: Request, res: Response, next: NextFunction) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 16));
    const search = (req.query.q as string || '').trim();
    const productType = req.query.productType as string | undefined;
    const category = (req.query.category as string | undefined)?.trim();
    const sort = req.query.sort as string | undefined;
    if (productType && productType !== 'WEBSITE_TEMPLATE' && productType !== 'LANDING_PAGE') {
      return res.status(400).json({ success: false, error: { code: 'INVALID_PRODUCT_TYPE', message: 'productType không hợp lệ.' } });
    }
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
      ...(productType ? { productType } : {}),
      ...(category ? { category } : {}),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [templates, total] = await prisma.$transaction([
      prisma.template.findMany({
        where,
        skip,
        take: limit,
        orderBy: sort === 'price-asc'
          ? [{ salePrice: 'asc' }, { priceBuy: 'asc' }, { sortOrder: 'asc' }]
          : sort === 'price-desc'
            ? [{ salePrice: 'desc' }, { priceBuy: 'desc' }, { sortOrder: 'asc' }]
            : { sortOrder: 'asc' },
      }),
      prisma.template.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: templates,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
}

export async function getTemplateDetail(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;

  try {
    const template = await prisma.template.findUnique({
      where: { slug, isActive: true },
      include: { templateConfig: true },
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        error: { code: 'TEMPLATE_NOT_FOUND', message: 'Không tìm thấy thông tin Template giao diện này.' },
      });
    }

    res.status(200).json({ success: true, data: template });
  } catch (error) {
    next(error);
  }
}

export async function checkSubdomain(req: Request, res: Response, next: NextFunction) {
  const slug = (req.query.slug || req.query.subdomain) as string;

  if (!slug) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_SLUG',
        message: 'Thiếu tham số subdomain slug cần kiểm tra.',
      },
    });
  }

  const normalizedSlug = slug.toLowerCase().trim();
  const blacklist = ['www', 'admin', 'cms', 'api', 'website', 'myplatform', 'platform'];
  if (blacklist.includes(normalizedSlug)) {
    return res.status(200).json({
      success: true,
      data: {
        available: false,
        message: 'Tên subdomain này nằm trong danh mục bảo lưu hệ thống.',
      },
    });
  }

  try {
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug: normalizedSlug },
    });

    res.status(200).json({
      success: true,
      data: {
        available: !existingTenant,
        message: existingTenant 
          ? 'Tên miền đã được đăng ký sử dụng bởi người khác.' 
          : 'Tên miền hoàn toàn khả dụng.',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createOrderSchema.parse(req.body);
    const idempotencyKey = req.get('idempotency-key')?.trim() || null;
    if (idempotencyKey && (idempotencyKey.length < 16 || idempotencyKey.length > 128)) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_IDEMPOTENCY_KEY', message: 'Idempotency-Key không hợp lệ.' } });
    }
    const authenticatedUserId = req.user?.userId || null;
    let orderEmail = data.email.trim().toLowerCase();

    if (authenticatedUserId) {
      const authenticatedUser = await prisma.user.findUnique({
        where: { id: authenticatedUserId },
        select: { email: true, isActive: true, deletedAt: true, status: true },
      });

      if (!authenticatedUser || !authenticatedUser.isActive || authenticatedUser.deletedAt || authenticatedUser.status !== 'ACTIVE') {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHENTICATED', message: 'Phiên đăng nhập không còn hợp lệ. Vui lòng đăng nhập lại.' },
        });
      }

      // Orders created from an authenticated checkout must always belong to
      // that account, regardless of a stale/autofilled email in the form.
      orderEmail = authenticatedUser.email.trim().toLowerCase();
    }

    const cleanSlug = data.templateId.replace(/^template-/, '').toLowerCase();
    const resolvedSlug = resolveTemplateAlias(data.templateId);
    let template = await prisma.template.findFirst({
      where: {
        OR: [
          { id: data.templateId },
          { id: `template-${cleanSlug}` },
          { id: `template-${resolvedSlug}` },
          { slug: data.templateId },
          { slug: cleanSlug },
          { slug: resolvedSlug },
        ],
      },
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TEMPLATE_NOT_FOUND',
          message: 'Mẫu website đã chọn không tồn tại hoặc chưa được kích hoạt. Vui lòng chọn lại mẫu.',
        },
      });
    }

    let normalizedSubdomain = '';
    if (data.type === 'RENT') {
      if (!data.subdomain) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_SUBDOMAIN',
            message: 'Thuê website bắt buộc phải khai báo subdomain.',
          },
        });
      }
      normalizedSubdomain = data.subdomain.toLowerCase().trim();

      const existingTenant = await prisma.tenant.findUnique({
        where: { slug: normalizedSubdomain },
      });

      if (existingTenant) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'SUBDOMAIN_CONFLICT',
            message: 'Tên miền/subdomain này đã có người đăng ký, vui lòng chọn tên khác.',
          },
        });
      }
    }

    const amount = data.type === 'BUY'
      ? template.priceBuy
      : data.type === 'BUY_SOURCE'
        ? template.priceBuySource
        : template.priceRentMonthly;
    if (amount == null) {
      return res.status(409).json({ success: false, error: { code: 'PRICE_UNAVAILABLE', message: 'Sản phẩm chưa được cấu hình giá.' } });
    }

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
    const orderNumber = `ORD-${dateStr}-${randomHex}`;

    if (idempotencyKey) {
      const existing = await prisma.order.findUnique({ where: { idempotencyKey } });
      if (existing) {
        if (existing.userId !== authenticatedUserId || existing.templateId !== template.id || existing.type !== data.type) {
          return res.status(409).json({ success: false, error: { code: 'IDEMPOTENCY_KEY_REUSED', message: 'Idempotency-Key đã được dùng cho yêu cầu khác.' } });
        }
        return res.status(200).json({ success: true, data: existing, meta: { idempotentReplay: true } });
      }
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        fullName: data.fullName,
        email: orderEmail,
        phone: data.phone,
        type: data.type,
        status: 'PENDING',
        productType: template.productType,
        purchaseType: resolvePurchaseType(data.type),
        paymentStatus: 'PENDING_PAYMENT',
        fulfillmentStatus: data.type === 'BUY_SOURCE' ? 'NOT_REQUIRED' : 'PENDING',
        templateId: template.id,
        amount,
        productSnapshot: {
          templateId: template.id,
          slug: template.slug,
          name: template.name,
          productType: template.productType,
          purchaseType: resolvePurchaseType(data.type),
          amount,
          priceAtPurchase: amount,
        },
        idempotencyKey,
        subdomain: normalizedSubdomain || null,
        note: data.note,
        userId: authenticatedUserId,
      },
    });
    logger.info(`Đã tạo đơn hàng ${orderNumber} - ${amount} VNĐ`);

    try {
      const admins = await prisma.user.findMany({ where: { role: 'SUPER_ADMIN', isActive: true } });
      for (const admin of admins) {
        await sendRealtimeNotification(admin.id, {
          type: 'ORDER_CREATED',
          title: `📦 Đơn hàng mới #${orderNumber}`,
          content: `${data.fullName} (${data.phone}) vừa đặt ${data.type === 'BUY' ? 'mua' : 'thuê'} template "${template.name}". Số tiền: ${amount?.toLocaleString('vi-VN')}đ.`,
          actionUrl: '/orders',
          entityType: 'Order',
          entityId: order.id,
        });
      }

      if (authenticatedUserId) {
        await sendRealtimeNotification(authenticatedUserId, {
          type: 'ORDER_CREATED',
          title: `✅ Đơn hàng #${orderNumber} đã được khởi tạo`,
          content: `Bạn vừa đặt đơn hàng cho template "${template.name}". Vui lòng hoàn tất thanh toán để hệ thống phê duyệt và kích hoạt.`,
          actionUrl: `/customer/dashboard`,
          entityType: 'Order',
          entityId: order.id,
        });
      }
    } catch (notifErr) {
      logger.warn(`Không thể tạo notification: ${(notifErr as Error).message}`);
    }

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu đơn hàng không đúng định dạng.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}

export async function uploadPaymentProof(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const data = uploadPaymentSchema.parse(req.body);

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập để xác nhận thanh toán.' } });
    }

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: 'Đơn hàng không tồn tại trên hệ thống.',
        },
      });
    }

    if (order.userId !== userId && req.user?.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Bạn không có quyền thao tác trên đơn hàng này.' } });
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ORDER_NOT_PENDING',
          message: 'Đơn hàng này không còn ở trạng thái chờ thanh toán.',
        },
      });
    }

    const existingTransaction = await prisma.order.findUnique({
      where: { transactionCode: data.transactionCode },
    });

    if (existingTransaction && existingTransaction.id !== id) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'TRANSACTION_CODE_DUPLICATED',
          message: 'Mã giao dịch ngân hàng này đã được khai báo cho đơn hàng khác.',
        },
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id, version: order.version },
      data: {
        status: 'WAITING_CONFIRM',
        paymentStatus: 'WAITING_CONFIRMATION',
        billImageUrl: data.billImageUrl,
        transactionCode: data.transactionCode,
        version: { increment: 1 },
      },
    });

    logger.info(`Khách hàng đã tải hóa đơn thanh toán cho đơn hàng: ${order.orderNumber}`);

    res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Thông tin xác nhận thanh toán sai định dạng.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}

export async function getMarketplaceStats(req: Request, res: Response, next: NextFunction) {
  try {
    const [totalTenants, totalTemplates, completedOrders] = await Promise.all([
      prisma.tenant.count({ where: { status: 'ACTIVE', deletedAt: null } }),
      prisma.template.count({ where: { isActive: true } }),
      prisma.order.count({ where: { status: 'COMPLETED' } }),
    ]);

    res.status(200).json({
      success: true,
      data: { totalCustomers: totalTenants, totalWebsitesCreated: completedOrders, totalTemplates, averageRating: 4.9 },
    });
  } catch (error) {
    next(error);
  }
}

export async function downloadTemplateSource(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;

  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập để tải mã nguồn.' } });
    }
    const cleanSlug = slug.toLowerCase().trim();
    let tpl = await prisma.template.findFirst({
      where: {
        OR: [
          { slug: cleanSlug },
          { id: cleanSlug },
          { id: `template-${cleanSlug}` },
          { slug: cleanSlug.replace('template-', '') },
        ],
      },
    });

    if (!tpl) {
      return res.status(404).json({ success: false, error: { code: 'TEMPLATE_NOT_FOUND', message: 'Không tìm thấy template.' } });
    }

    const targetSlug = tpl.slug;
    const userEmail = req.user?.email?.trim().toLowerCase();

    const orderNumberQuery = (req.query.orderNumber as string || '').trim();
    const cleanOrdNo = orderNumberQuery ? orderNumberQuery.replace(/\s+/g, '-') : '';

    // A source entitlement is never inferred from an unrelated completed
    // purchase. An optional order number can only narrow the current user's
    // own entitlement; it cannot select someone else's order.
    const paidOrder = await prisma.order.findFirst({
      where: {
        userId,
        templateId: tpl.id,
        type: { in: ['BUY', 'BUY_SOURCE'] },
        status: 'COMPLETED',
        ...(cleanOrdNo ? { orderNumber: { in: [cleanOrdNo, orderNumberQuery] } } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!paidOrder && req.user?.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, error: { code: 'NO_PURCHASE', message: 'Bạn chưa mua bản quyền mẫu này hoặc đơn hàng chưa hoàn tất.' } });
    }

    const packageResult = await TemplatePackagingService.generateStandalonePackage({
      slug: targetSlug,
      orderNumber: paidOrder?.orderNumber || 'ORD-VIP',
      customerName: paidOrder?.fullName || (req.user as any)?.fullName || 'Khách Hàng',
      customerPhone: paidOrder?.phone || (req.user as any)?.phone || '',
      customerEmail: paidOrder?.email || userEmail || '',
      tenantId: paidOrder?.tenantId || (req.user as any)?.tenantId,
    });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${packageResult.fileName}"`);
    res.setHeader('Content-Length', packageResult.buffer.length);
    res.end(packageResult.buffer);

    logger.info(`[Marketplace] Tải xuống thành công full source ZIP của template: ${slug} (${packageResult.fileName})`);
  } catch (error) {
    next(error);
  }
}

export async function quickApproveOrder(req: Request, res: Response, next: NextFunction) {
  try {
    return await approveOrder(req, res, next);
  } catch (error) {
    next(error);
  }
}

export async function handleSepayWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    const webhookSecret = process.env.SEPAY_WEBHOOK_SECRET;
    if (process.env.NODE_ENV === 'production') {
      const providedSecret = req.get('x-sepay-webhook-secret');
      const providedBuffer = Buffer.from(providedSecret || '');
      const expectedBuffer = Buffer.from(webhookSecret || '');
      if (!webhookSecret || !providedSecret || providedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
        logger.warn('[SePay Webhook] Rejected request with an invalid webhook secret.');
        return res.status(401).json({ success: false, error: 'Unauthorized webhook request' });
      }
    }

    const payload = req.body;
    logger.info(`[SePay Webhook] Received payload: ${JSON.stringify(payload)}`);

    const content = payload.content || payload.description || '';
    const transferAmount = Number(payload.transferAmount) || 0;
    const refCode = payload.referenceCode || String(payload.id || '');

    const match = content.match(/ORD-[A-Za-z0-9-]+/i);
    if (!match) {
      logger.warn(`[SePay Webhook] Không tìm thấy mã đơn hàng trong nội dung: "${content}"`);
      return res.status(200).json({ success: true, message: 'No matching order code in content' });
    }

    const orderNumber = match[0].toUpperCase();
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { template: true },
    });

    if (!order) {
      logger.warn(`[SePay Webhook] Không tìm thấy đơn hàng với mã: ${orderNumber}`);
      return res.status(200).json({ success: true, message: `Order ${orderNumber} not found` });
    }

    if (order.status === 'COMPLETED') {
      logger.info(`[SePay Webhook] Đơn hàng ${orderNumber} đã hoàn tất trước đó.`);
      return res.status(200).json({ success: true, message: `Order ${orderNumber} already completed` });
    }

    if (order.amount && transferAmount > 0 && transferAmount < order.amount) {
      logger.warn(`[SePay Webhook] Số tiền chuyển ${transferAmount} nhỏ hơn giá trị đơn ${order.amount}`);
      await prisma.order.update({
        where: { id: order.id },
        data: { adminNotes: `SePay:${refCode} (Chuyển thiếu: ${transferAmount}/${order.amount} VND)` },
      });
      return res.status(200).json({ success: true, message: 'Partial payment received' });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'COMPLETED',
        transactionCode: `SEPAY_${refCode}`,
        paidAt: new Date(),
      },
    });

    // BUY_SOURCE / SOURCE_TEMPLATE orders do NOT provision a SaaS website
    const isSourcePurchase = (order as any).type === 'BUY_SOURCE' || (order as any).purchaseType === 'SOURCE_TEMPLATE';
    if (isSourcePurchase) {
      logger.info(`[SePay Webhook] Đơn mua source code ${orderNumber} — bỏ qua provisioning website SaaS.`);
      await prisma.order.update({
        where: { id: order.id },
        data: { fulfillmentStatus: 'NOT_REQUIRED' },
      });
      return res.status(200).json({ success: true, message: 'Source purchase completed, no provisioning needed' });
    }

    const candidateSubdomain = formatSiteSlug(order);
    const cleanSubdomain = candidateSubdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 45);

    let finalSubdomain = cleanSubdomain;
    const existingTenant = await prisma.tenant.findUnique({ where: { slug: finalSubdomain } });
    if (existingTenant) {
      finalSubdomain = `${cleanSubdomain}-${crypto.randomBytes(2).toString('hex').toLowerCase()}`;
    }

    const provResult = await websiteProvisioningService.createWebsiteFromTemplate({
      templateId: order.templateId,
      customerId: order.userId || undefined,
      customerEmail: order.email,
      customerFullName: order.fullName,
      customerPhone: order.phone,
      websiteName: `${order.fullName} Real Estate`,
      slug: finalSubdomain,
      plan: 'STARTER',
      amount: order.amount ?? undefined,
    });

    // Update order with provisioned tenant info
    await prisma.order.update({
      where: { id: order.id },
      data: {
        tenantId: provResult.tenant.id,
        subdomain: finalSubdomain,
        fulfillmentStatus: 'ACTIVE',
      },
    });

    logger.info(`[SePay Webhook] Đã tự động duyệt đơn ${orderNumber} và tạo Website Instance thành công: ${finalSubdomain}`);

    return res.status(200).json({
      success: true,
      message: 'Payment verified and website provisioned successfully',
      data: {
        orderNumber,
        tenantSlug: finalSubdomain,
        credentials: provResult.credentials,
      },
    });
  } catch (error) {
    logger.error(`[SePay Webhook] Error:`, error);
    return res.status(200).json({ success: false, error: 'Internal webhook error' });
  }
}

export async function getOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const rawOrderNo = (req.params.orderNumber || '').trim();
    const cleanOrd = decodeURIComponent(rawOrderNo).trim().replace(/\s+/g, '-');
    const userId = req.user?.userId;

    // Guest users (optionalAuthMiddleware) are allowed to view order status
    // by orderNumber — this supports the checkout success page polling.
    // Logged-in users can only see their own orders.

    let order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderNumber: rawOrderNo },
          { orderNumber: cleanOrd },
          { orderNumber: decodeURIComponent(rawOrderNo) },
        ],
      },
      include: { template: { select: { name: true, slug: true, thumbnail: true } } },
    });

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy đơn hàng' } });
    }

    // Repair legacy checkout records that were created without cookies.
    if (!order.userId && userId && req.user?.email?.trim().toLowerCase() === order.email.trim().toLowerCase()) {
      const repaired = await prisma.order.update({
        where: { id: order.id },
        data: { userId },
        include: { template: { select: { name: true, slug: true, thumbnail: true } } },
      });
      order = repaired;
      logger.info(`[OrderRepair] Đã gắn lại đơn ${order.orderNumber} cho tài khoản ${req.user?.email}`);
    }

    // Ownership check: logged-in users can only see their own orders.
    // Guest orders (no userId on order) are visible to anyone with the orderNumber.
    if (userId && req.user?.role !== 'SUPER_ADMIN' && order.userId && order.userId !== userId) {
      return res.status(404).json({ success: false, error: { code: 'ORDER_NOT_FOUND', message: 'Không tìm thấy đơn hàng' } });
    }


    let tenant = null;
    if (order.status === 'COMPLETED') {
      if (order.tenantId) {
        tenant = await prisma.tenant.findUnique({
          where: { id: order.tenantId },
        });
      }
      if (!tenant) {
        tenant = await prisma.tenant.findFirst({
          where: {
            OR: [
              { users: { some: { email: order.email } } },
              { memberships: { some: { user: { email: order.email } } } },
            ],
          },
          orderBy: { createdAt: 'desc' },
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        status: order.status,
        isCompleted: order.status === 'COMPLETED',
        amount: order.amount,
        fullName: order.fullName,
        email: order.email,
        phone: order.phone,
        note: order.note,
        type: order.type,
        subdomain: order.subdomain,
        createdAt: order.createdAt,
        tenantSlug: tenant?.slug,
        template: order.template,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function simulatePayment(req: Request, res: Response, next: NextFunction) {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy endpoint.' } });
    }

    const { orderNumber } = req.params;
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { template: true },
    });

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy đơn hàng' } });
    }

    if (order.status === 'COMPLETED') {
      return res.status(200).json({ success: true, message: 'Đơn hàng đã được thanh toán và kích hoạt trước đó.' });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'COMPLETED',
        transactionCode: `TEST_SANDBOX_${Date.now()}`,
        paidAt: new Date(),
      },
    });

    // BUY_SOURCE / SOURCE_TEMPLATE orders do NOT provision a SaaS website
    const isSourcePurchase = (order as any).type === 'BUY_SOURCE' || (order as any).purchaseType === 'SOURCE_TEMPLATE';
    if (isSourcePurchase) {
      await prisma.order.update({
        where: { id: order.id },
        data: { fulfillmentStatus: 'NOT_REQUIRED' },
      });
      return res.status(200).json({ success: true, message: 'Giả lập thanh toán mua source code thành công!' });
    }

    const slugifyBrand = (text: string) => {
      return (text || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    };

    const candidateSubdomain = formatSiteSlug(order);
    const cleanSubdomain = candidateSubdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 45);

    let finalSubdomain = cleanSubdomain;
    const existingTenant = await prisma.tenant.findUnique({ where: { slug: finalSubdomain } });
    if (existingTenant) {
      finalSubdomain = `${cleanSubdomain}-${crypto.randomBytes(2).toString('hex').toLowerCase()}`;
    }

    const provResult = await websiteProvisioningService.createWebsiteFromTemplate({
      templateId: order.templateId,
      customerId: order.userId || undefined,
      customerEmail: order.email,
      customerFullName: order.fullName,
      customerPhone: order.phone,
      websiteName: `${order.fullName} Real Estate`,
      slug: finalSubdomain,
      plan: 'STARTER',
    });

    // Update order with provisioned tenant info
    await prisma.order.update({
      where: { id: order.id },
      data: {
        tenantId: provResult.tenant.id,
        subdomain: finalSubdomain,
        fulfillmentStatus: 'ACTIVE',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Giả lập thanh toán thành công! Website đã được kích hoạt.',
      data: {
        orderNumber,
        tenantSlug: finalSubdomain,
        credentials: provResult.credentials,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập để xem đơn hàng.' },
      });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        template: {
          select: { name: true, slug: true, thumbnail: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
}

export async function createContactSubmission(req: Request, res: Response, next: NextFunction) {
  try {
    const data = contactSubmissionSchema.parse(req.body);

    let templateName = data.selectedTemplate || 'Mẫu BĐS Demo';
    if (data.selectedTemplate) {
      const tpl = await prisma.template.findFirst({
        where: { OR: [{ slug: data.selectedTemplate }, { name: data.selectedTemplate }] },
      });
      if (tpl) {
        templateName = tpl.name;
      }
    }

    // Build structured consultation summary note
    const summaryLines = [
      data.packageInterest ? `📦 Yêu cầu: ${data.packageInterest}` : '',
      data.message ? `💬 Lời nhắn: ${data.message}` : '',
    ].filter(Boolean).join(' | ') || (data.message || 'Khách đăng ký nhận tư vấn và bảng giá chi tiết');

    // Lưu trực tiếp vào Lead CRM với phạm vi PLATFORM (tenantId = null, không bị rò rỉ sang Tenant)
    const platformLead = await prisma.lead.create({
      data: {
        tenantId: null,
        scope: 'PLATFORM',
        ownerType: 'PLATFORM',
        fullName: data.fullName,
        email: data.email || null,
        phone: data.phone,
        status: 'NEW',
        source: 'MARKETPLACE',
        projectTitle: templateName,
        note: summaryLines,
        tags: ['Tư vấn Marketplace', 'Bảng giá', templateName],
      }
    });

    // 3. Notify Platform Admins
    try {
      const admins = await prisma.user.findMany({ where: { role: 'SUPER_ADMIN', isActive: true } });
      if (admins.length > 0) {
        await prisma.notification.createMany({
          data: admins.map((admin: any) => ({
            userId: admin.id,
            type: 'NEW_LEAD',
            title: '📩 Khách hàng tư vấn mới (Marketplace)',
            content: `${data.fullName} (${data.phone}) quan tâm "${templateName}". Yêu cầu: ${summaryLines}`,
            actionUrl: '/leads',
            entityType: 'Lead',
            entityId: platformLead.id,
          })),
        });
      }
    } catch (notifErr) {
      logger.warn(`Không thể tạo notification: ${(notifErr as Error).message}`);
    }

    logger.info(`Đã lưu khách tư vấn CRM: ${data.fullName} (${data.phone}) - ${templateName}`);

    // Return structured consultation dossier & summary report
    res.status(201).json({
      success: true,
      message: 'Yêu cầu tư vấn đã được tiếp nhận thành công. Chuyên viên sẽ liên hệ gửi bảng giá & tài liệu qua Zalo trong ít phút.',
      data: {
        dossier: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email || '',
          project: templateName,
          packageInterest: data.packageInterest || 'Bảng giá & Pháp lý',
          status: 'ĐÃ TIẾP NHẬN - CHUYỂN BỘ PHẬN KINH DOANH',
          timestamp: new Date().toISOString(),
        }
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.errors[0]?.message || 'Dữ liệu không hợp lệ.',
        },
      });
    }
    next(error);
  }
}

/**
 * Trigger yêu cầu đóng gói mã nguồn Single-Tenant cho đơn hàng Mua Đứt
 */
export async function requestExportPackage(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderNumber } = req.params;
    const userId = req.user?.userId;
    const userEmail = req.user?.email;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập để thực hiện.' },
      });
    }

    const result = await ExportJobService.requestExport(orderNumber, {
      userId,
      email: userEmail,
      role: userRole,
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: { code: 'EXPORT_REQUEST_FAILED', message: error.message || 'Lỗi khi yêu cầu đóng gói mã nguồn.' },
    });
  }
}

/**
 * Kiểm tra tiến trình đóng gói mã nguồn (Polling)
 */
export async function getExportPackageStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderNumber } = req.params;
    const userId = req.user?.userId;
    const userEmail = req.user?.email;
    const userRole = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập.' },
      });
    }

    const status = await ExportJobService.getExportStatus(orderNumber, {
      userId,
      email: userEmail,
      role: userRole,
    });

    return res.status(200).json({ success: true, data: status });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: { code: 'EXPORT_STATUS_FAILED', message: error.message || 'Lỗi khi kiểm tra tiến trình.' },
    });
  }
}

/**
 * Tải file ZIP mã nguồn Single-Tenant qua Signed Download Token
 */
export async function downloadExportByToken(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.params;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập.' } });
    }
    const fileInfo = await ExportJobService.getDownloadFileByToken(token, { userId, role: req.user?.role });

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(fileInfo.fileName)}"`);
    const fileStream = fs.createReadStream(fileInfo.filePath);
    fileStream.pipe(res);
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: { code: 'DOWNLOAD_FAILED', message: error.message || 'Không thể tải file mã nguồn.' },
    });
  }
}

/**
 * Lấy giỏ hàng đã lưu của người dùng đăng nhập
 */
export async function getUserCart(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(200).json({ success: true, data: [] });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            template: {
              select: {
                id: true,
                name: true,
                slug: true,
                thumbnail: true,
                priceBuy: true,
                priceRentMonthly: true,
                priceBuySource: true,
                shortDescription: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    const formattedItems = cart.items
      .filter((item: any) => item.template)
      .map((item: any) => ({
        template: {
          id: item.template.id,
          name: item.template.name,
          slug: item.template.slug,
          thumbnail: item.template.thumbnail || '',
          priceBuy: item.template.priceBuy || 499000,
          priceRentMonthly: item.template.priceRentMonthly || 199000,
          priceBuySource: item.template.priceBuySource || 1290000,
          shortDescription: item.template.shortDescription || '',
        },
        type: 'BUY' as const,
        subdomain: '',
        note: '',
      }));

    return res.status(200).json({ success: true, data: formattedItems });
  } catch (error) {
    next(error);
  }
}

/**
 * Đồng bộ / lưu giỏ hàng của người dùng vào database
 */
export async function syncUserCart(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập để đồng bộ giỏ hàng.' },
      });
    }

    const items = Array.isArray(req.body.items) ? req.body.items : [];

    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    // Delete existing items in cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    const validTemplateIds: string[] = [];

    for (const item of items) {
      const rawId = item?.template?.id || item?.template?.slug || item?.templateId || item?.slug || item?.id;
      if (!rawId) continue;

      const cleanSlug = String(rawId).replace(/^template-/, '').toLowerCase();
      const resolvedSlug = resolveTemplateAlias(rawId);

      const template = await prisma.template.findFirst({
        where: {
          OR: [
            { id: rawId },
            { id: `template-${cleanSlug}` },
            { id: `template-${resolvedSlug}` },
            { slug: rawId },
            { slug: cleanSlug },
            { slug: resolvedSlug },
          ],
        },
        select: { id: true },
      });

      if (template && !validTemplateIds.includes(template.id)) {
        validTemplateIds.push(template.id);
      }
    }

    if (validTemplateIds.length > 0) {
      await prisma.cartItem.createMany({
        data: validTemplateIds.map((templateId) => ({
          cartId: cart.id,
          templateId,
        })),
        skipDuplicates: true,
      });
    }

    // Return fresh updated items
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            template: {
              select: {
                id: true,
                name: true,
                slug: true,
                thumbnail: true,
                priceBuy: true,
                priceRentMonthly: true,
                priceBuySource: true,
                shortDescription: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const formattedItems = (updatedCart?.items || [])
      .filter((item: any) => item.template)
      .map((item: any) => ({
        template: {
          id: item.template.id,
          name: item.template.name,
          slug: item.template.slug,
          thumbnail: item.template.thumbnail || '',
          priceBuy: item.template.priceBuy || 499000,
          priceRentMonthly: item.template.priceRentMonthly || 199000,
          priceBuySource: item.template.priceBuySource || 1290000,
          shortDescription: item.template.shortDescription || '',
        },
        type: 'BUY' as const,
        subdomain: '',
        note: '',
      }));

    return res.status(200).json({ success: true, data: formattedItems });
  } catch (error) {
    next(error);
  }
}

export async function syncTenantContent(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderNumber, tenantId: rawTenantId, companyInfo, projects } = req.body;

    let tenantId = rawTenantId;
    if (!tenantId && orderNumber) {
      const ord = await prisma.order.findUnique({
        where: { orderNumber },
        select: { tenantId: true },
      });
      if (ord?.tenantId) {
        tenantId = ord.tenantId;
      }
    }

    if (!tenantId) {
      return res.status(400).json({
        success: false,
        error: { code: 'TENANT_NOT_FOUND', message: 'Không tìm thấy thông tin website/tenant để cập nhật.' },
      });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { id: true, slug: true },
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        error: { code: 'TENANT_NOT_FOUND', message: 'Website không tồn tại.' },
      });
    }

    // 1. Cập nhật CompanyInfo
    if (companyInfo && typeof companyInfo === 'object') {
      await prisma.companyInfo.upsert({
        where: { tenantId: tenant.id },
        create: {
          tenantId: tenant.id,
          name: companyInfo.name || undefined,
          slogan: companyInfo.slogan || undefined,
          phone: companyInfo.phone || undefined,
          hotline: companyInfo.phone || undefined,
          zalo: companyInfo.zalo || undefined,
          email: companyInfo.email || undefined,
          address: companyInfo.address || undefined,
          facebook: companyInfo.facebook || undefined,
          description: companyInfo.description || undefined,
        },
        update: {
          name: companyInfo.name || undefined,
          slogan: companyInfo.slogan || undefined,
          phone: companyInfo.phone || undefined,
          hotline: companyInfo.phone || undefined,
          zalo: companyInfo.zalo || undefined,
          email: companyInfo.email || undefined,
          address: companyInfo.address || undefined,
          facebook: companyInfo.facebook || undefined,
          description: companyInfo.description || undefined,
          updatedAt: new Date(),
        },
      });

      if (companyInfo.name) {
        await prisma.tenant.update({
          where: { id: tenant.id },
          data: { name: companyInfo.name },
        }).catch(() => {});
      }
    }

    // 2. Cập nhật các Projects nếu có
    if (Array.isArray(projects) && projects.length > 0) {
      for (const [idx, p] of projects.entries()) {
        const title = p.title || `Dự án #${idx + 1}`;
        const slug = p.slug || `du-an-${idx + 1}-${Date.now().toString().slice(-4)}`;
        const existingProj = await prisma.project.findFirst({
          where: {
            tenantId: tenant.id,
            OR: [
              ...(p.id && typeof p.id === 'string' ? [{ id: p.id }] : []),
              { title },
              { slug },
            ],
          },
        });

        if (existingProj) {
          await prisma.project.update({
            where: { id: existingProj.id },
            data: {
              title,
              price: p.price || existingProj.price,
              area: p.area || existingProj.area,
              address: p.address || existingProj.address,
              thumbnail: p.thumbnail || existingProj.thumbnail,
              images: Array.isArray(p.images) ? p.images : existingProj.images,
              amenities: Array.isArray(p.amenities) ? p.amenities : existingProj.amenities,
              description: p.description || existingProj.description,
            },
          }).catch(() => {});
        } else {
          await prisma.project.create({
            data: {
              tenantId: tenant.id,
              title,
              slug,
              price: p.price || 'Liên hệ',
              area: p.area || 'Đang cập nhật',
              address: p.address || 'Hà Nội',
              thumbnail: p.thumbnail || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
              images: Array.isArray(p.images) ? p.images : [],
              amenities: Array.isArray(p.amenities) ? p.amenities : [],
              description: p.description || '',
              published: true,
              publishedAt: new Date(),
            },
          }).catch(() => {});
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Đồng bộ nội dung website CMS thành công!',
      data: { tenantSlug: tenant.slug },
    });
  } catch (error) {
    next(error);
  }
}

