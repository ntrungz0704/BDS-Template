<?php
/**
 * BDS-16: EGA Land Real Estate Template (Standalone PHP & MySQL)
 * Nền tảng phân phối & cho thuê bất động sản EGA Land
 */

// Cấu hình Database
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds16_egaland';

$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);
$properties = [];
$news = [];

if ($conn && !$conn->connect_error) {
    $conn->set_charset("utf8mb4");
    $res = $conn->query("SELECT * FROM properties ORDER BY id ASC");
    if ($res) {
        while ($row = $res->fetch_assoc()) {
            $properties[] = $row;
        }
    }
    $n_res = $conn->query("SELECT * FROM news ORDER BY id ASC");
    if ($n_res) {
        while ($nrow = $n_res->fetch_assoc()) {
            $news[] = $nrow;
        }
    }
}

// Fallback Mock Data nếu chưa kết nối Database MySQL
if (empty($properties)) {
    $properties = [
        [
            'id' => 1,
            'title' => 'Toàn Bộ Danh Sách Biệt Thự Đang Bán Ở Ciputra, Biệt Thự Đẹp Tây Hồ (Tuần 4 Tháng 8)',
            'type' => 'Biệt Thự',
            'category' => 'ban',
            'price' => '20 Tỷ VNĐ',
            'area' => '200 - 250 m²',
            'direction' => 'Không xác định',
            'district' => 'Tây Hồ',
            'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            'hot' => 1
        ],
        [
            'id' => 2,
            'title' => 'Cần bán nhà MT Phan Đình Phùng, P. 1, Phú Nhuận',
            'type' => 'Nhà Mặt Tiền',
            'category' => 'ban',
            'price' => '14 Tỷ VNĐ',
            'area' => '96 m²',
            'direction' => 'Hướng Tây Nam',
            'district' => 'Phú Nhuận',
            'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
            'hot' => 1
        ],
        [
            'id' => 3,
            'title' => 'Bán chung cư Ruby City, liền kề khu biệt thự Vincom Long Biên, KĐT Việt Hưng HN',
            'type' => 'Căn Hộ Chung Cư',
            'category' => 'ban',
            'price' => '1.1 Tỷ VNĐ',
            'area' => '96 m²',
            'direction' => 'Hướng Tây Nam',
            'district' => 'Long Biên',
            'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
            'hot' => 0
        ],
        [
            'id' => 4,
            'title' => 'Đầu Tư Sinh Lời Cao — Thành Phố Sinh Thái Năm Sao — Khu Phú Mỹ Hưng 3, Lh: 0911.728.700',
            'type' => 'Đất Nền Dự Án',
            'category' => 'ban',
            'price' => '3 Tỷ VNĐ',
            'area' => '120 m²',
            'direction' => 'Không xác định',
            'district' => 'Bình Chánh',
            'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
            'hot' => 1
        ],
        [
            'id' => 5,
            'title' => 'Chính Chủ Cho Thuê Phòng Kk Ngõ 89 Lê Đức Thọ, Cổng Làng Phú Mỹ, Giá Từ 2tr/Th, Ở Miễn Phí 15 Ngày',
            'type' => 'Nhà Cho Thuê',
            'category' => 'thue',
            'price' => '2.3 Triệu / Tháng',
            'area' => '30 m²',
            'direction' => 'Không xác định',
            'district' => 'Nam Từ Liêm',
            'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
            'hot' => 0
        ],
        [
            'id' => 6,
            'title' => 'Cho thuê căn hộ Sunrise City từ 1, 2, 3, 4, 5 PN penthouse',
            'type' => 'Nhà Cho Thuê',
            'category' => 'thue',
            'price' => '7 Triệu / Tháng',
            'area' => '90 m²',
            'direction' => 'Hướng Nam',
            'district' => 'Quận 7',
            'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            'hot' => 1
        ]
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EGA Land — Trao Bạn Cuộc Sống Mơ Ước | BDS-16 PHP</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    .bg-navy-dark { background-color: #071D2D; }
    .bg-navy-deeper { background-color: #051420; }
    .bg-gold { background-color: #D97706; }
    .text-gold { color: #D97706; }
  </style>
</head>
<body class="bg-[#F8FAFC] text-slate-800 flex flex-col min-h-screen">

  <!-- Microbar Top -->
  <div class="bg-navy-deeper text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
    <div class="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
      <div>✉ Liên hệ: support@sapo.vn | Hotline: 19006750</div>
      <div class="flex items-center gap-4">
        <span>f</span> <span>t</span> <span>▶</span> <span>G+</span> <span>📷</span>
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="sticky top-0 z-40 bg-navy-dark text-white shadow-md border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-3">
        <div class="bg-white p-2 border border-slate-300 shadow-sm flex flex-col items-center">
          <span class="text-xl font-black text-slate-900 leading-none">EGA <span class="text-gold">LAND</span></span>
          <span class="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">TRAO BẠN CUỘC SỐNG MƠ ƯỚC</span>
        </div>
      </a>
      <nav class="hidden md:flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-200">
        <a href="index.php" class="px-3.5 py-2 bg-[#0B3556] text-amber-400 font-extrabold border-b-2 border-amber-400">Trang Chủ</a>
        <a href="#nha-ban" class="px-3.5 py-2 hover:text-amber-400">Nhà Bán</a>
        <a href="#nha-cho-thue" class="px-3.5 py-2 hover:text-amber-400">Nhà Cho Thuê</a>
        <a href="#tin-tuc" class="px-3.5 py-2 hover:text-amber-400">Tin Tức</a>
        <a href="#lien-he" class="px-3.5 py-2 hover:text-amber-400">Liên Hệ</a>
      </nav>
    </div>
  </header>

  <!-- Body 2 Columns -->
  <main class="py-8 flex-1">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Sidebar -->
        <aside class="lg:col-span-4 xl:col-span-3 space-y-6">
          <div class="bg-white p-4 border border-slate-300 shadow-sm space-y-3">
            <h3 class="text-xs font-black text-slate-800 uppercase tracking-wider border-b pb-2">TÌM KIẾM BẤT ĐỘNG SẢN</h3>
            <form class="space-y-2.5 text-xs">
              <input type="text" placeholder="Tìm kiếm từ khóa..." class="w-full bg-slate-50 border border-slate-300 p-2 text-slate-800" />
              <button type="button" onclick="alert('Tìm thấy <?php echo count($properties); ?> bất động sản!');" class="w-full py-2 bg-gold text-white font-bold uppercase shadow">Tìm kiếm</button>
            </form>
          </div>

          <div class="relative overflow-hidden border border-slate-300 shadow-md">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="" class="w-full h-72 object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 flex flex-col justify-end p-4 text-white">
              <p class="text-xs font-bold text-amber-300 uppercase">CHƯƠNG TRÌNH HỖ TRỢ VỐN MUA NHÀ</p>
              <p class="text-[10px] text-slate-300">Lãi suất chỉ từ 5.99%/năm</p>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <section class="lg:col-span-8 xl:col-span-9 space-y-8">
          
          <div class="relative aspect-[16/7] overflow-hidden border border-slate-300 shadow-md">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80" alt="" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black/50 flex items-end p-6">
              <div class="bg-black/70 p-4 border border-white/20 text-white">
                <h2 class="text-xl font-serif font-black uppercase text-amber-300">EGAHOMES RIVERSIDE</h2>
                <p class="text-xs text-slate-200">Mở Bán Biệt Thự Hoa Sữa 10&11 — Ưu Đãi Thanh Toán 1,5% Mỗi Tháng</p>
              </div>
            </div>
          </div>

          <!-- Cards Grid -->
          <div class="space-y-6">
            <div class="border-b-2 border-gold pb-2">
              <h2 class="text-base sm:text-lg font-serif font-black text-slate-900 uppercase">DANH SÁCH BẤT ĐỘNG SẢN TIÊU BIỂU</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <?php foreach ($properties as $prop): ?>
              <div class="bg-white border border-slate-300 p-3 shadow-sm flex flex-col justify-between">
                <h3 class="text-xs font-bold text-slate-900 line-clamp-2 min-h-[34px] leading-tight mb-2">
                  <?php echo htmlspecialchars($prop['title']); ?>
                </h3>
                <div class="grid grid-cols-12 gap-3 items-stretch">
                  <div class="col-span-5 relative aspect-[4/3] overflow-hidden bg-slate-900 border border-slate-200">
                    <img src="<?php echo htmlspecialchars($prop['image']); ?>" alt="" class="w-full h-full object-cover">
                  </div>
                  <div class="col-span-7 bg-slate-50 p-2 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <div>Diện tích: <?php echo htmlspecialchars($prop['area']); ?></div>
                    <div>Loại: <?php echo htmlspecialchars($prop['type']); ?></div>
                    <div>Khu vực: <?php echo htmlspecialchars($prop['district']); ?></div>
                  </div>
                </div>
                <div class="pt-2.5 mt-2 border-t border-slate-200 flex items-center justify-between">
                  <span class="text-sm font-black text-red-600"><?php echo htmlspecialchars($prop['price']); ?></span>
                  <button onclick="alert('Đang kết nối chuyên viên tư vấn...');" class="px-2 py-0.5 bg-[#0D3B66] text-white text-[10px] font-bold uppercase">Chi Tiết ›</button>
                </div>
              </div>
              <?php endforeach; ?>
            </div>
          </div>

        </section>

      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer id="lien-he" class="bg-navy-deeper text-slate-300 text-xs border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="font-serif font-black text-white uppercase text-sm border-b border-slate-800 pb-2">ĐĂNG KÝ NHẬN BẢN TIN</h4>
          <p class="text-slate-400 text-xs mt-2">Cập nhật tin tức quan trọng của EGA Land tới quý khách.</p>
        </div>
        <div>
          <h4 class="font-serif font-black text-white uppercase text-sm border-b border-slate-800 pb-2">LIÊN HỆ</h4>
          <p class="text-slate-400 text-xs mt-2">EGA Land City: 098 765 432 • EGA Land Sea: 1800 1080</p>
        </div>
        <div>
          <h4 class="font-serif font-black text-white uppercase text-sm border-b border-slate-800 pb-2">EGANY</h4>
          <p class="text-slate-400 text-xs mt-2">Trụ sở: Lầu 3 - Tòa nhà Lữ Gia - Số 70 Lữ Gia - P.15 - Q.11 - TP.HCM</p>
        </div>
      </div>
    </div>
    <div class="bg-white text-slate-600 text-[11px] py-3 text-center border-t border-slate-200">
      Lầu 3 - Tòa nhà Lữ Gia - Số 70 Lữ Gia - P.15 - Q.11 - TP.HCM. Email: support@sapo.vn | Hotline: 19006750 • Bản quyền thuộc về TEMPLATEBDS — BDS-16
    </div>
  </footer>

</body>
</html>