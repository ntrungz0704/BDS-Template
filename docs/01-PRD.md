# 📋 PRD - Tài Liệu Yêu Cầu Sản Phẩm

## Real Estate Template Marketplace & SaaS Platform

| Thông tin | Chi tiết |
|-----------|----------|
| **Phiên bản** | 1.0 |
| **Ngày tạo** | 05/07/2026 |
| **Tác giả** | Principal Software Architect |
| **Trạng thái** | Draft |
| **Dự án** | BĐS Template Marketplace |

---

## 1. Tóm Tắt Dự Án (Executive Summary)

### 1.1 Tầm nhìn

Xây dựng một nền tảng Marketplace & SaaS cho phép người dùng trong ngành Bất Động Sản (BĐS) **mua source code** hoặc **thuê website** đã được thiết kế sẵn, đẹp mắt, chuyên nghiệp — mà không cần biết lập trình. Nền tảng tập trung vào trải nghiệm đơn giản, nhanh chóng và giá cả phải chăng, giúp cá nhân môi giới và doanh nghiệp nhỏ có website riêng chỉ trong vài phút.

### 1.2 Mục tiêu kinh doanh

- **Doanh thu đa kênh**: Thu nhập từ bán source code (một lần) và cho thuê website (hàng tháng, recurring).
- **Scalable SaaS**: Kiến trúc multi-tenant cho phép phục vụ hàng trăm khách hàng trên cùng một hệ thống.
- **Thị trường ngách**: Tập trung vào ngành BĐS Việt Nam — thị trường có nhu cầu cao nhưng thiếu giải pháp phù hợp cho cá nhân và doanh nghiệp nhỏ.

### 1.3 Phạm vi MVP

MVP được chia thành **2 phase**, mỗi phase **7 ngày**:

- **Phase 1 (7 ngày)**: Marketplace cơ bản, Auth, CMS CRUD, 1 Template, Form báo giá, Admin Panel, Deploy.
- **Phase 2 (7 ngày)**: Thêm 2 templates, Demo customization engine, Full CMS, Multi-tenant subdomain, Forgot password, Custom domain.

---

## 2. Vấn Đề & Phân Tích Thị Trường (Problem Statement & Market Analysis)

### 2.1 Vấn đề hiện tại

```
Người môi giới / kinh doanh BĐS cá nhân và doanh nghiệp nhỏ gặp các vấn đề sau:
```

| # | Vấn đề | Mức độ đau | Giải pháp hiện tại |
|---|--------|-----------|---------------------|
| 1 | Không biết code, không thể tự làm website | 🔴 Cao | Nhờ người quen hoặc bỏ qua |
| 2 | Thuê developer quá đắt (10-50 triệu VNĐ) | 🔴 Cao | Chấp nhận chi phí cao hoặc dùng Facebook |
| 3 | Thời gian chờ đợi lâu (2-4 tuần) | 🟡 Trung bình | Kiên nhẫn chờ |
| 4 | Website không đẹp, không chuyên nghiệp | 🟡 Trung bình | Dùng template miễn phí kém chất lượng |
| 5 | Không tự chỉnh sửa nội dung được | 🔴 Cao | Phụ thuộc developer mỗi khi cần update |
| 6 | Không SEO friendly | 🟡 Trung bình | Không biết SEO là gì |
| 7 | Không responsive trên mobile | 🟡 Trung bình | Chấp nhận |

### 2.2 Phân tích thị trường

**Quy mô thị trường BĐS Việt Nam:**

- Số lượng môi giới BĐS đăng ký: **~300,000+** người (theo Bộ Xây dựng).
- Doanh nghiệp BĐS vừa và nhỏ: **~50,000+** công ty.
- Tỷ lệ có website riêng: **< 10%**.
- **Tiềm năng**: 90% chưa có website → cơ hội rất lớn.

**Đối thủ cạnh tranh:**

| Đối thủ | Loại hình | Giá | Nhược điểm |
|---------|-----------|-----|-----------|
| WordPress + Theme | Template CMS | 50-200 USD/năm | Cần cài đặt, bảo trì, không chuyên BĐS |
| Wix/Squarespace | Website builder | 15-45 USD/tháng | Không chuyên BĐS, giao diện Tây |
| Ladipage | Landing page | 200-800K/tháng | Chỉ landing page, không đầy đủ |
| Thuê developer | Custom | 10-50 triệu | Đắt, lâu, phụ thuộc |

**Lợi thế cạnh tranh của chúng ta:**

