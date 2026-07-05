# 07. Design System

> Tài liệu này mô tả chi tiết hệ thống thiết kế (Design System) cho nền tảng Real Estate Template Marketplace & SaaS Platform. Hệ thống thiết kế tập trung vào phong cách Luxury, tối giản, sử dụng tông màu Gold, Trắng và Navy sâu làm chủ đạo nhằm tạo dựng cảm giác cao cấp và chuyên nghiệp.

---

## 🎨 1. Hệ thống Màu sắc (Color Tokens)

### Bảng màu nền tảng chính (Platform Color Palette)

| Loại màu | Mã màu HEX | Sử dụng chính |
|---|---|---|
| **Primary Gold** | `#C5A572` | Điểm nhấn Luxury, viền trang trí, nút CTA chính, biểu tượng |
| **Primary Light Gold** | `#E2C799` | Trạng thái hover của Gold, màu chuyển sắc (gradient) |
| **Neutral White** | `#FFFFFF` | Nền sáng, nền thẻ, văn bản trên nền tối |
| **Neutral Off-White** | `#FAF9F6` | Nền phụ, tạo khối phân chia các section |
| **Neutral Gray** | `#F3F4F6` | Nền ô nhập liệu, đường kẻ phân cách nhạt |
| **Deep Navy** | `#1A1A2E` | Chữ chính trên nền sáng, nền tối của header/footer, background dark |
| **Deep Dark** | `#0F0F1A` | Nền tối sâu nhất cho các khối dark-mode |

### Mở rộng mã màu hệ thống (Status Colors)
- **Success:** `#22C55E` (Màu xanh lá - Trạng thái hoạt động, thanh toán thành công).
- **Warning:** `#F59E0B` (Màu hổ phách - Trạng thái chờ phê duyệt, cảnh báo hạn dùng thử).
- **Error:** `#EF4444` (Màu đỏ - Trạng thái hết hạn thuê, lỗi nhập liệu, suspended).

### 3 Bảng màu chủ đạo cho 3 Templates (Theme Colors)
1. **Template 1 (Luxury Gold):** Nền sáng (`#FAF9F6`) phối chữ Deep Navy (`#1A1A2E`), điểm nhấn Gold hoàng gia (`#C5A572`). Font chữ serif cổ điển.
2. **Template 2 (Modern Dark):** Nền đen xám (`#0F0F1A`) phối chữ xám bạc (`#E5E7EB`), điểm nhấn neon xanh lam / neon vàng chanh (`#06B6D4`). Font chữ sans-serif góc cạnh.
3. **Template 3 (Minimal White):** Nền trắng tinh khiết (`#FFFFFF`), phối chữ đen trơn (`#111111`), điểm nhấn xám tro tối giản (`#4B5563`). Font chữ hình học hiện đại.

---

## ✍️ 2. Hệ thống Font chữ & Cấu trúc Typography (Typography)

Hỗ trợ 100% tiếng Việt có dấu đầy đủ, tối ưu hiển thị sắc nét trên thiết bị di động.

- **Font Heading (Tiêu đề):** `Playfair Display` (Serif cổ điển, tạo cảm giác sang trọng, đắt giá).
- **Font Body (Nội dung):** `Inter` hoặc `Be Vietnam Pro` (Sans-serif hình học, dễ đọc ở kích thước nhỏ).

### Tỷ lệ phân bậc (Type Scale)

| Token | Size | Weight | Line Height | Sử dụng |
|---|---|---|---|---|
| **h1** | 2.5rem (40px) | Bold (700) | 1.2 | Tiêu đề Hero trang chủ |
| **h2** | 2.0rem (32px) | SemiBold (600) | 1.3 | Tiêu đề các Section lớn |
| **h3** | 1.5rem (24px) | Medium (500) | 1.4 | Tiêu đề cột, tiêu đề thẻ dự án |
| **body-large**| 1.125rem (18px)| Regular (400) | 1.5 | Đoạn mở đầu giới thiệu |
| **body** | 1.0rem (16px) | Regular (400) | 1.6 | Văn bản nội dung chi tiết, tin tức |
| **caption** | 0.875rem (14px)| Medium (500) | 1.4 | Chú thích ảnh, nhãn thông số |
| **small** | 0.75rem (12px) | Regular (400) | 1.3 | Trạng thái, footer copyright |

