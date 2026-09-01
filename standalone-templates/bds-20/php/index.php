<?php
// Fallback defaults
$company_name = "TEMPLATESBDS";
$slogan = "KHU ĐÔ THỊ CÔNG VIÊN & HỒ ĐIỀU HÒA SINH THÁI";
$phone = "0900 000 000";
$email = "info@templatesbds.com";
$address = "Khu đô thị Ecopark, Văn Giang, Hưng Yên";
$zalo = "0900000000";

$projects = [];
$news = [];

// DB Connection
if (file_exists(__DIR__ . '/config/db.php')) {
    require_once __DIR__ . '/config/db.php';
}

if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($info = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company_name = $info['name'] ?: $company_name;
            $slogan = $info['slogan'] ?: $slogan;
            $phone = $info['phone'] ?: $phone;
            $email = $info['email'] ?: $email;
            $address = $info['address'] ?: $address;
            $zalo = $info['zalo'] ?: $zalo;
        }

        $stmt = $pdo->query("SELECT * FROM projects");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if (isset($row['specs']) && is_string($row['specs'])) {
                $row['specs'] = json_decode($row['specs'], true);
            }
            $row['hot'] = (bool)$row['hot'];
            $row['featured'] = (bool)$row['featured'];
            $row['priceNum'] = (float)$row['priceNum'];
            $row['areaNum'] = (int)$row['areaNum'];
            $row['beds'] = (int)$row['beds'];
            $row['baths'] = (int)$row['baths'];
            $projects[] = $row;
        }

        $stmt = $pdo->query("SELECT * FROM news");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if (isset($row['content']) && is_string($row['content'])) {
                $row['content'] = json_decode($row['content'], true);
            }
            $row['views'] = (int)$row['views'];
            $news[] = $row;
        }
    } catch (PDOException $e) {
        // Fallback to hardcoded later if arrays are empty
    }
}

if (empty($projects)) {
    // Fallback projects
    $projects = [
        [
            'id' => 'can-1pn-block-a-parkview', 'title' => 'Căn Hộ 1 Phòng Ngủ Eco Suite Block A View Công Viên Trung Tâm', 'code' => 'MPV-A0805', 'slug' => 'can-ho-1-phong-ngu-block-a-view-cong-vien', 'block' => 'Block A - Park View', 'type' => '1 Phòng Ngủ', 'floor' => 'Tầng 08', 'price' => '2.45 Tỷ VNĐ', 'priceNum' => 2.45, 'area' => '48 m²', 'areaNum' => 48, 'beds' => 1, 'baths' => 1, 'view' => 'Trực diện công viên cây xanh 100ha', 'direction' => 'Hướng Đông Nam', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'hot' => true, 'featured' => true, 'description' => 'Thiết kế thông minh đón gió tự nhiên 100%, ban công kính rộng ngắm trọn vẹn cảnh quan xanh mát lành.', 'specs' => ['Ban công ngắm công viên', 'Thiết bị Toto cao cấp', 'Kính Low-E cách âm', 'Sở hữu lâu dài']
        ],
        [
            'id' => 'can-2pn-block-b-lakeview', 'title' => 'Căn Hộ Góc 2 Phòng Ngủ Block B View Trực Diện Hồ Điều Hòa Sinh Thái', 'code' => 'MPV-B1502', 'slug' => 'can-ho-goc-2-phong-ngu-block-b-view-ho', 'block' => 'Block B - Lake View', 'type' => '2 Phòng Ngủ', 'floor' => 'Tầng 15', 'price' => '3.85 Tỷ VNĐ', 'priceNum' => 3.85, 'area' => '72 m²', 'areaNum' => 72, 'beds' => 2, 'baths' => 2, 'view' => 'View mặt nước hồ điều hòa & Thác tràn', 'direction' => 'Hướng Nam - Đông Nam', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'hot' => true, 'featured' => true, 'description' => 'Căn góc 2 mặt thoáng view trọn vẹn mặt hồ gợn sóng trong lành, không gian thoáng đãng nuôi dưỡng sức khỏe gia đình.', 'specs' => ['Căn góc 2 mặt thoáng', 'Phòng ngủ Master view hồ', 'Bàn giao sàn gỗ An Cường', 'Tặng gói Smart Home']
        ],
        [
            'id' => 'can-3pn-block-c-gardenview', 'title' => 'Căn Hộ 3 Phòng Ngủ Gia Đình Block C View Vườn Thiền Nhật Bản', 'code' => 'MPV-C2008', 'slug' => 'can-ho-3-phong-ngu-block-c-view-vuon-thien', 'block' => 'Block C - Garden View', 'type' => '3 Phòng Ngủ', 'floor' => 'Tầng 20', 'price' => '5.20 Tỷ VNĐ', 'priceNum' => 5.2, 'area' => '98 m²', 'areaNum' => 98, 'beds' => 3, 'baths' => 2, 'view' => 'View vườn thiền Zen Garden & Đồi cỏ hoa', 'direction' => 'Hướng Đông Bắc', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'hot' => false, 'featured' => true, 'description' => 'Không gian sống lý tưởng cho gia đình 3 thế hệ, phòng khách rộng hơn 40m² nối liền khu vực bếp và ban công ngắm hoa.', 'specs' => ['Bếp đảo phong cách châu Âu', 'Hệ thống lọc nước sạch', 'Miễn phí 2 năm phí dịch vụ', 'Hỗ trợ vay 70%']
        ],
        [
            'id' => 'duplex-block-d-skypalace', 'title' => 'Căn Hộ Duplex Thông Tầng Block D Sky Palace View Triệu Đô', 'code' => 'MPV-D2801', 'slug' => 'can-ho-duplex-thong-tang-block-d-sky-palace', 'block' => 'Block D - Sky Palace', 'type' => 'Duplex View Hồ', 'floor' => 'Tầng 28 - 29', 'price' => '9.50 Tỷ VNĐ', 'priceNum' => 9.5, 'area' => '168 m²', 'areaNum' => 168, 'beds' => 4, 'baths' => 4, 'view' => 'View 360 độ công viên hồ điều hòa và thành phố', 'direction' => 'Hướng Đông Nam', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'hot' => true, 'featured' => true, 'description' => 'Tuyệt tác duplex thông tầng cao 6m xa hoa bậc nhất, sở hữu ban công vườn treo riêng biệt ngắm trọn vẹn cảnh sắc thiên nhiên.', 'specs' => ['Thông tầng cao 6.2m', 'Sân vườn ban công 35m²', 'Thang máy riêng bảo mật', 'Sổ hồng vĩnh viễn']
        ],
        [
            'id' => 'can-2pn-block-a-parkview', 'title' => 'Căn Hộ 2 Phòng Ngủ Tiêu Chuẩn Quốc Tế Block A Park View', 'code' => 'MPV-A1203', 'slug' => 'can-ho-2-phong-ngu-tieu-chuan-block-a', 'block' => 'Block A - Park View', 'type' => '2 Phòng Ngủ', 'floor' => 'Tầng 12', 'price' => '3.35 Tỷ VNĐ', 'priceNum' => 3.35, 'area' => '65 m²', 'areaNum' => 65, 'beds' => 2, 'baths' => 2, 'view' => 'Nội khu hồ bơi sinh thái & Vườn hoa rực rỡ', 'direction' => 'Hướng Tây Nam', 'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'hot' => false, 'featured' => true, 'description' => 'Bố cục vuông vắn tối ưu công năng, phù hợp cho gia đình trẻ tìm kiếm chốn an cư trong lành cân bằng cuộc sống.', 'specs' => ['View hồ bơi sinh thái', 'Khóa từ vân tay 4 chức năng', 'Chiết khấu thanh toán 8%', 'Nhận nhà ở ngay']
        ],
        [
            'id' => 'penthouse-eco-block-b', 'title' => 'Penthouse Eco Resort Đỉnh Tháp Block B Mona Park View', 'code' => 'MPV-PH02', 'slug' => 'penthouse-eco-resort-dinh-thap-block-b', 'block' => 'Block B - Lake View', 'type' => 'Penthouse Eco', 'floor' => 'Tầng 30', 'price' => '14.8 Tỷ VNĐ', 'priceNum' => 14.8, 'area' => '220 m²', 'areaNum' => 220, 'beds' => 4, 'baths' => 4, 'view' => 'View đỉnh cao bao quát toàn bộ thung lũng xanh', 'direction' => 'Hướng Đông Nam', 'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'hot' => true, 'featured' => true, 'description' => 'Dinh thự trên mây với hồ bơi vô cực ngoài trời, quầy bar BBQ sân thượng và tầm nhìn ngút ngàn xanh mướt.', 'specs' => ['Bể bơi tràn bờ trên mái', 'Vườn nướng BBQ riêng', 'Nội thất nhập khẩu Ý', 'Dịch vụ quản gia 24/7']
        ]
    ];
}

