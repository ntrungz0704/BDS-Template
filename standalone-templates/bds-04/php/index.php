<?php
$db_file = __DIR__ . '/config/db.php';
if (file_exists($db_file)) {
    require_once $db_file;
}

// Fallback data
$company_info = [
    'name' => 'TEMPLATESBDS',
    'phone' => '0919 006 030',
    'email' => 'ntrungz0704@gmail.com',
    'address' => 'Đường Phú Thuận, Phường Tân Phú, Quận 7, TP.HCM',
    'slogan' => 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam',
    'zalo' => '0919006030'
];

$projects = [
    [
        'id' => 1, 'title' => 'Căn Hộ 2 Phòng Ngủ SmartHome View Trọn Sông Cả Cấm & Phú Mỹ Hưng', 'slug' => 'can-ho-2pn-smarthome-view-song-phu-my-hung', 'type' => 'Căn hộ 2 Phòng Ngủ', 'price' => '4.85 Tỷ VNĐ', 'area' => '72.5 m²', 'bedrooms' => 2, 'bathrooms' => 2, 'badge' => 'Mạ Vàng 24K', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'gallery' => ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80'], 'specs' => ['Thiết bị vệ sinh mạ vàng Kohler', 'Hệ thống kính Low-E 3 lớp chạm sàn', 'Công nghệ SmartHome điều khiển bằng giọng nói', 'Khóa cửa nhận diện FaceID thông minh'], 'desc' => 'Căn hộ 2 phòng ngủ thiết kế sang trọng, tối ưu ánh sáng tự nhiên với ban công kính tràn viền. Tích hợp trọn bộ hệ thống nhà thông minh 4.0 hiện đại bậc nhất.'
    ],
    [
        'id' => 2, 'title' => 'Căn Hộ 3 Phòng Ngủ Panorama Góc 2 Mặt Thoáng Đỉnh Cao', 'slug' => 'can-ho-3pn-panorama-goc-2-mat-thoang', 'type' => 'Căn hộ 3 Phòng Ngủ', 'price' => '7.2 Tỷ VNĐ', 'area' => '108 m²', 'bedrooms' => 3, 'bathrooms' => 2, 'badge' => 'Căn Góc VIP', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'gallery' => ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'], 'specs' => ['Bếp đảo sang trọng mặt đá Thạch Anh', 'Hệ thống máy lạnh âm trần Daikin VRV', 'Sàn gỗ công nghiệp cao cấp nhập khẩu Đức', 'Chuông hình kỹ thuật số liên lạc sảnh lễ tân'], 'desc' => 'Căn góc 3 phòng ngủ sở hữu tầm nhìn panorama 270 độ triệu đô. Không gian phòng khách rộng mở kết nối phòng ăn lý tưởng cho các gia đình thượng lưu.'
    ],
    [
        'id' => 3, 'title' => 'Sky Villa Penthouse Thông Tầng Dát Vàng Đẳng Cấp Thượng Lưu', 'slug' => 'sky-villa-penthouse-thong-tang-dat-vang', 'type' => 'Sky Villa / Penthouse', 'price' => '21.5 Tỷ VNĐ', 'area' => '265 m²', 'bedrooms' => 4, 'bathrooms' => 5, 'badge' => 'Độc Bản Giới Hạn', 'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'gallery' => ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'], 'specs' => ['Hồ bơi chân mây riêng tại ban công', 'Thang máy riêng bảo mật 2 lớp bằng FaceID', 'Nội thất đặt hàng riêng từ thương hiệu Versace Home', 'Hệ thống lọc nước tại vòi chuẩn khoáng chất tự nhiên'], 'desc' => 'Kiệt tác Sky Villa thông tầng đỉnh cao với trần cao 6.5m, hồ bơi riêng trên không và sân vườn Babylon thu nhỏ giữa lưng chừng trời.'
    ],
    [
        'id' => 4, 'title' => 'Căn Hộ 1 Phòng Ngủ Studio SmartHome Dành Cho Chuyên Gia', 'slug' => 'can-ho-1pn-studio-smarthome-chuyen-gia', 'type' => 'Căn hộ 1 Phòng Ngủ', 'price' => '3.35 Tỷ VNĐ', 'area' => '52 m²', 'bedrooms' => 1, 'bathrooms' => 1, 'badge' => 'Dễ Cho Thuê', 'image' => 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', 'gallery' => ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'], 'specs' => ['Full nội thất SmartHome liền tường cao cấp', 'Hệ thống rèm tự động đóng mở theo ánh sáng mặt trời', 'Tủ lạnh và lò nướng âm Bosch', 'Quản lý căn hộ qua App di động'], 'desc' => 'Thiết kế thông minh tối ưu diện tích, lý tưởng cho chuyên gia nước ngoài và gia đình trẻ thành đạt, tỷ suất cho thuê đạt 8.5%/năm.'
    ]
];

