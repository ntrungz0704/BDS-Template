-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-13 (ĐẠI PHÁT LAND - BĐS THỦY NGUYÊN HẢI PHÒNG)
-- Tạo database: bds_13_daiphatland_thuynguyen
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_13_daiphatland_thuynguyen` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_13_daiphatland_thuynguyen`;

-- Bảng lưu danh sách Bất Động Sản / Đất nền / Nhà phố
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `type` VARCHAR(100) DEFAULT 'Nhà Phố',
  `category` VARCHAR(50) DEFAULT 'ban',
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu các sản phẩm Đại Phát Land
INSERT INTO `properties` (`title`, `slug`, `type`, `category`, `price`, `area`, `location`, `district`, `image`, `description`) VALUES
('Khu Đô Thị Hoàng Huy New City Bắc Sông Cấm', 'khu-do-thi-hoang-huy-new-city-bac-song-cam', 'Khu Đô Thị Kiểu Mẫu', 'du-an', '3.85 Tỷ / Lô', '90 m²', 'Xã Tân Dương, Thủy Nguyên, Hải Phòng', 'Tân Dương', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Đại dự án đô thị thông minh bậc nhất Thủy Nguyên ngay cạnh Trung tâm hành chính mới Bắc Sông Cấm.'),
('Khu Đô Thị Belhomes Vsip Thủy Nguyên Hải Phòng', 'khu-do-thi-belhomes-vsip-thuy-nguyen-hai-phong', 'Nhà Phố Xanh Singapore', 'du-an', '3.20 Tỷ / Căn', '75 m²', 'Đô thị Vsip Hải Phòng, Xã An Lư, Thủy Nguyên', 'An Lư', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Khu đô thị sinh thái xanh chuẩn Singapore ngay trong lòng đại đô thị VSIP Hải Phòng.'),
('Shophouse Hoàng Huy Grand Tower Hải Phòng', 'shophouse-hoang-huy-grand-tower-hai-phong', 'Shophouse Khối Đế', 'ban', '4.80 Tỷ / Căn', '100 m²', 'Đại lộ Hùng Vương, Sở Dầu, Hồng Bàng', 'Sở Dầu', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Dãy shophouse thương mại sầm uất kinh doanh mọi ngành nghề ngay cửa ngõ kết nối.'),
('Đất Tái Định Cư Bắc Sông Cấm Phân Lô Sổ Đỏ', 'dat-tai-dinh-cu-bac-song-cam-phan-lo-so-do', 'Đất Nền Tái Định Cư', 'ban', '2.85 Tỷ / Lô', '60 m²', 'Khu TĐC Bắc Sông Cấm, Xã Dương Quan, Thủy Nguyên', 'Dương Quan', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', 'Lô đất vuông vắn tại khu tái định cư đắc địa nhất Thủy Nguyên.');

-- Bảng lưu thông tin ký gửi nhà đất
CREATE TABLE IF NOT EXISTS `consignments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `address` VARCHAR(255),
  `type` VARCHAR(100),
  `price` VARCHAR(100),
  `note` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
