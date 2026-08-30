# 🤖 HƯỚNG DẪN LẤY API KEY GOOGLE GEMINI AI MIỄN PHÍ 100%

> **Tài liệu hướng dẫn dành cho người không rành kỹ thuật:** Chỉ mất **1 phút** với tài khoản Gmail cá nhân để kích hoạt tính năng **Trợ Lý Ảo AI Tư Vấn BĐS** & **AI Viết Tin Tự Động** trên Website của bạn. Hoàn toàn **0 ĐỒNG** và không cần thẻ tín dụng!

---

## 📌 BƯỚC 1: TRUY CẬP GOOGLE AI STUDIO

1. Mở trình duyệt web và truy cập vào đường dẫn chính thức của Google:
   👉 **[https://aistudio.google.com/](https://aistudio.google.com/)**

2. Đăng nhập bằng **Tài khoản Gmail** của bạn.

---

## 🔑 BƯỚC 2: TẠO VÀ SAO CHÉP API KEY

1. Tại góc trên bên trái màn hình, bấm vào nút màu xanh dương:
   👉 **"Get API key"** (hoặc biểu tượng chìa khóa 🔑).

2. Bấm vào nút **"Create API key"** (Tạo khóa API mới).

3. Chọn một dự án mặc định (hoặc bấm **"Create API key in new project"**).

4. Google sẽ tạo ra một đoạn mã chìa khóa bảo mật có dạng:
   `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

5. Bấm vào nút **"Copy"** 📋 để sao chép mã chìa khóa này.

---

## ⚙️ BƯỚC 3: DÁN API KEY VÀO WEBSITE CỦA BẠN

Có **2 cách đơn giản** để kích hoạt:

### 👉 CÁCH 1: Dán trực tiếp trong CMS Quản Trị Website (Khuyên Dùng)
1. Đăng nhập vào trang **Dashboard Khách Hàng** $\rightarrow$ Mục **"Website Của Tôi"** $\rightarrow$ Bấm nút **"Sửa Nội Dung Website (CMS)"**.
2. Chọn tab **"Cấu Hình AI Trợ Lý"**.
3. Dán đoạn mã khóa `AIzaSy...` vừa sao chép vào ô **"Google Gemini API Key"** $\rightarrow$ Bấm **"Lưu Cấu Hình"**.
4. Xong! Chatbot AI và công cụ AI Viết Tin trên website của bạn đã sẵn sàng hoạt động 24/7.

---

### 👉 CÁCH 2: Dán vào file cấu hình `.env` (Dành cho mã nguồn tải về ZIP / Hosting)
1. Mở file `.env` hoặc file `config.js` / `config.php` trong thư mục mã nguồn website.
2. Tìm dòng `GEMINI_API_KEY=` hoặc `NEXT_PUBLIC_GEMINI_API_KEY=`.
3. Dán mã khóa của bạn vào:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY="AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   ```
4. Lưu file lại là hoàn tất.

---

## 🛡️ CHÍNH SÁCH BẢO VỆ & GIỚI HẠN SỬ DỤNG MIỄN PHÍ

* **Gói Free của Google AI Studio:** Miễn phí lên tới **15 - 60 câu hỏi/phút** (hoàn toàn dư dả cho website BĐS thông thường).
* **Cơ chế giới hạn an toàn tích hợp sẵn:** Hệ thống website đã cài sẵn bộ đếm **Giới hạn 10 câu hỏi / ngày / người truy cập (theo giờ Việt Nam UTC+7)** để chống spam câu hỏi và tiết kiệm tối đa tài nguyên API Key cho bạn.
* Khi khách hỏi hết 10 câu trong ngày, hệ thống sẽ tự động điều hướng khách bấm gọi Hotline hoặc nhắn tin Zalo trực tiếp cho bạn!
