CREATE DATABASE IF NOT EXISTS bds_19_db;
USE bds_19_db;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    slogan VARCHAR(255),
    zalo VARCHAR(50)
);

INSERT INTO company_info (name, address, phone, email, slogan, zalo) VALUES
('TEMPLATESBDS', 'Phú Thuận, Tân Phú, Quận 7, TP.HCM', '0919 006 030', 'contact@templatesbds.com', 'CĂN HỘ NGHỈ DƯỠNG THÔNG MINH 4.0 — QUẬN 7', '0919006030');

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50),
    title VARCHAR(255),
    slug VARCHAR(255),
    tower VARCHAR(100),
    type VARCHAR(100),
    floor VARCHAR(50),
    price VARCHAR(50),
    area VARCHAR(50),
    beds INT,
    baths INT,
    view VARCHAR(255),
    direction VARCHAR(100),
    image VARCHAR(255),
    hot TINYINT(1) DEFAULT 0,
    description TEXT,
    smartFeatures TEXT
);

INSERT INTO projects (code, title, slug, tower, type, floor, price, area, beds, baths, view, direction, image, hot, description, smartFeatures) VALUES
('S1-0812', 'Căn Hộ Thông Minh 1 Phòng Ngủ Tòa S1 Venus View Sông Cả Cấm', 'can-ho-1-phong-ngu-s1-venus-view-song', 'Tòa S1 - Venus', '1 Phòng Ngủ', 'Tầng 12', '3.45 Tỷ VNĐ', '52 m²', 1, 1, 'Trực diện sông Cả Cấm & Công viên ven sông', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 1, 'Căn hộ ứng dụng công nghệ Smart Home 4.0 toàn diện, thiết bị vệ sinh Kohler dát vàng, kính Low-E tràn viền chống tia cực tím.', '["Khóa cửa nhận diện khuôn mặt FaceID", "Điều khiển SmartHome qua Sunshine App", "Kính Low-E 3 lớp cách nhiệt", "Hệ thống lọc khí tươi chuyên dụng"]'),
('S4-1806', 'Căn Hộ Góc 2 Phòng Ngủ Tòa S4 Mercury View Toàn Cảnh Phú Mỹ Hưng', 'can-ho-goc-2-phong-ngu-s4-mercury-view-pmh', 'Tòa S4 - Mercury', '2 Phòng Ngủ', 'Tầng 18', '4.85 Tỷ VNĐ', '76 m²', 2, 2, 'View Panorama Phú Mỹ Hưng & Crescent Mall', 'Hướng Nam - Đông Nam', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 1, 'Căn góc 2 mặt thoáng ngập tràn ánh sáng tự nhiên, phòng khách ban công kính nối dài tạo cảm giác không gian mở vô tận.', '["Bãi đỗ xe thông minh tự định vị chỗ", "Hệ thống rèm & đèn tự động theo ngữ cảnh", "Nội thất nhập khẩu từ Ý", "Tặng gói Smarthome trị giá 100Tr"]'),
('S7-2802', 'Căn Hộ 3 Phòng Ngủ Hoàng Gia Tòa S7 Jupiter Suite VIP', 'can-ho-3-phong-ngu-s7-jupiter-suite-vip', 'Tòa S7 - Jupiter', '3 Phòng Ngủ', 'Tầng 28', '6.90 Tỷ VNĐ', '105 m²', 3, 2, 'View sông Sài Gòn & Tháp Bitexco Quận 1', 'Hướng Đông Bắc', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 0, 'Không gian sống xứng tầm chủ nhân danh giá, phòng ngủ Master có bồn tắm kính nhìn ra đường chân trời thành phố lung linh về đêm.', '["Thang máy nhận diện thẻ VIP & FaceID", "Bình nước nóng trung tâm thái dương năng", "Chuông hình kỹ thuật số liên lạc sảnh", "Bảo hiểm căn hộ 5 năm"]'),
('S9-PH01', 'Penthouse Duplex Dát Vàng Đỉnh Tháp S9 King View Triệu Đô', 'penthouse-duplex-dat-vang-dinh-thap-s9-king', 'Tòa S9 - King', 'Penthouse Dát Vàng', 'Tầng 36 - 37', '18.5 Tỷ VNĐ', '235 m²', 4, 4, 'View 360 độ sông Sài Gòn & Trung tâm tài chính Q1', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 1, 'Tuyệt phẩm độc bản trên đỉnh mây trời với sân vườn Sky Garden riêng biệt, bể bơi vô cực và nội thất dát vàng thủ công.', '["Hồ bơi Sky Pool riêng biệt", "Sảnh thang máy riêng cho gia chủ", "Hệ thống an ninh 4 lớp tích hợp AI", "Dịch vụ quản gia cao cấp"]'),
('S2-1405', 'Căn Hộ 2 Phòng Ngủ Tiêu Chuẩn Quốc Tế Tòa S2 Mars', 'can-ho-2-phong-ngu-s2-mars', 'Tòa S2 - Mars', '2 Phòng Ngủ', 'Tầng 14', '4.35 Tỷ VNĐ', '69 m²', 2, 2, 'Nội khu thác nước tràn nghệ thuật & Hồ bơi bốn mùa', 'Hướng Tây Nam', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 0, 'Thiết kế vuông vắn tối đa diện tích sử dụng, tầm nhìn xanh mát hướng hồ cảnh quan và vườn thiền thư giãn.', '["Công nghệ Smart Lock 5 trong 1", "Điều hòa âm trần Daikin Inverter", "Chiết khấu thanh toán sớm 10%", "Hỗ trợ lãi suất 0% trong 24 tháng"]'),
('S1-SV02', 'Sky Villa Thông Tầng View Sông Sài Gòn Đẳng Cấp Thượng Lưu', 'sky-villa-thong-tang-view-song-sai-gon', 'Tòa S1 - Venus', 'Sky Villa', 'Tầng 32 - 33', '26.0 Tỷ VNĐ', '310 m²', 5, 5, 'Trọn vẹn 3 mặt sông Sài Gòn & Cầu Phú Mỹ', 'Hướng Đông Nam', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 1, 'Biệt thự trên không với trần cao 7m, phòng chiếu phim gia đình, hầm rượu cá nhân và sân tắm nắng phong cách resort.', '["Bãi đỗ trực thăng trên nóc tòa nhà", "Nội thất may đo thủ công Versace Home", "Hệ thống lọc nước uống tại vòi chuẩn Mỹ", "Đặc quyền câu lạc bộ du thuyền VIP"]');

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    product_type VARCHAR(255),
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    slug VARCHAR(255),
    date VARCHAR(50),
    author VARCHAR(100),
    category VARCHAR(100),
    image VARCHAR(255),
    excerpt TEXT,
    content TEXT,
    views INT DEFAULT 0
);

