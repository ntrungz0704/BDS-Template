# TECHNOLOGY AUDIT — PLATFORMBDS V2

**Date:** 2026-08-23  
**Policy:** STRICT KEEP EXISTING STACK — ZERO REWRITE

---

## 1. Technology Evaluation Matrix

| Layer | Current Technology | Decision | Reason & Technical Evaluation |
| :--- | :--- | :---: | :--- |
| **Monorepo Manager** | Turborepo + pnpm | **KEEP** | Tối ưu hóa build cache giữa 5 apps, quản lý dependency chặt chẽ, tiết kiệm dung lượng đĩa. |
| **Backend API** | Node.js + Express.js 4.x | **KEEP** | Nhẹ, dễ kiểm soát middleware chuỗi (Auth, Tenant Isolation, Trial, Rate Limit, Helmet). |
| **Database ORM** | Prisma ORM 5.x | **KEEP** | Type-safe schema với 38 models, hỗ trợ transaction nguyên tử cho Save Quota và quan hệ bảng phức tạp. |
| **Database Engine** | PostgreSQL 15+ | **KEEP** | Đạt chuẩn ACID, hỗ trợ JSONB cho section content linh hoạt, indexing hiệu năng cao. |
| **Frontend Apps** | Next.js 15 (Pages Router) + React 19 | **KEEP** | Hoạt động ổn định trên cả 4 web apps (`marketplace`, `cms`, `admin`, `website`). Hỗ trợ đồng thời SSR và Static Export. |
| **Styling & Icons** | TailwindCSS 3.4 + Lucide React | **KEEP** | Utility-first, compile CSS nhẹ, hỗ trợ Dynamic CSS variables cho theme phong thủy. |
| **Logging & Security** | Winston (Daily Rotate) + Sentry + Helmet | **KEEP** | Tách biệt error log và combined log, CSP headers chống XSS, Rate limiter chống brute-force. |
| **Container & Ops** | Docker + Docker Compose | **KEEP** | Cấu hình production chuẩn cho toàn bộ 5 services. Không thêm Kubernetes trong giai đoạn MVP. |

---

## 2. Kết Luận Về Công Nghệ

* Không có bất kỳ lý do kỹ thuật nào bắt buộc phải thay đổi stack.
* Toàn bộ stack hiện tại đáp ứng 100% yêu cầu chịu tải, bảo mật, mở rộng 100+ templates và phục vụ khách hàng LOW-TECH.
