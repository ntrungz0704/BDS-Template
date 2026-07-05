# 09. Sequence Diagrams

> Tài liệu này mô tả chi tiết các biểu đồ trình tự (Sequence Diagrams) biểu diễn các tương tác kỹ thuật ở mức độ sâu giữa Client, Next.js Middleware, Express Backend API, PostgreSQL Database và các dịch vụ bên thứ ba (Cloudinary, Email).

---

## 1. Cơ chế xác thực Token kép & Refresh Token Rotation

Quy trình quản lý phiên đăng nhập an toàn, bảo vệ Access Token trong cookie httpOnly và tự động cấp lại thông qua Refresh Token.

```mermaid
sequenceDiagram
    autonumber
    actor User as Khách hàng / Admin
    participant Client as Web Browser
    participant API as Express API Server
    participant DB as PostgreSQL Database

    User->>Client: Nhập email, mật khẩu & bấm Đăng nhập
    Client->>API: POST /api/auth/login {email, password}
    API->>DB: Truy vấn User theo email
    DB-->>API: Trả về thông tin User (Password Hash)
    
    API->>API: Kiểm tra mật khẩu (bcrypt.compare)
    
    rect rgb(240, 240, 240)
        Note over API,DB: Tạo phiên đăng nhập mới
        API->>API: Tạo Access Token (JWT - sống 15 phút)
        API->>API: Tạo Refresh Token (Random String)
        API->>DB: Lưu Refresh Token vào bảng RefreshToken (sống 7 ngày)
        DB-->>API: Xác nhận lưu thành công
    end

    API-->>Client: Trả về 200 OK + Thiết lập 2 Cookies (Access Token & Refresh Token - httpOnly, secure)
    Client-->>User: Đăng nhập thành công, chuyển hướng vào Dashboard

    Note over Client,API: Sau 15 phút, Access Token hết hạn
    Client->>API: Gửi request bất kỳ kèm Access Token cũ
    API-->>Client: Trả về 401 Unauthorized (Token Expired)

    Note over Client,API: Tự động chạy cơ chế Refresh Token
    Client->>API: POST /api/auth/refresh (Tự động đính kèm Refresh Token từ cookie)
    API->>DB: Truy vấn tìm dòng chứa Refresh Token
    DB-->>API: Trả về bản ghi RefreshToken
    
    API->>API: Xác thực thời hạn sống của Refresh Token
    
    rect rgb(230, 240, 250)
        Note over API,DB: Thu hồi Refresh Token cũ & Xoay vòng cấp mới (Rotation)
        API->>DB: Xóa / Revoke Refresh Token cũ
        API->>API: Tạo Access Token mới (15 phút)
        API->>API: Tạo Refresh Token mới (7 ngày)
        API->>DB: Lưu Refresh Token mới vào DB
        DB-->>API: Xác nhận thành công
    end

    API-->>Client: Trả về 200 OK + Đè 2 Cookies mới
    Client->>API: Thực hiện lại request bị lỗi trước đó với Access Token mới
    API-->>Client: Trả về dữ liệu thành công
```

---

## 2. Định tuyến Subdomain động và nạp Selected Theme (SSR Website Load)

Quy trình Next.js Middleware chặn request, phân tích subdomain của tenant, nạp dữ liệu cấu hình giao diện và render phía Server (SSR) để tối ưu điểm SEO.

```mermaid
sequenceDiagram
    autonumber
    actor Visitor as Khách xem trang BĐS
    participant DNS as Cloudflare DNS
    participant Proxy as Nginx Reverse Proxy
    participant Mid as Next.js Middleware (Website App)
    participant API as Express API Server
    participant DB as PostgreSQL Database

    Visitor->>DNS: Nhập địa chỉ hoanggialand.myplatform.com
    DNS-->>Visitor: Phản hồi IP máy chủ VPS (trỏ wildcard)
    Visitor->>Proxy: Gửi request GET /projects/the-grand-riverside
    
    Proxy->>Proxy: Nhận diện domain dạng *.myplatform.com
    Proxy->>Mid: Chuyển tiếp request đến Next.js Website App (Port 3003)
    
    Mid->>Mid: Phân tích Host Header lấy ra slug "hoanggialand"
    
    Mid->>API: Gửi request nội bộ GET /api/website/hoanggialand/projects/the-grand-riverside
    API->>DB: Truy vấn thông tin Tenant & Dự án (Lọc theo tenantId & slug)
    DB-->>API: Trả về dữ liệu Dự án + Màu sắc chủ đạo (Theme config) của Tenant
    API-->>Mid: Trả về dữ liệu JSON của dự án BĐS & Cấu hình giao diện (Gold theme)
    
    Mid->>Mid: Nạp dữ liệu vào Template 1 Component
    Mid->>Mid: Áp dụng CSS variables màu sắc (Primary = #C5A572)
    Mid->>Mid: SSR Compile tạo file HTML hoàn chỉnh chứa dữ liệu BĐS và meta tags SEO
    
    Mid-->>Proxy: Trả về HTML tĩnh
    Proxy-->>Visitor: Hiển thị giao diện website Hoàng Gia Land cực đẹp, tốc độ cao
```

