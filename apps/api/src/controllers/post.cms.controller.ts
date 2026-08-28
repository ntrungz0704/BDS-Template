import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { z } from 'zod';
import { slugify } from '@repo/utils';
import { logger } from '../index';

const postSchema = z.object({
  title: z.string().min(3, 'Tiêu đề bài viết tối thiểu 3 ký tự.'),
  content: z.string().optional(),
  summary: z.string().optional(),
  thumbnail: z.string().optional(),
  categoryId: z.string().optional(),
  published: z.coerce.boolean().optional().default(true),
  tagNames: z.array(z.string()).optional().default([]),
});


export async function getPosts(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không thể định danh Tenant.' } });

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.q as string || '';
    const categoryId = req.query.categoryId as string;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      deletedAt: null,
      ...(search && {
        title: { contains: search, mode: 'insensitive' },
      }),
      ...(categoryId && { categoryId }),
    };

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        include: { category: true, tags: true },
        orderBy: { createdAt: 'desc' },
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

export async function getPostDetail(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const post = await prisma.post.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { category: true, tags: true },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Không tìm thấy bài viết này.',
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

export async function createPost(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không thể định danh Tenant.' } });

  try {
    const data = postSchema.parse(req.body);
    const generatedSlug = slugify(data.title);

    // Kiểm tra trùng slug
    const existingPost = await prisma.post.findFirst({
      where: { tenantId, slug: generatedSlug, deletedAt: null },
    });

    if (existingPost) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'SLUG_DUPLICATED',
          message: 'Tên tiêu đề bài viết tạo ra slug đã tồn tại, vui lòng đổi tiêu đề.',
        },
      });
    }

    // Xử lý tạo Tags (kết nối N:M)
    const tagConnectOrCreate = data.tagNames.map((name) => {
      const tagSlug = slugify(name);
      return {
        where: { tenantId_slug: { tenantId: tenantId as string, slug: tagSlug } },
        create: { tenantId: tenantId as string, name, slug: tagSlug },
      };
    });

    const post = await prisma.post.create({
      data: {
        tenantId,
        title: data.title,
        slug: generatedSlug,
        content: data.content,
        summary: data.summary,
        thumbnail: data.thumbnail,
        categoryId: data.categoryId || null,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
        tags: {
          connectOrCreate: tagConnectOrCreate,
        },
      },
      include: { tags: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user?.userId,
        tenantId,
        action: 'CREATE_POST',
        entityType: 'Post',
        entityId: post.id,
        newValues: post as any,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dữ liệu bài viết không hợp lệ.',
          details: error.errors,
        },
      });
    }
    next(error);
  }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const data = postSchema.parse(req.body);
    const clientVersion = parseInt(req.body.version);

    if (isNaN(clientVersion)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'MISSING_VERSION',
          message: 'Thiếu version để cập nhật dữ liệu (Optimistic Locking).',
        },
      });
    }

    const post = await prisma.post.findFirst({
      where: { id, tenantId, deletedAt: null },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Không tìm thấy bài viết cần cập nhật.',
        },
      });
    }

    if (post.version !== clientVersion) {
      return res.status(409).json({
        success: false,
        error: {
          code: 'DB_CONFLICT',
          message: 'Dữ liệu đã bị thay đổi bởi Admin khác. Vui lòng tải lại trang.',
        },
      });
    }

    const generatedSlug = slugify(data.title);

    // Xử lý tạo/kết nối Tags
    const tagConnectOrCreate = data.tagNames.map((name) => {
      const tagSlug = slugify(name);
      return {
        where: { tenantId_slug: { tenantId: tenantId as string, slug: tagSlug } },
        create: { tenantId: tenantId as string, name, slug: tagSlug },
      };
    });

    // Cập nhật bài viết
    const updatedPost = await prisma.post.update({
      where: { id, version: post.version },
      data: {
        title: data.title,
        slug: generatedSlug,
        content: data.content,
        summary: data.summary,
        thumbnail: data.thumbnail,
        categoryId: data.categoryId || null,
        published: data.published,
        publishedAt: data.published ? (post.publishedAt || new Date()) : null,
        tags: {
          set: [], // Clear old tags
          connectOrCreate: tagConnectOrCreate,
        },
        version: { increment: 1 },
      },
      include: { tags: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user?.userId,
        tenantId,
        action: 'UPDATE_POST',
        entityType: 'Post',
        entityId: post.id,
        oldValues: post as any,
        newValues: updatedPost as any,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(200).json({
      success: true,
      data: updatedPost,
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

export async function deletePost(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const post = await prisma.post.findFirst({
      where: { id, tenantId, deletedAt: null },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'POST_NOT_FOUND',
          message: 'Không tìm thấy bài viết để xóa.',
        },
      });
    }

    // SOFT DELETE bài viết
    await prisma.post.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        version: { increment: 1 },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: req.user?.userId,
        tenantId,
        action: 'DELETE_POST_SOFT',
        entityType: 'Post',
        entityId: post.id,
        oldValues: { id: post.id, title: post.title },
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(200).json({
      success: true,
      data: {
        message: 'Xóa bài viết thành công.',
      },
    });
  } catch (error) {
    next(error);
  }
}