1. ✅ **Chuyên biệt BĐS**: Template thiết kế riêng cho ngành BĐS Việt Nam.
2. ✅ **Giá rẻ**: Từ 200K/tháng hoặc 2 triệu mua đứt.
3. ✅ **Nhanh**: Có website trong vài phút (thuê) hoặc vài giờ (mua + cài đặt).
4. ✅ **Tự chỉnh sửa**: CMS đơn giản, không cần biết code.
5. ✅ **SEO Ready**: Tối ưu SEO ngay từ đầu.

---

## 3. Đối Tượng Người Dùng (Target Users)

### 3.1 Persona 1: Anh Minh — Môi giới BĐS cá nhân

| Thông tin | Chi tiết |
|-----------|----------|
| **Tuổi** | 28-35 |
| **Giới tính** | Nam |
| **Thu nhập** | 15-30 triệu/tháng |
| **Trình độ IT** | Cơ bản (dùng Facebook, Zalo) |
| **Kinh nghiệm BĐS** | 2-5 năm |
| **Kênh bán hàng hiện tại** | Facebook, Zalo, batdongsan.com.vn |

**Pain Points:**
- Muốn có website riêng để tạo uy tín nhưng không biết code.
- Ngân sách hạn chế, không đủ tiền thuê developer.
- Cần website nhanh để chạy quảng cáo Google Ads.
- Muốn tự đăng dự án, bài viết mà không cần nhờ ai.

**Goals:**
- Có website chuyên nghiệp trong 1 ngày.
- Tự quản lý nội dung dễ dàng.
- Chi phí dưới 500K/tháng.
- Website hiển thị đẹp trên điện thoại.

**Giải pháp phù hợp:** 🏷️ Gói thuê Basic (200K/tháng)

### 3.2 Persona 2: Chị Linh — Nhân viên kinh doanh dự án

| Thông tin | Chi tiết |
|-----------|----------|
| **Tuổi** | 25-32 |
| **Giới tính** | Nữ |
| **Thu nhập** | 20-50 triệu/tháng |
| **Trình độ IT** | Cơ bản - Trung bình |
| **Kinh nghiệm BĐS** | 1-3 năm |
| **Vai trò** | Sales dự án tại sàn giao dịch BĐS |

**Pain Points:**
- Cần landing page riêng cho từng dự án để chạy quảng cáo.
- Công ty không hỗ trợ website cá nhân.
- Muốn xây dựng thương hiệu cá nhân (personal branding).
- Cần form thu thập thông tin khách hàng.

**Goals:**
- Website riêng mang tên cá nhân.
- Đăng được nhiều dự án cùng lúc.
- Có form liên hệ để thu lead.
- Giao diện sang trọng, chuyên nghiệp.

**Giải pháp phù hợp:** 🏷️ Gói thuê Pro (350K/tháng)

### 3.3 Persona 3: Anh Tuấn — Giám đốc công ty BĐS nhỏ

| Thông tin | Chi tiết |
|-----------|----------|
| **Tuổi** | 35-45 |
| **Giới tính** | Nam |
| **Thu nhập** | 50-100 triệu/tháng |
| **Trình độ IT** | Trung bình |
| **Quy mô công ty** | 5-20 nhân viên |
| **Vai trò** | Giám đốc / Chủ doanh nghiệp |

**Pain Points:**
- Cần website chuyên nghiệp cho công ty nhưng ngân sách IT hạn chế.
- Đã từng thuê developer nhưng bị phụ thuộc, update chậm.
- Muốn sở hữu source code để tùy chỉnh sau này.
- Cần giao cho nhân viên tự quản lý nội dung.

**Goals:**
- Sở hữu source code website hoàn chỉnh.
- Giao diện Premium, đẳng cấp.
- Nhiều nhân viên cùng quản lý nội dung.
- Có SEO, có blog, có dự án đầy đủ.

**Giải pháp phù hợp:** 🏷️ Gói mua Premium (5 triệu)

### 3.4 Persona 4: Chú Hùng — Nhà đầu tư BĐS nhỏ lẻ

| Thông tin | Chi tiết |
|-----------|----------|
| **Tuổi** | 40-55 |
| **Giới tính** | Nam |
| **Thu nhập** | 30-80 triệu/tháng |
| **Trình độ IT** | Kém |
| **Vai trò** | Nhà đầu tư cá nhân, đôi khi tự bán |

**Pain Points:**
- Hoàn toàn không biết công nghệ.
- Muốn có website đơn giản để giới thiệu BĐS đang bán.
- Không muốn phức tạp, chỉ cần nhanh gọn.

**Goals:**
- Website đơn giản, dễ dùng nhất có thể.
- Ai đó set up giúp, chỉ cần đăng bài.
- Chi phí rẻ.

