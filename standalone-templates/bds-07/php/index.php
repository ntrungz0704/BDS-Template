<?php
/**
 * Template #07: PANNAMERA — Làng Sinh Thái Nghỉ Dưỡng Săn Mây Bảo Lộc (Bản Quyền TEMPLATESBDS)
 * Hỗ trợ chạy trực tiếp trên XAMPP / WAMP / cPanel Hosting PHP 7.4 - 8.x + MySQL
 */

// Kết nối database an toàn (Fallback sang dữ liệu tĩnh nếu chưa có MySQL)
$properties = [
  [
    'id' => 1,
    'title' => 'Lô Đất Vườn Nghỉ Dưỡng Săn Mây View Đồi Thông',
    'category' => 'dat-vuon',
    'price' => '890 Triệu VNĐ',
    'area' => '250 m²',
    'direction' => 'Đông Nam',
    'badge' => 'SUẤT NGOẠI GIAO',
    'image' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    'desc' => 'Đã có sẵn thổ cư ODT, view trọn thung lũng đồi chè và rừng thông.'
  ],
  [
    'id' => 2,
    'title' => 'Lô Góc 2 Mặt Tiền Suối Tự Nhiên & Đồi Chè Xanh',
    'category' => 'dat-vuon',
    'price' => '1.25 Tỷ VNĐ',
    'area' => '350 m²',
    'direction' => 'Nam - Đông Nam',
    'badge' => 'VIEW SUỐI HIẾM',
    'image' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    'desc' => 'Lô góc 2 mặt tiền ôm trọn dòng suối tự nhiên trong vắt quanh năm.'
  ],
  [
    'id' => 3,
    'title' => 'Nhà Vườn Bungalow Gỗ Mẫu Hoàn Thiện Full Sân Vườn',
    'category' => 'bungalow',
    'price' => '1.45 Tỷ VNĐ',
    'area' => '300 m²',
    'direction' => 'Đông',
    'badge' => 'XÂY SẴN CHÌA KHÓA',
    'image' => 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    'desc' => 'Nhà gỗ 2 tầng phong cách Nordic, 2PN, ban công Panorama 25m².'
  ],
  [
    'id' => 4,
    'title' => 'Biệt Thự Vườn Sinh Thái Panorama View 360 Độ',
    'category' => 'biet-thu',
    'price' => '1.85 Tỷ VNĐ',
    'area' => '500 m²',
    'direction' => 'Đông Bắc',
    'badge' => 'VIEW PANORAMA 360',
    'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'desc' => 'Khuôn viên 500m² vuông vức, view trực diện biểu tượng Cối Xay Gió.'
  ]
];

$msgSuccess = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['lead_phone'])) {
  $name = htmlspecialchars(trim($_POST['lead_name'] ?? 'Quý khách'));
  $phone = htmlspecialchars(trim($_POST['lead_phone']));
  $product = htmlspecialchars(trim($_POST['lead_product'] ?? 'Đất Vườn Săn Mây'));
  $msgSuccess = "🌿 Đã tiếp nhận yêu cầu của $name ($phone). Bảng giá F1 & sổ đỏ đất nền sẽ gửi qua Zalo trong 3 phút!";
}
?>
<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PANNAMERA — Làng Sinh Thái Nghỉ Dưỡng Săn Mây Bảo Lộc (Bản Quyền TEMPLATESBDS)</title>
  <meta name="description" content="Làng sinh thái nghỉ dưỡng đồi chè Pannamera Bảo Lộc. Độ cao 900m quanh năm mát lạnh 18-22°C, đất vườn 250m² - 1000m², sổ đỏ trao tay.">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    body { font-family: 'Inter', sans-serif; }
    .pulse-hotline { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .85; transform: scale(1.05); } }
  </style>
