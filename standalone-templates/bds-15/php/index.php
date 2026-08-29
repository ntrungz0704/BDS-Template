<?php
require_once 'config/db.php';

// Lấy danh sách sản phẩm từ MySQL hoặc dùng demo Lupul Group
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id ASC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['id' => 1, 'title' => 'The Flora Avenue Sky Living Phú Mỹ Hưng', 'type' => 'Căn Hộ Cao Cấp', 'price' => '3.85 Tỷ VNĐ', 'area' => '85 m²', 'location' => 'Nguyễn Văn Linh, Quận 7, TP.HCM', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
        ['id' => 2, 'title' => 'Căn Hộ Nghỉ Dưỡng Vũng Tàu Melody Bãi Sau', 'type' => 'Căn Hộ Biển', 'price' => '2.15 Tỷ VNĐ', 'area' => '60 m²', 'location' => 'Võ Thị Sáu, TP. Vũng Tàu', 'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
        ['id' => 3, 'title' => 'Vinhomes Grand Park Quận 9 Origami', 'type' => 'Căn Hộ Thông Minh', 'price' => '2.90 Tỷ VNĐ', 'area' => '70 m²', 'location' => 'Nguyễn Xiển, TP. Thủ Đức', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LUPUL GROUP — PHP & MySQL Standalone Edition</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-white text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-[#0D9488] selection:text-white">

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <a href="index.php" class="flex items-center gap-2.5">
        <div class="w-9 h-9 bg-[#0D9488] flex items-center justify-center text-white font-black">
          <i data-lucide="building-2" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-xl font-black text-[#0D9488]">LUPUL GROUP</span>
          <span class="text-[8px] font-bold text-slate-400 uppercase block">REAL ESTATE</span>
        </div>
      </a>

      <div class="flex items-center gap-3">
        <a href="tel:0982078203" class="px-4 py-1.5 bg-[#E11D48] text-white text-xs font-black">
          Hotline: 0982.078.203
        </a>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="relative py-16 px-4 bg-[#0D9488] text-white text-center">
    <div class="max-w-3xl mx-auto space-y-3">
      <h1 class="text-2xl sm:text-4xl font-black uppercase text-white">
        LUPUL GROUP REAL ESTATE
      </h1>
      <p class="text-teal-100 text-xs sm:text-sm">
        Tập đoàn đầu tư và phân phối bất động sản nghỉ dưỡng & đô thị sinh thái.
      </p>
    </div>
  </section>

  <!-- DANH SÁCH SẢN PHẨM TỪ MYSQL -->
  <section class="max-w-7xl mx-auto px-4 py-12 space-y-6">
    <div class="border-b-2 border-[#0D9488] pb-2">
      <h2 class="text-lg font-black text-[#0D9488] uppercase">DỰ ÁN TIÊU BIỂU</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <?php foreach ($properties as $p): ?>
        <div class="bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-48 object-cover border-b">
          <div class="p-4 space-y-1.5">
            <span class="text-[10px] font-black text-[#0D9488] uppercase"><?php echo htmlspecialchars($p['type'] ?? 'BĐS Lupul Group'); ?></span>
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
    © 2026 Bản quyền thuộc về <strong>TEMPLATEBDS</strong> — Mẫu Giao Diện: <strong>BDS-15 (PHP & MySQL Standalone)</strong>
  </footer>

  <script>lucide.createIcons();</script>
</body>
</html>