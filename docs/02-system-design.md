# 🏗️ System Design Document

## Real Estate Template Marketplace & SaaS Platform

| Thông tin | Chi tiết |
|-----------|----------|
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 05/07/2026 |
| **Tác giả** | Principal Software Architect |
| **Trạng thái** | Draft |

---

## 1. Tổng Quan Kiến Trúc (Architecture Overview)

### 1.1 Context Diagram (C4 Level 1)

Diagram mô tả hệ thống ở mức cao nhất — các actors bên ngoài tương tác với hệ thống.

```mermaid
C4Context
    title System Context Diagram - BĐS Template Platform

    Person(visitor, "Khách truy cập", "Xem template, gửi form báo giá")
    Person(tenant, "Tenant Admin", "Quản lý nội dung website BĐS qua CMS")
    Person(admin, "Platform Admin", "Quản lý toàn bộ nền tảng")
    Person(enduser, "Người dùng cuối", "Truy cập website BĐS của tenant")

    System(platform, "BĐS Template Platform", "Marketplace + CMS + Multi-tenant Websites")

    System_Ext(cloudinary, "Cloudinary", "Image hosting & CDN")
    System_Ext(smtp, "SMTP Server", "Gửi email thông báo")
    System_Ext(cloudflare, "Cloudflare", "DNS + SSL + CDN + DDoS Protection")

    Rel(visitor, platform, "Xem template, gửi báo giá", "HTTPS")
    Rel(tenant, platform, "Quản lý nội dung", "HTTPS")
    Rel(admin, platform, "Quản lý hệ thống", "HTTPS")
    Rel(enduser, platform, "Xem website BĐS", "HTTPS")
    Rel(platform, cloudinary, "Upload/Serve ảnh", "HTTPS API")
    Rel(platform, smtp, "Gửi email", "SMTP/TLS")
    Rel(cloudflare, platform, "Proxy + SSL", "HTTPS")
```

### 1.2 Container Diagram (C4 Level 2)

Diagram mô tả các container (ứng dụng, database, services) trong hệ thống.

```mermaid
C4Container
    title Container Diagram - BĐS Template Platform

    Person(visitor, "Khách truy cập")
    Person(tenant, "Tenant Admin")
    Person(admin, "Platform Admin")
    Person(enduser, "Người dùng cuối")

    System_Boundary(platform, "BĐS Template Platform") {
        Container(marketplace, "Marketplace App", "Next.js", "www.myplatform.com - Hiển thị template, báo giá")
        Container(cms, "CMS App", "Next.js", "cms.myplatform.com - Quản lý nội dung tenant")
        Container(website, "Website App", "Next.js", "[slug].myplatform.com - Website BĐS multi-tenant")
        Container(adminapp, "Admin App", "Next.js", "admin.myplatform.com - Quản lý platform")
        Container(api, "API Server", "Node.js + Express", "api.myplatform.com - RESTful API")
        ContainerDb(db, "PostgreSQL", "PostgreSQL 15", "Shared DB với tenant_id isolation")
        Container(nginx, "Nginx", "Reverse Proxy", "Routing theo subdomain")
    }

    System_Ext(cloudinary, "Cloudinary")
    System_Ext(smtp, "SMTP Server")

    Rel(visitor, nginx, "HTTPS")
    Rel(tenant, nginx, "HTTPS")
    Rel(admin, nginx, "HTTPS")
    Rel(enduser, nginx, "HTTPS")
    Rel(nginx, marketplace, "www.*")
    Rel(nginx, cms, "cms.*")
    Rel(nginx, website, "[slug].*")
    Rel(nginx, adminapp, "admin.*")
    Rel(marketplace, api, "REST API")
    Rel(cms, api, "REST API")
    Rel(website, api, "REST API")
    Rel(adminapp, api, "REST API")
    Rel(api, db, "Prisma ORM")
    Rel(api, cloudinary, "Image API")
    Rel(api, smtp, "Send email")
```

### 1.3 Component Diagram (C4 Level 3) — API Server

```mermaid
C4Component
    title Component Diagram - API Server

    Container_Boundary(api, "API Server") {
        Component(authCtrl, "Auth Controller", "Express Router", "Register, Login, Refresh, Forgot Password")
        Component(projectCtrl, "Project Controller", "Express Router", "CRUD dự án BĐS")
        Component(postCtrl, "Post Controller", "Express Router", "CRUD bài viết")
        Component(tenantCtrl, "Tenant Controller", "Express Router", "Quản lý tenant")
        Component(orderCtrl, "Order Controller", "Express Router", "Quản lý đơn hàng")
        Component(mediaCtrl, "Media Controller", "Express Router", "Upload, xóa media")
        Component(templateCtrl, "Template Controller", "Express Router", "CRUD template")
        Component(demoCtrl, "Demo Controller", "Express Router", "Demo session management")

        Component(authMiddleware, "Auth Middleware", "Express Middleware", "JWT verification + Role check")
        Component(tenantMiddleware, "Tenant Middleware", "Express Middleware", "Tenant isolation filter")
        Component(rateLimiter, "Rate Limiter", "Express Middleware", "Request throttling")
        Component(validator, "Validator", "Joi/Zod", "Input validation")

        Component(authService, "Auth Service", "Service Layer", "Business logic xác thực")
        Component(projectService, "Project Service", "Service Layer", "Business logic dự án")
        Component(uploadService, "Upload Service", "Service Layer", "Cloudinary integration")
        Component(emailService, "Email Service", "Service Layer", "Nodemailer integration")

        Component(prisma, "Prisma Client", "ORM", "Database access layer")
    }

    ContainerDb(db, "PostgreSQL")
    System_Ext(cloudinary, "Cloudinary")
    System_Ext(smtp, "SMTP")

    Rel(authCtrl, authMiddleware, "Uses")
    Rel(projectCtrl, tenantMiddleware, "Uses")
    Rel(authCtrl, authService, "Uses")
    Rel(projectCtrl, projectService, "Uses")
    Rel(mediaCtrl, uploadService, "Uses")
    Rel(authService, emailService, "Uses")
    Rel(authService, prisma, "Uses")
    Rel(projectService, prisma, "Uses")
    Rel(prisma, db, "SQL")
    Rel(uploadService, cloudinary, "API")
    Rel(emailService, smtp, "SMTP")
```

---

## 2. Cấu Trúc Monorepo

### 2.1 Tổng quan

