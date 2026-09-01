CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    slogan VARCHAR(255),
    zalo VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    beds INT DEFAULT 0,
    baths INT DEFAULT 0,
    location TEXT NOT NULL,
    image_url VARCHAR(255),
    description TEXT,
    is_featured BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    publish_date VARCHAR(50),
    image_url VARCHAR(255),
    excerpt TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(50),
    title VARCHAR(255),
    price VARCHAR(100),
    area VARCHAR(100),
    email VARCHAR(100),
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO company_info (name, short_name, phone, email, address, slogan, zalo) VALUES
('TEMPLATESBDS', 'WINTLAND', '0919 006 030', 'info@wintland.vn', '320 Đường 2/9, Hải Châu, Đà Nẵng', 'SÀN GIAO DỊCH VÀ PHÂN PHỐI BẤT ĐỘNG SẢN TOÀN QUỐC TEMPLATESBDS', '0919 006 030');

INSERT INTO projects (title, type, price, area, beds, baths, location, image_url, description, is_featured) VALUES
('Bán Nhà Phố Hiện Đại Mặt Tiền Nguyễn Trãi Quận 1', 'Nhà Phố Mặt Tiền', '8.50 Tỷ VNĐ', '95 m²', 4, 4, 'Đường Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Nhà phố 1 trệt 3 lầu phong cách Bắc Âu hiện đại, đường trước nhà 10m, thích hợp vừa ở vừa mở văn phòng công ty.', 1),
('Căn Hộ Nghỉ Dưỡng View Biển Mỹ Khê The Sang Residence', 'Căn Hộ Cao Cấp', '3.45 Tỷ VNĐ', '72 m²', 2, 2, 'Đường Võ Nguyên Giáp, Quận Ngũ Hành Sơn, TP. Đà Nẵng', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'Căn hộ 2 phòng ngủ tầng cao view trực diện bãi biển Mỹ Khê Đà Nẵng, ban công rộng đón gió biển mát lành quanh năm.', 1),
('Biệt Thự Vườn Sinh Thái Ven Sông Hương Cố Đô Huế', 'Biệt Thự Nhà Vườn', '6.20 Tỷ VNĐ', '280 m²', 5, 4, 'Đường Kim Long, Phường Kim Long, TP. Huế', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Biệt thự sân vườn mang đậm nét thanh lịch kiến trúc Cố Đô kết hợp tiện nghi đương đại, khuôn viên trồng nhiều cây ăn trái và hoa quý.', 1),
('Penthouse Duplex Đẳng Cấp Biển Nha Trang Đường Trần Phú', 'Penthouse Duplex', '11.50 Tỷ VNĐ', '185 m²', 3, 3, 'Đại lộ Trần Phú, Phường Lộc Thọ, TP. Nha Trang', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Căn hộ thông tầng cao cấp nhất tòa tháp ngắm trọn vẹn vịnh biển Nha Trang và bến du thuyền quốc tế.', 1),
('Bán Nhà Phố Phân Lô Ô Tô Vào Nhà Ngay Gần Hồ Tây', 'Nhà Phố Liền Kề', '9.80 Tỷ VNĐ', '65 m²', 4, 4, 'Đường Lạc Long Quân, Quận Tây Hồ, TP. Hà Nội', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Nhà xây mới 5 tầng có thang máy kính, ngõ thông ô tô tránh nhau, cách mặt hồ Tây chỉ 200m đi bộ.', 1),
('Cho Thuê Căn Hộ 2PN Landmark 81 Full Nội Thất Sang Trọng', 'Căn Hộ Cho Thuê', '22 Triệu / Tháng', '79 m²', 2, 2, 'Vinhomes Central Park, Nguyễn Hữu Cảnh, Bình Thạnh, TP.HCM', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Căn hộ view trực diện công viên ven sông 14ha và tòa tháp Landmark 81, trang bị đầy đủ tiện nghi chỉ xách vali vào ở.', 1);

INSERT INTO news (title, category, publish_date, image_url, excerpt) VALUES
('Xu Hướng Dòng Tiền Đầu Tư Bất Động Sản Nghỉ Dưỡng Ven Biển Cuối Năm 2026', 'Thị Trường', '28/08/2026', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Phân khúc bất động sản biển sở hữu lâu dài tại Đà Nẵng, Nha Trang và Phú Quốc đang hút mạnh dòng vốn đầu tư an toàn.'),
('Kinh Nghiệm Thẩm Định Pháp Lý Sổ Đỏ Và Quy Hoạch Khi Mua Nhà Đất', 'Pháp Lý', '25/08/2026', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Những bước quan trọng cần kiểm tra trước khi đặt cọc để tránh rủi ro vướng quy hoạch treo hoặc tranh chấp ranh giới.'),
('Bí Quyết Thiết Kế Nội Thất Tối Ưu Diện Tích Cho Căn Hộ Chung Cư Nhỏ', 'Không Gian Sống', '22/08/2026', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'Ứng dụng nội thất thông minh đa năng và tone màu sáng giúp nhân đôi không gian sống cho căn hộ từ 45m2 đến 70m2.');
