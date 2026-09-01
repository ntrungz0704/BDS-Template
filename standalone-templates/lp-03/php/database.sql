-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP #03 - Đất Nền Phân Lô F0 Sổ Đỏ Trao Tay
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
("LP #03 - Đất Nền Phân Lô F0 Sổ Đỏ Trao Tay", '0919 006 030', 'contact@platformbds.vn', 'TP. Hồ Chí Minh & Hà Nội', "ĐẤT NỀN ĐÔ THỊ TRỌNG ĐIỂM GIÁ GỐC F0");

INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Lô A1-A12 Mặt Tiền Đại Lộ 24m (100m²)", "1.25 Tỷ", "100m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Lô B5-B20 Liền Kề Công Viên Xanh (85m²)", "890 Triệu", "85m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Lô Góc Thương Mại 2 Mặt Tiền (145m²)", "1.95 Tỷ", "145m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800");
