-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-08 (HƯNG LỘC PHÁT & NOVAWORLD)
-- Tạo database: bds_08_hung_loc_phat
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_08_hung_loc_phat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_08_hung_loc_phat`;

-- Bảng lưu danh sách Bất Động Sản
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `status_badge` VARCHAR(100) DEFAULT 'Dự án đang phân phối',
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu 6 dự án phân phối tiêu biểu
INSERT INTO `properties` (`title`, `slug`, `status_badge`, `price`, `area`, `location`, `image`, `description`) VALUES
('DỰ ÁN PHỐ MỸ GOLD CITY BÀ RỊA VŨNG TÀU', 'du-an-pho-my-gold-city', 'Dự án đang phân phối', '1.85 Tỷ VNĐ', '105 m²', 'TX. Phú Mỹ, Bà Rịa - Vũng Tàu', 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80', 'Khu đô thị thương mại trung tâm thành phố cảng Phú Mỹ, kết nối trực tiếp cụm cảng Cái Mép.'),
('DỰ ÁN CĂN HỘ GOLDEN STAR QUẬN 7, TP.HCM', 'du-an-can-ho-golden-star-quan-7', 'Dự án đang phân phối', '3.45 Tỷ VNĐ', '68 m²', 'Nguyễn Thị Thập, Quận 7, TP.HCM', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Căn hộ bàn giao full nội thất cao cấp nhập khẩu châu Âu, hồ bơi tràn bờ tầng 21.'),
('DỰ ÁN CĂN HỘ GREEN STAR TP. QUẬN 7, TP.HCM', 'du-an-can-ho-green-star-quan-7', 'Dự án đang phân phối', '3.90 Tỷ VNĐ', '75 m²', 'Phạm Hữu Lầu, Quận 7, TP.HCM', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Khu phức hợp căn hộ xanh chăm sóc sức khỏe và sắc đẹp với hồ cảnh quan 7.000m².'),
('DỰ ÁN CĂN HỘ ECO GREEN QUẬN 7, TP.HCM (MỚI NHẤT)', 'du-an-can-ho-eco-green-quan-7', 'Dự án đang phân phối', '4.20 Tỷ VNĐ', '80 m²', 'Đại lộ Nguyễn Văn Linh, Quận 7, TP.HCM', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', 'Đại đô thị sinh thái 14ha liền kề công viên Hương Tràm 22ha, kết nối Thủ Thiêm 4.'),
('DỰ ÁN CĂN HỘ HƯNG PHÁT SILVER STAR NHÀ BÈ', 'du-an-can-ho-hung-phat-silver-star', 'Dự án đang phân phối', '2.85 Tỷ VNĐ', '72 m²', 'Nguyễn Hữu Thọ, Huyện Nhà Bè, TP.HCM', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Căn hộ chung cư mặt tiền trục giao thông huyết mạch Nguyễn Hữu Thọ, cách Phú Mỹ Hưng 3 phút.'),
('DỰ ÁN DIAMOND ISLAND CONDOTEL HƯNG LỘC PHÁT', 'du-an-diamond-island-condotel', 'Dự án đang phân phối', '1.65 Tỷ VNĐ', '45 m²', 'Mũi Né, TP. Phan Thiết, Bình Thuận', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Tổ hợp condotel view trực diện biển Mũi Né, cam kết lợi nhuận cho thuê 12%/năm.');

-- Bảng lưu thông tin khách hàng gửi từ Form nhận bảng giá
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `project_name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
