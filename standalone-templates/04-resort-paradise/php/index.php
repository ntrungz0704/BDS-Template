<?php
require_once 'config/db.php';

// Lấy danh sách BĐS từ MySQL nếu có kết nối, hoặc dùng mảng demo
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id DESC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['title' => 'Biệt thự sang trọng view thoáng mát', 'slug' => 'biet-thu-view-thoang-mat', 'price' => '5.5 Tỷ VNĐ', 'area' => '300 m²', 'location' => 'Khu Đô Thị Mới', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
        ['title' => 'Nhà phố mặt tiền thương mại kinh doanh', 'slug' => 'nha-pho-mat-tien-kinh-doanh', 'price' => '8.2 Tỷ VNĐ', 'area' => '140 m²', 'location' => 'Trung tâm thành phố', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
        ['title' => 'Đất nền phân lô sổ đỏ sẵn sàng công chứng', 'slug' => 'dat-nen-phan-lo-so-do', 'price' => '1.9 Tỷ VNĐ', 'area' => '120 m²', 'location' => 'Khu dân cư hiện hữu', 'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resort Paradise Style (Sunshine City) — Website Bất Động Sản PHP & MySQL</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col justify-between">

  <!-- Header PHP -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <a href="index.php" class="font-black text-xl text-blue-600 uppercase">
        Resort Paradise Style (Sunshine City)
      </a>
      <div class="flex items-center gap-3">
        <a href="tel:0919006030" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow">
          Hotline: 0919 006 030
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 w-full space-y-12 pb-16">
    <section class="py-16 px-4 bg-slate-900 text-white text-center">
      <h1 class="text-3xl sm:text-5xl font-black uppercase mb-4">Resort Paradise Style (Sunshine City)</h1>
      <p class="text-slate-300 max-w-xl mx-auto text-sm">BĐS biển · Biệt thự đảo · Condotel · Second Home</p>
    </section>

    <!-- Danh sách BĐS từ MySQL -->
    <section class="max-w-7xl mx-auto px-4 space-y-6">
      <h2 class="text-2xl font-black text-slate-900 uppercase text-center">DANH SÁCH BẤT ĐỘNG SẢN</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <?php foreach ($properties as $item): ?>
          <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition">
            <img src="<?php echo htmlspecialchars($item['image']); ?>" alt="" class="w-full h-48 object-cover">
            <div class="p-4 space-y-2">
              <h3 class="font-bold text-sm text-slate-900"><?php echo htmlspecialchars($item['title']); ?></h3>
              <p class="text-xs text-slate-500"><?php echo htmlspecialchars($item['location']); ?></p>
              <div class="flex justify-between items-center pt-2 border-t text-xs">
                <span class="font-black text-blue-600 text-sm"><?php echo htmlspecialchars($item['price']); ?></span>
                <span class="text-slate-500"><?php echo htmlspecialchars($item['area']); ?></span>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </section>

    <!-- Form Liên Hệ PHP -->
    <section class="max-w-3xl mx-auto px-4">
      <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <h3 class="text-lg font-black text-slate-900 uppercase text-center">GỬI YÊU CẦU TƯ VẤN</h3>
        <form action="api/contact.php" method="POST" class="space-y-3 text-xs">
          <input type="text" name="name" placeholder="Họ và tên (*)" required class="w-full p-3 bg-slate-50 border rounded-xl">
          <input type="tel" name="phone" placeholder="Số điện thoại (*)" required class="w-full p-3 bg-slate-50 border rounded-xl font-bold text-blue-600">
          <textarea name="message" rows="3" placeholder="Nội dung cần tư vấn..." class="w-full p-3 bg-slate-50 border rounded-xl"></textarea>
          <button type="submit" class="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl">
            GỬI THÔNG TIN
          </button>
        </form>
      </div>
    </section>
  </main>

  <!-- Footer PHP -->
  <footer class="w-full bg-[#07132B] text-slate-300 text-xs pt-12 pb-6 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
      <div class="md:col-span-5 space-y-3">
        <h4 class="font-black text-sm text-white uppercase tracking-wider">
          <span class="text-[#0084FF]">TEMPLATES</span><span class="text-white">BDS</span>
        </h4>
        <p class="text-slate-400 text-xs leading-relaxed max-w-sm">
          Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.
        </p>
        <div class="space-y-1.5 text-xs text-slate-300 pt-1">
          <div>📍 Địa chỉ: <strong class="text-white font-medium">180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</strong></div>
          <div>📞 Hotline 1: <a href="tel:0919006030" class="text-white font-bold font-mono hover:text-blue-400">0919 006 030</a></div>
          <div>📞 Hotline 2: <a href="tel:0983312219" class="text-white font-bold font-mono hover:text-emerald-400">0983 312 219</a> (24/7)</div>
          <div>✉️ Email: <a href="mailto:ntrungz0704@gmail.com" class="text-white hover:text-blue-400">ntrungz0704@gmail.com</a></div>
          <div>⏰ Giờ làm việc: <strong class="text-white font-medium">8:00 - 20:00 (T2 - CN)</strong></div>
        </div>
      </div>

      <div class="md:col-span-2 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">VỀ CHÚNG TÔI</h4>
        <div class="space-y-2 text-slate-400">
          <div><a href="index.php" class="hover:text-blue-400">Trang chủ</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Sản phẩm BĐS</a></div>
          <div><a href="#du-an" class="hover:text-blue-400">Dự án mới</a></div>
          <div><a href="#tin-tuc" class="hover:text-blue-400">Tin tức & Sự kiện</a></div>
        </div>
      </div>

      <div class="md:col-span-2 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">DANH MỤC</h4>
        <div class="space-y-2 text-slate-400">
          <div><a href="#san-pham" class="hover:text-blue-400">Đất dự án</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Đất nền</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Biệt thự biển</a></div>
          <div><a href="#san-pham" class="hover:text-blue-400">Nhà phố</a></div>
        </div>
      </div>

      <div class="md:col-span-3 space-y-3">
        <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">CHÍNH SÁCH</h4>
        <div class="space-y-2 text-slate-400 text-xs">
          <div>• Bàn giao 100% mã nguồn sạch</div>
          <div>• Bảo hành & Hỗ trợ kỹ thuật trọn đời</div>
          <div>• Hỗ trợ cài đặt lên Hosting cPanel / XAMPP</div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 pt-6 text-center text-[11px] text-slate-400">
      <p>© 2026 Bản quyền thuộc về <strong class="text-white">TEMPLATEBDS</strong> — Mẫu Giao Diện: BDS-04.</p>
    </div>
  </footer>

</body>
</html>