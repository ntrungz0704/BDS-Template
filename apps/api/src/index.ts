// Support serializing BigInt in Express JSON responses
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import winston from 'winston';
import { PrismaClient, Prisma } from '@repo/database';
import { autoSeedDatabase, syncCatalog } from './utils/auto-seed';
import { csrfMiddleware } from './middlewares/csrf.middleware';

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
      return '[' + timestamp + '] [' + level.toUpperCase() + ']: ' + message;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
          return '[' + timestamp + '] ' + level + ': ' + message;
        })
      ),
    }),
  ],
});

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

const rawCors = process.env.CORS_ORIGINS || process.env.CORS_ORIGIN;
const allowedOrigins = rawCors
  ? rawCors.split(',').map(s => s.trim())
  : [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
    ];

app.use(
  cors({
    origin: (origin, callback) => {
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
        if (process.env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(new Error('CORS Policy: Origin không được phép truy cập.'));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'x-csrf-token'],
  })
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1500,
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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());
app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));
app.use(csrfMiddleware);

app.get('/api/health', async (req, res) => {
  try {
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
import aiRoutes from './routes/ai.routes';
import notificationRoutes from './routes/notification.routes';

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
app.use('/api/ai', aiRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/api', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Chào mừng bạn đến với API Real Estate Platform SaaS!',
      version: '1.0.0',
    },
  });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Handle Prisma known request errors (unique constraint, etc.)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = err.meta?.target as string[];
      const field = target ? target.join(', ') : 'Trường dữ liệu';
      logger.warn('[' + req.method + '] ' + req.path + ' - Prisma P2002 Unique Constraint Failed: ' + field);
      return res.status(409).json({
        success: false,
        error: {
          code: 'UNIQUE_CONSTRAINT_FAILED',
          message: field + ' đã tồn tại trong hệ thống. Vui lòng sử dụng giá trị khác.',
        },
      });
    }
  }

  // Handle Prisma transaction timeout errors gracefully
  const isPrismaTransactionError = err.message?.includes('Transaction API error') ||
    err.message?.includes('Transaction not found') ||
    err.message?.includes('transaction') && err.message?.includes('Prisma');
  if (isPrismaTransactionError) {
    logger.error('[' + req.method + '] ' + req.path + ' - Prisma Transaction Timeout: ' + err.message);
    return res.status(504).json({
      success: false,
      error: {
        code: 'TRANSACTION_TIMEOUT',
        message: 'Thao tác mất nhiều thời gian hơn dự kiến. Vui lòng thử lại sau vài giây.',
      },
    });
  }

  const statusCode = err.status || err.statusCode || 500;
  logger.error('[' + req.method + '] ' + req.path + ' - Error: ' + err.message + '\nStack: ' + err.stack);
  
  // In production, never leak internal error details to the client
  const isProd = process.env.NODE_ENV === 'production';
  const safeMessage = isProd
    ? 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.'
    : (err.message || 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.');

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: safeMessage,
    },
  });
});

let server: any;
if (process.env.NODE_ENV !== 'test' && !process.env.JEST_WORKER_ID) {
  const startServer = async () => {
    // Catalog data is a business invariant: 24 BDS products and 7 landing pages.
    // Idempotent sync ensures production and local always reflect the clean catalog.
    try {
      const result = await syncCatalog();
      logger.info(
        `Catalog synchronized: ${result.websiteTemplates} BDS templates, ` +
        `${result.landingPages} landing pages, ${result.retired} legacy rows retired.`
      );
    } catch (syncErr: any) {
      logger.warn(`Catalog sync warning: ${syncErr.message}`);
    }

    server = app.listen(PORT, () => {
      logger.info('API Server đang chạy trên cổng ' + PORT + ' ở chế độ ' + process.env.NODE_ENV);
      if (process.env.NODE_ENV !== 'production' && process.env.ALLOW_AUTO_SEED === 'true') {
        autoSeedDatabase().catch((e) => logger.warn('AutoSeed warning: ' + (e as Error).message));
      }
    });
  };

  startServer().catch(async (error) => {
    logger.error('Không thể khởi động API: ' + (error as Error).message);
    await prisma.$disconnect().catch(() => undefined);
    process.exitCode = 1;
  });
}

export { app, server };
