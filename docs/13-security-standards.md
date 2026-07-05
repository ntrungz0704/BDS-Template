# 13. Security Standards

> Tài liệu này mô tả các tiêu chuẩn bảo mật bắt buộc áp dụng trong suốt quá trình phát triển, kiểm thử và triển khai dự án Real Estate Template Marketplace & SaaS Platform. Toàn bộ các tiêu chuẩn dưới đây phải được tuân thủ nghiêm ngặt để đảm bảo an toàn thông tin và tính độc lập của dữ liệu khách hàng (Tenant Isolation).

---

## 1. Authentication & Session Management

Hệ thống sử dụng cơ chế xác thực Token kép (Double-token pattern) kết hợp giữa JWT Access Token và Refresh Token được lưu trữ ở cấp độ Database.

### Access Token
- **Cơ chế:** Signed JWT (JSON Web Token) sử dụng thuật toán ký đối xứng HS256.
- **Thời gian sống:** 15 phút.
- **Vị trí lưu trữ:** Cookie httpOnly, Secure, SameSite=Lax (hoặc Strict). Không lưu ở LocalStorage hay SessionStorage để triệt tiêu nguy cơ tấn công XSS đánh cắp token.
- **Payload tối thiểu:**
  ```json
  {
    "userId": "usr_9f8d7c6b5a",
    "role": "TENANT_ADMIN",
    "tenantId": "tenant-1",
    "exp": 1774890900
  }
  ```

### Refresh Token
- **Cơ chế:** Một chuỗi ngẫu nhiên dài (Crypto-safe random string) được lưu tại bảng `RefreshToken` trong cơ sở dữ liệu.
- **Thời gian sống:** 7 ngày.
- **Vị trí lưu trữ:** Lưu tại Cookie httpOnly, Secure với đường dẫn (path) giới hạn ở `/api/auth/refresh`.
- **Logic hoạt động:**
  - Khi Access Token hết hạn, client tự động gọi `POST /api/auth/refresh` gửi kèm Refresh Token trong Cookie.
  - API kiểm tra tính hợp lệ của Refresh Token trong DB (chưa bị thu hồi, chưa hết hạn).
  - Cấp mới 1 cặp Access Token và Refresh Token mới (Rotating Refresh Tokens để phát hiện reuse).
  - Nếu phát hiện Refresh Token cũ bị tái sử dụng, hệ thống lập tức thu hồi toàn bộ phiên đăng nhập của User đó vì có nguy cơ rò rỉ token.

### Xử lý Logout
- Khi logout, tiến hành xóa sạch Cookies phía client.
- Đánh dấu trạng thái thu hồi (Revoke) của dòng chứa Refresh Token tương ứng trong Database.

---

## 2. Authorization & Tenant Isolation (Phân Tách Dữ Liệu Tenant)

Đây là **yêu cầu cốt lõi nhất** đối với mô hình SaaS sử dụng Shared Database. 

### Quản lý vai trò (User Role)
Phân chia 3 nhóm quyền chính:
1. `SUPER_ADMIN`: Quyền tối cao quản lý platform, đơn hàng, tenants, domains.
2. `TENANT_ADMIN`: Chủ sở hữu website thuê, toàn quyền quản trị các modules dự án, bài viết, banner, menu của tenant đó.
3. `TENANT_EDITOR`: Nhân viên của tenant, có quyền sửa đổi nội dung nhưng không được đổi cấu hình theme, không được xem đơn hàng/hóa đơn thuê.

