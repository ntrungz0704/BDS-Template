CREATE DATABASE IF NOT EXISTS lp07_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lp07_db;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(100),
    address VARCHAR(255),
    slogan VARCHAR(255),
    zalo VARCHAR(255)
);

INSERT INTO company_info (name, phone, email, address, slogan, zalo) VALUES
('NOVAWORLD PHAN THIẾT', '0919 006 030', 'admin@templatesbds.com', 'Tiến Thành, TP. Phan Thiết, Tỉnh Bình Thuận', 'SIÊU THÀNH PHỐ BIỂN - DU LỊCH - SỨC KHỎE', 'https://zalo.me/0919006030');

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    size VARCHAR(100),
    floors VARCHAR(100),
    handover VARCHAR(255),
    status VARCHAR(50),
    price VARCHAR(100),
    image VARCHAR(255),
    full_name VARCHAR(255),
    description TEXT
);

INSERT INTO projects (title, type, size, floors, handover, status, price, image, full_name, description) VALUES
('BIỆT THỰ BIỂN', 'Kiến trúc Địa Trung Hải', '300m² - 500m²', '3 - 5 tầng', 'T1/2023', 'Liên hệ', 'Từ 15 - 28 Tỷ', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Biệt Thự Biển Đơn Lập (300m² - 500m²)', ''),
('WAIKIKI', 'Kiến trúc Italia', '200m² - 275m²', '2 tầng 1 sân thượng', 'Cam kết thuê lại 5% lên đến 1 tỷ đồng', 'Còn hàng', 'Từ 18 - 25 Tỷ', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'Waikiki View Biển (200m² - 275m²)', ''),
('SANTA MONICA', 'Kiến trúc Địa Trung Hải', '120m²', '2 tầng 1 tum', 'T9/2023', 'Còn hàng', 'Từ 16 - 22 Tỷ', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Santa Monica Shophouse (120m²)', ''),
('GOLF VILLAS', 'Kiến trúc Hiện đại', '175m² - 360m²', '2 tầng + 1 sân thượng', 'View trọn sân Golf PGA 36 Hố', 'Booking', '13 Tỷ - 23 Tỷ', 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80', 'Golf Villas (175m² - 360m²)', 'Biệt thự Golf Villas phong cách hiện đại, cảnh quan xanh, dịch vụ cao cấp mang lại sự đẳng cấp vượt trội cho giới thượng lưu và Golfer chuyên nghiệp.'),
('BIỆT THỰ OCEAN RESIDENCE (HOT)', 'Kiến trúc San Diego Mission', '100m² - 120m²', '2 tầng', 'Bàn giao hoàn thiện T5/2024', 'Đang mở bán', 'Chỉ từ 6 Tỷ', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', 'Ocean Residence (100m² - 120m²)', 'Ocean Residence sở hữu tiện ích nội khu tiện nghi, hài hoà cùng thiên nhiên như công viên trung tâm vành đai xanh, clubhouse, quảng trường văn hoá, trường học.'),
('BOUTIQUE HOTEL', 'Kiến trúc Địa Trung Hải view biển', '161m² - 207m²', 'Mặt tiền KHỦNG lên tới 7 - 9m', 'Mini Hotel từ 10 - 100 phòng', 'Giới hạn', '17 Tỷ - 30 Tỷ', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'Boutique Hotel (161m² - 207m²)', 'Boutique Hotel là loại hình khách sạn quy mô nhỏ đang thu hút đông đảo nhà đầu tư nhờ lợi nhuận khủng hàng năm.');
