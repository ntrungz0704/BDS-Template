---
name: bds-template-qa-checklist
description: >-
  Quy trình kiểm tra nghiệm thu chất lượng bắt buộc (QA Checklist) sau khi tạo hoặc sửa đổi bất kỳ template nào trong 24 Templates BĐS. Đảm bảo mọi nút bấm, link, trang con, responsive, map, bộ lọc tìm kiếm, footer TEMPLATEBDS hoạt động thật 100% và luôn hỗ trợ trọn bộ 3 định dạng: React/Next.js cho sàn Marketplace + Standalone HTML5/CSS3/JS + PHP & MySQL kèm database.sql để khách hàng dễ dàng triển khai trên Hosting cPanel / XAMPP.
---

# Quy Trình Nghiệm Thu & Kiểm Tra Chất Lượng Template BĐS (BDS Template QA Checklist)

Quy trình này là tiêu chuẩn bắt buộc phải thực hiện sau khi tạo mới hoặc sửa đổi bất kỳ template nào trong hệ thống 24 BĐS Templates.

---

## 1. Kiểm Tra Nội Dung & Dữ Liệu Thật (Real Content 100% Tiếng Việt)

- [ ] **Trang Chủ (`home`)**: Có đầy đủ Banner Hero tìm kiếm, Danh sách BĐS bán, Dự án nổi bật, BĐS cho thuê, Dự án theo thành phố lớn, Tin tức mới nhất.
- [ ] **Tất cả các Trang Con**: Không được để bất kỳ trang nào trống trơn:
  - Căn hộ (`/can-ho`)
  - Nhà phố (`/nha-pho`)
  - Biệt thự (`/biet-thu`)
  - Chung cư (`/chung-cu`)
  - Văn phòng (`/van-phong`)
  - Tin tức & Cẩm nang (`/tin-tuc` hoặc `/news`)
  - Chi tiết bài viết tin tức (`/tin-tuc/:slug`)
  - Chi tiết bất động sản (`/chi-tiet/:slug`)
  - Ký gửi nhà đất (`/ky-gui`)
  - Giới thiệu (`/gioi-thieu` hoặc `/about`)
  - Liên hệ (`/lien-he` hoặc `/contact`)
- [ ] **Chất lượng hình ảnh & bài viết**: Ảnh sắc nét chất lượng cao, bài viết tin tức có tối thiểu 3-5 đoạn phân tích, trích dẫn, ngày đăng, tác giả, lượt xem, thẻ tag.

---

## 2. Kiểm Tra Hoạt Động Của Nút Bấm & Thẻ Liên Kết (100% Interactive)

- [ ] **Hotline Call**: Thẻ `<a href="tel:...">` click là gọi điện trực tiếp.
- [ ] **Email Mailto**: Thẻ `<a href="mailto:...">` click là mở trình gửi thư.
- [ ] **Mạng Xã Hội**: Facebook, Instagram, Twitter, YouTube, TikTok có `target="_blank"` và nhận link động từ `company.social`.
- [ ] **Nút "Ký Gửi Nhà Đất"**: Click là chuyển sang trang `/ky-gui`, form có kiểm tra số điện thoại/địa chỉ và hiển thị thông báo toast thành công.
- [ ] **Thẻ BĐS & Nút "Xem ngay >"**: Click mở đúng trang chi tiết của sản phẩm đó kèm gallery ảnh, thông số kỹ thuật, tiện ích.
- [ ] **Bộ Lọc Tìm Kiếm Đa Chiều**:
  - Chọn danh mục loại hình -> Lọc ngay danh sách.
  - Chọn tỉnh/thành phố -> Lọc chính xác khu vực.
  - Chọn khoảng giá (< 5 Tỷ, 5-10 Tỷ, > 10 Tỷ) -> Lọc theo giá.
  - Sắp xếp (Mặc định, Giá tăng dần, Giá giảm dần, Diện tích lớn đến nhỏ) -> Cập nhật thứ tự hiển thị.
  - Nhập từ khóa tìm kiếm và nhấn Enter hoặc nút "Tìm kiếm" -> Tìm đúng sản phẩm.
- [ ] **Bảng Tính Lãi Suất Vay Ngân Hàng (Mortgage Calculator)**:
  - Cho phép thay đổi tỷ lệ vay (50%, 70%, 80%).
  - Cho phép chọn thời gian vay (10 năm, 15 năm, 20 năm, 25 năm).
  - Cho phép nhập lãi suất năm (%/năm).
  - Tự động tính toán ra: Số tiền vay (Tỷ VNĐ), Gốc + Lãi tháng đầu (Triệu/tháng), Tổng lãi phải trả.
- [ ] **Form Liên Hệ & Báo Giá**: Nhập thông tin, ấn gửi có thông báo xác nhận và xóa sạch form sau khi gửi.
- [ ] **Bản Đồ Google Maps**: Iframe Google Maps thật hiển thị vị trí tại trang chi tiết BĐS và trang liên hệ.

---

