-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-15 (LUPUL GROUP REAL ESTATE)
-- Tạo database: bds_15_lupulgroup_realestate
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_15_lupulgroup_realestate` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_15_lupulgroup_realestate`;

-- Bảng lưu danh sách Bất Động Sản / Căn hộ / Biệt thự
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `type` VARCHAR(100) DEFAULT 'Căn Hộ',
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu các sản phẩm Lupul Group
INSERT INTO `properties` (`title`, `slug`, `type`, `price`, `area`, `location`, `district`, `image`, `description`) VALUES
('The Flora Avenue Sky Living Phú Mỹ Hưng', 'the-flora-avenue-sky-living-phu-my-hung', 'Căn Hộ Cao Cấp', '3.85 Tỷ VNĐ', '85 m²', 'Đại lộ Nguyễn Văn Linh, Tân Phú, Quận 7, TP.HCM', 'Quận 7', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Căn hộ view sông công viên trung tâm Phú Mỹ Hưng với đầy đủ tiện ích cao cấp.'),
('Căn Hộ Nghỉ Dưỡng Vũng Tàu Melody Bãi Sau', 'can-ho-nghi-duong-vung-tau-melody-bai-sau', 'Căn Hộ Biển', '2.15 Tỷ VNĐ', '60 m²', 'Góc đường Võ Thị Sáu - Hoàng Hoa Thám, TP. Vũng Tàu', 'TP. Vũng Tàu', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'Căn hộ du lịch ngắm trọn vẹn biển Bãi Sau, cách bờ biển 200m đi bộ.'),
('Vinhomes Grand Park Quận 9 Phân Khu Origami', 'vinhomes-grand-park-quan-9-phan-khu-origami', 'Căn Hộ Thông Minh', '2.90 Tỷ VNĐ', '70 m²', 'Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, TP. Thủ Đức', 'TP. Thủ Đức', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Căn hộ đậm chất văn hóa Nhật Bản liền kề vườn thiền sỏi trắng và đại công viên 36ha.'),
('Biệt Thự Đơn Lập EcoLake Ven Hồ Cảnh Quan Sinh Thái', 'biet-thu-don-lap-ecolake-ven-ho-canh-quan', 'Biệt Thự Đơn Lập', '9.80 Tỷ VNĐ', '250 m²', 'Khu Đô Thị Sinh Thái EcoLake, Bến Cát, Bình Dương', 'Bến Cát', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Dinh thự ven hồ với hồ bơi riêng và sân vườn nhiệt đới rộng lớn.');

-- Bảng lưu thông tin khách hàng nhận tư vấn vay vốn
CREATE TABLE IF NOT EXISTS `loan_leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `amount` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