if (empty($news)) {
    // Fallback news
    $news = [
        ['id' => 1, 'title' => 'Khánh Thành Công Viên Sinh Thái Trung Tâm 100ha & Hồ Điều Hòa Mona Park', 'slug' => 'khanh-thanh-cong-vien-sinh-thai-100ha', 'date' => '28/08/2026', 'author' => 'Ban Quản Lý Mona Park View', 'category' => 'Sự Kiện', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', 'excerpt' => 'Lá phổi xanh khổng lồ chính thức đi vào hoạt động, mang lại không gian vui chơi, tập luyện thể thao và tái tạo năng lượng cho cư dân.', 'content' => ['Công viên Mona Park View sở hữu đường chạy bộ ven hồ dài 5km, vườn thiền Nhật Bản và hồ cảnh quan sinh thái trong lành.', 'Dự án đạt giải thưởng Khu đô thị có cảnh quan sinh thái xuất sắc nhất năm 2026.'], 'views' => 4890],
        ['id' => 2, 'title' => 'Lễ Cất Nóc Block A & Block B Vượt Tiến Độ 45 Ngày', 'slug' => 'le-cat-noc-block-a-b-vuot-tien-do', 'date' => '26/08/2026', 'author' => 'Tổng Thầu Xây Dựng', 'category' => 'Tiến Độ', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'excerpt' => 'Chủ đầu tư cam kết bàn giao nhà đúng tiêu chuẩn chất lượng cao cấp và trao sổ hồng tận tay khách hàng.', 'content' => ['Toàn bộ công tác hoàn thiện mặt ngoài và ốp đá khối sảnh lễ tân đang được triển khai khẩn trương.'], 'views' => 3950],
        ['id' => 3, 'title' => 'Chính Sách Thanh Toán Nhẹ Nhàng 8 Đợt — Hỗ Trợ Lãi Suất 0% Trong 24 Tháng', 'slug' => 'chinh-sach-thanh-toan-8-dot-uu-dai', 'date' => '24/08/2026', 'author' => 'Phòng Kinh Doanh', 'category' => 'Chính Sách', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'excerpt' => 'Khách hàng chỉ cần thanh toán 15% để ký HĐMB, phần còn lại được giãn tiến độ theo tiến độ xây dựng hoặc nhận hỗ trợ tài chính từ ngân hàng đối tác.', 'content' => ['Ngân hàng Vietcombank và BIDV chính thức trở thành đối tác bảo lãnh dự án và giải ngân gói vay ưu đãi cho người mua nhà.', 'Lãi suất 0% và ân hạn nợ gốc được áp dụng lên tới 24 tháng hoặc đến khi nhận nhà, tùy điều kiện nào đến trước.'], 'views' => 5210]
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mona Park View - Khu ÄÃ´ Thá»‹ CÃ´ng ViÃªn Xanh & Há»“ Sinh ThÃ¡i</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Tailwind Config for Custom Colors -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Merriweather', 'serif'],
                    },
                }
            }
        }
    </script>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
            scroll-behavior: smooth;
        }
        h1, h2, h3, h4, h5, h6, .font-serif {
            font-family: 'Merriweather', serif;
        }
        
        /* Utility Classes from React */
        .MAX_W {
            max-width: 1200px;
        }
        
        .page-section {
            display: none;
        }
        .page-section.active {
            display: block;
        }
    </style>
