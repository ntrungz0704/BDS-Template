-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP #07 - Dinh Thự Đảo Sinh Thái Nghỉ Dưỡng Ven Sông
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
("LP #07 - Dinh Thự Đảo Sinh Thái Nghỉ Dưỡng Ven Sông", '0919 006 030', 'contact@platformbds.vn', 'TP. Hồ Chí Minh & Hà Nội', "KHÔNG GIAN SỐNG XANH RIÊNG TƯ TUYỆT ĐỐI BÊN DÒNG SÔNG");

INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Dinh Thự Song Lập Đảo Xanh (320m²)", "35.0 Tỷ", "320m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Dinh Thự Đơn Lập View Sông Trực Diện (550m²)", "62.0 Tỷ", "550m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Dinh Thự Tổng Thống Mũi Đảo Độc Bản (1.200m²)", "128.0 Tỷ", "1.200m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800");