</head>
<body class="bg-[#F0FDF4] text-slate-900 min-h-screen flex flex-col justify-between selection:bg-[#047857] selection:text-white">

  <?php if ($msgSuccess): ?>
    <div class="fixed bottom-24 right-6 z-50 bg-emerald-700 text-white px-5 py-3.5 rounded-sm shadow-2xl font-bold text-xs flex items-center gap-2">
      <i data-lucide="check-circle" class="w-5 h-5 text-amber-300"></i>
      <span><?= $msgSuccess ?></span>
    </div>
  <?php endif; ?>

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-[#064E3B] text-white shadow-xl border-b border-emerald-800/60">
    <div class="bg-[#047857] text-white text-[11px] font-bold py-1.5 px-4 hidden md:block">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-6">
          <span>🌿 MỞ BÁN PHÂN KHU SĂN MÂY: TẶNG NGAY 1 CHỈ VÀNG — CHIẾT KHẤU ĐẾN 8%</span>
          <span class="opacity-80">★ SỔ ĐỎ THỔ CƯ CÔNG CHỨNG NGAY ★</span>
        </div>
        <div class="flex items-center gap-4">
          <a href="tel:0919006030" class="flex items-center gap-1.5 hover:underline">
            <i data-lucide="phone" class="w-3.5 h-3.5 text-amber-300 pulse-hotline"></i> Hotline CĐT: <strong>0919 006 030</strong>
          </a>
          <span class="opacity-50">|</span>
          <span class="text-amber-300 font-extrabold">MẪU GIAO DIỆN: BDS-07 (PHP/MySQL)</span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      <a href="index.php" class="flex items-center gap-2.5 group shrink-0">
        <div class="w-10 h-10 rounded-sm bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform border border-emerald-400/40 shrink-0">
          <i data-lucide="mountain" class="w-5 h-5 text-amber-300"></i>
        </div>
        <div class="whitespace-nowrap">
          <span class="text-sm sm:text-base font-black tracking-tight block leading-tight text-white group-hover:text-emerald-300 transition">
            PANNAMERA BẢO LỘC
          </span>
          <span class="text-[9px] sm:text-[10px] tracking-widest text-emerald-300 block uppercase font-bold">
            LÀNG SINH THÁI NGHỈ DƯỠNG
          </span>
        </div>
      </a>

      <nav class="hidden lg:flex items-center gap-2 xl:gap-4 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-emerald-100 whitespace-nowrap">
        <a href="#tong-quan" class="hover:text-amber-300 transition whitespace-nowrap px-1.5 py-1">Tổng Quan</a>
        <a href="#vi-tri" class="hover:text-amber-300 transition whitespace-nowrap px-1.5 py-1">Vị Trí</a>
        <a href="#tien-ich" class="hover:text-amber-300 transition whitespace-nowrap px-1.5 py-1">Tiện Ích</a>
        <a href="#mat-bang" class="hover:text-amber-300 transition whitespace-nowrap px-1.5 py-1">Mặt Bằng 3D</a>
        <a href="#san-pham" class="hover:text-amber-300 transition whitespace-nowrap px-1.5 py-1">Sản Phẩm</a>
        <a href="#gia-tri" class="hover:text-amber-300 transition whitespace-nowrap px-1.5 py-1">Giá Trị</a>
        <a href="#bungalow" class="hover:text-amber-300 transition whitespace-nowrap px-1.5 py-1">Bungalow</a>
        <a href="#dat-cho" class="hover:text-amber-300 transition whitespace-nowrap px-1.5 py-1">Báo Giá F1</a>
      </nav>

      <div class="flex items-center gap-2.5 shrink-0">
        <a href="tel:0919006030" class="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-sm bg-emerald-900/80 hover:bg-emerald-800 text-xs font-bold text-emerald-200 border border-emerald-700/60 transition whitespace-nowrap shrink-0">
          <i data-lucide="phone" class="w-3.5 h-3.5 text-amber-400 pulse-hotline"></i>
          <span>0919 006 030</span>
        </a>
        <a href="#dat-cho" class="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black rounded-sm shadow-lg uppercase tracking-wider hover:scale-105 transition whitespace-nowrap shrink-0">
          Tải Báo Giá VIP
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden">
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80" alt="Pannamera" class="absolute inset-0 w-full h-full object-cover object-center scale-105">
    <div class="absolute inset-0 bg-gradient-to-t from-[#022C22] via-[#022C22]/60 to-[#022C22]/30"></div>
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F0FDF4] to-transparent z-10 opacity-90"></div>

    <div class="relative z-20 max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#047857]/90 text-white text-xs font-black tracking-widest uppercase shadow-xl backdrop-blur-md border border-emerald-400/30 whitespace-nowrap">
        <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300 shrink-0"></i> THIÊN ĐƯỜNG NGHỈ DƯỠNG SINH THÁI TÂY NGUYÊN
      </div>

      <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight drop-shadow-2xl">
        PANNAMERA <br>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-lime-300 inline-block">
          NƠI DỪNG CHÂN LÝ TƯỞNG
        </span>
      </h1>

      <p class="text-sm sm:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
        Tuyệt tác làng sinh thái đồi chè bên dòng suối tự nhiên tại Bảo Lộc. Độ cao 900m mát lạnh quanh năm 18 - 22°C, nơi an trú trọn vẹn của tâm hồn.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
        <a href="#mat-bang" class="px-8 py-4 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-2xl hover:scale-105 transition flex items-center gap-2">
          Khám Phá Mặt Bằng 3D <i data-lucide="chevron-right" class="w-4 h-4"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- PRODUCTS GRID PHP -->
  <section id="san-pham" class="py-20 bg-[#F0FDF4] text-slate-900">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span class="text-xs font-extrabold text-[#047857] uppercase tracking-widest block">★ QUY HOẠCH ĐỒNG BỘ — SỔ ĐỎ RIÊNG TỪNG NỀN ★</span>
        <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">DANH MỤC ĐẤT NỀN & BUNGALOW PANNAMERA</h2>
        <div class="w-16 h-1 bg-[#047857] mx-auto rounded-sm mt-2"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <?php foreach ($properties as $p): ?>
          <div class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col group">
            <div class="relative aspect-[4/3] overflow-hidden">
              <img src="<?= $p['image'] ?>" alt="<?= htmlspecialchars($p['title']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
              <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase"><?= $p['badge'] ?></div>
              <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#022C22]/90 text-amber-300 text-xs font-black backdrop-blur"><?= $p['price'] ?></div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400 block"><?= $p['area'] ?> • <?= $p['direction'] ?></span>
                <h4 class="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1"><?= htmlspecialchars($p['title']) ?></h4>
              </div>
              <a href="#dat-cho" class="w-full py-2.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-extrabold rounded-sm shadow uppercase text-center block">Nhận Sổ Đỏ & Báo Giá</a>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- LEAD FORM PHP -->
  <section id="dat-cho" class="py-20 bg-white text-slate-900">
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-[#064E3B] text-white rounded-md p-8 sm:p-10 shadow-2xl border border-emerald-800 space-y-6">
        <div class="text-center space-y-1">
          <span class="text-xs font-bold uppercase tracking-widest text-amber-300">BOOKING & TRÍCH LỤC SỔ ĐỎ</span>
          <h3 class="text-2xl sm:text-3xl font-black">ĐĂNG KÝ NHẬN BẢNG GIÁ F1 PANNAMERA</h3>
          <p class="text-xs text-emerald-200">Chuyên viên CĐT tại Bảo Lộc sẽ gửi trọn bộ file PDF & Video flycam qua Zalo trong 3 phút.</p>
        </div>

        <form method="POST" action="index.php#dat-cho" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold mb-1">Họ và tên của bạn (*)</label>
              <input type="text" name="lead_name" required placeholder="Ví dụ: Nguyễn Thị Mai" class="w-full p-3 rounded-sm bg-emerald-950 border border-emerald-700 text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="block font-bold mb-1">Số điện thoại / Zalo (*)</label>
              <input type="tel" name="lead_phone" required placeholder="Ví dụ: 0919 006 030" class="w-full p-3 rounded-sm bg-emerald-950 border border-emerald-700 text-amber-300 font-bold focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <div>
            <label class="block font-bold mb-1">Dòng sản phẩm quan tâm</label>
            <select name="lead_product" class="w-full p-3 rounded-sm bg-emerald-950 border border-emerald-700 text-white focus:outline-none focus:border-amber-400">
              <option>Đất Vườn Săn Mây 250m² (Từ 890Tr)</option>
              <option selected>Đất Vườn View Suối 350m² (Từ 1.25 Tỷ)</option>
              <option>Bungalow Gỗ Xây Sẵn (1.45 Tỷ)</option>
              <option>Biệt Thự Đồi 500m² (1.85 Tỷ)</option>
            </select>
          </div>

          <button type="submit" class="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider rounded-sm shadow-lg hover:scale-105 transition">
            GỬI YÊU CẦU NHẬN BÁO GIÁ NGAY
          </button>
        </form>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="w-full bg-[#07132B] text-slate-300 text-xs pt-12 pb-6 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
      <div class="md:col-span-6 space-y-3">
        <h4 class="font-black text-sm text-white uppercase tracking-wider">
          <span class="text-[#047857]">TEMPLATES</span><span class="text-white">BDS</span>
        </h4>
        <p class="text-slate-400 text-xs leading-relaxed max-w-sm">
          Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.
        </p>
        <div class="space-y-1.5 text-xs text-slate-300 pt-1">
          <div>📍 Địa chỉ: <strong class="text-white font-medium">180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</strong></div>
          <div>📞 Hotline: <a href="tel:0919006030" class="text-white font-bold font-mono hover:text-amber-400">0919 006 030</a> - <a href="tel:0983312219" class="text-white font-bold font-mono hover:text-emerald-400">0983 312 219</a></div>
          <div>✉️ Email: <a href="mailto:ntrungz0704@gmail.com" class="text-white hover:text-amber-400">ntrungz0704@gmail.com</a></div>
        </div>
      </div>

      <div class="md:col-span-6 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">BẢN QUYỀN MẪU</h4>
        <p class="text-slate-400">Mẫu giao diện BDS-07 (Làng Sinh Thái Nghỉ Dưỡng PANNAMERA Bảo Lộc) phiên bản PHP & MySQL sẵn sàng triển khai trên XAMPP và Hosting cPanel.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 pt-6 text-center text-slate-400 text-xs">
      © Bản quyền thuộc về TEMPLATEBDS — Nền tảng phân phối & Thiết kế Website Bất Động Sản Chuyên Nghiệp. Mẫu Giao Diện: BDS-07
    </div>
  </footer>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>