---

## 3. Quy trình tải ảnh an toàn qua Presigned Signature (Client -> Backend -> Cloudinary)

Quy trình giúp giấu kín mã bảo mật `API_SECRET` của Cloudinary ở Backend bằng cách sinh chữ ký số tạm thời cho Client upload trực tiếp.

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Tenant Admin
    participant Client as CMS Web Browser
    participant API as Express API Server
    participant Cloudinary as Cloudinary API

    Admin->>Client: Chọn ảnh dự án căn hộ & bấm Tải lên
    Client->>API: GET /api/cms/media/signature (Yêu cầu chữ ký upload tạm thời)
    
    API->>API: Kiểm tra quyền đăng nhập & quota dung lượng < 500MB
    API->>API: Tạo hash signature sử dụng API_SECRET (Thừa nhận định dạng ảnh an toàn)
    
    API-->>Client: Trả về 200 OK gồm { signature, timestamp, apiKey, cloudName }
    
    Client->>Cloudinary: POST https://api.cloudinary.com/v1_1/{cloudName}/image/upload<br>(Gửi kèm file ảnh + signature + apiKey)
    
    Note over Cloudinary: Cloudinary xác thực chữ ký khớp và lưu trữ file ảnh
    Cloudinary-->>Client: Trả về 200 OK gồm { public_id, secure_url, bytes_size }
    
    Client->>API: POST /api/cms/projects {..., thumbnail: secure_url, imageSize: bytes_size}
    API->>API: Tích lũy dung lượng sử dụng của Tenant
    API->>DB: Lưu trữ URL ảnh vào cơ sở dữ liệu PostgreSQL
    API-->>Client: Lưu dự án BĐS thành công
```

---

## 4. Quy trình duyệt đơn hàng thuê và kích hoạt Tenant mới tự động

Quy trình quản lý đơn hàng thủ công nhưng kích hoạt tự động toàn bộ hạ tầng phần mềm cho khách thuê.

```mermaid
sequenceDiagram
    autonumber
    actor Super as Super Admin
    participant AdminClient as Super Admin Dashboard
    participant API as Express API Server
    participant DB as PostgreSQL Database
    participant Email as Nodemailer (Gmail SMTP)

    Super->>AdminClient: Đăng nhập & mở trang Duyệt Đơn Hàng
    AdminClient->>API: GET /api/admin/orders?status=WAITING_CONFIRM
    API->>DB: Truy vấn các đơn hàng chờ duyệt kèm thông tin hóa đơn
    DB-->>API: Trả về danh sách đơn hàng
    API-->>AdminClient: Hiển thị danh sách kèm ảnh bill chuyển tiền của khách
    
    Super->>AdminClient: Bấm nút "Phê Duyệt & Kích Hoạt" đơn thuê của tenant "hoanggialand"
    AdminClient->>API: PUT /api/admin/orders/{orderId}/approve
    
    rect rgb(240, 240, 240)
        Note over API,DB: Giao dịch DB (Transaction)
        API->>DB: Cập nhật trạng thái Order thành COMPLETED
        API->>DB: Tạo mới bản ghi Tenant { slug: "hoanggialand", status: "ACTIVE" }
        API->>DB: Tạo mới User Tenant Admin { email: khách, role: TENANT_ADMIN }
        DB-->>API: Xác nhận giao dịch thành công
    end
    
    API->>API: Sinh mật khẩu ngẫu nhiên cho Tenant Admin
    API->>Email: Gọi gửi email kích hoạt dịch vụ kèm link CMS & Mật khẩu đăng nhập
    Email-->>API: Xác nhận mail đã gửi
    
    API-->>AdminClient: Trả về 200 OK thông báo phê duyệt thành công
    AdminClient-->>Super: Giao diện cập nhật trạng thái hoạt động của Tenant
```
