import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(process.cwd(), '../../.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env'),
];
for (const p of envPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
  }
}

// Setup & validate JWT secrets with automatic fallback support
if (process.env.JWT_SECRET) {
  process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
  process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
}
if (!process.env.JWT_ACCESS_SECRET) {
  process.env.JWT_ACCESS_SECRET = 'bds-platform-prod-access-jwt-secret-key-2026-secure';
}
if (!process.env.JWT_REFRESH_SECRET) {
  process.env.JWT_REFRESH_SECRET = 'bds-platform-prod-refresh-jwt-secret-key-2026-secure';
}

// Sửa lỗi JSON stringify với kiểu BigInt (Prisma)
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

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
import { Prisma } from '@repo/database';
import * as Sentry from '@sentry/node';
import { initMediaWorker } from './workers/media.worker';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 1.0,
});

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

// Apply Rate Limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP, please try again after 15 minutes',
    }
  }
});
app.use(limiter);

// 2. Bảo mật Headers với Helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 3. Cấu hình CORS Whitelist
const rawCors = process.env.CORS_ORIGINS || process.env.CORS_ORIGIN;
const allowedOrigins = rawCors
  ? rawCors.split(',').map(s => s.trim())
  : [
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
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith('.aireviewbds.com') ||
        origin === 'https://aireviewbds.com' ||
        origin === 'https://www.aireviewbds.com' ||
        origin === 'https://templates.aireviewbds.com' ||
        origin.endsWith('.platformbds.vn') ||
        origin === 'https://platformbds.vn' ||
        origin === 'https://www.platformbds.vn'
      ) {
        callback(null, true);
      } else {
        // Cho phép custom domain của tenant (tra cứu từ DB sẽ được thêm sau)
        // Tạm thời cho phép trong development
        if (process.env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(new Error('CORS Policy: Origin không được phép truy cập.'));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-tenant-id', 'X-CSRF-Token', 'x-csrf-token'],
  })
);

// 4. Rate Limiting phòng thủ Brute Force (Chỉ áp dụng ở môi trường Production)
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

if (process.env.NODE_ENV === 'production') {
  app.use('/api/', apiLimiter);
}

// 5. Cài đặt các Middleware cơ bản
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());
app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));

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
import formCmsRoutes from './routes/form.cms.routes';
import adminRoutes from './routes/admin.routes';
import publicWebsiteRoutes from './routes/public.website.routes';
import cmsBuilderRoutes from './routes/cms.builder.routes';
import tenantRoutes from './routes/tenant.routes';
import leadRoutes from './routes/lead.routes';
import demoRoutes from './routes/demo.routes';
import membershipRoutes from './routes/membership.routes';
import sourceRoutes from './routes/source.routes';

app.use('/api/auth', authRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/cms/projects', projectCmsRoutes);
app.use('/api/cms/posts', postCmsRoutes);
app.use('/api/cms/media', mediaRoutes);
app.use('/api/cms/forms', formCmsRoutes);
app.use('/api/cms/builder', cmsBuilderRoutes);
app.use('/api/cms/leads', leadRoutes);
app.use('/api/cms/members', membershipRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/website', publicWebsiteRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/demo', demoRoutes);
app.use('/api/source', sourceRoutes);

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
  // Bắt lỗi Prisma Unique Constraint (P2002) toàn cục
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = err.meta?.target as string[];
      const field = target ? target.join(', ') : 'Trường dữ liệu';
      logger.warn(`[${req.method}] ${req.path} - Prisma P2002 Unique Constraint Failed: ${field}`);
      return res.status(409).json({
        success: false,
        error: {
          code: 'UNIQUE_CONSTRAINT_FAILED',
          message: `${field} đã tồn tại trong hệ thống. Vui lòng sử dụng giá trị khác.`,
        },
      });
    }
  }

  const statusCode = err.status || err.statusCode || 500;
  
  logger.error(`[${req.method}] ${req.path} - Error: ${err.message}\nStack: ${err.stack}`);
  
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: (process.env.NODE_ENV !== 'production' && err.message) ? err.message : (err.message || 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'),
    },
  });
});

// 9. Khởi chạy Server HTTP
let server: any;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    logger.info(`API Server đang chạy trên cổng ${PORT} ở chế độ ${process.env.NODE_ENV}`);
    
    // Khởi chạy Background Workers (graceful — không crash API nếu Redis không có)
    try {
      initMediaWorker();
    } catch (err: any) {
      logger.warn(`[Media Worker] Không thể khởi động worker (Redis không sẵn sàng?): ${err.message}. API vẫn hoạt động bình thường.`);
    }
  });
}

// 10. Graceful Shutdown (Đóng tiến trình êm đẹp)
const shutdown = () => {
  logger.info('Nhận tín hiệu kết thúc. Tiến hành graceful shutdown...');
  const closeServer = (cb: () => void) => {
    if (server) {
      server.close(cb);
    } else {
      cb();
    }
  };
  closeServer(async () => {
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

export { app };

