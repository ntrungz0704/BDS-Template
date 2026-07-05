# 16. Detailed Task Breakdown

> Tài liệu này phân rã toàn bộ dự án Real Estate Template Marketplace & SaaS Platform thành danh sách 72 tác vụ (tasks) chi tiết từ khâu thiết lập ban đầu đến khi triển khai sản xuất. Các task được sắp xếp theo thứ tự phụ thuộc logic (dependency order), đảm bảo mỗi task có khối lượng từ 2 đến 8 giờ làm việc, thích hợp cho mô hình AI-assisted development.

---

## Danh sách phân rã Task chi tiết

| ID | Tên Tác Vụ (Task Name) | Phân Loại (Category) | Phụ Thuộc (Dependencies) | Ước Tính (Hours) | Phase | Ưu Tiên (Priority) |
|---|---|---|---|---|---|---|
| **TS-01** | Thiết lập cấu trúc Monorepo (pnpm-workspace, tsconfig, eslint, prettier) | Setup | Không có | 4 | Phase 1 | P0 |
| **TS-02** | Tạo database PostgreSQL trên local / Docker và cấu hình Prisma ORM | Setup | TS-01 | 3 | Phase 1 | P0 |
| **TS-03** | Khởi tạo 4 dự án Next.js (marketplace, cms, website, admin) trong Monorepo | Setup | TS-01 | 6 | Phase 1 | P0 |
| **TS-04** | Thiết lập dự án Backend Express.js với TypeScript trong Monorepo | Setup | TS-01 | 4 | Phase 1 | P0 |
| **DB-01** | Viết Prisma Schema định nghĩa đầy đủ các bảng dữ liệu (User, Tenant, Project, Post, Order...) | Database | TS-02 | 6 | Phase 1 | P0 |
| **DB-02** | Chạy Prisma Migration để đồng bộ cấu trúc bảng vào PostgreSQL | Database | DB-01 | 2 | Phase 1 | P0 |
| **DB-03** | Viết Script Seed dữ liệu mẫu (Prisma Seed) sinh 3 tenant, 20 dự án, 20 bài viết, 10 banner | Database | DB-02 | 4 | Phase 1 | P0 |
| **BE-01** | Xây dựng cấu trúc boilerplate Express API (Router, Controller, Service, Middleware) | Backend | TS-04 | 4 | Phase 1 | P0 |
| **BE-02** | Thiết lập hệ thống Middleware xử lý lỗi tập trung và Logger (Winston) | Backend | BE-01 | 3 | Phase 1 | P0 |
| **BE-03** | Xây dựng API Đăng ký tài khoản (Hashing bcrypt, lưu DB) | Backend | BE-01, DB-02 | 4 | Phase 1 | P0 |
| **BE-04** | Xây dựng API Đăng nhập cấp phát Access Token (Cookie) & Refresh Token (DB) | Backend | BE-03 | 5 | Phase 1 | P0 |
| **BE-05** | Xây dựng Middleware xác thực JWT và kiểm tra phân quyền (Auth Middleware) | Backend | BE-04 | 3 | Phase 1 | P0 |
| **BE-06** | Xây dựng API Refresh Token xoay vòng (Token Rotation) và Đăng xuất (Logout) | Backend | BE-04, BE-05 | 4 | Phase 1 | P0 |
| **BE-07** | Xây dựng Middleware kiểm tra và cô lập dữ liệu theo Tenant (Tenant Isolation Middleware) | Backend | BE-05 | 4 | Phase 1 | P0 |
| **BE-08** | Xây dựng bộ API Marketplace công khai (Lấy danh sách template, chi tiết template) | Backend | BE-01 | 4 | Phase 1 | P0 |
| **BE-09** | Xây dựng API Đăng ký Mua/Thuê (Tạo Order dạng PENDING) | Backend | BE-05, BE-08 | 4 | Phase 1 | P0 |
| **BE-10** | Xây dựng API Gửi bằng chứng thanh toán (Upload ảnh bill lên Cloudinary + điền mã GD) | Backend | BE-09 | 4 | Phase 1 | P0 |
| **BE-11** | Xây dựng API CMS cho Tenant: CRUD Dự án BĐS (Đầy đủ 27 trường dữ liệu) | Backend | BE-07 | 6 | Phase 1 | P0 |
| **BE-12** | Xây dựng API CMS cho Tenant: CRUD Bài viết tin tức | Backend | BE-07 | 4 | Phase 1 | P0 |
| **BE-13** | Xây dựng API CMS cho Tenant: Cấu hình thông tin công ty | Backend | BE-07 | 3 | Phase 1 | P0 |
| **BE-14** | Xây dựng API Super Admin: Danh sách & Duyệt đơn hàng thanh toán (Duyệt -> Kích hoạt) | Backend | BE-05 | 6 | Phase 1 | P0 |
| **BE-15** | Xây dựng API Super Admin: Quản lý danh sách Tenant (Active, Suspended) | Backend | BE-05 | 4 | Phase 1 | P0 |
| **BE-16** | Xây dựng API Super Admin: Quản lý danh sách User hệ thống | Backend | BE-05 | 4 | Phase 1 | P0 |
| **BE-17** | Tích hợp thư viện Nodemailer và Gmail SMTP gửi mail kích hoạt tự động | Backend | BE-14 | 4 | Phase 1 | P0 |
| **FTM-01** | Cấu hình TailwindCSS, Theme Luxury Gold, Fonts (Playfair Display, Inter) cho Marketplace | Frontend-Marketplace | TS-03 | 4 | Phase 1 | P0 |
| **FTM-02** | Thiết kế Layout chung Marketplace (Header, Footer, Navigation, Responsive) | Frontend-Marketplace | FTM-01 | 5 | Phase 1 | P0 |
| **FTM-03** | Thiết kế Trang chủ Marketplace (Hero, Features, Pricing Table, CTA) | Frontend-Marketplace | FTM-02 | 6 | Phase 1 | P0 |
| **FTM-04** | Thiết kế Trang danh sách Template BĐS (Lưới danh sách, Bộ lọc phong cách) | Frontend-Marketplace | FTM-02 | 4 | Phase 1 | P0 |
| **FTM-05** | Thiết kế Trang chi tiết Template (Mô tả, Ảnh chụp, Giá bán, Nút CTA mua/thuê) | Frontend-Marketplace | FTM-02 | 5 | Phase 1 | P0 |
| **FTM-06** | Xây dựng Form Đăng ký mua/thuê và kết nối API gửi đơn hàng | Frontend-Marketplace | FTM-05, BE-09 | 5 | Phase 1 | P0 |
| **FTM-07** | Thiết kế Màn hình hiển thị thông tin chuyển khoản và Form upload ảnh bill | Frontend-Marketplace | FTM-06, BE-10 | 4 | Phase 1 | P0 |
| **FTM-08** | Thiết kế Trang Đăng ký / Đăng nhập tài khoản dùng chung | Frontend-Marketplace | FTM-02, BE-04 | 5 | Phase 1 | P0 |
| **FTC-01** | Thiết lập cấu trúc giao diện CMS Admin cho Tenant (Sidebar, Header, Main Layout) | Frontend-CMS | TS-03 | 4 | Phase 1 | P0 |
| **FTC-02** | Xây dựng Dashboard CMS hiển thị thống kê nhanh (Dự án, Bài viết, Lượt xem) | Frontend-CMS | FTC-01, BE-11 | 4 | Phase 1 | P0 |
| **FTC-03** | Xây dựng Giao diện Danh sách Dự án BĐS (Bảng dữ liệu, Phân trang, Lọc trạng thái) | Frontend-CMS | FTC-01, BE-11 | 5 | Phase 1 | P0 |
| **FTC-04** | Xây dựng Form Thêm mới / Sửa Dự án BĐS (Tích hợp upload ảnh, Zod validation) | Frontend-CMS | FTC-03 | 8 | Phase 1 | P0 |
| **FTC-05** | Xây dựng Giao diện Danh sách Bài viết và Form viết bài | Frontend-CMS | FTC-01, BE-12 | 6 | Phase 1 | P0 |
| **FTC-06** | Xây dựng Trang cập nhật Thông tin Công ty của Tenant | Frontend-CMS | FTC-01, BE-13 | 4 | Phase 1 | P0 |
| **FTW-01** | Xây dựng Layout chung và CSS Variables cho dự án Tenant Website | Frontend-Website | TS-03 | 4 | Phase 1 | P0 |
| **FTW-02** | Phát triển Template 1: Luxury Gold (Giao diện trang chủ luxury, khối banner, dự án nổi bật) | Frontend-Website | FTW-01 | 8 | Phase 1 | P0 |
| **FTW-03** | Thiết kế Trang danh sách dự án BĐS của tenant (Lưới căn hộ, biệt thự, phân bộ lọc) | Frontend-Website | FTW-02 | 6 | Phase 1 | P0 |
| **FTW-04** | Thiết kế Trang chi tiết dự án BĐS (Gallery ảnh, thông số kỹ thuật, bản đồ, form liên hệ) | Frontend-Website | FTW-02 | 7 | Phase 1 | P0 |
| **FTW-05** | Thiết kế Trang tin tức/blog và Trang chi tiết bài viết của tenant website | Frontend-Website | FTW-02 | 5 | Phase 1 | P0 |
| **FTW-06** | Thiết kế Trang giới thiệu (About) và Trang liên hệ (Contact) của tenant | Frontend-Website | FTW-02 | 4 | Phase 1 | P0 |
| **FTA-01** | Xây dựng Giao diện Dashboard Super Admin hệ thống (Platform Admin) | Frontend-Admin | TS-03 | 5 | Phase 1 | P0 |
| **FTA-02** | Xây dựng Trang phê duyệt đơn hàng (Xem chi tiết, Xem ảnh bill, Nút Approve/Reject) | Frontend-Admin | FTA-01, BE-14 | 6 | Phase 1 | P0 |
| **FTA-03** | Xây dựng Trang quản lý Tenants và Trang quản lý Users hệ thống | Frontend-Admin | FTA-01, BE-15 | 5 | Phase 1 | P0 |
| **INT-01** | Viết Middleware xử lý Routing subdomain động ở Next.js Website | Integration | FTW-01 | 6 | Phase 1 | P0 |
| **INT-02** | Tích hợp luồng nạp cấu hình Theme động dựa trên Tenant cấu hình từ DB | Integration | INT-01 | 5 | Phase 1 | P0 |
| **DEP-01** | Viết Dockerfiles cho Backend API và các ứng dụng Next.js | Deployment | TS-01 | 4 | Phase 1 | P0 |
| **DEP-02** | Viết file docker-compose.yml kết nối API, Next.js, PostgreSQL và Nginx | Deployment | DEP-01 | 4 | Phase 1 | P0 |
| **DEP-03** | Cấu hình Nginx Reverse Proxy xử lý subdomain động và trỏ SSL Let's Encrypt | Deployment | DEP-02 | 5 | Phase 1 | P0 |
| **DEP-04** | Triển khai ứng dụng lên VPS, chạy cấu hình Cloudflare và kiểm thử khép kín | Deployment | DEP-03 | 6 | Phase 1 | P0 |
| **BE-18** | Xây dựng API khởi tạo và quản lý phiên thử nghiệm Demo (Demo Session) | Backend | BE-04 | 5 | Phase 2 | P1 |
| **BE-19** | Xây dựng cơ chế tự động đếm ngược thời gian thử nghiệm và giới hạn 3 lần lưu | Backend | BE-18 | 5 | Phase 2 | P1 |
| **BE-20** | Xây dựng API CMS Tenant: Quản lý Banner slider của website | Backend | BE-07 | 4 | Phase 2 | P1 |
| **BE-21** | Xây dựng API CMS Tenant: Quản lý cấu trúc Menu điều hướng (MenuItem CRUD) | Backend | BE-07 | 5 | Phase 2 | P1 |
| **BE-22** | Xây dựng API CMS Tenant: Quản lý danh sách liên hệ khách hàng gửi về (Contact Submissions) | Backend | BE-07 | 4 | Phase 2 | P1 |
| **BE-23** | Tích hợp thư viện Resend API thay thế cho SMTP Gmail | Backend | BE-17 | 4 | Phase 2 | P1 |
| **BE-24** | Xây dựng API kết nối Cloudflare xác thực DNS và map Custom Domain | Backend | BE-07 | 8 | Phase 2 | P2 |
| **FTC-07** | Phát triển module Quản lý Banner slider (Kéo thả sắp xếp thứ tự hiển thị) | Frontend-CMS | FTC-01, BE-20 | 5 | Phase 2 | P1 |
| **FTC-08** | Phát triển bộ dựng Menu (Menu Builder) dạng cây thư mục lồng nhau | Frontend-CMS | FTC-01, BE-21 | 6 | Phase 2 | P1 |
| **FTC-09** | Xây dựng Giao diện xem danh sách Form Liên hệ gửi về của khách hàng | Frontend-CMS | FTC-01, BE-22 | 4 | Phase 2 | P1 |
| **FTC-10** | Tích hợp Popup hiển thị cảnh báo chặn lưu khi dùng thử Demo hết hạn | Frontend-CMS | BE-19 | 4 | Phase 2 | P1 |
| **FTW-07** | Phát triển Template 2: Modern Dark (Giao diện tối sang trọng, màu neon vàng/xanh) | Frontend-Website | FTW-01 | 8 | Phase 2 | P1 |
| **FTW-08** | Phát triển Template 3: Minimal White (Giao diện tối giản trắng tinh tế, font chữ Outfit) | Frontend-Website | FTW-01 | 8 | Phase 2 | P1 |
| **FTW-09** | Tích hợp hiển thị Banner động và Menu động từ CMS lên các Template | Frontend-Website | FTW-02, BE-20 | 5 | Phase 2 | P1 |
| **FTA-04** | Xây dựng giao diện cấu hình giá trị mặc định cho 3 Templates hệ thống | Frontend-Admin | FTA-01 | 4 | Phase 2 | P1 |
| **FTA-05** | Thiết kế module cấu hình và phê duyệt Custom Domain cho Tenants | Frontend-Admin | FTA-03, BE-24 | 6 | Phase 2 | P2 |
| **DEP-05** | Thiết lập luồng CI/CD tự động build Docker image qua GitHub Actions | Deployment | DEP-02 | 6 | Phase 2 | P1 |
| **TST-01** | Viết unit tests cho các hàm xử lý dữ liệu và integration tests cho luồng thanh toán | Testing | BE-14 | 8 | Phase 1 | P1 |
| **TST-02** | Thực hiện chạy thử nghiệm tải hệ thống (Load Test) và tối ưu điểm Lighthouse | Testing | DEP-04 | 6 | Phase 1 | P1 |

---

## Tóm tắt thời lượng thực hiện ước tính

- **Tổng số Tác vụ:** 72 tasks.
- **Tổng số giờ ước tính:** **368 giờ**.
- **Quy đổi (mô hình 1 Dev):** ~46 ngày làm việc (nếu làm 8h/ngày).
- **Với AI-assisted development (Tốc độ x4):** ~92 giờ thực tế → Phân bổ thành 2 Phase độc lập, mỗi Phase chạy liên tục trong 7 ngày (7 ngày x 13 giờ/ngày = 91 giờ). Hoàn toàn khả thi và thực tế.
