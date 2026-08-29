# HƯỚNG DẪN CÀI ĐẶT WEBSITE BẤT ĐỘNG SẢN BẰNG PHP & MYSQL

## 1. Cài đặt trên máy tính với XAMPP / Laragon
1. Tải và cài đặt phần mềm **XAMPP** hoặc **Laragon**.
2. Copy toàn bộ thư mục `php` này vào thư mục `htdocs` của XAMPP (VD: `C:/xampp/htdocs/bds-16`).
3. Mở **phpMyAdmin** (`http://localhost/phpmyadmin`).
4. Tạo database mới tên: `bds_personal_top_broker`.
5. Chọn tab **Import (Nhập)** và chọn file `database.sql` nằm trong thư mục này để nạp dữ liệu.
6. Mở trình duyệt và truy cập: `http://localhost/bds-16` để xem website hoạt động!

## 2. Cài đặt trên Hosting (cPanel / DirectAdmin)
1. Đăng nhập vào cPanel Hosting của bạn.
2. Mở **MySQL Database Wizard** để tạo Database và User.
3. Mở **phpMyAdmin** trên cPanel và Import file `database.sql`.
4. Upload toàn bộ các file trong thư mục `php` lên thư mục `public_html`.
5. Sửa thông tin tài khoản Database trong file `config/db.php` cho khớp với hosting.
6. Truy cập tên miền của bạn để hoàn tất!
