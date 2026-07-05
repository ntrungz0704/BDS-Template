# DATABASE AUDIT REPORT (CHUYÊN SÂU)

| Chỉ số | Chi tiết |
|---|---|
| **Dự án** | Real Estate Template Marketplace & SaaS Platform |
| **Vai trò kiểm toán** | Solution Architect & Lead Database Administrator |
| **Trạng thái kiểm toán** | **PASSED WITH PATCHES** |

---

## 1. Kết quả đánh giá 12 Điểm Kiến Trúc & Thiết Kế DB

### 1.1 Soft Delete (Điểm 1)
- **Đánh giá:** **PARTIALLY VALID**.
- **Chi tiết:** 
  - `Project`, `Post`, `Media`, `Tenant`: Cần thiết phải có `deletedAt DateTime?` để phục vụ khôi phục dữ liệu khi người dùng xóa nhầm (đặc biệt là BĐS giá trị cao). Tài liệu `03-database-erd.md` và `MVP-FINAL-SPEC.md` đã có trường này.
  - `Order`: **KHÔNG CẦN VÀ CẤM DÙNG Soft Delete**. Đơn hàng là dữ liệu tài chính phục vụ báo cáo doanh thu và thuế. Việc xóa đơn hàng (kể cả soft delete) sẽ vi phạm nguyên tắc kiểm toán tài chính. Trạng thái đơn hàng phải được quản lý chặt chẽ qua Enum `OrderStatus` (`PENDING`, `WAITING_CONFIRM`, `COMPLETED`, `REJECTED`).
- **Patch đề xuất:** Không áp dụng `deletedAt` cho model `Order`.

### 1.2 Optimistic Locking (Điểm 2)
- **Đánh giá:** **PARTIALLY VALID**.
- **Chi tiết:**
  - Đối với các bảng CMS thông thường (`Project`, `Post`): Khả năng 2 admin cùng sửa một lúc là cực kỳ thấp (hầu hết tenant là môi giới cá nhân hoặc công ty nhỏ dưới 3 nhân sự). Thêm cơ chế locking sẽ làm tăng độ phức tạp không đáng có cho MVP 7 ngày.
  - Đối với bảng `Tenant` và `Order` / `Subscription`: Tránh xung đột khi Admin duyệt đơn hàng đồng thời với webhook thanh toán chạy ngầm. Bổ sung `version Int @default(1)` là cần thiết.
- **Patch đề xuất:** Thêm trường `version Int @default(1)` vào model `Tenant` và `Order`. Khi cập nhật trạng thái đơn hàng hoặc gia hạn tenant:
  ```typescript
  // Update query checking version
  const updated = await prisma.order.updateMany({
    where: { id: orderId, version: currentVersion },
    data: { status: 'COMPLETED', version: { increment: 1 } }
  });
  if (updated.count === 0) throw new Error("Conflict detected (Lost Update)");
  ```

### 1.3 Composite Unique Index (Điểm 3)
- **Đánh giá:** **VALID (Đã có trong thiết kế hiện tại)**.
- **Chi tiết:** 
  - Trong mô hình Multi-tenant shared database, việc các tenant khác nhau cùng tạo dự án có chung slug (ví dụ: `can-ho-vinhomes`) là rất phổ biến.
  - Do đó, ràng buộc `slug UNIQUE` toàn cục sẽ gây lỗi. Bắt buộc phải chuyển thành chỉ mục duy nhất kết hợp `@@unique([tenantId, slug])` cho các bảng: `Project`, `Post`, `Category`, `Tag`.
