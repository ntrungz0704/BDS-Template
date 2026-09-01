CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    slogan VARCHAR(255),
    zalo VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    price VARCHAR(100),
    area VARCHAR(50),
    bedrooms INT,
    bathrooms INT,
    badge VARCHAR(50),
    image VARCHAR(255),
    gallery TEXT,
    specs TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    date VARCHAR(50),
    author VARCHAR(100),
    category VARCHAR(100),
    image VARCHAR(255),
    short_desc TEXT,
    content TEXT,
    views INT
);

INSERT INTO company_info (name, phone, email, address, slogan, zalo) VALUES
('TEMPLATESBDS', '0919 006 030', 'ntrungz0704@gmail.com', 'Đường Phú Thuận, Phường Tân Phú, Quận 7, TP.HCM', 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam', '0919006030');

INSERT INTO projects (title, slug, type, price, area, bedrooms, bathrooms, badge, image, gallery, specs, description) VALUES
('Căn Hộ 2 Phòng Ngủ SmartHome View Trọn Sông Cả Cấm & Phú Mỹ Hưng', 'can-ho-2pn-smarthome-view-song-phu-my-hung', 'Căn hộ 2 Phòng Ngủ', '4.85 Tỷ VNĐ', '72.5 m²', 2, 2, 'Mạ Vàng 24K', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", "https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80"]', '["Thiết bị vệ sinh mạ vàng Kohler", "Hệ thống kính Low-E 3 lớp chạm sàn", "Công nghệ SmartHome điều khiển bằng giọng nói", "Khóa cửa nhận diện FaceID thông minh"]', 'Căn hộ 2 phòng ngủ thiết kế sang trọng, tối ưu ánh sáng tự nhiên với ban công kính tràn viền. Tích hợp trọn bộ hệ thống nhà thông minh 4.0 hiện đại bậc nhất.'),
('Căn Hộ 3 Phòng Ngủ Panorama Góc 2 Mặt Thoáng Đỉnh Cao', 'can-ho-3pn-panorama-goc-2-mat-thoang', 'Căn hộ 3 Phòng Ngủ', '7.2 Tỷ VNĐ', '108 m²', 3, 2, 'Căn Góc VIP', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80"]', '["Bếp đảo sang trọng mặt đá Thạch Anh", "Hệ thống máy lạnh âm trần Daikin VRV", "Sàn gỗ công nghiệp cao cấp nhập khẩu Đức", "Chuông hình kỹ thuật số liên lạc sảnh lễ tân"]', 'Căn góc 3 phòng ngủ sở hữu tầm nhìn panorama 270 độ triệu đô. Không gian phòng khách rộng mở kết nối phòng ăn lý tưởng cho các gia đình thượng lưu.'),
('Sky Villa Penthouse Thông Tầng Dát Vàng Đẳng Cấp Thượng Lưu', 'sky-villa-penthouse-thong-tang-dat-vang', 'Sky Villa / Penthouse', '21.5 Tỷ VNĐ', '265 m²', 4, 5, 'Độc Bản Giới Hạn', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"]', '["Hồ bơi chân mây riêng tại ban công", "Thang máy riêng bảo mật 2 lớp bằng FaceID", "Nội thất đặt hàng riêng từ thương hiệu Versace Home", "Hệ thống lọc nước tại vòi chuẩn khoáng chất tự nhiên"]', 'Kiệt tác Sky Villa thông tầng đỉnh cao với trần cao 6.5m, hồ bơi riêng trên không và sân vườn Babylon thu nhỏ giữa lưng chừng trời.'),
('Căn Hộ 1 Phòng Ngủ Studio SmartHome Dành Cho Chuyên Gia', 'can-ho-1pn-studio-smarthome-chuyen-gia', 'Căn hộ 1 Phòng Ngủ', '3.35 Tỷ VNĐ', '52 m²', 1, 1, 'Dễ Cho Thuê', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', '["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"]', '["Full nội thất SmartHome liền tường cao cấp", "Hệ thống rèm tự động đóng mở theo ánh sáng mặt trời", "Tủ lạnh và lò nướng âm Bosch", "Quản lý căn hộ qua App di động"]', 'Thiết kế thông minh tối ưu diện tích, lý tưởng cho chuyên gia nước ngoài và gia đình trẻ thành đạt, tỷ suất cho thuê đạt 8.5%/năm.');

INSERT INTO news (title, slug, date, author, category, image, short_desc, content, views) VALUES
('Lễ Ký Kết Hợp Tác Chiến Lược Cùng Đơn Vị Vận Hành Quốc Tế Chuẩn 5 Sao', 'le-ky-ket-hop-tac-chien-luoc', '28/08/2026', 'Ban Truyền Thông', 'Sự Kiện & Hợp Tác', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', 'Khẳng định đẳng cấp quốc tế với dịch vụ quản lý tòa nhà...', '["Chủ đầu tư chính thức ký kết thỏa thuận hợp tác quản lý vận hành tòa nhà cùng tập đoàn dịch vụ bất động sản hàng đầu thế giới.", "Cư dân tương lai sẽ được tận hưởng hệ thống dịch vụ đặc quyền từ xe đưa đón hạng sang, quản gia riêng, dịch vụ chăm sóc thú cưng đến đặt vé máy bay và du thuyền VIP.", "Sự hợp tác này nâng tầm giá trị sống và đảm bảo thanh khoản bền vững cho các chủ nhân sở hữu căn hộ."]', 4890),
('Khai Trương Căn Hộ Mẫu Sky Villa Dát Vàng Đón Hơn 1,000 Khách Tham Quan', 'khai-truong-can-ho-mau', '26/08/2026', 'Ban Kinh Doanh', 'Trải Nghiệm Căn Hộ', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Khách hàng trực tiếp trải nghiệm hệ sinh thái 4.0 và chiêm ngưỡng nội thất mạ vàng xa hoa ngay tại khuôn viên dự án...', '["Khu nhà mẫu Sunshine City Saigon đã chính thức mở cửa đón khách hàng VIP với sự xuất hiện của các căn hộ mẫu từ 2PN đến Sky Villa Penthouse.", "Điểm nhấn ấn tượng là hệ thống điều khiển SmartHome phản hồi giọng nói bằng tiếng Việt và kính Low-E cản nhiệt cách âm hoàn hảo.", "Nhiều khách hàng đã quyết định đặt cọc giữ chỗ ngay trong ngày đầu khai trương để chọn được những tầng đẹp view sông."]', 6120),
('Tiến Độ Xây Dựng Thực Tế: Thi Công Đồng Loạt 9 Tòa Tháp Vượt Kế Hoạch', 'tien-do-xay-dung', '24/08/2026', 'Ban Quản Lý Dự Án', 'Tiến Độ Thi Công', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', 'Hàng trăm kỹ sư và công nhân đang ngày đêm thi công hoàn thiện mặt ngoài kính Low-E dát vàng và hệ thống tiện ích nội khu...', '["Giai đoạn 1 của dự án đã cất nóc thành công các tòa S1, S2 và đang tiến hành lắp đặt hệ thống cơ điện thông minh.", "Hồ bơi vô cực trên tầng thượng và công viên cảnh quan ven sông Cả Cấm cũng đang được hoàn thiện cảnh quan xanh.", "Chủ đầu tư cam kết bàn giao nhà đúng tiến độ vào Quý 4/2026 cùng sổ hồng trao tay cho cư dân."]', 5430);