**Giải pháp phù hợp:** 🏷️ Gói thuê Basic (200K/tháng) + Hỗ trợ cài đặt

---

## 4. Mô Hình Kinh Doanh (Business Model)

### 4.1 Mô hình 1: MUA SOURCE CODE (One-time Purchase)

```
Khách hàng → Chọn template → Gửi form báo giá → Admin liên hệ 
→ Chuyển khoản → Admin gửi source code (ZIP) → Khách tự deploy
```

| Gói | Giá | Bao gồm |
|-----|-----|---------|
| **Basic** | 2,000,000 VNĐ | Source code + 1 template + Hỗ trợ cài đặt 1 lần + Hướng dẫn sử dụng |
| **Pro** | 3,500,000 VNĐ | Basic + Hỗ trợ kỹ thuật 30 ngày + SEO cơ bản + 2 landing pages |
| **Premium** | 5,000,000 VNĐ | Pro + Hỗ trợ kỹ thuật 90 ngày + SEO nâng cao + Custom design + Tất cả templates |

**Ưu điểm cho khách:**
- Sở hữu vĩnh viễn source code.
- Tùy chỉnh không giới hạn.
- Không phí hàng tháng.

**Nhược điểm cho khách:**
- Tự host, tự bảo trì.
- Cần kiến thức kỹ thuật cơ bản hoặc thuê người.
- Không được update tự động.

### 4.2 Mô hình 2: THUÊ WEBSITE (Monthly Subscription)

```
Khách hàng → Chọn template → Gửi form báo giá → Admin liên hệ 
→ Chuyển khoản tháng đầu → Admin tạo tenant → Khách nhận subdomain 
→ Khách vào CMS chỉnh sửa nội dung
```

| Gói | Giá/tháng | Bao gồm |
|-----|-----------|---------|
| **Basic** | 200,000 VNĐ | 1 template + Subdomain + CMS cơ bản + 1GB storage + SSL |
| **Pro** | 350,000 VNĐ | Basic + Custom domain + SEO tools + 5GB storage + Ưu tiên hỗ trợ |
| **Premium** | 500,000 VNĐ | Pro + Tất cả templates + 20GB storage + Backup hàng ngày + Nhiều user |

**Ưu điểm cho khách:**
- Không cần biết kỹ thuật.
- Có website ngay lập tức.
- Được bảo trì, update, backup.
- Hỗ trợ kỹ thuật liên tục.

**Nhược điểm cho khách:**
- Không sở hữu source code.
- Phí hàng tháng.
- Phụ thuộc nền tảng.

### 4.3 Nguồn doanh thu bổ sung (tương lai)

| Nguồn | Mô tả | Giai đoạn |
|-------|-------|-----------|
| Template mới | Bán thêm template mới | Post-MVP |
| Add-on features | Tính năng bổ sung (chat, CRM mini) | Post-MVP |
| Affiliate | Giới thiệu hosting, domain | Post-MVP |
| Quảng cáo | Banner trên marketplace | Post-MVP |

---

## 5. Yêu Cầu Chức Năng (Feature Requirements)

### 5.1 Module: Marketplace

#### F-MKT-001: Trang chủ Marketplace

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Trang chủ giới thiệu nền tảng, hiển thị danh sách template nổi bật, lợi ích, bảng giá, testimonials, và CTA (Call-to-Action) |
| **User Story** | Là một khách truy cập, tôi muốn thấy ngay các template đẹp và hiểu được nền tảng cung cấp gì, để quyết định có muốn tìm hiểu thêm không |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Hero section với CTA rõ ràng |
| | - Danh sách template nổi bật (grid) |
| | - Section lợi ích (6 benefits) |
| | - Bảng giá 3 gói |
| | - FAQ section |
| | - Footer với thông tin liên hệ |
| | - Responsive trên mobile |
| | - Load time < 3s |

#### F-MKT-002: Danh sách Template

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Trang hiển thị tất cả template với filter và search |
| **User Story** | Là một khách hàng, tôi muốn duyệt và lọc các template theo loại, giá, để tìm template phù hợp nhu cầu |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Grid hiển thị template cards |
| | - Thumbnail preview cho mỗi template |
| | - Hiển thị: tên, mô tả ngắn, giá, tag |
| | - Filter theo category (nếu có) |
| | - Nút "Xem Demo" và "Mua ngay" |
| | - Pagination hoặc infinite scroll |