### Middleware Cách Ly Dữ Liệu
Mọi API CMS của Tenant (đầu route `/api/cms/*`) bắt buộc phải đi qua middleware `checkTenantAccess`:
```typescript
export async function checkTenantAccess(req: Request, res: Response, next: NextFunction) {
  const user = req.user; // Đã được giải mã từ JWT Middleware
  const requestedTenantId = req.headers['x-tenant-id'] || req.query.tenantId;

  if (!requestedTenantId) {
    return res.status(400).json({ error: "Thiếu Tenant ID xác thực yêu cầu." });
  }

  if (user.role === 'SUPER_ADMIN') {
    req.tenantId = requestedTenantId;
    return next();
  }

  if (user.tenantId !== requestedTenantId) {
    // Ghi audit log cảnh báo hành vi truy cập trái phép
    logger.warn(`User ${user.userId} cố gắng truy cập dữ liệu của tenant ${requestedTenantId}`);
    return res.status(403).json({ error: "Bạn không có quyền truy cập dữ liệu của Tenant này." });
  }

  req.tenantId = user.tenantId;
  next();
}
```

### Ràng Buộc Câu Lệnh SQL (Prisma)
- Cấm tuyệt đối việc thực hiện câu lệnh query database mà không có mệnh đề `where: { tenantId }` khi thao tác trên các bảng liên quan đến tenant.
- Khuyến nghị sử dụng Prisma Middleware hoặc Client Extensions để tự động chèn trường `tenantId` vào mọi truy vấn đọc/ghi nhằm giảm thiểu lỗi do lập trình viên quên viết tay.

---

## 3. Input Validation & Sanitization (Chống SQL Injection, XSS)

### Validation dữ liệu đầu vào (Zod Schema)
Tất cả các API nhận dữ liệu từ Client (body, query, params) bắt buộc phải kiểm tra thông qua thư viện **Zod** trước khi thực thi xử lý logic.
```typescript
import { z } from 'zod';

export const CreateProjectSchema = z.object({
  title: z.string().min(5, "Tiêu đề tối thiểu 5 ký tự").max(100),
  price: z.string(),
  area: z.string(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  status: z.enum(['COMING_SOON', 'SELLING', 'SOLD_OUT']),
  type: z.enum(['APARTMENT', 'VILLA', 'TOWNHOUSE', 'LAND', 'COMMERCIAL', 'OFFICE']),
  thumbnail: z.string().url("Định dạng ảnh không hợp lệ"),
  gallery: z.array(z.string().url()),
});
```

### Chống SQL Injection
- Sử dụng Prisma ORM làm cơ chế truy vấn chính. Prisma tự động sử dụng parameterized queries cho tất cả các truy vấn, giúp phòng ngừa hoàn toàn tấn công SQL Injection.
- Trường hợp bắt buộc viết Raw SQL Query, phải sử dụng cú pháp `$queryRaw` với biến truyền vào dạng template literal chuẩn của Prisma để tự động escape ký tự. Cấm nối chuỗi SQL trực tiếp.

### Chống XSS (Cross-Site Scripting)
- Toàn bộ dữ liệu text nhận từ user ở dạng Rich Text (như trường `description` của dự án, bài viết) phải được lọc bỏ mã độc HTML thông qua thư viện **dompurify** hoặc **sanitize-html** ở phía Backend trước khi lưu vào PostgreSQL.
- Ở phía Frontend (Next.js), khi hiển thị dữ liệu rich text qua thuộc tính `dangerouslySetInnerHTML`, bắt buộc phải gọi DomPurify lọc một lần nữa tại client để đảm bảo an toàn tuyệt đối.

---

## 4. File Upload Security (Bảo Mật Tải File)

Hệ thống cho phép tải ảnh logo, banner, ảnh dự án lên Cloudinary. Cần kiểm soát nghiêm ngặt luồng này:
1. **Kiểm tra định dạng (MIME Type):** Chỉ chấp nhận các định dạng ảnh an toàn: `image/jpeg`, `image/png`, `image/webp`. Cấm upload file có nguy cơ thực thi mã như `.svg` (có thể chứa mã script độc), `.html`, `.exe`, `.js`.
2. **Giới hạn dung lượng:** Tối đa 5MB cho mỗi file ảnh. 
3. **Cơ chế Upload:** Frontend không upload trực tiếp bằng API key của Cloudinary. Thay vào đó, Backend sinh ra một **Presigned Upload Signature** có thời hạn sống ngắn (tối đa 5 phút) gửi cho Frontend. Frontend dùng signature này để upload trực tiếp lên Cloudinary. Việc này giúp giấu kín `API_SECRET` ở phía Server.
4. **Kiểm soát quota lưu trữ:** Mỗi lần upload thành công, Backend cập nhật dung lượng đã sử dụng của Tenant. Nếu vượt quá **500MB** (ở Phase 1), Backend sẽ chặn và trả về lỗi vượt quá giới hạn lưu trữ.

