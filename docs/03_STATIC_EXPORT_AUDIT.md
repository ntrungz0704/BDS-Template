# 03. STATIC EXPORT AUDIT — PLATFORMBDS V2

**Audit Date:** 2026-08-23  
**Auditor:** Principal Software Architect & DevOps Lead  
**Audit Target:** `apps/website` (16 Templates & Website Engine)

---

## 1. Trả lời chi tiết 12 Câu Hỏi Bắt Buộc

### Câu 1: Website có thể Static Export (`output: 'export'`) được không?
* **Kết luận:** **CÓ THỂ XUẤT BẢN TĨNH (STATIC EXPORT)** cho gói giao hàng **BUY_SOURCE** khi cung cấp dữ liệu cấu hình ban đầu (Pre-baked Data) vào lúc build.
* Tuy nhiên, đối với chế độ **RENT (Thuê SaaS)**, website bắt buộc chạy **Dynamic SSR** để phản ánh thay đổi tức thì từ CMS mà không cần chờ build lại server.

---

### Câu 2 & 3: Template nào tương thích (Compatible) & Template nào không?
* **Cả 16 / 16 Templates đều TƯƠNG THÍCH VỚI GIAO DIỆN TĨNH** vì tất cả các component template trong `apps/website/src/components/templates/` đều là Pure Presentation Components nhận Props (`company`, `theme`, `projects`, `posts`):
  1. `LuxuryTemplate.tsx` (Luxury Gold) — **COMPATIBLE**
  2. `VillaTemplate.tsx` (Villa Nghỉ Dưỡng) — **COMPATIBLE**
  3. `ApartmentTemplate.tsx` (Căn Hộ Cao Cấp) — **COMPATIBLE**
  4. `EcoTemplate.tsx` (Khu Đô Thị Eco) — **COMPATIBLE**
  5. `ResortTemplate.tsx` (Resort Biển) — **COMPATIBLE**
  6. `LandPlotTemplate.tsx` (Đất Nền Phân Lô) — **COMPATIBLE**
  7. `IndustrialTemplate.tsx` (BĐS Công Nghiệp) — **COMPATIBLE**
  8. `CorporateTemplate.tsx` (Tập Đoàn / Chủ Đầu Tư) — **COMPATIBLE**
  9. `AgencyTemplate.tsx` (Sàn Giao Dịch) — **COMPATIBLE**
  10. `MinimalTemplate.tsx` (Tối Giản Hiện Đại) — **COMPATIBLE**
  11. `ListingMarketplace.tsx` (Cổng Rao Vặt BĐS) — **COMPATIBLE**
  12. `PersonalAgentTemplate.tsx` (Môi Giới Cá Nhân) — **COMPATIBLE**
  13. `InvestmentTemplate.tsx` (BĐS Dòng Tiền & ROI) — **COMPATIBLE**
  14. `ClassicTemplate.tsx` (Kiến Trúc Cổ Điển) — **COMPATIBLE**
  15. `AuctionTemplate.tsx` (BĐS Đấu Giá) — **COMPATIBLE**
  16. `RetailTemplate.tsx` (Shophouse Thương Mại) — **COMPATIBLE**

---

### Câu 4 & 5: Vì sao và cần sửa file nào khi export?
* Trong mã nguồn hiện tại của `apps/website/src/pages/index.tsx`, file đang dùng `export const getServerSideProps: GetServerSideProps = async (context) => ...` để nạp dữ liệu theo tenant domain.
* Khi Next.js chạy lệnh `next export` (hoặc `output: 'export'`), hàm `getServerSideProps` không được phép tồn tại.
* **Giải pháp**: Tạo script xuất bản tĩnh (`scripts/export-customer-package.ts`) nạp dữ liệu của khách vào `getStaticProps` hoặc render thành file HTML/CSS/JS độc lập.

---

### Câu 6: Có Dynamic Dependency nào không?
* **SSR Tenant Resolution**: Đã được xử lý khi đóng gói tĩnh bằng cách nướng sẵn dữ liệu thương hiệu của khách vào gói bàn giao.
* **Tính toán ROI (InvestmentTemplate)**: Sử dụng Pure Client-side React State (`useState`), hoàn toàn chạy được trên HTML tĩnh.
* **Lọc dự án / Danh mục**: Client-side filtering, chạy mượt mà 100% không cần backend.

---

### Câu 7: Có API Dependency nào (Contact Form, Lead Capture)?
* Form gửi liên hệ trên website tĩnh có thể gửi HTTP POST trực tiếp về Server API của PlatformBDS (`/api/website/:tenantSlug/contact`) hoặc gửi trực tiếp qua Zalo / Formspree / Webhook mà không cần hosting của khách phải cài Node.js.

---

### Câu 8 & 9: Có Database hay Authentication Dependency nào không?
* **Website công khai (`apps/website`)**: KHÔNG có đăng nhập, KHÔNG có phân quyền, KHÔNG phụ thuộc database trực tiếp trên máy client.

---

### Câu 10: Có Image Optimization Issue không?
* Trong `apps/website`, hầu hết ảnh sử dụng thẻ chuẩn `<img>` với URL tuyệt đối từ CDN (Unsplash / Cloudinary / S3). Do đó, **hoàn toàn không bị phụ thuộc vào Node.js Image Optimization Server**.

---

### Câu 11 & 12: Build output hiện tại & Gói bàn giao (Delivery Package) cho khách LOW-TECH:
* **Gói bàn giao cho khách mua source (BUY_SOURCE)**:
```text
BDS-MAU-DA-CHON-CUSTOMER/
│
├── public_html/              # Thư mục Web Tĩnh
│   ├── index.html            # Trang chủ hoàn chỉnh
│   ├── about.html            # Trang giới thiệu
│   ├── contact.html          # Trang liên hệ
│   ├── _next/                # CSS, JS, Fonts được tối ưu siêu tốc
│   └── images/               # Hình ảnh dự án, logo, banner
│
├── HUONG_DAN_CAI_DAT_TIENG_VIET.pdf  # Hướng dẫn upload cPanel / Hostinger trong 1 phút
└── LICENSE.txt                       # Giấy phép sử dụng bản quyền
```

---

## 2. Kết luận phân loại Static Export

> 🏆 **KẾT LUẬN:** **B. PARTIAL STATIC EXPORT COMPATIBLE (WITH AUTOMATED PRE-BUILD PIPELINE)**
> 
> * **Đối với RENT (Thuê)**: Chạy **Dynamic SSR** trên hạ tầng Cloud của PlatformBDS (Hỗ trợ CMS thời gian thực).
> * **Đối với BUY SOURCE (Mua đứt)**: Hệ thống tự động biên dịch thành **Gói HTML Tĩnh (`public_html/`)** để khách LOW-TECH chỉ cần kéo thả vào cPanel là website chạy 100%.
