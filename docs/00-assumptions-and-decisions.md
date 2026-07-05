# 00. Assumptions & Core Decisions (FINAL)

> Tài liệu này ghi lại tất cả các câu trả lời chính thức và quyết định kiến trúc cốt lõi được phê duyệt từ Khách hàng / Product Owner, làm kim chỉ nam và nguồn dữ liệu duy nhất (Single Source of Truth) cho toàn bộ 20 tài liệu đặc tả kỹ thuật.

---

## Phản hồi chính thức (Q1 - Q18) & Thiết lập MVP

### 1. Nhân sự & Tiến độ (Q1)
- **Nhân sự:** 1 Developer chính với sự hỗ trợ của AI (Antigravity, ChatGPT).
- **Mục tiêu:** Hoàn thành MVP trong **7 ngày** bằng phương pháp AI-assisted development.

### 2. Luồng Mua/Thuê thủ công (Q2)
- **Quy trình:**
  1. User chọn gói **Mua** hoặc **Thuê**.
  2. Điền form đăng ký thông tin.
  3. Hệ thống hiển thị thông tin chuyển khoản (Ngân hàng, Số tài khoản, Chủ tài khoản, Số tiền, Nội dung chuyển khoản).
  4. Sau khi chuyển khoản, user thực hiện một trong hai hành động:
     - Upload ảnh biên lai chuyển tiền (bill).
     - Hoặc điền mã giao dịch ngân hàng.
  5. Admin duyệt thủ công qua Super Admin Dashboard.
  6. Sau khi xác nhận giao dịch thành công, Admin kích hoạt:
     - **Đối với Mua:** Kích hoạt quyền tải source code (Phase 1: Admin gửi ZIP, Phase 2: Tải trực tiếp từ Dashboard).
     - **Đối với Thuê:** Tự động khởi tạo Tenant và Subdomain tương ứng.

### 3. Biểu giá dịch vụ (Q3)
- **Công khai biểu giá trên Marketplace:**
  - **Mua Source Code:** 3.900.000 VNĐ (Thanh toán 1 lần).
  - **Thuê Website:** 399.000 VNĐ / tháng.
  - **Yêu cầu chỉnh sửa riêng:** Hiển thị nút "Liên hệ báo giá".

### 4. Giao nhận Source Code (Q4)
- **Phase 1 (MVP):** Admin gửi file ZIP trực tiếp qua email cho khách hàng sau khi duyệt đơn.
- **Phase 2:** Tích hợp nút tải trực tiếp file ZIP source code từ Dashboard của User.

### 5. Chính sách hết hạn thuê (Q5)
- **Khi hết hạn:** 
  - Website tenant tự động chuyển sang trạng thái **Suspended** (Hiển thị màn hình thông báo bảo trì/hết hạn cho khách truy cập).
  - Hệ thống **không xóa dữ liệu ngay**.
  - Lưu giữ toàn bộ dữ liệu trong vòng **30 ngày**.
  - Sau 30 ngày, Super Admin có quyền xóa thủ công dữ liệu của tenant đó.

### 6. Phân kỳ dự án (Phase Breakdown) (Q6)
- **Phase 1 (MVP - 7 ngày):** Xây dựng nền tảng cốt lõi: Marketplace, Super Admin, CMS Tenant, Auth, 1 template Luxury BĐS hoàn chỉnh, luồng mua/thuê thủ công, deploy lên VPS.
- **Phase 2 (Mở rộng):** Customization engine (đổi logo, banner, color theme trực tiếp), thêm 2 templates (tổng cộng 3), tải file ZIP trực tiếp từ Dashboard, hỗ trợ custom domain.
- **Phase 3 (SaaS hoàn chỉnh):** Tự động hóa thanh toán online (VNPay, Momo), sitemap động, các tính năng SaaS nâng cao.

### 7. Kiến trúc cơ sở dữ liệu (Q7 & Q17)
- **Mô hình:** Shared Database (Multi-tenancy trên 1 database duy nhất).
- **Phân tách dữ liệu:** Tất cả các bảng liên quan đến Tenant đều phải có trường `tenant_id`.
- **Dung lượng upload:** Giới hạn tối đa **500 MB** cho mỗi tenant ở Phase 1. Phase 2 sẽ giới hạn theo gói thuê.

