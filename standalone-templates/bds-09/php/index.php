<?php
require_once 'config/db.php';

$company = [
    'name' => 'AN VIÊN GROUP',
    'phone' => '0919 006 030',
    'email' => 'contact@anvien-residence.vn',
    'address' => 'Bán Đảo An Viên, TP. Nha Trang',
    'slogan' => 'Biểu Tượng Nha Trang Hiện Đại',
    'zalo' => 'https://zalo.me/0919006030'
];

$projects_data = [];

if (isset($pdo) && $pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company = array_merge($company, $row);
        }
        
        $stmt_projects = $pdo->query("SELECT * FROM projects");
        $projects_data = $stmt_projects->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        // Fallback
    }
}

// Prepare project data for JS
$js_units = [];
if (!empty($projects_data)) {
    foreach ($projects_data as $p) {
        $js_units[] = [
            'id' => $p['project_id'],
            'type' => $p['type'],
            'category' => $p['category'],
            'name' => $p['name'],
            'area' => $p['area'],
            'price' => $p['price'],
            'view' => $p['view'],
            'handover' => $p['handover'],
            'image' => $p['image'],
            'specs' => json_decode($p['specs'], true) ?: [],
            'description' => $p['description'],
            'highlights' => json_decode($p['highlights'], true) ?: []
        ];
    }
} else {
    // Fallback if db empty or error
    $js_units = [
        [
            'id' => 'studio-ocean', 'type' => 'Studio Nghỉ Dưỡng Hướng Biển', 'category' => 'studio',
            'name' => 'Studio Suite Panorama #ST-1808', 'area' => '45.5 m²', 'price' => '2.35 Tỷ VNĐ',
            'view' => 'Trực diện Vịnh Nha Trang & Đảo Hòn Tre', 'handover' => 'Full nội thất tiêu chuẩn khách sạn 5 sao',
            'image' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=80',
            'specs' => ['Ban công kính Low-E tràn viền', 'Bồn tắm nằm hướng biển', 'Hệ thống Smart Home điều khiển giọng nói'],
            'description' => 'Căn hộ Studio thiết kế mở tối ưu ánh sáng tự nhiên và gió biển, thích hợp cho khách du lịch lưu trú cao cấp hoặc đầu tư khai thác dòng tiền Airbnb/Booking.',
            'highlights' => ['Lợi nhuận cho thuê ước tính: 15-22 Triệu/tháng', 'Cam kết lợi nhuận tối thiểu 10%/năm trong 3 năm đầu']
        ],
        [
            'id' => '1pn-deluxe', 'type' => 'Căn Hộ 1 Phòng Ngủ Deluxe', 'category' => '1pn',
            'name' => 'Executive 1BR Oceanview #EX-2205', 'area' => '58.2 m²', 'price' => '3.10 Tỷ VNĐ',
            'view' => 'Vịnh Biển & Bến Du Thuyền Quốc Tế Marina', 'handover' => 'Full nội thất nhập khẩu Châu Âu',
            'image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1000&q=80',
            'specs' => ['Phòng khách và phòng ngủ riêng biệt', 'Bếp âm đảo hiện đại', 'Cửa khóa từ 4 chức năng cao cấp'],
            'description' => 'Không gian sống lý tưởng dành cho các cặp đôi hoặc chuyên gia nước ngoài làm việc tại Nha Trang.',
            'highlights' => ['Thanh toán đợt 1 chỉ 10% (310 Triệu)', 'Ngân hàng BIDV hỗ trợ vay 70%']
        ],
        [
            'id' => '2pn-signature', 'type' => 'Căn Hộ 2 Phòng Ngủ Signature', 'category' => '2pn',
            'name' => 'Signature 2BR Grand Corner #SG-2802', 'area' => '78.6 m²', 'price' => '4.45 Tỷ VNĐ',
            'view' => 'Căn góc 2 mặt tiền biển & Cáp treo Vinpearl', 'handover' => 'Full nội thất cao cấp dát vàng tinh tế',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
            'specs' => ['2 Phòng ngủ Master view biển', 'Phòng khách thông tầng rộng 32m²', 'Logia giặt phơi riêng biệt'],
            'description' => 'Dòng sản phẩm căn góc Signature sở hữu tầm nhìn panorama 270 độ bao trọn vịnh Nha Trang.',
            'highlights' => ['Tặng thẻ VIP du thuyền nghỉ dưỡng', 'Chiết khấu ngay 9.5%']
        ],
        [
            'id' => '3pn-royal', 'type' => 'Căn Hộ 3 Phòng Ngủ Royal Suite', 'category' => '3pn',
            'name' => 'Royal Ocean Suite #RY-3501', 'area' => '115.8 m²', 'price' => '6.85 Tỷ VNĐ',
            'view' => 'Trực diện Vịnh Nha Trang & Đồi Cảnh Quan', 'handover' => 'Full nội thất siêu sang tiêu chuẩn Tổng thống',
            'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80',
            'specs' => ['3 Phòng ngủ khép kín', 'Phòng ăn 8 người phong cách quý tộc', 'Hệ thống máy lạnh âm trần'],
            'description' => 'Tuyệt tác không gian sống dành cho đại gia đình thượng lưu.',
            'highlights' => ['Đặc quyền quản gia riêng 24/7', 'Miễn phí phí quản lý dịch vụ 5 sao trong 5 năm']
        ],
        [
            'id' => 'skyvilla-penthouse', 'type' => 'Sky Villa Penthouse Hoàng Gia', 'category' => 'skyvilla',
            'name' => 'Imperial Penthouse #PH-3901', 'area' => '268.0 m²', 'price' => '18.50 Tỷ VNĐ',
            'view' => 'Toàn cảnh 360 độ Vịnh Biển & Thành Phố', 'handover' => 'Bàn giao thô hoặc thiết kế đo ni đóng giày',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
            'specs' => ['Hồ bơi sục Jacuzzi vô cực trên không', 'Sân vườn riêng biệt rộng 60m²', 'Thang máy riêng'],
            'description' => 'Dinh thự trên không độc bản duy nhất tại đỉnh tháp An Viên.',
            'highlights' => ['Tặng chỗ neo đậu du thuyền riêng trọn đời', 'Hưởng đặc quyền du lịch trực thăng']
        ],
        [
            'id' => 'dualkey-invest', 'type' => 'Căn Hộ Kép Dual Key Đa Năng', 'category' => 'dualkey',
            'name' => 'Dual Key Harmony #DK-1604', 'area' => '92.5 m²', 'price' => '5.20 Tỷ VNĐ',
            'view' => 'Biển Nha Trang & Hồ Bơi Vô Cực Khối Đế', 'handover' => 'Full nội thất hoàn thiện 2 chìa khóa độc lập',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80',
            'specs' => ['1 Căn hộ 1PN + 1 Studio khép kín có lối đi riêng', '2 Không gian bếp và WC tách biệt hoàn toàn'],
            'description' => 'Giải pháp hoàn hảo "Vừa ở vừa cho thuê".',
            'highlights' => ['Tối ưu hóa công suất khai thác lưu trú 200%', 'Lợi nhuận kép vừa tăng giá trị tài sản']
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>An Viên Residence - Biểu Tượng Nha Trang Hiện Đại</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    },
                    colors: {
                        amber: {
                            50: '#fffbeb',
                            200: '#fde68a',
                            300: '#fcd34d',
                            400: '#fbbf24',
                            500: '#f59e0b',
                            600: '#d97706',
                            900: '#78350f',
                        }
                    },
                    animation: {
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }
                }
            }
        }
    </script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">
    <style>
        .MAX_W { max-w-7xl }
        body { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .bg-radial-gradient { background: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%); }
    </style>
