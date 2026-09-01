<?php
require_once 'config/db.php';

// Fetch company info
$stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
$company = $stmt->fetch(PDO::FETCH_ASSOC);

// Fetch projects/units
$stmt = $pdo->query("SELECT * FROM projects ORDER BY id ASC");
$projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Fallback logic
if (!$company) {
    $company = [
        'name' => 'SIMPLE PAGE',
        'phone' => '0919 006 030',
        'email' => 'admin@templatesbds.com',
        'address' => 'Đại Lộ Trung Tâm Đô Thị Mới, Quận Nam Từ Liêm, Hà Nội / TP.HCM',
        'slogan' => '"Đẳng Cấp Không Gian Sống — Khẳng Định Vị Thế Thượng Lưu"',
        'zalo' => 'https://zalo.me/0919 006 030'
    ];
}
if (!$projects) {
    $projects = [
        ['title' => 'Căn 1 Phòng Ngủ', 'area_label' => '48.5 m²', 'price' => '1.85 Tỷ', 'perk' => '✓ Chiết khấu ngay 5% + Tặng 2 chỉ vàng', 'full_name' => 'Căn Hộ 1 Phòng Ngủ (48.5 m²)', 'image_url' => 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
        ['title' => 'Căn 2 Phòng Ngủ', 'area_label' => '68.0 m²', 'price' => '2.65 Tỷ', 'perk' => '✓ Tặng gói hoàn thiện nội thất 50 triệu', 'full_name' => 'Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)', 'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
        ['title' => 'Căn 3 Phòng Ngủ', 'area_label' => '95.0 m²', 'price' => '3.55 Tỷ', 'perk' => '✓ Hỗ trợ vay 70% lãi suất 0% trong 24 tháng', 'full_name' => 'Căn Hộ 3 Phòng Ngủ Master (92.0 m² - 110.0 m²)', 'image_url' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
        ['title' => 'Sky Villa & Penthouse', 'area_label' => '145.0 m²', 'price' => '6.80 Tỷ', 'perk' => '✓ Tặng chuyến du lịch Châu Âu 5 sao 2 người', 'full_name' => 'Penthouse & Sky Villa (145.0 m²)', 'image_url' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80']
    ];
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DỰ ÁN CĂN HỘ <?= htmlspecialchars($company["name"] ?? "SIMPLE PAGE") ?></title>
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <style>
    /* Custom animations and styles from React selection */
    ::selection {
      background-color: #9B1C1C;
      color: white;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
    
    .active\:scale-95:active {
      transform: scale(0.95);
    }
    .active\:scale-98:active {
      transform: scale(0.98);
    }
    
    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
  </style>
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          scale: {
            '108': '1.08',
          }
        }
      }
    }
  </script>
</head>
<body class="min-h-screen bg-white text-slate-800 font-sans">
  
  <!-- 1. TOP HEADER -->
  <header class="sticky top-0 z-50 bg-[#1E2530] text-white py-2.5 px-4 sm:px-8 shadow-md">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
      
      <!-- Brand Logo -->
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-[#9B1C1C] text-white flex items-center justify-center font-black shadow-sm">
          <span class="text-sm tracking-tighter">SP</span>
        </div>
        <div>
          <span class="font-black text-sm text-white tracking-wide uppercase block leading-none">
            <?= htmlspecialchars($company["name"] ?? "SIMPLE PAGE") ?>
          </span>
          <span class="text-[9px] text-slate-400 uppercase tracking-wider block mt-0.5">
            BẤT ĐỘNG SẢN CAO CẤP
          </span>
        </div>
      </div>

      <!-- Slogan -->
      <div class="hidden lg:block text-slate-300 text-xs italic">
        <?= htmlspecialchars($company["slogan"] ?? "\"Đẳng Cấp Không Gian Sống — Khẳng Định Vị Thế Thượng Lưu\"") ?>
      </div>

      <!-- Contact Fast Info -->
      <div class="flex items-center gap-4">
        <a href="tel:<?= htmlspecialchars($company["phone"] ?? "0919 006 030") ?>" class="flex items-center gap-1.5 font-black text-amber-400 hover:text-amber-300 transition-colors">
          <i data-lucide="phone" class="w-3.5 h-3.5"></i>
          <span>Hotline: <?= htmlspecialchars($company["phone"] ?? "0919 006 030") ?></span>
        </a>
        <a
          href="#hero-form"
          class="px-4 py-1.5 rounded-lg bg-[#9B1C1C] hover:bg-[#801616] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
        >
          Đăng Ký Ngay
        </a>
      </div>

    </div>
  </header>

  <!-- 2. HERO BANNER & HERO LEAD FORM -->
  <section class="relative bg-slate-900 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <!-- Background Image with Dark Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80"
        alt="Hero Backdrop"
        class="w-full h-full object-cover opacity-35"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
      
      <!-- Left Column: Dark Gray Glass Box with Golden Title -->
      <div class="lg:col-span-7 bg-slate-950/70 backdrop-blur-md border border-slate-700/60 rounded-3xl p-6 sm:p-10 text-left space-y-5 shadow-2xl">
        <div class="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-400 text-[10px] font-bold uppercase tracking-widest">
          ⚡ SỰ KIỆN MỞ BÁN ĐỢT 1 — CHIẾT KHẤU 5%
        </div>

        <div class="space-y-1">
          <h1 class="text-2xl sm:text-4xl font-black text-amber-400 uppercase tracking-tight leading-tight">
            DỰ ÁN CĂN HỘ <?= htmlspecialchars($company["name"] ?? "SIMPLE PAGE") ?>
          </h1>
          <p class="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
            Tổ hợp căn hộ cao cấp sở hữu vị trí vàng trung tâm, không gian sống xanh chuẩn sinh thái cùng hệ thống tiện ích đẳng cấp 5 sao.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300 font-medium">
          <div class="flex items-center gap-2">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
            <span>Giá từ <strong>1.85 Tỷ/căn</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
            <span>Hỗ trợ vay <strong>70% LS 0%</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
            <span>Bàn giao full nội thất cao cấp</span>
          </div>
          <div class="flex items-center gap-2">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
            <span>Sổ hồng lâu dài vĩnh viễn</span>
          </div>
        </div>

        <div class="pt-2">
          <a
            href="#hero-form"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9B1C1C] hover:bg-[#801616] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            <span>ĐĂNG KÝ NHẬN BÁO GIÁ & THAM QUAN</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
      </div>

      <!-- Right Column: Hero Lead Form -->
      <div id="hero-form" class="lg:col-span-5">
        <div class="bg-white border-2 border-[#9B1C1C] rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative">
          <div class="text-center mb-5">
            <span class="text-[11px] font-black text-[#9B1C1C] uppercase tracking-widest block mb-1">
              BẢNG GIÁ & CHÍNH SÁCH NGOẠI GIAO
            </span>
            <h3 class="text-xl font-black text-slate-900 uppercase">
              NHẬN THÔNG TIN BÁO GIÁ
            </h3>
            <p class="text-[11px] text-slate-500 mt-1">
              Điền thông tin để chuyên viên dự án gửi file PDF mặt bằng & báo giá chi tiết
            </p>
          </div>

          <div id="hero-success-msg" class="hidden bg-emerald-50 border border-emerald-500 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
            <div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
              <i data-lucide="check" class="w-6 h-6 stroke-[3]"></i>
            </div>
            <h4 class="font-bold text-base text-emerald-800">ĐÃ GỬI YÊU CẦU THÀNH CÔNG!</h4>
            <p class="text-xs text-slate-700 leading-relaxed break-words">
              Chuyên viên sẽ liên hệ lại qua số <strong id="hero-success-phone"></strong> và gửi file PDF báo giá căn <strong id="hero-success-unit"></strong> qua Zalo cho bạn trong 3 phút.
            </p>
          </div>

          <form id="hero-lead-form" action="api/contact.php" method="POST" class="space-y-3.5 text-xs">
            <input type="hidden" name="form_type" value="hero_form">
            <div>
              <label class="block text-slate-700 font-bold mb-1 text-[11px]">Họ và tên của bạn *</label>
              <input
                type="text"
                name="name"
                required
                id="hero-name"
                placeholder="Ví dụ: Nguyễn Văn A"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] focus:bg-white outline-none transition-all"
              />
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1 text-[11px]">Số điện thoại nhận bảng giá (Zalo) *</label>
              <input
                type="tel"
                name="phone"
                required
                id="hero-phone"
                placeholder="0912 345 678"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-bold placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] focus:bg-white outline-none transition-all"
              />
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1 text-[11px]">Email nhận tài liệu phân tích</label>
              <input
                type="email"
                name="email"
                id="hero-email"
                placeholder="email@gmail.com"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-medium placeholder:text-slate-400 border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] focus:bg-white outline-none transition-all"
              />
            </div>

            <div>
              <label class="block text-slate-700 font-bold mb-1 text-[11px]">Loại căn hộ bạn đang quan tâm</label>
              <select
                id="hero-unit-select"
                name="unit_type"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 text-slate-900 font-bold border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] focus:bg-white outline-none transition-all duration-300"
              >
                <?php foreach ($projects as $idx => $p): ?>
                <option class="text-slate-900 bg-white font-medium" value="<?= htmlspecialchars($p["full_name"]) ?>" <?= $idx === 1 ? "selected" : "" ?>><?= htmlspecialchars($p["full_name"]) ?></option>
                <?php endforeach; ?>
              </select>
            </div>

            <button
              type="submit"
              class="w-full py-3.5 rounded-xl bg-[#9B1C1C] hover:bg-[#801616] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-900/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>ĐĂNG KÝ NGAY</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>

            <p class="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-600"></i>
              <span>Bảo mật thông tin 100% · Tư vấn trực tiếp miễn phí</span>
            </p>
          </form>
        </div>
      </div>

    </div>
  </section>

  <!-- 3. RED FEATURE BAR -->
  <section class="bg-[#9B1C1C] text-white py-6 px-4 sm:px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      
      <div class="flex flex-col items-center gap-2">
        <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <i data-lucide="map-pin" class="w-6 h-6 text-amber-300"></i>
        </div>
        <div>
          <span class="font-black text-xs uppercase block text-amber-300">Vị Trí Đắc Địa</span>
          <span class="text-[11px] text-slate-200">Trung tâm kết nối thuận tiện</span>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2">
        <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <i data-lucide="sparkles" class="w-6 h-6 text-amber-300"></i>
        </div>
        <div>
          <span class="font-black text-xs uppercase block text-amber-300">Tiện Ích 5 Sao</span>
          <span class="text-[11px] text-slate-200">Chuẩn resort nghỉ dưỡng cao cấp</span>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2">
        <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <i data-lucide="shield-check" class="w-6 h-6 text-amber-300"></i>
        </div>
        <div>
          <span class="font-black text-xs uppercase block text-amber-300">Pháp Lý Hoàn Chỉnh</span>
          <span class="text-[11px] text-slate-200">Sổ hồng lâu dài trao tay</span>
        </div>
      </div>

      <div class="flex flex-col items-center gap-2">
        <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
          <i data-lucide="key" class="w-6 h-6 text-amber-300"></i>
        </div>
        <div>
          <span class="font-black text-xs uppercase block text-amber-300">Bàn Giao Full Nội Thất</span>
          <span class="text-[11px] text-slate-200">Tiêu chuẩn nhập khẩu Châu Âu</span>
        </div>
      </div>

    </div>
  </section>

  <!-- 4. TỔNG QUAN DỰ ÁN -->
  <section class="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
    <div class="max-w-7xl mx-auto space-y-10 text-center">
      
      <div class="space-y-2 max-w-3xl mx-auto">
        <span class="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest">
          QUY HOẠCH ĐỒNG BỘ
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
          TỔNG QUAN DỰ ÁN
        </h2>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Dự án là khu phức hợp căn hộ, thương mại và dịch vụ cao cấp được quy hoạch bài bản với mật độ xây dựng chỉ 32%, đem lại không gian sống trong lành, bình yên giữa lòng phố thị náo nhiệt.
        </p>
      </div>

      <!-- Banner Phối Cảnh & Thông Số Tổng Quan -->
      <div class="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 min-h-[420px] sm:min-h-[460px] flex flex-col justify-end p-4 sm:p-8">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80"
          alt="Phối Cảnh Tổng Quan"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:bg-none"></div>
        
        <div class="relative z-10 sm:absolute sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 bg-[#9B1C1C]/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-2xl w-full sm:max-w-sm text-left shadow-2xl border border-red-400/40">
          <h4 class="font-black text-xs sm:text-sm uppercase tracking-wider text-amber-300 mb-3 border-b border-white/20 pb-2">
            HỒ SƠ TỔNG QUAN DỰ ÁN
          </h4>
          <div class="space-y-2 text-xs text-slate-100 font-medium leading-relaxed">
            <p>• <strong>Chủ đầu tư:</strong> TẬP ĐOÀN ĐẦU TƯ BẤT ĐỘNG SẢN</p>
            <p class="break-words">• <strong>Vị trí:</strong> <?= htmlspecialchars($company["address"] ?? "Đại Lộ Trung Tâm Đô Thị Mới, Quận Nam Từ Liêm, Hà Nội / TP.HCM") ?></p>
            <p>• <strong>Tổng diện tích:</strong> 25.000 m² (Mật độ 32%)</p>
            <p>• <strong>Quy mô:</strong> 2 Tòa tháp cao 35 tầng (850 căn hộ)</p>
            <p>• <strong>Diện tích căn:</strong> 48.5m² – 145m² (1PN - 3PN)</p>
            <p>• <strong>Pháp lý:</strong> Sổ hồng lâu dài từng căn</p>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- 5. VỊ TRÍ & KẾT NỐI -->
  <section class="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      
      <div class="lg:col-span-5 space-y-5 text-left">
        <div>
          <span class="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest block mb-1">
            TỌA ĐỘ VÀNG KẾT NỐI
          </span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
            VỊ TRÍ CHIẾN LƯỢC
          </h2>
        </div>

        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          Tọa lạc tại vị trí độc tôn ngay mặt tiền đại lộ huyết mạch, kết nối trực tiếp với các trục đường vành đai và trạm dừng Metro, cư dân dễ dàng tiếp cận mọi tiện ích ngoại khu hiện đại bậc nhất.
        </p>

        <div class="space-y-2.5 text-xs text-slate-700 font-medium">
          <div class="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
            <span>Trường Quốc tế & Bệnh viện đa khoa</span>
            <span class="font-bold text-[#9B1C1C]">3 Phút (500m)</span>
          </div>
          <div class="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
            <span>Trung tâm thương mại & Đại siêu thị</span>
            <span class="font-bold text-[#9B1C1C]">5 Phút (1.2km)</span>
          </div>
          <div class="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
            <span>Trung tâm hành chính quận & Công viên hồ</span>
            <span class="font-bold text-[#9B1C1C]">10 Phút (3.5km)</span>
          </div>
          <div class="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
            <span>Sân bay Quốc tế & Các tỉnh lân cận</span>
            <span class="font-bold text-[#9B1C1C]">20 Phút (18km)</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7">
        <div 
          class="relative rounded-3xl overflow-hidden border-2 border-slate-300 shadow-xl bg-slate-900 aspect-[16/10] group cursor-pointer"
          onclick="openZoom('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80')"
        >
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
            alt="Sơ đồ vị trí kết nối"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
            <div class="flex items-center justify-between w-full text-white">
              <span class="text-xs font-bold"><?= htmlspecialchars($company["address"] ?? "Đại Lộ Trung Tâm Đô Thị Mới, Quận Nam Từ Liêm, Hà Nội / TP.HCM") ?></span>
              <span class="px-3 py-1.5 bg-[#9B1C1C] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow">
                <i data-lucide="zoom-in" class="w-3.5 h-3.5"></i> Phóng To Bản Đồ
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- 6. BLUE DIVIDER BANNER -->
  <section class="bg-gradient-to-r from-[#7B9EBE] via-[#5C85AD] to-[#7B9EBE] text-white py-12 px-4 sm:px-6 text-center shadow-inner">
    <div class="max-w-4xl mx-auto space-y-3">
      <span class="text-xs font-bold text-amber-200 uppercase tracking-widest">
        CHUẨN MỰC SỐNG MỚI
      </span>
      <h2 class="text-2xl sm:text-4xl font-black uppercase tracking-tight">
        TIỆN ÍCH DỰ ÁN ĐẲNG CẤP
      </h2>
      <p class="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed">
        Hệ sinh thái tiện ích nội khu khép kín đáp ứng trọn vẹn mọi nhu cầu vui chơi, rèn luyện sức khỏe và tận hưởng cuộc sống của từng thành viên trong gia đình.
      </p>
    </div>
  </section>

  <!-- 7. 3 CỘT THỐNG SỐ -->
  <section class="py-14 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
    <div class="max-w-7xl mx-auto space-y-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span class="text-3xl font-black text-[#9B1C1C] block">100%</span>
          <span class="text-xs font-bold text-slate-900 uppercase">Căn Hộ Đón Gió Tự Nhiên</span>
          <p class="text-[11px] text-slate-500">Thiết kế mở đối lưu không khí tối đa</p>
        </div>
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span class="text-3xl font-black text-[#9B1C1C] block">25+</span>
          <span class="text-xs font-bold text-slate-900 uppercase">Tiện Ích 5 Sao Khép Kín</span>
          <p class="text-[11px] text-slate-500">Hồ bơi tràn, Gym, Spa, Sky Bar, BBQ</p>
        </div>
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span class="text-3xl font-black text-[#9B1C1C] block">15 Phút</span>
          <span class="text-xs font-bold text-slate-900 uppercase">Kết Nối Trung Tâm</span>
          <p class="text-[11px] text-slate-500">Giao thông thông suốt qua các đại lộ lớn</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 8. MẶT BẰNG CĂN HỘ -->
  <section class="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 border-b border-amber-900/10">
    <div class="max-w-7xl mx-auto space-y-10 text-center">
      
      <div class="space-y-2 max-w-3xl mx-auto">
        <span class="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest">
          THIẾT KẾ HIỆN ĐẠI
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
          MẶT BẰNG CĂN HỘ CHI TIẾT
        </h2>
        <p class="text-xs sm:text-sm text-slate-600">
          Chọn từng loại căn hộ dưới đây để xem bản vẽ kỹ thuật chi tiết 2D/3D
        </p>
      </div>

      <!-- Interactive Floor Tabs -->
      <div class="flex justify-center flex-wrap gap-3" id="floor-tabs">
        <button data-tab="1pn" class="floor-tab px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer bg-white text-slate-700 border-slate-300 hover:bg-slate-100">
          CĂN 1 PHÒNG NGỦ (48.5 M²)
        </button>
        <button data-tab="2pn" class="floor-tab px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer bg-[#9B1C1C] text-white border-[#9B1C1C] shadow-md scale-105">
          CĂN 2 PHÒNG NGỦ (68M² - 75M²)
        </button>
        <button data-tab="3pn" class="floor-tab px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer bg-white text-slate-700 border-slate-300 hover:bg-slate-100">
          CĂN 3 PHÒNG NGỦ MASTER (92M² - 110M²)
        </button>
      </div>

      <!-- Active Floor Plan Card -->
      <div class="bg-white rounded-3xl border border-slate-300 p-6 sm:p-8 shadow-xl max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        <div class="lg:col-span-5 space-y-4">
          <span class="px-3 py-1 bg-red-100 text-[#9B1C1C] text-[10px] font-black rounded-lg uppercase">
            Bản Vẽ Kỹ Thuật 2D/3D
          </span>
          <h3 id="floor-title" class="text-xl sm:text-2xl font-black text-slate-900">
            Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)
          </h3>
          <p id="floor-desc" class="text-xs text-slate-600 leading-relaxed font-medium">
            Căn hộ tiêu chuẩn bán chạy nhất với 2 phòng ngủ ngập tràn ánh sáng, phòng khách ban công view công viên.
          </p>
          
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-bold space-y-1">
            <span class="text-[10px] uppercase text-[#9B1C1C] block">Cơ Cấu Phòng:</span>
            <p id="floor-rooms">2 Phòng Ngủ · 2 WC · 2 Ban Công & Logia · Phòng Khách Rộng</p>
            <p id="floor-price" class="text-[#9B1C1C] font-black pt-1">Chỉ từ 2.65 Tỷ/căn</p>
          </div>

          <div class="pt-2">
            <button
              type="button"
              onclick="selectUnitFromFloorPlan()"
              class="px-6 py-3 bg-[#9B1C1C] hover:bg-[#801616] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>NHẬN BÁO GIÁ CĂN NÀY</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <div 
          class="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-[16/11] relative group cursor-pointer"
          onclick="openZoom(document.getElementById('floor-img').src)"
        >
          <img
            id="floor-img"
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
            alt="Căn Hộ"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <span class="px-4 py-2 bg-slate-950/80 backdrop-blur text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow">
              <i data-lucide="zoom-in" class="w-4 h-4 text-amber-400"></i>
              <span>Bấm để phóng to xem sơ đồ 3D</span>
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- 9. CĂN HỘ MẪU -->
  <section class="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
    <div class="max-w-7xl mx-auto space-y-10 text-center">
      
      <div class="space-y-2 max-w-3xl mx-auto">
        <span class="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest">
          TRẢI NGHIỆM KHÔNG GIAN THỰC TẾ
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
          BỘ SƯU TẬP CĂN HỘ MẪU
        </h2>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Từng chi tiết được chăm chút tỉ mỉ với vật liệu nội thất cao cấp mang lại cảm giác ấm cúng và tiện nghi.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div onclick="openZoom('https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80')" class="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[4/3] cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80" alt="Hành lang & Cửa vào bảo mật vân tay 5 lớp" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span class="text-xs font-bold text-white text-left leading-tight">Hành lang & Cửa vào bảo mật vân tay 5 lớp</span>
          </div>
        </div>

        <div onclick="openZoom('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&q=80')" class="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[4/3] cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1000&q=80" alt="Khu vực bếp mở & Quầy bar mini hiện đại" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span class="text-xs font-bold text-white text-left leading-tight">Khu vực bếp mở & Quầy bar mini hiện đại</span>
          </div>
        </div>

        <div onclick="openZoom('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80')" class="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[4/3] cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80" alt="Phòng khách chuẩn sang trọng nối liền ban công" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span class="text-xs font-bold text-white text-left leading-tight">Phòng khách chuẩn sang trọng nối liền ban công</span>
          </div>
        </div>

        <div onclick="openZoom('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80')" class="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[4/3] cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=80" alt="Phòng ngủ phụ ngập tràn ánh sáng tự nhiên" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span class="text-xs font-bold text-white text-left leading-tight">Phòng ngủ phụ ngập tràn ánh sáng tự nhiên</span>
          </div>
        </div>

        <div onclick="openZoom('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1000&q=80')" class="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[4/3] cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1000&q=80" alt="Phòng ngủ Master phong cách nghỉ dưỡng cao cấp" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span class="text-xs font-bold text-white text-left leading-tight">Phòng ngủ Master phong cách nghỉ dưỡng cao cấp</span>
          </div>
        </div>

        <div onclick="openZoom('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80')" class="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-[4/3] cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1000&q=80" alt="Phòng tắm đứng ốp đá cẩm thạch sang trọng" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span class="text-xs font-bold text-white text-left leading-tight">Phòng tắm đứng ốp đá cẩm thạch sang trọng</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- 10. GIỎ HÀNG -->
  <section class="py-16 bg-[#9B1C1C] text-white px-4 sm:px-6 lg:px-8 shadow-inner">
    <div class="max-w-7xl mx-auto space-y-10 text-center">
      
      <div class="space-y-2 max-w-3xl mx-auto">
        <span class="text-xs font-bold text-amber-300 uppercase tracking-widest">
          GIỎ HÀNG NGOẠI GIAO GIÁ GỐC
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
          DANH MỤC CĂN HỘ MỞ BÁN ĐỢT 1
        </h2>
        <p class="text-xs sm:text-sm text-slate-200">
          Ưu tiên giữ chỗ các căn tầng đẹp, hướng view thoáng không bị che chắn
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <?php foreach($projects as $p): ?>
        <div class="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-xl border border-red-300 flex flex-col justify-between text-left group">
          <div class="relative aspect-[4/3] overflow-hidden bg-slate-900">
            <img src="<?= htmlspecialchars($p['image_url']) ?>" alt="<?= htmlspecialchars($p['title']) ?>" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
            <div class="absolute top-3 left-3 px-2.5 py-1 bg-[#9B1C1C] text-white text-[10px] font-black rounded-lg uppercase"><?= htmlspecialchars($p['area_label']) ?></div>
          </div>
          <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
            <div class="space-y-1">
              <h4 class="font-black text-base text-slate-900 group-hover:text-[#9B1C1C] transition-colors"><?= htmlspecialchars($p['title']) ?></h4>
              <p class="text-lg font-black text-[#9B1C1C]"><?= htmlspecialchars($p['price']) ?></p>
              <p class="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg"><?= htmlspecialchars($p['perk']) ?></p>
            </div>
            <button type="button" onclick="selectUnitGlobal('<?= htmlspecialchars($p['full_name']) ?>')" class="w-full py-2.5 rounded-xl bg-[#9B1C1C] hover:bg-[#801616] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5">
              <span>ĐẶT CHỖ CĂN NÀY</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- 11. HÌNH ẢNH THỰC TẾ -->
  <section class="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200">
    <div class="max-w-7xl mx-auto space-y-10 text-center">
      
      <div class="space-y-2 max-w-3xl mx-auto">
        <span class="text-xs font-bold text-[#9B1C1C] uppercase tracking-widest">
          TIẾN ĐỘ THỰC TẾ
        </span>
        <h2 class="text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
          HÌNH ẢNH THỰC TẾ DỰ ÁN
        </h2>
        <p class="text-xs sm:text-sm text-slate-600">
          Cập nhật tiến độ xây dựng và không gian hoàn thiện thực tế tại công trường
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div onclick="openZoom('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80')" class="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" alt="Sảnh Lễ Tân Sang Trọng 5 Sao" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">Sảnh Lễ Tân Sang Trọng 5 Sao</span>
          </div>
        </div>
        <div onclick="openZoom('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80')" class="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Khu Hòm Thư Cư Dân Hiện Đại" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">Khu Hòm Thư Cư Dân Hiện Đại</span>
          </div>
        </div>
        <div onclick="openZoom('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80')" class="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80" alt="Thang Máy Tốc Độ Cao Schindler" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">Thang Máy Tốc Độ Cao Schindler</span>
          </div>
        </div>
        <div onclick="openZoom('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80')" class="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="Vườn Nhiệt Đới & Lối Đi Dạo Bộ" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">Vườn Nhiệt Đới & Lối Đi Dạo Bộ</span>
          </div>
        </div>
        <div onclick="openZoom('https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80')" class="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80" alt="Khu Vui Chơi Trẻ Em Trong Nhà" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">Khu Vui Chơi Trẻ Em Trong Nhà</span>
          </div>
        </div>
        <div onclick="openZoom('https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80')" class="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80" alt="Tòa Tháp Hoàn Thiện Lung Linh Ban Đêm" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">Tòa Tháp Hoàn Thiện Lung Linh Ban Đêm</span>
          </div>
        </div>
        <div onclick="openZoom('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80')" class="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Mặt Tiền Tòa Nhà Hiện Đại Chuẩn A" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">Mặt Tiền Tòa Nhà Hiện Đại Chuẩn A</span>
          </div>
        </div>
        <div onclick="openZoom('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80')" class="group relative rounded-2xl overflow-hidden shadow-sm bg-slate-900 aspect-square cursor-pointer border border-slate-200">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" alt="Quảng Trường Nhạc Nước Về Đêm" class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span class="text-[10px] sm:text-xs font-bold text-white text-left leading-tight">Quảng Trường Nhạc Nước Về Đêm</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- 12. FORM ĐẶT LỊCH -->
  <section class="py-16 bg-[#F8E8E8] px-4 sm:px-6 lg:px-8 border-b border-red-200">
    <div class="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-red-300 shadow-2xl text-center space-y-6">
      
      <div class="space-y-2">
        <span class="text-xs font-black text-[#9B1C1C] uppercase tracking-widest">
          XE Ô TÔ ĐÓN TẬN NHÀ MIỄN PHÍ
        </span>
        <h3 class="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
          ĐĂNG KÝ XEM NHÀ MẪU CUỐI TUẦN
        </h3>
        <p class="text-xs text-slate-600">
          Trải nghiệm thực tế không gian sống và nhận quà tặng voucher nội thất khi tham quan
        </p>
      </div>

      <div id="view-success-msg" class="hidden bg-emerald-50 border border-emerald-500 p-6 rounded-2xl text-center space-y-3 animate-fadeIn">
        <div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
          <i data-lucide="check" class="w-6 h-6 stroke-[3]"></i>
        </div>
        <h4 class="font-bold text-base text-emerald-800">ĐÃ ĐẶT LỊCH THÀNH CÔNG!</h4>
        <p class="text-xs text-slate-700 leading-relaxed break-words">
          Phòng kinh doanh đã xác nhận lịch hẹn của <strong id="view-success-name"></strong> vào <strong id="view-success-date"></strong>. Chuyên viên sẽ gọi qua số <strong id="view-success-phone"></strong> để sắp xếp xe đón.
        </p>
      </div>

      <form id="view-lead-form" action="api/contact.php" method="POST" class="space-y-4 text-xs text-left max-w-xl mx-auto">
        <input type="hidden" name="form_type" value="view_form">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-slate-700 font-bold mb-1">Họ và tên *</label>
            <input
              type="text"
              name="name"
              required
              id="view-name"
              placeholder="Nguyễn Văn A"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-medium border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] outline-none"
            />
          </div>
          <div>
            <label class="block text-slate-700 font-bold mb-1">Số điện thoại (Zalo) *</label>
            <input
              type="tel"
              name="phone"
              required
              id="view-phone"
              placeholder="0912 345 678"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-bold border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] outline-none"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-slate-700 font-bold mb-1">Căn hộ muốn xem</label>
            <select
              id="view-unit-select"
              name="unit_type"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-bold border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] outline-none"
            >
              <?php foreach ($projects as $idx => $p): ?>
              <option class="text-slate-900 bg-white font-medium" value="<?= htmlspecialchars($p["full_name"]) ?>" <?= $idx === 1 ? "selected" : "" ?>><?= htmlspecialchars($p["full_name"]) ?></option>
              <?php endforeach; ?>
            </select>
          </div>
          <div>
            <label class="block text-slate-700 font-bold mb-1">Thời gian thuận tiện</label>
            <select
              id="view-date"
              name="view_date"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-900 font-medium border border-slate-300 focus:ring-2 focus:ring-[#9B1C1C] outline-none"
            >
              <option class="text-slate-900 bg-white font-medium" value="Thứ 7 tuần này (Sáng 09:00 - 11:30)">Thứ 7 tuần này (Sáng 09:00 - 11:30)</option>
              <option class="text-slate-900 bg-white font-medium" value="Thứ 7 tuần này (Chiều 14:30 - 17:00)">Thứ 7 tuần này (Chiều 14:30 - 17:00)</option>
              <option class="text-slate-900 bg-white font-medium" value="Chủ Nhật tuần này (Sáng 09:00 - 11:30)">Chủ Nhật tuần này (Sáng 09:00 - 11:30)</option>
              <option class="text-slate-900 bg-white font-medium" value="Chủ Nhật tuần này (Chiều 14:30 - 17:00)">Chủ Nhật tuần này (Chiều 14:30 - 17:00)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-4 rounded-xl bg-[#9B1C1C] hover:bg-[#801616] text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer mt-2"
        >
          XÁC NHẬN ĐĂNG KÝ XEM NHÀ MẪU
        </button>
      </form>

    </div>
  </section>

  <!-- 13. FOOTER -->
  <footer class="bg-[#1E2530] text-white py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-slate-800">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      
      <div class="space-y-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-[#9B1C1C] text-white flex items-center justify-center font-black">
            SP
          </div>
          <span class="font-black text-sm text-white uppercase tracking-wider">
            DỰ ÁN CĂN HỘ <?= htmlspecialchars($company["name"] ?? "SIMPLE PAGE") ?>
          </span>
        </div>
        <p class="text-slate-400 leading-relaxed text-[11px]">
          Dự án căn hộ tiêu chuẩn resort nghỉ dưỡng hàng đầu. Khẳng định đẳng cấp sống thượng lưu đích thực.
        </p>
      </div>

      <div class="space-y-2 text-[11px] text-slate-300">
        <h4 class="font-bold text-amber-400 text-xs uppercase mb-1">VĂN PHÒNG BÁN HÀNG & NHÀ MẪU</h4>
        <p class="flex items-start gap-2">
          <i data-lucide="map-pin" class="w-4 h-4 text-red-500 shrink-0 mt-0.5"></i>
          <span><?= htmlspecialchars($company["address"] ?? "Đại Lộ Trung Tâm Đô Thị Mới, Quận Nam Từ Liêm, Hà Nội / TP.HCM") ?></span>
        </p>
        <p class="flex items-center gap-2">
          <i data-lucide="phone" class="w-4 h-4 text-red-500 shrink-0"></i>
          <span>Hotline 24/7: <strong><?= htmlspecialchars($company["phone"] ?? "0919 006 030") ?></strong></span>
        </p>
        <p class="flex items-center gap-2">
          <i data-lucide="mail" class="w-4 h-4 text-red-500 shrink-0"></i>
          <span>Email: <?= htmlspecialchars($company["email"] ?? "admin@templatesbds.com") ?></span>
        </p>
      </div>

      <div class="space-y-2 text-[11px] text-slate-400">
        <h4 class="font-bold text-amber-400 text-xs uppercase mb-1">QUY CHUẨN PHÁP LÝ</h4>
        <p>✓ Quy hoạch chi tiết 1/500 phê duyệt bởi UBND thành phố.</p>
        <p>✓ Giấy phép xây dựng và nghiệm thu móng hoàn thành 100%.</p>
        <p>✓ Ngân hàng bảo lãnh tiến độ và hỗ trợ giải ngân 70%.</p>
        <p class="text-[10px] text-slate-500 pt-2">© 2026 DỰ ÁN CĂN HỘ <?= htmlspecialchars($company["name"] ?? "SIMPLE PAGE") ?>. All rights reserved.</p>
      </div>

    </div>
  </footer>

  <!-- 14. LIGHTBOX ZOOM MODAL -->
  <div id="lightbox-modal" class="hidden fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md items-center justify-center p-4 animate-fadeIn" onclick="closeZoom()">
    <div class="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
      <button
        onclick="closeZoom()"
        class="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
        title="Đóng (Esc)"
      >
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
      <img
        id="lightbox-img"
        src=""
        alt="Phóng to chi tiết"
        class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
        onclick="event.stopPropagation()"
      />
    </div>
  </div>

  <!-- 15. FLOATING BUTTONS -->
  <div class="fixed bottom-4 left-4 z-40 flex items-center gap-2">
    <a
      href="tel:<?= htmlspecialchars($company["phone"] ?? "0919 006 030") ?>"
      class="px-4 py-2.5 rounded-full bg-[#9B1C1C] hover:bg-[#801616] text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
    >
      <i data-lucide="phone" class="w-4 h-4 animate-bounce"></i>
      <span class="hidden sm:inline">Tư Vấn: <?= htmlspecialchars($company["phone"] ?? "0919 006 030") ?></span>
      <span class="sm:hidden">Gọi Hotline</span>
    </a>

    <a
      href="https://zalo.me/<?= htmlspecialchars($company["phone"] ?? "0919 006 030") ?>"
      target="_blank"
      rel="noopener noreferrer"
      class="px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
    >
      <i data-lucide="message-circle" class="w-4 h-4"></i>
      <span>Chat Zalo Báo Giá</span>
    </a>
  </div>

  <script>
    // Initialize Lucide Icons
    lucide.createIcons();

    // Floor Plan Data
    const floorPlanData = {
      '1pn': {
        title: 'Căn Hộ 1 Phòng Ngủ (48.5 m²)',
        desc: 'Thiết kế thông minh, tối ưu công năng từng góc nhỏ, phù hợp cho người độc thân hoặc cặp vợ chồng trẻ.',
        rooms: '1 Phòng Ngủ · 1 WC · 1 Ban Công Thoáng · 1 Bếp Mở',
        price: 'Chỉ từ 1.85 Tỷ/căn',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      },
      '2pn': {
        title: 'Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)',
        desc: 'Căn hộ tiêu chuẩn bán chạy nhất với 2 phòng ngủ ngập tràn ánh sáng, phòng khách ban công view công viên.',
        rooms: '2 Phòng Ngủ · 2 WC · 2 Ban Công & Logia · Phòng Khách Rộng',
        price: 'Chỉ từ 2.65 Tỷ/căn',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      },
      '3pn': {
        title: 'Căn Hộ 3 Phòng Ngủ Master (92.0 m² - 110.0 m²)',
        desc: 'Căn góc 3 mặt thoáng dành cho gia đình đa thế hệ, tầm view panorama triệu đô ôm trọn thành phố.',
        rooms: '3 Phòng Ngủ · 2 WC · 1 Phòng Đa Năng · Phòng Bếp Riêng',
        price: 'Chỉ từ 3.55 Tỷ/căn',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      },
    };

    let activeFloorTab = '2pn';

    // Tabs functionality
    const tabs = document.querySelectorAll('.floor-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const id = tab.getAttribute('data-tab');
        activeFloorTab = id;
        
        // Update tab styles
        tabs.forEach(t => {
          if (t.getAttribute('data-tab') === id) {
            t.className = 'floor-tab px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer bg-[#9B1C1C] text-white border-[#9B1C1C] shadow-md scale-105';
          } else {
            t.className = 'floor-tab px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer bg-white text-slate-700 border-slate-300 hover:bg-slate-100';
          }
        });

        // Update content
        document.getElementById('floor-title').textContent = floorPlanData[id].title;
        document.getElementById('floor-desc').textContent = floorPlanData[id].desc;
        document.getElementById('floor-rooms').textContent = floorPlanData[id].rooms;
        document.getElementById('floor-price').textContent = floorPlanData[id].price;
        document.getElementById('floor-img').src = floorPlanData[id].image;
      });
    });

    // Lightbox modal functionality
    function openZoom(imageSrc) {
      document.getElementById('lightbox-img').src = imageSrc;
      const modal = document.getElementById('lightbox-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeZoom() {
      const modal = document.getElementById('lightbox-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeZoom();
    });

    // Seamless UX: select unit globally
    function selectUnitGlobal(unitTitle) {
      // Set hero form select
      const heroSelect = document.getElementById('hero-unit-select');
      if (heroSelect) {
        for (let i = 0; i < heroSelect.options.length; i++) {
          if (heroSelect.options[i].value === unitTitle) {
            heroSelect.selectedIndex = i;
            break;
          }
        }
      }
      
      // Set view form select
      const viewSelect = document.getElementById('view-unit-select');
      if (viewSelect) {
        for (let i = 0; i < viewSelect.options.length; i++) {
          if (viewSelect.options[i].value === unitTitle) {
            viewSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Scroll to hero form
      const heroForm = document.getElementById('hero-form');
      if (heroForm) {
        heroForm.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (heroSelect) {
            heroSelect.focus();
            heroSelect.classList.add('ring-4', 'ring-red-600', 'border-red-600');
            setTimeout(() => heroSelect.classList.remove('ring-4', 'ring-red-600', 'border-red-600'), 2000);
          }
        }, 350);
      }
    }

    function selectUnitFromFloorPlan() {
      const title = floorPlanData[activeFloorTab].title;
      selectUnitGlobal(title);
    }

    // Hero Form Submit
    document.getElementById('hero-lead-form').addEventListener('submit', function(e) {
      e.preventDefault(); // Remove this line if actual redirect to api/contact.php is needed
      
      const phone = document.getElementById('hero-phone').value;
      if (!phone.trim()) return;

      const unit = document.getElementById('hero-unit-select').value;
      
      // If we want to simulate fetch for seamless UX and show success:
      fetch('api/contact.php', {
        method: 'POST',
        body: new FormData(this)
      }).catch(err => console.log('Simulated API Call', err));

      document.getElementById('hero-success-phone').textContent = phone;
      document.getElementById('hero-success-unit').textContent = unit;
      
      this.classList.add('hidden');
      document.getElementById('hero-success-msg').classList.remove('hidden');

      setTimeout(() => {
        document.getElementById('hero-success-msg').classList.add('hidden');
        this.classList.remove('hidden');
        this.reset();
      }, 6000);
    });

    // View Form Submit
    document.getElementById('view-lead-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('view-name').value || 'bạn';
      const phone = document.getElementById('view-phone').value;
      const date = document.getElementById('view-date').value;
      
      if (!phone.trim()) return;

      fetch('api/contact.php', {
        method: 'POST',
        body: new FormData(this)
      }).catch(err => console.log('Simulated API Call', err));

      document.getElementById('view-success-name').textContent = name;
      document.getElementById('view-success-date').textContent = date;
      document.getElementById('view-success-phone').textContent = phone;

      this.classList.add('hidden');
      document.getElementById('view-success-msg').classList.remove('hidden');

      setTimeout(() => {
        document.getElementById('view-success-msg').classList.add('hidden');
        this.classList.remove('hidden');
        this.reset();
      }, 6000);
    });

  </script>
</body>
</html>