<?php
/**
 * BDS-18: Vixyo Architecture & Luxury Real Estate (Standalone PHP & MySQL)
 */

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds18_vixyo';

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
            'title' => 'Dinh Thự Sinh Thái The Riviera Nam Sài Gòn',
            'category' => 'Biệt Thự',
            'price' => '38.5 Tỷ VNĐ',
            'area' => '450 m²',
            'location' => 'Khu Biệt Thự Phú Gia, Quận 7, TP.HCM',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
        ],
        [
            'id' => 2,
            'title' => 'Penthouse Duplex Grand Marina Ba Son',
            'category' => 'Penthouse',
            'price' => '65.0 Tỷ VNĐ',
            'area' => '380 m²',
            'location' => 'Số 2 Tôn Đức Thắng, Quận 1, TP.HCM',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
        ],
        [
            'id' => 3,
            'title' => 'Biệt Thự Đồi Thông The Cloud Villa Đà Lạt',
            'category' => 'Biệt Thự',
            'price' => '24.5 Tỷ VNĐ',
            'area' => '520 m²',
            'location' => 'Đường Mimosa, TP. Đà Lạt, Lâm Đồng',
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
  <title>Vixyo Architecture & Real Estate | BDS-18 PHP</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0A0A0A] text-slate-100 flex flex-col min-h-screen">

  <header class="sticky top-0 z-40 bg-[#0A0A0A]/95 border-b border-white/10 p-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center text-slate-950 font-black">V</div>
        <span class="text-2xl font-serif font-black text-white">Vixyo</span>
      </a>
      <div class="text-xs font-bold text-amber-400">Hotline: 0919 006 030</div>
    </div>
  </header>

  <main class="py-12 flex-1 max-w-7xl mx-auto px-4 space-y-8">
    <h2 class="text-2xl font-serif font-black uppercase text-white">DANH MỤC DỰ ÁN NGHỆ THUẬT VIXYO</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($projects as $proj): ?>
      <div class="bg-[#18181B] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between">
        <img src="<?php echo htmlspecialchars($proj['image']); ?>" alt="" class="w-full h-48 object-cover">
        <div class="p-4 space-y-2">
          <span class="text-[10px] text-amber-400 uppercase font-bold"><?php echo htmlspecialchars($proj['category']); ?></span>
          <h3 class="text-sm font-black text-white"><?php echo htmlspecialchars($proj['title']); ?></h3>
          <p class="text-xs text-slate-400">📍 <?php echo htmlspecialchars($proj['location']); ?></p>
          <div class="pt-2 border-t border-white/10 flex justify-between items-center">
            <span class="text-sm font-black text-amber-400"><?php echo htmlspecialchars($proj['price']); ?></span>
            <button onclick="alert('Đang kết nối chuyên gia...');" class="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold uppercase rounded-sm">Chi Tiết ›</button>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </main>

  <footer class="bg-[#050505] text-slate-500 text-xs py-8 border-t border-white/10 text-center">
    © TEMPLATEBDS — Nền tảng phân phối website BĐS chuyên nghiệp. Mẫu BDS-18 (Vixyo Architecture)
  </footer>

</body>
</html>