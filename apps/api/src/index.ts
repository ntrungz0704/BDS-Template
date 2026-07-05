import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { prisma } from '@repo/database';
import { SYSTEM_CONFIG } from '@repo/config';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// 1. Cấu hình Winston Logger
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] [${level.toUpperCase()}]: ${message}`)
);

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    new DailyRotateFile({
      filename: path.join(__dirname, '../logs/error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      filename: path.join(__dirname, '../logs/combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
});

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Bảo mật Headers với Helmet & Content Security Policy (CSP)
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'"],
    },
  })
);

// 3. Cấu hình CORS Whitelist
const allowedOrigins = [
  'http://localhost:3000', // Marketplace
  'http://localhost:3001', // CMS
  'http://localhost:3002', // Admin
  'http://localhost:3003', // Website Tenant
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Cho phép requests không có origin (ví dụ: mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.myplatform.com')) {
        callback(null, true);
      } else {
        callback(new Error('CORS Policy: Origin không được phép truy cập.'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-id', 'X-CSRF-Token'],
  })
);

// 4. Rate Limiting phòng thủ Brute Force
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // tối đa 100 requests từ 1 IP
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// 5. Cài đặt các Middleware cơ bản
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// 6. API Healthcheck
app.get('/api/health', async (req, res) => {
  try {
    // Kiểm tra kết nối Database
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      success: true,
      data: {
        status: 'UP',
        timestamp: new Date(),
        database: 'CONNECTED',
      },
    });
  } catch (error) {
    logger.error('Lỗi kiểm tra sức khỏe hệ thống (Healthcheck): ' + (error as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: 'HEALTH_CHECK_FAILED',
        message: 'Hệ thống database không phản hồi.',
      },
    });
  }
});

// 7. Import các routers của các modules
import authRoutes from './routes/auth.routes';
import marketplaceRoutes from './routes/marketplace.routes';
import projectCmsRoutes from './routes/project.cms.routes';
import postCmsRoutes from './routes/post.cms.routes';
import mediaRoutes from './routes/media.routes';
import adminRoutes from './routes/admin.routes';
import publicWebsiteRoutes from './routes/public.website.routes';

app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/cms/projects', projectCmsRoutes);
app.use('/api/cms/posts', postCmsRoutes);
app.use('/api/cms/media', mediaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/website', publicWebsiteRoutes);

// 8. Test route để kiểm tra server hoạt động
app.get('/api', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Chào mừng bạn đến với API Real Estate Platform SaaS!',
      version: '1.0.0',
    },
  });
});


// 8. Middleware xử lý lỗi tập trung (Global Error Handler)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = err.status || err.statusCode || 500;
  
  logger.error(`[${req.method}] ${req.path} - Error: ${err.message}`);
  
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'Đã xảy ra lỗi hệ thống, vui lòng liên hệ admin.' 
        : err.message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
});

// 9. Khởi chạy Server HTTP
const server = app.listen(PORT, () => {
  logger.info(`API Server đang chạy trên cổng ${PORT} ở chế độ ${process.env.NODE_ENV}`);
});

// 10. Graceful Shutdown (Đóng tiến trình êm đẹp)
const shutdown = () => {
  logger.info('Nhận tín hiệu kết thúc. Tiến hành graceful shutdown...');
  server.close(async () => {
    logger.info('Đã đóng cổng HTTP Express.');
    try {
      await prisma.$disconnect();
      logger.info('Đã ngắt kết nối PostgreSQL an toàn.');
      process.exit(0);
    } catch (err) {
      logger.error('Lỗi khi ngắt kết nối DB: ' + (err as Error).message);
      process.exit(1);
    }
  });

  // Ép buộc kết thúc sau 10s nếu không shutdown kịp
  setTimeout(() => {
    logger.error('Không thể graceful shutdown trong vòng 10s. Ép buộc đóng tiến trình.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
