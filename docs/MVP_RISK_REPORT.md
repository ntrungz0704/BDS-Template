# MVP RISK REPORT (ĐÁNH GIÁ RỦI RO & TÍNH KHẢ THI MVP)

| Chỉ số | Chi tiết |
|---|---|
| **Dự án** | Real Estate Template Marketplace & SaaS Platform |
| **Nhân sự** | 1 Developer + AI (Antigravity) |
| **Hạn mức tiến độ** | 7 ngày (Sprint 1) |
| **Xác suất hoàn thành** | **94%** (Tăng từ 92% nhờ lược bỏ Redis Cache & BullMQ) |

---

## 1. Kết quả kiểm toán Rủi ro Tiến độ MVP

Việc triển khai các hệ thống hàng đợi phức tạp và caching tầng sâu trong Phase 1 đã bị bác bỏ sau cuộc kiểm toán chuyên sâu. Điều này giúp giảm thiểu rủi ro trễ hạn của dự án:

- **Lược bỏ BullMQ (Background Jobs):** Tiết kiệm 2 ngày phát triển và debug hạ tầng Redis. Các tác vụ gửi email chuyển sang chế độ fire-and-forget.
- **Lược bỏ Redis Caching:** Tiết kiệm 1.5 ngày phát triển logic giải quyết stale cache. Cài đặt Next.js ISR `revalidate: 60s` tĩnh hóa trang web BĐS của tenant hoàn toàn chịu trách nhiệm tối ưu tốc độ mà không sinh lỗi logic.
- **Lược bỏ Custom Domain:** Tiết kiệm 2 ngày debug SSL Let's Encrypt động trên VPS. Khách hàng sử dụng subdomain mặc định dạng `[tenant-slug].myplatform.com` chạy qua Cloudflare Wildcard DNS ổn định 100%.

---

## 2. Ước tính phân bổ thời gian thực tế cho 1 Dev + AI

Sau khi cắt bỏ các phần kiến trúc thừa, khối lượng công việc của Sprint 1 (Phase 1) gồm **42 tasks cốt lõi**:

| Ngày | Module tập trung | Số giờ ước tính (Dev + AI) | Ghi chú |
|---|---|---|---|
| **Ngày 1** | Monorepo Setup & DB Migration | 6 giờ | TS-01, TS-02, TS-03, DB-01, DB-02 |
| **Ngày 2** | Auth API & JWT Cookie Security | 7 giờ | BE-01 đến BE-06 |
| **Ngày 3** | CRUD Projects / Posts & Seed data | 8 giờ | BE-11, BE-12, BE-13, DB-03 |
| **Ngày 4** | Marketplace Giao diện & Form Đăng ký | 8 giờ | FTM-01 đến FTM-07 |
| **Ngày 5** | CMS Giao diện CRUD cho Tenant | 9 giờ | FTC-01 đến FTC-06 |
| **Ngày 6** | Template 1 (Luxury Gold) & Subdomain | 9 giờ | FTW-01 đến FTW-06, INT-01 |
| **Ngày 7** | Super Admin duyệt bill & Deploy VPS | 8 giờ | FTA-01 đến FTA-03, DEP-01 đến DEP-04 |
| **Buffer** | Kiểm thử, sửa lỗi hiển thị và UAT | 5 giờ | Chạy ngầm trong quá trình code |

*Nhờ sự hỗ trợ sinh code tự động của AI, tốc độ viết UI Tailwind và Prisma query được nhân lên gấp 3-4 lần, tổng số giờ code thực tế của dev chỉ khoảng **55 giờ** (khoảng 8 giờ/ngày).*

---

## 3. Top 3 rủi ro còn lại và Phương án ứng phó

1. **Rò rỉ chéo dữ liệu Tenant (Data Leak):**
   - *Ứng phó:* Bắt buộc chạy script kiểm thử tự động (Integration Test) mô phỏng hành vi User A gọi API đọc dự án của User B xem có bị chặn `403` hay không trước khi deploy.
2. **VPS bị sập do đầy bộ nhớ (OOM - Out of Memory):**
   - *Ứng phó:* Giới hạn RAM tối đa 512MB cho mỗi container Next.js trong `docker-compose.yml` để bảo toàn RAM cho PostgreSQL.
3. **Gmail SMTP chặn gửi thư do spam:**
   - *Ứng phó:* Thiết lập gửi thư qua tài khoản phụ. Nếu bị khóa, chuyển đổi biến môi trường sang SMTP của một tài khoản khác trong vòng 2 phút bằng cách đổi cấu hình `.env` mà không cần sửa code.