#### F-MKT-003: Chi tiết Template

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Trang chi tiết của một template với đầy đủ thông tin, screenshots, tính năng, giá |
| **User Story** | Là một khách hàng, tôi muốn xem chi tiết template trước khi quyết định mua/thuê |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Gallery ảnh screenshots (desktop + mobile) |
| | - Mô tả đầy đủ tính năng |
| | - Bảng giá (Mua vs Thuê) |
| | - Nút "Xem Demo trực tiếp" |
| | - Nút "Yêu cầu báo giá" |
| | - Thông tin kỹ thuật (tech stack) |
| | - Danh sách tính năng đi kèm |

#### F-MKT-004: Xem Demo tĩnh

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Cho phép xem demo website BĐS với dữ liệu mẫu, không chỉnh sửa được |
| **User Story** | Là một khách hàng, tôi muốn xem website mẫu thực tế để đánh giá giao diện |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Hiển thị website mẫu đầy đủ các trang |
| | - Dữ liệu mẫu giả lập |
| | - Navigation hoạt động bình thường |
| | - Responsive |
| | - Có thanh toolbar phía trên hiển thị tên template và nút CTA |

#### F-MKT-005: Demo tùy chỉnh (Customization Engine)

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Cho phép khách hàng thử nghiệm tùy chỉnh logo, màu sắc, banner, nội dung cơ bản trước khi mua |
| **User Story** | Là một khách hàng, tôi muốn thử thay đổi logo và màu sắc để hình dung website của mình sẽ trông như thế nào |
| **Priority** | P1 |
| **MVP Phase** | Phase 2 |
| **Acceptance Criteria** | - Upload logo (không cần đăng nhập) |
| | - Chọn màu chủ đạo (color picker) |
| | - Thay đổi banner text |
| | - Thay đổi tên công ty |
| | - Preview real-time |
| | - Cookie session cho anonymous user |
| | - Giới hạn: 3 lần save HOẶC 3 ngày (cái nào đến trước) |
| | - Hết giới hạn → redirect đến trang mua hàng |

#### F-MKT-006: Form yêu cầu báo giá

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Form để khách hàng gửi yêu cầu mua/thuê template |
| **User Story** | Là một khách hàng, tôi muốn gửi thông tin liên hệ để được tư vấn và mua template |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Fields: Họ tên, SĐT, Email, Loại hình (Mua/Thuê), Template quan tâm, Ghi chú |
| | - Validation đầy đủ |
| | - Gửi email thông báo cho Admin |
| | - Lưu vào database |
| | - Hiển thị thông báo thành công |
| | - Chống spam (rate limit) |

### 5.2 Module: Authentication

#### F-AUTH-001: Đăng ký tài khoản

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Đăng ký tài khoản mới cho Tenant Admin |
| **User Story** | Là một khách hàng đã mua/thuê, tôi muốn đăng ký tài khoản để truy cập CMS |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Fields: Email, Mật khẩu, Họ tên, SĐT |
| | - Validate email format, password strength (min 8 chars, 1 uppercase, 1 number) |
| | - Check email trùng |
| | - Hash password (bcrypt) |
| | - Tạo user với role TENANT_ADMIN |
| | - Gửi email xác nhận (Phase 2) |

#### F-AUTH-002: Đăng nhập

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Đăng nhập vào hệ thống bằng email + password |
| **User Story** | Là một người dùng đã có tài khoản, tôi muốn đăng nhập để quản lý website của mình |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Fields: Email, Mật khẩu |
| | - JWT access token (15 phút) + refresh token (7 ngày) |
| | - Refresh token lưu trong httpOnly cookie |
| | - Rate limit: 5 lần thất bại / 15 phút |
| | - Redirect đến CMS dashboard sau khi đăng nhập |

#### F-AUTH-003: Quên mật khẩu

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Cho phép reset mật khẩu qua email |
| **User Story** | Là một người dùng quên mật khẩu, tôi muốn reset lại để truy cập tài khoản |
| **Priority** | P1 |
| **MVP Phase** | Phase 2 |
| **Acceptance Criteria** | - Nhập email → gửi link reset (token hết hạn 1 giờ) |
| | - Click link → form nhập mật khẩu mới |
| | - Invalidate tất cả refresh tokens cũ |
| | - Thông báo thành công |

### 5.3 Module: CMS (Content Management System)

#### F-CMS-001: Dashboard

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Trang tổng quan hiển thị thống kê cơ bản của website tenant |
| **User Story** | Là một tenant admin, tôi muốn thấy tổng quan website để nắm tình hình |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Số lượng dự án, bài viết, liên hệ mới |
| | - Biểu đồ đơn giản (optional Phase 2) |
| | - Quick links đến các chức năng chính |
| | - Thông tin gói đang sử dụng |