## 3. Kiểm Tra UI/UX & Responsive 3 Thiết Bị (Desktop / Tablet / Mobile)

- [ ] **Desktop**: Hiển thị lưới cân đối, căn giữa `max-w-7xl`, các nút có hiệu ứng hover mượt mà.
- [ ] **Tablet**: Bố cục 2-3 cột tự động co giãn, không bị che khuất văn bản.
- [ ] **Mobile**:
  - Thanh menu thu gọn thành nút Menu Hamburger, bấm mở Drawer menu đẩy đủ tất cả các trang con.
  - Chữ hiển thị rõ ràng, không bị tràn màn hình ngang (`overflow-x-hidden`).
- [ ] **Kiểm Tra Tràn Viền & Triệt Tiêu Khoảng Trắng (Zero White Gap Rule)**:
  - Tất cả các template phải dùng cấu trúc: `<div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">` và `<main className="flex-1 w-full">`.
  - Phải có hàm `resolvePageAndDetail` tự động phân giải slug trang con (ví dụ: `tin-tuc/slug-bai-viet`, `chi-tiet/slug-bat-dong-san`, `can-ho`, `nha-pho`, `ky-gui`, `about`, `contact`...).
  - Luôn có **Default Fallback** (nếu slug không khớp thì tự render `home` hoặc catalog), tuyệt đối **không được để `<main>` rỗng** tạo ra khoảng trắng khổng lồ phía dưới footer.
  - Footer Newsletter, 4 Cột danh mục và Thanh Copyright phải phủ màu nền 100% chiều ngang màn hình lớn, không để lộ viền trắng 2 bên mép.
- [ ] **Khả Năng Co Giãn Section Động Cho CMS (Dynamic CMS Grid Flexibility & Zero Broken Images)**:
  - Tất cả danh sách nội dung (BĐS bán, BĐS thuê, Dự án nổi bật, Dự án theo tỉnh/thành phố, Tin tức, Tiện ích...) phải dùng bố cục lưới tự động co giãn (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5`).
  - Khi người dùng vào CMS thêm 1 ô (từ 3 ô thành 4 ô hoặc 5 ô) hoặc bớt ô, giao diện phải tự động rớt hàng đều đặn, cân đối lề, tuyệt đối không được dùng layout cố định cứng làm vỡ bố cục.
  - 100% các thẻ `<img>` phải có thuộc tính `onError` tự động fallback sang ảnh dự phòng sắc nét, chống hoàn toàn hiện tượng icon vỡ ảnh.

---

## 4. Kiểm Tra Bản Quyền `TEMPLATEBDS` & Tùy Biến CMS Cho Khách Mua

- [ ] **Thanh Bản Quyền**: Chứa chuỗi nhận diện:
  `© Bản quyền thuộc về TEMPLATEBDS — Nền tảng phân phối & Thiết kế Website Bất Động Sản Chuyên Nghiệp. Mẫu Giao Diện: BDS-XX`
- [ ] **Khả Năng Tùy Biến 100% CMS**:
  - 4 Cột Footer đọc từ `company.footerColumns || defaultFooterCols`. Khách hàng mua có thể thêm/bớt cột, thêm/bớt link, đổi tiêu đề tự do qua CMS.
  - Tên công ty, Logo, Hotline, Email, Địa chỉ, Danh sách mạng xã hội đều nhận từ `company`.
- [ ] **Bộ 3 Nút Nổi Góc Phải (Floating Buttons)**:
  - Nút Chat Zalo (hiệu ứng pulse).
  - Nút Gọi Hotline Nhanh.
  - Nút Cuộn Lên Đầu Trang (Scroll-to-top).

---

## 5. Chuẩn Hóa 3 Định Dạng Xuất Bản (Trọn Gói Next.js + HTML5/CSS3/JS + PHP & MySQL)

- [ ] 1. **Gói Next.js / React (Live SaaS Preview)**: Nằm tại `apps/marketplace` và `apps/website` phục vụ trải nghiệm xem demo siêu mượt trên Marketplace.
- [ ] 2. **Gói HTML5 + CSS3 + Vanilla JavaScript Thuần (`html/`)**: Nằm trong `standalone-templates/XX-.../html/`, mở file `index.html` chạy ngay trên mọi trình duyệt mà không cần cài đặt.
- [ ] 3. **Gói PHP & MySQL Độc Lập (`php/`)**: Nằm trong `standalone-templates/XX-.../php/`, gồm `index.php`, `config/db.php`, `database.sql`, `api/contact.php`, hướng dẫn cài đặt tiếng Việt cho XAMPP / Laragon / cPanel.
- [ ] 4. Chạy `pnpm --filter api exec ts-node ../../scripts/export-all-24-standalone-templates.ts` để đồng bộ toàn bộ 24 templates.
- [ ] 5. Kiểm tra mã phản hồi HTTP 200 tại `http://localhost:3000/demo/bds-xx`.
- [ ] 6. Thực hiện `git add .`, `git commit` và `git push origin main`.