---

## 📐 3. Hệ thống Spacing & Bán Kính Bo Góc (Radius & Spacing)

### Spacing Scale (8px Grid System)
Hệ thống căn lề sử dụng lưới cơ sở 8px để tạo sự cân đối trực quan tuyệt đối:
- `4px` (x-small), `8px` (small), `12px` (medium-small), `16px` (medium), `24px` (large), `32px` (x-large), `48px` (xx-large), `64px` (huge).

### Border Radius (Bo góc)
- **Tiêu chuẩn (Default):** `12px` (Áp dụng cho mọi Card dự án, Card template, các ô nhập liệu Input, và Modals).
- **Phụ (Small):** `6px` (Áp dụng cho các Badge trạng thái, nút nhỏ).
- **Lớn (Large):** `24px` (Áp dụng cho Banner chính, các nút CTA bo tròn hoàn toàn).

---

## 🧩 4. Thiết kế các Component cốt lõi (Core Components)

### 1. Buttons (Nút nhấn Luxury)
- **Primary Button (Nút Gold):**
  - Giao diện: Nền màu Gold (`#C5A572`), chữ màu trắng sứ, bo góc 12px, có bóng đổ mờ cùng tông.
  - Hover State: Nền chuyển dần sang màu Light Gold (`#E2C799`), dịch chuyển nhẹ lên trên 1px (translate-y[-1px]).
  - Active State: Giảm opacity xuống 90%.
- **Outline Button:** Viền ngoài màu Gold mảnh, nền trong suốt, chữ màu Gold. Khi hover, nền lấp đầy màu Gold và chữ chuyển sang trắng.

### 2. Input Fields (Ô nhập liệu CMS)
- Giao diện: Nền màu xám nhạt (`#F9FAFB`), viền màu xám trung bình (`#D1D5DB`), bo góc 12px, chữ xám đậm.
- Focus State: Viền chuyển sang màu Gold (`#C5A572`), đổ bóng phát quang mờ màu Gold nhạt xung quanh ô nhập liệu, triệt tiêu viền đen mặc định của trình duyệt.
- Error State: Viền chuyển sang màu đỏ (`#EF4444`), đi kèm thông báo lỗi nhỏ phía dưới màu đỏ.

### 3. Badges (Nhãn trạng thái)
- `SELLING`: Nền xanh nhạt (`#DCFCE7`), chữ xanh đậm (`#15803D`), bo góc 6px.
- `COMING_SOON`: Nền vàng nhạt (`#FEF3C7`), chữ vàng đậm (`#B45309`).
- `SOLD_OUT`: Nền đỏ nhạt (`#FEE2E2`), chữ đỏ đậm (`#B91C1C`).

---

## ⚙️ 5. Cấu hình Tailwind CSS (`tailwind.config.js`)

Để đảm bảo Senior Developer tích hợp chính xác hệ thống thiết kế này vào mã nguồn Next.js, dưới đây là file cấu hình mở rộng Tailwind hoàn chỉnh:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/**/*.{js,ts,jsx,tsx}",
    "./packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        platform: {
          gold: {
            DEFAULT: '#C5A572',
            light: '#E2C799',
            dark: '#A68453',
          },
          navy: {
            DEFAULT: '#1A1A2E',
            dark: '#0F0F1A',
            light: '#2E2E4A',
          },
          white: {
            DEFAULT: '#FFFFFF',
            off: '#FAF9F6',
          }
        },
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'Be Vietnam Pro', 'sans-serif'],
      },
      borderRadius: {
        theme: '12px',
        btn: '24px',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      boxShadow: {
        gold: '0 4px 14px 0 rgba(197, 165, 114, 0.3)',
        luxury: '0 10px 30px -10px rgba(26, 26, 46, 0.1)',
      }
    },
  },
  plugins: [],
}
```
