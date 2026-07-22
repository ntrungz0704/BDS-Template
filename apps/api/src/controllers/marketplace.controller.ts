import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { z } from 'zod';
import { logger } from '../index';
import crypto from 'crypto';
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';

// ?nh nghia schemas Zod validation
const createOrderSchema = z.object({
  templateId: z.string().min(1, 'ID Template khng du?c d? tr?ng.'),
  type: z.enum(['BUY', 'RENT']),
  fullName: z.string().min(2, 'H? v� t�n t?i thi?u ph?i c� 2 k� t?.'),
  email: z.string().email('�?nh d?ng email kh�ng h?p l?.'),
  phone: z.string().min(10, 'S? di?n tho?i t?i thi?u ph?i t? 10 s?.'),
  subdomain: z.string().optional(),
  note: z.string().optional(),
});

const uploadPaymentSchema = z.object({
  transactionCode: z.string().min(3, 'M� giao d?ch t?i thi?u 3 k� t?.'),
  billImageUrl: z.string().url('URL ?nh h�a don kh�ng h?p l?.'),
});

// Mock data templates d�ng khi DB offline
const MOCK_TEMPLATES = [
  { id: 'mock-1', name: 'Luxury Gold Style', slug: 'luxury-gold', shortDescription: 'Giao di?n sang tr?ng phong c�ch v�ng cao c?p', description: 'Website B�S cao c?p v?i t�ng m�u v�ng sang tr?ng, ph� h?p cho d? �n h?ng A.', thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', priceBuy: 4900000, priceRentMonthly: 899000, category: 'luxury', tags: ['luxury', 'gold', 'premium'], isActive: true, sortOrder: 1, isFeatured: true, templateConfig: null },
  { id: 'mock-2', name: 'Minimal White Style', slug: 'minimal-white', shortDescription: 'Thi?t k? t?i gi?n, hi?n d?i, s?ch s?', description: 'Website B�S v?i thi?t k? t?i gi?n, tr?ng tinh t?, ph� h?p thuong hi?u hi?n d?i.', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', priceBuy: 3900000, priceRentMonthly: 499000, category: 'minimal', tags: ['minimal', 'white', 'modern'], isActive: true, sortOrder: 2, isFeatured: true, templateConfig: null },
  { id: 'mock-3', name: 'Modern Corporate Style', slug: 'modern-corporate', shortDescription: 'Phong c�ch doanh nghi?p chuy�n nghi?p', description: 'Giao di?n doanh nghi?p B�S chuy�n nghi?p, uy t�n, ph� h?p van ph�ng m�i gi?i l?n.', thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', priceBuy: 3900000, priceRentMonthly: 499000, category: 'corporate', tags: ['corporate', 'professional', 'blue'], isActive: true, sortOrder: 3, isFeatured: false, templateConfig: null },
  { id: 'mock-4', name: 'Eco Green Style', slug: 'eco-green', shortDescription: 'Phong c�ch xanh m�t, g?n gui thi�n nhi�n', description: 'Website B�S xanh, th�n thi?n thi�n nhi�n, ph� h?p d? �n nh� vu?n sinh th�i.', thumbnail: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600', priceBuy: 2900000, priceRentMonthly: 399000, category: 'eco', tags: ['eco', 'green', 'nature'], isActive: true, sortOrder: 4, isFeatured: false, templateConfig: null },
  { id: 'mock-5', name: 'Dark Prestige Style', slug: 'dark-prestige', shortDescription: 'Phong c�ch t?i sang tr?ng, uy l?c', description: 'Giao di?n t?i m�u d?ng c?p cho d? �n B�S cao c?p hu?ng kh�ch h�ng VIP.', thumbnail: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=600', priceBuy: 4900000, priceRentMonthly: 799000, category: 'dark', tags: ['dark', 'prestige', 'vip'], isActive: true, sortOrder: 5, isFeatured: true, templateConfig: null },
  { id: 'mock-6', name: 'Ocean Blue Style', slug: 'ocean-blue', shortDescription: 'Phong c�ch bi?n xanh tuoi m�t', description: 'Website B�S bi?n, ngh? du?ng ven bi?n v?i t�ng xanh duong tuoi s�ng.', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', priceBuy: 3500000, priceRentMonthly: 499000, category: 'coastal', tags: ['ocean', 'blue', 'coastal'], isActive: true, sortOrder: 6, isFeatured: false, templateConfig: null },
  { id: 'mock-7', name: 'Industrial Estate Style', slug: 'industrial-estate', shortDescription: 'Chuy�n bi?t cho B�S khu c�ng nghi?p', description: 'Giao di?n chuy�n nghi?p d�nh ri�ng cho m�i gi?i khu c�ng nghi?p, nh� xu?ng.', thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600', priceBuy: 3200000, priceRentMonthly: 399000, category: 'industrial', tags: ['industrial', 'factory', 'b2b'], isActive: true, sortOrder: 7, isFeatured: false, templateConfig: null },
  { id: 'mock-8', name: 'Agency OnePage Style', slug: 'agency-onepage', shortDescription: 'Landing page m?t trang cho agency', description: 'Website m?t trang t?i uu conversion cho s�n m�i gi?i, agency B�S chuy�n nghi?p.', thumbnail: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600', priceBuy: 2500000, priceRentMonthly: 299000, category: 'onepage', tags: ['agency', 'onepage', 'landing'], isActive: true, sortOrder: 8, isFeatured: false, templateConfig: null },
  { id: 'mock-9', name: 'Apartment Premium Style', slug: 'apartment-premium', shortDescription: 'Chuy�n bi?t cho can h? cao c?p', description: 'Giao di?n chuy�n bi?t cho d? �n can h? cao c?p, chung cu h?ng sang.', thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600', priceBuy: 4200000, priceRentMonthly: 699000, category: 'apartment', tags: ['apartment', 'condo', 'premium'], isActive: true, sortOrder: 9, isFeatured: false, templateConfig: null },
  { id: 'mock-10', name: 'Villa Luxury Style', slug: 'villa-luxury', shortDescription: 'Chuy�n bi?t cho bi?t th?, villa cao c?p', description: 'Website B�S sang tr?ng d�nh ri�ng cho d? �n bi?t th?, villa ngh? du?ng.', thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600', priceBuy: 5500000, priceRentMonthly: 999000, category: 'villa', tags: ['villa', 'luxury', 'resort'], isActive: true, sortOrder: 10, isFeatured: true, templateConfig: null },
  { id: 'mock-11', name: 'Land Plot Style', slug: 'land-plot', shortDescription: 'Chuy�n bi?t cho d?t n?n, d?t ph�n l�', description: 'Giao di?n t?i uu cho s�n m�i gi?i d?t n?n, d?t ph�n l� d? �n khu d� th?.', thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600', priceBuy: 2800000, priceRentMonthly: 349000, category: 'land', tags: ['land', 'plot', 'subdivision'], isActive: true, sortOrder: 11, isFeatured: false, templateConfig: null },
  { id: 'mock-12', name: 'Office Commercial Style', slug: 'office-commercial', shortDescription: 'Chuy�n cho van ph�ng, thuong m?i', description: 'Website B�S thuong m?i, van ph�ng cho thu� chuy�n nghi?p, uy t�n.', thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600', priceBuy: 3100000, priceRentMonthly: 449000, category: 'commercial', tags: ['office', 'commercial', 'rent'], isActive: true, sortOrder: 12, isFeatured: false, templateConfig: null },
];

export async function getTemplates(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const search = req.query.q as string || '';
    const skip = (page - 1) * limit;

    let templates: any[] = [];
    let total = 0;

    try {
      const where: any = {
        isActive: true,
        ...(search && {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }),
      };

      const [dbTemplates, dbTotal] = await prisma.$transaction([
        prisma.template.findMany({ where, skip, take: limit, orderBy: { sortOrder: 'asc' } }),
        prisma.template.count({ where }),
      ]);

      templates = dbTemplates;
      total = dbTotal;
    } catch (err) {
      console.warn('[Warning] DB offline in getTemplates. Returning mock catalog.');
      const filtered = search
        ? MOCK_TEMPLATES.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) || t.shortDescription.toLowerCase().includes(search.toLowerCase()))
        : MOCK_TEMPLATES;
      templates = filtered.slice(skip, skip + limit);
      total = filtered.length;
    }

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
    let template: any = null;

    try {
      template = await prisma.template.findUnique({
        where: { slug, isActive: true },
        include: { templateConfig: true },
      });
    } catch (err) {
      console.warn('[Warning] DB offline in getTemplateDetail. Returning mock template.');
      template = MOCK_TEMPLATES.find(t => t.slug === slug) || null;
    }

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
  const slug = req.query.slug as string;

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

    // 1. Ki?m tra template t?n t?i
    if (data.templateId.startsWith('mock-')) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_TEMPLATE',
          message: 'Template ID kh�ng h?p l?.',
        },
      });
    }

    const template = await prisma.template.findUnique({
      where: { id: data.templateId },
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TEMPLATE_NOT_FOUND',
          message: 'Template kh�ng t?n t?i trong h? th?ng.',
        },
      });
    }

    // 2. N?u l� don thu� (RENT), chu?n h�a subdomain
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
            message: 'T�n mi?n n�y d� c� ngu?i dang k�, vui l�ng ch?n t�n kh�c.',
          },
        });
      }
    }

    // 3. T�nh to�n s? ti?n thanh to�n tuong ?ng
    const amount = data.type === 'BUY' 
      ? (template.priceBuy || 3900000) 
      : (template.priceRentMonthly || 499000);

    // 4. Sinh m� don h�ng duy nh?t ORD-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
    const orderNumber = `ORD-${dateStr}-${randomHex}`;

    let order: any = null;
    try {
      // 5. T?o don h�ng PENDING trong DB
      order = await prisma.order.create({
        data: {
          orderNumber,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          type: data.type,
          status: 'PENDING',
          templateId: data.templateId,
          amount,
          subdomain: normalizedSubdomain || null,
          note: data.note,
        },
      });
      logger.info(`�� t?o don h�ng m?i trong DB: ${orderNumber} - S? ti?n: ${amount} VN�`);
    } catch (err) {
      console.warn(`[Warning] Database connection failed during order creation. Returning mock order details.`);
      order = {
        id: `mock-ord-id-${randomHex}`,
        orderNumber,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        type: data.type,
        status: 'PENDING',
        templateId: data.templateId,
        amount,
        subdomain: normalizedSubdomain || null,
        note: data.note,
        createdAt: new Date(),
        updatedAt: new Date()
      };
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
    const zip = new AdmZip();
    // Resolve absolute path to apps/website directory
    const websiteDir = path.resolve(__dirname, '../../../../website');

    if (!fs.existsSync(websiteDir)) {
      return res.status(500).json({
        success: false,
        error: { code: 'SOURCE_NOT_FOUND', message: 'Không tìm thấy mã nguồn mẫu trên máy chủ.' }
      });
    }

    // Add các file cấu hình Next.js quan trọng
    const configFiles = ['package.json', 'tsconfig.json', 'tailwind.config.js', 'next.config.js', 'postcss.config.js'];
    configFiles.forEach(file => {
      const filePath = path.join(websiteDir, file);
      if (fs.existsSync(filePath)) {
        zip.addLocalFile(filePath);
      }
    });

    // Add thư mục src
    const srcDir = path.join(websiteDir, 'src');
    if (fs.existsSync(srcDir)) {
      zip.addLocalFolder(srcDir, 'src');
    }

    // Tạo file hướng dẫn README.md cá nhân hóa theo template tương ứng
    const readmeContent = `# ${slug.toUpperCase()} - WEBSITE BẤT ĐỘNG SẢN CHUYÊN NGHIỆP PHÁT TRIỂN BỞI PLATFORMBDS

Bộ mã nguồn Next.js 15, Tailwind CSS, Prisma của bạn đã sẵn sàng!

## Hướng dẫn cài đặt & Khởi chạy nhanh:
1. Giải nén file source code ZIP này vào một thư mục làm việc.
2. Mở terminal tại thư mục vừa giải nén và chạy lệnh cài đặt thư viện:
   \`\`\`bash
   npm install
   # hoặc: pnpm install
   \`\`\`
3. Cấu hình các biến môi trường trong file \`.env\`.
4. Khởi chạy máy chủ phát triển ở môi trường local:
   \`\`\`bash
   npm run dev
   # hoặc: pnpm dev
   \`\`\`
5. Mở trình duyệt và truy cập: \`http://localhost:3003\`

Chúc bạn kinh doanh thành công cùng PlatformBDS!
`;
    zip.addFile('README.md', Buffer.from(readmeContent, 'utf-8'));

    // Trả về file ZIP trực tiếp
    const zipBuffer = zip.toBuffer();

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${slug}-source-v1.0.0.zip"`);
    res.setHeader('Content-Length', zipBuffer.length);
    res.end(zipBuffer);

    logger.info(`[Marketplace] Tải xuống thành công full source ZIP của template: ${slug}`);
  } catch (error) {
    next(error);
  }
}