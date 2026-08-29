<?php
/**
 * BDS-22: HappyLand Resort & Condotel Nha Trang (Standalone PHP & MySQL)
 */

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds22_happyland';

$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);
$units = [];

if ($conn && !$conn->connect_error) {
    $conn->set_charset("utf8mb4");
    $res = $conn->query("SELECT * FROM units ORDER BY id ASC");
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $units[] = $row;
        }
    }
}

if (empty($units)) {
    $units = [
        [
            'id' => 1,
            'title' => 'Condotel Studio 1PN View Vịnh Biển Nha Trang',
            'code' => 'HLR-C0812',
            'zone' => 'Tháp Condotel ZoHotels',
            'type' => 'Condotel Studio 1PN',
            'price' => '2.35 Tỷ VNĐ',
            'area' => '45 m²',
            'view' => 'Vịnh Nha Trang',
            'image' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'
        ],
        [
            'id' => 2,
            'title' => 'Biệt Thự Biển Song Lập Vườn Dừa HappyLand',
            'code' => 'HLR-V05',
            'zone' => 'Phân Khu Biệt Thự Biển',
            'type' => 'Biệt Thự Biển',
            'price' => '16.8 Tỷ VNĐ',
            'area' => '240 m²',
            'view' => 'Mặt biển 30m',
            'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
        ],
        [
            'id' => 3,
            'title' => 'Biệt Thự Đơn Lập Ghềnh Đá Cliffside Villa',
            'code' => 'HLR-CV01',
            'zone' => 'Phân Khu Biệt Thự Biển',
            'type' => 'Biệt Thự Ghềnh Đá',
            'price' => '38.0 Tỷ VNĐ',
            'area' => '420 m²',
            'view' => 'Ghềnh đá view 270°',
            'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HappyLand Resort Nha Trang | BDS-22 PHP</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-800 flex flex-col min-h-screen">

  <header class="sticky top-0 z-40 bg-[#0E7490] text-white p-4 shadow border-b border-cyan-300/30">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-[#F97316] text-white flex items-center justify-center font-black">🌴</div>
        <span class="text-xl font-serif font-black text-amber-300">HAPPYLAND NHA TRANG</span>
      </a>
      <div class="text-xs font-bold text-amber-300">Hotline: 0919 006 030</div>
    </div>
  </header>

  <main class="py-12 flex-1 max-w-7xl mx-auto px-4 space-y-8">
    <h2 class="text-2xl font-serif font-black uppercase text-[#0E7490]">BẢNG HÀNG NGHỈ DƯỠNG HAPPYLAND RESORT</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($units as $u): ?>
      <div class="bg-white border border-slate-300 shadow-sm flex flex-col justify-between">
        <img src="<?php echo htmlspecialchars($u['image']); ?>" alt="" class="w-full h-48 object-cover">
        <div class="p-4 space-y-2">
          <span class="text-[10px] text-[#F97316] font-black uppercase"><?php echo htmlspecialchars($u['zone']); ?></span>
          <h3 class="text-xs font-black text-slate-900"><?php echo htmlspecialchars($u['title']); ?></h3>
          <p class="text-xs text-slate-600">Mã: <?php echo htmlspecialchars($u['code']); ?> • DT: <?php echo htmlspecialchars($u['area']); ?></p>
          <div class="pt-2 border-t flex justify-between items-center">
            <span class="text-sm font-black text-red-600"><?php echo htmlspecialchars($u['price']); ?></span>
            <button onclick="alert('Đang kết nối chuyên viên...');" class="px-3 py-1 bg-[#0E7490] text-amber-300 text-xs font-bold uppercase">Chi Tiết ›</button>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </main>

  <footer class="bg-slate-950 text-slate-400 text-xs py-8 border-t border-slate-800 text-center">
    © TEMPLATEBDS — Nền tảng phân phối website BĐS chuyên nghiệp. Mẫu BDS-22 (HappyLand Resort Nha Trang)
  </footer>

</body>
</html>