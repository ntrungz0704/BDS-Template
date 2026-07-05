# 10. Deployment Architecture

> Tài liệu này mô tả chi tiết kiến trúc triển khai thực tế (Production Deployment Architecture) cho dự án Real Estate Template Marketplace & SaaS Platform trên môi trường VPS chạy hệ điều hành Ubuntu Server 24.04.

---

## 1. Sơ đồ kiến trúc triển khai (Infrastructure Diagram)

```mermaid
graph TD
    User([Khách hàng truy cập]) -->|HTTPS| CF[Cloudflare DNS, CDN & WAF]
    CF -->|Port 443| NGINX[Nginx Reverse Proxy]
    
    subgraph VPS_Docker_Compose [VPS Ubuntu Server 24.04 - Docker Network]
        NGINX -->|Subdomain routing| MP[Next.js Marketplace App - Port 3000]
        NGINX -->|cms.domain.com| CMS[Next.js CMS App - Port 3001]
        NGINX -->|admin.domain.com| ADM[Next.js Super Admin App - Port 3002]
        NGINX -->|*.domain.com| WS[Next.js Website App - Port 3003]
        NGINX -->|/api/*| API[Express.js Backend API - Port 5000]
        
        API -->|Database connection| DB[(PostgreSQL Database - Port 5432)]
        API -->|Session & Cache| REDIS[(Redis Cache - Port 6379)]
    end
    
    API -->|Upload Media| Cloudinary[Cloudinary Cloud Storage]
    API -->|Send Emails| Gmail[Gmail SMTP / Resend API]
```

---

## 2. Cấu hình máy chủ VPS đề xuất

Hệ thống được thiết kế tối giản đóng gói Docker nên cấu hình đề xuất như sau để phục vụ quy mô Phase 1 và Phase 2 (chạy mượt mà ~100 tenant websites tĩnh có traffic vừa phải):

| Hạng mục | Thông số kỹ thuật | Ghi chú |
|---|---|---|
| **Hệ điều hành** | Ubuntu Server 24.04 LTS | Phiên bản ổn định mới nhất |
| **CPU** | 2 vCPU | Khuyên dùng dòng Compute-Optimized |
| **RAM** | 4 GB RAM | Có cấu hình swap file 2GB dự phòng |
| **Lưu trữ** | 80 GB SSD NVMe | Tốc độ đọc ghi cao cho DB |
| **Băng thông** | Không giới hạn hoặc 2TB/tháng | Đặt sau CDN Cloudflare giảm 80% tải băng thông thực |

---

## 3. Cấu hình Docker Compose (`docker-compose.yml`)

Dưới đây là file cấu hình đóng gói toàn bộ hệ thống trên VPS:

```yaml
version: '3.8'

services:
  # Database PostgreSQL
  postgres:
    image: postgres:16-alpine
    container_name: re-postgres
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: securepassword
      POSTGRES_DB: real_estate_platform
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - re-network

  # Redis Cache & Session
  redis:
    image: redis:7-alpine
    container_name: re-redis
    restart: always
    command: redis-server --save 60 1 --loglevel warning
    volumes:
      - redisdata:/data
    ports:
      - "6379:6379"
    networks:
      - re-network

  # Express Backend API
  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: re-backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:securepassword@postgres:5432/real_estate_platform?schema=public
      - PORT=5000
      - NODE_ENV=production
      - JWT_ACCESS_SECRET=your_jwt_access_secret_key
      - JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
      - CLOUDINARY_CLOUD_NAME=your_cloud_name
      - CLOUDINARY_API_KEY=your_api_key
      - CLOUDINARY_API_SECRET=your_api_secret
    depends_on:
      - postgres
      - redis
    networks:
      - re-network

  # Next.js Apps (Marketplace, CMS, Admin, Website)
  marketplace:
    build:
      context: .
      dockerfile: docker/Dockerfile.marketplace
    container_name: re-marketplace
    restart: always
    ports:
      - "3000:3000"
    networks:
      - re-network

  cms:
    build:
      context: .
      dockerfile: docker/Dockerfile.cms
    container_name: re-cms
    restart: always
    ports:
      - "3001:3000"
    networks:
      - re-network

  admin:
    build:
      context: .
      dockerfile: docker/Dockerfile.admin
    container_name: re-admin
    restart: always
    ports:
      - "3002:3000"
    networks:
      - re-network

  website:
    build:
      context: .
      dockerfile: docker/Dockerfile.website
    container_name: re-website
    restart: always
    ports:
      - "3003:3000"
    networks:
      - re-network

networks:
  re-network:
    driver: bridge

volumes:
  pgdata:
    driver: local
  redisdata:
    driver: local
```

---

## 4. Cấu hình Nginx Reverse Proxy (Wildcard Routing)

Nginx đóng vai trò tiếp nhận kết nối ngoài, giải mã SSL Let's Encrypt và điều tuyến dựa trên Host Header của HTTP request:

```nginx
# Cấu hình cache tài sản tĩnh
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=STATIC:10m inactive=7d use_temp_path=off;

# 1. Chuyển HTTP sang HTTPS
server {
    listen 80;
    server_name myplatform.com *.myplatform.com;
    return 301 https://$host$request_uri;
}

# 2. Trang Marketplace chính (www.myplatform.com)
server {
    listen 443 ssl http2;
    server_name myplatform.com www.myplatform.com;

    ssl_certificate /etc/letsencrypt/live/myplatform.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myplatform.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 3. Trang CMS quản trị cho Tenant (cms.myplatform.com)
server {
    listen 443 ssl http2;
    server_name cms.myplatform.com;

    ssl_certificate /etc/letsencrypt/live/myplatform.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myplatform.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# 4. Trang Super Admin hệ thống (admin.myplatform.com)
server {
    listen 443 ssl http2;
    server_name admin.myplatform.com;

    ssl_certificate /etc/letsencrypt/live/myplatform.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myplatform.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# 5. Định tuyến subdomain động cho từng website BĐS của Tenant (*.myplatform.com)
server {
    listen 443 ssl http2;
    server_name *.myplatform.com;

    ssl_certificate /etc/letsencrypt/live/myplatform.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myplatform.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3003;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 5. Cấu hình Cloudflare & Let's Encrypt Wildcard SSL

Để hỗ trợ SSL cho toàn bộ subdomain động tự tạo của khách hàng (`*.myplatform.com`) mà không bị lỗi trình duyệt cảnh báo bảo mật, ta cần chứng chỉ SSL Wildcard:
1. **Cloudflare DNS:** Cấu hình 2 bản ghi:
   - Bản ghi `A` trỏ `myplatform.com` về IP của VPS (Proxy status: Orange Cloud - Active).
   - Bản ghi `CNAME` trỏ `*.myplatform.com` về `myplatform.com` (Wildcard DNS).
2. **Let's Encrypt Wildcard Certificate:** 
   - Trên VPS chạy certbot xác thực qua DNS Challenge (liên kết API token Cloudflare) để xin cấp chứng chỉ SSL cho cả domain chính và wildcard domain:
     ```bash
     sudo certbot certonly --dns-cloudflare --dns-cloudflare-credentials ~/.secrets/cloudflare.ini -d myplatform.com -d *.myplatform.com
     ```
   - Lập lịch cron job tự động gia hạn chứng chỉ SSL mỗi 60 ngày.
