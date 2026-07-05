# 18. Risk Analysis

> Tài liệu này xác định các rủi ro tiềm ẩn trong quá trình thiết kế, phát triển và triển khai hệ thống Real Estate Template Marketplace & SaaS Platform, kèm theo đánh giá mức độ ưu tiên và các phương án giảm thiểu/ứng phó tương ứng.

---

## 📊 Ma trận đánh giá rủi ro (Risk Matrix)

Mức độ rủi ro được tính bằng: **Điểm rủi ro = Khả năng xảy ra (Probability) × Mức độ ảnh hưởng (Impact)**.

- **Khả năng xảy ra (1-5):** 1: Rất thấp, 2: Thấp, 3: Trung bình, 4: Cao, 5: Rất cao.
- **Mức độ ảnh hưởng (1-5):** 1: Không đáng kể, 2: Nhẹ, 3: Trung bình, 4: Nặng, 5: Thảm họa.

| Khả năng xảy ra / Mức độ ảnh hưởng | 1 (Không đáng kể) | 2 (Nhẹ) | 3 (Trung bình) | 4 (Nặng) | 5 (Thảm họa) |
|---|---|---|---|---|---|
| **5 (Rất cao)** | Thấp | Trung bình | Cao | Rất cao | Nguy hiểm |
| **4 (Cao)** | Thấp | Trung bình | Cao | Rất cao | Rất cao |
| **3 (Trung bình)** | Rất thấp | Thấp | Trung bình | Cao | Cao |
| **2 (Thấp)** | Rất thấp | Rất thấp | Thấp | Trung bình | Trung bình |
| **1 (Rất thấp)** | Rất thấp | Rất thấp | Rất thấp | Thấp | Thấp |

---

## 🔍 Phân tích 15 rủi ro chi tiết

### Nhóm 1: Rủi ro về Tiến độ & Kế hoạch (Schedule Risks)

#### R1: Trễ hạn bàn giao MVP 7 ngày do khối lượng công việc lớn
- **Phân tích:** Khối lượng coding 4 Next.js apps và 1 Express backend quá lớn cho 1 developer.
- **Khả năng xảy ra:** 4 | **Mức độ ảnh hưởng:** 4 | **Điểm rủi ro:** 16 (Rất cao)
- **Biện pháp giảm thiểu:** Cắt giảm triệt để các tính năng không thuộc MVP Phase 1 (ví dụ: chuyển cấu hình dynamic banner/menu sang Phase 2, chỉ làm 1 template duy nhất ở Phase 1). Sử dụng AI tối đa để sinh boilerplate code.
- **Phương án ứng phó:** Kéo dài thời gian code thêm 2 ngày buffer hoặc huy động thêm 1 dev hỗ trợ phần cắt CSS giao diện template.

#### R2: Thay đổi yêu cầu đột xuất từ khách hàng giữa chừng
- **Phân tích:** Khách hàng muốn đổi sang thanh toán online tự động hoặc thêm đa ngôn ngữ ngay trong tuần đầu tiên.
- **Khả năng xảy ra:** 3 | **Mức độ ảnh hưởng:** 3 | **Điểm rủi ro:** 9 (Trung bình)
- **Biện pháp giảm thiểu:** Khóa cứng tài liệu đặc tả kỹ thuật này (`MVP-FINAL-SPEC.md`) và yêu cầu ký duyệt trước khi viết dòng code đầu tiên. Bất kỳ yêu cầu mới nào cũng sẽ chuyển sang Phase 2 hoặc Phase 3.
- **Phương án ứng phó:** Đánh giá số giờ tăng thêm và thông báo dời ngày bàn giao tương ứng.

---

### Nhóm 2: Rủi ro về Kỹ thuật & Kiến trúc (Technical Risks)

#### R3: Lỗi định tuyến subdomain động ở môi trường Production
- **Phân tích:** Cấu hình Nginx / Cloudflare wildcards gặp trục trặc khiến trình duyệt không truy cập được `abc.domain.com`.
- **Khả năng xảy ra:** 3 | **Mức độ ảnh hưởng:** 5 | **Điểm rủi ro:** 15 (Cao)
- **Biện pháp giảm thiểu:** Thực hiện test cấu hình Nginx wildcard và Next.js middleware trên local/staging bằng cách sửa file hosts giả lập ngay từ Ngày 1 của dự án.
- **Phương án ứng phó:** Sử dụng giải pháp định tuyến dạng path làm phương án dự phòng tạm thời: `www.domain.com/w/abc` thay cho `abc.domain.com`.

#### R4: Rò rỉ dữ liệu giữa các Tenant (Tenant Data Leakage)
- **Phân tích:** Dev quên thêm điều kiện `tenant_id` trong câu lệnh SQL khiến tenant A nhìn thấy hoặc sửa được dự án của tenant B.
- **Khả năng xảy ra:** 2 | **Mức độ ảnh hưởng:** 5 | **Điểm rủi ro:** 10 (Trung bình)
- **Biện pháp giảm thiểu:** Sử dụng Prisma Client Extensions để tự động chèn trường `tenantId` vào mọi câu lệnh query db mà không phụ thuộc vào dev viết tay. Viết integration test tự động kiểm tra quyền truy cập.
- **Phương án ứng phó:** Khóa tạm thời hệ thống, rà soát lại Git commit gần nhất, khôi phục DB từ bản backup trước đó nếu có dữ liệu bị ghi đè.

