<?php
require_once 'config/db.php';

$company = [
    'name' => 'GOLDEN PARK TOWER CẦU GIẤY',
    'phone' => '0919 006 030',
    'email' => 'admin@templatesbds.com',
    'address' => 'Ngã tư Dương Đình Nghệ & Phạm Văn Bạch, KĐT Cầu Giấy, Yên Hòa, Cầu Giấy, Hà Nội',
    'slogan' => 'TỔ HỢP CĂN HỘ CAO CẤP & KHÁCH SẠN 5 SAO CẦU GIẤY',
    'zalo' => '0919006030'
];

$projects = [
    ['code' => 'CĂN SỐ 01', 'title' => 'Căn Hộ 2 Phòng Ngủ', 'description' => '2PN · 2WC · 2 Logia', 'price' => 'Giá: Từ 3.4 Tỷ', 'area' => '82.6 m²', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    ['code' => 'CĂN SỐ 02', 'title' => 'Căn Hộ 2PN + 1 Đa Năng', 'description' => '2PN + 1 · 2WC · Ban công lớn', 'price' => 'Giá: Từ 3.8 Tỷ', 'area' => '91.8 m²', 'image' => 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
    ['code' => 'CĂN SỐ 03', 'title' => 'Căn Hộ 3 Phòng Ngủ', 'description' => '3PN · 2WC · Bếp riêng', 'price' => 'Giá: Từ 4.2 Tỷ', 'area' => '100.2 m²', 'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    ['code' => 'CĂN SỐ 04', 'title' => 'Căn Hộ 3PN Góc Thoáng', 'description' => '3PN · 2WC · 2 Mặt thoáng', 'price' => 'Giá: Từ 4.5 Tỷ', 'area' => '105.6 m²', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
    ['code' => 'CĂN SỐ 05', 'title' => 'Căn Hộ 3PN Master VIP', 'description' => '3PN · 3WC · Phòng thay đồ', 'price' => 'Giá: Từ 5.1 Tỷ', 'area' => '116.0 m²', 'image' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
    ['code' => 'CĂN SỐ 06', 'title' => 'Căn Hộ 3PN Panorama', 'description' => '3PN · 3WC · View công viên', 'price' => 'Giá: Từ 5.6 Tỷ', 'area' => '125.4 m²', 'image' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'],
    ['code' => 'CĂN SỐ 07', 'title' => 'Căn Hộ 4 Phòng Ngủ Luxury', 'description' => '4PN · 3WC · 3 Ban công', 'price' => 'Giá: Từ 6.2 Tỷ', 'area' => '132.5 m²', 'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
    ['code' => 'CĂN SỐ 08', 'title' => 'Duplex Thông Tầng', 'description' => '4PN · 4WC · Sân vườn riêng', 'price' => 'Giá: Từ 8.9 Tỷ', 'area' => '185.0 m²', 'image' => 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80'],
    ['code' => 'CĂN SỐ 09', 'title' => 'Penthouse Hoàng Gia', 'description' => '5PN · 5WC · Bể bơi chân mây', 'price' => 'Giá: Từ 12.5 Tỷ', 'area' => '235.0 m²', 'image' => 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80']
];

if (isset($pdo)) {
    try {
        $stmt = $pdo->query('SELECT * FROM company_info LIMIT 1');
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company = array_merge($company, array_filter($row));
        }

        $stmt = $pdo->query('SELECT * FROM projects ORDER BY id ASC');
        $db_projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($db_projects && count($db_projects) > 0) {
            $projects = $db_projects;
        }
    } catch (PDOException $e) {
        // Fallback to static data
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($company["name"]) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        /* Custom animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-in-out;
        }
    </style>
</head>
<body class="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#0A2E28] selection:text-amber-300">

    <!-- 1. TOP NAVBAR -->
    <header class="sticky top-0 z-50 bg-[#0A2E28] text-white border-b border-[#C59B27]/40 px-4 sm:px-8 py-3">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-tr from-[#C59B27] to-amber-300 text-[#0A2E28] flex items-center justify-center font-black">
                    GP
                </div>
                <div>
                    <span class="font-black text-sm tracking-wide text-amber-400 uppercase block leading-none">
                        <?= htmlspecialchars($company["name"]) ?>
                    </span>
                    <span class="text-[9px] text-slate-300 uppercase tracking-wider block mt-0.5">
                        <?= htmlspecialchars($company["slogan"]) ?>
                    </span>
                </div>
            </div>

            <nav class="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
                <a href="#tong-quan" class="hover:text-amber-400 transition-colors">Tổng Quan</a>
                <a href="#chinh-sach" class="hover:text-amber-400 transition-colors">Chính Sách</a>
                <a href="#tien-do" class="hover:text-amber-400 transition-colors">Tiến Độ</a>
                <a href="#vi-tri" class="hover:text-amber-400 transition-colors">Vị Trí</a>
                <a href="#mat-bang" class="hover:text-amber-400 transition-colors">Mặt Bằng</a>
                <a href="#can-ho" class="hover:text-amber-400 transition-colors">Căn Hộ</a>
                <a href="#tien-ich" class="hover:text-amber-400 transition-colors">Tiện Ích</a>
            </nav>

            <div class="flex items-center gap-4">
                <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="flex items-center gap-1.5 font-black text-amber-400 hover:text-white transition-colors">
                    <i data-lucide="phone" class="w-3.5 h-3.5"></i>
                    <span>Hotline: <?= htmlspecialchars($company["phone"]) ?></span>
                </a>
                <a href="#hero-lead-form" class="px-4 py-1.5 bg-[#C59B27] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all">
                    Đăng Ký
                </a>
            </div>
        </div>
    </header>

    <!-- 2. HERO SECTION & RED LEAD BOX -->
    <section class="relative bg-[#0C3832] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-[#C59B27] overflow-hidden">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div class="lg:col-span-7 space-y-6 text-left">
                <div class="space-y-2">
                    <span class="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-black uppercase tracking-widest">
                        TÂM ĐIỂM KẾT NỐI VÀNG QUẬN CẦU GIẤY
                    </span>
                    <h1 class="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight uppercase leading-tight">
                        <?= htmlspecialchars($company["name"]) ?>
                    </h1>
                    <p class="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-xl">
                        Căn hộ khách sạn tiêu chuẩn 5 sao sở hữu 4 mặt tiền trung tâm hành chính mới Cầu Giấy — Nơi an cư lý tưởng và đầu tư sinh lời vượt trội.
                    </p>
                </div>

                <div class="bg-[#0A2E28]/90 border border-amber-400/40 p-5 text-xs text-slate-200 space-y-2">
                    <div class="flex justify-between border-b border-white/10 pb-1.5">
                        <span class="text-slate-400">• Vị trí:</span>
                        <span class="font-bold text-amber-300"><?= htmlspecialchars($company["address"]) ?></span>
                    </div>
                    <div class="flex justify-between border-b border-white/10 pb-1.5">
                        <span class="text-slate-400">• Quy mô:</span>
                        <span class="font-bold">1 Tòa tháp cao 45 tầng + 4 tầng hầm</span>
                    </div>
                    <div class="flex justify-between border-b border-white/10 pb-1.5">
                        <span class="text-slate-400">• Căn hộ:</span>
                        <span class="font-bold">360 Căn hộ cao cấp & 240 Phòng khách sạn 5 sao</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-400">• Pháp lý:</span>
                        <span class="font-bold text-emerald-400">Sổ hồng sở hữu lâu dài vĩnh viễn</span>
                    </div>
                </div>
            </div>

            <div id="hero-lead-form" class="lg:col-span-5">
                <div class="bg-[#C53030] border-2 border-amber-300 p-6 sm:p-8 shadow-2xl text-left relative">
                    <div class="text-center mb-4 pb-3 border-b border-red-400/60">
                        <span class="text-[11px] font-black text-amber-300 uppercase tracking-widest block mb-1">
                            ƯU ĐÃI TRỰC TIẾP CHỦ ĐẦU TƯ
                        </span>
                        <h3 class="text-xl font-black text-white uppercase">
                            NHẬN BẢNG GIÁ GỐC ĐỢT 1
                        </h3>
                    </div>

                    <div id="hero-success-message" class="hidden bg-white text-slate-900 p-5 text-center space-y-2 animate-fadeIn border-2 border-amber-400">
                        <i data-lucide="check" class="w-8 h-8 text-emerald-600 mx-auto"></i>
                        <h4 class="font-bold text-sm text-[#0C3832]">ĐÃ TIẾP NHẬN YÊU CẦU!</h4>
                        <p class="text-xs text-slate-600">
                            Phòng kinh doanh sẽ gọi lại qua số <strong id="hero-phone-display"></strong> và gửi file PDF bảng giá qua Zalo trong 3 phút.
                        </p>
                    </div>

                    <form id="hero-form" action="api/contact.php" method="POST" class="space-y-3 text-xs">
                        <div>
                            <input type="text" name="name" required placeholder="Họ và tên của Quý Khách *" class="w-full px-3.5 py-2.5 bg-white text-slate-900 font-bold placeholder:text-slate-500 border border-slate-300 outline-none" />
                        </div>
                        <div>
                            <input type="tel" name="phone" required placeholder="Số điện thoại nhận bảng giá (Zalo) *" class="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black placeholder:text-slate-500 border border-slate-300 outline-none" />
                        </div>
                        <div>
                            <input type="email" name="email" placeholder="Email nhận mặt bằng chi tiết" class="w-full px-3.5 py-2.5 bg-white text-slate-900 font-medium placeholder:text-slate-500 border border-slate-300 outline-none" />
                        </div>
                        <div>
                            <select id="hero-unit-select" name="unit_type" class="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none transition-all duration-300">
<?php foreach ($projects as $project): ?>
                                <option value="<?= htmlspecialchars($project['title'] . ' (' . $project['area'] . ')') ?>">
                                    <?= htmlspecialchars($project['code'] . ': ' . $project['title'] . ' (' . $project['area'] . ')') ?>
                                </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <button type="submit" class="w-full py-3 bg-[#C59B27] hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer mt-1">
                            ĐĂNG KÝ NHẬN BÁO GIÁ NGAY
                        </button>
                        <div class="flex items-center justify-center gap-3 pt-2 text-white text-xs">
                            <a href="https://zalo.me/<?= htmlspecialchars($company["zalo"]) ?>" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 hover:text-amber-300">
                                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Zalo
                            </a>
                            <span>•</span>
                            <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="flex items-center gap-1 hover:text-amber-300">
                                <i data-lucide="phone" class="w-3.5 h-3.5"></i> Hotline: <?= htmlspecialchars($company["phone"]) ?>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. TỔNG QUAN DỰ ÁN & CHÍNH SÁCH BÁN HÀNG -->
    <section id="tong-quan" class="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div class="lg:col-span-7 space-y-4 text-left">
                <h2 class="text-2xl sm:text-3xl font-black text-[#0A2E28] uppercase border-l-4 border-[#C59B27] pl-3">
                    TỔNG QUAN DỰ ÁN
                </h2>
                <table class="w-full border-collapse border border-slate-300 text-xs">
                    <tbody>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold text-slate-600 w-1/3 border-r border-slate-200">• Tên dự án:</td>
                            <td class="p-3 font-black text-[#0A2E28]"><?= htmlspecialchars($company["name"]) ?></td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold text-slate-600 border-r border-slate-200">• Chủ đầu tư:</td>
                            <td class="p-3 font-medium">TẬP ĐOÀN ĐẦU TƯ & PHÁT TRIỂN ĐÔ THỊ TÂY ĐÔ</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold text-slate-600 border-r border-slate-200">• Vị trí tọa lạc:</td>
                            <td class="p-3 font-medium"><?= htmlspecialchars($company["address"]) ?></td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold text-slate-600 border-r border-slate-200">• Tổng diện tích:</td>
                            <td class="p-3 font-medium">4.576 m² (Mật độ xây dựng 45%)</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold text-slate-600 border-r border-slate-200">• Quy mô xây dựng:</td>
                            <td class="p-3 font-medium">45 Tầng nổi + 4 Tầng hầm để xe thông minh</td>
                        </tr>
                        <tr class="border-b border-slate-200">
                            <td class="p-3 font-bold text-slate-600 border-r border-slate-200">• Cơ cấu diện tích:</td>
                            <td class="p-3 font-medium">82.6m² – 132.5m² (2PN - 4PN & Duplex, Penthouse)</td>
                        </tr>
                        <tr class="border-b border-slate-200 bg-slate-50">
                            <td class="p-3 font-bold text-slate-600 border-r border-slate-200">• Hình thức sở hữu:</td>
                            <td class="p-3 font-bold text-emerald-700">Sổ hồng lâu dài vĩnh viễn</td>
                        </tr>
                        <tr>
                            <td class="p-3 font-bold text-slate-600 border-r border-slate-200">• Thời gian bàn giao:</td>
                            <td class="p-3 font-medium">Đang bàn giao nhà hoàn thiện ngay</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="chinh-sach" class="lg:col-span-5 space-y-4">
                <div class="relative border-2 border-slate-300 aspect-[4/3] bg-slate-900 group cursor-pointer" onclick="openLightbox('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')">
                    <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80" alt="Phối Cảnh Golden Park Tower" class="w-full h-full object-cover" />
                    <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left">
                        <span class="text-xs font-bold text-amber-400">Hình ảnh phối cảnh thực tế Golden Park Tower</span>
                    </div>
                </div>

                <div class="bg-[#FFFDF9] border-2 border-[#C59B27] p-5 text-left space-y-3">
                    <h4 class="font-black text-sm text-[#0A2E28] uppercase border-b border-[#C59B27]/40 pb-2">
                        CHÍNH SÁCH BÁN HÀNG THÁNG MỚI NHẤT
                    </h4>
                    <div class="space-y-1.5 text-xs text-slate-700">
                        <p>✓ <strong>Chiết khấu ngay 8.5%</strong> giá trị căn hộ khi thanh toán sớm 95%.</p>
                        <p>✓ <strong>Hỗ trợ vay 70%</strong> lãi suất 0% và ân hạn nợ gốc trong 18 tháng.</p>
                        <p>✓ <strong>Tặng gói nội thất Smart Home</strong> trị giá 80.000.000đ.</p>
                        <p>✓ <strong>Miễn phí 2 năm</strong> phí quản lý dịch vụ khách sạn cao cấp.</p>
                    </div>
                    <div class="pt-2">
                        <a href="#hero-lead-form" class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A2E28] hover:bg-[#0C3832] text-amber-300 font-bold text-xs uppercase transition-all">
                            <span>TẢI BẢNG TÍNH DÒNG TIỀN VAY</span>
                            <i data-lucide="download" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. TIẾN ĐỘ THANH TOÁN -->
    <section id="tien-do" class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 text-center">
        <div class="max-w-5xl mx-auto space-y-8">
            <div class="space-y-2">
                <span class="text-xs font-bold text-[#C59B27] uppercase tracking-widest">LỘ TRÌNH TÀI CHÍNH LINH HOẠT</span>
                <h2 class="text-2xl sm:text-3xl font-black text-[#0A2E28] uppercase">TIẾN ĐỘ THANH TOÁN THÔNG THƯỜNG</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-slate-300 text-xs text-left bg-white shadow-sm">
                    <thead class="bg-[#0A2E28] text-white">
                        <tr>
                            <th class="p-3 border border-slate-300 w-24 text-center">ĐỢT</th>
                            <th class="p-3 border border-slate-300 w-36 text-center">TỶ LỆ (%)</th>
                            <th class="p-3 border border-slate-300">THỜI HẠN THANH TOÁN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white">
                            <td class="p-3 border border-slate-300 text-center font-bold text-[#0A2E28]">Đợt 1</td>
                            <td class="p-3 border border-slate-300 text-center font-black text-[#C53030]">30% GTCH</td>
                            <td class="p-3 border border-slate-300 font-medium text-slate-700">Ký Hợp đồng Mua bán chính thức (Sau khi cọc 100tr)</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-300 text-center font-bold text-[#0A2E28]">Đợt 2</td>
                            <td class="p-3 border border-slate-300 text-center font-black text-[#C53030]">10% GTCH</td>
                            <td class="p-3 border border-slate-300 font-medium text-slate-700">Sau 45 ngày kể từ ngày ký HĐMB</td>
                        </tr>
                        <tr class="bg-white">
                            <td class="p-3 border border-slate-300 text-center font-bold text-[#0A2E28]">Đợt 3</td>
                            <td class="p-3 border border-slate-300 text-center font-black text-[#C53030]">10% GTCH</td>
                            <td class="p-3 border border-slate-300 font-medium text-slate-700">Sau 90 ngày kể từ ngày ký HĐMB (Đổ sàn tầng 20)</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-300 text-center font-bold text-[#0A2E28]">Đợt 4</td>
                            <td class="p-3 border border-slate-300 text-center font-black text-[#C53030]">10% GTCH</td>
                            <td class="p-3 border border-slate-300 font-medium text-slate-700">Sau 135 ngày kể từ ngày ký HĐMB (Cất nóc tòa tháp)</td>
                        </tr>
                        <tr class="bg-white">
                            <td class="p-3 border border-slate-300 text-center font-bold text-[#0A2E28]">Đợt 5</td>
                            <td class="p-3 border border-slate-300 text-center font-black text-[#C53030]">10% GTCH</td>
                            <td class="p-3 border border-slate-300 font-medium text-slate-700">Sau 180 ngày kể từ ngày ký HĐMB (Hoàn thiện mặt ngoài)</td>
                        </tr>
                        <tr class="bg-slate-50">
                            <td class="p-3 border border-slate-300 text-center font-bold text-[#0A2E28]">Đợt 6</td>
                            <td class="p-3 border border-slate-300 text-center font-black text-[#C53030]">25% GTCH + 2% KPBT</td>
                            <td class="p-3 border border-slate-300 font-medium text-slate-700">Nhận thông báo Bàn giao nhà & Khóa vân tay</td>
                        </tr>
                        <tr class="bg-white">
                            <td class="p-3 border border-slate-300 text-center font-bold text-[#0A2E28]">Đợt 7</td>
                            <td class="p-3 border border-slate-300 text-center font-black text-[#C53030]">5% GTCH</td>
                            <td class="p-3 border border-slate-300 font-medium text-slate-700">Nhận Giấy chứng nhận quyền sở hữu nhà (Sổ đỏ)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <a href="#hero-lead-form" class="inline-flex items-center gap-2 px-6 py-3 bg-[#C59B27] hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                    <span>ĐĂNG KÝ TƯ VẤN GÓI VAY NGÂN HÀNG</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- 5. VỊ TRÍ DỰ ÁN -->
    <section id="vi-tri" class="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div class="max-w-6xl mx-auto space-y-8 text-center">
            <div class="space-y-2">
                <span class="text-xs font-bold text-[#C59B27] uppercase tracking-widest">TRUNG TÂM HÀNH CHÍNH MỚI</span>
                <h2 class="text-2xl sm:text-3xl font-black text-[#0A2E28] uppercase">VỊ TRÍ DỰ ÁN THUẬN LỢI GIAO THÔNG</h2>
            </div>
            <div class="relative border-4 border-[#0A2E28] aspect-[16/9] max-h-[460px] bg-slate-900 group cursor-pointer" onclick="openLightbox('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80" alt="Bản đồ giao thông Golden Park Tower" class="w-full h-full object-cover" />
                <div class="absolute bottom-3 right-3 bg-[#0A2E28] text-amber-300 px-3 py-1 text-xs font-bold flex items-center gap-1 border border-amber-400">
                    <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> Bấm xem phóng to sơ đồ
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xs text-slate-700 leading-relaxed font-medium">
                <div class="p-4 bg-slate-50 border border-slate-200">
                    <p>• Tọa lạc ngay ngã tư đường Dương Đình Nghệ và Phạm Văn Bạch, đối diện Tổng Cục Hải Quan và tòa nhà Viettel Group, cách Công viên Cầu Giấy chỉ 300m.</p>
                </div>
                <div class="p-4 bg-slate-50 border border-slate-200">
                    <p>• Kết nối trực thông trục đường Vành Đai 3, Phạm Hùng, Trung Kính, chỉ 5 phút tới Keangnam Landmark 72, Bệnh viện Huyết Học TW và Đại học Quốc Gia Hà Nội.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. MẶT BẰNG TẦNG ĐIỂN HÌNH -->
    <section id="mat-bang" class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div class="max-w-6xl mx-auto space-y-8 text-center">
            <div class="space-y-2">
                <span class="text-xs font-bold text-[#C59B27] uppercase tracking-widest">QUY HOẠCH KHÔNG GIAN THÔNG MINH</span>
                <h2 class="text-2xl sm:text-3xl font-black text-[#0A2E28] uppercase">MẶT BẰNG TẦNG ĐIỂN HÌNH</h2>
            </div>
            <div class="border-4 border-[#0C3832] bg-white p-4 group cursor-pointer shadow-md" onclick="openLightbox('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80" alt="Mặt bằng tầng điển hình Golden Park" class="w-full object-cover max-h-[500px]" />
                <div class="pt-3 flex justify-between items-center text-xs border-t border-slate-200 mt-3 text-slate-600">
                    <span>Sơ đồ bố trí 16 căn hộ / sàn với 6 thang máy tốc độ cao Schindler</span>
                    <span class="text-[#C59B27] font-bold flex items-center gap-1">
                        <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> Phóng to chi tiết
                    </span>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. THIẾT KẾ CĂN HỘ -->
    <section id="can-ho" class="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 text-center">
        <div class="max-w-7xl mx-auto space-y-10">
            <div class="space-y-2">
                <span class="text-xs font-bold text-[#C59B27] uppercase tracking-widest">BỘ SƯU TẬP KHÔNG GIAN SỐNG</span>
                <h2 class="text-2xl sm:text-4xl font-black text-[#0A2E28] uppercase">THIẾT KẾ CĂN HỘ <?= htmlspecialchars($company["name"]) ?></h2>
                <p class="text-xs sm:text-sm text-slate-600">Bấm vào từng căn hộ dưới đây để chọn trực tiếp và nhận báo giá chi tiết từ CĐT</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($projects as $project): ?>
                <div class="bg-white border-2 border-slate-200 hover:border-[#C59B27] transition-all flex flex-col justify-between text-left group shadow-xs hover:shadow-lg">
                    <div class="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer" onclick="openLightbox('<?= htmlspecialchars($project['image']) ?>')">
                        <img src="<?= htmlspecialchars($project['image']) ?>" alt="<?= htmlspecialchars($project['title']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div class="absolute top-2 left-2 px-2.5 py-1 bg-[#0A2E28] text-amber-300 font-bold text-[10px]"><?= htmlspecialchars($project['code']) ?></div>
                        <div class="absolute top-2 right-2 px-2 py-1 bg-[#C53030] text-white font-bold text-[10px]"><?= htmlspecialchars($project['area']) ?></div>
                    </div>
                    <div class="p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-[#FFFDF9]">
                        <div class="space-y-1">
                            <h4 class="font-black text-sm text-[#0A2E28] group-hover:text-red-700 transition-colors"><?= htmlspecialchars($project['title']) ?></h4>
                            <p class="text-xs text-slate-600 font-medium"><?= htmlspecialchars($project['description']) ?></p>
                            <p class="text-sm font-black text-[#C53030]"><?= htmlspecialchars($project['price']) ?></p>
                        </div>
                        <button type="button" onclick="handleSelectUnit('<?= htmlspecialchars($project['title'] . ' (' . $project['area'] . ')') ?>')" class="w-full py-2 bg-[#0A2E28] hover:bg-[#C59B27] hover:text-slate-950 text-amber-300 font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1">
                            <span>NHẬN BÁO GIÁ CĂN NÀY</span>
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- 8. TIỆN ÍCH VƯỢT TRỘI -->
    <section id="tien-ich" class="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200 text-center">
        <div class="max-w-7xl mx-auto space-y-12">
            <div class="space-y-2">
                <span class="text-xs font-bold text-[#C59B27] uppercase tracking-widest">ĐẶC QUYỀN NGHỈ DƯỠNG TẠI GIA</span>
                <h2 class="text-2xl sm:text-4xl font-black text-[#0A2E28] uppercase">TIỆN ÍCH VƯỢT TRỘI 5 SAO</h2>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div onclick="openLightbox('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80')" class="group relative border-2 border-slate-300 aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80" alt="Bể Bơi Vô Cực 4 Mùa Trên Cao" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-left">
                        <span class="text-xs font-bold text-white leading-tight">Bể Bơi Vô Cực 4 Mùa Trên Cao</span>
                    </div>
                </div>
                <div onclick="openLightbox('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80')" class="group relative border-2 border-slate-300 aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" alt="Sky Bar & Đài Quan Sát Tầng Thượng" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-left">
                        <span class="text-xs font-bold text-white leading-tight">Sky Bar & Đài Quan Sát Tầng Thượng</span>
                    </div>
                </div>
                <div onclick="openLightbox('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80')" class="group relative border-2 border-slate-300 aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" alt="Bể Bơi Tràn Bờ Khối Đế Chuẩn A" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-left">
                        <span class="text-xs font-bold text-white leading-tight">Bể Bơi Tràn Bờ Khối Đế Chuẩn A</span>
                    </div>
                </div>
                <div onclick="openLightbox('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80')" class="group relative border-2 border-slate-300 aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="Công Viên Cây Xanh & Lối Dạo Bộ" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-left">
                        <span class="text-xs font-bold text-white leading-tight">Công Viên Cây Xanh & Lối Dạo Bộ</span>
                    </div>
                </div>
                <div onclick="openLightbox('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80')" class="group relative border-2 border-slate-300 aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" alt="Trung Tâm Fitness & Yoga Quốc Tế" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-left">
                        <span class="text-xs font-bold text-white leading-tight">Trung Tâm Fitness & Yoga Quốc Tế</span>
                    </div>
                </div>
                <div onclick="openLightbox('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80')" class="group relative border-2 border-slate-300 aspect-[16/10] bg-slate-900 cursor-pointer overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="TTTM Khối Đế & Chuỗi Nhà Hàng VIP" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-left">
                        <span class="text-xs font-bold text-white leading-tight">TTTM Khối Đế & Chuỗi Nhà Hàng VIP</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 9. VIDEO GIỚI THIỆU DỰ ÁN -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A2E28] text-white text-center">
        <div class="max-w-4xl mx-auto space-y-6">
            <div class="space-y-2">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">THỰC TẾ TRẢI NGHIỆM</span>
                <h2 class="text-2xl sm:text-3xl font-black uppercase">VIDEO GIỚI THIỆU DỰ ÁN</h2>
            </div>
            <div class="relative border-4 border-[#C59B27] bg-slate-950 aspect-video group overflow-hidden">
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80" alt="Video Poster Golden Park" class="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700" />
                <div class="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                    <button onclick="openLightbox('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80')" class="w-16 h-16 bg-[#C59B27] text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition cursor-pointer">
                        <i data-lucide="play" class="w-8 h-8 fill-current ml-1"></i>
                    </button>
                    <span class="mt-3 text-xs font-bold uppercase tracking-wider bg-black/70 px-3 py-1 border border-white/20">
                        Xem video phóng sự thực tế Golden Park Tower
                    </span>
                </div>
            </div>
        </div>
    </section>

    <!-- 10. FORM NHẬN BÁNG GIÁ CUỐI TRANG -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[#0C3832] border-t-4 border-[#C59B27]">
        <div class="max-w-4xl mx-auto bg-[#0A2E28] border-2 border-[#C59B27] p-8 sm:p-10 text-center space-y-6">
            <div class="space-y-1">
                <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">ĐĂNG KÝ TRỰC TIẾP TỪ CHỦ ĐẦU TƯ</span>
                <h3 class="text-2xl sm:text-3xl font-black text-white uppercase">NHẬN BẢNG GIÁ & CHÍNH SÁCH ƯU ĐÃI</h3>
                <p class="text-xs text-slate-300">Cam kết thông tin chính xác 100% từ phòng kinh doanh Golden Park Tower</p>
            </div>

            <div id="bottom-success-message" class="hidden bg-white text-slate-900 p-6 text-center space-y-2 border-2 border-amber-400 animate-fadeIn">
                <i data-lucide="check" class="w-8 h-8 text-emerald-600 mx-auto"></i>
                <h4 class="font-bold text-sm text-[#0A2E28]">GỬI YÊU CẦU THÀNH CÔNG!</h4>
                <p class="text-xs text-slate-600">
                    Chuyên viên sẽ liên hệ lại qua số <strong id="bottom-phone-display"></strong> trong vòng 3 phút làm việc.
                </p>
            </div>

            <form id="bottom-form" action="api/contact.php" method="POST" class="max-w-xl mx-auto space-y-3.5 text-xs text-left">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="name" required placeholder="Họ và tên *" class="px-4 py-3 bg-white text-slate-900 font-bold border border-slate-300 outline-none" />
                    <input type="tel" name="phone" required placeholder="Số điện thoại (Zalo) *" class="px-4 py-3 bg-white text-slate-900 font-black border border-slate-300 outline-none" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="email" name="email" placeholder="Email nhận tài liệu" class="px-4 py-3 bg-white text-slate-900 font-medium border border-slate-300 outline-none" />
                    <select id="bottom-unit-select" name="unit_type" class="px-4 py-3 bg-white text-slate-900 font-bold border border-slate-300 outline-none">
<?php foreach ($projects as $project): ?>
                        <option value="<?= htmlspecialchars($project['title'] . ' (' . $project['area'] . ')') ?>">
                            <?= htmlspecialchars($project['code'] . ': ' . $project['title'] . ' (' . $project['area'] . ')') ?>
                        </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <button type="submit" class="w-full py-3.5 bg-[#C59B27] hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer">
                    GỬI YÊU CẦU NHẬN BẢNG GIÁ
                </button>
            </form>
        </div>
    </section>

    <!-- 11. FOOTER -->
    <footer class="bg-[#051C18] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div class="space-y-3">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-[#C59B27] text-slate-950 flex items-center justify-center font-black">GP</div>
                    <span class="font-black text-sm text-amber-400 uppercase"><?= htmlspecialchars($company["name"]) ?></span>
                </div>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                    Trực thuộc TẬP ĐOÀN ĐẦU TƯ & PHÁT TRIỂN ĐÔ THỊ TÂY ĐÔ. Tổ hợp khách sạn và căn hộ cao cấp 5 sao chuẩn mực tại trung tâm Cầu Giấy.
                </p>
            </div>
            <div class="space-y-2 text-[11px] text-slate-300">
                <h4 class="font-bold text-amber-400 text-xs uppercase mb-1">PHÒNG KINH DOANH DỰ ÁN</h4>
                <p class="flex items-start gap-2">
                    <i data-lucide="map-pin" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5"></i>
                    <span><?= htmlspecialchars($company["address"]) ?></span>
                </p>
                <p class="flex items-center gap-2">
                    <i data-lucide="phone" class="w-4 h-4 text-amber-400 shrink-0"></i>
                    <span>Hotline 24/7: <strong><?= htmlspecialchars($company["phone"]) ?></strong></span>
                </p>
                <p class="flex items-center gap-2">
                    <i data-lucide="mail" class="w-4 h-4 text-amber-400 shrink-0"></i>
                    <span>Email: <?= htmlspecialchars($company["email"]) ?></span>
                </p>
            </div>
            <div class="space-y-2 text-[11px] text-slate-400">
                <h4 class="font-bold text-amber-400 text-xs uppercase mb-1">QUY CHUẨN PHÁP LÝ</h4>
                <p>✓ Giấy phép xây dựng số 78/GPXD cấp bởi Sở Xây Dựng Hà Nội.</p>
                <p>✓ Cục Giám Định Nhà Nước nghiệm thu đưa vào sử dụng.</p>
                <p>✓ Ngân hàng Vietcombank bảo lãnh và hỗ trợ vay 70%.</p>
                <p class="text-[10px] text-slate-500 pt-2">© 2026 <?= htmlspecialchars($company["name"]) ?>. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- 12. LIGHTBOX ZOOM MODAL -->
    <div id="lightbox" class="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md hidden items-center justify-center p-4 animate-fadeIn" onclick="closeLightbox()">
        <div class="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
            <button onclick="closeLightbox()" class="absolute -top-10 right-0 p-2 text-white hover:text-amber-400 transition" title="Đóng (Esc)">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            <img id="lightbox-img" src="" alt="Phóng to chi tiết" class="max-w-full max-h-[85vh] object-contain border border-amber-400" onclick="event.stopPropagation()" />
        </div>
    </div>

    <!-- 13. FLOATING CONTACT BUTTONS -->
    <div class="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="px-4 py-2.5 bg-[#C53030] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl transition">
            <i data-lucide="phone" class="w-4 h-4 animate-bounce text-amber-300"></i>
            <span class="hidden sm:inline">Hotline: <?= htmlspecialchars($company["phone"]) ?></span>
            <span class="sm:hidden">Gọi Ngay</span>
        </a>
        <a href="https://zalo.me/<?= htmlspecialchars($company["zalo"]) ?>" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl transition">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>Chat Zalo</span>
        </a>
    </div>

    <!-- SCRIPTS -->
    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        // Lightbox Functions
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        function openLightbox(src) {
            lightboxImg.src = src;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }

        // Close lightbox on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });

        // UX Auto-Select Function
        function handleSelectUnit(unitTitle) {
            const heroSelect = document.getElementById('hero-unit-select');
            const bottomSelect = document.getElementById('bottom-unit-select');
            if (heroSelect) heroSelect.value = unitTitle;
            if (bottomSelect) bottomSelect.value = unitTitle;
            
            const element = document.getElementById('hero-lead-form');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    if (heroSelect) {
                        heroSelect.focus();
                        heroSelect.classList.add('ring-2', 'ring-amber-400', 'border-amber-400');
                        setTimeout(() => heroSelect.classList.remove('ring-2', 'ring-amber-400', 'border-amber-400'), 2000);
                    }
                }, 350);
            }
        }

        // Form Submission Handling
        const heroForm = document.getElementById('hero-form');
        const bottomForm = document.getElementById('bottom-form');
        const heroSuccess = document.getElementById('hero-success-message');
        const bottomSuccess = document.getElementById('bottom-success-message');

        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const phone = formData.get('phone');
            if (!phone.trim()) return;

            // Optional: Actually send the data using fetch API
            fetch(this.action, {
                method: 'POST',
                body: formData
            }).then(() => {}).catch(() => {});

            document.getElementById('hero-phone-display').textContent = phone;
            heroForm.style.display = 'none';
            heroSuccess.classList.remove('hidden');

            setTimeout(() => {
                heroSuccess.classList.add('hidden');
                heroForm.style.display = 'block';
                heroForm.reset();
            }, 6000);
        });

        bottomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const phone = formData.get('phone');
            if (!phone.trim()) return;

            // Optional: Actually send the data using fetch API
            fetch(this.action, {
                method: 'POST',
                body: formData
            }).then(() => {}).catch(() => {});

            document.getElementById('bottom-phone-display').textContent = phone;
            bottomForm.style.display = 'none';
            bottomSuccess.classList.remove('hidden');

            setTimeout(() => {
                bottomSuccess.classList.add('hidden');
                bottomForm.style.display = 'block';
                bottomForm.reset();
            }, 6000);
        });
    </script>
</body>
</html>