# 14. Performance Standards

> Tài liệu này thiết lập các chỉ tiêu và giải pháp kỹ thuật bắt buộc để tối ưu hóa hiệu năng cho toàn bộ hệ thống Real Estate Template Marketplace & SaaS Platform. Mục tiêu là mang lại trải nghiệm mượt mà, tốc độ phản hồi nhanh chóng dưới 200ms cho API và tối ưu điểm SEO tối đa trên cả thiết bị di động và máy tính.

---

## 1. Core Web Vitals & Lighthouse Targets

Mọi trang công khai (Marketplace, Tenant Website) phải đạt điểm tối thiểu sau đây trên môi trường Production khi đo bằng Google Lighthouse (đặc biệt là Mobile First):

| Chỉ số | Target di động | Target máy tính | Giải thích |
|---|---|---|---|
| **Lighthouse Performance Score** | ≥ 90 | ≥ 95 | Điểm hiệu năng tổng thể |
| **Lighthouse SEO Score** | ≥ 95 | ≥ 98 | Điểm tối ưu tìm kiếm |
| **Largest Contentful Paint (LCP)** | < 2.5s | < 1.2s | Tốc độ tải phần tử lớn nhất |
| **Interaction to Next Paint (INP)** | < 200ms | < 100ms | Độ trễ phản hồi tương tác |
| **Cumulative Layout Shift (CLS)** | < 0.1 | < 0.05 | Độ dịch chuyển bố cục trang |

---

## 2. Next.js Optimization Strategy (Chiến lược tối ưu Frontend)

Chúng ta có 3 Next.js applications khác nhau, mỗi app cần áp dụng các cơ chế render phù hợp nhất:

### Marketplace (www.domain.com)
- **Cơ chế render:** **Static Site Generation (SSG)** cho các trang tĩnh như Trang chủ, Danh sách Template, Chi tiết Template.
- **Tần suất cập nhật:** Sử dụng **Incremental Static Regeneration (ISR)** với `revalidate: 3600` (1 tiếng) cho các trang có dữ liệu ít biến động như danh sách template để giảm tải cho database và tăng tốc độ phản hồi qua CDN.
- **Trang liên hệ/báo giá:** Render phía Client (CSR) vì có chứa form tương tác.

### Tenant Website ([tenant-slug].domain.com)
- **Cơ chế render:** **ISR (Incremental Static Regeneration)** là bắt buộc cho trang chủ, trang danh sách dự án, trang chi tiết dự án.
- **Tần suất revalidate:** `revalidate: 60` (1 phút). Khi tenant admin cập nhật dự án mới trong CMS, website của tenant sẽ phản ánh thay đổi sau tối đa 60 giây mà không cần build lại toàn bộ ứng dụng. Điều này đảm bảo tốc độ phản hồi tức thời (<100ms) vì trang được cache sẵn dạng file HTML tĩnh trên đĩa của máy chủ.
- **Trang liên hệ:** Render dạng tĩnh (SSG) kết hợp form xử lý API client-side.

### CMS & Admin Dashboard (cms.domain.com, admin.domain.com)
- **Cơ chế render:** **Client-Side Rendering (CSR)** đằng sau bức tường đăng nhập (Authentication wall). Không cần SEO, chú trọng vào độ mượt mà khi tương tác và cập nhật dữ liệu thời gian thực.
- **Tối ưu hóa:** Sử dụng `next/dynamic` để code-split các component nặng (như trình soạn thảo Rich Text Editor, các biểu đồ thống kê Chart.js) giúp giảm dung lượng bundle JS ban đầu xuống dưới 200KB.

---

## 3. Database Optimization Strategy (Tối ưu hóa Database)

### Indexes Strategy (Thiết lập chỉ mục)
Cần đánh chỉ mục (Indexes) chính xác vào các cột thường xuyên xuất hiện trong mệnh đề `WHERE`, `ORDER BY` và các phép `JOIN` để ngăn chặn table scan:
- **Tenant Isolation:** Tạo index phức hợp `(tenantId, published)` hoặc `(tenantId, status)` trên các bảng `Project`, `Post` vì mọi truy vấn phía tenant website luôn lọc theo tenant_id và trạng thái xuất bản.
- **Slug Lookup:** Đánh chỉ mục `UNIQUE` trên cột `slug` của bảng `Tenant`, `Project`, `Post` để tăng tốc truy vấn khi người dùng truy cập trực tiếp bằng URL.
- **Foreign Keys:** Tạo index cho tất cả các trường khóa ngoại như `tenantId`, `userId`, `templateId`.

