-- Cơ sở dữ liệu cho Mẫu Template BDS-21 (Homeo Realty)
CREATE DATABASE IF NOT EXISTS `bds21_homeo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds21_homeo`;

-- Bảng properties: Bất động sản
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(50) NOT NULL DEFAULT 'ban',
  `type` VARCHAR(100) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `city` VARCHAR(100) NOT NULL DEFAULT 'Hà Nội',
  `price` VARCHAR(100) NOT NULL,
  `price_num` DECIMAL(10, 2) DEFAULT 0.00,
  `area` VARCHAR(50) NOT NULL,
  `area_num` INT DEFAULT 0,
  `beds` INT DEFAULT 1,
  `baths` INT DEFAULT 1,
  `image` VARCHAR(500) NOT NULL,
  `hot` TINYINT(1) DEFAULT 0,
  `status_tag` VARCHAR(100) DEFAULT 'Đang Mở Bán',
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng news: Tin tức BĐS
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `date` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Homeo Realty',
  `category` VARCHAR(100) DEFAULT 'Thị Trường',
  `image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu BDS-21
INSERT INTO `properties` (`title`, `slug`, `category`, `type`, `location`, `city`, `price`, `price_num`, `area`, `area_num`, `beds`, `baths`, `image`, `hot`, `status_tag`, `description`) VALUES
('Biệt Thự Vườn Đơn Lập The Manor Central Park Hoàng Mai', 'biet-thu-vuon-don-lap-the-manor-central-park', 'ban', 'Biệt Thự Đơn Lập', 'Đường Nguyễn Xiển, Hoàng Mai, Hà Nội', 'Hà Nội', '28.5 Tỷ VNĐ', 28.50, '210 m²', 210, 5, 5, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 'Đang Mở Bán', 'Biệt thự góc 2 mặt tiền view trực diện công viên Chu Văn An, thiết kế tân cổ điển.'),
('Căn Hộ Masteri Centre Point Vinhomes Grand Park Quận 9', 'can-ho-masteri-centre-point-quan-9', 'ban', 'Căn Hộ Chung Cư', 'Khu Đô Thị Grand Park, TP. Thủ Đức, TP.HCM', 'TP. Hồ Chí Minh', '3.65 Tỷ VNĐ', 3.65, '72 m²', 72, 2, 2, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 'Chính Chủ', 'Căn hộ view trực diện biển hồ cát trắng và đại công viên ánh sáng 36ha.'),
('Penthouse Duplex Dát Vàng Ba Son Quận 1 Sài Gòn', 'penthouse-duplex-vinhomes-golden-river-q1', 'ban', 'Penthouse', 'Số 2 Tôn Đức Thắng, Bến Nghé, Quận 1, TP.HCM', 'TP. Hồ Chí Minh', '48.0 Tỷ VNĐ', 48.00, '320 m²', 320, 4, 5, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 'VIP Độc Bản', 'Tầm nhìn triệu đô 360 độ ngắm trọn sông Sài Gòn và Landmark 81.');

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `views`) VALUES
('Thị Trường Bất Động Sản Quý 3/2026: Sức Hút Của BĐS Sinh Thái', 'thi-truong-bds-quy-3-2026-suc-hut-nghi-duong', '28/08/2026', 'Hiệp Hội BĐS Việt Nam', 'Thị Trường', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Dòng tiền đầu tư đang có xu hướng dịch chuyển mạnh mẽ sang sản phẩm pháp lý chuẩn.', 6420);
