<?php
require_once 'config/db.php';

// Lấy danh sách dự án từ MySQL hoặc dùng demo DKRP
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id ASC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['id' => 1, 'title' => 'DỰ ÁN PHỨC HỢP CĂN HỘ ASTRAL CITY BÌNH DƯƠNG', 'type' => 'Căn Hộ Cao Cấp', 'price' => '2.15 Tỷ VNĐ', 'area' => '53.5 m²', 'location' => 'Mặt tiền Đại lộ Bình Dương (QL13)', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
        ['id' => 2, 'title' => 'DỰ ÁN ARIA ĐÀ NẴNG HOTEL & RESORT', 'type' => 'Nghỉ Dưỡng Biển', 'price' => '3.85 Tỷ VNĐ', 'area' => '48 m²', 'location' => 'Đường Trường Sa, Ngũ Hành Sơn, Đà Nẵng', 'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'],
        ['id' => 3, 'title' => 'DỰ ÁN KHU ĐÔ THỊ BARYA CITI VŨNG TÀU', 'type' => 'Nhà Phố Thương Mại', 'price' => '3.40 Tỷ VNĐ', 'area' => '90 m²', 'location' => 'Đường Nguyễn Văn Cừ, TP. Bà Rịa', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DKRP — PHP & MySQL Standalone Edition</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-white text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-[#0284C7] selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <a href="index.php" class="flex items-center gap-2">
        <span class="text-2xl font-black text-[#0284C7]">DKRP</span>
        <div class="border-l-2 border-slate-300 pl-2">
          <span class="text-[10px] font-black uppercase text-slate-800 block">DANH KHÔI</span>
          <span class="text-[9px] font-bold text-slate-500 uppercase block">REAL ESTATE</span>
        </div>
      </a>

      <div class="flex items-center gap-3">
        <a href="tel:0919006030" class="px-3.5 py-2 rounded-sm bg-[#0284C7] text-white text-xs font-black">
          Hotline: 0919 006 030
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative py-20 px-4 bg-slate-900 text-white text-center">
    <div class="max-w-3xl mx-auto space-y-4">
      <span class="px-4 py-1 rounded-sm bg-[#16A34A] text-white text-xs font-bold uppercase tracking-widest inline-block">
        DKRP REALTY
      </span>
      <h1 class="text-3xl sm:text-5xl font-black uppercase text-white">
        NHÀ MỚI CỦA BẠN
      </h1>
      <p class="text-slate-300 text-xs sm:text-sm">
        Danh Khôi đồng hành kiến tạo không gian sống đỉnh cao cho mọi gia đình Việt.
      </p>
    </div>
  </section>

  <!-- DANH SÁCH DỰ ÁN TỪ MYSQL -->
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-8">
    <div class="text-center space-y-2">
      <span class="px-3 py-1 rounded-sm bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-wider inline-block">
        DỰ ÁN
      </span>
      <h2 class="text-2xl font-black text-slate-900 uppercase">DỰ ÁN TIÊU BIỂU</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($properties as $p): ?>
        <div class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-52 object-cover">
          <div class="p-5 space-y-2">
            <span class="text-[10px] font-black text-[#0284C7] uppercase"><?php echo htmlspecialchars($p['type'] ?? 'Dự Án DKRP'); ?></span>
            <h3 class="text-xs font-black text-slate-900 uppercase min-h-[34px]"><?php echo htmlspecialchars($p['title']); ?></h3>
            <p class="text-xs text-slate-500"><?php echo htmlspecialchars($p['location']); ?></p>
            <div class="pt-2 border-t flex justify-between items-center text-xs">
              <span class="font-black text-[#E11D48] text-sm"><?php echo htmlspecialchars($p['price']); ?></span>
              <span class="text-slate-400 font-bold"><?php echo htmlspecialchars($p['area']); ?></span>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="w-full bg-[#0B1A30] text-white py-6 px-4 text-xs text-center border-t border-slate-800">
    © 2026 Bản quyền thuộc về <strong>TEMPLATEBDS</strong> — Mẫu Giao Diện: <strong>BDS-10 (PHP & MySQL Standalone)</strong>
  </footer>

  <script>lucide.createIcons();</script>
</body>
</html>