### 8. Định tuyến Tenant & Tên miền (Q8 & Q10)
- **Mô hình routing:** Single Application xử lý request động dựa trên HTTP Host.
- **Phase 1 (MVP):** Định tuyến qua subdomain mặc định dạng `[tenant-slug].domain.com`.
- **Phase 2:** Hỗ trợ ánh xạ tên miền riêng (custom domain) của tenant về IP hệ thống.

### 9. Khả năng tùy biến trong CMS (Q9 & Q18)
- **CMS chỉ chỉnh sửa nội dung (Content Only):**
  - Đổi logo, banner, màu sắc chủ đạo, typography cơ bản.
  - CRUD bài viết, dự án, thông tin công ty, quản lý menu điều hướng.
  - Không cho phép kéo thả hoặc can thiệp layout cấu trúc trang.
- **Sự khác biệt giữa 3 Templates:** Khác biệt về mặt giao diện (CSS, màu sắc, font chữ), cấu trúc các section trên trang chủ, cách hiển thị chi tiết dự án. Nhưng tất cả dùng chung backend API, database schema và CMS.

### 10. Super Admin Dashboard (Q11)
- **Quyền hạn Super Admin:** Quản lý toàn bộ hệ thống bao gồm:
  - Users (Quản trị viên, Tenant Admin, Editor).
  - Orders (Phê duyệt đơn hàng mua/thuê, xem ảnh bill chuyển khoản).
  - Templates (Cấu hình các template có sẵn).
  - Tenants (Xem dung lượng sử dụng, cấu hình trạng thái Active/Suspended).
  - Domains (Quản lý subdomain và custom domain).
  - Support (Tiếp nhận thông tin liên hệ/báo giá).

### 11. Dịch vụ Email (Q12)
- **Phase 1 (MVP):** Sử dụng thư viện Nodemailer kết hợp tài khoản Gmail SMTP để gửi email tự động (Welcome, Order confirmation, Notify admin).
- **Phase 2:** Chuyển dịch sang dùng Resend API để có chất lượng gửi mail chuyên nghiệp và ổn định hơn.

### 12. Cơ chế dùng thử (Demo / Trial) (Q13, Q14 & Q15)
- **Điều kiện bắt buộc:** User phải đăng ký tài khoản và đăng nhập để kích hoạt phiên bản dùng thử (nhằm mục đích tracking).
- **Giới hạn dùng thử:** Tối đa **3 lần lưu thay đổi** HOẶC **3 ngày** kể từ ngày tạo bản demo (tùy điều kiện nào đến trước).
- **Khi hết lượt dùng thử:**
  - Không cho phép lưu thêm bất kỳ thay đổi nào trong CMS.
  - Hiển thị Popup cảnh báo: *"Bạn đã hết lượt dùng thử. Vui lòng mua hoặc thuê website để kích hoạt chính thức."*
  - Giữ lại dữ liệu đã chỉnh sửa để nếu user thanh toán, dữ liệu sẽ tự động chuyển sang website chính thức.

### 13. Cấu trúc trường dữ liệu Dự án BĐS (Q16)
Mỗi dự án BĐS (`Project`) trong DB bắt buộc gồm các trường:
- `title`: Tiêu đề dự án
- `slug`: Slug SEO url
- `description`: Mô tả chi tiết (Rich Text)
- `short_description`: Mô tả ngắn
- `price`: Giá (Text hiển thị, ví dụ: "Từ 3.5 Tỷ" hoặc "Thỏa thuận")
- `area`: Diện tích (Text, ví dụ: "50m2 - 120m2")
- `bedrooms`: Số phòng ngủ (Integer)
- `bathrooms`: Số phòng tắm (Integer)
- `direction`: Hướng nhà (String)
- `address`: Địa chỉ chi tiết
- `city`: Tỉnh/Thành phố
- `district`: Quận/Huyện
- `ward`: Phường/Xã
- `lat`: Vĩ độ bản đồ (Float)
- `lng`: Kinh độ bản đồ (Float)
- `status`: Trạng thái dự án (Enum: COMING_SOON, SELLING, SOLD_OUT)
- `type`: Loại hình BĐS (Enum: APARTMENT, VILLA, TOWNHOUSE, LAND, COMMERCIAL)
- `thumbnail`: Ảnh đại diện (Cloudinary URL)
- `gallery`: Danh sách ảnh chi tiết (Array string Cloudinary URLs)
- `video_url`: Link Youtube giới thiệu (String)
- `map_embed`: Mã nhúng Google Map iframe (Text)
- `amenities`: Các tiện ích (Array string, ví dụ: ["Gym", "Pool", "Park"])
- `seo_title`: Tiêu đề SEO
- `seo_description`: Mô tả SEO
- `seo_keywords`: Từ khóa SEO
- `published_at`: Thời gian xuất bản (DateTime)
- `created_at`: Thời gian tạo
- `updated_at`: Thời gian cập nhật

