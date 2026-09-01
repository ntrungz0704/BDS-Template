-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP #02 - Biệt Thự & Nghỉ Dưỡng Hoàng Gia VIP
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
("LP #02 - Biệt Thự & Nghỉ Dưỡng Hoàng Gia VIP", '0919 006 030', 'contact@platformbds.vn', 'TP. Hồ Chí Minh & Hà Nội', "DINH THỰ BIỂN NGHỈ DƯỠNG THƯỢNG LƯU PANORAMA");

INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Villa Song Lập View Hồ Cảnh Quan (220m²)", "15.8 Tỷ", "220m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Villa Đơn Lập Sân Vườn Nhiệt Đới (380m²)", "26.5 Tỷ", "380m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Dinh Thự Mặt Biển Trực Diện VIP (650m²)", "58.0 Tỷ", "650m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800");