#### F-CMS-002: Quản lý Dự án BĐS (CRUD)

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Tạo, sửa, xóa, liệt kê các dự án BĐS |
| **User Story** | Là một tenant admin, tôi muốn quản lý danh sách dự án BĐS trên website |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Danh sách dự án (table + pagination) |
| | - Tạo mới dự án với đầy đủ fields (xem Data Structure) |
| | - Upload nhiều ảnh (Cloudinary) |
| | - Rich text editor cho description |
| | - Auto-generate slug từ tên |
| | - Lưu nháp (draft) hoặc publish |
| | - Sửa, xóa dự án |
| | - Tìm kiếm, lọc theo status/type |

#### F-CMS-003: Quản lý Bài viết / Blog (CRUD)

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Tạo, sửa, xóa bài viết blog |
| **User Story** | Là một tenant admin, tôi muốn viết blog về BĐS để thu hút khách hàng |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - CRUD bài viết |
| | - Rich text editor |
| | - Upload ảnh thumbnail |
| | - Gắn category, tags |
| | - SEO fields (title, description) |
| | - Publish / Draft status |
| | - Auto slug |

#### F-CMS-004: Quản lý Thông tin Công ty

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Cập nhật thông tin công ty hiển thị trên website |
| **User Story** | Là một tenant admin, tôi muốn cập nhật thông tin liên hệ, giới thiệu của mình |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Fields: Tên công ty, địa chỉ, SĐT, email, mô tả, logo, slogan |
| | - Social links (Facebook, Zalo, YouTube) |
| | - Giờ làm việc |
| | - Google Maps embed |

#### F-CMS-005: Quản lý Banner

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Quản lý banner slides trên trang chủ website tenant |
| **User Story** | Là một tenant admin, tôi muốn thay đổi banner trên trang chủ |
| **Priority** | P1 |
| **MVP Phase** | Phase 2 |
| **Acceptance Criteria** | - CRUD banner items |
| | - Upload ảnh banner |
| | - Title, subtitle, CTA button text, CTA link |
| | - Sắp xếp thứ tự (drag hoặc input số) |
| | - Active/Inactive toggle |

#### F-CMS-006: Quản lý Menu

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Tùy chỉnh menu navigation của website |
| **User Story** | Là một tenant admin, tôi muốn thay đổi các mục menu trên website |
| **Priority** | P1 |
| **MVP Phase** | Phase 2 |
| **Acceptance Criteria** | - Danh sách menu items |
| | - Fields: Label, URL, Parent (cho submenu), Sort order |
| | - Hỗ trợ 2 cấp menu (parent → children) |
| | - Active/Inactive toggle |

#### F-CMS-007: Cài đặt SEO

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Cấu hình SEO chung cho website tenant |
| **User Story** | Là một tenant admin, tôi muốn cài đặt SEO để website xuất hiện tốt trên Google |
| **Priority** | P1 |
| **MVP Phase** | Phase 2 |
| **Acceptance Criteria** | - Meta title, description mặc định |
| | - OG image |
| | - Google Analytics ID |
| | - Google Search Console verification |
| | - Sitemap tự động |
| | - Robots.txt cấu hình |

#### F-CMS-008: Quản lý Media

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Thư viện media (ảnh) của tenant |
| **User Story** | Là một tenant admin, tôi muốn quản lý tất cả ảnh đã upload |
| **Priority** | P1 |
| **MVP Phase** | Phase 2 |
| **Acceptance Criteria** | - Grid hiển thị ảnh đã upload |
| | - Upload mới (single + multiple) |
| | - Xóa ảnh |
| | - Copy URL ảnh |
| | - Hiển thị dung lượng đã sử dụng |

#### F-CMS-009: Quản lý Form liên hệ

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Xem danh sách các form liên hệ khách hàng đã gửi trên website tenant |
| **User Story** | Là một tenant admin, tôi muốn xem các khách hàng đã liên hệ qua website |
| **Priority** | P1 |
| **MVP Phase** | Phase 2 |
| **Acceptance Criteria** | - Danh sách liên hệ (table) |
| | - Chi tiết liên hệ |
| | - Đánh dấu đã đọc / chưa đọc |
| | - Xóa |
| | - Email notification khi có liên hệ mới |

### 5.4 Module: Demo System

#### F-DEMO-001: Demo Session Management

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Quản lý session cho người dùng thử demo |
| **User Story** | Là một khách hàng, tôi muốn thử nghiệm tùy chỉnh website mà không cần đăng ký |
| **Priority** | P1 |
| **MVP Phase** | Phase 2 |
| **Acceptance Criteria** | - Tạo anonymous session bằng cookie |
| | - Lưu demo data (logo, colors, content) |
| | - Đếm số lần save (max 3) |
| | - Đếm thời gian (max 3 ngày từ lần tạo) |
| | - Hiển thị remaining saves/time |
| | - Hết giới hạn → redirect đến trang mua + thông báo |

