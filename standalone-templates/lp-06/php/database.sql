CREATE DATABASE IF NOT EXISTS landing_page_06 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE landing_page_06;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    slogan VARCHAR(255) NOT NULL,
    zalo VARCHAR(50) NOT NULL
);

INSERT INTO company_info (name, phone, email, address, slogan, zalo) VALUES 
('STELLA MEGA CITY', '0919 006 030', 'admin@templatesbds.com', 'Đường Đặng Văn Dầy, P. Bình Thủy, Q. Bình Thủy, TP. Cần Thơ', 'ĐẠI ĐÔ THỊ TRUNG TÂM THỦ PHỦ MIỀN TÂY', 'https://zalo.me/0919006030');

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    badge_text VARCHAR(50) NOT NULL
);

INSERT INTO projects (title, description, image, badge_text) VALUES 
('01. Đền Thờ Vua Hùng', 'Biểu tượng văn hóa tâm linh 4ha lớn nhất ĐBSCL', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', '01'),
('02. Đại Lộ Ánh Sáng', 'Tuyến phố đi bộ sầm uất & nhạc nước nghệ thuật', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', '02'),
('03. Trung Tâm Hành Chính', 'Tọa lạc ngay trong lòng dự án, an ninh tuyệt đối', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', '03'),
('04. Công Viên Zen Garden', 'Không gian thiền tịnh phong cách Nhật Bản', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', '04'),
('05. Trường Học Liên Cấp', 'Hệ thống giáo dục chuẩn quốc tế Cambridge', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80', '05'),
('06. TTTM & Khách Sạn 5 Sao', 'Tổ hợp thương mại khối đế sầm uất bậc nhất', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', '06');

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    product_type VARCHAR(255),
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