$news = [
    ['id' => 1, 'title' => 'Lễ Ký Kết Hợp Tác Chiến Lược Cùng Đơn Vị Vận Hành Quốc Tế Chuẩn 5 Sao', 'slug' => 'le-ky-ket-hop-tac-chien-luoc', 'date' => '28/08/2026', 'author' => 'Ban Truyền Thông', 'category' => 'Sự Kiện & Hợp Tác', 'image' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', 'desc' => 'Khẳng định đẳng cấp quốc tế với dịch vụ quản lý tòa nhà...', 'content' => ['Chủ đầu tư chính thức ký kết thỏa thuận hợp tác quản lý vận hành tòa nhà cùng tập đoàn dịch vụ bất động sản hàng đầu thế giới.', 'Cư dân tương lai sẽ được tận hưởng hệ thống dịch vụ đặc quyền từ xe đưa đón hạng sang, quản gia riêng, dịch vụ chăm sóc thú cưng đến đặt vé máy bay và du thuyền VIP.', 'Sự hợp tác này nâng tầm giá trị sống và đảm bảo thanh khoản bền vững cho các chủ nhân sở hữu căn hộ.'], 'views' => 4890],
    ['id' => 2, 'title' => 'Khai Trương Căn Hộ Mẫu Sky Villa Dát Vàng Đón Hơn 1,000 Khách Tham Quan', 'slug' => 'khai-truong-can-ho-mau', 'date' => '26/08/2026', 'author' => 'Ban Kinh Doanh', 'category' => 'Trải Nghiệm Căn Hộ', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'desc' => 'Khách hàng trực tiếp trải nghiệm hệ sinh thái 4.0 và chiêm ngưỡng nội thất mạ vàng xa hoa ngay tại khuôn viên dự án...', 'content' => ['Khu nhà mẫu Sunshine City Saigon đã chính thức mở cửa đón khách hàng VIP với sự xuất hiện của các căn hộ mẫu từ 2PN đến Sky Villa Penthouse.', 'Điểm nhấn ấn tượng là hệ thống điều khiển SmartHome phản hồi giọng nói bằng tiếng Việt và kính Low-E cản nhiệt cách âm hoàn hảo.', 'Nhiều khách hàng đã quyết định đặt cọc giữ chỗ ngay trong ngày đầu khai trương để chọn được những tầng đẹp view sông.'], 'views' => 6120],
    ['id' => 3, 'title' => 'Tiến Độ Xây Dựng Thực Tế: Thi Công Đồng Loạt 9 Tòa Tháp Vượt Kế Hoạch', 'slug' => 'tien-do-xay-dung', 'date' => '24/08/2026', 'author' => 'Ban Quản Lý Dự Án', 'category' => 'Tiến Độ Thi Công', 'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', 'desc' => 'Hàng trăm kỹ sư và công nhân đang ngày đêm thi công hoàn thiện mặt ngoài kính Low-E dát vàng và hệ thống tiện ích nội khu...', 'content' => ['Giai đoạn 1 của dự án đã cất nóc thành công các tòa S1, S2 và đang tiến hành lắp đặt hệ thống cơ điện thông minh.', 'Hồ bơi vô cực trên tầng thượng và công viên cảnh quan ven sông Cả Cấm cũng đang được hoàn thiện cảnh quan xanh.', 'Chủ đầu tư cam kết bàn giao nhà đúng tiến độ vào Quý 4/2026 cùng sổ hồng trao tay cho cư dân.'], 'views' => 5430]
];

// Fetch from DB if available
if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company_info = $row;
        }

        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id ASC");
        if ($stmt->rowCount() > 0) {
            $projects = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['gallery'] = json_decode($row['gallery'], true) ?: [];
                $row['specs'] = json_decode($row['specs'], true) ?: [];
                $projects[] = $row;
            }
        }

        $stmt = $pdo->query("SELECT * FROM news ORDER BY id DESC");
        if ($stmt->rowCount() > 0) {
            $news = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['content'] = json_decode($row['content'], true) ?: [];
                $news[] = $row;
            }
        }
    } catch (PDOException $e) {
        // Fallback to hardcoded
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($company_info['name']) ?> - <?= htmlspecialchars($company_info['slogan']) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    },
                    colors: {
                        brand: {
                            gold: '#C5A059',
                            goldLight: '#E6CA65',
                            goldDark: '#A67C1E',
                            navy: '#07132B',
                            navyLight: '#0B1B3D',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        .page-section { display: none; }
        .page-section.active { display: block; }
    </style>
</head>
<body class="bg-[#07132B] font-sans antialiased text-slate-100 relative min-h-screen flex flex-col">

    <!-- HEADER -->
    <header class="w-full bg-[#07132B]/95 backdrop-blur-md text-white sticky top-0 z-40 border-b border-[#C5A059]/30 shadow-lg">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
            <!-- Brand Logo -->
            <div onclick="navigate('home')" class="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#E6CA65] flex items-center justify-center text-[#07132B] font-black text-base sm:text-xl shadow-md group-hover:scale-105 transition shrink-0">
                    TB
                </div>
                <div class="min-w-0 truncate">
                    <div class="text-base sm:text-lg font-black tracking-widest text-[#E6CA65] uppercase leading-none font-serif group-hover:text-white transition truncate">
                        <?= htmlspecialchars($company_info['name']) ?>
                    </div>
                    <div class="text-[7.5px] sm:text-[9px] text-[#C5A059] font-bold tracking-widest uppercase mt-0.5 truncate">
                        <?= htmlspecialchars($company_info['slogan']) ?>
                    </div>
                </div>
            </div>

            <!-- Desktop Menu -->
            <nav class="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                <button onclick="navigate('home')" class="nav-btn whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer bg-[#C5A059] text-[#07132B] font-black shadow-md" data-page="home">Tổng Quan</button>
                <button onclick="navigate('vi-tri')" class="nav-btn whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer text-slate-200 hover:text-[#E6CA65] hover:bg-white/5" data-page="vi-tri">Vị Trí</button>
                <button onclick="navigate('cong-nghe')" class="nav-btn whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer text-slate-200 hover:text-[#E6CA65] hover:bg-white/5" data-page="cong-nghe">Công Nghệ</button>
                <button onclick="navigate('tien-ich')" class="nav-btn whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer text-slate-200 hover:text-[#E6CA65] hover:bg-white/5" data-page="tien-ich">Tiện Ích</button>
                <button onclick="navigate('can-ho')" class="nav-btn whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer text-slate-200 hover:text-[#E6CA65] hover:bg-white/5" data-page="can-ho">Mặt Bằng Căn Hộ</button>
                <button onclick="navigate('news')" class="nav-btn whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer text-slate-200 hover:text-[#E6CA65] hover:bg-white/5" data-page="news">Tin Tức</button>
                <button onclick="navigate('contact')" class="nav-btn whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer text-slate-200 hover:text-[#E6CA65] hover:bg-white/5" data-page="contact">Liên Hệ</button>
            </nav>

            <!-- Right CTA -->
            <div class="hidden md:flex items-center gap-3 shrink-0">
                <button onclick="navigate('contact')" class="px-4 py-2 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C5A059] text-[#07132B] font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition active:scale-95 cursor-pointer whitespace-nowrap shrink-0">
                    Đăng Ký Tham Quan
                </button>
            </div>

            <!-- Mobile Menu Button -->
            <button onclick="toggleMobileMenu()" class="lg:hidden p-1.5 sm:p-2 text-[#E6CA65] hover:bg-white/10 rounded-md cursor-pointer ml-auto shrink-0 flex items-center justify-center">
                <i data-lucide="menu" id="menu-icon" class="w-5 h-5"></i>
            </button>
        </div>

        <!-- Mobile Drawer -->
        <div id="mobile-menu" class="hidden lg:hidden bg-[#07132B] border-t border-[#C5A059]/30 px-4 py-3 space-y-1 text-xs font-bold uppercase text-slate-200 shadow-2xl">
            <button onclick="navigate('home')" class="block w-full text-left py-2.5 px-3 rounded cursor-pointer bg-[#C5A059] text-[#07132B] font-black">Tổng Quan</button>
            <button onclick="navigate('vi-tri')" class="block w-full text-left py-2.5 px-3 rounded cursor-pointer hover:bg-white/10">Vị Trí Kim Cương</button>
            <button onclick="navigate('cong-nghe')" class="block w-full text-left py-2.5 px-3 rounded cursor-pointer hover:bg-white/10">Công Nghệ 4.0</button>
            <button onclick="navigate('tien-ich')" class="block w-full text-left py-2.5 px-3 rounded cursor-pointer hover:bg-white/10">Tiện Ích Đặc Quyền</button>
            <button onclick="navigate('can-ho')" class="block w-full text-left py-2.5 px-3 rounded cursor-pointer hover:bg-white/10">Mặt Bằng Căn Hộ</button>
            <button onclick="navigate('news')" class="block w-full text-left py-2.5 px-3 rounded cursor-pointer hover:bg-white/10">Tin Tức</button>
            <button onclick="navigate('contact')" class="block w-full text-left py-2.5 px-3 rounded cursor-pointer hover:bg-white/10">Liên Hệ</button>
            <a href="tel:<?= preg_replace('/[^0-9]/', '', $company_info['phone']) ?>" class="block w-full text-center py-2.5 px-3 bg-[#C5A059] text-[#07132B] font-black rounded-lg mt-2 cursor-pointer">
                📞 HOTLINE: <?= htmlspecialchars($company_info['phone']) ?>
            </a>
        </div>
    </header>

    <main class="flex-1 w-full">
        <!-- HOMEPAGE -->
        <div id="page-home" class="page-section active bg-[#07132B] text-slate-100 space-y-20 pb-20">
            <!-- Hero Banner -->
            <div class="relative min-h-[550px] sm:min-h-[650px] flex items-center justify-center px-4 bg-cover bg-center text-white text-center" style="background-image: linear-gradient(rgba(7, 19, 43, 0.4), rgba(7, 19, 43, 0.85)), url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')">
                <div class="max-w-7xl mx-auto max-w-4xl space-y-6 pt-12">
                    <div class="inline-flex items-center gap-2 px-4 py-1 rounded-sm bg-[#C5A059]/20 text-[#E6CA65] border border-[#C5A059]/40 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                        <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> TỔ HỢP CĂN HỘ THÔNG MINH BÊN SÔNG SÀI GÒN
                    </div>
                    <h1 class="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider text-white font-serif leading-tight drop-shadow-lg">
                        SUNSHINE CITY SAIGON
                    </h1>
                    <p class="text-sm sm:text-lg text-slate-200 font-light tracking-wide max-w-2xl mx-auto">
                        Nghệ thuật sống thượng lưu ven sông — Kiến trúc mạ vàng xa hoa hòa quyện cùng công nghệ 4.0 đỉnh cao.
                    </p>
                    <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <button onclick="navigate('can-ho')" class="px-8 py-3.5 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C5A059] text-[#07132B] font-black text-xs uppercase tracking-wider rounded-sm shadow-2xl transition transform hover:scale-105 active:scale-95 cursor-pointer">
                            Khám Phá Căn Hộ Mẫu ›
                        </button>
                        <button onclick="navigate('contact')" class="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-sm backdrop-blur-md transition cursor-pointer">
                            Tải Bảng Giá & CSBH
                        </button>
                    </div>
                </div>
            </div>

            <!-- 1. TỔNG QUAN -->
            <section class="bg-gradient-to-b from-[#C5A059] to-[#A67C1E] text-slate-900 py-16 px-4 shadow-xl">
                <div class="max-w-7xl mx-auto space-y-10">
                    <div class="text-center space-y-2">
                        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider font-serif">
                            Tổng Quan Dự Án Sunshine City Saigon
                        </h2>
                        <div class="w-16 h-1 bg-slate-900 mx-auto rounded-sm"></div>
                        <p class="text-xs sm:text-sm font-semibold max-w-xl mx-auto text-slate-900/80">
                            Biểu tượng kiến trúc tương lai ven sông Cả Cấm tại trung tâm Nam Sài Gòn
                        </p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-6 rounded-sm overflow-hidden shadow-2xl border-4 border-white/30 bg-slate-900">
                            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80" alt="Overview" class="w-full h-80 sm:h-96 object-cover" />
                        </div>
                        <div class="lg:col-span-6 space-y-4 text-xs sm:text-sm font-medium">
                            <div class="bg-white/20 backdrop-blur-md p-4 rounded-sm space-y-2 border border-white/30">
                                <div class="flex justify-between border-b border-black/10 pb-2"><span class="font-bold">Chủ đầu tư:</span><span>Tập đoàn Sunshine Group</span></div>
                                <div class="flex justify-between border-b border-black/10 pb-2"><span class="font-bold">Vị trí:</span><span>Đường Phú Thuận, Phường Tân Phú, Quận 7, TP.HCM</span></div>
                                <div class="flex justify-between border-b border-black/10 pb-2"><span class="font-bold">Quy mô:</span><span>9 Tòa tháp cao 36 - 38 tầng</span></div>
                                <div class="flex justify-between border-b border-black/10 pb-2"><span class="font-bold">Mật độ xây dựng:</span><span>Chỉ 29.5%</span></div>
                                <div class="flex justify-between border-b border-black/10 pb-2"><span class="font-bold">Pháp lý:</span><span>Sổ hồng sở hữu lâu dài</span></div>
                                <div class="flex justify-between"><span class="font-bold">Thời gian bàn giao:</span><span>Quý 4/2026</span></div>
                            </div>
                            <p class="leading-relaxed text-slate-900/90 italic">
                                "Sunshine City Saigon mang đến một chuẩn mực sống thượng lưu mới, nơi sự xa hoa của nội thất mạ vàng hòa quyện hoàn hảo cùng những giải pháp công nghệ thông minh 4.0 tối tân nhất."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 2. VỊ TRÍ KIM CƯƠNG -->
            <section class="max-w-7xl mx-auto px-4 space-y-12">
                <div class="text-center space-y-2">
                    <span class="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">TÂM ĐIỂM NAM SÀI GÒN</span>
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif uppercase tracking-wider">
                        Vị Trí Kim Cương Ven Sông
                    </h2>
                    <div class="w-16 h-1 bg-[#C5A059] mx-auto rounded-sm"></div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <p>Tọa lạc tại vị trí độc tôn ven sông Cả Cấm, dự án Sunshine City Saigon liền kề Khu đô thị kiểu mẫu Phú Mỹ Hưng, thừa hưởng trọn vẹn hạ tầng giao thông và tiện ích quốc tế cao cấp nhất khu Nam.</p>
                        <div class="grid grid-cols-2 gap-3 pt-2">
                            <div class="p-3.5 bg-white/5 border border-[#C5A059]/30 rounded-sm">
                                <span class="text-[#E6CA65] font-black text-base block font-serif">3 PHÚT</span>
                                <span class="text-slate-400 text-xs">Crescent Mall & Hồ Bán Nguyệt</span>
                            </div>
                            <div class="p-3.5 bg-white/5 border border-[#C5A059]/30 rounded-sm">
                                <span class="text-[#E6CA65] font-black text-base block font-serif">5 PHÚT</span>
                                <span class="text-slate-400 text-xs">Bệnh viện Quốc tế FV & Tâm Đức</span>
                            </div>
                            <div class="p-3.5 bg-white/5 border border-[#C5A059]/30 rounded-sm">
                                <span class="text-[#E6CA65] font-black text-base block font-serif">7 PHÚT</span>
                                <span class="text-slate-400 text-xs">Đại học RMIT & SSIS</span>
                            </div>
                            <div class="p-3.5 bg-white/5 border border-[#C5A059]/30 rounded-sm">
                                <span class="text-[#E6CA65] font-black text-base block font-serif">10 PHÚT</span>
                                <span class="text-slate-400 text-xs">Chợ Bến Thành & Quận 1</span>
                            </div>
                        </div>
                    </div>
                    <div class="lg:col-span-6 rounded-sm overflow-hidden shadow-2xl border border-[#C5A059]/40 bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80" alt="Bản đồ vị trí" class="w-full h-80 object-cover" />
                    </div>
                </div>
            </section>

            <!-- 3. CÔNG NGHỆ 4.0 -->
            <section class="relative py-20 px-4 bg-cover bg-center" style="background-image: linear-gradient(rgba(7, 19, 43, 0.85), rgba(7, 19, 43, 0.95)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')">
                <div class="max-w-7xl mx-auto space-y-12">
                    <div class="text-center space-y-2">
                        <span class="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">TIÊN PHONG CÔNG NGHỆ</span>
                        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif uppercase tracking-wider">
                            Ứng Dụng Công Nghệ 4.0 Đỉnh Cao
                        </h2>
                        <div class="w-16 h-1 bg-[#C5A059] mx-auto rounded-sm"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div class="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm backdrop-blur-md space-y-3 hover:border-[#E6CA65] hover:bg-white/10 transition group">
                            <div class="w-12 h-12 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#E6CA65] text-[#07132B] flex items-center justify-center font-black group-hover:scale-110 transition"><i data-lucide="key"></i></div>
                            <h3 class="font-black text-base text-[#E6CA65] font-serif">FaceID Nhận Diện</h3>
                            <p class="text-xs text-slate-300 leading-relaxed">Hệ thống kiểm soát an ninh nhận diện khuôn mặt tự động mở cửa sảnh và gọi thang máy đón cư dân.</p>
                        </div>
                        <div class="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm backdrop-blur-md space-y-3 hover:border-[#E6CA65] hover:bg-white/10 transition group">
                            <div class="w-12 h-12 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#E6CA65] text-[#07132B] flex items-center justify-center font-black group-hover:scale-110 transition"><i data-lucide="cpu"></i></div>
                            <h3 class="font-black text-base text-[#E6CA65] font-serif">SmartHome Bằng Giọng Nói</h3>
                            <p class="text-xs text-slate-300 leading-relaxed">Điều khiển toàn bộ ánh sáng, điều hòa, rèm cửa và âm thanh chỉ bằng một câu lệnh tiếng Việt.</p>
                        </div>
                        <div class="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm backdrop-blur-md space-y-3 hover:border-[#E6CA65] hover:bg-white/10 transition group">
                            <div class="w-12 h-12 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#E6CA65] text-[#07132B] flex items-center justify-center font-black group-hover:scale-110 transition"><i data-lucide="car"></i></div>
                            <h3 class="font-black text-base text-[#E6CA65] font-serif">Bãi Đỗ Xe Thông Minh</h3>
                            <p class="text-xs text-slate-300 leading-relaxed">Hệ thống tự động tìm và dẫn đường đến chỗ đỗ xe còn trống, ghi nhớ vị trí xe qua ứng dụng điện thoại.</p>
                        </div>
                        <div class="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm backdrop-blur-md space-y-3 hover:border-[#E6CA65] hover:bg-white/10 transition group">
                            <div class="w-12 h-12 rounded-sm bg-gradient-to-tr from-[#C5A059] to-[#E6CA65] text-[#07132B] flex items-center justify-center font-black group-hover:scale-110 transition"><i data-lucide="smartphone"></i></div>
                            <h3 class="font-black text-base text-[#E6CA65] font-serif">Ứng Dụng Cư Dân All-In-One</h3>
                            <p class="text-xs text-slate-300 leading-relaxed">Thanh toán hóa đơn, đặt lịch tiện ích, gọi xe sang và yêu cầu dịch vụ 24/7 chỉ với 1 chạm.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 4. TIỆN ÍCH ĐẶC QUYỀN -->
            <section class="bg-gradient-to-b from-[#C5A059] to-[#A67C1E] text-slate-900 py-16 px-4 shadow-xl">
                <div class="max-w-7xl mx-auto space-y-10">
                    <div class="text-center space-y-2">
                        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wider font-serif">
                            Hệ Thống Tiện Ích Đặc Quyền Chuẩn Resort 5 Sao
                        </h2>
                        <div class="w-16 h-1 bg-slate-900 mx-auto rounded-sm"></div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-6 space-y-3 text-xs sm:text-sm font-semibold">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <div class="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30"><i data-lucide="check-circle-2" class="w-4 h-4 text-slate-950 shrink-0"></i><span class="truncate">Hồ bơi chân mây vô cực trên tầng thượng</span></div>
                                <div class="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30"><i data-lucide="check-circle-2" class="w-4 h-4 text-slate-950 shrink-0"></i><span class="truncate">Sky Bar & Cigar Lounge thượng lưu</span></div>
                                <div class="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30"><i data-lucide="check-circle-2" class="w-4 h-4 text-slate-950 shrink-0"></i><span class="truncate">Trung tâm Spa & Onsen khoáng nóng</span></div>
                                <div class="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30"><i data-lucide="check-circle-2" class="w-4 h-4 text-slate-950 shrink-0"></i><span class="truncate">Phòng tập Gym & Yoga Technogym</span></div>
                                <div class="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30"><i data-lucide="check-circle-2" class="w-4 h-4 text-slate-950 shrink-0"></i><span class="truncate">Đường dạo bộ chân mây Sky Walk</span></div>
                                <div class="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30"><i data-lucide="check-circle-2" class="w-4 h-4 text-slate-950 shrink-0"></i><span class="truncate">Rạp chiếu phim 4D gia đình</span></div>
                                <div class="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30"><i data-lucide="check-circle-2" class="w-4 h-4 text-slate-950 shrink-0"></i><span class="truncate">Vườn nướng BBQ ven sông thơ mộng</span></div>
                                <div class="flex items-center gap-2 p-2.5 bg-white/20 rounded-lg backdrop-blur-xs border border-white/30"><i data-lucide="check-circle-2" class="w-4 h-4 text-slate-950 shrink-0"></i><span class="truncate">Trung tâm thương mại & Shophouse cao cấp</span></div>
                            </div>
                        </div>
                        <div class="lg:col-span-6 rounded-sm overflow-hidden shadow-2xl border-4 border-white/30 bg-slate-900">
                            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80" alt="Spa" class="w-full h-80 object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- 5. CÁC LOẠI HÌNH CĂN HỘ -->
            <section class="max-w-7xl mx-auto px-4 space-y-10">
                <div class="text-center space-y-2">
                    <span class="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">MẶT BẰNG & THIẾT KẾ</span>
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif uppercase tracking-wider">
                        Tuyệt Tác Căn Hộ & Sky Villa Dát Vàng
                    </h2>
                    <div class="w-16 h-1 bg-[#C5A059] mx-auto rounded-sm"></div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="home-apartments-grid">
                    <!-- Script will inject apartments here -->
                </div>
            </section>

            <!-- 6. TIN TỨC -->
            <section class="max-w-7xl mx-auto px-4 space-y-10">
                <div class="text-center space-y-2">
                    <span class="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">TIN TỨC DỰ ÁN</span>
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-white font-serif uppercase tracking-wider">
                        Tin Tức & Tiến Độ Mới Nhất
                    </h2>
                    <div class="w-16 h-1 bg-[#C5A059] mx-auto rounded-sm"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="home-news-grid">
                    <!-- Script will inject news here -->
                </div>
            </section>

            <!-- 7. QUICK ACTION BAR -->
            <section class="bg-gradient-to-r from-[#C5A059] via-[#E6CA65] to-[#C5A059] py-8 text-[#07132B]">
                <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-black text-xs uppercase tracking-wider">
                    <div onclick="navigate('contact')" class="p-3 hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1.5"><i data-lucide="download" class="w-6 h-6"></i><span>TẢI BROCHURE & BẢNG GIÁ</span></div>
                    <div onclick="navigate('contact')" class="p-3 hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1.5"><i data-lucide="calendar" class="w-6 h-6"></i><span>ĐĂNG KÝ XEM NHÀ MẪU</span></div>
                    <div onclick="navigate('can-ho')" class="p-3 hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1.5"><i data-lucide="calculator" class="w-6 h-6"></i><span>TÍNH LÃI SUẤT VAY ƯU ĐÃI</span></div>
                    <a href="tel:<?= preg_replace('/[^0-9]/', '', $company_info['phone']) ?>" class="p-3 hover:scale-105 transition cursor-pointer flex flex-col items-center gap-1.5"><i data-lucide="phone" class="w-6 h-6"></i><span>HOTLINE TƯ VẤN 24/7</span></a>
                </div>
            </section>

            <!-- 8. FORM ĐĂNG KÝ VIP -->
            <section class="max-w-7xl mx-auto px-4">
                <div class="bg-gradient-to-br from-[#0B1B3D] to-[#07132B] border border-[#C5A059]/40 rounded-md p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-6 space-y-4">
                        <span class="text-xs font-bold text-[#E6CA65] uppercase tracking-widest">ĐẶC QUYỀN DÀNH CHO KHÁCH HÀNG VIP</span>
                        <h3 class="text-2xl sm:text-3xl font-black text-white font-serif uppercase">
                            Đăng Ký Nhận Bảng Giá Gốc & Vé Mời Tham Quan
                        </h3>
                        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Chiết khấu thanh toán sớm lên đến 12%, hỗ trợ lãi suất 0% trong 24 tháng và tặng gói nội thất thông minh 200 triệu đồng.
                        </p>
                        <div class="pt-2 space-y-2 text-xs text-slate-300">
                            <div class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-[#E6CA65]"></i> Hotline: <strong class="text-white"><?= htmlspecialchars($company_info['phone']) ?></strong></div>
                            <div class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-[#E6CA65]"></i> Email: <strong class="text-white"><?= htmlspecialchars($company_info['email']) ?></strong></div>
                            <div class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-[#E6CA65]"></i> Nhà mẫu: <strong class="text-white"><?= htmlspecialchars($company_info['address']) ?></strong></div>
                        </div>
                    </div>
                    <form onsubmit="handleFormSubmit(event)" action="api/contact.php" method="POST" class="lg:col-span-6 bg-white/5 border border-[#C5A059]/30 p-6 sm:p-8 rounded-sm backdrop-blur-md space-y-3 text-xs">
                        <input type="text" name="name" placeholder="Họ và tên của bạn (*)..." required class="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#E6CA65]">
                        <input type="tel" name="phone" placeholder="Số điện thoại (*)..." required class="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-[#E6CA65] font-black placeholder-slate-400 focus:outline-none focus:border-[#E6CA65]">
                        <input type="email" name="email" placeholder="Email nhận thông tin..." class="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-white placeholder-slate-400 focus:outline-none focus:border-[#E6CA65]">
                        <select name="product_type" class="w-full bg-[#0B1B3D] border border-white/20 rounded-sm p-3 text-white font-bold focus:outline-none cursor-pointer">
                            <option class="text-slate-900 bg-white font-medium" value="Căn hộ 1 Phòng Ngủ">Căn hộ 1 Phòng Ngủ (52 m²)</option>
                            <option class="text-slate-900 bg-white font-medium" value="Căn hộ 2 Phòng Ngủ">Căn hộ 2 Phòng Ngủ (72.5 m²)</option>
                            <option class="text-slate-900 bg-white font-medium" value="Căn hộ 3 Phòng Ngủ">Căn hộ 3 Phòng Ngủ (108 m²)</option>
                            <option class="text-slate-900 bg-white font-medium" value="Sky Villa Penthouse">Sky Villa Penthouse (265 m²)</option>
                        </select>
                        <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] hover:from-[#E6CA65] hover:to-[#C5A059] text-[#07132B] font-black text-xs uppercase tracking-wider rounded-sm shadow-xl transition cursor-pointer active:scale-95">
                            ĐĂNG KÝ TƯ VẤN VIP NGAY
                        </button>
                    </form>
                </div>
            </section>
        </div>

        <!-- APARTMENTS PAGE -->
        <div id="page-can-ho" class="page-section bg-[#07132B] text-slate-100 py-12 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 space-y-8">
                <div class="text-xs text-slate-400 flex items-center gap-1.5">
                    <span onclick="navigate('home')" class="hover:text-[#E6CA65] cursor-pointer">Tổng quan</span>
                    <span>/</span>
                    <span class="text-[#E6CA65] font-bold">Mặt bằng căn hộ</span>
                </div>
                <div class="border-b border-[#C5A059]/30 pb-4">
                    <h1 class="text-2xl sm:text-3xl font-black text-white font-serif uppercase">MẶT BẰNG & DANH SÁCH CĂN HỘ</h1>
                    <p class="text-xs text-slate-400 mt-1">Toàn bộ căn hộ được trang bị nội thất mạ vàng Kohler và công nghệ SmartHome 4.0</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="apartments-page-grid">
                    <!-- Injected via JS -->
                </div>
            </div>
        </div>

        <!-- PROPERTY DETAIL PAGE -->
        <div id="page-property-detail" class="page-section bg-[#07132B] text-slate-100 py-12 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 space-y-8">
                <div class="text-xs text-slate-400 flex items-center gap-1.5">
                    <span onclick="navigate('home')" class="hover:text-[#E6CA65] cursor-pointer">Tổng quan</span>
                    <span>/</span>
                    <span onclick="navigate('can-ho')" class="hover:text-[#E6CA65] cursor-pointer">Căn hộ</span>
                    <span>/</span>
                    <span class="text-[#E6CA65] font-bold truncate" id="pd-breadcrumb">Căn hộ...</span>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-8 space-y-6">
                        <div class="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm backdrop-blur-md space-y-3">
                            <span class="px-3 py-1 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-[#07132B] font-black text-xs rounded-sm" id="pd-badge">Badge</span>
                            <h1 class="text-xl sm:text-2xl font-black text-white font-serif leading-snug" id="pd-title">Title</h1>
                            <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                                <div><span class="text-xs text-slate-400 block font-medium">Giá bán dự kiến</span><span class="text-2xl font-black text-[#E6CA65]" id="pd-price">Price</span></div>
                                <div class="text-right"><span class="text-xs text-slate-400 block font-medium">Diện tích thông thủy</span><span class="text-base font-bold text-white" id="pd-area">Area</span></div>
                            </div>
                        </div>
                        <div class="bg-white/5 border border-[#C5A059]/30 p-4 rounded-sm space-y-3">
                            <div class="h-80 sm:h-96 rounded-sm overflow-hidden bg-slate-900">
                                <img id="pd-main-img" src="" alt="" class="w-full h-full object-cover">
                            </div>
                            <div class="grid grid-cols-3 gap-3" id="pd-gallery"></div>
                        </div>
                        <div class="bg-white/5 border border-[#C5A059]/30 p-6 rounded-sm space-y-4 text-xs">
                            <h3 class="font-black text-sm text-[#E6CA65] uppercase tracking-wider font-serif border-b border-white/10 pb-2">TIÊU CHUẨN BÀN GIAO MẠ VÀNG 4.0</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="pd-specs"></div>
                            <p class="text-slate-300 leading-relaxed pt-2" id="pd-desc"></p>
                        </div>
                    </div>
                    <div class="lg:col-span-4 space-y-6">
                        <div class="bg-gradient-to-b from-[#0B1B3D] to-[#07132B] border border-[#C5A059]/40 p-6 rounded-sm space-y-4">
                            <h3 class="font-black text-base text-[#E6CA65] font-serif uppercase">Đăng Ký Tham Quan Căn Hộ Này</h3>
                            <form onsubmit="handleFormSubmit(event)" action="api/contact.php" method="POST" class="space-y-3 text-xs">
                                <input type="hidden" name="source" id="pd-source" value="Website">
                                <input type="text" name="name" placeholder="Họ và tên của bạn..." required class="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-white focus:outline-none focus:border-[#E6CA65]">
                                <input type="tel" name="phone" placeholder="Số điện thoại..." required class="w-full bg-white/10 border border-white/20 rounded-sm p-3 text-[#E6CA65] font-bold focus:outline-none focus:border-[#E6CA65]">
                                <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-[#07132B] font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition cursor-pointer">XÁC NHẬN ĐẶT LỊCH XEM</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- NEWS PAGE -->
        <div id="page-news" class="page-section bg-[#07132B] text-slate-100 py-12 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 space-y-8">
                <div class="text-xs text-slate-400 flex items-center gap-1.5">
                    <span onclick="navigate('home')" class="hover:text-[#E6CA65] cursor-pointer">Tổng quan</span>
                    <span>/</span>
                    <span class="text-[#E6CA65] font-bold">Tin tức & Sự kiện</span>
                </div>
                <div class="border-b border-[#C5A059]/30 pb-4">
                    <h1 class="text-2xl sm:text-3xl font-black text-white font-serif uppercase">TIN TỨC & TIẾN ĐỘ THI CÔNG</h1>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="news-page-grid"></div>
            </div>
        </div>

        <!-- ARTICLE DETAIL PAGE -->
        <div id="page-news-detail" class="page-section bg-[#07132B] text-slate-100 py-12 min-h-screen">
            <div class="max-w-7xl mx-auto px-4 max-w-4xl space-y-6">
                <div class="text-xs text-slate-400 flex items-center gap-1.5">
                    <span onclick="navigate('home')" class="hover:text-[#E6CA65] cursor-pointer">Tổng quan</span>
                    <span>/</span>
                    <span onclick="navigate('news')" class="hover:text-[#E6CA65] cursor-pointer">Tin tức</span>
                    <span>/</span>
                    <span class="text-[#E6CA65] font-bold truncate" id="ad-breadcrumb">Tiêu đề...</span>
                </div>
                <div class="bg-white/5 border border-[#C5A059]/30 p-6 sm:p-8 rounded-md backdrop-blur-md space-y-6">
                    <span class="px-3 py-1 bg-[#C5A059] text-[#07132B] font-bold text-xs rounded-sm" id="ad-category">Category</span>
                    <h1 class="text-2xl sm:text-3xl font-black text-white font-serif leading-tight" id="ad-title">Title</h1>
                    <div class="text-xs text-slate-400 flex flex-wrap items-center gap-4 border-b border-white/10 pb-3" id="ad-meta"></div>
                    <div class="rounded-sm overflow-hidden shadow-2xl">
                        <img id="ad-img" src="" alt="" class="w-full h-80 object-cover">
                    </div>
                    <div class="space-y-4 text-sm text-slate-300 leading-relaxed" id="ad-content"></div>
                </div>
            </div>
        </div>
    </main>

    <!-- FOOTER -->
    <footer class="bg-[#0B1B3D] text-slate-300 border-t border-[#C5A059]/30 pt-16 pb-8 text-sm mt-auto">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div class="space-y-4">
                    <div class="text-xl font-black tracking-widest text-[#E6CA65] uppercase font-serif"><?= htmlspecialchars($company_info['name']) ?></div>
                    <p class="text-xs leading-relaxed text-slate-400"><?= htmlspecialchars($company_info['slogan']) ?>. Chuyên cung cấp giải pháp giao diện tối ưu chuyển đổi.</p>
                </div>
                <div class="space-y-4">
                    <h4 class="text-white font-bold uppercase tracking-wider text-xs">Liên Kết Nhanh</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="#" onclick="navigate('home')" class="hover:text-[#E6CA65] transition">Tổng Quan</a></li>
                        <li><a href="#" onclick="navigate('can-ho')" class="hover:text-[#E6CA65] transition">Căn Hộ</a></li>
                        <li><a href="#" onclick="navigate('news')" class="hover:text-[#E6CA65] transition">Tin Tức</a></li>
                        <li><a href="#" onclick="navigate('contact')" class="hover:text-[#E6CA65] transition">Liên Hệ</a></li>
                    </ul>
                </div>
                <div class="space-y-4">
                    <h4 class="text-white font-bold uppercase tracking-wider text-xs">Pháp Lý</h4>
                    <ul class="space-y-2 text-xs">
                        <li><a href="#" class="hover:text-[#E6CA65] transition">Chính sách bảo mật</a></li>
                        <li><a href="#" class="hover:text-[#E6CA65] transition">Điều khoản sử dụng</a></li>
                    </ul>
                </div>
                <div class="space-y-4">
                    <h4 class="text-white font-bold uppercase tracking-wider text-xs">Liên Hệ</h4>
                    <ul class="space-y-2 text-xs">
                        <li class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-[#E6CA65]"></i> <?= htmlspecialchars($company_info['phone']) ?></li>
                        <li class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-[#E6CA65]"></i> <?= htmlspecialchars($company_info['email']) ?></li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-white/10 text-center text-xs text-slate-500">
                &copy; <?= date('Y') ?> <?= htmlspecialchars($company_info['name']) ?>. Bản quyền thuộc về Sunshine City Saigon Landmark.
            </div>
        </div>
    </footer>

    <!-- Floating CTAs -->
    <div class="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-3">
        <a href="tel:<?= preg_replace('/[^0-9]/', '', $company_info['phone']) ?>" class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer relative group animate-bounce">
            <i data-lucide="phone" class="w-6 h-6"></i>
        </a>
    </div>

    <!-- JAVASCRIPT -->
    <script>
        // Initialize Lucide Icons
        lucide.createIcons();

        // Data from PHP
        const BDS04_UNITS = <?= json_encode($projects) ?>;
        const BDS04_NEWS = <?= json_encode($news) ?>;

        // State
        let currentUnit = null;
        let currentArticle = null;
        let activeGalleryIdx = 0;

        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            const icon = document.getElementById('menu-icon');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                icon.setAttribute('data-lucide', 'x');
            } else {
                menu.classList.add('hidden');
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        }

        function navigate(page, slug = null) {
            // Hide all pages
            document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
            // Close mobile menu
            document.getElementById('mobile-menu').classList.add('hidden');
            document.getElementById('menu-icon').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Update Active Nav Buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                if(btn.dataset.page === page || (btn.dataset.page === 'news' && page === 'news-detail')) {
                    btn.classList.add('bg-[#C5A059]', 'text-[#07132B]', 'font-black', 'shadow-md');
                    btn.classList.remove('text-slate-200', 'hover:text-[#E6CA65]', 'hover:bg-white/5');
                } else {
                    btn.classList.remove('bg-[#C5A059]', 'text-[#07132B]', 'font-black', 'shadow-md');
                    btn.classList.add('text-slate-200', 'hover:text-[#E6CA65]', 'hover:bg-white/5');
                }
            });

            if (['home', 'vi-tri', 'cong-nghe', 'tien-ich', 'contact'].includes(page)) {
                document.getElementById('page-home').classList.add('active');
            } else if (page === 'can-ho' || page === 'mat-bang') {
                document.getElementById('page-can-ho').classList.add('active');
            } else if (page === 'news') {
                document.getElementById('page-news').classList.add('active');
            } else if (page === 'property-detail' && slug) {
                currentUnit = BDS04_UNITS.find(u => u.slug === slug);
                renderPropertyDetail();
                document.getElementById('page-property-detail').classList.add('active');
            } else if (page === 'news-detail' && slug) {
                currentArticle = BDS04_NEWS.find(a => a.slug === slug);
                renderArticleDetail();
                document.getElementById('page-news-detail').classList.add('active');
            } else {
                document.getElementById('page-home').classList.add('active');
            }
        }

        function handleFormSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            
            if (!formData.get('name') || !formData.get('phone')) {
                alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
                return;
            }

            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    alert('🎉 Đăng ký thành công! Chuyên viên tư vấn VIP sẽ sớm liên hệ với quý khách.');
                    form.reset();
                } else {
                    alert('Lỗi: ' + data.message);
                }
            })
            .catch(err => {
                alert('Có lỗi xảy ra, vui lòng thử lại sau.');
            });
        }

        function createUnitCard(unit) {
            return `
                <div onclick="navigate('property-detail', '${unit.slug}')" class="bg-white/5 border border-[#C5A059]/30 hover:border-[#E6CA65] rounded-sm overflow-hidden shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between">
                    <div>
                        <div class="h-48 relative overflow-hidden bg-slate-900">
                            <img src="${unit.image}" alt="${unit.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                            <span class="absolute top-3 left-3 px-3 py-0.5 bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-[#07132B] font-black text-[10px] rounded-sm shadow">${unit.badge}</span>
                            <span class="absolute bottom-3 right-3 px-2.5 py-0.5 bg-black/80 backdrop-blur-xs text-white font-bold text-[10px] rounded">${unit.type}</span>
                        </div>
                        <div class="p-4 space-y-2.5">
                            <h3 class="font-bold text-xs sm:text-sm text-white group-hover:text-[#E6CA65] transition line-clamp-2 leading-snug font-serif">${unit.title}</h3>
                            <div class="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                                <div><span class="text-[10px] text-slate-400 block">Giá bán</span><span class="font-black text-[#E6CA65] text-sm">${unit.price}</span></div>
                                <div class="text-right"><span class="text-[10px] text-slate-400 block">Diện tích</span><span class="font-bold text-slate-200">${unit.area}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3.5 bg-white/5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                        <span>${unit.bedrooms} PN • ${unit.bathrooms} WC</span>
                        <span class="text-[#E6CA65] font-bold group-hover:translate-x-0.5 transition">Chi tiết ›</span>
                    </div>
                </div>
            `;
        }

        function createNewsCard(art) {
            return `
                <div onclick="navigate('news-detail', '${art.slug}')" class="bg-white/5 border border-[#C5A059]/30 hover:border-[#E6CA65] rounded-sm overflow-hidden shadow-xl transition cursor-pointer group flex flex-col justify-between">
                    <div class="h-48 overflow-hidden bg-slate-900">
                        <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                            <span class="text-[10px] font-bold text-[#E6CA65] uppercase tracking-wider">${art.category}</span>
                            <h3 class="font-bold text-sm text-white group-hover:text-[#E6CA65] transition line-clamp-2 leading-snug mt-1 font-serif">${art.title}</h3>
                            <p class="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">${art.desc || art.short_desc}</p>
                        </div>
                        <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                            <span>${art.date}</span>
                            <span class="text-[#E6CA65] font-bold">Xem chi tiết ›</span>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderPropertyDetail() {
            if (!currentUnit) return;
            activeGalleryIdx = 0;
            document.getElementById('pd-breadcrumb').innerText = currentUnit.title;
            document.getElementById('pd-badge').innerText = currentUnit.badge;
            document.getElementById('pd-title').innerText = currentUnit.title;
            document.getElementById('pd-price').innerText = currentUnit.price;
            document.getElementById('pd-area').innerText = currentUnit.area;
            document.getElementById('pd-main-img').src = currentUnit.gallery && currentUnit.gallery.length > 0 ? currentUnit.gallery[0] : currentUnit.image;
            
            const galleryHtml = (currentUnit.gallery || []).map((img, i) => `
                <div onclick="setGalleryImage(${i})" class="h-24 rounded-sm overflow-hidden cursor-pointer border-2 transition ${i === 0 ? 'border-[#E6CA65]' : 'border-transparent opacity-70 hover:opacity-100'} gallery-thumb">
                    <img src="${img}" class="w-full h-full object-cover" />
                </div>
            `).join('');
            document.getElementById('pd-gallery').innerHTML = galleryHtml;

            const specsHtml = (currentUnit.specs || []).map(sp => `
                <div class="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg">
                    <i data-lucide="check-circle-2" class="w-4 h-4 text-[#E6CA65] shrink-0"></i>
                    <span>${sp}</span>
                </div>
            `).join('');
            document.getElementById('pd-specs').innerHTML = specsHtml;
            document.getElementById('pd-desc').innerText = currentUnit.desc || currentUnit.description;
            
            document.getElementById('pd-source').value = 'Căn hộ: ' + currentUnit.title;
            
            lucide.createIcons();
        }

        function setGalleryImage(idx) {
            activeGalleryIdx = idx;
            document.getElementById('pd-main-img').src = currentUnit.gallery[idx] || currentUnit.image;
            const thumbs = document.querySelectorAll('.gallery-thumb');
            thumbs.forEach((t, i) => {
                if(i === idx) {
                    t.classList.add('border-[#E6CA65]');
                    t.classList.remove('border-transparent', 'opacity-70');
                } else {
                    t.classList.remove('border-[#E6CA65]');
                    t.classList.add('border-transparent', 'opacity-70');
                }
            });
        }

        function renderArticleDetail() {
            if (!currentArticle) return;
            document.getElementById('ad-breadcrumb').innerText = currentArticle.title;
            document.getElementById('ad-category').innerText = currentArticle.category;
            document.getElementById('ad-title').innerText = currentArticle.title;
            document.getElementById('ad-meta').innerHTML = `
                <span>Ngày đăng: ${currentArticle.date}</span><span>•</span>
                <span>Tác giả: ${currentArticle.author}</span><span>•</span>
                <span>${currentArticle.views} lượt xem</span>
            `;
            document.getElementById('ad-img').src = currentArticle.image;
            
            const contentHtml = (currentArticle.content || []).map(p => `<p>${p}</p>`).join('');
            document.getElementById('ad-content').innerHTML = contentHtml;
        }

        // Init
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('home-apartments-grid').innerHTML = BDS04_UNITS.map(createUnitCard).join('');
            document.getElementById('apartments-page-grid').innerHTML = BDS04_UNITS.map(createUnitCard).join('');
            document.getElementById('home-news-grid').innerHTML = BDS04_NEWS.map(createNewsCard).join('');
            document.getElementById('news-page-grid').innerHTML = BDS04_NEWS.map(createNewsCard).join('');
            navigate('home');
        });
    </script>
</body>
</html>