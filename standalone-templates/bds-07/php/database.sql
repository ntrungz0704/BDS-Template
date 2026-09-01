CREATE DATABASE IF NOT EXISTS bds_07_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bds_07_cms;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    slogan VARCHAR(255) NOT NULL,
    zalo VARCHAR(50) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO company_info (name, phone, email, address, slogan, zalo)
VALUES (
    'TEMPLATESBDS',
    '0919 006 030',
    'info@templatesbds.com',
    'Làng Sinh Thái Pannamera, Xã Lộc Tân, TP. Bảo Lộc, Lâm Đồng',
    'LÀNG SINH THÁI NGHỈ DƯỠNG',
    '0919006030'
) ON DUPLICATE KEY UPDATE name=VALUES(name);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    area VARCHAR(100) NOT NULL,
    direction VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    badge_text VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (name, type, area, direction, price, image_url, badge_text)
VALUES
('Lô Đất Vườn Nghỉ Dưỡng Săn Mây View Đồi Thông Tuyệt Mỹ', 'Đất Vườn Săn Mây • Phân Khu Săn Mây A1', '250.0 m²', 'Đông Nam', '890 Triệu VNĐ', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', 'SUẤT NGOẠI GIAO'),
('Lô Góc 2 Mặt Tiền Suối Tự Nhiên & Đồi Chè Xanh Bát Ngát', 'Đất Vườn Sinh Thái • Phân Khu Ven Suối B2', '350.0 m²', 'Nam - Đông Nam', '1.25 Tỷ VNĐ', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', 'VIEW SUỐI HIẾM'),
('Nhà Vườn Bungalow Gỗ Mẫu Hoàn Thiện Full Sân Vườn', 'Bungalow Nghỉ Dưỡng • Phân Khu Trung Tâm C1', '300.0 m²', 'Đông', '1.45 Tỷ VNĐ', 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80', 'XÂY SẴN CHÌA KHÓA TRAO TAY'),
('Biệt Thự Vườn Sinh Thái Panorama View 360 Độ Đồi Chè', 'Biệt Thự Đồi • Phân Khu Sunset Villa', '500.0 m²', 'Đông Bắc', '1.85 Tỷ VNĐ', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'VIEW PANORAMA 360');

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    product_type VARCHAR(255),
    price_expected VARCHAR(100),
    address TEXT,
    note TEXT,
    source VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
