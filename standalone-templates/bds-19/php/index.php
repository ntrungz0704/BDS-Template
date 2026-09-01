<?php
$db_file = __DIR__ . '/config/db.php';
$pdo = null;
if (file_exists($db_file)) {
    require_once $db_file;
}

$company_info = [
    'name' => 'TEMPLATESBDS',
    'address' => 'Phú Thuận, Tân Phú, Quận 7, TP.HCM',
    'phone' => '0919 006 030',
    'email' => 'contact@templatesbds.com',
    'slogan' => 'CĂN HỘ NGHỈ DƯỠNG THÔNG MINH 4.0 — QUẬN 7',
    'zalo' => '0919006030'
];

$projects = [];
$news = [];

if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company_info = $row;
        }

        $stmt = $pdo->query("SELECT * FROM projects");
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $pdo->query("SELECT * FROM news");
        $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Fallback to defaults
    }
}

if (empty($projects)) {
    $projects = [
        [
            'id' => 'can-1pn-s1-venus',
            'title' => 'Căn Hộ Thông Minh 1 Phòng Ngủ Tòa S1 Venus View Sông Cả Cấm',
            'code' => 'S1-0812',
            'slug' => 'can-ho-1-phong-ngu-s1-venus-view-song',
            'tower' => 'Tòa S1 - Venus',
            'type' => '1 Phòng Ngủ',
            'floor' => 'Tầng 12',
            'price' => '3.45 Tỷ VNĐ',
            'area' => '52 m²',
            'beds' => 1,
            'baths' => 1,
            'view' => 'Trực diện sông Cả Cấm & Công viên ven sông',
            'direction' => 'Hướng Đông Nam',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            'hot' => 1,
            'description' => 'Căn hộ ứng dụng công nghệ Smart Home 4.0 toàn diện, thiết bị vệ sinh Kohler dát vàng, kính Low-E tràn viền chống tia cực tím.',
            'smartFeatures' => '["Khóa cửa nhận diện khuôn mặt FaceID", "Điều khiển SmartHome qua Sunshine App", "Kính Low-E 3 lớp cách nhiệt", "Hệ thống lọc khí tươi chuyên dụng"]'
        ],
        [
            'id' => 'can-2pn-s4-mercury',
            'title' => 'Căn Hộ Góc 2 Phòng Ngủ Tòa S4 Mercury View Toàn Cảnh Phú Mỹ Hưng',
            'code' => 'S4-1806',
            'slug' => 'can-ho-goc-2-phong-ngu-s4-mercury-view-pmh',
            'tower' => 'Tòa S4 - Mercury',
            'type' => '2 Phòng Ngủ',
            'floor' => 'Tầng 18',
            'price' => '4.85 Tỷ VNĐ',
            'area' => '76 m²',
            'beds' => 2,
            'baths' => 2,
            'view' => 'View Panorama Phú Mỹ Hưng & Crescent Mall',
            'direction' => 'Hướng Nam - Đông Nam',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            'hot' => 1,
            'description' => 'Căn góc 2 mặt thoáng ngập tràn ánh sáng tự nhiên, phòng khách ban công kính nối dài tạo cảm giác không gian mở vô tận.',
            'smartFeatures' => '["Bãi đỗ xe thông minh tự định vị chỗ", "Hệ thống rèm & đèn tự động theo ngữ cảnh", "Nội thất nhập khẩu từ Ý", "Tặng gói Smarthome trị giá 100Tr"]'
        ],
        [
            'id' => 'can-3pn-s7-jupiter',
            'title' => 'Căn Hộ 3 Phòng Ngủ Hoàng Gia Tòa S7 Jupiter Suite VIP',
            'code' => 'S7-2802',
            'slug' => 'can-ho-3-phong-ngu-s7-jupiter-suite-vip',
            'tower' => 'Tòa S7 - Jupiter',
            'type' => '3 Phòng Ngủ',
            'floor' => 'Tầng 28',
            'price' => '6.90 Tỷ VNĐ',
            'area' => '105 m²',
            'beds' => 3,
            'baths' => 2,
            'view' => 'View sông Sài Gòn & Tháp Bitexco Quận 1',
            'direction' => 'Hướng Đông Bắc',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            'hot' => 0,
            'description' => 'Không gian sống xứng tầm chủ nhân danh giá, phòng ngủ Master có bồn tắm kính nhìn ra đường chân trời thành phố lung linh về đêm.',
            'smartFeatures' => '["Thang máy nhận diện thẻ VIP & FaceID", "Bình nước nóng trung tâm thái dương năng", "Chuông hình kỹ thuật số liên lạc sảnh", "Bảo hiểm căn hộ 5 năm"]'
        ],
        [
            'id' => 'penthouse-s9-king',
            'title' => 'Penthouse Duplex Dát Vàng Đỉnh Tháp S9 King View Triệu Đô',
            'code' => 'S9-PH01',
            'slug' => 'penthouse-duplex-dat-vang-dinh-thap-s9-king',
            'tower' => 'Tòa S9 - King',
            'type' => 'Penthouse Dát Vàng',
            'floor' => 'Tầng 36 - 37',
            'price' => '18.5 Tỷ VNĐ',
            'area' => '235 m²',
            'beds' => 4,
            'baths' => 4,
            'view' => 'View 360 độ sông Sài Gòn & Trung tâm tài chính Q1',
            'direction' => 'Hướng Đông Nam',
            'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
            'hot' => 1,
            'description' => 'Tuyệt phẩm độc bản trên đỉnh mây trời với sân vườn Sky Garden riêng biệt, bể bơi vô cực và nội thất dát vàng thủ công.',
            'smartFeatures' => '["Hồ bơi Sky Pool riêng biệt", "Sảnh thang máy riêng cho gia chủ", "Hệ thống an ninh 4 lớp tích hợp AI", "Dịch vụ quản gia cao cấp"]'
        ],
        [
            'id' => 'can-2pn-s2-mars',
            'title' => 'Căn Hộ 2 Phòng Ngủ Tiêu Chuẩn Quốc Tế Tòa S2 Mars',
            'code' => 'S2-1405',
            'slug' => 'can-ho-2-phong-ngu-s2-mars',
            'tower' => 'Tòa S2 - Mars',
            'type' => '2 Phòng Ngủ',
            'floor' => 'Tầng 14',
            'price' => '4.35 Tỷ VNĐ',
            'area' => '69 m²',
            'beds' => 2,
            'baths' => 2,
            'view' => 'Nội khu thác nước tràn nghệ thuật & Hồ bơi bốn mùa',
            'direction' => 'Hướng Tây Nam',
            'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
            'hot' => 0,
            'description' => 'Thiết kế vuông vắn tối đa diện tích sử dụng, tầm nhìn xanh mát hướng hồ cảnh quan và vườn thiền thư giãn.',
            'smartFeatures' => '["Công nghệ Smart Lock 5 trong 1", "Điều hòa âm trần Daikin Inverter", "Chiết khấu thanh toán sớm 10%", "Hỗ trợ lãi suất 0% trong 24 tháng"]'
        ],
        [
            'id' => 'sky-villa-s1-venus',
            'title' => 'Sky Villa Thông Tầng View Sông Sài Gòn Đẳng Cấp Thượng Lưu',
            'code' => 'S1-SV02',
            'slug' => 'sky-villa-thong-tang-view-song-sai-gon',
            'tower' => 'Tòa S1 - Venus',
            'type' => 'Sky Villa',
            'floor' => 'Tầng 32 - 33',
            'price' => '26.0 Tỷ VNĐ',
            'area' => '310 m²',
            'beds' => 5,
            'baths' => 5,
            'view' => 'Trọn vẹn 3 mặt sông Sài Gòn & Cầu Phú Mỹ',
            'direction' => 'Hướng Đông Nam',
            'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'hot' => 1,
            'description' => 'Biệt thự trên không với trần cao 7m, phòng chiếu phim gia đình, hầm rượu cá nhân và sân tắm nắng phong cách resort.',
            'smartFeatures' => '["Bãi đỗ trực thăng trên nóc tòa nhà", "Nội thất may đo thủ công Versace Home", "Hệ thống lọc nước uống tại vòi chuẩn Mỹ", "Đặc quyền câu lạc bộ du thuyền VIP"]'
        ]
    ];
}

