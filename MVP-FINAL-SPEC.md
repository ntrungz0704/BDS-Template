# MVP-FINAL-SPEC.md

> Tài liệu này tổng hợp kết quả tự kiểm tra, rà soát chéo giữa các tài liệu đặc tả kỹ thuật và chính thức "KHÓA MỀM VỚI CÁC BẢN VÁ" (Freeze v1.0.1) toàn bộ các thông số, luồng hoạt động, cấu trúc cơ sở dữ liệu và danh sách API trước khi tiến hành viết code. Mọi thay đổi sau tài liệu này phải được sự đồng ý của Product Owner.

---

## I. Kết quả rà soát chéo & Bổ dung (Final Audit Patches)

Sau đợt review độc lập chuyên sâu cùng Technical Auditor, chúng ta thống nhất áp dụng 8 điểm vá kỹ thuật cốt lõi sau để khóa spec:

### 1. Đồng bộ cơ chế Đơn hàng & Thanh toán thủ công
- Bổ sung cột `billImageUrl: String?` và `transactionCode: String?` (UNIQUE) vào bảng `Order` trong Database ERD để chống trùng lặp giao dịch.

### 2. Đồng bộ cơ chế dùng thử Demo
- Bảng `DemoSession` phải có các trường: `createdAt: DateTime`, `saveCount: Int` (mặc định = 0).
- Backend API kiểm tra chặt chẽ điều kiện: `Date.now() - createdAt > 3 ngày` hoặc `saveCount >= 3` để chặn lưu.

### 3. Đồng bộ cơ chế khóa website khi hết hạn (Suspended Mode)
- Khi tenant hết hạn (status = `SUSPENDED`), Next.js middleware chặn truy cập public nhưng CMS vẫn cho phép đăng nhập ở chế độ Read-only để thanh toán gia hạn.

### 4. Giải quyết triệt để Subdomain Race Condition
- **Quy trình chống xung đột:** Khi 2 user đăng ký trùng subdomain `abc` và gửi đơn hàng. Đơn hàng đầu tiên được Admin phê duyệt thành công sẽ tạo ra Tenant `abc`.
- **Xử lý đơn thứ 2:** Khi Admin bấm phê duyệt đơn hàng thứ 2 có cùng subdomain, hệ thống sẽ thực hiện kiểm tra kiểm tra trùng lặp `slug` của Tenant trong transaction. Nếu slug đã tồn tại, hệ thống không báo lỗi crash mà tự động chuyển trạng thái đơn hàng thứ 2 sang `AWAITING_MANUAL_REVIEW` (Chờ xử lý thủ công) hoặc `PENDING_SUBDOMAIN_CONFLICT`. Admin sẽ liên hệ khách hàng để đổi slug subdomain khác trực tiếp từ Dashboard.

### 5. Kiểm soát Quota Upload chống Race Condition
- **Vấn đề:** Nếu upload đồng thời nhiều file cùng lúc, phép cộng dồn atomic increment thông thường vẫn có thể làm tổng dung lượng vượt quá 500MB (ví dụ: used = 400MB, upload 2 file 80MB đồng thời, đều đọc ra còn trống 100MB và cho phép upload, dẫn đến used = 560MB).
- **Giải pháp:** Sử dụng cơ chế khóa hàng dọc hoặc transaction kiểm tra dung lượng tuần tự:
  ```typescript
  await prisma.$transaction(async (tx) => {
    // 1. SELECT ... FOR UPDATE để khóa hàng Tenant, ngăn chặn các luồng ghi đồng thời đọc dữ liệu cũ
    const tenant = await tx.$queryRaw<Tenant[]>`SELECT * FROM "Tenant" WHERE id = ${tenantId} FOR UPDATE`;
    
    // 2. Kiểm tra tổng quota sử dụng thực tế
    const currentUsed = tenant[0].uploadUsedBytes;
    if (Number(currentUsed) + newFileSize > 524288000) { // 500MB
      throw new Error("Vượt quá giới hạn dung lượng 500MB của Tenant.");
    }
    
    // 3. Thực hiện cập nhật dung lượng
    await tx.tenant.update({
      where: { id: tenantId },
      data: { uploadUsedBytes: { increment: newFileSize } }
    });
  });
  ```

