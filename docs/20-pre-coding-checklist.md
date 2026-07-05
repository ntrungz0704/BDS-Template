# 20. Pre-coding Checklist

> Tài liệu này liệt kê toàn bộ các đầu việc kiểm tra bắt buộc phải hoàn thành và xác nhận thành công (Checked) trước khi viết những dòng mã nguồn (coding) đầu tiên cho dự án Real Estate Template Marketplace & SaaS Platform. Việc tuân thủ checklist này giúp giảm thiểu 90% lỗi thiết lập môi trường và cấu hình dịch vụ bên thứ ba trong quá trình phát triển.

---

## 📑 Phần 1: Kiểm tra Đặc tả & Thiết kế (Documentation Check)

- [ ] **Khóa Spec kỹ thuật:** Tài liệu `MVP-FINAL-SPEC.md` đã được Product Owner / Khách hàng ký duyệt thông qua chính sách phê duyệt tự động.
- [ ] **Làm rõ các điểm mâu thuẫn:** Đã thống nhất luồng Mua/Thuê thủ công (upload bill), biểu giá dịch vụ, và cơ chế giới hạn phiên dùng thử (3 ngày / 3 lần lưu).
- [ ] **Khớp cấu trúc bảng DB:** Sơ đồ cơ sở dữ liệu đã khớp hoàn toàn với cấu trúc trường của dự án BĐS (gồm 27 trường dữ liệu như `direction`, `bedrooms`, `bathrooms`, `map_embed`...).
- [ ] **API Contracts:** Đã thống nhất cấu trúc dữ liệu gửi lên và trả về giữa Frontend (Next.js) và Backend (Express).

---

## 💻 Phần 2: Thiết lập môi trường phát triển (Dev Environment Setup)

- [ ] **Node.js LTS:** Đã cài đặt Node.js phiên bản LTS (khuyến nghị `v20.x` trở lên) trên máy phát triển cục bộ.
- [ ] **Package Manager:** Đã cài đặt `pnpm` (khuyến nghị phiên bản `v9.x` hoặc mới nhất) để phục vụ quản lý monorepo workspace.
- [ ] **PostgreSQL Local:** Đã cài đặt PostgreSQL (phiên bản `v15` hoặc `v16`) trên máy hoặc khởi chạy container PostgreSQL qua Docker thành công.
- [ ] **Docker Desktop:** Đã cài đặt và khởi động Docker Desktop phục vụ việc đóng gói container local.
- [ ] **VS Code Extensions:** Đã cài đặt các plugin thiết yếu: *Prisma*, *Tailwind CSS IntelliSense*, *ESLint*, *Prettier - Code formatter*.

---

## 🔑 Phần 3: Tài khoản & Dịch vụ bên thứ ba (Third-party Credentials)

- [ ] **Tài khoản Cloudinary:**
  - Đã đăng ký tài khoản Cloudinary (gói Free).
  - Đã lấy thông số: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
  - Tạo sẵn thư mục upload trên Cloudinary Media Library: `real-estate-saas/logos`, `real-estate-saas/projects`, `real-estate-saas/banners`.
- [ ] **Tài khoản Cloudflare:**
  - Đã chuẩn bị tài khoản Cloudflare quản lý DNS cho tên miền chính.
  - Đã kích hoạt API Token để tự động hóa trỏ IP (để chuẩn bị cho Phase 2).
- [ ] **Cấu hình Gmail SMTP:**
  - Đã chuẩn bị tài khoản Gmail phụ phục vụ gửi mail thông báo tự động.
  - Đã kích hoạt chế độ **Mật khẩu ứng dụng (App Password)** của Google để lấy mật khẩu SMTP dạng 16 ký tự an toàn.
- [ ] **VPS Ubuntu:**
  - Đã chuẩn bị 1 VPS chạy Ubuntu Server (khuyến nghị 24.04 LTS, tối thiểu 2 vCPU, 4GB RAM, 80GB SSD).
  - Đã cài đặt sẵn Git, Docker và Docker Compose trên VPS.
  - Đã cấu hình SSH Key để kết nối nhanh chóng và an toàn.

