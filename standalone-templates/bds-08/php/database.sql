-- Create database and tables for BDS-08
CREATE DATABASE IF NOT EXISTS bds_08_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bds_08_db;

CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slogan` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address_1` varchar(255) NOT NULL,
  `address_2` varchar(255) NOT NULL,
  `zalo` varchar(255) NOT NULL,
  `facebook` varchar(255) NOT NULL,
  `expert_name` varchar(255) NOT NULL,
  `expert_role` varchar(255) NOT NULL,
  `expert_desc` text NOT NULL,
  `expert_image` varchar(255) NOT NULL,
  `footer_title` varchar(255) NOT NULL,
  `footer_subtitle` varchar(255) NOT NULL,
  `footer_desc` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`id`, `name`, `slogan`, `phone`, `email`, `address_1`, `address_2`, `zalo`, `facebook`, `expert_name`, `expert_role`, `expert_desc`, `expert_image`, `footer_title`, `footer_subtitle`, `footer_desc`) VALUES
(1, 'TEMPLATESBDS', 'SÀN PHÂN PHỐI BẤT ĐỘNG SẢN CAO CẤP', '0919 006 030', 'admin@templatesbds.com', '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội', 'Số 72 Nguyễn Thị Thập, Quận 7, TP.HCM', 'https://zalo.me/0919006030', 'https://www.facebook.com/groups/847532091275214', 'Trần Thanh Phương', 'Trưởng phòng kinh doanh', 'Chuyên viên tư vấn của Hưng Lộc Phát Land là những người dày dặn kinh nghiệm, am hiểu sâu sắc trong lĩnh vực bất động sản và luôn tận tâm, nhiệt tình tư vấn giúp mang lại lợi ích và sự thỏa mãn tối đa cho mọi khách hàng.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', 'NovaWorld PHAN THIẾT', 'Hưng Lộc Phát Land Phân Phối F1', 'Trúng Top Phân Phối TOP 10 thương hiệu mạnh uy tín của Việt Nam! Liên hoan các Doanh nghiệp Rồng Vàng & Thương hiệu mạnh Việt Nam 2017-2018 vừa diễn ra tại Hà Nội nhằm tri ân Tập đoàn Hưng Lộc Phát lọt vào Top 10.');

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `is_hot` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `name`, `image`, `location`, `price`, `area`, `status`, `is_hot`) VALUES
(1, 'DỰ ÁN PHỐ MỸ GOLD CITY BÀ RỊA VŨNG TÀU', 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80', 'Bà Rịa - Vũng Tàu', '1.85 Tỷ VNĐ', '105 m²', 'Dự án đang phân phối', 1),
(2, 'DỰ ÁN CĂN HỘ GOLDEN STAR QUẬN 7, TP.HCM', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'TP. Hồ Chí Minh', '3.45 Tỷ VNĐ', '68 m²', 'Dự án đang phân phối', 1),
(3, 'DỰ ÁN CĂN HỘ GREEN STAR TP. QUẬN 7, TP.HCM', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'TP. Hồ Chí Minh', '3.90 Tỷ VNĐ', '75 m²', 'Dự án đang phân phối', 1),
(4, 'DỰ ÁN CĂN HỘ ECO GREEN QUẬN 7, TP.HCM (MỚI NHẤT)', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', 'TP. Hồ Chí Minh', '4.20 Tỷ VNĐ', '80 m²', 'Dự án đang phân phối', 0),
(5, 'DỰ ÁN CĂN HỘ HƯNG PHÁT SILVER STAR NHÀ BÈ', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'TP. Hồ Chí Minh', '2.85 Tỷ VNĐ', '72 m²', 'Dự án đang phân phối', 1),
(6, 'DỰ ÁN DIAMOND ISLAND CONDOTEL HƯNG LỘC PHÁT', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Phan Thiết', '1.65 Tỷ VNĐ', '45 m²', 'Dự án đang phân phối', 0),
(7, 'DỰ ÁN CĂN HỘ BLUE STAR HƯNG LỘC PHÁT', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&q=80', 'TP. Hồ Chí Minh', 'N/A', 'N/A', 'N/A', 1),
(8, 'DỰ ÁN DIAMOND LAND MŨI NÉ PHAN THIẾT', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80', 'Phan Thiết', 'N/A', 'N/A', 'N/A', 1);

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