### 6. Cấu hình Connection Pool cho PostgreSQL
- Để tránh cạn kiệt pool kết nối (Max Connections) khi chạy song song 4 ứng dụng Next.js và Express API, biến môi trường `DATABASE_URL` bắt buộc phải cấu hình giới hạn kết nối và thời gian chờ cụ thể:
  ```env
  DATABASE_URL="postgresql://postgres:securepassword@postgres:5432/real_estate_platform?schema=public&connection_limit=20&pool_timeout=20"
  ```

### 7. Bảo vệ CSRF cho HttpOnly Cookies (Double Submit Cookie)
- Để tăng cường lá chắn bảo mật chống tấn công CSRF (do thuộc tính `sameSite: 'lax'` không thể phòng thủ 100% trong mọi kịch bản trình duyệt), hệ thống áp dụng cơ chế **Double Submit Cookie** cho toàn bộ các API thay đổi dữ liệu (POST, PUT, DELETE) thuộc CMS và Admin:
  1. Khi đăng nhập thành công, Backend sinh 1 chuỗi CSRF token ngẫu nhiên và gửi về cho Client thông qua cookie thông thường (không httpOnly) tên `csrf_token`.
  2. Mỗi khi Client gửi request thay đổi dữ liệu (AJAX request), Client phải đọc cookie `csrf_token` này và đính kèm vào HTTP Header tên `X-CSRF-Token`.
  3. Backend so khớp giá trị trong Header `X-CSRF-Token` và Cookie `csrf_token`. Nếu không trùng khớp -> Trả về lỗi `403 Forbidden`.

### 8. Đồng bộ Soft Delete & Version (Optimistic Locking) cho các CMS Entities
- **Soft Delete (`deletedAt`):** Bắt buộc trên các thực thể: `Project`, `Post`, `Media`, `Tenant`. Bảng `Order` tuyệt đối không có `deletedAt`.
- **Version (`version`):** Bổ sung trường `version Int @default(1)` cho toàn bộ các thực thể CMS để chống xung đột ghi đè dữ liệu (Lost Update): `Project`, `Post`, `CompanyInfo`, `SeoConfig`, `Banner`, `Menu`, `Order`, `Tenant`.

---

## II. Khóa Đặc Tả Kỹ Thuật MVP (MVP Specs Freeze)

### 1. Stack công nghệ chốt
- **Frontend:** Next.js (Pages / App Router) cho cả 4 apps, Tailwind CSS, Zod validator, Axios.
- **Backend:** Express.js, TypeScript, JWT (Cookie based), Winston Logger.
- **Database:** PostgreSQL (Hosted on VPS via Docker), Prisma ORM.
- **Dịch vụ ngoài:** Cloudinary (Media storage), Nodemailer + Gmail SMTP (Phase 1 Email).

### 2. Mô hình định tuyến domain
- **Marketplace:** `www.myplatform.com` (SSG + ISR).
- **CMS Tenant:** `cms.myplatform.com/[tenant-slug]` (CSR, cookie auth).
- **Super Admin:** `admin.myplatform.com` (CSR, role-based auth).
- **Tenant Website:** `[tenant-slug].myplatform.com` (ISR revalidate 60s, CSS-variable-based template rendering).

### 3. Cấu trúc Schema DB chốt (Prisma Core Models)

