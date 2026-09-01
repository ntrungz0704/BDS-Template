-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP #06 - Khu Đô Thị Công Nghiệp & Dịch Vụ VSIP
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
("LP #06 - Khu Đô Thị Công Nghiệp & Dịch Vụ VSIP", '0919 006 030', 'contact@platformbds.vn', 'TP. Hồ Chí Minh & Hà Nội', "KHU ĐÔ THỊ CÔNG NGHIỆP & LOGISTICS XANH THÔNG MINH");

INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Nhà Xưởng Tiêu Chuẩn Xây Sẵn (2.500m²)", "$4.2/m²", "2.500m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Nhà Xưởng Cao Tầng Thông Minh (5.000m²)", "$3.8/m²", "5.000m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Lô Đất Công Nghiệp Sạch Quy Hoạch Sẵn (1.5 Ha)", "$120/m²", "15.000m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800");