---

## 📁 Phần 4: Dữ liệu & Tài nguyên thiết kế (Seed Data & Assets Setup)

- [ ] **Dữ liệu Seed JSON:** Đã lưu trữ đầy đủ các file dữ liệu mẫu trong thư mục `seed/`:
  - `companies.json` (3 công ty mẫu).
  - `projects.json` (20 dự án BĐS với 27 trường dữ liệu Việt Nam thực tế).
  - `banners.json` (10 banner mẫu phong cách luxury).
- [ ] **Hình ảnh mẫu (Assets):**
  - Đã chuẩn bị thư mục chứa ảnh demo sẵn có kích thước tối ưu (<500KB/ảnh).
  - Gom đủ ~50 ảnh thực tế về chung cư cao cấp, biệt thự đảo, shophouse và văn phòng hạng A để upload lên Cloudinary làm seed data.

---

## 🌿 Phần 5: Chiến lược Git & Chất lượng mã nguồn (Git Flow Setup)

- [ ] **Git Repository:** Đã khởi tạo git repository trong workspace: `git init`.
- [ ] **Quy tắc đặt tên nhánh (Branch Strategy):**
  - Nhánh chính: `main` (Production).
  - Nhánh phát triển chính: `develop`.
  - Nhánh tính năng: `feature/[tên-tính-năng]` (ví dụ: `feature/auth-jwt`).
  - Nhánh sửa lỗi: `fix/[tên-lỗi]`.
- [ ] **Conventional Commits:** Thống nhất định dạng commit message:
  - `feat: [mô tả]` (thêm tính năng mới).
  - `fix: [mô tả]` (sửa lỗi).
  - `docs: [mô tả]` (cập nhật tài liệu).
  - `chore: [mô tả]` (cập nhật thư viện, file cấu hình).
- [ ] **Pre-commit Hooks:** Cấu hình `husky` kết hợp `lint-staged` để tự động chạy ESLint kiểm tra lỗi cú pháp trước mỗi lệnh commit.

---

## 📄 Phần 6: Bảng biến môi trường mẫu đầy đủ (Environmental Variables Template)

Tạo sẵn file `.env.example` ở root monorepo với nội dung sau:

```env
# ==============================================================================
# 1. DATABASE & REDIS CONFIGURATION
# ==============================================================================
# Kết nối PostgreSQL (Dùng cho Prisma)
DATABASE_URL="postgresql://postgres:securepassword@localhost:5432/real_estate_platform?schema=public"

# ==============================================================================
# 2. SERVER & API CONFIGURATION
# ==============================================================================
PORT=5000
NODE_ENV="development"
API_BASE_URL="http://localhost:5000"

# JWT Secret Keys
JWT_ACCESS_SECRET="super-secret-access-key-random-string-32-chars-at-least"
JWT_REFRESH_SECRET="super-secret-refresh-key-random-string-64-chars-at-least"

# ==============================================================================
# 3. THIRD-PARTY SERVICES CONFIGURATION
# ==============================================================================
# Cloudinary Credential (Upload ảnh)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Email Service (Nodemailer SMTP - Phase 1)
EMAIL_SERVICE="gmail"
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-16-char-password"
EMAIL_FROM="Real Estate SaaS <your-email@gmail.com>"

# Resend API Key (Phase 2)
RESEND_API_KEY="re_1234567890abcdef"

# ==============================================================================
# 4. FRONTEND APPLICATIONS CONFIGURATION
# ==============================================================================
# NEXT.js Apps Base URLs
NEXT_PUBLIC_MARKETPLACE_URL="http://localhost:3000"
NEXT_PUBLIC_CMS_URL="http://localhost:3001"
NEXT_PUBLIC_ADMIN_URL="http://localhost:3002"
NEXT_PUBLIC_TENANT_DOMAIN_ROOT="localhost:3003"
```
