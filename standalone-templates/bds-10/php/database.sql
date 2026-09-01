CREATE TABLE IF NOT EXISTS `company_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `short_name` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `phone2` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email2` varchar(255) DEFAULT NULL,
  `zalo` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `tiktok` varchar(255) DEFAULT NULL,
  `working_hours` varchar(100) DEFAULT NULL,
  `slogan` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `company_info` (`id`, `company_name`, `short_name`, `address`, `phone`, `phone2`, `email`, `email2`, `zalo`, `facebook`, `youtube`, `tiktok`, `working_hours`, `slogan`) VALUES
(1, 'Công ty Cổ phần Bất động sản Danh Khôi', 'DKRP', '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội', '0919006030', '0983312219', 'info@templatebds.com', 'admin@templatesbds.com', 'https://zalo.me/0919006030', 'https://www.facebook.com/groups/847532091275214', 'https://www.youtube.com/@tungchuofficial', 'https://www.tiktok.com/@editnhadat', '8:00 - 20:00 (T2 - CN)', 'Danh Khôi (DKRP) đồng hành kiến tạo không gian sống đỉnh cao và thịnh vượng bền vững cho mọi gia đình Việt.');


CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `statusBadge` varchar(100) DEFAULT NULL,
  `price` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `projects` (`id`, `title`, `slug`, `subtitle`, `statusBadge`, `price`, `city`, `image`, `description`, `location`, `details`) VALUES
(1, 'DỰ ÁN PHỨC HỢP CĂN HỘ ASTRAL CITY BÌNH DƯƠNG', 'astral-city', 'BIỂU TƯỢNG ĐÔ THỊ ĐỈNH CAO MẶT TIỀN QUỐC LỘ 13', 'Đang Mở Bán Đợt 1', '2.15 Tỷ VNĐ', 'Bình Dương', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Tổ hợp 8 tòa tháp 40 tầng cao nhất Bình Dương với hơn 4.900 căn hộ cao cấp và 300m mặt tiền đại lộ tài chính sầm uất.', 'Mặt tiền Đại lộ Bình Dương (QL13), TP. Thuận An, Bình Dương', '[\"Quy mô: 3.7 ha với 1.7 ha cảnh quan cây xanh và tiện ích resort.\", \"Tiện ích: 6 hồ bơi chân mây, 2 công viên trung tâm, TTTM 4 tầng.\", \"Chính sách: Hỗ trợ vay ngân hàng VPBank 70% lãi suất 0% đến khi nhận nhà.\"]'),
(2, 'DỰ ÁN ARIA ĐÀ NẴNG HOTEL & RESORT', 'aria-da-nang', 'CHẠM TUYỆT TÁC — NƠI THÀNH CÔNG HỘI TỤ', 'Dự Án Độc Quyền', '3.85 Tỷ VNĐ', 'Đà Nẵng', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Tuyệt tác condotel và biệt thự nghỉ dưỡng hướng trực diện vịnh biển Non Nước Đà Nẵng với phòng thu âm và phim trường nghệ thuật đầu tiên tại Việt Nam.', 'Đường Trường Sa, Phường Hòa Hải, Ngũ Hành Sơn, TP. Đà Nẵng', '[\"Quy mô: 7 ha với 2 tháp căn hộ du lịch và 28 căn biệt thự biển.\", \"Vận hành: Đơn vị quản lý vận hành khách sạn quốc tế 5 sao.\", \"Đặc quyền: Chia sẻ doanh thu cho thuê 85/15 và tặng 15 đêm nghỉ dưỡng/năm.\"]'),
(3, 'DỰ ÁN KHU ĐÔ THỊ BARYA CITI BÀ RỊA VŨNG TÀU', 'barya-citi', 'ĐÔ THỊ PHỒN VINH — SỐNG TRỌN VẸN TỪNG KHOẢNH KHẮC', 'Đã Bàn Giao Sổ Hồng', '3.40 Tỷ VNĐ', 'Bà Rịa - Vũng Tàu', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Khu đô thị kiểu mẫu đầu tiên tại trung tâm hành chính tỉnh Bà Rịa - Vũng Tàu với quy hoạch đồng bộ, công viên nước và trung tâm thương mại nội khu.', 'Đường Nguyễn Văn Cừ, Phường Long Toàn, TP. Bà Rịa, Vũng Tàu', '[\"Quy mô: 8.7 ha gồm 427 căn nhà phố thương mại và biệt thự phố.\", \"Hạ tầng: Đường nhựa nội bộ 13m - 20.5m, điện âm nước máy, vỉa hè lát đá.\", \"Pháp lý: Sổ hồng riêng từng căn, công chứng sang tên ngay trong ngày.\"]');


CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `date` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `news` (`id`, `category`, `title`, `date`, `image`) VALUES
(1, 'Thị Trường BĐS', 'Thị trường bất động sản quý 3/2026 đón sóng hạ tầng bứt phá', '28 Tháng Tám, 2026', 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80'),
(2, 'Sự Kiện DKRP', 'Danh Khôi khai trương nhà mẫu Astral City tại Bình Dương', '22 Tháng Tám, 2026', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'),
(3, 'Tiến Độ Xây Dựng', 'Khởi công tổ hợp nghỉ dưỡng biển Aria Đà Nẵng Hotel & Resort', '15 Tháng Tám, 2026', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80');

CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `source` varchar(100) DEFAULT 'Website',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
