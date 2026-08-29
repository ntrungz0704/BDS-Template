<?php
/**
 * BDS-20: Mona Park View (Standalone PHP & MySQL)
 */

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds20_monapark';

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
            'title' => 'Căn Hộ 1 Phòng Ngủ Block A View Công Viên',
            'code' => 'MPV-A0805',
            'block' => 'Block A - Park View',
            'type' => '1 Phòng Ngủ',
            'price' => '2.45 Tỷ VNĐ',
            'area' => '48 m²',
            'view' => 'Công viên 100ha',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'
        ],
        [
            'id' => 2,
            'title' => 'Căn Hộ Góc 2 Phòng Ngủ Block B View Hồ',
            'code' => 'MPV-B1502',
            'block' => 'Block B - Lake View',
            'type' => '2 Phòng Ngủ',
            'price' => '3.85 Tỷ VNĐ',
            'area' => '72 m²',
            'view' => 'Hồ điều hòa',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
        ],
        [
            'id' => 3,
            'title' => 'Căn Hộ 3 Phòng Ngủ Block C View Vườn Thiền',
            'code' => 'MPV-C2008',
            'block' => 'Block C - Garden View',
            'type' => '3 Phòng Ngủ',
            'price' => '5.20 Tỷ VNĐ',
            'area' => '98 m²',
            'view' => 'Vườn thiền Zen',
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
  <title>Mona Park View | BDS-20 PHP</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-800 flex flex-col min-h-screen">

  <header class="sticky top-0 z-40 bg-[#0B4635] text-white p-4 shadow border-b border-amber-400/30">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-[#D4AF37] flex items-center justify-center text-slate-950 font-black">🌿</div>
        <span class="text-xl font-serif font-black text-amber-300">MONA PARK VIEW</span>
      </a>
      <div class="text-xs font-bold text-amber-300">Hotline: 0919 006 030</div>
    </div>
  </header>

  <main class="py-12 flex-1 max-w-7xl mx-auto px-4 space-y-8">
    <h2 class="text-2xl font-serif font-black uppercase text-[#0B4635]">BẢNG HÀNG CĂN HỘ SINH THÁI MONA PARK VIEW</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($units as $unit): ?>
      <div class="bg-white border border-slate-300 shadow-sm flex flex-col justify-between">
        <img src="<?php echo htmlspecialchars($unit['image']); ?>" alt="" class="w-full h-48 object-cover">
        <div class="p-4 space-y-2">
          <span class="text-[10px] text-emerald-700 font-black uppercase"><?php echo htmlspecialchars($unit['block']); ?></span>
          <h3 class="text-xs font-black text-slate-900"><?php echo htmlspecialchars($unit['title']); ?></h3>
          <p class="text-xs text-slate-600">Mã: <?php echo htmlspecialchars($unit['code']); ?> • DT: <?php echo htmlspecialchars($unit['area']); ?></p>
          <div class="pt-2 border-t flex justify-between items-center">
            <span class="text-sm font-black text-red-600"><?php echo htmlspecialchars($unit['price']); ?></span>
            <button onclick="alert('Đang kết nối chuyên viên...');" class="px-3 py-1 bg-[#0B4635] text-amber-300 text-xs font-bold uppercase">Chi Tiết ›</button>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </main>

  <footer class="bg-[#072C21] text-slate-400 text-xs py-8 border-t border-amber-400/30 text-center">
    © TEMPLATEBDS — Nền tảng phân phối website BĐS chuyên nghiệp. Mẫu BDS-20 (Mona Park View)
  </footer>

</body>
</html>