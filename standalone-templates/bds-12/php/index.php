<?php
require_once 'config/db.php';

// Lấy danh sách sản phẩm từ MySQL hoặc dùng demo Sonasea Vân Đồn
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id ASC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['id' => 1, 'title' => 'Singapore Shophouse Mặt Tiền Đại Lộ 30m', 'type' => 'Shophouse 480m²', 'price' => '7.85 Tỷ VNĐ', 'area' => '120 m² (XD: 480m²)', 'location' => 'Đại Lộ Ánh Sáng, Sonasea Vân Đồn', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80'],
        ['id' => 2, 'title' => 'Căn Hộ Khách Sạn Wyndham Garden Sonasea', 'type' => 'Condotel 5 Sao', 'price' => '2.15 Tỷ VNĐ', 'area' => '45.5 m²', 'location' => 'Vịnh Bái Tử Long, Sonasea Vân Đồn', 'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&q=80'],
        ['id' => 3, 'title' => 'Nhà Phố Thương Mại Silk Path Vân Đồn', 'type' => 'Phố Đi Bộ', 'price' => '6.20 Tỷ VNĐ', 'area' => '100 m² (XD: 360m²)', 'location' => 'Phân khu Silk Path, Sonasea Vân Đồn', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80'],
        ['id' => 4, 'title' => 'Biệt Thự Đơn Lập Sonasea Ocean Villa', 'type' => 'Biệt Thự Đảo Cọ', 'price' => '16.50 Tỷ VNĐ', 'area' => '350 m²', 'location' => 'Bờ biển riêng 2.2km, Sonasea Vân Đồn', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SONASEA VÂN ĐỒN — PHP & MySQL Standalone Edition</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-white text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-[#0369A1] selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <a href="index.php" class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#0369A1] rounded-sm flex items-center justify-center text-[#FDE047] font-black text-xl">
          <i data-lucide="anchor" class="w-5 h-5 text-[#FDE047]"></i>
        </div>
        <div>
          <span class="text-lg font-serif font-black text-[#0369A1]">SONASEA VÂN ĐỒN</span>
          <span class="text-[9px] font-bold text-amber-600 uppercase block">HARBOR CITY — CEO GROUP</span>
        </div>
      </a>

      <div class="flex items-center gap-3">
        <a href="tel:0919006030" class="px-3.5 py-2 rounded-sm bg-[#0369A1] text-white text-xs font-black">
          Hotline: 0919 006 030
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative py-16 px-4 bg-[#0B1A30] text-white text-center">
    <div class="max-w-3xl mx-auto space-y-3">
      <span class="px-4 py-1 rounded-sm bg-white/10 text-[#FDE047] text-xs font-bold uppercase tracking-widest inline-block border border-white/20">
        ĐẠI DỰ ÁN 358.5 HA
      </span>
      <h1 class="text-2xl sm:text-4xl font-serif font-black uppercase text-white">
        SONASEA VÂN ĐỒN HARBOR CITY
      </h1>
      <p class="text-slate-300 text-xs sm:text-sm">
        Thương cảng quốc tế đầu tiên và duy nhất tại Vịnh Bái Tử Long, Quảng Ninh.
      </p>
    </div>
  </section>

  <!-- DANH SÁCH SẢN PHẨM TỪ MYSQL -->
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-8">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-serif font-black text-[#0369A1] uppercase">DÒNG SẢN PHẨM TIÊU BIỂU</h2>
      <div class="w-20 h-0.5 bg-[#D4AF37] mx-auto"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <?php foreach ($properties as $p): ?>
        <div class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-48 object-cover">
          <div class="p-4 space-y-1.5">
            <span class="text-[10px] font-black text-[#0369A1] uppercase"><?php echo htmlspecialchars($p['type'] ?? 'Sản Phẩm Sonasea'); ?></span>
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
    © 2026 Bản quyền thuộc về <strong>TEMPLATEBDS</strong> — Mẫu Giao Diện: <strong>BDS-12 (PHP & MySQL Standalone)</strong>
  </footer>

  <script>lucide.createIcons();</script>
</body>
</html>