Dự án sử dụng kiến trúc **Monorepo** để quản lý tất cả các ứng dụng và packages trong một repository duy nhất. Điều này giúp:

- **Code sharing**: Dùng chung types, utils, UI components.
- **Consistent versioning**: Đồng bộ phiên bản giữa các apps.
- **Single CI/CD**: Build và deploy tất cả từ một pipeline.
- **Atomic changes**: Thay đổi liên quan giữa nhiều apps trong một commit.

### 2.2 Cấu trúc thư mục

```
bds-template-platform/
├── apps/
│   ├── marketplace/          # Next.js — www.myplatform.com
│   │   ├── src/
│   │   │   ├── app/          # App Router (Next.js 14+)
│   │   │   ├── components/   # React components
│   │   │   ├── hooks/        # Custom hooks
│   │   │   ├── lib/          # Utilities
│   │   │   └── styles/       # CSS/Tailwind
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   ├── cms/                  # Next.js — cms.myplatform.com
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── [tenant-slug]/  # Dynamic route theo tenant
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── lib/
│   │   └── package.json
│   │
│   ├── website/              # Next.js — [slug].myplatform.com
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── templates/    # Template variants
│   │   │   │   ├── luxury-gold/
│   │   │   │   ├── modern-blue/
│   │   │   │   └── elegant-green/
│   │   │   ├── hooks/
│   │   │   └── lib/
│   │   └── package.json
│   │
│   └── admin/                # Next.js — admin.myplatform.com
│       ├── src/
│       │   ├── app/
│       │   ├── components/
│       │   └── lib/
│       └── package.json
│
├── server/                   # Express.js API Server
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── services/         # Business logic
│   │   ├── middlewares/       # Auth, Tenant, RateLimit, Error
│   │   ├── routes/           # Route definitions
│   │   ├── validators/       # Input validation schemas
│   │   ├── utils/            # Helper functions
│   │   ├── config/           # App configuration
│   │   ├── types/            # TypeScript type definitions
│   │   └── app.ts            # Express app setup
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   ├── migrations/       # Migration files
│   │   └── seed.ts           # Seed data
│   ├── tests/
│   ├── tsconfig.json
│   └── package.json
│
├── packages/
│   ├── shared/               # Shared utilities & types
│   │   ├── src/
│   │   │   ├── types/        # Shared TypeScript interfaces
│   │   │   ├── constants/    # Shared constants
│   │   │   ├── utils/        # Shared utility functions
│   │   │   └── validators/   # Shared validation schemas
│   │   └── package.json
│   │
│   ├── database/             # Prisma client wrapper
│   │   ├── src/
│   │   │   ├── client.ts     # Prisma client singleton
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── ui/                   # Shared UI components
│       ├── src/
│       │   ├── components/   # Reusable React components
│       │   ├── hooks/
│       │   └── styles/
│       └── package.json
│
├── docker/
│   ├── Dockerfile.api
│   ├── Dockerfile.web
│   └── docker-compose.yml
│
├── nginx/
│   └── nginx.conf            # Subdomain routing config
│
├── turbo.json                # Turborepo configuration
├── package.json              # Root package.json
├── tsconfig.base.json
└── .env.example
```

### 2.3 Package Dependencies

```mermaid
graph TD
    A[apps/marketplace] --> D[packages/shared]
    A --> F[packages/ui]
    B[apps/cms] --> D
    B --> F
    C[apps/website] --> D
    C --> F
    E[apps/admin] --> D
    E --> F
    G[server] --> D
    G --> H[packages/database]
    H --> D

    style A fill:#4CAF50,color:#fff
    style B fill:#2196F3,color:#fff
    style C fill:#FF9800,color:#fff
    style E fill:#F44336,color:#fff
    style G fill:#9C27B0,color:#fff
    style D fill:#607D8B,color:#fff
    style F fill:#607D8B,color:#fff
    style H fill:#607D8B,color:#fff
```

---

## 3. Kiến Trúc Multi-Tenancy

### 3.1 Chiến lược: Shared Database with Tenant ID

Hệ thống sử dụng mô hình **Shared Database** — tất cả tenants chia sẻ cùng một PostgreSQL database, nhưng dữ liệu được cách ly bằng cột `tenant_id` trên mọi bảng liên quan đến tenant.

```mermaid
graph TB
    subgraph "Shared PostgreSQL Database"
        subgraph "Table: projects"
            P1["id=1, tenant_id='abc', name='Vinhomes Grand Park'"]
            P2["id=2, tenant_id='abc', name='The Sun Avenue'"]
            P3["id=3, tenant_id='xyz', name='Masteri Thảo Điền'"]
            P4["id=4, tenant_id='xyz', name='Gateway Thảo Điền'"]
        end
    end

    subgraph "Tenant ABC"
        TA["abc.myplatform.com"]
    end

    subgraph "Tenant XYZ"
        TX["xyz.myplatform.com"]
    end

    TA -->|"WHERE tenant_id = 'abc'"| P1
    TA -->|"WHERE tenant_id = 'abc'"| P2
    TX -->|"WHERE tenant_id = 'xyz'"| P3
    TX -->|"WHERE tenant_id = 'xyz'"| P4

    style P1 fill:#E3F2FD
    style P2 fill:#E3F2FD
    style P3 fill:#FFF3E0
    style P4 fill:#FFF3E0
```

### 3.2 Tenant Isolation Middleware

Mỗi API request liên quan đến tenant data phải đi qua **Tenant Middleware** để đảm bảo data isolation.

