CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `slogan` text COLLATE utf8mb4_unicode_ci,
  `zalo` varchar(50) COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
(1, 'TEMPLATESBDS', '0919006030', 'info@templatebds.com', 'Xã Hạ Long, Huyện Vân Đồn, Quảng Ninh', 'THƯƠNG CẢNG QUỐC TẾ ĐẦU TIÊN VÀ DUY NHẤT TẠI VỊNH BÁI TỬ LONG', '0919006030');

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `land_area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `construction_area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `frontage` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `floors` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `view` text COLLATE utf8mb4_unicode_ci,
  `handover` text COLLATE utf8mb4_unicode_ci,
  `image` text COLLATE utf8mb4_unicode_ci,
  `specs` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `highlights` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `projects` (`id`, `category`, `type`, `name`, `area`, `land_area`, `construction_area`, `frontage`, `floors`, `price`, `view`, `handover`, `image`, `specs`, `description`, `highlights`) VALUES
(1, 'shophouse', 'Singapore Shophouse Đa Năng', 'Singapore Shophouse Mặt Tiền Đại Lộ 30m', '480 m² (Xây dựng 5.5 tầng)', '120 m² (6m x 20m)', '480 m²', '6.0 m', '5 tầng + 1 tum', '7.85 Tỷ VNĐ', 'Trực diện Đại lộ Ánh Sáng & Vịnh Bái Tử Long', 'Hoàn thiện mặt ngoài sang trọng, thô bên trong', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80', '[\"Thiết kế 2 mặt tiền thông thoáng\", \"Tối ưu kinh doanh nhà hàng, khách sạn mini boutique\", \"Tích hợp thang máy kính hiện đại\"]', 'Dòng sản phẩm Shophouse phong cách Singapore tối ưu hóa công năng vừa ở vừa kinh doanh sinh lời vượt trội tại trung tâm khu kinh tế Vân Đồn.', '[\"Chiết khấu thanh toán sớm 10%\", \"Hỗ trợ lãi suất 0% trong 24 tháng\", \"Cam kết thuê lại 35 Triệu/tháng\"]'),
(2, 'wyndham', 'Condotel 5 Sao Wyndham Garden', 'Căn Hộ Khách Sạn Wyndham Garden Sonasea', '45.5 m² - 88.0 m²', '45.5 m²', '45.5 m²', '4.5 m', 'Tòa tháp 14 tầng', '2.15 Tỷ VNĐ', '100% căn hộ view biển Vịnh Bái Tử Long', 'Full nội thất tiêu chuẩn 5 sao quốc tế Wyndham', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80', '[\"Quản lý vận hành bởi tập đoàn Wyndham Hotel Group\", \"Hệ thống Smart Room điều khiển thông minh\", \"Ban công kính ngắm trọn bình minh trên biển\"]', 'Tổ hợp condotel mặt biển đầu tiên tại Vân Đồn được quản lý bởi thương hiệu khách sạn hàng đầu thế giới, cam kết chia sẻ doanh thu bền vững.', '[]'),
(3, 'silkpath', 'Shophouse Phố Đi Bộ Sonasea Silk Path', 'Nhà Phố Thương Mại Silk Path Vân Đồn', '360 m² (Xây dựng 4 tầng)', '100 m² (5m x 20m)', '360 m²', '5.0 m', '4 tầng + 1 tum', '6.20 Tỷ VNĐ', 'Tuyến phố đi bộ rực rỡ sắc màu & Công viên biển', 'Hoàn thiện mặt ngoài đồng bộ phong cách Địa Trung Hải', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80', '[\"Mặt tiền phố đi bộ không ngủ 24/7\", \"Vỉa hè lát đá rộng 5m\", \"Hệ thống phòng cháy chữa cháy tự động\"]', 'Nơi quy tụ hàng trăm thương hiệu ẩm thực, thời trang và giải trí hàng đầu, tạo nên tâm điểm mua sắm sầm uất bậc nhất miền Bắc.', '[]'),
(4, 'villa', 'Biệt Thự Biển Đảo Cọ Palm Island', 'Biệt Thự Đơn Lập Sonasea Ocean Villa', '320 m² - 500 m²', '350 m²', '420 m²', '15.0 m', '3 tầng', '16.50 Tỷ VNĐ', 'Mặt tiền bãi tắm riêng 2.2km vịnh Bái Tử Long', 'Full nội thất cao cấp dát vàng hoặc thô tùy chọn', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80', '[\"Bến đỗ du thuyền riêng tại gia\", \"Hồ bơi sục Jacuzzi vô cực\", \"Sân vườn nhiệt đới rộng 150m²\"]', 'Dinh thự nghỉ dưỡng biệt lập trên đảo cọ kỳ vĩ dành riêng cho các chủ nhân danh giá khao khát phong cách sống thượng lưu giữa lòng kỳ quan.', '[]');

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `product_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
