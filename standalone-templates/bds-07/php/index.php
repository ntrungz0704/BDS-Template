<?php
require_once 'config/db.php';

// Default company info
$company = [
    'name' => 'TEMPLATESBDS',
    'phone' => '0919 006 030',
    'email' => 'info@templatesbds.com',
    'address' => 'Làng Sinh Thái Pannamera, Xã Lộc Tân, TP. Bảo Lộc, Lâm Đồng',
    'slogan' => 'LÀNG SINH THÁI NGHỈ DƯỠNG',
    'zalo' => '0919006030'
];

$projects = [
    [
        'name' => 'Lô Đất Vườn Nghỉ Dưỡng Săn Mây View Đồi Thông Tuyệt Mỹ',
        'type' => 'Đất Vườn Săn Mây • Phân Khu Săn Mây A1',
        'area' => '250.0 m²',
        'direction' => 'Đông Nam',
        'price' => '890 Triệu VNĐ',
        'image_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
        'badge_text' => 'SUẤT NGOẠI GIAO'
    ],
    [
        'name' => 'Lô Góc 2 Mặt Tiền Suối Tự Nhiên & Đồi Chè Xanh Bát Ngát',
        'type' => 'Đất Vườn Sinh Thái • Phân Khu Ven Suối B2',
        'area' => '350.0 m²',
        'direction' => 'Nam - Đông Nam',
        'price' => '1.25 Tỷ VNĐ',
        'image_url' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
        'badge_text' => 'VIEW SUỐI HIẾM'
    ],
    [
        'name' => 'Nhà Vườn Bungalow Gỗ Mẫu Hoàn Thiện Full Sân Vườn',
        'type' => 'Bungalow Nghỉ Dưỡng • Phân Khu Trung Tâm C1',
        'area' => '300.0 m²',
        'direction' => 'Đông',
        'price' => '1.45 Tỷ VNĐ',
        'image_url' => 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
        'badge_text' => 'XÂY SẴN CHÌA KHÓA TRAO TAY'
    ],
    [
        'name' => 'Biệt Thự Vườn Sinh Thái Panorama View 360 Độ Đồi Chè',
        'type' => 'Biệt Thự Đồi • Phân Khu Sunset Villa',
        'area' => '500.0 m²',
        'direction' => 'Đông Bắc',
        'price' => '1.85 Tỷ VNĐ',
        'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'badge_text' => 'VIEW PANORAMA 360'
    ]
];

if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch()) {
            $company = $row;
        }
        
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id ASC");
        $db_projects = $stmt->fetchAll();
        if ($db_projects) {
            $projects = $db_projects;
        }
    } catch (PDOException $e) {
        // Fallback to defaults
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PANNAMERA - Làng Sinh Thái Nghỉ Dưỡng Bảo Lộc</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        emerald: {
                            50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
                            400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
                            800: '#065f46', 900: '#064e3b', 950: '#022c22',
                        },
                        amber: {
                            300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706',
                        }
                    }
                }
            }
        }
    </script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
    </style>
