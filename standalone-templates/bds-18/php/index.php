<?php
require_once 'config/db.php';

// Fetch company info
$company = [
    'name' => 'TEMPLATESBDS',
    'phone' => '0919 006 030',
    'email' => 'contact@templatesbds.com',
    'address' => 'Tòa nhà TEMPLATESBDS, TP. Hồ Chí Minh',
    'slogan' => 'Kiến tạo không gian sống vượt thời gian. Đơn vị tổng thầu thiết kế kiến trúc, thi công nội thất và phân phối bất động sản nghệ thuật độc bản hàng đầu Việt Nam.',
    'zalo' => '0919006030'
];

try {
    $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
    if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $company = $row;
    }
} catch (Exception $e) {
    // fallback to defaults
}

// Fetch projects
$projects = [];
try {
    $stmt = $pdo->query("SELECT * FROM projects");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['hot'] = (bool)$row['hot'];
        $row['priceNum'] = (float)$row['priceNum'];
        // Decode specs if it's stored as JSON string
        if (is_string($row['specs'])) {
            $decoded = json_decode($row['specs'], true);
            $row['specs'] = is_array($decoded) ? $decoded : [];
        }
        $projects[] = $row;
    }
} catch (Exception $e) {}

// Fetch news
$news = [];
try {
    $stmt = $pdo->query("SELECT * FROM news");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if (is_string($row['content'])) {
            $decoded = json_decode($row['content'], true);
            $row['content'] = is_array($decoded) ? $decoded : [];
        }
        $row['views'] = (int)$row['views'];
        $news[] = $row;
    }
} catch (Exception $e) {}

// Fetch faqs
$faqs = [];
try {
    $stmt = $pdo->query("SELECT * FROM faqs ORDER BY sort_order ASC");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $faqs[] = [
            'q' => $row['question'],
            'a' => $row['answer']
        ];
    }
} catch (Exception $e) {}

// Default data if empty
if (empty($projects)) {
    $projects = [
        [
            'id' => 'vixyo-villa-saigon-south', 'title' => 'Dinh Thự Sinh Thái Ven Sông The Riviera Nam Sài Gòn', 'slug' => 'dinh-thu-sinh-thai-ven-song-the-riviera', 'category' => 'Biệt Thự',
            'price' => '38.5 Tỷ VNĐ', 'priceNum' => 38.5, 'area' => '450 m²', 'location' => 'Khu Biệt Thự Phú Gia, Tân Phong, Quận 7, TP.HCM', 'district' => 'Quận 7',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'hot' => true, 'year' => '2026', 'style' => 'Modern Minimalist Architecture',
            'description' => 'Kiệt tác dinh thự đương đại với không gian kính tràn đón trọn luồng gió sông và mảng xanh nhiệt đới rộng lớn.',
            'specs' => ['Hồ bơi vô cực nước tràn', 'Sân vườn nhiệt đới 180m²', 'Nội thất nhập khẩu B&B Italia', 'Hệ thống Smart Home Crestron']
        ]
    ];
}
if (empty($news)) {
    $news = [
        ['id' => 1, 'title' => 'Xu Hướng Thiết Kế Kiến Trúc', 'slug' => 'xu-huong', 'date' => '28/08/2026', 'author' => 'Design Studio', 'category' => 'Kiến Trúc', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'excerpt' => 'Không gian sống xanh...', 'content' => ['Kiến trúc bền vững...'], 'views' => 5420]
    ];
}
if (empty($faqs)) {
    $faqs = [
        ['q' => 'Quy trình diễn ra như thế nào?', 'a' => 'Gồm 5 bước tiêu chuẩn.']
    ];
}

$c_name = htmlspecialchars($company['name']);
$c_phone = htmlspecialchars($company['phone']);
$c_email = htmlspecialchars($company['email']);
$c_address = htmlspecialchars($company['address']);
$c_slogan = htmlspecialchars($company['slogan']);
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $c_name ?> Architecture & Luxury Real Estate</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0A0A0A;
            color: #f1f5f9;
        }

        .font-serif {
            font-family: 'Playfair Display', serif;
        }

        .max-w-7xl {
            max-width: 80rem;
        }

        .page-section {
            display: none;
        }
        
        .page-section.active {
            display: block;
        }
        
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;  
            overflow: hidden;
        }

        .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;  
            overflow: hidden;
        }
    </style>
