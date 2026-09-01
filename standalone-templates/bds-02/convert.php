<?php
$htmlFile = 'e:\BĐS Template\standalone-templates\bds-02\html\index.html';
$phpFile = 'e:\BĐS Template\standalone-templates\bds-02\php\index.php';
$html = file_get_contents($htmlFile);

$phpHeader = '<?php
require_once "config/db.php";

$company_info = [
    "name" => "TEMPLATESBDS",
    "phone" => "0919 006 030",
    "email" => "ntrungz0704@gmail.com",
    "address" => "180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội",
    "slogan" => "Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam",
    "zalo" => "0919006030"
];

if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company_info = array_merge($company_info, $row);
        }
    } catch (PDOException $e) {}
}

$phone_clean = preg_replace("/[^0-9]/", "", $company_info["phone"]);

$projects = [];
if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM projects");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $projects[] = $row;
        }
    } catch (PDOException $e) {}
}

if (empty($projects)) {
    $projects = [
        [
            "id" => 1, "title" => "Bán nhà mặt tiền 3.5 tầng đường Nguyễn Tri Phương, Quận Thanh Khê", "category" => "nha-mat-tien", "type" => "Nhà mặt tiền", "price" => "7.5 Tỷ VNĐ", "priceNum" => 7.5, "area" => "95 m²", "areaNum" => 95, "location" => "Đường Nguyễn Tri Phương, Phường Chính Gián, Quận Thanh Khê, Đà Nẵng", "district" => "Thanh Khê", "bedrooms" => 4, "bathrooms" => 4, "direction" => "Đông Nam", "legal" => "Sổ hồng chính chủ, hoàn công đầy đủ", "image" => "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", "gallery" => "[\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80\",\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80\",\"https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80\"]", "date" => "28/08/2026", "featured" => true, "description" => "Nhà mặt tiền vị trí đắc địa kinh doanh sầm uất ngay trung tâm Thanh Khê, thiết kế 3.5 tầng hiện đại, vỉa hè 5m rộng rãi, thích hợp mở văn phòng, spa hoặc cho thuê nguyên căn dòng tiền 30 triệu/tháng.", "author_name" => "Nguyễn Văn Tuấn", "author_phone" => "0972.939.888", "author_zalo" => "0972939888", "author_avatar" => "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
        ],
        [
            "id" => 2, "title" => "Biệt thự sân vườn đẳng cấp khu Euro Village 1 ven sông Hàn, Sơn Trà", "category" => "biet-thu", "type" => "Biệt thự", "price" => "28.5 Tỷ VNĐ", "priceNum" => 28.5, "area" => "250 m²", "areaNum" => 250, "location" => "Khu Đô Thị Euro Village 1, Phường An Hải Tây, Quận Sơn Trà, Đà Nẵng", "district" => "Sơn Trà", "bedrooms" => 5, "bathrooms" => 6, "direction" => "Tây Bắc", "legal" => "Sổ đỏ vĩnh viễn, pháp lý chuẩn", "image" => "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "gallery" => "[\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80\",\"https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200&q=80\",\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80\"]", "date" => "27/08/2026", "featured" => true, "description" => "Biệt thự làng Châu Âu ven sông Hàn đẳng cấp thượng lưu, có hồ bơi riêng, sân vườn tiểu cảnh xanh mát, full nội thất gỗ cao cấp nhập khẩu Ý, an ninh khép kín 24/7.", "author_name" => "Trần Thị Thu Hà", "author_phone" => "0905.123.456", "author_zalo" => "0905123456", "author_avatar" => "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
        ],
        [
            "id" => 3, "title" => "Bán nhà ngõ ô tô tránh đường Phan Chu Trinh, Quận Hải Châu", "category" => "nha-ngo-hem", "type" => "Nhà ngõ, hẻm", "price" => "4.95 Tỷ VNĐ", "priceNum" => 4.95, "area" => "68 m²", "areaNum" => 68, "location" => "Kiệt Phan Chu Trinh, Phường Phước Ninh, Quận Hải Châu, Đà Nẵng", "district" => "Hải Châu", "bedrooms" => 3, "bathrooms" => 3, "direction" => "Chính Nam", "legal" => "Sổ đỏ trao tay, công chứng ngay", "image" => "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", "gallery" => "[\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80\",\"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80\",\"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80\"]", "date" => "26/08/2026", "featured" => true, "description" => "Nhà đẹp 3 tầng kiên cố trung tâm Hải Châu, kiệt 5m ô tô thông tứ phía ra đường lớn, dân trí cao, gần trường học các cấp và chợ Hàn chỉ 3 phút đi bộ.", "author_name" => "Lê Hoàng Long", "author_phone" => "0935.888.999", "author_zalo" => "0935888999", "author_avatar" => "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
        ],
        [
            "id" => 4, "title" => "Tòa nhà căn hộ dịch vụ 5 tầng cho thuê dòng tiền đường Lê Duẩn, Thanh Khê", "category" => "phong-tro", "type" => "Phòng trọ", "price" => "9.2 Tỷ VNĐ", "priceNum" => 9.2, "area" => "110 m²", "areaNum" => 110, "location" => "Đường Lê Duẩn, Phường Tân Chính, Quận Thanh Khê, Đà Nẵng", "district" => "Thanh Khê", "bedrooms" => 10, "bathrooms" => 10, "direction" => "Đông Bắc", "legal" => "Sổ hồng hoàn công tòa nhà 5 tầng", "image" => "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", "gallery" => "[\"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80\",\"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80\"]", "date" => "25/08/2026", "featured" => false, "description" => "Tòa nhà căn hộ gồm 10 phòng studio full nội thất đang cho khách nước ngoài và nhân viên văn phòng thuê kín 100%, doanh thu đều đặn 45 triệu/tháng.", "author_name" => "Nguyễn Văn Tuấn", "author_phone" => "0972.939.888", "author_zalo" => "0972939888", "author_avatar" => "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
        ],
        [
            "id" => 5, "title" => "Bán nhà mặt tiền đường Võ Văn Kiệt view biển Mỹ Khê, Quận Sơn Trà", "category" => "nha-mat-tien", "type" => "Nhà mặt tiền", "price" => "22.0 Tỷ VNĐ", "priceNum" => 22.0, "area" => "125 m²", "areaNum" => 125, "location" => "Đại lộ Võ Văn Kiệt, Phường Phước Mỹ, Quận Sơn Trà, Đà Nẵng", "district" => "Sơn Trà", "bedrooms" => 6, "bathrooms" => 6, "direction" => "Chính Đông", "legal" => "Sổ đỏ chính chủ lâu dài", "image" => "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", "gallery" => "[\"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80\",\"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80\"]", "date" => "24/08/2026", "featured" => true, "description" => "Trục đường du lịch tỷ đô sầm uất bậc nhất Đà Nẵng, cách bãi biển Mỹ Khê chỉ 200m. Thích hợp kinh doanh khách sạn mini, nhà hàng hải sản hoặc showroom.", "author_name" => "Trần Thị Thu Hà", "author_phone" => "0905.123.456", "author_zalo" => "0905123456", "author_avatar" => "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
        ],
        [
            "id" => 6, "title" => "Biệt thự song lập phong cách Tân Cổ Điển KĐT Nam Hòa Xuân, Ngũ Hành Sơn", "category" => "biet-thu", "type" => "Biệt thự", "price" => "14.8 Tỷ VNĐ", "priceNum" => 14.8, "area" => "180 m²", "areaNum" => 180, "location" => "KĐT Sinh Thái Nam Hòa Xuân, Phường Hòa Quý, Quận Ngũ Hành Sơn, Đà Nẵng", "district" => "Ngũ Hành Sơn", "bedrooms" => 4, "bathrooms" => 5, "direction" => "Đông Nam", "legal" => "Sổ hồng sở hữu lâu dài", "image" => "https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=800&q=80", "gallery" => "[\"https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80\",\"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80\"]", "date" => "23/08/2026", "featured" => false, "description" => "Biệt thự 3 tầng xây thô hoàn thiện mặt ngoài, view công viên hồ sinh thái, hạ tầng đồng bộ, kết nối thẳng về trung tâm thành phố qua cầu Minh Mạng.", "author_name" => "Lê Hoàng Long", "author_phone" => "0935.888.999", "author_zalo" => "0935888999", "author_avatar" => "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
        ]
    ];
}

$js_projects = array_map(function($p) {
    return [
        "id" => (int)$p["id"],
        "title" => $p["title"],
        "category" => $p["category"],
        "type" => $p["type"],
        "price" => $p["price"],
        "priceNum" => (float)$p["priceNum"],
        "area" => $p["area"],
        "areaNum" => (float)$p["areaNum"],
        "location" => $p["location"],
        "district" => $p["district"],
        "bedrooms" => (int)$p["bedrooms"],
        "bathrooms" => (int)$p["bathrooms"],
        "direction" => $p["direction"],
        "legal" => $p["legal"],
        "image" => $p["image"],
        "gallery" => is_string($p["gallery"]) ? json_decode($p["gallery"]) : $p["gallery"],
        "date" => $p["date"],
        "featured" => (bool)$p["featured"],
        "desc" => isset($p["description"]) ? $p["description"] : (isset($p["desc"]) ? $p["desc"] : ""),
        "author" => [
            "name" => isset($p["author_name"]) ? $p["author_name"] : "",
            "phone" => isset($p["author_phone"]) ? $p["author_phone"] : "",
            "zalo" => isset($p["author_zalo"]) ? $p["author_zalo"] : "",
            "avatar" => isset($p["author_avatar"]) ? $p["author_avatar"] : ""
        ]
    ];
}, $projects);
$js_projects_json = json_encode($js_projects, JSON_UNESCAPED_UNICODE);
?>
';

$html = preg_replace('/const BDS02_PROPERTIES = \[.*?\];/s', 'const BDS02_PROPERTIES = <?= $js_projects_json ?>;', $html);
$html = str_replace('>TEMPLATESBDS<', '><?= htmlspecialchars($company_info[\'name\']) ?><', $html);
$html = str_replace('Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam', '<?= htmlspecialchars($company_info[\'slogan\']) ?>', $html);
$html = str_replace('0919 006 030', '<?= htmlspecialchars($company_info[\'phone\']) ?>', $html);
$html = str_replace('0919006030', '<?= htmlspecialchars($phone_clean) ?>', $html);
$html = str_replace('ntrungz0704@gmail.com', '<?= htmlspecialchars($company_info[\'email\']) ?>', $html);
$html = str_replace('180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội', '<?= htmlspecialchars($company_info[\'address\']) ?>', $html);
$html = str_replace('admin@templatesbds.com', '<?= htmlspecialchars($company_info[\'email\']) ?>', $html);

@mkdir(dirname($phpFile), 0777, true);
file_put_contents($phpFile, $phpHeader . $html);
echo "PHP File Generated\n";
