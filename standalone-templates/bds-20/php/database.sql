-- Cơ sở dữ liệu cho Mẫu Template BDS-20 (Mona Park View)
CREATE DATABASE IF NOT EXISTS `bds20_monapark` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `bds20_monapark`;

-- Bảng units: Căn hộ sinh thái
CREATE TABLE IF NOT EXISTS `units` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `block` VARCHAR(100) NOT NULL,
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
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bảng news: Tin tức dự án
CREATE TABLE IF NOT EXISTS `news` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `date` VARCHAR(50) NOT NULL,
  `author` VARCHAR(100) DEFAULT 'Ban Quản Lý',
  `category` VARCHAR(100) DEFAULT 'Sự Kiện',
  `image` VARCHAR(500) NOT NULL,
  `excerpt` TEXT,
  `views` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dữ liệu mẫu BDS-20
INSERT INTO `units` (`title`, `code`, `slug`, `block`, `type`, `floor`, `price`, `price_num`, `area`, `area_num`, `beds`, `baths`, `view`, `direction`, `image`, `hot`, `featured`, `description`) VALUES
('Căn Hộ 1 Phòng Ngủ Eco Suite Block A View Công Viên Trung Tâm', 'MPV-A0805', 'can-ho-1-phong-ngu-block-a-view-cong-vien', 'Block A - Park View', '1 Phòng Ngủ', 'Tầng 08', '2.45 Tỷ VNĐ', 2.45, '48 m²', 48, 1, 1, 'Trực diện công viên 100ha', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 1, 'Thiết kế thông minh đón gió tự nhiên 100%, ban công kính rộng ngắm trọn vẹn cảnh quan xanh.'),
('Căn Hộ Góc 2 Phòng Ngủ Block B View Trực Diện Hồ Điều Hòa Sinh Thái', 'MPV-B1502', 'can-ho-goc-2-phong-ngu-block-b-view-ho', 'Block B - Lake View', '2 Phòng Ngủ', 'Tầng 15', '3.85 Tỷ VNĐ', 3.85, '72 m²', 72, 2, 2, 'View mặt nước hồ điều hòa', 'Hướng Nam', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 1, 'Căn góc 2 mặt thoáng view trọn vẹn mặt hồ gợn sóng trong lành.'),
('Căn Hộ 3 Phòng Ngủ Gia Đình Block C View Vườn Thiền Nhật Bản', 'MPV-C2008', 'can-ho-3-phong-ngu-block-c-view-vuon-thien', 'Block C - Garden View', '3 Phòng Ngủ', 'Tầng 20', '5.20 Tỷ VNĐ', 5.20, '98 m²', 98, 3, 2, 'View vườn thiền Zen Garden', 'Hướng Đông Bắc', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 0, 1, 'Không gian sống lý tưởng cho gia đình 3 thế hệ, phòng khách rộng hơn 40m².');

INSERT INTO `news` (`title`, `slug`, `date`, `author`, `category`, `image`, `excerpt`, `views`) VALUES
('Khánh Thành Công Viên Sinh Thái Trung Tâm 100ha & Hồ Điều Hòa Mona Park', 'khanh-thanh-cong-vien-sinh-thai-100ha', '28/08/2026', 'Ban Quản Lý Mona Park View', 'Sự Kiện', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Lá phổi xanh khổng lồ chính thức đi vào hoạt động, mang lại không gian vui chơi tái tạo năng lượng.', 4890);
