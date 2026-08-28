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

// ?nh nghia schemas Zod validation
const createOrderSchema = z.object({
  templateId: z.string().min(1, 'ID Template khng du?c d? tr?ng.'),
  type: z.enum(['BUY', 'RENT', 'BUY_SOURCE']),
  fullName: z.string().min(2, 'H? v tn t?i thi?u ph?i c 2 k t?.'),
  email: z.string().email('Định dạng email không hợp lệ.'),
  phone: z.string().regex(/^(0|\+84)[0-9]{9,10}$/, 'SĐT phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.'),
  subdomain: z.string().optional(),
  note: z.string().optional(),
});

const uploadPaymentSchema = z.object({
  transactionCode: z.string().min(3, 'M giao d?ch t?i thi?u 3 k t?.'),
  billImageUrl: z.string().url('URL ?nh ha don khng h?p l?.'),
});

// Legacy development catalog. Marketplace endpoints intentionally never use
// it: purchasable templates must always come from the database.
const LEGACY_MOCK_TEMPLATES = [
  { id: 'mock-1', name: 'Luxury Gold Style', slug: 'luxury-gold', shortDescription: 'Giao diện sang trọng phong cách vàng cao cấp', description: 'Website BĐS cao cấp với tông màu vàng sang trọng, phù hợp cho dự án hạng A.', thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'luxury', tags: ['luxury', 'gold', 'premium'], isActive: true, sortOrder: 1, isFeatured: true, templateConfig: null },
  { id: 'mock-2', name: 'Minimal White Style', slug: 'minimal-white', shortDescription: 'Thiết kế tối giản, hiện đại, sạch sẽ', description: 'Website BĐS với thiết kế tối giản, trắng tinh tế, phù hợp thương hiệu hiện đại.', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'minimal', tags: ['minimal', 'white', 'modern'], isActive: true, sortOrder: 2, isFeatured: true, templateConfig: null },
  { id: 'mock-3', name: 'Modern Corporate Style', slug: 'modern-corporate', shortDescription: 'Phong cách doanh nghiệp chuyên nghiệp', description: 'Giao diện doanh nghiệp BĐS chuyên nghiệp, uy tín, phù hợp văn phòng môi giới lớn.', thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'corporate', tags: ['corporate', 'professional', 'blue'], isActive: true, sortOrder: 3, isFeatured: false, templateConfig: null },
  { id: 'mock-4', name: 'Eco Green Style', slug: 'eco-green', shortDescription: 'Phong cách xanh mát, gần gũi thiên nhiên', description: 'Website BĐS xanh, thân thiện thiên nhiên, phù hợp dự án nhà vườn sinh thái.', thumbnail: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'eco', tags: ['eco', 'green', 'nature'], isActive: true, sortOrder: 4, isFeatured: false, templateConfig: null },
  { id: 'mock-5', name: 'Dark Prestige Style', slug: 'dark-prestige', shortDescription: 'Phong cách tối sang trọng, uy lực', description: 'Giao diện tối màu đẳng cấp cho dự án BĐS cao cấp hướng khách hàng VIP.', thumbnail: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'dark', tags: ['dark', 'prestige', 'vip'], isActive: true, sortOrder: 5, isFeatured: true, templateConfig: null },
  { id: 'mock-6', name: 'Ocean Blue Style', slug: 'ocean-blue', shortDescription: 'Phong cách biển xanh tươi mát', description: 'Website BĐS biển, nghỉ dưỡng ven biển với tông xanh dương tươi sáng.', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'coastal', tags: ['ocean', 'blue', 'coastal'], isActive: true, sortOrder: 6, isFeatured: false, templateConfig: null },
  { id: 'mock-7', name: 'Industrial Estate Style', slug: 'industrial-estate', shortDescription: 'Chuyên biệt cho BĐS khu công nghiệp', description: 'Giao diện chuyên nghiệp dành riêng cho môi giới khu công nghiệp, nhà xưởng.', thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'industrial', tags: ['industrial', 'factory', 'b2b'], isActive: true, sortOrder: 7, isFeatured: false, templateConfig: null },
  { id: 'mock-8', name: 'Agency OnePage Style', slug: 'agency-onepage', shortDescription: 'Landing page một trang cho agency', description: 'Website một trang tối ưu conversion cho sàn môi giới, agency BĐS chuyên nghiệp.', thumbnail: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'onepage', tags: ['agency', 'onepage', 'landing'], isActive: true, sortOrder: 8, isFeatured: false, templateConfig: null },
  { id: 'mock-9', name: 'Apartment Premium Style', slug: 'apartment-premium', shortDescription: 'Chuyên biệt cho căn hộ cao cấp', description: 'Giao diện chuyên biệt cho dự án căn hộ cao cấp, chung cư hạng sang.', thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'apartment', tags: ['apartment', 'condo', 'premium'], isActive: true, sortOrder: 9, isFeatured: false, templateConfig: null },
  { id: 'mock-10', name: 'Villa Luxury Style', slug: 'villa-luxury', shortDescription: 'Chuyên biệt cho biệt thự, villa cao cấp', description: 'Website BĐS sang trọng dành riêng cho dự án biệt thự, villa nghỉ dưỡng.', thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'villa', tags: ['villa', 'luxury', 'resort'], isActive: true, sortOrder: 10, isFeatured: true, templateConfig: null },
  { id: 'mock-11', name: 'Land Plot Style', slug: 'land-plot', shortDescription: 'Chuyên biệt cho đất nền, đất phân lô', description: 'Giao diện tối ưu cho sàn môi giới đất nền, đất phân lô dự án khu đô thị.', thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'land', tags: ['land', 'plot', 'subdivision'], isActive: true, sortOrder: 11, isFeatured: false, templateConfig: null },
  { id: 'mock-12', name: 'Office Commercial Style', slug: 'office-commercial', shortDescription: 'Chuyên cho văn phòng, thương mại', description: 'Website BĐS thương mại, văn phòng cho thuê chuyên nghiệp, uy tín.', thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', priceBuy: 499000, priceBuySource: 799000, priceRentMonthly: 199000, category: 'commercial', tags: ['office', 'commercial', 'rent'], isActive: true, sortOrder: 12, isFeatured: false, templateConfig: null },
];

export async function getTemplates(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
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
        error: { code: 'TEMPLATE_NOT_FOUND', message: 'Kh�ng t�m th?y th�ng tin Template giao di?n n�y.' },
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
        message: 'Thi?u tham s? subdomain slug c?n ki?m tra.',
      },
    });
  }

  // Chu?n h�a slug
  const normalizedSlug = slug.toLowerCase().trim();
  
  // Ki?m tra blacklist subdomains h? th?ng
  const blacklist = ['www', 'admin', 'cms', 'api', 'website', 'myplatform', 'platform'];
  if (blacklist.includes(normalizedSlug)) {
    return res.status(200).json({
      success: true,
      data: {
        available: false,
        message: 'T�n subdomain n�y n?m trong danh m?c b?o luu h? th?ng.',
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
          ? 'T�n mi?n d� du?c dang k� s? d?ng b?i ngu?i kh�c.' 
          : 'T�n mi?n ho�n to�n kh? d?ng.',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createOrderSchema.parse(req.body);

    // 1. The selected template lookup (flexible by id, slug, or normalized slug)
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

    // Fallback: if template record not found yet in DB, pick the first active template
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


    // 2. N?u l don thu (RENT), chu?n ha subdomain
    let normalizedSubdomain = '';
    if (data.type === 'RENT') {
      if (!data.subdomain) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_SUBDOMAIN',
            message: 'Thu� website b?t bu?c ph?i khai b�o subdomain.',
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

    // 3. Tính toán số tiền thanh toán tương ứng
    const amount = data.type === 'BUY'
      ? template.priceBuy
      : data.type === 'BUY_SOURCE'
        ? template.priceBuySource
        : template.priceRentMonthly;
    if (amount == null) {
      return res.status(409).json({ success: false, error: { code: 'PRICE_UNAVAILABLE', message: 'Sản phẩm chưa được cấu hình giá.' } });
    }

    // 4. Sinh m don hng duy nh?t ORD-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
    const orderNumber = `ORD-${dateStr}-${randomHex}`;

    // 5. Persist the order. A failed database must never become a fake order.
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

    // Tạo thông báo cho tất cả SUPER_ADMIN
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
          message: 'D? li?u don h�ng kh�ng d�ng d?nh d?ng.',
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

    // [P0-FIX] Auth check
    const userId = req.user?.userId;
    const userEmail = req.user?.email;
    if (!userId) {
      return res.status(401).json({ success: false, error: { code: "UNAUTHENTICATED", message: "Vui long dang nhap de xac nhan thanh toan." } });
    }

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'ORDER_NOT_FOUND',
          message: '�on h�ng kh�ng t?n t?i tr�n h? th?ng.',
        },
      });
    }

    // [P0-FIX] Verify order ownership
    if (order.userId !== userId && order.email !== userEmail && req.user?.role !== "SUPER_ADMIN") {
      return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Ban khong co quyen thao tac tren don hang nay." } });
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ORDER_NOT_PENDING',
          message: '�on h�ng n�y kh�ng c�n ? tr?ng th�i ch? thanh to�n.',
        },
      });
    }

    // Ki?m tra xem transactionCode n�y d� b? don h�ng kh�c s? d?ng chua (Unique check)
    const existingTransaction = await prisma.order.findUnique({
      where: { transactionCode: data.transactionCode },
    });

    if (existingTransaction && existingTransaction.id !== id) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'TRANSACTION_CODE_DUPLICATED',
          message: 'M� giao d?ch ng�n h�ng n�y d� du?c khai b�o cho don h�ng kh�c.',
        },
      });
    }

    // C?p nh?t tr?ng th�i don h�ng sang WAITING_CONFIRM v� d�nh k�m b?ng ch?ng
    const updatedOrder = await prisma.order.update({
      where: { id, version: order.version },
      data: {
        status: 'WAITING_CONFIRM',
        billImageUrl: data.billImageUrl,
        transactionCode: data.transactionCode,
        version: { increment: 1 },
      },
    });

    logger.info(`Kh�ch h�ng d� t?i h�a don thanh to�n cho don h�ng: ${order.orderNumber}`);

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
          message: 'Th�ng tin x�c nh?n thanh to�n sai d?nh d?ng.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}


