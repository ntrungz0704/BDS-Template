<?php
require_once 'config/db.php';
$brandName = 'VẠN PHÚC CITY / ROYAL PALACE ECO-TOWNSHIP';
$hotline = '0919 006 030';
$zalo = '0919006030';
$email = 'admin@templatesbds.com';
$address = 'Bán Đảo Vạn Phúc, Quốc Lộ 13, TP. Thủ Đức, TP. Hồ Chí Minh & Hà Nội';
$slogan = 'Biểu tượng thịnh vượng mới bên sông Sài Gòn — Đẳng cấp sống vương giả dành riêng cho 1% giới thượng lưu tinh hoa.';

if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        $info = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($info) {
            $brandName = $info['name'] ?: $brandName;
            $hotline = $info['phone'] ?: $hotline;
            $email = $info['email'] ?: $email;
            $address = $info['address'] ?: $address;
            $slogan = $info['slogan'] ?: $slogan;
            $zalo = $info['zalo'] ?: $hotline;
        }
    } catch(Exception $e) {}
}

// Load projects
$projects = [];
if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id ASC");
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch(Exception $e) {}
}
$hotlineClean = preg_replace('/\s+/', '', $hotline);
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($brandName); ?> — Đại Đô Thị Nghỉ Dưỡng Hoàng Gia</title>
  <meta name="description" content="<?php echo htmlspecialchars($slogan); ?>">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; }
    .tab-btn.active { background: linear-gradient(135deg, #D4AF37, #F3E5AB); color: #1a0505; }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
  </style>
</head>
<body class="bg-[#5C0612] text-slate-100 antialiased min-h-screen flex flex-col selection:bg-amber-400 selection:text-slate-950">

  <!-- ═══ 1. HEADER HOÀNG GIA ═══ -->
  <header class="sticky top-0 z-50 bg-[#42040C]/95 backdrop-blur-md text-white border-b border-amber-500/30 shadow-lg px-4 sm:px-8 py-2.5">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-md text-lg">👑</div>
        <div>
          <span class="font-black text-sm sm:text-base text-amber-300 tracking-wider uppercase block leading-none"><?php echo htmlspecialchars($brandName); ?></span>
          <span class="text-[10px] text-slate-300 uppercase tracking-widest block mt-0.5 font-semibold">ĐẠI ĐÔ THỊ NGHỈ DƯỠNG HOÀNG GIA</span>
        </div>
      </div>
      <nav class="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-200">
        <a href="#tong-quan" class="hover:text-amber-300 transition-colors">Tổng Quan</a>
        <a href="#video-gioi-thieu" class="hover:text-amber-300 transition-colors">Video Dự Án</a>
        <a href="#tien-ich" class="hover:text-amber-300 transition-colors">Tiện Ích</a>
        <a href="#vi-tri" class="hover:text-amber-300 transition-colors">Vị Trí</a>
        <a href="#mat-bang" class="hover:text-amber-300 transition-colors">Mặt Bằng</a>
        <a href="#chinh-sach" class="hover:text-amber-300 transition-colors">Chính Sách</a>
      </nav>
      <div class="flex items-center gap-4">
        <a href="tel:<?php echo $hotlineClean; ?>" class="flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition-colors">📞 Hotline: <?php echo htmlspecialchars($hotline); ?></a>
        <a href="#hero-lead-box" class="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md">Đăng Ký VIP</a>
      </div>
    </div>
  </header>

  <main class="flex-1 w-full">

    <!-- ═══ 2. HERO + CENTER LEAD BOX ═══ -->
    <section class="relative min-h-[560px] py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1800&q=80" alt="Hero Panoramic" class="w-full h-full object-cover opacity-40">
        <div class="absolute inset-0 bg-gradient-to-b from-[#42040C]/80 via-[#5C0612]/70 to-[#5C0612]"></div>
      </div>
      <div id="hero-lead-box" class="relative z-10 max-w-4xl w-full mx-auto bg-gradient-to-b from-[#8C0E1F] to-[#630914] border-2 border-amber-400/80 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 text-center space-y-6">
        <span class="inline-block px-4 py-1 bg-amber-400/20 border border-amber-300/40 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest">★ ĐẠI ĐÔ THỊ ĐẸP NHẤT VIỆT NAM 2026 ★</span>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight"><?php echo htmlspecialchars($brandName); ?></h1>
        <p class="text-amber-100/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"><?php echo htmlspecialchars($slogan); ?></p>
        <form action="api/contact.php" method="POST" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="text" name="name" required placeholder="Họ và tên của Quý Khách *" class="w-full px-4 py-3 bg-white/10 border border-amber-400/40 rounded-xl text-sm text-white placeholder-amber-100/60 focus:outline-none focus:border-amber-400">
            <input type="tel" name="phone" required placeholder="Số điện thoại nhận bảng giá (Za *" class="w-full px-4 py-3 bg-white/10 border border-amber-400/40 rounded-xl text-sm text-white placeholder-amber-100/60 focus:outline-none focus:border-amber-400">
            <input type="email" name="email" placeholder="Email nhận hồ sơ VIP" class="w-full px-4 py-3 bg-white/10 border border-amber-400/40 rounded-xl text-sm text-white placeholder-amber-100/60 focus:outline-none focus:border-amber-400">
          </div>
          <select name="product_type" id="hero-product-select" class="w-full px-4 py-3.5 bg-white/10 border border-amber-400/40 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 appearance-none cursor-pointer">
            <option value="Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)">Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)</option>
            <option value="Shophouse Phố Đi Bộ Thương Mại (140m² - 220m²)">Shophouse Phố Đi Bộ Thương Mại (140m² - 220m²)</option>
            <option value="Dinh Thự Đảo Ngọc Ven Hồ (600m² - 1200m²)">Dinh Thự Đảo Ngọc Ven Hồ (600m² - 1200m²)</option>
            <option value="Đăng Ký Tham Quan Tour Dự Án VIP">Đăng Ký Tham Quan Tour Dự Án VIP</option>
          </select>
          <input type="hidden" name="source" value="hero_form">
          <button type="submit" class="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all hover:scale-[1.02]">
            NHẬN TRỌN BỘ BẢNG GIÁ & CHÍNH SÁCH VIP →
          </button>
        </form>
        <div class="flex items-center justify-center gap-3 pt-2">
          <a href="https://zalo.me/<?php echo $hotlineClean; ?>" target="_blank" class="w-11 h-11 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition text-lg">💬</a>
          <a href="tel:<?php echo $hotlineClean; ?>" class="w-11 h-11 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg transition text-lg">📞</a>
        </div>
      </div>
    </section>

    <!-- ═══ 3. TỔNG QUAN DỰ ÁN ═══ -->
    <section id="tong-quan" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#4A0A15]">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="text-amber-400 text-xs font-black uppercase tracking-widest">THÔNG TIN DỰ ÁN</span>
          <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">Tổng Quan Đại Đô Thị 198 Hécta</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <?php
          $overview = [
            ['label' => 'Chủ Đầu Tư Chính Thức', 'value' => 'Tập Đoàn Vạn Phúc Group'],
            ['label' => 'Vị Trí Chiến Lược', 'value' => htmlspecialchars($address)],
            ['label' => 'Quy Mô Khu Đô Thị', 'value' => '198 Hécta — 3 Mặt Giáp Sông Sài Gòn'],
            ['label' => 'Đơn Vị Thiết Kế', 'value' => 'Công ty Kiến trúc Surbana Jurong (Singapore)'],
            ['label' => 'Đơn Vị Quản Lý', 'value' => 'Savills Vietnam — Tiêu Chuẩn 5 Sao'],
            ['label' => 'Mật Độ Xây Dựng', 'value' => 'Chỉ 35% (65% Cây Xanh & Mặt Nước)'],
          ];
          foreach ($overview as $item): ?>
          <div class="bg-[#5C0612]/80 border border-amber-400/40 rounded-2xl p-5 space-y-1">
            <span class="text-[11px] font-bold text-amber-400 uppercase tracking-wider"><?php echo $item['label']; ?></span>
            <p class="text-white font-bold text-sm"><?php echo $item['value']; ?></p>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ═══ 4. VIDEO DỰ ÁN ═══ -->
    <section id="video-gioi-thieu" class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-5xl mx-auto space-y-6 text-center">
        <span class="text-amber-400 text-xs font-black uppercase tracking-widest">VIDEO GIỚI THIỆU</span>
        <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">Thước Phim Toàn Cảnh 3D Flycam</h2>
        <div class="relative aspect-video rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl group cursor-pointer">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80" alt="Video Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div class="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-2xl shadow-amber-500/50 group-hover:scale-110 transition-transform">
              <span class="text-3xl ml-1">▶</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 5. TIỆN ÍCH ═══ -->
    <section id="tien-ich" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#4A0A15]">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="text-amber-400 text-xs font-black uppercase tracking-widest">HỆ THỐNG TIỆN ÍCH</span>
          <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">6 Đặc Quyền Hoàng Gia Vượt Trội</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <?php
          $amenities = [
            ['title' => 'Quảng Trường Nhạc Nước & Pháo Hoa', 'desc' => 'Quy mô lớn nhất Đông Nam Á, trình diễn nghệ thuật ánh sáng và âm thanh đỉnh cao.', 'img' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'],
            ['title' => 'Bến Du Thuyền Hoàng Gia 5 Sao', 'desc' => 'Nơi neo đậu du thuyền siêu sang cùng các dịch vụ party riêng tư trên sông nước.', 'img' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80'],
            ['title' => 'Công Viên Cảnh Quan Ven Hồ 16ha', 'desc' => 'Lá phổi xanh điều hòa không khí trong lành quanh năm cho toàn khu đô thị.', 'img' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
            ['title' => 'Tuyến Phố Đi Bộ Mua Sắm Châu Âu', 'desc' => 'Hội tụ hàng trăm thương hiệu thời trang, ẩm thực Michelin và giải trí thượng đỉnh.', 'img' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'],
            ['title' => 'Clubhouse & Hồ Bơi Vô Cực Nước Mặn', 'desc' => 'Không gian thư giãn đẳng cấp quốc tế với hệ thống lọc nước điện phân ion muối.', 'img' => 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'],
            ['title' => 'Bệnh Viện & Trường Học Quốc Tế', 'desc' => 'Hệ thống giáo dục liên cấp từ Mầm non đến Đại học chuẩn quốc tế Cambridge.', 'img' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'],
          ];
          foreach ($amenities as $a): ?>
          <div class="bg-[#5C0612]/80 border border-amber-400/30 rounded-3xl overflow-hidden group hover:border-amber-400/70 transition-all">
            <div class="h-48 overflow-hidden">
              <img src="<?php echo $a['img']; ?>" alt="<?php echo htmlspecialchars($a['title']); ?>" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-5 space-y-2">
              <h3 class="font-black text-amber-300 text-sm uppercase"><?php echo htmlspecialchars($a['title']); ?></h3>
              <p class="text-slate-300 text-xs leading-relaxed"><?php echo htmlspecialchars($a['desc']); ?></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ═══ 6. VỊ TRÍ & KẾT NỐI ═══ -->
    <section id="vi-tri" class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="text-amber-400 text-xs font-black uppercase tracking-widest">VỊ TRÍ KIM CƯƠNG</span>
          <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">Kết Nối Vùng & Hạ Tầng Xung Quanh</h2>
        </div>
        <div class="aspect-video rounded-3xl overflow-hidden border-2 border-amber-400/40">
          <img src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1600&q=80" alt="Vị Trí Dự Án" class="w-full h-full object-cover">
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <?php
          $locations = [
            ['time' => '5 phút', 'dest' => 'Ga Metro Số 1 & Trung Tâm Thương Mại'],
            ['time' => '10 phút', 'dest' => 'Quận 1 Trung Tâm Tài Chính TP.HCM'],
            ['time' => '15 phút', 'dest' => 'Sân Bay Tân Sơn Nhất Quốc Tế'],
            ['time' => '25 phút', 'dest' => 'Cảng Quốc Tế Cát Lái & KCN'],
          ];
          foreach ($locations as $loc): ?>
          <div class="bg-[#8C0E1F]/60 border border-amber-400/40 rounded-2xl p-4 text-center space-y-1">
            <span class="text-2xl font-black text-amber-300"><?php echo $loc['time']; ?></span>
            <p class="text-xs text-slate-300 font-semibold"><?php echo $loc['dest']; ?></p>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ═══ 7. MẶT BẰNG PHÂN KHU (INTERACTIVE TABS) ═══ -->
    <section id="mat-bang" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#4A0A15]">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="text-amber-400 text-xs font-black uppercase tracking-widest">MẶT BẰNG & SẢN PHẨM</span>
          <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">Chọn Phân Khu Phù Hợp</h2>
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <button onclick="switchTab('tongthe')" class="tab-btn active px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border border-amber-400/40 text-amber-300 hover:bg-amber-400/20 transition" data-tab="tongthe">Tổng Thể 198ha</button>
          <button onclick="switchTab('bietthu')" class="tab-btn px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border border-amber-400/40 text-amber-300 hover:bg-amber-400/20 transition" data-tab="bietthu">Biệt Thự</button>
          <button onclick="switchTab('shophouse')" class="tab-btn px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border border-amber-400/40 text-amber-300 hover:bg-amber-400/20 transition" data-tab="shophouse">Shophouse</button>
          <button onclick="switchTab('dinhthu')" class="tab-btn px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border border-amber-400/40 text-amber-300 hover:bg-amber-400/20 transition" data-tab="dinhthu">Dinh Thự</button>
        </div>
        <div id="tab-tongthe" class="tab-content active">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div class="aspect-video rounded-2xl overflow-hidden border border-amber-400/30"><img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80" class="w-full h-full object-cover" alt=""></div>
            <div class="space-y-4">
              <h3 class="text-xl font-black text-amber-300 uppercase">Quy Hoạch Tổng Thể Đại Đô Thị 198 Hécta</h3>
              <p class="text-slate-300 text-sm leading-relaxed">3 mặt giáp sông Sài Gòn thơ mộng, hồ cảnh quan Đại Nhật 16ha và công viên giải trí chuẩn quốc tế.</p>
              <p class="text-amber-400 text-xs font-bold">198ha · 3 Mặt Sông · Mật độ xây dựng 35% · 10 Phân khu chức năng</p>
            </div>
          </div>
        </div>
        <div id="tab-bietthu" class="tab-content">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div class="aspect-video rounded-2xl overflow-hidden border border-amber-400/30"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" class="w-full h-full object-cover" alt=""></div>
            <div class="space-y-4">
              <h3 class="text-xl font-black text-amber-300 uppercase">Phân Khu Biệt Thự Hoàng Gia (Mansion Villas)</h3>
              <p class="text-slate-300 text-sm leading-relaxed">Kiến trúc Tân Cổ Điển Châu Âu quý phái, hồ bơi riêng, hầm rượu vang và sân vườn chân mây rộng lớn.</p>
              <p class="text-amber-400 text-xs font-bold">Diện tích 250m² - 500m² · 1 Hầm 4 Tầng · Bàn giao hoàn thiện cao cấp</p>
            </div>
          </div>
        </div>
        <div id="tab-shophouse" class="tab-content">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div class="aspect-video rounded-2xl overflow-hidden border border-amber-400/30"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" class="w-full h-full object-cover" alt=""></div>
            <div class="space-y-4">
              <h3 class="text-xl font-black text-amber-300 uppercase">Phân Khu Shophouse Phố Đi Bộ Châu Âu (Commercial Avenue)</h3>
              <p class="text-slate-300 text-sm leading-relaxed">Tọa lạc mặt tiền đại lộ ánh sáng, tối ưu vừa kinh doanh thương mại xa hoa vừa để ở tiện nghi.</p>
              <p class="text-amber-400 text-xs font-bold">Diện tích 140m² - 220m² · Mặt tiền rộng 7m - 9m · Hầm để xe riêng</p>
            </div>
          </div>
        </div>
        <div id="tab-dinhthu" class="tab-content">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div class="aspect-video rounded-2xl overflow-hidden border border-amber-400/30"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" class="w-full h-full object-cover" alt=""></div>
            <div class="space-y-4">
              <h3 class="text-xl font-black text-amber-300 uppercase">Dinh Thự Đảo Ngọc Ven Hồ (Royal Lakefront Mansions)</h3>
              <p class="text-slate-300 text-sm leading-relaxed">Bộ sưu tập giới hạn 36 căn dinh thự độc bản dành riêng cho giới tinh hoa thượng lưu.</p>
              <p class="text-amber-400 text-xs font-bold">Diện tích 600m² - 1200m² · Bến du thuyền riêng · Hồ bơi vô cực tràn bờ</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 8. CHÍNH SÁCH BÁN HÀNG ═══ -->
    <section id="chinh-sach" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#2E0208]">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="text-amber-400 text-xs font-black uppercase tracking-widest">ƯU ĐÃI ĐẶC QUYỀN</span>
          <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">Chính Sách Bán Hàng Hấp Dẫn</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <?php
          $policies = [
            ['tag' => 'CK ĐẶC BIỆT', 'title' => 'Chiết Khấu Ngay 15%', 'desc' => 'Dành cho khách hàng thanh toán nhanh 95% giá trị hợp đồng trước khi nhận bàn giao.'],
            ['tag' => 'LÃI SUẤT 0%', 'title' => 'Hỗ Trợ Vay 0% Trong 36 Tháng', 'desc' => 'Ân hạn nợ gốc hoàn toàn và miễn phí trả nợ trước hạn trong suốt 3 năm đầu.'],
            ['tag' => 'QUÀ TẶNG 200TR', 'title' => 'Tặng Kim Cương & Nội Thất 200 Triệu', 'desc' => 'Quà tặng trang sức kim cương thiên nhiên và voucher nội thất cao cấp Ý - Đức.'],
            ['tag' => 'QUẢN LÝ 5 NĂM', 'title' => 'Miễn Phí Quản Lý 5 Năm Savills', 'desc' => 'Tập đoàn Savills Vietnam quản lý vận hành toàn bộ khu đô thị theo tiêu chuẩn 5 sao.'],
          ];
          foreach ($policies as $p): ?>
          <div class="bg-[#42040C] border border-amber-400/40 rounded-2xl p-5 space-y-3">
            <span class="inline-block px-3 py-1 bg-amber-400/20 border border-amber-300/40 rounded-full text-amber-300 text-[10px] font-black uppercase tracking-wider"><?php echo $p['tag']; ?></span>
            <h3 class="font-black text-amber-200 text-sm"><?php echo $p['title']; ?></h3>
            <p class="text-slate-400 text-xs leading-relaxed"><?php echo $p['desc']; ?></p>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ═══ 9. TIN TỨC & SỰ KIỆN ═══ -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="text-amber-400 text-xs font-black uppercase tracking-widest">TIN TỨC & SỰ KIỆN</span>
          <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">Cập Nhật Mới Nhất Từ Dự Án</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <?php
          $news = [
            ['title' => 'Lễ Khởi Công Phân Khu Dinh Thự Đảo Ngọc', 'date' => '28/08/2026', 'desc' => 'Đón nhận sự tham gia của hơn 1000 khách hàng VIP và nhà đầu tư chiến lược.', 'img' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80'],
            ['title' => 'Khai Trương Tuyến Phố Đi Bộ Royal Avenue', 'date' => '15/08/2026', 'desc' => 'Thu hút hơn 50.000 lượt khách tham quan, thưởng thức ẩm thực và lễ hội ánh sáng.', 'img' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80'],
            ['title' => 'Hợp Tác Chiến Lược Với Tập Đoàn Savills', 'date' => '02/08/2026', 'desc' => 'Chính thức ký kết hợp đồng quản lý vận hành khu đô thị theo tiêu chuẩn 5 sao.', 'img' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80'],
            ['title' => 'Bàn Giao 200 Căn Biệt Thự Đợt 1', 'date' => '20/07/2026', 'desc' => 'Khách hàng nhận nhà vượt tiến độ cam kết 3 tháng với sổ hồng trao tay.', 'img' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80'],
          ];
          foreach ($news as $n): ?>
          <div class="bg-[#42040C] border border-amber-400/20 rounded-2xl overflow-hidden group hover:border-amber-400/50 transition-all">
            <div class="h-40 overflow-hidden">
              <img src="<?php echo $n['img']; ?>" alt="" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-4 space-y-2">
              <span class="text-amber-400 text-[10px] font-bold"><?php echo $n['date']; ?></span>
              <h4 class="font-bold text-white text-sm leading-snug"><?php echo htmlspecialchars($n['title']); ?></h4>
              <p class="text-slate-400 text-xs"><?php echo htmlspecialchars($n['desc']); ?></p>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- ═══ 10. FORM VÒM VÀNG (GOLDEN ARCH VIP) ═══ -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[#2E0208]">
      <div class="max-w-5xl mx-auto">
        <div class="bg-gradient-to-b from-[#42040C] to-[#2E0208] border-2 border-amber-400/60 rounded-[2rem] p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-b from-amber-400/30 to-transparent rounded-b-full"></div>
          <span class="inline-block px-5 py-1.5 bg-amber-400/20 border border-amber-300/40 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest">✦ CHƯƠNG TRÌNH ĐÓN TIẾP VIP ✦</span>
          <h2 class="text-2xl sm:text-3xl font-black text-white uppercase">Đặt Lịch Limousine Đón Tiếp Hoàng Gia</h2>
          <p class="text-amber-100/70 text-sm max-w-2xl mx-auto">Đăng ký ngay để được đón tiếp bằng xe Limousine & du thuyền sang trọng, tham quan toàn bộ dự án và nhận chính sách ưu đãi đặc biệt dành cho khách VIP.</p>
          <form action="api/contact.php" method="POST" class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <div>
              <label class="text-[11px] font-bold text-amber-300 uppercase">Họ và tên *</label>
              <input type="text" name="name" required placeholder="Nguyễn Văn A" class="w-full px-4 py-3 bg-white/10 border border-amber-400/40 rounded-xl text-sm text-white placeholder-amber-100/60 focus:outline-none focus:border-amber-400 mt-1">
            </div>
            <div>
              <label class="text-[11px] font-bold text-amber-300 uppercase">Số điện thoại / Zalo *</label>
              <input type="tel" name="phone" required placeholder="0919xxxxxx" class="w-full px-4 py-3 bg-white/10 border border-amber-400/40 rounded-xl text-sm text-white placeholder-amber-100/60 focus:outline-none focus:border-amber-400 mt-1">
            </div>
            <div>
              <label class="text-[11px] font-bold text-amber-300 uppercase">Email nhận hồ sơ VIP</label>
              <input type="email" name="email" placeholder="email@gmail.com" class="w-full px-4 py-3 bg-white/10 border border-amber-400/40 rounded-xl text-sm text-white placeholder-amber-100/60 focus:outline-none focus:border-amber-400 mt-1">
            </div>
            <div>
              <label class="text-[11px] font-bold text-amber-300 uppercase">Phân khu quan tâm</label>
              <select name="product_type" class="w-full px-4 py-3 bg-white/10 border border-amber-400/40 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 mt-1">
                <option value="Biệt Thự Đơn Lập Ven Sông (350m² - 500m²)">Biệt Thự Đơn Lập Ven Sông</option>
                <option value="Shophouse Phố Đi Bộ Thương Mại (140m² - 220m²)">Shophouse Phố Đi Bộ Thương Mại</option>
                <option value="Dinh Thự Đảo Ngọc Ven Hồ (600m² - 1200m²)">Dinh Thự Đảo Ngọc Ven Hồ</option>
                <option value="Đăng Ký Tham Quan Tour Dự Án VIP">Tour Tham Quan VIP</option>
              </select>
            </div>
            <input type="hidden" name="source" value="golden_arch_form">
            <div class="sm:col-span-2 pt-2">
              <button type="submit" class="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all hover:scale-[1.01]">
                ĐẶT LỊCH LIMOUSINE ĐÓN TIẾP HOÀNG GIA →
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

  </main>

  <!-- ═══ FOOTER ═══ -->
  <footer class="bg-[#1A0306] border-t border-amber-400/20 py-10 px-4 sm:px-8">
    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
      <div class="space-y-3">
        <h4 class="font-black text-amber-300 uppercase text-sm">Thông Tin Chủ Đầu Tư</h4>
        <p class="text-slate-400">TẬP ĐOÀN VẠN PHÚC GROUP</p>
        <p class="text-slate-400"><?php echo htmlspecialchars($address); ?></p>
      </div>
      <div class="space-y-3">
        <h4 class="font-black text-amber-300 uppercase text-sm">Liên Kết Nhanh</h4>
        <a href="#tong-quan" class="block text-slate-400 hover:text-amber-300 transition">Tổng Quan Dự Án</a>
        <a href="#tien-ich" class="block text-slate-400 hover:text-amber-300 transition">Tiện Ích Đặc Quyền</a>
        <a href="#mat-bang" class="block text-slate-400 hover:text-amber-300 transition">Mặt Bằng & Sản Phẩm</a>
        <a href="#chinh-sach" class="block text-slate-400 hover:text-amber-300 transition">Chính Sách Bán Hàng</a>
      </div>
      <div class="space-y-3">
        <h4 class="font-black text-amber-300 uppercase text-sm">Liên Hệ Tư Vấn VIP</h4>
        <p class="text-slate-400">📞 Hotline 24/7: <a href="tel:<?php echo $hotlineClean; ?>" class="text-amber-300 font-bold"><?php echo htmlspecialchars($hotline); ?></a></p>
        <p class="text-slate-400">💬 Zalo: <a href="https://zalo.me/<?php echo $hotlineClean; ?>" class="text-amber-300 font-bold" target="_blank"><?php echo htmlspecialchars($zalo); ?></a></p>
        <p class="text-slate-400">✉️ Email: <a href="mailto:<?php echo htmlspecialchars($email); ?>" class="text-amber-300 font-bold"><?php echo htmlspecialchars($email); ?></a></p>
      </div>
    </div>
    <div class="max-w-6xl mx-auto mt-8 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-600">
      © <?php echo date('Y'); ?> <?php echo htmlspecialchars($brandName); ?>. Nền tảng TEMPLATESBDS.COM
    </div>
  </footer>

  <!-- ═══ FLOATING CTA ═══ -->
  <div class="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
    <a href="tel:<?php echo $hotlineClean; ?>" class="flex items-center gap-2 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-full shadow-xl transition">📞 Hotline VIP: <?php echo htmlspecialchars($hotline); ?></a>
    <a href="https://zalo.me/<?php echo $hotlineClean; ?>" target="_blank" class="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-xl transition">💬 Chat Zalo VIP</a>
  </div>

  <!-- Tab Switching Script -->
  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + tabId).classList.add('active');
      document.querySelector('[data-tab="' + tabId + '"]').classList.add('active');
      // Auto-select product in hero form
      const sel = document.getElementById('hero-product-select');
      if (sel) {
        const map = { tongthe: 3, bietthu: 0, shophouse: 1, dinhthu: 2 };
        if (map[tabId] !== undefined) sel.selectedIndex = map[tabId];
      }
    }
  </script>

</body>
</html>