```typescript
// server/src/middlewares/tenant.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { prisma } from '@bds/database';

export interface TenantRequest extends Request {
  tenantId?: string;
  tenant?: {
    id: string;
    slug: string;
    name: string;
    status: string;
    templateId: string;
  };
}

/**
 * Middleware xác định tenant từ:
 * 1. JWT token (cho CMS - tenant admin đã đăng nhập)
 * 2. Subdomain header (cho public website - x-tenant-slug)
 * 3. URL parameter (cho admin panel)
 */
export const tenantMiddleware = async (
  req: TenantRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let tenantSlug: string | undefined;

    // 1. Từ JWT token (user đã đăng nhập)
    if (req.user?.tenantId) {
      const tenant = await prisma.tenant.findUnique({
        where: { id: req.user.tenantId, deletedAt: null },
      });
      if (!tenant || tenant.status !== 'ACTIVE') {
        return res.status(403).json({ error: 'Tenant không hoạt động' });
      }
      req.tenantId = tenant.id;
      req.tenant = tenant;
      return next();
    }

    // 2. Từ subdomain header
    tenantSlug = req.headers['x-tenant-slug'] as string;

    // 3. Từ URL parameter
    if (!tenantSlug) {
      tenantSlug = req.params.tenantSlug;
    }

    if (!tenantSlug) {
      return res.status(400).json({ error: 'Không xác định được tenant' });
    }

    const tenant = await prisma.tenant.findUnique({
      where: { slug: tenantSlug, deletedAt: null },
    });

    if (!tenant || tenant.status !== 'ACTIVE') {
      return res.status(404).json({ error: 'Tenant không tồn tại hoặc chưa kích hoạt' });
    }

    req.tenantId = tenant.id;
    req.tenant = tenant;
    next();
  } catch (error) {
    next(error);
  }
};
```

### 3.3 Prisma Middleware cho Auto-filter

```typescript
// server/src/config/prisma-tenant.ts

import { Prisma } from '@prisma/client';

// Danh sách models cần tenant isolation
const TENANT_MODELS = [
  'Project', 'Post', 'Banner', 'MenuItem', 'CompanyInfo',
  'SeoConfig', 'Media', 'ContactFormSubmission', 'Category', 'Tag'
];

/**
 * Prisma middleware tự động thêm tenant_id filter
 * vào mọi query liên quan đến tenant data.
 * 
 * QUAN TRỌNG: Middleware này KHÔNG thay thế cho việc
 * kiểm tra tenant_id trong service layer. Đây là lớp
 * bảo vệ bổ sung (defense in depth).
 */
export function applyTenantFilter(tenantId: string) {
  return Prisma.defineExtension({
    query: {
      $allOperations({ model, operation, args, query }) {
        if (model && TENANT_MODELS.includes(model)) {
          if (['findMany', 'findFirst', 'findUnique', 'count', 'aggregate'].includes(operation)) {
            args.where = { ...args.where, tenantId };
          }
          if (['create', 'createMany'].includes(operation)) {
            if (Array.isArray(args.data)) {
              args.data = args.data.map((d: any) => ({ ...d, tenantId }));
            } else {
              args.data = { ...args.data, tenantId };
            }
          }
          if (['update', 'updateMany', 'delete', 'deleteMany'].includes(operation)) {
            args.where = { ...args.where, tenantId };
          }
        }
        return query(args);
      },
    },
  });
}
```

### 3.4 Ưu nhược điểm của Shared DB

| Ưu điểm | Nhược điểm |
|----------|-----------|
| ✅ Đơn giản triển khai | ❌ Risk data leak nếu quên filter |
| ✅ Tiết kiệm tài nguyên | ❌ Noisy neighbor problem |
| ✅ Dễ maintenance (1 DB) | ❌ Khó scale khi quá nhiều tenants |
| ✅ Dễ query cross-tenant (admin) | ❌ Backup/Restore per tenant khó |
| ✅ Migration đơn giản | ❌ Performance index kém với data lớn |

**Quyết định**: Shared DB phù hợp cho MVP với mục tiêu 100 tenants. Khi scale lên 1000+ tenants, cần xem xét chuyển sang schema-per-tenant hoặc database-per-tenant.

---

## 4. Subdomain Routing

### 4.1 Tổng quan URL Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Cloudflare DNS                        │
│  *.myplatform.com → VPS IP (Wildcard DNS)              │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                      Nginx                               │
│                                                          │
│  www.myplatform.com    → localhost:3000 (Marketplace)   │
│  cms.myplatform.com    → localhost:3001 (CMS)           │
│  admin.myplatform.com  → localhost:3002 (Admin)         │
│  api.myplatform.com    → localhost:4000 (API Server)    │
│  *.myplatform.com      → localhost:3003 (Website App)   │
│                          + Header: x-tenant-slug=$slug  │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Nginx Configuration

```nginx
# nginx/nginx.conf

# Upstream definitions
upstream marketplace { server localhost:3000; }
upstream cms        { server localhost:3001; }
upstream admin_app  { server localhost:3002; }
upstream website    { server localhost:3003; }
upstream api        { server localhost:4000; }

# ---- API Server ----
server {
    listen 80;
    server_name api.myplatform.com;

    location / {
        proxy_pass http://api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # CORS headers
        add_header Access-Control-Allow-Origin $http_origin always;
        add_header Access-Control-Allow-Credentials true always;
    }

    # Upload size limit
    client_max_body_size 10M;
}

# ---- Marketplace ----
server {
    listen 80;
    server_name www.myplatform.com myplatform.com;

    location / {
        proxy_pass http://marketplace;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# ---- CMS ----
server {
    listen 80;
    server_name cms.myplatform.com;

    location / {
        proxy_pass http://cms;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# ---- Admin Panel ----
server {
    listen 80;
    server_name admin.myplatform.com;

    location / {
        proxy_pass http://admin_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# ---- Tenant Websites (Wildcard) ----
# Xử lý TẤT CẢ subdomain không match các rule trên
server {
    listen 80;
    server_name ~^(?<tenant_slug>[^.]+)\.myplatform\.com$;

    location / {
        proxy_pass http://website;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        # Truyền tenant slug qua header để Next.js middleware xử lý
        proxy_set_header X-Tenant-Slug $tenant_slug;
    }
}
```

### 4.3 Next.js Middleware (Website App)

```typescript
// apps/website/src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Lấy tenant slug từ header (do Nginx set)
  const tenantSlug = request.headers.get('x-tenant-slug');

  if (!tenantSlug) {
    // Không có tenant slug → redirect về marketplace
    return NextResponse.redirect(new URL('https://www.myplatform.com'));
  }

  // Validate tenant tồn tại (cache kết quả)
  const isValid = await validateTenant(tenantSlug);

  if (!isValid) {
    return NextResponse.redirect(
      new URL('https://www.myplatform.com/404?reason=tenant-not-found')
    );
  }

  // Set tenant context cho các API calls phía dưới
  const response = NextResponse.next();
  response.headers.set('x-tenant-slug', tenantSlug);

  // Truyền tenantSlug vào request để pages có thể dùng
  const url = request.nextUrl.clone();
  url.searchParams.set('_tenant', tenantSlug);

  return NextResponse.rewrite(url);
}

// Cache tenant validation (in-memory, 5 phút TTL)
const tenantCache = new Map<string, { valid: boolean; expiry: number }>();

async function validateTenant(slug: string): Promise<boolean> {
  const cached = tenantCache.get(slug);
  if (cached && cached.expiry > Date.now()) {
    return cached.valid;
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/tenants/validate/${slug}`,
      { next: { revalidate: 300 } } // ISR 5 phút
    );
    const valid = res.ok;
    tenantCache.set(slug, {
      valid,
      expiry: Date.now() + 5 * 60 * 1000,
    });
    return valid;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