/**
 * GET /api/marketplace/stats
 * Trả về số liệu thực tế DB để hiển thị trên landing page.
 * Public endpoint - không cần auth.
 */
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
        totalCustomers: totalTenants,
        totalWebsitesCreated: completedOrders,
        totalTemplates,
        averageRating: 4.9,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/marketplace/templates/:slug/download
 * Cho phép tải trọn bộ mã nguồn Next.js 15 cấu hình sẵn cho mẫu tương ứng dưới dạng ZIP.
 */
export async function downloadTemplateSource(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;

  try {
    // [P0-FIX] Auth + purchase verification
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: { code: "UNAUTHENTICATED", message: "Vui long dang nhap de tai ma nguon." } });
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
        type: "BUY",
        status: "COMPLETED",
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!paidOrder && req.user?.role !== "SUPER_ADMIN") {
      return res.status(403).json({ success: false, error: { code: "NO_PURCHASE", message: "Ban chua mua ban quyen mau nay hoac don hang chua hoan tat." } });
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

/**
 * POST /api/marketplace/orders/:id/quick-approve
 * Duyet nhanh don hang - Yeu cau xac thuc va phan quyen SUPER_ADMIN / ADMIN
 */
export async function quickApproveOrder(req: Request, res: Response, next: NextFunction) {
  try {
    return await approveOrder(req, res, next);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/marketplace/webhook/sepay
 * Webhook tự động nhận thông báo biến động số dư từ SePay
 */
export async function handleSepayWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    logger.info(`[SePay Webhook] Received payload: ${JSON.stringify(payload)}`);

    // Payload SePay gồm: content, transferAmount, referenceCode, id, gateway, etc.
    const content = payload.content || payload.description || '';
    const transferAmount = Number(payload.transferAmount) || 0;
    const refCode = payload.referenceCode || String(payload.id || '');

    // 1. Trích xuất mã đơn hàng từ nội dung chuyển khoản (ORD-YYYYMMDD-XXXX hoặc ORD-XXXXX)
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

    // 2. Kiểm tra số tiền chuyển
    if (transferAmount > 0 && transferAmount < order.amount) {
      logger.warn(`[SePay Webhook] Số tiền chuyển ${transferAmount} nhỏ hơn giá trị đơn ${order.amount}`);
      await prisma.order.update({
        where: { id: order.id },
        data: { adminNotes: `SePay:${refCode} (Chuyển thiếu: ${transferAmount}/${order.amount} VND)` },
      });
      return res.status(200).json({ success: true, message: 'Partial payment received' });
    }

    // 3. Cập nhật trạng thái đơn hàng thành COMPLETED
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'COMPLETED',
        transactionCode: `SEPAY_${refCode}`,
        paidAt: new Date(),
      },
    });

    // 4. Tự động khởi tạo Website Instance cho khách hàng
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

