# 12. Quy Chuẩn Code (Coding Standards)

> **Phiên bản:** 1.0
> **Cập nhật:** 2026-07-05
> **Tác giả:** Principal Software Architect
> **Dự án:** Real Estate Template Marketplace & SaaS Platform

---

## Mục lục

1. [TypeScript Strict Mode](#1-typescript-strict-mode)
2. [Quy Ước Đặt Tên](#2-quy-ước-đặt-tên)
3. [React / Next.js Patterns](#3-react--nextjs-patterns)
4. [API Patterns](#4-api-patterns)
5. [Thứ Tự Import](#5-thứ-tự-import)
6. [Quy Chuẩn Comment](#6-quy-chuẩn-comment)
7. [Git Workflow](#7-git-workflow)
8. [Code Review Checklist](#8-code-review-checklist)
9. [ESLint + Prettier Configuration](#9-eslint--prettier-configuration)
10. [Folder Naming Conventions](#10-folder-naming-conventions)
11. [CSS / TailwindCSS Conventions](#11-css--tailwindcss-conventions)
12. [Testing Conventions](#12-testing-conventions)

---

## 1. TypeScript Strict Mode

### 1.1. Cấu hình `tsconfig.json` bắt buộc

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "skipLibCheck": true
  }
}
```

### 1.2. Quy tắc bắt buộc

| Quy tắc | Mô tả | Ví dụ sai | Ví dụ đúng |
|---------|--------|-----------|-------------|
| Không dùng `any` | Luôn khai báo kiểu cụ thể | `const data: any = ...` | `const data: Project = ...` |
| Không dùng `@ts-ignore` | Sửa lỗi thay vì bỏ qua | `// @ts-ignore` | Sửa type cho đúng |
| Bắt buộc return type | Hàm phải có return type | `function getUser(id)` | `function getUser(id: string): Promise<User>` |
| Dùng `unknown` thay `any` | Khi không biết type | `catch (e: any)` | `catch (e: unknown)` |
| Enum dùng `const enum` hoặc `as const` | Tránh runtime overhead | `enum Status { ... }` | `const Status = { ... } as const` |
| Không dùng `!` (non-null assertion) | Dùng type guard hoặc optional chaining | `user!.name` | `user?.name ?? ''` |

### 1.3. Utility Types khuyến khích

```typescript
// Dùng Partial cho update operations
type UpdateProjectDto = Partial<CreateProjectDto>;

// Dùng Pick cho subset
type ProjectSummary = Pick<Project, 'id' | 'name' | 'slug' | 'thumbnail'>;

// Dùng Omit để loại bỏ fields
type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

// Dùng Record cho key-value maps
type ErrorMessages = Record<string, string>;
```

---

## 2. Quy Ước Đặt Tên

### 2.1. Files & Folders

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| React Component | PascalCase | `ProjectCard.tsx`, `HeroSection.tsx` |
| Page (Next.js App Router) | lowercase | `page.tsx`, `layout.tsx`, `loading.tsx` |
| Hook | camelCase, prefix `use` | `useProjects.ts`, `useAuth.ts` |
| Utility/Helper | camelCase | `formatCurrency.ts`, `slugify.ts` |
| Type/Interface file | camelCase | `project.types.ts`, `auth.types.ts` |
| Constant file | camelCase | `apiEndpoints.ts`, `siteConfig.ts` |
| Service (Backend) | camelCase + suffix `.service` | `project.service.ts` |
| Controller (Backend) | camelCase + suffix `.controller` | `project.controller.ts` |
| Repository (Backend) | camelCase + suffix `.repository` | `project.repository.ts` |
| Middleware (Backend) | camelCase + suffix `.middleware` | `auth.middleware.ts` |
| Validator (Backend) | camelCase + suffix `.validator` | `project.validator.ts` |
| Test file | cùng tên + `.test` hoặc `.spec` | `project.service.test.ts` |
| Folder | kebab-case | `hero-section/`, `project-card/` |

### 2.2. Variables & Functions

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Variable | camelCase | `projectList`, `isLoading`, `currentPage` |
| Function | camelCase, bắt đầu bằng động từ | `getProjects()`, `handleSubmit()`, `formatPrice()` |
| Boolean | camelCase, prefix `is/has/can/should` | `isActive`, `hasPermission`, `canEdit` |
| Constant | UPPER_SNAKE_CASE | `MAX_FILE_SIZE`, `API_BASE_URL` |
| Private field | prefix `_` (chỉ trong class) | `_connection`, `_cache` |
| Event handler | prefix `handle` hoặc `on` | `handleClick`, `onSubmit` |
| Async function | suffix mô tả hành động | `fetchProjects()`, `createProject()` |

### 2.3. Components & Types

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| React Component | PascalCase | `ProjectCard`, `HeroSection` |
| Interface | PascalCase, prefix `I` (tùy chọn) | `Project`, `IProjectService` |
| Type | PascalCase | `ProjectStatus`, `ApiResponse<T>` |
| Enum | PascalCase, values UPPER_SNAKE_CASE | `ProjectType.APARTMENT` |
| Generic type | Single uppercase letter hoặc mô tả | `T`, `TData`, `TResponse` |
| Props type | PascalCase + suffix `Props` | `ProjectCardProps`, `ButtonProps` |

### 2.4. Database Columns (Prisma)

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| Table name | PascalCase (singular) | `Project`, `User`, `CompanyInfo` |
| Column name | camelCase | `tenantId`, `createdAt`, `seoTitle` |
| Primary key | `id` | `id String @id @default(cuid())` |
| Foreign key | camelCase + `Id` | `tenantId`, `categoryId` |
| Timestamp | camelCase | `createdAt`, `updatedAt`, `deletedAt` |
| Boolean | prefix `is/has` | `isPublished`, `isFeatured`, `hasVirtualTour` |
| Enum | PascalCase | `ProjectType`, `OrderStatus` |
| Index name | `idx_table_column` | `idx_project_tenant_id` |

---

## 3. React / Next.js Patterns

### 3.1. Cấu trúc Component

```tsx
// 1. Imports (theo thứ tự quy định)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectCard } from '@/components/ProjectCard';
import { formatCurrency } from '@/lib/utils';
import type { Project } from '@/types';

// 2. Types/Interfaces
interface ProjectListProps {
  projects: Project[];
  isLoading?: boolean;
  onProjectClick?: (projectId: string) => void;
}

// 3. Component (dùng arrow function + export)
export const ProjectList = ({
  projects,
  isLoading = false,
  onProjectClick,
}: ProjectListProps) => {
  // 4. Hooks (useState, useEffect, custom hooks)
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 5. Derived state / computed values
  const sortedProjects = projects.filter((p) => p.isPublished);

  // 6. Event handlers
  const handleClick = (id: string) => {
    setSelectedId(id);
    onProjectClick?.(id);
  };

  // 7. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 8. Early returns (loading, error, empty states)
  if (isLoading) return <ProjectListSkeleton />;
  if (sortedProjects.length === 0) return <EmptyState />;

  // 9. Main render
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isSelected={project.id === selectedId}
          onClick={() => handleClick(project.id)}
        />
      ))}
    </div>
  );
};
```

### 3.2. Quy tắc Hooks

| Quy tắc | Mô tả |
|---------|--------|
| Chỉ gọi ở top level | Không gọi trong if/for/callback |
| Custom hooks prefix `use` | `useProjects`, `useAuth`, `useDebounce` |
| Tách logic phức tạp thành custom hook | Khi component > 100 dòng logic |
| Dependency array đầy đủ | Luôn khai báo đúng deps cho `useEffect`, `useMemo`, `useCallback` |
| Cleanup trong useEffect | Return cleanup function khi cần |
| Không dùng `useEffect` cho derived state | Dùng `useMemo` hoặc computed variable |

### 3.3. State Management

```
Ưu tiên theo thứ tự:
1. Local state (useState) → cho state của 1 component
2. Lifted state → cho state chia sẻ giữa cha-con
3. URL state (searchParams) → cho filter, pagination, sort
4. React Context → cho state global đơn giản (theme, auth, tenant)
5. Zustand → cho state phức tạp cần chia sẻ nhiều nơi (giỏ hàng, form wizard)
```

> **KHÔNG dùng Redux.** Project này đủ nhỏ, Context + Zustand (nếu cần) là đủ.

### 3.4. Server Components vs Client Components (Next.js App Router)

| Trường hợp | Loại Component | Lý do |
|------------|---------------|-------|
| Hiển thị data tĩnh | Server Component | SEO, performance |
| Fetch dữ liệu | Server Component | Giảm client bundle |
| Form có interaction | Client Component (`"use client"`) | Cần event handlers |
| Component dùng hooks | Client Component | useState, useEffect |
| Nhận data qua props | Server Component (ưu tiên) | Trừ khi cần interactivity |

---

## 4. API Patterns

### 4.1. Controller → Service → Repository Pattern

```
┌─────────────┐     ┌─────────────┐     ┌──────────────┐     ┌──────────┐
│  Route/      │ ──▶ │  Controller  │ ──▶ │   Service    │ ──▶ │Repository│
│  Middleware  │     │ (Validation) │     │ (Business    │     │ (Prisma) │
│              │     │              │     │  Logic)      │     │          │
└─────────────┘     └─────────────┘     └──────────────┘     └──────────┘
```

**Controller** – Nhận request, validate input, gọi service, trả response:

```typescript
// project.controller.ts
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  async getProjects(req: Request, res: Response): Promise<void> {
    const tenantId = req.tenantId!;
    const query = projectQuerySchema.parse(req.query);
    const result = await this.projectService.getProjects(tenantId, query);
    res.json(ApiResponse.success(result));
  }

  async createProject(req: Request, res: Response): Promise<void> {
    const tenantId = req.tenantId!;
    const data = createProjectSchema.parse(req.body);
    const project = await this.projectService.createProject(tenantId, data);
    res.status(201).json(ApiResponse.success(project, 'Tạo dự án thành công'));
  }
}
```

**Service** – Business logic, không biết về req/res:

```typescript
// project.service.ts
export class ProjectService {
  constructor(private projectRepo: ProjectRepository) {}

  async createProject(tenantId: string, data: CreateProjectDto): Promise<Project> {
    const slug = await this.generateUniqueSlug(tenantId, data.name);
    return this.projectRepo.create({ ...data, tenantId, slug });
  }
}
```

**Repository** – Truy vấn database qua Prisma:

```typescript
// project.repository.ts
export class ProjectRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async findByTenant(tenantId: string, query: ProjectQuery): Promise<PaginatedResult<Project>> {
    const where: Prisma.ProjectWhereInput = { tenantId, deletedAt: null };
    // ...build filters
    return paginate(this.prisma.project, where, query);
  }
}
```

### 4.2. Response Format chuẩn

```typescript
// Thành công
{
  "success": true,
  "data": { ... },
  "message": "Tạo dự án thành công",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}

// Lỗi
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      { "field": "name", "message": "Tên dự án không được để trống" },
      { "field": "price", "message": "Giá phải là số dương" }
    ]
  }
}
```

### 4.3. Error Handling

```typescript
// Tạo custom error classes
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource} không tồn tại`);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Bạn chưa đăng nhập') {
    super(401, 'UNAUTHORIZED', message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Bạn không có quyền thực hiện hành động này') {
    super(403, 'FORBIDDEN', message);
  }
}

// Global error handler middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(ApiResponse.error(err.code, err.message, err.details));
  }
  // Lỗi không mong đợi → log + trả generic message
  logger.error('Unhandled error:', err);
  return res.status(500).json(ApiResponse.error('INTERNAL_ERROR', 'Đã xảy ra lỗi hệ thống'));
};
```

---

## 5. Thứ Tự Import

Thứ tự import bắt buộc (tách bằng dòng trống giữa các nhóm):

```typescript
// 1. React / Next.js core
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// 2. Third-party libraries
import { z } from 'zod';
import { format } from 'date-fns';

// 3. Internal packages (monorepo)
import { Button, Input } from '@repo/ui';
import { prisma } from '@repo/database';

// 4. Internal modules (alias @/)
import { ProjectCard } from '@/components/ProjectCard';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/lib/utils';

// 5. Types (dùng `import type`)
import type { Project, ProjectStatus } from '@/types';

// 6. Styles (nếu có)
import './styles.css';
```

> Cấu hình ESLint plugin `eslint-plugin-import` để auto-sort.

---

## 6. Quy Chuẩn Comment

### 6.1. Khi nào PHẢI comment

| Tình huống | Bắt buộc |
|-----------|---------|
| Business logic phức tạp | ✅ |
| Workaround / hack | ✅ + link ticket |
| TODO / FIXME | ✅ + ghi tên người + deadline |
| Public API / exported function | ✅ JSDoc |
| Magic number | ✅ giải thích |
| Regex phức tạp | ✅ giải thích pattern |

### 6.2. Khi nào KHÔNG comment

- Code tự giải thích (self-documenting): đặt tên biến rõ ràng thay vì comment
- Comment thừa: `// Tăng i lên 1` → `i++`
- Comment code cũ: Xóa đi, git lưu lại rồi

### 6.3. Format comment

```typescript
// ✅ Đúng: JSDoc cho exported functions
/**
 * Tạo slug duy nhất cho dự án trong phạm vi tenant.
 * Nếu slug đã tồn tại, thêm suffix số (-1, -2, ...).
 *
 * @param tenantId - ID của tenant hiện tại
 * @param name - Tên dự án gốc
 * @returns Slug duy nhất (ví dụ: "vinhomes-grand-park-2")
 */
export async function generateUniqueSlug(tenantId: string, name: string): Promise<string> { ... }

// ✅ Đúng: TODO với context
// TODO(trung): Thêm cache invalidation khi update project - deadline 2026-07-15

// ✅ Đúng: Giải thích business logic
// Giá hiển thị dạng text ("Từ 2.5 tỷ") vì BĐS thường có range
// priceFrom/priceTo dùng cho filter, price dùng cho hiển thị

// ❌ Sai: Comment thừa
// Lấy danh sách projects
const projects = await getProjects();
```

---

## 7. Git Workflow

### 7.1. Branch Naming

```
main                          ← Production, luôn deployable
├── develop                   ← Integration branch
│   ├── feature/auth-login    ← Tính năng mới
│   ├── feature/cms-projects  ← Tính năng mới
│   ├── fix/login-validation  ← Sửa bug không khẩn cấp
│   └── refactor/api-response ← Refactor code
└── hotfix/security-patch     ← Sửa bug khẩn cấp trên production
```

| Prefix | Dùng cho | Ví dụ |
|--------|---------|-------|
| `feature/` | Tính năng mới | `feature/cms-project-crud` |
| `fix/` | Sửa bug | `fix/image-upload-validation` |
| `hotfix/` | Sửa bug khẩn cấp trên production | `hotfix/auth-token-expired` |
| `refactor/` | Refactor không thay đổi behavior | `refactor/api-error-handling` |
| `chore/` | Config, dependencies, CI/CD | `chore/update-eslint-config` |
| `docs/` | Tài liệu | `docs/api-documentation` |

### 7.2. Commit Message Format (Conventional Commits)

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

| Type | Mô tả | Ví dụ |
|------|--------|-------|
| `feat` | Tính năng mới | `feat(cms): add project CRUD endpoints` |
| `fix` | Sửa bug | `fix(auth): handle expired refresh token` |
| `docs` | Tài liệu | `docs(api): add Swagger annotations` |
| `style` | Format, không thay đổi logic | `style: apply Prettier formatting` |
| `refactor` | Refactor code | `refactor(api): extract validation middleware` |
| `perf` | Cải thiện performance | `perf(db): add index on project.tenantId` |
| `test` | Thêm test | `test(auth): add login integration tests` |
| `chore` | Build, CI, dependencies | `chore: upgrade Prisma to v6.x` |

**Quy tắc:**
- Description viết bằng tiếng Anh, dạng imperative (`add`, không phải `added`)
- Không quá 72 ký tự cho dòng đầu
- Body giải thích WHY, không phải WHAT
- Footer cho breaking changes: `BREAKING CHANGE: ...`

### 7.3. Pull Request Rules

- Mỗi PR tối đa **300 dòng thay đổi** (không tính generated files)
- Phải có ít nhất **1 reviewer approve**
- Phải pass **tất cả CI checks** (lint, test, build)
- Title theo format commit message
- Description có template: What / Why / How / Screenshots

---

## 8. Code Review Checklist

### Reviewer PHẢI kiểm tra:

**Functionality:**
- [ ] Code hoạt động đúng theo requirements
- [ ] Edge cases được xử lý (null, empty, boundary values)
- [ ] Error handling đầy đủ

**Security:**
- [ ] Không hardcode secrets / credentials
- [ ] Input được validate (Zod schema)
- [ ] Tenant isolation được đảm bảo (có `tenantId` filter)
- [ ] Không có SQL injection risk
- [ ] Không expose sensitive data trong response

**Performance:**
- [ ] Không có N+1 query
- [ ] Prisma query có `select` hoặc `include` hợp lý (không `select: *`)
- [ ] Không fetch dữ liệu thừa
- [ ] Images được optimize (next/image, Cloudinary transforms)

**Code Quality:**
- [ ] Không có `any` type
- [ ] Naming conventions đúng
- [ ] Không có code trùng lặp (DRY)
- [ ] Component < 200 dòng
- [ ] Function < 50 dòng
- [ ] Không có commented-out code

**Testing:**
- [ ] Unit test cho business logic
- [ ] Edge cases có test
- [ ] Test names mô tả rõ ràng

---

## 9. ESLint + Prettier Configuration

### 9.1. Prettier Config (`.prettierrc`)

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 9.2. ESLint Config (`.eslintrc.js`) – Các rules chính

```javascript
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
  ],
  rules: {
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/no-floating-promises': 'error',

    // Import ordering
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],

    // React
    'react/jsx-no-leaked-render': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
};
```

### 9.3. Lint-Staged + Husky

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

```bash
# .husky/pre-commit
npx lint-staged

# .husky/commit-msg
npx commitlint --edit $1
```

---

## 10. Folder Naming Conventions

```
apps/
├── marketplace/          ← kebab-case cho apps
│   └── src/
│       ├── app/          ← Next.js App Router
│       │   ├── (marketing)/    ← Route groups dùng ()
│       │   │   ├── page.tsx
│       │   │   └── templates/
│       │   │       ├── page.tsx
│       │   │       └── [slug]/
│       │   │           └── page.tsx
│       │   └── layout.tsx
│       ├── components/   ← Shared components
│       │   ├── ui/       ← Primitive UI (Button, Input)
│       │   ├── layout/   ← Header, Footer, Sidebar
│       │   └── features/ ← Feature-specific (project-card/, hero-section/)
│       ├── hooks/        ← Custom hooks
│       ├── lib/          ← Utilities, helpers
│       ├── types/        ← TypeScript types
│       └── styles/       ← Global styles
├── cms/
├── website/
└── admin/

packages/
├── ui/                   ← Shared UI components
├── database/             ← Prisma schema + client
└── shared/               ← Shared utils, types, constants

server/
├── src/
│   ├── modules/          ← Feature modules
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.repository.ts
│   │   │   ├── auth.validator.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.test.ts
│   │   ├── project/
│   │   └── post/
│   ├── middleware/
│   ├── lib/
│   └── types/
```

---

## 11. CSS / TailwindCSS Conventions

### 11.1. Quy tắc TailwindCSS

| Quy tắc | Mô tả |
|---------|--------|
| Mobile-first | Viết base → `md:` → `lg:` → `xl:` |
| Dùng `@apply` cực kỳ hạn chế | Chỉ cho pattern lặp > 5 lần |
| Class ordering | Theo Prettier plugin tailwindcss |
| Dùng CSS Variables cho theme | `--color-primary`, `--color-secondary` |
| Không inline style | Luôn dùng Tailwind classes |
| Dùng `cn()` (clsx + twMerge) | Cho conditional classes |

### 11.2. CSS Variables cho Template Theming

```css
/* Template Luxury Gold */
:root {
  --color-primary: #C9A84C;
  --color-primary-dark: #A88B3D;
  --color-secondary: #1A1A2E;
  --color-background: #FFFFFF;
  --color-surface: #F8F8F8;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-accent: #D4AF37;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --border-radius: 4px;
  --shadow-card: 0 2px 8px rgba(0,0,0,0.08);
}
```

### 11.3. Utility Helper `cn()`

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Sử dụng
<button className={cn(
  'px-4 py-2 rounded font-medium transition-colors',
  variant === 'primary' && 'bg-primary text-white hover:bg-primary-dark',
  variant === 'outline' && 'border border-primary text-primary hover:bg-primary/10',
  disabled && 'opacity-50 cursor-not-allowed',
  className
)}>
```

---

## 12. Testing Conventions

### 12.1. Cấu trúc Test

```typescript
describe('ProjectService', () => {
  // Setup
  let service: ProjectService;
  let mockRepo: jest.Mocked<ProjectRepository>;

  beforeEach(() => {
    mockRepo = createMockRepository();
    service = new ProjectService(mockRepo);
  });

  describe('createProject', () => {
    it('should create project with unique slug', async () => {
      // Arrange
      const tenantId = 'tenant-1';
      const input = { name: 'Vinhomes Grand Park', ... };

      // Act
      const result = await service.createProject(tenantId, input);

      // Assert
      expect(result.slug).toBe('vinhomes-grand-park');
      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ tenantId, slug: 'vinhomes-grand-park' })
      );
    });

    it('should append suffix when slug already exists', async () => { ... });

    it('should throw error when tenant not found', async () => { ... });
  });
});
```

### 12.2. Naming Convention cho Test

```
it('should [expected behavior] when [condition]')
```

Ví dụ:
- `it('should return 401 when token is expired')`
- `it('should create project with generated slug')`
- `it('should throw NotFoundError when project does not exist')`

### 12.3. Test Coverage Targets

| Loại | Target |
|------|--------|
| Service (business logic) | ≥ 80% |
| Controller (API endpoints) | ≥ 70% |
| Utility functions | ≥ 90% |
| React Components | ≥ 60% (interaction tests) |
| Overall | ≥ 70% |

### 12.4. Testing Tools

| Tool | Dùng cho |
|------|---------|
| Vitest | Unit tests (nhanh hơn Jest) |
| React Testing Library | Component tests |
| Supertest | API integration tests |
| Playwright | E2E tests (Phase 2+) |
| MSW (Mock Service Worker) | Mock API trong frontend tests |

---

## Tổng kết

> **Quy tắc vàng:** Code phải đọc được như văn xuôi. Nếu cần comment để giải thích code đang làm gì → đặt lại tên biến/hàm cho rõ ràng hơn. Comment chỉ để giải thích TẠI SAO, không phải LÀM GÌ.

Mọi thành viên team PHẢI đọc và tuân thủ tài liệu này trước khi bắt đầu code. Violations sẽ được phát hiện qua ESLint (tự động) và Code Review (thủ công).
