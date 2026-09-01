<?php
require_once 'config/db.php';

// Fallback data
$company = [
    'name' => 'CÔNG TY BẤT ĐỘNG SẢN LINKHOUSE MIỀN TRUNG',
    'phone' => '0919 006 030 - 0981 142 307',
    'email' => 'info@templatebds.com',
    'address' => '320 Đường 2/9, Q. Hải Châu, TP. Đà Nẵng',
    'slogan' => 'Bất động sản Linkhouse Miền Trung',
    'zalo' => '0919006030'
];

$tinNoiBat = [];
$canHo = [];
$datNen = [];

if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company = $row;
        }

        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id ASC");
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($projects as $project) {
            if ($project['category'] === 'tin-noi-bat') {
                $tinNoiBat[] = $project;
            } elseif ($project['category'] === 'can-ho') {
                $canHo[] = $project;
            } elseif ($project['category'] === 'dat-nen') {
                $datNen[] = $project;
            }
        }
    } catch (Exception $e) {
        // Fallback to hardcoded if DB fails
    }
}

// Ensure defaults if projects not loaded
if (empty($tinNoiBat)) {
    $tinNoiBat = [
        [
            'title' => 'DỰ ÁN KHU ĐÔ THỊ CẨM LỆ RIVERSIDE ĐÀ NẴNG',
            'description' => 'Đất nền ven sông Cẩm Lệ hạ tầng hoàn thiện 100%, đường nhựa 7.5m, sổ đỏ từng lô công chứng ngay.',
            'price' => '1.85 Tỷ / Lô',
            'area' => '100 m²',
            'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
            'badge' => 'Đất Nền Dự Án',
            'updated_date' => '25/08/2026'
        ],
        [
            'title' => 'DỰ ÁN BIỆT THỰ NGHỈ DƯỠNG SƠN TRÀ OCEAN VIEW',
            'description' => 'Biệt thự đồi tựa lưng núi Sơn Trà view trọn vẹn vịnh Đà Nẵng, thiết kế hiện đại có hồ bơi riêng.',
            'price' => '5.40 Tỷ / Căn',
            'area' => '250 m²',
            'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
            'badge' => 'Biệt Thự Biển',
            'updated_date' => '22/08/2026'
        ],
        [
            'title' => 'ĐẤT NỀN BIỂN NHƠN HỘI NEW CITY QUY NHƠN',
            'description' => 'Đại đô thị biển liền kề FLC Quy Nhơn và Kỳ Co - Eo Gió. Cơ hội đầu tư sinh lời đón sóng du lịch.',
            'price' => '1.45 Tỷ / Nền',
            'area' => '90 m²',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            'badge' => 'Đất Nền Biển',
            'updated_date' => '20/08/2026'
        ],
        [
            'title' => 'BIỆT THỰ ĐỒI HẢI VÂN PANORAMA VIEW BIỂN',
            'description' => 'Không gian sống nghỉ dưỡng sinh thái biệt lập với khí hậu trong lành quanh năm ngắm vịnh Kim Liên.',
            'price' => '4.20 Tỷ / Căn',
            'area' => '180 m²',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            'badge' => 'Biệt Thự Đồi',
            'updated_date' => '18/08/2026'
        ],
        [
            'title' => 'DỰ ÁN CĂN HỘ CAO CẤP VEN BIỂN MỸ KHÊ ĐÀ NẴNG',
            'description' => 'Căn hộ khách sạn mặt tiền đường biển đẹp nhất hành tinh, cách bãi tắm Mỹ Khê chỉ 2 phút đi bộ.',
            'price' => '2.10 Tỷ / Căn',
            'area' => '65 m²',
            'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            'badge' => 'Căn Hộ Biển',
            'updated_date' => '15/08/2026'
        ],
        [
            'title' => 'KHU ĐÔ THỊ SINH THÁI HÒA XUÂN NAM ĐÀ NẴNG',
            'description' => 'Khu đô thị sinh thái kiểu mẫu ven sông Đô Tỏa, bao quanh bởi 4 bề sông nước trong lành.',
            'price' => '2.90 Tỷ / Lô',
            'area' => '120 m²',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            'badge' => 'Đất Nền Sinh Thái',
            'updated_date' => '12/08/2026'
        ]
    ];
}
if (empty($canHo)) {
    $canHo = [
        [
            'title' => 'ĐẤT NỀN BIỂN CONDOTEL NHƠN HỘI',
            'description' => 'Condotel biển giá tốt nhất khu vực miền Trung, đón đầu làn sóng hạ tầng du lịch.',
            'price' => '1.35 Tỷ / Căn',
            'area' => '45 m²',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            'badge' => 'Condotel Nghỉ Dưỡng'
        ],
        [
            'title' => 'DỰ ÁN CĂN HỘ CONDOTEL HẢI CHÂU PLAZA',
            'description' => 'Tọa lạc bên bờ sông Hàn ngắm cầu Rồng phun lửa, tiện ích TTTM khối đế sầm uất.',
            'price' => '2.45 Tỷ / Căn',
            'area' => '72 m²',
            'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
            'badge' => 'Căn Hộ Trung Tâm'
        ],
        [
            'title' => 'DỰ ÁN CĂN HỘ THE SANG RESIDENCE ĐÀ NẴNG',
            'description' => 'Dự án căn hộ view biển Mỹ Khê với 100% căn hộ lấy gió và ánh sáng tự nhiên.',
            'price' => '3.60 Tỷ / Căn',
            'area' => '82 m²',
            'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
            'badge' => 'Căn Hộ Hạng Sang'
        ]
    ];
}
if (empty($datNen)) {
    $datNen = [
        [
            'title' => 'ĐẤT NỀN KHU ĐÔ THỊ FPT CITY ĐÀ NẴNG',
            'description' => 'Đất nền phân khu V1 liền kề Đại học FPT và trường quốc tế Singapore, tiềm năng cho thuê chuyên gia.',
            'price' => '2.65 Tỷ / Lô',
            'area' => '108 m²',
            'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
            'badge' => 'Đất Nền Công Nghệ'
        ],
        [
            'title' => 'DỰ ÁN ĐẤT NỀN NAM HÒA XUÂN GIAI ĐOẠN 2',
            'description' => 'Vị trí đắc địa gần cầu Bùi Tá Hán kết nối sang quận Ngũ Hành Sơn và bãi tắm Non Nước.',
            'price' => '3.15 Tỷ / Nền',
            'area' => '110 m²',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            'badge' => 'Đất Nền Đô Thị'
        ],
        [
            'title' => 'ĐẤT NỀN VEN BIỂN QUẢNG NAM - ĐÀ NẴNG',
            'description' => 'Liền kề vệt resort 5 sao đường biển Đà Nẵng - Hội An, kết nối giao thông liên vùng thuận tiện.',
            'price' => '1.75 Tỷ / Lô',
            'area' => '100 m²',
            'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
            'badge' => 'Đất Nền Nghỉ Dưỡng'
        ]
    ];
}

