-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-14 (WINTLAND REAL ESTATE)
-- Tạo database: bds_14_wintland_realestate
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_14_wintland_realestate` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_14_wintland_realestate`;

-- Bảng lưu danh sách Bất Động Sản / Nhà phố / Biệt thự / Căn hộ
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `type` VARCHAR(100) DEFAULT 'Nhà Phố',
  `category` VARCHAR(50) DEFAULT 'ban',
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `beds` INT DEFAULT 2,
  `baths` INT DEFAULT 2,
  `location` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu các sản phẩm WintLand
INSERT INTO `properties` (`title`, `slug`, `type`, `category`, `price`, `area`, `beds`, `baths`, `location`, `city`, `image`, `description`) VALUES
('Bán Nhà Phố Hiện Đại Mặt Tiền Nguyễn Trãi Quận 1', 'ban-nha-pho-hien-dai-mat-tien-nguyen-trai-quan-1', 'Nhà Phố Mặt Tiền', 'ban', '8.50 Tỷ VNĐ', '95 m²', 4, 4, 'Đường Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh', 'Hồ Chí Minh', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Nhà phố 1 trệt 3 lầu phong cách Bắc Âu hiện đại, đường trước nhà 10m.'),
('Căn Hộ Nghỉ Dưỡng View Biển Mỹ Khê The Sang Residence', 'can-ho-nghi-duong-view-bien-my-khe-the-sang-residence', 'Căn Hộ Cao Cấp', 'ban', '3.45 Tỷ VNĐ', '72 m²', 2, 2, 'Đường Võ Nguyên Giáp, Quận Ngũ Hành Sơn, TP. Đà Nẵng', 'Đà Nẵng', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'Căn hộ 2 phòng ngủ tầng cao view trực diện bãi biển Mỹ Khê Đà Nẵng.'),
('Biệt Thự Vườn Sinh Thái Ven Sông Hương Cố Đô Huế', 'biet-thu-vuon-sinh-thai-ven-song-huong-co-do-hue', 'Biệt Thự Nhà Vườn', 'ban', '6.20 Tỷ VNĐ', '280 m²', 5, 4, 'Đường Kim Long, Phường Kim Long, TP. Huế', 'Huế', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Biệt thự sân vườn mang đậm nét thanh lịch kiến trúc Cố Đô kết hợp tiện nghi đương đại.'),
('Cho Thuê Căn Hộ 2PN Landmark 81 Full Nội Thất Sang Trọng', 'cho-thue-can-ho-2pn-landmark-81-full-noi-that', 'Căn Hộ Cho Thuê', 'thue', '22 Triệu / Tháng', '79 m²', 2, 2, 'Vinhomes Central Park, Bình Thạnh, TP.HCM', 'Hồ Chí Minh', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Căn hộ view trực diện công viên ven sông 14ha và tòa tháp Landmark 81.');

-- Bảng lưu tin đăng từ người dùng
CREATE TABLE IF NOT EXISTS `listings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `price` VARCHAR(100),
  `area` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
