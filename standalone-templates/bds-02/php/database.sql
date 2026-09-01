CREATE DATABASE IF NOT EXISTS bds_02_cms;
USE bds_02_cms;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    address VARCHAR(255),
    slogan VARCHAR(255),
    zalo VARCHAR(50)
);

INSERT INTO company_info (name, phone, email, address, slogan, zalo) VALUES
('TEMPLATESBDS', '0919 006 030', 'ntrungz0704@gmail.com', '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội', 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam', '0919006030');

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    type VARCHAR(100),
    price VARCHAR(100),
    priceNum DECIMAL(10,2),
    area VARCHAR(100),
    areaNum DECIMAL(10,2),
    location VARCHAR(255),
    district VARCHAR(100),
    bedrooms INT,
    bathrooms INT,
    direction VARCHAR(50),
    legal VARCHAR(255),
    image VARCHAR(500),
    gallery TEXT,
    date VARCHAR(50),
    featured BOOLEAN DEFAULT FALSE,
    description TEXT,
    author_name VARCHAR(100),
    author_phone VARCHAR(50),
    author_zalo VARCHAR(50),
    author_avatar VARCHAR(500)
);

INSERT INTO projects (title, category, type, price, priceNum, area, areaNum, location, district, bedrooms, bathrooms, direction, legal, image, gallery, date, featured, description, author_name, author_phone, author_zalo, author_avatar) VALUES
('Bán nhà mặt tiền 3.5 tầng đường Nguyễn Tri Phương, Quận Thanh Khê', 'nha-mat-tien', 'Nhà mặt tiền', '7.5 Tỷ VNĐ', 7.5, '95 m²', 95, 'Đường Nguyễn Tri Phương, Phường Chính Gián, Quận Thanh Khê, Đà Nẵng', 'Thanh Khê', 4, 4, 'Đông Nam', 'Sổ hồng chính chủ, hoàn công đầy đủ', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80","https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80"]', '28/08/2026', 1, 'Nhà mặt tiền vị trí đắc địa kinh doanh sầm uất ngay trung tâm Thanh Khê, thiết kế 3.5 tầng hiện đại, vỉa hè 5m rộng rãi, thích hợp mở văn phòng, spa hoặc cho thuê nguyên căn dòng tiền 30 triệu/tháng.', 'Nguyễn Văn Tuấn', '0972.939.888', '0972939888', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'),
('Biệt thự sân vườn đẳng cấp khu Euro Village 1 ven sông Hàn, Sơn Trà', 'biet-thu', 'Biệt thự', '28.5 Tỷ VNĐ', 28.5, '250 m²', 250, 'Khu Đô Thị Euro Village 1, Phường An Hải Tây, Quận Sơn Trà, Đà Nẵng', 'Sơn Trà', 5, 6, 'Tây Bắc', 'Sổ đỏ vĩnh viễn, pháp lý chuẩn', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80","https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80","https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"]', '27/08/2026', 1, 'Biệt thự làng Châu Âu ven sông Hàn đẳng cấp thượng lưu, có hồ bơi riêng, sân vườn tiểu cảnh xanh mát, full nội thất gỗ cao cấp nhập khẩu Ý, an ninh khép kín 24/7.', 'Trần Thị Thu Hà', '0905.123.456', '0905123456', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'),
('Bán nhà ngõ ô tô tránh đường Phan Chu Trinh, Quận Hải Châu', 'nha-ngo-hem', 'Nhà ngõ, hẻm', '4.95 Tỷ VNĐ', 4.95, '68 m²', 68, 'Kiệt Phan Chu Trinh, Phường Phước Ninh, Quận Hải Châu, Đà Nẵng', 'Hải Châu', 3, 3, 'Chính Nam', 'Sổ đỏ trao tay, công chứng ngay', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"]', '26/08/2026', 1, 'Nhà đẹp 3 tầng kiên cố trung tâm Hải Châu, kiệt 5m ô tô thông tứ phía ra đường lớn, dân trí cao, gần trường học các cấp và chợ Hàn chỉ 3 phút đi bộ.', 'Lê Hoàng Long', '0935.888.999', '0935888999', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'),
('Tòa nhà căn hộ dịch vụ 5 tầng cho thuê dòng tiền đường Lê Duẩn, Thanh Khê', 'phong-tro', 'Phòng trọ', '9.2 Tỷ VNĐ', 9.2, '110 m²', 110, 'Đường Lê Duẩn, Phường Tân Chính, Quận Thanh Khê, Đà Nẵng', 'Thanh Khê', 10, 10, 'Đông Bắc', 'Sổ hồng hoàn công tòa nhà 5 tầng', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"]', '25/08/2026', 0, 'Tòa nhà căn hộ gồm 10 phòng studio full nội thất đang cho khách nước ngoài và nhân viên văn phòng thuê kín 100%, doanh thu đều đặn 45 triệu/tháng.', 'Nguyễn Văn Tuấn', '0972.939.888', '0972939888', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'),
('Bán nhà mặt tiền đường Võ Văn Kiệt view biển Mỹ Khê, Quận Sơn Trà', 'nha-mat-tien', 'Nhà mặt tiền', '22.0 Tỷ VNĐ', 22.0, '125 m²', 125, 'Đại lộ Võ Văn Kiệt, Phường Phước Mỹ, Quận Sơn Trà, Đà Nẵng', 'Sơn Trà', 6, 6, 'Chính Đông', 'Sổ đỏ chính chủ lâu dài', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', '["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"]', '24/08/2026', 1, 'Trục đường du lịch tỷ đô sầm uất bậc nhất Đà Nẵng, cách bãi biển Mỹ Khê chỉ 200m. Thích hợp kinh doanh khách sạn mini, nhà hàng hải sản hoặc showroom.', 'Trần Thị Thu Hà', '0905.123.456', '0905123456', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'),
('Biệt thự song lập phong cách Tân Cổ Điển KĐT Nam Hòa Xuân, Ngũ Hành Sơn', 'biet-thu', 'Biệt thự', '14.8 Tỷ VNĐ', 14.8, '180 m²', 180, 'KĐT Sinh Thái Nam Hòa Xuân, Phường Hòa Quý, Quận Ngũ Hành Sơn, Đà Nẵng', 'Ngũ Hành Sơn', 4, 5, 'Đông Nam', 'Sổ hồng sở hữu lâu dài', 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=800&q=80', '["https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"]', '23/08/2026', 0, 'Biệt thự 3 tầng xây thô hoàn thiện mặt ngoài, view công viên hồ sinh thái, hạ tầng đồng bộ, kết nối thẳng về trung tâm thành phố qua cầu Minh Mạng.', 'Lê Hoàng Long', '0935.888.999', '0935888999', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80');

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    message TEXT,
    product_type VARCHAR(100),
    source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
