-- Cơ sở dữ liệu cho Mẫu Template BDS-16 (EGA Land — Trao Bạn Cuộc Sống Mơ Ước)
-- Thiết kế tương thích MySQL 5.7+ / 8.0+ / MariaDB

CREATE DATABASE IF NOT EXISTS `bds16_egaland` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds16_egaland`;

-- Bảng properties: Danh sách bất động sản bán & cho thuê
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `type` VARCHAR(100) NOT NULL,
  `category` ENUM('ban', 'thue') DEFAULT 'ban',
  `price` VARCHAR(100) NOT NULL,
  `price_num` DECIMAL(10, 2) DEFAULT 0.00,
  `area` VARCHAR(50) NOT NULL,
  `area_num` INT DEFAULT 0,
  `direction` VARCHAR(100) DEFAULT 'Không xác định',
  `location` VARCHAR(255) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) DEFAULT 'Hà Nội',
  `image` VARCHAR(500) NOT NULL,
  `hot` TINYINT(1) DEFAULT 0,
  `featured` TINYINT(1) DEFAULT 0,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng news: Tin tức thị trường
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `date` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'EGANY Technology',
  `category` VARCHAR(100) DEFAULT 'Tin Tức',
  `image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu chuẩn Mockup BDS-16
INSERT INTO `properties` (`title`, `slug`, `type`, `category`, `price`, `price_num`, `area`, `area_num`, `direction`, `location`, `district`, `city`, `image`, `hot`, `featured`, `description`) VALUES
('Toàn Bộ Danh Sách Biệt Thự Đang Bán Ở Ciputra, Biệt Thự Đẹp Tây Hồ (Tuần 4 Tháng 8)', 'toan-bo-danh-sach-biet-thu-ciputra-tay-ho', 'Biệt Thự', 'ban', '20 Tỷ VNĐ', 20.00, '200 - 250 m²', 220, 'Không xác định', 'Khu Đô Thị Nam Thăng Long Ciputra, Tây Hồ, Hà Nội', 'Tây Hồ', 'Hà Nội', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 1, 'Biệt thự đơn lập và song lập Ciputra phân khu Q, K, G với không gian sân vườn rộng thoáng.'),
('Cần bán nhà MT Phan Đình Phùng, P. 1, Phú Nhuận', 'can-ban-nha-mt-phan-dinh-phung-phu-nhuan', 'Nhà Mặt Tiền', 'ban', '14 Tỷ VNĐ', 14.00, '96 m²', 96, 'Hướng Tây Nam', 'Mặt tiền Phan Đình Phùng, Phường 1, Phú Nhuận, TP.HCM', 'Phú Nhuận', 'Hồ Chí Minh', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, 'Vị trí đắc địa kinh doanh sầm uất đa ngành nghề, kết nối Quận 1 và sân bay.'),
('Bán chung cư Ruby City, liền kề khu biệt thự Vincom Long Biên, KĐT Việt Hưng HN', 'ban-chung-cu-ruby-city-long-bien', 'Căn Hộ Chung Cư', 'ban', '1.1 Tỷ VNĐ', 1.10, '96 m²', 96, 'Hướng Tây Nam', 'Đường Phúc Lợi, Phường Giang Biên, Quận Long Biên, Hà Nội', 'Long Biên', 'Hà Nội', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 0, 1, 'Căn hộ view thoáng mát nhìn sang phân khu Vinhomes Riverside.'),
('Đầu Tư Sinh Lời Cao — Thành Phố Sinh Thái Năm Sao — Khu Phú Mỹ Hưng 3', 'dau-tu-sinh-loi-cao-thanh-pho-sinh-thai-nam-sao', 'Đất Nền Dự Án', 'ban', '3 Tỷ VNĐ', 3.00, '120 m²', 120, 'Không xác định', 'Khu Đô Thị Sinh Thái Năm Sao Five Star Eco City, Nam Sài Gòn', 'Bình Chánh', 'Hồ Chí Minh', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 1, 1, 'Khu đô thị sinh thái chuẩn nghỉ dưỡng 5 sao ven sông Cần Giuộc - Bình Chánh.'),
('Chính Chủ Cho Thuê Phòng Kk Ngõ 89 Lê Đức Thọ, Cổng Làng Phú Mỹ', 'chinh-chu-cho-thue-phong-kk-le-duc-tho', 'Nhà Cho Thuê', 'thue', '2.3 Triệu / Tháng', 2.30, '30 m²', 30, 'Không xác định', 'Ngõ 89 Lê Đức Thọ, Cổng Làng Phú Mỹ, Nam Từ Liêm, Hà Nội', 'Nam Từ Liêm', 'Hà Nội', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 1, 1, 'Phòng khép kín sạch đẹp có ban công phơi đồ, nóng lạnh, điều hòa, giờ giấc tự do.'),
('Cho thuê căn hộ Sunrise City từ 1, 2, 3, 4, 5 PN penthouse', 'cho-thue-can-ho-sunrise-city-quan-7', 'Nhà Cho Thuê', 'thue', '7 Triệu / Tháng', 7.00, '90 m²', 90, 'Hướng Nam', 'Đại lộ Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, TP.HCM', 'Quận 7', 'Hồ Chí Minh', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 1, 'Căn hộ đối diện Lotte Mart Quận 7, tiện ích đẳng cấp hồ bơi tràn 50m.');

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `views`) VALUES
('MUA CĂN HỘ RICHSTAR THANH TOÁN 1% MỖI THÁNG', 'mua-can-ho-richstar-thanh-toan-1-moi-thang', '27/08/2026', 'EGANY Technology', 'Tin Tức', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Chính sách chi trả linh hoạt từ chủ đầu tư phù hợp với nhiều gia đình trẻ khi muốn sở hữu căn hộ giá 1,49 tỷ đồng.', 4120),
('THÊM 10 CĂN SHOPHOUSE PARK HILL PREMIUM TRONG NGÀY MỞ BÁN', 'them-10-can-shophouse-park-hill-premium', '27/08/2026', 'EGANY Technology', 'Tin Tức', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Chủ đầu tư đã bổ sung thêm 10 căn shophouse thay vì 31 căn như kế hoạch tại buổi mở bán.', 3890);
