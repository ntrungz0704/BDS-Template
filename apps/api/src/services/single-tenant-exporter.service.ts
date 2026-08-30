import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import bcrypt from 'bcrypt';
import { prisma } from '@repo/database';
import { logger } from '../index';

export interface SingleTenantExportOptions {
  orderId: string;
  orderNumber: string;
  templateSlug: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  tenantId?: string;
}

export class SingleTenantExporterService {
  /**
   * Tạo toàn bộ mã nguồn Next.js Single-Tenant độc lập kèm CMS và seed data
   */
  public static async generateSingleTenantZip(options: SingleTenantExportOptions): Promise<{
    buffer: Buffer;
    fileName: string;
    fileSizeBytes: bigint;
  }> {
    const { orderNumber, templateSlug, customerName, customerPhone, customerEmail, tenantId } = options;
    logger.info(`[SingleTenantExporter] Bắt đầu đóng gói Single-Tenant cho đơn #${orderNumber} (Template: ${templateSlug})`);

    const zip = new AdmZip();

    // 1. Trích xuất dữ liệu thực tế của Tenant từ DB chung (hoặc lấy mặc định theo template)
    let companyInfo: any = null;
    let themeSetting: any = null;
    let projectsList: any[] = [];
    let postsList: any[] = [];
    let leadsList: any[] = [];

    if (tenantId) {
      try {
        companyInfo = await prisma.companyInfo.findUnique({ where: { tenantId } });
        themeSetting = await prisma.tenantThemeSettings.findUnique({ where: { tenantId } });
        projectsList = await prisma.project.findMany({
          where: { tenantId, deletedAt: null },
          orderBy: { sortOrder: 'asc' },
        });
        postsList = await prisma.post.findMany({
          where: { tenantId, deletedAt: null },
          orderBy: { createdAt: 'desc' },
        });
        leadsList = await prisma.lead.findMany({
          where: { tenantId },
          orderBy: { createdAt: 'desc' },
          take: 50,
        });
      } catch (err) {
        logger.warn(`[SingleTenantExporter] Không thể truy vấn DB tenant, dùng dữ liệu khởi tạo mặc định: ${err}`);
      }
    }

    // Default Fallbacks
    const compName = companyInfo?.companyName || `${customerName} Real Estate`;
    const compHotline = companyInfo?.hotline || customerPhone || '0933.868.888';
    const compEmail = companyInfo?.email || customerEmail || 'contact@bdstemplate.vn';
    const compAddress = companyInfo?.address || 'TP. Hồ Chí Minh, Việt Nam';
    const compSlogan = companyInfo?.slogan || 'Chuyên Phân Phối & Phát Triển Bất Động Sản Cao Cấp';

    const defaultAdminPassword = 'AdminPassword@2026';
    const passwordHash = await bcrypt.hash(defaultAdminPassword, 10);

    // 2. package.json
    const packageJson = {
      name: `bds-${templateSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-')}-website`,
      version: '1.0.0',
      private: true,
      description: `Mã nguồn Website & CMS Bất Động Sản Độc Lập — Đơn hàng #${orderNumber}`,
      scripts: {
        dev: 'next dev -p 3000',
        build: 'prisma generate && next build',
        start: 'next start -p 3000',
        lint: 'next lint',
        'prisma:generate': 'prisma generate',
        'prisma:push': 'prisma db push',
        'prisma:seed': 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
      },
      dependencies: {
        next: '^15.1.0',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        '@prisma/client': '^5.22.0',
        'lucide-react': '^0.468.0',
        bcryptjs: '^2.4.3',
        jsonwebtoken: '^9.0.2',
        axios: '^1.7.9',
        clsx: '^2.1.1',
        'tailwind-merge': '^2.5.5',
      },
      devDependencies: {
        typescript: '^5.7.2',
        '@types/node': '^22.10.1',
        '@types/react': '^19.0.1',
        '@types/react-dom': '^19.0.1',
        '@types/bcryptjs': '^2.4.6',
        '@types/jsonwebtoken': '^9.0.7',
        postcss: '^8.4.49',
        tailwindcss: '^3.4.16',
        prisma: '^5.22.0',
        'ts-node': '^10.9.2',
      },
    };
    zip.addFile('package.json', Buffer.from(JSON.stringify(packageJson, null, 2), 'utf-8'));

    // 3. tsconfig.json, next.config.js, tailwind.config.js, postcss.config.js
    const tsConfig = {
      compilerOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: false,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        baseUrl: '.',
        paths: { '@/*': ['./src/*'] },
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx'],
      exclude: ['node_modules'],
    };
    zip.addFile('tsconfig.json', Buffer.from(JSON.stringify(tsConfig, null, 2), 'utf-8'));

    const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

module.exports = nextConfig;
`;
    zip.addFile('next.config.js', Buffer.from(nextConfigContent, 'utf-8'));

    const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '${themeSetting?.primaryColor || '#0F2942'}',
        secondary: '${themeSetting?.secondaryColor || '#14B8A6'}',
        accent: '${themeSetting?.accentColor || '#EA580C'}',
      },
    },
  },
  plugins: [],
};
`;
    zip.addFile('tailwind.config.js', Buffer.from(tailwindConfigContent, 'utf-8'));

    const postCssConfigContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
    zip.addFile('postcss.config.js', Buffer.from(postCssConfigContent, 'utf-8'));

    // 4. .env.example
    const envExampleContent = `# CẤU HÌNH DATABASE POSTGRESQL (Khách hàng điền chuỗi kết nối của mình vào đây)
DATABASE_URL="postgresql://postgres:password123@localhost:5432/my_bds_db?schema=public"

# BẢO MẬT JWT CHO CMS ADMIN
JWT_SECRET="bds_secret_key_${orderNumber.replace(/[^a-zA-Z0-9]/g, '_')}_secure_2026"

# CỔNG CHẠY (Mặc định 3000)
PORT=3000
`;
    zip.addFile('.env.example', Buffer.from(envExampleContent, 'utf-8'));
    zip.addFile('.env', Buffer.from(envExampleContent, 'utf-8'));

    // 5. Single-Tenant Prisma Schema
    const prismaSchemaContent = `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  ADMIN
  EDITOR
  STAFF
}

enum ProjectStatus {
  COMING_SOON
  SELLING
  SOLD_OUT
}

enum ProjectType {
  APARTMENT
  VILLA
  TOWNHOUSE
  LAND
  COMMERCIAL
  OFFICE
}

enum LeadStatus {
  NEW
  CONTACTED
  CONSULTING
  DEPOSITED
  CANCELLED
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  fullName     String   @map("full_name")
  phone        String?
  passwordHash String   @map("password_hash")
  role         UserRole @default(ADMIN)
  isActive     Boolean  @default(true) @map("is_active")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@map("users")
}

model CompanyInfo {
  id          String   @id @default(cuid())
  companyName String   @map("company_name")
  brandName   String?  @map("brand_name")
  slogan      String?
  hotline     String
  phone       String?
  zalo        String?
  email       String
  address     String
  logoUrl     String?  @map("logo_url")
  faviconUrl  String?  @map("favicon_url")
  taxCode     String?  @map("tax_code")
  fanpageUrl  String?  @map("fanpage_url")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("company_info")
}

model ThemeSetting {
  id             String   @id @default(cuid())
  primaryColor   String   @default("#0F2942") @map("primary_color")
  secondaryColor String   @default("#14B8A6") @map("secondary_color")
  accentColor    String   @default("#EA580C") @map("accent_color")
  fontHeading    String   @default("Inter") @map("font_heading")
  fontBody       String   @default("Inter") @map("font_body")
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")

  @@map("theme_settings")
}

model Project {
  id               String        @id @default(cuid())
  title            String
  slug             String        @unique
  description      String?
  shortDescription String?       @map("short_description")
  type             ProjectType   @default(APARTMENT)
  status           ProjectStatus @default(SELLING)
  price            String?
  area             String?
  address          String?
  thumbnail        String?
  images           Json?
  features         Json?
  sortOrder        Int           @default(0) @map("sort_order")
  createdAt        DateTime      @default(now()) @map("created_at")
  updatedAt        DateTime      @updatedAt @map("updated_at")

  @@map("projects")
}

model Post {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  thumbnail   String?
  category    String?
  isPublished Boolean  @default(true) @map("is_published")
  publishedAt DateTime @default(now()) @map("published_at")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("posts")
}

model Lead {
  id          String     @id @default(cuid())
  fullName    String     @map("full_name")
  phone       String
  email       String?
  product     String?
  note        String?
  status      LeadStatus @default(NEW)
  sourceUrl   String?    @map("source_url")
  createdAt   DateTime   @default(now()) @map("created_at")
  updatedAt   DateTime   @updatedAt @map("updated_at")

  @@map("leads")
}
`;
    zip.addFile('prisma/schema.prisma', Buffer.from(prismaSchemaContent, 'utf-8'));

    // 6. prisma/seed.ts (TypeScript Seed Script chứa 100% dữ liệu của khách)
    const seedScriptContent = `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Đang nạp dữ liệu mẫu cho Website BĐS độc lập...');

  // 1. Tạo tài khoản Admin CMS
  const adminUser = await prisma.user.upsert({
    where: { email: ${JSON.stringify(compEmail)} },
    update: {},
    create: {
      email: ${JSON.stringify(compEmail)},
      fullName: ${JSON.stringify(customerName)},
      phone: ${JSON.stringify(compHotline)},
      passwordHash: ${JSON.stringify(passwordHash)},
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log('✓ Đã tạo tài khoản Admin:', adminUser.email);

  // 2. Thông tin công ty
  await prisma.companyInfo.deleteMany();
  await prisma.companyInfo.create({
    data: {
      companyName: ${JSON.stringify(compName)},
      brandName: ${JSON.stringify(companyInfo?.brandName || compName)},
      slogan: ${JSON.stringify(compSlogan)},
      hotline: ${JSON.stringify(compHotline)},
      phone: ${JSON.stringify(compHotline)},
      zalo: ${JSON.stringify(companyInfo?.zalo || compHotline)},
      email: ${JSON.stringify(compEmail)},
      address: ${JSON.stringify(compAddress)},
      logoUrl: ${JSON.stringify(companyInfo?.logoUrl || '')},
      faviconUrl: ${JSON.stringify(companyInfo?.faviconUrl || '')},
      taxCode: ${JSON.stringify(companyInfo?.taxCode || '')},
      fanpageUrl: ${JSON.stringify(companyInfo?.fanpageUrl || '')},
    },
  });
  console.log('✓ Đã khởi tạo thông tin doanh nghiệp');

  // 3. Cấu hình Theme & Màu sắc
  await prisma.themeSetting.deleteMany();
  await prisma.themeSetting.create({
    data: {
      primaryColor: ${JSON.stringify(themeSetting?.primaryColor || '#0F2942')},
      secondaryColor: ${JSON.stringify(themeSetting?.secondaryColor || '#14B8A6')},
      accentColor: ${JSON.stringify(themeSetting?.accentColor || '#EA580C')},
      fontHeading: ${JSON.stringify(themeSetting?.fontHeading || 'Inter')},
      fontBody: ${JSON.stringify(themeSetting?.fontBody || 'Inter')},
    },
  });
  console.log('✓ Đã khởi tạo Theme & Brand settings');

  // 4. Danh sách Dự Án BĐS
  await prisma.project.deleteMany();
  const projectsData = ${JSON.stringify(
    projectsList.length > 0
      ? projectsList.map((p) => ({
          title: p.title,
          slug: p.slug,
          description: p.description,
          shortDescription: p.shortDescription,
          type: p.type,
          status: p.status,
          price: p.price,
          area: p.area,
          address: p.address,
          thumbnail: p.thumbnail,
          images: p.images,
          features: p.features,
          sortOrder: p.sortOrder,
        }))
      : [
          {
            title: 'Biệt Thự Biển Hoàng Gia Golf Villas',
            slug: 'biet-thu-bien-golf-villas',
            description: 'Dự án nghỉ dưỡng đẳng cấp quốc tế tầm nhìn view biển trọn đời.',
            shortDescription: 'Biệt thự đơn lập 300m² - 500m², bàn giao full nội thất 5 sao',
            type: 'VILLA',
            status: 'SELLING',
            price: 'Từ 15.8 Tỷ',
            area: '350 m²',
            address: 'Đại Lộ Biển Tuyệt Mỹ',
            thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
            images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80'],
            sortOrder: 1,
          },
          {
            title: 'Shophouse Phố Thương Mại Festival',
            slug: 'shophouse-pho-thuong-mai-festival',
            description: 'Tuyến phố thương mại sầm uất hoạt động 24/7.',
            shortDescription: 'Mặt tiền 7m, thiết kế 4 tầng kinh doanh sầm uất',
            type: 'COMMERCIAL',
            status: 'SELLING',
            price: 'Từ 8.5 Tỷ',
            area: '140 m²',
            address: 'Trục đường lễ hội trung tâm',
            thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80',
            images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80'],
            sortOrder: 2,
          },
        ],
    null,
    2
  )};

  for (const proj of projectsData) {
    await prisma.project.create({ data: proj as any });
  }
  console.log(\`✓ Đã nạp \${projectsData.length} dự án bất động sản\`);

  // 5. Danh sách Bài viết
  await prisma.post.deleteMany();
  const postsData = ${JSON.stringify(
    postsList.length > 0
      ? postsList.map((p) => ({
          title: p.title,
          slug: p.slug,
          content: p.content,
          excerpt: p.excerpt,
          thumbnail: p.thumbnail,
          category: p.category,
          isPublished: p.isPublished,
        }))
      : [
          {
            title: 'Tiềm Năng Sinh Lời Đột Phá Khi Đầu Tư BĐS Nghỉ Dưỡng',
            slug: 'tiem-nang-sinh-loi-bds-nghi-duong',
            content: '<p>Phân tích chi tiết về làn sóng hạ tầng cao tốc và sân bay quốc tế...</p>',
            excerpt: 'Đòn bẩy hạ tầng giúp giá trị bất động sản tăng trưởng phi mã trong năm 2026.',
            thumbnail: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1000&q=80',
            category: 'Tin Thị Trường',
            isPublished: true,
          },
        ],
    null,
    2
  )};

  for (const post of postsData) {
    await prisma.post.create({ data: post as any });
  }
  console.log(\`✓ Đã nạp \${postsData.length} bài viết tin tức\`);

  console.log('🎉 Nạp dữ liệu hoàn tất! Bạn có thể khởi động website bằng lệnh: npm run dev');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
`;
    zip.addFile('prisma/seed.ts', Buffer.from(seedScriptContent, 'utf-8'));

    // 7. src/lib/prisma.ts & src/lib/auth.ts
    const prismaLibContent = `import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
`;
    zip.addFile('src/lib/prisma.ts', Buffer.from(prismaLibContent, 'utf-8'));

    const authLibContent = `import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'bds_default_secret_key_2026';

export function signJwt(payload: object, expiresIn: string = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyJwt<T = any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (error) {
    return null;
  }
}
`;
    zip.addFile('src/lib/auth.ts', Buffer.from(authLibContent, 'utf-8'));

    // 8. src/styles/globals.css
    const globalsCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: ${themeSetting?.primaryColor || '#0F2942'};
  --secondary: ${themeSetting?.secondaryColor || '#14B8A6'};
  --accent: ${themeSetting?.accentColor || '#EA580C'};
}

body {
  color: #1e293b;
  background-color: #ffffff;
  font-family: 'Inter', sans-serif;
}
`;
    zip.addFile('src/styles/globals.css', Buffer.from(globalsCssContent, 'utf-8'));

    // 9. src/pages/_app.tsx & src/pages/_document.tsx
    const appTsxContent = `import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
`;
    zip.addFile('src/pages/_app.tsx', Buffer.from(appTsxContent, 'utf-8'));

    const docTsxContent = `import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
`;
    zip.addFile('src/pages/_document.tsx', Buffer.from(docTsxContent, 'utf-8'));

    // 10. src/pages/api/leads.ts (Public Lead Capture API)
    const apiLeadsContent = `import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, phone, email, product, note } = req.body;
    if (!phone || !fullName) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền họ tên và số điện thoại.' });
    }

    try {
      const lead = await prisma.lead.create({
        data: {
          fullName,
          phone,
          email: email || null,
          product: product || null,
          note: note || null,
          status: 'NEW',
          sourceUrl: req.headers.referer || '/',
        },
      });
      return res.status(200).json({ success: true, message: 'Đã nhận thông tin thành công!', data: lead });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lưu lead: ' + err.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
`;
    zip.addFile('src/pages/api/leads.ts', Buffer.from(apiLeadsContent, 'utf-8'));

    // 11. src/pages/api/auth/login.ts (CMS Login API)
    const apiLoginContent = `import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signJwt } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền email và mật khẩu.' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.isActive) {
        return res.status(401).json({ success: false, message: 'Tài khoản không tồn tại hoặc đã bị khóa.' });
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Mật khẩu không chính xác.' });
      }

      const token = signJwt({ userId: user.id, email: user.email, role: user.role });
      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công!',
        token,
        user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: 'Lỗi đăng nhập: ' + err.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
