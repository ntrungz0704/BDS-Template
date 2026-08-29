<?php
/**
 * BDS-21: Homeo Realty (Standalone PHP & MySQL)
 */

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds21_homeo';

$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);
$properties = [];

if ($conn && !$conn->connect_error) {
    $conn->set_charset("utf8mb4");
    $res = $conn->query("SELECT * FROM properties ORDER BY id ASC");
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $properties[] = $row;
        }
    }
}

if (empty($properties)) {
    $properties = [
        [
            'id' => 1,
            'title' => 'Biệt Thự Đơn Lập The Manor Central Park Hoàng Mai',
            'category' => 'ban',
            'type' => 'Biệt Thự',
            'location' => 'Hoàng Mai, Hà Nội',
            'price' => '28.5 Tỷ VNĐ',
            'area' => '210 m²',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
        ],
        [
            'id' => 2,
            'title' => 'Căn Hộ Masteri Centre Point Vinhomes Grand Park Q9',
            'category' => 'ban',
            'type' => 'Căn Hộ',
            'location' => 'TP. Thủ Đức, TP.HCM',
            'price' => '3.65 Tỷ VNĐ',
            'area' => '72 m²',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
        ],
        [
            'id' => 3,
            'title' => 'Penthouse Duplex Dát Vàng Ba Son Quận 1 Sài Gòn',
            'category' => 'ban',
            'type' => 'Penthouse',
            'location' => 'Quận 1, TP.HCM',
            'price' => '48.0 Tỷ VNĐ',
            'area' => '320 m²',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Homeo Realty | BDS-21 PHP</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-800 flex flex-col min-h-screen">

  <header class="sticky top-0 z-40 bg-[#1E40AF] text-white p-4 shadow border-b border-blue-400/30">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-white text-[#1E40AF] flex items-center justify-center font-black">🏠</div>
        <span class="text-xl font-serif font-black text-white">HOMEO REALTY</span>
      </a>
      <div class="text-xs font-bold text-rose-300">Hotline: 0919 006 030</div>
    </div>
  </header>

  <main class="py-12 flex-1 max-w-7xl mx-auto px-4 space-y-8">
    <h2 class="text-2xl font-serif font-black uppercase text-[#1E40AF]">BẤT ĐỘNG SẢN NỔI BẬT HOMEO REALTY</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($properties as $p): ?>
      <div class="bg-white border border-slate-300 shadow-sm flex flex-col justify-between">
        <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-48 object-cover">
        <div class="p-4 space-y-2">
          <span class="text-[10px] text-[#1E40AF] font-black uppercase"><?php echo htmlspecialchars($p['type']); ?></span>
          <h3 class="text-xs font-black text-slate-900"><?php echo htmlspecialchars($p['title']); ?></h3>
          <p class="text-xs text-slate-600">Vị trí: <?php echo htmlspecialchars($p['location']); ?> • DT: <?php echo htmlspecialchars($p['area']); ?></p>
          <div class="pt-2 border-t flex justify-between items-center">
            <span class="text-sm font-black text-red-600"><?php echo htmlspecialchars($p['price']); ?></span>
            <button onclick="alert('Đang kết nối chuyên viên...');" class="px-3 py-1 bg-[#1E40AF] text-white text-xs font-bold uppercase">Chi Tiết ›</button>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </main>

  <footer class="bg-slate-950 text-slate-400 text-xs py-8 border-t border-slate-800 text-center">
    © TEMPLATEBDS — Nền tảng phân phối website BĐS chuyên nghiệp. Mẫu BDS-21 (Homeo Realty)
  </footer>

</body>
</html>