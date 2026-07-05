# 08. User Flows

> Tài liệu này mô tả chi tiết luồng trải nghiệm người dùng (User Flows) thông qua các sơ đồ Mermaid và diễn giải bước cụ thể cho các quy trình nghiệp vụ cốt lõi của nền tảng Real Estate Template Marketplace & SaaS Platform.

---

## 1. Luồng mua hoặc thuê giao diện thủ công (Purchase/Rent Flow)

Luồng mô tả hành trình từ khi khách hàng chọn mua hoặc thuê trên Marketplace, chuyển khoản, tải bill và đợi duyệt kích hoạt.

```mermaid
flowchart TD
    Start([Khách vào Marketplace]) --> Browse[Duyệt danh sách Templates]
    Browse --> Detail[Xem Chi Tiết Template]
    Detail --> ChoosePlan{Chọn Mua hay Thuê?}
    
    ChoosePlan -->|Mua Source| RegisterBuy[Đăng ký mua + Điền thông tin]
    ChoosePlan -->|Thuê Web| RegisterRent[Đăng ký thuê + Điền thông tin & Subdomain]
    
    RegisterBuy --> DB_PendingBuy[Tạo đơn hàng PENDING]
    RegisterRent --> DB_PendingRent[Tạo đơn hàng PENDING]
    
    DB_PendingBuy --> PaymentScreen[Hiện thông tin chuyển khoản ngân hàng]
    DB_PendingRent --> PaymentScreen
    
    PaymentScreen --> TransferMoney[Khách chuyển khoản bằng QR/Internet Banking]
    TransferMoney --> UploadBill[Khách chụp và tải ảnh hóa đơn / Điền mã giao dịch]
    
    UploadBill --> DB_Confirm[Cập nhật trạng thái đơn hàng WAITING_CONFIRM]
    DB_Confirm --> AdminAlert[Gửi thông báo có đơn hàng cần duyệt cho Super Admin]
    
    AdminAlert --> AdminReview{Super Admin kiểm tra tiền thực tế?}
    
    AdminReview -->|Duyệt mua thành công| ActivateBuy[Kích hoạt quyền tải & gửi mail ZIP code]
    AdminReview -->|Duyệt thuê thành công| ActivateRent[Tự động tạo Subdomain, khởi tạo Tenant & gửi mail thông tin CMS]
    AdminReview -->|Từ chối/Sai tiền| RejectOrder[Cập nhật đơn REJECTED + gửi mail thông báo lỗi]
    
    ActivateBuy --> EndBuy([Hoàn thành đơn mua])
    ActivateRent --> EndRent([Hoàn thành đơn thuê])
    RejectOrder --> EndReject([Đóng đơn lỗi])
```

---

## 2. Luồng trải nghiệm và giới hạn dùng thử (Demo System Flow)

Luồng mô tả quá trình đăng ký dùng thử, chỉnh sửa giao diện và cơ chế tự động chặn khi hết hạn 3 ngày hoặc 3 lần lưu.

```mermaid
flowchart TD
    Start([Khách vào xem Demo tĩnh]) --> ClickTry[Bấm nút Chỉnh sửa thử giao diện]
    ClickTry --> CheckAuth{Đã đăng nhập chưa?}
    
    CheckAuth -->|Chưa| RegisterPage[Đăng ký / Đăng nhập tài khoản]
    CheckAuth -->|Rồi| CreateSession[DB khởi tạo DemoSession: Đếm 3 ngày + 3 lần lưu]
    
    RegisterPage --> CreateSession
    CreateSession --> CMS_Demo[Vào trang CMS Demo của Tenant]
    CMS_Demo --> Edit[Thay đổi Logo, banner, màu sắc hoặc nội dung BĐS]
    
    Edit --> ClickSave[Bấm Lưu thay đổi]
    ClickSave --> CheckLimit{Kiểm tra giới hạn dùng thử?}
    
    CheckLimit -->|Đã quá 3 ngày HOẶC đã lưu 3 lần| BlockSave[Chặn lưu + Hiện popup thông báo hết lượt]
    CheckLimit -->|Hợp lệ| SaveDB[Ghi thay đổi vào DB + Giảm số lần lưu còn lại]
    
    SaveDB --> Preview[Cập nhật màn hình hiển thị kết quả]
    Preview --> CMS_Demo
    
    BlockSave --> CTA[Yêu cầu mua/thuê chính thức để giữ lại dữ liệu]
    CTA --> ChooseBuyRent{Khách đồng ý nâng cấp?}
    
    ChooseBuyRent -->|Có| Purchase[Chuyển hướng sang luồng thanh toán chính thức]
    ChooseBuyRent -->|Không| EndDemo([Dừng phiên thử nghiệm])
```

