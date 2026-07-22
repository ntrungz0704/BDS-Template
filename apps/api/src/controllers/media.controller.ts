import { Request, Response, NextFunction } from 'express';
import { prisma } from '@repo/database';
import { SYSTEM_CONFIG } from '@repo/config';
import { logger } from '../index';
import crypto from 'crypto';
import { fromBuffer } from 'file-type';
import sharp from 'sharp';

// Vì Cloudinary SDK yêu cầu nạp config, tôi viết helper sinh signature đơn giản
export function getCloudinarySignature(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không tìm thấy thông tin Tenant.' } });

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'your-api-secret';
    const apiKey = process.env.CLOUDINARY_API_KEY || 'your-api-key';
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'your-cloud-name';

    // Chuỗi ký số đơn giản cho Cloudinary upload signature
    // Validate and enforce tenant prefix constraint for Cloudinary upload folder signature
    const folder = `tenant_${tenantId}`;
    if (!folder.startsWith('tenant_') || folder.includes('..') || folder.includes('/')) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_FOLDER_STRUCTURE', message: 'Tên thư mục không hợp lệ.' } });
    }

    const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(signatureStr).digest('hex');

    res.status(200).json({
      success: true,
      data: {
        signature,
        timestamp,
        apiKey,
        cloudName,
        folder,
      },
    });
  } catch (error) {
    next(error);
  }
}

// API xử lý ghi nhận file upload (Sau khi Client upload thành công lên Cloudinary)
export async function registerMedia(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.tenantId;
  if (!tenantId) return res.status(400).json({ success: false, error: { code: 'MISSING_TENANT_CONTEXT', message: 'Không tìm thấy thông tin Tenant.' } });

  // Nhận dữ liệu truyền lên
  const { filename, url, publicId, mimeType, fileSize, width, height } = req.body;

  if (!filename || !url || !publicId || !mimeType || !fileSize) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'MISSING_FIELDS',
        message: 'Thiếu thông tin chi tiết của file media.',
      },
    });
  }

  // Validate mime type and file extension safety bounds (images, videos, basic document formats)
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/mpeg', 'video/quicktime',
    'application/pdf', 'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  const allowedExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp',
    '.mp4', '.mpeg', '.mov',
    '.pdf', '.doc', '.docx', '.xls', '.xlsx'
  ];

  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();

  if (!allowedMimeTypes.includes(mimeType) || !allowedExtensions.includes(ext)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'UNSUPPORTED_FILE_TYPE',
        message: 'Hệ thống chỉ hỗ trợ các định dạng hình ảnh, video và văn bản văn phòng cơ bản.',
      },
    });
  }

  // Cấm file SVG do rủi ro Stored XSS
  if (mimeType.includes('svg') || filename.toLowerCase().endsWith('.svg')) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'SVG_FORBIDDEN',
        message: 'Hệ thống không cho phép tải lên file định dạng SVG vì lý do an toàn bảo mật.',
      },
    });
  }

  // Validate the URL format and verify Cloudinary folder matches the active tenant prefix
  const targetFolder = `tenant_${tenantId}`;
  if (!url.includes(targetFolder)) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_MEDIA_URL',
        message: 'URL tệp phương tiện không thuộc thư mục lưu trữ được phân cấp cho tài khoản của bạn.',
      },
    });
  }

  try {
    // THỰC HIỆN TRANSACTION KIỂM TRA QUOTA UPLOAD CHỐNG RACE CONDITION (SELECT FOR UPDATE)
    const media = await prisma.$transaction(async (tx: any) => {
      // 1. Khóa hàng Tenant để ngăn luồng ghi đồng thời
      const tenants = await tx.$queryRaw<any[]>`
        SELECT * FROM "tenants" 
        WHERE id = ${tenantId} 
        FOR UPDATE
      `;

      if (tenants.length === 0) {
        throw new Error('Tenant không tồn tại.');
      }

      const tenant = tenants[0];
      const newUsedBytes = Number(tenant.upload_used_bytes) + Number(fileSize);

      // 2. Chặn nếu vượt quota 500MB
      if (newUsedBytes > SYSTEM_CONFIG.UPLOAD_LIMIT_BYTES) {
        throw new Error('LIMIT_EXCEEDED');
      }

      // 3. Cập nhật dung lượng quota mới của Tenant
      await tx.tenant.update({
        where: { id: tenantId },
        data: {
          uploadUsedBytes: newUsedBytes,
          version: { increment: 1 },
        },
      });

      // 4. Tạo bản ghi file Media mới
      return await tx.media.create({
        data: {
          tenantId,
          filename,
          url,
          publicId,
          mimeType,
          fileSize: parseInt(fileSize),
          width: width ? parseInt(width) : null,
          height: height ? parseInt(height) : null,
        },
      });
    });

    res.status(201).json({
      success: true,
      data: media,
    });
  } catch (error: any) {
    if (error.message === 'LIMIT_EXCEEDED') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'UPLOAD_LIMIT_EXCEEDED',
          message: 'Tài khoản của bạn đã sử dụng vượt quá hạn mức lưu trữ 500MB. Vui lòng dọn dẹp hoặc nâng cấp gói.',
        },
      });
    }
    next(error);
  }
}

// Xóa file Media và trừ dung lượng Quota của Tenant tương ứng
export async function deleteMedia(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const tenantId = req.tenantId;

  try {
    const media = await prisma.media.findFirst({
      where: { id, tenantId, deletedAt: null },
    });

    if (!media) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'MEDIA_NOT_FOUND',
          message: 'Không tìm thấy file phương tiện để xóa.',
        },
      });
    }

    // Chạy transaction cập nhật dung lượng quota và xóa mềm file
    await prisma.$transaction(async (tx: any) => {
      // 1. SELECT ... FOR UPDATE khóa Tenant
      const tenants = await tx.$queryRaw<any[]>`
        SELECT * FROM "tenants" 
        WHERE id = ${tenantId} 
        FOR UPDATE
      `;

      if (tenants.length > 0) {
        const tenant = tenants[0];
        const newUsedBytes = Math.max(0, Number(tenant.upload_used_bytes) - media.fileSize);
        
        // Cập nhật lại dung lượng
        await tx.tenant.update({
          where: { id: tenantId },
          data: {
            uploadUsedBytes: newUsedBytes,
            version: { increment: 1 },
          },
        });
      }

      // 2. Đánh dấu xóa mềm file Media
      await tx.media.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    });

    logger.info(`Đã xóa file media ID ${id} của Tenant ID ${tenantId}`);

    res.status(200).json({
      success: true,
      data: {
        message: 'Đã xóa file phương tiện thành công.',
      },
    });
  } catch (error) {
    next(error);
  }
}
