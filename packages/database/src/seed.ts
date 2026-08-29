import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

// Load root .env environment variables manually before PrismaClient initialization
try {
  const possiblePaths = [
    path.join(process.cwd(), '.env'),
    path.join(process.cwd(), '../../.env'),
    path.join(process.cwd(), '../.env'),
    path.join(process.cwd(), 'packages/database', '.env')
  ];
  let envPathFound = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      envPathFound = p;
      break;
    }
  }
  if (envPathFound) {
    const envConfig = fs.readFileSync(envPathFound, 'utf-8');
    envConfig.split('\n').forEach((line) => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !key.startsWith('#')) {
          process.env[key] = value;
        }
      }
    });
    console.log('Đã nạp thành công biến môi trường từ:', envPathFound);
  } else {
    console.warn('Không tìm thấy file .env ở bất kỳ vị trí khả thi nào.');
  }
} catch (e) {
  console.error('Lỗi khi nạp file .env:', e);
}

import { PrismaClient, ProjectType, ProjectStatus } from '../generated/client/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu nạp dữ liệu mẫu (Seed)...');

  // 1. Xóa sạch dữ liệu cũ theo đúng thứ tự ràng buộc khóa ngoại
  await prisma.auditLog.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.demoSession.deleteMany({});
  await prisma.contactFormSubmission.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.banner.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.companyInfo.deleteMany({});
  await prisma.seoConfig.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.tenantMembership.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.tenant.deleteMany({});
  await prisma.template.deleteMany({});

  // 2. Tạo Template mẫu trên Marketplace
  console.log('Tạo Templates...');
  const template1 = await prisma.template.create({
    data: {
      id: 'template-1',
      name: 'Luxury Gold Style',
      slug: 'luxury-gold',
      description: 'Giao diện phong cách hoàng gia, quý phái dành cho dự án cao cấp và biệt thự.',
      shortDescription: 'Phong cách Luxury Gold hoàng gia',
      priceBuy: 499000,
      priceBuySource: 799000,
      priceRentMonthly: 199000,
      isActive: true,
      sortOrder: 1,
    },
  });

  // Tạo TemplateConfig mặc định
  await prisma.templateConfig.create({
    data: {
      templateId: template1.id,
      themeConfig: {
        colorPrimary: '#C5A572',
        colorSecondary: '#1A1A2E',
        fontHeading: 'Playfair Display',
        fontBody: 'Inter',
      },
      layoutConfig: {
        header: 'sticky',
        footer: 'simple-4-columns',
        homeSections: ['hero', 'featured-projects', 'about', 'posts', 'contact'],
      },
      featureFlags: {
        enableBlog: true,
        enableMap: true,
        enableVirtualTour: true,
      },
    },
  });

  // 3. Tạo duy nhất 1 Super Admin hệ thống chính thức
  console.log('Tạo tài khoản Super Admin...');
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'adminsuper@123456';
  if (!adminPassword || adminPassword.length < 12) {
    throw new Error('SEED_ADMIN_PASSWORD must contain at least 12 characters.');
  }
  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.create({
    data: {
      email: 'admin@aireviewbds.com',
      passwordHash: adminPasswordHash,
      fullName: 'Super Admin AI Review BDS',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('NẠP DỮ LIỆU SEED HOÀN TẤT THÀNH CÔNG! DUY NHẤT 1 TÀI KHOẢN ADMIN: admin@aireviewbds.com');
}

main()
  .catch((e) => {
    console.error('Lỗi khi nạp dữ liệu mẫu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