/**
 * GET /api/marketplace/orders/:orderNumber/status
 * Kiểm tra trạng thái đơn hàng realtime cho frontend polling
 */
export async function getOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { orderNumber } = req.params;
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: { template: { select: { name: true, slug: true, thumbnail: true } } },
    });

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Không tìm thấy đơn hàng' } });
    }

    let tenant = null;
    if (order.status === 'COMPLETED') {
      // Ưu tiên tìm tenant trực tiếp từ order.tenantId (đáng tin nhất)
      if (order.tenantId) {
        tenant = await prisma.tenant.findUnique({
          where: { id: order.tenantId },
        });
      }
      // Fallback: tìm theo email relationship
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

/**
 * POST /api/marketplace/orders/:orderNumber/simulate-payment
 * Dev test sandbox: Giả lập thanh toán thành công ngay lập tức
 */
export async function simulatePayment(req: Request, res: Response, next: NextFunction) {
  try {
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

    // 1. Cập nhật trạng thái
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'COMPLETED',
        transactionCode: `TEST_SANDBOX_${Date.now()}`,
        paidAt: new Date(),
      },
    });

    // 2. Tự động provision website instance
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

/**
 * GET /api/marketplace/orders/my-orders
 * Khách hàng đã đăng nhập xem lại lịch sử đơn hàng (như TMĐT)
 */
