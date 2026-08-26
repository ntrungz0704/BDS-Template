# 07. SECURITY AUDIT — PLATFORMBDS V2

**Audit Date:** 2026-08-23  
**Auditor:** Principal Security Engineer  
**Focus:** Multi-Tenancy Isolation, IDOR Defense, Source Code Delivery & Data Protection

---

## 1. Multi-Tenant Isolation & Anti-IDOR Audit

| API Resource | Nguy cơ tiềm ẩn | Biện pháp phòng thủ hiện tại | Đánh giá an toàn |
| :--- | :--- | :--- | :---: |
| **`/api/cms/projects/:id`** | Khách A sửa/xóa dự án của Khách B | Luôn kiểm tra `where: { id: projectId, tenantId: req.user.tenantId }` | **AN TOÀN** |
| **`/api/cms/posts/:id`** | Khách A truy cập bài viết Khách B | Bắt buộc `tenantId` từ authenticated JWT | **AN TOÀN** |
| **`/api/cms/media/:id`** | Khách A xóa file hình ảnh Khách B | Kiểm tra quyền sở hữu tệp theo `tenantId` | **AN TOÀN** |
| **`/api/cms/leads/:id`** | Lộ danh sách khách hàng tiềm năng | Phân quyền nghiêm ngặt theo `tenantId` | **AN TOÀN** |
| **`/api/admin/*`** | Khách hàng thường can thiệp hệ thống | Bắt buộc role `SUPER_ADMIN` qua `requireRole(['SUPER_ADMIN'])` | **AN TOÀN** |
| **`/api/source/:orderId/download`** | Tải mã nguồn trái phép | Chỉ `SUPER_ADMIN` hoặc chính chủ đơn hàng `COMPLETED` mới tải được | **AN TOÀN** |

---

## 2. Source Code Delivery Security (Bảo Vệ Gói Bàn Giao)

1. **Tuyệt đối KHÔNG Public File ZIP**: Không lưu file mã nguồn vào thư mục public (`uploads/` hay `public/`).
2. **Quy trình kiểm tra 4 lớp trước khi cho phép tải**:
   * **Lớp 1: Authentication**: Bắt buộc có JWT Token hợp lệ.
   * **Lớp 2: Role / Ownership**: `order.userId === req.user.userId` hoặc `req.user.role === 'SUPER_ADMIN'`.
   * **Lớp 3: Order Type & Status**: `order.type === 'BUY_SOURCE'` và `order.status === 'COMPLETED'`.
   * **Lớp 4: Audit Trail**: Ghi log vào `AuditLog` với `action: 'DOWNLOAD_SOURCE_CODE'`, IP và User Agent.
3. **Link tải có thời hạn (Signed / Ephemeral Token)**: Nếu dùng URL chuyển hướng, token tải chỉ có hiệu lực trong 60 phút.

---

## 3. File Upload Security (Bảo Vệ Tải Tệp Lên)

1. **MIME Type & Extension Whitelist**: Chỉ cho phép `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `application/pdf`.
2. **Kích thước tối đa**: Giới hạn tối đa **10MB / file**.
3. **Phòng chống Path Traversal**: Tên tệp được hash ngẫu nhiên bằng `nanoid()` / `UUID`, không sử dụng tên tệp gốc chứa ký tự đặc biệt (`../`).
4. **Cô lập thư mục theo Tenant**: Mỗi tenant lưu trữ file trong thư mục riêng `uploads/:tenantId/:year/:month/`.

---

## 4. Authentication, Cookies & Headers

1. **Password Hashing**: Sử dụng `bcrypt` với `saltRounds = 10`.
2. **Token Storage**: Access token và Refresh token lưu trong `HttpOnly`, `SameSite: Lax` Cookie, ngăn chặn triệt để tấn công XSS đánh cắp token.
3. **HTTP Security Headers**: Cấu hình `helmet()` với CSP (Content Security Policy), HSTS, X-Frame-Options (`DENY`), X-Content-Type-Options (`nosniff`).
4. **Sensitive Data Protection**: Winston logger và console log tuyệt đối KHÔNG in `password`, `token`, `secret`, `creditCard`.
