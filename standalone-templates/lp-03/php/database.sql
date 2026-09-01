-- Database Schema for LP-03
CREATE DATABASE IF NOT EXISTS bds_lp03 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bds_lp03;

CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `slogan` text NOT NULL,
  `zalo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
(1, 'SIMPLE PAGE', '0919 006 030', 'admin@templatesbds.com', 'Đại Lộ Trung Tâm Đô Thị Mới, Quận Nam Từ Liêm, Hà Nội / TP.HCM', '"Đẳng Cấp Không Gian Sống — Khẳng Định Vị Thế Thượng Lưu"', 'https://zalo.me/0919006030');

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `area_label` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `perk` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `projects` (`id`, `title`, `area_label`, `price`, `perk`, `full_name`, `image_url`) VALUES
(1, 'Căn 1 Phòng Ngủ', '48.5 m²', '1.85 Tỷ', '✓ Chiết khấu ngay 5% + Tặng 2 chỉ vàng', 'Căn Hộ 1 Phòng Ngủ (48.5 m²)', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'),
(2, 'Căn 2 Phòng Ngủ', '68.0 m²', '2.65 Tỷ', '✓ Tặng gói hoàn thiện nội thất 50 triệu', 'Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'),
(3, 'Căn 3 Phòng Ngủ', '95.0 m²', '3.55 Tỷ', '✓ Hỗ trợ vay 70% lãi suất 0% trong 24 tháng', 'Căn Hộ 3 Phòng Ngủ Master (92.0 m² - 110.0 m²)', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'),
(4, 'Sky Villa & Penthouse', '145.0 m²', '6.80 Tỷ', '✓ Tặng chuyến du lịch Châu Âu 5 sao 2 người', 'Penthouse & Sky Villa (145.0 m²)', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80');

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
