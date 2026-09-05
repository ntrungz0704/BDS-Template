# UNIVERSAL TEMPLATE CONFIG ENGINE — HỆ THỐNG CẤU HÌNH ĐỘNG 100% CHO TEMPLATES BĐS

**Ngày hoàn thiện:** 2026-09-05  
**Kiến trúc sư:** Antigravity Principal Architecture Team  
**Mục tiêu:** Xóa bỏ hoàn toàn hardcode trong Header, Menu, Logo, Slider Carousel và Thông tin liên hệ trên toàn bộ hệ thống 31+ Templates BĐS (với BDS16 làm mẫu tham chiếu chuẩn mực). Khách hàng đăng ký tài khoản CMS tự do thêm, sửa, xóa, tùy biến dữ liệu theo nhu cầu thực tế.

---

## 1. Vấn Đề Cốt Lõi Được Giải Quyết

Trước khi có **Universal Template Config Engine**:
1. **Menu Navigation hardcode**: Các nút như "Trang Chủ", "Giới Thiệu", "Tin Tức", "Dự Án" nằm cứng trong JSX. Khách hàng như **Anh Nghĩa - Trung Nghĩa Nhà Phố** muốn đổi thành: `Trang Chủ | Building | CHDV | Nhà Bán | Nhà Cho Thuê | Bản Đồ | Liên Hệ` thì template không hỗ trợ động.
2. **Logo & Thương hiệu hardcode**: Logo chỉ là text cứng "TL BDS16" hoặc "LOGO BĐS", không cho phép tenant tải ảnh logo công ty hoặc gõ Brand Name & Slogan riêng.
3. **Thiếu Hero Slider / Carousel Nhà Hot**: Trang chủ listing tĩnh, không có banner trượt làm nổi bật các bất động sản đắt giá hoặc độc quyền (như Tòa nhà 45 Tỷ, CHDV 28.5 Tỷ).
4. **Đóng gói ZIP tĩnh**: Khi khách hàng tải mã nguồn ZIP (HTML/PHP/React), cấu hình không đi kèm file config JSON chuẩn hóa, khiến người mua khó tích hợp vào cPanel/XAMPP.

Sau khi triển khai **Universal Template Config Engine**:
- Toàn bộ Header, Menu, Logo, Slider, Bản đồ, Hotline, Zalo, Email, Địa chỉ được điều khiển qua schema thống nhất `TenantConfigSchema`.
- CMS Tenant có giao diện quản trị trực quan với tabs **Menu Điều Hướng**, **Slider Nhà Hot**, **Thương Hiệu & Logo**.
- Gói ZIP xuất khẩu tự động nhúng `tenant.config.json` ở cả root, `html/`, và `php/`.

---

## 2. Cấu Trúc Dữ Liệu `TenantConfigSchema`

File định nghĩa kiểu: `packages/types/src/index.ts`  
File fallback & tiện ích: `packages/utils/src/universal-config.ts`

```typescript
export interface TenantMenuItem {
  id: string;
  label: string;
  url: string;
  order: number;
  visible: boolean;
  children?: TenantMenuItem[];
}

export interface TenantHeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  price?: string;
  location?: string;
  imageUrl: string;
  actionUrl: string;
  actionText?: string;
  order: number;
}

export interface TenantHeroSliderConfig {
  enabled: boolean;
  autoplay: boolean;
  intervalSec: number;
  slides: TenantHeroSlide[];
}

export interface TenantLogoConfig {
  url?: string;
  text?: string;
  slogan?: string;
  width?: number;
  height?: number;
}

export interface TenantContactConfig {
  companyName: string;
  brandTitle?: string;
  slogan?: string;
  phone: string;
  hotline?: string;
  zalo?: string;
  email: string;
  address: string;
  workingHours?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  googleMapsEmbed?: string;
}

export interface TenantConfigSchema {
  version: number;
  tenantSlug: string;
  templateSlug: string;
  logo: TenantLogoConfig;
  navigation: {
    menuItems: TenantMenuItem[];
  };
  heroSlider: TenantHeroSliderConfig;
  contact: TenantContactConfig;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
}
```

---

## 3. Kiến Trúc API & Backend

### 3.1. CMS Builder API (Dành cho Quản trị viên Tenant)
- **File Controller**: `apps/api/src/controllers/cms.builder.controller.ts`
- **File Routes**: `apps/api/src/routes/cms.builder.routes.ts`
- **Endpoints**:
  - `GET /api/cms/builder/tenant-config`: Lấy cấu hình runtime hoàn chỉnh của tenant hiện tại. Nếu tenant chưa tùy biến, hệ thống tự động tổng hợp từ `CompanyInfo`, `Menu`, `MenuItem`, `Banner` hoặc trả về `getDefaultTenantConfig(templateSlug)`.
  - `PUT /api/cms/builder/tenant-config`: Lưu cấu hình trong một **Prisma Transaction** nguyên khối:
    - Cập nhật thông tin công ty, thương hiệu, hotline, zalo, địa chỉ vào `CompanyInfo`.
    - Đồng bộ danh sách menu và các `MenuItem` (xóa cũ, tạo mới theo thứ tự `order`).
    - Đồng bộ các slide hero vào bảng `Banner` với loại `HERO_SLIDER`.

### 3.2. Public Website API (Dành cho Website khách truy cập & Marketplace Demo)
- **File Controller**: `apps/api/src/controllers/public.website.controller.ts`
- **File Routes**: `apps/api/src/routes/public.website.routes.ts`
- **Endpoint**:
  - `GET /api/public/:tenantSlug/tenant-config`: Cung cấp cấu hình JSON siêu tốc cho SSR Next.js và Client hydration.

---

## 4. Tích Hợp CMS Tenant Portal

