# 15. Acceptance Criteria (Tiêu Chí Nghiệm Thu)

> Tài liệu này mô tả chi tiết tiêu chí nghiệm thu cho các tính năng cốt lõi của hệ thống Real Estate Template Marketplace & SaaS Platform trên cả hai phân kỳ: Phase 1 (MVP) và Phase 2 (Mở rộng). Mỗi tính năng được viết dưới dạng kịch bản Given/When/Then để làm cơ sở kiểm thử tự động (Automation Test) và kiểm thử thủ công (Manual UAT).

---

## Phân kỳ 1: Phase 1 (MVP - 7 Ngày)

### 1. Marketplace - Trang chủ & Danh sách Template

#### Feature: Hiển thị trang chủ Marketplace và danh sách mẫu giao diện BĐS
- **User Story:** Là một khách truy cập (Môi giới/Công ty BĐS), tôi muốn xem trang chủ Marketplace để hiểu về dịch vụ và duyệt danh sách các template BĐS cao cấp để lựa chọn mẫu phù hợp.

##### Scenario 1: Hiển thị trang chủ đầy đủ thông tin
- **Given:** Khách truy cập vào tên miền chính `www.myplatform.com`.
- **When:** Trang chủ được tải xong.
- **Then:** 
  - Hệ thống hiển thị Hero banner sang trọng phong cách Luxury Real Estate với dòng tiêu đề chính và nút kêu gọi hành động (CTA) "Khám phá các mẫu giao diện".
  - Hiển thị phần giới thiệu các tính năng nổi bật (Có web trong 5 phút, Không cần biết code, Tích hợp CMS quản trị).
  - Hiển thị lưới danh sách 3 template đầu tiên với hình ảnh thumbnail sắc nét, tên template, loại phong cách (Luxury, Minimal, Dark), giá mua (3.900.000 VNĐ) và giá thuê (399.000 VNĐ/tháng).
  - Hiển thị bảng so sánh giá công khai rõ ràng giữa gói Mua và Thuê.
  - Chân trang (Footer) chứa đầy đủ thông tin công ty nền tảng, điều khoản và liên kết mạng xã hội.

##### Scenario 2: Lọc danh sách template theo phong cách
- **Given:** Khách truy cập đang ở trang danh sách template.
- **When:** Chọn bộ lọc phong cách là "Luxury Gold".
- **Then:** 
  - Danh sách lập tức lọc chỉ hiển thị các template có gắn tag phong cách "Luxury Gold".
  - Các template thuộc phong cách khác bị ẩn đi.
  - Nếu không có template nào khớp, hiển thị thông báo "Không tìm thấy mẫu phù hợp, vui lòng thử lại".

---

### 2. Luồng Mua/Thuê & Xác nhận giao dịch thủ công

#### Feature: Đăng ký mua hoặc thuê template bằng phương thức chuyển khoản thủ công
- **User Story:** Là một khách hàng, tôi muốn đăng ký mua source code hoặc thuê website template và gửi bằng chứng chuyển khoản để admin kích hoạt dịch vụ cho tôi.

##### Scenario 1: Đăng ký thành công và nhận thông tin chuyển khoản
- **Given:** Khách hàng đang ở trang chi tiết Template 1 (Luxury Gold).
- **When:** Khách hàng click nút "Thuê Website 399k/tháng", điền đầy đủ họ tên, email, số điện thoại, mong muốn tên subdomain là `hoanggialand`, và click "Gửi đăng ký".
- **Then:**
  - Hệ thống tạo một bản ghi đơn hàng ở trạng thái `PENDING`.
  - Màn hình chuyển hướng sang trang "Thông tin thanh toán".
  - Hiển thị thông tin tài khoản ngân hàng nhận tiền, số tiền cần chuyển (399.000 VNĐ), và mã nội dung chuyển khoản bắt buộc dạng `THUE_HOANGGIALAND_OD123`.
  - Hiển thị form gồm 2 tùy chọn: "Upload ảnh biên lai (bill)" hoặc "Nhập mã giao dịch ngân hàng".