if (empty($news)) {
    $news = [
        [
            'id' => 1,
            'title' => 'Sunshine Group Được Vinh Danh Là Nhà Phát Triển Bất Động Sản Công Nghệ Tốt Nhất 2026',
            'slug' => 'sunshine-group-nha-phat-trien-bds-cong-nghe-tot-nhat',
            'date' => '28/08/2026',
            'author' => 'Vietnam Property Awards',
            'category' => 'Giải Thưởng',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            'excerpt' => 'Hệ sinh thái Smart Living 4.0 và giải pháp thanh toán số Sunshine Pay tạo bước đột phá trong quản lý vận hành đô thị thông minh.',
            'content' => '["Sunshine City Saigon là dự án tiên phong áp dụng công nghệ vạn vật kết nối IoT và nhận diện khuôn mặt FaceID tại TP.HCM.","Dự án nhận được sự đánh giá cao từ hội đồng giám khảo quốc tế về giải pháp kiến trúc kính Low-E mạ vàng phủ kín toàn bộ mặt ngoài."]',
            'views' => 6120
        ],
        [
            'id' => 2,
            'title' => 'Chính Thức Bàn Giao Tháp S1 Venus & Cất Nóc Tháp S4 Mercury Vượt Tiến Độ',
            'slug' => 'ban-giao-thap-s1-venus-cat-noc-thap-s4-mercury',
            'date' => '26/08/2026',
            'author' => 'Ban Quản Lý Dự Án',
            'category' => 'Tiến Độ',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            'excerpt' => 'Hơn 400 cư dân đầu tiên chính thức nhận chìa khóa tổ ấm và tận hưởng chuỗi tiện ích nội khu đã hoàn thiện 100%.',
            'content' => '["Tại sự kiện bàn giao, cư dân bày tỏ sự hài lòng tuyệt đối với chất lượng thi công và vật liệu bàn giao vượt cam kết ban đầu."]',
            'views' => 4250
        ],
        [
            'id' => 3,
            'title' => 'Trải Nghiệm Hệ Sinh Thái Sunshine 4.0 Thông Qua Sunshine App',
            'slug' => 'trai-nghiem-he-sinh-thai-sunshine-4-0',
            'date' => '24/08/2026',
            'author' => 'Công Nghệ Sunshine Tech',
            'category' => 'Công Nghệ 4.0',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            'excerpt' => 'Chỉ với một chiếc smartphone, cư dân có thể điều khiển toàn bộ thiết bị trong nhà, gọi thang máy, đặt chỗ tiện ích và thanh toán hóa đơn.',
            'content' => '["Ứng dụng Sunshine App kết nối toàn diện hơn 50 tiện ích và dịch vụ ẩm thực, giáo dục Sunshine School, chăm sóc y tế tại gia."]',
            'views' => 5310
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SUNSHINE CITY SAIGON - BDS 19 Template</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        amber: {
                            200: '#fde68a',
                            300: '#fcd34d',
                            400: '#fbbf24',
                            500: '#f59e0b',
                            600: '#d97706',
                            700: '#b45309',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Merriweather', 'serif'],
                    }
                }
            }
        }
    </script>

    <style>
        .MAX_W { max-w-7xl mx-auto }
        /* Add smooth scrolling */
        html { scroll-behavior: smooth; }
        
        .page-section { display: none; }
        .page-section.active { display: block; }
    </style>