```prisma
enum UserRole {
  SUPER_ADMIN
  TENANT_ADMIN
  TENANT_EDITOR
}

enum OrderStatus {
  PENDING
  PENDING_SUBDOMAIN_CONFLICT
  AWAITING_MANUAL_REVIEW
  WAITING_CONFIRM
  COMPLETED
  REJECTED
}

enum ProjectStatus {
  COMING_SOON
  SELLING
  SOLD_OUT
}

enum ProjectType {
  APARTMENT
  VILLA
  TOWNHOUSE
  LAND
  COMMERCIAL
  OFFICE
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  role      UserRole @default(TENANT_ADMIN)
  tenantId  String?
  tenant    Tenant?  @relation("TenantOwner", fields: [tenantId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Tenant {
  id              String      @id @default(uuid())
  name            String
  slug            String      @unique
  logo            String?
  phone           String?
  email           String?
  address         String?
  slogan          String?
  description     String?
  colorTheme      String      @default("gold")
  templateId      String      @default("template-1")
  socialLinks     Json?       // {facebook, youtube, tiktok}
  status          String      @default("ACTIVE") // ACTIVE, SUSPENDED
  uploadUsedBytes BigInt      @default(0)
  ownerId         String      @unique
  projects        Project[]
  posts           Post[]
  banners         Banner[]
  version         Int         @default(1)
  deletedAt       DateTime?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  users           User[]      @relation("TenantUsers")
}

model Project {
  id               String        @id @default(uuid())
  tenantId         String
  tenant           Tenant        @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  title            String
  slug             String
  description      String
  shortDescription String
  price            String
  area             String
  bedrooms         Int           @default(0)
  bathrooms        Int           @default(0)
  direction        String?
  address          String
  city             String
  district         String
  ward             String
  lat              Float?
  lng              Float?
  status           ProjectStatus @default(SELLING)
  type             ProjectType   @default(APARTMENT)
  thumbnail        String
  gallery          String[]
  videoUrl         String?
  mapEmbed         String?
  amenities        String[]
  seoTitle         String?
  seoDescription   String?
  seoKeywords      String?
  publishedAt      DateTime?
  version          Int           @default(1)
  deletedAt        DateTime?
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt

  @@unique([tenantId, slug])
}

model Post {
  id          String    @id @default(uuid())
  tenantId    String
  tenant      Tenant    @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  title       String
  slug        String
  summary     String
  content     String
  thumbnail   String
  publishedAt DateTime?
  version     Int       @default(1)
  deletedAt   DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@unique([tenantId, slug])
}

model Banner {
  id         String   @id @default(uuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  title      String
  subtitle   String?
  imageUrl   String
  actionUrl  String?
  actionText String?
  sortOrder  Int      @default(0)
  version    Int      @default(1)
  createdAt  DateTime @default(now())
}

model Order {
  id              String      @id @default(uuid())
  userId          String
  templateId      String
  type            String      // BUY, RENT
  status          OrderStatus @default(PENDING)
  price           Float
  subdomain       String?     // Cho đơn hàng RENT
  billImageUrl    String?     // Ảnh hóa đơn chuyển tiền
  transactionCode String?     // Mã giao dịch ngân hàng (UNIQUE)
  version         Int         @default(1)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model DemoSession {
  id         String   @id @default(uuid())
  userId     String
  templateId String
  saveCount  Int      @default(0)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### 4. API Contracts Core (Endpoints chính thức của MVP)
- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`.
- **Marketplace:** `/api/templates`, `/api/templates/:slug`, `/api/marketplace/orders` (Tạo đơn), `/api/marketplace/orders/:id/payment` (Gửi bill), `/api/marketplace/check-subdomain`.
- **CMS Tenant:** `/api/cms/projects` (CRUD), `/api/cms/posts` (CRUD), `/api/cms/company-info` (PUT).
- **Super Admin:** `/api/admin/orders` (GET & PUT duyệt), `/api/admin/tenants` (GET & PUT khóa/mở).
- **Public Tenant Site:** `/api/website/:tenantSlug/projects`, `/api/website/:tenantSlug/posts`, `/api/website/:tenantSlug/company-info`.

---

## III. Cam kết tuân thủ của AI Coding Assistant

1. **Không tự ý thay đổi Schema DB:** Mọi câu lệnh SQL hay truy vấn thông qua Prisma phải tuân thủ chính xác Schema đã khóa ở trên.
2. **Không tự ý thêm thư viện ngoài:** Ngoại trừ các thư viện đã được quy định trong Coding Standards và PRD.
3. **Đảm bảo bảo mật và cách ly:** Mọi API CMS của tenant phải bắt buộc kiểm tra tenantId qua middleware.
4. **Không viết code giả lập ở Backend:** Mọi API CRUD phải đọc/ghi thực tế xuống PostgreSQL Database.

> [!IMPORTANT]
> **ĐẶC TẢ MVP ĐÃ ĐƯỢC KHÓA THÀNH CÔNG VỚI CÁC BẢN VÁ.** Hệ thống đã sẵn sàng 100% để bước vào giai đoạn Coding.
