<?php
/**
 * BDS-19: Sunshine City Saigon (Standalone PHP & MySQL)
 */

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds19_sunshine';

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
            'title' => 'Căn Hộ Thông Minh 1 Phòng Ngủ Tòa S1 Venus View Sông',
            'code' => 'S1-0812',
            'tower' => 'Tòa S1 - Venus',
            'type' => '1 Phòng Ngủ',
            'price' => '3.45 Tỷ VNĐ',
            'area' => '52 m²',
            'view' => 'View Sông Cả Cấm',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
        ],
        [
            'id' => 2,
            'title' => 'Căn Hộ Góc 2 Phòng Ngủ Tòa S4 Mercury View Toàn Cảnh',
            'code' => 'S4-1806',
            'tower' => 'Tòa S4 - Mercury',
            'type' => '2 Phòng Ngủ',
            'price' => '4.85 Tỷ VNĐ',
            'area' => '76 m²',
            'view' => 'View Phú Mỹ Hưng',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
        ],
        [
            'id' => 3,
            'title' => 'Căn Hộ 3 Phòng Ngủ Hoàng Gia Tòa S7 Jupiter Suite VIP',
            'code' => 'S7-2802',
            'tower' => 'Tòa S7 - Jupiter',
            'type' => '3 Phòng Ngủ',
            'price' => '6.90 Tỷ VNĐ',
            'area' => '105 m²',
            'view' => 'View Sông Sài Gòn',
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
  <title>Sunshine City Saigon | BDS-19 PHP</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-800 flex flex-col min-h-screen">

  <header class="sticky top-0 z-40 bg-[#0F1E36] text-white p-4 shadow border-b border-amber-500/30">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-[#D4AF37] flex items-center justify-center text-slate-950 font-black">☀️</div>
        <span class="text-xl font-serif font-black text-amber-300">SUNSHINE CITY SAIGON</span>
      </a>
      <div class="text-xs font-bold text-amber-300">Hotline: 0919 006 030</div>
    </div>
  </header>

  <main class="py-12 flex-1 max-w-7xl mx-auto px-4 space-y-8">
    <h2 class="text-2xl font-serif font-black uppercase text-[#0F1E36]">BẢNG HÀNG CĂN HỘ 4.0 SUNSHINE CITY SAIGON</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($units as $unit): ?>
      <div class="bg-white border border-slate-300 shadow-sm flex flex-col justify-between">
        <img src="<?php echo htmlspecialchars($unit['image']); ?>" alt="" class="w-full h-48 object-cover">
        <div class="p-4 space-y-2">
          <span class="text-[10px] text-[#D4AF37] font-black uppercase"><?php echo htmlspecialchars($unit['tower']); ?></span>
          <h3 class="text-xs font-black text-slate-900"><?php echo htmlspecialchars($unit['title']); ?></h3>
          <p class="text-xs text-slate-600">Mã: <?php echo htmlspecialchars($unit['code']); ?> • DT: <?php echo htmlspecialchars($unit['area']); ?></p>
          <div class="pt-2 border-t flex justify-between items-center">
            <span class="text-sm font-black text-red-600"><?php echo htmlspecialchars($unit['price']); ?></span>
            <button onclick="alert('Đang kết nối chuyên viên...');" class="px-3 py-1 bg-[#0F1E36] text-amber-300 text-xs font-bold uppercase">Chi Tiết ›</button>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </main>

  <footer class="bg-[#0A1324] text-slate-400 text-xs py-8 border-t border-amber-500/30 text-center">
    © TEMPLATEBDS — Nền tảng phân phối website BĐS chuyên nghiệp. Mẫu BDS-19 (Sunshine City Saigon)
  </footer>

</body>
</html>