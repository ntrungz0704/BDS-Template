CREATE DATABASE IF NOT EXISTS bds24_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bds24_db;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slogan VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(100),
    address VARCHAR(255),
    zalo VARCHAR(50)
);

INSERT INTO company_info (name, slogan, phone, email, address, zalo) VALUES 
('TEMPLATESBDS', 'TRANG TIN CÔNG NGHỆ BĐS & ĐÔ THỊ THÔNG MINH SỐ 1', '090 123 4567', 'contact@templatesbds.com', 'Hà Nội, Việt Nam', '090 123 4567')
ON DUPLICATE KEY UPDATE name=VALUES(name);

CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    priceRange VARCHAR(100),
    priceNum DECIMAL(10,2),
    areaRange VARCHAR(100),
    developer VARCHAR(100),
    status VARCHAR(100),
    techHighlights TEXT,
    image VARCHAR(255),
    is_hot BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    iotScore INT,
    description TEXT,
    amenities TEXT
);

INSERT INTO projects (id, title, slug, address, city, priceRange, priceNum, areaRange, developer, status, techHighlights, image, is_hot, featured, iotScore, description, amenities) VALUES
('vinhomes-smart-city-tay-mo', 'Vinhomes Smart City Tây Mỗ — Đại Đô Thị AI 4.0', 'vinhomes-smart-city-tay-mo-ai', 'Đại Lộ Thăng Long, Nam Từ Liêm, Hà Nội', 'Hà Nội', '2.5 - 8.5 Tỷ VNĐ', 2.5, '32 - 105 m²', 'Vingroup', 'Đang Bàn Giao & Mở Bán Phân Khu Mới', '["Face ID nhận diện khuôn mặt", "Camera AI phân tích an ninh", "Smart Parking tự động tìm chỗ đỗ", "Ứng dụng cư dân VinID Smart"]', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', TRUE, TRUE, 99, 'Đại đô thị thông minh chuẩn quốc tế đầu tiên tại Việt Nam với hệ sinh thái 4 trụ cột: An ninh thông minh, Vận hành thông minh, Cộng đồng thông minh, Căn hộ thông minh.', '["Vườn Nhật Zen Park 6.1ha", "Công viên trung tâm Central Park", "Bệnh viện Vinmec chuẩn quốc tế", "Trường liên cấp Vinschool"]'),
('the-global-city-thu-duc', 'The Global City — Trung Tâm Đô Thị Mới Chuẩn Foster+Partners', 'the-global-city-thu-duc-smart', 'Đỗ Xuân Hợp, P. An Phú, TP. Thủ Đức, TP.HCM', 'TP. Hồ Chí Minh', '18.0 - 45.0 Tỷ VNĐ', 18.0, '95 - 350 m²', 'Masterise Homes', 'Đang Xây Dựng & Bàn Giao Shophouse', '["Hệ thống nhạc nước lớn nhất Đông Nam Á", "Mạng lưới IoT năng lượng mặt trời", "Cảm biến vi khí hậu thông minh", "Hạ tầng xe điện ngầm 100%"]', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', TRUE, TRUE, 98, 'Downtown thứ 2 của TP.HCM được thiết kế bởi huyền thoại kiến trúc thế giới Foster + Partners, biểu tượng của lối sống thượng lưu hiện đại.', '["Kênh đào nhạc nước 2km", "TTTM hạng A 123.000m²", "Sân Golf 18 lỗ quốc tế", "Bến du thuyền tiêu chuẩn 5 sao"]'),
('ecopark-smart-green-city', 'Ecopark Grand The Island — Đô Thị Sinh Thái Thông Minh Ecopark', 'ecopark-grand-the-island-smart', 'Khu Đô Thị Ecopark, Văn Giang, Hưng Yên', 'Hưng Yên', '32.0 - 120.0 Tỷ VNĐ', 32.0, '270 - 1200 m²', 'Ecopark Corporation', 'Đã Bàn Giao (Sổ Đỏ Vĩnh Viễn)', '["Lọc nước sinh thái tự nhiên chuẩn Nhật", "Biệt thự đảo biệt lập quản lý AI", "Du thuyền đưa đón nội khu", "Cảm biến đo chất lượng không khí PM2.5"]', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', TRUE, TRUE, 96, 'Quần thể biệt thự đảo thượng lưu vươn mình ra mặt nước, nơi 100% diện tích tiếp xúc với thiên nhiên sinh thái trong lành bậc nhất miền Bắc.', '["Clubhouse đẳng cấp quốc tế", "Hồ nước ngọt tuần hoàn sinh học", "An ninh 3 lớp bảo vệ 24/7", "Bến đỗ du thuyền riêng từng căn"]'),
('lotte-eco-smart-city-thu-thiem', 'Lotte Eco Smart City Thủ Thiêm — Đại Đô Thị Tài Chính & Công Nghệ', 'lotte-eco-smart-city-thu-thiem', 'Khu Chức Năng 2a, Đô Thị Mới Thủ Thiêm, TP. Thủ Đức, TP.HCM', 'TP. Hồ Chí Minh', '25.0 - 80.0 Tỷ VNĐ', 25.0, '88 - 320 m²', 'Lotte Group (Hàn Quốc)', 'Đang Triển Khai Giai Đoạn 1', '["Hệ thống quản lý tòa nhà BMS thông minh", "Thang máy nhận diện vân tay & Face ID", "Hệ thống logistics giao hàng robot ngầm", "Chứng chỉ công trình xanh LEED Platinum"]', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', TRUE, TRUE, 99, 'Tổ hợp tài chính, thương mại dịch vụ tổng hợp và dân cư đa chức năng ứng dụng công nghệ thông tin tiên tiến hàng đầu châu Á.', '["Khách sạn 6 sao Lotte Legend", "Trung tâm thương mại ngầm liên tuyến Metro", "Đài quan sát Sky Deck 360 độ", "Hồ bơi chân mây vô cực"]'),
('sun-grand-city-feria-ha-long', 'Sun Grand City Feria Hạ Long — Đô Thị Nghỉ Dưỡng Phong Cách Địa Trung Hải', 'sun-grand-city-feria-ha-long', 'Đường Hạ Long, P. Bãi Cháy, TP. Hạ Long, Quảng Ninh', 'Quảng Ninh', '15.0 - 38.0 Tỷ VNĐ', 15.0, '130 - 350 m²', 'Sun Group', 'Đã Bàn Giao (Sổ Đỏ Lâu Dài)', '["Quản lý vận hành khu đô thị thông minh", "Hệ thống chiếu sáng năng lượng mặt trời", "Camera 360 AI giám sát bãi biển", "App tiện ích cư dân Sun Home"]', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', FALSE, TRUE, 94, 'Biệt thự phong cách Tây Ban Nha & Địa Trung Hải ôm trọn vịnh kỳ quan Hạ Long, sở hữu bãi tắm cát trắng riêng tư tuyệt đẹp.', '["Công viên Sun World Ha Long Complex", "Bãi tắm riêng Bãi Cháy", "Phố đi bộ ẩm thực ven biển", "Bến du thuyền quốc tế Hạ Long"]'),
('meyhomes-capital-phu-quoc', 'Meyhomes Capital Phú Quốc — Thành Phố Tinh Khiết Chuẩn Đô Thị Thông Minh', 'meyhomes-capital-phu-quoc-smart', 'Bãi Trường, P. An Thới, TP. Phú Quốc, Kiên Giang', 'Kiên Giang', '12.5 - 28.0 Tỷ VNĐ', 12.5, '117 - 240 m²', 'Tân Á Đại Thành (Meyland)', 'Đang Bàn Giao Giai Đoạn 1 & 2', '["Hệ sinh thái lọc nước sạch tinh khiết uống tại vòi", "Hạ tầng điện năng lượng mặt trời thông minh", "Hệ thống quản lý đô thị Smart City Meyhomes", "Cảm biến tưới cây tự động IoT"]', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', FALSE, TRUE, 97, 'Thành phố đảo nhiệt đới đa sắc màu tại Bãi Trường Phú Quốc, đất ở đô thị sở hữu lâu dài duy nhất tại nam đảo ngọc.', '["Công viên sông Mey River Park", "Trung tâm thể thao phức hợp Clubhouse", "Trường học liên cấp quốc tế", "Hồ điều hòa ánh sáng nghệ thuật"]')
ON DUPLICATE KEY UPDATE title=VALUES(title);

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    publish_date VARCHAR(50),
    author VARCHAR(100),
    category VARCHAR(100),
    image VARCHAR(255),
    excerpt TEXT,
    content TEXT,
    views INT DEFAULT 0
);

INSERT INTO news (title, slug, publish_date, author, category, image, excerpt, content, views) VALUES
('Xu Hướng BĐS Proptech 4.0: Trí Tuệ Nhân Tạo AI & Bản Đồ Số Định Hình Thị Trường', 'xu-huong-bds-proptech-40-ai-va-ban-do-so', '29/08/2026', 'RealtyBuild Tech Insights', 'Công Nghệ BĐS', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'Ứng dụng công nghệ thực tế ảo VR360, định giá nhà đất bằng thuật toán học máy và giao dịch số giúp tiết kiệm 70% thời gian cho nhà đầu tư.', '["Công nghệ PropTech đang chuyển dịch từ cổng thông tin rao vặt truyền thống sang các nền tảng thông minh tích hợp dữ liệu lớn Big Data và AI.", "Khách hàng có thể trải nghiệm xem nhà 3D, kiểm tra pháp lý trực tuyến và nộp hồ sơ công chứng điện tử chỉ bằng vài thao tác trên điện thoại."]', 8450),
('Đô Thị Thông Minh (Smart City) — Tiêu Chuẩn Sống Mới Của Cư Dân Thế Hệ Trẻ Gen Z & Millennials', 'do-thi-thong-minh-smart-city-tieu-chuan-song-moi', '27/08/2026', 'Hiệp Hội Đô Thị Thông Minh', 'Smart City', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Hệ thống an ninh nhận diện khuôn mặt, trạm sạc xe điện thông minh và năng lượng sạch trở thành tiêu chí bắt buộc khi chọn mua nhà.', '["Hơn 85% người mua nhà trẻ tuổi sẵn sàng chi trả thêm 10-15% giá trị căn hộ để được sống trong khu đô thị tích hợp giải pháp IoT toàn diện."]', 6120),
('Bản Đồ Quy Hoạch Giao Thông & Đường Vành Đai Mới: Cơ Hội Đầu Tư BĐS Bứt Phá', 'ban-do-quy-hoach-giao-thong-co-hoi-dau-tu', '25/08/2026', 'Chuyên Gia Quy Hoạch Đô Thị', 'Quy Hoạch Số', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Tra cứu thông tin quy hoạch sử dụng đất trực tuyến 24/7 giúp nhà đầu tư nắm bắt cơ hội trước khi hạ tầng giao thông khởi công.', '["Dữ liệu quy hoạch địa chính số hóa đem lại sự minh bạch tuyệt đối cho thị trường bất động sản Việt Nam."]', 7390);

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    project_interested VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
