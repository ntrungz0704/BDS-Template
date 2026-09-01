import re
import os

html_path = r'e:\BĐS Template\standalone-templates\bds-05\html\index.html'
php_path = r'e:\BĐS Template\standalone-templates\bds-05\php\index.php'
sql_path = r'e:\BĐS Template\standalone-templates\bds-05\php\database.sql'
api_path = r'e:\BĐS Template\standalone-templates\bds-05\php\api\contact.php'

# Create directories if they don't exist
os.makedirs(os.path.dirname(php_path), exist_ok=True)
os.makedirs(os.path.dirname(sql_path), exist_ok=True)
os.makedirs(os.path.dirname(api_path), exist_ok=True)

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make replacements for company info
content = content.replace('0919006030', '<?= $phone_clean1 ?>')
content = content.replace('0919 006 030', '<?= out("phone1") ?>')
content = content.replace('0983312219', '<?= $phone_clean2 ?>')
content = content.replace('0983 312 219', '<?= out("phone2") ?>')
content = content.replace('admin@templatesbds.com', '<?= out("email") ?>')
content = content.replace('180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội', '<?= out("address") ?>')
content = content.replace('Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam', '<?= out("slogan") ?>')
content = content.replace('Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.', '<?= out("footer_text") ?>')
content = content.replace('8:00 - 20:00 (T2 - CN)', '<?= out("working_hours") ?>')

content = content.replace('https://zalo.me/<?= $phone_clean1 ?>', '<?= out("zalo_url") ?>')
content = content.replace('https://www.facebook.com/groups/847532091275214', '<?= out("facebook_url") ?>')
content = content.replace('https://www.youtube.com/@tungchuofficial', '<?= out("youtube_url") ?>')
content = content.replace('https://www.tiktok.com/@editnhadat', '<?= out("tiktok_url") ?>')

content = re.sub(r'TEMPLATESBDS', r'<?= out("name") ?>', content)

# Inject PHP logic at the top
php_header = """<?php
$company_info = [
    'name' => 'TEMPLATESBDS',
    'slogan' => 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam',
    'address' => '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    'phone1' => '0919 006 030',
    'phone2' => '0983 312 219',
    'email' => 'admin@templatesbds.com',
    'working_hours' => '8:00 - 20:00 (T2 - CN)',
    'zalo_url' => 'https://zalo.me/0919006030',
    'facebook_url' => 'https://www.facebook.com/groups/847532091275214',
    'youtube_url' => 'https://www.youtube.com/@tungchuofficial',
    'tiktok_url' => 'https://www.tiktok.com/@editnhadat',
    'footer_text' => 'Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.'
];

$projects = [];

if (file_exists(__DIR__ . '/config/db.php')) {
    require_once __DIR__ . '/config/db.php';
    if (isset($pdo)) {
        try {
            $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $company_info = array_merge($company_info, $row);
            }

            $stmt = $pdo->query("SELECT * FROM projects");
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $projects[] = $row;
            }
        } catch (PDOException $e) {
            // fallback
        }
    }
}

if (empty($projects)) {
    // fallback data
    $projects = [
      [ 'id' => 1, 'title' => 'Biệt Thự View Biển Đẹp Khu Đô Thị An Viên', 'slug' => 'biet-thu-view-bien-dep-an-vien', 'category' => 'nha-o', 'category_label' => 'Nhà Ở / Biệt Thự', 'price' => '25,000,000,000 đ', 'area' => '350 m²', 'bedrooms' => 4, 'bathrooms' => 4, 'direction' => 'Đông Nam', 'location' => 'KĐT An Viên, Phường Vĩnh Trường, TP. Nha Trang, Khánh Hòa', 'city' => 'Nha Trang', 'badge' => 'MỚI', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'description' => 'Biệt thự nghỉ dưỡng mặt biển cao cấp với hồ bơi vô cực tràn bờ, sân vườn xanh mát và bến đỗ du thuyền riêng biệt.' ],
      [ 'id' => 2, 'title' => 'Biệt Thự An Viên Nha Trang Có Hồ Bơi Riêng Biệt Lập', 'slug' => 'biet-thu-an-vien-nha-trang-ho-boi-rieng', 'category' => 'nha-cho-thue', 'category_label' => 'Nhà Cho Thuê', 'price' => '2,500,000,000 đ / Năm', 'area' => '280 m²', 'bedrooms' => 4, 'bathrooms' => 4, 'direction' => 'Nam', 'location' => 'Đường Số 1, KĐT An Viên, TP. Nha Trang', 'city' => 'Nha Trang', 'badge' => 'HOT', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'description' => 'Căn biệt thự thiết kế hiện đại trang bị đầy đủ tiện nghi tiêu chuẩn 5 sao, phục vụ nghỉ dưỡng gia đình hoặc khai thác cho thuê du lịch cao cấp.' ],
      [ 'id' => 3, 'title' => 'Biệt Thự Hoa Thiên — Phan Thiết Sát Biển Mũi Né', 'slug' => 'biet-thu-hoa-thien-phan-thiet', 'category' => 'nha-o', 'category_label' => 'Biệt Thự Biển', 'price' => '1,500,000,000 đ / Đợt 1', 'area' => '320 m²', 'bedrooms' => 3, 'bathrooms' => 3, 'direction' => 'Đông', 'location' => 'Đường Huỳnh Thúc Kháng, TP. Phan Thiết, Bình Thuận', 'city' => 'Phan Thiết', 'badge' => 'GIÁ TỐT', 'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'description' => 'Nằm trong quần thể nghỉ dưỡng biển Hoa Thiên Phan Thiết, liền kề đồi cát bay và bãi biển cát trắng mịn màng.' ],
      [ 'id' => 4, 'title' => 'Biệt Thự Cô Liên — Đà Lạt Phong Cách Cổ Điển Pháp', 'slug' => 'biet-thu-co-lien-da-lat', 'category' => 'nha-o', 'category_label' => 'Biệt Thự Đồi', 'price' => '25,000,000,000 đ', 'area' => '450 m²', 'bedrooms' => 5, 'bathrooms' => 5, 'direction' => 'Tây Nam', 'location' => 'Đường Trần Hưng Đạo, Phường 10, TP. Đà Lạt, Lâm Đồng', 'city' => 'Đà Lạt', 'badge' => 'VIP', 'image' => 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', 'description' => 'Dinh thự mang đậm phong cách kiến trúc Pháp cổ ẩn mình giữa rừng thông bạt ngàn ngắm toàn cảnh thung lũng sương mù.' ],
      [ 'id' => 5, 'title' => 'Biệt Thự Thành Thành — Đà Nẵng Cạnh Cầu Rồng Sông Hàn', 'slug' => 'biet-thu-thanh-thanh-da-nang', 'category' => 'nha-o', 'category_label' => 'Nhà Phố / Biệt Thự', 'price' => '21,000,000,000 đ', 'area' => '260 m²', 'bedrooms' => 4, 'bathrooms' => 4, 'direction' => 'Đông Bắc', 'location' => 'Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng', 'city' => 'Đà Nẵng', 'badge' => 'MỚI', 'image' => 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80', 'description' => 'Vị trí đắc địa ngay trung tâm thành phố Đà Nẵng, thiết kế 3 tầng hiện đại sang trọng, thuận tiện kinh doanh hoặc làm văn phòng đại diện.' ],
      [ 'id' => 6, 'title' => 'Biệt Thự Hướng Biển — Phan Thiết View Hoàng Hôn', 'slug' => 'biet-thu-huong-bien-phan-thiet', 'category' => 'nha-o', 'category_label' => 'Biệt Thự Biển', 'price' => '19,500,000,000 đ', 'area' => '380 m²', 'bedrooms' => 4, 'bathrooms' => 4, 'direction' => 'Tây', 'location' => 'Đường Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết', 'city' => 'Phan Thiết', 'badge' => 'HOT', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'description' => 'Tọa lạc tại thủ phủ resort Mũi Né, ban công lớn đón gió biển trong lành, thích hợp làm villa nghỉ dưỡng gia đình.' ]
    ];
}

$phone_clean1 = preg_replace("/[^0-9]/", "", $company_info['phone1']);
$phone_clean2 = preg_replace("/[^0-9]/", "", $company_info['phone2']);

function out($key) {
    global $company_info;
    echo htmlspecialchars($company_info[$key] ?? '');
}
?>
"""

