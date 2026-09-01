CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `slogan` varchar(255) NOT NULL,
  `zalo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`id`, `name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
(1, 'TEMPLATESBDS', '0919 006 030', 'contact@templatebds.com', '458 Minh Khai, Vĩnh Tuy, Hai Bà Trưng, Hà Nội', 'CỔNG THÔNG TIN CHUNG CƯ CAO CẤP VÀNH ĐAI 2', '0919006030');

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `priceRange` varchar(100) NOT NULL,
  `areaRange` varchar(100) NOT NULL,
  `developer` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `title`, `address`, `priceRange`, `areaRange`, `developer`, `image`) VALUES
(1, 'Vinhomes Times City & Park Hill', '458 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '3.8 - 14.5 Tỷ VNĐ', '53 - 178 m²', 'Vingroup', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'),
(2, 'Green Pearl City Minh Khai', '378 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '4.2 - 9.8 Tỷ VNĐ', '71 - 139 m²', 'Phong Phú Corp', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'),
(3, 'Imperia Sky Garden 423 Minh Khai', '423 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '4.5 - 11.2 Tỷ VNĐ', '58 - 106 m²', 'MIK Group', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'),
(4, 'Hòa Bình Green City 505 Minh Khai', '505 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '3.6 - 8.5 Tỷ VNĐ', '63 - 127 m²', 'Hòa Bình Group', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'),
(5, 'Sunshine Garden Liền Kề Times City', 'Đường Dương Văn Bé, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '3.5 - 9.0 Tỷ VNĐ', '47 - 115 m²', 'Sunshine Group', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'),
(6, 'UDIC Riverside 122 Vĩnh Tuy', '122 Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội', '3.2 - 7.5 Tỷ VNĐ', '62 - 134 m²', 'UDIC', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'),
(7, 'Hinode City 201 Minh Khai Phong Cách Nhật', '201 Minh Khai, P. Minh Khai, Q. Hai Bà Trưng, Hà Nội', '5.2 - 16.0 Tỷ VNĐ', '67 - 128 m²', 'Vietracimex', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'),
(8, 'Sunshine Palace Hoàng Mai', 'Ngõ 13 Lĩnh Nam, P. Mai Động, Q. Hoàng Mai, Hà Nội', '3.0 - 6.8 Tỷ VNĐ', '52 - 110 m²', 'Sunshine Group', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80');

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
