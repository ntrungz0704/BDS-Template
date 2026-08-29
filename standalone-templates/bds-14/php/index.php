<?php
require_once 'config/db.php';

// Lấy danh sách sản phẩm từ MySQL hoặc dùng demo WintLand
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id ASC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['id' => 1, 'title' => 'Bán Nhà Phố Hiện Đại Mặt Tiền Nguyễn Trãi Quận 1', 'type' => 'Nhà Phố', 'price' => '8.50 Tỷ VNĐ', 'area' => '95 m²', 'location' => 'Nguyễn Trãi, Quận 1, TP.HCM', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
        ['id' => 2, 'title' => 'Căn Hộ Nghỉ Dưỡng View Biển Mỹ Khê The Sang Residence', 'type' => 'Căn Hộ', 'price' => '3.45 Tỷ VNĐ', 'area' => '72 m²', 'location' => 'Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng', 'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
        ['id' => 3, 'title' => 'Biệt Thự Vườn Sinh Thái Ven Sông Hương Cố Đô Huế', 'type' => 'Biệt Thự', 'price' => '6.20 Tỷ VNĐ', 'area' => '280 m²', 'location' => 'Kim Long, TP. Huế', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WINTLAND — PHP & MySQL Standalone Edition</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-white text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-[#65A30D] selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <a href="index.php" class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#65A30D] rounded-sm flex items-center justify-center text-white font-black text-xl">
          <i data-lucide="home" class="w-5 h-5 text-white"></i>
        </div>
        <div>
          <span class="text-xl font-black text-[#4D7C0F]">WINTLAND</span>
          <span class="text-[9px] font-bold text-slate-500 uppercase block">REAL ESTATE PLATFORM</span>
        </div>
      </a>

      <div class="flex items-center gap-3">
        <a href="tel:0919006030" class="px-3.5 py-2 rounded-sm bg-[#65A30D] text-white text-xs font-black">
          Hotline: 0919 006 030
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative py-16 px-4 bg-[#0F172A] text-white text-center">
    <div class="max-w-3xl mx-auto space-y-3">
      <h1 class="text-2xl sm:text-4xl font-black uppercase text-white">
        WINTLAND REAL ESTATE
      </h1>
      <p class="text-slate-300 text-xs sm:text-sm">
        Sàn giao dịch và phân phối bất động sản toàn quốc.
      </p>
    </div>
  </section>

  <!-- DANH SÁCH SẢN PHẨM TỪ MYSQL -->
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-6">
    <div class="flex items-center gap-3 border-b pb-3">
      <div class="w-1.5 h-6 bg-[#65A30D] rounded-sm"></div>
      <h2 class="text-lg font-black text-slate-900 uppercase">BẤT ĐỘNG SẢN MỚI NHẤT</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($properties as $p): ?>
        <div class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-48 object-cover">
          <div class="p-4 space-y-1.5">
            <span class="text-[10px] font-black text-[#65A30D] uppercase"><?php echo htmlspecialchars($p['type'] ?? 'BĐS WintLand'); ?></span>
            <h3 class="text-xs font-black text-slate-900 uppercase min-h-[34px]"><?php echo htmlspecialchars($p['title']); ?></h3>
            <p class="text-xs text-slate-500"><?php echo htmlspecialchars($p['location']); ?></p>
            <div class="pt-2 border-t flex justify-between items-center text-xs">
              <span class="font-black text-[#65A30D] text-sm"><?php echo htmlspecialchars($p['price']); ?></span>
              <span class="text-slate-400 font-bold"><?php echo htmlspecialchars($p['area']); ?></span>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="w-full bg-[#0F172A] text-white py-6 px-4 text-xs text-center border-t border-slate-800">
    © 2026 Bản quyền thuộc về <strong>TEMPLATEBDS</strong> — Mẫu Giao Diện: <strong>BDS-14 (PHP & MySQL Standalone)</strong>
  </footer>

  <script>lucide.createIcons();</script>
</body>
</html>