CREATE DATABASE IF NOT EXISTS bds_13 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bds_13;

CREATE TABLE IF NOT EXISTS company_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255),
    slogan VARCHAR(255),
    phone VARCHAR(50),
    secondary_phone VARCHAR(50),
    email VARCHAR(255),
    address VARCHAR(255),
    zalo VARCHAR(50)
);

INSERT INTO company_info (company_name, slogan, phone, secondary_phone, email, address, zalo) VALUES 
('ĐẠI PHÁT LAND', 'BẤT ĐỘNG SẢN THỦY NGUYÊN HẢI PHÒNG', '0917.85.88.85', '0919 006 030', 'info@templatebds.com', 'THÀNH PHỐ THỦY NGUYÊN HẢI PHÒNG', '0917858885')
ON DUPLICATE KEY UPDATE company_name=VALUES(company_name);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    image VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    is_hot BOOLEAN DEFAULT FALSE,
    category VARCHAR(100),
    description TEXT,
    price VARCHAR(100),
    location VARCHAR(255),
    badge VARCHAR(100)
);

INSERT INTO projects (title, image, is_featured, is_hot, category, description, price, location, badge) VALUES
('ĐẠI ĐÔ THỊ HOÀNG HUY NEW CITY BẮC SÔNG CẤM', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80', TRUE, FALSE, 'DỰ ÁN NỔI BẬT', 'Quy mô 65ha liền kề Trung tâm chính trị - hành chính mới Hải Phòng.', '', '', 'DỰ ÁN TIÊU BIỂU'),
('KHU ĐÔ THỊ BELHOMES VSIP HẢI PHÒNG', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80', TRUE, FALSE, 'DỰ ÁN NỔI BẬT', 'Khu đô thị sinh thái xanh chuẩn Singapore công viên ven sông 6ha.', '', '', 'DỰ ÁN XANH SINGAPORE'),
('Khu Đô Thị Hoàng Huy New City Bắc Sông Cấm Thủy Nguyên', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', FALSE, TRUE, 'DỰ ÁN NỔI BẬT', '', '3.85 Tỷ / Lô', 'Xã Tân Dương, TP. Thủy Nguyên, Hải Phòng', 'Khu Đô Thị Kiểu Mẫu'),
('Khu Đô Thị Belhomes Vsip Thủy Nguyên Hải Phòng', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', FALSE, TRUE, 'DỰ ÁN NỔI BẬT', '', '3.20 Tỷ / Căn', 'Đô thị Vsip Hải Phòng, Xã An Lư, Thủy Nguyên', 'Nhà Phố Xanh Singapore'),
('Nhà Phố Thương Mại Shophouse Hoàng Huy Grand Tower', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', FALSE, TRUE, 'DỰ ÁN NỔI BẬT', '', '4.80 Tỷ / Căn', 'Đại lộ Hùng Vương, Sở Dầu, Hồng Bàng', 'Shophouse Khối Đế'),
('Khu Đô Thị Hoàng Huy New City Bắc Sông Cấm Thủy Nguyên', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', FALSE, FALSE, 'NHÀ ĐẤT BÁN', '', '3.85 Tỷ / Lô', 'Xã Tân Dương, TP. Thủy Nguyên, Hải Phòng', 'Khu Đô Thị Kiểu Mẫu'),
('Khu Đô Thị Belhomes Vsip Thủy Nguyên Hải Phòng', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', FALSE, FALSE, 'NHÀ ĐẤT BÁN', '', '3.20 Tỷ / Căn', 'Đô thị Vsip Hải Phòng, Xã An Lư, Thủy Nguyên', 'Nhà Phố Xanh Singapore'),
('Nhà Phố Thương Mại Shophouse Hoàng Huy Grand Tower', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', FALSE, FALSE, 'NHÀ ĐẤT BÁN', '', '4.80 Tỷ / Căn', 'Đại lộ Hùng Vương, Sở Dầu, Hồng Bàng', 'Shophouse Khối Đế'),
('Đất Tái Định Cư Bắc Sông Cấm Phân Lô Sổ Đỏ', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', FALSE, FALSE, 'NHÀ ĐẤT BÁN', '', '2.85 Tỷ / Lô', 'Khu TĐC Bắc Sông Cấm, Xã Dương Quan, Thủy Nguyên', 'Đất Nền Tái Định Cư');

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    message TEXT,
    product_type VARCHAR(255),
    source VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
