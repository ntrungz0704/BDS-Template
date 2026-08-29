---
name: bds-template-qa-checklist
description: >-
  Quy trình kiểm tra nghiệm thu chất lượng bắt buộc (QA Checklist) sau khi tạo hoặc sửa đổi bất kỳ template nào trong 24 Templates BĐS. Đảm bảo mọi nút bấm, link, trang con, responsive, map, bộ lọc tìm kiếm, footer TEMPLATEBDS hoạt động thật 100% và luôn hỗ trợ trọn bộ 3 định dạng: React/Next.js cho sàn Marketplace + Standalone HTML5/CSS3/JS + PHP & MySQL kèm database.sql để khách hàng dễ dàng triển khai trên Hosting cPanel / XAMPP.
---

# Quy Trình Nghiệm Thu & Kiểm Tra Chất Lượng Template BĐS (BDS Template QA Checklist)

Quy trình này là tiêu chuẩn bắt buộc phải thực hiện sau khi tạo mới hoặc sửa đổi bất kỳ template nào trong hệ thống 24 BĐS Templates.

---

## 1. Tiêu Chuẩn Bản Sắc Độc Bản, Logic Điều Hướng Toàn Cục & Tùy Biến CMS 100% (Zero Duplication, Global Search Navigation & Dynamic CMS Resilience)

- [ ] **Quy Tắc Tuyệt Đối Không Trùng Lặp & Bản Sắc Độc Bản Cho Từng Template (Zero Template Duplication & Unique DNA Rule)**:
  - Dù mẫu ảnh thực tế có sự tương đồng ở một số chi tiết, **tuyệt đối KHÔNG ĐƯỢC sao chép trùng lặp giao diện hay cấu trúc giữa các template**.
  - Mỗi một template trong 24 Templates BĐS phải có một **cá tính thiết kế (Design Personality)** và **phân khúc thị trường chuyên biệt**:
    - **Bảng màu nhận diện riêng biệt**: Từ Vàng Gold Hoàng Gia, Xanh Navy Corporate, Xanh Rừng Nhiệt Đới, Đỏ Rượu Vang Burgundy, Đất Nung Terracotta, Xanh Ngọc Bích Jade, Đồng Cổ Antique Bronze đến Đen Nghệ Thuật Dark Architecture.
    - **Dữ liệu mẫu thực tế & độc nhất (Unique Data & Pricing)**: Không dùng trùng tên dự án, phủ khắp các địa phương trọng điểm (Hà Nội, Quảng Ninh, Đà Nẵng, Nha Trang, Đà Lạt, TP.HCM, Phú Quốc...) với mức giá thực tế và thông số chi tiết.
    - **Bố cục & Component đặc thù**: Mỗi template sở hữu tổ hợp module riêng (Showroom ảnh thực tế, Bể bơi vô cực ngắm vịnh, Bảng giá ngoại giao, Accordion FAQ, Bảng tính vay, Video TVC...).