---

## 3. Luồng Tenant Admin quản trị nội dung CMS (CMS CRUD Flow)

Luồng mô tả hành động thêm mới một dự án bất động sản của Tenant Admin, bao gồm bước tải ảnh lên Cloudinary và kiểm soát quota dung lượng.

```mermaid
flowchart TD
    Start([Tenant Admin đăng nhập CMS]) --> Dashboard[Vào Dashboard]
    Dashboard --> ClickProject[Vào mục Quản lý dự án BĐS]
    ClickProject --> ClickCreate[Bấm Thêm mới dự án]
    
    ClickCreate --> FillForm[Điền 27 trường thông tin + Chọn ảnh đại diện/gallery]
    FillForm --> ValidateClient{Zod check dữ liệu ở Client?}
    
    ValidateClient -->|Thiếu/Sai| ShowError[Hiển thị lỗi viền đỏ tại ô nhập liệu]
    ValidateClient -->|Hợp lệ| UploadImages[Tự động upload ảnh lên Cloudinary qua signature]
    
    UploadImages --> BackendReceive[API Backend nhận dữ liệu + Check Token & Tenant ID]
    BackendReceive --> CheckQuota{Kiểm tra tổng dung lượng sử dụng < 500MB?}
    
    CheckQuota -->|Vượt quá| BlockUpload[Trả về lỗi 400: Đầy bộ nhớ lưu trữ]
    CheckQuota -->|Hợp lệ| SaveProject[Lưu dự án vào PostgreSQL gắn kèm tenant_id]
    
    SaveProject --> SuccessAlert[Hiện Toast thông báo thành công]
    SuccessAlert --> ListProject[Quay về trang danh sách dự án]
    
    ShowError --> FillForm
    BlockUpload --> UpgradeAccount[Hiện gợi ý liên hệ nâng cấp gói lưu trữ]
```

---

## 4. Luồng khách truy cập Website Tenant (End-User Website Flow)

Luồng mô tả hành trình khách hàng xem dự án của một môi giới (ví dụ: `hoanggialand.myplatform.com`) và gửi liên hệ báo giá.

```mermaid
flowchart TD
    Start([Khách truy cập tenant.myplatform.com]) --> LoadWebsite[Next.js Middleware định tuyến + Tải giao diện theo Selected Theme]
    LoadWebsite --> ViewHome[Xem trang chủ: Banner slider, dự án nổi bật]
    ViewHome --> ClickProject[Click xem chi tiết dự án The Grand Riverside]
    
    ClickProject --> LoadDetail[API trả về 27 trường dữ liệu dự án BĐS]
    LoadDetail --> ViewInfo[Xem chi tiết: Thông số, tiện ích, bản đồ, video]
    ViewInfo --> FillContact[Điền form đăng ký tư vấn tại chân trang dự án]
    
    FillContact --> ClickSubmit[Bấm Gửi thông tin liên hệ]
    ClickSubmit --> SaveContact[Backend lưu thông tin vào bảng ContactFormSubmission]
    SaveContact --> EmailAlert[Gửi email thông báo Nodemailer báo cho Tenant Admin]
    
    EmailAlert --> ShowSuccess[Hiển thị thông báo gửi thành công cho khách]
    ShowSuccess --> End([Kết thúc])
```
