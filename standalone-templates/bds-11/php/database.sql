-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE AGENCY MARKETING ONEPAGE (BDS-11)
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_agency_marketing_onepage` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_agency_marketing_onepage`;

-- Bảng thông tin công ty
CREATE TABLE IF NOT EXISTS `company_info` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `slogan` VARCHAR(255),
  `zalo` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
('CÔNG TY BẤT ĐỘNG SẢN LINKHOUSE MIỀN TRUNG', '0919 006 030 - 0981 142 307', 'info@templatebds.com', '320 Đường 2/9, Q. Hải Châu, TP. Đà Nẵng', 'Bất động sản Linkhouse Miền Trung', '0919006030');

-- Bảng dự án
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(50) NOT NULL, 
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` VARCHAR(100),
  `area` VARCHAR(50),
  `image` TEXT,
  `badge` VARCHAR(50),
  `updated_date` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`category`, `title`, `description`, `price`, `area`, `image`, `badge`, `updated_date`) VALUES
-- TIN NỔI BẬT
('tin-noi-bat', 'DỰ ÁN KHU ĐÔ THỊ CẨM LỆ RIVERSIDE ĐÀ NẴNG', 'Đất nền ven sông Cẩm Lệ hạ tầng hoàn thiện 100%, đường nhựa 7.5m, sổ đỏ từng lô công chứng ngay.', '1.85 Tỷ / Lô', '100 m²', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', 'Đất Nền Dự Án', '25/08/2026'),
('tin-noi-bat', 'DỰ ÁN BIỆT THỰ NGHỈ DƯỠNG SƠN TRÀ OCEAN VIEW', 'Biệt thự đồi tựa lưng núi Sơn Trà view trọn vẹn vịnh Đà Nẵng, thiết kế hiện đại có hồ bơi riêng.', '5.40 Tỷ / Căn', '250 m²', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Biệt Thự Biển', '22/08/2026'),
('tin-noi-bat', 'ĐẤT NỀN BIỂN NHƠN HỘI NEW CITY QUY NHƠN', 'Đại đô thị biển liền kề FLC Quy Nhơn và Kỳ Co - Eo Gió. Cơ hội đầu tư sinh lời đón sóng du lịch.', '1.45 Tỷ / Nền', '90 m²', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Đất Nền Biển', '20/08/2026'),
('tin-noi-bat', 'BIỆT THỰ ĐỒI HẢI VÂN PANORAMA VIEW BIỂN', 'Không gian sống nghỉ dưỡng sinh thái biệt lập với khí hậu trong lành quanh năm ngắm vịnh Kim Liên.', '4.20 Tỷ / Căn', '180 m²', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Biệt Thự Đồi', '18/08/2026'),
('tin-noi-bat', 'DỰ ÁN CĂN HỘ CAO CẤP VEN BIỂN MỸ KHÊ ĐÀ NẴNG', 'Căn hộ khách sạn mặt tiền đường biển đẹp nhất hành tinh, cách bãi tắm Mỹ Khê chỉ 2 phút đi bộ.', '2.10 Tỷ / Căn', '65 m²', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'Căn Hộ Biển', '15/08/2026'),
('tin-noi-bat', 'KHU ĐÔ THỊ SINH THÁI HÒA XUÂN NAM ĐÀ NẴNG', 'Khu đô thị sinh thái kiểu mẫu ven sông Đô Tỏa, bao quanh bởi 4 bề sông nước trong lành.', '2.90 Tỷ / Lô', '120 m²', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Đất Nền Sinh Thái', '12/08/2026'),

-- CĂN HỘ CAO CẤP
('can-ho', 'ĐẤT NỀN BIỂN CONDOTEL NHƠN HỘI', 'Condotel biển giá tốt nhất khu vực miền Trung, đón đầu làn sóng hạ tầng du lịch.', '1.35 Tỷ / Căn', '45 m²', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Condotel Nghỉ Dưỡng', NULL),
('can-ho', 'DỰ ÁN CĂN HỘ CONDOTEL HẢI CHÂU PLAZA', 'Tọa lạc bên bờ sông Hàn ngắm cầu Rồng phun lửa, tiện ích TTTM khối đế sầm uất.', '2.45 Tỷ / Căn', '72 m²', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Căn Hộ Trung Tâm', NULL),
('can-ho', 'DỰ ÁN CĂN HỘ THE SANG RESIDENCE ĐÀ NẴNG', 'Dự án căn hộ view biển Mỹ Khê với 100% căn hộ lấy gió và ánh sáng tự nhiên.', '3.60 Tỷ / Căn', '82 m²', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'Căn Hộ Hạng Sang', NULL),

-- ĐẤT NỀN DỰ ÁN
('dat-nen', 'ĐẤT NỀN KHU ĐÔ THỊ FPT CITY ĐÀ NẴNG', 'Đất nền phân khu V1 liền kề Đại học FPT và trường quốc tế Singapore, tiềm năng cho thuê chuyên gia.', '2.65 Tỷ / Lô', '108 m²', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', 'Đất Nền Công Nghệ', NULL),
('dat-nen', 'DỰ ÁN ĐẤT NỀN NAM HÒA XUÂN GIAI ĐOẠN 2', 'Vị trí đắc địa gần cầu Bùi Tá Hán kết nối sang quận Ngũ Hành Sơn và bãi tắm Non Nước.', '3.15 Tỷ / Nền', '110 m²', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Đất Nền Đô Thị', NULL),
('dat-nen', 'ĐẤT NỀN VEN BIỂN QUẢNG NAM - ĐÀ NẴNG', 'Liền kề vệt resort 5 sao đường biển Đà Nẵng - Hội An, kết nối giao thông liên vùng thuận tiện.', '1.75 Tỷ / Lô', '100 m²', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Đất Nền Nghỉ Dưỡng', NULL);

-- Bảng liên hệ
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `product_type` VARCHAR(255),
  `source` VARCHAR(100),
  `message` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