- [ ] **Quy Tắc Tự Động Chuyển Màn Hình Kết Quả Tìm Kiếm (Global Search View Auto-Switch Rule)**:
  - Bất kể người dùng đang đứng ở bất kỳ trang con nào (ví dụ: đang ở `/lien-he`, `/gioi-thieu`, `/tin-tuc`, `/huong-dan`, `/tin-tuc/:slug`, `/chi-tiet/:slug`...):
  - Khi người dùng nhập từ khóa hoặc chọn bộ lọc và bấm **"TÌM KIẾM"**:
    1. **Hệ thống PHẢI tự động chuyển `currentPage` sang trang kết quả (`home` hoặc `for-sale` hoặc catalog tương ứng)**.
    2. Render ngay lập tức lưới danh sách các bất động sản phù hợp với tiêu chí lọc.
    3. Tự động cuộn mượt (`scrollIntoView({ behavior: 'smooth' })`) tới phần hiển thị kết quả để khách hàng nhìn thấy sản phẩm ngay lập tức.
    4. **Tuyệt đối KHÔNG ĐƯỢC giữ nguyên trang con** (ví dụ giữ nguyên bản đồ liên hệ hay bài viết) trong khi Toast thông báo "Tìm thấy X sản phẩm" khiến người dùng không thấy sản phẩm ở đâu.
    ```ts
    const handleSearchSubmit = (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      // Tự động chuyển về trang hiển thị danh sách nếu đang ở trang con không có danh sách BĐS
      if (currentPage !== 'home' && currentPage !== 'for-sale' && currentPage !== 'for-rent') {
        setCurrentPageState('home');
        syncDemoUrl('', tSlug);
      }
      const count = filteredProperties.length;
      showToast(`🔍 Tìm thấy ${count} bất động sản phù hợp tiêu chí!`);
      setTimeout(() => {
        const resultsElem = document.getElementById('danh-sach-san-pham') || document.getElementById('du-an');
        if (resultsElem) resultsElem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };
    ```

- [ ] **Khả Năng Thay Đổi Nhận Diện Thương Hiệu CMS 100% (Brand Customization)**:
  - Khi khách hàng / quản trị viên mua template và vào CMS cấu hình lại:
    - **Tên công ty (`company.name`)**: Cập nhật tức thì trên Header, Logo text, Slogan, Bản quyền và Footer.
    - **Logo (`company.logo`)**: Tự động hiển thị logo khách hàng tải lên kèm fallback text đẹp mắt khi chưa có ảnh.
    - **Hotline & Email (`company.phone`, `company.email`)**: Tự động cập nhật thẻ gọi điện `<a href="tel:...">`, email `<a href="mailto:...">` và nút Floating Hotline.
    - **Địa chỉ (`company.address`)**: Cập nhật trụ sở công ty ở Topbar và Footer.
    - **Mạng xã hội (`company.social`)**: Nhận link Facebook, Zalo, YouTube, TikTok động.
    - **Cột Footer (`company.footerColumns`)**: Khách hàng có thể tùy chỉnh thêm/bớt cột và liên kết qua CMS.

- [ ] **Khả Năng Thay Đổi Sản Phẩm / Dự Án / Tin Tức Từ CMS (`projects` & `posts`)**:
  - Mỗi template phải nhận props `projects` và `posts` từ CMS và hợp nhất thông minh với dữ liệu mặc định (`allProperties`, `allNews`).

- [ ] **Tự Động Trích Xuất Options Bộ Lọc Từ Dữ Liệu Thực Tế (Dynamic Options Extraction)**:
  - **Tuyệt đối KHÔNG hardcode danh sách `<option>` tĩnh** không khớp với dữ liệu sản phẩm trong kho.
  - Các dropdown bộ lọc (Loại BĐS, Tỉnh/Thành phố, Quận/Huyện, Mức giá, Diện tích) phải tự động trích xuất các giá trị duy nhất (`Set`) từ `allProperties`.
  - Khi khách hàng vào CMS đổi tên dự án, đổi địa phương (ví dụ đổi từ Hải Phòng sang Cần Thơ), bộ lọc ở ngoài giao diện phải **tự động cập nhật danh mục địa phương mới ngay lập tức** mà không bị lỗi 0 kết quả.

- [ ] **Thuật Toán Tìm Kiếm & Lọc Linh Hoạt (Resilient Fuzzy Match)**:
  - So khớp loại hình và địa điểm theo chuỗi con không phân biệt hoa thường (`normalize().toLowerCase().includes(...)`) hoặc phân loại nhóm thông minh (`can-ho`, `nha-pho`, `biet-thu`, `dat-nen`).
  - Lọc theo khoảng giá và diện tích phải có ngưỡng bao quát (ví dụ: `< 3 Tỷ`, `3 - 6 Tỷ`, `> 6 Tỷ` hoặc `Dưới 50m²`, `50 - 100m²`, `Trên 100m²`), hỗ trợ cả giá theo tỷ lẫn giá thuê triệu/tháng.
  - Nếu không có kết quả phù hợp, hiển thị thông báo thân thiện và nút "Xem tất cả BĐS" để reset bộ lọc.

