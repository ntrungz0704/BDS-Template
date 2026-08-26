# 01. CURRENT STATE REPORT — PLATFORMBDS V2

**Audit Date:** 2026-08-23  
**Project:** PlatformBDS (SaaS Bất Động Sản)  
**Auditor:** Principal Software Architect & DevOps/Security Engineer  
**Status:** Existing Project Audit (Phase 0)

---

## 1. Executive Summary

PlatformBDS là hệ thống nền tảng BĐS toàn diện kết hợp giữa **Sàn giao dịch Template BĐS (Marketplace)**, **Trang quản trị cho khách hàng (CMS)**, **Trang quản trị toàn sàn (Super Admin)**, và **Bộ máy hiển thị Website độc lập (Website Engine)**.

Toàn bộ hệ thống hiện đang chạy trên mô hình **Monorepo (Turborepo + pnpm)** với 5 ứng dụng (apps) và 4 thư viện nội bộ (packages). Hệ thống đã có sẵn nền tảng backend vững chắc (Node.js/Express + Prisma PostgreSQL) và frontend linh hoạt (Next.js/React/TailwindCSS).

---

## 2. Inventory of Existing Codebase

### 2.1 Applications (`apps/`)

| Application | Port | Framework / Tech | Trạng thái hiện tại | Mô tả chức năng |
| :--- | :---: | :--- | :---: | :--- |
| **`apps/api`** | `5000` | Express.js, Prisma, Winston, JWT, Helmet | **DONE / STABLE** | Cung cấp toàn bộ REST API: Auth, Tenant context, Projects, Posts, CMS Builder, Media, Leads CRM, Admin, Source download. |
| **`apps/marketplace`** | `3000` | Next.js 15 (Pages Router), React 19, Tailwind | **DONE / STABLE** | Sàn giao dịch 16 mẫu giao diện BĐS, Live real-time search, Giỏ hàng, Đặt hàng theo năm, Bảng màu phong thủy, Xem Demo. |
| **`apps/cms`** | `3001` | Next.js 15 (Pages Router), React Query, Lucide | **DONE / STABLE** | Trang quản trị website riêng của Khách hàng (CMS): Quản lý dự án, tin tức, hình ảnh, leads, SEO, domain, giao diện. |
| **`apps/admin`** | `3002` | Next.js 15 (Pages Router), React Query, Axios | **DONE / STABLE** | Trang Super Admin: Quản lý khách hàng, duyệt đơn hàng, quản trị tenant, chỉnh sửa giá bán & giá gốc 16 template, Studio nháp. |
| **`apps/website`** | `3003` | Next.js 15 (Pages Router), Tailwind, Dynamic SSR | **DONE / STABLE** | Website công khai của khách hàng. Render 16 template dựa trên tenant slug/domain và dữ liệu từ API hoặc demo data. |

### 2.2 Shared Packages (`packages/`)

| Package | Tech | Trạng thái | Mô tả chức năng |
| :--- | :--- | :---: | :--- |
| **`packages/database`** | Prisma ORM, PostgreSQL | **DONE** | Chứa `schema.prisma` với 35+ models, migration scripts, seed data, Prisma Client generate. |
| **`packages/types`** | TypeScript | **DONE** | Khai báo types chung: UserRole, OrderStatus, StandardResponse, TenantPayload. |
| **`packages/utils`** | TypeScript | **DONE** | Tiện ích formatVND, slugify, theme-to-css converter, color palettes, template configs. |
| **`packages/ui`** | React, TailwindCSS | **DONE** | UI components dùng chung (Buttons, Modals, Badges, Loaders). |

---

## 3. Feature Classification (Current State)

