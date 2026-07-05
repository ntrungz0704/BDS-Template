import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { z } from 'zod';
import { logger } from '../index';
import crypto from 'crypto';

// Định nghĩa schemas Zod validation
const createOrderSchema = z.object({
  templateId: z.string().cuid('ID Template không hợp lệ.'),
  type: z.enum(['BUY', 'RENT']),
  fullName: z.string().min(2, 'Họ và tên tối thiểu phải có 2 ký tự.'),
  email: z.string().email('Định dạng email không hợp lệ.'),
  phone: z.string().min(10, 'Số điện thoại tối thiểu phải từ 10 số.'),
  subdomain: z.string().optional(),
  note: z.string().optional(),
});

const uploadPaymentSchema = z.object({
  transactionCode: z.string().min(3, 'Mã giao dịch tối thiểu 3 ký tự.'),
  billImageUrl: z.string().url('URL ảnh hóa đơn không hợp lệ.'),
});

export async function getTemplates(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
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
      prisma.template.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.template.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: templates,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
        error: {
          code: 'TEMPLATE_NOT_FOUND',
          message: 'Không tìm thấy thông tin Template giao diện này.',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: template,
    });
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
        message: 'Thiếu tham số subdomain slug cần kiểm tra.',
      },
    });
  }

  // Chuẩn hóa slug
  const normalizedSlug = slug.toLowerCase().trim();
  
  // Kiểm tra blacklist subdomains hệ thống
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

    // 1. Kiểm tra template tồn tại
    const template = await prisma.template.findUnique({
      where: { id: data.templateId },
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'TEMPLATE_NOT_FOUND',
          message: 'Template giao diện được chọn không tồn tại.',
        },
      });
    }

    // 2. Nếu là đơn thuê (RENT), kiểm tra subdomain
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
            message: 'Tên miền này đã có người đăng ký, vui lòng chọn tên khác.',
          },
        });
      }
    }

    // 3. Tính toán số tiền thanh toán tương ứng
    const amount = data.type === 'BUY' 
      ? (template.priceBuy || 3900000) 
      : (template.priceRentMonthly || 399000);

    // 4. Sinh mã đơn hàng duy nhất ORD-YYYYMMDD-XXXX
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
    const orderNumber = `ORD-${dateStr}-${randomHex}`;

    // 5. Tạo đơn hàng PENDING trong DB
    const order = await prisma.order.create({
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

    logger.info(`Đã tạo đơn hàng mới: ${orderNumber} - Số tiền: ${amount} VNĐ`);

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

    if (order.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'ORDER_NOT_PENDING',
          message: 'Đơn hàng này không còn ở trạng thái chờ thanh toán.',
        },
      });
    }

    // Kiểm tra xem transactionCode này đã bị đơn hàng khác sử dụng chưa (Unique check)
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

    // Cập nhật trạng thái đơn hàng sang WAITING_CONFIRM và đính kèm bằng chứng
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
