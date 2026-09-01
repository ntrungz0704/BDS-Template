CREATE DATABASE IF NOT EXISTS bds_05;
USE bds_05;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slogan VARCHAR(255),
    address VARCHAR(255),
    phone1 VARCHAR(50),
    phone2 VARCHAR(50),
    email VARCHAR(255),
    working_hours VARCHAR(255),
    zalo_url VARCHAR(255),
    facebook_url VARCHAR(255),
    youtube_url VARCHAR(255),
    tiktok_url VARCHAR(255),
    footer_text TEXT
);

INSERT INTO company_info (name, slogan, address, phone1, phone2, email, working_hours, zalo_url, facebook_url, youtube_url, tiktok_url, footer_text) VALUES 
('TEMPLATESBDS', 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam', '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội', '0919 006 030', '0983 312 219', 'admin@templatesbds.com', '8:00 - 20:00 (T2 - CN)', 'https://zalo.me/0919006030', 'https://www.facebook.com/groups/847532091275214', 'https://www.youtube.com/@tungchuofficial', 'https://www.tiktok.com/@editnhadat', 'Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.');

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    category_label VARCHAR(100),
    price VARCHAR(100),
    area VARCHAR(50),
    bedrooms INT,
    bathrooms INT,
    direction VARCHAR(50),
    location VARCHAR(255),
    city VARCHAR(100),
    badge VARCHAR(50),
    image VARCHAR(255),
    description TEXT,
    featured BOOLEAN DEFAULT FALSE,
    bestseller BOOLEAN DEFAULT FALSE
);

INSERT INTO projects (title, slug, category, category_label, price, area, bedrooms, bathrooms, direction, location, city, badge, image, description, featured, bestseller) VALUES
('Biệt Thự View Biển Đẹp Khu Đô Thị An Viên', 'biet-thu-view-bien-dep-an-vien', 'nha-o', 'Nhà Ở / Biệt Thự', '25,000,000,000 đ', '350 m²', 4, 4, 'Đông Nam', 'KĐT An Viên, Phường Vĩnh Trường, TP. Nha Trang, Khánh Hòa', 'Nha Trang', 'MỚI', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'Biệt thự nghỉ dưỡng mặt biển cao cấp với hồ bơi vô cực tràn bờ, sân vườn xanh mát và bến đỗ du thuyền riêng biệt.', 1, 0),
('Biệt Thự An Viên Nha Trang Có Hồ Bơi Riêng Biệt Lập', 'biet-thu-an-vien-nha-trang-ho-boi-rieng', 'nha-cho-thue', 'Nhà Cho Thuê', '2,500,000,000 đ / Năm', '280 m²', 4, 4, 'Nam', 'Đường Số 1, KĐT An Viên, TP. Nha Trang', 'Nha Trang', 'HOT', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'Căn biệt thự thiết kế hiện đại trang bị đầy đủ tiện nghi tiêu chuẩn 5 sao, phục vụ nghỉ dưỡng gia đình hoặc khai thác cho thuê du lịch cao cấp.', 1, 1),
('Biệt Thự Hoa Thiên — Phan Thiết Sát Biển Mũi Né', 'biet-thu-hoa-thien-phan-thiet', 'nha-o', 'Biệt Thự Biển', '1,500,000,000 đ / Đợt 1', '320 m²', 3, 3, 'Đông', 'Đường Huỳnh Thúc Kháng, TP. Phan Thiết, Bình Thuận', 'Phan Thiết', 'GIÁ TỐT', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'Nằm trong quần thể nghỉ dưỡng biển Hoa Thiên Phan Thiết, liền kề đồi cát bay và bãi biển cát trắng mịn màng.', 1, 1),
('Biệt Thự Cô Liên — Đà Lạt Phong Cách Cổ Điển Pháp', 'biet-thu-co-lien-da-lat', 'nha-o', 'Biệt Thự Đồi', '25,000,000,000 đ', '450 m²', 5, 5, 'Tây Nam', 'Đường Trần Hưng Đạo, Phường 10, TP. Đà Lạt, Lâm Đồng', 'Đà Lạt', 'VIP', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', 'Dinh thự mang đậm phong cách kiến trúc Pháp cổ ẩn mình giữa rừng thông bạt ngàn ngắm toàn cảnh thung lũng sương mù.', 1, 1),
('Biệt Thự Thành Thành — Đà Nẵng Cạnh Cầu Rồng Sông Hàn', 'biet-thu-thanh-thanh-da-nang', 'nha-o', 'Nhà Phố / Biệt Thự', '21,000,000,000 đ', '260 m²', 4, 4, 'Đông Bắc', 'Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng', 'Đà Nẵng', 'MỚI', 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80', 'Vị trí đắc địa ngay trung tâm thành phố Đà Nẵng, thiết kế 3 tầng hiện đại sang trọng, thuận tiện kinh doanh hoặc làm văn phòng đại diện.', 1, 1),
('Biệt Thự Hướng Biển — Phan Thiết View Hoàng Hôn', 'biet-thu-huong-bien-phan-thiet', 'nha-o', 'Biệt Thự Biển', '19,500,000,000 đ', '380 m²', 4, 4, 'Tây', 'Đường Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết', 'Phan Thiết', 'HOT', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'Tọa lạc tại thủ phủ resort Mũi Né, ban công lớn đón gió biển trong lành, thích hợp làm villa nghỉ dưỡng gia đình.', 1, 1);
