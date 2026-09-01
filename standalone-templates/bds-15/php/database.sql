CREATE DATABASE IF NOT EXISTS bds_15;
USE bds_15;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    slogan TEXT,
    zalo VARCHAR(50)
);

INSERT INTO company_info (name, phone, email, address, slogan, zalo) VALUES 
('LUPUL GROUP', '0919 006 030', 'contact@lupulgroup.vn', 'TP.HCM, Vietnam', 'REAL ESTATE INVESTMENT', '0982078203');

CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255),
    slug VARCHAR(255),
    type VARCHAR(100),
    category VARCHAR(50),
    price VARCHAR(100),
    priceNum DECIMAL(10,2),
    area VARCHAR(50),
    beds INT,
    baths INT,
    location TEXT,
    district VARCHAR(100),
    image VARCHAR(255),
    hot TINYINT(1),
    featured TINYINT(1),
    description TEXT
);

INSERT INTO projects (id, title, slug, type, category, price, priceNum, area, beds, baths, location, district, image, hot, featured, description) VALUES
('flora-avenue-phu-my-hung', 'The Flora Avenue Sky Living Phú Mỹ Hưng', 'the-flora-avenue-sky-living-phu-my-hung', 'Căn Hộ Cao Cấp', 'du-an', '3.85 Tỷ VNĐ', 3.85, '85 m²', 2, 2, 'Đại lộ Nguyễn Văn Linh, Tân Phú, Quận 7, TP.HCM', 'Quận 7', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 0, 1, 'Căn hộ view sông công viên trung tâm Phú Mỹ Hưng với đầy đủ tiện ích trường quốc tế, bệnh viện FV, TTTM Crescent Mall.'),
('vung-tau-melody', 'Căn Hộ Nghỉ Dưỡng Vũng Tàu Melody Bãi Sau', 'can-ho-nghi-duong-vung-tau-melody-bai-sau', 'Căn Hộ Biển', 'du-an', '2.15 Tỷ VNĐ', 2.15, '60 m²', 2, 1, 'Góc đường Võ Thị Sáu - Hoàng Hoa Thám, TP. Vũng Tàu', 'TP. Vũng Tàu', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 1, 1, 'Căn hộ du lịch ngắm trọn vẹn biển Bãi Sau, cách bờ biển 200m đi bộ, thích hợp khai thác cho thuê Airbnb lợi nhuận cao.'),
('vinhomes-grand-park-origami', 'Vinhomes Grand Park Quận 9 Phân Khu Origami', 'vinhomes-grand-park-quan-9-phan-khu-origami', 'Căn Hộ Cao Cấp', 'du-an', '2.90 Tỷ VNĐ', 2.9, '70 m²', 2, 2, 'Đường Nguyễn Xiển, Phường Long Thạnh Mỹ, TP. Thủ Đức (Quận 9)', 'TP. Thủ Đức', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 0, 1, 'Căn hộ đậm chất văn hóa Nhật Bản liền kề vườn thiền sỏi trắng, hồ cá Koi và đại công viên biển nhân tạo 36ha.'),
('dragon-village-quan-9', 'Nhà Phố Thương Mại Dragon Village Quận 9', 'nha-pho-thuong-mai-dragon-village-quan-9', 'Nhà Phố Liền Kề', 'ban', '5.60 Tỷ VNĐ', 5.6, '100 m²', 4, 4, 'Đường Nguyễn Thị Tư, Phường Phú Hữu, TP. Thủ Đức (Quận 9)', 'TP. Thủ Đức', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 0, 1, 'Nhà phố 1 trệt 2 lầu xây dựng hoàn thiện đồng bộ phong cách tân cổ điển, nằm trong khu compound khép kín an ninh 24/7.'),
('biet-thu-ecolake-ven-ho', 'Biệt Thự Đơn Lập EcoLake Ven Hồ Cảnh Quan Sinh Thái', 'biet-thu-don-lap-ecolake-ven-ho-canh-quan', 'Biệt Thự Đơn Lập', 'ban', '9.80 Tỷ VNĐ', 9.8, '250 m²', 5, 5, 'Khu Đô Thị Sinh Thái EcoLake, Bến Cát, Bình Dương', 'Bến Cát', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 1, 1, 'Dinh thự ven hồ với hồ bơi riêng và sân vườn nhiệt đới rộng lớn, mang lại không gian sống xanh thanh bình đẳng cấp.'),
('cho-thue-mat-bang-kinh-doanh-quan-1', 'Cho Thuê Mặt Bằng Kinh Doanh 2 Mặt Tiền Quận 1', 'cho-thue-mat-bang-kinh-doanh-2-mat-tien-quan-1', 'Mặt Bằng Cho Thuê', 'thue', '45 Triệu / Tháng', 0.045, '120 m²', 1, 2, 'Góc Hai Bà Trưng - Lê Thánh Tôn, Phường Bến Nghé, Quận 1', 'Quận 1', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 0, 0, 'Vị trí đắc địa lưu lượng giao thông sầm uất cả ngày lẫn đêm, phù hợp mở chuỗi trà sữa, cafe, showroom thời trang cao cấp.');

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    product_type VARCHAR(100),
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