---

## 2. Tiêu Chuẩn Thiết Kế Tinh Tế & Chống Lạm Dụng Bo Tròn (Zero Excessive Border-Radius & Bubble Shapes Rule)

- [ ] **Nguyên Tắc Thiết Kế BĐS Chuyên Nghiệp**:
  - Giao diện bất động sản, sàn giao dịch và cổng thông tin dự án đòi hỏi phong cách **sang trọng, đĩnh đạc, hiện đại, sắc nét và chuyên nghiệp**.
  - **Tuyệt đối KHÔNG lạm dụng bo tròn quá đà** (`rounded-3xl`, `rounded-2xl`, `rounded-full` vô tội vạ) biến các khối hộp, card, banner, form, ô tìm kiếm thành "viên thuốc" hay "bong bóng đồ chơi".
  - **Chuẩn hóa Bo Góc Tối Giản**:
    - Khối Hero Banner, Hộp tìm kiếm, Khối nội dung lớn: Dùng `rounded-none`, `rounded-sm`, hoặc tối đa `rounded-md` theo đúng tỉ lệ thiết kế gốc.
    - Card BĐS, Card tin tức, Card dự án: Dùng `rounded-none`, `rounded-sm`, `rounded` hoặc `rounded-md` phẳng sắc gọn, viền kẻ tinh tế `border border-slate-200`.
    - Nút bấm (Buttons) & Ô nhập liệu (Inputs/Selects): Dùng `rounded` hoặc `rounded-md` hoặc `rounded-none` vuông vắn chuẩn Corporate/Enterprise.
    - Chỉ sử dụng `rounded-full` khi đó là icon tròn nhỏ (như nút mạng xã hội, nút play video nhỏ, avatar cá nhân).

---

## 3. Kiểm Tra Toàn Diện Các Chức Năng Tương Tác (100% Interactive & Zero Dead Features)

- [ ] **Hotline Call**: Thẻ `<a href="tel:...">` click là gọi điện trực tiếp.
- [ ] **Email Mailto**: Thẻ `<a href="mailto:...">` click là mở trình gửi thư.
- [ ] **Mạng Xã Hội**: Facebook, Instagram, Twitter, YouTube, TikTok có `target="_blank"` và nhận link động từ `company.social`.
- [ ] **Nút "Ký Gửi Nhà Đất"**: Click là chuyển sang trang `/ky-gui`, form có kiểm tra số điện thoại/địa chỉ và hiển thị thông báo toast thành công.
- [ ] **Thẻ BĐS & Nút "Xem ngay >"**: Click mở đúng trang chi tiết của sản phẩm đó kèm gallery ảnh, thông số kỹ thuật, tiện ích.
- [ ] **Bảng Tính Lãi Suất Vay Ngân Hàng (Mortgage Calculator)**:
  - Cho phép thay đổi tỷ lệ vay (50%, 70%, 80%).
  - Cho phép chọn thời gian vay (10 năm, 15 năm, 20 năm, 25 năm).
  - Cho phép nhập lãi suất năm (%/năm).
  - Tự động tính toán ra: Số tiền vay (Tỷ VNĐ), Gốc + Lãi tháng đầu (Triệu/tháng), Tổng lãi phải trả.
- [ ] **Form Liên Hệ & Báo Giá & Đăng Tin**: Nhập thông tin, ấn gửi có thông báo xác nhận và xóa sạch form sau khi gửi.
- [ ] **Bản Đồ Google Maps**: Iframe Google Maps thật hiển thị vị trí tại trang chi tiết BĐS và trang liên hệ.
- [ ] **Video Modal Giới Thiệu**: Bấm xem video mở popup xem Youtube mượt mà, bấm nút đóng tắt ngay lập tức.

