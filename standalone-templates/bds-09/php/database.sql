-- Tạo database
CREATE DATABASE IF NOT EXISTS `bds_09` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds_09`;

-- Bảng thông tin công ty
CREATE TABLE IF NOT EXISTS `company_info` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `address` VARCHAR(255),
  `slogan` VARCHAR(255),
  `zalo` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
('AN VIÊN GROUP', '0919 006 030', 'contact@anvien-residence.vn', 'Bán Đảo An Viên, TP. Nha Trang', 'Biểu Tượng Nha Trang Hiện Đại', 'https://zalo.me/0919006030');

-- Bảng projects (tương đương units trong HTML)
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `project_id` VARCHAR(50),
  `type` VARCHAR(100),
  `category` VARCHAR(50),
  `name` VARCHAR(100),
  `area` VARCHAR(50),
  `price` VARCHAR(50),
  `view` VARCHAR(200),
  `handover` VARCHAR(200),
  `image` TEXT,
  `specs` TEXT,
  `description` TEXT,
  `highlights` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`project_id`, `type`, `category`, `name`, `area`, `price`, `view`, `handover`, `image`, `specs`, `description`, `highlights`) VALUES
('studio-ocean', 'Studio Nghỉ Dưỡng Hướng Biển', 'studio', 'Studio Suite Panorama #ST-1808', '45.5 m²', '2.35 Tỷ VNĐ', 'Trực diện Vịnh Nha Trang & Đảo Hòn Tre', 'Full nội thất tiêu chuẩn khách sạn 5 sao', 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=80', '["Ban công kính Low-E tràn viền", "Bồn tắm nằm hướng biển", "Hệ thống Smart Home điều khiển giọng nói"]', 'Căn hộ Studio thiết kế mở tối ưu ánh sáng tự nhiên và gió biển, thích hợp cho khách du lịch lưu trú cao cấp hoặc đầu tư khai thác dòng tiền Airbnb/Booking.', '["Lợi nhuận cho thuê ước tính: 15-22 Triệu/tháng", "Cam kết lợi nhuận tối thiểu 10%/năm trong 3 năm đầu"]'),
('1pn-deluxe', 'Căn Hộ 1 Phòng Ngủ Deluxe', '1pn', 'Executive 1BR Oceanview #EX-2205', '58.2 m²', '3.10 Tỷ VNĐ', 'Vịnh Biển & Bến Du Thuyền Quốc Tế Marina', 'Full nội thất nhập khẩu Châu Âu', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1000&q=80', '["Phòng khách và phòng ngủ riêng biệt", "Bếp âm đảo hiện đại", "Cửa khóa từ 4 chức năng cao cấp"]', 'Không gian sống lý tưởng dành cho các cặp đôi hoặc chuyên gia nước ngoài làm việc tại Nha Trang.', '["Thanh toán đợt 1 chỉ 10% (310 Triệu)", "Ngân hàng BIDV hỗ trợ vay 70%"]'),
('2pn-signature', 'Căn Hộ 2 Phòng Ngủ Signature', '2pn', 'Signature 2BR Grand Corner #SG-2802', '78.6 m²', '4.45 Tỷ VNĐ', 'Căn góc 2 mặt tiền biển & Cáp treo Vinpearl', 'Full nội thất cao cấp dát vàng tinh tế', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80', '["2 Phòng ngủ Master view biển", "Phòng khách thông tầng rộng 32m²", "Logia giặt phơi riêng biệt"]', 'Dòng sản phẩm căn góc Signature sở hữu tầm nhìn panorama 270 độ bao trọn vịnh Nha Trang.', '["Tặng thẻ VIP du thuyền nghỉ dưỡng", "Chiết khấu ngay 9.5%"]'),
('3pn-royal', 'Căn Hộ 3 Phòng Ngủ Royal Suite', '3pn', 'Royal Ocean Suite #RY-3501', '115.8 m²', '6.85 Tỷ VNĐ', 'Trực diện Vịnh Nha Trang & Đồi Cảnh Quan', 'Full nội thất siêu sang tiêu chuẩn Tổng thống', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80', '["3 Phòng ngủ khép kín", "Phòng ăn 8 người phong cách quý tộc", "Hệ thống máy lạnh âm trần"]', 'Tuyệt tác không gian sống dành cho đại gia đình thượng lưu.', '["Đặc quyền quản gia riêng 24/7", "Miễn phí phí quản lý dịch vụ 5 sao trong 5 năm"]'),
('skyvilla-penthouse', 'Sky Villa Penthouse Hoàng Gia', 'skyvilla', 'Imperial Penthouse #PH-3901', '268.0 m²', '18.50 Tỷ VNĐ', 'Toàn cảnh 360 độ Vịnh Biển & Thành Phố', 'Bàn giao thô hoặc thiết kế đo ni đóng giày', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80', '["Hồ bơi sục Jacuzzi vô cực trên không", "Sân vườn riêng biệt rộng 60m²", "Thang máy riêng"]', 'Dinh thự trên không độc bản duy nhất tại đỉnh tháp An Viên.', '["Tặng chỗ neo đậu du thuyền riêng trọn đời", "Hưởng đặc quyền du lịch trực thăng"]'),
('dualkey-invest', 'Căn Hộ Kép Dual Key Đa Năng', 'dualkey', 'Dual Key Harmony #DK-1604', '92.5 m²', '5.20 Tỷ VNĐ', 'Biển Nha Trang & Hồ Bơi Vô Cực Khối Đế', 'Full nội thất hoàn thiện 2 chìa khóa độc lập', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80', '["1 Căn hộ 1PN + 1 Studio khép kín có lối đi riêng", "2 Không gian bếp và WC tách biệt hoàn toàn"]', 'Giải pháp hoàn hảo "Vừa ở vừa cho thuê".', '["Tối ưu hóa công suất khai thác lưu trú 200%", "Lợi nhuận kép vừa tăng giá trị tài sản"]');


-- Bảng liên hệ
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100),
  `unit_type` VARCHAR(100),
  `product_type` VARCHAR(100),
  `source` VARCHAR(100),
  `message` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
