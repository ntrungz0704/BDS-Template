-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP #05 - Tổ Hợp Căn Hộ Khách Sạn 5 Sao Golden Park
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
("GOLDEN PARK TOWER", '0919 006 030', 'admin@templatesbds.com', 'Ngã tư Dương Đình Nghệ & Phạm Văn Bạch, KĐT Cầu Giấy, Yên Hòa, Cầu Giấy, Hà Nội', "TỔ HỢP CĂN HỘ CAO CẤP & KHÁCH SẠN 5 SAO CẦU GIẤY", '0919006030');

INSERT INTO `projects` (`code`, `title`, `description`, `price`, `area`, `image`) VALUES
('CĂN SỐ 01', 'Căn Hộ 2 Phòng Ngủ', '2PN · 2WC · 2 Logia', 'Giá: Từ 3.4 Tỷ', '82.6 m²', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'),
('CĂN SỐ 02', 'Căn Hộ 2PN + 1 Đa Năng', '2PN + 1 · 2WC · Ban công lớn', 'Giá: Từ 3.8 Tỷ', '91.8 m²', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'),
('CĂN SỐ 03', 'Căn Hộ 3 Phòng Ngủ', '3PN · 2WC · Bếp riêng', 'Giá: Từ 4.2 Tỷ', '100.2 m²', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'),
('CĂN SỐ 04', 'Căn Hộ 3PN Góc Thoáng', '3PN · 2WC · 2 Mặt thoáng', 'Giá: Từ 4.5 Tỷ', '105.6 m²', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'),
('CĂN SỐ 05', 'Căn Hộ 3PN Master VIP', '3PN · 3WC · Phòng thay đồ', 'Giá: Từ 5.1 Tỷ', '116.0 m²', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'),
('CĂN SỐ 06', 'Căn Hộ 3PN Panorama', '3PN · 3WC · View công viên', 'Giá: Từ 5.6 Tỷ', '125.4 m²', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'),
('CĂN SỐ 07', 'Căn Hộ 4 Phòng Ngủ Luxury', '4PN · 3WC · 3 Ban công', 'Giá: Từ 6.2 Tỷ', '132.5 m²', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'),
('CĂN SỐ 08', 'Duplex Thông Tầng', '4PN · 4WC · Sân vườn riêng', 'Giá: Từ 8.9 Tỷ', '185.0 m²', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80'),
('CĂN SỐ 09', 'Penthouse Hoàng Gia', '5PN · 5WC · Bể bơi chân mây', 'Giá: Từ 12.5 Tỷ', '235.0 m²', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80');
