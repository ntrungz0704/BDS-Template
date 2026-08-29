<?php
require_once 'config/db.php';

// Lấy danh sách sản phẩm từ MySQL nếu có kết nối, hoặc dùng dữ liệu demo BDS-09
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id ASC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['id' => 1, 'title' => 'Studio Suite Panorama #ST-1808', 'type' => 'Studio 45.5m²', 'price' => '2.35 Tỷ VNĐ', 'area' => '45.5 m²', 'location' => 'Bán Đảo An Viên, Nha Trang', 'image' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1000&q=80'],
        ['id' => 2, 'title' => 'Executive 1BR Oceanview #EX-2205', 'type' => '1 Phòng Ngủ 58.2m²', 'price' => '3.10 Tỷ VNĐ', 'area' => '58.2 m²', 'location' => 'Bán Đảo An Viên, Nha Trang', 'image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1000&q=80'],
        ['id' => 3, 'title' => 'Signature 2BR Grand Corner #SG-2802', 'type' => '2 Phòng Ngủ 78.6m²', 'price' => '4.45 Tỷ VNĐ', 'area' => '78.6 m²', 'location' => 'Bán Đảo An Viên, Nha Trang', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80'],
        ['id' => 4, 'title' => 'Royal Ocean Suite #RY-3501', 'type' => '3 Phòng Ngủ 115.8m²', 'price' => '6.85 Tỷ VNĐ', 'area' => '115.8 m²', 'location' => 'Bán Đảo An Viên, Nha Trang', 'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80'],
        ['id' => 5, 'title' => 'Imperial Penthouse #PH-3901 (Đỉnh Tháp)', 'type' => 'Sky Villa 268m²', 'price' => '18.50 Tỷ VNĐ', 'area' => '268 m²', 'location' => 'Bán Đảo An Viên, Nha Trang', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80'],
        ['id' => 6, 'title' => 'Dual Key Harmony #DK-1604', 'type' => 'Dual Key 92.5m²', 'price' => '5.20 Tỷ VNĐ', 'area' => '92.5 m²', 'location' => 'Bán Đảo An Viên, Nha Trang', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AN VIÊN RESIDENCE — PHP & MySQL Standalone Edition</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-[#FDFBF7] text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-[#0B132B] text-white border-b border-amber-500/30 shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
      <a href="index.php" class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-sm bg-gradient-to-br from-[#D4AF37] to-[#92400E] p-0.5 flex items-center justify-center">
          <div class="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
            <i data-lucide="anchor" class="w-5 h-5 text-[#D4AF37]"></i>
          </div>
        </div>
        <div>
          <span class="text-lg font-serif font-black tracking-wider text-[#FDE047]">AN VIÊN RESIDENCE</span>
          <span class="text-[9px] tracking-widest text-[#D4AF37] block uppercase font-bold">BIỂU TƯỢNG NHA TRANG HIỆN ĐẠI</span>
        </div>
      </a>

      <div class="flex items-center gap-3">
        <a href="tel:0919006030" class="px-3.5 py-2 rounded-sm bg-amber-500/10 border border-amber-500/40 text-[#FDE047] text-xs font-black">
          Hotline: 0919 006 030
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative py-20 px-4 bg-[#070D1E] text-white text-center">
    <div class="max-w-3xl mx-auto space-y-4">
      <span class="px-4 py-1.5 rounded-sm bg-slate-900 text-[#FDE047] text-xs font-bold uppercase tracking-widest border border-amber-500/40 inline-block">
        DỰ ÁN CĂN HỘ CAO CẤP NHA TRANG
      </span>
      <h1 class="text-3xl sm:text-5xl font-serif font-black uppercase text-white">
        BIỂU TƯỢNG CỦA NHA TRANG HIỆN ĐẠI
      </h1>
      <p class="text-slate-300 text-xs sm:text-sm">
        Tổ hợp căn hộ nghỉ dưỡng và bến du thuyền 5 sao đẳng cấp quốc tế tại bán đảo An Viên.
      </p>
    </div>
  </section>

  <!-- DANH SÁCH SẢN PHẨM TỪ MYSQL -->
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-8">
    <div class="text-center space-y-2">
      <h2 class="text-2xl font-serif font-black text-[#B45309] uppercase">DANH MỤC CĂN HỘ CAO CẤP</h2>
      <div class="w-20 h-0.5 bg-[#D4AF37] mx-auto"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($properties as $p): ?>
        <div class="bg-white rounded-md overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-56 object-cover">
          <div class="p-5 space-y-2">
            <span class="text-[10px] font-black text-[#B45309] uppercase"><?php echo htmlspecialchars($p['type'] ?? 'Căn Hộ 5★'); ?></span>
            <h3 class="text-sm font-black text-slate-900 uppercase"><?php echo htmlspecialchars($p['title']); ?></h3>
            <p class="text-xs text-slate-500"><?php echo htmlspecialchars($p['location']); ?></p>
            <div class="pt-2 border-t flex justify-between items-center text-xs">
              <span class="font-black text-[#B45309] text-sm"><?php echo htmlspecialchars($p['price']); ?></span>
              <span class="text-slate-400 font-bold"><?php echo htmlspecialchars($p['area']); ?></span>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="w-full bg-[#07132B] text-white py-6 px-4 text-xs text-center border-t border-slate-800">
    © 2026 Bản quyền thuộc về <strong>TEMPLATEBDS</strong> — Mẫu Giao Diện: <strong>BDS-09 (PHP & MySQL Standalone)</strong>
  </footer>

  <script>lucide.createIcons();</script>
</body>
</html>