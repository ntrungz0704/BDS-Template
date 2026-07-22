import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export interface IStorageProvider {
  /**
   * Upload a file and return its public URL
   */
  upload(buffer: Buffer, fileName: string, mimeType: string, tenantId: string): Promise<{ url: string; key: string }>;
  
  /**
   * Delete a file
   */
  delete(key: string, tenantId: string): Promise<boolean>;
}

// 1. LOCAL STORAGE PROVIDER (Fallback/Dev)
export class LocalStorageProvider implements IStorageProvider {
  private baseDir: string;
  private baseUrl: string;

  constructor() {
    this.baseDir = path.join(process.cwd(), '../../uploads'); // Or configure via ENV
    this.baseUrl = process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL}/uploads` : '/uploads';
  }

  async upload(buffer: Buffer, fileName: string, mimeType: string, tenantId: string) {
    const tenantDir = path.join(this.baseDir, tenantId);
    if (!fs.existsSync(tenantDir)) {
      fs.mkdirSync(tenantDir, { recursive: true });
    }
    
    // Prefix with timestamp to avoid collision
    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    const filePath = path.join(tenantDir, safeName);
    
    await fs.promises.writeFile(filePath, buffer);
    
    return {
      url: `${this.baseUrl}/${tenantId}/${safeName}`,
      key: safeName, // In local, key is just filename
    };
  }

  async delete(key: string, tenantId: string) {
    const filePath = path.join(this.baseDir, tenantId, key);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return true;
    }
    return false;
  }
}

// 2. S3 STORAGE PROVIDER (AWS S3 / Cloudflare R2 / DigitalOcean Spaces)
export class S3StorageProvider implements IStorageProvider {
  private s3: S3Client;
  private bucket: string;
  private cdnUrl: string;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.S3_REGION || 'auto', // 'auto' for Cloudflare R2
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || '',
        secretAccessKey: process.env.S3_SECRET_KEY || '',
      },
    });
    this.bucket = process.env.S3_BUCKET || 'platformbds';
    this.cdnUrl = process.env.S3_CDN_URL || '';
  }

  async upload(buffer: Buffer, fileName: string, mimeType: string, tenantId: string) {
    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    const key = `tenants/${tenantId}/media/${safeName}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
        // ACL: 'public-read', // If using AWS S3 with public bucket
      })
    );

    // If CDN URL is provided, use it, else fallback to standard S3 URL
    const url = this.cdnUrl ? `${this.cdnUrl}/${key}` : `https://${this.bucket}.s3.amazonaws.com/${key}`;

    return { url, key };
  }

  async delete(key: string, tenantId: string) {
    try {
      // For safety, ensure the key belongs to the tenant
      if (!key.includes(`tenants/${tenantId}/`)) {
        throw new Error('Unauthorized deletion attempt cross-tenant');
      }

      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );
      return true;
    } catch (err) {
      console.error('S3 Delete Error:', err);
      return false;
    }
  }
}

// 3. FACTORY
export function getStorageProvider(): IStorageProvider {
  if (process.env.STORAGE_PROVIDER === 's3' || process.env.STORAGE_PROVIDER === 'r2') {
    return new S3StorageProvider();
  }
  return new LocalStorageProvider();
}
