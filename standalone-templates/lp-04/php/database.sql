-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP #04 - VẠN PHÚC CITY / ROYAL PALACE ECO-TOWNSHIP
-- Landing Page Sale Môi Giới BĐS Triệu Đô Authority
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `slogan` varchar(500) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `source` varchar(100) DEFAULT 'hero_form',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `specs` text DEFAULT NULL,
  `bedrooms` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu: Thông tin Đại Đô Thị VẠN PHÚC CITY
INSERT INTO `company_info` (`name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
("VẠN PHÚC CITY / ROYAL PALACE ECO-TOWNSHIP", '0919 006 030', 'admin@templatesbds.com', 'Bán Đảo Vạn Phúc, Quốc Lộ 13, TP. Thủ Đức, TP. Hồ Chí Minh & Hà Nội', "Biểu tượng thịnh vượng mới bên sông Sài Gòn — Đẳng cấp sống vương giả dành riêng cho 1% giới thượng lưu tinh hoa.", '0919006030');

-- Dữ liệu mẫu: Các phân khu sản phẩm BĐS
INSERT INTO `projects` (`title`, `price`, `area`, `type`, `specs`, `bedrooms`, `address`, `image`) VALUES
("Biệt Thự Hoàng Gia Mansion Villas", "Từ 25 Tỷ VNĐ", "250m² - 500m²", 'BIET_THU', 'Kiến trúc Tân Cổ Điển Châu Âu, hồ bơi riêng, hầm rượu vang, sân vườn rộng. 1 Hầm 4 Tầng, bàn giao hoàn thiện cao cấp.', '5 PN + 7 WC', 'TP. Thủ Đức, TP. HCM', "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"),
("Shophouse Phố Đi Bộ Châu Âu", "Từ 18 Tỷ VNĐ", "140m² - 220m²", 'SHOPHOUSE', 'Mặt tiền đại lộ ánh sáng, tối ưu vừa kinh doanh thương mại vừa để ở. Mặt tiền rộng 7m - 9m, hầm để xe riêng.', '4 PN + 5 WC', 'TP. Thủ Đức, TP. HCM', "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"),
("Dinh Thự Đảo Ngọc Ven Hồ", "Từ 45 Tỷ VNĐ", "600m² - 1200m²", 'DINH_THU', 'Bộ sưu tập giới hạn 36 căn dinh thự độc bản. Bến du thuyền riêng, hồ bơi vô cực tràn bờ.', '6 PN + 8 WC', 'TP. Thủ Đức, TP. HCM', "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"),
("Tổng Thể Đại Đô Thị 198 Hécta", "Từ 8.5 Tỷ VNĐ", "198 ha", 'TONG_THE', '3 mặt giáp sông Sài Gòn, hồ cảnh quan Đại Nhật 16ha, công viên giải trí chuẩn quốc tế. 10 phân khu chức năng.', '', 'TP. Thủ Đức, TP. HCM', "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800");
