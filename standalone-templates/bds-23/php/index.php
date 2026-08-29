<?php
/**
 * BDS-23: Minh Khai Apartments (Standalone PHP & MySQL)
 */

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds23_minhkhai';

$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);
$projects = [];

if ($conn && !$conn->connect_error) {
    $conn->set_charset("utf8mb4");
    $res = $conn->query("SELECT * FROM projects ORDER BY id ASC");
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $projects[] = $row;
        }
    }
}

if (empty($projects)) {
    $projects = [
        [
            'id' => 1,
            'title' => 'Vinhomes Times City & Park Hill',
            'slug' => 'vinhomes-times-city-park-hill',
            'address' => '458 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
            'price_range' => '3.8 - 14.5 Tỷ VNĐ',
            'area_range' => '53 - 178 m²',
            'developer' => 'Vingroup',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
        ],
        [
            'id' => 2,
            'title' => 'Green Pearl City Minh Khai',
            'slug' => 'green-pearl-city-minh-khai',
            'address' => '378 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
            'price_range' => '4.2 - 9.8 Tỷ VNĐ',
            'area_range' => '71 - 139 m²',
            'developer' => 'Phong Phú Corp',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
        ],
        [
            'id' => 3,
            'title' => 'Imperia Sky Garden 423 Minh Khai',
            'slug' => 'imperia-sky-garden-423-minh-khai',
            'address' => '423 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng, Hà Nội',
            'price_range' => '4.5 - 11.2 Tỷ VNĐ',
            'area_range' => '58 - 106 m²',
            'developer' => 'MIK Group',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dự Án Chung Cư Minh Khai | BDS-23 PHP</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-800 flex flex-col min-h-screen">

  <header class="sticky top-0 z-40 bg-[#0B132B] text-white p-4 shadow border-b border-amber-500/30">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-gradient-to-br from-[#E5B869] to-[#9A7B4F] text-slate-950 flex items-center justify-center font-black">🦅</div>
        <span class="text-xl font-serif font-black text-amber-300">MINH KHAI APARTMENTS</span>
      </a>
      <div class="text-xs font-bold text-amber-300">Hotline: 0919 006 030</div>
    </div>
  </header>

  <main class="py-12 flex-1 max-w-7xl mx-auto px-4 space-y-8">
    <h2 class="text-2xl font-serif font-black uppercase text-[#0B132B]">DỰ ÁN CHUNG CƯ MINH KHAI NỔI BẬT</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($projects as $p): ?>
      <div class="bg-white border border-slate-300 shadow-sm flex flex-col justify-between">
        <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-48 object-cover">
        <div class="p-4 space-y-2">
          <span class="text-[10px] text-[#B8860B] font-black uppercase"><?php echo htmlspecialchars($p['developer']); ?></span>
          <h3 class="text-xs font-black text-slate-900"><?php echo htmlspecialchars($p['title']); ?></h3>
          <p class="text-xs text-slate-600">Đ/C: <?php echo htmlspecialchars($p['address']); ?></p>
          <div class="pt-2 border-t flex justify-between items-center">
            <span class="text-sm font-black text-red-600"><?php echo htmlspecialchars($p['price_range']); ?></span>
            <button onclick="alert('Đang kết nối chuyên viên...');" class="px-3 py-1 bg-[#0B132B] text-amber-300 text-xs font-bold uppercase">Chi Tiết ›</button>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </main>

  <footer class="bg-slate-950 text-slate-400 text-xs py-8 border-t border-slate-800 text-center">
    © TEMPLATEBDS — Nền tảng phân phối website BĐS chuyên nghiệp. Mẫu BDS-23 (Minh Khai Apartments)
  </footer>

</body>
</html>