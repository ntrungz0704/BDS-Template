-- ========================================================
-- DATABASE SCHEMA CHO TEMPLATE PANNAMERA BẢO LỘC (BDS-07)
-- Tạo database: bds_pannamera_07
-- ========================================================

CREATE DATABASE IF NOT EXISTS `bds_pannamera_07` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_pannamera_07`;

-- Bảng lưu danh sách Bất Động Sản
CREATE TABLE IF NOT EXISTS `properties` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(50) NOT NULL,
  `price` VARCHAR(100) NOT NULL,
  `area` VARCHAR(50) NOT NULL,
  `direction` VARCHAR(100),
  `location` VARCHAR(255) NOT NULL,
  `badge` VARCHAR(50),
  `image` TEXT NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Thêm 8 sản phẩm mẫu Pannamera Bảo Lộc
INSERT INTO `properties` (`title`, `slug`, `category`, `price`, `area`, `direction`, `location`, `badge`, `image`, `description`) VALUES
('Lô Đất Vườn Nghỉ Dưỡng Săn Mây View Đồi Thông', 'dat-vuon-san-may-view-doi-thong', 'dat-vuon', '890 Triệu VNĐ', '250 m²', 'Đông Nam', 'Phân Khu Săn Mây A1, Pannamera', 'SUẤT NGOẠI GIAO', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', 'Đã có sẵn thổ cư ODT, view trọn thung lũng đồi chè và rừng thông.'),
('Lô Góc 2 Mặt Tiền Suối Tự Nhiên & Đồi Chè Xanh', 'lo-goc-2-mat-tien-suoi-tu-nhien', 'dat-vuon', '1.25 Tỷ VNĐ', '350 m²', 'Nam - Đông Nam', 'Phân khu Ven Suối B2, Pannamera', 'VIEW SUỐI HIẾM', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', 'Lô góc 2 mặt tiền ôm trọn dòng suối tự nhiên trong vắt quanh năm.'),
('Nhà Vườn Bungalow Gỗ Mẫu Hoàn Thiện Full Sân Vườn', 'bungalow-go-hoan-thien-full-san-vuon', 'bungalow', '1.45 Tỷ VNĐ', '300 m²', 'Đông', 'Trục đường Cối Xay Gió, Pannamera', 'XÂY SẴN CHÌA KHÓA', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', 'Nhà gỗ 2 tầng phong cách Nordic, 2PN, ban công Panorama 25m².'),
('Biệt Thự Vườn Sinh Thái Panorama View 360 Độ', 'biet-thu-vuon-sinh-thai-panorama', 'biet-thu', '1.85 Tỷ VNĐ', '500 m²', 'Đông Bắc', 'Đỉnh Đồi Sunset Point, Pannamera', 'VIEW PANORAMA 360', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Khuôn viên 500m² vuông vức, view trực diện biểu tượng Cối Xay Gió.'),
('Khu Đất Farmstay Trồng Cây Ăn Trái & Vườn Hoa 1000m²', 'dat-farmstay-trong-cay-an-trai', 'farmstay', '2.60 Tỷ VNĐ', '1000 m²', 'Đông Nam', 'Thung Lũng Xanh Green Valley', 'DIỆN TÍCH LỚN', 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80', 'Quy mô 1000m² đất vườn màu mỡ phù hợp trồng bơ 034, sầu riêng, chè Oolong.'),
('Biệt Thự Đơn Lập View Hồ Cá Koi & Rừng Thông', 'biet-thu-don-lap-view-ho-ca-koi', 'biet-thu', '2.10 Tỷ VNĐ', '420 m²', 'Nam', 'Đồi Thông Reo Pine Hill', 'KHÔNG GIAN XANH', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Mặt tiền 14m hướng về rừng thông cổ thụ, có hồ cá Koi phong thủy.'),
('Lô Đất VIP Cối Xay Gió Trung Tâm Làng Sinh Thái', 'lo-dat-vip-coi-xay-gio-trung-tam', 'dat-vuon', '2.90 Tỷ VNĐ', '600 m²', 'Đông Nam', 'Quảng trường Cối Xay Gió', 'VỊ TRÍ ĐẮC ĐỊA', 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80', 'Vị trí đắc địa cạnh Cối Xay Gió, thuận tiện kinh doanh cafe check-in.'),
('Dinh Thự Nghỉ Dưỡng Hoàng Gia Hillside Villa', 'dinh-thu-nghi-duong-hoang-gia', 'biet-thu', '3.20 Tỷ VNĐ', '800 m²', 'Đông', 'Bán Đảo Thượng Lưu Royal Hill', 'ĐỘC BẢN TINH HOA', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Khuôn viên 800m² biệt lập 4 mặt thoáng ngắm toàn cảnh thung lũng sương mù.');

-- Bảng lưu thông tin khách hàng đăng ký nhận bảng giá F1
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `product_type` VARCHAR(100),
  `email` VARCHAR(100),
  `message` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