$firstPhone = explode('-', $company['phone'])[0];
$firstPhoneClean = preg_replace('/[^0-9]/', '', $firstPhone);
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NHÀ ĐẤT MIỀN TRUNG - Linkhouse Miền Trung</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .animate-in { animation: slide-in 0.2s ease-out; }
    @keyframes slide-in { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  </style>
</head>
<body class="w-full min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#16A34A] selection:text-white">

  <!-- Toast Popup -->
  <div id="toast" class="fixed bottom-24 right-6 z-50 bg-[#0F382A] text-white border border-emerald-400 px-5 py-3 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce hidden">
    <i data-lucide="check-circle-2" class="w-4 h-4 text-[#4ADE80]"></i> <span id="toast-msg"></span>
  </div>

  <div>
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
      <div class="bg-[#047857] text-white text-xs py-1 px-4 hidden md:block">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-6">
            <span class="flex items-center gap-1"><i data-lucide="mail" class="w-3 h-3"></i> <?= htmlspecialchars($company['email']) ?></span>
            <span class="opacity-40">|</span>
            <span class="flex items-center gap-1 font-bold"><i data-lucide="phone" class="w-3 h-3"></i> Hotline: <?= htmlspecialchars($company['phone']) ?></span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[11px] text-emerald-100"><?= htmlspecialchars($company['slogan']) ?></span>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        <div class="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0" onclick="window.scrollTo({top:0, behavior:'smooth'})">
          <div class="w-8 h-8 sm:w-11 sm:h-11 bg-gradient-to-br from-[#16A34A] to-[#047857] rounded-sm flex items-center justify-center text-white font-black text-base sm:text-xl shadow-md shrink-0">MT</div>
          <div class="min-w-0 truncate">
            <span class="text-base sm:text-2xl font-black text-[#15803D] tracking-tight block leading-none truncate">NHÀ ĐẤT <span class="text-slate-800">MIỀN TRUNG.VN</span></span>
            <span class="text-[7.5px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-0.5 truncate"><?= htmlspecialchars($company['name']) ?></span>
          </div>
        </div>

        <div class="hidden lg:flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-sm px-4 py-2 text-xs gap-3 shadow-sm">
          <div class="w-8 h-8 rounded-lg bg-[#16A34A] flex items-center justify-center text-white font-black text-sm">★</div>
          <div>
            <span class="text-[10px] font-black text-[#15803D] uppercase block">DỰ ÁN TÀI TRỢ HOT</span>
            <span class="font-bold text-slate-800 text-xs">Đất Nền Biển Nhơn Hội New City — Sinh Lời Vượng Phát</span>
          </div>
        </div>

        <button id="mobile-menu-btn" class="p-1.5 sm:p-2 rounded-sm bg-slate-100 text-slate-800 lg:hidden hover:bg-slate-200 shrink-0 flex items-center justify-center ml-auto">
          <i data-lucide="menu" class="w-5 h-5" id="menu-icon"></i>
          <i data-lucide="x" class="w-5 h-5 hidden" id="close-icon"></i>
        </button>
      </div>

      <nav class="bg-[#0F382A] text-white border-t border-emerald-800 hidden lg:block">
        <div class="max-w-7xl mx-auto px-4 flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          <div class="flex items-center gap-1">
            <a href="#" class="whitespace-nowrap px-4 py-2.5 transition-all bg-[#16A34A] text-white font-black">Trang Chủ</a>
            <a href="#" class="whitespace-nowrap px-4 py-2.5 transition-all hover:bg-emerald-800">Giới Thiệu</a>
            <a href="#projects" class="whitespace-nowrap px-4 py-2.5 transition-all hover:bg-emerald-800">Dự Án</a>
            <a href="#dat-nen" class="whitespace-nowrap px-4 py-2.5 transition-all hover:bg-emerald-800">Đất Nền Miền Trung</a>
            <a href="#can-ho" class="whitespace-nowrap px-4 py-2.5 transition-all hover:bg-emerald-800">Căn Hộ</a>
            <a href="#nha-pho" class="whitespace-nowrap px-4 py-2.5 transition-all hover:bg-emerald-800">Nhà Phố</a>
            <a href="#gallery" class="whitespace-nowrap px-4 py-2.5 transition-all hover:bg-emerald-800">Thư Viện Ảnh</a>
            <a href="#contact" class="whitespace-nowrap px-4 py-2.5 transition-all hover:bg-emerald-800">Liên Hệ</a>
          </div>
          <div class="flex items-center gap-2">
            <a href="tel:<?= $firstPhoneClean ?>" class="text-amber-300 font-extrabold text-xs flex items-center gap-1">
              <i data-lucide="phone" class="w-3 h-3 animate-pulse"></i> <?= htmlspecialchars(trim($firstPhone)) ?>
            </a>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" class="hidden lg:hidden bg-[#0F382A] text-white px-6 py-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
        <div class="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
          <a href="#" class="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Trang Chủ</a>
          <a href="#" class="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Giới Thiệu</a>
          <a href="#projects" class="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Dự Án</a>
          <a href="#dat-nen" class="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Đất Nền</a>
          <a href="#can-ho" class="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Căn Hộ</a>
          <a href="#nha-pho" class="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Nhà Phố</a>
          <a href="#gallery" class="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Thư Viện Ảnh</a>
          <a href="#contact" class="p-2.5 rounded-lg text-left bg-emerald-900 hover:bg-[#16A34A]">Liên Hệ</a>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero -->
      <section class="relative bg-slate-900 text-white overflow-hidden">
        <div class="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[500px] flex items-center">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80" alt="Linkhouse Hero" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80'" class="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div class="absolute inset-0 bg-gradient-to-r from-[#0F382A]/90 via-[#0F382A]/70 to-transparent"></div>
          <div class="relative z-20 max-w-7xl mx-auto px-4 py-12">
            <div class="max-w-2xl bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-md border border-emerald-500/40 space-y-4 shadow-2xl">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-[#16A34A] rounded-sm flex items-center justify-center text-white font-black text-2xl shadow-lg">MT</div>
                <div>
                  <h1 class="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">NHÀ ĐẤT <span class="text-[#4ADE80]">MIỀN TRUNG.VN</span></h1>
                  <p class="text-xs sm:text-sm font-bold text-emerald-300 uppercase tracking-wider"><?= htmlspecialchars($company['name']) ?></p>
                </div>
              </div>
              <div class="space-y-2 text-xs sm:text-sm text-slate-200 border-t border-white/20 pt-4">
                <p class="flex items-center gap-2"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#4ADE80] shrink-0"></i> <span><?= htmlspecialchars($company['address']) ?></span></p>
                <p class="flex items-center gap-2 font-bold text-[#FDE047]"><i data-lucide="phone" class="w-3.5 h-3.5 shrink-0 animate-pulse"></i> <span><?= htmlspecialchars($company['phone']) ?></span></p>
                <p class="flex items-center gap-2"><i data-lucide="mail" class="w-3.5 h-3.5 text-[#4ADE80] shrink-0"></i> <span><?= htmlspecialchars($company['email']) ?></span></p>
                <p class="flex items-center gap-2"><i data-lucide="compass" class="w-3.5 h-3.5 text-[#4ADE80] shrink-0"></i> <span>Website: nhadatmientrung.vn</span></p>
              </div>
              <div class="pt-2 flex gap-3">
                <a href="#projects" class="px-6 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition inline-block">Xem Giỏ Hàng BĐS ›</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tin Nổi Bật -->
      <section id="projects" class="py-10 bg-[#F8FAFC]">
        <div class="max-w-7xl mx-auto px-4 space-y-6">
          <div class="bg-[#0F382A] text-white px-5 py-3 rounded-sm flex items-center justify-between shadow-sm">
            <h2 class="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2"><i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i> TIN NỔI BẬT</h2>
            <a href="#projects" class="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1">Xem thêm <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i></a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <?php foreach ($tinNoiBat as $p): ?>
            <div class="bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between group">
              <div>
                <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img src="<?= htmlspecialchars($p['image']) ?>" alt="<?= htmlspecialchars($p['title']) ?>" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#16A34A] text-white text-[10px] font-bold"><?= htmlspecialchars($p['badge'] ?? 'Đất Nền Dự Án') ?></div>
                </div>
                <div class="p-4 space-y-2">
                  <h3 class="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2 uppercase min-h-[38px]"><?= htmlspecialchars($p['title']) ?></h3>
                  <p class="text-[11px] text-slate-500 line-clamp-2"><?= htmlspecialchars($p['description']) ?></p>
                </div>
              </div>
              <div class="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <?php if (!empty($p['updated_date'])): ?>
                  <span class="text-[10px] text-slate-400 block font-medium">Cập nhật: <?= htmlspecialchars($p['updated_date']) ?></span>
                  <?php endif; ?>
                  <span class="font-extrabold text-[#E11D48] text-sm"><?= htmlspecialchars($p['price']) ?></span>
                </div>
                <span class="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">DT: <?= htmlspecialchars($p['area']) ?></span>
              </div>
            </div>
            <?php endforeach; ?>

          </div>
        </div>
      </section>

      <!-- Căn Hộ Cao Cấp -->
      <section id="can-ho" class="py-8 bg-white border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-4 space-y-6">
          <div class="bg-[#0F382A] text-white px-5 py-3 rounded-sm flex items-center justify-between shadow-sm">
            <h2 class="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2"><i data-lucide="building-2" class="w-4 h-4 text-emerald-400"></i> CĂN HỘ CAO CẤP</h2>
            <a href="#can-ho" class="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1">Xem thêm <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i></a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <?php foreach ($canHo as $p): ?>
            <div class="bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between group">
              <div>
                <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img src="<?= htmlspecialchars($p['image']) ?>" alt="<?= htmlspecialchars($p['title']) ?>" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0284C7] text-white text-[10px] font-bold"><?= htmlspecialchars($p['badge'] ?? 'Căn Hộ') ?></div>
                </div>
                <div class="p-4 space-y-2">
                  <h3 class="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2 uppercase min-h-[38px]"><?= htmlspecialchars($p['title']) ?></h3>
                  <p class="text-[11px] text-slate-500 line-clamp-2"><?= htmlspecialchars($p['description']) ?></p>
                </div>
              </div>
              <div class="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <?php if (!empty($p['updated_date'])): ?>
                <div>
                  <span class="text-[10px] text-slate-400 block font-medium">Cập nhật: <?= htmlspecialchars($p['updated_date']) ?></span>
                  <span class="font-extrabold text-[#E11D48] text-sm"><?= htmlspecialchars($p['price']) ?></span>
                </div>
                <?php else: ?>
                <span class="font-extrabold text-[#E11D48] text-sm"><?= htmlspecialchars($p['price']) ?></span>
                <?php endif; ?>
                <span class="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">DT: <?= htmlspecialchars($p['area']) ?></span>
              </div>
            </div>
            <?php endforeach; ?>

          </div>
        </div>
      </section>

      <!-- Đất Nền Dự Án -->
      <section id="dat-nen" class="py-8 bg-[#F8FAFC] border-t border-slate-200">
        <div class="max-w-7xl mx-auto px-4 space-y-6">
          <div class="bg-[#0F382A] text-white px-5 py-3 rounded-sm flex items-center justify-between shadow-sm">
            <h2 class="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2"><i data-lucide="layers" class="w-4 h-4 text-emerald-400"></i> ĐẤT NỀN DỰ ÁN</h2>
            <a href="#dat-nen" class="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1">Xem thêm <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i></a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <?php foreach ($datNen as $p): ?>
            <div class="bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between group">
              <div>
                <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img src="<?= htmlspecialchars($p['image']) ?>" alt="<?= htmlspecialchars($p['title']) ?>" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#16A34A] text-white text-[10px] font-bold"><?= htmlspecialchars($p['badge'] ?? 'Đất Nền') ?></div>
                </div>
                <div class="p-4 space-y-2">
                  <h3 class="text-xs sm:text-sm font-black text-slate-900 group-hover:text-[#15803D] transition-colors leading-snug line-clamp-2 uppercase min-h-[38px]"><?= htmlspecialchars($p['title']) ?></h3>
                  <p class="text-[11px] text-slate-500 line-clamp-2"><?= htmlspecialchars($p['description']) ?></p>
                </div>
              </div>
              <div class="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <?php if (!empty($p['updated_date'])): ?>
                <div>
                  <span class="text-[10px] text-slate-400 block font-medium">Cập nhật: <?= htmlspecialchars($p['updated_date']) ?></span>
                  <span class="font-extrabold text-[#E11D48] text-sm"><?= htmlspecialchars($p['price']) ?></span>
                </div>
                <?php else: ?>
                <span class="font-extrabold text-[#E11D48] text-sm"><?= htmlspecialchars($p['price']) ?></span>
                <?php endif; ?>
                <span class="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">DT: <?= htmlspecialchars($p['area']) ?></span>
              </div>
            </div>
            <?php endforeach; ?>

          </div>
        </div>
      </section>

      <!-- Liên Hệ Trực Tiếp -->
      <section id="contact" class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 max-w-4xl">
          <div class="bg-white rounded-md p-6 sm:p-10 border-2 border-[#16A34A] shadow-xl space-y-6">
            <div class="text-center space-y-1 border-b border-emerald-100 pb-4">
              <h3 class="text-lg sm:text-xl font-black text-[#15803D] uppercase tracking-wide">LIÊN HỆ TRỰC TIẾP CHỦ ĐẦU TƯ</h3>
              <p class="text-xs text-slate-600">NHẬN TRỌN BỘ HỒ SƠ PHÁP LÝ & BẢNG GIÁ GỐC — HOTLINE: <strong class="text-[#E11D48]"><?= htmlspecialchars($company['phone']) ?></strong></p>
            </div>
            <form id="contact-form" action="api/contact.php" method="POST" class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <input type="hidden" name="source" value="Website" />
              <div class="space-y-3">
                <input type="text" name="name" placeholder="Họ và tên..." required class="w-full bg-slate-50 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500" />
                <input type="tel" name="phone" placeholder="Số điện thoại (*)..." required class="w-full bg-slate-50 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500 font-bold" />
                <input type="email" name="email" placeholder="Địa chỉ Email..." class="w-full bg-slate-50 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500" />
                <select name="product_type" class="w-full bg-slate-50 px-4 py-3 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500 font-medium">
                  <?php 
                  $allProjects = array_merge($tinNoiBat, $canHo, $datNen);
                  foreach ($allProjects as $p): ?>
                  <option value="<?= htmlspecialchars($p['title']) ?>"><?= htmlspecialchars($p['title']) ?></option>
                  <?php endforeach; ?>
                </select>
              </div>
              <div class="flex flex-col justify-between space-y-3">
                <textarea name="note" rows="5" placeholder="Nội dung yêu cầu tư vấn chi tiết (diện tích, mức tài chính dự kiến)..." class="w-full bg-slate-50 p-4 rounded-sm border border-slate-300 focus:bg-white focus:outline-none focus:border-emerald-500 h-full"></textarea>
                <button type="submit" class="w-full py-3.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer">
                  GỬI YÊU CẦU NGAY
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Đối Tác -->
      <section class="py-12 bg-white border-t border-slate-200 text-center space-y-6">
        <div class="max-w-7xl mx-auto px-4">
          <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest text-[#15803D]">ĐỐI TÁC CỦA CHÚNG TÔI</h3>
          <p class="text-xs text-slate-500 max-w-xl mx-auto">Linkhouse Miền Trung tự hào là đối tác chiến lược của các tập đoàn bất động sản uy tín hàng đầu.</p>
          <div class="grid grid-cols-2 sm:grid-cols-6 gap-4 items-center pt-4">
            <div class="p-3 rounded-sm border border-slate-200 font-bold text-xs text-slate-700">COCOBAY</div>
            <div class="p-3 rounded-sm border border-slate-200 font-bold text-xs text-[#16A34A]">NOVALAND</div>
            <div class="p-3 rounded-sm border border-slate-200 font-bold text-xs text-slate-700">ROYAL JEWELRY</div>
            <div class="p-3 rounded-sm border border-slate-200 font-bold text-xs text-[#16A34A]">SUN GROUP</div>
            <div class="p-3 rounded-sm border border-slate-200 font-bold text-xs text-slate-700">VINHOMES</div>
            <div class="p-3 rounded-sm border border-slate-200 font-bold text-xs text-[#16A34A]">PHÚC THỊNH LAND</div>
          </div>
        </div>
      </section>

      <!-- Footer Linkhouse -->
      <section class="py-12 bg-[#0F172A] text-slate-300 text-xs">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div class="md:col-span-5 space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-[#16A34A] rounded-lg flex items-center justify-center text-white font-black text-sm">MT</div>
                <span class="text-lg font-black text-white">TEMPLATESBDS</span>
              </div>
              <p class="text-slate-400">Công ty Cổ phần Bất động sản Linkhouse Miền Trung — Sàn giao dịch và phân phối bất động sản chuyên nghiệp tại Đà Nẵng, Quảng Nam, Quy Nhơn.</p>
              <div class="space-y-1 text-slate-400 pt-2">
                <p>📍 Trụ sở: <?= htmlspecialchars($company['address']) ?></p>
                <p>📞 Hotline: <a href="tel:<?= $firstPhoneClean ?>" class="text-[#4ADE80] font-bold"><?= htmlspecialchars($company['phone']) ?></a></p>
                <p>✉️ Email: <?= htmlspecialchars($company['email']) ?></p>
                <p>🌐 Website: nhadatmientrung.vn</p>
              </div>
            </div>
            <div class="md:col-span-3 space-y-3">
              <h4 class="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">DANH MỤC</h4>
              <ul class="space-y-2 text-slate-400">
                <li><a href="#" class="hover:text-emerald-400">Trang chủ</a></li>
                <li><a href="#" class="hover:text-emerald-400">Giới thiệu Linkhouse</a></li>
                <li><a href="#dat-nen" class="hover:text-emerald-400">Đất nền Miền Trung</a></li>
                <li><a href="#can-ho" class="hover:text-emerald-400">Căn hộ cao cấp</a></li>
                <li><a href="#nha-pho" class="hover:text-emerald-400">Nhà phố biệt thự</a></li>
                <li><a href="#contact" class="hover:text-emerald-400">Liên hệ</a></li>
              </ul>
            </div>
            <div class="md:col-span-4 space-y-3">
              <h4 class="font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">FANPAGE FACEBOOK</h4>
              <div class="p-4 rounded-sm bg-slate-900 border border-slate-800 space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-sm bg-[#1877F2] flex items-center justify-center text-white"><i data-lucide="facebook" class="w-5 h-5"></i></div>
                  <div>
                    <span class="font-bold text-white block">Nhà Đất Miền Trung</span>
                    <span class="text-[10px] text-slate-400">45.000 người theo dõi</span>
                  </div>
                </div>
                <a href="https://www.facebook.com/groups/847532091275214" target="_blank" rel="noreferrer" class="inline-block w-full py-2 bg-slate-800 hover:bg-slate-700 text-center rounded-lg text-white text-xs font-bold transition">+ Thích Trang</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <footer class="bg-slate-900 text-slate-400 text-xs py-4 text-center border-t border-slate-800">
        <p>&copy; <?= date('Y') ?> Bản quyền thuộc về Linkhouse Miền Trung.</p>
    </footer>

    <!-- Floating Actions -->
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <a href="tel:<?= $firstPhoneClean ?>" class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 animate-bounce">
        <i data-lucide="phone" class="w-5 h-5"></i>
      </a>
      <a href="#contact" class="w-12 h-12 bg-[#16A34A] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#15803D] transition-transform hover:scale-110">
        <i data-lucide="mail" class="w-5 h-5"></i>
      </a>
    </div>
  </div>

  <script>
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    });

    // Form Submission Interception (Toast)
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = form.querySelector('input[name="phone"]').value;
      const name = form.querySelector('input[name="name"]').value;
      const project = form.querySelector('select[name="product_type"]').value;

      if (!phone || !name) {
        alert('Vui lòng điền họ tên và số điện thoại liên hệ!');
        return;
      }

      // Submit via fetch to POST API
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        // Show toast
        toastMsg.innerText = `🎉 Tiếp nhận yêu cầu tư vấn thành công! Chuyên viên Linkhouse Miền Trung sẽ gửi bảng giá ${project} qua Zalo ${phone}.`;
        toast.classList.remove('hidden');
        setTimeout(() => {
          toast.classList.add('hidden');
        }, 4000);
        form.reset();
      })
      .catch(err => console.error('Error submitting form:', err));
    });
  </script>
</body>
</html>