### 4.4 Data Fetching trong Website App

```typescript
// apps/website/src/lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Fetch data từ API với tenant context.
 * Tenant slug được truyền qua header x-tenant-slug.
 */
export async function fetchTenantData<T>(
  endpoint: string,
  tenantSlug: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}/api${endpoint}`, {
    ...options,
    headers: {
      ...options?.headers,
      'x-tenant-slug': tenantSlug,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Sử dụng trong Server Component
// apps/website/src/app/page.tsx
export default async function HomePage({
  searchParams,
}: {
  searchParams: { _tenant: string };
}) {
  const tenantSlug = searchParams._tenant;

  const [companyInfo, featuredProjects, latestPosts] = await Promise.all([
    fetchTenantData('/company-info', tenantSlug),
    fetchTenantData('/projects?featured=true&limit=6', tenantSlug),
    fetchTenantData('/posts?limit=3&sort=-createdAt', tenantSlug),
  ]);

  return <HomeTemplate data={{ companyInfo, featuredProjects, latestPosts }} />;
}
```

---

## 5. Template Engine Architecture

### 5.1 Thiết kế Template System

Hệ thống template **KHÔNG** sử dụng drag-drop. Thay vào đó, mỗi template là một **bộ components React** khác nhau về visual design, nhưng chia sẻ **cùng một cấu trúc content** (data interface).

```mermaid
graph TB
    subgraph "Content Layer (Shared)"
        DATA["Content Data<br/>CompanyInfo, Projects,<br/>Posts, Banners, Menu"]
    end

    subgraph "Template Layer (Variable)"
        T1["🏆 Luxury Gold<br/>Gold + White theme<br/>Serif fonts<br/>Card style A"]
        T2["🌊 Modern Blue<br/>Blue + Gray theme<br/>Sans-serif fonts<br/>Card style B"]
        T3["🌿 Elegant Green<br/>Green + Cream theme<br/>Mixed fonts<br/>Card style C"]
    end

    subgraph "Output"
        W1["Website 1<br/>abc.myplatform.com"]
        W2["Website 2<br/>xyz.myplatform.com"]
        W3["Website 3<br/>def.myplatform.com"]
    end

    DATA --> T1 --> W1
    DATA --> T2 --> W2
    DATA --> T3 --> W3

    style T1 fill:#FFD700,color:#000
    style T2 fill:#2196F3,color:#fff
    style T3 fill:#4CAF50,color:#fff
```

### 5.2 CSS Variables System

Mỗi template định nghĩa một bộ CSS variables. Tenant có thể override một số biến qua CMS (logo, primary color).

```css
/* packages/ui/src/styles/theme-variables.css */

:root {
  /* === Base Colors (Template defines, Tenant can override) === */
  --color-primary: #C8A55A;        /* Gold */
  --color-primary-dark: #A88832;
  --color-primary-light: #E8D5A0;
  --color-secondary: #1A1A1A;
  --color-accent: #FFFFFF;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #666666;
  --color-text-on-primary: #FFFFFF;
  --color-border: #E0E0E0;
  --color-error: #E53935;
  --color-success: #43A047;

  /* === Typography === */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --font-size-base: 16px;
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  --font-size-h3: 1.5rem;
  --font-size-small: 0.875rem;
  --line-height-base: 1.6;

  /* === Spacing === */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-section: 5rem;

  /* === Layout === */
  --max-width: 1200px;
  --border-radius: 8px;
  --border-radius-lg: 16px;

  /* === Shadows === */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);

  /* === Transitions === */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
}
```

### 5.3 Template Configuration

```typescript
// apps/website/src/templates/types.ts

export interface TemplateConfig {
  id: string;
  name: string;
  slug: string;

  // CSS Variables override
  theme: {
    colorPrimary: string;
    colorPrimaryDark: string;
    colorPrimaryLight: string;
    colorSecondary: string;
    fontHeading: string;
    fontBody: string;
    borderRadius: string;
  };

  // Layout configuration
  layout: {
    headerStyle: 'transparent' | 'solid' | 'sticky';
    footerStyle: 'simple' | 'detailed' | 'minimal';
    heroStyle: 'fullscreen' | 'half' | 'compact';
    projectCardStyle: 'card' | 'overlay' | 'horizontal';
    sidebarPosition: 'left' | 'right' | 'none';
  };

  // Feature flags
  features: {
    showMap: boolean;
    showVirtualTour: boolean;
    showFloorPlans: boolean;
    showTestimonials: boolean;
    showPartners: boolean;
    showNewsletter: boolean;
  };
}

// Ví dụ: Luxury Gold Template
export const luxuryGoldConfig: TemplateConfig = {
  id: 'luxury-gold',
  name: 'Luxury Gold',
  slug: 'luxury-gold',
  theme: {
    colorPrimary: '#C8A55A',
    colorPrimaryDark: '#A88832',
    colorPrimaryLight: '#E8D5A0',
    colorSecondary: '#1A1A1A',
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
    borderRadius: '8px',
  },
  layout: {
    headerStyle: 'transparent',
    footerStyle: 'detailed',
    heroStyle: 'fullscreen',
    projectCardStyle: 'overlay',
    sidebarPosition: 'none',
  },
  features: {
    showMap: true,
    showVirtualTour: true,
    showFloorPlans: true,
    showTestimonials: true,
    showPartners: true,
    showNewsletter: false,
  },
};
```

### 5.4 Template Component Resolution

```typescript
// apps/website/src/templates/registry.ts

import { TemplateConfig } from './types';

// Dynamic import templates
const templateModules: Record<string, () => Promise<any>> = {
  'luxury-gold': () => import('./luxury-gold'),
  'modern-blue': () => import('./modern-blue'),
  'elegant-green': () => import('./elegant-green'),
};

/**
 * Tải template components dựa trên config.
 * Mỗi template export cùng một interface:
 * { Header, Footer, Hero, ProjectCard, PostCard, ContactForm, ... }
 */
export async function loadTemplate(templateSlug: string) {
  const loader = templateModules[templateSlug];
  if (!loader) {
    throw new Error(`Template "${templateSlug}" không tồn tại`);
  }
  return loader();
}

// Sử dụng trong layout
// apps/website/src/app/layout.tsx
export default async function TenantLayout({ children, params }) {
  const tenant = await getTenantBySlug(params._tenant);
  const template = await loadTemplate(tenant.template.slug);
  const config = tenant.template.config as TemplateConfig;

  return (
    <html lang="vi" style={cssVariablesFromConfig(config.theme)}>
      <body>
        <template.Header config={config} companyInfo={tenant.companyInfo} />
        <main>{children}</main>
        <template.Footer config={config} companyInfo={tenant.companyInfo} />
      </body>
    </html>
  );
}
```

---

## 6. CMS Architecture

### 6.1 Content Management Flow

```mermaid
sequenceDiagram
    actor TA as Tenant Admin
    participant CMS as CMS App
    participant API as API Server
    participant DB as PostgreSQL
    participant CDN as Cloudinary
    participant WEB as Website App

    TA->>CMS: Đăng nhập (email + password)
    CMS->>API: POST /api/auth/login
    API->>DB: Verify credentials
    API-->>CMS: JWT tokens

    TA->>CMS: Tạo dự án mới
    TA->>CMS: Upload ảnh dự án
    CMS->>CDN: Upload images
    CDN-->>CMS: Image URLs

    CMS->>API: POST /api/projects
    Note over API: Auth middleware → verify JWT<br/>Tenant middleware → inject tenantId
    API->>DB: INSERT project (with tenantId)
    API-->>CMS: Project created (201)

    TA->>CMS: Publish dự án
    CMS->>API: PATCH /api/projects/:id {published: true}
    API->>DB: UPDATE project

    Note over WEB: Website tự động hiển thị<br/>dự án mới (ISR revalidate)

    TA->>WEB: Xem website để kiểm tra
    WEB->>API: GET /api/projects?published=true
    Note over API: Tenant middleware tự động<br/>filter theo x-tenant-slug
    API->>DB: SELECT WHERE tenantId AND published
    API-->>WEB: Projects data
    WEB-->>TA: Hiển thị website với dự án mới
```

### 6.2 CMS URL Structure

```
cms.myplatform.com/[tenant-slug]/
├── dashboard                    # Tổng quan
├── projects                     # Danh sách dự án
│   ├── new                     # Tạo mới
│   └── [id]/edit               # Sửa dự án
├── posts                        # Danh sách bài viết
│   ├── new
│   └── [id]/edit
├── banners                      # Quản lý banner
├── menus                        # Quản lý menu
├── company-info                 # Thông tin công ty
├── seo                          # Cài đặt SEO
├── media                        # Thư viện media
├── contacts                     # Form liên hệ đã nhận
└── settings                     # Cài đặt chung
```

### 6.3 CMS Permission Matrix

| Resource | TENANT_ADMIN | TENANT_EDITOR |
|----------|:------------:|:-------------:|
| Dashboard | ✅ View | ✅ View |
| Projects | ✅ CRUD | ✅ Create, Read, Update (own) |
| Posts | ✅ CRUD | ✅ Create, Read, Update (own) |
| Banners | ✅ CRUD | ❌ |
| Menus | ✅ CRUD | ❌ |
| Company Info | ✅ Edit | ❌ |
| SEO Config | ✅ Edit | ❌ |
| Media | ✅ CRUD | ✅ Upload, View |
| Contacts | ✅ View, Delete | ✅ View |
| Settings | ✅ Edit | ❌ |

---

## 7. Demo System Architecture

### 7.1 Demo Flow

```mermaid
stateDiagram-v2
    [*] --> VisitTemplate: Khách xem template
    VisitTemplate --> StaticDemo: Click "Xem Demo"
    StaticDemo --> CustomizeDemo: Click "Thử tùy chỉnh"

    CustomizeDemo --> CreateSession: Tạo cookie session
    CreateSession --> Editing: Bắt đầu chỉnh sửa

    Editing --> SaveChange: Save thay đổi
    SaveChange --> CheckLimit: Kiểm tra giới hạn

    CheckLimit --> Editing: saves < 3 AND days < 3
    CheckLimit --> Expired: saves >= 3 OR days >= 3

    Expired --> PurchasePage: Redirect đến trang mua
    PurchasePage --> [*]

    state CheckLimit {
        [*] --> CountSaves
        CountSaves --> CountDays
        CountDays --> [*]
    }
```

### 7.2 Demo Session Data Model

```typescript
// Demo session được lưu trong database + cookie

interface DemoSession {
  id: string;                    // UUID
  sessionToken: string;          // Random token lưu trong cookie
  templateId: string;            // Template đang demo
  
  // Custom data
  customData: {
    logo?: string;               // URL logo đã upload
    companyName?: string;
    primaryColor?: string;
    bannerText?: string;
    bannerSubtext?: string;
    phone?: string;
    email?: string;
  };
  
  // Limits
  saveCount: number;             // Đếm số lần save (max 3)
  createdAt: Date;               // Thời điểm tạo session
  expiresAt: Date;               // createdAt + 3 days
  
  // Status
  isExpired: boolean;            // computed: saveCount >= 3 OR now > expiresAt
}
```

### 7.3 Demo API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/demo/sessions` | Tạo demo session mới |
| GET | `/api/demo/sessions/:token` | Lấy session data |
| PUT | `/api/demo/sessions/:token` | Save customization (tăng saveCount) |
| GET | `/api/demo/sessions/:token/status` | Kiểm tra remaining saves/days |
| DELETE | `/api/demo/sessions/:token` | Xóa session |

---

## 8. Authentication & Authorization

### 8.1 Auth Flow

```mermaid
sequenceDiagram
    actor User
    participant Client as Next.js Client
    participant API as API Server
    participant DB as PostgreSQL

    Note over User, DB: === ĐĂNG NHẬP ===
    User->>Client: Nhập email + password
    Client->>API: POST /api/auth/login
    API->>DB: Find user by email
    API->>API: Verify password (bcrypt)
    API->>DB: Create RefreshToken record
    API-->>Client: { accessToken, user } + Set-Cookie(refreshToken, httpOnly)
    Client->>Client: Lưu accessToken vào memory (state)

    Note over User, DB: === GỌI API VỚI AUTH ===
    Client->>API: GET /api/projects (Authorization: Bearer {accessToken})
    API->>API: Verify JWT (15 min TTL)
    API->>DB: Query data
    API-->>Client: Response data

    Note over User, DB: === TOKEN HẾT HẠN ===
    Client->>API: GET /api/projects (expired accessToken)
    API-->>Client: 401 Unauthorized
    Client->>API: POST /api/auth/refresh (Cookie: refreshToken)
    API->>DB: Validate refreshToken record
    API->>API: Generate new accessToken
    API->>DB: Rotate refreshToken (delete old, create new)
    API-->>Client: { accessToken } + Set-Cookie(new refreshToken)
    Client->>API: Retry original request with new accessToken
    API-->>Client: Response data

    Note over User, DB: === ĐĂNG XUẤT ===
    User->>Client: Click Đăng xuất
    Client->>API: POST /api/auth/logout (Cookie: refreshToken)
    API->>DB: Delete RefreshToken record
    API-->>Client: Clear Cookie + 200 OK
    Client->>Client: Clear accessToken from memory
```

### 8.2 JWT Token Structure

```typescript
// Access Token Payload
interface AccessTokenPayload {
  sub: string;          // User ID
  email: string;
  role: 'PLATFORM_ADMIN' | 'TENANT_ADMIN' | 'TENANT_EDITOR';
  tenantId?: string;    // null cho PLATFORM_ADMIN
  iat: number;          // Issued at
  exp: number;          // Expires (15 minutes)
}

// Refresh Token: stored in DB, referenced by httpOnly cookie
interface RefreshTokenRecord {
  id: string;
  token: string;        // Random string (hashed in DB)
  userId: string;
  expiresAt: Date;      // 7 days from creation
  createdAt: Date;
  revokedAt?: Date;     // Set when token is revoked
  replacedByToken?: string; // Token rotation tracking
  userAgent?: string;   // For device tracking
  ipAddress?: string;
}
```

### 8.3 Role-Based Access Control

```typescript
// server/src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type Role = 'PLATFORM_ADMIN' | 'TENANT_ADMIN' | 'TENANT_EDITOR';

/**
 * Middleware xác thực JWT token.
 * Giải mã token và gắn user info vào request.
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as AccessTokenPayload;
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

/**
 * Middleware kiểm tra role.
 * Sử dụng: authorize('PLATFORM_ADMIN', 'TENANT_ADMIN')
 */
export const authorize = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

---

## 9. File Upload Flow (Cloudinary)

### 9.1 Upload Flow

```mermaid
sequenceDiagram
    actor User
    participant Client as CMS Client
    participant API as API Server
    participant Cloud as Cloudinary
    participant DB as PostgreSQL

    User->>Client: Chọn file ảnh
    Client->>Client: Validate client-side<br/>(type, size < 5MB)

    Client->>API: POST /api/media/upload<br/>(multipart/form-data)
    API->>API: Validate server-side<br/>(type, size, dimensions)

    API->>Cloud: Upload with options<br/>(folder, transform, quality)
    Cloud->>Cloud: Optimize image<br/>(resize, compress, WebP)
    Cloud-->>API: { publicId, url, secureUrl, width, height, format, bytes }

    API->>DB: INSERT Media record<br/>(tenantId, url, metadata)
    API-->>Client: { id, url, thumbnail }

    Client-->>User: Hiển thị ảnh đã upload
```

### 9.2 Upload Service Implementation

```typescript
// server/src/services/upload.service.ts

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface UploadOptions {
  tenantId: string;
  folder?: string;        // e.g., 'projects', 'banners', 'logos'
  maxWidth?: number;       // Auto-resize
  maxHeight?: number;
}

export class UploadService {
  /**
   * Upload ảnh lên Cloudinary.
   * Tự động:
   * - Tổ chức theo folder: tenants/{tenantId}/{folder}/
   * - Resize nếu quá lớn
   * - Chuyển sang WebP
   * - Optimize quality
   */
  async uploadImage(
    fileBuffer: Buffer,
    options: UploadOptions
  ): Promise<UploadApiResponse> {
    const folder = `tenants/${options.tenantId}/${options.folder || 'general'}`;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          format: 'webp',
          quality: 'auto:good',
          transformation: [
            {
              width: options.maxWidth || 1920,
              height: options.maxHeight || 1080,
              crop: 'limit', // Không phóng to, chỉ thu nhỏ
            },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        }
      );
      uploadStream.end(fileBuffer);
    });
  }

  /**
   * Xóa ảnh trên Cloudinary
   */
  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }

  /**
   * Tạo thumbnail URL với transformation
   */
  getThumbnailUrl(url: string, width = 300, height = 200): string {
    return url.replace('/upload/', `/upload/c_fill,w_${width},h_${height}/`);
  }
}
```

### 9.3 Cloudinary Folder Structure

```
cloudinary/
├── tenants/
│   ├── {tenant-id-1}/
│   │   ├── logos/
│   │   ├── banners/
│   │   ├── projects/
│   │   ├── posts/
│   │   └── general/
│   ├── {tenant-id-2}/
│   │   └── ...
├── platform/
│   ├── templates/         # Template screenshots
│   ├── marketing/         # Marketplace images
│   └── system/            # System images
└── demo/
    └── {session-id}/      # Demo session uploads (auto-cleanup)
