# 05. DATABASE GAP ANALYSIS — PLATFORMBDS V2

**Audit Date:** 2026-08-23  
**Auditor:** Principal Software Architect & Database Engineer  
**Database Engine:** PostgreSQL 15+  
**ORM:** Prisma 5.x  
**Policy:** NO RESET, NO DROP DATABASE, ZERO DATA LOSS

---

## 1. Audit Existing Prisma Models

Hệ thống hiện tại đã có một cơ sở dữ liệu rất hoàn chỉnh với **38 Models** trong `packages/database/prisma/schema.prisma`:

| Nhóm chức năng | Các Model hiện có trong Prisma | Trạng thái | Đánh giá |
| :--- | :--- | :---: | :--- |
| **Tài khoản & Phân quyền** | `User`, `RefreshToken`, `CustomerProfile`, `PasswordResetToken`, `EmailVerificationToken`, `AuditLog` | **ĐẦY ĐỦ** | Đã hỗ trợ bảo mật JWT, hash password bcrypt, audit trail mọi thao tác. |
| **Quản trị Multi-Tenant** | `Tenant`, `TenantDomainSettings`, `TenantThemeSettings`, `TenantMembership`, `TenantApiKey`, `TenantWebhook`, `WebhookDelivery` | **ĐẦY ĐỦ** | Đã có trường `trialStartAt`, `trialEndAt`, `trialSaveLimit`, `trialSaveCount`, `trialStatus`. |
| **Giao diện & Template** | `Template`, `TemplateConfig`, `TemplateDraft`, `TemplateVersion` | **ĐẦY ĐỦ** | Đã có đầy đủ quản lý phiên bản, giá mua đứt (`priceBuy`), giá gốc (`priceBuySource`), trạng thái Studio. |
| **Thương mại & Gói cước** | `Order`, `Subscription`, `Cart`, `CartItem`, `Wishlist`, `Review` | **ĐẦY ĐỦ** | Đã có phân loại đơn hàng `BUY`, `RENT`, `billingPeriod: YEARLY`, `paidAt`, `transactionCode`. |
| **Nội dung Website (CMS)** | `Project`, `Post`, `Category`, `Tag`, `Banner`, `Menu`, `MenuItem`, `CompanyInfo`, `SeoConfig`, `TenantPage`, `TenantSection`, `ContentVersion` | **ĐẦY ĐỦ** | Lưu trữ linh hoạt thông tin công ty, dự án BĐS, bài viết, SEO và cấu trúc section. |
| **Thư viện Media & CRM** | `Media`, `MediaFolder`, `MediaAsset`, `MediaUsage`, `MediaRecycleBin`, `ContactFormSubmission`, `Lead`, `LeadNote`, `LeadActivity`, `DemoSession` | **ĐẦY ĐỦ** | Phân cấp thư mục ảnh, thùng rác 30 ngày, CRM phễu khách hàng tiềm năng. |

---

## 2. Gap Analysis & Đề Xuất Cải Tiến

| Hạng mục | Hiện trạng | Khoảng cách (GAP) | Giải pháp kỹ thuật an toàn | Mức độ rủi ro |
| :--- | :--- | :--- | :--- | :---: |
| **1. Quản lý Quota Dùng Thử** | Model `Tenant` đã có các trường trial | Logic tăng `trialSaveCount` hiện tại chưa được bọc hoàn toàn trong Prisma Transaction | Viết hàm cập nhật nguyên tử (Atomic Update): `prisma.$transaction(...)` đảm bảo không bị race condition khi khách bấm lưu nhiều lần. | Rất thấp |
| **2. Tinh gọn 2 Role cốt lõi** | `UserRole` enum có 7 giá trị (`SUPER_ADMIN`, `ADMIN`, `TENANT_OWNER`, `EDITOR`, `STAFF`, `CUSTOMER`, `GUEST`) | Yêu cầu nghiệp vụ chỉ cần 2 role chính: `SUPER_ADMIN` (toàn quyền sàn) và `CUSTOMER_OWNER` (chủ website) | Giữ nguyên enum trên DB để tránh gãy dữ liệu cũ, ánh xạ logic trong `role.middleware.ts` và `@repo/types` tập trung vào 2 vai trò cốt lõi. | Rất thấp |
| **3. Giấy phép Bản quyền (License)** | Lưu trong trường `adminNotes` hoặc `Order` | Chưa có trường `licenseKey` định danh riêng cho gói mua source | Bổ sung trường tùy chọn `licenseKey String? @map("license_key")` trong model `Order` mà không làm thay đổi bảng cũ. | Rất thấp |

---

## 3. Quy Tắc Di Trú Dữ Liệu An Toàn (Safe Migration Rules)

1. **Tuyệt đối KHÔNG chạy `prisma migrate reset`** ở bất kỳ môi trường nào.
2. **Tuyệt đối KHÔNG chạy `DROP DATABASE`** hoặc drop các bảng hiện có.
3. Khi cần thêm cột mới: Chỉ sử dụng `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` với giá trị mặc định (`DEFAULT`) hoặc cho phép `NULL` để không làm gián đoạn dữ liệu đang hoạt động.
4. Mọi thay đổi schema đều phải được kiểm tra qua `pnpm --filter database exec prisma generate` và test kết nối trước khi khởi động server.
