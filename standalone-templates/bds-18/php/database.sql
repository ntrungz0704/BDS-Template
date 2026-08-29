-- Cơ sở dữ liệu cho Mẫu Template BDS-18 (Vixyo Architecture & Luxury Real Estate)
CREATE DATABASE IF NOT EXISTS `bds18_vixyo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds18_vixyo`;

-- Bảng projects: Dự án & Bất động sản nghệ thuật
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `price` VARCHAR(100) NOT NULL,
  `price_num` DECIMAL(10, 2) DEFAULT 0.00,
  `area` VARCHAR(50) NOT NULL,
  `area_num` INT DEFAULT 0,
  `location` VARCHAR(255) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `featured` TINYINT(1) DEFAULT 0,
  `hot` TINYINT(1) DEFAULT 0,
  `year` VARCHAR(20) DEFAULT '2026',
  `style` VARCHAR(100) DEFAULT 'Modern Minimalist',
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng news: Tin tức kiến trúc & đầu tư
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `date` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Vixyo Design Studio',
  `category` VARCHAR(100) DEFAULT 'Kiến Trúc',
  `image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu BDS-18
INSERT INTO `projects` (`title`, `slug`, `category`, `price`, `price_num`, `area`, `area_num`, `location`, `district`, `city`, `image`, `featured`, `hot`, `year`, `style`, `description`) VALUES
('Dinh Thự Sinh Thái Ven Sông The Riviera Nam Sài Gòn', 'dinh-thu-sinh-thai-ven-song-the-riviera', 'Biệt Thự', '38.5 Tỷ VNĐ', 38.5, '450 m²', 450, 'Khu Biệt Thự Phú Gia, Tân Phong, Quận 7, TP.HCM', 'Quận 7', 'Hồ Chí Minh', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 1, '2026', 'Modern Minimalist', 'Kiệt tác dinh thự đương đại với không gian kính tràn đón trọn luồng gió sông.'),
('Penthouse Duplex Đỉnh Tháp Grand Marina Saigon Ba Son', 'penthouse-duplex-dinh-thap-grand-marina', 'Penthouse', '65.0 Tỷ VNĐ', 65.0, '380 m²', 380, 'Số 2 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP.HCM', 'Quận 1', 'Hồ Chí Minh', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, '2026', 'Bespoke Luxury Interior', 'Tầm nhìn triệu đô ôm trọn sông Sài Gòn và trung tâm tài chính.'),
('Biệt Thự Đồi Thông Sương Mù The Cloud Villa Đà Lạt', 'biet-thu-doi-thong-suong-mu-the-cloud-villa', 'Biệt Thự', '24.5 Tỷ VNĐ', 24.5, '520 m²', 520, 'Đường Mimosa, Phường 10, TP. Đà Lạt, Lâm Đồng', 'TP. Đà Lạt', 'Lâm Đồng', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 0, '2025', 'Eco Modern Architecture', 'Ẩn mình giữa rừng thông bạt ngàn với kiến trúc gỗ kính mộc mạc mà xa hoa.');

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `views`) VALUES
('Xu Hướng Thiết Kế Kiến Trúc Mở Kết Nối Thiên Nhiên 2026', 'xu-huong-thiet-ke-kien-truc-mo-2026', '28/08/2026', 'Vixyo Design Studio', 'Kiến Trúc', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Không gian sống xanh, tối giản và xóa nhòa ranh giới giữa nội thất và ngoại thất.', 5420);
