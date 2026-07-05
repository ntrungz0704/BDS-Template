# 22. Folder Structure Freeze

> Tài liệu này khóa cứng cấu trúc thư mục Monorepo (pnpm workspace) của dự án. Mọi developer và AI Assistant khi tạo file mới bắt buộc phải đặt đúng vị trí cấu trúc đã quy định dưới đây.

---

## 1. Cây thư mục Monorepo Tổng quan

```
e:\BĐS Template
├── apps/                        # Thư mục chứa các ứng dụng chạy độc lập
│   ├── api/                     # Express.js API Server (Port 5000)
│   ├── marketplace/             # Next.js Marketplace Website (Port 3000)
│   ├── cms/                     # Next.js CMS Dashboard cho Tenant (Port 3001)
│   ├── admin/                   # Next.js Super Admin Dashboard (Port 3002)
│   └── website/                 # Next.js Tenant Websites render dynamic (Port 3003)
│
├── packages/                    # Thư mục chứa các gói thư viện dùng chung
│   ├── database/                # Quản lý Prisma schema, migrations và seed
│   │   ├── prisma/
│   │   │   └── schema.prisma    # File Prisma Schema gốc đã khóa
│   │   └── src/
│   │       └── index.ts
│   ├── types/                   # Định nghĩa các kiểu TypeScript, Interfaces, Enums dùng chung
│   ├── utils/                   # Hàm tiện ích (validate, format, auth helper, crypto)
│   ├── ui/                      # Các React Components dùng chung (Buttons, Cards, Modals)
│   ├── eslint-config/           # Cấu hình ESLint dùng chung
│   └── tsconfig/                # Cấu hình TypeScript base dùng chung
│
├── docs/                        # Tài liệu đặc tả và báo cáo kiểm toán
├── seed/                        # Thư mục chứa dữ liệu JSON mẫu để import
├── docker/                      # Cấu hình Dockerfiles và Nginx reverse proxy
├── package.json                 # File cấu hình pnpm workspace root
├── pnpm-workspace.yaml          # Định nghĩa không gian làm việc của pnpm
├── turbo.json                   # Cấu hình Turborepo để tối ưu hóa pipeline build/test
└── .env.example                 # Biến môi trường mẫu
```

---

## 2. Quy tắc đặt tên file & Thư mục (Naming Conventions)

1. **Thư mục:** Sử dụng `kebab-case` (ví dụ: `project-detail`, `seo-config`).
2. **Components React:** Sử dụng `PascalCase` (ví dụ: `ProjectCard.tsx`, `HeaderNavbar.tsx`).
3. **Hooks:** Sử dụng `camelCase` bắt đầu bằng `use` (ví dụ: `useProjectQuery.ts`).
4. **API Routes (Backend):** Đặt trong `apps/api/src/routes/` và chia theo tên miền nghiệp vụ (ví dụ: `project.routes.ts`, `auth.routes.ts`).
5. **Controllers & Services (Backend):** Sử dụng `camelCase` (ví dụ: `project.controller.ts`, `project.service.ts`).
