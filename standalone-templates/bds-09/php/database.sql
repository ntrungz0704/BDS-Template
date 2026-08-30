-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE CLASSIC HERITAGE ARCHITECTURE (BDS-09)
-- Tạo database: bds_classic_heritage
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_classic_heritage` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_classic_heritage`;

-- Bảng lưu danh sách Bất Động Sản
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu
INSERT INTO `properties` (`title`, `slug`, `price`, `area`, `location`, `image`, `description`) VALUES
('Biệt thự sang trọng view thoáng mát', 'biet-thu-view-thoang-mat', '5.5 Tỷ VNĐ', '300 m²', 'Khu Đô Thị Mới', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Biệt thự thiết kế hiện đại sang trọng, đầy đủ tiện nghi.'),
('Nhà phố mặt tiền thương mại kinh doanh', 'nha-pho-mat-tien-kinh-doanh', '8.2 Tỷ VNĐ', '140 m²', 'Trung tâm thành phố', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Thuận tiện mở văn phòng, spa hoặc showroom kinh doanh.'),
('Đất nền phân lô sổ đỏ sẵn sàng công chứng', 'dat-nen-phan-lo-so-do', '1.9 Tỷ VNĐ', '120 m²', 'Khu dân cư hiện hữu', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'Hạ tầng hoàn thiện điện âm nước máy, xây dựng tự do.');

-- Bảng lưu thông tin khách hàng gửi từ Form liên hệ
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `message` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
