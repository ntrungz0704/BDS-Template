# 02. TECHNOLOGY AUDIT — PLATFORMBDS V2

**Audit Date:** 2026-08-23  
**Auditor:** Principal Software Architect  
**Policy:** STRICT KEEP EXISTING STACK — NO UNNECESSARY REWRITES

---

## 1. Technology Decision Matrix

| Technology Component | Current Tech | Decision | Reason & Technical Evaluation | Migration Risk |
| :--- | :--- | :---: | :--- | :---: |
| **Monorepo Manager** | **Turborepo + pnpm** | **KEEP** | Turborepo tối ưu caching build giữa 5 apps (`api`, `marketplace`, `cms`, `admin`, `website`). pnpm tiết kiệm dung lượng ổ đĩa và quản lý dependency workspace chặt chẽ. | Rất thấp (0%) |
| **Backend Framework** | **Node.js + Express.js** | **KEEP** | Express.js 4.x gọn nhẹ, dễ kiểm soát middleware (Auth, Tenant Resolver, CSRF, Rate Limiting). Không cần chuyển sang NestJS để tránh over-engineering cho MVP. | Rất thấp (0%) |
| **Database ORM** | **Prisma ORM** | **KEEP** | Type-safe schema cho 35+ models, migration rõ ràng, hỗ trợ transaction và relations mạnh mẽ. | Rất thấp (0%) |
| **Database Engine** | **PostgreSQL 15+** | **KEEP** | Chuẩn RDBMS công nghiệp cho SaaS Multi-Tenant: ACID compliance, hỗ trợ JSONB cho section configs, UUID/CUID indexing tốt. | Rất thấp (0%) |
| **Frontend Framework** | **Next.js 15 (Pages Router)** | **KEEP** | Pages Router đang hoạt động ổn định và nhất quán trên cả 4 web apps (`marketplace`, `cms`, `admin`, `website`). Hỗ trợ cả SSR, Static Generation và Client Hydration. | Rất thấp (0%) |
| **UI & Styling** | **TailwindCSS 3.4** | **KEEP** | Utility-first, compile CSS nhẹ, dễ dàng cấu hình dynamic CSS variables cho theme phong thủy của từng tenant. | Rất thấp (0%) |
| **Icons Library** | **Lucide React** | **KEEP** | Bộ icon hiện đại, tree-shaking tối ưu, đồng bộ trên toàn bộ UI. | Rất thấp (0%) |
| **Container & Ops** | **Docker + Docker Compose** | **KEEP** | Đã có sẵn Dockerfile và docker-compose.prod.yml cho toàn bộ 5 services. Không thêm Kubernetes phức tạp trong giai đoạn MVP. | Rất thấp (0%) |
| **Logging & Monitor** | **Winston + Sentry** | **KEEP** | Winston daily rotate log đầy đủ `error.log` và `combined.log`. Sentry theo dõi runtime crash. | Rất thấp (0%) |

---

## 2. Rationale for Keeping Existing Stack

1. **Tính hoàn chỉnh**: Stack hiện tại (Turborepo + Express + Prisma + Next.js) đã đáp ứng 100% các yêu cầu kinh doanh:
   - Bán template BĐS
   - Trải nghiệm Demo trực tiếp
   - Quản trị CMS cho khách hàng
   - Thuê theo năm & Bán source code
   - Multi-tenant Subdomain & Custom Domain.
2. **Loại bỏ rủi ro gián đoạn**: Việc đổi sang PHP/Laravel, NestJS hay Firebase/Supabase sẽ làm mất hàng tuần công sức kiểm thử, gây lỗi phát sinh không đáng có.
3. **Hiệu suất & Khả năng mở rộng**: Node.js + Express + Prisma + Next.js là stack hiện đại, chịu tải hàng chục nghìn lượt truy cập đồng thời khi đặt sau Cloudflare CDN và Nginx Reverse Proxy.