```

---

## 10. Caching Strategy

### 10.1 Tổng quan các tầng cache

```mermaid
graph LR
    A[Client] --> B[Cloudflare CDN]
    B --> C[Nginx Cache]
    C --> D[Next.js ISR Cache]
    D --> E[API In-Memory Cache]
    E --> F[PostgreSQL Query Cache]

    style B fill:#F6993F,color:#fff
    style C fill:#38C172,color:#fff
    style D fill:#3490DC,color:#fff
    style E fill:#9561E2,color:#fff
    style F fill:#E3342F,color:#fff
```

### 10.2 Chi tiết Caching

| Tầng | Công nghệ | TTL | Áp dụng cho |
|------|-----------|-----|-------------|
| **CDN** | Cloudflare | 1 giờ (static), 5 phút (dynamic) | Ảnh, CSS, JS, fonts |
| **Reverse Proxy** | Nginx | 5 phút | Static assets |
| **ISR** | Next.js Incremental Static Regeneration | 60s-300s | Tenant website pages |
| **API** | Node.js in-memory (Map/LRU) | 60s-300s | Tenant config, template config |
| **Database** | PostgreSQL query plan cache | Auto | Prepared statements |

### 10.3 Cache Invalidation

```typescript
// Khi tenant update content qua CMS:
// 1. Update database
// 2. Invalidate ISR cache (revalidate path)
// 3. Clear API in-memory cache cho tenant đó

