-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-11 (NHÀ ĐẤT MIỀN TRUNG - LINKHOUSE MIỀN TRUNG)
-- Tạo database: bds_11_nhadatmientrung_linkhouse
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_11_nhadatmientrung_linkhouse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_11_nhadatmientrung_linkhouse`;

-- Bảng lưu danh sách Bất Động Sản / Đất nền / Căn hộ
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `type` VARCHAR(100) DEFAULT 'Đất Nền Dự Án',
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu các dự án Linkhouse Miền Trung
INSERT INTO `properties` (`title`, `slug`, `type`, `price`, `area`, `location`, `image`, `description`) VALUES
('DỰ ÁN KHU ĐÔ THỊ CẨM LỆ RIVERSIDE ĐÀ NẴNG', 'du-an-khu-do-thi-cam-le-riverside-da-nang', 'Đất Nền Dự Án', '1.85 Tỷ / Lô', '100 m²', 'Đường Nguyễn Tri Phương, Q. Cẩm Lệ, Đà Nẵng', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', 'Đất nền ven sông Cẩm Lệ hạ tầng hoàn thiện 100%, đường nhựa 7.5m, sổ đỏ từng lô.'),
('DỰ ÁN BIỆT THỰ NGHỈ DƯỠNG SƠN TRÀ OCEAN VIEW', 'du-an-biet-thu-nghi-duong-son-tra-ocean-view', 'Biệt Thự Biển', '5.40 Tỷ / Căn', '250 m²', 'Bán đảo Sơn Trà, TP. Đà Nẵng', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Biệt thự đồi tựa lưng núi Sơn Trà view trọn vẹn vịnh Đà Nẵng có hồ bơi riêng.'),
('ĐẤT NỀN BIỂN NHƠN HỘI NEW CITY QUY NHƠN', 'dat-nen-bien-nhon-hoi-new-city-quy-nhon', 'Đất Nền Biển', '1.45 Tỷ / Nền', '90 m²', 'Khu kinh tế Nhơn Hội, TP. Quy Nhơn', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Đại đô thị biển liền kề FLC Quy Nhơn và Kỳ Co - Eo Gió.'),
('ĐẤT NỀN KHU ĐÔ THỊ FPT CITY ĐÀ NẴNG', 'dat-nen-khu-do-thi-fpt-city-da-nang', 'Đất Nền Công Nghệ', '2.65 Tỷ / Lô', '108 m²', 'Đô thị FPT City, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', 'Đất nền phân khu V1 liền kề Đại học FPT và trường quốc tế Singapore.');

-- Bảng lưu thông tin liên hệ / yêu cầu gửi về từ Form
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `project_name` VARCHAR(255),
  `note` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