---

## 4. Kiểm Tra UI/UX & Responsive 3 Thiết Bị (Desktop / Tablet / Mobile)

- [ ] **Desktop**: Hiển thị lưới cân đối, căn giữa `max-w-7xl`, các nút có hiệu ứng hover mượt mà.
- [ ] **Tablet**: Bố cục 2-3 cột tự động co giãn, không bị che khuất văn bản.
- [ ] **Mobile**:
  - Thanh menu thu gọn thành nút Menu Hamburger, bấm mở Drawer menu đẩy đủ tất cả các trang con.
  - Chữ hiển thị rõ ràng, không bị tràn màn hình ngang (`overflow-x-hidden`).
- [ ] **Kiểm Tra Tràn Viền & Triệt Tiêu Khoảng Trắng (Zero White Gap Rule)**:
  - Tất cả các template phải dùng cấu trúc: `<div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">` và `<main className="flex-1 w-full">`.
  - Phải có hàm `resolvePageAndDetail` tự động phân giải slug trang con.
  - Luôn có **Default Fallback** (nếu slug không khớp thì tự render `home` hoặc catalog), tuyệt đối **không được để `<main>` rỗng** tạo ra khoảng trắng khổng lồ phía dưới footer.
  - Footer Newsletter, 4 Cột danh mục và Thanh Copyright phải phủ màu nền 100% chiều ngang màn hình lớn, không để lộ viền trắng 2 bên mép.
- [ ] **Khả Năng Co Giãn Section Động Cho CMS (Dynamic CMS Grid Flexibility & Zero Broken Images)**:
  - Tất cả danh sách nội dung phải dùng bố cục lưới tự động co giãn.
  - 100% các thẻ `<img>` phải có thuộc tính `onError` tự động fallback sang ảnh dự phòng sắc nét.

---

## 5. Kiểm Tra Bản Quyền `TEMPLATEBDS` & Tùy Biến CMS Cho Khách Mua

- [ ] **Thanh Bản Quyền**: Chứa chuỗi nhận diện:
  `© Bản quyền thuộc về TEMPLATEBDS — Nền tảng phân phối & Thiết kế Website Bất Động Sản Chuyên Nghiệp. Mẫu Giao Diện: BDS-XX`
- [ ] **Khả Năng Tùy Biến 100% CMS**:
  - 4 Cột Footer đọc từ `company.footerColumns || defaultFooterCols`.
  - Tên công ty, Logo, Hotline, Email, Địa chỉ, Danh sách mạng xã hội đều nhận từ `company`.
- [ ] **Bộ 3 Nút Nổi Góc Phải (Floating Buttons)**:
  - Nút Chat Zalo (hiệu ứng pulse).
  - Nút Gọi Hotline Nhanh.
  - Nút Cuộn Lên Đầu Trang (Scroll-to-top).

---

## 6. Chuẩn Hóa 3 Định Dạng Xuất Bản (Trọn Gói Next.js + HTML5/CSS3/JS + PHP & MySQL)

- [ ] 1. **Gói Next.js / React (Live SaaS Preview)**: Nằm tại `apps/marketplace` và `apps/website`.
- [ ] 2. **Gói HTML5 + CSS3 + Vanilla JavaScript Thuần (`html/`)**: Nằm trong `standalone-templates/XX-.../html/`.
- [ ] 3. **Gói PHP & MySQL Độc Lập (`php/`)**: Nằm trong `standalone-templates/XX-.../php/`.
- [ ] 4. Chạy `pnpm --filter api exec ts-node ../../scripts/export-all-24-standalone-templates.ts` để đồng bộ toàn bộ 24 templates.
- [ ] 5. Kiểm tra mã phản hồi HTTP 200 tại `http://localhost:3000/demo/bds-xx`.
- [ ] 6. Thực hiện `git add .`, `git commit` và `git push origin main`.