// server/src/services/cache.service.ts

class CacheService {
  private cache = new Map<string, { data: any; expiry: number }>();

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item || item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return item.data as T;
  }

  set(key: string, data: any, ttlSeconds = 300): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlSeconds * 1000,
    });
  }

  invalidateByTenant(tenantId: string): void {
    for (const [key] of this.cache) {
      if (key.startsWith(`tenant:${tenantId}:`)) {
        this.cache.delete(key);
      }
    }
  }

  invalidateAll(): void {
    this.cache.clear();
  }
}

export const cacheService = new CacheService();
```

---

## 11. Error Handling Strategy

### 11.1 Error Classification

| Code | Loại | Mô tả | HTTP Status |
|------|------|--------|-------------|
| `VALIDATION_ERROR` | Client | Input không hợp lệ | 400 |
| `UNAUTHORIZED` | Client | Chưa đăng nhập | 401 |
| `FORBIDDEN` | Client | Không có quyền | 403 |
| `NOT_FOUND` | Client | Resource không tồn tại | 404 |
| `CONFLICT` | Client | Trùng lặp (email, slug) | 409 |
| `RATE_LIMITED` | Client | Quá nhiều request | 429 |
| `INTERNAL_ERROR` | Server | Lỗi server | 500 |
| `SERVICE_UNAVAILABLE` | Server | Database/External service down | 503 |

### 11.2 Error Response Format

```typescript
// Chuẩn error response cho TẤT CẢ API endpoints

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;         // Error code (e.g., 'VALIDATION_ERROR')
    message: string;      // Human-readable message (tiếng Việt)
    details?: Array<{     // Chi tiết lỗi (cho validation)
      field: string;
      message: string;
    }>;
    requestId?: string;   // Request ID cho debugging
  };
}

