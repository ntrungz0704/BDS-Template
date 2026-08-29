<?php
require_once 'config/db.php';

// Lấy danh sách sản phẩm từ MySQL hoặc dùng demo Linkhouse Miền Trung
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id ASC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['id' => 1, 'title' => 'DỰ ÁN KHU ĐÔ THỊ CẨM LỆ RIVERSIDE ĐÀ NẴNG', 'type' => 'Đất Nền Dự Án', 'price' => '1.85 Tỷ / Lô', 'area' => '100 m²', 'location' => 'Đường Nguyễn Tri Phương, Q. Cẩm Lệ, Đà Nẵng', 'image' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
        ['id' => 2, 'title' => 'DỰ ÁN BIỆT THỰ NGHỈ DƯỠNG SƠN TRÀ OCEAN VIEW', 'type' => 'Biệt Thự Biển', 'price' => '5.40 Tỷ / Căn', 'area' => '250 m²', 'location' => 'Bán đảo Sơn Trà, TP. Đà Nẵng', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'],
        ['id' => 3, 'title' => 'ĐẤT NỀN BIỂN NHƠN HỘI NEW CITY QUY NHƠN', 'type' => 'Đất Nền Biển', 'price' => '1.45 Tỷ / Nền', 'area' => '90 m²', 'location' => 'Khu kinh tế Nhơn Hội, TP. Quy Nhơn', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NHÀ ĐẤT MIỀN TRUNG — PHP & MySQL Standalone Edition</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-[#F8FAFC] text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-[#16A34A] selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <a href="index.php" class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#16A34A] rounded-sm flex items-center justify-center text-white font-black text-xl">
          MT
        </div>
        <div>
          <span class="text-xl font-black text-[#15803D]">NHÀ ĐẤT MIỀN TRUNG</span>
          <span class="text-[9px] font-bold text-slate-500 uppercase block">LINKHOUSE MIỀN TRUNG</span>
        </div>
      </a>

      <div class="flex items-center gap-3">
        <a href="tel:0919006030" class="px-3.5 py-2 rounded-sm bg-[#16A34A] text-white text-xs font-black">
          Hotline: 0919 006 030
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative py-14 px-4 bg-[#0F382A] text-white text-center">
    <div class="max-w-3xl mx-auto space-y-3">
      <h1 class="text-2xl sm:text-4xl font-black uppercase text-white">
        BẤT ĐỘNG SẢN LINKHOUSE MIỀN TRUNG
      </h1>
      <p class="text-emerald-100 text-xs sm:text-sm">
        320 Đường 2/9, Q. Hải Châu, TP. Đà Nẵng • Hotline: 0919.006.030
      </p>
    </div>
  </section>

  <!-- DANH SÁCH BẤT ĐỘNG SẢN TỪ MYSQL -->
  <section class="max-w-7xl mx-auto px-4 py-10 space-y-6">
    <div class="bg-[#0F382A] text-white px-5 py-3 rounded-sm">
      <h2 class="text-xs sm:text-sm font-black uppercase tracking-wider">TIN NỔI BẬT</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($properties as $p): ?>
        <div class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-48 object-cover">
          <div class="p-4 space-y-1.5">
            <span class="text-[10px] font-bold text-[#16A34A] uppercase"><?php echo htmlspecialchars($p['type'] ?? 'BĐS Miền Trung'); ?></span>
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
  <footer class="w-full bg-[#0F172A] text-white py-6 px-4 text-xs text-center border-t border-slate-800">
    © 2026 Bản quyền thuộc về <strong>TEMPLATEBDS</strong> — Mẫu Giao Diện: <strong>BDS-11 (PHP & MySQL Standalone)</strong>
  </footer>

  <script>lucide.createIcons();</script>
</body>
</html>