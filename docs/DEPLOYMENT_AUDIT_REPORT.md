# DEPLOYMENT AUDIT REPORT (CHUYÊN SÂU)

| Chỉ số | Chi tiết |
|---|---|
| **Dự án** | Real Estate Template Marketplace & SaaS Platform |
| **Vai trò kiểm toán** | Solution Architect & Lead DevOps Engineer |
| **Trạng thái kiểm toán** | **PASSED WITH PATCHES** |

---

## 1. Kết quả kiểm toán cấu hình Triển khai & Vận hành

### 1.1 Quản lý kết nối Database (Database Connection Pool)
- **Đánh giá:** **VALID (Cấu hình tự động)**.
- **Chi tiết:** 
  - Prisma ORM tự động quản lý Connection Pool cho PostgreSQL. 
  - Tuy nhiên, để tránh lỗi cạn kiệt kết nối (Max Connections) khi chạy 4 ứng dụng Next.js kết nối trực tiếp, cần định nghĩa rõ tham số `connection_limit` trong biến môi trường `DATABASE_URL` tại file `.env` chạy Docker Compose:
    ```env
    DATABASE_URL="postgresql://postgres:securepassword@postgres:5432/real_estate_platform?schema=public&connection_limit=15"
    ```

### 1.2 Docker Healthcheck (Kiểm tra trạng thái tự động)
- **Đánh giá:** **VALID**.
- **Chi tiết:** Cần cấu hình `healthcheck` trong `docker-compose.yml` để Docker tự khởi động lại các container API Express hoặc Next.js nếu chúng bị crash treo ngầm hoặc rò rỉ bộ nhớ (Memory Leak).
- **Patch đề xuất:** Cập nhật block `backend` trong `docker-compose.yml`:
  ```yaml
  backend:
    # ... các cấu hình khác
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
  ```

### 1.3 Graceful Shutdown (Đóng tiến trình êm đẹp)
- **Đánh giá:** **VALID**.
- **Chi tiết:** Khi Docker Compose restart hoặc deploy phiên bản mới, Docker gửi tín hiệu `SIGTERM` tới tiến trình Node.js. Nếu không xử lý, Node.js sẽ bị ngắt đột ngột (killed) trong vòng 10 giây, gây lỗi đứt gãy các transaction ghi DB đang dở dang.
- **Giải pháp:** Viết code xử lý đón nhận tín hiệu kết thúc trong file entrypoint `server.ts` của Express API:
  ```typescript
  const server = app.listen(PORT, () => { ... });
  
  process.on('SIGTERM', () => {
    logger.info('Nhận tín hiệu SIGTERM. Đang tiến hành đóng cổng kết nối êm đẹp...');
    server.close(async () => {
      logger.info('Đã đóng cổng HTTP Express.');
      await prisma.$disconnect();
      logger.info('Đã ngắt kết nối PostgreSQL. Tiến trình kết thúc an toàn.');
      process.exit(0);
    });
  });
  ```

### 1.4 Giám sát & Logs phức tạp (Sentry, Loki, Grafana - Điểm 13)
- **Đánh giá:** **INVALID cho Phase 1 (Bắt buộc dời sang Phase 2)**.
- **Lý do:**
  - Tích hợp Sentry yêu cầu đăng ký tài khoản Cloud, nạp SDK và sinh file sourcemaps khi build.
  - Cấu hình Promtail + Loki + Grafana để gom log Docker chiếm dụng nhiều RAM của VPS (có thể ngốn mất 1.5GB RAM trên gói VPS 4GB RAM), tăng nguy cơ PostgreSQL bị sập do thiếu bộ nhớ (Out Of Memory).
- **Giải pháp cho MVP Phase 1:**
  - Sử dụng Docker log mặc định: `docker compose logs --tail=100 -f backend`
  - Winston ghi log lỗi ra file cục bộ nằm trên thư mục mount của VPS (`/var/log/app/error.log`) để dev truy cập trực tiếp qua SSH.

---

## 2. Khóa cấu hình Triển khai Patch

- Kích hoạt Docker healthcheck cho Postgres, API, và Website.
- Tích hợp Graceful Shutdown vào API Backend.
- Cấu hình Cloudflare SSL ở chế độ **Full** (hoặc **Full Strict**) trên trang quản trị.
