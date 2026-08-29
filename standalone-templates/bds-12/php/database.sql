-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE BDS-12 (SONASEA VÂN ĐỒN HARBOR CITY - CEO GROUP)
-- Tạo database: bds_12_sonasea_vandon
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_12_sonasea_vandon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_12_sonasea_vandon`;

-- Bảng lưu danh sách Bất Động Sản / Shophouse / Biệt Thự
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `type` VARCHAR(100) DEFAULT 'Shophouse Biển',
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm dữ liệu mẫu các dòng sản phẩm Sonasea Vân Đồn
INSERT INTO `properties` (`title`, `slug`, `type`, `price`, `area`, `location`, `image`, `description`) VALUES
('Singapore Shophouse Mặt Tiền Đại Lộ 30m', 'singapore-shophouse-mat-tien-dai-lo-30m', 'Shophouse 480m²', '7.85 Tỷ VNĐ', '120 m² (XD: 480m²)', 'Đại Lộ Ánh Sáng, Sonasea Vân Đồn', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80', 'Dòng sản phẩm Shophouse phong cách Singapore tối ưu hóa công năng vừa ở vừa kinh doanh sinh lời vượt trội.'),
('Căn Hộ Khách Sạn Wyndham Garden Sonasea', 'can-ho-khach-san-wyndham-garden-sonasea', 'Condotel 5 Sao', '2.15 Tỷ VNĐ', '45.5 m²', 'Vịnh Bái Tử Long, Sonasea Vân Đồn', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80', 'Tổ hợp condotel mặt biển đầu tiên tại Vân Đồn được quản lý bởi thương hiệu Wyndham Hotel Group.'),
('Nhà Phố Thương Mại Silk Path Vân Đồn', 'nha-pho-thuong-mai-silk-path-van-don', 'Phố Đi Bộ', '6.20 Tỷ VNĐ', '100 m² (XD: 360m²)', 'Phân khu Silk Path, Sonasea Vân Đồn', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80', 'Nơi quy tụ hàng trăm thương hiệu ẩm thực, thời trang và giải trí hàng đầu.'),
('Biệt Thự Đơn Lập Sonasea Ocean Villa', 'biet-thu-don-lap-sonasea-ocean-villa', 'Biệt Thự Đảo Cọ', '16.50 Tỷ VNĐ', '350 m²', 'Bờ biển riêng 2.2km, Sonasea Vân Đồn', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80', 'Dinh thự nghỉ dưỡng biệt lập trên đảo cọ kỳ vĩ dành riêng cho các chủ nhân danh giá.');

-- Bảng lưu thông tin khách hàng nhận bảng giá
CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `unit_name` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
