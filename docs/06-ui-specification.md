# 06 - ĐẶC TẢ GIAO DIỆN NGƯỜI DÙNG (UI Specification)

> **Phiên bản:** 1.0
> **Ngày tạo:** 05/07/2026
> **Tác giả:** Principal Software Architect
> **Dự án:** Real Estate Template Marketplace & SaaS Platform

---

## Mục lục

1. [Tổng quan](#1-tổng-quan)
2. [Marketplace Screens](#2-marketplace-screens)
3. [Auth Screens](#3-auth-screens)
4. [CMS Screens](#4-cms-screens)
5. [Demo Screen](#5-demo-screen)
6. [Admin Screens](#6-admin-screens)
7. [BĐS Website Screens (Tenant)](#7-bđs-website-screens-tenant)
8. [Quy tắc chung về trạng thái UI](#8-quy-tắc-chung-về-trạng-thái-ui)

---

## 1. Tổng quan

### 1.1 Nguyên tắc thiết kế

| Nguyên tắc | Mô tả |
|---|---|
| **Luxury & Premium** | Giao diện mang phong cách sang trọng, sử dụng tone Gold + White chủ đạo |
| **Mobile First** | Thiết kế từ mobile lên desktop, đảm bảo trải nghiệm tốt trên mọi thiết bị |
| **Content Hierarchy** | Thông tin quan trọng nhất được hiển thị nổi bật, dễ đọc |
| **Fast Interaction** | Mọi thao tác phải phản hồi trong < 200ms, loading state rõ ràng |
| **Accessibility** | Đạt WCAG 2.1 AA, contrast ratio ≥ 4.5:1, keyboard navigation đầy đủ |

### 1.2 Responsive Breakpoints

| Breakpoint | Tên | Kích thước | Mô tả |
|---|---|---|---|
| `sm` | Mobile | < 640px | Giao diện 1 cột, navigation dạng hamburger |
| `md` | Tablet | 640px - 1023px | 2 cột, sidebar có thể thu gọn |
| `lg` | Desktop | 1024px - 1279px | Layout đầy đủ, sidebar cố định |
| `xl` | Large Desktop | 1280px - 1535px | Container rộng hơn, khoảng cách tăng |
| `2xl` | Extra Large | ≥ 1536px | Container max-width, nội dung căn giữa |

### 1.3 Cấu trúc trang chung

```
┌──────────────────────────────────────────────┐
│                   Header                      │
├──────────────────────────────────────────────┤
│                                              │
│               Main Content                   │
│                                              │
├──────────────────────────────────────────────┤
│                   Footer                      │
└──────────────────────────────────────────────┘
```

---

## 2. Marketplace Screens

### 2.1 Homepage (`www.myplatform.com`)

#### Layout

```
┌─────────────────────────────────────────────────────┐
│  Logo    Templates   Pricing   Contact   Login/CTA  │  ← Header (sticky)
├─────────────────────────────────────────────────────┤
│                                                     │
│          ██████████████████████████████              │
│          █    HERO SECTION             █              │
│          █  "Website BĐS chuyên nghiệp █              │
│          █   trong 24 giờ"              █              │
│          █   [Xem Templates] [Dùng thử] █              │
│          ██████████████████████████████              │
│                                                     │
├─────────────────────────────────────────────────────┤
│         ⭐ TEMPLATES NỔI BẬT                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │Template1│  │Template2│  │Template3│             │
│  │ Thumb   │  │ Thumb   │  │ Thumb   │             │
│  │ Name    │  │ Name    │  │ Name    │             │
│  │ Price   │  │ Price   │  │ Price   │             │
│  └─────────┘  └─────────┘  └─────────┘             │
├─────────────────────────────────────────────────────┤
│         🔧 CÁCH HOẠT ĐỘNG (3 bước)                   │
│  [1. Chọn Template] → [2. Tùy chỉnh] → [3. Lên web]│
├─────────────────────────────────────────────────────┤
│         💰 BẢNG GIÁ                                  │
│  ┌────────┐  ┌────────────┐  ┌──────────┐          │
│  │ Basic  │  │  Pro ⭐    │  │ Premium  │          │
│  │  2M    │  │  3.5M      │  │   5M     │          │
│  │ 200K/m │  │  350K/m    │  │  500K/m  │          │
│  └────────┘  └────────────┘  └──────────┘          │
├─────────────────────────────────────────────────────┤
│         💬 KHÁCH HÀNG NÓI GÌ                        │
│  ┌──────────────────────────────────────┐           │
│  │ "Tôi đã có website trong 1 ngày..." │           │
│  │  — Anh Minh, Đại lý BĐS            │           │
│  └──────────────────────────────────────┘           │
├─────────────────────────────────────────────────────┤
│         ❓ CÂU HỎI THƯỜNG GẶP                       │
│  [Accordion items]                                  │
├─────────────────────────────────────────────────────┤
│  Logo  │  Links  │  Social  │  Copyright            │ ← Footer
└─────────────────────────────────────────────────────┘
```

#### Chi tiết các phần

**A. Header (Sticky)**
- **Desktop (≥1024px):** Logo bên trái, nav links căn giữa, nút Login + CTA "Bắt đầu ngay" bên phải
- **Tablet (640-1023px):** Logo bên trái, hamburger menu bên phải, CTA thu gọn
- **Mobile (<640px):** Logo nhỏ bên trái, hamburger menu bên phải
- **States:**
  - Default: Background transparent (trên Hero), text trắng
  - Scrolled: Background #FFFFFF, shadow-sm, text dark, transition 300ms ease
  - Active link: Gold underline (#C5A572), font-weight 600
- **Micro-animation:** Header shrink nhẹ khi scroll (padding từ py-6 → py-4)

**B. Hero Section**
- **Background:** Ảnh BĐS sang trọng với gradient overlay (dark → transparent)
- **Kích thước:** Full-width, min-height 600px (desktop), 400px (mobile)
- **Nội dung:**
  - Overline: "NỀN TẢNG WEBSITE BĐS SỐ 1 VIỆT NAM" — font Inter, 14px, tracking-wider, text-gold
  - Heading: "Website Bất Động Sản chuyên nghiệp trong 24 giờ" — Playfair Display, 56px (desktop) / 32px (mobile), font-bold, text-white
  - Subheading: "Không cần lập trình. Tự chỉnh sửa dễ dàng. Giao diện sang trọng." — Inter, 18px, text-white/80
  - CTA Buttons: 2 nút — "Xem Templates" (Primary Gold), "Dùng thử miễn phí" (Outline White)
- **Micro-animation:** Text fade-in staggered (overline → heading → subheading → buttons, delay 200ms mỗi cái)
- **Responsive:**
  - Mobile: Ảnh nền crop center, text căn giữa, nút stack dọc
  - Desktop: Text căn trái 50%, ảnh bên phải

**C. Templates nổi bật**
- **Heading:** "Templates Được Yêu Thích" — Section heading style
- **Grid:** 3 cột (desktop), 2 cột (tablet), 1 cột (mobile)
- **Template Card:** Xem chi tiết tại Component Card trong Design System
- **Micro-animation:** Cards stagger fade-up khi scroll vào viewport (IntersectionObserver)
- **CTA:** Nút "Xem tất cả templates →" bên dưới grid

**D. Cách hoạt động**
- **Layout:** 3 bước ngang (desktop), dọc (mobile)
- **Mỗi bước:**
  - Icon tròn với số thứ tự (border gold, background gradient)
  - Heading bước (16px, semibold)
  - Mô tả ngắn (14px, gray-600)
  - Connector line giữa các bước (dashed, gold)
- **Animation:** Số counter animate khi scroll vào, icon pulse nhẹ

**E. Bảng giá**
- **Layout:** 3 cột ngang, cột Pro là featured (scale 1.05, border-gold, badge "Phổ biến nhất")
- **Mỗi cột:**
  - Tên gói (Basic / Pro / Premium)
  - Giá mua (2M / 3.5M / 5M VNĐ)
  - Giá thuê (200K / 350K / 500K VNĐ/tháng)
  - Toggle: Mua / Thuê (switch tab để xem giá)
  - Feature list với checkmarks (✓ có / ✗ không)
  - CTA: "Chọn gói này"
- **Responsive:** Stack dọc trên mobile, featured card ở đầu

**F. Testimonials**
- **Layout:** Carousel/Slider, tự động chạy mỗi 5s, dừng khi hover
- **Mỗi testimonial:**
  - Ảnh avatar tròn (64px)
  - Quote text (italic, 16px)
  - Tên + Chức danh
  - Rating stars (⭐ 5/5)
- **Dots navigation** ở dưới, arrows 2 bên (desktop)

**G. FAQ**
- **Layout:** Accordion, max-width 800px, căn giữa
- **Mỗi item:**
  - Question: font-semibold, 16px, có icon chevron rotate animation
  - Answer: Ẩn mặc định, slide-down 300ms khi mở
  - Divider line giữa các items
- **Mặc định:** Item đầu tiên mở sẵn

**H. Footer**
- **Layout:** 4 cột (desktop) → 2 cột (tablet) → 1 cột (mobile)
- **Cột 1:** Logo + mô tả ngắn + social icons
- **Cột 2:** Links sản phẩm (Templates, Bảng giá, Demo)
- **Cột 3:** Links hỗ trợ (Hướng dẫn, FAQ, Liên hệ)
- **Cột 4:** Liên hệ (Email, Phone, Address)
- **Bottom bar:** Copyright + Privacy Policy + Terms

---

### 2.2 Template Listing (`www.myplatform.com/templates`)

#### Layout

```
┌───────────────────────────────────────────────────┐
│                    Header                          │
├────────────┬──────────────────────────────────────┤
│            │  Breadcrumb: Trang chủ > Templates   │
│  FILTER    │  Sort: [Mới nhất ▼]   View: [▦] [≡]  │
│  SIDEBAR   │──────────────────────────────────────│
│            │  ┌────────┐  ┌────────┐  ┌────────┐ │
│ ☐ Category │  │ Card 1 │  │ Card 2 │  │ Card 3 │ │
│ ☐ Giá      │  └────────┘  └────────┘  └────────┘ │
│ ☐ Features │  ┌────────┐  ┌────────┐  ┌────────┐ │
│            │  │ Card 4 │  │ Card 5 │  │ Card 6 │ │
│ [Lọc]     │  └────────┘  └────────┘  └────────┘ │
│ [Xóa lọc] │                                      │
│            │  ← 1 2 3 ... 10 →                    │
├────────────┴──────────────────────────────────────┤
│                    Footer                          │
└───────────────────────────────────────────────────┘
```

#### Filter Sidebar
- **Desktop:** Sidebar trái cố định, width 280px
- **Mobile:** Nút "Bộ lọc" → Slide-in drawer từ trái, overlay background
- **Các bộ lọc:**

| Bộ lọc | Loại | Giá trị |
|---|---|---|
| Danh mục | Checkbox group | BĐS cao cấp, BĐS dân dụng, Dự án, Đất nền |
| Khoảng giá | Range slider | 0 - 10M VNĐ, step 500K |
| Loại hình | Radio group | Mua source / Thuê website / Tất cả |
| Tính năng | Checkbox group | SEO, Blog, Đa ngôn ngữ, Landing page |
| Đánh giá | Star rating filter | 3+ sao, 4+ sao, 5 sao |

- **Nút hành động:** "Áp dụng bộ lọc" (Primary), "Xóa tất cả" (Ghost)
- **Badge count:** Hiển thị số filter đang active trên nút mobile

#### Template Card (Grid View)
- **Kích thước:** Tỉ lệ 16:10 thumbnail
- **Cấu trúc:**
  - Thumbnail image với overlay gradient on hover
  - Badge góc trên: "Mới" (gold) hoặc "Hot" (red)
  - Tên template (16px, semibold, 2 lines max, ellipsis)
  - Short description (14px, gray-500, 1 line, ellipsis)
  - Rating: ⭐ 4.8 (12 đánh giá)
  - Giá: "Từ 2.000.000 VNĐ" (gold, bold)
  - Actions: "Xem chi tiết" + "Dùng thử" icon buttons
- **Hover state:** Scale(1.02), shadow-lg, overlay hiện nút "Xem nhanh"
- **Loading state:** Skeleton card (ảnh skeleton + 3 text lines)
- **Empty state:** Illustration + "Không tìm thấy template phù hợp" + nút "Xóa bộ lọc"

#### Template Card (List View)
- **Layout:** Horizontal card — thumbnail trái (240px width), info giữa, giá + actions phải
- **Chỉ hiện trên desktop**, mobile tự chuyển về Grid

#### Sort Options
- Mới nhất (default)
- Phổ biến nhất
- Giá: Thấp → Cao
- Giá: Cao → Thấp
- Đánh giá cao nhất

#### Pagination
- **Style:** Numbered pages + Previous/Next arrows
- **Hiển thị:** "Hiển thị 1-9 trong 24 templates"
- **Per page:** 9 (grid 3x3) hoặc 12 tuỳ chọn

---

### 2.3 Template Detail (`www.myplatform.com/templates/[slug]`)

#### Layout

```
┌────────────────────────────────────────────────────┐
│                     Header                          │
├────────────────────────────────────────────────────┤
│  Breadcrumb: Trang chủ > Templates > Luxury Gold   │
├───────────────────────┬────────────────────────────┤
│                       │   TÊN TEMPLATE              │
│   IMAGE GALLERY       │   ⭐ 4.8 (24 đánh giá)     │
│   ┌───────────────┐   │   Mô tả ngắn...            │
│   │  Main Image   │   │                            │
│   └───────────────┘   │   ┌─────────┬──────────┐   │
│   [thumb][thumb][thb]  │   │ MUA     │ THUÊ     │   │
│                       │   │ 2M VNĐ  │ 200K/th  │   │
│                       │   └─────────┴──────────┘   │
│                       │   [Dùng thử] [Báo giá]     │
│                       │   ────────────────────      │
│                       │   ✓ Responsive              │
│                       │   ✓ SEO Optimized           │
│                       │   ✓ Admin Panel             │
├───────────────────────┴────────────────────────────┤
│  [Tổng quan] [Tính năng] [Screenshots] [Tech Stack] │ ← Tabs
├────────────────────────────────────────────────────┤
│  Tab Content Area                                   │
│  ...                                               │
├────────────────────────────────────────────────────┤
│  TEMPLATES LIÊN QUAN                                │
│  ┌────────┐  ┌────────┐  ┌────────┐                │
│  │Related1│  │Related2│  │Related3│                │
│  └────────┘  └────────┘  └────────┘                │
├────────────────────────────────────────────────────┤
│                     Footer                          │
└────────────────────────────────────────────────────┘
```

#### Image Gallery
- **Main image:** Tỉ lệ 16:9, border-radius 12px, click để mở Lightbox fullscreen
- **Thumbnails:** 4-6 ảnh nhỏ bên dưới, active thumb có border gold
- **Lightbox:** Fullscreen overlay, navigation arrows, counter "3/8", close (X), keyboard nav (← → ESC)
- **Mobile:** Swipe carousel thay vì thumbnails grid

#### Info Panel (bên phải)
- **Tên template:** Playfair Display, 28px, bold
- **Rating:** Stars + text "4.8 (24 đánh giá)"
- **Pricing Toggle:**
  - Tab "Mua Source Code" / "Thuê Website"
  - Active tab: Background gold, text white
  - Giá hiển thị lớn: 36px, font-bold, text-gold
  - Note nhỏ bên dưới: "Thanh toán một lần" / "Thanh toán hàng tháng"
- **CTA Buttons:**
  - "Dùng thử miễn phí" — Primary Gold, full-width
  - "Yêu cầu báo giá" — Outline Gold, full-width
  - Spacing: gap-12 giữa 2 nút
- **Feature checklist:** Icon ✓ (green) + text, max 8 items

#### Description Tabs
| Tab | Nội dung |
|---|---|
| Tổng quan | Rich text description, highlights, use cases |
| Tính năng | Feature grid (icon + title + description), 2 columns |
| Screenshots | Gallery grid 2 cột, click mở lightbox |
| Tech Stack | Icons + labels (Next.js, React, TailwindCSS, PostgreSQL) |

- **Active tab:** Border-bottom 2px gold, text gold, font-semibold
- **Transition:** Tab content fade-in 200ms

#### Responsive
- **Mobile:** Gallery full-width → Info panel stack bên dưới → Tabs full-width
- **Pricing section:** Sticky bottom bar trên mobile (giá + CTA)

---

### 2.4 Contact Page (`www.myplatform.com/contact`)

#### Layout
- **Desktop:** 2 cột — Form (60%) + Info (40%)
- **Tablet/Mobile:** Stack dọc — Info trên, Form dưới

#### Contact Form
| Field | Type | Validation | Placeholder |
|---|---|---|---|
| Họ và tên | Text | Required, min 2 chars | "Nguyễn Văn A" |
| Email | Email | Required, valid email | "email@example.com" |
| Số điện thoại | Tel | Required, VN phone format | "0912 345 678" |
| Chủ đề | Select | Required | "Chọn chủ đề" |
| Nội dung | Textarea | Required, min 10 chars | "Nhập nội dung..." |
| | Submit | | "Gửi tin nhắn" |

- **Chủ đề options:** Tư vấn mua template, Tư vấn thuê website, Hỗ trợ kỹ thuật, Hợp tác, Khác
- **Success state:** Form ẩn, hiện check icon (green) + "Cảm ơn bạn! Chúng tôi sẽ phản hồi trong 24h."
- **Error state:** Toast notification đỏ + inline field errors
- **Loading state:** Button disabled, spinner icon + "Đang gửi..."

#### Company Info
- Logo
- Địa chỉ: Icon map-pin + text
- Email: Icon mail + text (clickable mailto:)
- Phone: Icon phone + text (clickable tel:)
- Giờ làm việc: "Thứ 2 - Thứ 6, 8:00 - 17:30"
- Social media icons (Facebook, Zalo, YouTube)

#### Map
- Google Maps embed, height 300px
- Pin marker tại địa chỉ công ty
- Responsive: Full-width

---

### 2.5 Quotation Page (`www.myplatform.com/quotation`)

#### Layout: Multi-step Form

```
Step indicator: ① Chọn Template → ② Chọn gói → ③ Thông tin → ④ Xác nhận
```

**Step 1: Chọn Template**
- Grid 3 cột template cards (radio selection)
- Card selected: Border 2px gold, check icon góc trên phải
- Nút "Tiếp theo →"

**Step 2: Chọn gói dịch vụ**
- 2 options lớn: "Mua Source Code" / "Thuê Website"
- Pricing cards tương ứng (Basic / Pro / Premium)
- Card selected: Highlight gold
- Nút "← Quay lại" + "Tiếp theo →"

**Step 3: Thông tin liên hệ**
- Form fields: Họ tên, Email, SĐT, Tên công ty (optional), Ghi chú (optional)
- Nút "← Quay lại" + "Gửi yêu cầu"

**Step 4: Xác nhận**
- Summary card: Template đã chọn + Gói + Giá + Thông tin liên hệ
- Message: "Yêu cầu của bạn đã được gửi! Chúng tôi sẽ liên hệ trong 2 giờ."
- CTA: "Về trang chủ" / "Dùng thử Demo"

#### Step Indicator
- **Desktop:** Horizontal steps với connecting lines
- **Mobile:** Compact — chỉ hiện step hiện tại "Bước 2/4"
- **States:** Completed (gold fill + check), Active (gold border + pulse), Upcoming (gray)

---

## 3. Auth Screens

### 3.1 Register (`www.myplatform.com/register`)

#### Layout
- **Desktop:** 2 cột — Illustration/banner trái (50%) + Form phải (50%)
- **Mobile:** Form full-width, ẩn illustration

#### Form Fields

| Field | Type | Validation | Error Message |
|---|---|---|---|
| Họ và tên | Text | Required, 2-50 chars | "Vui lòng nhập họ tên" |
| Email | Email | Required, valid email, unique | "Email không hợp lệ" / "Email đã được sử dụng" |
| Số điện thoại | Tel | Required, regex VN phone | "Số điện thoại không hợp lệ" |
| Mật khẩu | Password | Required, min 8, uppercase+number | "Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa và 1 số" |
| Xác nhận mật khẩu | Password | Required, match password | "Mật khẩu xác nhận không khớp" |
| Đồng ý điều khoản | Checkbox | Required checked | "Bạn cần đồng ý với điều khoản sử dụng" |

- **Password strength indicator:** Bar 4 levels (Yếu/Trung bình/Mạnh/Rất mạnh) + màu tương ứng
- **CTA:** "Đăng ký" — Full-width, Primary Gold
- **Divider:** "Hoặc"
- **Link:** "Đã có tài khoản? Đăng nhập"
- **Loading state:** Button spinner + "Đang tạo tài khoản..."
- **Success state:** Redirect to login với toast "Đăng ký thành công!"

---

### 3.2 Login (`www.myplatform.com/login`)

#### Layout
- Giống Register — 2 cột desktop, full-width mobile

#### Form Fields

| Field | Type | Validation |
|---|---|---|
| Email | Email | Required, valid email |
| Mật khẩu | Password | Required |
| Ghi nhớ đăng nhập | Checkbox | Optional |

- **Forgot password link:** Dưới password field, text nhỏ, text-gold, hover underline
- **CTA:** "Đăng nhập" — Full-width, Primary Gold
- **Link:** "Chưa có tài khoản? Đăng ký ngay"
- **Error state:** "Email hoặc mật khẩu không đúng" — Alert bar đỏ phía trên form
- **Loading state:** Button spinner + "Đang đăng nhập..."

---

### 3.3 Forgot Password (`www.myplatform.com/forgot-password`)

#### Layout
- Centered card, max-width 480px
- Icon khóa lớn phía trên (64px)

#### States

**State 1: Nhập email**
- Heading: "Quên mật khẩu?"
- Description: "Nhập email đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu"
- Field: Email input
- CTA: "Gửi link đặt lại"
- Link: "← Quay lại đăng nhập"

**State 2: Đã gửi**
- Icon email (green check)
- Heading: "Kiểm tra email của bạn"
- Description: "Chúng tôi đã gửi link đặt lại mật khẩu đến [email]. Link có hiệu lực trong 30 phút."
- CTA: "Gửi lại email" (disabled 60s countdown)

**State 3: Đặt lại mật khẩu** (từ link email)
- Field: Mật khẩu mới + Xác nhận mật khẩu mới
- CTA: "Đặt lại mật khẩu"
- Success → Redirect login + toast "Mật khẩu đã được đặt lại"

---

## 4. CMS Screens

### 4.0 CMS Layout chung

```
┌─────────────────────────────────────────────────┐
│  Logo CMS    Tenant: [abc.myplatform.com]   👤   │ ← Top Header
├──────────┬──────────────────────────────────────┤
│          │  Breadcrumb: Dashboard > Projects     │
│ SIDEBAR  │──────────────────────────────────────│
│          │                                      │
│ Dashboard│        MAIN CONTENT AREA             │
│ Dự án   │                                      │
│ Bài viết│                                      │
│ Banner  │                                      │
│ Menu    │                                      │
│ Thông tin│                                      │
│ SEO     │                                      │
│ Media   │                                      │
│ Liên hệ │                                      │
│          │                                      │
│──────────│                                      │
│ ⚙ Cài đặt│                                      │
│ 🚪 Đăng xuất│                                    │
├──────────┴──────────────────────────────────────┤
```

#### Sidebar
- **Desktop (≥1024px):** Fixed left, width 260px, collapsible to 72px (icon-only)
- **Tablet (640-1023px):** Overlay sidebar, toggle từ hamburger
- **Mobile (<640px):** Bottom navigation bar (5 tabs chính) + hamburger cho các mục phụ
- **Active state:** Background gold/10, border-left 3px gold, text gold
- **Hover state:** Background gray-100, transition 150ms
- **Icons:** Lucide icons, 20px, mỗi menu item có icon riêng

#### Top Header
- Logo CMS nhỏ (32px)
- Tenant domain hiển thị dạng badge
- Nút "Xem website" (external link icon)
- Notification bell (có badge count đỏ)
- User avatar + dropdown (Profile, Settings, Logout)

---

### 4.1 CMS Dashboard (`cms.myplatform.com/[slug]`)

#### Stats Cards Row
- **4 cards ngang** (desktop), 2x2 (tablet), stack (mobile)
- **Mỗi card:**
  - Icon (tròn, background pastel)
  - Metric value (28px, bold) — ví dụ "24"
  - Label (14px, gray-500) — ví dụ "Dự án"
  - Trend indicator: ↑12% (green) hoặc ↓5% (red) so với tháng trước
- **Cards:** Tổng dự án, Tổng bài viết, Lượt xem tháng, Liên hệ mới

#### Recent Activity
- **Timeline list** các hoạt động gần đây (max 10 items)
- **Mỗi item:** Timestamp + Icon + Description
  - "5 phút trước — Tạo dự án mới: Sunshine Tower"
  - "2 giờ trước — Cập nhật bài viết: Xu hướng BĐS 2026"
- **Empty state:** "Chưa có hoạt động nào. Bắt đầu tạo nội dung!"

#### Quick Actions
- **Grid 2x2 buttons:** Tạo dự án, Viết bài, Upload media, Cập nhật thông tin
- **Style:** Large icon + label, hover scale + shadow

---

### 4.2 Projects List (`cms.myplatform.com/[slug]/projects`)

#### Toolbar
- **Search:** Text input "Tìm kiếm dự án...", icon search, debounce 300ms
- **Filters:** Dropdown "Trạng thái" (Tất cả/Đang bán/Sắp mở bán/Đã bán), Dropdown "Loại" (Căn hộ/Biệt thự/...)
- **Actions:** Nút "Thêm dự án" (Primary Gold, icon +)
- **Bulk actions:** Checkbox select → hiện bar "2 đã chọn" + Xóa/Ẩn

#### Data Table

| Column | Width | Sortable | Mô tả |
|---|---|---|---|
| ☐ | 40px | No | Checkbox select |
| Thumbnail | 60px | No | Ảnh nhỏ tròn bo góc |
| Tên dự án | Flex | Yes | Text bold, clickable link |
| Loại | 120px | Yes | Badge (Căn hộ, Biệt thự...) |
| Trạng thái | 120px | Yes | Badge color (Đang bán=green, Sắp mở=amber, Đã bán=gray) |
| Giá | 150px | Yes | Text formatted VNĐ |
| Ngày tạo | 120px | Yes | Format dd/MM/yyyy |
| Hành động | 100px | No | Icon buttons: Edit, Delete, View |

- **Sort:** Click header → toggle ASC/DESC, icon arrow indicator
- **Pagination:** "Hiển thị 1-10 của 24" + page numbers + "10/20/50 mỗi trang"
- **Loading state:** Skeleton rows animation
- **Empty state:** Illustration + "Chưa có dự án nào" + "Tạo dự án đầu tiên" button

#### Delete Confirmation
- **Modal:** "Xác nhận xóa?" + Tên dự án + "Hành động này không thể hoàn tác"
- **Buttons:** "Hủy" (Ghost) + "Xóa" (Danger Red)

---

### 4.3 Project Create/Edit (`cms.myplatform.com/[slug]/projects/new`)

#### Layout: Tabbed Form

```
Tabs: [Thông tin cơ bản] [Vị trí] [Media] [Tiện ích] [SEO]
```

**Tab 1: Thông tin cơ bản**

| Field | Type | Validation |
|---|---|---|
| Tên dự án | Text | Required, max 200 chars |
| Slug | Text (auto-generate) | Unique, URL-safe |
| Mô tả ngắn | Textarea | Max 300 chars, char counter |
| Mô tả chi tiết | Rich Text Editor | Required |
| Loại hình | Select | Required (Căn hộ/Biệt thự/Nhà phố/Đất nền/Thương mại/Văn phòng) |
| Trạng thái | Select | Required (Sắp mở bán/Đang bán/Đã bán hết) |
| Giá (text) | Text | "Từ 2.5 tỷ" hoặc "Liên hệ" |
| Giá từ | Number | Optional, for filtering |
| Giá đến | Number | Optional, ≥ Giá từ |
| Diện tích (text) | Text | "45-120m²" |
| Chủ đầu tư | Text | Optional |
| Năm khởi công | Number | Optional, 4 digits |
| Ngày bàn giao | Date picker | Optional |
| Tổng số căn | Number | Optional |
| Nổi bật | Toggle switch | Default OFF |
| Xuất bản | Toggle switch | Default OFF |

**Tab 2: Vị trí**

| Field | Type |
|---|---|
| Địa chỉ | Text |
| Phường/Xã | Text hoặc Select |
| Quận/Huyện | Select (dependent) |
| Tỉnh/Thành phố | Select |
| Vĩ độ | Number (auto from address) |
| Kinh độ | Number (auto from address) |

- **Map picker:** Google Maps embedded, click để chọn tọa độ
- **Autocomplete address:** Gợi ý địa chỉ khi gõ

**Tab 3: Media**

| Field | Type |
|---|---|
| Ảnh đại diện | Single image upload (thumbnail) |
| Gallery ảnh | Multi image upload, drag reorder |
| Mặt bằng | Multi image upload |
| Video YouTube | URL input + preview embed |
| Virtual Tour URL | URL input |
| Tài liệu | File upload (PDF) |

- **Upload area:** Drag-and-drop zone hoặc click to browse
- **Preview:** Thumbnail grid, click to enlarge, X to remove
- **Progress:** Upload progress bar per file
- **Validation:** Max 10MB/file, image formats (jpg, png, webp), max 20 images

**Tab 4: Tiện ích**
- **Amenities grid:** Checkbox grid với icons
  - Hồ bơi, Gym, Sân chơi trẻ em, Bãi đỗ xe, An ninh 24/7, Công viên, Siêu thị, Trường học...
- **Style:** Icon + label, selected = gold background

**Tab 5: SEO**
- SEO Title (max 60 chars, char counter, preview)
- SEO Description (max 160 chars, char counter, preview)
- SEO Keywords (tag input, comma separated)
- **SEO Preview:** Giả lập Google search result snippet

#### Action Buttons (Sticky bottom bar)
- "Lưu nháp" (Ghost)
- "Xuất bản" / "Cập nhật" (Primary Gold)
- "Hủy" (text link)
- **Unsaved changes warning:** "Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời trang?"

---

### 4.4 Posts List (`cms.myplatform.com/[slug]/posts`)

- **Giống cấu trúc Projects List** với các điều chỉnh:
  - Columns: Thumbnail, Tiêu đề, Danh mục, Trạng thái (Nháp/Đã xuất bản), Ngày đăng, Actions
  - Filters: Danh mục, Trạng thái
  - Sort: Ngày đăng, Tiêu đề

---

### 4.5 Post Create/Edit (`cms.myplatform.com/[slug]/posts/new`)

#### Layout

```
┌──────────────────────────────────┬──────────────┐
│                                  │  SIDEBAR     │
│  TIÊU ĐỀ BÀI VIẾT               │  ──────────  │
│  [________________________]      │  Trạng thái  │
│                                  │  ○ Nháp      │
│  RICH TEXT EDITOR                │  ○ Xuất bản  │
│  ┌──────────────────────────┐   │  ──────────  │
│  │ B I U H1 H2 | [] "" <>  │   │  Danh mục    │
│  │──────────────────────────│   │  [Select ▼]  │
│  │                          │   │  ──────────  │
│  │  Content area...         │   │  Tags        │
│  │                          │   │  [Tag input] │
│  │                          │   │  ──────────  │
│  └──────────────────────────┘   │  Ảnh đại diện│
│                                  │  [Upload]    │
│  SEO SETTINGS                    │  ──────────  │
│  [Accordion: SEO]                │  Ngày xuất   │
│                                  │  bản         │
│                                  │  [Date pick] │
└──────────────────────────────────┴──────────────┘
```

#### Rich Text Editor
- **Toolbar:** Bold, Italic, Underline, Strikethrough | H1, H2, H3 | List (UL/OL) | Link | Image | Blockquote | Code | Undo/Redo
- **Image trong editor:** Click insert → chọn từ Media Library hoặc upload mới
- **Autosave:** Mỗi 30s, hiện "Đã lưu tự động lúc 14:30"

#### Sidebar (bên phải, desktop only)
- **Trạng thái:** Radio (Nháp/Xuất bản)
- **Danh mục:** Multi-select dropdown, có nút "Tạo danh mục mới"
- **Tags:** Tag input (gõ + Enter), autocomplete từ tags hiện có
- **Ảnh đại diện:** Upload zone nhỏ, crop support
- **Ngày xuất bản:** Date picker, default = now

---

### 4.6 Banner Management (`cms.myplatform.com/[slug]/banners`)

#### Layout
- **Grid view** các banner cards
- **Mỗi card:**
  - Banner image (tỉ lệ 16:6)
  - Title overlay
  - Toggle Active/Inactive
  - Drag handle (6 dots icon)
  - Edit/Delete buttons
- **Drag & Drop:** Sortable list, kéo thả để sắp xếp thứ tự, có animation reorder
- **Add Banner:** Nút "+ Thêm banner" → Modal/Side panel
  - Upload image (required, khuyến nghị 1920x600px)
  - Title (optional)
  - Subtitle (optional)
  - Button text (optional)
  - Button link (optional)
  - Active toggle

---

### 4.7 Menu Builder (`cms.myplatform.com/[slug]/menus`)

#### Layout

```
┌─────────────────────────────────────────────────┐
│  MENU CHÍNH (Header)                     [+ Add] │
├─────────────────────────────────────────────────┤
│  ├─ 🏠 Trang chủ          /           [✎] [🗑]  │
│  ├─ 🏗 Dự án              /du-an       [✎] [🗑]  │
│  │  ├─ Căn hộ            /du-an/can-ho  [✎] [🗑] │
│  │  └─ Biệt thự         /du-an/biet-thu [✎] [🗑]│
│  ├─ 📝 Blog               /blog        [✎] [🗑]  │
│  ├─ 📞 Liên hệ            /lien-he     [✎] [🗑]  │
│  └─ ℹ Giới thiệu         /gioi-thieu   [✎] [🗑]  │
└─────────────────────────────────────────────────┘
```

- **Tree structure:** Indented items, max 2 levels deep
- **Drag & drop:** Reorder items, indent/outdent để tạo sub-menu
- **Add item modal:** Tên menu item, URL/route, Icon (optional), Open in new tab (checkbox)
- **Edit inline:** Click edit icon → inline form expand
- **Visual feedback:** Ghost element khi drag, drop zone highlight

---

### 4.8 Company Info (`cms.myplatform.com/[slug]/company`)

#### Form Fields

| Section | Fields |
|---|---|
| Logo | Upload image (khuyến nghị 200x60px), preview |
| Favicon | Upload image (32x32px), preview |
| Tên công ty | Text input |
| Slogan | Text input |
| Mô tả | Textarea |
| Email | Email input |
| Số điện thoại | Tel input |
| Hotline | Tel input |
| Zalo | Text input |
| Địa chỉ | Textarea |
| Google Maps Link | URL input + preview |
| Facebook | URL input |
| YouTube | URL input |
| Website | URL input |
| Giờ làm việc | Text input |

- **Preview panel:** Bên phải hiển thị preview header website với logo + contact info
- **Auto-save notification:** Toast khi save thành công

---

### 4.9 SEO Config (`cms.myplatform.com/[slug]/seo`)

#### Global SEO Settings
- **Site title:** Text input (hiện trên mọi trang)
- **Site description:** Textarea
- **Default OG Image:** Upload
- **Google Analytics ID:** Text input
- **Google Search Console verification:** Text input
- **Robots.txt:** Textarea (pre-filled default)
- **Sitemap:** Auto-generated, link to view

#### Per-page SEO
- **Table:** Trang | SEO Title | SEO Description | Status
- **Edit:** Click vào row → inline edit hoặc modal

---

### 4.10 Media Library (`cms.myplatform.com/[slug]/media`)

#### Layout

```
┌─────────────────────────────────────────────────┐
│  [Upload] [Search...] [Filter: All ▼] [View: ▦] │
├─────────────────────────────────────────────────┤
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│  │ img │ │ img │ │ img │ │ img │ │ img │     │
│  │ name│ │ name│ │ name│ │ name│ │ name│     │
│  │ size│ │ size│ │ size│ │ size│ │ size│     │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘     │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│  │ img │ │ img │ │ img │ │ img │ │ img │     │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘     │
├─────────────────────────────────────────────────┤
│  ← 1 2 3 →                  Showing 1-20 of 48 │
└─────────────────────────────────────────────────┘
```

- **Upload:** Drag & drop zone + button, multi-file support
- **Grid:** 5 cột (desktop), 3 cột (tablet), 2 cột (mobile)
- **Mỗi item:**
  - Thumbnail (square, object-cover)
  - File name (truncated)
  - File size
  - Click → Detail panel slide-in từ phải
- **Detail panel:**
  - Preview lớn
  - File info (name, size, dimensions, upload date, URL)
  - "Copy URL" button (click → copy + toast "Đã copy!")
  - "Xóa" button (confirm modal)
- **Filter:** All / Images / Documents / Videos
- **Search:** By filename, debounce 300ms
- **Empty state:** Upload icon + "Chưa có file nào. Kéo thả file vào đây để upload."
- **Upload progress:** Progress bar overlay trên mỗi file đang upload

---

### 4.11 Contact Submissions (`cms.myplatform.com/[slug]/contacts`)

#### Data Table

| Column | Mô tả |
|---|---|
| ● Status dot | Blue (unread) / Gray (read) |
| Tên | Tên người gửi |
| Email | Email |
| SĐT | Số điện thoại |
| Nội dung | Truncated preview (50 chars) |
| Ngày gửi | Format: dd/MM/yyyy HH:mm |
| Hành động | View detail, Mark read/unread, Delete |

- **Click row:** Expand hoặc slide-in panel hiện full message
- **Unread count:** Badge trên sidebar menu item
- **Bulk mark read:** Checkbox select → "Đánh dấu đã đọc"
- **Empty state:** "Chưa có liên hệ nào từ khách hàng"

---

## 5. Demo Screen

### 5.1 Demo Preview (`www.myplatform.com/demo/[template-slug]`)

#### Layout

```
┌─────────────────────────────────────────────────┐
│  FLOATING TOOLBAR (left side)                    │
│  ┌──────┐                                       │
│  │ Logo │  ← Upload logo                         │
│  │🎨 Màu│  ← Color picker                        │
│  │🖼 Ban.│  ← Banner upload                       │
│  │✏ Nội │  ← Content edit                        │
│  │💾 Lưu│  ← Save (counter: 2/3 còn lại)        │
│  │⏰ 2d │  ← Timer (2 ngày còn lại)              │
│  └──────┘                                       │
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │                                             ││
│  │         FULL WEBSITE PREVIEW                ││
│  │         (iframe / embedded)                 ││
│  │                                             ││
│  │                                             ││
│  └─────────────────────────────────────────────┘│
├─────────────────────────────────────────────────┤
│  ⚠ Bạn còn 2 lượt lưu | 2 ngày thử            │ ← Bottom bar
│  [Mua ngay để không giới hạn]                    │
└─────────────────────────────────────────────────┘
```

#### Floating Toolbar
- **Position:** Fixed left, vertical stack, z-index 1000
- **Style:** Rounded card, shadow-xl, background white, padding 8px
- **Tools:**

| Tool | Chức năng | Interaction |
|---|---|---|
| 🖼 Logo | Thay đổi logo | Click → File upload dialog → Preview tức thì |
| 🎨 Màu sắc | Đổi color scheme | Click → Color picker panel (Primary, Secondary, Text) |
| 🖼 Banner | Thay đổi banner | Click → Upload → Replace hero image |
| ✏ Nội dung | Chỉnh sửa text | Click → Enable inline editing trên preview, text fields highlight border |
| 💾 Lưu | Lưu thay đổi | Click → Save + Counter update. Disabled nếu hết lượt |
| ⏰ Timer | Thời gian còn lại | Display only, countdown format "2 ngày 14:30:22" |

#### Color Picker Panel
- **Slide-in panel** từ toolbar
- **Fields:**
  - Primary color: Hex input + color swatch
  - Secondary color: Hex input + color swatch
  - Text color: Hex input + color swatch
- **Preset palettes:** 5 preset color combos (Gold, Blue, Green, Red, Purple)
- **Live preview:** Thay đổi tức thì trên preview (CSS variables)

#### Save Counter & Timer
- **Counter:** "Còn 2/3 lượt lưu" — progress bar nhỏ
- **Timer:** Countdown từ 3 ngày, format "2 ngày 14h 30m"
- **Warning:** Khi còn 1 lượt hoặc < 24h → Counter/Timer đổi màu đỏ + pulse animation
- **Expired state:** Overlay toàn bộ preview + "Demo đã hết hạn" + CTA "Mua ngay" / "Thuê website"

#### Bottom Bar
- **Fixed bottom**, background white, shadow-top
- **Content:** Warning message + CTA button "Mua ngay"
- **Animation:** Slide-up khi lần đầu hiện, subtle bounce

---

## 6. Admin Screens

### 6.1 Admin Dashboard (`admin.myplatform.com`)

#### Layout: Giống CMS nhưng với sidebar Admin

#### Stats Row (4 cards)
- **Doanh thu tháng:** "45.500.000 VNĐ" ↑15%
- **Người dùng mới:** "24" ↑8%
- **Đơn hàng mới:** "12" ↑20%
- **Templates active:** "3"

#### Charts Section
- **Revenue Chart:** Line chart 12 tháng, tooltip hiện giá trị, responsive
- **User Growth:** Bar chart, monthly new users
- **Order Status:** Pie/Donut chart (Pending/Approved/Rejected)

#### Recent Orders Table
- Compact table, 5 rows mới nhất
- Columns: #ID, Khách hàng, Template, Gói, Giá, Trạng thái, Ngày
- Quick action: "Xem" link

#### Template Performance
- Cards mỗi template: Lượt xem, Lượt demo, Đơn hàng, Tỷ lệ chuyển đổi

---

### 6.2 User Management (`admin.myplatform.com/users`)

#### Data Table

| Column | Mô tả |
|---|---|
| Avatar | Ảnh user hoặc initials |
| Tên | Họ tên |
| Email | Email |
| SĐT | Số điện thoại |
| Vai trò | Badge (PLATFORM_ADMIN/TENANT_ADMIN/TENANT_EDITOR) |
| Trạng thái | Active (green) / Inactive (gray) |
| Ngày tạo | dd/MM/yyyy |
| Hành động | View, Edit role, Activate/Deactivate, Delete |

- **Search:** By name, email
- **Filter:** Role dropdown, Status dropdown
- **Activate/Deactivate:** Toggle switch inline, confirm modal
- **User Detail Modal:** Full info + linked tenant + order history

---

### 6.3 Order Management (`admin.myplatform.com/orders`)

#### Data Table

| Column | Mô tả |
|---|---|
| #ID | Order number |
| Khách hàng | Tên + email |
| Template | Template name |
| Gói | Buy/Rent + tier (Basic/Pro/Premium) |
| Giá | VNĐ formatted |
| Trạng thái | Badge: Chờ duyệt (amber), Đã duyệt (green), Từ chối (red), Đã thanh toán (blue) |
| Ngày tạo | dd/MM/yyyy HH:mm |
| Hành động | View detail, Approve, Reject |

#### Status Filter Tabs
- **Tất cả** | **Chờ duyệt** (count) | **Đã duyệt** | **Đã thanh toán** | **Từ chối**
- Active tab: Gold underline + count badge

#### Order Detail Modal
- **Customer info:** Name, email, phone, company
- **Order info:** Template, plan type, tier, price
- **Notes:** Customer notes
- **Timeline:** Order created → Approved → Payment confirmed → Activated
- **Actions:**
  - "Duyệt đơn" → Confirm modal → Send email to customer with bank transfer info
  - "Từ chối" → Reason textarea → Confirm → Send rejection email
  - "Xác nhận thanh toán" → Create tenant → Activate → Send credentials email
  - "Tải source" → Generate ZIP → Download link (for Buy orders)

---

### 6.4 Template Management (`admin.myplatform.com/templates`)

#### CRUD Template
- **Table:** Name, Slug, Thumbnail, Giá mua, Giá thuê, Active, Actions
- **Create/Edit Form:**
  - Basic Info: Name, Slug, Description, Short description
  - Pricing: Buy price (Basic/Pro/Premium), Rent price (Basic/Pro/Premium)
  - Media: Thumbnail, Screenshots (multi-upload), Preview URL
  - Config: JSON editor cho layout config
  - Features: Checkbox list các tính năng
  - SEO: Title, Description, Keywords
  - Status: Active/Inactive toggle

#### Config Editor
- **Code editor** (Monaco-like) cho template config JSON
- **Syntax highlighting** + **validation**
- **Preview:** Side-by-side JSON + rendered preview

---

## 7. BĐS Website Screens (Tenant)

### 7.1 Trang chủ (`[slug].myplatform.com`)

#### Layout

```
┌─────────────────────────────────────────────────┐
│  Logo   Trang chủ  Dự án  Blog  Liên hệ  ☎     │ ← Header
├─────────────────────────────────────────────────┤
│                                                 │
│  ████████████ HERO BANNER SLIDER ██████████████ │
│  ████████████ (auto-play, dots, arrows) ███████ │
│                                                 │
├─────────────────────────────────────────────────┤
│            DỰ ÁN NỔI BẬT                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │Project 1│  │Project 2│  │Project 3│         │
│  │  Image  │  │  Image  │  │  Image  │         │
│  │  Name   │  │  Name   │  │  Name   │         │
│  │ Price   │  │ Price   │  │ Price   │         │
│  └─────────┘  └─────────┘  └─────────┘         │
├─────────────────────────────────────────────────┤
│            GIỚI THIỆU CÔNG TY                    │
│  ┌────────────────┐  ┌───────────────────────┐  │
│  │   Company      │  │  Company description  │  │
│  │   Image        │  │  ───────────────────  │  │
│  │                │  │  [Xem thêm →]         │  │
│  └────────────────┘  └───────────────────────┘  │
├─────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │  50+ │  │ 200+ │  │  99% │  │  10+ │        │  ← Achievement counters
│  │Dự án │  │KH    │  │Hài l.│  │Năm KN│        │
│  └──────┘  └──────┘  └──────┘  └──────┘        │
├─────────────────────────────────────────────────┤
│            BÀI VIẾT MỚI                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ Blog 1  │  │ Blog 2  │  │ Blog 3  │         │
│  └─────────┘  └─────────┘  └─────────┘         │
├─────────────────────────────────────────────────┤
│            LIÊN HỆ TƯ VẤN                       │
│  Background parallax + overlay                   │
│  "Liên hệ ngay để được tư vấn miễn phí"         │
│  [Gọi ngay] [Để lại thông tin]                   │
├─────────────────────────────────────────────────┤
│                  FOOTER                          │
└─────────────────────────────────────────────────┘
```

#### Website Header
- **Desktop:** Logo trái, nav links giữa, SĐT + Zalo phải
- **Mobile:** Logo trái, hamburger phải → fullscreen slide menu
- **Style:** Luxury — background transparent trên hero, white khi scroll
- **Hotline button:** Fixed right, tròn, icon phone, pulse animation (mobile)

#### Hero Banner Slider
- **Auto-play:** 5s interval, pause on hover
- **Transition:** Fade hoặc slide, 600ms ease
- **Controls:** Dots (bottom center), Arrows (left/right, only desktop)
- **Content overlay:** Title + subtitle + CTA button
- **Mobile:** Chiều cao giảm (300px), text size nhỏ hơn

#### Achievement Counters
- **Animate:** Count-up from 0 khi scroll vào viewport
- **Style:** Large number (48px, gold), label bên dưới (14px, gray)
- **Background:** Light gray hoặc pattern subtle

---

### 7.2 Giới thiệu (`[slug].myplatform.com/gioi-thieu`)

#### Sections
1. **Company Story:** Rich text + image side-by-side
2. **Vision & Mission:** 2 cards song song
3. **Team:** Grid 4 cột — Avatar + Name + Position
4. **Achievement Counters:** Giống homepage section
5. **Partners:** Logo grid, grayscale → color on hover

---

### 7.3 Projects List (`[slug].myplatform.com/du-an`)

#### Filter Bar
- **Layout:** Horizontal bar full-width
- **Filters:**

| Filter | Type | Options |
|---|---|---|
| Loại hình | Select/Tabs | Tất cả, Căn hộ, Biệt thự, Nhà phố, Đất nền |
| Trạng thái | Select | Tất cả, Đang bán, Sắp mở bán |
| Khoảng giá | Range select | Dưới 2 tỷ, 2-5 tỷ, 5-10 tỷ, Trên 10 tỷ |
| Diện tích | Range select | Dưới 50m², 50-100m², 100-200m², Trên 200m² |
| Khu vực | Select | Quận 1, Quận 2, Thủ Đức... |

- **Mobile:** Nút "Bộ lọc" → Bottom sheet

#### Project Cards Grid
- **Grid:** 3 cột (desktop), 2 cột (tablet), 1 cột (mobile)
- **Card:**
  - Thumbnail image (16:10), status badge overlay (Đang bán — green)
  - Type badge nhỏ (Căn hộ)
  - Project name (18px, semibold, 2 lines max)
  - Location: Icon pin + "Quận 2, TP.HCM"
  - Price: Gold text, bold
  - Area: "45 - 120 m²"
  - CTA: "Xem chi tiết →"
- **Hover:** Scale(1.02), shadow-lg
- **Loading state:** 6 skeleton cards
- **Empty state:** "Không tìm thấy dự án phù hợp" + reset filter button

---

### 7.4 Project Detail (`[slug].myplatform.com/du-an/[project-slug]`)

#### Layout

```
┌──────────────────────────────────────────────────┐
│  Breadcrumb: Trang chủ > Dự án > Sunshine Tower  │
├──────────────────────────────────────────────────┤
│                                                  │
│  ████████████ IMAGE GALLERY ██████████████████   │
│  [thumb] [thumb] [thumb] [thumb] [+5 more]       │
│                                                  │
├──────────────────────────┬───────────────────────┤
│                          │   THÔNG TIN DỰ ÁN     │
│  MÔ TẢ DỰ ÁN             │   ┌───────────────┐   │
│  Rich text content...    │   │ Loại: Căn hộ  │   │
│                          │   │ Giá: Từ 2.5 tỷ│   │
│  ─────────────────────   │   │ DT: 45-120m²  │   │
│  TIỆN ÍCH                │   │ CĐT: Vingroup │   │
│  🏊 Hồ bơi  💪 Gym       │   │ Bàn giao: 2027│   │
│  🅿 Đỗ xe   🌳 Công viên  │   └───────────────┘   │
│                          │                       │
│  ─────────────────────   │   FORM LIÊN HỆ        │
│  VỊ TRÍ                  │   [Họ tên]            │
│  [Google Maps embed]     │   [SĐT]               │
│                          │   [Email]              │
│  ─────────────────────   │   [Nội dung]           │
│  MẶNG BẰNG               │   [Gửi liên hệ]       │
│  [Floor plan images]     │                       │
├──────────────────────────┴───────────────────────┤
│  DỰ ÁN LIÊN QUAN                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │Related 1│  │Related 2│  │Related 3│          │
│  └─────────┘  └─────────┘  └─────────┘          │
└──────────────────────────────────────────────────┘
```

#### Image Gallery
- **Main image:** Full-width, max-height 500px
- **Thumbnail strip:** 4 visible + "+5 more" badge
- **Click → Lightbox:** Fullscreen, swipe trên mobile
- **Virtual Tour:** Nút "360° Tour" nếu có URL

#### Info Table
- **Style:** 2 cột key-value, striped rows, border subtle
- **Fields:** Loại hình, Giá, Diện tích, Chủ đầu tư, Năm khởi công, Bàn giao, Tổng căn hộ, Vị trí

#### Amenities Grid
- **Icons grid:** 4 cột, mỗi item = Icon + Label
- **Style:** Icon tròn background pastel + text bên dưới

#### Contact Form (Sticky sidebar trên desktop)
- **Style:** Card with shadow, border-top 3px gold
- **Fields:** Họ tên, SĐT, Email, Nội dung, "Tôi quan tâm đến dự án này"
- **CTA:** "Gửi liên hệ" — Primary Gold

---

### 7.5 Blog List (`[slug].myplatform.com/blog`)

#### Layout
- **Featured post:** Large card full-width (image trái 60% + content phải 40%)
- **Grid:** 3 cột (desktop), 2 cột (tablet), 1 cột (mobile)
- **Blog Card:**
  - Thumbnail (16:9)
  - Category badge
  - Title (18px, semibold, 2 lines)
  - Excerpt (14px, gray-500, 3 lines)
  - Date + Read time
- **Category Filter:** Tab-style (Tất cả | Tin tức | Phong thủy | Đầu tư | ...)
- **Pagination:** Load more button hoặc numbered

---

### 7.6 Blog Detail (`[slug].myplatform.com/blog/[post-slug]`)

#### Layout
- **Max-width:** 720px, centered
- **Breadcrumb:** Trang chủ > Blog > Tiêu đề bài
- **Header:** Title (32px), Category badge, Date, Author info, Read time
- **Content:** Rich HTML, styled typography (headings, paragraphs, images, blockquotes, lists)
- **Author Box:** Avatar + Name + Bio (bottom of article)
- **Share Buttons:** Facebook, Zalo, Copy link — Sticky left (desktop) hoặc bottom bar (mobile)
- **Related Posts:** Grid 3 cards bên dưới
- **Table of Contents:** Sticky right sidebar (desktop only, auto-generated from headings)

---

### 7.7 Contact (`[slug].myplatform.com/lien-he`)

#### Layout
- **Top:** Google Maps embed full-width (height 400px)
- **Bottom:** 2 cột — Company info (trái) + Contact form (phải)
- **Company Info:**
  - Logo
  - Tên công ty
  - Địa chỉ (icon + text)
  - Phone (icon + clickable)
  - Email (icon + clickable)
  - Giờ làm việc
  - Social media icons
- **Contact Form:** Giống form mô tả ở mục Contact submissions

---

### 7.8 Landing Page (`[slug].myplatform.com/du-an/[slug]/landing`)

#### Sections (Single-page scroll)

1. **Hero:** Full-viewport video/image background + Project name + Tagline + CTA "Đăng ký ngay"
2. **Key Features:** 3-4 highlight cards (Icon + Title + Description)
3. **Gallery:** Masonry image grid + lightbox
4. **Floor Plans:** Tab view per unit type (1BR/2BR/3BR) + image + specs table
5. **Amenities:** Full-width section, icon grid + large background image
6. **Location:** Google Maps + advantage points (5 phút đến Metro, 10 phút đến sân bay...)
7. **Register Interest Form:** Floating CTA form — Họ tên, SĐT, Email, Loại căn quan tâm
8. **Footer:** Simplified footer

- **Navigation:** Smooth scroll, fixed header với progress bar
- **CTA Button:** Floating bottom right (mobile), "Đăng ký nhận thông tin"
- **Animations:** Parallax sections, fade-in on scroll, counter animations

---

## 8. Quy tắc chung về trạng thái UI

### 8.1 Loading States

| Loại | Cách hiển thị |
|---|---|
| Page load | Skeleton screens (không spinner toàn trang) |
| Button action | Spinner icon trong button + disabled + text "Đang xử lý..." |
| Data fetch | Skeleton rows/cards + shimmer animation |
| Image load | Blur placeholder → sharp (blur-up technique) |
| File upload | Progress bar + percentage |

### 8.2 Empty States

| Context | Hiển thị |
|---|---|
| No data | Illustration + Message + CTA action |
| No search results | "Không tìm thấy kết quả cho '[query]'" + Reset button |
| No filter results | "Không có dữ liệu phù hợp" + "Xóa bộ lọc" |
| First time use | Welcome message + Getting started guide |

### 8.3 Error States

| Loại | Hiển thị |
|---|---|
| Form validation | Inline error below field (red text + icon), field border red |
| API error | Toast notification (red, auto-dismiss 5s) |
| 404 Not Found | Custom page: Illustration + "Trang không tồn tại" + "Về trang chủ" |
| 500 Server Error | Custom page: Illustration + "Có lỗi xảy ra" + "Thử lại" + "Liên hệ hỗ trợ" |
| Network error | Banner top: "Mất kết nối mạng. Đang thử lại..." |
| Session expired | Modal: "Phiên đăng nhập đã hết hạn" + "Đăng nhập lại" |

### 8.4 Success States

| Loại | Hiển thị |
|---|---|
| Form submit | Toast notification (green, auto-dismiss 3s) + redirect hoặc reset form |
| CRUD create | Toast "Tạo thành công!" + redirect to list |
| CRUD update | Toast "Cập nhật thành công!" |
| CRUD delete | Toast "Đã xóa!" + remove row with fade-out animation |
| File upload | Checkmark icon + "Upload thành công" |

### 8.5 Micro-animations

| Animation | Duration | Easing | Trigger |
|---|---|---|---|
| Hover scale | 200ms | ease-out | Mouse enter |
| Button press | 100ms | ease-in | Click |
| Modal open | 300ms | ease-out | Open action |
| Modal close | 200ms | ease-in | Close action |
| Toast appear | 300ms | ease-out (slide-down) | Action complete |
| Toast dismiss | 200ms | ease-in (slide-up) | Auto/manual |
| Page transition | 200ms | ease-in-out | Route change |
| Scroll reveal | 600ms | ease-out | Viewport enter |
| Skeleton shimmer | 1.5s loop | linear | Loading |
| Counter animate | 2000ms | ease-out | Viewport enter |

---

> **Ghi chú cuối:** Tài liệu này là cơ sở để thiết kế UI/UX. Mọi quyết định thiết kế chi tiết (spacing, exact colors, component variants) sẽ tuân theo Design System (tài liệu 07-design-system.md). Các flow tương tác chi tiết tham khảo tài liệu 08-user-flow.md.
