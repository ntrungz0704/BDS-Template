<?php
/**
 * BDS-17: Beverly Hills Hạ Long (Standalone PHP & MySQL)
 * Quần thể căn hộ khách sạn 5 sao & Dinh thự đồi Bãi Cháy
 */

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds17_beverlyhills';

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
            'title' => 'Căn Hộ Studio Nghỉ Dưỡng View Trực Diện Vịnh Hạ Long',
            'code' => 'BH-ST08',
            'type' => 'Căn Hộ Studio',
            'floor' => 'Tầng 08 - 12',
            'price' => '1.65 Tỷ VNĐ',
            'area' => '42 m²',
            'view' => 'View Vịnh Hạ Long & Cầu Bãi Cháy',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
        ],
        [
            'id' => 2,
            'title' => 'Căn Hộ 1 Phòng Ngủ View Vòng Quay Mặt Trời Sun Wheel',
            'code' => 'BH-1P15',
            'type' => '1 Phòng Ngủ',
            'floor' => 'Tầng 14 - 18',
            'price' => '2.35 Tỷ VNĐ',
            'area' => '58 m²',
            'view' => 'View Sun Wheel & Công Viên Rồng',
            'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
        ],
        [
            'id' => 3,
            'title' => 'Căn Hộ Góc 2 Phòng Ngủ Panorama 2 Mặt Thoáng Hướng Biển',
            'code' => 'BH-2P09',
            'type' => '2 Phòng Ngủ',
            'floor' => 'Tầng 09 - 16',
            'price' => '3.60 Tỷ VNĐ',
            'area' => '82 m²',
            'view' => 'View Panorama 270 độ Vịnh Hạ Long',
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
  <title>Beverly Hills Hạ Long — Đỉnh Cao Nghỉ Dưỡng | BDS-17 PHP</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .bg-bronze { background-color: #9A7B4F; }
    .bg-bronze-dark { background-color: #855828; }
    .text-bronze { color: #9A7B4F; }
  </style>
</head>
<body class="bg-white text-slate-800 flex flex-col min-h-screen">

  <header class="sticky top-0 z-40 bg-white shadow-md border-b border-amber-200">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-[#C5A880] to-[#855828] flex items-center justify-center text-white font-serif font-black text-xl shadow">👑</div>
        <div>
          <span class="text-xl sm:text-2xl font-serif font-black text-[#855828] leading-none block">BEVERLY HILLS <span class="text-slate-900">HẠ LONG</span></span>
          <span class="text-[8px] font-bold text-amber-700 uppercase tracking-widest block mt-0.5">ĐỈNH CAO NGHỈ DƯỠNG THƯỢNG LƯU</span>
        </div>
      </a>
      <div>Hotline: <strong class="text-red-600">0919 006 030</strong></div>
    </div>
  </header>

  <main class="py-8 flex-1">
    <div class="max-w-7xl mx-auto px-4 space-y-8">
      <div class="border-b-2 border-[#9A7B4F] pb-2">
        <h2 class="text-xl font-serif font-black text-slate-900 uppercase">BẢNG HÀNG CĂN HỘ BEVERLY HILLS HẠ LONG</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <?php foreach ($units as $unit): ?>
        <div class="bg-white border border-slate-300 shadow-sm flex flex-col justify-between">
          <img src="<?php echo htmlspecialchars($unit['image']); ?>" alt="" class="w-full h-48 object-cover">
          <div class="p-4 space-y-2">
            <h3 class="text-xs font-black text-slate-900 uppercase"><?php echo htmlspecialchars($unit['title']); ?></h3>
            <p class="text-xs text-slate-600">Mã căn: <?php echo htmlspecialchars($unit['code']); ?> • Diện tích: <?php echo htmlspecialchars($unit['area']); ?></p>
            <p class="text-xs text-amber-800">🌊 <?php echo htmlspecialchars($unit['view']); ?></p>
            <div class="pt-2 border-t flex justify-between items-center">
              <span class="text-sm font-black text-red-600"><?php echo htmlspecialchars($unit['price']); ?></span>
              <button onclick="alert('Đang kết nối chuyên viên...');" class="px-3 py-1 bg-bronze text-white text-xs font-bold uppercase">Chi Tiết ›</button>
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </main>

  <footer class="bg-[#1A1612] text-slate-300 text-xs py-8 border-t border-amber-900/40 text-center">
    © TEMPLATEBDS — Nền tảng phân phối website BĐS chuyên nghiệp. Mẫu BDS-17
  </footer>

</body>
</html>