import { Request, Response } from 'express';
import { mediaService } from './media.service';

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    const tenantId = (req as any).tenantId || req.headers['x-tenant-id'] as string;
    if (!tenantId) {
      return res.status(400).json({ success: false, message: 'Missing Tenant context' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Safety checks: File extension & mimeType validation
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

    const filename = req.file.originalname;
    const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
    const mimeType = req.file.mimetype;

    if (!allowedMimeTypes.includes(mimeType) || !allowedExtensions.includes(ext)) {
      return res.status(400).json({
        success: false,
        message: 'Hệ thống chỉ hỗ trợ các định dạng hình ảnh, video và văn bản văn phòng cơ bản.',
      });
    }

    if (mimeType.includes('svg') || filename.toLowerCase().endsWith('.svg')) {
      return res.status(400).json({
        success: false,
        message: 'Hệ thống không cho phép tải lên file định dạng SVG vì lý do an toàn bảo mật.',
      });
    }

    // Validate size limits per file category (5MB image, 50MB video, 10MB document)
    const size = req.file.size;
    if (mimeType.startsWith('image/')) {
      if (size > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: 'Kích thước ảnh vượt quá giới hạn cho phép (tối đa 5MB).',
        });
      }
    } else if (mimeType.startsWith('video/')) {
      if (size > 50 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: 'Kích thước video vượt quá giới hạn cho phép (tối đa 50MB).',
        });
      }
    } else {
      if (size > 10 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: 'Kích thước tài liệu vượt quá giới hạn cho phép (tối đa 10MB).',
        });
      }
    }

    const { folderId, crop, rotate, flip } = req.body;
    
    let options = undefined;
    if (crop || rotate || flip) {
      options = {
        crop: crop ? JSON.parse(crop) : undefined,
        rotate: rotate ? parseInt(rotate, 10) : undefined,
        flip: flip === 'true',
      };
    }

    const asset = await mediaService.uploadImageAsync(tenantId, req.file, folderId, options);
    
    res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMedia = async (req: Request, res: Response) => {
  try {
    const tenantId = (req as any).tenantId || req.headers['x-tenant-id'] as string;
    if (!tenantId) {
      return res.status(400).json({ success: false, message: 'Missing Tenant context' });
    }

    const { folderId } = req.query;
    const data = await mediaService.getMedia(tenantId, folderId as string);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const tenantId = (req as any).tenantId || req.headers['x-tenant-id'] as string;
    if (!tenantId) {
      return res.status(400).json({ success: false, message: 'Missing Tenant context' });
    }

    const { id } = req.params;
    const { force } = req.query;

    await mediaService.deleteMedia(tenantId, id, force === 'true');

    res.status(200).json({
      success: true,
      message: 'Media deleted successfully',
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  try {
    const tenantId = (req as any).tenantId || req.headers['x-tenant-id'] as string;
    if (!tenantId) {
      return res.status(400).json({ success: false, message: 'Missing Tenant context' });
    }

    const { name, parentId } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Folder name is required' });
    }

    const folder = await mediaService.createFolder(tenantId, name, parentId);

    res.status(201).json({
      success: true,
      data: folder,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
