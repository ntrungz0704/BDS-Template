CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`company_name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
('HOMEO REALTY', '1900 6666', 'contact@homeorealty.com', '123 Đường BĐS, Quận Trung Tâm, TP.HCM', 'CỔNG GIAO DỊCH BẤT ĐỘNG SẢN TOÀN DIỆN', '1900 6666')
ON DUPLICATE KEY UPDATE company_name=VALUES(company_name);

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `bedrooms` varchar(50) DEFAULT NULL,
  `bathrooms` varchar(50) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `badge` varchar(50) DEFAULT NULL,
  `is_hot` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`title`, `image`, `address`, `price`, `area`, `bedrooms`, `bathrooms`, `type`, `badge`, `is_hot`) VALUES
('Biệt Thự Vườn Đơn Lập The Manor Central Park Hoàng Mai', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Đường Nguyễn Xiển, Hoàng Mai, Hà Nội', '28.5 Tỷ VNĐ', '210 m²', '5', '5', 'Biệt Thự Đơn Lập', 'Đang Mở Bán', 1),
('Căn Hộ Masteri Centre Point Vinhomes Grand Park Quận 9', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Khu Đô Thị Grand Park, TP. Thủ Đức, TP.HCM', '3.65 Tỷ VNĐ', '72 m²', '2', '2', 'Căn Hộ Chung Cư', 'Chính Chủ', 1),
('Penthouse Duplex Dát Vàng Vinhomes Golden River Ba Son Q1', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Số 2 Tôn Đức Thắng, Bến Nghé, Quận 1, TP.HCM', '48.0 Tỷ VNĐ', '320 m²', '4', '5', 'Penthouse', 'VIP Độc Bản', 1),
('Cho Thuê Căn Hộ Vinhomes Metropolis Liễu Giai Ba Đình Full Đồ', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', '29 Liễu Giai, Ba Đình, Hà Nội', '28 Triệu/tháng', '82 m²', '2', '2', 'Căn Hộ Chung Cư', 'Giá Tốt', 0),
('Cho Thuê Biệt Thự Thảo Điền Quận 2 Có Hồ Bơi Riêng Biệt', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Nguyễn Văn Hưởng, Thảo Điền, Quận 2, TP.HCM', '85 Triệu/tháng', '380 m²', '5', '6', 'Biệt Thự Đơn Lập', 'Mới Nhất', 1),
('Biệt Thự Biển Sun Premier Village The Eden Bay Mũi Ông Đội', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Mũi Ông Đội, An Thới, TP. Phú Quốc, Kiên Giang', '55.0 Tỷ VNĐ', '450 m²', '4', '5', 'Biệt Thự Đơn Lập', 'Đang Mở Bán', 1);
