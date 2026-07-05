# API AUDIT REPORT (CHUYÊN SÂU)

| Chỉ số | Chi tiết |
|---|---|
| **Dự án** | Real Estate Template Marketplace & SaaS Platform |
| **Vai trò kiểm toán** | Solution Architect & API Quality Engineer |
| **Trạng thái kiểm toán** | **PASSED WITH PATCHES** |

---

## 1. Kết quả đánh giá Kỹ thuật API

### 1.1 Chiến lược Tìm kiếm (Search Strategy - Điểm 12)
- **Đánh giá:** **VALID (Sử dụng ILIKE cho MVP)**.
- **Lý do:** 
  - Quy mô dữ liệu MVP của mỗi tenant cực kỳ nhỏ (seed data có 20 dự án, thực tế môi giới cá nhân quản lý tối đa 50-100 bất động sản hoạt động).
  - Sử dụng toán tử `ILIKE %keyword%` trên các trường được index (`title`, `description`) trong PostgreSQL cho tốc độ tìm kiếm dưới 10ms.
  - Việc cấu hình Meilisearch hay PostgreSQL Full Text Search (FTS) là **không cần thiết** cho Phase 1, làm tăng gánh nặng cài đặt hạ tầng VPS và đồng bộ chỉ mục.
- **Giải pháp:** Sử dụng query Prisma:
  ```typescript
  where: {
    tenantId,
    title: { contains: queryStr, mode: 'insensitive' }
  }
  ```

### 1.2 Background Jobs cho Email, Backup & Cleanup (Điểm 10)
- **Đánh giá:** **INVALID cho Phase 1 (Bắt buộc dời sang Phase 2)**.
- **Lý do:**
  - Tích hợp BullMQ yêu cầu Redis hoạt động ổn định và viết thêm các tiến trình Worker chạy ngầm riêng biệt. Điều này làm phức tạp hóa cấu trúc Monorepo và kéo dài thời gian phát triển vượt quá 7 ngày.
- **Giải pháp thay thế cho MVP Phase 1:**
  - **Email:** Gửi bất đồng bộ dạng fire-and-forget (không dùng `await` khi gọi hàm gửi mail của Nodemailer). Điều này giúp API phản hồi khách hàng ngay lập tức mà không bị nghẽn bởi tốc độ SMTP.
  - **Cleanup Demo:** Viết một API route ẩn bảo mật bằng token `/api/cron/cleanup-demo`. Cấu hình trình gọi tự động (Cron job) của VPS hoặc Cloudflare Cron trigger gọi API này mỗi ngày một lần để xóa các DemoSession hết hạn trong database.
  - **Backup DB:** Chạy bằng shell script đơn giản kết hợp `cron` của Linux VPS, dump trực tiếp ra file và đẩy lên Cloud storage.

### 1.3 Caching Layer & Sự cần thiết của Redis (Điểm 11)
- **Đánh giá:** **INVALID cho Phase 1 (Không bắt buộc dùng Redis cho caching)**.
- **Lý do:**
  - Next.js Website App sử dụng cơ chế **ISR (Incremental Static Regeneration)** với thời gian `revalidate: 60s`. Điều này nghĩa là toàn bộ trang web BĐS của tenant được render và cache dưới dạng HTML tĩnh ngay trên đĩa cứng của máy chủ VPS / CDN.
  - Khách truy cập vào web sẽ đọc trực tiếp file HTML tĩnh từ Nginx/Next.js, hoàn toàn không sinh bất kỳ request nào đến API Express hay Database PostgreSQL.
  - Thêm Redis cache ở API tầng này sẽ gây lãng phí tài nguyên RAM của VPS và tăng nguy cơ lỗi bất đồng bộ dữ liệu (Stale Cache) khi tenant admin cập nhật dự án trong CMS nhưng cache Redis chưa được xóa.
- **Giải pháp:** Bỏ qua Redis Cache cho dữ liệu công khai ở Phase 1. Chỉ dùng Redis làm Session Store cho phiên đăng nhập nếu cần thiết, hoặc dùng JWT hoàn toàn.

---

## 2. Kiểm toán Validation & Authorization Contracts

### 2.1 Ép kiểu Zod (Zod Coercion)
- **Vấn đề:** Khi gửi dữ liệu dạng `multipart/form-data` để tải ảnh và điền thông tin dự án, toàn bộ các trường số (`bedrooms`, `bathrooms`, `priceFrom`) đều bị Express parse thành kiểu `String`. Zod validator thông thường sẽ báo lỗi do lệch kiểu dữ liệu (`expected number, received string`).
- **Giải pháp:** Sử dụng tính năng ép kiểu của Zod (`z.coerce`) khi khai báo schema kiểm tra dữ liệu ở Backend:
  ```typescript
  bedrooms: z.coerce.number().int().nonnegative(),
  bathrooms: z.coerce.number().int().nonnegative(),
  priceFrom: z.coerce.number().optional()
  ```

### 2.2 Middleware phân quyền (RBAC)
- Khóa chặt các đầu API của Super Admin bằng cách kiểm tra:
  ```typescript
  if (req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: "Yêu cầu quyền Super Admin." });
  }
  ```
- Khóa chặt API CMS Tenant bằng cách so khớp:
  ```typescript
  if (req.user.tenantId !== req.tenantId && req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: "Truy cập trái phép vào tài nguyên Tenant." });
  }
  ```

---

## 3. Khóa cấu hình API Patch

- Bổ sung endpoint check trùng subdomain: `GET /api/marketplace/check-subdomain?slug=xxx`
- Bổ sung endpoint gửi bill thanh toán: `POST /api/marketplace/orders/:id/payment`
- API Backend đạt tính chuẩn hóa RESTful và sẵn sàng kết nối.