#### R5: Cloudinary vượt quota lưu trữ (500MB) hoặc hết băng thông miễn phí
- **Phân tích:** Người dùng upload ảnh gốc dung lượng quá lớn (10MB/ảnh) làm đầy bộ nhớ nhanh chóng.
- **Khả năng xảy ra:** 4 | **Mức độ ảnh hưởng:** 3 | **Điểm rủi ro:** 12 (Cao)
- **Biện pháp giảm thiểu:** Nén ảnh tại Client trước khi upload. Giới hạn dung lượng tối đa 5MB/file. Cấu hình tự động nén định dạng chất lượng trên Cloudinary (`q_auto, f_auto`).
- **Phương án ứng phó:** Mua thêm dung lượng Cloudinary hoặc thiết lập AWS S3 / MinIO tự dựng làm kho lưu trữ dự phòng.

---

### Nhóm 3: Rủi ro về Bảo mật (Security Risks)

#### R6: Bị tấn công Brute Force vào tài khoản Admin hoặc Tenant Admin
- **Phân tích:** Kẻ tấn công dùng tool dò mật khẩu các tài khoản quản trị để chiếm quyền điều khiển.
- **Khả năng xảy ra:** 3 | **Mức độ ảnh hưởng:** 4 | **Điểm rủi ro:** 12 (Cao)
- **Biện pháp giảm thiểu:** Áp dụng rate limiting khắt khe (tối đa 5 lần đăng nhập sai trong 15 phút từ 1 IP). Yêu cầu độ dài mật khẩu tối thiểu 8 ký tự kèm chữ hoa, số và ký tự đặc biệt.
- **Phương án ứng phó:** Khóa tài khoản bị dò mật khẩu trong 30 phút, gửi email cảnh báo đăng nhập bất thường kèm IP cho quản trị viên.

#### R7: Bị hacker khai thác lỗi XSS thông qua trình soạn thảo Rich Text trong CMS
- **Phân tích:** Tenant admin vô tình copy mã script độc từ website khác dán vào mô tả dự án BĐS, mã này chạy và đánh cắp cookie của khách truy cập.
- **Khả năng xảy ra:** 3 | **Mức độ ảnh hưởng:** 4 | **Điểm rủi ro:** 12 (Cao)
- **Biện pháp giảm thiểu:** Sử dụng thư viện `dompurify` lọc bỏ toàn bộ thẻ `<script>` và mã HTML độc hại trước khi lưu vào DB.
- **Phương án ứng phó:** Chạy script rà soát và xóa sạch các thẻ html nguy hiểm trong database.

---

### Nhóm 4: Rủi ro về Kinh doanh & Vận hành (Business Risks)

#### R8: Lượng đơn đăng ký ảo khổng lồ làm nghẽn hệ thống duyệt thủ công của Admin
- **Phân tích:** Spam bot tự động gửi hàng nghìn đơn đăng ký Mua/Thuê ảo kèm ảnh bill giả.
- **Khả năng xảy ra:** 3 | **Mức độ ảnh hưởng:** 3 | **Điểm rủi ro:** 9 (Trung bình)
- **Biện pháp giảm thiểu:** Tích hợp Cloudflare Turnstile (hệ thống CAPTCHA thế hệ mới) vào form đăng ký mua/thuê.
- **Phương án ứng phó:** Tạm thời chuyển form đăng ký sang chế độ duyệt email hoặc khóa IP spam.

#### R9: Gmail SMTP chặn gửi mail do vượt giới hạn gửi trong ngày
- **Phân tích:** Gửi quá nhiều email thông báo dẫn đến Gmail khóa tài khoản gửi thư tạm thời (giới hạn 500 mail/ngày).
- **Khả năng xảy ra:** 3 | **Mức độ ảnh hưởng:** 3 | **Điểm rủi ro:** 9 (Trung bình)
- **Biện pháp giảm thiểu:** Phase 1 cấu hình chỉ gửi các email thiết yếu (đăng ký đơn hàng, kích hoạt).
- **Phương án ứng phó:** Chuyển dịch lập tức hệ thống sang Resend API hoặc Amazon SES (đã chuẩn bị sẵn ở Phase 2).

---

### Nhóm 5: Top 3 rủi ro chí mạng và Phương án xử lý khẩn cấp

1. **Rò rỉ dữ liệu Tenant (R4):** 
   - *Cách xử lý:* Lập tức cô lập tenant bị ảnh hưởng, bật bảo trì hệ thống. Rà soát log truy cập để xem hacker đã khai thác từ endpoint nào. Sửa đổi middleware kiểm tra quyền và vá code ngay lập tức trước khi mở lại hệ thống.
2. **Trễ tiến độ MVP (R1):**
   - *Cách xử lý:* Họp khẩn cấp với Product Owner vào Ngày 4 nếu phát hiện tiến độ trễ quá 1 ngày. Thực hiện dời các task thẩm mỹ phức tạp sang Phase 2, tập trung cho các API cốt lõi hoạt động đúng trước.
3. **Lỗi SSL khi map Custom Domain ở Phase 2:**
   - *Cách xử lý:* Tích hợp Cloudflare SSL cho SaaS (Cloudflare for SaaS) thay vì tự sinh chứng chỉ Let's Encrypt bằng mã nguồn để giảm thiểu lỗi cấu hình DNS sai của khách hàng làm chết Nginx.