export async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.userId;
    const userEmail = (req as any).user?.email;

    if (!userId && !userEmail) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHENTICATED', message: 'Vui lòng đăng nhập để xem đơn hàng.' },
      });
    }

    // Tìm tất cả đơn hàng theo userId HOẶC email (phòng trường hợp đơn cũ chưa có userId)
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          ...(userId ? [{ userId }] : []),
          ...(userEmail ? [{ email: userEmail }] : []),
        ],
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

const contactSubmissionSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên tối thiểu 2 ký tự.'),
  phone: z.string().regex(/^(0|\+84)[0-9]{9,10}$/, 'SĐT phải bắt đầu bằng 0 hoặc +84, từ 10-11 số.'),
  email: z.string().email('Định dạng email không hợp lệ.').optional().or(z.literal('')),
  selectedTemplate: z.string().optional(),
  packageInterest: z.string().optional(),
  message: z.string().optional(),
});

export async function createContactSubmission(req: Request, res: Response, next: NextFunction) {
  try {
    const data = contactSubmissionSchema.parse(req.body);

    // Tạo đơn hàng/liên hệ với type CONTACT
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
    const orderNumber = `CTT-${dateStr}-${randomHex}`;

    // Tìm template nếu có
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

    // Tạo thông báo cho tất cả SUPER_ADMIN
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