**Đường dẫn trang**: `apps/cms/src/pages/settings.tsx`

Hệ thống cung cấp giao diện quản trị tabbed:
1. **Thông Tin Chung & Thương Hiệu**:
   - Nhập Tên thương hiệu / Slogan / Tên công ty.
   - Upload Logo ảnh hoặc gõ Logo Text & Châm ngôn.
   - Hotline, Số Zalo, Email, Địa chỉ văn phòng, Giờ làm việc.
   - Nhúng Google Maps iframe.
2. **Menu Điều Hướng (`navigation`)**:
   - Danh sách các mục menu trực quan.
   - Thêm mới, đổi tên nhãn (Label), đổi URL chuyển hướng (ví dụ: `/building`, `/chdv`, `/ban-do`).
   - Sắp xếp thứ tự (Move Up / Move Down).
   - Bật / Tắt hiển thị (`visible`).
   - Xóa mục menu không dùng.
3. **Slider Nhà Hot (`slider`)**:
   - Bật / Tắt Autoplay, hẹn giờ chuyển slide (giây).
   - Thêm mới slide bất động sản nổi bật:
     - Tiêu đề tòa nhà / dự án.
     - Phụ đề mô tả dòng tiền / diện tích / kết cấu.
     - Huy hiệu (Badge: "ĐỘC QUYỀN VIP", "DÒNG TIỀN CAO").
     - Mức giá (Ví dụ: "45 Tỷ VNĐ", "28.5 Tỷ VNĐ").
     - Vị trí khu vực.
     - Link ảnh Unsplash hoặc ảnh tải lên.
     - Nút bấm Call-To-Action và đường link chuyển trang.

---

## 5. Tích Hợp Frontend Template (Tham Chiếu BDS16)

**Đường dẫn file**:
- Marketplace: `apps/marketplace/src/components/demo/templates/BDS16Template.tsx`
- Website: `apps/website/src/components/templates/BDS16Template.tsx`

### Tính Năng Nổi Bật:
1. **Dynamic Logo & Brand Identity**:
   - Render hình ảnh logo nếu tenant cung cấp `logo.url`.
   - Nếu không có URL, render badge kiến trúc sang trọng với `logo.text` và `logo.slogan`.
   - Hiển thị Brand Title (`Trung Nghĩa Nhà Phố`) và Slogan (`CHUYÊN TÒA NHÀ & CĂN HỘ DỊCH VỤ QUẬN 7`) ngay cạnh logo.
2. **Dynamic Navigation Menu**:
   - Duyệt qua `resolvedConfig.navigation.menuItems`.
   - Hỗ trợ routing trong trang linh hoạt: `/` (Trang chủ), `/building` (Lọc tòa nhà), `/chdv` (Lọc căn hộ dịch vụ), `/nha-ban`, `/nha-cho-thue`, `/ban-do` (Cuộn mượt tới Google Maps section), `/lien-he` (Mở trang liên hệ).
   - Đồng bộ hoàn hảo cho cả Desktop Navbar và Mobile Drawer.
3. **Interactive Hero Slider "Nhà Hot"**:
   - Trình chiếu carousel tự động với hiệu ứng chuyển động mượt mà.
   - Nút Next / Previous, dãy chấm điều hướng (dot indicators).
   - Thẻ thông tin bất động sản nổi bật bao gồm Badge, Mức giá vàng, Địa chỉ, và nút CTA "Xem Chi Tiết Tòa Nhà".
4. **Dữ Liệu Mẫu Thực Chiến (Trung Nghĩa Nhà Phố)**:
   - Tòa nhà văn phòng mặt tiền Nguyễn Lương Bằng, Quận 7 (45 Tỷ VNĐ - Thuê 180 Tr/tháng).
   - Căn hộ dịch vụ 20 phòng KDC Him Lam, Quận 7 (28.5 Tỷ VNĐ - Thu nhập 110 Tr/tháng).
   - Biệt thự đơn lập Phú Mỹ Hưng, Nam Sài Gòn (68 Tỷ VNĐ).

---

## 6. Đóng Gói Tải Mã Nguồn ZIP (Template Packaging Service)

**Đường dẫn file**: `apps/api/src/services/template-packaging.service.ts`

Khi khách hàng bấm **Tải Source Code**:
- Hệ thống gọi `getTenantConfig(tenantId)` để trích xuất cấu hình mới nhất.
- Đóng gói file `tenant.config.json` vào:
  - Thư mục gốc dự án: `tenant.config.json`
  - Thư mục Standalone HTML: `html/tenant.config.json`
  - Thư mục PHP & MySQL: `php/tenant.config.json`
- Nhờ vậy, người dùng tải về chạy trên localhost XAMPP hay Hosting cPanel đều giữ trọn cấu hình thương hiệu mà không bị mất dữ liệu.

---

## 7. Quy Trình Kiểm Thử Đã Thực Hiện

| Hạng mục | Lệnh kiểm tra | Kết quả |
|---|---|---|
| Types & Utils compilation | `pnpm --filter @repo/types build && pnpm --filter @repo/utils build` | ✅ PASS |
| API compilation | `pnpm --filter api exec tsc --noEmit` | ✅ PASS (Exit code 0) |
| Marketplace compilation | `pnpm --filter marketplace exec tsc --noEmit` | ✅ PASS (Exit code 0) |
| Tenant Website compilation | `pnpm --filter website exec tsc --noEmit` | ✅ PASS (Exit code 0) |
| CMS Portal compilation | `pnpm --filter cms exec tsc --noEmit` | ✅ PASS (Exit code 0) |
| Demo Template Route | `/demo/bds-16` & `/demo/personal-top-broker` | ✅ Tải mượt mà, đầy đủ slider, menu dynamic, logo S.HOUSE và thương hiệu Trung Nghĩa Nhà Phố |
