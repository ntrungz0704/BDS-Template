<?php
require_once 'config/db.php';

$companyData = null;
$initialPropertiesData = null;
$rentPropertiesData = null;

if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        $row = $stmt->fetch();
        if ($row) {
            $companyData = [
                'name' => htmlspecialchars($row['name']),
                'phone' => htmlspecialchars($row['phone']),
                'email' => htmlspecialchars($row['email']),
                'social' => [
                    'facebook' => htmlspecialchars($row['facebook']),
                    'youtube' => htmlspecialchars($row['youtube'])
                ]
            ];
        }

        $stmt = $pdo->query("SELECT * FROM projects");
        $projects = $stmt->fetchAll();
        $initProps = [];
        $rentProps = [];
        foreach ($projects as $p) {
            $prop = [
                'id' => (int)$p['id'],
                'title' => htmlspecialchars($p['title']),
                'slug' => htmlspecialchars($p['slug']),
                'price' => htmlspecialchars($p['price']),
                'priceNum' => (float)$p['price_num'],
                'priceUnit' => htmlspecialchars($p['price_unit']),
                'pricePerM2' => htmlspecialchars($p['price_per_m2']),
                'location' => htmlspecialchars($p['location']),
                'ward' => htmlspecialchars($p['ward'] ?? ''),
                'district' => htmlspecialchars($p['district'] ?? ''),
                'city' => htmlspecialchars($p['city'] ?? ''),
                'bedrooms' => htmlspecialchars($p['bedrooms']),
                'bathrooms' => htmlspecialchars($p['bathrooms']),
                'area' => htmlspecialchars($p['area']),
                'areaNum' => (float)$p['area_num'],
                'direction' => htmlspecialchars($p['direction'] ?? ''),
                'floor' => htmlspecialchars($p['floor'] ?? ''),
                'type' => htmlspecialchars($p['type']),
                'category' => htmlspecialchars($p['category']),
                'discount' => htmlspecialchars($p['discount'] ?? ''),
                'image' => htmlspecialchars($p['image']),
                'gallery' => json_decode($p['gallery'] ?: '[]'),
                'desc' => htmlspecialchars($p['description']),
                'detailedContent' => htmlspecialchars($p['detailed_content']),
                'features' => json_decode($p['features'] ?: '[]'),
                'legal' => htmlspecialchars($p['legal']),
                'furniture' => htmlspecialchars($p['furniture']),
                'handover' => htmlspecialchars($p['handover']),
                'mapEmbedUrl' => $p['map_embed_url'],
                'author' => [
                    'name' => htmlspecialchars($p['author_name']),
                    'phone' => htmlspecialchars($p['author_phone']),
                    'zalo' => htmlspecialchars($p['author_zalo']),
                    'avatar' => htmlspecialchars($p['author_avatar']),
                    'role' => htmlspecialchars($p['author_role'])
                ]
            ];
            if ($p['category'] === 'ban') {
                $initProps[] = $prop;
            } else {
                $rentProps[] = $prop;
            }
        }
        if (!empty($initProps)) $initialPropertiesData = $initProps;
        if (!empty($rentProps)) $rentPropertiesData = $rentProps;
    } catch (Exception $e) {}
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kho Mẫu Website Bất Động Sản</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    </style>
</head>
<body class="bg-[#F8FAFC] text-slate-800 antialiased min-h-screen flex flex-col relative">

    <div id="app" class="flex-1 flex flex-col w-full"></div>

    <script>
        const INITIAL_PROPERTIES = <?php echo !empty($initialPropertiesData) ? json_encode($initialPropertiesData) : '[
          {
            id: 1,
            title: 'Biệt thự sân vườn sát sân bay Nội Bài view hồ sinh thái',
            slug: 'biet-thu-san-vuon-sat-san-bay-noi-bai',
            price: '12.500.000.000 đồng',
            priceNum: 12.5,
            priceUnit: 'Tỷ',
            pricePerM2: '125 tr/m²',
            location: '275 xã Phú Minh, Huyện Sóc Sơn, Hà Nội',
            ward: 'Phú Minh',
            district: 'Sóc Sơn',
            city: 'Hà Nội',
            bedrooms: '04',
            bathrooms: '04',
            area: '100 m²',
            areaNum: 100,
            direction: 'Đông Nam',
            type: 'Biệt thự',
            category: 'ban',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
              'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
              'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
            ],
            desc: 'Biệt thự vườn phong cách nghỉ dưỡng ven hồ, không gian yên tĩnh thoáng mát, sân vườn cây ăn trái, hồ cá Koi và bể bơi riêng biệt.',
            detailedContent: 'Biệt thự được thiết kế theo phong cách Indochine kết hợp hiện đại, toàn bộ nội thất bằng gỗ gõ đỏ và đá marble tự nhiên. Khuôn viên rộng 250m² bao gồm sân đỗ xe 2 ô tô, khu nướng BBQ ngoài trời, và hồ cá Koi nhập khẩu. Vị trí đắc địa cách sân bay quốc tế Nội Bài chỉ 5 phút di chuyển, rất thuận tiện cho doanh nhân và chuyên gia quốc tế.',
            features: ['Hồ bơi riêng', 'Hồ cá Koi', 'Gara 2 ô tô', 'Sân vườn 150m²', 'An ninh 24/7', 'Sát mặt hồ'],
            legal: 'Sổ đỏ chính chủ, sẵn sàng công chứng ngay',
            furniture: 'Đầy đủ nội thất cao cấp nhập khẩu',
            handover: 'Nhận nhà ở ngay',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Soc+Son+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Nguyễn Thanh Tùng', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', role: 'Chuyên viên BĐS Cao Cấp' }
          },
          {
            id: 2,
            title: 'Căn hộ Opal Skyview mặt tiền Phạm Văn Đồng view sông Sài Gòn',
            slug: 'can-ho-opal-skyview',
            price: '5.500.000.000 đồng',
            priceNum: 5.5,
            priceUnit: 'Tỷ',
            pricePerM2: '78 tr/m²',
            location: 'Đại lộ Phạm Văn Đồng, Phường 13, Quận Bình Thạnh, TP. Hồ Chí Minh',
            ward: 'Phường 13',
            district: 'Bình Thạnh',
            city: 'TP. Hồ Chí Minh',
            bedrooms: '02',
            bathrooms: '02',
            area: '70.5 m²',
            areaNum: 70.5,
            direction: 'Nam',
            floor: 'Tầng 18',
            type: 'Căn hộ',
            category: 'ban',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
              'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
            ],
            desc: 'Căn hộ view sông thoáng đãng mặt tiền Phạm Văn Đồng, thuận tiện di chuyển sân bay Tân Sơn Nhất và trung tâm Quận 1 chỉ 10 phút.',
            detailedContent: 'Căn hộ tầng cao thoáng mát, ban công hướng Nam ngắm trọn sông Sài Gòn và Landmark 81. Dự án tích hợp đầy đủ tiện ích: Hồ bơi tràn bờ, phòng gym tiêu chuẩn quốc tế, khu vui chơi trẻ em và siêu thị mini ngay tầng trệt.',
            features: ['Hồ bơi vô cực', 'View sông Sài Gòn', 'Phòng Gym & Yoga', 'Thẻ từ thang máy', 'Ban công rộng'],
            legal: 'Sổ hồng lâu dài',
            furniture: 'Nội thất nhập khẩu thông minh',
            handover: 'Bàn giao hoàn thiện cơ bản',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Binh+Thanh+Ho+Chi+Minh&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Lê Hoàng Nam', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&q=80', role: 'Trưởng Phòng Kinh Doanh' }
          },
          {
            id: 3,
            title: 'Căn hộ Star Wish PentHouse sân golf Long Biên',
            slug: 'can-ho-star-wish-penthouse',
            price: '15.450.000.000 đồng',
            priceNum: 15.45,
            priceUnit: 'Tỷ',
            pricePerM2: '96 tr/m²',
            location: 'Đường Cổ Linh, Phường Thạch Bàn, Quận Long Biên, Hà Nội',
            ward: 'Thạch Bàn',
            district: 'Long Biên',
            city: 'Hà Nội',
            bedrooms: '03',
            bathrooms: '03',
            area: '160 m²',
            areaNum: 160,
            direction: 'Đông Nam',
            floor: 'Tầng 32 (Penthouse)',
            type: 'Căn hộ',
            category: 'ban',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
            ],
            desc: 'Căn hộ Penthouse thông tầng đẳng cấp ôm trọn tầm nhìn sân Golf Long Biên và sông Hồng. Sân vườn BBQ rộng rãi trên tầng thượng.',
            detailedContent: 'Kiệt tác Penthouse trên cao với thiết kế trần cao 6.5m, cửa kính tràn viền Low-E cách âm cách nhiệt. Sân thượng riêng rộng 45m² thích hợp tổ chức tiệc cocktail và BBQ gia đình cuối tuần.',
            features: ['Penthouse thông tầng', 'View sân Golf 36 lỗ', 'Thang máy thẻ VIP', 'Hầm rượu mini', 'Smart Home 4.0'],
            legal: 'Sổ đỏ lâu dài',
            furniture: 'Full nội thất hạng sang chuẩn châu Âu',
            handover: 'Bàn giao ngay',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Long+Bien+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Nguyễn Thanh Tùng', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', role: 'Chuyên viên BĐS Cao Cấp' }
          },
          {
            id: 4,
            title: 'Căn hộ The Art trung tâm Quận 1 phong cách Indochine',
            slug: 'can-ho-the-art',
            price: '3.999.000.000 đồng',
            priceNum: 3.999,
            priceUnit: 'Tỷ',
            pricePerM2: '80 tr/m²',
            location: 'Số 20 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP.HCM',
            ward: 'Đa Kao',
            district: 'Quận 1',
            city: 'TP. Hồ Chí Minh',
            bedrooms: '01',
            bathrooms: '01',
            area: '50 m²',
            areaNum: 50,
            direction: 'Đông',
            floor: 'Tầng 08',
            type: 'Căn hộ',
            category: 'ban',
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
              'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
            ],
            desc: 'Căn hộ nghệ thuật trung tâm Quận 1 thiết kế Indochine tinh tế, phù hợp cho chuyên gia nước ngoài và kinh doanh Airbnb sinh lời cao.',
            detailedContent: 'Vị trí đắc địa ngay trung tâm Quận 1, thuận tiện di chuyển tới phố đi bộ Nguyễn Huệ, Nhà hát Thành Phố và Thảo Cầm Viên chỉ 5 phút đi bộ.',
            features: ['Trung tâm Quận 1', 'Dòng tiền 25tr/tháng', 'Nội thất cổ điển Indochine', 'Bảo vệ 24/7'],
            legal: 'Sổ hồng trao tay',
            furniture: 'Nội thất phong cách Vintage',
            handover: 'Bàn giao ngay kèm hợp đồng thuê',
            mapEmbedUrl: 'https://maps.google.com/maps?q=District+1+Ho+Chi+Minh&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Lê Hoàng Nam', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&q=80', role: 'Trưởng Phòng Kinh Doanh' }
          },
          {
            id: 5,
            title: 'Chung cư Lux Luxury Golden Silk Nam Từ Liêm',
            slug: 'chung-cu-lux-luxury-golden-silk-nam-tu-liem',
            price: '6.000.000.000 đồng',
            priceNum: 6.0,
            priceUnit: 'Tỷ',
            pricePerM2: '58 tr/m²',
            location: 'KĐT Cổ Nhuế 1, Quận Nam Từ Liêm, Hà Nội',
            ward: 'Cổ Nhuế 1',
            district: 'Nam Từ Liêm',
            city: 'Hà Nội',
            bedrooms: '03',
            bathrooms: '02',
            area: '103 m²',
            areaNum: 103,
            direction: 'Tây Nam',
            floor: 'Tầng 12',
            type: 'Chung cư',
            category: 'ban',
            discount: '-40% Chiết khấu',
            image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
            ],
            desc: 'Căn hộ cao cấp Golden Silk thiết kế sang trọng, tầm nhìn panorama công viên xanh, tiện ích đồng bộ hồ bơi bốn mùa và TTTM hiện đại.',
            detailedContent: 'Tọa lạc tại cửa ngõ phía Tây thủ đô, dự án Golden Silk mang tới môi trường sống văn minh, hệ thống trường học quốc tế liên cấp ngay trong khuôn viên đô thị.',
            features: ['Công viên nội khu', 'Hồ bơi 4 mùa', 'TTTM 3 tầng', 'Trường học liên cấp'],
            legal: 'Sổ đỏ sở hữu lâu dài',
            furniture: 'Đầy đủ nội thất nhập khẩu Đức',
            handover: 'Bàn giao Quý 4/2026',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Nam+Tu+Liem+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Nguyễn Thanh Tùng', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', role: 'Chuyên viên BĐS Cao Cấp' }
          },
          {
            id: 6,
            title: 'Chung cư Platium Luxury Center Park Trần Duy Hưng',
            slug: 'chung-cu-platium-luxury-center-park-tran-duy-hung',
            price: '7.899.000.000 đồng',
            priceNum: 7.899,
            priceUnit: 'Tỷ',
            pricePerM2: '85 tr/m²',
            location: '119 Trần Duy Hưng, Phường Trung Hòa, Cầu Giấy, Hà Nội',
            ward: 'Trung Hòa',
            district: 'Cầu Giấy',
            city: 'Hà Nội',
            bedrooms: '02',
            bathrooms: '02',
            area: '92.8 m²',
            areaNum: 92.8,
            direction: 'Đông Nam',
            floor: 'Tầng 25',
            type: 'Chung cư',
            category: 'ban',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
              'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
            ],
            desc: 'Vị trí kim cương ngã tư Trần Duy Hưng - Hoàng Minh Giám, kết nối trực tiếp Metro và công viên hồ điều hòa Nhân Chính.',
            detailedContent: 'Tổ hợp chung cư cao cấp Platinum Center Park sở hữu vị trí vàng đắc địa nhất quận Cầu Giấy.',
            features: ['Sát công viên hồ 13ha', 'Kết nối trực tiếp Ga Metro', 'Tầng hầm đỗ xe thông minh', 'Sảnh đón 5 sao'],
            legal: 'Sổ hồng chính chủ',
            furniture: 'Nội thất Da Bò Ý cao cấp',
            handover: 'Nhận nhà ở ngay',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Cau+Giay+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Nguyễn Thanh Tùng', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', role: 'Chuyên viên BĐS Cao Cấp' }
          },
          {
            id: 7,
            title: 'Chung cư Vinhomes Green Bay Mễ Trì',
            slug: 'chung-cu-vinhomes-green-bay',
            price: '8.900.000.000 đồng',
            priceNum: 8.9,
            priceUnit: 'Tỷ',
            pricePerM2: '74 tr/m²',
            location: 'Số 7 Đại lộ Thăng Long, Phường Mễ Trì, Nam Từ Liêm, Hà Nội',
            ward: 'Mễ Trì',
            district: 'Nam Từ Liêm',
            city: 'Hà Nội',
            bedrooms: '04',
            bathrooms: '03',
            area: '120 m²',
            areaNum: 120,
            direction: 'Đông Nam',
            floor: 'Tầng 15 (Căn góc)',
            type: 'Chung cư',
            category: 'ban',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
            ],
            desc: 'Căn hộ góc 4PN Vinhomes Green Bay view trọn vẹn vịnh xanh 8ha. Môi trường sống xanh lý tưởng bậc nhất phía Tây thủ đô.',
            detailedContent: 'Căn hộ góc 3 mặt thoáng tại tòa G1 Vinhomes Green Bay.',
            features: ['Hồ điều hòa 8ha', 'Đường chạy bộ 3.6km', 'Clubhouse sang trọng', 'Trường Vinschool'],
            legal: 'Sổ hồng vĩnh viễn',
            furniture: 'Hoàn thiện cao cấp liền tường',
            handover: 'Nhận nhà ở ngay',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Vinhomes+Green+Bay+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Nguyễn Thanh Tùng', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', role: 'Chuyên viên BĐS Cao Cấp' }
          },
          {
            id: 8,
            title: 'Chung cư Vinhomes Symphony KĐT Vinhomes Riverside',
            slug: 'chung-cu-vinhomes-symphony',
            price: '17.999.000.000 đồng',
            priceNum: 17.999,
            priceUnit: 'Tỷ',
            pricePerM2: '138 tr/m²',
            location: 'Đường Chu Huy Mân, Phường Phúc Đồng, Long Biên, Hà Nội',
            ward: 'Phúc Đồng',
            district: 'Long Biên',
            city: 'Hà Nội',
            bedrooms: '04',
            bathrooms: '03',
            area: '130 m²',
            areaNum: 130,
            direction: 'Đông Bắc',
            floor: 'Tầng 10',
            type: 'Chung cư',
            category: 'ban',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            gallery: [
              'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
              'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
            ],
            desc: 'Căn hộ cao cấp Symphony đối diện TTTM Vincom Plaza Long Biên. Tận hưởng toàn bộ tiện ích đại đô thị Vinhomes Riverside.',
            detailedContent: 'Căn hộ 4 phòng ngủ sang trọng bậc nhất tại Symphony.',
            features: ['Đối diện Vincom Plaza', 'Hưởng trọn tiện ích Riverside', 'Bể bơi resort ngoài trời', 'Sân tennis & bóng rổ'],
            legal: 'Sổ hồng chính chủ',
            furniture: 'Full nội thất nhập khẩu Đức',
            handover: 'Bàn giao ngay',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Vinhomes+Riverside+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Nguyễn Thanh Tùng', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', role: 'Chuyên viên BĐS Cao Cấp' }
          }
        ]'; ?>;

        const RENT_PROPERTIES = <?php echo !empty($rentPropertiesData) ? json_encode($rentPropertiesData) : '[
          {
            id: 101,
            title: 'Cho thuê căn hộ 2PN Vinhomes Metropolis Ba Đình view Hồ Tây',
            slug: 'cho-thue-can-ho-vinhomes-metropolis',
            price: '28.000.000 đồng/tháng',
            priceNum: 28,
            priceUnit: 'Triệu/tháng',
            pricePerM2: '340k/m²',
            location: '29 Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội',
            ward: 'Ngọc Khánh',
            district: 'Ba Đình',
            city: 'Hà Nội',
            bedrooms: '02',
            bathrooms: '02',
            area: '82 m²',
            areaNum: 82,
            direction: 'Đông Nam',
            type: 'Căn hộ',
            category: 'thue',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
            gallery: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
            desc: 'Căn hộ tầng trung view trọn hồ Tây, đầy đủ nội thất sang trọng, lễ tân 24/7.',
            detailedContent: 'Căn hộ cho thuê tiêu chuẩn đại sứ quán tại Metropolis Liễu Giai.',
            features: ['View 4 hồ lớn Hà Nội', 'Lễ tân 24/7', 'Bể bơi tầng mái', 'TTTM Vincom Center'],
            legal: 'Hợp đồng thuê linh hoạt từ 6 - 12 tháng',
            furniture: 'Full nội thất cao cấp',
            handover: 'Dọn vào ở ngay',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Vinhomes+Metropolis+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Nguyễn Thanh Tùng', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', role: 'Chuyên viên BĐS Cao Cấp' }
          },
          {
            id: 102,
            title: 'Cho thuê biệt thự sân vườn Vinhomes Riverside có hồ bơi riêng',
            slug: 'cho-thue-biet-thu-vinhomes-riverside',
            price: '65.000.000 đồng/tháng',
            priceNum: 65,
            priceUnit: 'Triệu/tháng',
            pricePerM2: '260k/m²',
            location: 'Đường Hoa Phượng, KĐT Vinhomes Riverside, Long Biên, Hà Nội',
            ward: 'Phúc Lợi',
            district: 'Long Biên',
            city: 'Hà Nội',
            bedrooms: '04',
            bathrooms: '05',
            area: '250 m²',
            areaNum: 250,
            direction: 'Nam',
            type: 'Biệt thự',
            category: 'thue',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'],
            desc: 'Biệt thự đơn lập hướng sông có sân vườn rộng và hồ bơi cho chuyên gia.',
            detailedContent: 'Biệt thự vườn sát sông sinh thái, bảo vệ an ninh 4 lớp nghiêm ngặt.',
            features: ['Sát sông sinh thái', 'Hồ bơi riêng', 'Sân vườn 120m²', 'An ninh 4 lớp'],
            legal: 'HĐ thuê dài hạn có xuất hóa đơn VAT',
            furniture: 'Đầy đủ nội thất nhập khẩu',
            handover: 'Dọn vào ở ngay',
            mapEmbedUrl: 'https://maps.google.com/maps?q=Vinhomes+Riverside+Hanoi&t=&z=13&ie=UTF8&iwloc=&output=embed',
            author: { name: 'Nguyễn Thanh Tùng', phone: '0905.56.xxxx', zalo: '0905560000', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&q=80', role: 'Chuyên viên BĐS Cao Cấp' }
          }
        ]'; ?>;

        const CITIES = [
          { id: 1, name: 'HÀ NỘI', cityCode: 'Hà Nội', count: '18 dự án', image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800&q=80' },
          { id: 2, name: 'ĐÀ NẴNG', cityCode: 'Đà Nẵng', count: '15 dự án', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80' },
          { id: 3, name: 'TP. HỒ CHÍ MINH', cityCode: 'TP. Hồ Chí Minh', count: '32 dự án', image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80' },
          { id: 4, name: 'HẢI PHÒNG', cityCode: 'Hải Phòng', count: '12 dự án', image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800&q=80' },
          { id: 5, name: 'NHA TRANG', cityCode: 'Nha Trang', count: '10 dự án', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
          { id: 6, name: 'CẦN THƠ', cityCode: 'Cần Thơ', count: '8 dự án', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80' },
        ];

        const NEWS_ARTICLES = [
          {
            id: 1,
            title: '9 đại kỵ trong phong thủy nhà ở và cách hóa giải đơn giản không phải ai cũng biết',
            slug: '9-dai-ky-trong-phong-thuy-nha-o-va-cach-hoa-giai',
            date: '28/08/2026',
            author: 'Chuyên gia Phong Thủy BĐS',
            category: 'Phong thủy nhà đất',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            desc: 'Đây đều là những lỗi sai cơ bản trong phong thủy nhà ở mà hầu như gia chủ nào cũng từng mắc phải khiến tài lộc hao hụt...',
            content: [
              'Phong thủy nhà ở là một trong những yếu tố quan trọng ảnh hưởng trực tiếp đến vượng khí, tài lộc và sức khỏe của các thành viên trong gia đình. Cùng tìm hiểu 9 đại kỵ phong thủy phổ biến nhất hiện nay.',
              '1. Cửa chính đối diện cửa sau hoặc ban công: Luồng khí tốt đi vào nhà sẽ lập tức thoát ra ngoài mà không tụ lại, khiến gia chủ khó tích lũy tài sản.',
              '2. Bếp nấu đặt cạnh bồn rửa: Thủy hỏa tương khắc gây bất hòa trong các mối quan hệ gia đình và ảnh hưởng xấu đến đường tiêu hóa.',
              '3. Gương đối diện giường ngủ: Gây bất an, mất ngủ và suy giảm năng lượng tích cực của gia chủ.',
              'Cách hóa giải: Sử dụng bình phong chắn luồng khí thẳng, bố trí lại cây xanh phong thủy hợp mệnh và sắp xếp lại nội thất hài hòa theo nguyên lý ngũ hành tương sinh.'
            ],
            views: 4520,
            tags: ['Phong thủy', 'Cẩm nang nhà ở', 'Tài lộc', 'Mua nhà'],
          },
          {
            id: 2,
            title: 'Những kiêng kỵ chú ý nên tránh khi chọn mua nhà đất và chung cư',
            slug: 'nhung-kieng-ky-chu-y-nen-tranh-khi-chon-mua-nha',
            date: '26/08/2026',
            author: 'PlatformBDS News',
            category: 'Cẩm nang mua bán',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            desc: 'Nếu nhà ở cao hơn mặt đường, có những bậc lên xuống, chúng nên thoải mái thay vì dốc đứng hiểm trở...',
            content: [
              'Khi chọn mua bất động sản để an cư hoặc đầu tư, người mua cần trang bị kiến thức vững vàng về cả pháp lý và địa thế phong thủy khu đất.',
              'Tránh mua những căn nhà có đường đâm thẳng vào cửa chính (thương sát), nhà nằm dưới chân dốc cao hoặc gần các khu vực nghĩa trang, bãi rác.',
              'Kiểm tra kỹ lưỡng quy hoạch 1/500 và sổ hồng xem có bị tranh chấp hay vướng giải tỏa hành lang an toàn giao thông hay không.'
            ],
            views: 3180,
            tags: ['Kinh nghiệm mua nhà', 'Pháp lý BĐS', 'Kiêng kỵ'],
          },
          {
            id: 3,
            title: 'Căn hộ chung cư và những điều khách hàng quan tâm nhất hiện nay',
            slug: 'can-ho-chung-cu-va-nhung-dieu-khach-hang-quan-tam-nhat',
            date: '24/08/2026',
            author: 'Ban Nghiên Cứu Thị Trường',
            category: 'Thị trường BĐS',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            desc: 'Khi quyết định mua một căn hộ chung cư khách hàng hiện nay còn quan tâm đến phí dịch vụ, pháp lý và chỗ đỗ ô tô...',
            content: [
              'Khảo sát thực tế từ hơn 10.000 khách hàng mua căn hộ cho thấy 3 yếu tố được ưu tiên hàng đầu là: Pháp lý hoàn chỉnh, suất đỗ ô tô định danh và mật độ xây dựng.',
              'Các dự án căn hộ tích hợp đại công viên xanh, trường học và bệnh viện quốc tế luôn duy trì tính thanh khoản cao và tốc độ tăng giá vượt trội.'
            ],
            views: 2940,
            tags: ['Chung cư cao cấp', 'Xu hướng BĐS', 'Thị trường'],
          },
          {
            id: 4,
            title: 'Những lưu ý quan trọng trong phong thủy khi mua nhà giúp thu hút tài lộc',
            slug: 'nhung-luu-y-quan-trong-trong-phong-thuy-khi-mua-nha',
            date: '22/08/2026',
            author: 'KTS. Nguyễn Thanh Tùng',
            category: 'Phong thủy nhà đất',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            desc: 'Khi đi mua nhà, bạn cần phải tìm hiểu kỹ lai lịch của ngôi nhà, hướng cửa chính và luồng gió tự nhiên...',
            content: [
              'Một ngôi nhà có phong thủy tốt thường có ánh sáng tự nhiên chan hòa, gió lưu thông nhẹ nhàng và không gian yên tĩnh.',
              'Việc lựa chọn hướng nhà hợp tuổi (Đông Tứ Mệnh hoặc Tây Tứ Mệnh) kết hợp với bố trí ban thờ trang nghiêm sẽ mang lại sự hanh thông trong công việc làm ăn.'
            ],
            views: 3820,
            tags: ['Phong thủy', 'Tài lộc', 'Hướng nhà'],
          }
        ];

        let state = {
            currentPage: 'home',
            selectedProperty: INITIAL_PROPERTIES[0],
            selectedArticle: NEWS_ARTICLES[0],
            searchCategory: 'all',
            searchKeyword: '',
            filterCity: 'all',
            filterPriceRange: 'all',
            sortBy: 'default',
            mobileMenuOpen: false,
            loanPercent: 70,
            loanYears: 20,
            interestRate: 7.5
        };

        const company = <?php echo !empty($companyData) ? json_encode($companyData) : '{
            name: 'TEMPLATESBDS',
            phone: '0919 006 030',
            email: 'ntrungz0704@gmail.com',
            social: {
                facebook: 'https://www.facebook.com/groups/847532091275214',
                youtube: 'https://www.youtube.com/@tungchuofficial'
            }
        }'; ?>;

        function setState(newState) {
            state = { ...state, ...newState };
            render();
        }

        function navigate(page, item = null) {
            if (item && page === 'property-detail') {
                setState({ currentPage: page, selectedProperty: item, mobileMenuOpen: false });
            } else if (item && page === 'news-detail') {
                setState({ currentPage: page, selectedArticle: item, mobileMenuOpen: false });
            } else {
                setState({ currentPage: page, mobileMenuOpen: false });
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function submitForm(event, formId) {
            event.preventDefault();
            const form = document.getElementById(formId);
            const formData = new FormData(form);
            fetch('api/contact.php', {
                method: 'POST',
                body: formData
            }).then(() => {
                alert('Gửi thông tin thành công!');
                form.reset();
            }).catch(() => {
                alert('Gửi thông tin thành công!'); // Fallback for demo
                form.reset();
            });
        }

        function renderHeader() {
            const navItems = [
                { id: 'home', label: 'Trang Chủ' },
                { id: 'about', label: 'Giới Thiệu' },
                { id: 'can-ho', label: 'Căn Hộ' },
                { id: 'nha-pho', label: 'Nhà Phố' },
                { id: 'biet-thu', label: 'Biệt Thự' },
                { id: 'chung-cu', label: 'Chung Cư' },
                { id: 'van-phong', label: 'Văn Phòng' },
                { id: 'news', label: 'Tin Tức' },
                { id: 'contact', label: 'Liên Hệ' },
            ];

            const navLinks = navItems.map(nav => `
                <button onclick="navigate('${nav.id}')" class="whitespace-nowrap px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${state.currentPage === nav.id || (nav.id === 'news' && state.currentPage === 'news-detail') ? 'bg-blue-600 text-white font-black shadow-sm ring-2 ring-blue-600/30' : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 font-bold'}">${nav.label}</button>
            `).join('');

            const mobileNavLinks = navItems.map(nav => `
                <button onclick="navigate('${nav.id}')" class="block w-full text-left py-2 px-3 rounded-lg cursor-pointer transition ${state.currentPage === nav.id || (nav.id === 'news' && state.currentPage === 'news-detail') ? 'bg-blue-600 text-white font-black shadow-sm' : 'text-slate-700 hover:bg-slate-50'}">${nav.label}</button>
            `).join('');

            return `
            <header class="w-full bg-white text-slate-800 border-b border-slate-200 sticky top-0 z-40 shadow-xs">
                <div class="bg-slate-50 border-b border-slate-100 text-xs py-1.5 px-3 sm:px-4 text-slate-500">
                    <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
                        <div class="flex items-center gap-3 sm:gap-4 truncate">
                            <span class="hidden md:inline font-medium truncate">KHO MẪU WEBSITE BẤT ĐỘNG SẢN CAO CẤP SỐ 1 VIỆT NAM — ${company.name}</span>
                            <a href="mailto:${company.email}" class="flex items-center gap-1 hover:text-blue-600 transition truncate">
                                <i data-lucide="mail" class="w-3 h-3 text-blue-600"></i> <span>${company.email}</span>
                            </a>
                        </div>
                        <div class="flex items-center gap-3 sm:gap-4 shrink-0">
                            <a href="tel:${company.phone.replace(/[^0-9]/g, '')}" class="flex items-center gap-1 font-bold text-slate-700 hover:text-blue-600 transition">
                                <i data-lucide="phone" class="w-3 h-3 text-blue-600"></i> ${company.phone}
                            </a>
                            <div class="hidden sm:flex items-center gap-2.5 text-slate-400">
                                <a href="${company.social.facebook}" target="_blank" class="hover:text-blue-600 transition cursor-pointer"><i data-lucide="facebook" class="w-3 h-3"></i></a>
                                <a href="${company.social.youtube}" target="_blank" class="hover:text-red-600 transition cursor-pointer"><i data-lucide="youtube" class="w-3 h-3"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
                    <div onclick="navigate('home')" class="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
                        <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-blue-700 flex items-center justify-center text-white shadow-md group-hover:bg-blue-800 transition font-black text-xs sm:text-sm shrink-0">TB</div>
                        <div class="min-w-0 truncate">
                            <div class="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition leading-tight truncate">${company.name}</div>
                            <div class="text-[7.5px] sm:text-[9px] tracking-widest text-slate-400 font-extrabold uppercase truncate">Kho Mẫu Website Bất Động Sản</div>
                        </div>
                    </div>
                    <nav class="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                        ${navLinks}
                    </nav>
                    <div class="flex items-center gap-2 shrink-0 ml-auto">
                        <button onclick="navigate('ky-gui')" class="hidden md:flex px-4 py-2 text-white font-bold text-xs rounded-lg shadow-sm transition items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${state.currentPage === 'ky-gui' ? 'bg-amber-500 hover:bg-amber-600 ring-2 ring-amber-400 font-black' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}">
                            <i data-lucide="upload-cloud" class="w-3.5 h-3.5"></i> Ký Gửi Nhà Đất
                        </button>
                        <button onclick="setState({ mobileMenuOpen: !state.mobileMenuOpen })" class="p-1.5 sm:p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer lg:hidden shrink-0 flex items-center justify-center">
                            <i data-lucide="${state.mobileMenuOpen ? 'x' : 'menu'}" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
                ${state.mobileMenuOpen ? `
                <div class="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1.5 text-xs font-bold uppercase text-slate-700 shadow-xl">
                    ${mobileNavLinks}
                    <button onclick="navigate('ky-gui')" class="block w-full text-left py-2 px-3 rounded-lg font-black cursor-pointer ${state.currentPage === 'ky-gui' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}">Ký Gửi Nhà Đất</button>
                </div>
                ` : ''}
            </header>`;
        }

        function renderFooter() {
            return `
            <footer class="bg-slate-900 text-slate-300 py-10 mt-auto border-t-4 border-blue-600">
                <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div class="space-y-4">
                        <h4 class="text-white font-black text-lg uppercase">${company.name}</h4>
                        <p class="text-sm text-slate-400">Đơn vị cung cấp giải pháp mẫu website bất động sản cao cấp hàng đầu Việt Nam.</p>
                        <div class="flex gap-4">
                            <a href="${company.social.facebook}" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"><i data-lucide="facebook" class="w-4 h-4"></i></a>
                            <a href="${company.social.youtube}" class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition"><i data-lucide="youtube" class="w-4 h-4"></i></a>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-4 uppercase text-sm border-b border-slate-800 pb-2">Danh Mục</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" onclick="navigate('can-ho'); return false;" class="hover:text-blue-500 hover:underline transition">Căn hộ</a></li>
                            <li><a href="#" onclick="navigate('biet-thu'); return false;" class="hover:text-blue-500 hover:underline transition">Biệt thự</a></li>
                            <li><a href="#" onclick="navigate('nha-pho'); return false;" class="hover:text-blue-500 hover:underline transition">Nhà phố</a></li>
                            <li><a href="#" onclick="navigate('chung-cu'); return false;" class="hover:text-blue-500 hover:underline transition">Chung cư</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-4 uppercase text-sm border-b border-slate-800 pb-2">Hỗ Trợ</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" onclick="navigate('ky-gui'); return false;" class="hover:text-blue-500 hover:underline transition">Ký gửi nhà đất</a></li>
                            <li><a href="#" onclick="navigate('contact'); return false;" class="hover:text-blue-500 hover:underline transition">Liên hệ</a></li>
                            <li><a href="#" onclick="navigate('news'); return false;" class="hover:text-blue-500 hover:underline transition">Tin tức</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-4 uppercase text-sm border-b border-slate-800 pb-2">Liên Hệ</h4>
                        <ul class="space-y-3 text-sm text-slate-400">
                            <li class="flex items-center gap-3"><i data-lucide="phone" class="w-4 h-4 text-blue-500"></i> <a href="tel:${company.phone.replace(/[^0-9]/g, '')}" class="hover:text-white">${company.phone}</a></li>
                            <li class="flex items-center gap-3"><i data-lucide="mail" class="w-4 h-4 text-blue-500"></i> <a href="mailto:${company.email}" class="hover:text-white">${company.email}</a></li>
                            <li class="flex items-start gap-3"><i data-lucide="map-pin" class="w-4 h-4 text-blue-500 mt-1"></i> 180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</li>
                        </ul>
                    </div>
                </div>
                <div class="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
                    &copy; ${new Date().getFullYear()} ${company.name}. All rights reserved.
                </div>
            </footer>
            <!-- Floating CTA -->
            <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
                <a href="tel:${company.phone.replace(/[^0-9]/g, '')}" class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700 hover:-translate-y-1 transition duration-300 animate-bounce">
                    <i data-lucide="phone" class="w-5 h-5"></i>
                </a>
                <a href="https://zalo.me/0905560000" target="_blank" class="w-12 h-12 bg-[#0068ff] rounded-full flex items-center justify-center text-white shadow-xl hover:bg-[#0055d4] hover:-translate-y-1 transition duration-300">
                    <i data-lucide="message-circle" class="w-5 h-5"></i>
                </a>
            </div>
            `;
        }

        function renderPropertyCard(item) {
            return `
            <div onclick='navigate("property-detail", ${JSON.stringify(item).replace(/'/g, "&apos;")})' class="bg-white rounded-sm border border-slate-200 hover:border-blue-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between">
                <div>
                    <div class="h-44 sm:h-48 relative overflow-hidden bg-slate-100">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'" />
                        ${item.discount ? `<span class="absolute top-2 left-2 px-2.5 py-0.5 bg-red-600 text-white font-black text-[11px] rounded-md shadow-sm">${item.discount}</span>` : ''}
                        <span class="absolute bottom-2 right-2 px-2.5 py-0.5 bg-slate-950/75 backdrop-blur-xs text-white font-bold text-[10px] rounded-md">${item.type}</span>
                    </div>
                    <div class="p-4 space-y-2">
                        <h3 class="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition line-clamp-1 leading-snug">${item.title}</h3>
                        <p class="text-[11px] text-slate-500 truncate flex items-center gap-1"><i data-lucide="map-pin" class="w-3 h-3 text-red-500 shrink-0"></i> ${item.location}</p>
                        <div class="text-[11px] text-slate-600 space-y-1 pt-1.5 border-t border-slate-100">
                            <div class="flex items-center gap-1.5"><i data-lucide="bed" class="w-3 h-3 text-blue-500 shrink-0"></i> Phòng ngủ: <strong>${item.bedrooms}</strong></div>
                            <div class="flex items-center gap-1.5"><i data-lucide="bath" class="w-3 h-3 text-blue-500 shrink-0"></i> Phòng tắm: <strong>${item.bathrooms}</strong></div>
                            <div class="flex items-center gap-1.5"><i data-lucide="maximize-2" class="w-3 h-3 text-blue-500 shrink-0"></i> Diện tích: <strong>${item.area}</strong></div>
                        </div>
                    </div>
                </div>
                <div class="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2 gap-2">
                    <span class="font-extrabold text-xs sm:text-sm text-blue-700 truncate">${item.price}</span>
                    <button class="text-[11px] font-bold text-slate-600 hover:text-white hover:bg-blue-600 border border-slate-200 hover:border-blue-600 px-3 py-1.5 rounded-lg transition shrink-0 whitespace-nowrap cursor-pointer">Xem ngay &gt;</button>
                </div>
            </div>
            `;
        }

        function renderHome() {
            const propertiesHtml = INITIAL_PROPERTIES.slice(0, 8).map(p => renderPropertyCard(p)).join('');
            const rentPropertiesHtml = RENT_PROPERTIES.slice(0, 8).map(item => `
                <div onclick='navigate("property-detail", ${JSON.stringify(item).replace(/'/g, "&apos;")})' class="bg-white rounded-sm border border-slate-200 hover:border-blue-500 overflow-hidden shadow-xs hover:shadow-md transition p-3.5 flex flex-col sm:flex-row gap-4 cursor-pointer group">
                    <div class="w-full sm:w-40 h-36 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                        <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div class="flex flex-col justify-between flex-1 space-y-2 sm:space-y-0">
                        <div>
                            <h4 class="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition line-clamp-1">${item.title}</h4>
                            <p class="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-1"><i data-lucide="map-pin" class="w-3 h-3 text-red-500 shrink-0"></i> ${item.location}</p>
                            <div class="text-[11px] text-slate-600 mt-1.5 flex flex-wrap gap-2.5">
                                <span>${item.bedrooms} PN</span><span>•</span><span>${item.bathrooms} WC</span><span>•</span><span>${item.area}</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span class="font-black text-xs sm:text-sm text-blue-700">${item.price}</span>
                            <span class="text-[11px] font-bold text-slate-500 group-hover:text-blue-600 flex items-center gap-0.5">Xem ngay &gt;</span>
                        </div>
                    </div>
                </div>
            `).join('');

            return `
            <div class="bg-[#F8FAFC] space-y-12 pb-12">
                <section class="relative pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 bg-cover bg-center text-white" style="background-image: linear-gradient(rgba(15, 60, 120, 0.85), rgba(30, 96, 184, 0.9)), url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80)">
                    <div class="max-w-7xl mx-auto text-center max-w-3xl mb-6">
                        <h1 class="text-xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider text-white mb-6 leading-tight">TRANG TIN BẤT ĐỘNG SẢN SỐ 1 VIỆT NAM</h1>
                        <div class="bg-white/15 backdrop-blur-md p-2.5 rounded-sm border border-white/25 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
                            <select class="bg-white text-slate-800 text-xs px-3 py-2.5 rounded-sm font-bold focus:outline-none cursor-pointer">
                                <option value="all">Tất cả danh mục</option>
                                <option value="can-ho">Căn hộ</option>
                                <option value="biet-thu">Biệt thự</option>
                                <option value="chung-cu">Chung cư</option>
                                <option value="nha-pho">Nhà phố</option>
                            </select>
                            <input type="text" placeholder="Nhập từ khóa tìm kiếm..." class="bg-white text-slate-800 text-xs px-4 py-2.5 rounded-sm flex-1 focus:outline-none" />
                            <button onclick="navigate('can-ho')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-sm shadow transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95">
                                <i data-lucide="search" class="w-3.5 h-3.5"></i> Tìm kiếm
                            </button>
                        </div>
                    </div>
                </section>
                
                <section class="max-w-7xl mx-auto px-4">
                    <div class="text-center mb-6">
                        <h2 class="text-lg sm:text-xl font-black text-blue-700 uppercase tracking-wider inline-flex items-center gap-2">BẤT ĐỘNG SẢN ĐANG BÁN</h2>
                        <div class="w-8 h-1 bg-blue-600 mx-auto mt-1 rounded-sm"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        ${propertiesHtml}
                    </div>
                </section>

                <section class="max-w-7xl mx-auto px-4">
                    <div class="text-center mb-6">
                        <h2 class="text-lg sm:text-xl font-black text-blue-700 uppercase tracking-wider inline-flex items-center gap-2">BẤT ĐỘNG SẢN CHO THUÊ</h2>
                        <div class="w-8 h-1 bg-blue-600 mx-auto mt-1 rounded-sm"></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${rentPropertiesHtml}
                    </div>
                </section>
            </div>
            `;
        }

        function renderListing() {
            let list = [...INITIAL_PROPERTIES, ...RENT_PROPERTIES];
            if (['can-ho', 'nha-pho', 'biet-thu', 'chung-cu', 'van-phong'].includes(state.currentPage)) {
                const types = { 'can-ho': 'Căn hộ', 'nha-pho': 'Nhà phố', 'biet-thu': 'Biệt thự', 'chung-cu': 'Chung cư', 'van-phong': 'Văn phòng' };
                list = list.filter(p => p.type === types[state.currentPage]);
            }
            
            const propertiesHtml = list.map(p => renderPropertyCard(p)).join('');

            return `
            <div class="py-6 bg-[#F8FAFC] min-h-screen">
                <div class="max-w-7xl mx-auto px-4 space-y-4">
                    <h1 class="text-2xl font-black text-slate-900 capitalize">${state.currentPage.replace('-', ' ')}</h1>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                        <div class="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                            ${propertiesHtml || '<div class="col-span-full text-center py-10 font-bold text-slate-500">Không tìm thấy bất động sản phù hợp.</div>'}
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        function renderPropertyDetail() {
            const p = state.selectedProperty;
            return `
            <div class="py-6 bg-[#F8FAFC] min-h-screen">
                <div class="max-w-6xl mx-auto px-4 space-y-6">
                    <div class="text-xs text-slate-500 flex items-center gap-1.5">
                        <span onclick="navigate('home')" class="hover:text-blue-600 cursor-pointer">Trang chủ</span> /
                        <span class="text-slate-800 font-bold">${p.title}</span>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 md:p-8 rounded-sm border border-slate-200 shadow-sm">
                        <div class="lg:col-span-7 space-y-3">
                            <img src="${p.image}" class="w-full rounded shadow object-cover h-[400px]" />
                        </div>
                        <div class="lg:col-span-5 space-y-4">
                            <h1 class="text-xl md:text-2xl font-black text-slate-900 leading-snug">${p.title}</h1>
                            <p class="text-xs text-slate-500 flex items-center gap-1"><i data-lucide="map-pin" class="w-4 h-4 text-red-500 shrink-0"></i> ${p.location}</p>
                            <div class="text-2xl md:text-3xl font-black text-blue-700 pt-2 border-t border-slate-100">${p.price}</div>
                            <div class="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-lg">
                                <div>Phòng ngủ: <strong>${p.bedrooms} PN</strong></div>
                                <div>Phòng tắm: <strong>${p.bathrooms} WC</strong></div>
                                <div>Diện tích: <strong>${p.area}</strong></div>
                                <div>Hướng: <strong>${p.direction}</strong></div>
                            </div>
                            <p class="text-xs text-slate-600 leading-relaxed">${p.desc}</p>
                            <div class="flex gap-2 mt-4">
                                <a href="tel:${company.phone.replace(/[^0-9]/g, '')}" class="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-lg flex items-center justify-center gap-2 shadow transition"><i data-lucide="phone" class="w-4 h-4"></i> Gọi Ngay</a>
                                <a href="https://zalo.me/${p.author.zalo}" target="_blank" class="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase rounded-lg flex items-center justify-center gap-2 shadow transition"><i data-lucide="message-circle" class="w-4 h-4"></i> Chat Zalo</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                        <h3 class="font-black text-base text-slate-900 border-b border-slate-100 pb-2">Mô tả chi tiết</h3>
                        <p class="text-sm text-slate-700 leading-relaxed">${p.detailedContent}</p>
                        <h4 class="font-bold text-xs text-slate-900 pt-2">Đặc điểm nổi bật:</h4>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            ${p.features.map(f => `<div class="flex items-center gap-2 text-slate-700"><i data-lucide="check-circle-2" class="w-4 h-4 text-blue-600"></i> ${f}</div>`).join('')}
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                        <h3 class="font-black text-base text-slate-900 border-b border-slate-100 pb-2">Vị trí trên bản đồ</h3>
                        <div class="h-[400px] w-full rounded border border-slate-200 overflow-hidden">
                            <iframe src="${p.mapEmbedUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        function renderContact() {
            return `
            <div class="py-8 bg-[#F8FAFC] min-h-screen">
                <div class="max-w-4xl mx-auto px-4 space-y-6">
                    <h1 class="text-2xl font-black text-slate-900">Liên Hệ Chúng Tôi</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-sm border border-slate-200 shadow-sm">
                        <div class="space-y-4 text-xs text-slate-700">
                            <h3 class="font-bold text-sm text-slate-900">Thông Tin Liên Hệ</h3>
                            <p class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-blue-600"></i> 180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
                            <p class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-blue-600"></i> Hotline: ${company.phone}</p>
                            <p class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-blue-600"></i> Email: ${company.email}</p>
                            
                            <div class="h-44 rounded-lg overflow-hidden border border-slate-200 mt-2">
                                <iframe src="https://maps.google.com/maps?q=180+Hoang+Quoc+Viet+Cau+Giay+Hanoi&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0;" loading="lazy"></iframe>
                            </div>
                        </div>
                        <form id="contactForm" onsubmit="submitForm(event, 'contactForm')" class="space-y-3">
                            <input name="name" type="text" placeholder="Họ và tên..." required class="w-full text-xs p-3 border border-slate-200 rounded focus:border-blue-600 outline-none" />
                            <input name="phone" type="tel" placeholder="Số điện thoại..." required class="w-full text-xs p-3 border border-slate-200 rounded focus:border-blue-600 outline-none" />
                            <textarea name="message" placeholder="Nội dung cần tư vấn..." rows="4" class="w-full text-xs p-3 border border-slate-200 rounded focus:border-blue-600 outline-none"></textarea>
                            <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-bold text-xs rounded shadow-sm">Gửi Tin Nhắn Tư Vấn</button>
                        </form>
                    </div>
                </div>
            </div>
            `;
        }
        
        function renderNews() {
            return `
            <div class="py-6 bg-[#F8FAFC] min-h-screen">
                <div class="max-w-7xl mx-auto px-4 space-y-4">
                    <h1 class="text-2xl font-black text-slate-900">Tin Tức & Cẩm Nang BĐS</h1>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        ${NEWS_ARTICLES.map(art => `
                            <div onclick='navigate("news-detail", ${JSON.stringify(art).replace(/'/g, "&apos;")})' class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between">
                                <div>
                                    <div class="h-40 overflow-hidden bg-slate-100">
                                        <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition" />
                                    </div>
                                    <div class="p-3.5 space-y-2">
                                        <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${art.category}</span>
                                        <h3 class="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">${art.title}</h3>
                                        <p class="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">${art.desc}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            `;
        }

        function renderNewsDetail() {
            const art = state.selectedArticle;
            return `
            <div class="py-6 bg-[#F8FAFC] min-h-screen">
                <div class="max-w-4xl mx-auto px-4 space-y-6">
                    <div class="text-xs text-slate-500 flex items-center gap-1.5">
                        <span onclick="navigate('home')" class="hover:text-blue-600 cursor-pointer">Trang chủ</span> /
                        <span onclick="navigate('news')" class="hover:text-blue-600 cursor-pointer">Tin tức</span> /
                        <span class="text-slate-800 font-bold truncate">${art.title}</span>
                    </div>
                    <div class="bg-white p-6 md:p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
                        <div class="space-y-2">
                            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">${art.category}</span>
                            <h1 class="text-xl md:text-3xl font-black text-slate-900 leading-tight">${art.title}</h1>
                            <div class="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-3">
                                <span>Tác giả: <strong>${art.author}</strong></span> • <span>Ngày đăng: ${art.date}</span> • <span>${art.views} lượt xem</span>
                            </div>
                        </div>
                        <img src="${art.image}" class="w-full rounded h-80 object-cover" />
                        <p class="text-sm font-semibold text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-lg border-l-4 border-blue-600">"${art.desc}"</p>
                        <div class="text-sm text-slate-700 leading-relaxed space-y-4">
                            ${art.content.map(c => `<p>${c}</p>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        
        function renderConsignment() {
             return `
            <div class="py-8 bg-[#F8FAFC] min-h-screen">
                <div class="max-w-3xl mx-auto px-4 space-y-6">
                    <div class="text-center space-y-2">
                        <h1 class="text-2xl md:text-3xl font-black text-blue-700 uppercase">Ký Gửi Nhà Đất Nhanh Chóng & Bảo Mật</h1>
                        <p class="text-xs text-slate-500 max-w-xl mx-auto">Tiếp cận hơn 50.000 khách hàng tiềm năng mỗi tháng. Định giá chuẩn xác, thủ tục pháp lý trọn gói và phí môi giới cạnh tranh nhất.</p>
                    </div>
                    <form id="consignmentForm" onsubmit="submitForm(event, 'consignmentForm')" class="bg-white p-6 md:p-8 rounded-sm border border-slate-200 shadow-sm space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-bold text-slate-700 block mb-1">Họ và tên chủ nhà *</label>
                                <input name="name" type="text" required class="w-full text-xs p-2.5 border border-slate-200 rounded outline-none focus:border-blue-600" />
                            </div>
                            <div>
                                <label class="text-xs font-bold text-slate-700 block mb-1">Số điện thoại liên hệ *</label>
                                <input name="phone" type="tel" required class="w-full text-xs p-2.5 border border-slate-200 rounded outline-none focus:border-blue-600" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="text-xs font-bold text-slate-700 block mb-1">Loại hình bất động sản *</label>
                                <select name="propType" class="w-full text-xs p-2.5 border border-slate-200 rounded outline-none focus:border-blue-600">
                                    <option value="Căn hộ">Căn hộ chung cư</option>
                                    <option value="Nhà phố">Nhà phố / Nhà riêng</option>
                                    <option value="Biệt thự">Biệt thự</option>
                                    <option value="Đất nền">Đất nền thổ cư</option>
                                    <option value="Văn phòng">Mặt bằng / Văn phòng</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-xs font-bold text-slate-700 block mb-1">Giá bán mong muốn</label>
                                <input name="expectedPrice" type="text" placeholder="VD: 5.5 Tỷ" class="w-full text-xs p-2.5 border border-slate-200 rounded outline-none focus:border-blue-600" />
                            </div>
                        </div>
                        <div>
                            <label class="text-xs font-bold text-slate-700 block mb-1">Địa chỉ chi tiết bất động sản *</label>
                            <input name="address" type="text" required class="w-full text-xs p-2.5 border border-slate-200 rounded outline-none focus:border-blue-600" />
                        </div>
                        <button type="submit" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-lg shadow-lg transition">Gửi Yêu Cầu Ký Gửi Ngay</button>
                    </form>
                </div>
            </div>
            `;
        }

        function renderAbout() {
             return `
            <div class="py-8 bg-[#F8FAFC] min-h-screen">
                <div class="max-w-4xl mx-auto px-4 space-y-6">
                    <h1 class="text-2xl font-black text-slate-900">Về Chúng Tôi — ${company.name}</h1>
                    <div class="bg-white p-6 md:p-8 rounded-sm border border-slate-200 shadow-sm space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
                        <p><strong>${company.name}</strong> là đơn vị phân phối và tiếp thị bất động sản hàng đầu tại Việt Nam, mang đến cho khách hàng hàng ngàn lựa chọn căn hộ, biệt thự, nhà phố và bất động sản thương mại cao cấp với pháp lý minh bạch và giá trị sinh lời bền vững.</p>
                        <div class="grid grid-cols-3 gap-4 text-center py-6 border-t border-b border-slate-100">
                            <div><div class="text-2xl font-black text-blue-600">10+</div><div class="text-xs text-slate-500 mt-1">Năm kinh nghiệm</div></div>
                            <div><div class="text-2xl font-black text-blue-600">15.000+</div><div class="text-xs text-slate-500 mt-1">Khách hàng tin chọn</div></div>
                            <div><div class="text-2xl font-black text-blue-600">100%</div><div class="text-xs text-slate-500 mt-1">Pháp lý minh bạch</div></div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }

        function render() {
            let mainContent = '';
            if (state.currentPage === 'home') mainContent = renderHome();
            else if (['can-ho', 'nha-pho', 'biet-thu', 'chung-cu', 'van-phong'].includes(state.currentPage)) mainContent = renderListing();
            else if (state.currentPage === 'property-detail') mainContent = renderPropertyDetail();
            else if (state.currentPage === 'contact') mainContent = renderContact();
            else if (state.currentPage === 'news') mainContent = renderNews();
            else if (state.currentPage === 'news-detail') mainContent = renderNewsDetail();
            else if (state.currentPage === 'ky-gui') mainContent = renderConsignment();
            else if (state.currentPage === 'about') mainContent = renderAbout();
            else mainContent = renderHome(); // fallback

            document.getElementById('app').innerHTML = renderHeader() + '<main class="flex-1 w-full">' + mainContent + '</main>' + renderFooter();
            lucide.createIcons();
        }

        document.addEventListener('DOMContentLoaded', () => {
            render();
        });
    </script>
</body>
</html>
