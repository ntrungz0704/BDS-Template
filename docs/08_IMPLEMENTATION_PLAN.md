# 08. IMPLEMENTATION PLAN — PLATFORMBDS V2

**Audit Date:** 2026-08-23  
**Project:** PlatformBDS Enterprise V2  
**Lead Architect:** Principal Software Architect & DevOps Lead  
**Execution Policy:** STEP-BY-STEP ITERATION — ZERO REGRESSION — 100% TESTED

---

## 1. Implementation Phases (Lộ Trình Thực Thi 11 Giai Đoạn)

### 📌 PHASE 0: Audit & Architecture Freeze (✅ HOÀN THÀNH)
* Đọc toàn bộ codebase, cấu hình pnpm, Turborepo, Next.js, Express, Prisma.
* Hoàn thành 8 tài liệu phân tích hiện trạng và GAP Analysis.
* Đóng băng Tech Stack: Giữ nguyên 100% stack hiện có.

---

### 📌 PHASE 1: Security, Auth & 2-Role RBAC
* Chuẩn hóa triệt để 2 Role cốt lõi: `SUPER_ADMIN` (Toàn quyền sàn) và `CUSTOMER_OWNER` (Chủ sở hữu website).
* Khóa chặt luồng đăng nhập: Khách đăng nhập tại `/login` sẽ được tự động điều hướng thẳng vào `/cms` tương ứng với website của họ.
* Rà soát và áp dụng Anti-IDOR trên tất cả các API controller (`where: { id, tenantId }`).

---

### 📌 PHASE 2: Multi-Tenant Context & Strict Isolation
* Chuẩn hóa Middleware nhận diện Tenant: Resolve từ Subdomain, Custom Domain hoặc Header/Cookie.
* Đảm bảo mọi truy vấn dữ liệu CMS luôn gắn liền với `tenantId` từ JWT Token, tuyệt đối không tin cậy `tenantId` truyền lên từ client.

---

### 📌 PHASE 3: Template Master & Presentation Layer
* Đảm bảo cả 16 Mẫu Website trong `apps/website/src/components/templates/` hoạt động như Presentation Components thuần túy, nhận toàn bộ nội dung từ Props (`company`, `theme`, `projects`, `posts`).
* Duy trì kho dữ liệu mẫu phong phú (`demoData.ts`) để phục vụ xem Demo tức thì trên Marketplace.

---

### 📌 PHASE 4: CMS Content Architecture & Protected Fields
* Tinh gọn giao diện CMS (`apps/cms`) cho khách hàng LOW-TECH: Chỉ hiển thị các mục chỉnh sửa trực quan (Thông tin công ty, Logo, Hotline, Dự án, Tin tức, Bảng màu).
* **Backend Enforce Protected Fields**: Chặn mọi hành vi sửa đổi bản quyền sàn, cấu hình hệ thống, trạng thái gói cước qua API CMS.

---

### 📌 PHASE 5: Trial Engine & Atomic Save Quota
* Chuẩn hóa cấu hình hằng số:
  ```typescript
  export const TRIAL_CONFIG = {
    DURATION_DAYS: 3,
    SAVE_LIMIT: 3,
    WARNING_HOURS: 24,
  };
  ```
* Bọc logic Lưu CMS trong `prisma.$transaction`: Kiểm tra trạng thái Trial -> Kiểm tra Quota `< 3` -> Lưu nội dung -> Tăng `trialSaveCount` + 1.
* Thao tác Xem trước (Preview) **KHÔNG tốn Quota**.
* Khi hết hạn: Khóa quyền Lưu CMS (Read-Only) và hiển thị trang thông báo hết hạn trên website công khai, **bảo toàn 100% dữ liệu**.

---

### 📌 PHASE 6: Rent Subscription (Thuê Theo Năm)
* Chuẩn hóa chu kỳ thanh toán `YEARLY` (365 ngày).
* Vòng đời trạng thái: `PENDING` -> `ACTIVE` -> `EXPIRING` (trước 30 ngày) -> `EXPIRED` -> `SUSPENDED`.
* Khi hết hạn gói thuê: Khóa quyền chỉnh sửa CMS và tạm ngừng website công khai cho đến khi gia hạn.

---

### 📌 PHASE 7: Manual Payment Flow (Zalo & Chuyển Khoản)
* Khách đặt hàng mua/thuê -> Chuyển khoản ngân hàng & gửi mã đơn qua Zalo.
* Super Admin truy cập trang Quản trị (`localhost:3002/orders`) -> Kiểm tra sao kê -> Bấm **"Phê Duyệt Đơn Hàng"**.
* Hệ thống tự động kích hoạt dịch vụ / gia hạn thời hạn sử dụng.

---

### 📌 PHASE 8: Buy Source & Low-Tech Delivery Pipeline
* Xây dựng script đóng gói tự động (`scripts/build-delivery-package.ts`):
  * Biên dịch giao diện template của khách thành thư mục HTML tĩnh **`public_html/`**.
  * Tự động sinh file hướng dẫn cài đặt tiếng Việt **`HUONG_DAN_CAI_DAT_TIENG_VIET.pdf`** và **`LICENSE.txt`**.
  * Đóng gói thành file ZIP bảo mật.