| Feature Module | Phân loại | Hiện trạng chi tiết |
| :--- | :---: | :--- |
| **1. Marketplace & Catalog** | `DONE` | 16 mẫu website BĐS hiển thị đầy đủ, live search real-time, phân loại theo bộ sưu tập (Luxury, Villa, Eco, Apartment,...). |
| **2. Demo Mode Experience** | `DONE` | Khách xem trực tiếp giao diện tương tác, đổi theme realtime, không cần đăng nhập. |
| **3. Yearly Pricing & Cart** | `DONE` | Giá bán 499.000đ/năm, giá gốc 799.000đ/năm (-38%), Add-on Bảo trì (+299k/năm), Add-on Hosting (+499k/năm), Bảng chọn màu phong thủy. |
| **4. Super Admin Management** | `DONE` | Quản lý Đơn hàng, Quản lý Khách hàng (Tenants), Quản lý & Sửa giá 16 Template, Studio Draft/Publish. |
| **5. Customer CMS Portal** | `DONE` | Đã tinh gọn về 2-Role (`SUPER_ADMIN` và `CUSTOMER_OWNER`), giao diện quản lý Dự án, Bài viết, Media, Khách hàng (Leads), Tên miền. |
| **6. Multi-Tenancy Engine** | `PARTIAL` | Resolve tenant qua Subdomain/Header `x-tenant-slug`, AsyncLocalStorage context trong API. Cần tăng cường strict isolation và server-side validation. |
| **7. Trial & Quota System** | `PARTIAL` | Model đã có `trialStartAt`, `trialEndAt`, `trialSaveLimit`, `trialSaveCount`. Cần hoàn thiện cơ chế Atomic Save Transaction và cảnh báo 24h. |
| **8. Source Code Delivery (BUY)** | `PARTIAL` | API `GET /api/source/:orderId/download` đã có xác thực quyền và kiểm tra đơn hàng. Cần xây dựng hoàn chỉnh Pipeline đóng gói ZIP tĩnh cho khách LOW-TECH. |
| **9. Manual Payment Flow** | `DONE` | Đặt hàng qua Zalo/Chuyển khoản, Super Admin duyệt đơn trên Admin Portal và kích hoạt tự động. |
| **10. Domain & SSL Routing** | `PARTIAL` | Có model `TenantDomainSettings`, hỗ trợ subdomain và custom domain. Cần hoàn thiện Nginx/Cloudflare wildcards routing. |

---

## 4. Master GAP Analysis Table

| STT | Tính năng | Hiện trạng | Mục tiêu V2 | Khoảng cách (GAP) | Rủi ro | Tệp liên quan | Hành động Migration |
| :---: | :--- | :---: | :--- | :--- | :---: | :--- | :--- |
| **1** | **Role Architecture** | Đã tinh gọn 2 role trên UI | Enforce 100% Backend & Types | Đảm bảo role chỉ gồm `SUPER_ADMIN` & `CUSTOMER_OWNER` | Thấp | `packages/types`, `packages/database`, `apps/api/src/middlewares/role.middleware.ts` | Giữ tương thích dữ liệu hiện có |
| **2** | **Trial Save Quota** | Có schema fields | Atomic Transaction enforce | Quota 3 lần save phải được lock bằng database transaction | Vừa | `apps/api/src/controllers/cms.builder.controller.ts`, `apps/api/src/routes/cms.builder.routes.ts` | Thêm transaction logic |
| **3** | **Trial Expiration Page** | Có trên SSR | Khóa chặt CMS + Banner | Khi hết hạn: CMS read-only, Public web hiện trang hết hạn | Thấp | `apps/website/src/pages/index.tsx`, `apps/cms/src/pages/_app.tsx` | UI notification + Middleware block |
| **4** | **Protected Fields** | Chưa lock triệt để | Backend validation | Khách không được sửa copyright, system config, tenant status | Thấp | `apps/api/src/controllers/tenant.controller.ts` | Schema field filter |
| **5** | **Low-Tech Delivery Package** | Download file gốc | Gói ZIP HTML Tĩnh | Build sẵn HTML tĩnh vào folder `public_html/` kèm hướng dẫn tiếng Việt | Vừa | `apps/api/src/routes/source.routes.ts`, `scripts/build-delivery-package.ts` | Tạo script build tĩnh theo đơn hàng |
| **6** | **Nginx & SSL Automation** | Thủ công | Cấu hình mẫu tự động | Hướng dẫn cấu hình Nginx Reverse Proxy & Cloudflare SSL | Thấp | `docker/nginx.conf`, `docs/DOMAIN_AND_DEPLOYMENT.md` | Tài liệu hóa chi tiết |
