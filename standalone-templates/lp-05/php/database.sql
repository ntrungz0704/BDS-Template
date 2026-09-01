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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`name`, `phone`, `email`, `address`, `slogan`) VALUES
("LP #05 - Tổ Hợp Căn Hộ Khách Sạn 5 Sao Golden Park", '0919 006 030', 'contact@platformbds.vn', 'TP. Hồ Chí Minh & Hà Nội', "CĂN HỘ KHÁCH SẠN 5 SAO QUỐC TẾ GOLDEN PARK");

INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Studio Suite Hướng Biển (36m²)", "1.95 Tỷ", "36m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Executive Suite 1PN Panorama (54m²)", "2.85 Tỷ", "54m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Presidential Suite 2PN Tổng Thống (88m²)", "4.60 Tỷ", "88m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800");
