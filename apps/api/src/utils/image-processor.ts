import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Local storage path for testing, ideally use S3 in production
const UPLOADS_DIR = path.join(process.cwd(), '../../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export interface ImageProcessingOptions {
  crop?: { left: number; top: number; width: number; height: number };
  rotate?: number;
  flip?: boolean;
}

export interface ProcessedImages {
  original: { url: string; size: number; width: number; height: number; format: string };
  thumbnail: { url: string; size: number; width: number; height: number; format: string };
  medium: { url: string; size: number; width: number; height: number; format: string };
  large: { url: string; size: number; width: number; height: number; format: string };
}

export async function processAndSaveImage(
  buffer: Buffer,
  filename: string,
  tenantId: string,
  options?: ImageProcessingOptions
): Promise<ProcessedImages> {
  const tenantDir = path.join(UPLOADS_DIR, tenantId);
  if (!fs.existsSync(tenantDir)) {
    fs.mkdirSync(tenantDir, { recursive: true });
  }

  const baseFilename = path.parse(filename).name.replace(/[^a-zA-Z0-9_-]/g, '_');
  const apiBase = (process.env.PUBLIC_API_URL || process.env.API_URL || 'https://bds-template-api.onrender.com').replace(/\/$/, '');
  const generatePath = (suffix: string) => path.join(tenantDir, `${baseFilename}-${suffix}.webp`);
  const generateUrl = (suffix: string) => `${apiBase}/uploads/${tenantId}/${baseFilename}-${suffix}.webp`;

  try {
    let pipeline = sharp(buffer);

    // Apply user transformations if provided
    if (options) {
      if (options.rotate) pipeline = pipeline.rotate(options.rotate);
      if (options.flip) pipeline = pipeline.flip();
      if (options.crop) {
        pipeline = pipeline.extract({
          left: Math.round(options.crop.left),
          top: Math.round(options.crop.top),
          width: Math.round(options.crop.width),
          height: Math.round(options.crop.height),
        });
      }
    }

    // Convert everything to WebP to save space
    pipeline = pipeline.webp({ quality: 80 });

    // 1. Original
    const originalBuffer = await pipeline.clone().resize({ width: 2560, withoutEnlargement: true }).toBuffer();
    const originalMeta = await sharp(originalBuffer).metadata();
    fs.writeFileSync(generatePath('original'), originalBuffer);

    // 2. Large (1600px)
    const largeBuffer = await pipeline.clone().resize({ width: 1600, withoutEnlargement: true }).toBuffer();
    const largeMeta = await sharp(largeBuffer).metadata();
    fs.writeFileSync(generatePath('large'), largeBuffer);

    // 3. Medium (800px)
    const mediumBuffer = await pipeline.clone().resize({ width: 800, withoutEnlargement: true }).toBuffer();
    const mediumMeta = await sharp(mediumBuffer).metadata();
    fs.writeFileSync(generatePath('medium'), mediumBuffer);

    // 4. Thumbnail (400px)
    const thumbBuffer = await pipeline.clone().resize({ width: 400, withoutEnlargement: true }).toBuffer();
    const thumbMeta = await sharp(thumbBuffer).metadata();
    fs.writeFileSync(generatePath('thumbnail'), thumbBuffer);

    return {
      original: {
        url: generateUrl('original'),
        size: originalBuffer.length,
        width: originalMeta.width || 0,
        height: originalMeta.height || 0,
        format: 'webp',
      },
      large: {
        url: generateUrl('large'),
        size: largeBuffer.length,
        width: largeMeta.width || 0,
        height: largeMeta.height || 0,
        format: 'webp',
      },
      medium: {
        url: generateUrl('medium'),
        size: mediumBuffer.length,
        width: mediumMeta.width || 0,
        height: mediumMeta.height || 0,
        format: 'webp',
      },
      thumbnail: {
        url: generateUrl('thumbnail'),
        size: thumbBuffer.length,
        width: thumbMeta.width || 0,
        height: thumbMeta.height || 0,
        format: 'webp',
      },
    };
  } catch (err) {
    // Fallback: save buffer directly as original extension
    const ext = path.extname(filename) || '.jpg';
    const directFileName = `${baseFilename}${ext}`;
    const directPath = path.join(tenantDir, directFileName);
    fs.writeFileSync(directPath, buffer);
    const directUrl = `/uploads/${tenantId}/${directFileName}`;

    return {
      original: { url: directUrl, size: buffer.length, width: 800, height: 600, format: ext.replace('.', '') },
      large: { url: directUrl, size: buffer.length, width: 800, height: 600, format: ext.replace('.', '') },
      medium: { url: directUrl, size: buffer.length, width: 800, height: 600, format: ext.replace('.', '') },
      thumbnail: { url: directUrl, size: buffer.length, width: 800, height: 600, format: ext.replace('.', '') },
    };
  }
}

