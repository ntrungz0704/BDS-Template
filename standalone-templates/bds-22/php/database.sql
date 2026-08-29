-- Cơ sở dữ liệu cho Mẫu Template BDS-22 (HappyLand Resort & Condotel Nha Trang)
CREATE DATABASE IF NOT EXISTS `bds22_happyland` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds22_happyland`;

-- Bảng units: BĐS nghỉ dưỡng
CREATE TABLE IF NOT EXISTS `units` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `zone` VARCHAR(100) NOT NULL,
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
  `commitment` VARCHAR(255) DEFAULT 'Cam kết lợi nhuận 10%/năm',
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng news: Tin tức nghỉ dưỡng
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `date` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Ban Quản Lý HappyLand',
  `category` VARCHAR(100) DEFAULT 'Sự Kiện',
  `image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu BDS-22
INSERT INTO `units` (`title`, `code`, `slug`, `zone`, `type`, `floor`, `price`, `price_num`, `area`, `area_num`, `beds`, `baths`, `view`, `direction`, `image`, `hot`, `featured`, `commitment`, `description`) VALUES
('Condotel Studio 1PN View Trực Diện Vịnh Biển Nha Trang', 'HLR-C0812', 'condotel-studio-1pn-view-vinh-bien-nha-trang', 'Tháp Condotel ZoHotels', 'Condotel Studio 1PN', 'Tầng 08', '2.35 Tỷ VNĐ', 2.35, '45 m²', 45, 1, 1, 'Trực diện bãi biển cát trắng', 'Hướng Đông', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', 1, 1, 'Cam kết lợi nhuận 10%/năm trong 5 năm đầu', 'Căn hộ khách sạn bàn giao full nội thất 5 sao chuẩn ZoHotels International.'),
('Biệt Thự Biển Song Lập Vườn Dừa HappyLand Oceanfront', 'HLR-V05', 'biet-thu-bien-song-lap-vuon-dua', 'Phân Khu Biệt Thự Biển', 'Biệt Thự Song Lập Biển', '2 Tầng', '16.8 Tỷ VNĐ', 16.80, '240 m²', 240, 3, 4, 'Cách mép nước biển 30m', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 1, 1, 'Chia sẻ doanh thu cho thuê 85/15 trọn đời', 'Tuyệt tác biệt thự nghỉ dưỡng bước chân chạm cát trắng, hồ bơi điện phân muối riêng.'),
('Biệt Thự Đơn Lập Ghềnh Đá Tuyệt Tác Độc Bản Cliffside', 'HLR-CV01', 'biet-thu-don-lap-ghenh-da-cliffside-villa', 'Phân Khu Biệt Thự Biển', 'Biệt Thự Đơn Lập Ghềnh Đá', '3 Tầng', '38.0 Tỷ VNĐ', 38.00, '420 m²', 420, 5, 6, 'Tọa độ ghềnh đá nhô ra biển', 'Hướng Đông', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 1, 1, 'Quản gia riêng 24/7 & Bến đỗ du thuyền', 'Dinh thự độc bản tọa lạc trên ghềnh đá tự nhiên, sở hữu lối đi riêng xuống bãi san hô.');

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `views`) VALUES
('Ký Kết Hợp Tác Vận Hành Quốc Tế Giữa HappyLand & ZoHotels', 'ky-ket-hop-tac-van-hanh-zohotels-nha-trang', '28/08/2026', 'Ban Quản Lý HappyLand', 'Hợp Tác', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', 'Thương hiệu quản lý khách sạn danh tiếng ZoHotels chính thức tiếp quản vận hành.', 5780);