##### Scenario 2: Gửi bằng chứng chuyển khoản thành công
- **Given:** Khách hàng đang ở trang thông tin thanh toán của đơn hàng `PENDING`.
- **When:** Khách hàng chọn file ảnh bill dạng `.jpg` dung lượng 2MB upload lên hệ thống hoặc điền mã giao dịch `FT123456789` rồi bấm "Xác nhận đã chuyển khoản".
- **Then:**
  - File ảnh được tải lên Cloudinary thành công.
  - Trạng thái đơn hàng cập nhật thành `WAITING_CONFIRM`.
  - Hiển thị màn hình thông báo: *"Hệ thống đã nhận được bằng chứng thanh toán. Ban quản trị sẽ xác nhận và kích hoạt dịch vụ trong vòng 15 phút. Một email xác nhận đơn hàng đã được gửi tới email của bạn."*
  - Gửi email tự động thông qua Gmail SMTP báo cho Super Admin có đơn hàng cần duyệt.

##### Scenario 3: Super Admin duyệt đơn hàng thuê và tự động kích hoạt Subdomain
- **Given:** Super Admin đăng nhập vào hệ thống quản trị, xem danh sách đơn hàng và chọn đơn hàng `WAITING_CONFIRM` của tenant `hoanggialand`.
- **When:** Admin kiểm tra tài khoản thực tế và bấm nút "Phê duyệt đơn hàng".
- **Then:**
  - Đơn hàng cập nhật trạng thái thành `COMPLETED`.
  - Hệ thống tự động tạo mới một bản ghi Tenant trong cơ sở dữ liệu với slug `hoanggialand`, trạng thái `ACTIVE`.
  - Tự động tạo 1 tài khoản Tenant Admin ứng với email đăng ký của khách hàng, mật khẩu ngẫu nhiên được tự động tạo và gửi qua email.
  - Khách hàng có thể truy cập ngay vào địa chỉ `hoanggialand.myplatform.com` để xem giao diện mặc định.

##### Scenario 4: Super Admin duyệt đơn hàng mua và cấp quyền tải source code
- **Given:** Super Admin xem đơn hàng mua template `Luxury Gold` giá 3.900.000 VNĐ ở trạng thái `WAITING_CONFIRM`.
- **When:** Admin xác nhận tiền đã vào tài khoản và bấm "Phê duyệt đơn hàng".
- **Then:**
  - Đơn hàng cập nhật trạng thái thành `COMPLETED`.
  - Hệ thống tự động gửi email đính kèm file ZIP chứa source code template (trong Phase 1).
  - Cập nhật quyền tải cho tài khoản user (để chuẩn bị tải trực tiếp ở Phase 2).

---

### 3. Cơ chế dùng thử (Demo / Trial)

#### Feature: Tạo tài khoản và dùng thử tùy biến giao diện giới hạn
- **User Story:** Là một khách hàng, tôi muốn tạo tài khoản dùng thử để tự chỉnh sửa logo, banner và màu sắc trong CMS xem có phù hợp không trước khi quyết định xuống tiền mua/thuê.

##### Scenario 1: Kích hoạt phiên dùng thử
- **Given:** Khách hàng click "Dùng thử miễn phí" tại Template 1 trên Marketplace.
- **When:** Hệ thống yêu cầu đăng ký/đăng nhập. Khách hàng thực hiện đăng nhập thành công.
- **Then:**
  - Hệ thống tạo 1 bản ghi `DemoSession` trong DB gắn với `userId` và `templateId`. Trạng thái kích hoạt thử nghiệm 3 ngày bắt đầu đếm ngược.
  - Khách hàng được dẫn vào một trang CMS rút gọn của bản demo.
  - Hiển thị thanh trạng thái nổi (Floating Status Bar) hiển thị: *"Thời gian dùng thử còn lại: 2 ngày 23 giờ. Số lần lưu còn lại: 3/3."*

