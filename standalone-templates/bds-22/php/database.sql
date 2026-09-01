SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
(1, 'TEMPLATESBDS', '0909.xxx.xxx', 'contact@templatesbds.com', 'Nha Trang, Khánh Hòa', 'TỔ HỢP RESORT & CONDOTEL QUỐC TẾ ZOHOTELS', '0909.xxx.xxx');

CREATE TABLE IF NOT EXISTS `projects` (
  `id` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `zone` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `floor` varchar(50) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `beds` int(11) DEFAULT 0,
  `baths` int(11) DEFAULT 0,
  `view` varchar(255) DEFAULT NULL,
  `direction` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `hot` tinyint(1) DEFAULT 0,
  `commitment` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `amenities` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `title`, `code`, `slug`, `zone`, `type`, `floor`, `price`, `area`, `beds`, `baths`, `view`, `direction`, `image`, `hot`, `commitment`, `description`, `amenities`) VALUES
('condotel-1pn-zohotels', 'Condotel Studio 1PN View Trực Diện Vịnh Biển Nha Trang', 'HLR-C0812', 'condotel-studio-1pn-view-vinh-bien-nha-trang', 'Tháp Condotel ZoHotels', 'Condotel Studio 1PN', 'Tầng 08', '2.35 Tỷ VNĐ', '45 m²', 1, 1, 'Trực diện bãi biển cát trắng & Vịnh Nha Trang', 'Hướng Đông', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', 1, 'Cam kết lợi nhuận 10%/năm trong 5 năm đầu', 'Căn hộ khách sạn bàn giao full nội thất 5 sao chuẩn ZoHotels International, quyền lợi 15 đêm nghỉ dưỡng miễn phí mỗi năm.', '[\"Full nội thất chuẩn 5 sao\", \"Bể bơi tràn bờ tầng mái\", \"Dịch vụ buồng phòng 24/7\", \"Tặng 15 đêm nghỉ/năm\"]'),
('biet-thu-bien-song-lap', 'Biệt Thự Biển Song Lập Vườn Dừa HappyLand Oceanfront', 'HLR-V05', 'biet-thu-bien-song-lap-vuon-dua', 'Phân Khu Biệt Thự Biển', 'Biệt Thự Song Lập Biển', '2 Tầng + Sân Thượng', '16.8 Tỷ VNĐ', '240 m²', 3, 4, 'Cách mép nước biển 30m ngắm hoàng hôn', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 1, 'Chia sẻ doanh thu cho thuê 85/15 trọn đời', 'Tuyệt tác biệt thự nghỉ dưỡng bước chân chạm cát trắng, hồ bơi điện phân muối riêng biệt và sân tắm nắng ngoài trời.', '[\"Hồ bơi riêng biệt\", \"Sân vườn nhiệt đới\", \"Bãi biển riêng tư\", \"Sở hữu lâu dài\"]'),
('condotel-2pn-corner', 'Căn Hộ Condotel Góc 2PN ZoHotels Panorama Sea Suite', 'HLR-C1802', 'condotel-goc-2pn-panorama-sea-suite', 'Tháp Condotel ZoHotels', 'Condotel 2PN', 'Tầng 18', '4.20 Tỷ VNĐ', '78 m²', 2, 2, 'View 2 mặt biển ngắm trọn vẹn bình minh & hoàng hôn', 'Hướng Đông - Đông Nam', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 0, 'Cam kết lợi nhuận 12%/năm trong 3 năm', 'Căn góc 2 mặt thoáng với ban công kính bo tròn ôm trọn đường chân trời biển khơi trong xanh mát lành.', '[\"Bồn tắm kính view biển\", \"Smart Keyless Check-in\", \"Bữa sáng buffet chuẩn 5 sao\", \"Chiết khấu thanh toán 8%\"]'),
('biet-thu-ghenh-da-vip', 'Biệt Thự Đơn Lập Ghềnh Đá Tuyệt Tác Độc Bản Cliffside Villa', 'HLR-CV01', 'biet-thu-don-lap-ghenh-da-cliffside-villa', 'Phân Khu Biệt Thự Biển', 'Biệt Thự Đơn Lập Ghềnh Đá', '3 Tầng', '38.0 Tỷ VNĐ', '420 m²', 5, 6, 'Tọa độ ghềnh đá nhô ra biển 270 độ view vịnh', 'Hướng Đông', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 1, 'Chính sách quản gia riêng 24/7 & Bến đỗ du thuyền', 'Dinh thự độc bản tọa lạc trên ghềnh đá tự nhiên, sở hữu lối đi riêng xuống bãi tắm san hô và hầm rượu ngầm.', '[\"Lối đi riêng bãi san hô\", \"Bến đỗ du thuyền VIP\", \"Hầm rượu vang nhiệt độ chuẩn\", \"Quản gia cao cấp\"]'),
('shophouse-marina', 'Shophouse Bến Du Thuyền Mặt Tiền Đại Lộ Hoa Biển HappyLand', 'HLR-SH10', 'shophouse-ben-du-thuyen-dai-lo-hoa-bien', 'Shophouse Bến Du Thuyền', 'Shophouse Bến Du Thuyền', '4 Tầng + Tum', '14.5 Tỷ VNĐ', '135 m²', 4, 5, 'Mặt tiền đại lộ du lịch & Bến du thuyền 5 sao', 'Hướng Nam', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 0, 'Hỗ trợ tiền thuê 50 Triệu/tháng trong 12 tháng đầu', 'Phù hợp khai thác chuỗi nhà hàng hải sản, quán cafe lounge ngắm du thuyền và spa trị liệu cao cấp.', '[\"Mặt tiền đường 24m\", \"Kinh doanh ngay\", \"Được phép lưu trú khách sạn\", \"Sổ hồng từng căn\"]'),
('sky-villa-dinh-doi', 'Sky Villa Thông Tầng Đỉnh Đồi Vườn Treo View Vịnh Nha Trang', 'HLR-SV03', 'sky-villa-thong-tang-dinh-doi-vuon-treo', 'Sky Villa Đỉnh Đồi', 'Sky Villa Hồ Bơi Vô Cực', 'Tầng 25 - 26', '22.0 Tỷ VNĐ', '280 m²', 4, 4, 'View 360 độ từ đỉnh đồi nhìn trọn vịnh Nha Trang', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 1, 'Tặng thẻ hội viên du thuyền & Golf 10 năm', 'Biệt thự trên không với trần cao 6.5m ngập tràn ánh nắng, hồ bơi đáy kính vươn ra không trung độc nhất vô nhị.', '[\"Hồ bơi đáy kính trên mây\", \"Sân golf mini trên mái\", \"Thang máy riêng biệt\", \"Nội thất nhập khẩu Ý\"]');

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

COMMIT;
