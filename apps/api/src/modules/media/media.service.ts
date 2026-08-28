import { prisma } from '@repo/database';
import { processAndSaveImage, ImageProcessingOptions } from '../../utils/image-processor';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), '../../uploads');

import { imageProcessingQueue } from '../../config/queue.config';
import crypto from 'crypto';

export class MediaService {
  /**
   * Upload and process an image asynchronously via BullMQ
   */
  async uploadImageAsync(
    tenantId: string,
    file: Express.Multer.File,
    folderId?: string,
    options?: ImageProcessingOptions
  ) {
    const tempFileName = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${file.originalname}`;
    const tempDir = path.join(UPLOADS_DIR, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    const tempFilePath = path.join(tempDir, tempFileName);
    
    // Save buffer to temp file for worker to read
    await fs.promises.writeFile(tempFilePath, file.buffer);

    // Create DB entry with PENDING status
    // NOTE: Cast to any because processingStatus field was added to schema but
    // prisma generate hasn't been run yet in dev — resolves after `prisma generate`
    const asset = await prisma.mediaAsset.create({
      data: {
        tenantId,
        folderId: folderId || null,
        url: '', // Will be updated by worker
        type: 'IMAGE',
        size: file.size,
        format: file.mimetype.split('/')[1] || 'unknown',
        name: file.originalname,
        alt: file.originalname.split('.')[0],
        processingStatus: 'PENDING',
      } as any,
    });

    // Add Job to Queue
    const jobResult = await imageProcessingQueue.add('process-image', {
      tenantId,
      mediaAssetId: asset.id,
      originalFilePath: tempFilePath,
      originalFileName: file.originalname,
      options,
    });

    if (jobResult === null) {
      // Redis is offline! Let's process the image synchronously right now!
      try {
        console.log(`[Media Service] Redis offline. Processing asset ${asset.id} synchronously...`);
        const processed = await processAndSaveImage(file.buffer, file.originalname, tenantId, options);
        
        const finalAsset = await prisma.mediaAsset.update({
          where: { id: asset.id },
          data: {
            url: processed.original.url,
            thumbnailUrl: processed.thumbnail.url,
            mediumUrl: processed.medium.url,
            largeUrl: processed.large.url,
            size: processed.original.size,
            format: processed.original.format,
            width: processed.original.width,
            height: processed.original.height,
            processingStatus: 'COMPLETED'
          } as any
        });

        // Xóa file temp
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }

        return finalAsset;
      } catch (syncErr) {
        console.error('[Media Service] Sync processing failed:', syncErr);
        await prisma.mediaAsset.update({
          where: { id: asset.id },
          data: { processingStatus: 'FAILED' } as any
        });
      }
    }

    return asset;
  }

  /**
   * Get all media for a tenant (with optional folder filtering)
   */
  async getMedia(tenantId: string, folderId?: string) {
    const assets = await prisma.mediaAsset.findMany({
      where: {
        tenantId,
        folderId: folderId || null,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        usages: true,
      },
    });

    const folders = await prisma.mediaFolder.findMany({
      where: {
        tenantId,
        parentId: folderId || null,
      },
      orderBy: { sortOrder: 'asc' },
    });

    return { assets, folders };
  }

  /**
   * Delete an image
   */
  async deleteMedia(tenantId: string, mediaId: string, force: boolean = false) {
    const asset = await prisma.mediaAsset.findUnique({
      where: { id: mediaId, tenantId },
      include: { usages: true },
    });

    if (!asset) {
      throw new Error('Media not found');
    }

    if (asset.usages.length > 0 && !force) {
      throw new Error(`Cannot delete image. It is currently used in ${asset.usages.length} places.`);
    }

    // Delete from DB
    await prisma.mediaAsset.delete({ where: { id: mediaId } });

    // Try to delete physical files
    try {
      const urls = [asset.url, asset.thumbnailUrl, asset.mediumUrl, asset.largeUrl].filter(Boolean) as string[];
      for (const url of urls) {
        // url is like /uploads/tenantId/filename.webp
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        const filePath = path.join(UPLOADS_DIR, tenantId, filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (err) {
      console.error('Error deleting physical files:', err);
    }

    return true;
  }

  /**
   * Create a folder
   */
  async createFolder(tenantId: string, name: string, parentId?: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return prisma.mediaFolder.create({
      data: {
        tenantId,
        name,
        slug,
        parentId: parentId || null,
      },
    });
  }
}

export const mediaService = new MediaService();

