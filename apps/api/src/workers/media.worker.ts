import { Worker, Job } from 'bullmq';
import { redisConnection, QUEUE_NAMES } from '../config/queue.config';
import { prisma } from '@repo/database';
import { getStorageProvider } from '../utils/storage/storage.provider';
import { processAndSaveImage } from '../utils/image-processor';
import fs from 'fs';

const storage = getStorageProvider();

interface ImageProcessingJobData {
  tenantId: string;
  mediaAssetId: string;
  originalFilePath: string; // Tạm lưu ở local temp dir chờ xử lý
  originalFileName: string;
  options?: any;
}

export const initMediaWorker = async () => {
  // Kiểm tra kết nối Redis trước khi khởi động worker
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let redisModule: any;
    try {
      redisModule = require('redis');
    } catch {
      console.warn('👷 [Media Worker] Redis module không có sẵn (chưa cài). Worker bỏ qua.');
      return;
    }
    const { createClient } = redisModule;
    if (!createClient) {
      console.warn('👷 [Media Worker] Redis client không có sẵn. Worker bỏ qua.');
      return;
    }
    const testClient = createClient({ socket: { host: redisConnection.host, port: redisConnection.port, connectTimeout: 2000 } });
    await testClient.connect().catch(() => { throw new Error('Redis connection failed'); });
    await testClient.quit();
  } catch {
    console.warn('👷 [Media Worker] Redis không khả dụng. Worker bị tắt — API vẫn hoạt động bình thường.');
    return;
  }

  console.log('👷 Media Worker started...');
  
  const worker = new Worker(
    QUEUE_NAMES.IMAGE_PROCESSING,
    async (job: Job<ImageProcessingJobData>) => {
      const { tenantId, mediaAssetId, originalFilePath, originalFileName, options } = job.data;
      
      console.log(`Processing media asset ${mediaAssetId} for tenant ${tenantId}...`);
      
      try {
        // Cập nhật trạng thái PENDING -> PROCESSING
        await prisma.mediaAsset.update({
          where: { id: mediaAssetId },
          data: { processingStatus: 'PROCESSING' } as any
        });

        // 1. Đọc file tạm
        const buffer = await fs.promises.readFile(originalFilePath);

        // 2. Chạy Sharp (CPU intensive)
        const processed = await processAndSaveImage(buffer, originalFileName, tenantId, options);

        // 3. Upload các bản sao lên Storage Provider (S3/R2/Local)
        // Note: processAndSaveImage đang trả về url (dạng local). Ở bản Enterprise thực sự, 
        // ImageProcessor sẽ trả ra Buffer của từng size (Original, Large, Medium, Thumb), 
        // sau đó Worker gọi storage.upload(buffer, ...) cho từng size.
        // Để giữ code tương thích tạm thời, giả sử ImageProcessor đã tạo file ở local, ta đọc lại và đẩy lên S3.
        
        // (Pseudocode S3 Upload)
        /*
        const thumbUpload = await storage.upload(thumbBuffer, 'thumb_' + originalFileName, 'image/webp', tenantId);
        ...
        */

        // Cập nhật DB
        await prisma.mediaAsset.update({
          where: { id: mediaAssetId },
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
        await fs.promises.unlink(originalFilePath);
        
        console.log(`✅ Asset ${mediaAssetId} completed successfully`);

      } catch (err: any) {
        console.error(`❌ Failed to process asset ${mediaAssetId}:`, err);
        // Đánh dấu FAILED
        await prisma.mediaAsset.update({
          where: { id: mediaAssetId },
          data: { processingStatus: 'FAILED' } as any
        });
        throw err; // Ném lỗi để BullMQ retry
      }
    },
    { connection: { ...redisConnection } }
  );

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} has failed with ${err.message}`);
  });

  worker.on('error', (err) => {
    // Không crash process khi Redis mất kết nối
    console.warn(`[Media Worker] Worker error (likely Redis disconnected): ${err.message}`);
  });
};