### 5.5 Module: Website BĐS (Tenant Website)

#### F-WEB-001: Trang chủ

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Trang chủ website BĐS của tenant |
| **User Story** | Là một khách truy cập website tenant, tôi muốn thấy tổng quan về công ty BĐS |
| **Priority** | P0 |
| **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Banner slider |
| | - Giới thiệu ngắn |
| | - Dự án nổi bật (6 items) |
| | - Bài viết mới nhất (3 items) |
| | - Form liên hệ nhanh |
| | - SEO meta tags |

#### F-WEB-002: Trang Giới thiệu

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Trang giới thiệu chi tiết về công ty/cá nhân |
| **Priority** | P0 | **MVP Phase** | Phase 1 |

#### F-WEB-003: Trang Danh sách Dự án

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Hiển thị tất cả dự án BĐS với filter |
| **Priority** | P0 | **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Grid dự án với thumbnail, tên, giá, diện tích, vị trí |
| | - Filter: loại, trạng thái, khu vực, khoảng giá |
| | - Pagination |
| | - SEO friendly URLs (/du-an/ten-du-an) |

#### F-WEB-004: Trang Chi tiết Dự án

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Chi tiết một dự án BĐS |
| **Priority** | P0 | **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Gallery ảnh |
| | - Thông tin chi tiết (giá, diện tích, vị trí, tiện ích...) |
| | - Bản đồ Google Maps |
| | - Mặt bằng (floor plans) |
| | - Video YouTube embed |
| | - Virtual tour (iframe) |
| | - Form liên hệ / đăng ký tư vấn |
| | - Dự án liên quan |
| | - Schema markup cho SEO |

#### F-WEB-005: Trang Blog / Tin tức

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Danh sách bài viết blog |
| **Priority** | P0 | **MVP Phase** | Phase 1 |

#### F-WEB-006: Trang Liên hệ

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Trang liên hệ với form và thông tin |
| **Priority** | P0 | **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Thông tin liên hệ (từ CompanyInfo) |
| | - Google Maps embed |
| | - Form liên hệ (Tên, SĐT, Email, Nội dung) |
| | - Validation + spam protection |

### 5.6 Module: Admin Panel (Platform)

#### F-ADM-001: Dashboard Admin

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Tổng quan hệ thống cho Platform Admin |
| **Priority** | P0 | **MVP Phase** | Phase 1 |
| **Acceptance Criteria** | - Tổng số tenants, orders, revenue |
| | - Đơn hàng mới cần xử lý |
| | - Tenants mới đăng ký |

#### F-ADM-002: Quản lý Orders

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Xem, duyệt, xử lý đơn hàng |
| **Priority** | P0 | **MVP Phase** | Phase 1 |

#### F-ADM-003: Quản lý Tenants

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Tạo, kích hoạt, vô hiệu hóa tenants |
| **Priority** | P0 | **MVP Phase** | Phase 1 |

#### F-ADM-004: Quản lý Templates

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | CRUD templates, upload screenshots, quản lý pricing |
| **Priority** | P0 | **MVP Phase** | Phase 1 |

#### F-ADM-005: Gửi Source Code

| Thuộc tính | Chi tiết |
|------------|----------|
| **Mô tả** | Upload ZIP source code và gửi cho khách hàng mua |
| **Priority** | P0 | **MVP Phase** | Phase 1 |

---

## 6. Yêu Cầu Phi Chức Năng (Non-Functional Requirements)

### 6.1 Performance

| Metric | Yêu cầu | Ghi chú |
|--------|---------|---------|
| **Page Load Time** | < 3 giây (First Contentful Paint) | Đo trên 3G connection |
| **Time to Interactive** | < 5 giây | |
| **API Response Time** | < 500ms (P95) | Cho các API thông thường |
| **Image Load** | < 2 giây | Sử dụng Cloudinary optimization |
| **Lighthouse Score** | > 80 (Performance) | |
| **Concurrent Users** | 100 users/tenant website | |

### 6.2 Security

| Yêu cầu | Chi tiết |
|---------|----------|
| **Authentication** | JWT với access token (15 phút) + refresh token (7 ngày, httpOnly cookie) |
| **Password** | Bcrypt hash, min 8 chars, complexity rules |
| **Data Isolation** | Tenant data isolation qua tenant_id trên mọi query |
| **HTTPS** | Bắt buộc trên mọi environment (Cloudflare SSL) |
| **Input Validation** | Server-side validation cho mọi input |
| **XSS Protection** | Sanitize HTML input, Content-Security-Policy headers |
| **CSRF Protection** | SameSite cookies + CSRF tokens |
| **Rate Limiting** | API rate limit: 100 requests/phút/IP |
| **SQL Injection** | Prisma ORM parameterized queries |
| **File Upload** | Validate file type, size limit (5MB ảnh), chỉ cho phép image types |

