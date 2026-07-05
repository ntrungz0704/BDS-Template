# 🗄️ Database ERD - Thiết Kế Cơ Sở Dữ Liệu (VÁ CHI TIẾT)

| Thông tin | Chi tiết |
|-----------|----------|
| **Phiên bản** | 1.0.1 (Audited & Patched) |
| **Ngày tạo** | 05/07/2026 |
| **Database** | PostgreSQL 16 |
| **ORM** | Prisma |

---

## 1. Entity Relationship Diagram (ERD) với các Bản Vá

```mermaid
erDiagram
    User ||--o{ RefreshToken : "has many"
    User }o--|| Tenant : "belongs to"
    User ||--o{ AuditLog : "creates"

    Tenant ||--|| CompanyInfo : "has one"
    Tenant ||--|| SeoConfig : "has one"
    Tenant ||--o{ Project : "has many"
    Tenant ||--o{ Post : "has many"
    Tenant ||--o{ Banner : "has many"
    Tenant ||--o{ Menu : "has many"
    Tenant ||--o{ Category : "has many"
    Tenant ||--o{ Tag : "has many"
    Tenant ||--o{ Media : "has many"
    Tenant ||--o{ ContactFormSubmission : "has many"
    Tenant }o--|| Template : "uses"
    Tenant ||--o| Subscription : "has active"

    Template ||--o| TemplateConfig : "has config"
    Template ||--o{ Order : "referenced in"

    Order }o--|| User : "placed by"
    Order }o--|| Template : "for template"

    Menu ||--o{ MenuItem : "contains"

    Post }o--o| Category : "belongs to"
    Post }o--o{ Tag : "has many"

    Project }o--o{ Tag : "has many"

    DemoSession }o--|| Template : "demos"

    User {
        string id PK
        string email UK
        string passwordHash
        string fullName
        string phone
        string avatar
        enum role
        string tenantId FK
        boolean isActive
        datetime createdAt
        datetime updatedAt
    }

    Tenant {
        string id PK
        string name
        string slug UK
        string domain
        enum status
        string templateId FK
        jsonb themeOverrides
        bigint uploadUsedBytes
        integer version
        datetime activatedAt
        datetime expiresAt
        datetime deletedAt
        datetime createdAt
        datetime updatedAt
    }

    Project {
        string id PK
        string tenantId FK
        string name
        string slug
        text description
        string shortDescription
        enum type
        enum status
        string price
        bigint priceFrom
        bigint priceTo
        string area
        float areaFrom
        float areaTo
        string address
        string ward
        string district
        string city
        float latitude
        float longitude
        jsonb amenities
        jsonb images
        string thumbnail
        integer version
        datetime deletedAt
        datetime createdAt
        datetime updatedAt
    }

    Post {
        string id PK
        string tenantId FK
        string title
        string slug
        text content
        string summary
        string thumbnail
        integer version
        datetime deletedAt
        datetime createdAt
        datetime updatedAt
    }

    Order {
        string id PK
        string userId FK
        string templateId FK
        string type
        enum status
        float price
        string subdomain
        string billImageUrl
        string transactionCode UK
        integer version
        datetime createdAt
        datetime updatedAt
    }
```

---

## 2. Chi Tiết Các Bảng Có Bản Vá

### 2.1 Bảng `Project` (Cập nhật Soft Delete & Versioning)
- `deletedAt` (`TIMESTAMP`, Nullable): Dùng để soft delete dự án.
- `version` (`INTEGER`, Default `1`): Kiểm soát khóa lạc quan (Optimistic Locking) chống Lost Update.
- **Indexes bổ sung:**
  - `idx_project_tenant_status` -> `(tenantId, status)`
  - `idx_project_tenant_type` -> `(tenantId, type)`
  - `idx_project_tenant_published` -> `(tenantId, published)`
  - `idx_project_tenant_created` -> `(tenantId, createdAt DESC)`

### 2.2 Bảng `Post` (Cập nhật Soft Delete & Versioning)
- `deletedAt` (`TIMESTAMP`, Nullable): Phục vụ soft delete bài viết.
- `version` (`INTEGER`, Default `1`): Optimistic Locking.

### 2.3 Bảng `CompanyInfo` (Cập nhật Versioning)
- `version` (`INTEGER`, Default `1`): Phòng ngừa 2 admin cùng chỉnh sửa thông tin công ty.

### 2.4 Bảng `SeoConfig` (Cập nhật Versioning)
- `version` (`INTEGER`, Default `1`): Optimistic Locking cho cấu hình SEO global.

### 2.5 Bảng `Order` (Cập nhật Versioning & Độc nhất Giao dịch)
- `transactionCode` (`VARCHAR(100)`, Nullable, **UNIQUE**): Chặn đứng việc gửi trùng lặp mã giao dịch.
- `version` (`INTEGER`, Default `1`): Tránh race condition khi duyệt đơn hàng.
- **Không cấu hình `deletedAt`** nhằm đảm bảo tính toàn vẹn dữ liệu kế toán và kiểm toán.

### 2.6 Bảng `Tenant` (Cập nhật Soft Delete & Versioning)
- `deletedAt` (`TIMESTAMP`, Nullable): Phục vụ soft delete tenant khi hết hạn quá 30 ngày.
- `version` (`INTEGER`, Default `1`): Tránh xung đột ghi đè dữ liệu.
- `uploadUsedBytes` (`BIGINT`, Default `0`): Quản lý quota 500MB.
