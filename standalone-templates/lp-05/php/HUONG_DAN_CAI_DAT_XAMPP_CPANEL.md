# HƯỚNG DẪN CÀI ĐẶT LP #05 - TỔ HỢP CĂN HỘ KHÁCH SẠN 5 SAO GOLDEN PARK (PHP & MYSQL)

## 1. Cài đặt trên XAMPP / Laragon
1. Copy toàn bộ thư mục `php` vào thư mục `htdocs` (VD: `C:/xampp/htdocs/lp-05`).
2. Mở phpMyAdmin (`http://localhost/phpmyadmin`), tạo database mới tên: `lp_05_db`.
3. Chọn tab Import và nạp file `database.sql`.
4. Truy cập `http://localhost/lp-05` để xem website hoạt động!

## 2. Cài đặt trên Hosting cPanel
1. Mở File Manager và upload toàn bộ nội dung thư mục `php` vào `public_html`.
2. Tạo MySQL Database trên cPanel và import `database.sql`.
3. Sửa thông tin tài khoản Database trong `config/db.php`.
