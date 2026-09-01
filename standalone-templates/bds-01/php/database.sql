CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`, `facebook`, `youtube`) VALUES
(1, 'TEMPLATESBDS', '0919 006 030', 'ntrungz0704@gmail.com', '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội', 'Kho Mẫu Website Bất Động Sản', '0905560000', 'https://www.facebook.com/groups/847532091275214', 'https://www.youtube.com/@tungchuofficial')
ON DUPLICATE KEY UPDATE name=VALUES(name);

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `price` varchar(100) NOT NULL,
  `price_num` float NOT NULL,
  `price_unit` varchar(20) NOT NULL,
  `price_per_m2` varchar(50) NOT NULL,
  `location` varchar(255) NOT NULL,
  `ward` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `bedrooms` varchar(10) NOT NULL,
  `bathrooms` varchar(10) NOT NULL,
  `area` varchar(50) NOT NULL,
  `area_num` float NOT NULL,
  `direction` varchar(50) DEFAULT NULL,
  `floor` varchar(50) DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `discount` varchar(50) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `gallery` text DEFAULT NULL,
  `description` text NOT NULL,
  `detailed_content` text NOT NULL,
  `features` text NOT NULL,
  `legal` varchar(255) NOT NULL,
  `furniture` varchar(255) NOT NULL,
  `handover` varchar(255) NOT NULL,
  `map_embed_url` text NOT NULL,
  `author_name` varchar(100) NOT NULL,
  `author_phone` varchar(50) NOT NULL,
  `author_zalo` varchar(50) NOT NULL,
  `author_avatar` varchar(255) NOT NULL,
  `author_role` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `title`, `slug`, `price`, `price_num`, `price_unit`, `price_per_m2`, `location`, `ward`, `district`, `city`, `bedrooms`, `bathrooms`, `area`, `area_num`, `direction`, `floor`, `type`, `category`, `discount`, `image`, `gallery`, `description`, `detailed_content`, `features`, `legal`, `furniture`, `handover`, `map_embed_url`, `author_name`, `author_phone`, `author_zalo`, `author_avatar`, `author_role`) VALUES
(1, 'Biệt thự sân vườn sát sân bay Nội Bài view hồ sinh thái', 'biet-thu-san-vuon-sat-san-bay-noi-bai', '12.500.000.000 đồng', 12.5, 'Tỷ', '125 tr/m²', '275 xã Phú Minh, Huyện Sóc Sơn, Hà Nội', 'Phú Minh', 'Sóc Sơn', 'Hà Nội', '04', '04', '100 m²', 100, 'Đông Nam', NULL, 'Biệt thự', 'ban', NULL, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', '[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80\",\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80\",\"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80\",\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80\"]', 'Biệt thự vườn phong cách nghỉ dưỡng ven hồ, không gian yên tĩnh thoáng mát, sân vườn cây ăn trái, hồ cá Koi và bể bơi riêng biệt.', 'Biệt thự được thiết kế theo phong cách Indochine kết hợp hiện đại, toàn bộ nội thất bằng gỗ gõ đỏ và đá marble tự nhiên. Khuôn viên rộng 250m² bao gồm sân đỗ xe 2 ô tô, khu nướng BBQ ngoài trời, và hồ cá Koi nhập khẩu. Vị trí đắc địa cách sân bay quốc tế Nội Bài chỉ 5 phút di chuyển, rất thuận tiện cho doanh nhân và chuyên gia quốc tế.', '[\"Hồ bơi riêng\",\"Hồ cá Koi\",\"Gara 2 ô tô\",\"Sân vườn 150m²\",\"An ninh 24/7\",\"Sát mặt hồ\"]', 'Sổ đỏ chính chủ, sẵn sàng công chứng ngay', 'Đầy đủ nội thất cao cấp nhập khẩu', 'Nhận nhà ở ngay', 'https://maps.google.com/maps?q=Soc+Son+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed', 'Nguyễn Thanh Tùng', '0905.56.xxxx', '0905560000', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', 'Chuyên viên BĐS Cao Cấp'),
(2, 'Căn hộ Opal Skyview mặt tiền Phạm Văn Đồng view sông Sài Gòn', 'can-ho-opal-skyview', '5.500.000.000 đồng', 5.5, 'Tỷ', '78 tr/m²', 'Đại lộ Phạm Văn Đồng, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh', 'Phường 13', 'Bình Thạnh', 'TP. Hồ Chí Minh', '02', '02', '70.5 m²', 70.5, 'Nam', 'Tầng 18', 'Căn hộ', 'ban', NULL, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', '[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80\",\"https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80\",\"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80\"]', 'Căn hộ view sông thoáng đãng mặt tiền Phạm Văn Đồng, thuận tiện di chuyển sân bay Tân Sơn Nhất và trung tâm Quận 1 chỉ 10 phút.', 'Căn hộ tầng cao thoáng mát, ban công hướng Nam ngắm trọn sông Sài Gòn và Landmark 81. Dự án tích hợp đầy đủ tiện ích: Hồ bơi tràn bờ, phòng gym tiêu chuẩn quốc tế, khu vui chơi trẻ em và siêu thị mini ngay tầng trệt.', '[\"Hồ bơi vô cực\",\"View sông Sài Gòn\",\"Phòng Gym & Yoga\",\"Thẻ từ thang máy\",\"Ban công rộng\"]', 'Sổ hồng lâu dài', 'Nội thất nhập khẩu thông minh', 'Bàn giao hoàn thiện cơ bản', 'https://maps.google.com/maps?q=Binh+Thanh+Ho+Chi+Minh&t=&z=13&ie=UTF8&iwloc=&output=embed', 'Lê Hoàng Nam', '0905.56.xxxx', '0905560000', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&q=80', 'Trưởng Phòng Kinh Doanh'),
(101, 'Cho thuê căn hộ 2PN Vinhomes Metropolis Ba Đình view Hồ Tây', 'cho-thue-can-ho-vinhomes-metropolis', '28.000.000 đồng/tháng', 28, 'Triệu/tháng', '340k/m²', '29 Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội', 'Ngọc Khánh', 'Ba Đình', 'Hà Nội', '02', '02', '82 m²', 82, 'Đông Nam', NULL, 'Căn hộ', 'thue', NULL, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', '[\"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80\"]', 'Căn hộ tầng trung view trọn hồ Tây, đầy đủ nội thất sang trọng, lễ tân 24/7.', 'Căn hộ cho thuê tiêu chuẩn đại sứ quán tại Metropolis Liễu Giai.', '[\"View 4 hồ lớn Hà Nội\",\"Lễ tân 24/7\",\"Bể bơi tầng mái\",\"TTTM Vincom Center\"]', 'Hợp đồng thuê linh hoạt từ 6 - 12 tháng', 'Full nội thất cao cấp', 'Dọn vào ở ngay', 'https://maps.google.com/maps?q=Vinhomes+Metropolis+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed', 'Nguyễn Thanh Tùng', '0905.56.xxxx', '0905560000', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', 'Chuyên viên BĐS Cao Cấp')
ON DUPLICATE KEY UPDATE title=VALUES(title);