### 6.3 Scalability

| Yêu cầu | Chi tiết |
|---------|----------|
| **Tenants** | Hỗ trợ 100+ tenants đồng thời trong Phase 1 |
| **Database** | PostgreSQL shared DB, index optimization |
| **Storage** | Cloudinary CDN cho media |
| **Horizontal Scale** | Docker containers có thể scale horizontally |

### 6.4 SEO

| Yêu cầu | Chi tiết |
|---------|----------|
| **SSR** | Server-side rendering cho tenant websites (Next.js) |
| **Meta Tags** | Dynamic meta title, description, OG tags |
| **Structured Data** | JSON-LD Schema markup (Organization, RealEstateListing) |
| **Sitemap** | Auto-generated sitemap.xml per tenant |
| **Robots.txt** | Configurable per tenant |
| **URL Structure** | SEO-friendly slugs (Vietnamese) |
| **Core Web Vitals** | LCP < 2.5s, FID < 100ms, CLS < 0.1 |

### 6.5 Reliability

| Yêu cầu | Chi tiết |
|---------|----------|
| **Uptime** | 99.5% |
| **Backup** | Database backup hàng ngày |
| **Error Handling** | Graceful error pages (404, 500) |
| **Monitoring** | Health check endpoint |

---

## 7. Chỉ Số Thành Công & KPIs (Success Metrics & KPIs)

### 7.1 KPIs Kinh doanh

| KPI | Mục tiêu (3 tháng) | Mục tiêu (6 tháng) |
|-----|--------------------|--------------------|
| Số tenant thuê website | 10 | 50 |
| Số bộ source code bán | 5 | 20 |
| MRR (Monthly Recurring Revenue) | 3,000,000 VNĐ | 15,000,000 VNĐ |
| Churn rate | < 10% | < 8% |
| CAC (Customer Acquisition Cost) | < 500,000 VNĐ | < 300,000 VNĐ |

### 7.2 KPIs Sản phẩm

| KPI | Mục tiêu |
|-----|---------|
| Số lượng form báo giá / tháng | 50+ |
| Conversion rate (visit → form) | > 5% |
| Demo → Purchase conversion | > 10% |
| CMS DAU (Daily Active Users) | 60% tenants |
| Thời gian onboarding trung bình | < 30 phút |

### 7.3 KPIs Kỹ thuật

| KPI | Mục tiêu |
|-----|---------|
| Uptime | > 99.5% |
| Average API response time | < 300ms |
| Page load time (P95) | < 3s |
| Error rate | < 1% |
| Lighthouse Performance Score | > 80 |

---

## 8. Giả Định & Ràng Buộc (Assumptions & Constraints)

### 8.1 Giả định

1. **Thanh toán thủ công**: Khách hàng sẽ chấp nhận quy trình thanh toán chuyển khoản ngân hàng + admin xác nhận trong giai đoạn MVP.
2. **1 developer**: MVP được phát triển bởi 1 Senior Developer trong 14 ngày.
3. **Hosting**: VPS với cấu hình tối thiểu (2 CPU, 4GB RAM, 80GB SSD) đủ cho 100 tenants đầu tiên.
4. **Traffic**: Mỗi tenant website trung bình 100-500 visitors/ngày trong giai đoạn đầu.
5. **Content**: Khách hàng sẽ tự nhập nội dung qua CMS sau khi được hướng dẫn.
6. **Domain**: Phase 1 chỉ hỗ trợ subdomain, custom domain ở Phase 2.

### 8.2 Ràng buộc

1. **Thời gian**: MVP Phase 1 phải hoàn thành trong 7 ngày.
2. **Ngân sách**: Tối thiểu (chỉ chi phí hosting + domain).
3. **Nhân lực**: 1 developer full-stack.
4. **Tech debt**: Chấp nhận tech debt trong MVP, refactor sau.
5. **Browser support**: Chrome, Firefox, Safari, Edge (2 phiên bản mới nhất).
6. **Mobile**: Responsive design, không native app.

---

## 9. Ngoài Phạm Vi (Out of Scope)

> [!WARNING]
> Các tính năng sau **KHÔNG** nằm trong scope MVP và sẽ được xem xét cho các phase sau.

