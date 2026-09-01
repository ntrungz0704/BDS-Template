<?php
require_once 'config/db.php';

// Default company info
$company = [
    'name' => '<?= htmlspecialchars($company["name"]) ?>',
    'phone' => '<?= htmlspecialchars($company["phone"]) ?>',
    'email' => '<?= htmlspecialchars($company["email"]) ?>',
    'address' => '<?= htmlspecialchars($company["address"]) ?>',
    'slogan' => '<?= htmlspecialchars($company["slogan"]) ?>',
    'zalo' => '<?= htmlspecialchars($company["zalo"]) ?>'
];

$properties = [];
$projects = [];
$news = [];
$testimonials = [];

if (isset($pdo) && $pdo) {
    try {
        $stmt = $pdo->query('SELECT * FROM company_info LIMIT 1');
        $dbCompany = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($dbCompany) {
            $company = $dbCompany;
        }

        $stmt = $pdo->query('SELECT * FROM properties');
        $dbProps = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($dbProps)) {
            foreach ($dbProps as $p) {
                $properties[] = [
                    'id' => (int)$p['id'],
                    'title' => $p['title'],
                    'slug' => $p['slug'],
                    'category' => $p['category'],
                    'type' => $p['type'],
                    'price' => $p['price'],
                    'priceNum' => (float)$p['priceNum'],
                    'area' => $p['area'],
                    'areaNum' => (float)$p['areaNum'],
                    'location' => $p['location'],
                    'district' => $p['district'],
                    'province' => $p['province'],
                    'legal' => $p['legal'],
                    'badge' => $p['badge'],
                    'image' => $p['image'],
                    'gallery' => json_decode($p['gallery'], true) ?: [],
                    'date' => $p['date'],
                    'desc' => $p['description'],
                    'author' => [
                        'name' => $p['author_name'],
                        'phone' => $p['author_phone'],
                        'zalo' => $p['author_zalo'],
                        'avatar' => $p['author_avatar']
                    ]
                ];
            }
        }

        $stmt = $pdo->query('SELECT * FROM projects');
        $dbProj = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($dbProj)) {
            foreach ($dbProj as $p) {
                $projects[] = [
                    'id' => (int)$p['id'],
                    'title' => $p['title'],
                    'slug' => $p['slug'],
                    'scale' => $p['scale'],
                    'price' => $p['price'],
                    'priceNum' => (float)$p['priceNum'],
                    'location' => $p['location'],
                    'status' => $p['status'],
                    'image' => $p['image'],
                    'desc' => $p['description']
                ];
            }
        }

        $stmt = $pdo->query('SELECT * FROM news');
        $dbNews = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($dbNews)) {
            foreach ($dbNews as $n) {
                $news[] = [
                    'id' => (int)$n['id'],
                    'title' => $n['title'],
                    'slug' => $n['slug'],
                    'date' => $n['date'],
                    'author' => $n['author'],
                    'category' => $n['category'],
                    'image' => $n['image'],
                    'desc' => $n['description'],
                    'content' => json_decode($n['content'], true) ?: [],
                    'views' => (int)$n['views']
                ];
            }
        }

        $stmt = $pdo->query('SELECT * FROM testimonials');
        $dbTest = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($dbTest)) {
            foreach ($dbTest as $t) {
                $testimonials[] = [
                    'id' => (int)$t['id'],
                    'name' => $t['name'],
                    'role' => $t['role'],
                    'comment' => $t['comment'],
                    'avatar' => $t['avatar']
                ];
            }
        }
    } catch (Exception $e) {
        // Ignore and fallback
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bất động sản Tuấn Nhân</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet">
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
          }
        }
      }
    }
  </script>

  <style>
    body { font-family: 'Inter', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }
    
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;  
      overflow: hidden;
    }
  </style>
