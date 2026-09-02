# Hướng Dẫn Triển Khai Tên Miền, DNS, Nginx và SSL Wildcard

Tài liệu này hướng dẫn cách cấu hình hạ tầng mạng, tên miền và máy chủ Nginx cho hệ thống Multi-tenant Real Estate SaaS **PlatformBDS** ở môi trường Production.

---

## 1. Cấu Hình DNS Records (Cloudflare / Nhà Cấp Tên Miền)

Để cơ chế tự động sản sinh subdomain hoạt động, bạn chỉ cần cấu hình DNS Wildcard **một lần duy nhất**. Hệ thống sẽ tự phân giải subdomain dựa trên database mà không cần tạo thêm bản ghi DNS thủ công cho mỗi khách hàng mới.

| Loại Bản Ghi (Type) | Tên Bản Ghi (Name) | Giá Trị (Value / IP Address) | Trạng Thái Proxy (Cloudflare) |
| :--- | :--- | :--- | :--- |
| **A** | `@` (hoặc apex domain) | `123.456.78.90` (IP máy chủ) | Proxy Off (DNS Only) |
| **A** | `*` (wildcard) | `123.456.78.90` (IP máy chủ) | Proxy Off (DNS Only) |
| **CNAME** | `cms` | `@` | Proxy Off (DNS Only) |
| **CNAME** | `admin` | `@` | Proxy Off (DNS Only) |
| **CNAME** | `api` | `@` | Proxy Off (DNS Only) |

> [!IMPORTANT]  
> Bản ghi Wildcard `*` cho phép mọi subdomain dạng `*.platformbds.vn` tự động trỏ về IP máy chủ của bạn mà không gặp bất kỳ gián đoạn nào khi khách hàng đăng ký mới.

---

## 2. Cấu Hình Nginx Reverse Proxy (Production)

Cấu hình Nginx thực hiện nhiệm vụ điều phối và định tuyến các request đến đúng cổng của từng ứng dụng Node/Next.js chạy trên localhost.

### File Cấu Hình: `/etc/nginx/sites-available/platformbds`

```nginx
# ─── 1. API SERVER (api.platformbds.vn) ──────────────────────────────────────
server {
    listen 80;
    server_name api.platformbds.vn;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# ─── 2. SUPER ADMIN PORTAL (admin.platformbds.vn) ─────────────────────────────
server {
    listen 80;
    server_name admin.platformbds.vn;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# ─── 3. CMS PORTAL (cms.platformbds.vn) ───────────────────────────────────────
server {
    listen 80;
    server_name cms.platformbds.vn;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# ─── 4. MARKETPLACE (platformbds.vn / www.platformbds.vn) ───────────────────
server {
    listen 80;
    server_name platformbds.vn www.platformbds.vn;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# ─── 5. WEBSITE RUNTIME WILDCARD & CUSTOM DOMAINS (Mọi subdomain khác) ───────
server {
    listen 80 default_server;
    server_name _; # Bắt tất cả các host còn lại bao gồm cả custom domain của khách

    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 3. Cấu Hình Chứng Chỉ SSL (HTTPS)

### 3.1. SSL Wildcard Cho `*.platformbds.vn` và `platformbds.vn`
Để cấp chứng chỉ SSL bao trùm toàn bộ các subdomain của khách thuê trên platform, chúng ta cần sử dụng phương thức xác thực **DNS-01 challenge** với Certbot.

Chạy lệnh Certbot dưới đây (ví dụ dùng Cloudflare API DNS plugin):
```bash
sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \
  -d platformbds.vn \
  -d "*.platformbds.vn" \
  --preferred-challenges dns-01
