-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-09 (AN VIÊN YACHT RESIDENCE NHA TRANG)
-- Tạo database: bds_09_anvien_nhatrang
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_09_anvien_nhatrang` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_09_anvien_nhatrang`;

-- Bảng lưu danh sách Bất Động Sản / Căn hộ
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `type` VARCHAR(100) DEFAULT 'Căn Hộ Nghỉ Dưỡng',
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu các dòng căn hộ An Viên Residence
INSERT INTO `properties` (`title`, `slug`, `type`, `price`, `area`, `location`, `image`, `description`) VALUES
('Studio Suite Panorama #ST-1808', 'studio-suite-panorama-1808', 'Studio 45.5m²', '2.35 Tỷ VNĐ', '45.5 m²', 'Bán Đảo An Viên, Nha Trang', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=80', 'Căn hộ Studio thiết kế mở tối ưu ánh sáng tự nhiên và gió biển, thích hợp cho khách du lịch lưu trú cao cấp.'),
('Executive 1BR Oceanview #EX-2205', 'executive-1br-oceanview-2205', '1 Phòng Ngủ 58.2m²', '3.10 Tỷ VNĐ', '58.2 m²', 'Bán Đảo An Viên, Nha Trang', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1000&q=80', 'Không gian sống lý tưởng dành cho các cặp đôi hoặc chuyên gia nước ngoài, ban công ngắm trọn hoàng hôn.'),
('Signature 2BR Grand Corner #SG-2802', 'signature-2br-grand-corner-2802', '2 Phòng Ngủ 78.6m²', '4.45 Tỷ VNĐ', '78.6 m²', 'Bán Đảo An Viên, Nha Trang', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80', 'Căn góc Signature sở hữu tầm nhìn panorama 270 độ bao trọn vịnh Nha Trang và bến du thuyền.'),
('Royal Ocean Suite #RY-3501', 'royal-ocean-suite-3501', '3 Phòng Ngủ 115.8m²', '6.85 Tỷ VNĐ', '115.8 m²', 'Bán Đảo An Viên, Nha Trang', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80', 'Tuyệt tác không gian sống dành cho đại gia đình thượng lưu với nội thất dát vàng hoàng gia.'),
('Imperial Penthouse #PH-3901 (Đỉnh Tháp)', 'imperial-penthouse-3901', 'Sky Villa 268m²', '18.50 Tỷ VNĐ', '268 m²', 'Bán Đảo An Viên, Nha Trang', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80', 'Dinh thự trên không độc bản tại đỉnh tháp An Viên kèm hồ bơi sục Jacuzzi riêng biệt.'),
('Dual Key Harmony #DK-1604', 'dual-key-harmony-1604', 'Dual Key 92.5m²', '5.20 Tỷ VNĐ', '92.5 m²', 'Bán Đảo An Viên, Nha Trang', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80', 'Giải pháp vừa ở vừa cho thuê tối ưu công suất khai thác lưu trú và dòng tiền ngoại tệ.');

-- Bảng lưu thông tin khách hàng gửi từ Form nhận bảng giá
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `unit_type` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