</head>
<body class="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#0B4635] selection:text-amber-300">

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-24 right-6 z-50 bg-[#0B4635] text-white border border-amber-400 px-5 py-3 shadow-2xl font-bold text-xs items-center gap-2 animate-bounce hidden">
        <i data-lucide="check-circle-2" class="text-amber-300 w-4 h-4"></i> <span id="toast-msg"></span>
    </div>

    <!-- HEADER -->
    <header class="sticky top-0 z-40 bg-[#0B4635] text-white shadow-xl border-b border-amber-400/30">
        <div class="max-w-[1200px] mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
            
            <!-- Brand Logo -->
            <div onclick="navigate('home')" class="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none">
                <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E5B869] to-[#9A7B4F] flex items-center justify-center text-slate-950 font-serif font-black text-base sm:text-xl shadow border border-amber-200 shrink-0">
                    ðŸŒ¿
                </div>
                <div class="min-w-0 truncate">
                    <span class="text-base sm:text-2xl font-serif font-black tracking-wider text-amber-300 block leading-none truncate" id="company-name">
                        <?= htmlspecialchars($company_name) ?>
                    </span>
                    <span class="text-[7.5px] sm:text-[8.5px] font-bold text-amber-200/80 uppercase tracking-widest block mt-0.5 truncate">
                        KHU ÄÃ” THá»Š CÃ”NG VIÃŠN & Há»’ ÄIá»€U HÃ’A SINH THÃI
                    </span>
                </div>
            </div>

            <!-- Navigation Menu -->
            <nav class="hidden xl:flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap" id="desktop-nav">
                <button onclick="navigate('home')" data-page="home" class="nav-btn whitespace-nowrap px-3 py-2 transition-all text-amber-300 font-extrabold bg-[#072C21]">Trang Chá»§</button>
                <button onclick="navigate('overview')" data-page="overview" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">Tá»•ng Quan</button>
                <button onclick="navigate('location')" data-page="location" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">Vá»‹ TrÃ­</button>
                <button onclick="navigate('amenities')" data-page="amenities" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">Tiá»‡n Ãch</button>
                <button onclick="navigate('eco-park')" data-page="eco-park" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">KhÃ´ng Gian Xanh</button>
                <button onclick="navigate('floor-plans')" data-page="floor-plans" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">Máº·t Báº±ng</button>
                <button onclick="navigate('showroom')" data-page="showroom" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">CÄƒn Há»™ Máº«u</button>
                <button onclick="navigate('policy')" data-page="policy" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">ChÃ­nh SÃ¡ch</button>
                <button onclick="navigate('news')" data-page="news" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">Tin Tá»©c</button>
                <button onclick="navigate('contact')" data-page="contact" class="nav-btn whitespace-nowrap px-3 py-2 transition-all hover:text-amber-300">LiÃªn Há»‡</button>
            </nav>

            <!-- CTA Right -->
            <div class="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
                <button onclick="document.getElementById('form-dang-ky').scrollIntoView({ behavior: 'smooth' })" class="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#E5B869] to-[#D4AF37] hover:from-[#D4AF37] text-slate-950 font-black text-xs uppercase tracking-wider shadow cursor-pointer">
                    Nháº­n Báº£ng GiÃ¡ Gá»‘c
                </button>
                <button onclick="toggleMobileMenu()" class="p-1.5 sm:p-2 text-white xl:hidden hover:bg-white/10 rounded-md shrink-0 flex items-center justify-center" aria-label="Toggle navigation menu">
                    <i data-lucide="menu" id="menu-icon" class="w-5 h-5"></i>
                    <i data-lucide="x" id="close-icon" class="w-5 h-5 hidden"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <div id="mobile-menu" class="hidden xl:hidden bg-[#072C21] border-t border-amber-400/30 px-6 py-4 space-y-2 animate-in slide-in-from-top duration-200">
            <div class="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
                <button onclick="navigate('home')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Trang Chá»§</button>
                <button onclick="navigate('overview')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Tá»•ng Quan</button>
                <button onclick="navigate('location')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Vá»‹ TrÃ­</button>
                <button onclick="navigate('amenities')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Tiá»‡n Ãch</button>
                <button onclick="navigate('eco-park')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">KhÃ´ng Gian Xanh</button>
                <button onclick="navigate('floor-plans')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Máº·t Báº±ng</button>
                <button onclick="navigate('showroom')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">CÄƒn Há»™ Máº«u</button>
                <button onclick="navigate('policy')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">ChÃ­nh SÃ¡ch</button>
                <button onclick="navigate('news')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">Tin Tá»©c</button>
                <button onclick="navigate('contact')" class="p-2.5 text-left bg-[#0B4635] hover:text-amber-300">LiÃªn Há»‡</button>
            </div>
        </div>
    </header>

    <div id="main-content">
        <!-- Main views will be controlled via JS -->
        
        <!-- HERO SECTION -->
        <section id="hero-section" class="page-section relative bg-slate-950 text-white min-h-[460px] sm:min-h-[560px] flex items-center justify-center overflow-hidden border-b border-amber-400/30">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80" alt="Mona Park View Flycam" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="absolute inset-0 w-full h-full object-cover opacity-65" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B4635] via-black/30 to-transparent"></div>

            <div class="relative z-20 text-center space-y-4 max-w-4xl mx-auto px-4">
                <div class="inline-block px-4 py-1.5 bg-[#0B4635]/90 border border-amber-300/40 text-amber-200 text-xs font-black uppercase tracking-widest">
                    KHU ÄÃ” THá»Š SINH THÃI XANH TRUNG TÃ‚M
                </div>
                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-amber-300 tracking-wider drop-shadow-2xl">
                    <?= htmlspecialchars($company_name) ?>
                </h1>
                <p class="text-xs sm:text-base text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed">
                    Chá»‘n an cÆ° lÃ½ tÆ°á»Ÿng giá»¯a miá»n xanh thiÃªn nhiÃªn â€” HÆ°á»Ÿng trá»n táº§m nhÃ¬n Panorama Ã´m trá»n Ä‘áº¡i cÃ´ng viÃªn 100ha vÃ  há»“ cáº£nh quan sinh thÃ¡i.
                </p>
                <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <button onclick="document.getElementById('bang-hang-can-ho').scrollIntoView({ behavior: 'smooth' })" class="px-6 py-3 bg-[#D4AF37] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer">
                        KhÃ¡m PhÃ¡ Báº£ng HÃ ng â€º
                    </button>
                    <button onclick="document.getElementById('form-dang-ky').scrollIntoView({ behavior: 'smooth' })" class="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider border border-white/30 cursor-pointer">
                        ÄÄƒng KÃ½ Tham Quan 3D
                    </button>
                </div>
            </div>
        </section>

        <!-- OVERVIEW SECTION -->
        <section id="tong-quan" class="page-section py-16 bg-white text-slate-900 border-b border-slate-200">
            <div class="max-w-[1200px] mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div class="lg:col-span-6 space-y-4">
                        <span class="text-xs font-black uppercase text-amber-600 tracking-widest block">
                            MÃ” HÃŒNH ÄÃ” THá»Š NGHá»ˆ DÆ¯á» NG
                        </span>
                        <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-[#0B4635] leading-tight">
                            Mona Park View â€” ThÃ nh Phá»‘ Sinh ThÃ¡i Trong LÃ²ng ÄÃ´ Thá»‹
                        </h2>
                        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Vá»›i máº­t Ä‘á»™ xÃ¢y dá»±ng ká»· lá»¥c chá»‰ 19%, Mona Park View dÃ nh trá»n 81% quá»¹ Ä‘áº¥t cho há»‡ sinh thÃ¡i cÃ´ng viÃªn cÃ¢y xanh, máº·t nÆ°á»›c há»“ Ä‘iá»u hÃ²a vÃ  chuá»—i tiá»‡n Ã­ch chÄƒm sÃ³c sá»©c khá»e toÃ n diá»‡n.
                        </p>
                        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Dá»± Ã¡n lÃ  sá»± káº¿t tinh hoÃ n háº£o giá»¯a lá»‘i sá»‘ng xanh bá»n vá»¯ng vÃ  tiá»‡n nghi thÃ´ng minh hiá»‡n Ä‘áº¡i, mang láº¡i khÃ´ng gian sá»‘ng thanh khiáº¿t cho cá»™ng Ä‘á»“ng cÆ° dÃ¢n tinh hoa.
                        </p>
                        <div class="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
                            <div class="bg-slate-50 p-3 border border-slate-200">
                                <span class="text-slate-500 block text-[10px]">Máº¬T Äá»˜ XÃ‚Y Dá»°NG</span>
                                <strong class="text-[#0B4635] text-sm font-black">19.2 %</strong>
                            </div>
                            <div class="bg-slate-50 p-3 border border-slate-200">
                                <span class="text-slate-500 block text-[10px]">DIá»†N TÃCH CÃ”NG VIÃŠN</span>
                                <strong class="text-[#0B4635] text-sm font-black">100 Hecta</strong>
                            </div>
                            <div class="bg-slate-50 p-3 border border-slate-200">
                                <span class="text-slate-500 block text-[10px]">HÃŒNH THá»¨C Sá»ž Há»®U</span>
                                <strong class="text-[#0B4635] text-sm font-black">LÃ¢u DÃ i</strong>
                            </div>
                        </div>
                    </div>
                    <div class="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-xl">
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="Há»“ Ä‘iá»u hÃ²a sinh thÃ¡i" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>

        <!-- LOCATION SECTION -->
        <section id="vi-tri" class="page-section py-16 bg-[#0B4635] text-white">
            <div class="max-w-[1200px] mx-auto px-4 space-y-10">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-6 relative aspect-[4/3] overflow-hidden border-2 border-amber-300/40 shadow-2xl bg-slate-900">
                        <iframe src="https://maps.google.com/maps?q=Ecopark+Van+Giang+Hung+Yen&t=&z=13&ie=UTF8&iwloc=&output=embed" class="w-full h-full border-0" allowfullscreen loading="lazy"></iframe>
                    </div>
                    <div class="lg:col-span-6 space-y-4">
                        <span class="text-xs font-black uppercase text-amber-300 tracking-widest block">
                            Vá»Š TRÃ CHIáº¾N LÆ¯á»¢C
                        </span>
                        <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white leading-tight">
                            TÃ‚M ÄIá»‚M Káº¾T Ná»I VÃ™NG ÄÃ” THá»Š Vá»† TINH
                        </h2>
                        <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                            Náº±m táº¡i vá»‹ trÃ­ giao thoa cá»§a cÃ¡c trá»¥c giao thÃ´ng huyáº¿t máº¡ch, Mona Park View káº¿t ná»‘i nhanh chÃ³ng tá»›i cÃ¡c trung tÃ¢m hÃ nh chÃ­nh, giÃ¡o dá»¥c vÃ  giáº£i trÃ­:
                        </p>
                        <ul class="space-y-2.5 text-xs text-slate-200">
                            <li class="flex items-center gap-2">ðŸ“ <strong>Há»‡ thá»‘ng TrÆ°á»ng há»c Quá»‘c táº¿:</strong> CÃ¡ch 500m (2 phÃºt Ä‘i bá»™)</li>
                            <li class="flex items-center gap-2">ðŸ“ <strong>Bá»‡nh viá»‡n Äa khoa Quá»‘c táº¿:</strong> CÃ¡ch 1.2 km (4 phÃºt)</li>
                            <li class="flex items-center gap-2">ðŸ“ <strong>Trung tÃ¢m ThÆ°Æ¡ng máº¡i Vincom Mega Mall:</strong> CÃ¡ch 2.0 km (5 phÃºt)</li>
                            <li class="flex items-center gap-2">ðŸ“ <strong>Trung tÃ¢m HoÃ n Kiáº¿m / Phá»‘ Cá»•:</strong> 25 phÃºt qua cáº§u Thanh TrÃ¬ & VÄ©nh Tuy</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- ECO PARK SECTION -->
        <section id="khong-gian-xanh" class="page-section py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
            <div class="max-w-[1200px] mx-auto px-4 space-y-10">
                <div class="text-center space-y-2 max-w-2xl mx-auto">
                    <span class="text-xs font-black uppercase text-amber-600 tracking-widest">
                        Há»† SINH THÃI 365 NGÃ€Y NGHá»ˆ DÆ¯á» NG
                    </span>
                    <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#0B4635] uppercase">
                        TIá»†N ÃCH Äáº¶C QUYá»€N CHUáº¨N RESORT
                    </h2>
                    <p class="text-xs text-slate-600">
                        Táº­n hÆ°á»Ÿng chuá»—i tiá»‡n Ã­ch Ä‘a táº§ng Ä‘an xen giá»¯a khÃ´ng gian máº·t nÆ°á»›c vÃ  bÃ³ng mÃ¡t Ä‘áº¡i thá»¥ xanh tÆ°Æ¡i.
                    </p>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-xs">
                    <div class="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
                        <div class="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">ðŸŠ</div>
                        <strong class="block text-slate-900 font-bold">Há»“ BÆ¡i Sinh ThÃ¡i</strong>
                        <span class="text-[10px] text-slate-500">NÆ°á»›c máº·n bá»‘n mÃ¹a</span>
                    </div>
                    <div class="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
                        <div class="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">ðŸŒ³</div>
                        <strong class="block text-slate-900 font-bold">ÄÆ°á»ng Dáº¡o Bá»™ 5km</strong>
                        <span class="text-[10px] text-slate-500">Ven há»“ Ä‘iá»u hÃ²a</span>
                    </div>
                    <div class="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
                        <div class="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">ðŸ–</div>
                        <strong class="block text-slate-900 font-bold">VÆ°á»n NÆ°á»›ng BBQ</strong>
                        <span class="text-[10px] text-slate-500">Khu picnic gia Ä‘Ã¬nh</span>
                    </div>
                    <div class="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
                        <div class="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">ðŸŽ¾</div>
                        <strong class="block text-slate-900 font-bold">SÃ¢n Tennis & Gym</strong>
                        <span class="text-[10px] text-slate-500">Thá»ƒ thao Ä‘a nÄƒng</span>
                    </div>
                    <div class="bg-white p-4 border border-slate-200 shadow-sm space-y-2">
                        <div class="w-12 h-12 mx-auto bg-[#0B4635] text-amber-300 flex items-center justify-center text-xl font-bold">ðŸ§˜</div>
                        <strong class="block text-slate-900 font-bold">VÆ°á»n Thiá»n Yoga</strong>
                        <span class="text-[10px] text-slate-500">TÃ¡i táº¡o nÄƒng lÆ°á»£ng</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- FLOOR PLANS SECTION -->
        <section id="bang-hang-can-ho" class="page-section py-16 bg-white border-b border-slate-200">
            <div class="max-w-[1200px] mx-auto px-4 space-y-8">
                <div class="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#0B4635] pb-3 gap-4">
                    <div>
                        <span class="text-xs font-black uppercase text-amber-600 tracking-widest block">
                            Máº¶T Báº°NG Táº¦NG ÄIá»‚N HÃŒNH & Báº¢NG HÃ€NG
                        </span>
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase" id="unit-count-title">
                            DANH SÃCH CÄ‚N Há»˜ ÄANG Má»ž BÃN
                        </h2>
                    </div>
                    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 text-xs w-full lg:w-auto">
                        <select id="filterBlock" class="w-full sm:w-auto bg-slate-50 border border-slate-300 px-3 py-2 focus:outline-none">
                            <option class="text-slate-900 bg-white font-medium" value="all">TÃ²a Block (Táº¥t cáº£)</option>
                        </select>
                        <select id="filterType" class="w-full sm:w-auto bg-slate-50 border border-slate-300 px-3 py-2 focus:outline-none">
                            <option class="text-slate-900 bg-white font-medium" value="all">Loáº¡i CÄƒn Há»™ (Táº¥t cáº£)</option>
                        </select>
                        <button onclick="handleSearchSubmit()" class="w-full sm:w-auto px-6 py-2 bg-[#0B4635] hover:bg-[#072C21] text-white font-bold uppercase shadow text-center cursor-pointer transition text-xs">
                            Lá»c
                        </button>
                    </div>
                </div>
                
                <div id="units-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Units generated by JS -->
                </div>
                <div id="no-units-msg" class="p-12 text-center bg-slate-50 border border-slate-200 space-y-3 hidden">
                    <p class="text-sm font-bold text-slate-600">KhÃ´ng tÃ¬m tháº¥y cÄƒn há»™ nÃ o khá»›p vá»›i tiÃªu chÃ­ lá»c.</p>
                    <button onclick="resetFilters()" class="px-5 py-2 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase shadow">
                        Xem ToÃ n Bá»™ Báº£ng HÃ ng
                    </button>
                </div>
            </div>
        </section>

        <!-- PAYMENT SCHEDULE SECTION -->
        <section id="chinh-sach" class="page-section py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
            <div class="max-w-[1200px] mx-auto px-4 space-y-8">
                <div class="text-center space-y-2 max-w-2xl mx-auto">
                    <span class="text-xs font-black uppercase text-amber-600 tracking-widest">
                        PHÆ¯Æ NG THá»¨C THANH TOÃN LINH HOáº T
                    </span>
                    <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#0B4635] uppercase">
                        TIáº¾N Äá»˜ THANH TOÃN 8 Äá»¢T CHUáº¨N CÄT
                    </h2>
                </div>
                <div class="bg-white p-6 border border-slate-300 shadow-md">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div class="p-3 bg-slate-50 border border-slate-200 space-y-1">
                            <strong class="text-[#0B4635] block">Äá»¢T 1 (KÃ HÄMB)</strong>
                            <p class="text-sm font-black text-slate-900">15% GiÃ¡ Trá»‹ CÄƒn Há»™</p>
                            <span class="text-[10px] text-slate-500">Trong 7 ngÃ y Ä‘áº·t cá»c</span>
                        </div>
                        <div class="p-3 bg-slate-50 border border-slate-200 space-y-1">
                            <strong class="text-[#0B4635] block">Äá»¢T 2 (XÃ‚Y Táº¦NG 5)</strong>
                            <p class="text-sm font-black text-slate-900">10% GiÃ¡ Trá»‹ CÄƒn Há»™</p>
                            <span class="text-[10px] text-slate-500">Sau 60 ngÃ y Ä‘á»£t 1</span>
                        </div>
                        <div class="p-3 bg-slate-50 border border-slate-200 space-y-1">
                            <strong class="text-[#0B4635] block">Äá»¢T 3 (XÃ‚Y Táº¦NG 15)</strong>
                            <p class="text-sm font-black text-slate-900">10% GiÃ¡ Trá»‹ CÄƒn Há»™</p>
                            <span class="text-[10px] text-slate-500">Sau 60 ngÃ y Ä‘á»£t 2</span>
                        </div>
                        <div class="p-3 bg-slate-50 border border-slate-200 space-y-1">
                            <strong class="text-[#0B4635] block">Äá»¢T 4 (Cáº¤T NÃ“C)</strong>
                            <p class="text-sm font-black text-slate-900">15% GiÃ¡ Trá»‹ CÄƒn Há»™</p>
                            <span class="text-[10px] text-slate-500">HoÃ n thÃ nh cáº¥t nÃ³c</span>
                        </div>
                        <div class="p-3 bg-slate-50 border border-slate-200 space-y-1">
                            <strong class="text-[#0B4635] block">Äá»¢T 5 (HOÃ€N THIá»†N)</strong>
                            <p class="text-sm font-black text-slate-900">10% GiÃ¡ Trá»‹ CÄƒn Há»™</p>
                            <span class="text-[10px] text-slate-500">HoÃ n thiá»‡n ná»™i tháº¥t</span>
                        </div>
                        <div class="p-3 bg-slate-50 border border-slate-200 space-y-1">
                            <strong class="text-[#0B4635] block">Äá»¢T 6 (BÃ€N GIAO)</strong>
                            <p class="text-sm font-black text-slate-900">25% + 2% KPBT</p>
                            <span class="text-[10px] text-slate-500">Nháº­n chÃ¬a khÃ³a nhÃ </span>
                        </div>
                        <div class="p-3 bg-slate-50 border border-slate-200 space-y-1">
                            <strong class="text-[#0B4635] block">Äá»¢T 7 & 8 (Sá»” Há»’NG)</strong>
                            <p class="text-sm font-black text-slate-900">5% Cuá»‘i CÃ¹ng</p>
                            <span class="text-[10px] text-slate-500">Nháº­n giáº¥y chá»©ng nháº­n</span>
                        </div>
                        <div class="p-3 bg-emerald-50 border border-emerald-300 space-y-1">
                            <strong class="text-emerald-800 block">Æ¯U ÄÃƒI Äáº¶C BIá»†T</strong>
                            <p class="text-sm font-black text-emerald-900">Chiáº¿t kháº¥u 8%</p>
                            <span class="text-[10px] text-emerald-700">Khi thanh toÃ¡n sá»›m 95%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SHOWROOM SECTION -->
        <section id="can-ho-mau" class="page-section py-16 bg-white border-b border-slate-200">
            <div class="max-w-[1200px] mx-auto px-4 space-y-8">
                <div class="text-center space-y-2 max-w-2xl mx-auto">
                    <span class="text-xs font-black uppercase text-amber-600 tracking-widest">
                        TRáº¢I NGHIá»†M THá»°C Táº¾
                    </span>
                    <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#0B4635] uppercase">
                        HÃŒNH áº¢NH CÄ‚N Há»˜ MáºªU HOÃ€N THIá»†N
                    </h2>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-sm group">
                        <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" alt="PhÃ²ng KhÃ¡ch Ban CÃ´ng KÃ­nh TrÃ n" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div class="absolute inset-0 bg-black/40 flex items-end p-3">
                            <span class="text-xs font-bold text-white drop-shadow">PhÃ²ng KhÃ¡ch Ban CÃ´ng KÃ­nh TrÃ n</span>
                        </div>
                    </div>
                    <div class="relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-sm group">
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80" alt="PhÃ²ng Ngá»§ Master View Há»“ NÆ°á»›c" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div class="absolute inset-0 bg-black/40 flex items-end p-3">
                            <span class="text-xs font-bold text-white drop-shadow">PhÃ²ng Ngá»§ Master View Há»“ NÆ°á»›c</span>
                        </div>
                    </div>
                    <div class="relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-sm group">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Khu Vá»±c Báº¿p Äáº£o Hiá»‡n Äáº¡i" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div class="absolute inset-0 bg-black/40 flex items-end p-3">
                            <span class="text-xs font-bold text-white drop-shadow">Khu Vá»±c Báº¿p Äáº£o Hiá»‡n Äáº¡i</span>
                        </div>
                    </div>
                    <div class="relative aspect-[4/3] overflow-hidden border border-slate-300 shadow-sm group">
                        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80" alt="PhÃ²ng Táº¯m á»p ÄÃ¡ Tá»± NhiÃªn VIP" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div class="absolute inset-0 bg-black/40 flex items-end p-3">
                            <span class="text-xs font-bold text-white drop-shadow">PhÃ²ng Táº¯m á»p ÄÃ¡ Tá»± NhiÃªn VIP</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- NEWS SECTION -->
        <section id="tin-tuc" class="page-section py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
            <div class="max-w-[1200px] mx-auto px-4 space-y-8">
                <div class="flex items-center justify-between border-b-2 border-[#0B4635] pb-3">
                    <h2 class="text-2xl font-serif font-black uppercase text-[#0B4635]" id="news-title">
                        TIN Tá»¨C <?= htmlspecialchars($company_name) ?>
                    </h2>
                    <button onclick="navigate('news')" class="text-xs font-bold text-emerald-800 hover:underline">
                        Xem Táº¥t Cáº£ Tin Tá»©c â€º
                    </button>
                </div>
                <div id="news-container" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- News generated by JS -->
                </div>
            </div>
        </section>

        <!-- CONTACT SECTION -->
        <section id="form-dang-ky" class="page-section py-16 bg-[#0B4635] text-white">
            <div class="max-w-[1200px] mx-auto px-4 max-w-xl text-center space-y-6">
                <div class="space-y-2">
                    <span class="text-xs font-black uppercase text-amber-300 tracking-widest block">
                        CHÆ¯Æ NG TRÃŒNH Má»ž BÃN Äá»¢T 1
                    </span>
                    <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white">
                        ÄÄ‚NG KÃ NHáº¬N Báº¢NG GIÃ Gá»C & VOUCHER 100 TRIá»†U
                    </h2>
                    <p class="text-xs text-slate-200">
                        Æ¯u tiÃªn chá»n cÄƒn gÃ³c Ä‘áº¹p nháº¥t vÃ  hÆ°á»Ÿng chÃ­nh sÃ¡ch há»— trá»£ lÃ£i suáº¥t 0% trong 24 thÃ¡ng.
                    </p>
                </div>
                <form action="api/contact.php" method="POST" onsubmit="handleContactSubmit(event)" class="bg-white text-slate-900 p-6 shadow-2xl text-left text-xs space-y-3">
                    <div>
                        <label class="block font-bold text-slate-800 mb-1">Há» vÃ  tÃªn quÃ½ khÃ¡ch *</label>
                        <input type="text" name="name" id="contact-name" required placeholder="Nguyá»…n VÄƒn A" class="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none" />
                    </div>
                    <div>
                        <label class="block font-bold text-slate-800 mb-1">Sá»‘ Ä‘iá»‡n thoáº¡i *</label>
                        <input type="tel" name="phone" id="contact-phone" required placeholder="0919 006 030" class="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none" />
                    </div>
                    <div>
                        <label class="block font-bold text-slate-800 mb-1">TÃ²a Block quan tÃ¢m</label>
                        <select name="blockInterested" id="contact-block" class="w-full bg-slate-50 border border-slate-300 p-2.5 focus:outline-none">
                            <option class="text-slate-900 bg-white font-medium" value="Block A - Park View">Block A - Park View (View CÃ´ng ViÃªn)</option>
                            <option class="text-slate-900 bg-white font-medium" value="Block B - Lake View">Block B - Lake View (View Há»“ Sinh ThÃ¡i)</option>
                            <option class="text-slate-900 bg-white font-medium" value="Block C - Garden View">Block C - Garden View (View VÆ°á»n Thiá»n)</option>
                            <option class="text-slate-900 bg-white font-medium" value="Block D - Sky Palace">Block D - Sky Palace (Duplex Äá»‰nh Cao)</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full py-3 bg-[#0B4635] hover:bg-[#072C21] text-amber-300 font-black text-xs uppercase tracking-wider shadow cursor-pointer transition">
                        Gá»­i YÃªu Cáº§u Nháº­n Báº£ng GiÃ¡ Gá»‘c CÄT
                    </button>
                </form>
            </div>
        </section>

        <!-- PROPERTY DETAIL -->
        <section id="property-detail" class="page-section py-12 bg-white min-h-screen">
            <div class="max-w-[1200px] mx-auto px-4 space-y-6">
                <button onclick="navigate('floor-plans')" class="text-xs font-bold text-[#0B4635] hover:underline">
                    â€¹ Quay láº¡i báº£ng hÃ ng cÄƒn há»™
                </button>
                <h1 id="prop-title" class="text-2xl sm:text-3xl font-serif font-black text-[#0B4635] uppercase">
                    <!-- Title -->
                </h1>
                <p id="prop-price" class="text-sm font-black text-[#E11D48]">
                    <!-- Price details -->
                </p>
                <div class="w-full relative aspect-video bg-slate-100 border border-slate-200">
                    <img id="prop-img" src="" alt="Property" class="w-full h-full object-cover" />
                </div>
                <p id="prop-desc" class="text-xs sm:text-sm text-slate-700 leading-relaxed"></p>
                <div class="p-4 bg-[#0B4635] text-white space-y-2">
                    <h4 class="font-bold text-xs uppercase text-amber-300">TiÃªu chuáº©n bÃ n giao & tiá»‡n Ã­ch:</h4>
                    <ul id="prop-specs" class="grid grid-cols-2 gap-2 text-xs text-slate-200">
                        <!-- Specs -->
                    </ul>
                </div>
            </div>
        </section>

        <!-- NEWS DETAIL -->
        <section id="news-detail" class="page-section py-12 bg-white min-h-screen">
            <div class="max-w-[1200px] mx-auto px-4 space-y-6">
                <button onclick="navigate('news')" class="text-xs font-bold text-[#0B4635] hover:underline">
                    â€¹ Quay láº¡i trang tin tá»©c
                </button>
                <h1 id="news-detail-title" class="text-2xl font-serif font-black text-[#0B4635] uppercase">
                </h1>
                <div id="news-detail-meta" class="text-[11px] text-slate-400 border-b pb-2">
                </div>
                <img id="news-detail-img" src="" alt="" class="w-full h-80 object-cover border" />
                <div id="news-detail-content" class="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                </div>
            </div>
        </section>
    </div>

    <!-- Universal Footer -->
    <footer class="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div class="max-w-[1200px] mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="space-y-4 col-span-1 md:col-span-1">
                    <div class="flex items-center gap-2 cursor-pointer" onclick="navigate('home')">
                        <div class="w-8 h-8 bg-gradient-to-br from-[#E5B869] to-[#9A7B4F] flex items-center justify-center text-slate-950 font-serif font-black text-xl shadow border border-amber-200 shrink-0">ðŸŒ¿</div>
                        <span class="text-xl font-serif font-black tracking-wider text-amber-300 block leading-none"><?= htmlspecialchars($company_name) ?></span>
                    </div>
                    <p class="text-xs text-slate-400">Dá»± Ã¡n khu Ä‘Ã´ thá»‹ sinh thÃ¡i báº­c nháº¥t vá»›i 100ha cÃ¢y xanh vÃ  máº·t nÆ°á»›c.</p>
                </div>
                <div class="space-y-4">
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider">LiÃªn Há»‡</h3>
                    <ul class="text-xs space-y-2">
                        <li><i data-lucide="map-pin" class="w-3 h-3 inline mr-1"></i> Khu Ä‘Ã´ thá»‹ Ecopark, VÄƒn Giang, HÆ°ng YÃªn</li>
                        <li><i data-lucide="phone" class="w-3 h-3 inline mr-1"></i> Hotline: 0900 000 000</li>
                        <li><i data-lucide="mail" class="w-3 h-3 inline mr-1"></i> info@templatesbds.com</li>
                    </ul>
                </div>
                <div class="space-y-4">
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider">LiÃªn Káº¿t</h3>
                    <ul class="text-xs space-y-2 flex flex-col items-start">
                        <button onclick="navigate('overview')" class="hover:text-white transition">Tá»•ng quan dá»± Ã¡n</button>
                        <button onclick="navigate('floor-plans')" class="hover:text-white transition">Báº£ng hÃ ng trá»±c tuyáº¿n</button>
                        <button onclick="navigate('policy')" class="hover:text-white transition">ChÃ­nh sÃ¡ch bÃ¡n hÃ ng</button>
                    </ul>
                </div>
                <div class="space-y-4">
                    <h3 class="text-sm font-bold text-white uppercase tracking-wider">Káº¿t Ná»‘i</h3>
                    <div class="flex gap-3">
                        <a href="#" class="w-8 h-8 bg-slate-800 flex items-center justify-center rounded hover:bg-amber-600 transition text-white"><i data-lucide="facebook" class="w-4 h-4"></i></a>
                        <a href="#" class="w-8 h-8 bg-slate-800 flex items-center justify-center rounded hover:bg-amber-600 transition text-white"><i data-lucide="youtube" class="w-4 h-4"></i></a>
                    </div>
                </div>
            </div>
            <div class="mt-8 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500">
                <p>&copy; 2026 <?= htmlspecialchars($company_name) ?>. Báº£n quyá»n thuá»™c vá» chá»§ Ä‘áº§u tÆ°. Máº«u: BDS-20 (Mona Park View)</p>
            </div>
        </div>
    </footer>

    <script>
        // Initialize Lucide Icons
        lucide.createIcons();

        // Data Models
        const BDS20_UNITS = [
            {
                id: 'can-1pn-block-a-parkview', title: 'CÄƒn Há»™ 1 PhÃ²ng Ngá»§ Eco Suite Block A View CÃ´ng ViÃªn Trung TÃ¢m', code: 'MPV-A0805', slug: 'can-ho-1-phong-ngu-block-a-view-cong-vien', block: 'Block A - Park View', type: '1 PhÃ²ng Ngá»§', floor: 'Táº§ng 08', price: '2.45 Tá»· VNÄ', priceNum: 2.45, area: '48 mÂ²', areaNum: 48, beds: 1, baths: 1, view: 'Trá»±c diá»‡n cÃ´ng viÃªn cÃ¢y xanh 100ha', direction: 'HÆ°á»›ng ÄÃ´ng Nam', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', hot: true, featured: true, description: 'Thiáº¿t káº¿ thÃ´ng minh Ä‘Ã³n giÃ³ tá»± nhiÃªn 100%, ban cÃ´ng kÃ­nh rá»™ng ngáº¯m trá»n váº¹n cáº£nh quan xanh mÃ¡t lÃ nh.', specs: ['Ban cÃ´ng ngáº¯m cÃ´ng viÃªn', 'Thiáº¿t bá»‹ Toto cao cáº¥p', 'KÃ­nh Low-E cÃ¡ch Ã¢m', 'Sá»Ÿ há»¯u lÃ¢u dÃ i']
            },
            {
                id: 'can-2pn-block-b-lakeview', title: 'CÄƒn Há»™ GÃ³c 2 PhÃ²ng Ngá»§ Block B View Trá»±c Diá»‡n Há»“ Äiá»u HÃ²a Sinh ThÃ¡i', code: 'MPV-B1502', slug: 'can-ho-goc-2-phong-ngu-block-b-view-ho', block: 'Block B - Lake View', type: '2 PhÃ²ng Ngá»§', floor: 'Táº§ng 15', price: '3.85 Tá»· VNÄ', priceNum: 3.85, area: '72 mÂ²', areaNum: 72, beds: 2, baths: 2, view: 'View máº·t nÆ°á»›c há»“ Ä‘iá»u hÃ²a & ThÃ¡c trÃ n', direction: 'HÆ°á»›ng Nam - ÄÃ´ng Nam', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', hot: true, featured: true, description: 'CÄƒn gÃ³c 2 máº·t thoÃ¡ng view trá»n váº¹n máº·t há»“ gá»£n sÃ³ng trong lÃ nh, khÃ´ng gian thoÃ¡ng Ä‘Ã£ng nuÃ´i dÆ°á»¡ng sá»©c khá»e gia Ä‘Ã¬nh.', specs: ['CÄƒn gÃ³c 2 máº·t thoÃ¡ng', 'PhÃ²ng ngá»§ Master view há»“', 'BÃ n giao sÃ n gá»— An CÆ°á»ng', 'Táº·ng gÃ³i Smart Home']
            },
            {
                id: 'can-3pn-block-c-gardenview', title: 'CÄƒn Há»™ 3 PhÃ²ng Ngá»§ Gia ÄÃ¬nh Block C View VÆ°á»n Thiá»n Nháº­t Báº£n', code: 'MPV-C2008', slug: 'can-ho-3-phong-ngu-block-c-view-vuon-thien', block: 'Block C - Garden View', type: '3 PhÃ²ng Ngá»§', floor: 'Táº§ng 20', price: '5.20 Tá»· VNÄ', priceNum: 5.2, area: '98 mÂ²', areaNum: 98, beds: 3, baths: 2, view: 'View vÆ°á»n thiá»n Zen Garden & Äá»“i cá» hoa', direction: 'HÆ°á»›ng ÄÃ´ng Báº¯c', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', hot: false, featured: true, description: 'KhÃ´ng gian sá»‘ng lÃ½ tÆ°á»Ÿng cho gia Ä‘Ã¬nh 3 tháº¿ há»‡, phÃ²ng khÃ¡ch rá»™ng hÆ¡n 40mÂ² ná»‘i liá»n khu vá»±c báº¿p vÃ  ban cÃ´ng ngáº¯m hoa.', specs: ['Báº¿p Ä‘áº£o phong cÃ¡ch chÃ¢u Ã‚u', 'Há»‡ thá»‘ng lá»c nÆ°á»›c sáº¡ch', 'Miá»…n phÃ­ 2 nÄƒm phÃ­ dá»‹ch vá»¥', 'Há»— trá»£ vay 70%']
            },
            {
                id: 'duplex-block-d-skypalace', title: 'CÄƒn Há»™ Duplex ThÃ´ng Táº§ng Block D Sky Palace View Triá»‡u ÄÃ´', code: 'MPV-D2801', slug: 'can-ho-duplex-thong-tang-block-d-sky-palace', block: 'Block D - Sky Palace', type: 'Duplex View Há»“', floor: 'Táº§ng 28 - 29', price: '9.50 Tá»· VNÄ', priceNum: 9.5, area: '168 mÂ²', areaNum: 168, beds: 4, baths: 4, view: 'View 360 Ä‘á»™ cÃ´ng viÃªn há»“ Ä‘iá»u hÃ²a vÃ  thÃ nh phá»‘', direction: 'HÆ°á»›ng ÄÃ´ng Nam', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', hot: true, featured: true, description: 'Tuyá»‡t tÃ¡c duplex thÃ´ng táº§ng cao 6m xa hoa báº­c nháº¥t, sá»Ÿ há»¯u ban cÃ´ng vÆ°á»n treo riÃªng biá»‡t ngáº¯m trá»n váº¹n cáº£nh sáº¯c thiÃªn nhiÃªn.', specs: ['ThÃ´ng táº§ng cao 6.2m', 'SÃ¢n vÆ°á»n ban cÃ´ng 35mÂ²', 'Thang mÃ¡y riÃªng báº£o máº­t', 'Sá»• há»“ng vÄ©nh viá»…n']
            },
            {
                id: 'can-2pn-block-a-parkview', title: 'CÄƒn Há»™ 2 PhÃ²ng Ngá»§ TiÃªu Chuáº©n Quá»‘c Táº¿ Block A Park View', code: 'MPV-A1203', slug: 'can-ho-2-phong-ngu-tieu-chuan-block-a', block: 'Block A - Park View', type: '2 PhÃ²ng Ngá»§', floor: 'Táº§ng 12', price: '3.35 Tá»· VNÄ', priceNum: 3.35, area: '65 mÂ²', areaNum: 65, beds: 2, baths: 2, view: 'Ná»™i khu há»“ bÆ¡i sinh thÃ¡i & VÆ°á»n hoa rá»±c rá»¡', direction: 'HÆ°á»›ng TÃ¢y Nam', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', hot: false, featured: true, description: 'Bá»‘ cá»¥c vuÃ´ng váº¯n tá»‘i Æ°u cÃ´ng nÄƒng, phÃ¹ há»£p cho gia Ä‘Ã¬nh tráº» tÃ¬m kiáº¿m chá»‘n an cÆ° trong lÃ nh cÃ¢n báº±ng cuá»™c sá»‘ng.', specs: ['View há»“ bÆ¡i sinh thÃ¡i', 'KhÃ³a tá»« vÃ¢n tay 4 chá»©c nÄƒng', 'Chiáº¿t kháº¥u thanh toÃ¡n 8%', 'Nháº­n nhÃ  á»Ÿ ngay']
            },
            {
                id: 'penthouse-eco-block-b', title: 'Penthouse Eco Resort Äá»‰nh ThÃ¡p Block B Mona Park View', code: 'MPV-PH02', slug: 'penthouse-eco-resort-dinh-thap-block-b', block: 'Block B - Lake View', type: 'Penthouse Eco', floor: 'Táº§ng 30', price: '14.8 Tá»· VNÄ', priceNum: 14.8, area: '220 mÂ²', areaNum: 220, beds: 4, baths: 4, view: 'View Ä‘á»‰nh cao bao quÃ¡t toÃ n bá»™ thung lÅ©ng xanh', direction: 'HÆ°á»›ng ÄÃ´ng Nam', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', hot: true, featured: true, description: 'Dinh thá»± trÃªn mÃ¢y vá»›i há»“ bÆ¡i vÃ´ cá»±c ngoÃ i trá»i, quáº§y bar BBQ sÃ¢n thÆ°á»£ng vÃ  táº§m nhÃ¬n ngÃºt ngÃ n xanh mÆ°á»›t.', specs: ['Bá»ƒ bÆ¡i trÃ n bá» trÃªn mÃ¡i', 'VÆ°á»n nÆ°á»›ng BBQ riÃªng', 'Ná»™i tháº¥t nháº­p kháº©u Ã', 'Dá»‹ch vá»¥ quáº£n gia 24/7']
            }
        ];

        const BDS20_NEWS = [
            { id: 1, title: 'KhÃ¡nh ThÃ nh CÃ´ng ViÃªn Sinh ThÃ¡i Trung TÃ¢m 100ha & Há»“ Äiá»u HÃ²a Mona Park', slug: 'khanh-thanh-cong-vien-sinh-thai-100ha', date: '28/08/2026', author: 'Ban Quáº£n LÃ½ Mona Park View', category: 'Sá»± Kiá»‡n', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', excerpt: 'LÃ¡ phá»•i xanh khá»•ng lá»“ chÃ­nh thá»©c Ä‘i vÃ o hoáº¡t Ä‘á»™ng, mang láº¡i khÃ´ng gian vui chÆ¡i, táº­p luyá»‡n thá»ƒ thao vÃ  tÃ¡i táº¡o nÄƒng lÆ°á»£ng cho cÆ° dÃ¢n.', content: ['CÃ´ng viÃªn Mona Park View sá»Ÿ há»¯u Ä‘Æ°á»ng cháº¡y bá»™ ven há»“ dÃ i 5km, vÆ°á»n thiá»n Nháº­t Báº£n vÃ  há»“ cáº£nh quan sinh thÃ¡i trong lÃ nh.', 'Dá»± Ã¡n Ä‘áº¡t giáº£i thÆ°á»Ÿng Khu Ä‘Ã´ thá»‹ cÃ³ cáº£nh quan sinh thÃ¡i xuáº¥t sáº¯c nháº¥t nÄƒm 2026.'], views: 4890 },
            { id: 2, title: 'Lá»… Cáº¥t NÃ³c Block A & Block B VÆ°á»£t Tiáº¿n Äá»™ 45 NgÃ y', slug: 'le-cat-noc-block-a-b-vuot-tien-do', date: '26/08/2026', author: 'Tá»•ng Tháº§u XÃ¢y Dá»±ng', category: 'Tiáº¿n Äá»™', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', excerpt: 'Chá»§ Ä‘áº§u tÆ° cam káº¿t bÃ n giao nhÃ  Ä‘Ãºng tiÃªu chuáº©n cháº¥t lÆ°á»£ng cao cáº¥p vÃ  trao sá»• há»“ng táº­n tay khÃ¡ch hÃ ng.', content: ['ToÃ n bá»™ cÃ´ng tÃ¡c hoÃ n thiá»‡n máº·t ngoÃ i vÃ  á»‘p Ä‘Ã¡ khá»‘i sáº£nh lá»… tÃ¢n Ä‘ang Ä‘Æ°á»£c triá»ƒn khai kháº©n trÆ°Æ¡ng.'], views: 3950 },
            { id: 3, title: 'ChÃ­nh SÃ¡ch Thanh ToÃ¡n Nháº¹ NhÃ ng 8 Äá»£t â€” Há»— Trá»£ LÃ£i Suáº¥t 0% Trong 24 ThÃ¡ng', slug: 'chinh-sach-thanh-toan-8-dot-uu-dai', date: '24/08/2026', author: 'PhÃ²ng Kinh Doanh', category: 'ChÃ­nh SÃ¡ch', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', excerpt: 'KhÃ¡ch hÃ ng chá»‰ cáº§n thanh toÃ¡n 15% Ä‘á»£t Ä‘áº§u lÃ  cÃ³ thá»ƒ kÃ½ há»£p Ä‘á»“ng mua bÃ¡n vÃ  nháº­n nhÃ  vÃ o quÃ½ 4/2026.', content: ['NgÃ¢n hÃ ng Ä‘á»‘i tÃ¡c chiáº¿n lÆ°á»£c há»— trá»£ giáº£i ngÃ¢n lÃªn Ä‘áº¿n 70% giÃ¡ trá»‹ cÄƒn há»™ vá»›i thá»i háº¡n vay tá»‘i Ä‘a 25 nÄƒm.'], views: 5210 }
        ];

        // State
        let currentPage = 'home';
        let mobileMenuOpen = false;
        
        // Populate options
        const blocks = [...new Set(BDS20_UNITS.map(p => p.block))];
        const types = [...new Set(BDS20_UNITS.map(p => p.type))];
        const fb = document.getElementById('filterBlock');
        const ft = document.getElementById('filterType');
        blocks.forEach(b => fb.add(new Option(b, b)));
        types.forEach(t => ft.add(new Option(t, t)));

        // Toast
        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').innerText = msg;
            toast.classList.remove('hidden');
            toast.classList.add('flex');
            setTimeout(() => {
                toast.classList.add('hidden');
                toast.classList.remove('flex');
            }, 4000);
        }

        function toggleMobileMenu() {
            mobileMenuOpen = !mobileMenuOpen;
            const menu = document.getElementById('mobile-menu');
            const menuIcon = document.getElementById('menu-icon');
            const closeIcon = document.getElementById('close-icon');
            if(mobileMenuOpen) {
                menu.classList.remove('hidden');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                menu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        }

        // Navigation rules based on React component
        const pageLayouts = {
            'home': ['hero-section', 'tong-quan', 'vi-tri', 'khong-gian-xanh', 'bang-hang-can-ho', 'chinh-sach', 'can-ho-mau', 'tin-tuc', 'form-dang-ky'],
            'overview': ['tong-quan', 'khong-gian-xanh', 'form-dang-ky'],
            'location': ['vi-tri', 'form-dang-ky'],
            'amenities': ['khong-gian-xanh', 'can-ho-mau', 'form-dang-ky'],
            'eco-park': ['khong-gian-xanh', 'form-dang-ky'],
            'floor-plans': ['bang-hang-can-ho', 'chinh-sach', 'form-dang-ky'],
            'showroom': ['can-ho-mau', 'form-dang-ky'],
            'policy': ['chinh-sach', 'form-dang-ky'],
            'news': ['tin-tuc', 'form-dang-ky'],
            'contact': ['vi-tri', 'form-dang-ky'],
            'property-detail': ['property-detail'],
            'news-detail': ['news-detail']
        };

        function navigate(page, slug = null) {
            currentPage = page;
            if(mobileMenuOpen) toggleMobileMenu();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Update active state on nav buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                const btnPage = btn.getAttribute('data-page');
                btn.className = `nav-btn whitespace-nowrap px-3 py-2 transition-all ${
                    (btnPage === page || 
                     (btnPage === 'floor-plans' && page === 'property-detail') || 
                     (btnPage === 'news' && page === 'news-detail')) 
                     ? 'text-amber-300 font-extrabold bg-[#072C21]' : 'hover:text-amber-300'
                }`;
            });

            // Show relevant sections
            document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
            const layout = pageLayouts[page] || [];
            layout.forEach(id => {
                const el = document.getElementById(id);
                if(el) el.classList.add('active');
            });
            
            // Handle details
            if(page === 'property-detail' && slug) {
                const unit = BDS20_UNITS.find(u => u.slug === slug);
                if(unit) {
                    document.getElementById('prop-title').innerText = `${unit.title} (${unit.code})`;
                    document.getElementById('prop-price').innerText = `GiÃ¡ bÃ¡n: ${unit.price} â€” TÃ²a: ${unit.block} â€” Diá»‡n tÃ­ch: ${unit.area}`;
                    document.getElementById('prop-img').src = unit.image;
                    document.getElementById('prop-desc').innerText = unit.description;
                    const specsContainer = document.getElementById('prop-specs');
                    specsContainer.innerHTML = '';
                    unit.specs.forEach(s => {
                        const li = document.createElement('li');
                        li.className = 'flex items-center gap-1.5';
                        li.innerText = `ðŸŒ¿ ${s}`;
                        specsContainer.appendChild(li);
                    });
                }
            } else if(page === 'news-detail' && slug) {
                const news = BDS20_NEWS.find(n => n.slug === slug);
                if(news) {
                    document.getElementById('news-detail-title').innerText = news.title;
                    document.getElementById('news-detail-meta').innerText = `ðŸ•’ ${news.date} â€¢ TÃ¡c giáº£: ${news.author} â€¢ ${news.views} lÆ°á»£t xem`;
                    document.getElementById('news-detail-img').src = news.image;
                    const contentContainer = document.getElementById('news-detail-content');
                    contentContainer.innerHTML = '';
                    news.content.forEach(p => {
                        const para = document.createElement('p');
                        para.innerText = p;
                        contentContainer.appendChild(para);
                    });
                }
            }
        }

        // Render Units
        function renderUnits(units) {
            const container = document.getElementById('units-container');
            const noMsg = document.getElementById('no-units-msg');
            document.getElementById('unit-count-title').innerText = `DANH SÃCH CÄ‚N Há»˜ ÄANG Má»ž BÃN (${units.length})`;
            
            if(units.length === 0) {
                container.innerHTML = '';
                noMsg.classList.remove('hidden');
            } else {
                noMsg.classList.add('hidden');
                container.innerHTML = units.map(unit => `
                    <div class="bg-white text-slate-900 border border-slate-300 shadow-sm hover:shadow-xl transition flex flex-col justify-between group overflow-hidden font-medium">
                        <div class="relative aspect-[16/10] overflow-hidden bg-slate-950">
                            <img src="${unit.image}" alt="${unit.title}" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#0B4635] text-amber-300 text-[10px] font-black uppercase">
                                ${unit.code} â€¢ ${unit.block}
                            </span>
                            ${unit.hot ? `<span class="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase">HOT</span>` : ''}
                        </div>
                        <div class="p-4 space-y-2">
                            <h3 onclick="navigate('property-detail', '${unit.slug}')" class="text-xs font-serif font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0B4635] cursor-pointer min-h-[34px]">
                                ${unit.title}
                            </h3>
                            <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 border border-slate-200">
                                <div>ðŸ“ Diá»‡n tÃ­ch: <strong>${unit.area}</strong></div>
                                <div>ðŸ¢ Táº§ng: <strong>${unit.floor}</strong></div>
                                <div>ðŸ§­ HÆ°á»›ng: <strong>${unit.direction}</strong></div>
                                <div>ðŸ› PhÃ²ng: <strong>${unit.beds} PN â€¢ ${unit.baths} WC</strong></div>
                            </div>
                            <p class="text-[11px] text-emerald-800 font-medium truncate">
                                ðŸŒ¿ ${unit.view}
                            </p>
                            <div class="pt-3 border-t flex items-center justify-between">
                                <span class="text-sm font-black text-[#E11D48]">${unit.price}</span>
                                <button onclick="navigate('property-detail', '${unit.slug}')" class="px-3 py-1.5 bg-[#0B4635] hover:bg-[#072C21] text-amber-300 font-bold text-xs uppercase transition cursor-pointer">
                                    Chi Tiáº¿t â€º
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Render News
        function renderNews() {
            const container = document.getElementById('news-container');
            container.innerHTML = BDS20_NEWS.map(n => `
                <div class="bg-white border border-slate-200 shadow-sm flex flex-col justify-between group overflow-hidden">
                    <img src="${n.image}" alt="${n.title}" class="w-full h-44 object-cover group-hover:scale-105 transition duration-500" />
                    <div class="p-4 space-y-2">
                        <span class="text-[10px] font-bold text-emerald-700 uppercase">${n.category} â€¢ ${n.date}</span>
                        <h3 onclick="navigate('news-detail', '${n.slug}')" class="text-xs font-black text-slate-900 uppercase line-clamp-2 hover:text-[#0B4635] cursor-pointer">
                            ${n.title}
                        </h3>
                        <p class="text-xs text-slate-600 line-clamp-2">${n.excerpt}</p>
                    </div>
                </div>
            `).join('');
        }

        // Filters
        function filterUnits() {
            const fbVal = document.getElementById('filterBlock').value;
            const ftVal = document.getElementById('filterType').value;
            let filtered = BDS20_UNITS;
            if(fbVal !== 'all') filtered = filtered.filter(u => u.block === fbVal);
            if(ftVal !== 'all') {
                const f = ftVal.toLowerCase();
                filtered = filtered.filter(u => {
                    const t = (u.type || '').toLowerCase();
                    return t === f || t.includes(f) || f.includes(t);
                });
            }
            return filtered;
        }

        function handleSearchSubmit() {
            const filtered = filterUnits();
            renderUnits(filtered);
            if (currentPage !== 'home' && currentPage !== 'floor-plans') {
                navigate('home');
            }
            showToast(`ðŸ” TÃ¬m tháº¥y ${filtered.length} cÄƒn há»™ sinh thÃ¡i phÃ¹ há»£p tiÃªu chÃ­!`);
            setTimeout(() => {
                document.getElementById('bang-hang-can-ho').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }

        function resetFilters() {
            document.getElementById('filterBlock').value = 'all';
            document.getElementById('filterType').value = 'all';
            renderUnits(BDS20_UNITS);
        }

        function handleContactSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            if(!name || !phone) {
                alert('Vui lÃ²ng nháº­p há» tÃªn vÃ  sá»‘ Ä‘iá»‡n thoáº¡i Ä‘Äƒng kÃ½ nháº­n thÃ´ng tin!');
                return;
            }
            
            // Post form via fetch to keep single page behavior
            const form = e.target;
            const formData = new FormData(form);
            fetch(form.action, {
                method: form.method,
                body: formData
            }).catch(() => {
                // Ignore fetch errors to keep UX consistent for demo
            });

            showToast(`ðŸŽ‰ Tiáº¿p nháº­n thÃ´ng tin tá»« ${name} (${phone}). ChuyÃªn viÃªn Mona Park View sáº½ liÃªn há»‡ trong 10 phÃºt!`);
            form.reset();
        }

        // Initialization
        renderUnits(BDS20_UNITS);
        renderNews();
        navigate('home');
    </script>
</body>
</html>
