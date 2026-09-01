CREATE DATABASE IF NOT EXISTS `bds_16` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_16`;

CREATE TABLE `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`, `facebook`, `youtube`) VALUES
(1, 'EGA LAND', '1900.636.099', 'support@sapo.vn', 'Lầu 3 - Tòa nhà Lữ Gia - Số 70 Lữ Gia - P.15 - Q.11 - TP.HCM', 'Trao Bạn Cuộc Sống Mơ Ước', '0919 006 030', '#', '#');

CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `priceNum` float DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `direction` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `hot` tinyint(1) DEFAULT 0,
  `description` text,
  `specs` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `title`, `category`, `type`, `price`, `priceNum`, `area`, `direction`, `district`, `image`, `hot`, `description`, `specs`) VALUES
(1, 'Toàn Bộ Danh Sách Biệt Thự Đang Bán Ở Ciputra, Biệt Thự Đẹp Tây Hồ', 'ban', 'Biệt Thự', '20 Tỷ VNĐ', 20, '200 - 250 m²', 'Không xác định', 'Tây Hồ', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 'Biệt thự đơn lập và song lập Ciputra phân khu Q, K, G với không gian sân vườn rộng thoáng, trường quốc tế UNIS liền kề.', '[\"Sổ đỏ chính chủ\", \"Sân vườn rộng 80m²\", \"An ninh 24/7\", \"Gần UNIS Hanoi\"]'),
(2, 'Cần bán nhà MT Phan Đình Phùng, P. 1, Phú Nhuận', 'ban', 'Nhà Mặt Tiền', '14 Tỷ VNĐ', 14, '96 m²', 'Hướng Tây Nam', 'Phú Nhuận', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 'Vị trí đắc địa kinh doanh sầm uất đa ngành nghề, kết nối Quận 1 và sân bay chỉ 5 phút lái xe.', '[\"Mặt tiền 5.5m\", \"1 trệt 3 lầu\", \"Đang cho thuê 45 tr/tháng\", \"Sổ hồng vuông vắn\"]'),
(3, 'Bán chung cư Ruby City, liền kề khu biệt thự Vincom Long Biên, KĐT Việt Hưng HN', 'ban', 'Căn Hộ Chung Cư', '1.1 Tỷ VNĐ', 1.1, '96 m²', 'Hướng Tây Nam', 'Long Biên', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 0, 'Căn hộ view thoáng mát nhìn sang phân khu Vinhomes Riverside, tiện ích hồ bơi, trường mầm non ngay dưới sảnh.', '[\"3 Phòng ngủ\", \"2 WC\", \"Full nội thất cơ bản\", \"Hỗ trợ vay 70%\"]'),
(4, 'Đầu Tư Sinh Lời Cao — Thành Phố Sinh Thái Năm Sao', 'ban', 'Đất Nền Dự Án', '3 Tỷ VNĐ', 3, '120 m²', 'Không xác định', 'Bình Chánh', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 1, 'Khu đô thị sinh thái chuẩn nghỉ dưỡng 5 sao ven sông Cần Giuộc - Bình Chánh với hồ cánh sen trung tâm tuyệt đẹp.', '[\"Sổ đỏ từng nền\", \"Xây dựng tự do\", \"Hạ tầng điện âm 100%\", \"Đường nhựa 16m\"]'),
(5, 'Chính Chủ Cho Thuê Phòng Kk Ngõ 89 Lê Đức Thọ', 'thue', 'Nhà Cho Thuê', '2.3 Triệu / Tháng', 2.3, '30 m²', 'Không xác định', 'Nam Từ Liêm', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 1, 'Phòng khép kín sạch đẹp có ban công phơi đồ, nóng lạnh, điều hòa, giờ giấc tự do không chung chủ.', '[\"Khép kín 100%\", \"Có gác xép cao\", \"Điều hòa & Nóng lạnh\", \"Camera an ninh 24/7\"]'),
(6, 'Cho thuê căn hộ Sunrise City từ 1, 2, 3, 4, 5 PN penthouse', 'thue', 'Căn Hộ Cho Thuê', '7 Triệu / Tháng', 7, '90 m²', 'Hướng Nam', 'Quận 7', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 'Căn hộ đối diện Lotte Mart Quận 7, tiện ích đẳng cấp hồ bơi tràn 50m, phòng gym chuẩn 5 sao.', '[\"Đối diện Lotte Mart\", \"Hồ bơi tràn viền\", \"Nội thất sang trọng\", \"Thẻ từ an ninh\"]');

CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `excerpt` text,
  `content` text,
  `views` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `news` (`id`, `title`, `date`, `author`, `image`, `excerpt`, `content`, `views`) VALUES
(1, 'MUA CĂN HỘ RICHSTAR THANH TOÁN 1% MỖI THÁNG', '27/08/2026', 'EGANY', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Chính sách chi trả linh hoạt từ chủ đầu tư phù hợp với nhiều gia đình trẻ khi muốn sở hữu căn hộ giá 1,49 tỷ đồng tại quận Tân Phú, TP HCM.', '[\"Chính sách chi trả linh hoạt từ chủ đầu tư phù hợp với nhiều gia đình trẻ.\", \"Dự án RichStar sở hữu hai hồ bơi tràn bờ đẳng cấp quốc tế.\", \"Khách hàng chỉ cần thanh toán 1% giá trị căn hộ mỗi tháng.\"]', 4120),
(2, 'THÊM 10 CĂN SHOPHOUSE PARK HILL PREMIUM TRONG NGÀY MỞ BÁN', '27/08/2026', 'EGANY', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Chủ đầu tư đã bổ sung thêm 10 căn shophouse thay vì 31 căn như kế hoạch tại buổi mở bán vừa diễn ra.', '[\"Sức hút cực lớn từ shophouse chân đế Park Hill Premium khiến chủ đầu tư phải mở thêm giỏ hàng đặc biệt.\", \"Với lượng cư dân hiện hữu lên tới hơn 30.000 người, các căn shophouse mang lại dòng tiền khai thác kinh doanh vượt trội.\"]', 3890),
(3, 'DỰ ÁN CĂN HỘ 500 TRIỆU USD CÓ BIỂN ĐẢO NHÂN TẠO', '27/08/2026', 'EGANY', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'Đây là dự án đầu tiên ở Việt Nam dành hẳn một hecta đất để xây dựng biển đảo nhân tạo ngay trong lòng khu căn hộ.', '[\"Biển hồ nhân tạo tích hợp công nghệ lọc nước thông minh mang lại trải nghiệm nghỉ dưỡng biển.\", \"Dự án đón đầu làn sóng đầu tư bất động sản sức khỏe và wellness resort đang bùng nổ.\"]', 5240);

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` text,
  `product_type` varchar(255) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
