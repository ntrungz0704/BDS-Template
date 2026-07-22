import { Queue } from 'bullmq';

// Redis Connection
// BullMQ accepts raw IORedis connection options — avoids phantom ioredis version conflicts in pnpm
export const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null,
  enableOfflineQueue: false, // Không queue lệnh khi Redis offline
  lazyConnect: true,         // Chỉ kết nối khi thực sự cần
  connectTimeout: 3000,
  retryStrategy: () => null, // Không retry để tránh spam
} as const;

export const QUEUE_NAMES = {
  IMAGE_PROCESSING: 'image-processing-queue',
};

// Lazy Queue — chỉ tạo khi được gọi lần đầu
let _imageProcessingQueue: Queue | null = null;

export const getImageProcessingQueue = (): Queue | null => {
  if (!_imageProcessingQueue) {
    try {
      _imageProcessingQueue = new Queue(QUEUE_NAMES.IMAGE_PROCESSING, {
        connection: { ...redisConnection },
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 2000,
          },
          removeOnComplete: true,
        },
      });
    } catch {
      return null;
    }
  }
  return _imageProcessingQueue;
};

// Export compat alias (lazy)
export const imageProcessingQueue = {
  add: async (...args: any[]) => {
    const q = getImageProcessingQueue();
    if (!q) {
      console.warn('[Queue] Redis không có sẵn, bỏ qua job upload.');
      return null;
    }
    return (q.add as any)(...args);
  }
};
