-- Cơ sở dữ liệu cho Mẫu Template BDS-19 (Sunshine City Saigon)
CREATE DATABASE IF NOT EXISTS `bds19_sunshine` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds19_sunshine`;

-- Bảng units: Căn hộ thông minh 4.0
CREATE TABLE IF NOT EXISTS `units` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `tower` VARCHAR(100) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `floor` VARCHAR(100) NOT NULL,
  `price` VARCHAR(100) NOT NULL,
  `price_num` DECIMAL(10, 2) DEFAULT 0.00,
  `area` VARCHAR(50) NOT NULL,
  `area_num` INT DEFAULT 0,
  `beds` INT DEFAULT 1,
  `baths` INT DEFAULT 1,
  `view` VARCHAR(255) NOT NULL,
  `direction` VARCHAR(100) DEFAULT 'Đông Nam',
  `image` VARCHAR(500) NOT NULL,
  `hot` TINYINT(1) DEFAULT 0,
  `featured` TINYINT(1) DEFAULT 0,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng news: Tin tức dự án
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `date` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Vietnam Property Awards',
  `category` VARCHAR(100) DEFAULT 'Giải Thưởng',
  `image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu BDS-19
INSERT INTO `units` (`title`, `code`, `slug`, `tower`, `type`, `floor`, `price`, `price_num`, `area`, `area_num`, `beds`, `baths`, `view`, `direction`, `image`, `hot`, `featured`, `description`) VALUES
('Căn Hộ Thông Minh 1 Phòng Ngủ Tòa S1 Venus View Sông Cả Cấm', 'S1-0812', 'can-ho-1-phong-ngu-s1-venus-view-song', 'Tòa S1 - Venus', '1 Phòng Ngủ', 'Tầng 12', '3.45 Tỷ VNĐ', 3.45, '52 m²', 52, 1, 1, 'Trực diện sông Cả Cấm', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, 'Căn hộ ứng dụng công nghệ Smart Home 4.0 toàn diện, thiết bị vệ sinh dát vàng.'),
('Căn Hộ Góc 2 Phòng Ngủ Tòa S4 Mercury View Toàn Cảnh Phú Mỹ Hưng', 'S4-1806', 'can-ho-goc-2-phong-ngu-s4-mercury-view-pmh', 'Tòa S4 - Mercury', '2 Phòng Ngủ', 'Tầng 18', '4.85 Tỷ VNĐ', 4.85, '76 m²', 76, 2, 2, 'View Panorama Phú Mỹ Hưng', 'Hướng Nam', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 1, 'Căn góc 2 mặt thoáng ngập tràn ánh sáng tự nhiên, phòng khách ban công kính nối dài.'),
('Căn Hộ 3 Phòng Ngủ Hoàng Gia Tòa S7 Jupiter Suite VIP', 'S7-2802', 'can-ho-3-phong-ngu-s7-jupiter-suite-vip', 'Tòa S7 - Jupiter', '3 Phòng Ngủ', 'Tầng 28', '6.90 Tỷ VNĐ', 6.90, '105 m²', 105, 3, 2, 'View Sông Sài Gòn & Q1', 'Hướng Đông Bắc', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 0, 1, 'Không gian sống xứng tầm chủ nhân danh giá, phòng ngủ Master có bồn tắm kính.');

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `views`) VALUES
('Sunshine Group Được Vinh Danh Là Nhà Phát Triển BĐS Công Nghệ Tốt Nhất 2026', 'sunshine-group-nha-phat-trien-bds-cong-nghe-tot-nhat', '28/08/2026', 'Vietnam Property Awards', 'Giải Thưởng', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Hệ sinh thái Smart Living 4.0 tạo bước đột phá trong quản lý vận hành.', 6120);
