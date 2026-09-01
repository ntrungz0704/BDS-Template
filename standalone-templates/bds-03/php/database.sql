-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-03
-- Tạo database: bds_modern_corporate
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_modern_corporate` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_modern_corporate`;

-- Bảng thông tin công ty
CREATE TABLE IF NOT EXISTS `company_info` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `slogan` VARCHAR(255) NOT NULL,
  `zalo` VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
('TEMPLATESBDS', '0919 006 030', 'ntrungz0704@gmail.com', 'Hồ Chí Minh, Việt Nam', 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam', '0919006030');

-- Bảng lưu danh sách Dự án
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `scale` VARCHAR(100),
  `price` VARCHAR(100) NOT NULL,
  `priceNum` FLOAT,
  `location` VARCHAR(255) NOT NULL,
  `status` VARCHAR(50),
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `title`, `slug`, `scale`, `price`, `priceNum`, `location`, `status`, `image`, `description`) VALUES
(1, 'Làng Sinh Thái Nghỉ Dưỡng La Beaute Bảo Lộc', 'la-beaute-bao-loc', '14 Hécta, 280 Nền biệt thự', 'Từ 1.2 Tỷ / Nền', 1.2, 'Xã Lộc Tân, Huyện Bảo Lâm, Lâm Đồng', 'Đang mở bán Giai đoạn 2', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Quần thể nghỉ dưỡng sinh thái chuẩn 5 sao với hồ bơi tràn bờ, đồi chè Ô Long và suối tự nhiên uốn lượn.'),
(2, 'Khu Đô Thị Sinh Thái Bảo Lộc Park Hills', 'bao-loc-park-hills', '64 Hécta, Phân khu biệt thự hồ', 'Từ 1.5 Tỷ / Nền', 1.5, 'Quốc Lộ 20, TP. Bảo Lộc, Lâm Đồng', 'Đã hoàn thiện hạ tầng 100%', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', 'Khu đô thị sinh thái lớn nhất Bảo Lộc sở hữu công viên hồ trung tâm 12ha và chuỗi tiện ích vui chơi giải trí.'),
(3, 'Phân Lô Biệt Thự Đồi View Hồ Ngọc Di Linh', 'biet-thu-doi-ho-ngoc-di-linh', '8 Hécta, 68 Nền đất vườn', 'Từ 850 Triệu / Nền', 0.85, 'Thị trấn Di Linh, Lâm Đồng', 'Sổ đỏ có sẵn từng nền', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Vị trí vàng ngay cửa ngõ cao tốc Dầu Giây - Liên Khương, không gian nghỉ dưỡng biệt lập đẳng cấp.');

-- Bảng lưu danh sách Bất Động Sản
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(50),
  `type` VARCHAR(100),
  `price` VARCHAR(100) NOT NULL,
  `priceNum` FLOAT,
  `area` VARCHAR(50) NOT NULL,
  `areaNum` FLOAT,
  `location` VARCHAR(255) NOT NULL,
  `district` VARCHAR(100),
  `province` VARCHAR(100),
  `legal` VARCHAR(255),
  `badge` VARCHAR(50),
  `image` TEXT NOT NULL,
  `gallery` TEXT,
  `date` VARCHAR(20),
  `description` TEXT,
  `author_name` VARCHAR(100),
  `author_phone` VARCHAR(20),
  `author_zalo` VARCHAR(20),
  `author_avatar` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `properties` (`id`, `title`, `slug`, `category`, `type`, `price`, `priceNum`, `area`, `areaNum`, `location`, `district`, `province`, `legal`, `badge`, `image`, `gallery`, `date`, `description`, `author_name`, `author_phone`, `author_zalo`, `author_avatar`) VALUES
(1, 'Nhà phố 1 trệt 2 lầu mặt tiền đường Trần Phú, TP. Bảo Lộc', 'nha-pho-1-tret-2-lau-tran-phu-bao-loc', 'nha-pho', 'Nhà phố', '3.85 Tỷ VNĐ', 3.85, '115 m²', 115, 'Đường Trần Phú (QL20), Phường 1, TP. Bảo Lộc, Lâm Đồng', 'Bảo Lộc', 'Lâm Đồng', 'Sổ hồng riêng hoàn công', 'Sổ Sẵn', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', '[\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80\", \"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80\", \"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80\"]', '28/08/2026', 'Nhà phố vị trí trung tâm sầm uất, trục đường huyết mạch Quốc Lộ 20, thuận tiện mở văn phòng, spa hoặc showroom kinh doanh.', 'Võ Tuấn Nhân', '0909.568.888', '0909568888', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'),
(2, 'Đất vườn sầu riêng Musang King 1.500m² view đồi săn mây Bảo Lâm', 'dat-vuon-sau-rieng-1500m2-bao-lam', 'dat-vuon', 'Đất vườn nghỉ dưỡng', '1.45 Tỷ VNĐ', 1.45, '1,500 m²', 1500, 'Xã Lộc Tân, Huyện Bảo Lâm, Tỉnh Lâm Đồng', 'Bảo Lâm', 'Lâm Đồng', 'Sổ đỏ trao tay, công chứng ngay', 'View Đồi', 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80', '[\"https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80\", \"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80\"]', '27/08/2026', 'Khu vườn sầu riêng 3 năm tuổi xanh tốt, thế đất thoải nhẹ view ôm trọn thung lũng sương mù, đường bê tông 6m ô tô vào tận nơi.', 'Nguyễn Thị Hồng Hạnh', '0938.123.456', '0938123456', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'),
(3, 'Đất nền phân lô nghỉ dưỡng ven hồ sinh thái Ngọc Di Linh', 'dat-nen-nghi-duong-ven-ho-ngoc-di-linh', 'dat-nen', 'Đất nền dự án', '850 Triệu VNĐ', 0.85, '250 m²', 250, 'Thị trấn Di Linh, Huyện Di Linh, Tỉnh Lâm Đồng', 'Di Linh', 'Lâm Đồng', 'Sổ hồng riêng có sẵn thổ cư 100m²', 'Giá Tốt F0', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', '[\"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80\", \"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80\"]', '26/08/2026', 'Vị trí đắc địa cạnh hồ tự nhiên nước trong xanh, khí hậu quanh năm 20°C mát mẻ như Đà Lạt, thích hợp làm homestay hoặc nhà vườn.', 'Võ Tuấn Nhân', '0909.568.888', '0909568888', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'),
(4, 'Biệt thự đồi phong cách Thụy Sĩ La Beaute Bảo Lộc view thung lũng', 'biet-thu-doi-thuy-si-la-beaute-bao-loc', 'biet-thu', 'Biệt thự nghỉ dưỡng', '4.2 Tỷ VNĐ', 4.2, '320 m²', 320, 'Dự án La Beaute, Xã Lộc Tân, Huyện Bảo Lâm, Lâm Đồng', 'Bảo Lộc', 'Lâm Đồng', 'Sổ hồng sở hữu lâu dài', 'Cao Cấp', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', '[\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80\", \"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80\"]', '25/08/2026', 'Biệt thự xây sẵn full nội thất gỗ thông cao cấp, có sân vườn trồng hoa hồng và hồ cá Koi, tiện ích hồ bơi vô cực và clubhouse.', 'Trần Văn Mạnh', '0902.999.888', '0902999888', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'),
(5, 'Đất vườn chè Ô Long 2.000m² có suối chảy quanh đất Lộc Quảng', 'dat-vuon-che-o-long-2000m2-loc-quang', 'dat-vuon', 'Đất vườn nghỉ dưỡng', '1.95 Tỷ VNĐ', 1.95, '2,000 m²', 2000, 'Xã Lộc Quảng, Huyện Bảo Lâm, Lâm Đồng', 'Bảo Lâm', 'Lâm Đồng', 'Sổ hồng riêng, ranh giới rõ ràng', 'Có Suối', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', '[\"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80\"]', '24/08/2026', 'Lô đất hiếm có suối đá tự nhiên nước chảy róc rách quanh năm, không khí trong lành nguyên sơ, cách thác Đambri chỉ 4km.', 'Nguyễn Thị Hồng Hạnh', '0938.123.456', '0938123456', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'),
(6, 'Đất nền biệt thự đồi Sun Valley Bảo Lộc diện tích 500m²', 'dat-nen-biet-thu-sun-valley-bao-loc', 'dat-nen', 'Đất nền dự án', '1.68 Tỷ VNĐ', 1.68, '500 m²', 500, 'KĐT Sun Valley, Xã Đam B’ri, TP. Bảo Lộc, Lâm Đồng', 'Bảo Lộc', 'Lâm Đồng', 'Sổ hồng riêng từng nền', 'Đô Thị Mới', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', '[\"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80\"]', '23/08/2026', 'Hạ tầng hoàn chỉnh điện âm nước máy, đường nhựa 8m có vỉa hè cây xanh, công viên cảnh quan hồ điều hòa rộng 2ha.', 'Võ Tuấn Nhân', '0909.568.888', '0909568888', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'),
(7, 'Nhà vườn sinh thái gỗ thông 600m² đã trồng sẵn cây ăn trái Bảo Lâm', 'nha-vuon-sinh-thai-go-thong-600m2-bao-lam', 'dat-vuon', 'Đất vườn nghỉ dưỡng', '2.15 Tỷ VNĐ', 2.15, '600 m²', 600, 'Xã Lộc An, Huyện Bảo Lâm, Lâm Đồng', 'Bảo Lâm', 'Lâm Đồng', 'Sổ đỏ chính chủ có 150m² thổ cư', 'Nhà Đẹp', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', '[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80\"]', '22/08/2026', 'Căn nhà gỗ ấm cúng hoàn thiện đầy đủ tiện nghi, có giàn hoa giấy, cây bơ 034 và sầu riêng đang cho thu hoạch, xách vali vào ở ngay.', 'Trần Văn Mạnh', '0902.999.888', '0902999888', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'),
(8, 'Shophouse thương mại 4 tầng trung tâm hành chính Di Linh', 'shophouse-trung-tam-hanh-chinh-di-linh', 'nha-pho', 'Nhà phố thương mại', '4.6 Tỷ VNĐ', 4.6, '140 m²', 140, 'Đường Hùng Vương, Thị trấn Di Linh, Lâm Đồng', 'Di Linh', 'Lâm Đồng', 'Sổ hồng hoàn công', 'Kinh Doanh', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', '[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80\"]', '21/08/2026', 'Tuyến phố thương mại sầm uất nhất huyện Di Linh, gần siêu thị, ngân hàng và trường học, đang cho ngân hàng thuê tầng trệt 25 triệu/tháng.', 'Võ Tuấn Nhân', '0909.568.888', '0909568888', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80');

-- Bảng tin tức
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `date` VARCHAR(50),
  `author` VARCHAR(100),
  `category` VARCHAR(100),
  `image` TEXT,
  `description` TEXT,
  `content` TEXT,
  `views` INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `news` (`id`, `title`, `slug`, `date`, `author`, `category`, `image`, `description`, `content`, `views`) VALUES
(1, 'Cao tốc Tân Phú - Bảo Lộc chính thức khởi công: Động lực bứt phá giá đất Lâm Đồng', 'cao-toc-tan-phu-bao-loc-khoi-cong', '28/08/2026', 'Võ Tuấn Nhân', 'Quy hoạch & Hạ tầng', 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&q=80', 'Tuyến cao tốc rút ngắn thời gian di chuyển từ TP.HCM lên Bảo Lộc chỉ còn 2 giờ lái xe, tạo làn sóng đầu tư mạnh mẽ...', '[\"Cao tốc Dầu Giây - Tân Phú và Tân Phú - Bảo Lộc là dự án giao thông trọng điểm quốc gia, giúp kết nối vùng kinh tế trọng điểm phía Nam với cao nguyên Lâm Đồng.\", \"Khi tuyến đường hoàn thành, thời gian di chuyển từ Sài Gòn về Bảo Lộc chỉ còn khoảng 2 giờ, biến nơi đây thành \\\"ngôi nhà thứ 2\\\" lý tưởng cho các gia đình đô thị.\", \"Thị trường đất vườn và biệt thự sinh thái Bảo Lộc ghi nhận mức độ quan tâm tăng hơn 45% so với cùng kỳ năm ngoái.\"]', 5200),
(2, 'Xu hướng \"Second Home\" nghỉ dưỡng sinh thái: Vì sao Bảo Lộc được giới đầu tư săn đón?', 'xu-huong-second-home-nghi-duong-bao-loc', '26/08/2026', 'Chuyên gia BĐS Nghỉ Dưỡng', 'Cẩm nang đầu tư', 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80', 'Khí hậu ôn hòa 20-22°C quanh năm, cảnh quan đồi chè suối tự nhiên và mức giá còn ở vùng trũng là những điểm cộng lớn...', '[\"Bảo Lộc được thiên nhiên ưu đãi khí hậu mát lạnh dễ chịu quanh năm, không quá lạnh như Đà Lạt và không khí trong lành không khói bụi.\", \"Mô hình nhà vườn vừa nghỉ dưỡng cuối tuần, vừa cho thuê homestay đang mang lại tỷ suất lợi nhuận kép từ dòng tiền và lãi vốn.\", \"Sở hữu đất có sổ hồng riêng với mức giá chỉ từ 1-2 tỷ đồng là bài toán tài chính an toàn tuyệt đối trong thời điểm hiện nay.\"]', 4350),
(3, 'Kinh nghiệm vàng khi chọn mua đất vườn và đất nền nghỉ dưỡng tại Bảo Lộc - Lâm Đồng', 'kinh-nghiem-chon-mua-dat-vuon-bao-loc', '24/08/2026', 'Ban Tư Vấn Tuấn Nhân', 'Cẩm nang pháp lý', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Kiểm tra quy hoạch thổ cư, đường hiện hữu trên sổ và nguồn nước ngầm là 3 yếu tố sống còn người mua cần lưu ý...', '[\"Yếu tố đầu tiên cần thẩm định là pháp lý: Đất phải có sổ hồng riêng, không dính quy hoạch rừng phòng hộ hoặc dự án treo.\", \"Thứ hai là đường giao thông: Đường vào đất phải được thể hiện trên sổ đỏ, lộ giới từ 4m trở lên để xe ô tô ra vào thuận tiện.\", \"Thứ ba là nguồn nước và điện: Khu vực có giếng khoan nước ngọt hoặc suối tự nhiên sẽ giúp tiết kiệm hàng trăm triệu chi phí cải tạo vườn.\"]', 6100);

-- Bảng đánh giá của khách hàng
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255),
  `comment` TEXT,
  `avatar` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `testimonials` (`id`, `name`, `role`, `comment`, `avatar`) VALUES
(1, 'Anh Nguyễn Minh Tuấn', 'Nhà đầu tư cá nhân — TP. Hồ Chí Minh', 'Tôi mua 2 lô đất vườn Lộc Tân qua BĐS Tuấn Nhân từ năm 2024. Đội ngũ tư vấn rất trung thực, sổ đỏ công chứng nhanh chóng trong ngày. Hiện tại vườn sầu riêng đã cho thu hoạch và giá đất tăng gần gấp đôi.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'),
(2, 'Chị Lê Hoàng Mai Lan', 'Bác sĩ tại Bệnh viện Đại học Y Dược TP.HCM', 'Gia đình tôi luôn mơ ước có một căn second-home tại Bảo Lộc để cuối tuần cả nhà về nghỉ ngơi. Cảm ơn Tuấn Nhân Realty đã giúp tôi tìm được căn nhà vườn gỗ thông view đồi tuyệt đẹp đúng ý.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'),
(3, 'Bác Trần Quốc Cường', 'Cán bộ hưu trí — Hà Nội', 'Khí hậu Bảo Lộc thực sự quá tuyệt vời cho người cao tuổi dưỡng già. Mua đất ở xa tôi sợ nhất rủi ro pháp lý, nhưng qua công ty Tuấn Nhân thì hoàn toàn yên tâm vì mọi thứ minh bạch 100%.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80');


-- Bảng lưu thông tin khách hàng gửi từ Form liên hệ
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `product_type` VARCHAR(100),
  `source` VARCHAR(100),
  `message` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
