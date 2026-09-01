-- Database schema and sample data for BDS-20
CREATE DATABASE IF NOT EXISTS bds_20 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bds_20;

CREATE TABLE `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`name`, `slogan`, `phone`, `email`, `address`, `zalo`) VALUES
('TEMPLATESBDS', 'KHU ĐÔ THỊ CÔNG VIÊN & HỒ ĐIỀU HÒA SINH THÁI', '0900 000 000', 'info@templatesbds.com', 'Khu đô thị Ecopark, Văn Giang, Hưng Yên', '0900000000');

CREATE TABLE `projects` (
  `id` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `block` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `floor` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `priceNum` decimal(10,2) DEFAULT NULL,
  `area` varchar(100) DEFAULT NULL,
  `areaNum` int(11) DEFAULT NULL,
  `beds` int(11) DEFAULT NULL,
  `baths` int(11) DEFAULT NULL,
  `view` varchar(255) DEFAULT NULL,
  `direction` varchar(100) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `hot` tinyint(1) DEFAULT 0,
  `featured` tinyint(1) DEFAULT 0,
  `description` text DEFAULT NULL,
  `specs` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `title`, `code`, `slug`, `block`, `type`, `floor`, `price`, `priceNum`, `area`, `areaNum`, `beds`, `baths`, `view`, `direction`, `image`, `hot`, `featured`, `description`, `specs`) VALUES
('can-1pn-block-a-parkview', 'Căn Hộ 1 Phòng Ngủ Eco Suite Block A View Công Viên Trung Tâm', 'MPV-A0805', 'can-ho-1-phong-ngu-block-a-view-cong-vien', 'Block A - Park View', '1 Phòng Ngủ', 'Tầng 08', '2.45 Tỷ VNĐ', 2.45, '48 m²', 48, 1, 1, 'Trực diện công viên cây xanh 100ha', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, 'Thiết kế thông minh đón gió tự nhiên 100%, ban công kính rộng ngắm trọn vẹn cảnh quan xanh mát lành.', '["Ban công ngắm công viên", "Thiết bị Toto cao cấp", "Kính Low-E cách âm", "Sở hữu lâu dài"]'),
('can-2pn-block-a-parkview', 'Căn Hộ 2 Phòng Ngủ Tiêu Chuẩn Quốc Tế Block A Park View', 'MPV-A1203', 'can-ho-2-phong-ngu-tieu-chuan-block-a', 'Block A - Park View', '2 Phòng Ngủ', 'Tầng 12', '3.35 Tỷ VNĐ', 3.35, '65 m²', 65, 2, 2, 'Nội khu hồ bơi sinh thái & Vườn hoa rực rỡ', 'Hướng Tây Nam', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 0, 1, 'Bố cục vuông vắn tối ưu công năng, phù hợp cho gia đình trẻ tìm kiếm chốn an cư trong lành cân bằng cuộc sống.', '["View hồ bơi sinh thái", "Khóa từ vân tay 4 chức năng", "Chiết khấu thanh toán 8%", "Nhận nhà ở ngay"]'),
('can-2pn-block-b-lakeview', 'Căn Hộ Góc 2 Phòng Ngủ Block B View Trực Diện Hồ Điều Hòa Sinh Thái', 'MPV-B1502', 'can-ho-goc-2-phong-ngu-block-b-view-ho', 'Block B - Lake View', '2 Phòng Ngủ', 'Tầng 15', '3.85 Tỷ VNĐ', 3.85, '72 m²', 72, 2, 2, 'View mặt nước hồ điều hòa & Thác tràn', 'Hướng Nam - Đông Nam', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 1, 'Căn góc 2 mặt thoáng view trọn vẹn mặt hồ gợn sóng trong lành, không gian thoáng đãng nuôi dưỡng sức khỏe gia đình.', '["Căn góc 2 mặt thoáng", "Phòng ngủ Master view hồ", "Bàn giao sàn gỗ An Cường", "Tặng gói Smart Home"]'),
('can-3pn-block-c-gardenview', 'Căn Hộ 3 Phòng Ngủ Gia Đình Block C View Vườn Thiền Nhật Bản', 'MPV-C2008', 'can-ho-3-phong-ngu-block-c-view-vuon-thien', 'Block C - Garden View', '3 Phòng Ngủ', 'Tầng 20', '5.20 Tỷ VNĐ', 5.20, '98 m²', 98, 3, 2, 'View vườn thiền Zen Garden & Đồi cỏ hoa', 'Hướng Đông Bắc', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 0, 1, 'Không gian sống lý tưởng cho gia đình 3 thế hệ, phòng khách rộng hơn 40m² nối liền khu vực bếp và ban công ngắm hoa.', '["Bếp đảo phong cách châu Âu", "Hệ thống lọc nước sạch", "Miễn phí 2 năm phí dịch vụ", "Hỗ trợ vay 70%"]'),
('duplex-block-d-skypalace', 'Căn Hộ Duplex Thông Tầng Block D Sky Palace View Triệu Đô', 'MPV-D2801', 'can-ho-duplex-thong-tang-block-d-sky-palace', 'Block D - Sky Palace', 'Duplex View Hồ', 'Tầng 28 - 29', '9.50 Tỷ VNĐ', 9.50, '168 m²', 168, 4, 4, 'View 360 độ công viên hồ điều hòa và thành phố', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 1, 1, 'Tuyệt tác duplex thông tầng cao 6m xa hoa bậc nhất, sở hữu ban công vườn treo riêng biệt ngắm trọn vẹn cảnh sắc thiên nhiên.', '["Thông tầng cao 6.2m", "Sân vườn ban công 35m²", "Thang máy riêng bảo mật", "Sổ hồng vĩnh viễn"]'),
('penthouse-eco-block-b', 'Penthouse Eco Resort Đỉnh Tháp Block B Mona Park View', 'MPV-PH02', 'penthouse-eco-resort-dinh-thap-block-b', 'Block B - Lake View', 'Penthouse Eco', 'Tầng 30', '14.8 Tỷ VNĐ', 14.80, '220 m²', 220, 4, 4, 'View đỉnh cao bao quát toàn bộ thung lũng xanh', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 1, 1, 'Dinh thự trên mây với hồ bơi vô cực ngoài trời, quầy bar BBQ sân thượng và tầm nhìn ngút ngàn xanh mướt.', '["Bể bơi tràn bờ trên mái", "Vườn nướng BBQ riêng", "Nội thất nhập khẩu Ý", "Dịch vụ quản gia 24/7"]');

CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `content` json DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `content`, `views`) VALUES
('Khánh Thành Công Viên Sinh Thái Trung Tâm 100ha & Hồ Điều Hòa Mona Park', 'khanh-thanh-cong-vien-sinh-thai-100ha', '28/08/2026', 'Ban Quản Lý Mona Park View', 'Sự Kiện', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Lá phổi xanh khổng lồ chính thức đi vào hoạt động, mang lại không gian vui chơi, tập luyện thể thao và tái tạo năng lượng cho cư dân.', '["Công viên Mona Park View sở hữu đường chạy bộ ven hồ dài 5km, vườn thiền Nhật Bản và hồ cảnh quan sinh thái trong lành.", "Dự án đạt giải thưởng Khu đô thị có cảnh quan sinh thái xuất sắc nhất năm 2026."]', 4890),
('Lễ Cất Nóc Block A & Block B Vượt Tiến Độ 45 Ngày', 'le-cat-noc-block-a-b-vuot-tien-do', '26/08/2026', 'Tổng Thầu Xây Dựng', 'Tiến Độ', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Chủ đầu tư cam kết bàn giao nhà đúng tiêu chuẩn chất lượng cao cấp và trao sổ hồng tận tay khách hàng.', '["Toàn bộ công tác hoàn thiện mặt ngoài và ốp đá khối sảnh lễ tân đang được triển khai khẩn trương."]', 3950),
('Chính Sách Thanh Toán Nhẹ Nhàng 8 Đợt — Hỗ Trợ Lãi Suất 0% Trong 24 Tháng', 'chinh-sach-thanh-toan-8-dot-uu-dai', '24/08/2026', 'Phòng Kinh Doanh', 'Chính Sách', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Khách hàng chỉ cần thanh toán 15% để ký HĐMB, phần còn lại được giãn tiến độ theo tiến độ xây dựng hoặc nhận hỗ trợ tài chính từ ngân hàng đối tác.', '["Ngân hàng Vietcombank và BIDV chính thức trở thành đối tác bảo lãnh dự án và giải ngân gói vay ưu đãi cho người mua nhà.", "Lãi suất 0% và ân hạn nợ gốc được áp dụng lên tới 24 tháng hoặc đến khi nhận nhà, tùy điều kiện nào đến trước."]', 5210);

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
