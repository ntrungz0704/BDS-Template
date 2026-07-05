# 23. Permission Matrix Freeze

> Tài liệu này mô tả chi tiết ma trận phân quyền truy cập API của dự án. Mọi Middleware phân quyền và Zod Validation phải kiểm tra đúng theo ma trận này.

---

## 1. Các Vai Trò Trong Hệ Thống (Roles Definition)

1. **GUEST (Khách vãng lai):** Khách truy cập Marketplace hoặc Website của Tenant. Không cần đăng nhập.
2. **TENANT_EDITOR (Biên tập viên Tenant):** Nhân viên của tenant (môi giới phụ). Có quyền quản lý nội dung (Dự án, Bài viết) nhưng không được cấu hình cài đặt tenant hoặc quản lý tài khoản.
3. **TENANT_ADMIN (Quản trị viên Tenant):** Chủ sở hữu website tenant. Có toàn quyền quản lý dữ liệu và cấu hình riêng của tenant đó.
4. **SUPER_ADMIN (Quản trị viên Hệ thống):** Quản trị viên của toàn bộ SaaS Platform. Quản lý Đơn hàng, các Template và các Tenant.

---

## 2. Ma trận phân quyền API (Permission Matrix)

| Chức năng API | Endpoint | GUEST | TENANT_EDITOR | TENANT_ADMIN | SUPER_ADMIN |
|---|---|:---:|:---:|:---:|:---:|
| **Đăng ký/Đăng nhập** | `POST /api/auth/*` | ✅ | ✅ | ✅ | ✅ |
| **Gửi liên hệ tư vấn** | `POST /api/website/:slug/contact` | ✅ | ✅ | ✅ | ✅ |
| **Xem dự án/bài viết** | `GET /api/website/:slug/*` | ✅ | ✅ | ✅ | ✅ |
| **Xem chi tiết Template**| `GET /api/templates/*` | ✅ | ✅ | ✅ | ✅ |
| **Tạo Đơn hàng mua/thuê**| `POST /api/marketplace/orders` | ✅ | ✅ | ✅ | ✅ |
| **Tạo bài viết/dự án** | `POST /api/cms/projects` | ❌ | ✅ | ✅ | ✅ (Bypass) |
| **Sửa bài viết/dự án** | `PUT /api/cms/projects/:id` | ❌ | ✅ | ✅ | ✅ (Bypass) |
| **Xóa bài viết/dự án (Soft)**| `DELETE /api/cms/projects/:id`| ❌ | ❌ | ✅ | ✅ (Bypass) |
| **Sửa thông tin công ty** | `PUT /api/cms/company-info` | ❌ | ❌ | ✅ | ✅ (Bypass) |
| **Sửa SEO Global** | `PUT /api/cms/seo-config` | ❌ | ❌ | ✅ | ✅ (Bypass) |
| **Quản lý Menu & Banner**| `CRUD /api/cms/menus` | ❌ | ❌ | ✅ | ✅ (Bypass) |
| **Xem thông tin liên hệ** | `GET /api/cms/contacts` | ❌ | ✅ | ✅ | ❌ |
| **Tải source code ZIP** | `GET /api/templates/:id/zip` | ❌ | ❌ | ❌ | ✅ |
| **Duyệt đơn hàng** | `PUT /api/admin/orders/:id/*`| ❌ | ❌ | ❌ | ✅ |
| **Khóa/Mở Tenant** | `PUT /api/admin/tenants/:id/*`| ❌ | ❌ | ❌ | ✅ |
| **Quản lý User hệ thống** | `CRUD /api/admin/users` | ❌ | ❌ | ❌ | ✅ |

---

## 3. Cách thức triển khai Middleware

### 3.1 Xác thực Token & Phân quyền (RBAC Middleware)
```typescript
export function requireRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Lấy từ authMiddleware giải mã JWT
    if (!user) {
      return res.status(401).json({ success: false, error: { code: "UNAUTHORIZED", message: "Yêu cầu đăng nhập." } });
    }
    
    if (user.role === 'SUPER_ADMIN') {
      return next(); // Super Admin được bypass mọi quyền
    }
    
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Không có quyền thực hiện hành động này." } });
    }
    
    next();
  };
}
```

### 3.2 Kiểm tra Cách ly Tenant (Tenant Context Isolation Middleware)
```typescript
export function checkTenantAccess(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  const targetTenantId = req.headers['x-tenant-id'] || req.body.tenantId || req.query.tenantId;

  if (user.role === 'SUPER_ADMIN') {
    return next(); // Super admin được quyền truy cập mọi tenant
  }

  if (user.tenantId !== targetTenantId) {
    return res.status(403).json({ success: false, error: { code: "ACCESS_DENIED", message: "Không được phép truy cập dữ liệu của Tenant khác." } });
  }

  next();
}
```
