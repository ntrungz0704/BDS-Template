CREATE DATABASE IF NOT EXISTS `bds_18`;
USE `bds_18`;

CREATE TABLE IF NOT EXISTS `company_info` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `slogan` TEXT,
    `zalo` VARCHAR(50)
);

INSERT INTO `company_info` (`name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
('TEMPLATESBDS', '0919 006 030', 'contact@templatesbds.com', 'Tòa nhà TEMPLATESBDS, TP. Hồ Chí Minh', 'Kiến tạo không gian sống vượt thời gian. Đơn vị tổng thầu thiết kế kiến trúc, thi công nội thất và phân phối bất động sản nghệ thuật độc bản hàng đầu Việt Nam.', '0919006030')
ON DUPLICATE KEY UPDATE name=VALUES(name);

CREATE TABLE IF NOT EXISTS `projects` (
    `id` VARCHAR(100) PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100),
    `price` VARCHAR(100),
    `priceNum` DECIMAL(10,2),
    `area` VARCHAR(100),
    `location` VARCHAR(255),
    `district` VARCHAR(100),
    `image` VARCHAR(255),
    `hot` BOOLEAN DEFAULT 0,
    `year` VARCHAR(10),
    `style` VARCHAR(100),
    `description` TEXT,
    `specs` JSON
);

INSERT IGNORE INTO `projects` (`id`, `title`, `slug`, `category`, `price`, `priceNum`, `area`, `location`, `district`, `image`, `hot`, `year`, `style`, `description`, `specs`) VALUES
('vixyo-villa-saigon-south', 'Dinh Thự Sinh Thái Ven Sông The Riviera Nam Sài Gòn', 'dinh-thu-sinh-thai-ven-song-the-riviera', 'Biệt Thự', '38.5 Tỷ VNĐ', 38.5, '450 m²', 'Khu Biệt Thự Phú Gia, Tân Phong, Quận 7, TP.HCM', 'Quận 7', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, '2026', 'Modern Minimalist Architecture', 'Kiệt tác dinh thự đương đại với không gian kính tràn đón trọn luồng gió sông và mảng xanh nhiệt đới rộng lớn.', '["Hồ bơi vô cực nước tràn", "Sân vườn nhiệt đới 180m²", "Nội thất nhập khẩu B&B Italia", "Hệ thống Smart Home Crestron"]'),
('vixyo-penthouse-grand-marina', 'Penthouse Duplex Đỉnh Tháp Grand Marina Saigon Ba Son', 'penthouse-duplex-dinh-thap-grand-marina', 'Penthouse', '65.0 Tỷ VNĐ', 65.0, '380 m²', 'Số 2 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP.HCM', 'Quận 1', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, '2026', 'Bespoke Luxury Interior', 'Tầm nhìn triệu đô ôm trọn sông Sài Gòn và trung tâm tài chính, hoàn thiện theo tiêu chuẩn khách sạn JW Marriott.', '["Thông tầng cao 7.5m", "Bể sục Jacuzzi ngắm pháo hoa", "Dịch vụ quản gia cá nhân 24/7", "Bàn giao full nội thất Minotti"]'),
('vixyo-hillside-villa-dalat', 'Biệt Thự Đồi Thông Sương Mù The Cloud Villa Đà Lạt', 'biet-thu-doi-thong-suong-mu-the-cloud-da-lat', 'Biệt Thự Nghỉ Dưỡng', '42.0 Tỷ VNĐ', 42.0, '800 m²', 'Phường 10, TP. Đà Lạt, Lâm Đồng', 'TP. Đà Lạt', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 0, '2026', 'Nordic Pine Architecture', 'Ẩn mình giữa rừng thông bạt ngàn với kiến trúc gỗ kính mộc mạc mà xa hoa, lò sưởi đá tự nhiên trung tâm.', '["Khuôn viên đất 800m²", "Lò sưởi củi đá tự nhiên", "Vườn hoa phong lữ thảo", "Sổ đỏ đất ở đô thị"]'),
('vixyo-duplex-sky-villa-tay-ho', 'Sky Villa Duplex View Trọn Mặt Nước Hồ Tây Hà Nội', 'sky-villa-duplex-view-tron-ho-tay-ha-noi', 'Căn Hộ Duplex', '28.0 Tỷ VNĐ', 28.0, '260 m²', 'Đường Quảng Khánh, Phường Quảng An, Tây Hồ, Hà Nội', 'Tây Hồ', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 0, '2026', 'Contemporary Luxury', 'Không gian sống nghỉ dưỡng thanh bình giữa lòng thủ đô, ban công ngắm trọn hoàng hôn Hồ Tây thơ mộng.', '["Thang máy riêng bảo mật", "Trần cao 6m thoáng đãng", "Nội thất da bò Poltrona Frau", "View không giới hạn"]'),
('vixyo-coastal-mansion-nha-trang', 'Dinh Thự Đảo Biển Diamond Bay Nhìn Ra Vịnh Nha Trang', 'dinh-thu-dao-bien-diamond-bay-nha-trang', 'Biệt Thự', '45.0 Tỷ VNĐ', 45.0, '600 m²', 'Đại lộ Nguyễn Tất Thành, TP. Nha Trang, Khánh Hòa', 'TP. Nha Trang', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 1, '2026', 'Tropical Luxury Villa', 'Biệt thự biển có bến đỗ du thuyền riêng biệt, hồ bơi nước mặn và bãi tắm cát trắng tự nhiên riêng tư.', '["Bến du thuyền riêng", "Bãi tắm riêng tư", "Bể bơi tràn bờ nước mặn", "Sở hữu lâu dài"]'),
('vixyo-bespoke-residence-hcm', 'Biệt Thự Phố Nghệ Thuật The Bespoke Residence Thảo Điền', 'biet-thu-pho-nghe-thuat-the-bespoke-thao-dien', 'Kiến Trúc Độc Bản', '52.0 Tỷ VNĐ', 52.0, '350 m²', 'Đường Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức', 'TP. Thủ Đức', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 0, '2026', 'Art-Deco Contemporary', 'Công trình kiến trúc độc bản đoạt giải thưởng kiến trúc Châu Á, tích hợp phòng trưng bày nghệ thuật và hầm rượu vang.', '["Hầm rượu vang 500 chai", "Phòng trưng bày Art Gallery", "Phim trường mini tại gia", "Khu compound biệt lập"]');

CREATE TABLE IF NOT EXISTS `news` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `date` VARCHAR(50),
    `author` VARCHAR(100),
    `category` VARCHAR(100),
    `image` VARCHAR(255),
    `excerpt` TEXT,
    `content` JSON,
    `views` INT DEFAULT 0
);

INSERT IGNORE INTO `news` (`id`, `title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `content`, `views`) VALUES
(1, 'Xu Hướng Thiết Kế Kiến Trúc Mở Kết Nối Thiên Nhiên Dẫn Dắt Năm 2026', 'xu-huong-thiet-ke-kien-truc-mo-2026', '28/08/2026', 'TEMPLATESBDS Design Studio', 'Kiến Trúc', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Không gian sống xanh, tối giản và xóa nhòa ranh giới giữa nội thất và ngoại thất đang trở thành tiêu chuẩn vàng của giới thượng lưu.', '["Kiến trúc bền vững kết hợp vật liệu tự nhiên như gỗ tái sinh, đá nguyên khối và kính Low-E tràn viền giúp tối ưu hóa ánh sáng mặt trời.", "TEMPLATESBDS tự hào là đơn vị tiên phong ứng dụng ngôn ngữ thiết kế biophilic design vào các dự án dinh thự cao cấp."]', 5420),
(2, 'Bất Động Sản Hàng Hiệu Branded Residences — Kênh Tích Sản Kim Cương Của Giới Tỷ Phú', 'bds-hang-hieu-branded-residences-kenh-tich-san', '26/08/2026', 'TEMPLATESBDS Investment Insight', 'Đầu Tư', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Sự bảo chứng từ các thương hiệu khách sạn huyền thoại thế giới mang lại giá trị gia tăng vô hạn và đẳng cấp sống vượt trội.', '["Các dự án Branded Residences ghi nhận mức tăng trưởng giá trị trung bình 25 - 30% cao hơn bất động sản cao cấp thông thường.", "Khách hàng không chỉ sở hữu một căn hộ hay biệt thự mà còn sở hữu một phong cách sống đặc quyền được quản lý bởi các tập đoàn 6 sao."]', 4890),
(3, 'Quy Hoạch Đại Lộ Ven Sông Sài Gòn & Cầu Thủ Thiêm 4 — Cú Hích Hạ Tầng Bất Động Sản', 'quy-hoach-dai-lo-ven-song-sai-gon-cau-thu-thiem-4', '24/08/2026', 'TEMPLATESBDS Insight', 'Quy Hoạch', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80', 'Hạ tầng kết nối đồng bộ giữa khu Đông và khu Nam Sài Gòn mở ra chu kỳ phát triển bùng nổ cho các quần thể đô thị sinh thái ven sông.', '["Tuyến đại lộ ven sông kết nối trung tâm Quận 1 tới Củ Chi và Tây Ninh giúp rút ngắn thời gian di chuyển đáng kể.", "Các dự án sở hữu mặt tiền sông được săn đón đặc biệt nhờ quỹ đất khan hiếm và giá trị phong thủy đắc địa."]', 6100),
(4, 'Cẩm Nang Chọn Hướng Nhà & Bố Trí Phong Thủy Tài Lộc Cho Biệt Thự Sân Vườn', 'cam-nang-phong-thuy-tai-loc-biet-thu-san-vuon', '20/08/2026', 'Chuyên Gia Phong Thủy', 'Phong Thủy', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Tụ thủy sinh tài lộc — Những nguyên tắc vàng trong kiến tạo không gian sống hòa hợp ngũ hành.', '["Thế đất tả thanh long, hữu bạch hổ, tiền chu tước, hậu huyền vũ luôn là tiêu chí hàng đầu khi chọn lựa dinh thự.", "Bố trí hồ cá koi hoặc thác nước tuần hoàn giúp kích hoạt cung tài lộc cho gia chủ."]', 4570);

CREATE TABLE IF NOT EXISTS `faqs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `question` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `sort_order` INT DEFAULT 0
);

INSERT IGNORE INTO `faqs` (`id`, `question`, `answer`, `sort_order`) VALUES
(1, 'Quy trình tư vấn và thiết kế kiến trúc tại TEMPLATESBDS diễn ra như thế nào?', 'Quy trình gồm 5 bước tiêu chuẩn: Khảo sát thực địa -> Lên mặt bằng 2D -> Diễn họa 3D -> Dự toán chi tiết -> Triển khai thi công và giám sát tác giả.', 1),
(2, 'TEMPLATESBDS có chính sách bảo hành công trình và nội thất như thế nào?', 'Chúng tôi bảo hành kết cấu công trình 10 năm, bảo hành nội thất 3 năm và bảo trì định kỳ 6 tháng một lần hoàn toàn miễn phí.', 2),
(3, 'Pháp lý các sản phẩm bất động sản do TEMPLATESBDS phân phối ra sao?', '100% dự án và sản phẩm BĐS trong hệ sinh thái TEMPLATESBDS đều có sổ hồng lâu dài, pháp lý hoàn chỉnh và được ngân hàng lớn bảo lãnh.', 3);

CREATE TABLE IF NOT EXISTS `contact_submissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255),
    `service` VARCHAR(100),
    `product_type` VARCHAR(100),
    `source` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