---

## 5. Network Security & Infrastructure (Mạng & Hạ Tầng)

### HTTPS Enforcement
- HTTPS là bắt buộc cho toàn bộ các domain và subdomain của hệ thống.
- Cấu hình Nginx tự động redirect tất cả request HTTP (cổng 80) về HTTPS (cổng 443).
- Bật tiêu đề **Strict-Transport-Security (HSTS)** để ép trình duyệt luôn kết nối HTTPS.

### Helmet.js Security Headers
Sử dụng middleware `helmet` trong Express để cấu hình đầy đủ các HTTP Security Headers:
- `Content-Security-Policy (CSP)`: Giới hạn nguồn nạp script, style, ảnh. Chỉ chấp nhận các nguồn tin cậy như tự thân, Cloudinary, Youtube, Google Map.
- `X-Frame-Options`: Thiết lập `DENY` hoặc `SAMEORIGIN` để chống tấn công Clickjacking.
- `X-Content-Type-Options`: Thiết lập `nosniff` để chặn trình duyệt tự ý đoán định dạng file khác với định dạng khai báo.
- `Referrer-Policy`: Thiết lập `strict-origin-when-cross-origin`.

### Rate Limiting & DDoS Prevention
- **CORS Configuration:** Cấu hình chính xác whitelist các domain được phép truy cập API (chỉ cho phép các subdomain của hệ thống). Cấm dùng `Access-Control-Allow-Origin: *` cho các API cần xác thực.
- **Express Rate Limit:** Giới hạn tần suất gọi API từ 1 địa chỉ IP để chống brute force và spam:
  - Route Auth (`/api/auth/login`, `/api/auth/register`): Tối đa 5 lần thử sai trong 15 phút.
  - Route API chung: Tối đa 100 requests trong 1 phút.
- **Cloudflare Integration:** Đặt hệ thống đằng sau Cloudflare. Kích hoạt Cloudflare WAF, thiết lập quy tắc tự động chặn IP spam, chống tấn công DDoS tầng ứng dụng và bật chế độ JS Challenge nếu phát hiện lưu lượng truy cập bất thường.

---

## 6. Lưu trữ thông tin nhạy cảm & Nhật ký (Sensitive Data & Logging)

### Hash mật khẩu
- Mật khẩu của người dùng bắt buộc phải được mã hóa trước khi lưu vào DB bằng thuật toán **bcrypt** với số vòng salt (salt rounds) tối thiểu là `12`.
- Không bao giờ lưu mật khẩu dạng clear text hoặc sử dụng các thuật toán băm yếu như MD5, SHA1.

### Che giấu lỗi hệ thống (Error Sanitization)
- Môi trường Production bắt buộc phải tắt việc hiển thị chi tiết stack trace của lỗi hệ thống cho client.
- Mọi lỗi không lường trước phải trả về mã lỗi chung dạng `500 Internal Server Error` đi kèm một mã tra cứu lỗi duy nhất (Error reference ID). Chi tiết lỗi thực tế sẽ được ghi lại ở log file của server để dev kiểm tra.

### Audit Logging (Nhật ký kiểm toán)
Hệ thống duy trì bảng `AuditLog` để ghi lại các hành động thay đổi cấu hình, dữ liệu quan trọng của hệ thống:
- Ai thực hiện (userId, IP, User Agent).
- Thực hiện hành động gì (Ví dụ: `CREATE_PROJECT`, `UPDATE_COMPANY_INFO`, `APPROVE_ORDER`).
- Thời gian thực hiện.
- Trạng thái thành công hay thất bại.