</head>
<body class="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#D4AF37] selection:text-slate-950">

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-24 right-6 z-50 bg-[#0F1E36] text-white border border-[#D4AF37] px-5 py-3 shadow-2xl font-bold text-xs items-center gap-2 animate-bounce" style="display: none;">
        <i data-lucide="check-circle-2" class="text-amber-300 w-4 h-4"></i> <span id="toast-message"></span>
    </div>

    <!-- Video Modal -->
    <div id="video-modal" class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" style="display: none;">
        <div class="bg-black max-w-3xl w-full aspect-video relative shadow-2xl border border-amber-300/40">
            <button onclick="closeVideoModal()" class="absolute top-3 right-3 z-10 p-2 bg-white/20 text-white hover:bg-white/40">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
            <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0" title="Sunshine City Saigon Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- HEADER -->
    <header class="sticky top-0 z-40 bg-[#0F1E36] text-white shadow-xl border-b border-amber-500/30">
        <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
            <!-- Brand -->
            <div onclick="navigate('home')" class="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E5B869] via-[#D4AF37] to-[#9A7B4F] flex items-center justify-center text-slate-950 font-serif font-black text-base sm:text-xl shadow-md border border-amber-200 shrink-0">
                    ☀️
                </div>
                <div class="min-w-0 truncate">
                    <span class="text-base sm:text-2xl font-serif font-black tracking-wider text-amber-300 block leading-none truncate">
                        SUNSHINE CITY <span class="text-white">SAIGON</span>
                    </span>
                    <span class="text-[7.5px] sm:text-[8.5px] font-bold text-amber-200/80 uppercase tracking-widest block mt-0.5 truncate">
                        <?php echo htmlspecialchars($company_info['slogan']); ?>
                    </span>
                </div>
            </div>

            <!-- Desktop Menu -->
            <nav class="hidden xl:flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap">
                <button onclick="navigate('home')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="home">Trang Chủ</button>
                <button onclick="navigate('overview')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="overview">Tổng Quan</button>
                <button onclick="navigate('location')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="location">Vị Trí</button>
                <button onclick="navigate('amenities')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="amenities">Tiện Ích</button>
                <button onclick="navigate('floor-plans')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="floor-plans">Mặt Bằng</button>
                <button onclick="navigate('smart-living')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="smart-living">Căn Hộ 4.0</button>
                <button onclick="navigate('ecosystem')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="ecosystem">Hệ Sinh Thái</button>
                <button onclick="navigate('pricing')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="pricing">Bảng Giá</button>
                <button onclick="navigate('news')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="news">Tin Tức</button>
                <button onclick="navigate('contact')" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300" data-page="contact">Liên Hệ</button>
            </nav>

            <!-- Right CTA -->
            <div class="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
                <button onclick="scrollToEl('dang-ky-bang-gia')" class="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#E5B869] to-[#D4AF37] hover:from-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer">
                    Nhận Bảng Giá 4.0
                </button>
                <button onclick="toggleMobileMenu()" class="p-1.5 sm:p-2 text-white xl:hidden hover:bg-white/10 rounded-md shrink-0 flex items-center justify-center">
                    <i data-lucide="menu" id="menu-icon" class="w-5 h-5"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <div id="mobile-menu" class="hidden xl:hidden bg-[#0A1324] border-t border-amber-500/30 px-6 py-4 space-y-2">
            <div class="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
                <button onclick="navigate('home')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Trang Chủ</button>
                <button onclick="navigate('overview')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Tổng Quan</button>
                <button onclick="navigate('location')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Vị Trí</button>
                <button onclick="navigate('amenities')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Tiện Ích</button>
                <button onclick="navigate('floor-plans')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Mặt Bằng</button>
                <button onclick="navigate('smart-living')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Căn Hộ 4.0</button>
                <button onclick="navigate('ecosystem')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Hệ Sinh Thái</button>
                <button onclick="navigate('pricing')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Bảng Giá</button>
                <button onclick="navigate('news')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Tin Tức</button>
                <button onclick="navigate('contact')" class="p-2.5 text-left bg-[#14294D] hover:text-amber-300">Liên Hệ</button>
            </div>
        </div>
    </header>

    <!-- CONTENT WRAPPER -->
    <div id="content-wrapper">
        
        <!-- SECTION: HERO -->
        <section id="section-hero" class="relative bg-slate-950 text-white min-h-[460px] sm:min-h-[560px] flex items-center justify-center overflow-hidden border-b border-amber-500/30">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-black/40 to-transparent"></div>
            
            <div class="relative z-20 text-center space-y-4 max-w-4xl mx-auto px-4">
                <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[#E5B869] to-[#9A7B4F] flex items-center justify-center text-slate-950 font-serif font-black text-2xl shadow-2xl border-2 border-amber-200">☀️</div>
                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-amber-300 tracking-wider drop-shadow-2xl"><?php echo htmlspecialchars($company_info['name']); ?></h1>
                <p class="text-xs sm:text-base text-slate-200 max-w-2xl mx-auto font-medium">Nơi hội tụ tinh hoa đẳng cấp thượng lưu — Quần thể 9 tòa tháp căn hộ thông minh 4.0 dát vàng bên sông Cả Cấm Quận 7.</p>
                <div class="pt-4 flex items-center justify-center gap-6">
                    <button onclick="openVideoModal()" class="w-14 h-14 bg-gradient-to-tr from-[#E5B869] to-[#D4AF37] text-slate-950 flex items-center justify-center shadow-xl hover:scale-110 transition cursor-pointer" title="Xem Video TVC 360">
                        <i data-lucide="play" class="w-5 h-5 fill-slate-950 ml-0.5"></i>
                    </button>
                    <button onclick="scrollToEl('danh-sach-can-ho')" class="w-14 h-14 bg-[#14294D] border-2 border-amber-400 text-amber-300 flex items-center justify-center shadow-xl hover:scale-110 transition cursor-pointer" title="Khám phá bảng hàng">
                        <i data-lucide="building-2" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </section>

        <!-- SECTION: OVERVIEW -->
        <section id="section-overview" class="py-16 bg-white text-slate-900 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 space-y-8">
                <div class="text-center space-y-2">
                    <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-[#0F1E36]">
                        TỔNG QUAN <span class="text-[#D4AF37]"><?php echo htmlspecialchars($company_info['name']); ?></span>
                    </h2>
                    <div class="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
                </div>
                <div class="bg-[#0F1E36] text-white p-6 sm:p-10 border border-amber-500/40 shadow-2xl">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-6 relative aspect-[16/10] overflow-hidden border-2 border-amber-300/40 shadow-lg">
                            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="w-full h-full object-cover" />
                        </div>
                        <div class="lg:col-span-6 space-y-4">
                            <span class="text-xs font-black uppercase text-amber-300 tracking-widest block">GIỚI THIỆU DỰ ÁN</span>
                            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">Tọa lạc tại vị trí vàng trung tâm Quận 7, liền kề khu đô thị kiểu mẫu Phú Mỹ Hưng, Sunshine City Saigon là tổ hợp căn hộ cao cấp chuẩn khách sạn 5 sao ứng dụng công nghệ 4.0 đầu tiên tại TP.HCM.</p>
                            <div class="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-white/10">
                                <div class="bg-[#14294D] p-3 border border-amber-500/20">
                                    <span class="text-slate-400 block text-[10px]">TỔNG DIỆN TÍCH</span>
                                    <strong class="text-amber-300 text-sm font-black">9.9 Hecta</strong>
                                </div>
                                <div class="bg-[#14294D] p-3 border border-amber-500/20">
                                    <span class="text-slate-400 block text-[10px]">QUY MÔ DỰ ÁN</span>
                                    <strong class="text-amber-300 text-sm font-black">9 Tháp (26 - 38 Tầng)</strong>
                                </div>
                                <div class="bg-[#14294D] p-3 border border-amber-500/20">
                                    <span class="text-slate-400 block text-[10px]">SỐ LƯỢNG CĂN HỘ</span>
                                    <strong class="text-amber-300 text-sm font-black">3.748 Căn Hộ VIP</strong>
                                </div>
                                <div class="bg-[#14294D] p-3 border border-amber-500/20">
                                    <span class="text-slate-400 block text-[10px]">HÌNH THỨC SỞ HỮU</span>
                                    <strong class="text-amber-300 text-sm font-black">Sổ Hồng Lâu Dài</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: LOCATION -->
        <section id="section-location" class="py-16 bg-[#0F1E36] text-white">
            <div class="max-w-7xl mx-auto px-4 space-y-10">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-6 space-y-4">
                        <span class="text-xs font-black uppercase text-amber-300 tracking-widest block">VỊ TRÍ KIM CƯƠNG</span>
                        <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">TRUNG TÂM ĐẮC ĐỊA BÊN SÔNG CẢ CẤM</h2>
                        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">Tọa lạc tại ngã ba sông Cả Cấm thơ mộng thuộc đường Phú Thuận, Phường Tân Phú, Quận 7. Dự án hưởng trọn không gian sinh thái trong lành và khả năng liên kết hoàn hảo với trung tâm hành chính tài chính:</p>
                        <ul class="space-y-2.5 text-xs text-slate-200">
                            <li class="flex items-center gap-2">📍 <strong>Liền kề Phú Mỹ Hưng:</strong> 3 phút tới Trung tâm Hội chợ SECC & Crescent Mall</li>
                            <li class="flex items-center gap-2">📍 <strong>Hệ thống Y tế Quốc tế:</strong> 5 phút tới Bệnh viện FV & Bệnh viện Tim Tâm Đức</li>
                            <li class="flex items-center gap-2">📍 <strong>Giáo dục Quốc tế:</strong> 8 phút tới Trường Quốc tế Canada, SSIS & Đại học RMIT</li>
                            <li class="flex items-center gap-2">📍 <strong>Trung tâm Quận 1 & Thủ Thiêm:</strong> 15 phút di chuyển theo tuyến Nguyễn Lương Bằng & Huỳnh Tấn Phát</li>
                        </ul>
                    </div>
                    <div class="lg:col-span-6 relative aspect-[4/3] overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-slate-900">
                        <iframe src="https://maps.google.com/maps?q=Phu+Thuan+Tan+Phu+Quan+7+Ho+Chi+Minh&t=&z=14&ie=UTF8&iwloc=&output=embed" class="w-full h-full border-0" allowfullscreen loading="lazy"></iframe>
                    </div>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 border-t border-white/10 text-center text-xs">
                    <div class="bg-[#14294D] p-3 border border-amber-500/20">
                        <span class="text-amber-300 font-bold block">Hành Chính Q7</span>
                        <span class="text-[10px] text-slate-400">Cách 1.0 km</span>
                    </div>
                    <div class="bg-[#14294D] p-3 border border-amber-500/20">
                        <span class="text-amber-300 font-bold block">SECC & Crescent</span>
                        <span class="text-[10px] text-slate-400">Cách 1.5 km</span>
                    </div>
                    <div class="bg-[#14294D] p-3 border border-amber-500/20">
                        <span class="text-amber-300 font-bold block">BV FV & Tâm Đức</span>
                        <span class="text-[10px] text-slate-400">Cách 2.0 km</span>
                    </div>
                    <div class="bg-[#14294D] p-3 border border-amber-500/20">
                        <span class="text-amber-300 font-bold block">Đại học RMIT</span>
                        <span class="text-[10px] text-slate-400">Cách 3.5 km</span>
                    </div>
                    <div class="bg-[#14294D] p-3 border border-amber-500/20">
                        <span class="text-amber-300 font-bold block">SC VivoCity</span>
                        <span class="text-[10px] text-slate-400">Cách 3.0 km</span>
                    </div>
                    <div class="bg-[#14294D] p-3 border border-amber-500/20">
                        <span class="text-amber-300 font-bold block">Chợ Bến Thành Q1</span>
                        <span class="text-[10px] text-slate-400">Cách 6.0 km</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: GOLDEN VALUES -->
        <section id="section-golden" class="relative py-20 bg-slate-950 text-white overflow-hidden border-b border-amber-500/30">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" onerror="this.src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'" class="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            <div class="max-w-7xl mx-auto px-4 relative z-20">
                <div class="max-w-2xl space-y-4">
                    <div class="inline-block px-4 py-1.5 bg-[#D4AF37] text-slate-950 text-xs font-black uppercase tracking-wider">
                        GIÁ TRỊ VÀNG CỦA <?php echo htmlspecialchars($company_info['name']); ?>
                    </div>
                    <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">
                        Nội Thất Mạ Vàng & Kính Low-E Tràn Viền Đẳng Cấp
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        Toàn bộ 9 tòa tháp được bao bọc 100% bằng hệ thống kính Low-E đổi màu cách âm cách nhiệt và thiết bị nội thất nhập khẩu trực tiếp từ các thương hiệu danh tiếng của Ý mạ vàng tinh xảo.
                    </p>
                </div>
            </div>
        </section>

        <!-- SECTION: AMENITIES -->
        <section id="section-amenities" class="py-16 bg-white text-slate-900 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div class="lg:col-span-6 space-y-5">
                        <span class="text-xs font-black uppercase text-amber-600 tracking-widest block">ĐẶC QUYỀN CƯ DÂN</span>
                        <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-[#0F1E36]">CHUỖI TIỆN ÍCH ĐỈNH CAO CHUẨN 5 SAO</h2>
                        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Hơn 50 tiện ích nội khu đỉnh cao mang lại phong cách sống nghỉ dưỡng trọn vẹn mỗi ngày cho mọi thế hệ trong gia đình:</p>
                        <div class="grid grid-cols-2 gap-3 text-xs">
                            <div class="flex items-center gap-2">🏊 <strong>Bể bơi vô cực chân mây</strong></div>
                            <div class="flex items-center gap-2">🍸 <strong>Sky Bar & Rooftop Lounge</strong></div>
                            <div class="flex items-center gap-2">🚁 <strong>Sân đỗ trực thăng nóc tháp</strong></div>
                            <div class="flex items-center gap-2">💆 <strong>Trung tâm Spa & Massage VIP</strong></div>
                            <div class="flex items-center gap-2">🏋 <strong>Phòng Gym hiện đại 1000m²</strong></div>
                            <div class="flex items-center gap-2">🌊 <strong>Thác tràn nghệ thuật liên hoàn</strong></div>
                            <div class="flex items-center gap-2">🌳 <strong>Vườn dạo bộ lưng chừng trời</strong></div>
                            <div class="flex items-center gap-2">🎬 <strong>Rạp chiếu phim công nghệ 4D</strong></div>
                        </div>
                    </div>
                    <div class="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-xl">
                        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80" onerror="this.src='https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'" class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: SMART LIVING -->
        <section id="section-smart-living" class="py-16 bg-[#0F1E36] text-white border-b border-amber-500/30">
            <div class="max-w-7xl mx-auto px-4 space-y-10">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-6 relative aspect-[16/10] overflow-hidden border-2 border-amber-300/40 shadow-xl">
                        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'" class="w-full h-full object-cover" />
                    </div>
                    <div class="lg:col-span-6 space-y-4">
                        <span class="text-xs font-black uppercase text-amber-300 tracking-widest block">CÔNG NGHỆ TIÊN PHONG</span>
                        <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">HỆ SINH THÁI SUNSHINE 4.0 THÔNG MINH</h2>
                        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">Sunshine Group tiên phong kiến tạo cuộc sống số với giải pháp quản lý đô thị bằng trí tuệ nhân tạo AI và mạng lưới vạn vật kết nối IoT:</p>
                        <div class="space-y-2 text-xs text-slate-200">
                            <div class="flex items-center gap-2">📱 <strong>Sunshine App:</strong> Điều khiển hệ thống chiếu sáng, rèm cửa, máy lạnh từ xa.</div>
                            <div class="flex items-center gap-2">🔐 <strong>FaceID An Ninh:</strong> Tự động mở cửa sảnh và gọi thang máy đến đúng tầng căn hộ.</div>
                            <div class="flex items-center gap-2">🚗 <strong>Smart Parking:</strong> Hướng dẫn đỗ xe thông minh và báo trước vị trí còn trống.</div>
                            <div class="flex items-center gap-2">💳 <strong>Sunshine Pay:</strong> Ví điện tử thanh toán mọi hóa đơn dịch vụ tích tắc không tiền mặt.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION: FLOOR PLANS (INVENTORY) -->
        <section id="section-floor-plans" class="py-16 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 space-y-8">
                <div class="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#0F1E36] pb-3 gap-4">
                    <div>
                        <span class="text-xs font-black uppercase text-amber-600 tracking-widest block">BẢNG HÀNG NGOẠI GIAO TRỰC TIẾP CHỦ ĐẦU TƯ</span>
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">DANH SÁCH CĂN HỘ ĐANG MỞ BÁN (<span id="unit-count">6</span>)</h2>
                    </div>
                    <div class="flex flex-wrap items-center gap-2 text-xs">
                        <select id="filterTower" class="bg-white text-slate-900 border border-slate-300 px-3 py-2 focus:outline-none font-medium">
                            <option class="text-slate-900 bg-white font-medium" value="all">Tòa Tháp (Tất cả)</option>
                            <option value="Tòa S1 - Venus">Tòa S1 - Venus</option>
                            <option value="Tòa S2 - Mars">Tòa S2 - Mars</option>
                            <option value="Tòa S4 - Mercury">Tòa S4 - Mercury</option>
                            <option value="Tòa S7 - Jupiter">Tòa S7 - Jupiter</option>
                            <option value="Tòa S9 - King">Tòa S9 - King</option>
                        </select>
                        <select id="filterType" class="bg-white text-slate-900 border border-slate-300 px-3 py-2 focus:outline-none font-medium">
                            <option class="text-slate-900 bg-white font-medium" value="all">Loại Căn Hộ (Tất cả)</option>
                            <option value="1 Phòng Ngủ">1 Phòng Ngủ</option>
                            <option value="2 Phòng Ngủ">2 Phòng Ngủ</option>
                            <option value="3 Phòng Ngủ">3 Phòng Ngủ</option>
                            <option value="Penthouse Dát Vàng">Penthouse Dát Vàng</option>
                            <option value="Sky Villa">Sky Villa</option>
                        </select>
                        <button onclick="renderUnits()" class="px-4 py-2 bg-[#0F1E36] hover:bg-[#14294D] text-white font-bold uppercase shadow cursor-pointer">Lọc</button>
                    </div>
                </div>
                
                <div id="units-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Units dynamically generated via JS -->
                </div>
            </div>
        </section>

        <!-- SECTION: NEWS -->
        <section id="section-news" class="py-16 bg-white text-slate-900 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 space-y-8">
                <div class="flex items-center justify-between border-b-2 border-[#D4AF37] pb-3">
                    <h2 class="text-2xl font-serif font-black uppercase text-[#0F1E36]">TIN TỨC <?php echo htmlspecialchars($company_info['name']); ?></h2>
                    <button onclick="navigate('news')" class="text-xs font-bold text-[#D4AF37] hover:underline">Xem Tất Cả Tin Tức ›</button>
                </div>
                <div id="news-container" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- News dynamically generated via JS -->
                </div>
            </div>
        </section>

        <!-- SECTION: INQUIRY -->
        <div id="section-inquiry">
            <div class="bg-[#D4AF37] text-slate-950 py-4 px-4">
                <div class="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-xs font-black uppercase">
                    <div class="flex items-center justify-center gap-2">📞 Hotline: <?php echo htmlspecialchars($company_info['phone']); ?></div>
                    <div class="flex items-center justify-center gap-2">📐 Mặt Bằng 3D 4.0</div>
                    <div class="flex items-center justify-center gap-2">📥 Tải Trọn Bộ Brochure</div>
                    <div class="flex items-center justify-center gap-2">💰 Bảng Giá Ngoại Giao</div>
                    <div class="flex items-center justify-center gap-2">🏠 Xem Nhà Mẫu 24/7</div>
                </div>
            </div>

            <section id="dang-ky-bang-gia" class="py-16 bg-[#0F1E36] text-white">
                <div class="max-w-7xl mx-auto px-4 max-w-xl text-center space-y-6">
                    <div class="space-y-2">
                        <span class="text-xs font-black uppercase text-amber-300 tracking-widest block">CHÍNH SÁCH BÁN HÀNG ƯU ĐÃI ĐẶC BIỆT</span>
                        <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white">ĐĂNG KÝ NHẬN BẢNG GIÁ NGOẠI GIAO</h2>
                        <p class="text-xs text-slate-300">Chiết khấu lên đến 10% giá trị căn hộ và miễn phí 2 năm phí quản lý dịch vụ tiêu chuẩn 5 sao.</p>
                    </div>

                    <form id="contact-form" action="api/contact.php" method="POST" onsubmit="handleInquirySubmit(event)" class="bg-[#14294D] p-6 border border-amber-500/30 text-left text-xs space-y-3 shadow-2xl">
                        <div>
                            <label class="block font-bold text-slate-300 mb-1">Họ và tên quý khách *</label>
                            <input type="text" name="name" id="name" required placeholder="Nguyễn Văn A" class="w-full bg-[#0F1E36] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-amber-400" />
                        </div>
                        <div>
                            <label class="block font-bold text-slate-300 mb-1">Số điện thoại nhận bảng giá *</label>
                            <input type="tel" name="phone" id="phone" required placeholder="<?php echo htmlspecialchars($company_info['phone']); ?>" class="w-full bg-[#0F1E36] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-amber-400" />
                        </div>
                        <div>
                            <label class="block font-bold text-slate-300 mb-1">Tòa tháp quan tâm</label>
                            <select name="towerInterested" id="towerInterested" class="w-full bg-[#0F1E36] border border-slate-700 p-2.5 text-white focus:outline-none focus:border-amber-400">
                                <option class="text-slate-900 bg-white font-medium" value="Tòa S1 - Venus">Tòa S1 - Venus (Mở bán đợt 1)</option>
                                <option class="text-slate-900 bg-white font-medium" value="Tòa S2 - Mars">Tòa S2 - Mars (View hồ bơi)</option>
                                <option class="text-slate-900 bg-white font-medium" value="Tòa S4 - Mercury">Tòa S4 - Mercury (View Phú Mỹ Hưng)</option>
                                <option class="text-slate-900 bg-white font-medium" value="Tòa S7 - Jupiter">Tòa S7 - Jupiter (View sông Sài Gòn)</option>
                                <option class="text-slate-900 bg-white font-medium" value="Tòa S9 - King">Tòa S9 - King (Penthouse độc bản)</option>
                            </select>
                        </div>
                        <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#E5B869] to-[#D4AF37] hover:from-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer transition">
                            Gửi Yêu Cầu Nhận Bảng Giá Gốc CĐT
                        </button>
                    </form>
                </div>
            </section>
        </div>

        <!-- SECTION: PROPERTY DETAIL -->
        <section id="section-property-detail" class="py-12 bg-white min-h-screen" style="display: none;">
            <div class="max-w-7xl mx-auto px-4 space-y-6">
                <button onclick="navigate('floor-plans')" class="text-xs font-bold text-[#0F1E36] hover:underline">‹ Quay lại bảng hàng căn hộ</button>
                <h1 id="pd-title" class="text-2xl sm:text-3xl font-serif font-black text-[#0F1E36] uppercase">Title</h1>
                <p id="pd-price" class="text-sm font-black text-[#E11D48]">Giá bán: ...</p>
                <div class="relative w-full aspect-video md:aspect-[21/9]">
                    <img id="pd-image" src="" alt="" class="w-full h-full object-cover rounded shadow" />
                </div>
                <p id="pd-desc" class="text-xs sm:text-sm text-slate-700 leading-relaxed">Desc</p>
                <div class="p-4 bg-[#0F1E36] text-white space-y-2 border border-amber-500/30">
                    <h4 class="font-bold text-xs uppercase text-amber-300">Công nghệ Smart Living 4.0 tích hợp:</h4>
                    <ul id="pd-features" class="grid grid-cols-2 gap-2 text-xs text-slate-200">
                    </ul>
                </div>
            </div>
        </section>

        <!-- SECTION: NEWS DETAIL -->
        <section id="section-news-detail" class="py-12 bg-white min-h-screen" style="display: none;">
            <div class="max-w-7xl mx-auto px-4 space-y-6">
                <button onclick="navigate('news')" class="text-xs font-bold text-[#0F1E36] hover:underline">‹ Quay lại trang tin tức</button>
                <h1 id="nd-title" class="text-2xl font-serif font-black text-[#0F1E36] uppercase">Title</h1>
                <div id="nd-meta" class="text-[11px] text-slate-400 border-b pb-2">Meta</div>
                <img id="nd-image" src="" alt="" class="w-full h-80 object-cover border" />
                <div id="nd-content" class="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed"></div>
            </div>
        </section>
    </div>

    <!-- FOOTER -->
    <footer class="bg-[#0A1324] text-white py-12 border-t border-amber-500/30">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="space-y-4">
                    <div class="text-2xl font-serif font-black text-amber-300"><?php echo htmlspecialchars($company_info['name']); ?></div>
                    <p class="text-xs text-slate-400">BDS-19 (<?php echo htmlspecialchars($company_info['slogan']); ?>)</p>
                </div>
                <div>
                    <h4 class="font-bold text-amber-300 mb-4 text-sm">Liên Hệ</h4>
                    <ul class="text-xs text-slate-400 space-y-2">
                        <li>📍 <?php echo htmlspecialchars($company_info['address']); ?></li>
                        <li>📞 <?php echo htmlspecialchars($company_info['phone']); ?></li>
                        <li>✉️ <?php echo htmlspecialchars($company_info['email']); ?></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-amber-300 mb-4 text-sm">Liên Kết</h4>
                    <ul class="text-xs text-slate-400 space-y-2">
                        <li><a href="#" onclick="navigate('overview')">Tổng quan</a></li>
                        <li><a href="#" onclick="navigate('floor-plans')">Mặt bằng</a></li>
                        <li><a href="#" onclick="navigate('pricing')">Bảng giá</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-amber-300 mb-4 text-sm">Mạng Xã Hội</h4>
                    <div class="flex gap-4">
                        <a href="#" class="text-slate-400 hover:text-white">FB</a>
                        <a href="#" class="text-slate-400 hover:text-white">YT</a>
                        <a href="#" class="text-slate-400 hover:text-white">IG</a>
                    </div>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-white/10 text-center text-xs text-slate-500">
                &copy; <?php echo date('Y'); ?> <?php echo htmlspecialchars($company_info['name']); ?>. All rights reserved.
            </div>
        </div>
    </footer>

    <!-- SCRIPTS -->
    <script>
        const BDS19_UNITS = <?php echo json_encode($projects); ?>;
        const BDS19_NEWS = <?php echo json_encode($news); ?>;
        
        // Parse JSON strings back to arrays if they are strings
        BDS19_UNITS.forEach(u => {
            if (typeof u.smartFeatures === 'string') {
                try { u.smartFeatures = JSON.parse(u.smartFeatures); } catch(e) { u.smartFeatures = []; }
            }
        });
        
        BDS19_NEWS.forEach(n => {
            if (typeof n.content === 'string') {
                try { n.content = JSON.parse(n.content); } catch(e) { n.content = []; }
            }
        });

        let currentPage = 'home';
        let mobileMenuOpen = false;

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').innerText = msg;
            toast.style.display = 'flex';
            setTimeout(() => { toast.style.display = 'none'; }, 4000);
        }

        function toggleMobileMenu() {
            mobileMenuOpen = !mobileMenuOpen;
            document.getElementById('mobile-menu').style.display = mobileMenuOpen ? 'block' : 'none';
        }

        function openVideoModal() {
            document.getElementById('video-modal').style.display = 'flex';
        }

        function closeVideoModal() {
            document.getElementById('video-modal').style.display = 'none';
        }

        function scrollToEl(id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }

        const pagesConfig = {
            'home': ['hero', 'overview', 'location', 'golden', 'amenities', 'smart-living', 'floor-plans', 'news', 'inquiry'],
            'overview': ['overview', 'golden', 'inquiry'],
            'location': ['location', 'inquiry'],
            'amenities': ['amenities', 'inquiry'],
            'floor-plans': ['floor-plans', 'inquiry'],
            'smart-living': ['smart-living', 'inquiry'],
            'ecosystem': ['smart-living', 'amenities', 'inquiry'],
            'pricing': ['inquiry'],
            'news': ['news', 'inquiry'],
            'contact': ['location', 'inquiry'],
            'property-detail': ['property-detail'],
            'news-detail': ['news-detail']
        };

        function navigate(page) {
            currentPage = page;
            if (mobileMenuOpen) toggleMobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Hide all sections
            document.querySelectorAll('section[id^="section-"], div[id="section-inquiry"]').forEach(el => el.style.display = 'none');
            
            // Show relevant sections
            const config = pagesConfig[page] || pagesConfig['home'];
            config.forEach(sec => {
                const el = document.getElementById(`section-${sec}`);
                if (el) el.style.display = sec === 'inquiry' ? 'block' : (el.tagName === 'DIV' ? 'block' : 'block');
            });

            // Active state
            document.querySelectorAll('.nav-btn').forEach(btn => {
                if(btn.dataset.page === page) {
                    btn.classList.add('text-amber-300', 'font-extrabold', 'bg-[#14294D]');
                } else {
                    btn.classList.remove('text-amber-300', 'font-extrabold', 'bg-[#14294D]');
                }
            });
        }

        function renderUnits() {
            const filterTower = document.getElementById('filterTower').value;
            const filterType = document.getElementById('filterType').value;
            
            let filtered = BDS19_UNITS.filter(u => {
                if (filterTower !== 'all' && u.tower !== filterTower) return false;
                if (filterType !== 'all') {
                    const f = filterType.toLowerCase();
                    const t = (u.type || '').toLowerCase();
                    if (t !== f && !t.includes(f) && !f.includes(t)) return false;
                }
                return true;
            });

            document.getElementById('unit-count').innerText = filtered.length;
            const container = document.getElementById('units-container');
            
            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full p-12 text-center bg-white border border-slate-200 space-y-3">
                        <p class="text-sm font-bold text-slate-600">Không tìm thấy căn hộ nào khớp với tiêu chí lọc.</p>
                        <button onclick="document.getElementById('filterTower').value='all';document.getElementById('filterType').value='all';renderUnits();" class="px-5 py-2 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase shadow">
                            Xem Toàn Bộ Bảng Hàng
                        </button>
                    </div>`;
            } else {
                container.innerHTML = filtered.map(unit => `
                    <div class="bg-white text-slate-900 border border-slate-300 shadow-sm hover:shadow-xl transition flex flex-col justify-between group overflow-hidden font-medium">
                        <div class="relative aspect-[16/10] overflow-hidden bg-slate-950">
                            <img src="${unit.image}" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#0F1E36] text-amber-300 text-[10px] font-black uppercase">
                                ${unit.code} • ${unit.tower}
                            </span>
                            ${unit.hot ? '<span class="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase">HOT</span>' : ''}
                        </div>
                        <div class="p-4 space-y-2">
                            <h3 onclick="openPropertyDetail('${unit.id}')" class="text-xs font-serif font-black text-slate-900 uppercase line-clamp-2 hover:text-[#D4AF37] cursor-pointer min-h-[34px]">
                                ${unit.title}
                            </h3>
                            <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 border border-slate-200">
                                <div>📐 Diện tích: <strong>${unit.area}</strong></div>
                                <div>🏢 Tầng: <strong>${unit.floor}</strong></div>
                                <div>🧭 Hướng: <strong>${unit.direction}</strong></div>
                                <div>🛏 Phòng: <strong>${unit.beds} PN • ${unit.baths} WC</strong></div>
                            </div>
                            <p class="text-[11px] text-amber-700 font-medium truncate">🌊 ${unit.view}</p>
                            <div class="pt-3 border-t flex items-center justify-between">
                                <span class="text-sm font-black text-[#E11D48]">${unit.price}</span>
                                <button onclick="openPropertyDetail('${unit.id}')" class="px-3 py-1.5 bg-[#0F1E36] hover:bg-[#14294D] text-amber-300 font-bold text-xs uppercase transition cursor-pointer">
                                    Chi Tiết ›
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            if (currentPage !== 'home' && currentPage !== 'floor-plans') {
                navigate('home');
            }
        }

        function renderNews() {
            const container = document.getElementById('news-container');
            container.innerHTML = BDS19_NEWS.map(n => `
                <div class="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden">
                    <img src="${n.image}" class="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
                    <div class="p-4 space-y-2">
                        <span class="text-[10px] font-bold text-[#D4AF37] uppercase">${n.category} • ${n.date}</span>
                        <h3 onclick="openNewsDetail(${n.id})" class="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#D4AF37] cursor-pointer">
                            ${n.title}
                        </h3>
                        <p class="text-xs text-slate-600 line-clamp-2">${n.excerpt}</p>
                    </div>
                </div>
            `).join('');
        }

        function openPropertyDetail(id) {
            const unit = BDS19_UNITS.find(u => u.id === id || u.id == id);
            if (unit) {
                document.getElementById('pd-title').innerText = `${unit.title} (${unit.code})`;
                document.getElementById('pd-price').innerText = `Giá bán: ${unit.price} — Tòa: ${unit.tower} — Diện tích: ${unit.area}`;
                document.getElementById('pd-image').src = unit.image;
                document.getElementById('pd-desc').innerText = unit.description;
                document.getElementById('pd-features').innerHTML = unit.smartFeatures.map(f => `<li class="flex items-center gap-1.5">⚡ ${f}</li>`).join('');
                navigate('property-detail');
            }
        }

        function openNewsDetail(id) {
            const article = BDS19_NEWS.find(a => a.id === id || a.id == id);
            if (article) {
                document.getElementById('nd-title').innerText = article.title;
                document.getElementById('nd-meta').innerText = `🕒 ${article.date} • Tác giả: ${article.author} • ${article.views} lượt xem`;
                document.getElementById('nd-image').src = article.image;
                document.getElementById('nd-content').innerHTML = article.content.map(p => `<p>${p}</p>`).join('');
                navigate('news-detail');
            }
        }

        function handleInquirySubmit(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            if (!name || !phone) {
                alert('Vui lòng nhập họ tên và số điện thoại nhận bảng giá ngoại giao!');
                return;
            }
            
            const formData = new FormData(e.target);
            fetch('api/contact.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showToast(`🎉 Tiếp nhận yêu cầu nhận bảng giá từ ${name} (${phone}). Giám đốc kinh doanh Sunshine City Saigon sẽ liên hệ ngay!`);
                    e.target.reset();
                } else {
                    alert('Lỗi: ' + data.message);
                }
            })
            .catch(() => {
                showToast(`🎉 Tiếp nhận yêu cầu nhận bảng giá từ ${name} (${phone}). Giám đốc kinh doanh Sunshine City Saigon sẽ liên hệ ngay!`);
                e.target.reset();
            });
        }

        // Init
        document.addEventListener('DOMContentLoaded', () => {
            renderUnits();
            renderNews();
            navigate('home');
            lucide.createIcons();
        });
    </script>
</body>
</html>