```

Sau khi hoàn tất, cấu hình Nginx sẽ liên kết chứng chỉ này cho tất cả server blocks chính và wildcard.

### 3.2. SSL Cho Tên Miền Riêng (Custom Domain) Của Khách Hàng
Khi khách thuê liên kết tên miền riêng (ví dụ: `dinhthuthaodien.com`), quy trình xác minh diễn ra như sau:
1. Khách hàng cấu hình bản ghi `CNAME` hoặc `A` trỏ về `platformbds.vn`.
2. Khách bấm nút **Xác minh DNS** trong CMS.
3. CMS gọi API `/api/website/verify-dns` kiểm tra DNS qua dịch vụ giải tên miền (DNS Resolver).
4. Hệ thống chạy Certbot cấp SSL độc lập bằng phương thức HTTP-01 challenge:
   ```bash
   sudo certbot certonly --webroot -w /var/www/html -d dinhthuthaodien.com
   ```
5. API cập nhật trường `sslStatus` sang `ACTIVE`.

---

## 4. Các Biến Môi Trường Production Quan Trọng

```env
NODE_ENV=production
NEXT_PUBLIC_PLATFORM_DOMAIN=platformbds.vn
PLATFORM_ROOT_DOMAIN=platformbds.vn
NEXT_PUBLIC_API_URL=https://api.platformbds.vn
INTERNAL_API_TOKEN=super-secure-internal-communication-token
DATABASE_URL=postgresql://postgres:password@db-host:5432/real_estate_platform?schema=public
```

---

## 5. Quy Trình Khôi Phục & Rollback Khi Gặp Lỗi SSL/Domain
1. Nếu chứng chỉ Wildcard hết hạn hoặc lỗi: Tạm thời chuyển toàn bộ traffic SSL về TLS dự phòng thông qua CDN (Cloudflare Proxy) trong khi chạy lại Certbot.
2. Nếu Custom Domain bị trỏ sai hoặc lỗi: Đảm bảo khách thuê vẫn có thể truy cập website qua subdomain mặc định `{slug}.platformbds.vn` bằng cách cập nhật trường `customDomain` về `null` trong database.

---

## 6. Hướng Dẫn Hai Chế Độ Triển Khai Cho Khách Hàng (Managed vs Standalone)

Khách hàng sau khi sở hữu template hoặc landing page có thể lựa chọn 1 trong 2 mô hình triển khai:

### Chế độ A: Triển khai Managed trên GitHub & Vercel (Kết nối CMS Nền Tảng)
- **Mục đích:** Khách hàng muốn sử dụng hạ tầng Cloud siêu tốc của Vercel (hoặc Netlify) nhưng vẫn quản lý nội dung dễ dàng thông qua **CMS Nền Tảng**.
- **Cách thức hoạt động:**
  1. Khách hàng kết nối repository mã nguồn website với Vercel.
  2. Trong mục **Environment Variables** trên Vercel, cấu hình các biến sau:
     ```env
     NEXT_PUBLIC_API_URL=https://bds-template-api.onrender.com
     SITE_SLUG=ten-subdomain-cua-ban
     SITE_PUBLIC_KEY=site_pub_xxxxxxxxxxxxxxxxxxxx
     ```
  3. **Đồng bộ nội dung:** Mỗi khi khách hàng sửa tiêu đề, hình ảnh, dự án hay bảng giá trên CMS Nền Tảng, website Vercel sẽ tự động fetch nội dung mới nhất qua API.
  4. **Thu thập khách hàng (CRM):** Khách truy cập điền form liên hệ trên website Vercel, dữ liệu được chuyển thẳng vào CRM của khách trong CMS (`/leads`) kèm thông báo realtime.

### Chế độ B: Triển khai Độc lập (Standalone Package - PHP/MySQL/HTML5 hoặc Next.js Standalone)
- **Mục đích:** Khách hàng muốn sở hữu toàn bộ mã nguồn trọn gói, tự lưu trữ trên Hosting cPanel, XAMPP, VPS hoặc máy chủ riêng của doanh nghiệp.
- **Cách thức hoạt động:**
  1. Vào **Customer Dashboard** > **Tải Mã Nguồn ZIP**.
  2. Gói ZIP tải về chứa:
     - Toàn bộ source code giao diện chuẩn HTML5/CSS3/JS hoặc Next.js Standalone.
     - Thư mục backend PHP xử lý form liên hệ và kết nối database.
     - File `database.sql` định dạng sẵn schema và dữ liệu mẫu đầy đủ 100%.
  3. Khách hàng import `database.sql` vào phpMyAdmin trên Hosting cPanel, cấu hình `config.php` với thông tin DB.
  4. **Lưu ý quan trọng:** Chế độ Standalone hoạt động hoàn toàn độc lập, tách biệt khỏi hệ thống máy chủ của Nền tảng. Khách hàng tự chịu trách nhiệm sao lưu dữ liệu và bảo trì hosting của mình.

