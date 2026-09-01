<?php
$company_info = [
    'name' => 'TEMPLATESBDS',
    'slogan' => 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam',
    'address' => '180 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
    'phone1' => '0919 006 030',
    'phone2' => '0983 312 219',
    'email' => 'admin@templatesbds.com',
    'working_hours' => '8:00 - 20:00 (T2 - CN)',
    'zalo_url' => 'https://zalo.me/0919006030',
    'facebook_url' => 'https://www.facebook.com/groups/847532091275214',
    'youtube_url' => 'https://www.youtube.com/@tungchuofficial',
    'tiktok_url' => 'https://www.tiktok.com/@editnhadat',
    'footer_text' => 'Kho mẫu website bất động sản cao cấp số 1 Việt Nam. Tối ưu chuyển đổi, chuẩn SEO và tích hợp hệ thống CMS quản trị đa kênh.'
];

$projects = [];

if (file_exists(__DIR__ . '/config/db.php')) {
    require_once __DIR__ . '/config/db.php';
    if (isset($pdo)) {
        try {
            $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $company_info = array_merge($company_info, $row);
            }

            $stmt = $pdo->query("SELECT * FROM projects");
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $projects[] = $row;
            }
        } catch (PDOException $e) {
            // fallback
        }
    }
}

if (empty($projects)) {
    // fallback data
    $projects = [
      [ 'id' => 1, 'title' => 'Biệt Thự View Biển Đẹp Khu Đô Thị An Viên', 'slug' => 'biet-thu-view-bien-dep-an-vien', 'category' => 'nha-o', 'category_label' => 'Nhà Ở / Biệt Thự', 'price' => '25,000,000,000 đ', 'area' => '350 m²', 'bedrooms' => 4, 'bathrooms' => 4, 'direction' => 'Đông Nam', 'location' => 'KĐT An Viên, Phường Vĩnh Trường, TP. Nha Trang, Khánh Hòa', 'city' => 'Nha Trang', 'badge' => 'MỚI', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', 'description' => 'Biệt thự nghỉ dưỡng mặt biển cao cấp với hồ bơi vô cực tràn bờ, sân vườn xanh mát và bến đỗ du thuyền riêng biệt.' ],
      [ 'id' => 2, 'title' => 'Biệt Thự An Viên Nha Trang Có Hồ Bơi Riêng Biệt Lập', 'slug' => 'biet-thu-an-vien-nha-trang-ho-boi-rieng', 'category' => 'nha-cho-thue', 'category_label' => 'Nhà Cho Thuê', 'price' => '2,500,000,000 đ / Năm', 'area' => '280 m²', 'bedrooms' => 4, 'bathrooms' => 4, 'direction' => 'Nam', 'location' => 'Đường Số 1, KĐT An Viên, TP. Nha Trang', 'city' => 'Nha Trang', 'badge' => 'HOT', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'description' => 'Căn biệt thự thiết kế hiện đại trang bị đầy đủ tiện nghi tiêu chuẩn 5 sao, phục vụ nghỉ dưỡng gia đình hoặc khai thác cho thuê du lịch cao cấp.' ],
      [ 'id' => 3, 'title' => 'Biệt Thự Hoa Thiên — Phan Thiết Sát Biển Mũi Né', 'slug' => 'biet-thu-hoa-thien-phan-thiet', 'category' => 'nha-o', 'category_label' => 'Biệt Thự Biển', 'price' => '1,500,000,000 đ / Đợt 1', 'area' => '320 m²', 'bedrooms' => 3, 'bathrooms' => 3, 'direction' => 'Đông', 'location' => 'Đường Huỳnh Thúc Kháng, TP. Phan Thiết, Bình Thuận', 'city' => 'Phan Thiết', 'badge' => 'GIÁ TỐT', 'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', 'description' => 'Nằm trong quần thể nghỉ dưỡng biển Hoa Thiên Phan Thiết, liền kề đồi cát bay và bãi biển cát trắng mịn màng.' ],
      [ 'id' => 4, 'title' => 'Biệt Thự Cô Liên — Đà Lạt Phong Cách Cổ Điển Pháp', 'slug' => 'biet-thu-co-lien-da-lat', 'category' => 'nha-o', 'category_label' => 'Biệt Thự Đồi', 'price' => '25,000,000,000 đ', 'area' => '450 m²', 'bedrooms' => 5, 'bathrooms' => 5, 'direction' => 'Tây Nam', 'location' => 'Đường Trần Hưng Đạo, Phường 10, TP. Đà Lạt, Lâm Đồng', 'city' => 'Đà Lạt', 'badge' => 'VIP', 'image' => 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', 'description' => 'Dinh thự mang đậm phong cách kiến trúc Pháp cổ ẩn mình giữa rừng thông bạt ngàn ngắm toàn cảnh thung lũng sương mù.' ],
      [ 'id' => 5, 'title' => 'Biệt Thự Thành Thành — Đà Nẵng Cạnh Cầu Rồng Sông Hàn', 'slug' => 'biet-thu-thanh-thanh-da-nang', 'category' => 'nha-o', 'category_label' => 'Nhà Phố / Biệt Thự', 'price' => '21,000,000,000 đ', 'area' => '260 m²', 'bedrooms' => 4, 'bathrooms' => 4, 'direction' => 'Đông Bắc', 'location' => 'Đường Bạch Đằng, Quận Hải Châu, TP. Đà Nẵng', 'city' => 'Đà Nẵng', 'badge' => 'MỚI', 'image' => 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80', 'description' => 'Vị trí đắc địa ngay trung tâm thành phố Đà Nẵng, thiết kế 3 tầng hiện đại sang trọng, thuận tiện kinh doanh hoặc làm văn phòng đại diện.' ],
      [ 'id' => 6, 'title' => 'Biệt Thự Hướng Biển — Phan Thiết View Hoàng Hôn', 'slug' => 'biet-thu-huong-bien-phan-thiet', 'category' => 'nha-o', 'category_label' => 'Biệt Thự Biển', 'price' => '19,500,000,000 đ', 'area' => '380 m²', 'bedrooms' => 4, 'bathrooms' => 4, 'direction' => 'Tây', 'location' => 'Đường Nguyễn Đình Chiểu, Hàm Tiến, Phan Thiết', 'city' => 'Phan Thiết', 'badge' => 'HOT', 'image' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80', 'description' => 'Tọa lạc tại thủ phủ resort Mũi Né, ban công lớn đón gió biển trong lành, thích hợp làm villa nghỉ dưỡng gia đình.' ]
    ];
}

$phone_clean1 = preg_replace("/[^0-9]/", "", $company_info['phone1']);
$phone_clean2 = preg_replace("/[^0-9]/", "", $company_info['phone2']);

function out($key) {
    global $company_info;
    echo htmlspecialchars($company_info[$key] ?? '');
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BDS-05 (Urban City — Biệt Thự An Viên)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .hidden { display: none !important; }
    .page-section { min-height: 100vh; }
    /* Hide scrollbar for gallery thumbnails */
    .gallery-thumbs::-webkit-scrollbar { display: none; }
    .gallery-thumbs { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="bg-[#F8F9FA] text-slate-800 antialiased relative min-h-screen flex flex-col text-xs sm:text-sm">

  <!-- Floating Phone Widget -->
  <a href="tel:<?= $phone_clean1 ?>" class="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-[#E65100] hover:bg-[#F57C00] text-white px-3.5 py-2.5 rounded-r-full shadow-2xl items-center gap-2 text-xs font-black tracking-wide cursor-pointer transition transform hover:scale-105">
    <div class="w-7 h-7 rounded-sm bg-white text-[#E65100] flex items-center justify-center shadow-inner">
      <i data-lucide="phone" class="w-3.5 h-3.5"></i>
    </div>
    <div>
      <span class="text-[10px] block opacity-90 font-normal">Tư vấn miễn phí (24/7)</span>
      <span class="text-sm font-black"><?= out("phone1") ?></span>
    </div>
  </a>

  <!-- Header -->
  <header class="w-full bg-white text-slate-800 sticky top-0 z-40 border-b border-slate-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
      
      <div onclick="navigate('home')" class="flex items-center gap-2 sm:gap-2.5 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
        <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-[#0084FF] text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-sm group-hover:scale-105 transition shrink-0">
          TB
        </div>
        <div class="min-w-0 truncate">
          <div class="text-lg sm:text-2xl font-black tracking-tight text-[#0084FF] leading-none group-hover:text-blue-700 transition truncate">
            <?= out("name") ?>
          </div>
          <div class="text-[7.5px] sm:text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5 truncate">
            <?= out("slogan") ?>
          </div>
        </div>
      </div>

      <nav class="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap" id="desktop-nav">
        <!-- JS will populate nav -->
      </nav>

      <div class="hidden md:flex items-center gap-2.5 shrink-0">
        <button onclick="navigate('contact')" class="px-4 py-2 bg-[#0084FF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap shrink-0">
          LIÊN HỆ NGAY
        </button>
        <button onclick="navigate('contact')" class="px-4 py-2 bg-[#D83A3A] hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap shrink-0">
          NHẬN ƯU ĐÃI
        </button>
      </div>

      <button onclick="toggleMobileMenu()" class="lg:hidden p-1.5 sm:p-2 text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer ml-auto shrink-0 flex items-center justify-center">
        <i data-lucide="menu" id="mobile-menu-icon" class="w-5 h-5"></i>
      </button>
    </div>

    <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 text-xs font-bold uppercase text-slate-700 shadow-xl">
      <!-- JS will populate mobile nav -->
    </div>
  </header>

  <main id="app-main" class="flex-1 w-full">
    <!-- Home Page Content Injected Here -->
  </main>

  <!-- Footer -->
  <footer class="w-full relative bg-[#07132B] text-white font-sans mt-auto">
    
    <div id="toast-container" class="hidden fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
      <i data-lucide="check-circle" class="w-4 h-4"></i> <span id="toast-message"></span>
    </div>

    <!-- Newsletter -->
    <div class="w-full bg-[#1E60B8] py-6 px-4 text-white">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 class="text-sm md:text-base font-black">Đăng ký nhận thông tin bảng giá & ưu đãi từ <?= out("name") ?></h3>
          <p class="text-xs text-blue-100">Chúng tôi sẽ gửi bạn những thông tin bất động sản và mẫu website mới nhất</p>
        </div>
        <div class="flex w-full md:w-auto gap-2">
          <input type="email" id="newsletter-email" placeholder="Nhập địa chỉ Email của bạn..." class="bg-white text-slate-800 text-xs px-4 py-2.5 rounded-xl w-full md:w-72 focus:outline-none" />
          <button onclick="handleNewsletter()" class="bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl whitespace-nowrap transition flex items-center gap-1 cursor-pointer">
            <i data-lucide="send" class="w-3 h-3"></i> Đăng ký ngay
          </button>
        </div>
      </div>
    </div>

    <div class="w-full bg-[#07132B] text-slate-300 text-xs py-12 px-4 border-b border-slate-800">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
        
        <div class="md:col-span-5 space-y-4">
          <div>
            <span class="text-2xl font-black tracking-tight text-[#0084FF]"><?= out("name") ?></span>
            <p class="mt-2 text-xs text-slate-400 leading-relaxed max-w-md"><?= out("footer_text") ?></p>
          </div>
          <div class="space-y-2 text-xs text-slate-300 pt-1">
            <div class="flex items-start gap-2">
              <span class="text-red-400 shrink-0 mt-0.5">📍</span>
              <span>Địa chỉ: <strong class="text-white font-medium"><?= out("address") ?></strong></span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-blue-400 shrink-0"></i>
              <span>Hotline 1: <a href="tel:<?= $phone_clean1 ?>" class="text-white font-bold font-mono hover:text-blue-400 transition"><?= out("phone1") ?></a></span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
              <span>Hotline 2: <a href="tel:<?= $phone_clean2 ?>" class="text-white font-bold font-mono hover:text-emerald-400 transition"><?= out("phone2") ?></a> <span class="text-slate-400">(24/7)</span></span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="mail" class="w-3.5 h-3.5 text-blue-400 shrink-0"></i>
              <span>Email: <a href="mailto:<?= out("email") ?>" class="text-white hover:text-blue-400 transition font-medium"><?= out("email") ?></a></span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-pink-400 shrink-0">⏰</span>
              <span>Giờ làm việc: <strong class="text-white font-medium"><?= out("working_hours") ?></strong></span>
            </div>
          </div>
          
          <div class="flex items-center gap-2.5 pt-2">
            <a href="<?= out("zalo_url") ?>" target="_blank" class="w-10 h-10 rounded-2xl bg-[#0068FF] hover:bg-[#0052cc] text-white flex items-center justify-center font-black text-[11px] tracking-tight shadow-md hover:scale-105 transition">ZALO</a>
            <a href="<?= out("facebook_url") ?>" target="_blank" class="w-10 h-10 rounded-2xl bg-[#1877F2] hover:bg-[#1565c0] text-white flex items-center justify-center shadow-md hover:scale-105 transition">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
            </a>
            <a href="<?= out("youtube_url") ?>" target="_blank" class="w-10 h-10 rounded-2xl bg-[#E62117] hover:bg-[#c61810] text-white flex items-center justify-center shadow-md hover:scale-105 transition">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="<?= out("tiktok_url") ?>" target="_blank" class="w-10 h-10 rounded-2xl bg-[#1E293B] hover:bg-[#0f172a] text-[#A78BFA] flex items-center justify-center shadow-md hover:scale-105 transition">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43V12.9a8.16 8.16 0 0 0 5.73 2.29V11.7a4.83 4.83 0 0 1-3.77-4.25z"/></svg>
            </a>
          </div>
        </div>

        <div class="md:col-span-2 space-y-3">
          <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">VỀ CHÚNG TÔI</h4>
          <ul class="space-y-2 text-slate-400">
            <li onclick="navigate('home')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Trang chủ</li>
            <li onclick="navigate('about')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Giới thiệu sàn BĐS</li>
            <li onclick="navigate('news')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Tin tức & Cẩm nang</li>
            <li onclick="navigate('ky-gui')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Ký gửi nhà đất</li>
            <li onclick="navigate('contact')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Liên hệ tư vấn</li>
          </ul>
        </div>

        <div class="md:col-span-2 space-y-3">
          <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">DANH MỤC DỰ ÁN</h4>
          <ul class="space-y-2 text-slate-400">
            <li onclick="navigate('can-ho')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Căn hộ chung cư</li>
            <li onclick="navigate('biet-thu')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Biệt thự nghỉ dưỡng</li>
            <li onclick="navigate('dat-nen')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Đất nền sổ đỏ</li>
            <li onclick="navigate('shophouse')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Shophouse thương mại</li>
            <li onclick="navigate('nha-cho-thue')" class="hover:text-blue-400 cursor-pointer transition text-xs flex items-center gap-1.5"><span class="text-blue-500">•</span> Nhà cho thuê</li>
          </ul>
        </div>

        <div class="md:col-span-3 space-y-3">
          <h4 class="font-bold text-sm text-white uppercase tracking-wider border-b border-white/10 pb-2">CHÍNH SÁCH BÁN HÀNG</h4>
          <ul class="space-y-2 text-slate-400 text-xs">
            <li class="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5"><span class="text-blue-500">•</span> Bàn giao 100% mã nguồn sạch</li>
            <li class="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5"><span class="text-blue-500">•</span> Bảo hành & Hỗ trợ kỹ thuật trọn đời</li>
            <li class="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5"><span class="text-blue-500">•</span> Tích hợp CMS quản trị tiếng Việt</li>
            <li class="hover:text-blue-400 cursor-pointer transition flex items-center gap-1.5"><span class="text-blue-500">•</span> Hỗ trợ cài đặt lên Hosting cPanel / XAMPP</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="w-full bg-[#050C1B] py-4 px-4 text-slate-400 text-[11px]">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
        <div>
          © 2026 Bản quyền thuộc về <strong class="text-white font-black"><?= out("name") ?></strong> — Nền tảng phân phối & Thiết kế Website Bất Động Sản Chuyên Nghiệp.
        </div>
        <div class="text-[10px] text-slate-500">
          Mẫu Giao Diện: <strong>BDS-05 (Urban City — Biệt Thự An Viên)</strong>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Bar -->
    <div class="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-2.5 flex items-center gap-2 shadow-[0_-4px_25px_rgba(0,0,0,0.15)]">
      <a href="tel:<?= $phone_clean1 ?>" class="flex-1 py-3 px-3 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] active:scale-95 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md transition-all text-center tracking-wider">
        <i data-lucide="phone" class="w-4 h-4 animate-pulse"></i> GỌI NGAY
      </a>
      <a href="<?= out("zalo_url") ?>" target="_blank" class="flex-1 py-3 px-3 rounded-xl bg-[#008848] hover:bg-[#007038] active:scale-95 text-white font-black text-xs uppercase flex items-center justify-center gap-2 shadow-md transition-all text-center tracking-wider">
        <i data-lucide="message-circle" class="w-4 h-4"></i> CHAT ZALO
      </a>
    </div>

    <!-- Floating Buttons Desktop -->
    <div class="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-center gap-3 select-none">
      <a href="<?= out("zalo_url") ?>" target="_blank" class="w-12 h-12 rounded-full bg-[#0068FF] hover:bg-[#0052cc] text-white shadow-xl shadow-blue-600/40 flex items-center justify-center font-black text-xs border-2 border-white/80 hover:scale-110 active:scale-95 transition-all">ZALO</a>
      <a href="tel:<?= $phone_clean1 ?>" class="w-12 h-12 rounded-full bg-[#E11D48] hover:bg-[#be123c] text-white shadow-xl shadow-red-600/40 flex items-center justify-center border-2 border-white/80 hover:scale-110 active:scale-95 transition-all relative">
        <span class="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40 -z-10"></span>
        <i data-lucide="phone" class="w-5 h-5 fill-current"></i>
      </a>
      <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="w-10 h-10 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white shadow-lg flex items-center justify-center border border-slate-700/50 hover:scale-110 active:scale-95 transition-all">
        <i data-lucide="arrow-up" class="w-4 h-4"></i>
      </button>
    </div>
  </footer>

  <script>
    // INITIAL DATA
    const BDS05_PROPERTIES = <?php
    $js_projects = array_map(function($p) {
        return [
            'id' => (int)$p['id'],
            'title' => $p['title'],
            'slug' => $p['slug'],
            'category' => $p['category'],
            'categoryLabel' => $p['category_label'] ?? $p['categoryLabel'] ?? '',
            'price' => $p['price'],
            'area' => $p['area'],
            'bedrooms' => (int)$p['bedrooms'],
            'bathrooms' => (int)$p['bathrooms'],
            'direction' => $p['direction'],
            'location' => $p['location'],
            'city' => $p['city'],
            'badge' => $p['badge'],
            'image' => $p['image'],
            'desc' => $p['description'] ?? $p['desc'] ?? '',
            'gallery' => [
                 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
                 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
            ]
        ];
    }, $projects);
    echo json_encode($js_projects, JSON_UNESCAPED_UNICODE);
?>;

    const BDS05_NEWS = [
      { id: 1, title: 'BARIA RESIDENCE DỰ ÁN ĐẤT NỀN BÀ RỊA VŨNG TÀU', slug: 'baria-residence-du-an-dat-nen-ba-ria-vung-tau', dateTag: '13 Th2', fullDate: '13/02/2026', category: 'Đất Dự Án', image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80', excerpt: 'Dự án Baria Residence được quy hoạch bài bản với diện tích lớn, hạ tầng đồng bộ đón đầu làn sóng cao tốc Biên Hòa - Vũng Tàu...', content: ['Baria Residence là một trong những dự án đất nền tâm điểm tại khu vực trung tâm TP. Bà Rịa với quy hoạch phân lô đồng bộ.', 'Dự án sở hữu vị trí chiến lược kết nối trực tiếp với Quốc Lộ 51 và các khu công nghiệp công nghệ cao lân cận.', 'Pháp lý hoàn chỉnh với sổ đỏ riêng từng nền, hỗ trợ vay ngân hàng lên đến 70% giá trị hợp đồng.'], views: 3200 },
      { id: 2, title: 'Cải tạo nhà cấp 4 thành không gian sống đẹp hơn cả nhà xây mới', slug: 'cai-tao-nha-cap-4-thanh-khong-gian-song-dep', dateTag: '04 Th12', fullDate: '04/12/2025', category: 'Kiến Trúc & Nhà Đẹp', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', excerpt: 'Ít ai nghĩ rằng căn nhà đẹp như biệt thự nghỉ dưỡng dưới đây từng là một ngôi nhà cấp 4 cũ kỹ đã xuống cấp theo thời gian...', content: ['Gia chủ đã quyết định giữ lại bộ khung kết cấu chính và cải tạo lại toàn bộ mặt tiền bằng cửa kính kính lớn đón sáng tự nhiên.', 'Sân vườn trước nhà được trồng cỏ Nhật và tiểu cảnh hoa giấy tạo cảm giác thư thái mỗi khi trở về nhà.', 'Chi phí cải tạo tiết kiệm hơn 40% so với việc đập đi xây mới hoàn toàn.'], views: 4500 },
      { id: 3, title: 'Nhà 35m² ngập tràn ánh sáng nhờ vào thiết kế độc lạ', slug: 'nha-35m2-ngap-tran-anh-sang-nho-thiet-ke-doc-la', dateTag: '04 Th12', fullDate: '04/12/2025', category: 'Thiết Kế Nội Thất', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', excerpt: 'Ngôi nhà 3 tầng được giới thiệu dưới đây dù có diện tích hạn chế nhưng không gian lúc nào cũng ngập tràn ánh nắng và gió trời...', content: ['Giải pháp giếng trời kết hợp cầu thang kính giúp đưa ánh sáng từ mái nhà xuyên suốt xuống tận tầng trệt.', 'Bếp và phòng ăn liên thông tạo cảm giác rộng rãi và tiện nghi trong sinh hoạt hàng ngày.'], views: 2980 },
      { id: 4, title: 'Căn hộ gác mái của cặp vợ chồng trẻ đầy đủ và đẹp mắt đến khó tin', slug: 'can-ho-gac-mai-cua-cap-vo-chong-tre', dateTag: '04 Th12', fullDate: '04/12/2025', category: 'Không Gian Sống', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', excerpt: 'Căn hộ nhỏ xinh dưới đây của cặp vợ chồng trẻ nằm ở tầng gác mái nhưng được bố trí nội thất thông minh vô cùng ấm cúng...', content: ['Không gian áp mái với cửa sổ trần nghiêng mang lại tầm nhìn ngắm sao đêm tuyệt đẹp giữa lòng thành phố.', 'Nội thất gỗ sáng màu kết hợp cây xanh tạo cảm giác mộc mạc, thư giãn đậm chất Scandinavian.'], views: 3840 },
      { id: 5, title: 'Nhà đẹp ngập nắng ở Sài Gòn khiến ai cũng mê mẩn', slug: 'nha-dep-ngap-nang-o-sai-gon-khien-ai-cung-me-man', dateTag: '04 Th12', fullDate: '04/12/2025', category: 'Nhà Đẹp', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', excerpt: 'Nhìn từ bên ngoài, ngôi nhà không có quá nhiều điểm nổi bật nhưng bên trong là một ốc đảo xanh mát với hồ cá và cây xanh...', content: ['Thiết kế mở lấy thiên nhiên làm trọng tâm giúp giảm nhiệt độ trong nhà từ 3-4 độ C so với bên ngoài.', 'Các mảng tường gạch thô và bê tông mài tạo điểm nhấn kiến trúc mộc mạc và cá tính.'], views: 4120 },
      { id: 6, title: 'Cải tạo phòng khách thành không gian sinh hoạt đẹp như mơ', slug: 'cai-tao-phong-khach-thanh-khong-gian-sinh-hoat-dep', dateTag: '04 Th12', fullDate: '04/12/2025', category: 'Ý Tưởng Trang Trí', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', excerpt: 'Không gian sống tươi vui và đẹp mắt luôn tạo cho chúng ta sự hứng khởi sau những giờ làm việc căng thẳng...', content: ['Sử dụng các gam màu pastel như xanh bạc hà và vàng nhạt giúp không gian phòng khách bừng sáng và tràn đầy năng lượng.', 'Sofa vải êm ái cùng thảm dệt tay tạo điểm nhấn ấm cúng cho cả gia đình quây quần.'], views: 3670 }
    ];

    const NAV_ITEMS = [
      { id: 'home', label: 'Trang Chủ' },
      { id: 'dat-du-an', label: 'Đất Dự Án' },
      { id: 'dat-nen', label: 'Đất Nền' },
      { id: 'nha-o', label: 'Nhà Ở' },
      { id: 'nha-cho-thue', label: 'Nhà Cho Thuê' },
      { id: 'news', label: 'Tin Tức' },
    ];

    let currentPage = 'home';
    let currentProp = null;
    let currentArt = null;
    let mobileMenuOpen = false;

    // Filter state
    let filterState = { type: 'all', city: 'all', price: 'all', bedrooms: 'all', area: 'all' };
    
    // Gallery state
    let galleryState = { images: [], activeIdx: 0, interval: null, isZoomed: false };

    function init() {
      renderNav();
      navigate('home');
      lucide.createIcons();
    }

    function toggleMobileMenu() {
      mobileMenuOpen = !mobileMenuOpen;
      const menu = document.getElementById('mobile-menu');
      const icon = document.getElementById('mobile-menu-icon');
      if(mobileMenuOpen) {
        menu.classList.remove('hidden');
        icon.setAttribute('data-lucide', 'x');
      } else {
        menu.classList.add('hidden');
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    }

    function renderNav() {
      const deskNav = document.getElementById('desktop-nav');
      deskNav.innerHTML = NAV_ITEMS.map(nav => {
        const isActive = currentPage === nav.id || (nav.id === 'news' && currentPage === 'news-detail');
        const activeCls = isActive ? 'text-[#0084FF] font-black border-b-2 border-[#0084FF] rounded-none' : 'text-slate-600 hover:text-[#0084FF] hover:bg-slate-50';
        return `<button onclick="navigate('${nav.id}')" class="whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer ${activeCls}">${nav.label}</button>`;
      }).join('');

      const mobNav = document.getElementById('mobile-menu');
      mobNav.innerHTML = NAV_ITEMS.concat([{id: 'contact', label: 'Liên Hệ'}]).map(nav => {
        const isActive = currentPage === nav.id || (nav.id === 'news' && currentPage === 'news-detail');
        const activeCls = isActive ? 'bg-blue-50 text-[#0084FF] font-black' : 'hover:bg-slate-50';
        return `<button onclick="navigate('${nav.id}')" class="block w-full text-left py-2 px-3 rounded cursor-pointer ${activeCls}">${nav.label}</button>`;
      }).join('') + `
        <div class="pt-2 flex flex-col gap-2">
          <a href="tel:<?= $phone_clean1 ?>" class="block w-full text-center py-2.5 bg-[#0084FF] text-white font-black rounded-lg cursor-pointer">
            📞 GỌI HOTLINE: <?= out("phone1") ?>
          </a>
        </div>
      `;
    }

    function navigate(page, slug = null) {
      currentPage = page;
      if (mobileMenuOpen) toggleMobileMenu();
      renderNav();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      let content = '';
      if (page === 'home') {
        content = renderHomePage();
      } else if (['dat-du-an', 'dat-nen', 'nha-o', 'nha-cho-thue', 'news', 'contact'].includes(page)) {
        content = renderArchivePage(page);
      } else if (page === 'property-detail' && slug) {
        currentProp = BDS05_PROPERTIES.find(p => p.slug === slug);
        content = renderPropertyDetail(currentProp);
      } else if (page === 'news-detail' && slug) {
        currentArt = BDS05_NEWS.find(a => a.slug === slug);
        content = renderArticleDetail(currentArt);
      }

      document.getElementById('app-main').innerHTML = content;
      
      // Start gallery if needed
      if (page === 'property-detail') {
        startGallery(currentProp.gallery || []);
      }

      lucide.createIcons();
    }

    function applyFilter() {
      const type = document.getElementById('filter-type').value;
      const city = document.getElementById('filter-city').value;
      const price = document.getElementById('filter-price').value;
      const bedrooms = document.getElementById('filter-bedrooms').value;
      const area = document.getElementById('filter-area').value;
      
      filterState = { type, city, price, bedrooms, area };
      // In a real app we'd redirect or filter live. We'll redirect to dat-du-an for demo.
      navigate('dat-du-an');
    }

    function getFilteredProps(cat) {
      return BDS05_PROPERTIES.filter(item => {
        if (['dat-du-an', 'dat-nen', 'nha-o', 'nha-cho-thue'].includes(cat)) {
          if (item.category !== cat) return false;
        }
        return true;
      });
    }

    function renderPropertyCard(item) {
      return `
        <div onclick="navigate('property-detail', '${item.slug}')" class="bg-white rounded-sm border border-slate-200 hover:border-[#0084FF] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between relative">
          <div>
            <div class="h-44 relative overflow-hidden bg-slate-100">
              <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div class="absolute top-0 right-0 overflow-hidden w-20 h-20 pointer-events-none">
                <div class="bg-[#D83A3A] text-white text-[9px] font-black text-center py-1 uppercase tracking-wider transform rotate-45 translate-x-6 translate-y-2 shadow-md">
                  ${item.badge}
                </div>
              </div>
            </div>
            <div class="p-4 space-y-2">
              <h3 class="font-bold text-xs sm:text-sm text-[#C05621] group-hover:text-[#0084FF] transition line-clamp-1">${item.title}</h3>
              <div class="grid grid-cols-2 gap-y-1 text-[11px] text-slate-500 pt-1">
                <div class="flex items-center gap-1"><i data-lucide="maximize-2" class="w-3 h-3 text-slate-400"></i> <span>Diện tích: <strong class="text-slate-700">${item.area}</strong></span></div>
                <div class="flex items-center gap-1"><i data-lucide="bed" class="w-3 h-3 text-slate-400"></i> <span>Phòng ngủ: <strong class="text-slate-700">${item.bedrooms}</strong></span></div>
                <div class="flex items-center gap-1"><i data-lucide="bath" class="w-3 h-3 text-slate-400"></i> <span>Phòng tắm: <strong class="text-slate-700">${item.bathrooms}</strong></span></div>
                <div class="flex items-center gap-1"><i data-lucide="compass" class="w-3 h-3 text-slate-400"></i> <span>Hướng: <strong class="text-slate-700">${item.direction}</strong></span></div>
              </div>
              <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span class="font-extrabold text-[#0084FF] text-xs sm:text-sm">${item.price}</span>
                <span class="text-[11px] text-slate-400 group-hover:text-[#0084FF] font-semibold transition">Chi tiết ›</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function renderHomePage() {
      return `
        <div class="bg-[#F8F9FA] space-y-14 pb-16">
          <div class="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center px-4 bg-cover bg-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.35)), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80)">
            <div class="max-w-7xl mx-auto w-full px-4">
              <div class="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-sm shadow-2xl border border-white/40 max-w-5xl mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 text-xs">
                  <select id="filter-type" class="bg-white text-slate-900 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer">
                    <option value="all">Chọn loại BĐS</option>
                    <option value="dat-du-an">Đất dự án</option>
                    <option value="dat-nen">Đất nền</option>
                    <option value="nha-o">Nhà ở</option>
                    <option value="nha-cho-thue">Nhà cho thuê</option>
                  </select>
                  <select id="filter-city" class="bg-white text-slate-900 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer">
                    <option value="all">Vị trí / Thành phố</option>
                    <option value="Nha Trang">Nha Trang</option>
                    <option value="Phan Thiết">Phan Thiết</option>
                    <option value="Đà Lạt">Đà Lạt</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                  <select id="filter-price" class="bg-white text-slate-900 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer">
                    <option value="all">Khoảng giá</option>
                    <option value="under-2">Dưới 2 Tỷ</option>
                    <option value="2-5">Từ 2 - 5 Tỷ</option>
                    <option value="above-5">Trên 5 Tỷ</option>
                  </select>
                  <select id="filter-bedrooms" class="bg-white text-slate-900 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer">
                    <option value="all">Số phòng ngủ</option>
                    <option value="3">3+ Phòng ngủ</option>
                    <option value="4">4+ Phòng ngủ</option>
                    <option value="5">5+ Phòng ngủ</option>
                  </select>
                  <select id="filter-area" class="bg-white text-slate-900 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 font-medium focus:outline-none focus:border-[#0084FF] cursor-pointer">
                    <option value="all">Diện tích</option>
                    <option value="under-300">Dưới 300 m²</option>
                    <option value="above-300">Trên 300 m²</option>
                  </select>
                  <button onclick="applyFilter()" class="bg-[#10B981] hover:bg-emerald-600 text-white font-black px-4 py-2 rounded-lg transition shadow flex items-center justify-center gap-1 cursor-pointer active:scale-95">
                    <i data-lucide="search" class="w-3.5 h-3.5"></i> Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-center">
              <h2 class="text-lg sm:text-xl md:text-2xl font-black text-[#C05621] uppercase tracking-wider">── DỰ ÁN MỚI ──</h2>
              <div class="w-12 h-0.5 bg-[#C05621] mx-auto mt-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${BDS05_PROPERTIES.slice(0, 6).map(renderPropertyCard).join('')}
            </div>
          </section>

          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-center">
              <h2 class="text-lg sm:text-xl md:text-2xl font-black text-[#C05621] uppercase tracking-wider">── DỰ ÁN BÁN CHẠY ──</h2>
              <div class="w-12 h-0.5 bg-[#C05621] mx-auto mt-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${BDS05_PROPERTIES.slice(0, 6).map(renderPropertyCard).join('')}
            </div>
          </section>

          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-center">
              <h2 class="text-lg sm:text-xl md:text-2xl font-black text-[#C05621] uppercase tracking-wider">── TIN TỨC CẬP NHẬT ──</h2>
              <div class="w-12 h-0.5 bg-[#C05621] mx-auto mt-1"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              ${BDS05_NEWS.map(art => `
                <div onclick="navigate('news-detail', '${art.slug}')" class="bg-white rounded-sm border border-slate-200 hover:border-[#0084FF] overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between">
                  <div class="h-44 overflow-hidden bg-slate-100">
                    <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div class="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 class="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#0084FF] transition line-clamp-2 leading-snug">${art.title}</h3>
                      <p class="text-[11px] text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">${art.excerpt}</p>
                    </div>
                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>${art.fullDate}</span>
                      <span class="text-[#0084FF] font-bold">Xem thêm ›</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        </div>
      `;
    }

    function renderArchivePage(page) {
      const pageTitleMap = {
        'dat-du-an': 'Đất Dự Án Quy Hoạch Đồng Bộ',
        'dat-nen': 'Đất Nền Phân Lô Sổ Đỏ Trao Tay',
        'nha-o': 'Danh Sách Nhà Ở & Biệt Thự An Viên',
        'nha-cho-thue': 'Nhà Cho Thuê & Biệt Thự Nghỉ Dưỡng',
        'news': 'Danh Sách Bài Viết & Cẩm Nang Bất Động Sản',
        'contact': 'Liên Hệ & Đăng Ký Tư Vấn BĐS'
      };
      const currentTitle = pageTitleMap[page] || 'Danh sách bài viết & Dự án';

      return `
        <div class="bg-[#F8F9FA] py-8 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-xs text-slate-500 flex items-center gap-1.5">
              <span onclick="navigate('home')" class="hover:text-[#0084FF] cursor-pointer">Trang chủ</span>
              <span>/</span>
              <span class="text-[#0084FF] font-bold">${currentTitle}</span>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div class="lg:col-span-8 space-y-4">
                ${BDS05_NEWS.map(art => `
                  <div onclick="navigate('news-detail', '${art.slug}')" class="bg-white rounded-sm border border-slate-200 hover:border-[#0084FF] p-4 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row gap-4 items-start group">
                    <div class="w-full sm:w-48 h-36 relative shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      <img src="${art.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <div class="absolute top-2 left-2 bg-[#0084FF] text-white text-[10px] font-black px-2 py-1 rounded shadow text-center leading-tight">${art.dateTag}</div>
                    </div>
                    <div class="flex-1 space-y-2">
                      <h3 class="font-black text-xs sm:text-sm text-slate-800 group-hover:text-[#0084FF] transition line-clamp-2 leading-snug">${art.title}</h3>
                      <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">${art.excerpt}</p>
                      <div class="pt-2 text-[11px] text-[#0084FF] font-bold">Đọc tiếp [...]</div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div class="lg:col-span-4 space-y-6">
                <div class="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs">
                  <div class="bg-[#0084FF] px-4 py-2.5 text-white font-black text-xs uppercase tracking-wider">DANH MỤC BIỆT THỰ</div>
                  <div class="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    ${[
                      { id: 'dat-du-an', label: 'Đất dự án' },
                      { id: 'dat-nen', label: 'Đất nền' },
                      { id: 'nha-cho-thue', label: 'Nhà cho thuê' },
                      { id: 'nha-o', label: 'Nhà ở' }
                    ].map(cat => `
                      <div onclick="navigate('${cat.id}')" class="p-3 hover:bg-slate-50 hover:text-[#0084FF] transition cursor-pointer flex items-center justify-between">
                        <span>${cat.label}</span>
                        <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400"></i>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs">
                  <div class="bg-[#0084FF] px-4 py-2.5 text-white font-black text-xs uppercase tracking-wider">CÓ THỂ BẠN THÍCH</div>
                  <div class="divide-y divide-slate-100 p-2 space-y-2">
                    ${BDS05_PROPERTIES.slice(0, 5).map(item => `
                      <div onclick="navigate('property-detail', '${item.slug}')" class="p-2 hover:bg-slate-50 rounded-lg transition cursor-pointer flex gap-3 items-center group">
                        <img src="${item.image}" class="w-16 h-12 rounded object-cover shrink-0" />
                        <div class="flex-1 min-w-0">
                          <h4 class="font-bold text-xs text-slate-800 group-hover:text-[#0084FF] transition truncate">${item.title}</h4>
                          <p class="text-xs font-black text-[#0084FF] mt-0.5">${item.price}</p>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function renderPropertyDetail(prop) {
      return `
        <div class="bg-[#F8F9FA] py-8 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-xs text-slate-500 flex items-center gap-1.5">
              <span onclick="navigate('home')" class="hover:text-[#0084FF] cursor-pointer">Trang chủ</span>
              <span>/</span>
              <span onclick="navigate('dat-du-an')" class="hover:text-[#0084FF] cursor-pointer">Dự án</span>
              <span>/</span>
              <span class="text-[#0084FF] font-bold truncate">${prop.title}</span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div class="lg:col-span-8 space-y-6">
                <div class="bg-white rounded-sm border border-slate-200 p-6 shadow-xs space-y-3">
                  <span class="px-3 py-1 bg-red-100 text-red-700 font-black text-xs rounded-sm">${prop.badge}</span>
                  <h1 class="text-xl sm:text-2xl font-black text-slate-900 leading-snug">${prop.title}</h1>
                  <p class="text-xs text-slate-500 flex items-center gap-1.5">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-red-500 shrink-0"></i> ${prop.location}
                  </p>
                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span class="text-xs text-slate-400 block font-medium">Giá bán niêm yết</span>
                      <span class="text-2xl font-black text-[#0084FF]">${prop.price}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-xs text-slate-400 block font-medium">Tổng diện tích</span>
                      <span class="text-base font-bold text-slate-800">${prop.area}</span>
                    </div>
                  </div>
                </div>

                <!-- Gallery -->
                <div class="bg-white rounded-sm border border-slate-200 p-4 shadow-xs space-y-3" id="gallery-container">
                  <!-- JS Will render gallery here -->
                </div>

                <div class="bg-white rounded-sm border border-slate-200 p-6 shadow-xs space-y-3 text-xs sm:text-sm">
                  <h3 class="font-black text-sm text-[#C05621] uppercase border-b border-slate-100 pb-2">THÔNG TIN CHI TIẾT BẤT ĐỘNG SẢN</h3>
                  <p class="text-slate-700 leading-relaxed">${prop.desc}</p>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                    <div class="p-3 bg-slate-50 rounded-lg">Số PN: <strong class="block text-slate-800">${prop.bedrooms}</strong></div>
                    <div class="p-3 bg-slate-50 rounded-lg">Số WC: <strong class="block text-slate-800">${prop.bathrooms}</strong></div>
                    <div class="p-3 bg-slate-50 rounded-lg">Hướng: <strong class="block text-slate-800">${prop.direction}</strong></div>
                    <div class="p-3 bg-slate-50 rounded-lg">Pháp lý: <strong class="block text-emerald-700 font-bold">Sổ hồng riêng</strong></div>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-4 space-y-6">
                <div class="bg-white rounded-sm border border-slate-200 p-6 shadow-xs space-y-4">
                  <h3 class="font-black text-base text-slate-900 uppercase">Liên Hệ Tư Vấn BĐS Này</h3>
                  <form onsubmit="handleContactSubmit(event)" class="space-y-3 text-xs">
                    <input type="text" id="contact-name" placeholder="Họ và tên..." required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5" />
                    <input type="tel" id="contact-phone" placeholder="Số điện thoại..." required class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-bold text-[#0084FF]" />
                    <textarea rows="3" id="contact-note" placeholder="Lời nhắn..." class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"></textarea>
                    <button type="submit" class="w-full py-3 bg-[#0084FF] hover:bg-blue-600 text-white font-black text-xs uppercase rounded-lg shadow transition cursor-pointer">
                      GỬI YÊU CẦU NGAY
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function renderArticleDetail(art) {
      return `
        <div class="bg-[#F8F9FA] py-8 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 max-w-4xl space-y-6">
            <div class="text-xs text-slate-500 flex items-center gap-1.5">
              <span onclick="navigate('home')" class="hover:text-[#0084FF] cursor-pointer">Trang chủ</span>
              <span>/</span>
              <span onclick="navigate('news')" class="hover:text-[#0084FF] cursor-pointer">Tin tức</span>
              <span>/</span>
              <span class="text-[#0084FF] font-bold truncate">${art.title}</span>
            </div>

            <div class="bg-white rounded-sm border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <span class="px-3 py-1 bg-blue-100 text-[#0084FF] font-bold text-xs rounded-sm">${art.category}</span>
              <h1 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight">${art.title}</h1>
              <div class="text-xs text-slate-400 flex items-center gap-3 border-b border-slate-100 pb-3">
                <span>Ngày đăng: ${art.fullDate}</span>
                <span>•</span>
                <span>${art.views} lượt xem</span>
              </div>
              <div class="rounded-sm overflow-hidden shadow-xs">
                <img src="${art.image}" class="w-full h-80 object-cover" />
              </div>
              <div class="space-y-4 text-sm text-slate-700 leading-relaxed">
                ${art.content.map(p => `<p>${p}</p>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // GALLERY LOGIC
    function startGallery(images) {
      if(!images || !images.length) return;
      galleryState.images = images;
      galleryState.activeIdx = 0;
      renderGallery();
      
      if(galleryState.interval) clearInterval(galleryState.interval);
      galleryState.interval = setInterval(() => {
        if(!galleryState.isZoomed && document.getElementById('gallery-container') && !document.getElementById('gallery-container').matches(':hover')) {
          galleryState.activeIdx = (galleryState.activeIdx + 1) % galleryState.images.length;
          renderGallery();
        }
      }, 3000);
    }

    function changeGalleryIdx(idx) {
      galleryState.activeIdx = idx;
      renderGallery();
    }

    function nextGalleryImg() {
      galleryState.activeIdx = (galleryState.activeIdx + 1) % galleryState.images.length;
      renderGallery();
      if(galleryState.isZoomed) renderLightbox();
    }

    function prevGalleryImg() {
      galleryState.activeIdx = (galleryState.activeIdx - 1 + galleryState.images.length) % galleryState.images.length;
      renderGallery();
      if(galleryState.isZoomed) renderLightbox();
    }

    function toggleZoom() {
      galleryState.isZoomed = !galleryState.isZoomed;
      if (galleryState.isZoomed) {
        renderLightbox();
      } else {
        const lb = document.getElementById('lightbox-overlay');
        if(lb) lb.remove();
      }
    }

    function renderGallery() {
      const container = document.getElementById('gallery-container');
      if(!container) return;
      
      const { images, activeIdx } = galleryState;
      const currentImg = images[activeIdx] || images[0];
      const total = images.length;
      const gridCols = total <= 4 ? 'grid-cols-4' : 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6';

      container.innerHTML = `
        <div class="space-y-3 select-none w-full relative">
          <div onclick="toggleZoom()" class="h-80 sm:h-96 md:h-[420px] w-full rounded-xl overflow-hidden bg-slate-950 relative shadow-lg cursor-zoom-in group">
            <img src="${currentImg}" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
            <div class="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-md z-10 pointer-events-none">
              ${activeIdx + 1} / ${total}
            </div>
            <button onclick="event.stopPropagation(); prevGalleryImg()" class="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition shadow-md z-10 hover:scale-110 active:scale-95">
              <i data-lucide="chevron-left"></i>
            </button>
            <button onclick="event.stopPropagation(); nextGalleryImg()" class="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition shadow-md z-10 hover:scale-110 active:scale-95">
              <i data-lucide="chevron-right"></i>
            </button>
          </div>
          <div class="grid ${gridCols} gap-2.5">
            ${images.map((img, i) => `
              <div onclick="changeGalleryIdx(${i})" class="h-16 sm:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition relative group ${activeIdx === i ? 'border-blue-600 ring-2 ring-blue-300 scale-95 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'}">
                <img src="${img}" class="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                ${activeIdx === i ? '<div class="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
      lucide.createIcons();
    }

    function renderLightbox() {
      let lb = document.getElementById('lightbox-overlay');
      if(!lb) {
        lb = document.createElement('div');
        lb.id = 'lightbox-overlay';
        lb.className = 'fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6';
        lb.onclick = toggleZoom;
        document.body.appendChild(lb);
      }
      const { images, activeIdx } = galleryState;
      const currentImg = images[activeIdx];

      lb.innerHTML = `
        <div class="w-full flex items-center justify-between text-white z-20" onclick="event.stopPropagation()">
          <span class="text-sm font-bold text-slate-300">Chi tiết ảnh: <strong class="text-white">${activeIdx + 1} / ${images.length}</strong></span>
          <button onclick="toggleZoom()" class="p-2 bg-white/10 hover:bg-white/25 text-white rounded-full transition hover:scale-110"><i data-lucide="x"></i></button>
        </div>
        <div class="relative max-w-5xl max-h-[75vh] flex items-center justify-center my-auto" onclick="event.stopPropagation()">
          <img src="${currentImg}" class="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition duration-300" />
          <button onclick="prevGalleryImg()" class="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-lg transition hover:scale-110 active:scale-95"><i data-lucide="chevron-left" class="w-7 h-7"></i></button>
          <button onclick="nextGalleryImg()" class="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-lg transition hover:scale-110 active:scale-95"><i data-lucide="chevron-right" class="w-7 h-7"></i></button>
        </div>
        <div class="w-full max-w-3xl flex justify-center gap-2 overflow-x-auto py-2 px-2 z-20 gallery-thumbs" onclick="event.stopPropagation()">
          ${images.map((img, i) => `
            <div onclick="changeGalleryIdx(${i})" class="w-16 h-12 sm:w-20 sm:h-14 rounded-md overflow-hidden border-2 cursor-pointer transition shrink-0 ${activeIdx === i ? 'border-white ring-2 ring-blue-400 scale-105' : 'border-white/30 opacity-50 hover:opacity-100'}">
              <img src="${img}" class="w-full h-full object-cover" />
            </div>
          `).join('')}
        </div>
      `;
      lucide.createIcons();
    }

    function showToast(msg) {
      const toast = document.getElementById('toast-container');
      document.getElementById('toast-message').innerText = msg;
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 4000);
    }

    function handleContactSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const phone = document.getElementById('contact-phone').value;
      if (!name || !phone) {
        alert('Vui lòng nhập họ tên và số điện thoại liên hệ!');
        return;
      }
      
      const formNode = e.target;
      const apiURL = "api/contact.php";
      
      const formData = new FormData();
      formData.append('fullName', name);
      formData.append('phone', phone);
      formData.append('message', document.getElementById('contact-note').value);
      
      fetch(apiURL, {
        method: 'POST',
        body: formData
      }).catch(() => {}); // ignore errors for demo
      
      alert(`🎉 Cảm ơn quý khách ${name}!\nBộ phận tư vấn Biệt Thự Nghỉ Dưỡng An Viên sẽ liên hệ qua SĐT ${phone} trong 15 phút để gửi bảng giá và chính sách ưu đãi.`);
      formNode.reset();
    }

    function handleNewsletter() {
      const em = document.getElementById('newsletter-email').value;
      if(!em.trim()) {
        alert('Vui lòng nhập địa chỉ email!');
        return;
      }
      showToast('✓ Đăng ký email nhận bảng tin BĐS thành công!');
      document.getElementById('newsletter-email').value = '';
    }

    // Boot
    window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>