| # | Tính năng | Lý do loại trừ |
|---|-----------|---------------|
| 1 | **AI / Machine Learning** | Quá phức tạp cho MVP, cần data training |
| 2 | **CRM (Customer Relationship Management)** | Không phải core value, dùng tool bên ngoài |
| 3 | **ERP (Enterprise Resource Planning)** | Quá phức tạp, không phù hợp target users |
| 4 | **Chat / Messaging** | Tích hợp Zalo/Facebook chat widget đủ dùng |
| 5 | **Giỏ hàng (Cart)** | Quy trình mua đơn giản, không cần cart |
| 6 | **Thanh toán online** | Chuyển khoản thủ công đủ dùng cho MVP, tích hợp VNPAY/Momo sau |
| 7 | **Drag & Drop Builder** | Quá phức tạp, CMS content-only là đủ |
| 8 | **Đa ngôn ngữ (Multi-language)** | Chỉ tiếng Việt cho MVP |
| 9 | **Mobile App** | Responsive web đủ dùng |
| 10 | **Social Login** | Email/password đủ dùng cho MVP |
| 11 | **Marketplace cho developer bên ngoài** | Chỉ template nội bộ |
| 12 | **A/B Testing** | Post-MVP |
| 13 | **Email Marketing** | Dùng tool bên ngoài |
| 14 | **Analytics Dashboard nâng cao** | Basic stats đủ cho MVP |

---

## 10. Bảng Thuật Ngữ (Glossary)

| Thuật ngữ | Giải thích |
|-----------|-----------|
| **BĐS** | Bất Động Sản (Real Estate) |
| **Tenant** | Khách hàng sử dụng dịch vụ thuê website, mỗi tenant có một website riêng |
| **Template** | Mẫu website thiết kế sẵn với giao diện và cấu trúc cố định |
| **CMS** | Content Management System — Hệ thống quản lý nội dung |
| **Marketplace** | Trang web chính nơi khách hàng xem và chọn template |
| **Subdomain** | Tên miền phụ dạng `abc.myplatform.com` |
| **Custom Domain** | Tên miền riêng của khách hàng (ví dụ: `abc-bds.com`) |
| **Multi-tenant** | Kiến trúc phần mềm cho phép nhiều khách hàng dùng chung hạ tầng |
| **SaaS** | Software as a Service — Phần mềm dưới dạng dịch vụ |
| **MRR** | Monthly Recurring Revenue — Doanh thu định kỳ hàng tháng |
| **CAC** | Customer Acquisition Cost — Chi phí thu hút khách hàng |
| **Churn Rate** | Tỷ lệ khách hàng rời bỏ dịch vụ |
| **JWT** | JSON Web Token — Phương thức xác thực |
| **SSR** | Server-Side Rendering — Render phía server |
| **SEO** | Search Engine Optimization — Tối ưu hóa công cụ tìm kiếm |
| **CRUD** | Create, Read, Update, Delete — Các thao tác cơ bản |
| **MVP** | Minimum Viable Product — Sản phẩm khả thi tối thiểu |
| **ORM** | Object-Relational Mapping — Ánh xạ đối tượng - quan hệ |
| **CDN** | Content Delivery Network — Mạng phân phối nội dung |
| **CTA** | Call to Action — Lời kêu gọi hành động |
| **OG Tags** | Open Graph Tags — Thẻ meta cho chia sẻ mạng xã hội |
| **LCP** | Largest Contentful Paint — Chỉ số tải nội dung lớn nhất |
| **FID** | First Input Delay — Độ trễ tương tác đầu tiên |
| **CLS** | Cumulative Layout Shift — Độ dịch chuyển layout tích lũy |
| **P0** | Priority 0 — Ưu tiên cao nhất, bắt buộc có trong MVP |
| **P1** | Priority 1 — Quan trọng, nên có trong MVP |
| **P2** | Priority 2 — Nice to have, có thể làm sau |
| **Landing Page** | Trang đích, thường dùng cho quảng cáo |
| **Form Báo Giá** | Form khách hàng điền thông tin để yêu cầu tư vấn giá |
| **Source Code** | Mã nguồn phần mềm |
| **Deploy** | Triển khai phần mềm lên server |
| **Docker** | Công nghệ containerization để đóng gói ứng dụng |

---

## 11. Lịch Sử Thay Đổi

| Phiên bản | Ngày | Người thay đổi | Nội dung thay đổi |
|-----------|------|----------------|-------------------|
| 1.0 | 05/07/2026 | Architect | Tạo mới tài liệu |

---

> [!NOTE]
> Tài liệu này là living document và sẽ được cập nhật liên tục trong quá trình phát triển sản phẩm. Mọi thay đổi cần được review và approve bởi Product Owner trước khi thực hiện.