</head>
<body class="selection:bg-amber-500 selection:text-slate-950 flex flex-col min-h-screen justify-between">

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-24 right-6 z-50 bg-[#18181B] text-white border border-amber-500 px-5 py-3 shadow-2xl font-bold text-xs flex items-center gap-2 rounded-sm transition-all duration-300 translate-y-20 opacity-0 pointer-events-none">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-amber-400"></i>
        <span id="toastMessage"></span>
    </div>

    <div>
        <!-- TOP HEADER & NAVBAR -->
        <header class="sticky top-0 z-40 bg-[#0A0A0A] text-white shadow-xl border-b border-white/10 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
                
                <!-- Brand Logo -->
                <div onclick="navigate('home')" class="flex items-center gap-2 sm:gap-2.5 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
                    <div class="w-8 h-8 bg-gradient-to-tr from-amber-500 to-amber-200 rounded-sm flex items-center justify-center text-slate-950 font-black text-base sm:text-lg shadow-md shrink-0">
                        V
                    </div>
                    <span class="text-xl sm:text-2xl font-serif font-black tracking-tight text-white group-hover:text-amber-400 transition truncate">
                        <?= $c_name ?>
                    </span>
                </div>

                <!-- Navigation Menu -->
                <nav class="hidden xl:flex items-center gap-1 2xl:gap-3 text-xs font-bold uppercase tracking-wider text-slate-300 whitespace-nowrap" id="desktop-nav">
                    <button onclick="navigate('home')" class="nav-btn whitespace-nowrap px-3 py-1.5 transition-all hover:text-white" data-target="home">Trang Chủ</button>
                    <button onclick="navigate('about')" class="nav-btn whitespace-nowrap px-3 py-1.5 transition-all hover:text-white" data-target="about">Giới Thiệu</button>
                    <button onclick="navigate('services')" class="nav-btn whitespace-nowrap px-3 py-1.5 transition-all hover:text-white" data-target="services">Dịch Vụ</button>
                    <button onclick="navigate('portfolio')" class="nav-btn whitespace-nowrap px-3 py-1.5 transition-all hover:text-white" data-target="portfolio">Dự Án Tiêu Biểu</button>
                    <button onclick="navigate('awards')" class="nav-btn whitespace-nowrap px-3 py-1.5 transition-all hover:text-white" data-target="awards">Giải Thưởng</button>
                    <button onclick="navigate('pricing')" class="nav-btn whitespace-nowrap px-3 py-1.5 transition-all hover:text-white" data-target="pricing">Báo Giá</button>
                    <button onclick="navigate('news')" class="nav-btn whitespace-nowrap px-3 py-1.5 transition-all hover:text-white" data-target="news">Tin Tức</button>
                    <button onclick="navigate('contact')" class="nav-btn whitespace-nowrap px-3 py-1.5 transition-all hover:text-white" data-target="contact">Liên Hệ</button>
                </nav>

                <!-- CTA Right Button -->
                <div class="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
                    <button onclick="scrollToEl('form-lien-he')" class="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer">
                        Nhận Báo Giá BĐS
                    </button>
                    <button onclick="toggleMobileMenu()" class="p-1.5 sm:p-2 text-white xl:hidden hover:bg-white/10 shrink-0 flex items-center justify-center" aria-label="Toggle navigation menu">
                        <i data-lucide="menu" id="menu-icon" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Drawer -->
            <div id="mobile-menu" class="hidden xl:hidden bg-[#111] border-t border-white/10 px-6 py-4 space-y-2">
                <div class="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
                    <button onclick="navigate('home')" class="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Trang Chủ</button>
                    <button onclick="navigate('about')" class="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Giới Thiệu</button>
                    <button onclick="navigate('services')" class="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Dịch Vụ</button>
                    <button onclick="navigate('portfolio')" class="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Dự Án</button>
                    <button onclick="navigate('awards')" class="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Giải Thưởng</button>
                    <button onclick="navigate('pricing')" class="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Báo Giá</button>
                    <button onclick="navigate('news')" class="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Tin Tức</button>
                    <button onclick="navigate('contact')" class="p-2.5 text-left bg-[#18181B] hover:text-amber-400">Liên Hệ</button>
                </div>
            </div>
        </header>

        <!-- VIEWS CONTENT -->

        <!-- Home View -->
        <main id="view-home" class="page-section active">
            <!-- HERO SECTION -->
            <section class="relative bg-[#0A0A0A] text-white min-h-[480px] sm:min-h-[580px] flex items-center overflow-hidden border-b border-white/10">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" alt="<?= $c_name ?> Luxury Architecture" onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'" class="absolute inset-0 w-full h-full object-cover opacity-35" />
                <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                <div class="max-w-7xl mx-auto px-4 relative z-20 w-full py-12">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-7 space-y-5">
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider rounded-sm">
                                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                                <span>Đội ngũ giàu kinh nghiệm & chuyên nghiệp</span>
                            </div>
                            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight text-white">
                                Kiến Tạo Không Gian Sống <span class="text-amber-400">Vượt Thời Gian</span>
                            </h1>
                            <p class="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                                <?= $c_slogan ?>
                            </p>
                            <div class="flex flex-wrap items-center gap-4 pt-2">
                                <button onclick="scrollToEl('du-an-pho-bien')" class="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition cursor-pointer">
                                    Khám Phá Dự Án ›
                                </button>
                                <button onclick="navigate('contact')" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-sm border border-white/20 transition cursor-pointer">
                                    Tư Vấn Miễn Phí
                                </button>
                            </div>
                        </div>
                        <div class="lg:col-span-5 flex justify-center lg:justify-end">
                            <div class="bg-[#18181B]/90 backdrop-blur-md p-6 border border-white/10 rounded-md shadow-2xl max-w-sm w-full space-y-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-amber-500 text-slate-950 font-serif font-black text-2xl flex items-center justify-center rounded-sm">
                                        24
                                    </div>
                                    <div>
                                        <span class="text-sm font-black text-white block">NĂM KIẾN TẠO</span>
                                        <span class="text-[10px] text-slate-400 uppercase">TIÊN PHONG TRONG NGÀNH KIẾN TRÚC & BĐS</span>
                                    </div>
                                </div>
                                <p class="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                                    Đồng hành cùng hơn 2.500 chủ nhân thượng lưu kiến tạo tổ ấm sang trọng và tích sản an toàn bền vững.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div id="home-about-placeholder"></div>
            <div id="home-services-placeholder"></div>
            
            <!-- SECTION: FAQ & PROCESS -->
            <section id="quy-trinh" class="py-16 bg-white text-slate-900 border-b border-slate-200">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <!-- Left FAQ -->
                        <div class="lg:col-span-7 space-y-4">
                            <span class="text-xs font-black uppercase text-amber-600 tracking-widest block">GIẢI ĐÁP THẮC MẮC</span>
                            <h2 class="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">Các Câu Hỏi Thường Gặp</h2>
                            <div class="space-y-3 pt-2 text-xs" id="faq-container">
                                <!-- FAQ items will be rendered here by JS -->
                            </div>
                        </div>
                        <!-- Right Process -->
                        <div class="lg:col-span-5 space-y-4 bg-slate-50 p-6 border border-slate-200 rounded-sm">
                            <span class="text-xs font-black uppercase text-amber-600 tracking-widest block">QUY TRÌNH 3 BƯỚC</span>
                            <h3 class="text-xl font-serif font-black text-slate-900 uppercase">Hành Trình Kiến Tạo Tổ Ấm</h3>
                            <div class="space-y-4 text-xs pt-2">
                                <div class="flex gap-3 items-start">
                                    <div class="w-8 h-8 bg-amber-500 text-slate-950 font-black flex items-center justify-center rounded-full shrink-0">1</div>
                                    <div>
                                        <strong class="text-slate-900 block">Khảo Sát & Lập Phương Án Ý Tưởng</strong>
                                        <p class="text-slate-600">Lắng nghe thấu đáo phong cách sống và nhu cầu của từng thành viên gia đình.</p>
                                    </div>
                                </div>
                                <div class="flex gap-3 items-start">
                                    <div class="w-8 h-8 bg-slate-900 text-white font-black flex items-center justify-center rounded-full shrink-0">2</div>
                                    <div>
                                        <strong class="text-slate-900 block">Thiết Kế 3D & Lựa Chọn Vật Liệu</strong>
                                        <p class="text-slate-600">Trải nghiệm không gian sống thực tế ảo và chọn mẫu vật liệu nhập khẩu trực tiếp.</p>
                                    </div>
                                </div>
                                <div class="flex gap-3 items-start">
                                    <div class="w-8 h-8 bg-amber-500 text-slate-950 font-black flex items-center justify-center rounded-full shrink-0">3</div>
                                    <div>
                                        <strong class="text-slate-900 block">Thi Công & Bàn Giao Chìa Khóa</strong>
                                        <p class="text-slate-600">Nghiệm thu chuẩn xác từng chi tiết và bàn giao sổ bảo hành VIP dài hạn.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div id="home-portfolio-placeholder"></div>
            <div id="home-awards-placeholder"></div>
            <div id="home-pricing-placeholder"></div>
            <div id="home-news-placeholder"></div>
            <div id="home-contact-placeholder"></div>
        </main>

        <!-- About View -->
        <main id="view-about" class="page-section"></main>
        
        <!-- Services View -->
        <main id="view-services" class="page-section"></main>
        
        <!-- Portfolio View -->
        <main id="view-portfolio" class="page-section"></main>
        
        <!-- Awards View -->
        <main id="view-awards" class="page-section"></main>
        
        <!-- Pricing View -->
        <main id="view-pricing" class="page-section"></main>
        
        <!-- News View -->
        <main id="view-news" class="page-section"></main>
        
        <!-- Contact View -->
        <main id="view-contact" class="page-section"></main>

        <!-- Property Detail View -->
        <main id="view-property-detail" class="page-section py-12 bg-[#111111] min-h-screen text-white">
            <div class="max-w-7xl mx-auto px-4 space-y-6">
                <button onclick="navigate('portfolio')" class="text-xs font-bold text-amber-400 hover:underline">
                    ‹ Quay lại danh mục dự án
                </button>
                <h1 id="detail-title" class="text-2xl sm:text-3xl font-serif font-black uppercase text-white"></h1>
                <p id="detail-meta" class="text-sm font-black text-amber-400"></p>
                <img id="detail-image" src="" alt="Project" class="w-full aspect-[21/9] object-cover rounded-sm border border-white/10">
                <p id="detail-desc" class="text-xs sm:text-sm text-slate-300 leading-relaxed"></p>
                <div class="p-4 bg-[#18181B] border border-white/10 rounded-sm space-y-2">
                    <h4 class="font-bold text-xs uppercase text-amber-400">Thông số công trình:</h4>
                    <ul id="detail-specs" class="grid grid-cols-2 gap-2 text-xs text-slate-300">
                    </ul>
                </div>
            </div>
        </main>

        <!-- News Detail View -->
        <main id="view-news-detail" class="page-section py-12 bg-[#111111] min-h-screen text-white">
            <div class="max-w-7xl mx-auto px-4 space-y-6">
                <button onclick="navigate('news')" class="text-xs font-bold text-amber-400 hover:underline">
                    ‹ Quay lại trang tin tức
                </button>
                <h1 id="news-detail-title" class="text-2xl font-serif font-black uppercase text-white"></h1>
                <div id="news-detail-meta" class="text-[11px] text-slate-400 border-b border-white/10 pb-2"></div>
                <img id="news-detail-img" src="" alt="News" class="w-full h-80 object-cover rounded-sm border border-white/10" />
                <div id="news-detail-content" class="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed"></div>
            </div>
        </main>
        
        <!-- Reusable Component Templates -->
        <template id="tpl-about">
            <section id="gioi-thieu" class="py-16 bg-white text-slate-900 border-b border-slate-200">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div class="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-slate-200 shadow-xl rounded-sm">
                            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="<?= $c_name ?> Architecture" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="w-full h-full object-cover" />
                            <div class="absolute bottom-4 left-4 bg-amber-500 text-slate-950 p-3 rounded-sm font-serif font-black text-center shadow-lg">
                                <span class="text-2xl block leading-none">24+</span>
                                <span class="text-[9px] uppercase tracking-wider block mt-0.5">Năm Phát Triển</span>
                            </div>
                        </div>
                        <div class="lg:col-span-6 space-y-4">
                            <span class="text-xs font-black uppercase text-amber-600 tracking-widest block">TRIẾT LÝ THIẾT KẾ VIXYO</span>
                            <h2 class="text-2xl sm:text-4xl font-serif font-black text-slate-900 uppercase leading-tight">Phù Hợp Với Mọi Nhu Cầu & Khát Vọng An Cư</h2>
                            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Mỗi công trình do <?= $c_name ?> kiến tạo là sự kết hợp hoàn hảo giữa công năng tối ưu, tính thẩm mỹ đỉnh cao và dấu ấn cá nhân độc bản của gia chủ.</p>
                            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">Chúng tôi sở hữu chuỗi cung ứng vật liệu nội thất cao cấp nhập khẩu trực tiếp từ Ý, Đức và Nhật Bản, đảm bảo chất lượng hoàn thiện chuẩn 6 sao.</p>
                            <div class="pt-3 flex items-center gap-6">
                                <button onclick="navigate('about')" class="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow cursor-pointer">Tìm Hiểu Thêm ›</button>
                                <div>
                                    <span class="text-[10px] text-slate-500 uppercase block">Hotline Trực Tiếp</span>
                                    <strong class="text-sm font-black text-amber-600"><?= $c_phone ?></strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <template id="tpl-services">
            <section id="dich-vu" class="py-16 bg-[#0A0A0A] text-white">
                <div class="max-w-7xl mx-auto px-4 space-y-10">
                    <div class="max-w-2xl space-y-2">
                        <span class="text-xs font-black uppercase text-amber-400 tracking-widest block">DỊCH VỤ TOÀN DIỆN</span>
                        <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white">Dịch Vụ Chất Lượng Cao Được Cung Cấp</h2>
                        <p class="text-xs text-slate-400">Hệ sinh thái dịch vụ khép kín từ tư vấn đầu tư bất động sản, thiết kế kiến trúc đến thi công nội thất chìa khóa trao tay.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-[#18181B] p-6 border border-white/10 rounded-sm shadow-md space-y-3 hover:border-amber-500/50 transition group">
                            <div class="w-12 h-12 bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl rounded-sm">
                                <i data-lucide="building-2" class="w-6 h-6"></i>
                            </div>
                            <h3 class="font-bold text-sm text-white uppercase group-hover:text-amber-400 transition">Tư Vấn Đầu Tư Bất Động Sản Hạng Sang</h3>
                            <p class="text-xs text-slate-400 leading-relaxed">Phân phối độc quyền các bộ sưu tập Dinh thự ven sông, Penthouse trung tâm và Biệt thự đồi nghỉ dưỡng sinh thái.</p>
                        </div>
                        <div class="bg-[#18181B] p-6 border border-white/10 rounded-sm shadow-md space-y-3 hover:border-amber-500/50 transition group">
                            <div class="w-12 h-12 bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl rounded-sm">
                                <i data-lucide="palette" class="w-6 h-6"></i>
                            </div>
                            <h3 class="font-bold text-sm text-white uppercase group-hover:text-amber-400 transition">Thiết Kế Kiến Trúc & Cảnh Quan Độc Bản</h3>
                            <p class="text-xs text-slate-400 leading-relaxed">Đội ngũ kiến trúc sư quốc tế sáng tạo nên những tuyệt tác kiến trúc hòa quyện thiên nhiên và phong thủy tài lộc.</p>
                        </div>
                        <div class="bg-[#18181B] p-6 border border-white/10 rounded-sm shadow-md space-y-3 hover:border-amber-500/50 transition group">
                            <div class="w-12 h-12 bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl rounded-sm">
                                <i data-lucide="layers-3" class="w-6 h-6"></i>
                            </div>
                            <h3 class="font-bold text-sm text-white uppercase group-hover:text-amber-400 transition">Thi Công Hoàn Thiện Nội Thất Chuẩn 6 Sao</h3>
                            <p class="text-xs text-slate-400 leading-relaxed">Cam kết tiến độ chính xác từng ngày, vật liệu chế tác thủ công tinh xảo và bảo hành công trình lên tới 10 năm.</p>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <template id="tpl-portfolio">
            <section id="du-an-pho-bien" class="py-16 bg-[#F8FAFC] border-b border-slate-200 text-slate-900">
                <div class="max-w-7xl mx-auto px-4 space-y-8">
                    <div class="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-900 pb-3 gap-4">
                        <div>
                            <div class="flex items-center gap-2 text-xs font-black uppercase text-amber-600 tracking-widest">
                                <span>HƠN 2.500+ DỰ ÁN ĐÃ BÀN GIAO</span>
                            </div>
                            <h2 class="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">Một Số Dự Án Phổ Biến <span id="portfolio-count"></span></h2>
                        </div>
                        <div class="flex flex-wrap items-center gap-2 text-xs">
                            <select id="filterCategory" onchange="renderProjects()" class="bg-white text-slate-900 border border-slate-300 px-3 py-2 rounded-sm focus:outline-none font-medium">
                                <option value="all">Loại BĐS / Kiến Trúc (Tất cả)</option>
                            </select>
                            <select id="filterDistrict" onchange="renderProjects()" class="bg-white text-slate-900 border border-slate-300 px-3 py-2 rounded-sm focus:outline-none font-medium">
                                <option value="all">Khu Vực (Tất cả)</option>
                            </select>
                            <button onclick="handleSearchSubmit()" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase rounded-sm shadow cursor-pointer">Tìm Kiếm</button>
                        </div>
                    </div>
                    
                    <div id="portfolio-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Projects will be rendered here by JS -->
                    </div>
                </div>
            </section>
        </template>

        <template id="tpl-awards">
            <section id="giai-thuong" class="py-16 bg-[#0A0A0A] text-white overflow-hidden border-b border-white/10">
                <div class="max-w-7xl mx-auto px-4 space-y-12">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b border-white/10 pb-12">
                        <div class="space-y-1">
                            <span class="text-3xl sm:text-5xl font-serif font-black text-amber-400">82+</span>
                            <p class="text-xs uppercase font-bold text-slate-400">Giải Thưởng Kiến Trúc</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-3xl sm:text-5xl font-serif font-black text-amber-400">42+</span>
                            <p class="text-xs uppercase font-bold text-slate-400">Dự Án Quốc Tế</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-3xl sm:text-5xl font-serif font-black text-amber-400">24+</span>
                            <p class="text-xs uppercase font-bold text-slate-400">Năm Kinh Nghiệm</p>
                        </div>
                        <div class="space-y-1">
                            <span class="text-3xl sm:text-5xl font-serif font-black text-amber-400">37+</span>
                            <p class="text-xs uppercase font-bold text-slate-400">Chuyên Gia Cấp Cao</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-5 space-y-3">
                            <span class="text-xs font-black uppercase text-amber-400 tracking-widest block">Ý KIẾN KHÁCH HÀNG VIP</span>
                            <h2 class="text-2xl sm:text-3xl font-serif font-black uppercase text-white">Đánh Giá Tích Cực Từ Khách Hàng</h2>
                            <p class="text-xs text-slate-400 leading-relaxed">Sự hài lòng và tin tưởng tuyệt đối của các chủ nhân danh giá chính là thước đo thành công cao nhất của <?= $c_name ?>.</p>
                        </div>
                        <div class="lg:col-span-7 bg-[#18181B] p-8 border border-white/10 rounded-sm relative shadow-2xl">
                            <i data-lucide="quote" class="w-10 h-10 text-amber-500/20 absolute top-4 right-4"></i>
                            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-4">
                                "Tôi đã hợp tác cùng <?= $c_name ?> để thiết kế dinh thự Riviera ven sông tại Quận 7. Đội ngũ kiến trúc sư đã mang lại một giải pháp vượt xa kỳ vọng ban đầu của gia đình tôi. Từng chi tiết đá Marble và hệ thống ánh sáng đều hoàn hảo đến kinh ngạc."
                            </p>
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-950">L</div>
                                <div>
                                    <strong class="text-xs font-bold text-white block">Nguyễn Văn Long</strong>
                                    <span class="text-[10px] text-amber-400 uppercase">Chủ tịch Tập đoàn Xuất Nhập Khẩu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <template id="tpl-pricing">
            <section id="bao-gia" class="py-16 bg-white text-slate-900 border-b border-slate-200">
                <div class="max-w-7xl mx-auto px-4 space-y-10">
                    <div class="text-center space-y-2 max-w-2xl mx-auto">
                        <span class="text-xs font-black uppercase text-amber-600 tracking-widest">BẢNG GIÁ DỊCH VỤ & THIẾT KẾ</span>
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase">Gói Dịch Vụ Thiết Kế & Thi Công Trọn Gói</h2>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-slate-50 p-6 border border-slate-200 rounded-sm space-y-4 flex flex-col justify-between">
                            <div class="space-y-2">
                                <span class="text-xs font-bold text-slate-500 uppercase">GÓI TIÊU CHUẨN</span>
                                <h3 class="text-xl font-serif font-black text-slate-900">Standard Suite</h3>
                                <p class="text-2xl font-black text-slate-950">350.000 đ <span class="text-xs font-normal text-slate-500">/ m²</span></p>
                                <ul class="space-y-2 text-xs text-slate-600 pt-2 border-t">
                                    <li>✔ Thiết kế mặt bằng công năng 2D</li>
                                    <li>✔ Phối cảnh 3D không gian chính</li>
                                    <li>✔ Bản vẽ kỹ thuật thi công cơ bản</li>
                                </ul>
                            </div>
                            <button onclick="navigate('contact')" class="w-full py-2.5 bg-slate-900 text-white font-bold text-xs uppercase rounded-sm">Đăng Ký Gói</button>
                        </div>
                        <div class="bg-[#18181B] text-white p-6 border-2 border-amber-500 rounded-sm space-y-4 flex flex-col justify-between shadow-xl relative">
                            <span class="absolute -top-3 right-4 px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black uppercase rounded-sm">PHỔ BIẾN NHẤT</span>
                            <div class="space-y-2">
                                <span class="text-xs font-bold text-amber-400 uppercase">GÓI CAO CẤP</span>
                                <h3 class="text-xl font-serif font-black text-white">Premium Suite</h3>
                                <p class="text-2xl font-black text-amber-400">550.000 đ <span class="text-xs font-normal text-slate-400">/ m²</span></p>
                                <ul class="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                                    <li>✔ Toàn bộ hồ sơ 3D nội ngoại thất chi tiết</li>
                                    <li>✔ Dự toán bóc tách vật tư nhập khẩu</li>
                                    <li>✔ Giám sát tác giả tại hiện trường 10 buổi</li>
                                    <li>✔ Tặng video 3D walkthrough thực tế ảo</li>
                                </ul>
                            </div>
                            <button onclick="navigate('contact')" class="w-full py-2.5 bg-amber-500 text-slate-950 font-black text-xs uppercase rounded-sm">Đăng Ký Gói VIP</button>
                        </div>
                        <div class="bg-slate-50 p-6 border border-slate-200 rounded-sm space-y-4 flex flex-col justify-between">
                            <div class="space-y-2">
                                <span class="text-xs font-bold text-slate-500 uppercase">GÓI ĐỘC BẢN</span>
                                <h3 class="text-xl font-serif font-black text-slate-900">Bespoke Mansion</h3>
                                <p class="text-2xl font-black text-slate-950">850.000 đ <span class="text-xs font-normal text-slate-500">/ m²</span></p>
                                <ul class="space-y-2 text-xs text-slate-600 pt-2 border-t">
                                    <li>✔ Thiết kế độc bản bởi Giám đốc sáng tạo</li>
                                    <li>✔ Đặt hàng nội thất may đo thủ công từ Ý</li>
                                    <li>✔ Giám sát toàn thời gian 24/7 đến khi bàn giao</li>
                                </ul>
                            </div>
                            <button onclick="navigate('contact')" class="w-full py-2.5 bg-slate-900 text-white font-bold text-xs uppercase rounded-sm">Liên Hệ Độc Bản</button>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <template id="tpl-news">
            <section id="tin-tuc" class="py-16 bg-[#0A0A0A] text-white border-b border-white/10">
                <div class="max-w-7xl mx-auto px-4 space-y-8">
                    <div class="flex items-center justify-between border-b border-white/10 pb-3">
                        <h2 class="text-2xl font-serif font-black uppercase text-white">CÁC TIN TỨC NỔI BẬT</h2>
                        <button onclick="navigate('news')" class="text-xs font-bold text-amber-400 hover:underline">Xem Tất Cả Tin Tức ›</button>
                    </div>
                    <div id="news-grid" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- News will be rendered here by JS -->
                    </div>
                </div>
            </section>
        </template>

        <template id="tpl-contact">
            <section id="form-lien-he" class="py-16 bg-[#111111] text-white">
                <div class="max-w-7xl mx-auto px-4 max-w-2xl text-center space-y-6">
                    <div class="space-y-2">
                        <span class="text-xs font-black uppercase text-amber-400 tracking-widest block">KẾT NỐI VỚI CHUYÊN GIA</span>
                        <h2 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white">Liên Hệ Tìm Hiểu Dịch Vụ</h2>
                        <p class="text-xs text-slate-400">Hãy để lại thông tin, các kiến trúc sư trưởng và chuyên viên đầu tư <?= $c_name ?> sẽ liên hệ tư vấn chuyên sâu cho bạn.</p>
                    </div>
                    <form onsubmit="handleContactSubmit(event)" action="api/contact.php" method="POST" class="bg-[#18181B] p-6 border border-white/10 rounded-sm text-left text-xs space-y-4 shadow-2xl">
                        <div>
                            <label class="block font-bold text-slate-300 mb-1">Dịch vụ quan tâm</label>
                            <input type="hidden" name="service" id="form-service" value="Tư Vấn Đầu Tư BĐS">
                            <div class="grid grid-cols-3 gap-2" id="service-btns">
                                <button type="button" onclick="setService('Tư Vấn Đầu Tư BĐS', this)" class="service-btn p-2 rounded-sm text-[11px] font-bold border transition bg-amber-500 text-slate-950 border-amber-500">Tư Vấn Đầu Tư BĐS</button>
                                <button type="button" onclick="setService('Thiết Kế Kiến Trúc', this)" class="service-btn p-2 rounded-sm text-[11px] font-bold border transition bg-white/5 border-white/10 text-slate-300 hover:bg-white/10">Thiết Kế Kiến Trúc</button>
                                <button type="button" onclick="setService('Thi Công Nội Thất', this)" class="service-btn p-2 rounded-sm text-[11px] font-bold border transition bg-white/5 border-white/10 text-slate-300 hover:bg-white/10">Thi Công Nội Thất</button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label class="block font-bold text-slate-300 mb-1">Họ và tên *</label>
                                <input type="text" name="name" id="form-name" required placeholder="Nguyễn Văn A" class="w-full bg-white/5 border border-white/10 p-2.5 text-white focus:outline-none focus:border-amber-500">
                            </div>
                            <div>
                                <label class="block font-bold text-slate-300 mb-1">Số điện thoại *</label>
                                <input type="tel" name="phone" id="form-phone" required placeholder="<?= $c_phone ?>" class="w-full bg-white/5 border border-white/10 p-2.5 text-white focus:outline-none focus:border-amber-500">
                            </div>
                        </div>
                        <div>
                            <label class="block font-bold text-slate-300 mb-1">Email</label>
                            <input type="email" name="email" id="form-email" placeholder="<?= $c_email ?>" class="w-full bg-white/5 border border-white/10 p-2.5 text-white focus:outline-none focus:border-amber-500">
                        </div>
                        <button type="submit" class="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer">
                            Gửi Yêu Cầu Tư Vấn Ngay
                        </button>
                    </form>
                </div>
            </section>
        </template>
    </div>

    <!-- Universal Footer -->
    <footer class="bg-black text-slate-300 py-12 border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="space-y-4">
                <div class="flex items-center gap-2 cursor-pointer" onclick="navigate('home')">
                    <div class="w-8 h-8 bg-gradient-to-tr from-amber-500 to-amber-200 rounded-sm flex items-center justify-center text-slate-950 font-black text-lg">
                        V
                    </div>
                    <span class="text-xl font-serif font-black text-white"><?= $c_name ?></span>
                </div>
                <p class="text-xs leading-relaxed text-slate-400"><?= $c_slogan ?></p>
                <div class="flex gap-4 pt-2">
                    <a href="#" class="text-slate-400 hover:text-amber-400"><i data-lucide="facebook" class="w-4 h-4"></i></a>
                    <a href="#" class="text-slate-400 hover:text-amber-400"><i data-lucide="instagram" class="w-4 h-4"></i></a>
                    <a href="#" class="text-slate-400 hover:text-amber-400"><i data-lucide="youtube" class="w-4 h-4"></i></a>
                </div>
            </div>
            
            <div>
                <h4 class="text-white font-bold text-sm mb-4 uppercase">Dịch Vụ</h4>
                <ul class="space-y-2 text-xs">
                    <li><a href="#" onclick="event.preventDefault(); navigate('services')" class="hover:text-amber-400">Tư Vấn Đầu Tư BĐS</a></li>
                    <li><a href="#" onclick="event.preventDefault(); navigate('services')" class="hover:text-amber-400">Thiết Kế Kiến Trúc</a></li>
                    <li><a href="#" onclick="event.preventDefault(); navigate('services')" class="hover:text-amber-400">Thi Công Nội Thất</a></li>
                    <li><a href="#" onclick="event.preventDefault(); navigate('portfolio')" class="hover:text-amber-400">Dự Án Tiêu Biểu</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold text-sm mb-4 uppercase">Công Ty</h4>
                <ul class="space-y-2 text-xs">
                    <li><a href="#" onclick="event.preventDefault(); navigate('about')" class="hover:text-amber-400">Giới Thiệu</a></li>
                    <li><a href="#" onclick="event.preventDefault(); navigate('awards')" class="hover:text-amber-400">Giải Thưởng</a></li>
                    <li><a href="#" onclick="event.preventDefault(); navigate('news')" class="hover:text-amber-400">Tin Tức</a></li>
                    <li><a href="#" onclick="event.preventDefault(); navigate('contact')" class="hover:text-amber-400">Liên Hệ</a></li>
                </ul>
            </div>

            <div>
                <h4 class="text-white font-bold text-sm mb-4 uppercase">Liên Hệ</h4>
                <ul class="space-y-3 text-xs">
                    <li class="flex items-start gap-2">
                        <i data-lucide="map-pin" class="w-4 h-4 text-amber-400 shrink-0"></i>
                        <span><?= $c_address ?></span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i data-lucide="phone" class="w-4 h-4 text-amber-400 shrink-0"></i>
                        <span><?= $c_phone ?></span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i data-lucide="mail" class="w-4 h-4 text-amber-400 shrink-0"></i>
                        <span><?= $c_email ?></span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-2">
            <p>© 2026 <?= $c_name ?> Architecture & Luxury Real Estate. All rights reserved.</p>
            <p>Thiết kế bởi <?= $c_name ?></p>
        </div>
    </footer>

    <!-- MAIN SCRIPT -->
    <script>
        lucide.createIcons();

        // MOCK DATA => DYNAMIC DATA FROM PHP
        const BDS18_PROJECTS = <?= json_encode($projects) ?>;
        const BDS18_NEWS = <?= json_encode($news) ?>;
        const FAQS = <?= json_encode($faqs) ?>;

        // INIT VIEWS
        function initLayouts() {
            const views = {
                'home': ['about', 'services', 'portfolio', 'awards', 'pricing', 'news', 'contact'],
                'about': ['about', 'awards', 'contact'],
                'services': ['services', 'pricing', 'contact'],
                'portfolio': ['portfolio', 'contact'],
                'awards': ['awards', 'contact'],
                'pricing': ['pricing', 'contact'],
                'news': ['news', 'contact'],
                'contact': ['contact']
            };

            for (const [page, sections] of Object.entries(views)) {
                if(page === 'home') {
                    sections.forEach(s => {
                        const el = document.getElementById(`home-${s}-placeholder`);
                        if(el) {
                            el.outerHTML = document.getElementById(`tpl-${s}`).innerHTML;
                        }
                    });
                } else {
                    const mainEl = document.getElementById(`view-${page}`);
                    if(mainEl) {
                        mainEl.innerHTML = sections.map(s => document.getElementById(`tpl-${s}`).innerHTML).join('');
                    }
                }
            }
        }
        initLayouts();
        
        // RENDER DATA
        function renderFaqs() {
            const containers = document.querySelectorAll('#faq-container');
            containers.forEach(container => {
                if(!container) return;
                container.innerHTML = FAQS.map((faq, idx) => `
                    <div class="border border-slate-200 rounded-sm overflow-hidden">
                        <button onclick="toggleFaq(this)" class="w-full p-3.5 bg-slate-50 flex items-center justify-between font-bold text-slate-900 text-left hover:bg-amber-50">
                            <span>${faq.q}</span>
                            <i data-lucide="chevron-down" class="w-4 h-4 chevron"></i>
                        </button>
                        <div class="faq-content hidden p-3.5 bg-white text-slate-600 leading-relaxed border-t border-slate-200">
                            ${faq.a}
                        </div>
                    </div>
                `).join('');
            });
            lucide.createIcons();
        }

        function toggleFaq(btn) {
            const content = btn.nextElementSibling;
            const chevron = btn.querySelector('.chevron');
            const isHidden = content.classList.contains('hidden');
            
            // Close all within same container
            const container = btn.closest('.space-y-3');
            container.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            
            if(isHidden) {
                content.classList.remove('hidden');
                // Replace lucide icon
                chevron.outerHTML = '<i data-lucide="chevron-up" class="w-4 h-4 chevron"></i>';
            } else {
                chevron.outerHTML = '<i data-lucide="chevron-down" class="w-4 h-4 chevron"></i>';
            }
            lucide.createIcons();
        }

        function initFilters() {
            const catSet = new Set(BDS18_PROJECTS.map(p => p.category));
            const distSet = new Set(BDS18_PROJECTS.map(p => p.district));
            
            const catSelects = document.querySelectorAll('#filterCategory');
            const distSelects = document.querySelectorAll('#filterDistrict');
            
            catSelects.forEach(select => {
                catSet.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c;
                    opt.textContent = c;
                    select.appendChild(opt);
                });
            });

            distSelects.forEach(select => {
                distSet.forEach(d => {
                    const opt = document.createElement('option');
                    opt.value = d;
                    opt.textContent = d;
                    select.appendChild(opt);
                });
            });
        }

        function renderProjects() {
            const grids = document.querySelectorAll('#portfolio-grid');
            const counts = document.querySelectorAll('#portfolio-count');
            
            // get filter from visible section
            let filterCat = 'all';
            let filterDist = 'all';
            const activeCatSelect = document.querySelector('.page-section.active #filterCategory');
            const activeDistSelect = document.querySelector('.page-section.active #filterDistrict');
            if(activeCatSelect) filterCat = activeCatSelect.value;
            if(activeDistSelect) filterDist = activeDistSelect.value;

            const filtered = BDS18_PROJECTS.filter(p => {
                if (filterCat !== 'all' && p.category !== filterCat) return false;
                if (filterDist !== 'all' && p.district !== filterDist) return false;
                return true;
            });

            counts.forEach(c => c.textContent = `(${filtered.length})`);

            grids.forEach(grid => {
                if(filtered.length === 0) {
                    grid.className = "col-span-full p-12 text-center bg-white border border-slate-200 rounded-sm space-y-3";
                    grid.innerHTML = `
                        <p class="text-sm font-bold text-slate-600">Không tìm thấy dự án nào khớp hoàn toàn với tiêu chí này.</p>
                        <button onclick="document.querySelectorAll('select').forEach(s=>s.value='all');renderProjects();" class="px-5 py-2 bg-amber-500 text-slate-950 font-bold text-xs uppercase rounded-sm shadow">
                            Xem Tất Cả Dự Án
                        </button>
                    `;
                    return;
                }
                
                grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
                grid.innerHTML = filtered.map(proj => `
                    <div class="bg-white border border-slate-200 rounded-sm shadow-sm hover:shadow-xl transition flex flex-col justify-between group overflow-hidden">
                        <div class="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer" onclick="openProject('${proj.id}')">
                            <img src="${proj.image}" alt="${proj.title}" onerror="this.src='https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <span class="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-950/80 backdrop-blur-sm text-amber-400 text-[9px] font-black uppercase rounded-sm">${proj.category}</span>
                            ${proj.hot ? `<span class="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#E11D48] text-white text-[9px] font-black uppercase rounded-sm">HOT</span>` : ''}
                        </div>
                        <div class="p-5 space-y-3">
                            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-between">
                                <span>${proj.style}</span>
                                <span>${proj.year}</span>
                            </div>
                            <h3 onclick="openProject('${proj.id}')" class="text-sm font-serif font-black text-slate-900 uppercase line-clamp-2 hover:text-amber-600 cursor-pointer min-h-[38px]">
                                ${proj.title}
                            </h3>
                            <p class="text-xs text-slate-500 truncate">📍 ${proj.location}</p>
                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span class="text-[10px] text-slate-400 block">GIÁ NIÊM YẾT</span>
                                    <span class="text-sm font-black text-slate-950">${proj.price}</span>
                                </div>
                                <button onclick="openProject('${proj.id}')" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] uppercase rounded-sm transition cursor-pointer">
                                    Chi Tiết ›
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            });
        }

        function renderNewsGrid() {
            const grids = document.querySelectorAll('#news-grid');
            grids.forEach(grid => {
                grid.innerHTML = BDS18_NEWS.map(n => `
                    <div class="bg-[#18181B] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between group shadow-lg">
                        <img src="${n.image}" alt="${n.title}" onclick="openNews(${n.id})" class="w-full h-56 object-cover group-hover:scale-105 transition duration-500 cursor-pointer" />
                        <div class="p-6 space-y-2">
                            <span class="text-[10px] font-bold text-amber-400 uppercase">${n.category} • ${n.date}</span>
                            <h3 onclick="openNews(${n.id})" class="text-base font-serif font-black text-white uppercase hover:text-amber-400 cursor-pointer line-clamp-2">
                                ${n.title}
                            </h3>
                            <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">${n.excerpt}</p>
                        </div>
                    </div>
                `).join('');
            });
        }

        // NAVIGATION & STATE
        let currentPage = 'home';
        
        function navigate(page) {
            document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
            document.getElementById(`view-${page}`).classList.add('active');
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                if(btn.dataset.target === page || (page === 'property-detail' && btn.dataset.target === 'portfolio') || (page === 'news-detail' && btn.dataset.target === 'news')) {
                    btn.classList.add('text-amber-400', 'font-extrabold', 'border-b-2', 'border-amber-400');
                    btn.classList.remove('hover:text-white');
                } else {
                    btn.classList.remove('text-amber-400', 'font-extrabold', 'border-b-2', 'border-amber-400');
                    btn.classList.add('hover:text-white');
                }
            });

            currentPage = page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
            
            // Fix icon after re-render if necessary
            lucide.createIcons();
        }

        function openProject(id) {
            const proj = BDS18_PROJECTS.find(p => p.id === id);
            if(!proj) return;
            
            document.getElementById('detail-title').textContent = proj.title;
            document.getElementById('detail-meta').textContent = `Giá niêm yết: ${proj.price} — Diện tích: ${proj.area} — Phong cách: ${proj.style}`;
            document.getElementById('detail-image').src = proj.image;
            document.getElementById('detail-desc').textContent = proj.description;
            document.getElementById('detail-specs').innerHTML = proj.specs.map(s => `<li class="flex items-center gap-1.5">✔ ${s}</li>`).join('');
            
            navigate('property-detail');
        }

        function openNews(id) {
            const news = BDS18_NEWS.find(n => n.id === id);
            if(!news) return;

            document.getElementById('news-detail-title').textContent = news.title;
            document.getElementById('news-detail-meta').textContent = `🕒 ${news.date} • Tác giả: ${news.author} • ${news.views} lượt xem`;
            document.getElementById('news-detail-img').src = news.image;
            document.getElementById('news-detail-content').innerHTML = news.content.map(p => `<p>${p}</p>`).join('');
            
            navigate('news-detail');
        }

        // MOBILE MENU
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // FORM HANDLING
        function setService(service, btn) {
            const container = btn.closest('.bg-\\[\\#18181B\\]');
            container.querySelector('#form-service').value = service;
            
            container.querySelectorAll('.service-btn').forEach(b => {
                b.className = "service-btn p-2 rounded-sm text-[11px] font-bold border transition bg-white/5 border-white/10 text-slate-300 hover:bg-white/10";
            });
            btn.className = "service-btn p-2 rounded-sm text-[11px] font-bold border transition bg-amber-500 text-slate-950 border-amber-500";
        }

        function handleContactSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const name = form.querySelector('[name="name"]').value;
            const phone = form.querySelector('[name="phone"]').value;
            
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData
            }).then(res => res.json()).then(res => {
                if(res.success) {
                    showToast(`🎉 Tiếp nhận yêu cầu tư vấn từ ${name} (${phone}). Giám đốc sáng tạo <?= $c_name ?> sẽ liên hệ trong 15 phút!`);
                    form.reset();
                } else {
                    showToast(`❌ Lỗi: ${res.message}`);
                }
            }).catch(() => {
                showToast(`❌ Có lỗi xảy ra, vui lòng thử lại sau.`);
            });
        }

        function handleSearchSubmit() {
            if (currentPage !== 'home' && currentPage !== 'portfolio') {
                navigate('home');
            }
            showToast(`🔍 Đã áp dụng bộ lọc dự án.`);
            setTimeout(() => {
                scrollToEl('du-an-pho-bien');
            }, 100);
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = msg;
            toast.classList.remove('translate-y-20', 'opacity-0');
            
            setTimeout(() => {
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 4000);
        }

        function scrollToEl(id) {
            // navigate to appropriate page if element is not in current view
            if (!document.querySelector('.page-section.active #' + id)) {
                // simple mapping
                if(id === 'form-lien-he') {
                    // exists everywhere except detail pages, we can just jump to contact page if missing
                    if(currentPage === 'property-detail' || currentPage === 'news-detail') navigate('contact');
                } else if(id === 'du-an-pho-bien') {
                    navigate('portfolio');
                }
            }
            
            setTimeout(() => {
                const el = document.querySelector('.page-section.active #' + id);
                if(el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }

        // INITIALIZE APP
        renderFaqs();
        initFilters();
        renderProjects();
        renderNewsGrid();
        navigate('home');
        
    </script>
</body>
</html>