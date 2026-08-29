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

// Legacy development catalog
const LEGACY_MOCK_TEMPLATES = [
  { id: 'mock-1', name: 'Luxury Gold Style', slug: 'luxury-gold', shortDescription: 'Giao diện sang trọng phong cách vàng cao cấp', description: 'Website BĐS cao cấp với tông màu vàng sang trọng, phù hợp cho dự án hạng A.', thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'luxury', tags: ['luxury', 'gold', 'premium'], isActive: true, sortOrder: 1, isFeatured: true, templateConfig: null },
  { id: 'mock-2', name: 'Minimal White Style', slug: 'minimal-white', shortDescription: 'Thiết kế tối giản, hiện đại, sạch sẽ', description: 'Website BĐS với thiết kế tối giản, trắng tinh tế, phù hợp thương hiệu hiện đại.', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'minimal', tags: ['minimal', 'white', 'modern'], isActive: true, sortOrder: 2, isFeatured: true, templateConfig: null },
];

export async function getTemplates(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 16;
    const search = req.query.q as string || '';
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [templates, total] = await prisma.$transaction([
      prisma.template.findMany({ where, skip, take: limit, orderBy: { sortOrder: 'asc' } }),
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

    const cleanSlug = data.templateId.replace(/^template-/, '').toLowerCase();
    let template = await prisma.template.findFirst({
      where: {
        OR: [
          { id: data.templateId },
          { id: `template-${cleanSlug}` },
          { slug: data.templateId },
          { slug: cleanSlug },
        ],
      },
    });

    if (!template) {
      template = await prisma.template.findFirst({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      });
    }

    if (!template) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TEMPLATE_NOT_FOUND',
          message: 'Hệ thống chưa có mẫu website nào được kích hoạt. Vui lòng liên hệ Admin.',
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

    const order = await prisma.order.create({
      data: {
        orderNumber,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        type: data.type,
        status: 'PENDING',
        templateId: template.id,
        amount,
        subdomain: normalizedSubdomain || null,
        note: data.note,
        userId: (req as any).user?.userId || null,
      },
    });
    logger.info(`Đã tạo đơn hàng ${orderNumber} - ${amount} VNĐ`);

    try {
      const admins = await prisma.user.findMany({ where: { role: 'SUPER_ADMIN', isActive: true } });
      if (admins.length > 0) {
        await prisma.notification.createMany({
          data: admins.map((admin: any) => ({
            userId: admin.id,
            title: `📦 Đơn hàng mới #${orderNumber}`,
            content: `${data.fullName} (${data.phone}) vừa đặt ${data.type === 'BUY' ? 'mua' : 'thuê'} template "${template.name}". Số tiền: ${amount?.toLocaleString('vi-VN')}đ.`,
          })),
        });
      }
    } catch (notifErr) {
      logger.warn(`Không thể tạo notification cho admin: ${(notifErr as Error).message}`);
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
    const userEmail = req.user?.email;
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
      data: {
        totalCustomers: 500 + totalTenants,
        totalWebsitesCreated: 1200 + completedOrders,
        totalTemplates: Math.max(16, totalTemplates),
        averageRating: 4.9,
      },
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

    const targetSlug = tpl?.slug || cleanSlug;
    const userEmail = req.user?.email;

    const paidOrder = await prisma.order.findFirst({
      where: {
        OR: [
          ...(userId ? [{ userId }] : []),
          ...(userEmail ? [{ email: userEmail }] : []),
        ],
        ...(tpl ? { templateId: tpl.id } : {}),
        type: { in: ['BUY', 'BUY_SOURCE'] },
        status: 'COMPLETED',
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

    if (transferAmount > 0 && transferAmount < order.amount) {
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

    const candidateSubdomain = order.subdomain || order.phone.replace(/[^a-zA-Z0-9]/g, '') || `site-${Date.now().toString().slice(-6)}`;
    const cleanSubdomain = candidateSubdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);

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
      amount: order.amount,
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
    const { orderNumber } = req.params;
    const userId = req.user?.userId;
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { template: { select: { name: true, slug: true, thumbnail: true } } },
    });

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy đơn hàng' } });
    }

    if (req.user?.role !== 'SUPER_ADMIN' && order.userId !== userId) {
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

    const slugifyBrand = (text: string) => {
      return (text || '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    };

    let candidateSubdomain = order.subdomain;
    if (!candidateSubdomain || candidateSubdomain.trim() === '') {
      const brandSlug = slugifyBrand(order.fullName || '');
      candidateSubdomain = brandSlug ? `${brandSlug}-land` : `bds-${Date.now().toString().slice(-6)}`;
    }

    const cleanSubdomain = candidateSubdomain.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);

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

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
    const orderNumber = `CTT-${dateStr}-${randomHex}`;

    let templateId: string | null = null;
    let templateName = data.selectedTemplate || 'Chưa chọn';
    if (data.selectedTemplate) {
      const tpl = await prisma.template.findFirst({
        where: { OR: [{ slug: data.selectedTemplate }, { name: data.selectedTemplate }] },
      });
      if (tpl) {
        templateId = tpl.id;
        templateName = tpl.name;
      }
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        fullName: data.fullName,
        email: data.email || '',
        phone: data.phone,
        type: 'BUY',
        status: 'PENDING',
        templateId: templateId || (await prisma.template.findFirst({ where: { isActive: true } }))?.id || '',
        amount: 0,
        note: `[LIÊN HỆ TƯ VẤN] Gói: ${data.packageInterest || 'Chưa chọn'}. ${data.message || ''}`.trim(),
      },
    });

    try {
      const admins = await prisma.user.findMany({ where: { role: 'SUPER_ADMIN', isActive: true } });
      if (admins.length > 0) {
        await prisma.notification.createMany({
          data: admins.map((admin: any) => ({
            userId: admin.id,
            title: '📩 Yêu cầu tư vấn mới',
            content: `${data.fullName} (${data.phone}) quan tâm template "${templateName}"${data.packageInterest ? `, gói: ${data.packageInterest}` : ''}. Liên hệ ngay!`,
          })),
        });
      }
    } catch (notifErr) {
      logger.warn(`Không thể tạo notification: ${(notifErr as Error).message}`);
    }

    logger.info(`Liên hệ tư vấn ${orderNumber} - ${data.fullName} (${data.phone})`);

    res.status(201).json({
      success: true,
      data: { orderNumber: order.orderNumber, message: 'Yêu cầu tư vấn đã được ghi nhận. Đội ngũ sẽ liên hệ bạn sớm nhất.' },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu không hợp lệ.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}
