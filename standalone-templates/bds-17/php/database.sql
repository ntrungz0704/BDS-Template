CREATE DATABASE IF NOT EXISTS `bds_17_cms` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_17_cms`;

DROP TABLE IF EXISTS `company_info`;
CREATE TABLE `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
(1, 'BEVERLY HILLS HẠ LONG', '0919 006 030', 'contact@beverlyhills.com', 'Đồi Hải Quân, Bãi Cháy, TP. Hạ Long', 'ĐỈNH CAO NGHỈ DƯỠNG THƯỢNG LƯU — BÃI CHÁY', '0919006030');

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_string` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `floor` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `priceNum` float DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `areaNum` float DEFAULT NULL,
  `beds` int(11) DEFAULT 0,
  `baths` int(11) DEFAULT 0,
  `view` varchar(255) DEFAULT NULL,
  `direction` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `planImage` varchar(255) DEFAULT NULL,
  `hot` tinyint(1) DEFAULT 0,
  `featured` tinyint(1) DEFAULT 0,
  `description` text,
  `specs` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `projects` (`id_string`, `title`, `code`, `slug`, `type`, `floor`, `price`, `priceNum`, `area`, `areaNum`, `beds`, `baths`, `view`, `direction`, `image`, `planImage`, `hot`, `featured`, `description`, `specs`) VALUES
('can-studio-view-vinh', 'Căn Hộ Studio Nghỉ Dưỡng View Trực Diện Vịnh Hạ Long', 'BH-ST08', 'can-ho-studio-nghi-duong-view-vinh-ha-long', 'Căn Hộ Studio', 'Tầng 08 - 12', '1.65 Tỷ VNĐ', 1.65, '42 m²', 42, 1, 1, 'View Vịnh Hạ Long & Cầu Bãi Cháy', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 1, 'Căn hộ khách sạn Condotel đầy đủ nội thất 5 sao, ban công kính tràn ngắm trọn vẹn cảnh bình minh trên Vịnh di sản thế giới.', '["Bàn giao full nội thất 5 sao", "Cam kết thuê lại 12%/năm", "Sở hữu lâu dài", "Tặng 15 đêm nghỉ dưỡng/năm"]'),
('can-1pn-view-sunwheel', 'Căn Hộ 1 Phòng Ngủ View Vòng Quay Mặt Trời Sun Wheel', 'BH-1P15', 'can-ho-1-phong-ngu-view-vong-quay-mat-troi', '1 Phòng Ngủ', 'Tầng 14 - 18', '2.35 Tỷ VNĐ', 2.35, '58 m²', 58, 1, 1, 'View Sun Wheel & Công Viên Rồng', 'Hướng Đông Bắc', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 0, 1, 'Thiết kế thông minh tối ưu công năng, phòng khách liên thông bếp hiện đại, ngắm pháo hoa lễ hội rực rỡ quanh năm.', '["Nội thất gỗ óc chó cao cấp", "Kính Low-E cách âm cách nhiệt", "Khóa từ vân tay Hafele", "Hỗ trợ vay 70%"]'),
('can-2pn-panorama-goc', 'Căn Hộ Góc 2 Phòng Ngủ Panorama 2 Mặt Thoáng Hướng Biển', 'BH-2P09', 'can-ho-goc-2-phong-ngu-panorama-huong-bien', '2 Phòng Ngủ', 'Tầng 09 - 16', '3.60 Tỷ VNĐ', 3.6, '82 m²', 82, 2, 2, 'View Panorama 270 độ Vịnh Hạ Long', 'Hướng Nam - Đông Nam', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, 'Căn hộ góc đẳng cấp với 2 ban công rộng lớn, phòng ngủ Master có bồn tắm kính ngắm vịnh biển thơ mộng.', '["Căn góc 2 mặt thoáng", "Bồn tắm view biển Master", "Miễn phí quản lý 2 năm", "Sổ đỏ trao tay"]'),
('can-3pn-tong-thong', 'Căn Hộ 3 Phòng Ngủ Hoàng Gia Suite Tầng Cao VIP', 'BH-3P19', 'can-ho-3-phong-ngu-hoang-gia-suite-tang-cao', '3 Phòng Ngủ', 'Tầng 18 - 19', '5.20 Tỷ VNĐ', 5.2, '115 m²', 115, 3, 3, 'Trọn vẹn Vịnh Kỳ Quan & Cảng Tàu Quốc Tế', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 0, 1, 'Dành riêng cho những chủ nhân danh giá, không gian sinh hoạt chung rộng hơn 50m² cùng tiêu chuẩn hoàn thiện siêu sang.', '["Thang máy riêng bảo mật", "Trần cao 3.6m", "Hệ thống Smart Home Kohler", "Tặng voucher nội thất 200 Tr"]'),
('biet-thu-doi-beverly-hills', 'Dinh Thự Đồi Beverly Hills Đơn Lập Có Bể Bơi Riêng Biệt', 'BH-VILLA03', 'dinh-thu-doi-beverly-hills-don-lap-be-boi-rieng', 'Biệt Thự Đơn Lập', 'Khu Dinh Thự Đồi', '18.5 Tỷ VNĐ', 18.5, '320 m²', 320, 5, 6, 'Tọa sơn hướng hải ngắm toàn cảnh Vịnh', 'Hướng Nam', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 1, 'Biệt thự đơn lập 3 tầng theo phong cách Địa Trung Hải quý phái, khuôn viên sân vườn 150m² và hồ bơi vô cực view biển.', '["Bể bơi vô cực riêng", "Gara 2 ô tô", "Sân vườn nhiệt đới", "Sổ hồng vĩnh viễn"]'),
('penthouse-duplex-dinh-thap', 'Penthouse Duplex Đỉnh Tháp Beverly Hills Sky Palace', 'BH-PH01', 'penthouse-duplex-dinh-thap-beverly-hills-sky-palace', 'Penthouse Duplex', 'Tầng 19 - 20', '9.80 Tỷ VNĐ', 9.8, '210 m²', 210, 4, 4, 'Đỉnh cao ngắm Vịnh 360 độ', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, 'Tuyệt tác thông tầng xa hoa bậc nhất Quảng Ninh với sân vườn Sky Garden và bể sục Jacuzzi ngoài trời.', '["Thông tầng cao 7m", "Bể Jacuzzi ngoài trời", "Sky Garden ngắm sao", "Dịch vụ quản gia Butler 24/7"]');