js_replace_pattern = r'const BDS05_PROPERTIES = \[.*?\];'
js_replacement = """const BDS05_PROPERTIES = <?php
    $js_projects = array_map(function($p) {
        return [
            'id' => (int)$p['id'],
            'title' => $p['title'],
            'slug' => $p['slug'],
            'category' => $p['category'],
            'categoryLabel' => $p['category_label'] ?? $p['categoryLabel'] ?? '',
            'price' => $p['price'],
            'area' => $p['area'],
            'bedrooms' => (int)$p['bedrooms'],
            'bathrooms' => (int)$p['bathrooms'],
            'direction' => $p['direction'],
            'location' => $p['location'],
            'city' => $p['city'],
            'badge' => $p['badge'],
            'image' => $p['image'],
            'desc' => $p['description'] ?? $p['desc'] ?? '',
            'gallery' => [
                 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
                 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
            ]
        ];
    }, $projects);
    echo json_encode($js_projects, JSON_UNESCAPED_UNICODE);
?>;"""
content = re.sub(js_replace_pattern, js_replacement, content, flags=re.DOTALL)

with open(php_path, 'w', encoding='utf-8') as f:
    f.write(php_header + content)

sql_content = """CREATE DATABASE IF NOT EXISTS bds_05;
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
"""
with open(sql_path, 'w', encoding='utf-8') as f:
    f.write(sql_content)

api_content = """<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = isset($_POST['fullName']) ? htmlspecialchars($_POST['fullName']) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';
    $product_type = isset($_POST['product_type']) ? htmlspecialchars($_POST['product_type']) : '';
    $source = isset($_POST['source']) ? htmlspecialchars($_POST['source']) : '';

    if (empty($fullName) || empty($phone)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Name and phone are required"]);
        exit;
    }

    echo json_encode(["status" => "success", "message" => "Cảm ơn $fullName! Chúng tôi sẽ liên hệ lại sớm nhất."]);
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
"""
with open(api_path, 'w', encoding='utf-8') as f:
    f.write(api_content)
