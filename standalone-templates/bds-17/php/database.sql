-- Cơ sở dữ liệu cho Mẫu Template BDS-17 (Beverly Hills Hạ Long)
CREATE DATABASE IF NOT EXISTS `bds17_beverlyhills` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds17_beverlyhills`;

-- Bảng units: Bảng hàng căn hộ & biệt thự
CREATE TABLE IF NOT EXISTS `units` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
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
  `plan_image` VARCHAR(500) DEFAULT NULL,
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
  `author` VARCHAR(100) DEFAULT 'Beverly Hills Research',
  `category` VARCHAR(100) DEFAULT 'Thị Trường',
  `image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu BDS-17
INSERT INTO `units` (`title`, `code`, `slug`, `type`, `floor`, `price`, `price_num`, `area`, `area_num`, `beds`, `baths`, `view`, `direction`, `image`, `hot`, `featured`, `description`) VALUES
('Căn Hộ Studio Nghỉ Dưỡng View Trực Diện Vịnh Hạ Long', 'BH-ST08', 'can-ho-studio-nghi-duong-view-vinh-ha-long', 'Căn Hộ Studio', 'Tầng 08 - 12', '1.65 Tỷ VNĐ', 1.65, '42 m²', 42, 1, 1, 'View Vịnh Hạ Long & Cầu Bãi Cháy', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, 'Căn hộ khách sạn Condotel đầy đủ nội thất 5 sao, ban công kính tràn.'),
('Căn Hộ 1 Phòng Ngủ View Vòng Quay Mặt Trời Sun Wheel', 'BH-1P15', 'can-ho-1-phong-ngu-view-vong-quay-mat-troi', '1 Phòng Ngủ', 'Tầng 14 - 18', '2.35 Tỷ VNĐ', 2.35, '58 m²', 58, 1, 1, 'View Sun Wheel & Công Viên Rồng', 'Hướng Đông Bắc', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 0, 1, 'Thiết kế thông minh tối ưu công năng, phòng khách liên thông bếp hiện đại.'),
('Căn Hộ Góc 2 Phòng Ngủ Panorama 2 Mặt Thoáng Hướng Biển', 'BH-2P09', 'can-ho-goc-2-phong-ngu-panorama-huong-bien', '2 Phòng Ngủ', 'Tầng 09 - 16', '3.60 Tỷ VNĐ', 3.60, '82 m²', 82, 2, 2, 'View Panorama 270 độ Vịnh Hạ Long', 'Hướng Nam', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 1, 'Căn hộ góc đẳng cấp với 2 ban công rộng lớn, phòng ngủ Master có bồn tắm kính.');

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `views`) VALUES
('Bất Động Sản Nghỉ Dưỡng Bãi Cháy Bứt Phá Mạnh Mẽ', 'bds-nghi-duong-bai-chay-but-pha-manh-me', '28/08/2026', 'Beverly Hills Research', 'Thị Trường', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Tuyến cao tốc Vân Đồn - Móng Cái kéo lượng lớn du khách thượng lưu về Bãi Cháy.', 4520);