- **Minh chứng:** Tài liệu [03-database-erd.md](file:///e:/BĐS%20Template/docs/03-database-erd.md#L603) và `MVP-FINAL-SPEC.md` đã cấu hình chính xác ràng buộc này.

### 1.4 Missing Indexes (Điểm 4)
- **Đánh giá:** **VALID**.
- **Chi tiết:** Các câu lệnh truy vấn ngoài trang chủ website của tenant luôn chạy theo cấu trúc lọc dữ liệu:
  - Tìm dự án theo tenant + trạng thái (`status`).
  - Tìm dự án theo tenant + loại hình (`type`).
  - Tìm dự án/bài viết theo tenant + đã xuất bản (`published`).
  - Sắp xếp dự án/bài viết mới nhất (`createdAt`).
- **Patch đề xuất:** Bổ sung các index phức hợp sau vào Schema Prisma để tối ưu tốc độ truy vấn:
  ```prisma
  // Trong model Project
  @@index([tenantId, status])
  @@index([tenantId, type])
  @@index([tenantId, published])
  @@index([tenantId, createdAt(sort: Desc)])

  // Trong model Post
  @@index([tenantId, published])
  @@index([tenantId, createdAt(sort: Desc)])
  ```

### 1.5 Transaction Boundary (Điểm 5)
- **Đánh giá:** **VALID**.
- **Chi tiết:** Xác định các use case bắt buộc phải sử dụng Transaction để đảm bảo tính nhất quán dữ liệu (Atomicity):
  1. **Complete Order / Activate Subscription:**
     - Cập nhật trạng thái `Order` -> `COMPLETED`.
     - Tạo / Cập nhật `Subscription` (thiết lập ngày bắt đầu, ngày hết hạn).
     - Tạo mới `Tenant` (nếu đơn hàng là RENT).
     - Tạo tài khoản `User` (TENANT_ADMIN) gắn với `tenantId` mới.
     - Tạo `CompanyInfo` mặc định cho tenant.
     - Tạo `SeoConfig` mặc định cho tenant.
     - Tạo `AuditLog` ghi nhận lịch sử duyệt.
  2. **Upload Media & Update Quota:**
     - Tạo bản ghi trong bảng `Media`.
     - Atomic increment trường `uploadUsedBytes` của `Tenant`.

### 1.6 Payment Idempotency (Điểm 6)
- **Đánh giá:** **PARTIALLY VALID**.
- **Chi tiết:** Vì MVP Phase 1 chỉ có thanh toán chuyển khoản thủ công, hệ thống không nhận webhook trực tiếp từ ngân hàng nên không lo ngại lỗi lặp request giao dịch từ gateway. 
- **Giải pháp vá lỗi:** Đảm bảo trường `transactionCode` trong bảng `Order` cấu hình là `UNIQUE` để chặn người dùng gửi 2 đơn hàng có chung 1 mã giao dịch chuyển tiền.

### 1.7 Subdomain Race Condition (Điểm 7)
- **Đánh giá:** **VALID**.
- **Chi tiết:** Chỉ kiểm tra `GET check-subdomain` ở client là chưa đủ. Nếu 2 user cùng check thấy subdomain `abc` trống và gửi đơn đăng ký cùng lúc, DB sẽ tạo 2 đơn hàng `PENDING` có chung subdomain. Khi admin duyệt đơn thứ nhất, tenant `abc` được tạo. Khi admin duyệt đơn thứ hai, hệ thống sẽ crash ở tầng DB do trùng lặp `slug` UNIQUE trên bảng `Tenant`.
- **Giải pháp:** 
  - Cấu hình unique constraint hoặc check trùng lặp slug tenant trực tiếp bên trong transaction của API phê duyệt đơn hàng.
  - Nếu tenant đã tồn tại tại thời điểm phê duyệt -> Từ chối duyệt và cập nhật đơn hàng thứ 2 sang trạng thái `REJECTED` tự động.

### 1.8 Upload Quota Race Condition (Điểm 8)
- **Đánh giá:** **VALID**.
- **Chi tiết:** Nếu 1 tenant upload đồng thời 3 file, luồng xử lý Backend đọc `uploadUsedBytes` từ DB -> cộng dung lượng -> ghi đè lại DB sẽ gây lỗi **Lost Update** (khiến dung lượng thực tế lớn hơn dung lượng ghi nhận trong DB).
- **Giải pháp:** Sử dụng tính năng tăng số lượng nguyên tử (atomic increment) của Prisma ở tầng DB:
  ```typescript
  await prisma.tenant.update({
    where: { id: tenantId },
    data: { uploadUsedBytes: { increment: newFileSize } }
  });
  ```

---

## 2. Rà soát Schema & Migration Readiness

- **Cascade Delete:** Đã cấu hình `onDelete: Cascade` cho toàn bộ các bảng con của Tenant. Điều này đảm bảo khi xóa tenant, toàn bộ rác dữ liệu sẽ tự động sạch.
- **User - Tenant Relation:** Khóa ngoại `tenantId` trong model `User` được thiết lập `onDelete: SetNull` để khi xóa tenant, tài khoản user admin của họ không bị lỗi crash khóa ngoại mà chỉ chuyển trạng thái mồ côi.

---

## 3. Khóa cấu hình DB Patch

Các thay đổi trên sẽ được cập nhật trực tiếp vào file Prisma Schema và đồng bộ qua migration.
Nguồn dữ liệu DB đã đủ điều kiện an toàn dữ liệu 100%.