</head>
<body class="bg-[#FCFBF9] text-slate-800 antialiased min-h-screen flex flex-col justify-between">

  <!-- HEADER -->
  <header class="w-full bg-[#4A2810] text-white sticky top-0 z-40 shadow-md" id="mainHeader">
    <!-- Top Hotline Bar -->
    <div class="bg-[#351C0A] border-b border-white/10 text-xs py-1.5 px-4 text-amber-100/80">
      <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div class="flex items-center gap-4 text-[11px] truncate">
          <span class="hidden sm:inline font-semibold">KHO MẪU WEBSITE BẤT ĐỘNG SẢN CAO CẤP SỐ 1 VIỆT NAM</span>
          <a href="mailto:<?= htmlspecialchars($company["email"]) ?>" class="hover:text-amber-300 transition flex items-center gap-1">
            <i data-lucide="mail" class="w-[11px] h-[11px] text-amber-400"></i> <?= htmlspecialchars($company["email"]) ?>
          </a>
        </div>
        <div class="flex items-center gap-4 text-[11px]">
          <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="flex items-center gap-1 font-bold text-amber-300 hover:text-white transition">
            <i data-lucide="phone" class="w-[11px] h-[11px] text-amber-400"></i> Hotline: <?= htmlspecialchars($company["phone"]) ?>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Nav Strip -->
    <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
      <!-- Brand Logo -->
      <div onclick="navigate('home')" class="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
        <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-[#4A2810] font-black text-base sm:text-xl shadow-md group-hover:scale-105 transition shrink-0">
          TB
        </div>
        <div class="min-w-0 truncate">
          <div class="text-base sm:text-lg font-black tracking-wider text-amber-300 uppercase leading-none group-hover:text-white transition truncate">
            <?= htmlspecialchars($company["name"]) ?>
          </div>
          <div class="text-[7.5px] sm:text-[10px] text-amber-100/70 font-semibold tracking-wider mt-0.5 truncate">
            <?= htmlspecialchars($company["slogan"]) ?>
          </div>
        </div>
      </div>

      <!-- Desktop Menu -->
      <nav class="hidden lg:flex items-center gap-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap" id="desktopNav">
        <!-- populated by js -->
      </nav>

      <!-- Right CTA Button -->
      <div class="hidden md:flex items-center gap-3 shrink-0">
        <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-sm shadow-md transition flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap shrink-0">
          <i data-lucide="phone" class="w-[13px] h-[13px]"></i> <?= htmlspecialchars($company["phone"]) ?>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button onclick="toggleMobileMenu()" class="lg:hidden p-1.5 sm:p-2 text-amber-300 hover:bg-white/10 rounded-md cursor-pointer ml-auto shrink-0 flex items-center justify-center" aria-label="Toggle navigation menu">
        <i data-lucide="menu" id="menuIcon" class="w-5 h-5"></i>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div id="mobileDrawer" class="hidden lg:hidden bg-[#351C0A] border-t border-white/10 px-4 py-3 space-y-1 text-xs font-bold uppercase text-amber-100 shadow-xl">
      <!-- populated by js -->
    </div>
  </header>

  <!-- MAIN CONTENT -->
  <main id="appMain" class="flex-1 w-full">
    <!-- pages rendered here -->
  </main>

  <!-- FOOTER -->
  <footer class="bg-[#2D1A11] text-amber-100/70 py-12 text-xs border-t-4 border-amber-500">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="space-y-4">
        <div class="text-xl font-black text-amber-400 font-serif uppercase tracking-widest"><?= htmlspecialchars($company["name"]) ?></div>
        <p><?= htmlspecialchars($company["slogan"]) ?></p>
        <div class="space-y-2">
          <p class="flex items-center gap-2"><i data-lucide="map-pin" class="w-4 h-4 text-amber-500"></i> <?= htmlspecialchars($company["address"]) ?></p>
          <p class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-amber-500"></i> <?= htmlspecialchars($company["phone"]) ?></p>
          <p class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-amber-500"></i> <?= htmlspecialchars($company["email"]) ?></p>
        </div>
      </div>
      <div class="space-y-4">
        <h4 class="font-bold text-white uppercase text-sm font-serif">Về chúng tôi</h4>
        <ul class="space-y-2">
          <li><a href="#" onclick="navigate('about'); return false;" class="hover:text-amber-400">Giới thiệu</a></li>
          <li><a href="#" onclick="navigate('san-pham-bds'); return false;" class="hover:text-amber-400">Sản phẩm</a></li>
          <li><a href="#" onclick="navigate('du-an'); return false;" class="hover:text-amber-400">Dự án</a></li>
          <li><a href="#" onclick="navigate('news'); return false;" class="hover:text-amber-400">Tin tức</a></li>
          <li><a href="#" onclick="navigate('contact'); return false;" class="hover:text-amber-400">Liên hệ</a></li>
        </ul>
      </div>
      <div class="space-y-4">
        <h4 class="font-bold text-white uppercase text-sm font-serif">Chính sách</h4>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-amber-400">Bảo mật thông tin</a></li>
          <li><a href="#" class="hover:text-amber-400">Điều khoản sử dụng</a></li>
          <li><a href="#" class="hover:text-amber-400">Chính sách giải quyết khiếu nại</a></li>
        </ul>
      </div>
      <div class="space-y-4">
        <h4 class="font-bold text-white uppercase text-sm font-serif">Kết nối với chúng tôi</h4>
        <div class="flex items-center gap-3">
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-white transition"><i data-lucide="facebook" class="w-4 h-4"></i></a>
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-white transition"><i data-lucide="youtube" class="w-4 h-4"></i></a>
          <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-white transition"><i data-lucide="twitter" class="w-4 h-4"></i></a>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-white/10 text-center">
      <p>&copy; 2026 Bản quyền thuộc về <?= htmlspecialchars($company["name"]) ?> - BDS-03 (Tuấn Nhân Resort & Land).</p>
    </div>
  </footer>

  <!-- Floating CTAs -->
  <div class="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
    <a href="https://zalo.me/<?= htmlspecialchars($company["zalo"]) ?>" target="_blank" class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-bounce">
      <span class="font-bold text-xs">Zalo</span>
    </a>
  </div>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-pulse">
      <i data-lucide="phone" class="w-5 h-5"></i>
    </a>
  </div>

  <!-- DATA & LOGIC -->
  <script>
    <?php if(!empty($properties)): ?>
const BDS03_PROPERTIES = <?= json_encode($properties) ?>;
<?php else: ?>
<?php if(!empty($properties)): ?>
const BDS03_PROPERTIES = <?= json_encode($properties) ?>;
<?php else: ?>
<?php if(!empty($properties)): ?>
    const BDS03_PROPERTIES = <?= json_encode($properties) ?>;
<?php else: ?>
const BDS03_PROPERTIES = [
      {
        id: 1,
        title: 'Nhà phố 1 trệt 2 lầu mặt tiền đường Trần Phú, TP. Bảo Lộc',
        slug: 'nha-pho-1-tret-2-lau-tran-phu-bao-loc',
        category: 'nha-pho',
        type: 'Nhà phố',
        price: '3.85 Tỷ VNĐ',
        priceNum: 3.85,
        area: '115 m²',
        areaNum: 115,
        location: 'Đường Trần Phú (QL20), Phường 1, TP. Bảo Lộc, Lâm Đồng',
        district: 'Bảo Lộc',
        province: 'Lâm Đồng',
        legal: 'Sổ hồng riêng hoàn công',
        badge: 'Sổ Sẵn',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
        ],
        date: '28/08/2026',
        desc: 'Nhà phố vị trí trung tâm sầm uất, trục đường huyết mạch Quốc Lộ 20, thuận tiện mở văn phòng, spa hoặc showroom kinh doanh.',
        author: { name: 'Võ Tuấn Nhân', phone: '0909.568.888', zalo: '0909568888', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' }
      },
      {
        id: 2,
        title: 'Đất vườn sầu riêng Musang King 1.500m² view đồi săn mây Bảo Lâm',
        slug: 'dat-vuon-sau-rieng-1500m2-bao-lam',
        category: 'dat-vuon',
        type: 'Đất vườn nghỉ dưỡng',
        price: '1.45 Tỷ VNĐ',
        priceNum: 1.45,
        area: '1,500 m²',
        areaNum: 1500,
        location: 'Xã Lộc Tân, Huyện Bảo Lâm, Tỉnh Lâm Đồng',
        district: 'Bảo Lâm',
        province: 'Lâm Đồng',
        legal: 'Sổ đỏ trao tay, công chứng ngay',
        badge: 'View Đồi',
        image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=1200&q=80',
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80'
        ],
        date: '27/08/2026',
        desc: 'Khu vườn sầu riêng 3 năm tuổi xanh tốt, thế đất thoải nhẹ view ôm trọn thung lũng sương mù, đường bê tông 6m ô tô vào tận nơi.',
        author: { name: 'Nguyễn Thị Hồng Hạnh', phone: '0938.123.456', zalo: '0938123456', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' }
      },
      {
        id: 3,
        title: 'Đất nền phân lô nghỉ dưỡng ven hồ sinh thái Ngọc Di Linh',
        slug: 'dat-nen-nghi-duong-ven-ho-ngoc-di-linh',
        category: 'dat-nen',
        type: 'Đất nền dự án',
        price: '850 Triệu VNĐ',
        priceNum: 0.85,
        area: '250 m²',
        areaNum: 250,
        location: 'Thị trấn Di Linh, Huyện Di Linh, Tỉnh Lâm Đồng',
        district: 'Di Linh',
        province: 'Lâm Đồng',
        legal: 'Sổ hồng riêng có sẵn thổ cư 100m²',
        badge: 'Giá Tốt F0',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'
        ],
        date: '26/08/2026',
        desc: 'Vị trí đắc địa cạnh hồ tự nhiên nước trong xanh, khí hậu quanh năm 20°C mát mẻ như Đà Lạt, thích hợp làm homestay hoặc nhà vườn.',
        author: { name: 'Võ Tuấn Nhân', phone: '0909.568.888', zalo: '0909568888', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' }
      },
      {
        id: 4,
        title: 'Biệt thự đồi phong cách Thụy Sĩ La Beaute Bảo Lộc view thung lũng',
        slug: 'biet-thu-doi-thuy-si-la-beaute-bao-loc',
        category: 'biet-thu',
        type: 'Biệt thự nghỉ dưỡng',
        price: '4.2 Tỷ VNĐ',
        priceNum: 4.2,
        area: '320 m²',
        areaNum: 320,
        location: 'Dự án La Beaute, Xã Lộc Tân, Huyện Bảo Lâm, Lâm Đồng',
        district: 'Bảo Lộc',
        province: 'Lâm Đồng',
        legal: 'Sổ hồng sở hữu lâu dài',
        badge: 'Cao Cấp',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
        ],
        date: '25/08/2026',
        desc: 'Biệt thự xây sẵn full nội thất gỗ thông cao cấp, có sân vườn trồng hoa hồng và hồ cá Koi, tiện ích hồ bơi vô cực và clubhouse.',
        author: { name: 'Trần Văn Mạnh', phone: '0902.999.888', zalo: '0902999888', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }
      },
      {
        id: 5,
        title: 'Đất vườn chè Ô Long 2.000m² có suối chảy quanh đất Lộc Quảng',
        slug: 'dat-vuon-che-o-long-2000m2-loc-quang',
        category: 'dat-vuon',
        type: 'Đất vườn nghỉ dưỡng',
        price: '1.95 Tỷ VNĐ',
        priceNum: 1.95,
        area: '2,000 m²',
        areaNum: 2000,
        location: 'Xã Lộc Quảng, Huyện Bảo Lâm, Lâm Đồng',
        district: 'Bảo Lâm',
        province: 'Lâm Đồng',
        legal: 'Sổ hồng riêng, ranh giới rõ ràng',
        badge: 'Có Suối',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80'],
        date: '24/08/2026',
        desc: 'Lô đất hiếm có suối đá tự nhiên nước chảy róc rách quanh năm, không khí trong lành nguyên sơ, cách thác Đambri chỉ 4km.',
        author: { name: 'Nguyễn Thị Hồng Hạnh', phone: '0938.123.456', zalo: '0938123456', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' }
      },
      {
        id: 6,
        title: 'Đất nền biệt thự đồi Sun Valley Bảo Lộc diện tích 500m²',
        slug: 'dat-nen-biet-thu-sun-valley-bao-loc',
        category: 'dat-nen',
        type: 'Đất nền dự án',
        price: '1.68 Tỷ VNĐ',
        priceNum: 1.68,
        area: '500 m²',
        areaNum: 500,
        location: 'KĐT Sun Valley, Xã Đam B’ri, TP. Bảo Lộc, Lâm Đồng',
        district: 'Bảo Lộc',
        province: 'Lâm Đồng',
        legal: 'Sổ hồng riêng từng nền',
        badge: 'Đô Thị Mới',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'],
        date: '23/08/2026',
        desc: 'Hạ tầng hoàn chỉnh điện âm nước máy, đường nhựa 8m có vỉa hè cây xanh, công viên cảnh quan hồ điều hòa rộng 2ha.',
        author: { name: 'Võ Tuấn Nhân', phone: '0909.568.888', zalo: '0909568888', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' }
      },
      {
        id: 7,
        title: 'Nhà vườn sinh thái gỗ thông 600m² đã trồng sẵn cây ăn trái Bảo Lâm',
        slug: 'nha-vuon-sinh-thai-go-thong-600m2-bao-lam',
        category: 'dat-vuon',
        type: 'Đất vườn nghỉ dưỡng',
        price: '2.15 Tỷ VNĐ',
        priceNum: 2.15,
        area: '600 m²',
        areaNum: 600,
        location: 'Xã Lộc An, Huyện Bảo Lâm, Lâm Đồng',
        district: 'Bảo Lâm',
        province: 'Lâm Đồng',
        legal: 'Sổ đỏ chính chủ có 150m² thổ cư',
        badge: 'Nhà Đẹp',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
        date: '22/08/2026',
        desc: 'Căn nhà gỗ ấm cúng hoàn thiện đầy đủ tiện nghi, có giàn hoa giấy, cây bơ 034 và sầu riêng đang cho thu hoạch, xách vali vào ở ngay.',
        author: { name: 'Trần Văn Mạnh', phone: '0902.999.888', zalo: '0902999888', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' }
      },
      {
        id: 8,
        title: 'Shophouse thương mại 4 tầng trung tâm hành chính Di Linh',
        slug: 'shophouse-trung-tam-hanh-chinh-di-linh',
        category: 'nha-pho',
        type: 'Nhà phố thương mại',
        price: '4.6 Tỷ VNĐ',
        priceNum: 4.6,
        area: '140 m²',
        areaNum: 140,
        location: 'Đường Hùng Vương, Thị trấn Di Linh, Lâm Đồng',
        district: 'Di Linh',
        province: 'Lâm Đồng',
        legal: 'Sổ hồng hoàn công',
        badge: 'Kinh Doanh',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'],
        date: '21/08/2026',
        desc: 'Tuyến phố thương mại sầm uất nhất huyện Di Linh, gần siêu thị, ngân hàng và trường học, đang cho ngân hàng thuê tầng trệt 25 triệu/tháng.',
        author: { name: 'Võ Tuấn Nhân', phone: '0909.568.888', zalo: '0909568888', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' }
      }
    ];
<?php endif; ?>
<?php endif; ?>
<?php endif; ?>

    <?php if(!empty($projects)): ?>
const BDS03_PROJECTS = <?= json_encode($projects) ?>;
<?php else: ?>
<?php if(!empty($projects)): ?>
const BDS03_PROJECTS = <?= json_encode($projects) ?>;
<?php else: ?>
<?php if(!empty($projects)): ?>
    const BDS03_PROJECTS = <?= json_encode($projects) ?>;
<?php else: ?>
const BDS03_PROJECTS = [
      {
        id: 1,
        title: 'Làng Sinh Thái Nghỉ Dưỡng La Beaute Bảo Lộc',
        slug: 'la-beaute-bao-loc',
        scale: '14 Hécta, 280 Nền biệt thự',
        price: 'Từ 1.2 Tỷ / Nền',
        priceNum: 1.2,
        location: 'Xã Lộc Tân, Huyện Bảo Lâm, Lâm Đồng',
        status: 'Đang mở bán Giai đoạn 2',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        desc: 'Quần thể nghỉ dưỡng sinh thái chuẩn 5 sao với hồ bơi tràn bờ, đồi chè Ô Long và suối tự nhiên uốn lượn.'
      },
      {
        id: 2,
        title: 'Khu Đô Thị Sinh Thái Bảo Lộc Park Hills',
        slug: 'bao-loc-park-hills',
        scale: '64 Hécta, Phân khu biệt thự hồ',
        price: 'Từ 1.5 Tỷ / Nền',
        priceNum: 1.5,
        location: 'Quốc Lộ 20, TP. Bảo Lộc, Lâm Đồng',
        status: 'Đã hoàn thiện hạ tầng 100%',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        desc: 'Khu đô thị sinh thái lớn nhất Bảo Lộc sở hữu công viên hồ trung tâm 12ha và chuỗi tiện ích vui chơi giải trí.'
      },
      {
        id: 3,
        title: 'Phân Lô Biệt Thự Đồi View Hồ Ngọc Di Linh',
        slug: 'biet-thu-doi-ho-ngoc-di-linh',
        scale: '8 Hécta, 68 Nền đất vườn',
        price: 'Từ 850 Triệu / Nền',
        priceNum: 0.85,
        location: 'Thị trấn Di Linh, Lâm Đồng',
        status: 'Sổ đỏ có sẵn từng nền',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
        desc: 'Vị trí vàng ngay cửa ngõ cao tốc Dầu Giây - Liên Khương, không gian nghỉ dưỡng biệt lập đẳng cấp.'
      }
    ];
<?php endif; ?>
<?php endif; ?>
<?php endif; ?>

    <?php if(!empty($news)): ?>
const BDS03_NEWS = <?= json_encode($news) ?>;
<?php else: ?>
<?php if(!empty($news)): ?>
const BDS03_NEWS = <?= json_encode($news) ?>;
<?php else: ?>
<?php if(!empty($news)): ?>
    const BDS03_NEWS = <?= json_encode($news) ?>;
<?php else: ?>
const BDS03_NEWS = [
      {
        id: 1,
        title: 'Cao tốc Tân Phú - Bảo Lộc chính thức khởi công: Động lực bứt phá giá đất Lâm Đồng',
        slug: 'cao-toc-tan-phu-bao-loc-khoi-cong',
        date: '28/08/2026',
        author: 'Võ Tuấn Nhân',
        category: 'Quy hoạch & Hạ tầng',
        image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=800&q=80',
        desc: 'Tuyến cao tốc rút ngắn thời gian di chuyển từ TP.HCM lên Bảo Lộc chỉ còn 2 giờ lái xe, tạo làn sóng đầu tư mạnh mẽ...',
        content: [
          'Cao tốc Dầu Giây - Tân Phú và Tân Phú - Bảo Lộc là dự án giao thông trọng điểm quốc gia, giúp kết nối vùng kinh tế trọng điểm phía Nam với cao nguyên Lâm Đồng.',
          'Khi tuyến đường hoàn thành, thời gian di chuyển từ Sài Gòn về Bảo Lộc chỉ còn khoảng 2 giờ, biến nơi đây thành "ngôi nhà thứ 2" lý tưởng cho các gia đình đô thị.',
          'Thị trường đất vườn và biệt thự sinh thái Bảo Lộc ghi nhận mức độ quan tâm tăng hơn 45% so với cùng kỳ năm ngoái.'
        ],
        views: 5200
      },
      {
        id: 2,
        title: 'Xu hướng "Second Home" nghỉ dưỡng sinh thái: Vì sao Bảo Lộc được giới đầu tư săn đón?',
        slug: 'xu-huong-second-home-nghi-duong-bao-loc',
        date: '26/08/2026',
        author: 'Chuyên gia BĐS Nghỉ Dưỡng',
        category: 'Cẩm nang đầu tư',
        image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80',
        desc: 'Khí hậu ôn hòa 20-22°C quanh năm, cảnh quan đồi chè suối tự nhiên và mức giá còn ở vùng trũng là những điểm cộng lớn...',
        content: [
          'Bảo Lộc được thiên nhiên ưu đãi khí hậu mát lạnh dễ chịu quanh năm, không quá lạnh như Đà Lạt và không khí trong lành không khói bụi.',
          'Mô hình nhà vườn vừa nghỉ dưỡng cuối tuần, vừa cho thuê homestay đang mang lại tỷ suất lợi nhuận kép từ dòng tiền và lãi vốn.',
          'Sở hữu đất có sổ hồng riêng với mức giá chỉ từ 1-2 tỷ đồng là bài toán tài chính an toàn tuyệt đối trong thời điểm hiện nay.'
        ],
        views: 4350
      },
      {
        id: 3,
        title: 'Kinh nghiệm vàng khi chọn mua đất vườn và đất nền nghỉ dưỡng tại Bảo Lộc - Lâm Đồng',
        slug: 'kinh-nghiem-chon-mua-dat-vuon-bao-loc',
        date: '24/08/2026',
        author: 'Ban Tư Vấn Tuấn Nhân',
        category: 'Cẩm nang pháp lý',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        desc: 'Kiểm tra quy hoạch thổ cư, đường hiện hữu trên sổ và nguồn nước ngầm là 3 yếu tố sống còn người mua cần lưu ý...',
        content: [
          'Yếu tố đầu tiên cần thẩm định là pháp lý: Đất phải có sổ hồng riêng, không dính quy hoạch rừng phòng hộ hoặc dự án treo.',
          'Thứ hai là đường giao thông: Đường vào đất phải được thể hiện trên sổ đỏ, lộ giới từ 4m trở lên để xe ô tô ra vào thuận tiện.',
          'Thứ ba là nguồn nước và điện: Khu vực có giếng khoan nước ngọt hoặc suối tự nhiên sẽ giúp tiết kiệm hàng trăm triệu chi phí cải tạo vườn.'
        ],
        views: 6100
      }
    ];
<?php endif; ?>
<?php endif; ?>
<?php endif; ?>

    <?php if(!empty($testimonials)): ?>
const TESTIMONIALS = <?= json_encode($testimonials) ?>;
<?php else: ?>
<?php if(!empty($testimonials)): ?>
const TESTIMONIALS = <?= json_encode($testimonials) ?>;
<?php else: ?>
<?php if(!empty($testimonials)): ?>
    const TESTIMONIALS = <?= json_encode($testimonials) ?>;
<?php else: ?>
const TESTIMONIALS = [
      {
        id: 1,
        name: 'Anh Nguyễn Minh Tuấn',
        role: 'Nhà đầu tư cá nhân — TP. Hồ Chí Minh',
        comment: 'Tôi mua 2 lô đất vườn Lộc Tân qua BĐS Tuấn Nhân từ năm 2024. Đội ngũ tư vấn rất trung thực, sổ đỏ công chứng nhanh chóng trong ngày. Hiện tại vườn sầu riêng đã cho thu hoạch và giá đất tăng gần gấp đôi.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
      },
      {
        id: 2,
        name: 'Chị Lê Hoàng Mai Lan',
        role: 'Bác sĩ tại Bệnh viện Đại học Y Dược TP.HCM',
        comment: 'Gia đình tôi luôn mơ ước có một căn second-home tại Bảo Lộc để cuối tuần cả nhà về nghỉ ngơi. Cảm ơn Tuấn Nhân Realty đã giúp tôi tìm được căn nhà vườn gỗ thông view đồi tuyệt đẹp đúng ý.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'
      },
      {
        id: 3,
        name: 'Bác Trần Quốc Cường',
        role: 'Cán bộ hưu trí — Hà Nội',
        comment: 'Khí hậu Bảo Lộc thực sự quá tuyệt vời cho người cao tuổi dưỡng già. Mua đất ở xa tôi sợ nhất rủi ro pháp lý, nhưng qua công ty Tuấn Nhân thì hoàn toàn yên tâm vì mọi thứ minh bạch 100%.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
      }
    ];
<?php endif; ?>
<?php endif; ?>
<?php endif; ?>

    const NAV_ITEMS = [
      { id: 'home', label: 'Trang Chủ' },
      { id: 'san-pham-bds', label: 'Sản Phẩm' },
      { id: 'du-an', label: 'Dự Án' },
      { id: 'dia-diem', label: 'Khu Vực' },
      { id: 'news', label: 'Tin Tức' },
      { id: 'about', label: 'Giới Thiệu' },
      { id: 'contact', label: 'Liên Hệ' }
    ];

    let currentPage = 'home';
    let selectedProperty = null;
    let selectedArticle = null;
    let mobileMenuOpen = false;

    // Filters
    let searchKeyword = '';
    let filterCategory = 'all';
    let filterLocation = 'all';
    let filterPrice = 'all';
    let filterArea = 'all';
    let activeGalleryIdx = 0;

    function renderNav() {
      const desktopNav = document.getElementById('desktopNav');
      const mobileDrawer = document.getElementById('mobileDrawer');
      
      desktopNav.innerHTML = NAV_ITEMS.map(nav => {
        const isActive = currentPage === nav.id || (nav.id === 'news' && currentPage === 'news-detail');
        return `
          <button onclick="navigate('${nav.id}')" class="whitespace-nowrap px-3 py-2 rounded-md transition-all cursor-pointer ${isActive ? 'bg-amber-500 text-slate-950 font-black shadow-sm' : 'text-amber-100/90 hover:bg-white/10 hover:text-white'}">
            ${nav.label}
          </button>
        `;
      }).join('');

      mobileDrawer.innerHTML = NAV_ITEMS.map(nav => {
        const isActive = currentPage === nav.id || (nav.id === 'news' && currentPage === 'news-detail');
        return `
          <button onclick="navigate('${nav.id}')" class="block w-full text-left py-2.5 px-3 rounded cursor-pointer ${isActive ? 'bg-amber-500 text-slate-950 font-black' : 'hover:bg-white/10'}">
            ${nav.label}
          </button>
        `;
      }).join('') + `
        <a href="tel:<?= htmlspecialchars($company["zalo"]) ?>" class="block w-full text-center py-2.5 px-3 bg-amber-500 text-slate-950 font-black rounded-lg mt-2 cursor-pointer">
          📞 GỌI HOTLINE: <?= htmlspecialchars($company["phone"]) ?>
        </a>
      `;

      if(mobileMenuOpen) {
        mobileDrawer.classList.remove('hidden');
        document.getElementById('menuIcon').setAttribute('data-lucide', 'x');
      } else {
        mobileDrawer.classList.add('hidden');
        document.getElementById('menuIcon').setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    }

    function toggleMobileMenu() {
      mobileMenuOpen = !mobileMenuOpen;
      renderNav();
    }

    function navigate(page, slug) {
      currentPage = page;
      mobileMenuOpen = false;
      activeGalleryIdx = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderNav();
      renderApp();
    }

    function handleOpenProperty(id) {
      selectedProperty = BDS03_PROPERTIES.find(p => p.id === id);
      navigate('property-detail');
    }

    function handleOpenArticle(id) {
      selectedArticle = BDS03_NEWS.find(a => a.id === id);
      navigate('news-detail');
    }

    function handleConsultSubmit(e) {
      e.preventDefault();
      alert('🎉 Cảm ơn quý khách!\nChuyên viên tư vấn sẽ liên hệ trong 10 phút để gửi sổ đỏ và bảng giá chi tiết.');
      e.target.reset();
    }
    
    function setFilterCategoryAndNav(cat) {
      filterCategory = cat;
      navigate('san-pham-bds');
    }
    function setFilterLocationAndNav(loc) {
      filterLocation = loc;
      navigate('san-pham-bds');
    }
    
    function updateFilters() {
      searchKeyword = document.getElementById('searchKeyword')?.value || '';
      filterCategory = document.getElementById('filterCategory')?.value || 'all';
      filterLocation = document.getElementById('filterLocation')?.value || 'all';
      filterPrice = document.getElementById('filterPrice')?.value || 'all';
      renderApp();
    }

    function getFilteredProperties() {
      return BDS03_PROPERTIES.filter(item => {
        if (['dat-nen', 'dat-vuon', 'biet-thu', 'nha-pho'].includes(currentPage)) {
          if (item.category !== currentPage) return false;
        }
        if (filterCategory !== 'all' && item.category !== filterCategory) return false;
        if (filterLocation !== 'all' && item.district !== filterLocation) return false;
        if (searchKeyword) {
          const q = searchKeyword.toLowerCase();
          const mTitle = item.title.toLowerCase().includes(q);
          const mLoc = item.location.toLowerCase().includes(q);
          if (!mTitle && !mLoc) return false;
        }
        if (filterPrice !== 'all') {
          if (filterPrice === 'under-1' && item.priceNum >= 1) return false;
          if (filterPrice === '1-3' && (item.priceNum < 1 || item.priceNum > 3)) return false;
          if (filterPrice === 'above-3' && item.priceNum <= 3) return false;
        }
        return true;
      });
    }

    const renderPropertyCard = (item) => `
      <div onclick="handleOpenProperty(${item.id})" class="bg-white rounded-sm border border-slate-200 hover:border-amber-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between">
        <div>
          <div class="h-44 sm:h-48 relative overflow-hidden bg-slate-100">
            <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-emerald-600 text-white font-bold text-[10px] rounded-sm shadow-sm">${item.badge}</span>
            <span class="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-xs text-white font-bold text-[10px] rounded-md">${item.type}</span>
          </div>
          <div class="p-4 space-y-2">
            <h3 class="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#5C3A21] transition line-clamp-2 leading-snug font-serif">${item.title}</h3>
            <p class="text-[11px] text-slate-500 truncate flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3 h-3 text-red-500 shrink-0"></i> ${item.location}
            </p>
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span class="text-[10px] text-slate-400 block font-medium">Giá bán</span>
                <span class="font-extrabold text-amber-700 text-sm">${item.price}</span>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-slate-400 block font-medium">Diện tích</span>
                <span class="font-bold text-slate-700">${item.area}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span class="truncate">${item.legal}</span>
          <span class="text-amber-800 font-bold group-hover:translate-x-0.5 transition shrink-0">Chi tiết ›</span>
        </div>
      </div>
    `;

    function getHomePageHTML() {
      return `
        <div class="bg-[#FCFBF9] space-y-16 pb-16">
          <div class="relative pt-24 pb-32 px-4 bg-cover bg-center text-white text-center" style="background-image: linear-gradient(rgba(45, 25, 10, 0.65), rgba(74, 40, 16, 0.75)), url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80)">
            <div class="max-w-7xl mx-auto max-w-3xl space-y-4">
              <span class="px-3.5 py-1 rounded-sm bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest inline-block">SÀN GIAO DỊCH BẤT ĐỘNG SẢN TÂY NGUYÊN</span>
              <h1 class="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-white leading-tight font-serif drop-shadow-md">Bất động sản Tuấn Nhân</h1>
              <p class="text-xs sm:text-sm md:text-base text-amber-100/90 max-w-xl mx-auto font-medium">Chuyên phân phối đất nền phân lô, đất vườn sinh thái & biệt thự đồi nghỉ dưỡng tại Bảo Lộc - Bảo Lâm - Di Linh - Lâm Đồng.</p>
              <div class="pt-3">
                <button onclick="navigate('san-pham-bds')" class="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-xl transition transform hover:scale-105 active:scale-95 cursor-pointer">Khám Phá Dự Án ›</button>
              </div>
            </div>
          </div>

          <div class="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
            <div class="bg-white p-4 sm:p-5 rounded-sm shadow-xl border border-amber-100 space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 text-xs">
                <input id="searchKeyword" type="text" placeholder="Nhập từ khóa tìm kiếm..." value="${searchKeyword}" class="w-full bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2.5 font-medium focus:outline-none focus:border-amber-600" />
                <select id="filterCategory" class="bg-white text-slate-900 border border-slate-200 rounded-sm px-3 py-2.5 font-bold text-slate-700 focus:outline-none cursor-pointer font-medium">
                  <option value="all" ${filterCategory==='all'?'selected':''}>Tất cả loại BĐS</option>
                  <option value="dat-nen" ${filterCategory==='dat-nen'?'selected':''}>Đất nền phân lô</option>
                  <option value="dat-vuon" ${filterCategory==='dat-vuon'?'selected':''}>Đất vườn nghỉ dưỡng</option>
                  <option value="biet-thu" ${filterCategory==='biet-thu'?'selected':''}>Biệt thự đồi</option>
                  <option value="nha-pho" ${filterCategory==='nha-pho'?'selected':''}>Nhà phố thương mại</option>
                </select>
                <select id="filterLocation" class="bg-white text-slate-900 border border-slate-200 rounded-sm px-3 py-2.5 font-bold text-slate-700 focus:outline-none cursor-pointer font-medium">
                  <option value="all" ${filterLocation==='all'?'selected':''}>Tất cả khu vực</option>
                  <option value="Bảo Lộc" ${filterLocation==='Bảo Lộc'?'selected':''}>TP. Bảo Lộc</option>
                  <option value="Bảo Lâm" ${filterLocation==='Bảo Lâm'?'selected':''}>Huyện Bảo Lâm</option>
                  <option value="Di Linh" ${filterLocation==='Di Linh'?'selected':''}>Huyện Di Linh</option>
                </select>
                <select id="filterPrice" class="bg-white text-slate-900 border border-slate-200 rounded-sm px-3 py-2.5 font-bold text-slate-700 focus:outline-none cursor-pointer font-medium">
                  <option value="all" ${filterPrice==='all'?'selected':''}>Khoảng giá</option>
                  <option value="under-1" ${filterPrice==='under-1'?'selected':''}>Dưới 1 Tỷ</option>
                  <option value="1-3" ${filterPrice==='1-3'?'selected':''}>Từ 1 - 3 Tỷ</option>
                  <option value="above-3" ${filterPrice==='above-3'?'selected':''}>Trên 3 Tỷ</option>
                </select>
                <button onclick="updateFilters(); navigate('san-pham-bds');" class="bg-[#5C3A21] hover:bg-[#4A2810] text-amber-300 font-black px-4 py-2.5 rounded-sm transition shadow flex items-center justify-center gap-1.5 cursor-pointer active:scale-95">
                  <i data-lucide="search" class="w-3.5 h-3.5"></i> Tìm kiếm
                </button>
              </div>
            </div>
          </div>

          <!-- Section 1 -->
          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-center space-y-1">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-[#4A2810] font-serif uppercase tracking-wider">Sản phẩm bất động sản</h2>
              <div class="w-12 h-1 bg-amber-500 mx-auto rounded-sm"></div>
              <p class="text-xs text-slate-500 max-w-md mx-auto pt-1">Danh sách đất nền, đất vườn sinh thái và nhà phố pháp lý sạch sẵn sàng giao dịch</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              ${BDS03_PROPERTIES.slice(0, 8).map(renderPropertyCard).join('')}
            </div>
            <div class="flex justify-center pt-4">
              <button onclick="navigate('san-pham-bds')" class="px-6 py-2.5 border-2 border-[#5C3A21] hover:bg-[#5C3A21] hover:text-white text-[#5C3A21] font-black text-xs rounded-sm transition cursor-pointer">Xem tất cả sản phẩm ›</button>
            </div>
          </section>

          <!-- Section 2: Projects -->
          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-center space-y-1">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-[#4A2810] font-serif uppercase tracking-wider">Dự án nổi bật</h2>
              <div class="w-12 h-1 bg-amber-500 mx-auto rounded-sm"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${BDS03_PROJECTS.map(proj => `
                <div onclick="navigate('du-an')" class="bg-white rounded-sm border border-slate-200 hover:border-amber-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between">
                  <div class="h-52 relative overflow-hidden bg-slate-100">
                    <img src="${proj.image}" alt="${proj.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    <span class="absolute top-3 left-3 px-3 py-1 bg-amber-600 text-white font-black text-xs rounded-sm shadow">${proj.status}</span>
                  </div>
                  <div class="p-5 space-y-2.5">
                    <h3 class="font-black text-sm sm:text-base text-slate-900 group-hover:text-[#5C3A21] transition font-serif">${proj.title}</h3>
                    <p class="text-xs text-slate-500 line-clamp-2">${proj.desc}</p>
                    <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span class="font-extrabold text-amber-700">${proj.price}</span>
                      <span class="text-slate-500 font-medium">${proj.scale}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Section 3: Locations -->
          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-center space-y-1">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-[#4A2810] font-serif uppercase tracking-wider">Bất động sản theo địa điểm</h2>
              <div class="w-12 h-1 bg-amber-500 mx-auto rounded-sm"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${[
                { name: 'Bảo Lộc', count: '36 Bất động sản', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80' },
                { name: 'Bảo Lâm', count: '24 Bất động sản', image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80' },
                { name: 'Di Linh', count: '18 Bất động sản', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' }
              ].map(loc => `
                <div onclick="setFilterLocationAndNav('${loc.name}')" class="h-56 relative rounded-sm overflow-hidden shadow-md group cursor-pointer border-2 border-amber-900/20">
                  <img src="${loc.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-amber-950/85 transition"></div>
                  <div class="absolute inset-0 p-6 flex flex-col justify-end text-white text-center">
                    <h3 class="text-2xl font-black font-serif uppercase tracking-widest text-amber-300 group-hover:text-white transition">${loc.name}</h3>
                    <p class="text-xs text-slate-300 font-medium mt-1">${loc.count}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Section 4: Categories -->
          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-center space-y-1">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-[#4A2810] font-serif uppercase tracking-wider">Danh mục bất động sản</h2>
              <div class="w-12 h-1 bg-amber-500 mx-auto rounded-sm"></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              ${[
                { label: 'ĐẤT NỀN DỰ ÁN', cat: 'dat-nen', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
                { label: 'ĐẤT VƯỜN - NGHỈ DƯỠNG', cat: 'dat-vuon', image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&q=80' },
                { label: 'BIỆT THỰ VIEW HỒ', cat: 'biet-thu', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
                { label: 'NHÀ PHỐ THƯƠNG MẠI', cat: 'nha-pho', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' }
              ].map(catItem => `
                <div onclick="setFilterCategoryAndNav('${catItem.cat}')" class="h-40 relative rounded-sm overflow-hidden shadow-md group cursor-pointer">
                  <img src="${catItem.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div class="absolute inset-0 bg-[#4A2810]/75 group-hover:bg-[#5C3A21]/60 transition"></div>
                  <div class="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <span class="text-sm font-black text-white uppercase tracking-wider font-serif border-b-2 border-amber-400 pb-1">${catItem.label}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Section 5: Why choose us -->
          <section class="bg-amber-50/60 py-12 border-y border-amber-100">
            <div class="max-w-7xl mx-auto px-4 space-y-10">
              <div class="text-center space-y-1">
                <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-[#4A2810] font-serif uppercase tracking-wider">Tại sao chọn chúng tôi?</h2>
                <div class="w-12 h-1 bg-amber-500 mx-auto rounded-sm"></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-6 rounded-sm border border-amber-100 shadow-sm text-center space-y-3">
                  <div class="w-14 h-14 rounded-sm bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner"><i data-lucide="award" class="w-7 h-7"></i></div>
                  <h3 class="font-black text-base text-[#4A2810] font-serif">Uy tín chất lượng</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">Đội ngũ chuyên viên am hiểu sâu sắc thị trường địa phương, chọn lọc quỹ đất vị trí đẹp và tiềm năng nhất.</p>
                </div>
                <div class="bg-white p-6 rounded-sm border border-amber-100 shadow-sm text-center space-y-3">
                  <div class="w-14 h-14 rounded-sm bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner"><i data-lucide="shield" class="w-7 h-7"></i></div>
                  <h3 class="font-black text-base text-[#4A2810] font-serif">Thông tin minh bạch</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">100% sản phẩm có sổ đỏ sẵn sàng công chứng ngay trong ngày, hỗ trợ pháp lý và đo đạc cắm mốc chuẩn xác.</p>
                </div>
                <div class="bg-white p-6 rounded-sm border border-amber-100 shadow-sm text-center space-y-3">
                  <div class="w-14 h-14 rounded-sm bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-inner"><i data-lucide="thumbs-up" class="w-7 h-7"></i></div>
                  <h3 class="font-black text-base text-[#4A2810] font-serif">Giá tốt nhất F0</h3>
                  <p class="text-xs text-slate-600 leading-relaxed">Nguồn sản phẩm trực tiếp từ chính chủ và chủ đầu tư, giá gốc cạnh tranh mang lại lợi nhuận cao cho nhà đầu tư.</p>
                </div>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center pt-6 border-t border-amber-200/60">
                <div><div class="text-2xl sm:text-3xl font-black text-[#4A2810] font-serif">12,200+</div><div class="text-xs text-slate-500 mt-1">Khách hàng tin tưởng</div></div>
                <div><div class="text-2xl sm:text-3xl font-black text-[#4A2810] font-serif">83+</div><div class="text-xs text-slate-500 mt-1">Dự án đã phân phối</div></div>
                <div><div class="text-2xl sm:text-3xl font-black text-[#4A2810] font-serif">1,200+</div><div class="text-xs text-slate-500 mt-1">Sổ hồng trao tay</div></div>
                <div><div class="text-2xl sm:text-3xl font-black text-[#4A2810] font-serif">98.5%</div><div class="text-xs text-slate-500 mt-1">Khách hàng hài lòng</div></div>
              </div>
            </div>
          </section>

          <!-- Section 6: News -->
          <section class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-center space-y-1">
              <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-[#4A2810] font-serif uppercase tracking-wider">Tin tức & bài viết</h2>
              <div class="w-12 h-1 bg-amber-500 mx-auto rounded-sm"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${BDS03_NEWS.map(art => `
                <div onclick="handleOpenArticle(${art.id})" class="bg-white rounded-sm border border-slate-200 hover:border-amber-500 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between">
                  <div class="h-48 overflow-hidden bg-slate-100">
                    <img src="${art.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="text-[10px] font-bold text-amber-800 uppercase tracking-wider">${art.category}</span>
                      <h3 class="font-bold text-sm text-slate-900 group-hover:text-[#4A2810] transition line-clamp-2 leading-snug mt-1 font-serif">${art.title}</h3>
                      <p class="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">${art.desc}</p>
                    </div>
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>${art.date}</span>
                      <span class="text-amber-800 font-bold">Xem chi tiết ›</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Section 7: Testimonials -->
          <section class="bg-[#4A2810] py-16 text-white">
            <div class="max-w-7xl mx-auto px-4 space-y-10">
              <div class="text-center space-y-1">
                <h2 class="text-xl sm:text-2xl md:text-3xl font-black text-amber-300 font-serif uppercase tracking-wider">Đánh giá của khách hàng</h2>
                <div class="w-12 h-1 bg-amber-500 mx-auto rounded-sm"></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${TESTIMONIALS.map(item => `
                  <div class="bg-white text-slate-800 p-6 rounded-sm shadow-xl space-y-4 flex flex-col justify-between">
                    <div class="space-y-3">
                      <div class="flex items-center gap-1 text-amber-500">
                        <i data-lucide="star" class="w-4 h-4 fill-[#F59E0B]"></i><i data-lucide="star" class="w-4 h-4 fill-[#F59E0B]"></i><i data-lucide="star" class="w-4 h-4 fill-[#F59E0B]"></i><i data-lucide="star" class="w-4 h-4 fill-[#F59E0B]"></i><i data-lucide="star" class="w-4 h-4 fill-[#F59E0B]"></i>
                      </div>
                      <p class="text-xs text-slate-600 italic leading-relaxed">&ldquo;${item.comment}&rdquo;</p>
                    </div>
                    <div class="pt-4 border-t border-slate-100 flex items-center gap-3">
                      <img src="${item.avatar}" alt="${item.name}" class="w-10 h-10 rounded-sm object-cover border border-amber-400" />
                      <div>
                        <h4 class="font-bold text-xs text-slate-900 font-serif">${item.name}</h4>
                        <p class="text-[10px] text-slate-400">${item.role}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- Section 8: Consult -->
          <section class="max-w-7xl mx-auto px-4">
            <div class="bg-white rounded-md border border-amber-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
              <div class="md:col-span-6 h-72 md:h-96 relative overflow-hidden bg-slate-100">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80" alt="Đội ngũ chuyên viên" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 text-white">
                  <div>
                    <h3 class="font-black text-lg font-serif">Đội ngũ chuyên viên tư vấn</h3>
                    <p class="text-xs text-amber-200">Tận tâm — Am hiểu địa phương — Đồng hành trọn đời</p>
                  </div>
                </div>
              </div>
              <div class="md:col-span-6 p-6 sm:p-8 space-y-4">
                <div class="space-y-1">
                  <h3 class="text-xl font-black text-[#4A2810] font-serif uppercase">Đăng ký nhận bảng giá & sổ đỏ</h3>
                  <p class="text-xs text-slate-500">Để lại thông tin, chuyên viên phụ trách khu vực sẽ gửi thông tin chi tiết qua Zalo trong 5 phút.</p>
                </div>
                <form action="api/contact.php" method="POST" class="space-y-3 text-xs">
                  <input type="text" name="name" placeholder="Họ và tên của bạn (*)..." required class="w-full bg-slate-50 border border-slate-300 rounded-sm p-3 focus:outline-none focus:border-amber-600 font-medium" />
                  <input type="tel" name="phone" placeholder="Số điện thoại / Zalo (*)..." required class="w-full bg-slate-50 border border-slate-300 rounded-sm p-3 focus:outline-none focus:border-amber-600 font-bold text-amber-900" />
                  <textarea name="message" rows="3" placeholder="Khu vực hoặc mức giá bạn đang quan tâm..." class="w-full bg-slate-50 border border-slate-300 rounded-sm p-3 focus:outline-none focus:border-amber-600 font-medium"></textarea>
                  <button type="submit" class="w-full py-3 bg-[#5C3A21] hover:bg-[#4A2810] text-amber-300 font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer active:scale-95">GỬI YÊU CẦU TƯ VẤN NGAY</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      `;
    }

    function getCatalogHTML() {
      const filtered = getFilteredProperties();
      return `
        <div class="bg-[#FCFBF9] py-8 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-xs text-slate-500 flex items-center gap-1.5">
              <span onclick="navigate('home')" class="hover:text-amber-700 cursor-pointer">Trang chủ</span><span>/</span>
              <span class="text-amber-800 font-bold">Sản phẩm bất động sản</span>
            </div>
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200 pb-4">
              <div>
                <h1 class="text-2xl font-black text-[#4A2810] font-serif">DANH SÁCH BẤT ĐỘNG SẢN</h1>
                <p class="text-xs text-slate-500 mt-0.5">Tìm thấy ${filtered.length} bất động sản phù hợp</p>
              </div>
              <div class="flex flex-wrap gap-2 text-xs">
                ${['all', 'dat-nen', 'dat-vuon', 'biet-thu', 'nha-pho'].map(catKey => `
                  <button onclick="setFilterCategoryAndNav('${catKey}')" class="px-3 py-1.5 rounded-sm font-bold transition cursor-pointer ${filterCategory === catKey ? 'bg-[#5C3A21] text-amber-300 shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-400'}">
                    ${catKey === 'all' ? 'Tất Cả' : catKey === 'dat-nen' ? 'Đất Nền' : catKey === 'dat-vuon' ? 'Đất Vườn' : catKey === 'biet-thu' ? 'Biệt Thự' : 'Nhà Phố'}
                  </button>
                `).join('')}
              </div>
            </div>
            ${filtered.length === 0 ? `
              <div class="bg-white p-12 rounded-sm text-center border border-slate-200 shadow-xs">
                <p class="text-sm font-bold text-slate-600">Không tìm thấy bất động sản nào theo bộ lọc đã chọn.</p>
                <button onclick="filterCategory='all';filterLocation='all';filterPrice='all';searchKeyword='';renderApp();" class="mt-3 px-5 py-2 bg-[#5C3A21] text-amber-300 rounded-sm text-xs font-bold transition cursor-pointer">Xem tất cả</button>
              </div>
            ` : `
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                ${filtered.map(renderPropertyCard).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    }

    function getPropertyDetailHTML() {
      if(!selectedProperty) return '';
      const p = selectedProperty;
      
      const galleryHTML = `
        <div class="relative w-full">
          <div class="h-64 sm:h-96 w-full rounded-sm overflow-hidden relative group bg-slate-100">
            <img id="mainGalleryImg" src="${p.gallery[0]}" class="w-full h-full object-cover transition-transform duration-500" />
            <button onclick="prevGalleryImage()" class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
            <button onclick="nextGalleryImage()" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-sm"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
          </div>
          <div class="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-hide">
            ${p.gallery.map((img, i) => `
              <button onclick="setGalleryImage(${i})" class="w-20 h-16 sm:w-24 sm:h-20 shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${i === activeGalleryIdx ? 'border-amber-500' : 'border-transparent opacity-70 hover:opacity-100'}">
                <img src="${img}" class="w-full h-full object-cover" />
              </button>
            `).join('')}
          </div>
        </div>
      `;

      return `
        <div class="bg-[#FCFBF9] py-8 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-xs text-slate-500 flex items-center gap-1.5">
              <span onclick="navigate('home')" class="hover:text-amber-700 cursor-pointer">Trang chủ</span><span>/</span>
              <span onclick="navigate('san-pham-bds')" class="hover:text-amber-700 cursor-pointer">Sản phẩm</span><span>/</span>
              <span class="text-amber-800 font-bold truncate">${p.title}</span>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div class="lg:col-span-8 space-y-6">
                <div class="bg-white rounded-sm border border-slate-200 p-6 shadow-xs space-y-3">
                  <span class="px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs rounded-sm">${p.badge}</span>
                  <h1 class="text-xl sm:text-2xl font-black text-slate-900 font-serif leading-snug">${p.title}</h1>
                  <p class="text-xs text-slate-500 flex items-center gap-1.5">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-red-500 shrink-0"></i> ${p.location}
                  </p>
                  <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span class="text-xs text-slate-400 block font-medium">Giá bán chính chủ</span>
                      <span class="text-2xl font-black text-amber-800">${p.price}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-xs text-slate-400 block font-medium">Diện tích đất</span>
                      <span class="text-base font-bold text-slate-800">${p.area}</span>
                    </div>
                  </div>
                </div>

                <div class="bg-white rounded-sm border border-slate-200 p-4 shadow-xs space-y-3">
                  ${galleryHTML}
                </div>

                <div class="bg-white rounded-sm border border-slate-200 p-6 shadow-xs space-y-3">
                  <h3 class="font-black text-sm text-[#4A2810] font-serif uppercase tracking-wider border-b border-slate-100 pb-2">THÔNG TIN CHI TIẾT & MÔ TẢ</h3>
                  <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">${p.desc}</p>
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs">
                    <div class="p-3 bg-amber-50/60 rounded-sm">Pháp lý: <strong class="block text-slate-800 font-black mt-0.5">${p.legal}</strong></div>
                    <div class="p-3 bg-amber-50/60 rounded-sm">Khu vực: <strong class="block text-slate-800 font-black mt-0.5">${p.district}</strong></div>
                    <div class="p-3 bg-amber-50/60 rounded-sm">Tình trạng: <strong class="block text-emerald-700 font-black mt-0.5">Sẵn sàng công chứng</strong></div>
                  </div>
                </div>

                <div class="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-xs">
                  <div class="bg-[#4A2810] px-4 py-2.5 text-amber-300 font-black text-xs uppercase font-serif">VỊ TRÍ BẤT ĐỘNG SẢN TRÊN BẢN ĐỒ</div>
                  <iframe title="Bản đồ Lâm Đồng" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125218.4239843604!2d107.75549042578684!3d11.548482939886364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173f4b638971f11%3A0x6b4fb6c1743a1391!2zVFAuIELhuqNvIEzhu5ljLCBMw6JtIMSQ4buTbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" width="100%" height="280" style="border:0;" loading="lazy"></iframe>
                </div>
              </div>

              <div class="lg:col-span-4 space-y-6">
                <div class="bg-white rounded-sm border border-slate-200 p-6 shadow-sm space-y-4 text-center sticky top-24">
                  <div class="w-20 h-20 rounded-sm overflow-hidden mx-auto border-2 border-amber-500 shadow-md">
                    <img src="${p.author.avatar}" alt="" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 class="font-black text-base text-slate-900 font-serif">${p.author.name}</h4>
                    <p class="text-xs text-slate-400">Chuyên viên tư vấn đất nền ${p.district}</p>
                  </div>
                  <div class="space-y-2 pt-2">
                    <a href="tel:${p.author.phone}" class="block w-full py-2.5 bg-[#5C3A21] hover:bg-[#4A2810] text-amber-300 font-black text-xs rounded-sm shadow transition cursor-pointer">📞 GỌI ${p.author.phone}</a>
                    <a href="https://zalo.me/${p.author.zalo}" target="_blank" class="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-sm shadow transition cursor-pointer">💬 CHAT ZALO VỚI CHUYÊN VIÊN</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function getNewsListHTML() {
      return `
        <div class="bg-[#FCFBF9] py-8 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 space-y-6">
            <div class="text-xs text-slate-500 flex items-center gap-1.5">
              <span onclick="navigate('home')" class="hover:text-amber-700 cursor-pointer">Trang chủ</span><span>/</span>
              <span class="text-amber-800 font-bold">Tin tức & Bài viết</span>
            </div>
            <div class="border-b border-amber-200 pb-4">
              <h1 class="text-2xl font-black text-[#4A2810] font-serif">TIN TỨC BẤT ĐỘNG SẢN TÂY NGUYÊN</h1>
              <p class="text-xs text-slate-500 mt-1">Cập nhật quy hoạch cao tốc, chính sách pháp lý và diễn biến thị trường</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${BDS03_NEWS.map(art => `
                <div onclick="handleOpenArticle(${art.id})" class="bg-white rounded-sm border border-slate-200 hover:border-amber-500 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between">
                  <div class="h-48 overflow-hidden bg-slate-100">
                    <img src="${art.image}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div class="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span class="text-[10px] font-bold text-amber-800 uppercase tracking-wider">${art.category}</span>
                      <h3 class="font-bold text-sm text-slate-900 group-hover:text-[#4A2810] transition line-clamp-2 leading-snug mt-1 font-serif">${art.title}</h3>
                      <p class="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">${art.desc}</p>
                    </div>
                    <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>${art.date}</span>
                      <span class="text-amber-800 font-bold">Xem chi tiết ›</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    function getNewsDetailHTML() {
      if(!selectedArticle) return '';
      const a = selectedArticle;
      return `
        <div class="bg-[#FCFBF9] py-8 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 max-w-4xl space-y-6">
            <div class="text-xs text-slate-500 flex items-center gap-1.5">
              <span onclick="navigate('home')" class="hover:text-amber-700 cursor-pointer">Trang chủ</span><span>/</span>
              <span onclick="navigate('news')" class="hover:text-amber-700 cursor-pointer">Tin tức</span><span>/</span>
              <span class="text-amber-800 font-bold truncate">${a.title}</span>
            </div>
            <div class="bg-white rounded-md border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <span class="px-3 py-1 bg-amber-100 text-amber-800 font-bold text-xs rounded-sm">${a.category}</span>
              <h1 class="text-2xl sm:text-3xl font-black text-slate-900 font-serif leading-tight">${a.title}</h1>
              <div class="text-xs text-slate-400 flex items-center gap-4 border-b border-slate-100 pb-3">
                <span>Ngày đăng: ${a.date}</span><span>•</span><span>Tác giả: ${a.author}</span><span>•</span><span>${a.views} lượt xem</span>
              </div>
              <div class="rounded-sm overflow-hidden shadow-sm">
                <img src="${a.image}" class="w-full h-80 object-cover" />
              </div>
              <div class="space-y-4 text-sm text-slate-700 leading-relaxed">
                ${a.content.map(p => `<p>${p}</p>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function getAboutPageHTML() {
      return `
        <div class="bg-[#FCFBF9] py-12 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 max-w-4xl space-y-8">
            <div class="bg-white rounded-md border border-amber-100 p-8 shadow-md space-y-6">
              <h1 class="text-2xl sm:text-3xl font-black text-[#4A2810] font-serif uppercase">VỀ CHÚNG TÔI — TUẤN NHÂN REALTY</h1>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">Bất Động Sản Tuấn Nhân là đơn vị tiên phong trong lĩnh vực tư vấn, đầu tư và phát triển các sản phẩm đất nền nghỉ dưỡng, đất vườn sinh thái và nhà phố tại thị trường Bảo Lộc, Bảo Lâm, Di Linh - Tỉnh Lâm Đồng.</p>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-center">
                <div class="p-4 bg-amber-50/60 rounded-sm"><div class="text-2xl font-black text-[#4A2810] font-serif">10+ Năm</div><div class="text-xs text-slate-500 mt-1">Kinh nghiệm Tây Nguyên</div></div>
                <div class="p-4 bg-amber-50/60 rounded-sm"><div class="text-2xl font-black text-[#4A2810] font-serif">1,200+</div><div class="text-xs text-slate-500 mt-1">Sổ đỏ trao tay</div></div>
                <div class="p-4 bg-amber-50/60 rounded-sm"><div class="text-2xl font-black text-amber-600 font-serif">100%</div><div class="text-xs text-slate-500 mt-1">Pháp lý minh bạch</div></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function getContactPageHTML() {
      return `
        <div class="bg-[#FCFBF9] py-12 min-h-screen">
          <div class="max-w-7xl mx-auto px-4 max-w-4xl space-y-8">
            <div class="bg-white rounded-md border border-amber-100 p-8 shadow-md space-y-6">
              <div class="space-y-1">
                <h1 class="text-2xl font-black text-[#4A2810] font-serif uppercase">LIÊN HỆ & TƯ VẤN ĐẦU TƯ</h1>
                <p class="text-xs text-slate-500">Đội ngũ chuyên viên sẵn sàng hỗ trợ khảo sát thực tế và thẩm định pháp lý 24/7</p>
              </div>
              <form action="api/contact.php" method="POST" class="space-y-4 text-xs">
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Họ và tên (*)</label>
                  <input type="text" name="name" placeholder="Nhập họ tên của bạn..." required class="w-full bg-slate-50 border border-slate-300 rounded-sm p-3" />
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Số điện thoại / Zalo (*)</label>
                  <input type="tel" name="phone" placeholder="Nhập số điện thoại..." required class="w-full bg-slate-50 border border-slate-300 rounded-sm p-3 font-bold text-amber-900" />
                </div>
                <div>
                  <label class="font-bold text-slate-700 block mb-1">Nội dung yêu cầu</label>
                  <textarea name="message" rows="4" placeholder="Bạn quan tâm loại đất nền, đất vườn hay cần thẩm định giá..." class="w-full bg-slate-50 border border-slate-300 rounded-sm p-3"></textarea>
                </div>
                <button type="submit" class="w-full py-3.5 bg-[#5C3A21] hover:bg-[#4A2810] text-amber-300 font-black text-xs uppercase tracking-wider rounded-sm shadow-lg transition cursor-pointer">GỬI THÔNG TIN LIÊN HỆ</button>
              </form>
            </div>
          </div>
        </div>
      `;
    }

    function renderApp() {
      const app = document.getElementById('appMain');
      if(currentPage === 'home') app.innerHTML = getHomePageHTML();
      else if(['san-pham-bds', 'dat-nen', 'dat-vuon', 'biet-thu', 'nha-pho', 'du-an', 'dia-diem'].includes(currentPage)) app.innerHTML = getCatalogHTML();
      else if(currentPage === 'news') app.innerHTML = getNewsListHTML();
      else if(currentPage === 'property-detail') app.innerHTML = getPropertyDetailHTML();
      else if(currentPage === 'news-detail') app.innerHTML = getNewsDetailHTML();
      else if(currentPage === 'about') app.innerHTML = getAboutPageHTML();
      else if(currentPage === 'contact') app.innerHTML = getContactPageHTML();
      else app.innerHTML = getHomePageHTML();
      
      lucide.createIcons();
    }

    // Gallery Logic
    function setGalleryImage(idx) {
      if(!selectedProperty) return;
      activeGalleryIdx = idx;
      document.getElementById('mainGalleryImg').src = selectedProperty.gallery[idx];
      renderApp(); // re-render to update border
    }
    
    function prevGalleryImage() {
      if(!selectedProperty) return;
      let len = selectedProperty.gallery.length;
      setGalleryImage((activeGalleryIdx - 1 + len) % len);
    }
    
    function nextGalleryImage() {
      if(!selectedProperty) return;
      let len = selectedProperty.gallery.length;
      setGalleryImage((activeGalleryIdx + 1) % len);
    }

    // Init
    renderNav();
    renderApp();

  </script>
</body>
</html>