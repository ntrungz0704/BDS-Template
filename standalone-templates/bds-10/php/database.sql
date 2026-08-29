-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-10 (DANH KHÔI REAL ESTATE - DKRP)
-- Tạo database: bds_10_danhkhoi_dkrp
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_10_danhkhoi_dkrp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_10_danhkhoi_dkrp`;

-- Bảng lưu danh sách Bất Động Sản / Dự án
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `type` VARCHAR(100) DEFAULT 'Dự Án Bất Động Sản',
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu các dự án DKRP
INSERT INTO `properties` (`title`, `slug`, `type`, `price`, `area`, `location`, `image`, `description`) VALUES
('DỰ ÁN PHỨC HỢP CĂN HỘ ASTRAL CITY BÌNH DƯƠNG', 'du-an-phuc-hop-can-ho-astral-city-binh-duong', 'Căn Hộ Cao Cấp', '2.15 Tỷ VNĐ', '53.5 m²', 'Mặt tiền Đại lộ Bình Dương (QL13)', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Tổ hợp 8 tòa tháp 40 tầng cao nhất Bình Dương với hơn 4.900 căn hộ cao cấp và 300m mặt tiền đại lộ tài chính.'),
('DỰ ÁN ARIA ĐÀ NẴNG HOTEL & RESORT', 'du-an-aria-da-nang-hotel-and-resort', 'Nghỉ Dưỡng Biển', '3.85 Tỷ VNĐ', '48 m²', 'Đường Trường Sa, Ngũ Hành Sơn, Đà Nẵng', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Tuyệt tác condotel và biệt thự nghỉ dưỡng hướng trực diện vịnh biển Non Nước Đà Nẵng.'),
('DỰ ÁN KHU ĐÔ THỊ BARYA CITI VŨNG TÀU', 'du-an-khu-do-thi-barya-citi-ba-ria-vung-tau', 'Nhà Phố Thương Mại', '3.40 Tỷ VNĐ', '90 m²', 'Đường Nguyễn Văn Cừ, TP. Bà Rịa', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Khu đô thị kiểu mẫu đầu tiên tại trung tâm hành chính tỉnh Bà Rịa - Vũng Tàu đã bàn giao sổ hồng.');

-- Bảng lưu thông tin liên hệ / đăng ký nhận báo giá
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100),
  `phone` VARCHAR(50) NOT NULL,
  `project_name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