##### Scenario 2: Chỉnh sửa và lưu thay đổi thành công (Lần 1)
- **Given:** Khách hàng đang trong trang CMS dùng thử và thực hiện thay đổi logo công ty từ mặc định sang logo cá nhân, chỉnh màu chủ đạo sang màu Vàng hoàng gia (#C5A572).
- **When:** Khách hàng bấm nút "Lưu thay đổi".
- **Then:**
  - Hệ thống kiểm tra điều kiện dùng thử: Thời gian hiện tại < 3 ngày và số lần lưu đã thực hiện < 3.
  - Lưu thành công cấu hình mới vào cơ sở dữ liệu.
  - Số lần lưu còn lại giảm xuống còn 2/3. Thanh trạng thái cập nhật: *"Số lần lưu còn lại: 2/3"*.
  - Màn hình preview cập nhật hiển thị đúng logo mới và màu sắc chủ đạo mới.

##### Scenario 3: Chạm giới hạn lần lưu (Lưu quá 3 lần)
- **Given:** Khách hàng đã thực hiện lưu thay đổi thành công 3 lần (số lần lưu còn lại: 0/3).
- **When:** Khách hàng tiếp tục chỉnh sửa nội dung bài viết và bấm nút "Lưu thay đổi".
- **Then:**
  - Hệ thống chặn hành động lưu dữ liệu.
  - Hiển thị một Popup hộp thoại bắt mắt: 
    - Tiêu đề: **"Bạn đã dùng hết số lượt lưu thử nghiệm"**
    - Nội dung: *"Phiên bản dùng thử giới hạn tối đa 3 lần lưu để trải nghiệm. Toàn bộ thiết lập của bạn vẫn được lưu giữ. Vui lòng Mua hoặc Thuê website để kích hoạt sử dụng chính thức."*
    - Nút CTA: "Đăng ký Thuê ngay (399k/tháng)" và "Mua Source Code (3.9M)".
  - Không có dữ liệu mới nào được ghi vào cơ sở dữ liệu.

##### Scenario 4: Chạm giới hạn thời gian dùng thử (Quá 3 ngày)
- **Given:** Tài khoản dùng thử của khách hàng đã được tạo cách đây 3 ngày + 1 giờ.
- **When:** Khách hàng đăng nhập vào trang CMS dùng thử.
- **Then:**
  - Hệ thống tự động chuyển hướng khách hàng sang trang thông báo hết hạn dùng thử.
  - Hiện popup chặn toàn bộ màn hình yêu cầu nâng cấp tài khoản lên gói trả phí để tiếp tục.

---

### 4. Tenant CMS - Quản trị nội dung BĐS

#### Feature: Quản lý danh sách dự án BĐS (CRUD) trong CMS của Tenant
- **User Story:** Là một Tenant Admin, tôi muốn thêm mới, chỉnh sửa, xóa các dự án bất động sản của công ty tôi qua CMS để hiển thị lên website cho khách hàng xem.

##### Scenario 1: Tạo mới dự án BĐS đầy đủ thông tin hợp lệ
- **Given:** Tenant Admin đã đăng nhập vào CMS tại địa chỉ `cms.myplatform.com/hoanggialand`, đang ở màn hình "Thêm dự án mới".
- **When:** Admin điền đầy đủ thông tin:
  - Title: "Căn hộ Vinhomes Golden River Quận 1"
  - Price: "12 tỷ"
  - Area: "85m2"
  - Bedrooms: 2, Bathrooms: 2
  - Address: "2 Tôn Đức Thắng, Phường Bến Nghé, Quận 1"
  - Chọn ảnh đại diện từ máy tính, tải lên thành công.
  - Điền nội dung mô tả chi tiết, điền các trường SEO.
  - Bấm nút "Xuất bản".
- **Then:**
  - Dữ liệu qua bộ lọc Zod và backend validation thành công.
  - Bản ghi dự án được lưu vào database với `tenantId = tenant-1` (tương ứng với Hoàng Gia Land).
  - Trạng thái dự án là `published = true`.
  - Chuyển hướng về trang danh sách dự án với thông báo thành công: *"Đã thêm và xuất bản dự án mới thành công."*
  - Truy cập đường dẫn công khai `hoanggialand.myplatform.com/projects/can-ho-vinhomes-golden-river-quan-1` hiển thị đầy đủ thông tin dự án vừa tạo.

##### Scenario 2: Tạo dự án thất bại do thiếu thông tin bắt buộc
- **Given:** Tenant Admin đang ở màn hình thêm dự án.
- **When:** Admin bỏ trống trường Tiêu đề (`title`) và trường Giá (`price`), chỉ điền thông tin diện tích và bấm "Xuất bản".
- **Then:**
  - Hệ thống chặn không gửi dữ liệu hoặc Backend trả về lỗi validation `400 Bad Request`.
  - Hiển thị viền đỏ cảnh báo tại các ô nhập liệu thiếu thông tin.
  - Hiển thị thông báo lỗi cụ thể: *"Tiêu đề dự án không được bỏ trống"*, *"Giá dự án không được bỏ trống"*.
  - Không có bản ghi nào được tạo trong DB.

---

## Phân kỳ 2: Phase 2 (Mở rộng & Nâng cao)

### 5. Tải Source Code trực tiếp từ Dashboard

#### Feature: Khách hàng mua source code tự tải file ZIP tại Dashboard cá nhân
- **User Story:** Là một khách hàng đã mua source code của template, tôi muốn tự tải trực tiếp file code phiên bản mới nhất từ Dashboard của mình để tiến hành cài đặt mà không cần đợi admin gửi mail thủ công.

##### Scenario 1: Tải file thành công cho đơn hàng đã hoàn tất thanh toán
- **Given:** Khách hàng đăng nhập vào hệ thống, truy cập trang "Dịch vụ đã mua". Đơn hàng mua template Luxury Gold có trạng thái là `COMPLETED`.
- **When:** Khách hàng click vào nút "Tải Source Code (Bản v1.2.0)".
- **Then:**
  - Backend xác thực quyền sở hữu: Kiểm tra có bản ghi Order dạng `BUY` của `userId` này với `templateId` tương ứng ở trạng thái `COMPLETED`.
  - Trả về luồng stream file zip lưu trữ an toàn trên máy chủ.
  - Trình duyệt của khách hàng tự động tải xuống file `luxury-gold-v1.2.0.zip`.

##### Scenario 2: Chặn tải file đối với đơn hàng chưa thanh toán hoặc chưa được duyệt
- **Given:** Khách hàng đã gửi đơn mua source code nhưng trạng thái đơn hàng vẫn là `PENDING` hoặc `WAITING_CONFIRM`.
- **When:** Khách hàng truy cập trực tiếp vào URL tải file `/api/admin/templates/download/luxury-gold`.
- **Then:**
  - Hệ thống chặn quyền truy cập, trả về mã lỗi `403 Forbidden`.
  - Hiển thị thông báo trên giao diện: *"Bạn chưa hoàn tất thanh toán cho mẫu giao diện này. Vui lòng thanh toán để tải source code."*

---

### 6. Quản lý Tên miền riêng (Custom Domain)

#### Feature: Khách thuê website cấu hình ánh xạ tên miền riêng của họ
- **User Story:** Là một khách thuê website (Tenant Admin), tôi muốn trỏ tên miền riêng của mình (ví dụ: `hoanggialand.vn`) về hệ thống thay vì dùng subdomain mặc định để tăng tính thương hiệu chuyên nghiệp.

##### Scenario 1: Cấu hình tên miền riêng và xác thực DNS thành công
- **Given:** Tenant Admin đã cấu hình bản ghi `CNAME` tên miền `hoanggialand.vn` trỏ về tên miền nền tảng `myplatform.com` trên trang quản lý DNS của họ. Admin truy cập CMS của tenant, vào mục "Cấu hình tên miền".
- **When:** Admin nhập `hoanggialand.vn` vào ô Tên miền riêng và bấm "Kiểm tra kết nối & Lưu".
- **Then:**
  - Backend thực hiện kiểm tra DNS thực tế (DNS Lookup).
  - Xác nhận bản ghi CNAME trỏ chính xác về IP/Domain của nền tảng.
  - Lưu tên miền `hoanggialand.vn` vào trường `customDomain` của bảng `Tenant` trong DB.
  - Gọi webhook cấu hình Nginx Reverse Proxy / Cloudflare SSL auto-provisioning.
  - Trả về thông báo thành công: *"Tên miền riêng đã được liên kết thành công. Vui lòng đợi 5-10 phút để chứng chỉ SSL được khởi tạo."*

##### Scenario 2: Báo lỗi khi tên miền chưa được trỏ DNS chính xác
- **Given:** Khách hàng chưa cấu hình bản ghi CNAME hoặc cấu hình sai IP trên nhà cung cấp tên miền của họ.
- **When:** Khách hàng điền tên miền vào CMS và bấm nút "Kiểm tra kết nối & Lưu".
- **Then:**
  - Backend thực hiện DNS Lookup và phát hiện lỗi không tìm thấy bản ghi hoặc trỏ sai địa chỉ.
  - Hiển thị thông báo lỗi màu đỏ: *"Kiểm tra kết nối thất bại. Vui lòng đảm bảo bạn đã cấu hình bản ghi CNAME trỏ tên miền riêng về myplatform.com trước khi thực hiện liên kết."*
  - Không lưu tên miền lỗi vào Database.
