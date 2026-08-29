<?php
require_once 'config/db.php';

// Lấy danh sách sản phẩm từ MySQL hoặc dùng demo Đại Phát Land
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id ASC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['id' => 1, 'title' => 'Khu Đô Thị Hoàng Huy New City Bắc Sông Cấm', 'type' => 'Khu Đô Thị', 'price' => '3.85 Tỷ / Lô', 'area' => '90 m²', 'location' => 'Xã Tân Dương, Thủy Nguyên, Hải Phòng', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
        ['id' => 2, 'title' => 'Khu Đô Thị Belhomes Vsip Thủy Nguyên Hải Phòng', 'type' => 'Nhà Phố Xanh', 'price' => '3.20 Tỷ / Căn', 'area' => '75 m²', 'location' => 'Đô thị Vsip, An Lư, Thủy Nguyên', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'],
        ['id' => 3, 'title' => 'Shophouse Hoàng Huy Grand Tower Hải Phòng', 'type' => 'Shophouse', 'price' => '4.80 Tỷ / Căn', 'area' => '100 m²', 'location' => 'Sở Dầu, Hồng Bàng', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ĐẠI PHÁT LAND — PHP & MySQL Standalone Edition</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-white text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-[#0F4C81] selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <a href="index.php" class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#0F4C81] rounded-sm flex items-center justify-center text-white font-black text-xl">
          <i data-lucide="building-2" class="w-5 h-5 text-[#F97316]"></i>
        </div>
        <div>
          <span class="text-xl font-black text-[#0F4C81]">ĐẠI PHÁT LAND</span>
          <span class="text-[9px] font-bold text-slate-500 uppercase block">BĐS THỦY NGUYÊN HẢI PHÒNG</span>
        </div>
      </a>

      <div class="flex items-center gap-3">
        <a href="tel:0917858885" class="px-3.5 py-2 rounded-sm bg-[#F97316] text-white text-xs font-black">
          Hotline: 0917.85.88.85
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative py-16 px-4 bg-[#0B3056] text-white text-center">
    <div class="max-w-3xl mx-auto space-y-3">
      <h1 class="text-2xl sm:text-4xl font-black uppercase text-[#F97316]">
        BẤT ĐỘNG SẢN THỦY NGUYÊN
      </h1>
      <p class="text-slate-300 text-xs sm:text-sm">
        Phân phối dự án đất nền và nhà phố trọng điểm TP Thủy Nguyên Hải Phòng.
      </p>
    </div>
  </section>

  <!-- DANH SÁCH BẤT ĐỘNG SẢN TỪ MYSQL -->
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-6">
    <div class="border-b pb-3">
      <h2 class="text-lg font-black text-[#0F4C81] uppercase">DANH SÁCH SẢN PHẨM MỚI NHẤT</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($properties as $p): ?>
        <div class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-48 object-cover">
          <div class="p-4 space-y-1.5">
            <span class="text-[10px] font-black text-[#F97316] uppercase"><?php echo htmlspecialchars($p['type'] ?? 'BĐS Hải Phòng'); ?></span>
            <h3 class="text-xs font-black text-slate-900 uppercase min-h-[34px]"><?php echo htmlspecialchars($p['title']); ?></h3>
            <p class="text-xs text-slate-500"><?php echo htmlspecialchars($p['location']); ?></p>
            <div class="pt-2 border-t flex justify-between items-center text-xs">
              <span class="font-black text-[#EA580C] text-sm"><?php echo htmlspecialchars($p['price']); ?></span>
              <span class="text-slate-400 font-bold"><?php echo htmlspecialchars($p['area']); ?></span>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="w-full bg-[#0B3056] text-white py-6 px-4 text-xs text-center border-t border-slate-800">
    © 2026 Bản quyền thuộc về <strong>TEMPLATEBDS</strong> — Mẫu Giao Diện: <strong>BDS-13 (PHP & MySQL Standalone)</strong>
  </footer>

  <script>lucide.createIcons();</script>
</body>
</html>