`;
    zip.addFile('src/pages/api/auth/login.ts', Buffer.from(apiLoginContent, 'utf-8'));

    // 12. src/pages/api/admin/leads.ts & projects.ts
    const apiAdminLeadsContent = `import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json({ success: true, data: leads });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === 'PUT') {
    const { id, status, note } = req.body;
    try {
      const updated = await prisma.lead.update({
        where: { id },
        data: { status, note },
      });
      return res.status(200).json({ success: true, data: updated });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
`;
    zip.addFile('src/pages/api/admin/leads.ts', Buffer.from(apiAdminLeadsContent, 'utf-8'));

    // 13. src/pages/admin/index.tsx (CMS Admin Dashboard)
    const adminDashboardContent = `import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Users, Building, FileText, Settings, Phone, CheckCircle, Clock, Search, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leads')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLeads(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Head>
        <title>CMS Quản Trị Bất Động Sản — Single Tenant</title>
      </Head>

      {/* Top Header */}
      <header className="bg-[#0F2942] text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <Building className="w-6 h-6 text-teal-400" />
          <span className="font-black text-lg tracking-wide uppercase">${compName} — CMS</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <Link href="/" target="_blank" className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white transition">
            Xem Website Ngoài
          </Link>
          <button onClick={() => router.push('/admin/login')} className="flex items-center gap-1 text-slate-300 hover:text-white">
            <LogOut className="w-4 h-4" /> Đăng Xuất
          </button>
        </div>
      </header>

      {/* Main CMS Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 border-l-4 border-teal-500 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase">Tổng Khách Hàng Tiềm Năng</p>
            <p className="text-3xl font-black text-slate-900">{leads.length}</p>
          </div>
          <div className="bg-white p-6 border-l-4 border-amber-500 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase">Khách Chờ Tư Vấn (Mới)</p>
            <p className="text-3xl font-black text-amber-600">{leads.filter(l => l.status === 'NEW').length}</p>
          </div>
          <div className="bg-white p-6 border-l-4 border-emerald-500 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-500 uppercase">Đã Đặt Cọc / Chốt Căn</p>
            <p className="text-3xl font-black text-emerald-600">{leads.filter(l => l.status === 'DEPOSITED').length}</p>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-black text-base text-slate-800 uppercase">Danh Sách Khách Đăng Ký Nhận Báo Giá (CRM)</h3>
            <span className="text-xs text-slate-500 font-medium">{leads.length} bản ghi</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-900 uppercase font-black border-b border-slate-200">
                <tr>
                  <th className="p-3">Thời Gian</th>
                  <th className="p-3">Họ Và Tên</th>
                  <th className="p-3">Số Điện Thoại (Zalo)</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Sản Phẩm Quan Tâm</th>
                  <th className="p-3">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400 font-medium">
                      {loading ? 'Đang tải dữ liệu...' : 'Chưa có thông tin khách hàng nào.'}
                    </td>
                  </tr>
                ) : (
                  leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-500 font-mono">{new Date(l.createdAt).toLocaleString('vi-VN')}</td>
                      <td className="p-3 font-bold text-slate-900">{l.fullName}</td>
                      <td className="p-3 font-bold text-teal-700">{l.phone}</td>
                      <td className="p-3">{l.email || '—'}</td>
                      <td className="p-3 font-medium text-slate-800">{l.product || 'Tư vấn tổng quan'}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 font-bold rounded-sm text-[10px]">
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
`;
    zip.addFile('src/pages/admin/index.tsx', Buffer.from(adminDashboardContent, 'utf-8'));

    // 14. src/pages/index.tsx (Public Website)
    const publicIndexContent = `import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Phone, Mail, MapPin, Check, ArrowRight, Building, Award, ShieldCheck, ChevronRight, MessageCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';

interface Props {
  company: any;
  theme: any;
  projects: any[];
  posts: any[];
}

export default function HomePage({ company, theme, projects, posts }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, phone, product }),
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert('Có lỗi khi gửi thông tin, vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Head>
        <title>{company?.companyName || 'Bất Động Sản Cao Cấp'}</title>
        <meta name="description" content={company?.slogan || 'Phân phối dự án bất động sản uy tín'} />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F2942] text-white px-6 py-3 border-b-2 border-amber-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-bold">
          <div className="flex items-center gap-2">
            <Building className="w-6 h-6 text-amber-400" />
            <span className="text-base font-black text-amber-300 uppercase tracking-wide">
              {company?.companyName}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href={\`tel:\${company?.hotline}\`} className="flex items-center gap-1 text-amber-300">
              <Phone className="w-4 h-4" /> Hotline: {company?.hotline}
            </a>
            <a href="#lead-form" className="px-4 py-1.5 bg-[#EA580C] hover:bg-orange-700 text-white uppercase font-black transition">
              Nhận Báo Giá
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#0F2942] to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest">
            DỰ ÁN BẤT ĐỘNG SẢN CAO CẤP MỞ BÁN ĐỢT 1
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-amber-300 uppercase leading-tight">
            {company?.slogan || 'CƠ HỘI ĐẦU TƯ BẤT ĐỘNG SẢN SINH LỜI ĐỘT PHÁ'}
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Hạ tầng kết nối đồng bộ, pháp lý minh bạch 100%, chiết khấu trực tiếp và chính sách thanh toán linh hoạt.
          </p>

          {/* Direct Lead Form */}
          <div id="lead-form" className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border-2 border-amber-400 p-6 text-left shadow-2xl">
            <h3 className="font-black text-sm text-amber-300 uppercase text-center mb-3">
              ĐĂNG KÝ NHẬN BẢNG GIÁ & CHÍNH SÁCH ƯU ĐÃI
            </h3>
            {submitted ? (
              <div className="bg-white text-slate-900 p-4 text-center border-2 border-amber-400">
                <p className="font-bold text-xs text-emerald-600">✓ ĐÃ TIẾP NHẬN YÊU CẦU THÀNH CÔNG! Chuyên viên sẽ gọi lại trong 3 phút.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên Quý Khách *"
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold border border-slate-300 outline-none"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại nhận bảng giá (Zalo) *"
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none"
                />
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Sản phẩm / Phân khu quan tâm"
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium border border-slate-300 outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-[#EA580C] hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  GỬI YÊU CẦU CHO TÔI NGAY
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2942] uppercase">
            DANH MỤC SẢN PHẨM ĐANG MỞ BÁN
          </h2>
          <p className="text-xs text-slate-600 font-medium">Bảng hàng cập nhật trực tiếp từ chủ đầu tư</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="border-2 border-slate-200 bg-white hover:border-amber-400 transition shadow-sm group">
              <div className="aspect-[16/10] bg-slate-900 overflow-hidden">
                <img src={p.thumbnail || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5 space-y-2">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold text-[10px] uppercase">{p.type}</span>
                <h4 className="font-black text-base text-[#0F2942]">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.shortDescription}</p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
                  <span className="font-black text-[#EA580C] text-sm">{p.price || 'Liên hệ'}</span>
                  <span className="text-slate-500 font-medium">{p.area || '100m²'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1A2C] text-white py-12 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="font-black text-sm text-amber-300 uppercase">{company?.companyName}</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">{company?.slogan}</p>
          </div>
          <div className="space-y-1.5 text-slate-300">
            <p className="font-bold text-amber-300">VĂN PHÒNG BÁN HÀNG:</p>
            <p className="flex items-start gap-1.5"><MapPin className="w-4 h-4 text-amber-400 shrink-0" /> {company?.address}</p>
            <p className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-amber-400 shrink-0" /> {company?.hotline}</p>
            <p className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-amber-400 shrink-0" /> {company?.email}</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-amber-300">QUẢN TRỊ NỘI DUNG:</p>
            <a href="/admin" className="inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700">
              Đăng Nhập CMS Quản Trị →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [company, theme, projects, posts] = await Promise.all([
      prisma.companyInfo.findFirst(),
      prisma.themeSetting.findFirst(),
      prisma.project.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.post.findMany({ where: { isPublished: true }, orderBy: { publishedAt: 'desc' } }),
    ]);

    return {
      props: {
        company: JSON.parse(JSON.stringify(company || {})),
        theme: JSON.parse(JSON.stringify(theme || {})),
        projects: JSON.parse(JSON.stringify(projects || [])),
        posts: JSON.parse(JSON.stringify(posts || [])),
      },
    };
  } catch (e) {
    return { props: { company: {}, theme: {}, projects: [], posts: [] } };
  }
};
`;
    zip.addFile('src/pages/index.tsx', Buffer.from(publicIndexContent, 'utf-8'));

    // 15. Tích hợp sẵn bản Standalone HTML5/CSS3/JS và PHP & MySQL (nếu có)
    let folderCode = 'bds-01';
    for (let i = 1; i <= 24; i++) {
      const numStr = i < 10 ? `0${i}` : `${i}`;
      if (templateSlug.includes(`bds-${numStr}`) || templateSlug.includes(`portal-${numStr}`) || templateSlug === `bds-${i}`) {
        folderCode = `bds-${numStr}`;
        break;
      }
    }
    const possibleStandaloneDirs = [
      path.resolve(__dirname, '../../../standalone-templates', folderCode),
      path.resolve(__dirname, '../../../../standalone-templates', folderCode),
      path.resolve(__dirname, '../../standalone-templates', folderCode),
      path.resolve(process.cwd(), 'standalone-templates', folderCode),
      path.resolve(process.cwd(), '../standalone-templates', folderCode),
      path.resolve(process.cwd(), '../../standalone-templates', folderCode),
    ];
    const standaloneDir = possibleStandaloneDirs.find((d) => fs.existsSync(d));
    if (standaloneDir) {
      if (fs.existsSync(path.join(standaloneDir, 'html'))) {
        zip.addLocalFolder(path.join(standaloneDir, 'html'), 'ban-tinh-html-css-js');
      }
      if (fs.existsSync(path.join(standaloneDir, 'php'))) {
        zip.addLocalFolder(path.join(standaloneDir, 'php'), 'ban-hosting-php-mysql');
      }
    }

    // 16. HƯỚNG DẪN UP LÊN GITHUB
    const githubGuideContent = `# HƯỚNG DẪN ĐẨY MÃ NGUỒN LÊN GITHUB & DEPLOY TỰ ĐỘNG

Tài liệu này hướng dẫn Quý Khách đưa mã nguồn website lên kho lưu trữ **GitHub cá nhân** và thiết lập triển khai tự động.

---

## BƯỚC 1: TẠO REPOSITORY MỚI TRÊN GITHUB
1. Truy cập https://github.com và đăng nhập vào tài khoản của Quý Khách.
2. Nhấn nút **"New"** (hoặc dấu \`+\` ở góc trên bên phải màn hình).
3. Đặt tên kho lưu trữ (Ví dụ: \`my-bds-website\`).
4. Chọn chế độ **Private** (Riêng tư) để bảo vệ bản quyền mã nguồn.
5. **Lưu ý**: KHÔNG tích chọn *"Add a README file"* hay *.gitignore* (vì mã nguồn đã có sẵn đầy đủ).
6. Nhấn nút xanh **"Create repository"**.

---

## BƯỚC 2: ĐẨY MÃ NGUỒN TỪ MÁY LÊN GITHUB
Mở cửa sổ Terminal (hoặc Git Bash / Command Prompt) ngay tại thư mục giải nén này và gõ lần lượt các lệnh sau:

\`\`\`bash
# 1. Khởi tạo Git
git init

# 2. Thêm toàn bộ file vào bộ nhớ đệm
git add .

# 3. Ghi nhận commit đầu tiên
git commit -m "Khởi tạo mã nguồn Website & CMS BĐS"

# 4. Đặt nhánh chính là main
git branch -M main

# 5. Liên kết với kho GitHub vừa tạo (Thay URL bằng link repo GitHub của bạn)
git remote add origin https://github.com/TEN-TAI-KHOAN-CUA-BAN/my-bds-website.git

# 6. Đẩy mã nguồn lên
git push -u origin main
\`\`\`

---

## BƯỚC 3: KẾT NỐI VERCEL ĐỂ TỰ ĐỘNG TRIỂN KHAI (CI/CD)
1. Truy cập https://vercel.com và đăng nhập bằng tài khoản GitHub.
2. Chọn **"Add New Project"** $\\rightarrow$ Nhấn **"Import"** cạnh repo \`my-bds-website\`.
3. Trong phần **Environment Variables**, điền biến \`DATABASE_URL\` từ Neon.tech hoặc Supabase.
4. Nhấn **Deploy** $\\rightarrow$ Mỗi khi bạn sửa code và push lên GitHub, Vercel sẽ tự động cập nhật website chỉ trong 30 giây!
`;
    zip.addFile('HUONG-DAN-UP-LEN-GITHUB.md', Buffer.from(githubGuideContent, 'utf-8'));

    // 17. HƯỚNG DẪN CHẠY XAMPP / CPANEL CHO BẢN PHP
    const phpGuideContent = `# HƯỚNG DẪN CÀI ĐẶT BẢN PHP & MYSQL TRÊN HOSTING CPANEL / XAMPP

Nếu Quý Khách muốn sử dụng phiên bản PHP truyền thống, vui lòng mở thư mục **\`ban-hosting-php-mysql\`** có sẵn trong gói tải về:

---

## CÁCH 1: CHẠY TRÊN MÁY TÍNH BẰNG XAMPP
1. Cài đặt phần mềm XAMPP từ https://www.apachefriends.org.
2. Sao chép toàn bộ file trong thư mục \`ban-hosting-php-mysql\` vào đường dẫn: \`C:\\xampp\\htdocs\\bds\`.
3. Mở phần mềm XAMPP Control Panel, bấm **Start** cả 2 mục **Apache** và **MySQL**.
4. Mở trình duyệt truy cập: \`http://localhost/phpmyadmin\`.
5. Tạo một cơ sở dữ liệu mới có tên: \`bds_db\` (chọn bảng mã \`utf8mb4_unicode_ci\`).
6. Nhấp vào Database vừa tạo $\\rightarrow$ Chọn tab **Import (Nhập)** $\\rightarrow$ Chọn file \`database.sql\` trong thư mục và bấm **Import**.
7. Truy cập \`http://localhost/bds\` trên trình duyệt để trải nghiệm website!

---

## CÁCH 2: TRIỂN KHAI LÊN HOSTING CPANEL
1. Đăng nhập vào trang quản trị cPanel của Hosting.
2. Vào mục **File Manager** $\\rightarrow$ Mở thư mục \`public_html\`.
3. Nén thư mục \`ban-hosting-php-mysql\` thành file .zip và tải lên (Upload) $\\rightarrow$ Giải nén (Extract) ra thư mục gốc.
4. Vào mục **MySQL Databases** trên cPanel:
   - Tạo Database mới.
   - Tạo User mới và gán Mật khẩu.
   - Gán User vào Database và cấp quyền **ALL PRIVILEGES**.
5. Vào **phpMyAdmin** trên cPanel $\\rightarrow$ Chọn Database vừa tạo $\\rightarrow$ Import file \`database.sql\`.
6. Mở file \`config/db.php\` trong File Manager và cập nhật thông tin: DB Name, DB User, DB Password vừa tạo.
7. Truy cập Tên miền của Quý Khách để hoàn tất!
`;
    zip.addFile('HUONG-DAN-CAI-DAT-XAMPP-CPANEL.md', Buffer.from(phpGuideContent, 'utf-8'));

    // 18. README.md — HƯỚNG DẪN TỔNG THỂ TIẾNG VIỆT
    const readmeContent = `# HƯỚNG DẪN SỬ DỤNG TRỌN BỘ MÃ NGUỒN BẤT ĐỘNG SẢN

Xin chúc mừng Quý Khách đã sở hữu trọn bộ mã nguồn **Website & Hệ Thống Quản Trị Bất Động Sản** (Đơn hàng: **#${orderNumber}**).

---

## 🎁 GÓI MÃ NGUỒN CỦA QUÝ KHÁCH BAO GỒM TRỌN BỘ 3 ĐỊNH DẠNG:

1. 📂 **Bản Tĩnh HTML5/CSS3/JavaScript (\`ban-tinh-html-css-js\`)**:
   - Dành cho Quý Khách muốn xem nhanh trên máy: **Chỉ cần click đúp chuột vào file \`index.html\` là mở ngay**, không cần cài đặt bất kỳ phần mềm nào!

2. 📂 **Bản Hosting PHP & MySQL (\`ban-hosting-php-mysql\`)**:
   - Dành cho Quý Khách muốn đưa lên Hosting cPanel / XAMPP truyền thống (xem chi tiết tại file \`HUONG-DAN-CAI-DAT-XAMPP-CPANEL.md\`).

3. 📂 **Bản Độc Lập Cao Cấp Next.js 15 + CMS Quản Trị (Thư mục gốc)**:
   - Dành cho doanh nghiệp / IT cần hệ thống quản trị chuyên nghiệp với PostgreSQL và Next.js 15:
     \`\`\`bash
     npm install
     npx prisma db push && npm run prisma:seed
     npm run dev
     \`\`\`
   - Website: http://localhost:3000 | CMS: http://localhost:3000/admin (Tài khoản: \`${compEmail}\` - Pass: \`${defaultAdminPassword}\`).

4. 📘 **File \`HUONG-DAN-UP-LEN-GITHUB.md\`**: Hướng dẫn từng lệnh đưa mã nguồn lên GitHub cá nhân.

---
*Bản quyền mã nguồn thuộc về ${customerName} — Chúc Quý Khách kinh doanh hồng phát!*
`;
    zip.addFile('README.md', Buffer.from(readmeContent, 'utf-8'));

    const zipBuffer = zip.toBuffer();
    const downloadFileName = `BDS-PACKAGE-${templateSlug.toUpperCase()}-${orderNumber}.zip`;
    const fileSizeBytes = BigInt(zipBuffer.length);

    logger.info(`[SingleTenantExporter] Đóng gói thành công ZIP ${downloadFileName} (Dung lượng: ${fileSizeBytes} bytes)`);

    return {
      buffer: zipBuffer,
      fileName: downloadFileName,
      fileSizeBytes,
    };
  }
}
