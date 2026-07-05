# 21. API Contracts Freeze

> Tài liệu này chuẩn hóa và chính thức khóa cấu trúc dữ liệu phản hồi (Response) và yêu cầu (Request) cho toàn bộ hệ thống API nhằm đảm bảo tính đồng bộ tuyệt đối giữa Frontend và Backend.

---

## 1. Cấu trúc phản hồi chung (Standard Response Wrapper)

Mọi API của hệ thống bắt buộc phải trả về dữ liệu theo cấu trúc bọc chuẩn dưới đây:

### 1.1 Khi thành công (Success Response)
```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
```

### 1.2 Khi thất bại (Error Response)
```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;       // Ví dụ: "UNAUTHORIZED", "VALIDATION_ERROR", "NOT_FOUND"
    message: string;    // Chi tiết lỗi thân thiện bằng Tiếng Việt
    details?: any[];    // Chi tiết lỗi Zod validation (nếu có)
  };
}
```

---

## 2. Chuẩn hóa API mẫu (API Contracts Specification)

### 2.1 API lấy danh sách dự án (Public/Tenant): `GET /api/website/:tenantSlug/projects`

- **Query Parameters:**
  - `page`: số trang (mặc định = 1)
  - `limit`: số bản ghi trên trang (mặc định = 10)
  - `q`: từ khóa tìm kiếm (ILIKE contains mode)
  - `type`: loại hình BĐS (`APARTMENT`, `VILLA`, `TOWNHOUSE`, `LAND`...)
  - `status`: trạng thái bán (`SELLING`, `SOLD_OUT`...)
  - `priceFrom`, `priceTo`: lọc khoảng giá (số nguyên)
  - `areaFrom`, `areaTo`: lọc khoảng diện tích

- **Response JSON:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "clx...",
        "title": "The Grand Riverside",
        "slug": "the-grand-riverside",
        "shortDescription": "Căn hộ cao cấp bên sông Sài Gòn",
        "price": "5.2 tỷ",
        "priceFrom": 5200000000,
        "area": "120 m²",
        "type": "APARTMENT",
        "status": "SELLING",
        "thumbnail": "https://res.cloudinary.com/...",
        "featured": true,
        "createdAt": "2026-07-05T12:00:00.000Z"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
  ```

### 2.2 API cập nhật dữ liệu CMS dự án (có Versioning): `PUT /api/cms/projects/:id`
- **Request Headers:**
  - `Content-Type: application/json`
  - `x-tenant-id: <tenant_id>`
  - `X-CSRF-Token: <csrf_token_value>`
- **Request Body:**
  ```json
  {
    "title": "The Grand Riverside Edit",
    "price": "5.5 tỷ",
    "priceFrom": 5500000000,
    "version": 1 // Phục vụ Optimistic Locking
  }
  ```
- **Response JSON (Success 200):**
  ```json
  {
    "success": true,
    "data": {
      "id": "clx...",
      "title": "The Grand Riverside Edit",
      "version": 2,
      "updatedAt": "2026-07-05T12:10:00.000Z"
    }
  }
  ```
- **Response JSON (Lỗi xung đột version 409 Conflict):**
  ```json
  {
    "success": false,
    "error": {
      "code": "DB_CONFLICT",
      "message": "Dữ liệu đã bị thay đổi bởi quản trị viên khác. Vui lòng tải lại trang."
    }
  }
  ```

### 2.3 API Phê duyệt đơn hàng (Super Admin): `PUT /api/admin/orders/:id/approve`
- **Response JSON (Khi trùng subdomain - 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "order-cuid-2",
      "status": "AWAITING_MANUAL_REVIEW",
      "note": "Xung đột subdomain [hoanggialand] đã được đăng ký bởi Tenant khác. Chuyển sang chờ xử lý thủ công."
    }
  }
  ```