</head>
<body class="bg-[#F8FAFC] text-slate-900 selection:bg-[#047857] selection:text-white">

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-sm shadow-2xl font-bold text-xs items-center gap-2 animate-bounce hidden">
        <i data-lucide="check-circle" class="w-4 h-4"></i> <span id="toast-msg"></span>
    </div>

    <!-- Video Modal -->
    <div id="video-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md items-center justify-center p-4 hidden">
        <div class="relative w-full max-w-4xl bg-slate-900 rounded-md overflow-hidden shadow-2xl border border-slate-700">
            <button onclick="closeVideo()" class="absolute top-4 right-4 p-2 rounded-sm bg-slate-800 text-white hover:bg-red-600 transition-colors z-10">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
            <div class="aspect-video">
                <iframe class="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0" title="Pannamera Bao Loc Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    </div>

    <!-- Lightbox Modal -->
    <div id="lightbox-modal" onclick="closeLightbox()" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md items-center justify-center p-4 cursor-zoom-out hidden">
        <div class="relative max-w-5xl max-h-[90vh] rounded-sm overflow-hidden shadow-2xl border-2 border-white/20">
            <img id="lightbox-img" src="" alt="Lightbox Zoom" class="w-full h-full object-contain" />
        </div>
    </div>

    <!-- Header -->
    <header class="sticky top-0 z-40 bg-[#064E3B] text-white shadow-xl border-b border-emerald-800/60">
        <!-- Top micro bar -->
        <div class="bg-[#047857] text-white text-[11px] font-bold py-1.5 px-4 hidden md:block">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <div class="flex items-center gap-6">
                    <span>🌿 MỞ BÁN PHÂN KHU SĂN MÂY: TẶNG NGAY 1 CHỈ VÀNG — CHIẾT KHẤU ĐẾN 8%</span>
                    <span class="opacity-80">★ SỔ ĐỎ THỔ CƯ CÔNG CHỨNG NGAY ★</span>
                </div>
                <div class="flex items-center gap-4">
                    <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="flex items-center gap-1.5 hover:underline">
                        <i data-lucide="phone" class="w-3.5 h-3.5 animate-pulse text-amber-300"></i> Hotline CĐT: <strong><?= htmlspecialchars($company["phone"]) ?></strong>
                    </a>
                    <span class="opacity-50">|</span>
                    <span class="text-amber-300 font-extrabold">MẪU GIAO DIỆN: BDS-07</span>
                </div>
            </div>
        </div>

        <!-- Main Navbar -->
        <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
            <div onclick="window.scrollTo(0,0)" class="flex items-center gap-2 sm:gap-2.5 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform border border-emerald-400/40 shrink-0">
                    <i data-lucide="mountain" class="w-5 h-5 text-amber-300"></i>
                </div>
                <div class="min-w-0 truncate">
                    <span class="text-sm sm:text-base font-black tracking-tight block leading-tight text-white group-hover:text-emerald-300 transition-colors truncate"><?= htmlspecialchars($company["name"]) ?></span>
                    <span class="text-[7.5px] sm:text-[10px] tracking-widest text-emerald-300 block uppercase font-bold truncate"><?= htmlspecialchars($company["slogan"]) ?></span>
                </div>
            </div>

            <!-- Desktop Menu -->
            <nav class="hidden lg:flex items-center gap-2 xl:gap-4 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-emerald-100 whitespace-nowrap">
                <a href="#hero" class="px-1.5 py-1 hover:text-amber-300 text-amber-400 font-extrabold">Trang Chủ</a>
                <a href="#masterplan-section" class="px-1.5 py-1 hover:text-amber-300">Đất Vườn</a>
                <a href="#bungalow-model-section" class="px-1.5 py-1 hover:text-amber-300">Bungalow</a>
                <a href="#masterplan-section" class="px-1.5 py-1 hover:text-amber-300">Biệt Thự</a>
                <a href="#amenities-section" class="px-1.5 py-1 hover:text-amber-300">Tiện Ích</a>
                <a href="#gallery-section" class="px-1.5 py-1 hover:text-amber-300">Thư Viện</a>
                <a href="#news-mortgage-section" class="px-1.5 py-1 hover:text-amber-300">Tin Tức</a>
                <a href="#consign-section" class="px-1.5 py-1 hover:text-amber-300">Ký Gửi</a>
                <a href="#lead-form-section" class="px-1.5 py-1 hover:text-amber-300">Liên Hệ</a>
            </nav>

            <!-- CTA -->
            <div class="flex items-center gap-2.5 shrink-0 ml-auto">
                <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-sm bg-emerald-900/80 hover:bg-emerald-800 text-xs font-bold text-emerald-200 border border-emerald-700/60 transition-colors whitespace-nowrap shrink-0">
                    <i data-lucide="phone" class="w-3.5 h-3.5 text-amber-400 animate-pulse"></i>
                    <span><?= htmlspecialchars($company["phone"]) ?></span>
                </a>
                <a href="#lead-form-section" class="hidden md:inline-block px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black rounded-sm shadow-lg transition-all uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105">
                    Tải Báo Giá VIP
                </a>
                <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="p-1.5 sm:p-2 rounded-sm bg-emerald-900 text-white lg:hidden hover:bg-emerald-800 shrink-0 flex items-center justify-center">
                    <i data-lucide="menu" class="w-5 h-5"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Drawer -->
        <div id="mobile-menu" class="hidden lg:hidden bg-[#064E3B] border-b border-emerald-800 px-6 py-5 space-y-3">
            <div class="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
                <a href="#hero" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Trang Chủ</a>
                <a href="#masterplan-section" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Đất Vườn</a>
                <a href="#bungalow-model-section" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Bungalow</a>
                <a href="#masterplan-section" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Biệt Thự</a>
                <a href="#amenities-section" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Tiện Ích</a>
                <a href="#gallery-section" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Thư Viện</a>
                <a href="#news-mortgage-section" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Tin Tức</a>
                <a href="#consign-section" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Ký Gửi</a>
                <a href="#lead-form-section" onclick="document.getElementById('mobile-menu').classList.add('hidden')" class="p-2.5 rounded-lg text-left bg-emerald-800/80 hover:bg-amber-500/20 hover:text-amber-300">Liên Hệ</a>
            </div>
        </div>
    </header>

    <main class="flex-1 w-full">
        <!-- Hero Section -->
        <section id="hero" class="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80" alt="Pannamera Cloud Hunting View" onerror="this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'" class="absolute inset-0 w-full h-full object-cover object-center scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#022C22] via-[#022C22]/60 to-[#022C22]/30"></div>
            
            <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F0FDF4] to-transparent z-10 opacity-90"></div>

            <div class="relative z-20 max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#047857]/90 text-white text-xs font-black tracking-widest uppercase shadow-xl backdrop-blur-md border border-emerald-400/30 whitespace-nowrap">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300 shrink-0"></i> THIÊN ĐƯỜNG NGHỈ DƯỠNG SINH THÁI TÂY NGUYÊN
                </div>

                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-2xl">
                    PANNAMERA <br />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-lime-300 inline-block">NƠI DỪNG CHÂN LÝ TƯỞNG</span>
                </h1>

                <p class="text-sm sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
                    Tuyệt tác làng sinh thái đồi chè bên dòng suối tự nhiên tại Bảo Lộc. Độ cao 900m mát lạnh quanh năm 18 - 22°C, nơi an trú trọn vẹn của tâm hồn.
                </p>

                <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <a href="#masterplan-section" class="px-8 py-4 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                        Khám Phá Mặt Bằng 3D <i data-lucide="chevron-right" class="w-4 h-4"></i>
                    </a>
                    <button onclick="openVideo()" class="px-7 py-4 rounded-sm bg-emerald-950/60 hover:bg-emerald-900/80 text-white border border-emerald-400/40 backdrop-blur-md font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                        <i data-lucide="play" class="w-4 h-4 text-amber-400 fill-amber-400"></i> Xem Flycam Săn Mây
                    </button>
                </div>

                <div class="pt-6">
                    <div class="inline-grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-sm bg-[#064E3B]/90 backdrop-blur-md border border-emerald-700/60 shadow-2xl text-left">
                        <div class="px-3 border-r border-emerald-700/60">
                            <span class="text-[10px] uppercase font-bold text-emerald-300 block">Độ Cao Nghỉ Dưỡng</span>
                            <span class="text-base sm:text-lg font-black text-amber-300">900m Biển</span>
                        </div>
                        <div class="px-3 border-r border-emerald-700/60">
                            <span class="text-[10px] uppercase font-bold text-emerald-300 block">Khí Hậu Quanh Năm</span>
                            <span class="text-base sm:text-lg font-black text-emerald-300">18°C - 22°C</span>
                        </div>
                        <div class="px-3 border-r border-emerald-700/60">
                            <span class="text-[10px] uppercase font-bold text-emerald-300 block">Quy Mô Phân Lô</span>
                            <span class="text-base sm:text-lg font-black text-lime-300">250 - 1000m²</span>
                        </div>
                        <div class="px-3">
                            <span class="text-[10px] uppercase font-bold text-emerald-300 block">Pháp Lý Sở Hữu</span>
                            <span class="text-base sm:text-lg font-black text-amber-400">Sổ Đỏ Trao Tay</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Overview Section -->
        <section id="overview-section" class="py-20 bg-[#F0FDF4] text-slate-900">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
                    <span class="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">★ THIÊN NHIÊN NGUYÊN SƠ — VÙNG ĐẤT CHỮA LÀNH ★</span>
                    <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">VẺ ĐẸP HOANG SƠ & TỔNG QUAN PANNAMERA</h2>
                    <div class="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div class="lg:col-span-5 space-y-4">
                        <div class="relative rounded-md overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900 group">
                            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80" alt="Đồi chè Bảo Lộc" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                                <div class="text-white space-y-1">
                                    <span class="px-3 py-1 bg-[#047857] text-[10px] font-black uppercase rounded-md inline-block">KHÍ HẬU 18 - 22°C</span>
                                    <h4 class="text-base font-black">Bình Minh Săn Mây Trên Đồi Chè Bát Ngát</h4>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 rounded-sm bg-emerald-100/80 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-3">
                            <i data-lucide="leaf" class="w-6 h-6 text-emerald-700 flex-shrink-0"></i>
                            <div>
                                <strong class="block">Không Gian Sống Xanh Thuần Khiết</strong>
                                <span class="opacity-80 text-[11px]">Được bao bọc bởi đồi chè Oolong và rừng thông nguyên sinh, cách xa khói bụi đô thị.</span>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-7 space-y-4">
                        <div class="bg-white border border-emerald-200/80 rounded-md p-6 sm:p-8 space-y-3.5 shadow-sm">
                            <div class="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-100 pb-2.5">
                                <div class="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5"><i data-lucide="check" class="w-3 h-3"></i></div>
                                <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2"><span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">Tên Dự Án:</span><span class="font-extrabold text-slate-800 sm:col-span-8">Làng Sinh Thái Nghỉ Dưỡng Pannamera Bảo Lộc</span></div>
                            </div>
                            <div class="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-100 pb-2.5">
                                <div class="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5"><i data-lucide="check" class="w-3 h-3"></i></div>
                                <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2"><span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">Vị Trí Tọa Lạc:</span><span class="font-extrabold text-slate-800 sm:col-span-8">Xã Lộc Tân & Đam B’ri, TP. Bảo Lộc, Tỉnh Lâm Đồng</span></div>
                            </div>
                            <div class="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-100 pb-2.5">
                                <div class="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5"><i data-lucide="check" class="w-3 h-3"></i></div>
                                <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2"><span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">Quy Mô Quy Hoạch:</span><span class="font-extrabold text-slate-800 sm:col-span-8">Giai đoạn 1 gồm 120 nền biệt thự vườn & bungalow</span></div>
                            </div>
                            <div class="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-100 pb-2.5">
                                <div class="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5"><i data-lucide="check" class="w-3 h-3"></i></div>
                                <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2"><span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">Diện Tích Từng Nền:</span><span class="font-extrabold text-slate-800 sm:col-span-8">250m² - 350m² - 500m² - 1.000m² (Mặt tiền 10m - 20m)</span></div>
                            </div>
                            <div class="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-100 pb-2.5">
                                <div class="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5"><i data-lucide="check" class="w-3 h-3"></i></div>
                                <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2"><span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">Pháp Lý Dự Án:</span><span class="font-extrabold text-slate-800 sm:col-span-8">Sổ hồng riêng từng nền, sẵn 100m² - 200m² thổ cư ODT</span></div>
                            </div>
                            <div class="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-100 pb-2.5">
                                <div class="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5"><i data-lucide="check" class="w-3 h-3"></i></div>
                                <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2"><span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">Hạ Tầng Hoàn Thiện:</span><span class="font-extrabold text-slate-800 sm:col-span-8">Đường trải nhựa 8m-12m, điện âm, nước máy, đèn NLMT</span></div>
                            </div>
                            <div class="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-100 pb-2.5">
                                <div class="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5"><i data-lucide="check" class="w-3 h-3"></i></div>
                                <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2"><span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">Hệ Thống Tiện Ích:</span><span class="font-extrabold text-slate-800 sm:col-span-8">Cối xay gió, Vườn hoa cẩm tú cầu, Suối đá, Hồ cá Koi, Glamping</span></div>
                            </div>
                            <div class="flex items-start gap-3 text-xs sm:text-sm">
                                <div class="w-5 h-5 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center flex-shrink-0 mt-0.5"><i data-lucide="check" class="w-3 h-3"></i></div>
                                <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2"><span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">Dịch Vụ Vận Hành:</span><span class="font-extrabold text-slate-800 sm:col-span-8">Chăm sóc cảnh quan, quản lý & khai thác homestay cho thuê</span></div>
                            </div>
                        </div>

                        <div class="text-center sm:text-left pt-2">
                            <a href="#lead-form-section" class="inline-block px-8 py-3.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-extrabold rounded-sm shadow-lg shadow-emerald-900/30 uppercase tracking-wider transition-all hover:scale-105">
                                Tải Bảng Giá F1 & Trích Lục Bản Đồ Địa Chính
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Location Section & Quick Lead Bar -->
        <section id="location-section" class="py-20 bg-[#064E3B] text-white relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 relative z-10">
                <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
                    <span class="text-xs font-extrabold text-amber-300 uppercase tracking-widest block">★ TÂM ĐIỂM KẾT NỐI CAO TỐC DẦU GIÂY — LIÊN KHƯƠNG ★</span>
                    <h2 class="text-2xl sm:text-4xl font-black tracking-tight">VỊ TRÍ KIM CƯƠNG & BẢN ĐỒ LIÊN KẾT</h2>
                    <div class="w-16 h-1 bg-amber-400 mx-auto rounded-sm mt-2"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
                    <div class="lg:col-span-6 space-y-3.5">
                        <div class="p-4 rounded-sm bg-emerald-900/60 border border-emerald-700/60 hover:border-amber-400 transition-all flex items-start gap-4 hover:translate-x-1">
                            <div class="w-16 h-11 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex flex-col items-center justify-center flex-shrink-0 font-black shadow-lg">
                                <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-950 mb-0.5"></i>
                                <span class="text-xs leading-none font-black">5 Phút</span>
                            </div>
                            <div>
                                <h4 class="font-extrabold text-sm sm:text-base text-white">Nút Giao Cao Tốc Dầu Giây — Tân Phú — Bảo Lộc</h4>
                                <p class="text-xs text-emerald-200/80 mt-0.5">Kết nối cao tốc thông suốt, di chuyển về TP.HCM chỉ 1h45 phút.</p>
                            </div>
                        </div>
                        <div class="p-4 rounded-sm bg-emerald-900/60 border border-emerald-700/60 hover:border-amber-400 transition-all flex items-start gap-4 hover:translate-x-1">
                            <div class="w-16 h-11 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex flex-col items-center justify-center flex-shrink-0 font-black shadow-lg">
                                <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-950 mb-0.5"></i>
                                <span class="text-xs leading-none font-black">8 Phút</span>
                            </div>
                            <div>
                                <h4 class="font-extrabold text-sm sm:text-base text-white">Đồi Chè Tâm Châu & Thung Lũng Trà Oolong</h4>
                                <p class="text-xs text-emerald-200/80 mt-0.5">Thiên đường check-in đồi chè bát ngát nổi tiếng nhất Tây Nguyên.</p>
                            </div>
                        </div>
                        <div class="p-4 rounded-sm bg-emerald-900/60 border border-emerald-700/60 hover:border-amber-400 transition-all flex items-start gap-4 hover:translate-x-1">
                            <div class="w-16 h-11 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex flex-col items-center justify-center flex-shrink-0 font-black shadow-lg">
                                <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-950 mb-0.5"></i>
                                <span class="text-xs leading-none font-black">10 Phút</span>
                            </div>
                            <div>
                                <h4 class="font-extrabold text-sm sm:text-base text-white">Thác Dambri & Quần Thể Du Lịch Sinh Thái 7 Tầng</h4>
                                <p class="text-xs text-emerald-200/80 mt-0.5">Khu du lịch danh thắng quốc gia với rừng nguyên sinh và cáp treo.</p>
                            </div>
                        </div>
                        <div class="p-4 rounded-sm bg-emerald-900/60 border border-emerald-700/60 hover:border-amber-400 transition-all flex items-start gap-4 hover:translate-x-1">
                            <div class="w-16 h-11 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex flex-col items-center justify-center flex-shrink-0 font-black shadow-lg">
                                <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-950 mb-0.5"></i>
                                <span class="text-xs leading-none font-black">12 Phút</span>
                            </div>
                            <div>
                                <h4 class="font-extrabold text-sm sm:text-base text-white">Tu Viện Bát Nhã & Lâu Đài Trắng Tráng Lệ</h4>
                                <p class="text-xs text-emerald-200/80 mt-0.5">Điểm đến tâm linh thanh tịnh và công trình kiến trúc cổ kính.</p>
                            </div>
                        </div>
                        <div class="p-4 rounded-sm bg-emerald-900/60 border border-emerald-700/60 hover:border-amber-400 transition-all flex items-start gap-4 hover:translate-x-1">
                            <div class="w-16 h-11 rounded-sm bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 flex flex-col items-center justify-center flex-shrink-0 font-black shadow-lg">
                                <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-950 mb-0.5"></i>
                                <span class="text-xs leading-none font-black">15 Phút</span>
                            </div>
                            <div>
                                <h4 class="font-extrabold text-sm sm:text-base text-white">Trung Tâm Hành Chính TP. Bảo Lộc & Chợ Đêm</h4>
                                <p class="text-xs text-emerald-200/80 mt-0.5">Tiếp cận đầy đủ siêu thị Co.opmart, bệnh viện đa khoa, trường học.</p>
                            </div>
                        </div>
                    </div>

                    <div class="lg:col-span-6 rounded-md overflow-hidden border border-emerald-700 bg-emerald-950 shadow-2xl p-4">
                        <div class="relative aspect-[4/3] rounded-sm overflow-hidden bg-slate-900">
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80" alt="Map Pannamera" class="w-full h-full object-cover opacity-85" />
                            <div class="absolute inset-0 bg-emerald-950/60 flex flex-col justify-between p-6">
                                <div class="inline-block self-start px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-black shadow-md">
                                    📍 VỊ TRÍ <?= htmlspecialchars($company["name"]) ?>
                                </div>
                                <div class="bg-[#022C22]/90 backdrop-blur-md p-4 rounded-sm border border-emerald-700 text-xs space-y-1">
                                    <strong class="text-amber-300 block font-black">TRỤC KẾT NỐI CAO TỐC LIÊN KHƯƠNG</strong>
                                    <p class="text-emerald-200 text-[11px]">Nằm ngay cửa ngõ kết nối trục du lịch TP.HCM - Bảo Lộc - Đà Lạt.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Lead Bar -->
                <div id="lead-form-section" class="bg-[#022C22] border border-emerald-600/60 rounded-md p-6 shadow-2xl">
                    <form action="api/contact.php" method="POST" onsubmit="showToast('Đã tiếp nhận yêu cầu. Bảng giá sẽ được gửi qua Zalo!'); event.preventDefault();" class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                        <div class="sm:col-span-3">
                            <input type="text" name="name" required placeholder="Họ và tên của bạn..." class="w-full px-4 py-3 rounded-sm bg-emerald-950 border border-emerald-700 text-white text-xs focus:outline-none focus:border-amber-400" />
                        </div>
                        <div class="sm:col-span-3">
                            <input type="tel" name="phone" required placeholder="Số điện thoại / Zalo (*)..." class="w-full px-4 py-3 rounded-sm bg-emerald-950 border border-emerald-700 text-amber-300 font-bold text-xs focus:outline-none focus:border-amber-400" />
                        </div>
                        <div class="sm:col-span-3">
                            <select name="productType" class="w-full px-4 py-3 rounded-sm bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs focus:outline-none focus:border-amber-400">
                                <option class="text-slate-900 bg-white font-medium" value="Đất Vườn Săn Mây 250m²">Đất Vườn Săn Mây 250m² (Từ 890Tr)</option>
                                <option class="text-slate-900 bg-white font-medium" value="Đất Vườn Suối 350m²">Đất Vườn View Suối 350m² (Từ 1.25 Tỷ)</option>
                                <option class="text-slate-900 bg-white font-medium" value="Bungalow Gỗ Hoàn Thiện">Bungalow Gỗ Xây Sẵn (1.45 Tỷ)</option>
                                <option class="text-slate-900 bg-white font-medium" value="Biệt Thự Đồi 500m²">Biệt Thự Đồi 500m² (1.85 Tỷ)</option>
                                <option class="text-slate-900 bg-white font-medium" value="Farmstay 1000m²">Farmstay Trồng Cây 1000m²</option>
                            </select>
                        </div>
                        <div class="sm:col-span-3">
                            <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black uppercase tracking-wider rounded-sm shadow-lg transition-all">
                                Gửi Yêu Cầu Nhận Báo Giá
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- Amenities Section -->
        <section id="amenities-section" class="py-20 bg-white text-slate-900">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
                    <span class="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">★ TRẢI NGHIỆM ĐỘC ĐÁO — SỐNG CHẬM GIỮA ĐỒI HOA ★</span>
                    <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">TIỆN ÍCH NGHỈ DƯỠNG ĐỘC ĐÁO</h2>
                    <div class="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 bg-[#F0FDF4] p-6 sm:p-10 rounded-md border border-emerald-200">
                    <div class="lg:col-span-5 flex justify-center">
                        <div class="relative w-64 h-64 sm:w-80 sm:h-80 rounded-sm overflow-hidden border-8 border-white shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80" alt="Cối Xay Gió" class="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div class="lg:col-span-7 space-y-4">
                        <span class="px-3.5 py-1 bg-[#047857] text-white text-xs font-black uppercase rounded-lg shadow inline-block">BIỂU TƯỢNG ĐẶC QUYỀN</span>
                        <h3 class="text-2xl sm:text-3xl font-black text-slate-900">Quảng Trường Cối Xay Gió & Đồi Hoa Cẩm Tú Cầu</h3>
                        <p class="text-sm text-slate-600 leading-relaxed">
                            Lấy cảm hứng từ những ngôi làng thần tiên châu Âu, cụm cối xay gió tọa lạc kiêu hãnh giữa thung lũng hoa cẩm tú cầu nở rộ quanh năm, là điểm hẹn săn ảnh và thưởng trà chiều lãng mạn cho cư dân và du khách.
                        </p>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                            <div class="p-3 bg-white rounded-sm border border-emerald-200 text-center">
                                <span class="text-[10px] uppercase font-bold text-slate-400 block">Vườn Hoa</span>
                                <strong class="text-xs font-black text-emerald-800">5.000 m²</strong>
                            </div>
                            <div class="p-3 bg-white rounded-sm border border-emerald-200 text-center">
                                <span class="text-[10px] uppercase font-bold text-slate-400 block">Độ Cao Check-in</span>
                                <strong class="text-xs font-black text-amber-600">Cao 15 Mét</strong>
                            </div>
                            <div class="p-3 bg-white rounded-sm border border-emerald-200 text-center">
                                <span class="text-[10px] uppercase font-bold text-slate-400 block">Trà Quán</span>
                                <strong class="text-xs font-black text-emerald-800">View 360 Độ</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-slate-50 rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1 group flex flex-col shadow-sm hover:shadow-xl">
                        <div class="relative aspect-[16/10] overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80" alt="Cối Xay Gió" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">WINDMILL & FLOWER GARDEN</div>
                        </div>
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-2">
                            <h4 class="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">Biểu Tượng Cối Xay Gió & Vườn Hoa Cẩm Tú Cầu</h4>
                            <p class="text-xs text-slate-600 leading-relaxed">Điểm nhấn kiến trúc phong cách Hà Lan rực rỡ giữa thung lũng hoa ngát hương, nơi lưu giữ những bức ảnh check-in tuyệt mỹ.</p>
                        </div>
                    </div>
                    <div class="bg-slate-50 rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1 group flex flex-col shadow-sm hover:shadow-xl">
                        <div class="relative aspect-[16/10] overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" alt="Glamping" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">GLAMPING & CAMPFIRE</div>
                        </div>
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-2">
                            <h4 class="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">Khu Cắm Trại Glamping & Tiệc Nướng BBQ Ven Rừng</h4>
                            <p class="text-xs text-slate-600 leading-relaxed">Lều trại sang trọng phong cách Mông Cổ đầy đủ tiện nghi, khu lửa trại ngoài trời và quầy bar thưởng thức rượu vang dưới bầu trời sao.</p>
                        </div>
                    </div>
                    <div class="bg-slate-50 rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all duration-300 hover:-translate-y-1 group flex flex-col shadow-sm hover:shadow-xl">
                        <div class="relative aspect-[16/10] overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" alt="Koi Pond" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">NATURAL STREAM & KOI POND</div>
                        </div>
                        <div class="p-6 flex-1 flex flex-col justify-between space-y-2">
                            <h4 class="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">Dòng Suối Tự Nhiên & Hồ Cá Koi Phong Thủy</h4>
                            <p class="text-xs text-slate-600 leading-relaxed">Dòng suối nguồn trong vắt róc rách quanh năm cùng hồ cá Koi Nhật Bản tạo nên sinh khí vượng tài và cảm giác thư thái cho gia chủ.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Masterplan Section -->
        <section id="masterplan-section" class="py-20 bg-[#F0FDF4] text-slate-900">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <span class="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">★ QUY HOẠCH ĐỒNG BỘ — SỔ ĐỎ RIÊNG TỪNG NỀN ★</span>
                    <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">MẶT BẰNG QUY HOẠCH & PHÂN LÔ 3D</h2>
                    <div class="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2"></div>
                </div>

                <div class="bg-white rounded-md p-4 sm:p-6 border border-emerald-200 shadow-md mb-12">
                    <div class="relative aspect-[21/9] rounded-sm overflow-hidden bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&q=80" alt="Masterplan 3D Pannamera" class="w-full h-full object-cover opacity-90" />
                        <div class="absolute inset-0 bg-gradient-to-t from-[#022C22]/90 via-transparent to-transparent flex items-end p-6">
                            <div class="text-white space-y-1">
                                <span class="px-3 py-1 bg-[#047857] text-[10px] font-black uppercase rounded-md inline-block">SƠ ĐỒ PHÂN KHU ĐỒI SĂN MÂY 1/500</span>
                                <h3 class="text-base sm:text-xl font-black">Quy Hoạch Làng Sinh Thái Nghỉ Dưỡng Khép Kín Chuẩn Quốc Tế</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <?php foreach ($projects as $project): ?>
                    <div class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                        <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
                            <img src="<?= htmlspecialchars($project['image_url']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow"><?= htmlspecialchars($project['badge_text']) ?></div>
                            <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#022C22]/90 text-amber-300 text-xs font-black backdrop-blur"><?= htmlspecialchars($project['price']) ?></div>
                        </div>
                        <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                                <span class="text-[10px] uppercase font-bold text-slate-400 block"><?= htmlspecialchars($project['type']) ?></span>
                                <h4 class="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-emerald-700 transition-colors"><?= htmlspecialchars($project['name']) ?></h4>
                            </div>
                            <div class="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                                <div><span class="text-[10px] text-slate-400 block font-medium">Diện tích</span><strong class="text-slate-800 font-extrabold"><?= htmlspecialchars($project['area']) ?></strong></div>
                                <div><span class="text-[10px] text-slate-400 block font-medium">Hướng đất</span><strong class="text-slate-800 font-extrabold"><?= htmlspecialchars($project['direction']) ?></strong></div>
                            </div>
                            <a href="#lead-form-section" class="block w-full py-2.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-extrabold rounded-sm shadow transition-colors uppercase tracking-wider text-center">Xem Sổ Đỏ & Mặt Bằng</a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- Core Values Section -->
        <section id="values-section" class="py-20 bg-[#064E3B] text-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
                    <span class="text-xs font-extrabold text-amber-300 uppercase tracking-widest block">★ BẢO CHỨNG SINH LỜI — AN TOÀN TUYỆT ĐỐI ★</span>
                    <h2 class="text-2xl sm:text-4xl font-black tracking-tight">6 GIÁ TRỊ CỐT LÕI TẠI PANNAMERA</h2>
                    <div class="w-16 h-1 bg-amber-400 mx-auto rounded-sm mt-2"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="p-6 rounded-sm bg-emerald-900/60 border border-emerald-700/80 hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
                        <div class="w-12 h-12 rounded-sm bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg">01</div>
                        <h4 class="text-lg font-black text-white">Pháp Lý Minh Bạch 100%</h4>
                        <p class="text-xs text-emerald-200/90 leading-relaxed">Sổ đỏ từng nền có sẵn thổ cư ODT, công chứng sang tên ngay trong ngày an toàn tuyệt đối.</p>
                    </div>
                    <div class="p-6 rounded-sm bg-emerald-900/60 border border-emerald-700/80 hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
                        <div class="w-12 h-12 rounded-sm bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg">02</div>
                        <h4 class="text-lg font-black text-white">Đón Đầu Hạ Tầng Cao Tốc</h4>
                        <p class="text-xs text-emerald-200/90 leading-relaxed">Cao tốc Tân Phú - Bảo Lộc khởi công giúp rút ngắn thời gian di chuyển từ Sài Gòn chỉ còn 1h45 phút.</p>
                    </div>
                    <div class="p-6 rounded-sm bg-emerald-900/60 border border-emerald-700/80 hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
                        <div class="w-12 h-12 rounded-sm bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg">03</div>
                        <h4 class="text-lg font-black text-white">Khí Hậu Đà Lạt Thứ Hai</h4>
                        <p class="text-xs text-emerald-200/90 leading-relaxed">Cao độ 900m quanh năm mát lạnh 18-22°C, bốn mùa hoa nở, không khí trong lành giàu ion âm.</p>
                    </div>
                    <div class="p-6 rounded-sm bg-emerald-900/60 border border-emerald-700/80 hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
                        <div class="w-12 h-12 rounded-sm bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg">04</div>
                        <h4 class="text-lg font-black text-white">Suất Đầu Tư Vừa Túi Tiền</h4>
                        <p class="text-xs text-emerald-200/90 leading-relaxed">Mức giá khởi điểm chỉ từ 890 Triệu/nền, tỷ suất sinh lời dự kiến 25-35%/năm khi cao tốc thông xe.</p>
                    </div>
                    <div class="p-6 rounded-sm bg-emerald-900/60 border border-emerald-700/80 hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
                        <div class="w-12 h-12 rounded-sm bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg">05</div>
                        <h4 class="text-lg font-black text-white">Quản Lý Homestay Vận Hành</h4>
                        <p class="text-xs text-emerald-200/90 leading-relaxed">Dịch vụ ủy thác quản lý nhà vườn cho thuê, chăm sóc cây cảnh, tạo dòng tiền thụ động đều đặn.</p>
                    </div>
                    <div class="p-6 rounded-sm bg-emerald-900/60 border border-emerald-700/80 hover:border-amber-400 transition-all space-y-3 hover:-translate-y-1">
                        <div class="w-12 h-12 rounded-sm bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg">06</div>
                        <h4 class="text-lg font-black text-white">Nghỉ Dưỡng Chữa Lành Wellness</h4>
                        <p class="text-xs text-emerald-200/90 leading-relaxed">Nơi dừng chân lý tưởng tái tạo năng lượng cho cả gia đình, sở hữu tài sản sinh thái truyền đời.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery & Video Section -->
        <section id="gallery-section" class="py-20 bg-white text-slate-900">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
                    <span class="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">★ HÌNH ẢNH THỰC TẾ & KHÔNG GIAN SỐNG ★</span>
                    <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">THƯ VIỆN HÌNH ẢNH & VIDEO FLYCAM 3D</h2>
                    <div class="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div onclick="openLightbox('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80')" class="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg cursor-pointer group bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80" alt="Toàn cảnh ngày" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div class="absolute inset-0 bg-slate-950/40 flex items-end p-4">
                            <span class="text-white text-xs font-black">Toàn Cảnh Bình Minh Săn Mây</span>
                        </div>
                    </div>
                    <div onclick="openLightbox('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80')" class="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg cursor-pointer group bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" alt="Lung linh về đêm" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div class="absolute inset-0 bg-slate-950/40 flex items-end p-4">
                            <span class="text-white text-xs font-black">Ánh Đèn Lung Linh Về Đêm</span>
                        </div>
                    </div>
                    <div onclick="openLightbox('https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80')" class="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg cursor-pointer group bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80" alt="Bungalow Mẫu" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div class="absolute inset-0 bg-slate-950/40 flex items-end p-4">
                            <span class="text-white text-xs font-black">Nhà Vườn Bungalow Gỗ 2 Tầng</span>
                        </div>
                    </div>
                </div>

                <div class="bg-[#022C22] rounded-md p-6 sm:p-10 border border-emerald-800 text-white space-y-6">
                    <div class="text-center max-w-xl mx-auto space-y-1">
                        <span class="text-xs font-bold text-amber-400 uppercase tracking-widest block">TRẢI NGHIỆM VIDEO FLYCAM</span>
                        <h3 class="text-xl sm:text-2xl font-black">TOÀN CẢNH LÀNG SINH THÁI PANNAMERA</h3>
                    </div>
                    <div onclick="openVideo()" class="relative aspect-video max-w-4xl mx-auto rounded-sm overflow-hidden shadow-2xl border-2 border-emerald-500/40 cursor-pointer group bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80" alt="Video Flycam Preview" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700" />
                        <div class="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/10 transition">
                            <div class="w-20 h-20 rounded-sm bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/80 group-hover:scale-110 transition">
                                <i data-lucide="play" class="w-10 h-10 fill-white translate-x-0.5"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Bungalow Model Section -->
        <section id="bungalow-model-section" class="py-20 bg-[#F0FDF4] text-slate-900">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
                    <span class="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">★ THIẾT KẾ NORDIC — GẮN LIỀN VỚI THIÊN NHIÊN ★</span>
                    <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">MẪU NHÀ VƯỜN BUNGALOW SINH THÁI</h2>
                    <div class="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2"></div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-6 sm:p-10 rounded-md border border-emerald-200 shadow-md">
                    <div class="lg:col-span-6 rounded-sm overflow-hidden aspect-[4/3] bg-slate-900">
                        <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80" alt="Bungalow Gỗ" class="w-full h-full object-cover" />
                    </div>

                    <div class="lg:col-span-6 space-y-4">
                        <span class="px-3.5 py-1 bg-amber-500 text-slate-950 text-xs font-black uppercase rounded-lg shadow inline-block">CHI PHÍ XÂY DỰNG TỐI ƯU</span>
                        <h3 class="text-2xl sm:text-3xl font-black text-slate-900">Nhà Vườn Nghỉ Dưỡng Gỗ Bắc Âu (80m² Sàn)</h3>
                        <p class="text-sm text-slate-600 leading-relaxed">
                            Thiết kế thông minh với hệ khung gỗ tự nhiên chống mối mọt và cản nhiệt tuyệt đối. Khung cửa kính lớn đón trọn cảnh sắc đồi chè và sương mây vào tận phòng ngủ.
                        </p>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                            <div class="p-3 bg-slate-50 rounded-sm border border-slate-200">
                                <span class="text-[10px] uppercase font-bold text-slate-400 block">Số Phòng Ngủ</span>
                                <strong class="text-sm font-black text-emerald-800">2 Phòng Master</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-sm border border-slate-200">
                                <span class="text-[10px] uppercase font-bold text-slate-400 block">Ban Công Săn Mây</span>
                                <strong class="text-sm font-black text-amber-600">Rộng 25 m²</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-sm border border-slate-200">
                                <span class="text-[10px] uppercase font-bold text-slate-400 block">Thời Gian Thi Công</span>
                                <strong class="text-sm font-black text-emerald-800">Chỉ 45 Ngày</strong>
                            </div>
                        </div>

                        <div class="pt-2">
                            <a href="#lead-form-section" class="inline-block px-8 py-3.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-extrabold rounded-sm shadow-lg uppercase tracking-wider transition-all">
                                Nhận File Báo Giá Hoàn Thiện Nhà Gỗ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- News & Mortgage Section -->
        <section id="news-mortgage-section" class="py-20 bg-white text-slate-900">
            <div class="max-w-7xl mx-auto px-4 space-y-16">
                <!-- Mortgage Calculator (Simplified JS inside form logic or static layout as requested) -->
                <div class="bg-[#F0FDF4] rounded-md p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-sm bg-emerald-100 text-[#047857] flex items-center justify-center font-black">
                            <i data-lucide="calculator" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h3 class="text-lg sm:text-xl font-black text-slate-900">BẢNG TÍNH LÃI SUẤT VAY NGÂN HÀNG THỜI GIAN THỰC</h3>
                            <span class="text-xs text-slate-500 font-medium">Tự động tính toán số tiền vay, gốc + lãi hàng tháng và tổng lãi phải trả</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-7 space-y-5">
                            <div>
                                <div class="flex justify-between text-xs font-bold mb-1.5">
                                    <span class="text-slate-600">Giá trị bất động sản:</span>
                                    <span class="text-[#047857] font-black" id="price-val">1.25 Tỷ VNĐ</span>
                                </div>
                                <input type="range" id="price-slider" min="0.8" max="5.0" step="0.05" value="1.25" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" oninput="calculateMortgage()" />
                            </div>
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-xs font-bold text-slate-600 mb-1.5">Tỷ lệ vay vốn</label>
                                    <select id="percent-select" class="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-emerald-500" onchange="calculateMortgage()">
                                        <option value="50">50% Giá trị BĐS</option>
                                        <option value="60" selected>60% Giá trị BĐS (Chuẩn)</option>
                                        <option value="70">70% Giá trị BĐS</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-600 mb-1.5">Thời hạn vay</label>
                                    <select id="years-select" class="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-emerald-500" onchange="calculateMortgage()">
                                        <option value="5">5 Năm</option>
                                        <option value="10">10 Năm</option>
                                        <option value="15" selected>15 Năm</option>
                                        <option value="20">20 Năm</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-slate-600 mb-1.5">Lãi suất (%/Năm)</label>
                                    <input type="number" id="rate-input" step="0.1" value="7.2" class="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 text-xs font-extrabold focus:outline-none focus:border-emerald-500" oninput="calculateMortgage()" />
                                </div>
                            </div>
                        </div>
                        <div class="lg:col-span-5 bg-[#064E3B] text-white p-6 rounded-sm space-y-4 shadow-xl border border-emerald-800">
                            <div class="border-b border-emerald-800 pb-3">
                                <span class="text-[10px] uppercase font-bold text-emerald-300 block">Số tiền vay ngân hàng:</span>
                                <strong class="text-xl font-black text-amber-300" id="calc-loan">0.75 Tỷ VNĐ</strong>
                            </div>
                            <div class="grid grid-cols-2 gap-3 border-b border-emerald-800 pb-3">
                                <div>
                                    <span class="text-[10px] uppercase font-bold text-emerald-300 block">Gốc + Lãi tháng đầu:</span>
                                    <strong class="text-base font-black text-lime-300" id="calc-first">8.7 Tr/tháng</strong>
                                </div>
                                <div>
                                    <span class="text-[10px] uppercase font-bold text-emerald-300 block">Gốc cố định:</span>
                                    <strong class="text-base font-black text-slate-200" id="calc-principal">4.2 Tr/tháng</strong>
                                </div>
                            </div>
                            <div>
                                <span class="text-[10px] uppercase font-bold text-emerald-300 block">Ước tính tổng lãi phải trả:</span>
                                <strong class="text-sm font-black text-slate-300" id="calc-total-interest">0.41 Tỷ VNĐ</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- News Grid -->
                <div>
                    <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
                        <span class="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">★ CẬP NHẬT TIẾN ĐỘ & CẨM NANG KHÁM PHÁ ★</span>
                        <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">TIN TỨC DU LỊCH & THỊ TRƯỜNG BẢO LỘC</h2>
                        <div class="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <article class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group">
                            <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=800&q=80" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News" />
                                <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">Hạ Tầng Giao Thông</div>
                            </div>
                            <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                                <div class="space-y-2">
                                    <div class="flex items-center gap-3 text-[11px] text-slate-400 font-bold">
                                        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 28/08/2026</span>
                                        <span>•</span>
                                        <span class="flex items-center gap-1"><i data-lucide="eye" class="w-3 h-3"></i> 5240 lượt xem</span>
                                    </div>
                                    <h4 class="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">Chính Thức Khởi Công Tuyến Cao Tốc Dầu Giây — Tân Phú — Bảo Lộc 2026</h4>
                                    <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">Tuyến cao tốc huyết mạch rút ngắn thời gian di chuyển từ TP.HCM lên Bảo Lộc chỉ còn 1 giờ 45 phút...</p>
                                </div>
                                <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#047857]">
                                    <span>Đọc tiếp bài viết</span>
                                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                                </div>
                            </div>
                        </article>
                        
                        <article class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group">
                            <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News" />
                                <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">Thị Trường Nghỉ Dưỡng</div>
                            </div>
                            <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                                <div class="space-y-2">
                                    <div class="flex items-center gap-3 text-[11px] text-slate-400 font-bold">
                                        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 20/08/2026</span>
                                        <span>•</span>
                                        <span class="flex items-center gap-1"><i data-lucide="eye" class="w-3 h-3"></i> 6810 lượt xem</span>
                                    </div>
                                    <h4 class="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">Xu Hướng Sở Hữu "Ngôi Nhà Thứ Hai" Đồi Chè Chữa Lành Tại Bảo Lộc</h4>
                                    <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">Khí hậu mát mẻ 18-22 độ C quanh năm cùng thiên nhiên nguyên sơ khiến đất vườn sinh thái Bảo Lộc trở thành món tài sản vô giá...</p>
                                </div>
                                <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#047857]">
                                    <span>Đọc tiếp bài viết</span>
                                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                                </div>
                            </div>
                        </article>

                        <article class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group">
                            <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="News" />
                                <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow">Cẩm Nang Khám Phá</div>
                            </div>
                            <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                                <div class="space-y-2">
                                    <div class="flex items-center gap-3 text-[11px] text-slate-400 font-bold">
                                        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> 14/08/2026</span>
                                        <span>•</span>
                                        <span class="flex items-center gap-1"><i data-lucide="eye" class="w-3 h-3"></i> 4320 lượt xem</span>
                                    </div>
                                    <h4 class="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">Top 5 Điểm Săn Mây Và Khám Phá Thiên Nhiên Đẹp Như Tranh Tại Bảo Lộc</h4>
                                    <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">Hồ Tảo Hồng B&L, Thác Dambri hùng vĩ, Đồi chè Tâm Châu bát ngát và đỉnh săn mây Pannamera là những tọa độ không thể bỏ lỡ...</p>
                                </div>
                                <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#047857]">
                                    <span>Đọc tiếp bài viết</span>
                                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Consignment Section (Ký Gửi) -->
        <section id="consign-section" class="py-20 bg-[#F0FDF4] text-slate-900">
            <div class="max-w-3xl mx-auto px-4 space-y-8">
                <div class="text-center space-y-2">
                    <span class="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">★ KÝ GỬI MUA BÁN ĐẤT VƯỜN & BIỆT THỰ BẢO LỘC ★</span>
                    <h2 class="text-2xl sm:text-4xl font-black text-slate-900">DỊCH VỤ MÔI GIỚI & THẨM ĐỊNH GIÁ BĐS TÂY NGUYÊN</h2>
                    <p class="text-xs sm:text-sm text-slate-600">Hỗ trợ đo đạc địa chính, ra sổ hồng nhanh chóng và tiếp cận hơn 20.000 nhà đầu tư toàn quốc.</p>
                </div>

                <form action="api/contact.php" method="POST" onsubmit="showToast('Đã tiếp nhận hồ sơ ký gửi. Chuyên viên sẽ liên hệ sớm nhất!'); event.preventDefault();" class="bg-white rounded-md p-6 sm:p-10 border border-emerald-200 shadow-sm space-y-4">
                    <input type="hidden" name="formType" value="consign">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Họ & Tên Gia Chủ (*)</label>
                            <input type="text" name="name" required placeholder="Ví dụ: Lê Hoàng Nam" class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none focus:border-emerald-500" />
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Số Điện Thoại / Zalo (*)</label>
                            <input type="tel" name="phone" required placeholder="Ví dụ: <?= htmlspecialchars($company["phone"]) ?>" class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs font-bold text-emerald-700 focus:outline-none focus:border-emerald-500" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Loại Bất Động Sản</label>
                            <select name="type" class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs font-bold focus:outline-none focus:border-emerald-500">
                                <option value="Đất vườn sinh thái">Đất vườn sinh thái</option>
                                <option value="Bungalow nghỉ dưỡng">Bungalow nghỉ dưỡng</option>
                                <option value="Biệt thự đồi">Biệt thự đồi</option>
                                <option value="Đất farmstay 1000m²">Đất farmstay 1000m²</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Mức Giá Kỳ Vọng</label>
                            <input type="text" name="price" placeholder="Ví dụ: 1.2 Tỷ hoặc 800 Triệu" class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none focus:border-emerald-500" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Địa Chỉ Thửa Đất (*)</label>
                        <input type="text" name="address" required placeholder="Ví dụ: Lô B2-15 Làng Sinh Thái Pannamera, Xã Lộc Tân..." class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none focus:border-emerald-500" />
                    </div>
                    <div>
                        <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Ghi Chú Thêm</label>
                        <textarea name="note" rows="3" placeholder="Tình trạng thổ cư, đường xá, cây cối trên đất..." class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none focus:border-emerald-500"></textarea>
                    </div>
                    <button type="submit" class="w-full py-4 bg-[#047857] hover:bg-[#065F46] text-white text-xs sm:text-sm font-black rounded-sm shadow-lg uppercase tracking-wider transition-all hover:scale-105">
                        Xác Nhận Ký Gửi Nhà Đất Ngay
                    </button>
                </form>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="space-y-4">
                <h3 class="text-white text-lg font-black flex items-center gap-2"><i data-lucide="mountain" class="w-6 h-6 text-[#047857]"></i> <?= htmlspecialchars($company["name"]) ?></h3>
                <p class="text-sm leading-relaxed">Làng Sinh Thái Nghỉ Dưỡng Bảo Lộc - Nơi giá trị thiên nhiên kết hợp cùng tiềm năng sinh lời vượt trội, mang lại chốn an cư và nghỉ dưỡng tuyệt vời.</p>
            </div>
            <div class="space-y-4">
                <h4 class="text-white font-bold uppercase tracking-wider text-sm">Liên Hệ Chăm Sóc</h4>
                <ul class="text-sm space-y-3">
                    <li class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-amber-500"></i> Hotline: <strong class="text-amber-500"><?= htmlspecialchars($company["phone"]) ?></strong></li>
                    <li class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-slate-400"></i> Email: <?= htmlspecialchars($company["email"]) ?></li>
                    <li class="flex items-start gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-slate-400 shrink-0"></i> Địa chỉ: <?= htmlspecialchars($company["address"]) ?></li>
                </ul>
            </div>
            <div class="space-y-4">
                <h4 class="text-white font-bold uppercase tracking-wider text-sm">Liên Kết Nhanh</h4>
                <ul class="text-sm space-y-2">
                    <li><a href="#hero" class="hover:text-amber-400 transition-colors">Về Chúng Tôi</a></li>
                    <li><a href="#masterplan-section" class="hover:text-amber-400 transition-colors">Sản Phẩm Đất Vườn</a></li>
                    <li><a href="#amenities-section" class="hover:text-amber-400 transition-colors">Tiện Ích Nội Khu</a></li>
                    <li><a href="#news-mortgage-section" class="hover:text-amber-400 transition-colors">Tin Tức Khám Phá</a></li>
                </ul>
            </div>
            <div class="space-y-4">
                <h4 class="text-white font-bold uppercase tracking-wider text-sm">Đăng Ký Nhận Bảng Giá</h4>
                <form action="api/contact.php" method="POST" onsubmit="showToast('Đăng ký nhận tin thành công!'); event.preventDefault();" class="flex flex-col gap-3">
                    <input type="email" name="email" placeholder="Email của bạn..." required class="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-sm text-sm focus:outline-none focus:border-[#047857] text-white">
                    <button type="submit" class="px-4 py-2.5 bg-[#047857] hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-bold rounded-sm transition-colors flex justify-center items-center gap-2">
                        <i data-lucide="send" class="w-4 h-4"></i> Đăng Ký Ngay
                    </button>
                </form>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2026 <?= htmlspecialchars($company["name"]) ?>. All rights reserved. Thiết kế và phát triển với ♥
        </div>
    </footer>

    <!-- Floating CTA Buttons -->
    <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a href="https://zalo.me/<?= htmlspecialchars($company["zalo"]) ?>" target="_blank" class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform hover:shadow-blue-500/50">
            <strong class="text-xl font-black">Z</strong>
        </a>
        <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform hover:shadow-green-500/50">
            <i data-lucide="phone" class="w-5 h-5 fill-current"></i>
        </a>
    </div>

    <!-- Javascript Handlers -->
    <script>
        // Init Lucide Icons
        lucide.createIcons();
        
        // Toast Notification
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
        
        // Modals
        function openVideo() { 
            const m = document.getElementById('video-modal');
            m.classList.remove('hidden'); 
            m.classList.add('flex');
            m.querySelector('iframe').src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
        }
        function closeVideo() { 
            const m = document.getElementById('video-modal');
            m.classList.add('hidden'); 
            m.classList.remove('flex');
            m.querySelector('iframe').src = "";
        }
        
        function openLightbox(src) { 
            document.getElementById('lightbox-img').src = src; 
            const m = document.getElementById('lightbox-modal');
            m.classList.remove('hidden'); 
            m.classList.add('flex'); 
        }
        function closeLightbox() { 
            const m = document.getElementById('lightbox-modal');
            m.classList.add('hidden'); 
            m.classList.remove('flex'); 
        }

        // Mortgage Calculator Logic
        function calculateMortgage() {
            const price = parseFloat(document.getElementById('price-slider').value) || 1.25;
            document.getElementById('price-val').innerText = price.toFixed(2) + " Tỷ VNĐ";
            
            const percent = parseInt(document.getElementById('percent-select').value) || 60;
            const years = parseInt(document.getElementById('years-select').value) || 15;
            const rate = parseFloat(document.getElementById('rate-input').value) || 7.2;

            const loanAmountBillions = (price * percent) / 100;
            const loanAmountVND = loanAmountBillions * 1000000000;
            const totalMonths = years * 12;
            const monthlyRate = (rate / 100) / 12;
            
            const monthlyPrincipal = loanAmountVND / totalMonths;
            const firstMonthInterest = loanAmountVND * monthlyRate;
            const firstMonthTotal = monthlyPrincipal + firstMonthInterest;
            const totalInterest = ((loanAmountVND * monthlyRate * (totalMonths + 1)) / 2) / 1000000000;

            document.getElementById('calc-loan').innerText = loanAmountBillions.toFixed(2) + " Tỷ VNĐ";
            document.getElementById('calc-first').innerText = (firstMonthTotal / 1000000).toFixed(1) + " Tr/tháng";
            document.getElementById('calc-principal').innerText = (monthlyPrincipal / 1000000).toFixed(1) + " Tr/tháng";
            document.getElementById('calc-total-interest').innerText = totalInterest.toFixed(2) + " Tỷ VNĐ";
        }
        
        // Init calc
        calculateMortgage();
    </script>
</body>
</html>