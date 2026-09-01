CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  `zalo_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`, `zalo_link`) VALUES
(1, 'THE MATRIX ONE LUXURY', '0919 006 030', 'admin@templatesbds.com', 'Ngã tư Lê Quang Đạo - Mễ Trì, Quận Nam Từ Liêm, Hà Nội', 'SỐNG ĐỈNH PHỒN HOA NGAY TRÁI TIM VIỆT NAM', '0919006030', 'https://zalo.me/0919006030')
ON DUPLICATE KEY UPDATE 
  `name` = VALUES(`name`), `phone` = VALUES(`phone`), `email` = VALUES(`email`), 
  `address` = VALUES(`address`), `slogan` = VALUES(`slogan`), `zalo` = VALUES(`zalo`), `zalo_link` = VALUES(`zalo_link`);

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tab_id` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `rooms` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE `projects`;
INSERT INTO `projects` (`id`, `tab_id`, `title`, `description`, `rooms`, `image`, `is_active`) VALUES
(1, '1pn', 'Căn Hộ 1 Phòng Ngủ (52.8 m²)', 'Thiết kế tối ưu cho chuyên gia độc thân hoặc gia đình trẻ, đón trọn ánh sáng tự nhiên.', '1 Phòng Ngủ · 1 WC · 1 Ban Công Panorama · 1 Bếp Mở', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', 1),
(2, '2pn', 'Căn Hộ 2 Phòng Ngủ (74.2 m² - 86.5 m²)', 'Không gian sống lý tưởng với 2 phòng ngủ master rộng rãi, phòng khách nối liền ban công đón gió mát.', '2 Phòng Ngủ · 2 WC · 2 Ban Công & Logia · 1 Phòng Khách Lớn', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80', 1),
(3, '3pn', 'Căn Hộ 3 Phòng Ngủ Master (112.4 m²)', 'Dành riêng cho gia đình đa thế hệ, tầm nhìn trực diện hồ điều hòa và công viên trung tâm.', '3 Phòng Ngủ · 2 WC · 1 Phòng Đa Năng · Phòng Bếp Riêng Biệt', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 1),
(4, 'dualkey', 'Căn Hộ Dual Key & Sky Villa (149.0 m²)', 'Giải pháp 2 trong 1: Vừa ở vừa cho thuê sinh lời dòng tiền đều đặn mỗi tháng.', '2 Lối Đi Riêng · 3 Phòng Ngủ · 3 WC · Sân Vườn Chân Mây', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', 1);

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