### Connection Pooling (Quản lý kết nối)
- Sử dụng **Prisma Accelerate** hoặc công cụ quản lý kết nối **PgBouncer** tích hợp sẵn trong Docker Compose cho PostgreSQL để hạn chế lỗi nghẽn kết nối khi lượng truy cập tăng đột biến.
- Đặt giới hạn connection limit phù hợp trong chuỗi kết nối Database URL:
  ```env
  DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public&connection_limit=20"
  ```

---

## 4. Media & Image Optimization (Tối ưu hóa Hình ảnh)

Hình ảnh bất động sản chiếm >80% dung lượng trang web BĐS. Bắt buộc tối ưu thông qua Cloudinary kết hợp với thẻ `<Image>` của Next.js:
1. **Dynamic Format & Quality:** Sử dụng tham số tự động chuyển đổi của Cloudinary để luôn trả về định dạng ảnh tối ưu nhất cho trình duyệt (WebP hoặc AVIF) và nén dung lượng ảnh tự động mà không làm giảm chất lượng mắt thường có thể thấy:
   - URL gốc: `https://res.cloudinary.com/demo/image/upload/sample.jpg`
   - URL tối ưu: `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/sample.jpg` (Tự chọn định dạng, tự nén chất lượng, giới hạn chiều rộng 800px).
2. **Next.js Image Component:** Luôn dùng `<Image>` từ `next/image` thay cho thẻ `<img>` thông thường. Thẻ này tự động tạo các kích thước ảnh khác nhau (responsive srcsets), hỗ trợ lazy loading mặc định (chỉ tải ảnh khi cuộn đến màn hình) và ngăn hiện tượng Layout Shift (CLS) bằng cách yêu cầu định nghĩa trước tỷ lệ khung hình (width, height hoặc layout="fill").

---

## 5. Caching Strategy (Chiến lược Caching)

Áp dụng mô hình caching 3 lớp:
1. **Lớp 1: Browser Caching (Trình duyệt):** Cấu hình tiêu đề `Cache-Control` cho các tài sản tĩnh (JS, CSS, Font, Ảnh logo cố định) với thời gian lưu trữ dài (`public, max-age=31536000, immutable`).
2. **Lớp 2: CDN Caching (Cloudflare):** Cache toàn bộ các trang tĩnh của Tenant Website trên CDN Edge Servers của Cloudflare. Thiết lập luật tự động xóa cache (Purge Cache) thông qua Cloudflare API khi tenant admin thực hiện hành động xuất bản dự án mới hoặc sửa thông tin công ty.
3. **Lớp 3: API Caching (Redis - Optional cho Phase 2):** Cache kết quả của các truy vấn database nặng (như danh sách dự án nổi bật của 3 tenant chính) vào bộ nhớ tạm Redis với thời gian sống 5-10 phút để giảm tải trực tiếp cho PostgreSQL.

---

## 6. API Response Time Targets (Chỉ tiêu API)

Toàn bộ Backend Express API phải đáp ứng các chỉ tiêu thời gian phản hồi (Response Time) sau:

| Loại API | Thời gian phản hồi tối đa (95th percentile) | Giải pháp nếu vượt quá |
|---|---|---|
| **API Đọc dữ liệu (GET)** | < 150ms | Thêm Index, áp dụng Cache, tối ưu câu lệnh query SQL |
| **API Ghi dữ liệu (POST, PUT, DELETE)** | < 300ms | Chuyển các tác vụ nặng sang chạy bất đồng bộ (Background Tasks) |
| **API Upload file ảnh** | < 1.5s (lên Cloudinary) | Validate kích thước file ở client trước khi cho upload |
| **API Đăng nhập (Auth)** | < 250ms | Giới hạn số vòng băm salt của bcrypt (giữ ở mức 12) |