---

## 🛠️ Quyết định Kỹ thuật bổ sung

### 1. Authentication
- Cơ chế bảo mật sử dụng song song **Access Token (JWT)** lưu tại cookie (httpOnly, secure) thời gian sống ngắn (15 phút) và **Refresh Token** lưu tại database thời gian sống dài (7 ngày) để cấp lại access token tự động.

### 2. Quản lý lưu trữ file & Media Upload
- Sử dụng **Cloudinary** làm kho lưu trữ hình ảnh (logo, banner, dự án, bài viết).
- Database PostgreSQL chỉ lưu trữ metadata và URL của file trên Cloudinary.
- Giới hạn kích thước file upload: tối đa 5MB/file hình ảnh.

### 3. Tối ưu hóa SEO
- Xây dựng **Dynamic Sitemap** (`sitemap.xml`) tự động cập nhật danh sách dự án và bài viết của từng tenant.
- Cấu hình file `robots.txt` chuẩn cho từng subdomain.
- Tự động sinh thẻ Meta Open Graph (OG tags) và cấu trúc dữ liệu JSON-LD (Schema.org) cho các trang chi tiết dự án BĐS nhằm tối ưu hóa hiển thị khi chia sẻ trên mạng xã hội và Google Search.

### 4. Triển khai & Vận hành (Deployment)
- Sử dụng **Docker Compose** đóng gói toàn bộ ứng dụng (Next.js app, Express.js API, PostgreSQL) thành các container độc lập.
- Triển khai trên **1 VPS** (Ubuntu Server).
- **Nginx** làm Reverse Proxy điều hướng subdomain động và cấu hình SSL (Let's Encrypt).
- Cấu hình **Cloudflare** làm DNS, CDN cache tĩnh và kích hoạt tường lửa WAF chống DDoS.

### 5. Kiến trúc Template & Theme
- Hệ thống thiết kế theo kiến trúc **1 CMS chung**, **1 Backend API chung** phục vụ tất cả các tenants.
- Các giao diện khác nhau (Theme) được quyết định thông qua config load từ Database và chuyển đổi giao diện động ở Frontend bằng cách nạp cấu hình CSS variables và render đúng UI component tương ứng của theme đó.

### 6. Định hướng Mỹ thuật & UI/UX
- Phong cách chủ đạo: **Luxury Real Estate**, tối giản (Minimal), sang trọng.
- Tone màu chính: **Gold (#C5A572 hoặc #D4AF37) kết hợp cùng White và Deep Navy (#1A1A2E)**.
- Triết lý thiết kế: **Mobile First**, tối ưu hóa giao diện hiển thị trên điện thoại vì >80% khách hàng BĐS truy cập bằng mobile.

### 7. Bộ Dữ liệu mẫu (Seed Data)
Để phục vụ quá trình test và nghiệm thu sản phẩm ngay sau khi code xong, script seed dữ liệu sẽ tự động tạo:
- 3 Công ty môi giới giả lập (Tenant admin).
- 20 Dự án bất động sản phân bố đa dạng phân khúc và khu vực (Vinhomes, Masteri, The Manor...).
- 20 Bài viết tin tức thị trường BĐS.
- 10 Banners quảng cáo luxury.
- 1 Tài khoản Super Admin mặc định.