INSERT INTO news (title, slug, date, author, category, image, excerpt, content, views) VALUES
('Sunshine Group Được Vinh Danh Là Nhà Phát Triển Bất Động Sản Công Nghệ Tốt Nhất 2026', 'sunshine-group-nha-phat-trien-bds-cong-nghe-tot-nhat', '28/08/2026', 'Vietnam Property Awards', 'Giải Thưởng', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Hệ sinh thái Smart Living 4.0 và giải pháp thanh toán số Sunshine Pay tạo bước đột phá trong quản lý vận hành đô thị thông minh.', '["Sunshine City Saigon là dự án tiên phong áp dụng công nghệ vạn vật kết nối IoT và nhận diện khuôn mặt FaceID tại TP.HCM.","Dự án nhận được sự đánh giá cao từ hội đồng giám khảo quốc tế về giải pháp kiến trúc kính Low-E mạ vàng phủ kín toàn bộ mặt ngoài."]', 6120),
('Chính Thức Bàn Giao Tháp S1 Venus & Cất Nóc Tháp S4 Mercury Vượt Tiến Độ', 'ban-giao-thap-s1-venus-cat-noc-thap-s4-mercury', '26/08/2026', 'Ban Quản Lý Dự Án', 'Tiến Độ', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Hơn 400 cư dân đầu tiên chính thức nhận chìa khóa tổ ấm và tận hưởng chuỗi tiện ích nội khu đã hoàn thiện 100%.', '["Tại sự kiện bàn giao, cư dân bày tỏ sự hài lòng tuyệt đối với chất lượng thi công và vật liệu bàn giao vượt cam kết ban đầu."]', 4250),
('Trải Nghiệm Hệ Sinh Thái Sunshine 4.0 Thông Qua Sunshine App', 'trai-nghiem-he-sinh-thai-sunshine-4-0', '24/08/2026', 'Công Nghệ Sunshine Tech', 'Công Nghệ 4.0', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Chỉ với một chiếc smartphone, cư dân có thể điều khiển toàn bộ thiết bị trong nhà, gọi thang máy, đặt chỗ tiện ích và thanh toán hóa đơn.', '["Ứng dụng Sunshine App kết nối toàn diện hơn 50 tiện ích và dịch vụ ẩm thực, giáo dục Sunshine School, chăm sóc y tế tại gia."]', 5310);