// Ví dụ validation error:
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      { "field": "email", "message": "Email không đúng định dạng" },
      { "field": "password", "message": "Mật khẩu phải có ít nhất 8 ký tự" }
    ],
    "requestId": "req_abc123"
  }
}
```

### 11.3 Global Error Handler

```typescript
// server/src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../utils/app-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log error
  console.error(`[${req.method}] ${req.path}`, {
    error: err.message,
    stack: err.stack,
    requestId: req.id,
  });

  // Custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
        requestId: req.id,
      },
    });
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        error: {
          code: 'CONFLICT',
          message: 'Dữ liệu đã tồn tại',
          requestId: req.id,
        },
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Không tìm thấy dữ liệu',
          requestId: req.id,
        },
      });
    }
  }

  // Unknown errors
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'Đã xảy ra lỗi, vui lòng thử lại sau'
        : err.message,
      requestId: req.id,
    },
  });
};
```

---

## 12. Logging Strategy

### 12.1 Log Levels

| Level | Khi nào sử dụng | Ví dụ |
|-------|-----------------|-------|
| `error` | Lỗi cần xử lý ngay | Database connection failed, Unhandled exception |
| `warn` | Cảnh báo, có thể ảnh hưởng | Rate limit triggered, Deprecated API usage |
| `info` | Sự kiện quan trọng | User login, Order created, Tenant activated |
| `debug` | Chi tiết debugging | SQL queries, Request/Response payload |

### 12.2 Log Format

```typescript
// server/src/utils/logger.ts

import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'bds-api',
    environment: process.env.NODE_ENV,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // File transport cho production
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880,
            maxFiles: 5,
          }),
        ]
      : []),
  ],
});

export default logger;
```

### 12.3 Request Logging Middleware

```typescript
// server/src/middlewares/request-logger.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Gắn unique request ID
  req.id = uuidv4();
  res.setHeader('X-Request-Id', req.id);

  const start = Date.now();

  // Log khi response hoàn thành
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      requestId: req.id,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      userId: req.user?.sub,
      tenantId: req.tenantId,
    };

    if (res.statusCode >= 500) {
      logger.error('Request failed', logData);
    } else if (res.statusCode >= 400) {
      logger.warn('Client error', logData);
    } else {
      logger.info('Request completed', logData);
    }
  });

  next();
};
```

---

## 13. API Design Principles

### 13.1 RESTful Conventions

| Phương thức | Endpoint Pattern | Mô tả | Status Code |
|------------|-----------------|-------|-------------|
| `GET` | `/api/resources` | Lấy danh sách | 200 |
| `GET` | `/api/resources/:id` | Lấy chi tiết | 200 |
| `POST` | `/api/resources` | Tạo mới | 201 |
| `PUT` | `/api/resources/:id` | Cập nhật toàn bộ | 200 |
| `PATCH` | `/api/resources/:id` | Cập nhật một phần | 200 |
| `DELETE` | `/api/resources/:id` | Xóa | 204 (hoặc 200) |

### 13.2 API Endpoint List

```
# === Authentication ===
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

# === Tenant (Admin) ===
GET    /api/admin/tenants
GET    /api/admin/tenants/:id
POST   /api/admin/tenants
PATCH  /api/admin/tenants/:id
DELETE /api/admin/tenants/:id
PATCH  /api/admin/tenants/:id/activate
PATCH  /api/admin/tenants/:id/deactivate

# === Templates ===
GET    /api/templates                  # Public: danh sách template
GET    /api/templates/:slug            # Public: chi tiết template
POST   /api/admin/templates            # Admin: tạo template
PATCH  /api/admin/templates/:id        # Admin: sửa template
DELETE /api/admin/templates/:id        # Admin: xóa template

# === Orders ===
POST   /api/orders                     # Public: tạo đơn (form báo giá)
GET    /api/admin/orders               # Admin: danh sách đơn
GET    /api/admin/orders/:id           # Admin: chi tiết đơn
PATCH  /api/admin/orders/:id/status    # Admin: cập nhật status

# === Projects (CMS - Tenant) ===
GET    /api/projects                   # Tenant: danh sách dự án
GET    /api/projects/:id               # Tenant: chi tiết dự án
POST   /api/projects                   # Tenant: tạo dự án
PUT    /api/projects/:id               # Tenant: cập nhật dự án
DELETE /api/projects/:id               # Tenant: xóa dự án

