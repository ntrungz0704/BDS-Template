-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP #04 - Sale Môi Giới BĐS Triệu Đô Authority
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
("LP #04 - Sale Môi Giới BĐS Triệu Đô Authority", '0919 006 030', 'contact@platformbds.vn', 'TP. Hồ Chí Minh & Hà Nội', "TƯ VẤN ĐẦU TƯ BẤT ĐỘNG SẢN AN TOÀN & SINH LỜI CAO");

INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Căn Hộ 2PN Masteri Thảo Điền (Cắt Lỗ 400Tr)", "3.65 Tỷ", "72m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Nhà Phố KĐT Vạn Phúc City (Chính Chủ Gửi Bán)", "16.5 Tỷ", "115m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Biệt Thự Đơn Lập Aqua City (Giá Rẻ Hơn CĐT 20%)", "12.8 Tỷ", "240m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800");
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `address`, `image`) VALUES ("Đất Nền Sổ Đỏ Ven Biển Đà Nẵng (Hàng Hiếm)", "2.95 Tỷ", "120m²", 'CAN_HO', 'TP. Hồ Chí Minh', "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800");
