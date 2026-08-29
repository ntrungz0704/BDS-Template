-- Cơ sở dữ liệu cho Mẫu Template BDS-23 (Minh Khai Apartments)
CREATE DATABASE IF NOT EXISTS `bds23_minhkhai` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds23_minhkhai`;

-- Bảng projects: Dự án chung cư Minh Khai
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `address` VARCHAR(255) NOT NULL,
  `price_range` VARCHAR(100) NOT NULL,
  `price_num` DECIMAL(10, 2) DEFAULT 0.00,
  `area_range` VARCHAR(100) NOT NULL,
  `developer` VARCHAR(100) NOT NULL,
  `status` VARCHAR(100) DEFAULT 'Đã Bàn Giao',
  `image` VARCHAR(500) NOT NULL,
  `hot` TINYINT(1) DEFAULT 0,
  `featured` TINYINT(1) DEFAULT 0,
  `total_units` VARCHAR(100) DEFAULT '1000+ Căn Hộ',
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng news: Tin tức & quy hoạch
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `date` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Minh Khai Land',
  `category` VARCHAR(100) DEFAULT 'Quy Hoạch',
  `image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu BDS-23
INSERT INTO `projects` (`title`, `slug`, `address`, `price_range`, `price_num`, `area_range`, `developer`, `status`, `image`, `hot`, `featured`, `total_units`, `description`) VALUES
('Vinhomes Times City & Park Hill', 'vinhomes-times-city-park-hill', '458 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '3.8 - 14.5 Tỷ VNĐ', 3.80, '53 - 178 m²', 'Vingroup', 'Đã Bàn Giao', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, '12.000+ Căn Hộ', 'Khu đô thị phức hợp kiểu mẫu với hồ nhạc nước, bệnh viện Vinmec, Vinschool và Mega Mall ngầm.'),
('Green Pearl City Minh Khai', 'green-pearl-city-minh-khai', '378 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '4.2 - 9.8 Tỷ VNĐ', 4.20, '71 - 139 m²', 'Phong Phú Corp', 'Đang Mở Bán', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 1, '504 Căn Hộ', 'Không gian sống xanh mát chuẩn sinh thái với mật độ xây dựng thấp liền kề Vành Đai 2.'),
('Imperia Sky Garden 423 Minh Khai', 'imperia-sky-garden-423-minh-khai', '423 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '4.5 - 11.2 Tỷ VNĐ', 4.50, '58 - 106 m²', 'MIK Group', 'Đã Bàn Giao', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 1, '1.866 Căn Hộ', 'Vườn chân mây giữa lòng phố thị với 68 tiện ích đỉnh cao trên cao và bể bơi vô cực.');

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `views`) VALUES
('Hạ Tầng Tuyến Đường Trên Cao Vành Đai 2 Hoàn Thiện', 'ha-tang-vanh-dai-2-thoi-bung-gia-tri-minh-khai', '28/08/2026', 'Tạp Chí Bất Động Sản', 'Quy Hoạch', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Tuyến đường trên cao Vĩnh Tuy - Ngã Tư Sở thông xe toàn tuyến rút ngắn thời gian di chuyển.', 6250);