</head>
<body class="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">

    <!-- Toast Popup -->
    <div id="toastMessage" class="hidden fixed bottom-24 right-6 z-50 bg-[#0B132B] text-[#FDE047] border border-amber-400 px-5 py-3 rounded-sm shadow-2xl font-bold text-xs items-center gap-2 animate-bounce">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-amber-300"></i> <span id="toastText"></span>
    </div>

    <!-- Lightbox Preview -->
    <div id="lightbox" class="hidden fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer" onclick="closeLightbox()">
        <img id="lightboxImg" src="" alt="Preview" class="max-w-4xl max-h-[85vh] object-contain rounded-sm" />
    </div>

    <!-- LEAD MODAL POPUP -->
    <div id="leadModal" class="hidden fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-md p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 relative border border-amber-300 animate-[zoom-in_0.2s_ease-out]">
            <button onclick="closeLeadModal()" class="absolute top-4 right-4 p-2 rounded-sm hover:bg-slate-100 text-slate-500">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
            <div class="text-center space-y-1">
                <span class="text-xs font-black text-[#B45309] uppercase tracking-wider">ĐĂNG KÝ NHẬN BẢNG GIÁ VIP</span>
                <h3 class="text-lg sm:text-xl font-serif font-black text-slate-900">An Viên Residence Nha Trang</h3>
                <p class="text-xs text-slate-500">Chuyên viên tư vấn senior sẽ gửi bảng tính chiết khấu qua Zalo trong 3 phút.</p>
            </div>
            <form onsubmit="handleLeadSubmit(event)" class="space-y-3 text-xs" action="api/contact.php" method="POST">
                <input type="text" name="name" placeholder="Họ và tên quý khách..." required class="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none" />
                <input type="tel" name="phone" placeholder="Số điện thoại / Zalo (*)..." required class="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none font-bold text-[#B45309]" />
                <select name="unitType" class="w-full p-3 rounded-sm border bg-slate-50 focus:bg-white focus:outline-none font-medium">
                    <option value="Studio Suite Panorama #ST-1808">Studio Nghỉ Dưỡng Hướng Biển (2.35 Tỷ VNĐ)</option>
                    <option value="Executive 1BR Oceanview #EX-2205">Căn Hộ 1 Phòng Ngủ Deluxe (3.10 Tỷ VNĐ)</option>
                    <option value="Signature 2BR Grand Corner #SG-2802" selected>Căn Hộ 2 Phòng Ngủ Signature (4.45 Tỷ VNĐ)</option>
                    <option value="Royal Ocean Suite #RY-3501">Căn Hộ 3 Phòng Ngủ Royal Suite (6.85 Tỷ VNĐ)</option>
                    <option value="Imperial Penthouse #PH-3901 (Đỉnh Tháp)">Sky Villa Penthouse Hoàng Gia (18.50 Tỷ VNĐ)</option>
                    <option value="Dual Key Harmony #DK-1604">Căn Hộ Kép Dual Key Đa Năng (5.20 Tỷ VNĐ)</option>
                </select>
                <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white font-black rounded-sm uppercase tracking-wider shadow-lg hover:scale-[1.02] cursor-pointer">
                    Gửi Đăng Ký Ngay
                </button>
            </form>
        </div>
    </div>

    <!-- MAIN APP WRAPPER -->
    <div id="main-view">
        <header class="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md text-white border-b border-amber-500/30 shadow-2xl transition-all">
            <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-4">
                
                <!-- Brand Logo & Luxury Crest -->
                <a href="#" class="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
                    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-[#D4AF37] via-[#C5A059] to-[#92400E] p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                        <div class="w-full h-full bg-[#0B132B] rounded-[6px] sm:rounded-[10px] flex items-center justify-center">
                            <i data-lucide="anchor" class="w-[18px] h-[18px] text-[#D4AF37] animate-pulse"></i>
                        </div>
                    </div>
                    <div class="min-w-0 truncate">
                        <div class="flex items-center gap-1.5 truncate">
                            <span class="text-base sm:text-xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FDE047] via-[#D4AF37] to-[#F59E0B] truncate">
                                AN VIÊN
                            </span>
                            <span class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-300">
                                RESIDENCE
                            </span>
                        </div>
                        <span class="text-[7.5px] sm:text-[9px] tracking-widest text-[#D4AF37] block uppercase font-extrabold truncate">
                            <?= htmlspecialchars(mb_strtoupper($company["slogan"], "UTF-8")) ?>
                        </span>
                    </div>
                </a>

                <!-- Navigation Menu -->
                <nav class="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-[11px] font-bold uppercase tracking-wider text-slate-300 whitespace-nowrap">
                    <a href="#" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Trang Chủ</a>
                    <a href="#tong-quan" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Tổng Quan</a>
                    <a href="#vi-tri" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Vị Trí</a>
                    <a href="#mat-bang" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Mặt Bằng</a>
                    <a href="#san-pham" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Sản Phẩm</a>
                    <a href="#tien-ich" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Tiện Ích</a>
                    <a href="#ly-do-dau-tu" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Lý Do Đầu Tư</a>
                    <a href="#thu-vien" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Thư Viện</a>
                    <a href="#dang-ky" class="nav-link whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-all hover:text-[#FDE047]">Liên Hệ</a>
                </nav>

                <!-- CTA & Mobile Hamburger -->
                <div class="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
                    <a href="tel:<?= htmlspecialchars(str_replace(" ", "", $company["phone"])) ?>" class="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-amber-500/10 border border-amber-500/40 text-[#FDE047] text-xs font-black whitespace-nowrap shrink-0 hover:bg-amber-500/20 transition">
                        <i data-lucide="phone" class="w-[13px] h-[13px] text-amber-400 animate-pulse shrink-0"></i>
                        <span><?= htmlspecialchars($company["phone"]) ?></span>
                    </a>
                    <button onclick="openLeadModal()" class="hidden md:inline-block px-4 py-2 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D97706] hover:from-[#F59E0B] hover:to-[#B45309] text-slate-950 text-xs font-black rounded-sm shadow-lg shadow-amber-500/20 transition uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 active:scale-95 cursor-pointer">
                        Tải Bảng Giá VIP
                    </button>
                    <button onclick="toggleMobileMenu()" class="p-1.5 sm:p-2 rounded-sm bg-slate-800 text-white xl:hidden hover:bg-slate-700 shrink-0 flex items-center justify-center">
                        <i data-lucide="menu" id="menuIcon" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>

            <!-- Mobile Drawer Menu -->
            <div id="mobileMenu" class="hidden xl:hidden bg-[#0B132B] border-b border-amber-500/30 px-6 py-5 shadow-2xl">
                <div class="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
                    <a href="#" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Trang Chủ</a>
                    <a href="#tong-quan" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Tổng Quan</a>
                    <a href="#vi-tri" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Vị Trí</a>
                    <a href="#mat-bang" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Mặt Bằng</a>
                    <a href="#san-pham" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Sản Phẩm</a>
                    <a href="#tien-ich" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Tiện Ích</a>
                    <a href="#ly-do-dau-tu" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Lý Do Đầu Tư</a>
                    <a href="#thu-vien" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Thư Viện</a>
                    <a href="#dang-ky" onclick="toggleMobileMenu()" class="p-2.5 rounded-lg text-left bg-slate-900 hover:bg-amber-500/20 hover:text-amber-400">Liên Hệ</a>
                </div>
            </div>
        </header>

        <main>
            <!-- HERO SECTION -->
            <section class="relative min-h-[500px] sm:min-h-[620px] lg:min-h-[720px] flex items-center justify-center text-white overflow-hidden bg-[#070D1E]">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80" alt="Nha Trang Bay Aerial" class="absolute inset-0 w-full h-full object-cover object-center scale-105 animate-pulse-slow" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80'" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#070D1E]/40 to-transparent"></div>
                <div class="absolute inset-0 bg-radial-gradient from-transparent to-black/60 pointer-events-none"></div>

                <div class="relative z-20 max-w-7xl mx-auto px-4 py-16 text-center space-y-6 max-w-4xl">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-slate-950/80 text-[#FDE047] text-xs font-bold uppercase tracking-widest border border-amber-500/40 shadow-xl backdrop-blur-md">
                        <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400"></i> DỰ ÁN CĂN HỘ CAO CẤP NHA TRANG <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-400"></i>
                    </div>

                    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white uppercase tracking-wider leading-[1.15] drop-shadow-2xl">
                        BIỂU TƯỢNG CỦA<br />
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFBEB] via-[#FDE047] to-[#F59E0B]">
                            NHA TRANG HIỆN ĐẠI
                        </span>
                    </h1>

                    <p class="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                        Tổ hợp căn hộ nghỉ dưỡng và bến du thuyền 5 sao đẳng cấp quốc tế tọa lạc tại bán đảo An Viên, sở hữu 100% tầm nhìn trực diện vịnh biển đẹp nhất hành tinh.
                    </p>

                    <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
                        <a href="#mat-bang" class="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D97706] hover:from-[#F59E0B] hover:to-[#B45309] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-2xl transition hover:scale-105 cursor-pointer flex items-center gap-2">
                            Khám Phá Dự Án <i data-lucide="chevron-right" class="w-4 h-4"></i>
                        </a>
                        <button onclick="openLeadModal()" class="px-8 py-3.5 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-amber-400/50 text-[#FDE047] font-black text-xs sm:text-sm uppercase tracking-wider rounded-sm shadow-xl transition hover:scale-105 cursor-pointer flex items-center gap-2">
                            <i data-lucide="download" class="w-4 h-4"></i> Nhận Trọn Bộ Bảng Giá
                        </button>
                    </div>
                </div>
            </section>

            <!-- TỔNG QUAN -->
            <section id="tong-quan" class="py-16 bg-[#FDFBF7] text-slate-800 border-b border-amber-200/60">
                <div class="max-w-7xl mx-auto px-4 space-y-10">
                    <div class="text-center max-w-2xl mx-auto space-y-2">
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">TỔNG QUAN DỰ ÁN</h2>
                        <div class="flex items-center justify-center gap-3">
                            <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <i data-lucide="gem" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                            <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            An Viên Yacht & Sky Residence Nha Trang là kiệt tác tháp đôi biểu tượng 39 tầng tọa lạc trên bán đảo sinh thái triệu đô, mang lại chuẩn mực sống xa hoa bậc nhất miền Trung.
                        </p>
                    </div>

                    <div class="relative rounded-md overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30 group">
                        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80" alt="An Vien Twin Towers Rendering" class="w-full h-[360px] sm:h-[480px] lg:h-[540px] object-cover group-hover:scale-105 transition-transform duration-700" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80'" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
                            <div class="text-white space-y-1">
                                <span class="text-xs font-bold uppercase tracking-widest text-amber-300">Phối Cảnh Tổng Thể 3D</span>
                                <h3 class="text-lg sm:text-2xl font-serif font-black">Tổ hợp tháp đôi căn hộ nghỉ dưỡng và bến du thuyền quốc tế An Viên</h3>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div class="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tên Dự Án</span><p class="text-xs sm:text-sm font-black text-slate-900">An Viên Residence</p></div>
                        <div class="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Chủ Đầu Tư</span><p class="text-xs sm:text-sm font-black text-[#B45309]"><?= htmlspecialchars($company["name"]) ?></p></div>
                        <div class="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Vị Trí</span><p class="text-xs sm:text-sm font-black text-slate-900">Bán Đảo An Viên, Nha Trang</p></div>
                        <div class="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quy Mô</span><p class="text-xs sm:text-sm font-black text-slate-900">2 Tháp 39 Tầng</p></div>
                        <div class="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sản Phẩm</span><p class="text-xs sm:text-sm font-black text-slate-900">1.200 Căn 5 Sao</p></div>
                        <div class="bg-white p-4 rounded-sm border border-amber-200/80 shadow-sm text-center space-y-1"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pháp Lý</span><p class="text-xs sm:text-sm font-black text-emerald-700">Sổ Hồng Lâu Dài</p></div>
                    </div>
                </div>
            </section>

            <!-- VỊ TRÍ -->
            <section id="vi-tri" class="py-16 bg-[#0B132B] text-white">
                <div class="max-w-7xl mx-auto px-4 space-y-10">
                    <div class="text-center max-w-2xl mx-auto space-y-2">
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] uppercase tracking-wider">VỊ TRÍ KIM CƯƠNG & LIÊN KẾT VÀNG</h2>
                        <div class="flex items-center justify-center gap-3">
                            <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <i data-lucide="compass" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                            <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-300">Tọa lạc tại vị trí độc tôn của bán đảo An Viên, liền kề tuyến cáp treo vượt biển Vinpearl và trục đại lộ ven biển Trần Phú hoa lệ.</p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="bg-slate-900/90 p-5 rounded-sm border border-amber-500/30 space-y-2 shadow-lg hover:border-amber-400 transition">
                                <span class="text-xs font-black text-[#FDE047]">01. CẢNG CÁP TREO VINPEARL</span>
                                <p class="text-xs text-slate-300 leading-relaxed break-words">Chỉ 2 phút di chuyển sang quần thể vui chơi giải trí hàng đầu Đông Nam Á VinWonders & Sân Golf 18 hố.</p>
                            </div>
                            <div class="bg-slate-900/90 p-5 rounded-sm border border-amber-500/30 space-y-2 shadow-lg hover:border-amber-400 transition">
                                <span class="text-xs font-black text-[#FDE047]">02. TRUNG TÂM NHA TRANG</span>
                                <p class="text-xs text-slate-300 leading-relaxed break-words">5 phút lái xe dọc cung đường Trần Phú đến Quảng trường 2/4, Tháp Trầm Hương và các TTTM sầm uất.</p>
                            </div>
                            <div class="bg-slate-900/90 p-5 rounded-sm border border-amber-500/30 space-y-2 shadow-lg hover:border-amber-400 transition">
                                <span class="text-xs font-black text-[#FDE047]">03. SÂN BAY QUỐC TẾ CAM RANH</span>
                                <p class="text-xs text-slate-300 leading-relaxed break-words">30 phút di chuyển êm ái trên đại lộ ven biển Nguyễn Tất Thành kết nối thẳng tới sân bay quốc tế.</p>
                            </div>
                            <div class="bg-slate-900/90 p-5 rounded-sm border border-amber-500/30 space-y-2 shadow-lg hover:border-amber-400 transition">
                                <span class="text-xs font-black text-[#FDE047]">04. BẾN DU THUYỀN AN VIÊN</span>
                                <p class="text-xs text-slate-300 leading-relaxed break-words">Liền kề ngay dưới chân tòa tháp, thuận tiện đón tiếp du thuyền quốc tế và trải nghiệm lặn biển ngắm san hô.</p>
                            </div>
                        </div>
                        <div class="lg:col-span-6 rounded-md overflow-hidden shadow-2xl border-2 border-amber-500/40 bg-slate-950 p-2">
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Nha Trang Location Map" class="w-full h-80 sm:h-96 object-cover rounded-sm" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- MẶT BẰNG -->
            <section id="mat-bang" class="py-16 bg-white text-slate-800 border-b border-slate-200">
                <div class="max-w-7xl mx-auto px-4 space-y-8">
                    <div class="text-center max-w-2xl mx-auto space-y-2">
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">MẶT BẰNG TỔNG THỂ & THIẾT KẾ</h2>
                        <div class="flex items-center justify-center gap-3">
                            <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <i data-lucide="layers" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                            <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-600">Quy hoạch tổng thể đồng bộ thông minh với 2 khối tháp đón gió vịnh biển, kết nối bằng cầu bộ hành kính và hồ bơi vô cực trên không.</p>
                    </div>

                    <div class="rounded-md overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 relative">
                        <img src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1600&q=80" alt="Masterplan CAD Topdown" class="w-full h-[320px] sm:h-[460px] lg:h-[520px] object-cover" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80'" />
                        <div class="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-sm text-white text-xs font-bold border border-amber-400/40">
                            📐 Sơ đồ phân khu 1/500 đã được phê duyệt
                        </div>
                    </div>
                </div>
            </section>

            <!-- SẢN PHẨM -->
            <section id="san-pham" class="py-16 bg-[#FDFBF7] text-slate-800">
                <div class="max-w-7xl mx-auto px-4 space-y-10">
                    <div class="text-center max-w-2xl mx-auto space-y-2">
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">DÒNG SẢN PHẨM CĂN HỘ</h2>
                        <div class="flex items-center justify-center gap-3">
                            <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <i data-lucide="home" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                            <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-600">Khám phá bộ sưu tập căn hộ nghỉ dưỡng biển cao cấp với đa dạng diện tích từ Studio, 1PN, 2PN, 3PN đến Sky Villa Penthouse.</p>
                    </div>

                    <div id="productTabs" class="flex items-center justify-center gap-2 flex-wrap text-xs font-black uppercase tracking-wider">
                        <!-- Render via JS -->
                    </div>

                    <div id="productGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Render via JS -->
                    </div>
                </div>
            </section>

            <!-- TIỆN ÍCH -->
            <section id="tien-ich" class="py-16 bg-white text-slate-800 border-t border-slate-200">
                <div class="max-w-7xl mx-auto px-4 space-y-10">
                    <div class="text-center max-w-2xl mx-auto space-y-2">
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">TIỆN ÍCH SANG TRỌNG</h2>
                        <div class="flex items-center justify-center gap-3">
                            <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                            <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-600">Hơn 25+ tiện ích đặc quyền 5 sao quốc tế đem đến trải nghiệm nghỉ dưỡng xa hoa, thượng lưu suốt 365 ngày trong năm.</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="amenitiesGrid">
                        <!-- Render via JS -->
                    </div>
                </div>
            </section>

            <!-- LÝ DO ĐẦU TƯ -->
            <section id="ly-do-dau-tu" class="py-16 bg-[#0B132B] text-white">
                <div class="max-w-7xl mx-auto px-4 space-y-10">
                    <div class="text-center max-w-2xl mx-auto space-y-2">
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#FDE047] uppercase tracking-wider">LÝ DO NÊN ĐẦU TƯ TẠI NHA TRANG</h2>
                        <div class="flex items-center justify-center gap-3">
                            <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <i data-lucide="trophy" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                            <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-300">5 bảo chứng vàng khẳng định tiềm năng tăng giá vượt trội và giá trị khai thác dòng tiền thụ động tại An Viên Residence.</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5" id="investReasonsGrid">
                        <!-- Render via JS -->
                    </div>
                </div>
            </section>

            <!-- THƯ VIỆN -->
            <section id="thu-vien" class="py-16 bg-[#FDFBF7] text-slate-800">
                <div class="max-w-7xl mx-auto px-4 space-y-10">
                    <div class="text-center max-w-2xl mx-auto space-y-2">
                        <h2 class="text-2xl sm:text-3xl font-serif font-black text-[#B45309] uppercase tracking-wider">NỘI THẤT CĂN HỘ CAO CẤP</h2>
                        <div class="flex items-center justify-center gap-3">
                            <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                            <i data-lucide="eye" class="w-3.5 h-3.5 text-[#D4AF37]"></i>
                            <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
                        </div>
                        <p class="text-xs sm:text-sm text-slate-600">Không gian sống chuẩn quý tộc được bài trí hoàn mỹ với các thương hiệu nội thất hàng đầu thế giới.</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5" id="galleryGrid">
                        <!-- Render via JS -->
                    </div>
                </div>
            </section>

            <!-- ĐĂNG KÝ (FORM) -->
            <section id="dang-ky" class="py-16 bg-[#F8F6F0] text-slate-800 border-t border-slate-200">
                <div class="max-w-7xl mx-auto px-4 max-w-2xl">
                    <div class="bg-white rounded-md p-8 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/50 space-y-6 text-center">
                        <div class="space-y-2">
                            <span class="text-xs font-black text-[#B45309] uppercase tracking-widest block">★ ĐĂNG KÝ NHẬN TRỌN BỘ TÀI LIỆU DỰ ÁN ★</span>
                            <h3 class="text-xl sm:text-2xl font-serif font-black text-slate-900 uppercase">BẢNG GIÁ & CHÍNH SÁCH ƯU ĐÃI ĐỢT 1</h3>
                            <p class="text-xs text-slate-500">Vui lòng nhập thông tin để nhận bảng tính lãi suất vay và mặt bằng căn hộ nét 4K qua Zalo.</p>
                        </div>
                        <form onsubmit="handleLeadSubmit(event)" class="space-y-3.5 text-xs" action="api/contact.php" method="POST">
                            <input type="text" name="name" placeholder="Họ và tên của quý khách..." required class="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-amber-500" />
                            <input type="tel" name="phone" placeholder="Số điện thoại / Zalo (*)..." required class="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-amber-500 font-bold" />
                            <input type="email" name="email" placeholder="Địa chỉ Email nhận tài liệu..." class="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-amber-500" />
                            <select name="unitType" class="w-full bg-slate-50 text-slate-900 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-amber-500 font-medium">
                                <option value="Studio Suite Panorama #ST-1808">Studio Nghỉ Dưỡng Hướng Biển (45.5 m² - 2.35 Tỷ VNĐ)</option>
                                <option value="Executive 1BR Oceanview #EX-2205">Căn Hộ 1 Phòng Ngủ Deluxe (58.2 m² - 3.10 Tỷ VNĐ)</option>
                                <option value="Signature 2BR Grand Corner #SG-2802" selected>Căn Hộ 2 Phòng Ngủ Signature (78.6 m² - 4.45 Tỷ VNĐ)</option>
                                <option value="Royal Ocean Suite #RY-3501">Căn Hộ 3 Phòng Ngủ Royal Suite (115.8 m² - 6.85 Tỷ VNĐ)</option>
                                <option value="Imperial Penthouse #PH-3901 (Đỉnh Tháp)">Sky Villa Penthouse Hoàng Gia (268.0 m² - 18.50 Tỷ VNĐ)</option>
                                <option value="Dual Key Harmony #DK-1604">Căn Hộ Kép Dual Key Đa Năng (92.5 m² - 5.20 Tỷ VNĐ)</option>
                            </select>
                            <button type="submit" class="w-full py-4 bg-gradient-to-r from-[#E11D48] via-[#BE123C] to-[#9F1239] hover:from-[#BE123C] hover:to-[#881337] text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-sm shadow-xl transition-all hover:scale-[1.02] cursor-pointer">
                                NHẬN BÁO GIÁ NGAY
                            </button>
                        </form>
                        <p class="text-[10px] text-slate-400">🔒 Cam kết bảo mật thông tin khách hàng 100% theo tiêu chuẩn chủ đầu tư.</p>
                    </div>
                </div>
            </section>

            <!-- ĐỐI TÁC -->
            <section class="relative py-14 bg-slate-950 text-white overflow-hidden border-t border-amber-500/30">
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80" alt="Handshake Partners" class="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div class="absolute inset-0 bg-[#0B132B]/85"></div>
                <div class="relative z-20 max-w-7xl mx-auto px-4 text-center space-y-6">
                    <span class="text-[11px] font-black uppercase tracking-widest text-[#FDE047]">★ ĐỐI TÁC PHÁT TRIỂN & BẢO TRỢ TÀI CHÍNH CHIẾN LƯỢC ★</span>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center max-w-4xl mx-auto pt-2">
                        <div class="p-4 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1"><span class="text-xs font-bold text-slate-400 block">Đơn vị phát triển</span><span class="text-sm font-black text-amber-300"><?= htmlspecialchars(mb_strtoupper($company["name"], "UTF-8")) ?></span></div>
                        <div class="p-4 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1"><span class="text-xs font-bold text-slate-400 block">Ngân hàng bảo lãnh</span><span class="text-sm font-black text-emerald-400">BIDV BANK</span></div>
                        <div class="p-4 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1"><span class="text-xs font-bold text-slate-400 block">Tổng thầu xây dựng</span><span class="text-sm font-black text-cyan-300">TAKCO CORP</span></div>
                        <div class="p-4 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-center space-y-1"><span class="text-xs font-bold text-slate-400 block">Quản lý vận hành</span><span class="text-sm font-black text-amber-300">SAVILLS 5★</span></div>
                    </div>
                </div>
            </section>
        </main>
        
        <!-- FOOTER (Universal mock) -->
        <footer class="bg-[#0B132B] text-slate-300 py-12 border-t border-amber-500/30">
            <div class="max-w-7xl mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="space-y-4">
                        <h4 class="text-amber-400 font-bold uppercase tracking-wider">Thông tin liên hệ</h4>
                        <p class="text-sm"><?= htmlspecialchars($company["address"]) ?></p>
                        <p class="text-sm">Hotline: <?= htmlspecialchars($company["phone"]) ?></p>
                    </div>
                    <div class="space-y-4">
                        <h4 class="text-amber-400 font-bold uppercase tracking-wider">Liên kết nhanh</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#tong-quan" class="hover:text-amber-400">Tổng quan</a></li>
                            <li><a href="#san-pham" class="hover:text-amber-400">Sản phẩm</a></li>
                        </ul>
                    </div>
                    <div class="space-y-4">
                        <h4 class="text-amber-400 font-bold uppercase tracking-wider">BDS-09</h4>
                        <p class="text-xs">An Viên Yacht & Sky Residence Nha Trang</p>
                    </div>
                </div>
                <div class="mt-8 pt-8 border-t border-white/10 text-center text-xs">
                    &copy; 2026 <?= htmlspecialchars($company["name"]) ?>. All rights reserved.
                </div>
            </div>
        </footer>
    </div>

    <!-- PROPERTY DETAIL VIEW (Hidden by default) -->
    <div id="property-detail-view" class="hidden py-12 bg-white text-slate-900 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 space-y-8">
            <div class="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <button onclick="closePropertyDetail()" class="hover:text-amber-600">Trang chủ</button>
                <span>/</span>
                <button onclick="closePropertyDetail(); window.location.hash='#san-pham';" class="hover:text-amber-600">Sản phẩm</button>
                <span>/</span>
                <span id="pd-name-breadcrumb" class="text-slate-800 font-bold truncate"></span>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                <div>
                    <div id="pd-type" class="inline-block px-3 py-1 rounded-md bg-[#B45309] text-white text-xs font-bold mb-2"></div>
                    <h1 id="pd-name" class="text-2xl sm:text-3xl font-serif font-black text-slate-900 uppercase"></h1>
                    <p class="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                        <i data-lucide="compass" class="w-[14px] h-[14px] text-[#B45309]"></i> <span id="pd-view"></span>
                    </p>
                </div>
                <div class="text-right">
                    <span class="text-xs text-slate-400 block font-bold">Giá bán chính thức:</span>
                    <span id="pd-price" class="text-2xl sm:text-3xl font-black text-[#B45309]"></span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div class="lg:col-span-8 space-y-6">
                    <img id="pd-image" src="" class="w-full h-auto rounded-md shadow-lg" />
                    <div class="bg-slate-50 p-6 rounded-md border space-y-4">
                        <h3 class="text-base font-black text-[#B45309] uppercase">Đặc Điểm & Thông Số Kỹ Thuật</h3>
                        <p id="pd-desc" class="text-xs sm:text-sm text-slate-700 leading-relaxed"></p>
                        <ul id="pd-specs" class="space-y-2 text-xs sm:text-sm text-slate-600"></ul>
                        <ul id="pd-highlights" class="space-y-2 text-xs sm:text-sm text-slate-600 mt-2"></ul>
                    </div>
                </div>
                <div class="lg:col-span-4 bg-[#FDFBF7] p-6 rounded-md border border-amber-200 space-y-4 h-fit">
                    <h3 class="text-base font-black text-slate-900 uppercase">Nhận Bảng Giá Chi Tiết</h3>
                    <form onsubmit="handleLeadSubmit(event)" class="space-y-3 text-xs" action="api/contact.php" method="POST">
                        <input type="text" name="name" placeholder="Họ và tên..." required class="w-full p-3 rounded-sm border bg-white focus:outline-none" />
                        <input type="tel" name="phone" placeholder="Số điện thoại (*)..." required class="w-full p-3 rounded-sm border bg-white focus:outline-none font-bold" />
                        <input type="hidden" id="pd-unit-input" name="unitType" value="" />
                        <button type="submit" class="w-full py-3 bg-[#B45309] hover:bg-[#92400E] text-white font-black rounded-sm uppercase tracking-wider shadow">
                            Đăng Ký Tư Vấn Căn Này
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- FLOATING CTAS -->
    <div class="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a href="<?= htmlspecialchars($company["zalo"]) ?>" target="_blank" class="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
            <i data-lucide="message-square" class="w-6 h-6"></i>
        </a>
        <a href="tel:<?= htmlspecialchars(str_replace(" ", "", $company["phone"])) ?>" class="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
            <i data-lucide="phone" class="w-6 h-6"></i>
        </a>
        <button onclick="window.scrollTo(0,0)" class="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer">
            <i data-lucide="chevron-up" class="w-6 h-6"></i>
        </button>
    </div>

    <script>
        // JS Data & Logic
        const units = <?= json_encode($js_units, JSON_UNESCAPED_UNICODE) ?>;

        const amenities = [
            {id: 1, title: 'Sảnh Đón 5 Sao Grand Lobby', subtitle: 'TRẦN CAO 9M DÁT VÀNG HOÀNG GIA', desc: 'Không gian đón tiếp quý tộc sang trọng với đèn chùm pha lê Tiệp Khắc, dịch vụ quản gia phục vụ 24/7 và sảnh chờ VIP riêng tư.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', icon: '👑'},
            {id: 2, title: 'Sky Bar & Nhà Hàng Á - Âu', subtitle: 'ẨM THỰC CHUẨN MICHELIN TRÊN CAO', desc: 'Thưởng thức ẩm thực tinh hoa do các đầu bếp quốc tế chuẩn bị và thưởng lãm trọn vẹn cảnh vịnh biển lung linh ánh đèn về đêm từ tầng 39.', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', icon: '🍷'},
            {id: 3, title: 'Hồ Bơi Vô Cực Nối Liền 2 Tháp', subtitle: 'BỂ BƠI NƯỚC ẤM TRÀN CHÂN MÂY', desc: 'Hồ bơi vô cực trên không nối liền hai tòa tháp ngắm toàn cảnh 360 độ vịnh biển Nha Trang với hệ thống sục khoáng và quầy bar chìm.', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80', icon: '🏊‍♂️'},
            {id: 4, title: 'Bến Du Thuyền Quốc Tế Marina', subtitle: 'ĐẶC QUYỀN DU THUYỀN SIÊU SANG', desc: 'Bến đỗ tiêu chuẩn quốc tế phục vụ hơn 50 du thuyền hạng sang ngay trước thềm căn hộ, nơi khởi đầu những hải trình khám phá biển đảo.', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', icon: '⚓'}
        ];

        const investReasons = [
            {id: 1, icon: '🏛️', title: 'Vị Trí Kim Cương Độc Tôn', desc: 'Tọa lạc tại bán đảo An Viên khép kín, sở hữu vị thế tựa sơn hướng hải, là quỹ đất ven biển sở hữu lâu dài cuối cùng tại TP. Nha Trang.'},
            {id: 2, icon: '💎', title: 'Biểu Tượng Kiến Trúc Quốc Tế', desc: 'Tòa tháp đôi kiệt tác vươn cao 39 tầng bên vịnh biển, khẳng định vị thế và đẳng cấp thượng lưu không thể thay thế của gia chủ.'},
            {id: 3, icon: '📈', title: 'Tiềm Năng Khai Thác Du Lịch', desc: 'Nha Trang đón hơn 8.5 triệu lượt khách quốc tế/năm. Công suất phòng nghỉ dưỡng biển luôn đạt mức kỷ lục 80 - 90% quanh năm.'},
            {id: 4, icon: '⚖️', title: 'Pháp Lý Minh Bạch Sổ Lâu Dài', desc: '100% căn hộ có sổ hồng sở hữu lâu dài. Ngân hàng BIDV bảo lãnh tiến độ xây dựng và hỗ trợ giải ngân lãi suất 0%.'},
            {id: 5, icon: '🛋️', title: 'Bàn Giao Full Nội Thất 5 Sao', desc: 'Nhận nhà hoàn thiện đầy đủ nội thất nhập khẩu Châu Âu, sẵn sàng đưa vào vận hành cho thuê sinh lời dòng tiền ngoại tệ ngay lập tức.'}
        ];

        const gallery = [
            { title: 'Phòng Khách View Biển Panorama', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
            { title: 'Phòng Ngủ Master Đón Bình Minh', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80' },
            { title: 'Phòng Ăn Quý Tộc Sang Trọng', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80' },
            { title: 'Phòng Tắm Dát Vàng Hướng Vịnh', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' },
            { title: 'Ban Công Sunset Lounge Thư Giãn', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
            { title: 'Sky Lounge VIP Tầng Thượng', img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80' }
        ];

        const tabs = [
            { id: 'all', label: 'TẤT CẢ' }, { id: 'studio', label: 'STUDIO 45M²' },
            { id: '1pn', label: '1 PHÒNG NGỦ' }, { id: '2pn', label: '2 PHÒNG NGỦ' },
            { id: '3pn', label: '3 PHÒNG NGỦ' }, { id: 'skyvilla', label: 'SKY VILLA PENTHOUSE' },
            { id: 'dualkey', label: 'DUAL KEY' }
        ];

        let activeTab = 'all';

        function renderTabs() {
            const container = document.getElementById('productTabs');
            container.innerHTML = tabs.map(t => `
                <button onclick="filterProducts('${t.id}')" class="px-4 py-2.5 rounded-sm transition-all cursor-pointer ${activeTab === t.id ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md shadow-amber-900/20 font-black' : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-400'}">
                    ${t.label}
                </button>
            `).join('');
        }

        function filterProducts(cat) {
            activeTab = cat;
            renderTabs();
            renderProducts();
        }

        function renderProducts() {
            const container = document.getElementById('productGrid');
            const filtered = activeTab === 'all' ? units : units.filter(u => u.category === activeTab);
            container.innerHTML = filtered.map(u => `
                <div onclick="openPropertyDetail('${u.id}')" class="bg-white rounded-md overflow-hidden border border-slate-200 hover:border-[#D4AF37] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group">
                    <div>
                        <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
                            <img src="${u.image}" alt="${u.name}" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div class="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0B132B] text-[#FDE047] text-[10px] font-black uppercase tracking-wider border border-amber-500/30">${u.type}</div>
                            <div class="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-xs font-extrabold">${u.area}</div>
                        </div>
                        <div class="p-5 space-y-3">
                            <h3 class="text-sm font-black text-slate-900 group-hover:text-[#B45309] transition-colors leading-snug line-clamp-2 uppercase">${u.name}</h3>
                            <p class="text-xs text-slate-500 line-clamp-2">${u.description}</p>
                            <div class="space-y-1.5 pt-1 text-xs text-slate-600">
                                <div class="flex items-center gap-1.5"><i data-lucide="compass" class="w-[13px] h-[13px] text-amber-600 shrink-0"></i> <span class="truncate">${u.view}</span></div>
                                <div class="flex items-center gap-1.5"><i data-lucide="shield" class="w-[13px] h-[13px] text-amber-600 shrink-0"></i> <span class="truncate">${u.handover}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                            <span class="text-[10px] text-slate-400 block font-bold">Giá bán ưu đãi:</span>
                            <span class="text-base font-black text-[#B45309]">${u.price}</span>
                        </div>
                        <button class="px-3.5 py-1.5 rounded-sm bg-amber-50 text-[#B45309] group-hover:bg-[#B45309] group-hover:text-white font-bold text-xs transition flex items-center gap-1">
                            Xem Chi Tiết <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function renderAmenities() {
            document.getElementById('amenitiesGrid').innerHTML = amenities.map(a => `
                <div class="bg-slate-50 rounded-md overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between group">
                    <div>
                        <div class="relative aspect-[4/3] overflow-hidden bg-slate-900">
                            <img src="${a.image}" alt="${a.title}" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            <div class="absolute top-3 left-3 w-8 h-8 rounded-sm bg-black/70 backdrop-blur-md flex items-center justify-center text-sm">${a.icon}</div>
                        </div>
                        <div class="p-5 space-y-2">
                            <span class="text-[10px] font-black text-[#B45309] uppercase tracking-wider block">${a.subtitle}</span>
                            <h3 class="text-sm font-black text-slate-900 leading-snug">${a.title}</h3>
                            <p class="text-xs text-slate-600 leading-relaxed break-words">${a.desc}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderInvestReasons() {
            document.getElementById('investReasonsGrid').innerHTML = investReasons.map(r => `
                <div class="bg-slate-900/90 p-6 rounded-md border border-amber-500/30 text-center space-y-3 shadow-xl hover:border-[#D4AF37] transition hover:scale-105">
                    <span class="text-3xl block">${r.icon}</span>
                    <h3 class="text-xs sm:text-sm font-black text-[#FDE047] uppercase tracking-wide leading-snug">${r.title}</h3>
                    <p class="text-xs text-slate-300 leading-relaxed font-normal">${r.desc}</p>
                </div>
            `).join('');
        }

        function renderGallery() {
            document.getElementById('galleryGrid').innerHTML = gallery.map(g => `
                <div onclick="openLightbox('${g.img}')" class="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md group cursor-pointer border border-slate-200 hover:border-amber-400">
                    <img src="${g.img}" alt="${g.title}" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                        <span class="text-xs font-bold text-white group-hover:text-amber-300 transition">${g.title}</span>
                    </div>
                </div>
            `).join('');
        }

        // Interactivity
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        function openLeadModal() { document.getElementById('leadModal').classList.remove('hidden'); }
        function closeLeadModal() { document.getElementById('leadModal').classList.add('hidden'); }
        function openLightbox(src) { document.getElementById('lightboxImg').src = src; document.getElementById('lightbox').classList.remove('hidden'); document.getElementById('lightbox').classList.add('flex'); }
        function closeLightbox() { document.getElementById('lightbox').classList.add('hidden'); document.getElementById('lightbox').classList.remove('flex'); }

        function showToast(msg) {
            const toast = document.getElementById('toastMessage');
            document.getElementById('toastText').innerText = msg;
            toast.classList.remove('hidden');
            toast.classList.add('flex');
            setTimeout(() => {
                toast.classList.add('hidden');
                toast.classList.remove('flex');
            }, 4000);
        }

        function handleLeadSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const unit = formData.get('unitType') || 'căn hộ';
            if(!name || !phone) { alert('Vui lòng điền đủ thông tin!'); return; }
            
            fetch(e.target.action, { method: 'POST', body: formData }).catch(err=>console.log(err));
            
            closeLeadModal();
            showToast(`🎉 Cảm ơn quý khách ${name} (${phone}). Bảng giá gốc và chính sách chiết khấu cho ${unit} đã được gửi qua Zalo!`);
            e.target.reset();
        }

        // SPA Navigation to Property Detail
        function openPropertyDetail(unitId) {
            const u = units.find(x => x.id === unitId);
            if(!u) return;
            document.getElementById('main-view').classList.add('hidden');
            document.getElementById('property-detail-view').classList.remove('hidden');
            window.scrollTo(0,0);

            document.getElementById('pd-name-breadcrumb').innerText = u.name;
            document.getElementById('pd-type').innerText = u.type;
            document.getElementById('pd-name').innerText = u.name;
            document.getElementById('pd-view').innerText = u.view;
            document.getElementById('pd-price').innerText = u.price;
            document.getElementById('pd-image').src = u.image;
            document.getElementById('pd-desc').innerText = u.description;
            document.getElementById('pd-specs').innerHTML = u.specs.map(s => `<li class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600 shrink-0"></i> <span>${s}</span></li>`).join('');
            document.getElementById('pd-highlights').innerHTML = u.highlights.map(h => `<li class="flex items-center gap-2 font-bold text-[#B45309]"><i data-lucide="sparkles" class="w-4 h-4 text-amber-500 shrink-0"></i> <span>${h}</span></li>`).join('');
            document.getElementById('pd-unit-input').value = u.name;
            
            lucide.createIcons();
        }

        function closePropertyDetail() {
            document.getElementById('property-detail-view').classList.add('hidden');
            document.getElementById('main-view').classList.remove('hidden');
            window.scrollTo(0,0);
        }

        // Init
        document.addEventListener('DOMContentLoaded', () => {
            renderTabs();
            renderProducts();
            renderAmenities();
            renderInvestReasons();
            renderGallery();
            lucide.createIcons();
        });

    </script>
</body>
</html>
