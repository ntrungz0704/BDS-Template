<?php
require_once 'config/db.php';

// Lấy danh sách BĐS từ MySQL nếu có kết nối, hoặc dùng mảng demo chuẩn BDS-08
if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM properties ORDER BY id ASC LIMIT 6");
    $properties = $stmt->fetchAll();
} else {
    $properties = [
        ['id' => 1, 'title' => 'DỰ ÁN PHỐ MỸ GOLD CITY BÀ RỊA VŨNG TÀU', 'slug' => 'du-an-pho-my-gold-city', 'status_badge' => 'Dự án đang phân phối', 'price' => '1.85 Tỷ VNĐ', 'area' => '105 m²', 'location' => 'TX. Phú Mỹ, Bà Rịa - Vũng Tàu', 'image' => 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80'],
        ['id' => 2, 'title' => 'DỰ ÁN CĂN HỘ GOLDEN STAR QUẬN 7, TP.HCM', 'slug' => 'du-an-can-ho-golden-star-quan-7', 'status_badge' => 'Dự án đang phân phối', 'price' => '3.45 Tỷ VNĐ', 'area' => '68 m²', 'location' => 'Nguyễn Thị Thập, Quận 7', 'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
        ['id' => 3, 'title' => 'DỰ ÁN CĂN HỘ GREEN STAR TP. QUẬN 7, TP.HCM', 'slug' => 'du-an-can-ho-green-star-quan-7', 'status_badge' => 'Dự án đang phân phối', 'price' => '3.90 Tỷ VNĐ', 'area' => '75 m²', 'location' => 'Phạm Hữu Lầu, Quận 7', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
        ['id' => 4, 'title' => 'DỰ ÁN CĂN HỘ ECO GREEN QUẬN 7, TP.HCM (MỚI NHẤT)', 'slug' => 'du-an-can-ho-eco-green-quan-7', 'status_badge' => 'Dự án đang phân phối', 'price' => '4.20 Tỷ VNĐ', 'area' => '80 m²', 'location' => 'Nguyễn Văn Linh, Quận 7', 'image' => 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'],
        ['id' => 5, 'title' => 'DỰ ÁN CĂN HỘ HƯNG PHÁT SILVER STAR NHÀ BÈ', 'slug' => 'du-an-can-ho-hung-phat-silver-star', 'status_badge' => 'Dự án đang phân phối', 'price' => '2.85 Tỷ VNĐ', 'area' => '72 m²', 'location' => 'Nguyễn Hữu Thọ, Nhà Bè', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'],
        ['id' => 6, 'title' => 'DỰ ÁN DIAMOND ISLAND CONDOTEL HƯNG LỘC PHÁT', 'slug' => 'du-an-diamond-island-condotel', 'status_badge' => 'Dự án đang phân phối', 'price' => '1.65 Tỷ VNĐ', 'area' => '45 m²', 'location' => 'Mũi Né, Phan Thiết', 'image' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'],
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>THEME WP — Sàn Phân Phối Bất Động Sản PHP & MySQL | Hưng Lộc Phát Land & NovaWorld</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-white text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-[#16A34A] selection:text-white">

  <!-- LEFT FLOATING ACTION PILLS -->
  <div class="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-2.5">
    <a href="https://zalo.me/0919006030" target="_blank" class="px-3.5 py-1.5 rounded-sm bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5 hover:scale-105">
      <i data-lucide="message-square" class="w-3.5 h-3.5"></i> Chat Zalo
    </a>
    <a href="https://www.facebook.com/groups/847532091275214" target="_blank" class="px-3.5 py-1.5 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5 hover:scale-105">
      <i data-lucide="share-2" class="w-3.5 h-3.5"></i> Chat Facebook
    </a>
    <a href="tel:0919006030" class="px-3.5 py-1.5 rounded-sm bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-black shadow-lg transition flex items-center gap-1.5 hover:scale-105">
      <i data-lucide="phone" class="w-3.5 h-3.5 animate-pulse"></i> Hotline: 0919 006 030
    </a>
  </div>

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white text-slate-800 shadow-md border-b border-slate-200">
    <div class="bg-[#48C0D8] text-white text-xs py-1.5 px-4 hidden md:block font-medium">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-6">
          <a href="mailto:admin@templatebds.com" class="flex items-center gap-1.5 hover:underline text-white">
            <i data-lucide="mail" class="w-3.5 h-3.5"></i> admin@templatebds.com
          </a>
          <span class="opacity-70">|</span>
          <span>Hotline 24/7: <strong>0919 006 030</strong></span>
        </div>
        <div class="flex items-center gap-4">
          <a href="#lien-he" class="hover:underline">Liên hệ</a>
          <span class="opacity-50">|</span>
          <a href="#dang-nhap" class="hover:underline">Đăng nhập</a>
          <i data-lucide="search" class="w-3.5 h-3.5 cursor-pointer"></i>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      <a href="index.php" class="flex items-center gap-3 group shrink-0">
        <div class="w-11 h-11 rounded-sm bg-gradient-to-br from-[#0284C7] via-[#16A34A] to-[#EAB308] flex items-center justify-center text-white font-black shadow-md p-2 shrink-0">
          <i data-lucide="building-2" class="w-6 h-6 text-white"></i>
        </div>
        <div class="whitespace-nowrap">
          <div class="flex items-center gap-1">
            <span class="text-lg sm:text-xl font-black tracking-tight text-[#0284C7]">THEME</span>
            <span class="text-lg sm:text-xl font-black tracking-tight text-[#E11D48]">WP</span>
          </div>
          <span class="text-[9px] sm:text-[10px] tracking-widest text-[#15803D] block uppercase font-extrabold">
            SÀN PHÂN PHỐI BẤT ĐỘNG SẢN CAO CẤP
          </span>
        </div>
      </a>

      <nav class="hidden lg:flex items-center gap-1.5 xl:gap-3 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
        <a href="index.php" class="whitespace-nowrap px-2.5 py-1.5 text-[#16A34A] font-extrabold border-b-2 border-[#16A34A]">Trang Chủ</a>
        <a href="#gioi-thieu" class="whitespace-nowrap px-2.5 py-1.5 hover:text-[#16A34A]">Giới Thiệu</a>
        <a href="#du-an" class="whitespace-nowrap px-2.5 py-1.5 hover:text-[#16A34A]">Dự Án</a>
        <a href="#tin-tuc" class="whitespace-nowrap px-2.5 py-1.5 hover:text-[#16A34A]">Tin Tức</a>
        <a href="#hoat-dong" class="whitespace-nowrap px-2.5 py-1.5 hover:text-[#16A34A]">Hoạt Động Công Ty</a>
        <a href="#tuyen-dung" class="whitespace-nowrap px-2.5 py-1.5 hover:text-[#16A34A]">Tuyển Dụng</a>
        <a href="#lien-he" class="whitespace-nowrap px-2.5 py-1.5 hover:text-[#16A34A]">Liên Hệ</a>
      </nav>

      <div class="flex items-center gap-2.5 shrink-0">
        <a href="tel:0919006030" class="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-emerald-50 text-[#15803D] border border-emerald-200 text-xs font-black whitespace-nowrap shrink-0 hover:bg-emerald-100 transition">
          <i data-lucide="phone" class="w-3.5 h-3.5 text-[#16A34A] shrink-0"></i>
          <span>0919 006 030</span>
        </a>
        <a href="#tai-bao-gia" class="px-3.5 py-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white text-xs font-black rounded-sm shadow-md uppercase tracking-wider whitespace-nowrap shrink-0">
          Tải Báo Giá VIP
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center justify-end text-white overflow-hidden bg-slate-900">
    <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1600&q=80" alt="Golf Banner" class="absolute inset-0 w-full h-full object-cover object-center">
    <div class="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#0284C7]/80"></div>
    <div class="absolute top-8 left-8 sm:left-16 text-white/90 text-2xl sm:text-4xl font-serif italic select-none">Just for you</div>
    <div class="relative z-20 max-w-7xl mx-auto px-4 py-12 flex justify-end w-full">
      <div class="max-w-md lg:max-w-lg text-right space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0284C7] text-white text-xs font-bold shadow-md">
          <i data-lucide="building-2" class="w-3.5 h-3.5"></i> Đầu Tư Bất Động Sản
        </div>
        <h1 class="text-2xl sm:text-4xl lg:text-5xl font-serif italic text-white font-black leading-tight">
          Thanh toán ban đầu chỉ <span class="text-amber-300 not-italic font-sans font-black">500 triệu</span>
        </h1>
        <div class="inline-block px-5 py-2 rounded-sm bg-[#15803D] text-[#FDE047] text-xs sm:text-sm font-black tracking-wider uppercase shadow-xl border border-emerald-300/40">
          ★ SINH LỜI TỪ 12–15% MỖI NĂM ★
        </div>
        <div class="pt-2 flex justify-end">
          <a href="tel:0919006030" class="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white text-slate-900 hover:bg-slate-100 transition shadow-2xl font-black text-sm sm:text-base border-2 border-emerald-500">
            <i data-lucide="phone" class="w-4 h-4 text-[#16A34A]"></i>
            <span>0919.006.030</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- DỰ ÁN BĐS TỪ MYSQL -->
  <section id="du-an" class="py-12 bg-white text-slate-800">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center max-w-2xl mx-auto mb-10 space-y-1">
        <h2 class="text-xl sm:text-2xl font-black tracking-tight text-[#15803D] uppercase">
          DỰ ÁN BẤT ĐỘNG SẢN ĐANG PHÂN PHỐI
        </h2>
        <div class="w-24 h-1 bg-[#16A34A] mx-auto rounded-sm"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <?php foreach ($properties as $p): ?>
            <div class="group bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src="<?php echo htmlspecialchars($p['image']); ?>" alt="" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                  <div class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#15803D] text-white text-[10px] font-bold shadow">
                    <?php echo htmlspecialchars($p['status_badge'] ?? 'Dự án đang phân phối'); ?>
                  </div>
                </div>
                <div class="p-3.5 space-y-2">
                  <h3 class="text-xs font-black text-slate-800 group-hover:text-[#16A34A] leading-snug line-clamp-2 uppercase min-h-[34px]">
                    <?php echo htmlspecialchars($p['title']); ?>
                  </h3>
                  <div class="text-[11px] text-slate-500 flex items-center gap-1">
                    <i data-lucide="map-pin" class="w-3 h-3 text-emerald-600 shrink-0"></i>
                    <span class="truncate"><?php echo htmlspecialchars($p['location']); ?></span>
                  </div>
                </div>
              </div>
              <div class="px-3.5 pb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="font-extrabold text-[#E11D48] text-sm"><?php echo htmlspecialchars($p['price']); ?></span>
                <span class="text-[11px] font-bold text-slate-400"><?php echo htmlspecialchars($p['area']); ?></span>
              </div>
            </div>
          <?php endforeach; ?>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4 space-y-4">
          <a href="#tai-bao-gia" class="w-full py-3.5 px-5 rounded-sm bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2">
            <i data-lucide="download" class="w-4 h-4"></i> TẢI BÁO GIÁ DỰ ÁN
          </a>
          <a href="#tai-bao-gia" class="w-full py-3.5 px-5 rounded-sm bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2">
            <i data-lucide="gift" class="w-4 h-4"></i> THÔNG TIN ƯU ĐÃI
          </a>
          <div class="w-full p-4 rounded-sm bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-center shadow-lg space-y-1">
            <span class="text-[11px] font-extrabold uppercase tracking-widest block opacity-90">TƯ VẤN 24/7</span>
            <a href="tel:0919006030" class="text-xl sm:text-2xl font-black block tracking-tight hover:underline">0919.006.030</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="w-full bg-[#07132B] text-white">
    <div class="w-full bg-[#1E60B8] py-6 px-4 text-white">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 class="text-sm md:text-base font-black">Đăng ký nhận bảng giá & ưu đãi F1 từ TEMPLATEBDS</h3>
          <p class="text-xs text-blue-100">Cập nhật chính sách chiết khấu 10% từ Hưng Lộc Phát & NovaWorld</p>
        </div>
        <div class="flex w-full md:w-auto gap-2">
          <input type="email" placeholder="Nhập địa chỉ Email..." class="bg-white text-slate-800 text-xs px-4 py-2.5 rounded-lg w-full md:w-72 focus:outline-none">
          <button onclick="alert('Đăng ký nhận tin thành công!')" class="bg-blue-900 text-white font-bold text-xs px-5 py-2.5 rounded-lg whitespace-nowrap">Đăng ký ngay</button>
        </div>
      </div>
    </div>
    <div class="w-full bg-[#050C1B] py-4 px-4 text-slate-400 text-[11px] text-center">
      © 2026 Bản quyền thuộc về <strong>TEMPLATEBDS</strong> — Mẫu Giao Diện: <strong>BDS-08 (PHP & MySQL Standalone Edition)</strong>
    </div>
  </footer>

  <script>lucide.createIcons();</script>
</body>
</html>