* Khách hàng tải qua API `GET /api/source/:orderId/download` có xác thực quyền sở hữu và lưu `AuditLog`.

---

### 📌 PHASE 9: Domain & Hosting Integration
* Hỗ trợ Subdomain tự động dạng `ten-khach-hang.platformbds.vn`.
* Cung cấp tài liệu và cấu hình Nginx Reverse Proxy / Cloudflare DNS cho Tên miền riêng (Custom Domain).

---

### 📌 PHASE 10: Testing & 20 Acceptance Test Suites
* Thực hiện kiểm thử toàn diện 20 kịch bản chấp thuận (Chi tiết bên dưới).

---

### 📌 PHASE 11: Production Hardening & Handover
* Kiểm tra Docker Compose production, tối ưu bộ nhớ, log rotation, bảo mật biến môi trường `.env`.

---

## 2. 20 Acceptance Test Suites (Kịch Bản Kiểm Thử Chấp Thuận)

| Test ID | Kịch bản kiểm thử | Hành động thực hiện | Kết quả mong đợi (Expected) |
| :---: | :--- | :--- | :--- |
| **TEST 01** | Admin tạo khách hàng mới | Super Admin tạo User & Tenant trên Admin Portal | Khách hàng và Tenant được tạo thành công trong Database. |
| **TEST 02** | Admin gán Template cho khách | Chọn 1 trong 16 mẫu BĐS cho Tenant | Website Instance được khởi tạo đúng giao diện tương ứng. |
| **TEST 03** | Khởi tạo Trial Dùng thử | Kích hoạt dùng thử cho Tenant mới | Thiết lập chính xác `trialStartAt`, `trialEndAt` (3 ngày), `trialSaveLimit = 3`. |
| **TEST 04** | Khách đăng nhập vào hệ thống | Khách nhập email/mật khẩu tại `/login` | Hệ thống nhận diện Tenant và điều hướng thẳng vào `/cms`. |
| **TEST 05** | Khách chỉnh sửa nội dung | Khách đổi hotline, logo, thêm dự án BĐS | Hệ thống cho phép cập nhật vào bộ nhớ tạm/giao diện. |
| **TEST 06** | Khách xem trước (Preview) | Khách bấm nút "Xem trước giao diện" | Xem trước thành công, Quota lưu giữ nguyên (0/3). |
| **TEST 07** | Khách lưu lần đầu (Save #1) | Khách bấm "Lưu thay đổi" | Dữ liệu lưu vào DB thành công, Quota tăng lên `1/3`. |
| **TEST 08** | Khách lưu lần thứ 3 (Save #3) | Khách tiếp tục chỉnh sửa và lưu lần 3 | Dữ liệu lưu thành công, Quota chạm mức tối đa `3/3`. |
| **TEST 09** | Khách lưu lần thứ 4 (Save #4) | Khách cố gắng bấm lưu thêm lần nữa | Backend từ chối với mã lỗi `TRIAL_SAVE_LIMIT_EXCEEDED`. |
| **TEST 10** | Cảnh báo trước 24h hết hạn | Thời gian dùng thử còn dưới 24 giờ | CMS hiển thị banner cảnh báo màu vàng thông báo gia hạn. |
| **TEST 11** | Trial hết hạn trên CMS | Thời gian `trialEndAt` đã qua | CMS chuyển sang chế độ Read-Only, khóa nút Lưu & Xuất bản. |
| **TEST 12** | Trial hết hạn trên Public Web | Khách truy cập website công khai | Hiển thị trang thông báo website dùng thử đã hết hạn. |
| **TEST 13** | Bảo toàn dữ liệu khi hết hạn | Kiểm tra dữ liệu bài viết, dự án của khách | Dữ liệu, hình ảnh vẫn được giữ nguyên 100%, không bị xóa. |
| **TEST 14** | Cô lập dữ liệu (Anti-IDOR) | Khách A cố tình gọi API lấy/sửa dữ liệu Khách B | Backend trả về mã lỗi `403 Forbidden` hoặc `404 Not Found`. |
| **TEST 15** | Bảo vệ trường cấm (Protected) | Khách cố tình gửi payload đổi copyright/gói cước | Backend bỏ qua hoặc từ chối request, giữ nguyên dữ liệu gốc. |
| **TEST 16** | Tải mã nguồn khi chưa thanh toán | User gọi API tải source khi đơn chưa duyệt | Backend trả về `403 FORBIDDEN` (Chưa hoàn tất thanh toán). |
| **TEST 17** | Tải mã nguồn của khách hàng khác | User A gọi API tải file đơn hàng của User B | Backend từ chối ngay lập tức với mã `403 FORBIDDEN`. |
| **TEST 18** | Admin duyệt đơn hàng | Admin bấm duyệt đơn thanh toán chuyển khoản | Trạng thái chuyển `COMPLETED`, kích hoạt gói thuê / link tải source. |
| **TEST 19** | Hết hạn gói thuê (Rent Expired) | Hết thời hạn thuê năm (365 ngày) | Website công khai tạm ngưng hoạt động, yêu cầu gia hạn. |
| **TEST 20** | Hoàn tất mua Source Code | Khách mua đứt source sau khi được duyệt | Tải file ZIP thành công, giải nén có đầy đủ `public_html/` và hướng dẫn. |
