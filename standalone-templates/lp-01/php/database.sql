-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP #01 - Căn Hộ Chung Cư Cao Cấp Launch Funnel
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
("LP #01 - Căn Hộ Chung Cư Cao Cấp Launch Funnel", '0919 006 030', 'contact@platformbds.vn', 'TP. Hồ Chí Minh & Hà Nội', "KHÔNG GIAN SỐNG THÔNG MINH CHUẨN QUỐC TẾ");

INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Căn hộ 1PN + 1 Smart (48m²)", "1.85 Tỷ", "48m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Căn hộ 2PN 2WC Ban công Panorama (68m²)", "2.80 Tỷ", "68m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Căn hộ 3PN Góc 2 Mặt Thoáng (92m²)", "3.95 Tỷ", "92m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Sky Villa Penthouse Sân Vườn (185m²)", "8.50 Tỷ", "185m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800");
