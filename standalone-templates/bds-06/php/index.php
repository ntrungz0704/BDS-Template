<?php
require_once 'config/db.php';

$company = [
    'name' => 'TEMPLATESBDS',
    'phone' => '0919 006 030',
    'phone_clean' => '0919006030',
    'email' => 'contact@templatesbds.com',
    'address' => 'Quận 9, TP. Thủ Đức, TP.HCM',
    'slogan' => 'Đại đô thị sinh thái Grand Riverside - Không gian sống chuẩn mực quốc tế.',
    'zalo' => '0919006030'
];

$projects_json = '[]';

if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $company = [
                'name' => $row['name'],
                'phone' => $row['phone'],
                'phone_clean' => preg_replace('/[^0-9]/', '', $row['phone']),
                'email' => $row['email'],
                'address' => $row['address'],
                'slogan' => $row['slogan'],
                'zalo' => preg_replace('/[^0-9]/', '', $row['zalo'])
            ];
        }

        $stmt = $pdo->query("SELECT * FROM projects");
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($projects as &$p) {
            $p['gallery'] = json_decode($p['gallery']);
            $p['specs'] = json_decode($p['specs']);
            $p['amenities'] = json_decode($p['amenities']);
            $p['priceNum'] = (float)$p['priceNum'];
            $p['areaNum'] = (float)$p['areaNum'];
            $p['bedrooms'] = (int)$p['bedrooms'];
            $p['bathrooms'] = (int)$p['bathrooms'];
        }
        if ($projects) {
            $projects_json = json_encode($projects);
        }
    } catch (Exception $e) {
        // use fallback
    }
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BDS-06 | Grand Riverside Eco-Township & Residential Resort</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .max-w-7xl { max-width: 80rem; }
    /* Transitions */
    .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }
    /* Hide scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  </style>
</head>
<body class="bg-[#F8FAFC] text-slate-900 font-sans selection:bg-red-500 selection:text-white flex flex-col min-h-screen">
  
  <div id="toast" class="fixed bottom-24 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-sm shadow-2xl font-bold text-xs items-center gap-2 animate-bounce hidden">
    <i data-lucide="check-circle" width="16" height="16"></i> <span id="toast-message"></span>
  </div>

  <div id="video-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md items-center justify-center p-4 hidden">
    <div class="relative w-full max-w-4xl bg-slate-900 rounded-md overflow-hidden shadow-2xl border border-slate-700">
      <button onclick="closeVideoModal()" class="absolute top-4 right-4 p-2 rounded-sm bg-slate-800 text-white hover:bg-red-600 transition-colors z-10">
        <i data-lucide="x" width="20" height="20"></i>
      </button>
      <div class="aspect-video">
        <iframe id="video-iframe" class="w-full h-full" src="" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>

  <div id="lightbox-modal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md items-center justify-center p-4 cursor-zoom-out hidden" onclick="closeLightbox()">
    <div class="relative max-w-5xl max-h-[90vh] rounded-sm overflow-hidden shadow-2xl border-2 border-white/20" onclick="event.stopPropagation()">
      <img id="lightbox-img" src="" alt="Lightbox Zoom" class="w-full h-full object-contain" />
    </div>
  </div>

  <div id="lead-modal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm items-center justify-center p-4 hidden">
    <div class="bg-white rounded-md p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 relative border border-slate-200">
      <button onclick="closeLeadModal()" class="absolute top-4 right-4 p-2 rounded-sm hover:bg-slate-100 text-slate-500">
        <i data-lucide="x" width="18" height="18"></i>
      </button>
      <div class="text-center space-y-1">
        <span class="text-xs font-black text-[#D8232A] uppercase tracking-wider">HỆ THỐNG PHÂN PHỐI TRỰC TIẾP</span>
        <h3 id="lead-modal-title" class="text-lg sm:text-xl font-black text-slate-900">TẢI BẢNG GIÁ & HỒ SƠ</h3>
        <p class="text-xs text-slate-500">Chuyên viên tư vấn sẽ gửi trọn bộ file PDF qua Zalo trong 3 phút.</p>
      </div>
      <form onsubmit="handleLeadSubmit(event)" action="api/contact.php" method="POST" class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-slate-700 mb-1">Họ và tên của bạn</label>
          <input type="text" id="modal-name" placeholder="VD: Nguyễn Văn Nam" class="w-full px-3 py-2 rounded-sm border border-slate-200 focus:outline-none focus:border-red-500 bg-white" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Số điện thoại / Zalo <span class="text-red-500">*</span></label>
          <input type="tel" id="modal-phone" required placeholder="VD: <?= htmlspecialchars($company["phone"]) ?>" class="w-full px-3 py-2 rounded-sm border border-slate-200 focus:outline-none focus:border-red-500 bg-white" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 mb-1">Email nhận file PDF</label>
          <input type="email" id="modal-email" placeholder="VD: email@gmail.com" class="w-full px-3 py-2 rounded-sm border border-slate-200 focus:outline-none focus:border-red-500 bg-white" />
        </div>
        <button type="submit" class="w-full py-3 bg-[#D8232A] hover:bg-[#b91c1c] text-white font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md transition">
          Gửi Yêu Cầu & Tải Tài Liệu Ngay
        </button>
      </form>
    </div>
  </div>

  <div id="root" class="flex-1 w-full flex flex-col">
    <!-- Rendered content goes here -->
  </div>

  <!-- Universal Template Footer Area -->
  <footer class="bg-[#0F172A] text-white pt-16 pb-8 border-t-[6px] border-[#D8232A]">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-10 h-10 rounded-sm bg-gradient-to-br from-[#D8232A] to-[#B91C1C] flex items-center justify-center text-white font-black shadow-lg">
              <i data-lucide="building-2" width="20" height="20"></i>
            </div>
            <div>
              <span class="text-base font-black tracking-tight block leading-tight text-white"><?= htmlspecialchars($company["name"]) ?></span>
              <span class="text-[10px] tracking-widest text-amber-400 block uppercase font-bold">BDS-06</span>
            </div>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            <?= htmlspecialchars($company["slogan"]) ?>
          </p>
          <div class="space-y-2 text-xs">
            <div class="flex items-start gap-2">
              <i data-lucide="map-pin" width="14" height="14" class="text-red-400 flex-shrink-0 mt-0.5"></i>
              <span class="text-slate-300"><?= htmlspecialchars($company["address"]) ?></span>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="phone" width="14" height="14" class="text-red-400"></i>
              <a href="tel:<?= htmlspecialchars($company["phone_clean"]) ?>" class="text-slate-300 hover:text-white font-bold"><?= htmlspecialchars($company["phone"]) ?></a>
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="mail" width="14" height="14" class="text-red-400"></i>
              <a href="mailto:<?= htmlspecialchars($company["email"]) ?>" class="text-slate-300 hover:text-white"><?= htmlspecialchars($company["email"]) ?></a>
            </div>
          </div>
        </div>
        
        <div>
          <h4 class="font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Liên Kết Nhanh</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><a href="#" onclick="navigate('home'); return false;" class="hover:text-[#D8232A] transition-colors flex items-center gap-1"><i data-lucide="chevron-right" width="12" height="12"></i> Trang Chủ</a></li>
            <li><a href="#" onclick="navigate('can-ho'); return false;" class="hover:text-[#D8232A] transition-colors flex items-center gap-1"><i data-lucide="chevron-right" width="12" height="12"></i> Căn Hộ</a></li>
            <li><a href="#" onclick="navigate('shophouse'); return false;" class="hover:text-[#D8232A] transition-colors flex items-center gap-1"><i data-lucide="chevron-right" width="12" height="12"></i> Shophouse</a></li>
            <li><a href="#" onclick="navigate('biet-thu'); return false;" class="hover:text-[#D8232A] transition-colors flex items-center gap-1"><i data-lucide="chevron-right" width="12" height="12"></i> Biệt Thự</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Hỗ Trợ Khách Hàng</h4>
          <ul class="space-y-2.5 text-xs text-slate-400">
            <li><a href="#" onclick="navigate('chinh-sach'); return false;" class="hover:text-[#D8232A] transition-colors flex items-center gap-1"><i data-lucide="chevron-right" width="12" height="12"></i> Chính Sách Bán Hàng</a></li>
            <li><a href="#" onclick="navigate('tien-ich'); return false;" class="hover:text-[#D8232A] transition-colors flex items-center gap-1"><i data-lucide="chevron-right" width="12" height="12"></i> Tiện Ích Nội Khu</a></li>
            <li><a href="#" onclick="navigate('ky-gui'); return false;" class="hover:text-[#D8232A] transition-colors flex items-center gap-1"><i data-lucide="chevron-right" width="12" height="12"></i> Ký Gửi Mua Bán</a></li>
            <li><a href="#" onclick="navigate('lien-he'); return false;" class="hover:text-[#D8232A] transition-colors flex items-center gap-1"><i data-lucide="chevron-right" width="12" height="12"></i> Liên Hệ CĐT</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Đăng Ký Nhận Tin</h4>
          <p class="text-xs text-slate-400 mb-3">Nhận ngay bảng giá và chính sách ưu đãi mới nhất từ CĐT.</p>
          <form onsubmit="handleLeadSubmit(event)" action="api/contact.php" method="POST" class="flex gap-2">
            <input type="email" placeholder="Email của bạn..." class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-sm text-xs focus:outline-none focus:border-red-500 text-white" />
            <button type="submit" class="px-4 py-2 bg-[#D8232A] hover:bg-[#b91c1c] rounded-sm text-white text-xs font-bold transition">Gửi</button>
          </form>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>&copy; 2026 <?= htmlspecialchars($company["name"]) ?>. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-white">Điều khoản</a>
          <a href="#" class="hover:text-white">Bảo mật</a>
          <a href="#" class="hover:text-white">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating Action Buttons -->
  <div class="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
    <a href="https://zalo.me/<?= htmlspecialchars($company["phone_clean"]) ?>" target="_blank" class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-bounce" style="animation-duration: 2s;">
      <i data-lucide="message-square" width="24" height="24"></i>
    </a>
    <a href="tel:<?= htmlspecialchars($company["phone_clean"]) ?>" class="w-12 h-12 bg-[#D8232A] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition animate-pulse">
      <i data-lucide="phone" width="24" height="24"></i>
    </a>
  </div>

  <!-- Scripts -->
  <script>
    
const BDS06_PROPERTIES = <?php echo $projects_json != "[]" ? $projects_json : \'[
  {
    id: 1,
    title: 'Căn Hộ 1 Phòng Ngủ Smart Modern (1PN + 1) Tháp Sapphire',
    slug: 'can-ho-1pn-plus-thap-sapphire',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    price: '2.35 Tỷ VNĐ',
    priceNum: 2.35,
    area: '48.5 m²',
    areaNum: 48.5,
    bedrooms: 1,
    bathrooms: 1,
    direction: 'Đông Nam',
    location: 'Đại lộ Central Park, Khu Đô Thị Sinh Thái Grand Park',
    zone: 'Tháp Sapphire S1',
    floor: 'Tầng 12A',
    badge: 'BÁN CHẠY',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    specs: [
      'Thiết kế 1PN + 1 phòng đa năng thông minh',
      'Ban công rộng ngắm trực diện công viên sinh thái 12ha',
      'Cửa kính Low-E cản nhiệt 3 lớp chạm sàn',
      'Thiết bị vệ sinh Hafele / Kohler cao cấp'
    ],
    amenities: ['Hồ bơi tràn', 'Phòng Gym 3D', 'Vườn dạo bộ trên cao', 'Smart Home 4.0'],
    desc: 'Căn hộ 1PN+1 thiết kế tối ưu công năng, không gian cộng thêm linh hoạt biến đổi thành phòng làm việc hoặc phòng ngủ phụ cho gia đình trẻ.',
    highlight: 'Chiết khấu ngay 8% khi thanh toán sớm — Tặng gói Smart Home 50 triệu'
  },
  {
    id: 2,
    title: 'Căn Hộ 2 Phòng Ngủ Góc Park View (2PN + 2WC) Tháp Ruby',
    slug: 'can-ho-2pn-goc-parkview-thap-ruby',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    price: '3.65 Tỷ VNĐ',
    priceNum: 3.65,
    area: '72.8 m²',
    areaNum: 72.8,
    bedrooms: 2,
    bathrooms: 2,
    direction: 'Nam - Đông Nam',
    location: 'Tòa Ruby R2, Grand Park Boulevard',
    zone: 'Tháp Ruby R2',
    floor: 'Tầng 18',
    badge: 'HOT DEAL',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'
    ],
    specs: [
      'Căn góc 2 mặt thoáng đón gió mát quanh năm',
      'Bếp riêng khép kín thông thoáng ra logia phơi đồ',
      'Phòng ngủ Master có phòng thay đồ riêng',
      'Trang bị hệ thống lọc không khí khử khuẩn tự động'
    ],
    amenities: ['Sảnh đón 5 sao', 'Bãi đỗ xe thông minh', 'Sân chơi trẻ em liên hoàn', 'Vườn nướng BBQ'],
    desc: 'Căn góc 2 phòng ngủ sở hữu tầm nhìn kép tuyệt mỹ ôm trọn biển hồ cảnh quan cát trắng và dải công viên ánh sáng lung linh về đêm.',
    highlight: 'Hỗ trợ lãi suất 0% trong 24 tháng — Ân hạn nợ gốc đến khi nhận nhà'
  },
  {
    id: 3,
    title: 'Căn Hộ 3 Phòng Ngủ Master Luxury Tháp Diamond',
    slug: 'can-ho-3pn-master-luxury-diamond',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    price: '5.20 Tỷ VNĐ',
    priceNum: 5.20,
    area: '98.6 m²',
    areaNum: 98.6,
    bedrooms: 3,
    bathrooms: 2,
    direction: 'Đông',
    location: 'Tháp Diamond D1, Mặt tiền Hồ Cảnh Quan',
    zone: 'Tháp Diamond D1',
    floor: 'Tầng 22',
    badge: 'VIP LUXURY',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80'
    ],
    specs: [
      '3 Phòng ngủ rộng rãi với ban công Panorama kéo dài',
      'Full nội thất nhập khẩu Châu Âu cao cấp',
      'Khóa cửa vân tay FaceID bảo mật 4 lớp',
      'Hệ thống nước uống tinh khiết tại vòi chuẩn WHO'
    ],
    amenities: ['Hồ bơi vô cực trên cao', 'Clubhouse thượng lưu', 'Sân tập Golf 3D', 'Sky Bar Panorama'],
    desc: 'Không gian sống hoàn mỹ chuẩn nghỉ dưỡng 5 sao dành riêng cho các gia đình đa thế hệ, mang đến chuẩn mực sống thượng lưu khác biệt.',
    highlight: 'Tặng ngay gói hoàn thiện nội thất 150 triệu — Tặng 3 năm phí quản lý'
  },
  {
    id: 4,
    title: 'Penthouse Sky Villa Duplex Sân Vườn Hoàng Gia',
    slug: 'penthouse-sky-villa-duplex-hoang-gia',
    category: 'can-ho',
    categoryLabel: 'Căn Hộ Cao Cấp',
    price: '11.8 Tỷ VNĐ',
    priceNum: 11.8,
    area: '215.0 m²',
    areaNum: 215.0,
    bedrooms: 4,
    bathrooms: 4,
    direction: 'Đông Nam',
    location: 'Tầng 35 Tháp Diamond D1 (Sky Villa)',
    zone: 'Tháp Diamond Sky',
    floor: 'Tầng 35-36',
    badge: 'SIÊU HIẾM',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ],
    specs: [
      'Thiết kế Duplex thông tầng trần cao 6.2m cực kỳ bề thế',
      'Hồ bơi chân mây và sân vườn riêng tại ban công',
      'Thang máy riêng biệt tận cửa căn hộ',
      'Tầm view Panorama 360 độ toàn cảnh thành phố'
    ],
    amenities: ['Thang máy riêng', 'Hồ bơi chân mây', 'Đỗ xe 2 vị trí định danh', 'Quản gia 24/7'],
    desc: 'Dinh thự trên không độc bản dành riêng cho 10 vị chủ nhân tinh hoa, khẳng định vị thế đỉnh cao và phong cách sống vương giả.',
    highlight: 'Tặng thẻ VIP đặc quyền Golf Club 10 năm — Chiết khấu thanh toán 12%'
  },
  {
    id: 5,
    title: 'Shophouse Khối Đế Mặt Tiền Đại Lộ 30m Sầm Uất',
    slug: 'shophouse-khoi-de-dai-lo-30m',
    category: 'shophouse',
    categoryLabel: 'Shophouse Thương Mại',
    price: '13.5 Tỷ VNĐ',
    priceNum: 13.5,
    area: '135.0 m²',
    areaNum: 135.0,
    bedrooms: 2,
    bathrooms: 3,
    direction: 'Tây Nam',
    location: 'Mặt tiền Đại lộ Grand Boulevard 30m',
    zone: 'Phân Khu Shophouse',
    floor: 'Trệt + Lửng (2 Tầng)',
    badge: 'KINH DOANH ĐẮC ĐỊA',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80'
    ],
    specs: [
      'Mặt tiền kinh doanh 7.5m cực rộng trên đại lộ 30m',
      'Trần tầng 1 cao 5.8m có lửng thông thoáng',
      'Phù hợp mở showroom, F&B, ngân hàng, spa cao cấp',
      'Sở hữu vỉa hè lát đá hoa cương rộng 8m để xe thoải mái'
    ],
    amenities: ['Vỉa hè 8m', 'Phố đi bộ đêm', 'Bãi đỗ xe trước cửa', 'Hệ thống PCCC tự động'],
    desc: 'Tọa lạc tại tuyến phố giao thương sầm uất bậc nhất đại đô thị với lưu lượng hơn 30.000 cư dân qua lại mỗi ngày, bảo chứng sinh lời bền vững.',
    highlight: 'Cam kết thuê lại 8%/năm trong 3 năm đầu — Tặng gói hoàn thiện mặt tiền 100 triệu'
  },
  {
    id: 6,
    title: 'Nhà Phố Vườn Liền Kề Park View 4 Tầng Sang Trọng',
    slug: 'nha-pho-vuon-lien-ke-park-view-4-tang',
    category: 'nha-pho',
    categoryLabel: 'Nhà Phố Liền Kề',
    price: '9.8 Tỷ VNĐ',
    priceNum: 9.8,
    area: '110.0 m²',
    areaNum: 110.0,
    bedrooms: 4,
    bathrooms: 5,
    direction: 'Đông Bắc',
    location: 'Phân khu Park Residence, Đường Hoa Ban 16m',
    zone: 'Phân Khu Nhà Phố',
    floor: '1 Trệt + 3 Lầu + Sân Thượng',
    badge: 'MỚI MỞ BÁN',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
    ],
    specs: [
      'Xây dựng 1 trệt 3 lầu + tum sân thượng phong cách tân cổ điển',
      'Sân trước để ô tô 7 chỗ, sân sau làm tiểu cảnh vườn xanh',
      'Phòng khách trần cao bề thế, 4 phòng ngủ master khép kín',
      'Đường trước nhà 16m cây xanh rợp bóng mát'
    ],
    amenities: ['Sân vườn trước sau', 'Gara ô tô', 'Hệ thống an ninh 24/7', 'Công viên dạo bộ'],
    desc: 'Thiết kế thông minh hài hòa giữa không gian sống xanh thanh bình và tiện nghi đô thị hiện đại, nơi chốn an cư lý tưởng vững bền cho nhiều thế hệ.',
    highlight: 'Ân hạn nợ gốc 36 tháng — Nhận ngay 1 cây vàng SJC may mắn'
  },
  {
    id: 7,
    title: 'Biệt Thự Song Lập Hồ Cảnh Quan (Sân Vườn & Hồ Bơi Riêng)',
    slug: 'biet-thu-song-lap-ho-canh-quan',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Sinh Thái',
    price: '19.5 Tỷ VNĐ',
    priceNum: 19.5,
    area: '210.0 m²',
    areaNum: 210.0,
    bedrooms: 4,
    bathrooms: 5,
    direction: 'Đông Nam',
    location: 'Đảo Ngọc Riverside, Phân khu Biệt thự ven hồ',
    zone: 'Phân Khu Đảo Biệt Thự',
    floor: '1 Trệt + 2 Lầu',
    badge: 'VIEW HỒ 12HA',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
    ],
    specs: [
      'Mặt tiền 10m x Sâu 21m khuôn viên đất vuông vức',
      '3 Mặt thoáng đón gió tự nhiên từ mặt hồ cảnh quan',
      'Sân vườn rộng thiết kế sẵn hồ cá Koi và bể bơi riêng biệt',
      'Pháp lý sổ hồng sở hữu lâu dài vĩnh viễn'
    ],
    amenities: ['Hồ bơi riêng', 'Bến du thuyền nội khu', 'Clubhouse ven hồ', 'Sân tennis riêng biệt'],
    desc: 'Tọa lạc tại bán đảo sinh thái riêng biệt với an ninh đa lớp 24/7, mang đến không gian nghỉ dưỡng thanh bình biệt lập ngay trong lòng đại đô thị.',
    highlight: 'Chiết khấu 10% thanh toán sớm — Tặng gói cảnh quan sân vườn trị giá 200 triệu'
  },
  {
    id: 8,
    title: 'Biệt Thự Đơn Lập Góc Siêu VIP Bến Du Thuyền Riêng',
    slug: 'biet-thu-don-lap-goc-vip-ben-du-thuyen',
    category: 'biet-thu',
    categoryLabel: 'Biệt Thự Sinh Thái',
    price: '34.0 Tỷ VNĐ',
    priceNum: 34.0,
    area: '360.0 m²',
    areaNum: 360.0,
    bedrooms: 5,
    bathrooms: 6,
    direction: 'Nam',
    location: 'Mũi Bán Đảo Hoàng Gia, View Sông Trực Diện',
    zone: 'Phân Khu Đảo Biệt Thự',
    floor: '1 Trệt + 2 Lầu + Áp Mái',
    badge: 'ĐỘC BẢN GIỚI TINH HOA',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
    ],
    specs: [
      'Căn góc 2 mặt tiền sông rộng thoáng cực kỳ hiếm có',
      'Sở hữu bến đỗ du thuyền riêng biệt hợp pháp',
      'Hồ bơi vô cực tràn bờ mặt nước và phòng xông hơi Sauna riêng',
      'Hầm rượu vang và rạp chiếu phim gia đình tiêu chuẩn Dolby'
    ],
    amenities: ['Bến du thuyền', 'Hồ bơi tràn viền', 'Sân đỗ trực thăng', 'Bảo vệ riêng 24/7'],
    desc: 'Tuyệt tác dinh thự dành cho các gia tộc danh giá, nơi khẳng định vị thế tôn quý và giá trị tài sản truyền đời qua nhiều thế hệ.',
    highlight: 'Tặng du thuyền thể thao mini hoặc chiết khấu trực tiếp 1.5 Tỷ vào HĐMB'
  }
]\'; ?>;

const BDS06_AMENITIES = [
  {
    id: 1,
    title: 'Công Viên Sinh Thái & Hồ Điều Hòa 12ha',
    desc: 'Hồ nước ngọt điều hòa khí hậu cùng dải công viên rợp bóng mát, đài phun nước nghệ thuật và chòi ngắm cảnh ven hồ.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tag: '12 HECTARE LAKE'
  },
  {
    id: 2,
    title: 'Trung Tâm Thương Mại & Phố Đi Bộ Sầm Uất',
    desc: 'Quy tụ hơn 200+ thương hiệu ẩm thực, thời trang, rạp chiếu phim IMAX và khu vui chơi giải trí hàng đầu thế giới.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    tag: 'MEGA MALL & SHOPPING'
  },
  {
    id: 3,
    title: 'Hồ Bơi Vô Cực Tràn Bờ Chuẩn Olympic',
    desc: 'Cụm hồ bơi nước ấm 4 mùa phân tầng hiện đại, quầy pool bar sang trọng và khu tắm nắng phong cách resort nhiệt đới.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80',
    tag: 'OLYMPIC INFINITY POOL'
  },
  {
    id: 4,
    title: 'Khu Thể Thao Đa Năng & Sân Golf 3D',
    desc: 'Sân tennis, bóng rổ, cụm máy gym công nghệ cao ngoài trời và phòng tập golf 3D mô phỏng các sân golf quốc tế.',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    tag: 'SPORTS & 3D GOLF'
  },
  {
    id: 5,
    title: 'Vườn Nướng BBQ Ven Hồ & Clubhouse Thượng Lưu',
    desc: 'Không gian tiệc ngoài trời ấm cúng dành riêng cho cư dân, phòng tiệc VIP và quầy lounge thưởng thức rượu vang.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    tag: 'BBQ GARDEN & CLUBHOUSE'
  },
  {
    id: 6,
    title: 'Trường Học Liên Cấp & Bệnh Viện Quốc Tế',
    desc: 'Hệ thống giáo dục chuẩn Cambridge từ Mầm non đến Cấp 3 cùng bệnh viện đa khoa quốc tế chăm sóc sức khỏe 24/7.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    tag: 'INTERNATIONAL SCHOOL'
  }
];

const BDS06_NEWS = [
  {
    id: 1,
    title: 'Đại Đô Thị Sinh Thái Đón Đầu Tuyến Metro Và Cao Tốc Trọng Điểm 2026',
    slug: 'dai-do-thi-sinh-thai-don-dau-tuyen-metro-cao-toc-2026',
    date: '28/08/2026',
    author: 'Ban Quản Lý Dự Án',
    category: 'Tiến Độ & Hạ Tầng',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=800&q=80',
    excerpt: 'Hạ tầng giao thông khu vực phát triển bứt phá với tiến độ thần tốc của tuyến Metro số 1 và tuyến đường Vành Đai huyết mạch kết nối trực tiếp dự án...',
    content: [
      'Dự án sở hữu vị thế tâm điểm giao thương khi nằm ngay cửa ngõ kết nối trực tiếp với tuyến đường Vành Đai và nhà ga Metro trung tâm.',
      'Việc đồng bộ hạ tầng giao thông không chỉ rút ngắn thời gian di chuyển vào trung tâm thành phố xuống còn 15 phút mà còn tạo đòn bẩy gia tăng giá trị bất động sản lên tới 35-45% trong giai đoạn bàn giao.',
      'Hiện tại, toàn bộ các tuyến đường nội khu lộ giới từ 16m đến 30m đã được trải nhựa thảm bê tông đồng bộ, trồng cây xanh và lắp đặt hệ thống chiếu sáng thông minh năng lượng mặt trời.'
    ],
    views: 4820
  },
  {
    id: 2,
    title: 'Lễ Cất Nóc Tháp Sapphire & Khởi Công Cụm Phố Thương Mại Shophouse',
    slug: 'le-cat-noc-thap-sapphire-khoi-cong-shophouse',
    date: '22/08/2026',
    author: 'Chuyên Viên Phân Tích BDS',
    category: 'Sự Kiện Dự Án',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?w=800&q=80',
    excerpt: 'Chủ đầu tư chính thức tổ chức lễ cất nóc vượt tiến độ 45 ngày đối với 2 tòa tháp Sapphire S1-S2, đồng thời khởi công dãy Shophouse đại lộ...',
    content: [
      'Sự kiện cất nóc vượt tiến độ khẳng định tiềm lực tài chính vững mạnh và năng lực thi công kỷ luật của tổng thầu xây dựng top 1 Việt Nam.',
      'Hơn 800 khách hàng tham dự buổi lễ đã bày tỏ sự hào hứng khi tận mắt chứng kiến công trường sôi động 3 ca liên tục, đảm bảo tiến độ bàn giao nhà chuẩn xác vào Quý IV/2026.',
      'Cũng tại sự kiện, giỏ hàng ưu đãi 50 căn Shophouse đại lộ đầu tiên đã được giao dịch thành công 100% chỉ trong vòng 90 phút mở bán.'
    ],
    views: 6150
  },
  {
    id: 3,
    title: 'Bí Quyết Chọn Mua Căn Hộ Sống Xanh Chuẩn Sinh Thái Cho Gia Đình Trẻ',
    slug: 'bi-quyet-chon-mua-can-ho-song-xanh-cho-gia-dinh-tre',
    date: '15/08/2026',
    author: 'Kiến Trúc Sư Cảnh Quan',
    category: 'Cẩm Nang Mua Nhà',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    excerpt: 'Không chỉ là nơi để ở, một không gian sống sinh thái trong lành với đầy đủ trường học, bệnh viện và công viên cây xanh chính là khoản đầu tư vô giá cho tương lai con trẻ...',
    content: [
      'Xu hướng sống xanh, cân bằng sức khỏe (Wellness Living) đang trở thành tiêu chí hàng đầu khi người mua nhà đưa ra quyết định an cư.',
      'Với mật độ xây dựng chỉ 26.8%, hơn 73% diện tích dự án được phủ kín bởi mặt nước hồ điều hòa 12ha, công viên sinh thái và hệ thống tiện ích thể thao liên hoàn.',
      'Mỗi ngày trở về nhà là một kỳ nghỉ dưỡng đích thực, giúp tái tạo năng lượng tích cực cho bố mẹ và nuôi dưỡng môi trường phát triển toàn diện cho con cái.'
    ],
    views: 3940
  }
];

// App State
let currentPage = 'home';
let selectedProperty = null;
let selectedArticle = null;
let activeMasterplanTab = 'tong-the';

// Setup Icons from Lucide
function getIcon(name, size = 20, className = '') {
  return `<i data-lucide="${name}" width="${size}" height="${size}" class="${className}"></i>`;
}

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Format numbers
function formatPrice(priceNum) {
  return priceNum.toFixed(2);
}

// Render Functions
function renderHeader() {
  return `
    <header class="sticky top-0 z-40 bg-[#0F172A] text-white shadow-xl border-b border-slate-800">
      <div class="bg-[#D8232A] text-white text-[11px] font-bold py-1.5 px-4 hidden md:block">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-6">
            <span>🔥 MỞ BÁN ĐỢT 1: CHIẾT KHẤU ĐẾN 10% — HỖ TRỢ LÃI SUẤT 0% TRONG 24 THÁNG</span>
            <span class="opacity-80">★ TẶNG GÓI NỘI THẤT CAO CẤP 150 TRIỆU ★</span>
          </div>
          <div class="flex items-center gap-4">
            <a href="tel:<?= htmlspecialchars($company["phone_clean"]) ?>" class="flex items-center gap-1.5 hover:underline">
              ${getIcon('phone', 13, 'animate-pulse')} Hotline CĐT: <strong><?= htmlspecialchars($company["phone"]) ?></strong>
            </a>
            <span class="opacity-50">|</span>
            <span class="text-amber-300 font-extrabold">MẪU GIAO DIỆN: BDS-06</span>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        <div onclick="navigate('home')" class="flex items-center gap-2 sm:gap-2.5 cursor-pointer group min-w-0 max-w-[calc(100%-55px)] sm:max-w-none shrink-0">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-sm bg-gradient-to-br from-[#D8232A] to-[#B91C1C] flex items-center justify-center text-white font-black shadow-lg shadow-red-900/40 group-hover:scale-105 transition-transform shrink-0">
            ${getIcon('building-2', 20)}
          </div>
          <div class="min-w-0 truncate">
            <span class="text-sm sm:text-base font-black tracking-tight block leading-tight text-white group-hover:text-red-400 transition-colors truncate">
              <?= htmlspecialchars($company["name"]) ?>
            </span>
            <span class="text-[7.5px] sm:text-[10px] tracking-widest text-amber-400 block uppercase font-bold truncate">
              ĐẠI ĐÔ THỊ SINH THÁI 120HA
            </span>
          </div>
        </div>
        <nav class="hidden lg:flex items-center gap-2 xl:gap-4 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-slate-200 whitespace-nowrap">
          <button onclick="navigate('home')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'home' ? 'text-red-500 font-extrabold' : ''}">Trang Chủ</button>
          <button onclick="navigate('can-ho')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'can-ho' ? 'text-red-500 font-extrabold' : ''}">Căn Hộ</button>
          <button onclick="navigate('shophouse')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'shophouse' ? 'text-red-500 font-extrabold' : ''}">Shophouse</button>
          <button onclick="navigate('biet-thu')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'biet-thu' ? 'text-red-500 font-extrabold' : ''}">Biệt Thự</button>
          <button onclick="navigate('tien-ich')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'tien-ich' ? 'text-red-500 font-extrabold' : ''}">Tiện Ích</button>
          <button onclick="navigate('chinh-sach')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'chinh-sach' ? 'text-red-500 font-extrabold' : ''}">Chính Sách</button>
          <button onclick="navigate('thu-vien')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'thu-vien' ? 'text-red-500 font-extrabold' : ''}">Thư Viện</button>
          <button onclick="navigate('tin-tuc')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${['tin-tuc', 'news-detail'].includes(currentPage) ? 'text-red-500 font-extrabold' : ''}">Tin Tức</button>
          <button onclick="navigate('ky-gui')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'ky-gui' ? 'text-red-500 font-extrabold' : ''}">Ký Gửi</button>
          <button onclick="navigate('lien-he')" class="whitespace-nowrap px-1.5 py-1 transition-colors hover:text-red-400 ${currentPage === 'lien-he' ? 'text-red-500 font-extrabold' : ''}">Liên Hệ</button>
        </nav>
        <div class="flex items-center gap-2.5 shrink-0 ml-auto">
          <a href="tel:<?= htmlspecialchars($company["phone_clean"]) ?>" class="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-sm bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors whitespace-nowrap shrink-0">
            ${getIcon('phone', 13, 'text-red-400 animate-pulse shrink-0')}
            <span><?= htmlspecialchars($company["phone"]) ?></span>
          </a>
          <button onclick="document.getElementById('booking-lead-form')?.scrollIntoView({behavior:'smooth'}) || navigate('lien-he')" class="hidden md:inline-block px-3.5 py-2 bg-gradient-to-r from-[#D8232A] to-[#B91C1C] hover:from-red-700 hover:to-red-800 text-white text-xs font-black rounded-sm shadow-lg transition-all uppercase tracking-wider whitespace-nowrap shrink-0 hover:scale-105 active:scale-95">
            Tải Bảng Giá F1
          </button>
          <button onclick="toggleMobileMenu()" class="p-1.5 sm:p-2 rounded-sm bg-slate-800 text-white lg:hidden hover:bg-slate-700 shrink-0 flex items-center justify-center">
            <span id="menu-icon">${getIcon('menu', 20)}</span>
          </button>
        </div>
      </div>
      <div id="mobile-menu" class="hidden lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-5 space-y-3">
        <div class="grid grid-cols-2 gap-2 text-xs font-bold uppercase">
          <button onclick="navigate('home')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Trang Chủ</button>
          <button onclick="navigate('can-ho')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Căn Hộ</button>
          <button onclick="navigate('shophouse')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Shophouse</button>
          <button onclick="navigate('biet-thu')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Biệt Thự</button>
          <button onclick="navigate('tien-ich')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Tiện Ích</button>
          <button onclick="navigate('chinh-sach')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Chính Sách</button>
          <button onclick="navigate('thu-vien')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Thư Viện</button>
          <button onclick="navigate('tin-tuc')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Tin Tức</button>
          <button onclick="navigate('ky-gui')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Ký Gửi</button>
          <button onclick="navigate('lien-he')" class="p-2.5 rounded-lg text-left bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400">Liên Hệ</button>
        </div>
        <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <span class="text-slate-400">Hotline tư vấn 24/7:</span>
          <a href="tel:<?= htmlspecialchars($company["phone_clean"]) ?>" class="text-red-400 font-extrabold"><?= htmlspecialchars($company["phone"]) ?></a>
        </div>
      </div>
    </header>
  `;
}

function renderHero() {
  return `
    <section class="relative min-h-[560px] lg:min-h-[640px] flex items-center justify-center text-white overflow-hidden">
      <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80" alt="Hero" class="absolute inset-0 w-full h-full object-cover object-center scale-105 animate-pulse duration-1000" style="animation-duration: 8s" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-[#0F172A]/40"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#D8232A]/90 text-white text-xs font-black tracking-widest uppercase shadow-xl backdrop-blur-md">
          ${getIcon('sparkles', 14, 'text-amber-300')} TỔ HỢP ĐẠI ĐÔ THỊ SINH THÁI ĐẲNG CẤP 2026
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-[1.15] drop-shadow-2xl">
          KHU ĐÔ THỊ SINH THÁI PHỨC HỢP <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-red-500">GRAND RIVERSIDE</span>
        </h1>
        <p class="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow">
          Tuyệt tác không gian sống xanh chuẩn quốc tế quy mô 120ha bên hồ cảnh quan, tích hợp hơn 100+ tiện ích 5 sao đặc quyền và hệ thống Smart City tiên tiến.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button onclick="document.getElementById('masterplan-section')?.scrollIntoView({behavior:'smooth'}) || navigate('can-ho')" class="px-8 py-4 rounded-sm bg-[#D8232A] hover:bg-[#b91c1c] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-2xl shadow-red-900/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            Khám Phá Mặt Bằng Dự Án ${getIcon('chevron-right', 16)}
          </button>
          <button onclick="openVideoModal()" class="px-7 py-4 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:scale-105 transition-all flex items-center gap-2">
            ${getIcon('play', 16, 'text-red-400 fill-red-400')} Xem Video Flycam 3D
          </button>
        </div>
        <div class="pt-6">
          <div class="inline-grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-sm bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-2xl text-left">
            <div class="px-3 border-r border-slate-700/60">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Quy Mô Dự Án</span>
              <span class="text-base sm:text-lg font-black text-amber-400">120 Hecta</span>
            </div>
            <div class="px-3 border-r border-slate-700/60">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Mật Độ Xây Dựng</span>
              <span class="text-base sm:text-lg font-black text-emerald-400">Chỉ 26.8%</span>
            </div>
            <div class="px-3 border-r border-slate-700/60">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Công Viên & Biển Hồ</span>
              <span class="text-base sm:text-lg font-black text-cyan-400">12 Hecta</span>
            </div>
            <div class="px-3">
              <span class="text-[10px] uppercase font-bold text-slate-400 block">Pháp Lý Sở Hữu</span>
              <span class="text-base sm:text-lg font-black text-red-400">Sổ Hồng Lâu Dài</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderOverview() {
  const overviews = [
    { label: 'Tên Thương Mại', val: 'Khu Đô Thị Sinh Thái Grand Riverside Park' },
    { label: 'Vị Trí Quy Hoạch', val: 'Mặt tiền Đại lộ ven sông & Tuyến Vành Đai huyết mạch' },
    { label: 'Chủ Đầu Tư', val: 'Tập đoàn Bất Động Sản Quốc Tế Hàng Đầu' },
    { label: 'Tổng Quy Mô', val: '120 Hecta (Gồm 6 phân khu cao tầng & thấp tầng)' },
    { label: 'Mật Độ Xây Dựng', val: '26.8% (Dành 73.2% cho cây xanh, hồ nước và tiện ích)' },
    { label: 'Loại Hình Sản Phẩm', val: 'Căn hộ 1-3PN, Penthouse Duplex, Shophouse, Nhà phố, Biệt thự' },
    { label: 'Quy Mô Sản Phẩm', val: '3.500 căn hộ cao cấp + 450 căn nhà phố shophouse & biệt thự' },
    { label: 'Hệ Thống Tiện Ích', val: '100+ Tiện ích đặc quyền 5 sao (Hồ bơi tràn, Golf 3D, Bến du thuyền)' },
    { label: 'Hình Thức Sở Hữu', val: 'Sổ hồng lâu dài (Người Việt Nam) / 50 năm (Người nước ngoài)' },
    { label: 'Thời Gian Bàn Giao', val: 'Dự kiến Quý IV/2026 (Hoàn thiện nội thất cao cấp)' },
  ];
  return `
    <section id="overview-section" class="py-20 bg-white text-slate-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span class="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">★ THÔNG TIN MINH BẠCH & PHÁP LÝ HOÀN THIỆN ★</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">TỔNG QUAN QUY HOẠCH DỰ ÁN</h2>
          <div class="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2"></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div class="lg:col-span-7 space-y-4">
            <div class="bg-white text-slate-900 border border-slate-200 rounded-sm p-6 sm:p-8 space-y-3.5 shadow-sm font-medium">
              ${overviews.map(item => `
                <div class="flex items-start gap-3 text-xs sm:text-sm border-b border-slate-200/60 pb-2.5 last:border-0 last:pb-0">
                  <div class="w-5 h-5 rounded-sm bg-red-100 text-[#D8232A] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    ${getIcon('check', 12)}
                  </div>
                  <div class="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-2">
                    <span class="font-bold text-slate-500 sm:col-span-4 uppercase text-[11px] sm:text-xs">${item.label}:</span>
                    <span class="font-extrabold text-slate-800 sm:col-span-8">${item.val}</span>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="text-center pt-2">
              <button onclick="openLeadModal('TẢI TRỌN BỘ HỒ SƠ PHÁP LÝ & BẢNG GIÁ GỐC')" class="px-8 py-3.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-extrabold rounded-sm shadow-lg shadow-red-900/30 uppercase tracking-wider transition-all hover:scale-105">
                Tải Trọn Bộ Hồ Sơ Pháp Lý & Bảng Giá
              </button>
            </div>
          </div>
          <div class="lg:col-span-5 space-y-4">
            <div onclick="openVideoModal()" class="relative rounded-md overflow-hidden shadow-2xl border-4 border-white group cursor-pointer aspect-video bg-slate-900">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80" alt="Preview" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" />
              <div class="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/20 transition-colors">
                <div class="w-16 h-16 rounded-sm bg-[#D8232A] text-white flex items-center justify-center shadow-2xl shadow-red-600/80 group-hover:scale-110 transition-transform">
                  ${getIcon('play', 28, 'fill-white translate-x-0.5')}
                </div>
              </div>
              <div class="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-sm border border-slate-700 text-white text-xs">
                <span class="font-bold block text-amber-300">FLYCAM TIẾN ĐỘ THỰC TẾ 2026</span>
                <span class="opacity-70 text-[11px]">Bấm vào để xem toàn cảnh quy hoạch 120ha và cảnh quan hồ sinh thái</span>
              </div>
            </div>
            <div class="p-4 rounded-sm bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
              ${getIcon('shield', 22, 'text-amber-600 flex-shrink-0')}
              <div>
                <strong class="block">Bảo Lãnh Tiến Độ & Hỗ Trợ Vay Ngân Hàng</strong>
                <span class="opacity-80 text-[11px]">Được bảo lãnh tiến độ bởi Vietcombank & MB Bank. Hỗ trợ vay 70% giá trị hợp đồng.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderLocationSection() {
  return `
    <section id="location-section" class="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 relative z-10">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span class="text-xs font-extrabold text-red-400 uppercase tracking-widest block">★ TÂM ĐIỂM GIAO THƯƠNG KẾT NỐI KHÔNG GIỚI HẠN ★</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight">VỊ TRÍ KIM CƯƠNG & LIÊN KẾT VÙNG</h2>
          <div class="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2"></div>
          <p class="text-xs sm:text-sm text-slate-300 pt-2">Tọa lạc tại mặt tiền trục đại lộ ven hồ huyết mạch, kết nối trực tiếp với tuyến Metro và các tuyến cao tốc trọng điểm.</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 rounded-md overflow-hidden border border-slate-700 bg-slate-800 shadow-2xl p-4">
            <div class="relative aspect-[4/3] rounded-sm overflow-hidden">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80" alt="Map" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-slate-900/50 flex flex-col justify-between p-6">
                <div class="inline-block self-start px-3.5 py-1.5 rounded-lg bg-[#D8232A] text-white text-xs font-black shadow-md">
                  📍 VỊ TRÍ <?= htmlspecialchars($company["name"]) ?>
                </div>
                <div class="bg-slate-950/90 backdrop-blur-md p-4 rounded-sm border border-slate-700 text-xs space-y-1">
                  <strong class="text-amber-300 block font-black">MẶT TIỀN ĐẠI LỘ GRAND BOULEVARD</strong>
                  <p class="text-slate-300 text-[11px]">Nằm ngay cửa ngõ kết nối khu đô thị vệ tinh với trung tâm tài chính và các khu công nghệ cao.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-6 space-y-3.5">
            ${[
              { time: '3 Phút', title: 'Tuyến Metro Số 1 & Bến Xe Trung Tâm', desc: 'Kết nối trực tiếp ga metro ngầm, di chuyển nhanh chóng vào lõi đô thị.' },
              { time: '5 Phút', title: 'Đại Siêu Thị Aeon Mall & Trung Tâm Hành Chính', desc: 'Thiên đường mua sắm, giải trí và trung tâm dịch vụ công cộng hiện đại.' },
              { time: '10 Phút', title: 'Bệnh Viện Đa Khoa Quốc Tế & Cụm Trường Đại Học', desc: 'Tiếp cận hệ thống chăm sóc sức khỏe 5 sao và các trường đại học quốc tế.' },
              { time: '15 Phút', title: 'Trung Tâm Tài Chính Quận 1 & Sân Bay Quốc Tế', desc: 'Hạ tầng cao tốc thông thoáng giúp di chuyển đến sân bay cực kỳ thuận tiện.' },
              { time: '20 Phút', title: 'Khu Công Nghệ Cao & Các Khu Công Nghiệp Trọng Điểm', desc: 'Điểm đến lý tưởng cho các chuyên gia, kỹ sư và quản lý cấp cao an cư.' }
            ].map(item => `
              <div class="p-4 sm:p-5 rounded-sm bg-slate-800/80 border border-slate-700/80 hover:border-red-500/80 transition-all flex items-start gap-4 hover:translate-x-1">
                <div class="w-16 h-12 rounded-sm bg-gradient-to-br from-[#D8232A] to-[#991B1B] text-white flex flex-col items-center justify-center flex-shrink-0 font-black shadow-lg shadow-red-950">
                  ${getIcon('clock', 12, 'text-amber-300 mb-0.5')}
                  <span class="text-xs leading-none">${item.time}</span>
                </div>
                <div>
                  <h4 class="font-extrabold text-sm sm:text-base text-slate-100">${item.title}</h4>
                  <p class="text-xs text-slate-400 mt-0.5 leading-relaxed">${item.desc}</p>
                </div>
              </div>
            `).join('')}
            <div class="pt-2 text-center sm:text-left">
              <a href="https://maps.google.com" target="_blank" class="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-bold rounded-sm shadow-lg uppercase tracking-wider transition-all">
                ${getIcon('map-pin', 16)} Xem Vị Trí Trên Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderMasterplanSection() {
  const apartmentList = BDS06_PROPERTIES.filter(p => p.category === 'can-ho');
  const tabs = [
    { id: 'tong-the', label: 'TỔNG THỂ 120HA' },
    { id: 'sapphire', label: 'THÁP SAPPHIRE S1-S2' },
    { id: 'ruby', label: 'THÁP RUBY R1-R2' },
    { id: 'diamond', label: 'THÁP DIAMOND VIP' },
    { id: 'thap-tang', label: 'PHÂN KHU THẤP TẦNG' }
  ];
  
  return `
    <section id="masterplan-section" class="py-20 bg-slate-50 text-slate-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span class="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">★ QUY HOẠCH ĐỒNG BỘ — THIẾT KẾ ĐỘT PHÁ ★</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">MẶT BẰNG TỔNG THỂ & THIẾT KẾ CĂN HỘ</h2>
          <div class="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2"></div>
          <p class="text-xs sm:text-sm text-slate-600 pt-2">Sơ đồ phân khu 120ha cùng thiết kế căn hộ tối ưu công năng, 100% các phòng đều có cửa sổ và ban công đón sáng tự nhiên.</p>
        </div>
        
        <div class="flex flex-wrap items-center justify-center gap-2 mb-8">
          ${tabs.map(tab => `
            <button onclick="setActiveMasterplanTab('${tab.id}')" class="px-4 py-2.5 rounded-sm text-xs font-extrabold tracking-wider transition-all uppercase ${activeMasterplanTab === tab.id ? 'bg-[#D8232A] text-white shadow-lg shadow-red-900/30 scale-105' : 'bg-white text-slate-700 border border-slate-200 hover:border-red-300'}">
              ${tab.label}
            </button>
          `).join('')}
        </div>

        <div class="bg-white rounded-md p-4 sm:p-6 border border-slate-200 shadow-md mb-14">
          <div class="relative aspect-[21/9] rounded-sm overflow-hidden bg-slate-900">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80" alt="Masterplan CAD Floorplan" class="w-full h-full object-cover opacity-90" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div class="text-white space-y-1">
                <span class="px-3 py-1 bg-[#D8232A] text-[10px] font-black uppercase rounded-md inline-block">${activeMasterplanTab.toUpperCase()}</span>
                <h3 class="text-base sm:text-xl font-black">Sơ Đồ Phân Khu Quy Hoạch Chi Tiết 1/500 Chuẩn Quốc Tế</h3>
                <p class="text-xs text-slate-300 hidden sm:block">Khoảng cách giữa các tòa tháp từ 45m - 80m đảm bảo tối đa sự riêng tư và tầm nhìn thoáng đãng.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-14">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-xl sm:text-2xl font-black text-slate-900">CATALOG CĂN HỘ ĐIỂN HÌNH</h3>
              <span class="text-xs text-slate-500 font-medium">Bấm chọn loại căn hộ để xem layout chi tiết và báo giá</span>
            </div>
            <button onclick="navigate('can-ho')" class="text-xs font-bold text-[#D8232A] hover:underline flex items-center gap-1">
              Xem tất cả ${apartmentList.length} căn hộ ${getIcon('chevron-right', 14)}
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${apartmentList.map(apt => `
              <div onclick="handleOpenProperty(${apt.id})" class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group">
                <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src="${apt.image}" alt="${apt.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">${apt.badge}</div>
                  <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-300 text-xs font-black backdrop-blur">${apt.price}</div>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 block">${apt.zone} • ${apt.floor}</span>
                    <h4 class="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-red-600 transition-colors">${apt.title}</h4>
                  </div>
                  <div class="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                    <div><span class="text-[10px] text-slate-400 block font-medium">Diện tích</span><strong class="text-slate-800 font-extrabold">${apt.area}</strong></div>
                    <div><span class="text-[10px] text-slate-400 block font-medium">Phòng ngủ</span><strong class="text-slate-800 font-extrabold">${apt.bedrooms} PN</strong></div>
                    <div><span class="text-[10px] text-slate-400 block font-medium">Vệ sinh</span><strong class="text-slate-800 font-extrabold">${apt.bathrooms} WC</strong></div>
                  </div>
                  <button onclick="event.stopPropagation(); handleOpenProperty(${apt.id})" class="w-full py-2.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-extrabold rounded-sm shadow transition-colors uppercase tracking-wider text-center">Xem Chi Tiết Căn Hộ</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-slate-900 text-white rounded-md p-6 sm:p-8 space-y-6">
          <div class="text-center max-w-xl mx-auto space-y-1">
            <span class="text-xs font-bold text-amber-400 uppercase tracking-widest block">3D VIRTUAL REALITY EXPERIENCE</span>
            <h3 class="text-xl sm:text-2xl font-black">TRẢI NGHIỆM KHÔNG GIAN NỘI THẤT 3D THỰC TẾ ẢO</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            ${[
              { title: 'Phòng Khách Panorama Sang Trọng', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', desc: 'Trần cao 3.2m ngập tràn ánh sáng' },
              { title: 'Phòng Ngủ Master Đậm Chất Nghỉ Dưỡng', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', desc: 'Sàn gỗ cao cấp & View hồ thoáng đãng' },
              { title: 'Khu Bếp & Phòng Ăn Tiện Nghi Chuẩn Đức', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80', desc: 'Bếp đảo đá tự nhiên & Thiết bị Hafele' },
            ].map(tour => `
              <div onclick="openVideoModal()" class="rounded-sm overflow-hidden bg-slate-800 border border-slate-700 group cursor-pointer">
                <div class="relative aspect-[16/10] overflow-hidden">
                  <img src="${tour.img}" alt="${tour.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                    <div class="w-12 h-12 rounded-sm bg-[#D8232A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      ${getIcon('play', 20, 'fill-white translate-x-0.5')}
                    </div>
                  </div>
                </div>
                <div class="p-4">
                  <h5 class="font-extrabold text-sm text-slate-100">${tour.title}</h5>
                  <p class="text-xs text-slate-400 mt-0.5">${tour.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderLowRiseSection() {
  const lowRiseList = BDS06_PROPERTIES.filter(p => ['shophouse', 'nha-pho', 'biet-thu'].includes(p.category));
  return `
    <section id="lowrise-section" class="py-20 bg-white text-slate-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span class="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">★ TUYỆT TÁC THẤP TẦNG — KHẲNG ĐỊNH VỊ THẾ ★</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">PHÂN KHU NHÀ PHỐ & SHOPHOUSE THƯƠNG MẠI</h2>
          <div class="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2"></div>
          <p class="text-xs sm:text-sm text-slate-600 pt-2">Dãy Shophouse mặt tiền đại lộ 30m sầm uất và các căn biệt thự ven hồ sinh thái mang lại giá trị gia tăng vô hạn.</p>
        </div>
        
        <div class="relative rounded-md overflow-hidden shadow-xl mb-12 aspect-[21/9] bg-slate-900">
          <img src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1400&q=80" alt="Shophouse Boulevard" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div class="text-white space-y-2">
              <span class="px-3.5 py-1 bg-[#D8232A] text-xs font-black uppercase rounded-lg shadow inline-block">PHỐ ĐI BỘ & ĐẠI LỘ THƯƠNG MẠI 30M</span>
              <h3 class="text-lg sm:text-3xl font-black">Tâm Điểm Kinh Doanh Sầm Uất Cho Hơn 30.000 Cư Dân</h3>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${lowRiseList.map(item => `
            <div onclick="handleOpenProperty(${item.id})" class="bg-slate-50 rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group">
              <div class="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">${item.badge}</div>
                <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-300 text-xs font-black backdrop-blur">${item.price}</div>
              </div>
              <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-400 block">${item.categoryLabel} • ${item.zone}</span>
                  <h4 class="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-red-600 transition-colors">${item.title}</h4>
                </div>
                <div class="grid grid-cols-3 gap-2 py-2 border-y border-slate-200 text-center text-xs">
                  <div><span class="text-[10px] text-slate-400 block font-medium">Diện tích</span><strong class="text-slate-800 font-extrabold">${item.area}</strong></div>
                  <div><span class="text-[10px] text-slate-400 block font-medium">Số phòng</span><strong class="text-slate-800 font-extrabold">${item.bedrooms} PN</strong></div>
                  <div><span class="text-[10px] text-slate-400 block font-medium">Số tầng</span><strong class="text-slate-800 font-extrabold">${item.floor.split(' ')[0]}</strong></div>
                </div>
                <button onclick="event.stopPropagation(); handleOpenProperty(${item.id})" class="w-full py-2.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-extrabold rounded-sm shadow transition-colors uppercase tracking-wider text-center">Xem Báo Giá & Mặt Bằng</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderAmenitiesSection() {
  return `
    <section id="amenities-section" class="py-20 bg-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span class="text-xs font-extrabold text-red-400 uppercase tracking-widest block">★ TRẢI NGHIỆM SỐNG NGHỈ DƯỠNG MỖI NGÀY ★</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight">HỆ THỐNG TIỆN ÍCH ĐẲNG CẤP ĐẶC QUYỀN</h2>
          <div class="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2"></div>
          <p class="text-xs sm:text-sm text-slate-300 pt-2">Hơn 100+ tiện ích nội khu được thiết kế khép kín tiêu chuẩn quốc tế, đáp ứng trọn vẹn nhu cầu vui chơi, giải trí, sức khỏe và giáo dục.</p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${BDS06_AMENITIES.map(amenity => `
            <div onclick="navigate('tien-ich')" class="bg-slate-800 rounded-sm overflow-hidden border border-slate-700 hover:border-red-500 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col">
              <div class="relative aspect-[16/10] overflow-hidden">
                <img src="${amenity.image}" alt="${amenity.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">${amenity.tag}</div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-2">
                <h4 class="font-extrabold text-base text-slate-100 group-hover:text-red-400 transition-colors">${amenity.title}</h4>
                <p class="text-xs text-slate-300 leading-relaxed break-words">${amenity.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="text-center pt-10">
          <button onclick="navigate('tien-ich')" class="px-8 py-3.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-extrabold rounded-sm shadow-lg shadow-red-950 uppercase tracking-wider transition-all hover:scale-105">
            Đăng Ký Trải Nghiệm Hệ Thống Tiện Ích
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderPoliciesAndMortgageSection() {
  const mc = calculateMortgage();
  return `
    <section id="policy-mortgage-section" class="py-20 bg-slate-50 text-slate-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span class="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">★ ƯU ĐÃI KHỦNG — HỖ TRỢ TÀI CHÍNH TỐI ĐA ★</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">CHÍNH SÁCH BÁN HÀNG & BẢNG TÍNH VAY</h2>
          <div class="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div class="lg:col-span-7 space-y-4">
            <div class="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 class="text-lg font-black text-slate-900 flex items-center gap-2">
                ${getIcon('sparkles', 20, 'text-[#D8232A]')} CHÍNH SÁCH ƯU ĐÃI ĐỢT 1 TỪ CHỦ ĐẦU TƯ
              </h3>
              <div class="space-y-3">
                ${[
                  'Chiết khấu thanh toán sớm lên tới 10% trực tiếp vào giá trị hợp đồng mua bán.',
                  'Hỗ trợ vay vốn ngân hàng lên đến 70% giá trị căn hộ với lãi suất 0% trong 24 tháng.',
                  'Ân hạn nợ gốc và miễn phí trả nợ trước hạn trong suốt thời gian hỗ trợ lãi suất.',
                  'Tặng ngay gói hoàn thiện nội thất cao cấp trị giá 120 - 200 triệu đồng cho 50 khách hàng đầu tiên.',
                  'Miễn phí hoàn toàn 3 năm phí quản lý dịch vụ vận hành quốc tế.',
                  'Cam kết thuê lại 8%/năm đối với giỏ hàng Shophouse thương mại đại lộ.'
                ].map(text => `
                  <div class="flex items-start gap-3 text-xs sm:text-sm">
                    <div class="w-5 h-5 rounded-sm bg-red-100 text-[#D8232A] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      ${getIcon('check', 12)}
                    </div>
                    <p class="text-slate-700 font-semibold leading-relaxed">${text}</p>
                  </div>
                `).join('')}
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                <div class="p-3.5 rounded-sm bg-red-50 border border-red-200 text-center">
                  <span class="text-[10px] uppercase font-bold text-red-600 block">Quà Tặng Vàng</span>
                  <strong class="text-xs text-red-950 font-black">1 LƯỢNG VÀNG SJC</strong>
                </div>
                <div class="p-3.5 rounded-sm bg-amber-50 border border-amber-200 text-center">
                  <span class="text-[10px] uppercase font-bold text-amber-600 block">Du Lịch 5 Sao</span>
                  <strong class="text-xs text-amber-950 font-black">VOUCHER CHÂU ÂU</strong>
                </div>
                <div class="p-3.5 rounded-sm bg-emerald-50 border border-emerald-200 text-center">
                  <span class="text-[10px] uppercase font-bold text-emerald-600 block">Nội Thất An Cường</span>
                  <strong class="text-xs text-emerald-950 font-black">GÓI 150 TRIỆU</strong>
                </div>
              </div>
            </div>
          </div>

          <div id="booking-lead-form" class="lg:col-span-5 bg-[#0F172A] text-white rounded-md p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-4">
            <div class="text-center space-y-1">
              <span class="text-[10px] font-bold uppercase tracking-widest text-amber-400">BOOKING & TƯ VẤN TRỰC TIẾP</span>
              <h3 class="text-xl font-black">ĐĂNG KÝ NHẬN BẢNG GIÁ VIP</h3>
              <p class="text-xs text-slate-400">Chuyên viên CĐT sẽ gửi bảng giá chi tiết & mặt bằng qua Zalo trong 3 phút.</p>
            </div>
            <form onsubmit="handleLeadSubmit(event)" action="api/contact.php" method="POST" class="space-y-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-300">Họ và tên (*)</label>
                <input type="text" required placeholder="Ví dụ: Nguyễn Văn A" class="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-300">Số điện thoại / Zalo (*)</label>
                <input type="tel" required placeholder="Ví dụ: <?= htmlspecialchars($company["phone"]) ?>" class="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs font-bold text-red-400 focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-300">Dòng sản phẩm quan tâm</label>
                <select class="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-red-500">
                  <option class="text-slate-900 bg-white font-medium" value="Căn hộ 1PN+1">Căn hộ 1 Phòng Ngủ (1PN + 1)</option>
                  <option class="text-slate-900 bg-white font-medium" value="Căn hộ 2PN">Căn hộ 2 Phòng Ngủ Park View</option>
                  <option class="text-slate-900 bg-white font-medium" value="Căn hộ 3PN Master">Căn hộ 3 Phòng Ngủ Master</option>
                  <option class="text-slate-900 bg-white font-medium" value="Penthouse Sky Villa">Penthouse Sky Villa Duplex</option>
                  <option class="text-slate-900 bg-white font-medium" value="Shophouse Đại Lộ">Shophouse Đại Lộ 30m</option>
                  <option class="text-slate-900 bg-white font-medium" value="Biệt thự ven hồ">Biệt Thự Ven Hồ Sinh Thái</option>
                </select>
              </div>
              <button type="submit" class="w-full py-3.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-black rounded-sm shadow-lg shadow-red-950 uppercase tracking-wider transition-all hover:scale-105 active:scale-95">
                Gửi Yêu Cầu Nhận Báo Giá Ngay
              </button>
              <p class="text-[10px] text-center text-slate-400">🔒 Cam kết bảo mật thông tin 100% theo tiêu chuẩn chủ đầu tư.</p>
            </form>
          </div>
        </div>

        <div class="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-sm bg-red-100 text-[#D8232A] flex items-center justify-center font-black">
              ${getIcon('calculator', 20)}
            </div>
            <div>
              <h3 class="text-lg font-black text-slate-900">BẢNG TÍNH LÃI SUẤT VAY MUA NHÀ TẠM TÍNH</h3>
              <p class="text-xs text-slate-500">Công cụ hỗ trợ tính toán khoản vay ngân hàng với phương pháp dư nợ giảm dần.</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-slate-100 pt-6">
            <div class="space-y-5">
              <div>
                <div class="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Tỷ lệ vay vốn:</span>
                  <span class="text-red-600">${loanPercent}%</span>
                </div>
                <input type="range" id="loanPercent" min="10" max="80" value="${loanPercent}" oninput="updateMortgage()" class="w-full accent-red-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <div class="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Thời gian vay (Năm):</span>
                  <span class="text-red-600">${loanYears} Năm</span>
                </div>
                <input type="range" id="loanYears" min="1" max="35" value="${loanYears}" oninput="updateMortgage()" class="w-full accent-red-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <div class="flex justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Lãi suất tham khảo (%/năm):</span>
                  <span class="text-red-600">${loanRate}%</span>
                </div>
                <input type="range" id="loanRate" min="5" max="15" step="0.1" value="${loanRate}" oninput="updateMortgage()" class="w-full accent-red-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
            
            <div class="bg-slate-900 text-white rounded-md p-6 space-y-4 shadow-lg border border-slate-700">
              <div class="flex items-center justify-between border-b border-slate-700 pb-3">
                <span class="text-xs font-bold text-slate-400">Giá trị tài sản:</span>
                <strong class="text-sm font-black">${loanPropertyPrice} Tỷ VNĐ</strong>
              </div>
              <div class="flex items-center justify-between border-b border-slate-700 pb-3">
                <span class="text-xs font-bold text-slate-400">Tổng tiền vay (${loanPercent}%):</span>
                <strong class="text-sm font-black text-amber-400">${mc.loanAmountBillions} Tỷ VNĐ</strong>
              </div>
              <div class="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-400 block">Thanh toán tháng đầu:</span>
                  <strong class="text-base font-black text-red-400">${mc.firstMonthTotalMillion} Tr/tháng</strong>
                </div>
                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-400 block">Trả gốc hàng tháng:</span>
                  <strong class="text-base font-black text-slate-200">${mc.monthlyPrincipalMillion} Tr/tháng</strong>
                </div>
              </div>
              <div>
                <span class="text-[10px] uppercase font-bold text-slate-400 block">Ước tính tổng lãi phải trả:</span>
                <strong class="text-sm font-black text-slate-300">${mc.totalInterestBillions} Tỷ VNĐ</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderGallerySection() {
  const galleryImgs = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80',
  ];
  return `
    <section id="gallery-section" class="py-20 bg-white text-slate-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span class="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">★ HÌNH ẢNH SỐNG ĐỘNG & TIẾN ĐỘ CHUẨN XÁC ★</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">THƯ VIỆN HÌNH ẢNH & TIẾN ĐỘ THỰC TẾ</h2>
          <div class="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2"></div>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          ${galleryImgs.map(img => `
            <div onclick="openLightbox('${img}')" class="relative aspect-square rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group bg-slate-100">
              <img src="${img}" alt="Gallery" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                ${getIcon('maximize-2', 24)}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="p-6 rounded-md bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-sm bg-[#D8232A] text-white flex items-center justify-center font-black flex-shrink-0">
              ${getIcon('building-2', 24)}
            </div>
            <div>
              <strong class="block text-base font-extrabold">Tiến Độ Thi Công Thực Tế: Tháng 08/2026</strong>
              <span class="text-xs text-slate-300">Đã hoàn thành 100% móng hầm & hạ tầng công viên. Tháp Sapphire & Ruby đang thi công lên tầng 18.</span>
            </div>
          </div>
          <button onclick="navigate('tin-tuc')" class="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-sm border border-slate-700 whitespace-nowrap">
            Xem Báo Cáo Tiến Độ
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderNewsSection() {
  return `
    <section id="news-section" class="py-20 bg-slate-50 text-slate-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span class="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">★ CẬP NHẬT THÔNG TIN THỊ TRƯỜNG & DỰ ÁN ★</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">TIN TỨC & BÀI VIẾT MỚI NHẤT</h2>
          <div class="w-16 h-1 bg-[#D8232A] mx-auto rounded-sm mt-2"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${BDS06_NEWS.map(art => `
            <article onclick="handleOpenArticle(${art.id})" class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group">
              <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">${art.category}</div>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex items-center gap-3 text-[11px] text-slate-400 font-bold">
                    <span class="flex items-center gap-1">${getIcon('calendar', 12)} ${art.date}</span>
                    <span>•</span>
                    <span class="flex items-center gap-1">${getIcon('eye', 12)} ${art.views} lượt xem</span>
                  </div>
                  <h4 class="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2">${art.title}</h4>
                  <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">${art.excerpt}</p>
                </div>
                <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#D8232A]">
                  <span>Đọc tiếp bài viết</span>
                  ${getIcon('chevron-right', 16)}
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderPropertyDetailPage() {
  const p = selectedProperty || BDS06_PROPERTIES[0];
  const images = p.gallery && p.gallery.length ? p.gallery : [p.image];
  return `
    <div class="py-12 bg-slate-50 text-slate-900">
      <div class="max-w-7xl mx-auto px-4 space-y-8">
        <div class="flex items-center gap-2 text-xs text-slate-500 font-bold">
          <button onclick="navigate('home')" class="hover:text-red-600">Trang Chủ</button> <span>/</span>
          <button onclick="navigate('${p.category}')" class="hover:text-red-600">${p.categoryLabel}</button> <span>/</span>
          <span class="text-slate-800 truncate max-w-xs">${p.title}</span>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-8 space-y-6">
            <div class="bg-white rounded-md p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-lg bg-[#D8232A] text-white text-xs font-black uppercase">${p.badge}</span>
                  <span class="text-xs font-extrabold text-slate-500 uppercase">${p.zone} • ${p.floor}</span>
                </div>
                <h1 class="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">${p.title}</h1>
                <p class="text-xs text-slate-500 flex items-center gap-1.5">${getIcon('map-pin', 14, 'text-red-500 flex-shrink-0')} ${p.location}</p>
              </div>
              
              <div class="relative w-full rounded-xl overflow-hidden shadow-lg h-80 sm:h-96 md:h-[420px] group bg-slate-900 cursor-pointer" onclick="openLightbox('${images[0]}')">
                <img id="detail-main-img" src="${images[0]}" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                <div class="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 text-white rounded-md text-xs backdrop-blur-sm z-10">${images.length} ẢNH</div>
              </div>
              <div class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 mt-2">
                ${images.map((img, i) => `
                  <div onclick="document.getElementById('detail-main-img').src='${img}'" class="h-16 sm:h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition hover:border-red-500 border-slate-200 opacity-70 hover:opacity-100">
                    <img src="${img}" class="w-full h-full object-cover" />
                  </div>
                `).join('')}
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-sm bg-slate-50 border border-slate-200 text-center mt-6">
                <div><span class="text-[10px] uppercase font-bold text-slate-400 block">Diện tích</span><strong class="text-sm sm:text-base font-extrabold text-slate-800">${p.area}</strong></div>
                <div><span class="text-[10px] uppercase font-bold text-slate-400 block">Phòng ngủ</span><strong class="text-sm sm:text-base font-extrabold text-slate-800">${p.bedrooms} PN</strong></div>
                <div><span class="text-[10px] uppercase font-bold text-slate-400 block">Phòng tắm</span><strong class="text-sm sm:text-base font-extrabold text-slate-800">${p.bathrooms} WC</strong></div>
                <div><span class="text-[10px] uppercase font-bold text-slate-400 block">Hướng ban công</span><strong class="text-sm sm:text-base font-extrabold text-red-600">${p.direction}</strong></div>
              </div>

              <div class="space-y-3">
                <h3 class="text-lg font-black text-slate-900">MÔ TẢ CHI TIẾT SẢN PHẨM</h3>
                <p class="text-sm text-slate-600 leading-relaxed">${p.desc}</p>
                <div class="p-4 rounded-sm bg-red-50 border border-red-200 text-red-900 text-xs font-bold">🎁 ${p.highlight}</div>
              </div>

              <div class="space-y-3">
                <h3 class="text-lg font-black text-slate-900">THÔNG SỐ TIÊU CHUẨN BÀN GIAO</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  ${p.specs.map(sp => `
                    <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      ${getIcon('check-circle-2', 16, 'text-emerald-500 flex-shrink-0')} <span>${sp}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-4 space-y-6">
            <div class="bg-[#0F172A] text-white rounded-md p-6 shadow-xl border border-slate-800 space-y-4 sticky top-24">
              <div class="text-center space-y-1">
                <span class="text-[10px] font-bold uppercase tracking-widest text-amber-400">CHUYÊN VIÊN TƯ VẤN SENIOR</span>
                <h3 class="text-lg font-black">YÊU CẦU BÁO GIÁ CĂN NÀY</h3>
                <p class="text-xs text-slate-400">Gửi mặt bằng CAD & bảng tính thanh toán chi tiết.</p>
              </div>
              <form onsubmit="handleLeadSubmit(event)" action="api/contact.php" method="POST" class="space-y-3">
                <input type="text" required placeholder="Họ và tên..." class="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none" />
                <input type="tel" required placeholder="Số điện thoại / Zalo..." class="w-full px-3.5 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white text-xs font-bold text-red-400 focus:outline-none" />
                <button type="submit" class="w-full py-3 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-black rounded-sm shadow uppercase tracking-wider transition-all">
                  Nhận Báo Giá Chi Tiết
                </button>
              </form>
              <div class="pt-3 border-t border-slate-800 text-center">
                <a href="tel:<?= htmlspecialchars($company["phone_clean"]) ?>" class="text-xs font-bold text-emerald-400 hover:underline flex items-center justify-center gap-1.5">
                  ${getIcon('phone', 14, 'animate-pulse')} Hotline 24/7: <?= htmlspecialchars($company["phone"]) ?>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderArticleDetailPage() {
  const art = selectedArticle || BDS06_NEWS[0];
  return `
    <div class="py-12 bg-slate-50 text-slate-900">
      <div class="max-w-4xl mx-auto px-4 space-y-8">
        <div class="flex items-center gap-2 text-xs text-slate-500 font-bold">
          <button onclick="navigate('home')" class="hover:text-red-600">Trang Chủ</button> <span>/</span>
          <button onclick="navigate('tin-tuc')" class="hover:text-red-600">Tin Tức</button> <span>/</span>
          <span class="text-slate-800 truncate">${art.title}</span>
        </div>
        
        <article class="bg-white rounded-md p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div class="space-y-3">
            <span class="px-3.5 py-1 bg-[#D8232A] text-white text-xs font-black uppercase rounded-lg inline-block">${art.category}</span>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">${art.title}</h1>
            <div class="flex items-center gap-4 text-xs text-slate-400 font-bold border-b border-slate-100 pb-4">
              <span class="flex items-center gap-1">${getIcon('calendar', 13)} ${art.date}</span> <span>•</span>
              <span class="flex items-center gap-1">${getIcon('user', 13)} ${art.author}</span> <span>•</span>
              <span class="flex items-center gap-1">${getIcon('eye', 13)} ${art.views} lượt xem</span>
            </div>
          </div>
          
          <div class="relative aspect-[16/9] rounded-sm overflow-hidden bg-slate-100">
            <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover" />
          </div>
          
          <div class="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            <p class="font-bold text-slate-900 text-base sm:text-lg italic border-l-4 border-[#D8232A] pl-4 py-1">${art.excerpt}</p>
            ${art.content.map(p => `<p>${p}</p>`).join('')}
          </div>
          
          <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-sm bg-red-100 text-[#D8232A] flex items-center justify-center font-black">${getIcon('user', 20)}</div>
              <div>
                <strong class="block text-xs font-extrabold text-slate-900">${art.author}</strong>
                <span class="text-[11px] text-slate-500">Ban Truyền Thông & Quản Lý Dự Án</span>
              </div>
            </div>
            <button onclick="navigate('tin-tuc')" class="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 rounded-sm">
              ← Quay Lại Danh Sách Tin Tức
            </button>
          </div>
        </article>
      </div>
    </div>
  `;
}

function renderConsignmentPage() {
  return `
    <div class="py-12 bg-slate-50 text-slate-900">
      <div class="max-w-3xl mx-auto px-4 space-y-8">
        <div class="text-center space-y-2">
          <span class="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">★ DỊCH VỤ MÔI GIỚI & CHUYỂN NHƯỢNG UY TÍN ★</span>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900">KÝ GỬI MUA BÁN & CHO THUÊ BẤT ĐỘNG SẢN</h1>
          <p class="text-xs sm:text-sm text-slate-600">Hỗ trợ định giá chính xác, thanh khoản nhanh chóng và bảo mật thông tin tuyệt đối.</p>
        </div>
        
        <form onsubmit="handleConsignSubmit(event)" class="bg-white rounded-md p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Họ & Tên Gia Chủ (*)</label>
              <input type="text" required placeholder="Ví dụ: Trần Văn B" class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none focus:border-red-500" />
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Số Điện Thoại / Zalo (*)</label>
              <input type="tel" required placeholder="Ví dụ: <?= htmlspecialchars($company["phone"]) ?>" class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs font-bold text-red-600 focus:outline-none focus:border-red-500" />
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Loại Bất Động Sản</label>
              <select class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs font-bold focus:outline-none">
                <option value="Căn hộ cao cấp">Căn hộ cao cấp</option>
                <option value="Shophouse thương mại">Shophouse thương mại</option>
                <option value="Nhà phố liền kề">Nhà phố liền kề</option>
                <option value="Biệt thự sinh thái">Biệt thự sinh thái</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Mức Giá Kỳ Vọng (Tỷ VNĐ)</label>
              <input type="text" placeholder="Ví dụ: 3.5 Tỷ hoặc Cho thuê 20Tr/th" class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Địa Chỉ Chi Tiết BĐS (*)</label>
            <input type="text" required placeholder="Ví dụ: Căn hộ S1.12A08 Tháp Sapphire..." class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Ghi Chú Thêm</label>
            <textarea rows="3" placeholder="Tình trạng nội thất, pháp lý..." class="w-full px-4 py-2.5 rounded-sm border border-slate-300 text-xs focus:outline-none"></textarea>
          </div>
          <button type="submit" class="w-full py-4 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-black rounded-sm shadow-lg uppercase tracking-wider transition-all hover:scale-105">
            Xác Nhận Ký Gửi Bất Động Sản Ngay
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderCatalogPage(type) {
  let title = "CĂN HỘ CAO CẤP";
  let filter = 'can-ho';
  if (type === 'shophouse') { title = "SHOPHOUSE THƯƠNG MẠI"; filter = 'shophouse'; }
  if (type === 'biet-thu' || type === 'villas') { title = "BIỆT THỰ SINH THÁI"; filter = 'biet-thu'; }
  if (type === 'nha-pho') { title = "NHÀ PHỐ LIỀN KỀ"; filter = 'nha-pho'; }

  const filtered = BDS06_PROPERTIES.filter(p => p.category === filter);
  
  return `
    <div class="py-12 bg-slate-50 text-slate-900">
      <div class="max-w-7xl mx-auto px-4 space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-extrabold text-[#D8232A] uppercase tracking-widest block">DANH MỤC SẢN PHẨM</span>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 uppercase">${title}</h1>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${filtered.map(prop => `
            <div onclick="handleOpenProperty(${prop.id})" class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col group">
              <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img src="${prop.image}" alt="${prop.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#D8232A] text-white text-[10px] font-black uppercase shadow">${prop.badge}</div>
                <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-300 text-xs font-black backdrop-blur">${prop.price}</div>
              </div>
              <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-400 block">${prop.categoryLabel} • ${prop.zone}</span>
                  <h4 class="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-red-600 transition-colors">${prop.title}</h4>
                </div>
                <div class="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                  <div><span class="text-[10px] text-slate-400 block">Diện tích</span><strong>${prop.area}</strong></div>
                  <div><span class="text-[10px] text-slate-400 block">Số phòng</span><strong>${prop.bedrooms} PN</strong></div>
                  <div><span class="text-[10px] text-slate-400 block">Vệ sinh</span><strong>${prop.bathrooms} WC</strong></div>
                </div>
                <button onclick="event.stopPropagation(); handleOpenProperty(${prop.id})" class="w-full py-2.5 bg-[#D8232A] hover:bg-[#b91c1c] text-white text-xs font-extrabold rounded-sm shadow uppercase tracking-wider text-center">Xem Chi Tiết</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderApp() {
  let content = renderHeader();
  
  switch (currentPage) {
    case 'can-ho':
    case 'apartments':
    case 'shophouse':
    case 'nha-pho':
    case 'biet-thu':
    case 'villas':
      content += renderCatalogPage(currentPage);
      break;
    case 'tien-ich':
    case 'amenities':
      content += renderAmenitiesSection();
      break;
    case 'chinh-sach':
    case 'policies':
      content += renderPoliciesAndMortgageSection();
      break;
    case 'thu-vien':
    case 'gallery':
      content += renderGallerySection();
      break;
    case 'tin-tuc':
    case 'news':
      content += renderNewsSection();
      break;
    case 'property-detail':
      content += renderPropertyDetailPage();
      break;
    case 'news-detail':
      content += renderArticleDetailPage();
      break;
    case 'ky-gui':
      content += renderConsignmentPage();
      break;
    case 'about':
    case 'gioi-thieu':
    case 'lien-he':
    case 'contact':
      content += renderOverview() + renderLocationSection();
      break;
    case 'home':
    default:
      content += renderHero() +
                 renderOverview() +
                 renderLocationSection() +
                 renderMasterplanSection() +
                 renderLowRiseSection() +
                 renderAmenitiesSection() +
                 renderPoliciesAndMortgageSection() +
                 renderGallerySection() +
                 renderNewsSection();
      break;
  }
  
  document.getElementById('root').innerHTML = content;
  initIcons();
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

  </script>
</body>
</html>