# === Posts (CMS - Tenant) ===
GET    /api/posts                      # Tenant: danh sách bài viết
GET    /api/posts/:id
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id

# === Company Info (CMS - Tenant) ===
GET    /api/company-info               # Tenant: lấy thông tin
PUT    /api/company-info               # Tenant: cập nhật

# === Banners (CMS - Tenant) ===
GET    /api/banners
POST   /api/banners
PUT    /api/banners/:id
DELETE /api/banners/:id
PATCH  /api/banners/reorder            # Sắp xếp thứ tự

# === Menus (CMS - Tenant) ===
GET    /api/menus
POST   /api/menus
PUT    /api/menus/:id
DELETE /api/menus/:id

# === SEO Config (CMS - Tenant) ===
GET    /api/seo-config
PUT    /api/seo-config

# === Media (CMS - Tenant) ===
GET    /api/media
POST   /api/media/upload
DELETE /api/media/:id

# === Contact Form ===
POST   /api/contact                    # Public: gửi liên hệ
GET    /api/contacts                   # Tenant: danh sách liên hệ
PATCH  /api/contacts/:id/read          # Tenant: đánh dấu đã đọc
DELETE /api/contacts/:id

# === Demo ===
POST   /api/demo/sessions
GET    /api/demo/sessions/:token
PUT    /api/demo/sessions/:token
GET    /api/demo/sessions/:token/status

# === Public Website API ===
GET    /api/public/company-info        # x-tenant-slug header
GET    /api/public/projects
GET    /api/public/projects/:slug
GET    /api/public/posts
GET    /api/public/posts/:slug
GET    /api/public/banners
GET    /api/public/menus
```

### 13.3 Pagination Format

```typescript
// Request
GET /api/projects?page=1&limit=12&sort=-createdAt&type=APARTMENT&status=SELLING

// Response
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;       // Trang hiện tại
    limit: number;      // Số items/trang
    total: number;      // Tổng số items
    totalPages: number; // Tổng số trang
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Ví dụ:
{
  "success": true,
  "data": [
    { "id": "1", "name": "Vinhomes Grand Park", ... },
    { "id": "2", "name": "The Sun Avenue", ... }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 13.4 Success Response Format

```typescript
// Single item
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Ví dụ: POST /api/projects (201 Created)
{
  "success": true,
  "data": {
    "id": "clk...",
    "name": "Vinhomes Grand Park",
    "slug": "vinhomes-grand-park",
    ...
  },
  "message": "Tạo dự án thành công"
}
```

### 13.5 Naming Conventions

| Quy tắc | Ví dụ |
|---------|-------|
| URL dùng **kebab-case** | `/api/company-info`, `/api/seo-config` |
| Request/Response body dùng **camelCase** | `{ firstName, lastName, phoneNumber }` |
| Query params dùng **camelCase** | `?sortBy=createdAt&orderBy=desc` |
| Database columns dùng **snake_case** (Prisma map) | `tenant_id`, `created_at` |
| Enum values dùng **SCREAMING_SNAKE_CASE** | `COMING_SOON`, `SOLD_OUT` |

---

## 14. Deployment Architecture

### 14.1 Deployment Diagram

```mermaid
graph TB
    subgraph "Internet"
        USER[Users / Browsers]
    end

    subgraph "Cloudflare"
        CF_DNS[DNS]
        CF_CDN[CDN / Cache]
        CF_SSL[SSL Termination]
        CF_WAF[WAF / DDoS Protection]
    end

    subgraph "VPS (Ubuntu 22.04)"
        subgraph "Docker Compose"
            NGINX[Nginx<br/>Reverse Proxy<br/>:80, :443]
            MKT[Marketplace<br/>Next.js :3000]
            CMS_APP[CMS App<br/>Next.js :3001]
            ADMIN[Admin App<br/>Next.js :3002]
            WEB[Website App<br/>Next.js :3003]
            API[API Server<br/>Express :4000]
        end
        PG[PostgreSQL<br/>:5432]
    end

    subgraph "External Services"
        CLOUD[Cloudinary<br/>Image CDN]
        SMTP_SVC[SMTP Server<br/>Email]
    end

    USER --> CF_DNS --> CF_CDN --> CF_SSL --> CF_WAF --> NGINX
    NGINX --> MKT
    NGINX --> CMS_APP
    NGINX --> ADMIN
    NGINX --> WEB
    NGINX --> API
    API --> PG
    API --> CLOUD
    API --> SMTP_SVC
```

### 14.2 Docker Compose

```yaml
# docker/docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: bds_platform
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  api:
    build:
      context: ..
      dockerfile: docker/Dockerfile.api
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/bds_platform
      JWT_SECRET: ${JWT_SECRET}
      CLOUDINARY_URL: ${CLOUDINARY_URL}
    ports:
      - "4000:4000"
    depends_on:
      - postgres
    restart: unless-stopped

  marketplace:
    build:
      context: ..
      dockerfile: docker/Dockerfile.web
      args:
        APP_NAME: marketplace
    ports:
      - "3000:3000"
    restart: unless-stopped

  cms:
    build:
      context: ..
      dockerfile: docker/Dockerfile.web
      args:
        APP_NAME: cms
    ports:
      - "3001:3000"
    restart: unless-stopped

  admin:
    build:
      context: ..
      dockerfile: docker/Dockerfile.web
      args:
        APP_NAME: admin
    ports:
      - "3002:3000"
    restart: unless-stopped

  website:
    build:
      context: ..
      dockerfile: docker/Dockerfile.web
      args:
        APP_NAME: website
    ports:
      - "3003:3000"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ../nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - api
      - marketplace
      - cms
      - admin
      - website
    restart: unless-stopped

volumes:
  postgres_data:
```

---

## 15. Lịch Sử Thay Đổi

| Phiên bản | Ngày | Người thay đổi | Nội dung |
|-----------|------|----------------|----------|
| 1.0 | 05/07/2026 | Architect | Tạo mới tài liệu |

---

> [!NOTE]
> Tài liệu này mô tả kiến trúc hệ thống ở mức thiết kế. Chi tiết implementation sẽ được bổ sung trong quá trình phát triển. Mọi thay đổi kiến trúc cần được review bởi Tech Lead.
