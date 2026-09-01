-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: LP-02 - Bất Động Sản Kim Tinh
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `slogan` varchar(255) DEFAULT NULL,
  `zalo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`name`, `phone`, `email`, `address`, `slogan`, `zalo`) VALUES
('CÁT TƯỜNG LAND GROUP', '0919 006 030', 'admin@templatesbds.com', 'Tòa nhà Cát Tường Building, 259 Trần Hưng Đạo, Quận 1, TP.HCM & Hà Nội', 'BẤT ĐỘNG SẢN KIM TINH', 'https://zalo.me/0919006030');

INSERT INTO `projects` (`title`, `image`) VALUES 
('Trụ sở văn phòng làm việc hiện đại chuẩn A', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'),
('Khu vực tiếp khách và đàm phán VIP', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80'),
('Lễ vinh danh và trao thưởng Best Seller', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80'),
('Team Building gắn kết đại gia đình chiến binh', 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80');
