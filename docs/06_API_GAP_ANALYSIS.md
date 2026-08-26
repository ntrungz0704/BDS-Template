# 06. API GAP ANALYSIS — PLATFORMBDS V2

**Audit Date:** 2026-08-23  
**Auditor:** Senior Full-Stack & API Security Engineer  
**API Engine:** Express.js 4.x + TypeScript + Prisma Client

---

## 1. Audit Existing API Routes

| Endpoint Prefix | File Router | Quyền truy cập | Chức năng hiện tại | Trạng thái |
| :--- | :--- | :---: | :--- | :---: |
| **`/api/auth`** | `auth.routes.ts` | Public / User | Đăng nhập, Đăng ký, Đăng xuất (HttpOnly Cookie), Refresh token, Lấy thông tin user hiện tại (`/me`). | **DONE** |
| **`/api/marketplace`** | `marketplace.routes.ts` | Public / User | Lấy danh sách 16 templates, Bộ lọc theo bộ sưu tập, Tạo đơn hàng mua/thuê, Thêm giỏ hàng, Wishlist. | **DONE** |
| **`/api/admin`** | `admin.routes.ts` | `SUPER_ADMIN` | Thống kê Dashboard, Quản lý đơn hàng (Duyệt/Hủy), Quản lý Tenant, Quản lý User, Bật/Tắt template, Sửa giá bán & giá gốc, Template Studio. | **DONE** |
| **`/api/cms/projects`** | `project.cms.routes.ts` | `CUSTOMER_OWNER` | Thêm, sửa, xóa dự án BĐS, upload mặt bằng, bảng giá, tiện ích. | **DONE** |
| **`/api/cms/posts`** | `post.cms.routes.ts` | `CUSTOMER_OWNER` | Quản lý tin tức, bài viết, cẩm nang BĐS theo danh mục. | **DONE** |
| **`/api/cms/media`** | `media.routes.ts` | `CUSTOMER_OWNER` | Quản lý thư viện ảnh, tạo thư mục, upload ảnh, thùng rác. | **DONE** |
| **`/api/cms/leads`** | `lead.routes.ts` | `CUSTOMER_OWNER` | Quản lý danh sách khách hàng tiềm năng gửi từ form website, ghi chú tiến độ tư vấn. | **DONE** |
| **`/api/cms/builder`** | `cms.builder.routes.ts` | `CUSTOMER_OWNER` | Cấu hình màu sắc theme, typography, quản lý section giao diện, đổi logo, hotline, địa chỉ. | **DONE** |
| **`/api/website`** | `public.website.routes.ts` | Public Website | Cung cấp dữ liệu public cho SSR Website theo subdomain/domain (Company info, Theme, Projects, Posts, Status, Gửi form liên hệ). | **DONE** |
| **`/api/source`** | `source.routes.ts` | Authenticated | Kiểm tra quyền và tải source code ZIP cho đơn hàng `BUY_SOURCE` đã `COMPLETED`. | **DONE** |
| **`/api/demo`** | `demo.routes.ts` | Public | Tạo và quản lý session trải nghiệm demo trực tiếp trên Marketplace. | **DONE** |

---

## 2. Master API Gap Analysis

| Hạng mục API | Hiện trạng | Khoảng cách cần hoàn thiện | Giải pháp kỹ thuật |
| :--- | :--- | :--- | :--- |
| **1. Strict Tenant Context** | `tenantStorage` (AsyncLocalStorage) trong middleware | Một số API CMS vẫn nhận `tenantId` từ query/body | **Tuyệt đối loại bỏ `tenantId` từ client**: Luôn lấy `tenantId` từ `req.user.tenantId` (đã mã hóa trong JWT token khi đăng nhập). |
| **2. Atomic Save Endpoint** | Có API lưu theme & sections | Chưa kiểm tra triệt để Save Quota trong 1 Database Transaction | Bọc logic lưu trong `prisma.$transaction`: Kiểm tra Trial Status -> Kiểm tra Quota `< 3` -> Cập nhật nội dung -> Tăng `trialSaveCount` + 1. |
| **3. Backend Protected Fields** | Frontend ẩn các mục bản quyền | Khách có thể gửi request giả mạo sửa trường hệ thống | Thêm hàm lọc whitelist trường dữ liệu: Chặn sửa `platformCopyright`, `subscriptionStatus`, `tenantSlug`, `trialEndAt` từ API CMS. |
| **4. Anti-IDOR Protection** | Có authMiddleware | Một số API chi tiết dự án/bài viết nhận `:id` chưa kiểm tra `tenantId` | Tất cả câu lệnh `findUnique` / `update` / `delete` phải có điều kiện `where: { id, tenantId }`. |
