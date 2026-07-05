# SECURITY AUDIT REPORT (CHUYÊN SÂU)

| Chỉ số | Chi tiết |
|---|---|
| **Dự án** | Real Estate Template Marketplace & SaaS Platform |
| **Vai trò kiểm toán** | Solution Architect & Chief Security Officer |
| **Trạng thái kiểm toán** | **PASSED WITH PATCHES** |

---

## 1. Kiểm toán Bảo mật luồng Tải file (File Upload Security)

Tải file ảnh lên Cloudinary là một trong những vector tấn công nguy hiểm nhất. Bắt buộc áp dụng bộ lọc 3 tầng bảo mật tại API Backend:

### 1.1 Kiểm tra định dạng thật (MIME Type Validation)
- Không tin tưởng thuộc tính `file.originalname` từ client gửi lên (hacker có thể đổi tên file `shell.php` thành `shell.png`).
- Backend sử dụng thư viện **file-type** để đọc magic bytes (các byte đầu tiên của file) để xác định định dạng thực tế của file:
  ```typescript
  import { fileTypeFromBuffer } from 'file-type';
  
  const type = await fileTypeFromBuffer(fileBuffer);
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!type || !allowedMimeTypes.includes(type.mime)) {
    throw new Error("Định dạng file thực tế không được hỗ trợ.");
  }
  ```

### 1.2 Kiểm tra phần mở rộng (Extension Validation)
- Whitelist các đuôi mở rộng an toàn: `.jpg`, `.jpeg`, `.png`, `.webp`.
- Cấm hoàn toàn file `.svg` (đề phòng tấn công Stored XSS do file SVG thực chất là XML chứa mã script) và các định dạng file thực thi khác.

### 1.3 Kiểm tra kích thước hình ảnh (Dimension Validation)
- Giới hạn độ phân giải ảnh tải lên để tránh tấn công từ chối dịch vụ (Decompression Bomb / Pixel Flood) làm cạn kiệt RAM của máy chủ xử lý ảnh.
- Sử dụng thư viện **sharp** để đọc metadata và chặn các ảnh có chiều rộng hoặc chiều cao vượt quá 4000px:
  ```typescript
  import sharp from 'sharp';
  
  const metadata = await sharp(fileBuffer).metadata();
  if (metadata.width > 4000 || metadata.height > 4000) {
    throw new Error("Độ phân giải ảnh quá lớn, tối đa 4000x4000px.");
  }
  ```

---

## 2. Kiểm toán JWT, Refresh Token & CSRF

- **CSRF Token:** Trong MVP Phase 1, thay vì sử dụng CSRF Token truyền thống làm tăng độ phức tạp của Next.js (gây lỗi khi chạy SSR vì trang tĩnh không có token trước), hệ thống áp dụng cơ chế bảo mật kép:
  1. **SameSite Cookie:** Cấu hình Cookie chứa JWT Access Token có thuộc tính `sameSite: 'lax'` (chặn trình duyệt tự động gửi cookie khi click link từ trang ngoài).
  2. **Custom Header Check:** Tất cả các API ghi dữ liệu (POST, PUT, DELETE) bắt buộc phải kiểm tra sự hiện diện của custom header `X-Requested-With` hoặc `Authorization` dạng Bearer token nếu gọi trực tiếp. Chặn toàn bộ các request không có header này.

---

## 3. Kiểm toán Tenant Isolation (Cách ly dữ liệu)

- **Ngăn chặn rò rỉ:** 
  - Toàn bộ các API CMS Tenant (đầu route `/api/cms/*`) bắt buộc phải đi qua middleware `checkTenantAccess`. 
  - Middleware này so khớp `req.tenantId` (lấy từ Header `x-tenant-id`) với `tenantId` lưu trong token JWT của user đã đăng nhập.
  - Mọi câu lệnh SQL truy vấn trong Service/Repository bắt buộc phải chèn `where: { tenantId }`.

---

## 4. Danh sách các quy tắc cấu hình bảo mật bắt buộc khóa

- [x] **Helmet & CSP:** Sử dụng Helmet trong Express cấu hình Content Security Policy chặn mọi mã script lạ ngoài hệ thống và các nguồn tin cậy (Google Map, Youtube, Cloudinary).
- [x] **HSTS:** Kích hoạt HSTS ép trình duyệt ghi nhớ kết nối HTTPS trong vòng 1 năm.
- [x] **Rate Limit:** Áp dụng `express-rate-limit` chặn tối đa 100 requests/phút từ 1 IP.
- [x] **XSS Sanitization:** Dùng `dompurify` làm sạch Rich Text trước khi lưu database.
