import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { z } from 'zod';
import { logger } from '../index';

const contactFormSchema = z.zod.object({
  fullName: z.zod.string().min(2, 'Họ và tên tối thiểu 2 ký tự.'),
  email: z.zod.string().email('Định dạng email không hợp lệ.'),
  phone: z.zod.string().min(10, 'Số điện thoại tối thiểu 10 số.'),
  message: z.zod.string().min(5, 'Lời nhắn tối thiểu từ 5 ký tự.'),
  source: z.zod.string().optional(),
});

export async function getCompanyInfo(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;

  try {
    const company = await prisma.companyInfo.findUnique({
      where: { tenantId },
      include: {
        tenant: {
          select: {
            colorTheme: true,
            templateId: true,
            status: true,
          },
        },
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'COMPANY_NOT_FOUND',
          message: 'Không tìm thấy thông tin giới thiệu của công ty.',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPublicProjects(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.q as string || '';
    const type = req.query.type as any;
    const status = req.query.status as any;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      published: true, // Bắt buộc phải là dự án đã xuất bản
      deletedAt: null,  // Không lấy dự án đã xóa mềm
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(type && { type }),
      ...(status && { status }),
    };

    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.project.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: projects,
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

export async function getPublicProjectDetail(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  const tenantId = req.tenantId;

  try {
    const project = await prisma.project.findFirst({
      where: { tenantId, slug, published: true, deletedAt: null },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROJECT_NOT_FOUND',
          message: 'Không tìm thấy hoặc dự án chưa được xuất bản.',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPublicPosts(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const where = {
      tenantId,
      published: true,
      deletedAt: null,
    };

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.post.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: posts,
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

export async function getPublicPostDetail(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  const tenantId = req.tenantId;

  try {
    const post = await prisma.post.findFirst({
      where: { tenantId, slug, published: true, deletedAt: null },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Bài viết không tồn tại hoặc đã bị ẩn.',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

export async function submitContactForm(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không thể định danh Tenant.' } });

  try {
    const data = contactFormSchema.parse(req.body);

    const submission = await prisma.contactFormSubmission.create({
      data: {
        tenantId,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: data.source || 'website_contact_page',
      },
    });

    logger.info(`Nhận form liên hệ mới từ khách hàng ${data.fullName} tại Website Tenant ID ${tenantId}`);

    res.status(201).json({
      success: true,
      data: {
        id: submission.id,
        message: 'Gửi thông tin đăng ký tư vấn thành công. Chúng tôi sẽ liên hệ lại sớm nhất!',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu gửi lên không đúng định dạng.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}
