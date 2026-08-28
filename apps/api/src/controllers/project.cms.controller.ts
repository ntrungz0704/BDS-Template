import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { z } from 'zod';
import { logger } from '../index';

function formatPriceHelper(from?: number | null, to?: number | null, overridePrice?: string): string {
  if (overridePrice) return overridePrice;
  if (!from && !to) return 'Liên hệ';
  
  const formatSingle = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)} Tỷ`;
    }
    return `${val} Triệu`;
  };

  if (from && to && from !== to) {
    return `${formatSingle(from)} - ${formatSingle(to)}`;
  }
  
  if (from) return `${formatSingle(from)}`;
  if (to) return `${formatSingle(to)}`;
  
  return 'Liên hệ';
}

// Định nghĩa Zod validation và Coercion tự động cho các dữ liệu số/JSON
const projectSchema = z.object({
  title: z.string().min(2, 'Tiêu đề dự án tối thiểu 2 ký tự.'),
  slug: z.string().min(2, 'Slug không được để trống.'),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  type: z.enum(['APARTMENT', 'VILLA', 'TOWNHOUSE', 'LAND', 'COMMERCIAL', 'OFFICE']),
  status: z.enum(['COMING_SOON', 'SELLING', 'SOLD_OUT']),
  price: z.string().optional(),
  priceFrom: z.coerce.number().optional(),
  priceTo: z.coerce.number().optional(),
  area: z.string().optional(),
  areaFrom: z.coerce.number().optional(),
  areaTo: z.coerce.number().optional(),
  address: z.string().optional(),
  ward: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  amenities: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  thumbnail: z.string().optional(),
  featured: z.coerce.boolean().optional().default(false),
  published: z.coerce.boolean().optional().default(true),
});


export async function getProjects(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId; // Lấy từ checkTenantAccess middleware
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không thể định danh Tenant.' } });

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.q as string || '';
    const type = req.query.type as string;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      deletedAt: null, // Chỉ lấy các dự án chưa bị soft deleted
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

    // Trả về dữ liệu bọc chuẩn API Contract
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

export async function getProjectDetail(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const project = await prisma.project.findFirst({
      where: { id, tenantId, deletedAt: null },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROJECT_NOT_FOUND',
          message: 'Không tìm thấy thông tin dự án bất động sản này.',
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

export async function createProject(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không thể định danh Tenant.' } });

  try {
    const data = projectSchema.parse(req.body);

    // Kiểm tra trùng lặp slug trong cùng 1 Tenant
    const existingProject = await prisma.project.findFirst({
      where: { tenantId, slug: data.slug, deletedAt: null },
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'SLUG_DUPLICATED',
          message: 'Đường dẫn slug này đã được sử dụng cho một dự án khác.',
        },
      });
    }

    const project = await prisma.project.create({
      data: {
        tenantId,
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        type: data.type,
        status: data.status,
        price: data.price || formatPriceHelper(data.priceFrom, data.priceTo),
        priceFrom: data.priceFrom ? BigInt(data.priceFrom) : null,
        priceTo: data.priceTo ? BigInt(data.priceTo) : null,
        area: data.area,
        areaFrom: data.areaFrom || null,
        areaTo: data.areaTo || null,
        address: data.address,
        ward: data.ward,
        district: data.district,
        city: data.city,
        amenities: data.amenities,
        images: data.images,
        thumbnail: data.thumbnail,
        featured: data.featured,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
      },
    });

    // Tạo Audit Log
    await prisma.auditLog.create({
      data: {
        userId: req.user?.userId,
        tenantId,
        action: 'CREATE_PROJECT',
        entityType: 'Project',
        entityId: project.id,
        newValues: project as any,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu dự án gửi lên không đúng định dạng.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}

export async function updateProject(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const data = projectSchema.parse(req.body);
    const clientVersion = parseInt(req.body.version);

    if (isNaN(clientVersion)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_VERSION',
          message: 'Yêu cầu tham số version để cập nhật dữ liệu (Optimistic Locking).',
        },
      });
    }

    // 1. Kiểm tra sự tồn tại của dự án
    const project = await prisma.project.findFirst({
      where: { id, tenantId, deletedAt: null },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROJECT_NOT_FOUND',
          message: 'Không tìm thấy dự án bất động sản cần cập nhật.',
        },
      });
    }

    // 2. Kiểm tra xung đột version (Optimistic Locking)
    if (project.version !== clientVersion) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'DB_CONFLICT',
          message: 'Dữ liệu đã được cập nhật bởi một Admin khác. Vui lòng tải lại trang.',
        },
      });
    }

    // 3. Thực hiện cập nhật tăng version lên 1 đơn vị
    const updatedProject = await prisma.project.update({
      where: { id, version: project.version },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        type: data.type,
        status: data.status,
        price: data.price || formatPriceHelper(data.priceFrom, data.priceTo),
        priceFrom: data.priceFrom ? BigInt(data.priceFrom) : null,
        priceTo: data.priceTo ? BigInt(data.priceTo) : null,
        area: data.area,
        areaFrom: data.areaFrom || null,
        areaTo: data.areaTo || null,
        address: data.address,
        ward: data.ward,
        district: data.district,
        city: data.city,
        amenities: data.amenities,
        images: data.images,
        thumbnail: data.thumbnail,
        featured: data.featured,
        published: data.published,
        publishedAt: data.published ? (project.publishedAt || new Date()) : null,
        version: { increment: 1 },
      },
    });

    // Ghi Audit Log hành động cập nhật
    await prisma.auditLog.create({
      data: {
        userId: req.user?.userId,
        tenantId,
        action: 'UPDATE_PROJECT',
        entityType: 'Project',
        entityId: project.id,
        oldValues: project as any,
        newValues: updatedProject as any,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu cập nhật sai cấu trúc.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const project = await prisma.project.findFirst({
      where: { id, tenantId, deletedAt: null },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'PROJECT_NOT_FOUND',
          message: 'Không tìm thấy dự án bất động sản để xóa.',
        },
      });
    }

    // Thực hiện SOFT DELETE: chỉ ghi nhận deletedAt
    const deletedProject = await prisma.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        version: { increment: 1 },
      },
    });

    // Ghi Audit Log hành động xóa mềm
    await prisma.auditLog.create({
      data: {
        userId: req.user?.userId,
        tenantId,
        action: 'DELETE_PROJECT_SOFT',
        entityType: 'Project',
        entityId: project.id,
        oldValues: { id: project.id, title: project.title },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(200).json({
      success: true,
      data: {
        message: 'Xóa dự án bất động sản thành công.',
      },
    });
  } catch (error) {
    next(error);
  }
}

