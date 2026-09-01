const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_BASE = path.join(ROOT_DIR, 'standalone-templates');

const LP_TEMPLATES = [
  {
    code: 'lp-01',
    name: 'LP #01 - Căn Hộ Chung Cư Cao Cấp Launch Funnel',
    badge: 'MỞ BÁN ĐỢT 1 — ƯU ĐÃI 8.5%',
    headline: 'KHÔNG GIAN SỐNG THÔNG MINH CHUẨN QUỐC TẾ',
    subheadline: 'Đại đô thị căn hộ cao cấp thông minh, 3 mặt view sông, tiện ích 5 sao đồng bộ, chiết khấu tới 8.5% và hỗ trợ lãi suất 0% trong 24 tháng.',
    priceTag: 'Từ 2.8 Tỷ VNĐ / Căn 2PN',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#2563EB',
    specs: [
      { label: 'Quy mô', val: '4.2 Hecta' },
      { label: 'Số lượng', val: '1.200 Căn hộ' },
      { label: 'Mật độ xây dựng', val: '28%' },
      { label: 'Bàn giao', val: 'Quý 4/2026' }
    ],
    items: [
      { title: 'Căn hộ 1PN + 1 Smart (48m²)', price: '1.85 Tỷ', area: '48m²', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
      { title: 'Căn hộ 2PN 2WC Ban công Panorama (68m²)', price: '2.80 Tỷ', area: '68m²', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
      { title: 'Căn hộ 3PN Góc 2 Mặt Thoáng (92m²)', price: '3.95 Tỷ', area: '92m²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
      { title: 'Sky Villa Penthouse Sân Vườn (185m²)', price: '8.50 Tỷ', area: '185m²', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }
    ]
  },
  {
    code: 'lp-02',
    name: 'LP #02 - Biệt Thự & Nghỉ Dưỡng Hoàng Gia VIP',
    badge: 'BỘ SƯU TẬP HOÀNG GIA ĐỘC BẢN',
    headline: 'DINH THỰ BIỂN NGHỈ DƯỠNG THƯỢNG LƯU PANORAMA',
    subheadline: 'Tuyệt tác kiến trúc bên vịnh biển, sân golf 18 lỗ quốc tế, hồ bơi vô cực riêng từng căn và bến đỗ du thuyền 5 sao đẳng cấp.',
    priceTag: 'Từ 15.8 Tỷ VNĐ / Căn Villa Đơn Lập',
    heroImage: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#B45309',
    specs: [
      { label: 'Quy mô', val: '68 Hecta' },
      { label: 'Số lượng VIP', val: '88 Căn Dinh Thự' },
      { label: 'Mặt biển riêng', val: '1.5 Km' },
      { label: 'Pháp lý', val: 'Sở hữu lâu dài' }
    ],
    items: [
      { title: 'Villa Song Lập View Hồ Cảnh Quan (220m²)', price: '15.8 Tỷ', area: '220m²', img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
      { title: 'Villa Đơn Lập Sân Vườn Nhiệt Đới (380m²)', price: '26.5 Tỷ', area: '380m²', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
      { title: 'Dinh Thự Mặt Biển Trực Diện VIP (650m²)', price: '58.0 Tỷ', area: '650m²', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800' }
    ]
  },
  {
    code: 'lp-03',
    name: 'LP #03 - Đất Nền Phân Lô F0 Sổ Đỏ Trao Tay',
    badge: 'SỔ ĐỎ TRAO TAY — CÔNG CHỨNG NGAY',
    headline: 'ĐẤT NỀN ĐÔ THỊ TRỌNG ĐIỂM GIÁ GỐC F0',
    subheadline: 'Hạ tầng hoàn thiện 100%, đường nhựa 16m - 24m, công viên trường học hiện hữu, vị trí đắc địa liền kề cao tốc và trung tâm hành chính.',
    priceTag: 'Chỉ từ 850 Triệu / Nền 100m²',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#059669',
    specs: [
      { label: 'Quy hoạch', val: '1/500 Chuẩn' },
      { label: 'Diện tích nền', val: '80m² - 150m²' },
      { label: 'Hạ tầng', val: 'Điện âm - Nước máy' },
      { label: 'Hỗ trợ vay', val: 'Ngân hàng 70%' }
    ],
    items: [
      { title: 'Lô A1-A12 Mặt Tiền Đại Lộ 24m (100m²)', price: '1.25 Tỷ', area: '100m²', img: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?w=800' },
      { title: 'Lô B5-B20 Liền Kề Công Viên Xanh (85m²)', price: '890 Triệu', area: '85m²', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' },
      { title: 'Lô Góc Thương Mại 2 Mặt Tiền (145m²)', price: '1.95 Tỷ', area: '145m²', img: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800' }
    ]
  },
  {
    code: 'lp-04',
    name: 'LP #04 - Sale Môi Giới BĐS Triệu Đô Authority',
    badge: 'CHUYÊN GIA MÔI GIỚI BĐS TRIỆU ĐÔ',
    headline: 'TƯ VẤN ĐẦU TƯ BẤT ĐỘNG SẢN AN TOÀN & SINH LỜI CAO',
    subheadline: 'Hơn 10 năm kinh nghiệm phân phối các dự án BĐS cao cấp, nắm giữ quỹ căn ngoại giao cắt lỗ 15% - 25% thị trường, cam kết pháp lý minh bạch 100%.',
    priceTag: 'Giỏ hàng độc quyền cắt lỗ 15% - 25%',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#1D4ED8',
    specs: [
      { label: 'Kinh nghiệm', val: '10+ Năm' },
      { label: 'Giao dịch', val: '500+ Căn' },
      { label: 'Khách hàng', val: '1.500+ Nhà đầu tư' },
      { label: 'Hỗ trợ', val: 'Tận tâm 24/7' }
    ],
    items: [
      { title: 'Căn Hộ 2PN Masteri Thảo Điền (Cắt Lỗ 400Tr)', price: '3.65 Tỷ', area: '72m²', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
      { title: 'Nhà Phố KĐT Vạn Phúc City (Chính Chủ Gửi Bán)', price: '16.5 Tỷ', area: '115m²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
      { title: 'Biệt Thự Đơn Lập Aqua City (Giá Rẻ Hơn CĐT 20%)', price: '12.8 Tỷ', area: '240m²', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
      { title: 'Đất Nền Sổ Đỏ Ven Biển Đà Nẵng (Hàng Hiếm)', price: '2.95 Tỷ', area: '120m²', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' }
    ]
  },
  {
    code: 'lp-05',
    name: 'LP #05 - Tổ Hợp Căn Hộ Khách Sạn 5 Sao Golden Park',
    badge: 'CAM KẾT LỢI NHUẬN 12%/NĂM TRONG 5 NĂM',
    headline: 'CĂN HỘ KHÁCH SẠN 5 SAO QUỐC TẾ GOLDEN PARK',
    subheadline: 'Vị trí đắc địa tại thủ phủ du lịch, đơn vị quản lý vận hành chuẩn 5 sao thế giới, chia sẻ doanh thu 85/15 và tặng 15 đêm nghỉ dưỡng miễn phí mỗi năm.',
    priceTag: 'Chỉ từ 1.95 Tỷ / Căn Studio Cao Cấp',
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#7C3AED',
    specs: [
      { label: 'Vận hành', val: 'Chuẩn 5 Sao' },
      { label: 'Cam kết LN', val: '12% / Năm' },
      { label: 'Đêm nghỉ', val: '15 Đêm/Năm' },
      { label: 'Bàn giao', val: 'Full nội thất 5 sao' }
    ],
    items: [
      { title: 'Studio Suite Hướng Biển (36m²)', price: '1.95 Tỷ', area: '36m²', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800' },
      { title: 'Executive Suite 1PN Panorama (54m²)', price: '2.85 Tỷ', area: '54m²', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800' },
      { title: 'Presidential Suite 2PN Tổng Thống (88m²)', price: '4.60 Tỷ', area: '88m²', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800' }
    ]
  },
  {
    code: 'lp-06',
    name: 'LP #06 - Khu Đô Thị Công Nghiệp & Dịch Vụ VSIP',
    badge: 'HẠ TẦNG XANH ESG — CHUẨN QUỐC TẾ',
    headline: 'KHU ĐÔ THỊ CÔNG NGHIỆP & LOGISTICS XANH THÔNG MINH',
    subheadline: 'Hệ sinh thái công nghiệp công nghệ cao, trạm điện 110kV độc lập, kết nối trực tiếp cao tốc và cảng nước sâu, chính sách ưu đãi thuế FDI tối đa.',
    priceTag: 'Thuê xưởng từ $3.8/m² · Đất KCN từ $115/m²',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#0F766E',
    specs: [
      { label: 'Quy mô KCN', val: '500 Hecta' },
      { label: 'Hạ tầng điện', val: 'Trạm 110/22kV' },
      { label: 'Cấp nước', val: '30.000 m³/ngày' },
      { label: 'Ưu đãi thuế', val: 'Miễn 2 Giảm 4' }
    ],
    items: [
      { title: 'Nhà Xưởng Tiêu Chuẩn Xây Sẵn (2.500m²)', price: '$4.2/m²', area: '2.500m²', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800' },
      { title: 'Nhà Xưởng Cao Tầng Thông Minh (5.000m²)', price: '$3.8/m²', area: '5.000m²', img: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800' },
      { title: 'Lô Đất Công Nghiệp Sạch Quy Hoạch Sẵn (1.5 Ha)', price: '$120/m²', area: '15.000m²', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800' }
    ]
  },
  {
    code: 'lp-07',
    name: 'LP #07 - Dinh Thự Đảo Sinh Thái Nghỉ Dưỡng Ven Sông',
    badge: 'SIÊU PHẨM DINH THỰ ĐẢO BIỆT LẬP',
    headline: 'KHÔNG GIAN SỐNG XANH RIÊNG TƯ TUYỆT ĐỐI BÊN DÒNG SÔNG',
    subheadline: 'Hòn đảo sinh thái xanh mát 100% bao bọc bởi dòng sông tự nhiên, bến đỗ du thuyền trước nhà, an ninh 4 lớp bảo mật 24/7.',
    priceTag: 'Từ 35 Tỷ VNĐ / Căn Dinh Thự Đảo',
    heroImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#047857',
    specs: [
      { label: 'Mật độ xanh', val: '85%' },
      { label: 'Bao quanh', val: '4 Mặt sông lớn' },
      { label: 'Bến du thuyền', val: 'Chuẩn quốc tế' },
      { label: 'An ninh', val: 'Camera AI & Đội tuần tra' }
    ],
    items: [
      { title: 'Dinh Thự Song Lập Đảo Xanh (320m²)', price: '35.0 Tỷ', area: '320m²', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
      { title: 'Dinh Thự Đơn Lập View Sông Trực Diện (550m²)', price: '62.0 Tỷ', area: '550m²', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
      { title: 'Dinh Thự Tổng Thống Mũi Đảo Độc Bản (1.200m²)', price: '128.0 Tỷ', area: '1.200m²', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' }
    ]
  }
];

function generateLpPackages() {
  console.log('🚀 Đang tạo các gói standalone độc lập cho 7 Landing Page BĐS...');

  for (const lp of LP_TEMPLATES) {
    const targetFolder = path.join(OUTPUT_BASE, lp.code);
    const htmlDir = path.join(targetFolder, 'html');
    const phpDir = path.join(targetFolder, 'php');

    fs.mkdirSync(path.join(htmlDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(htmlDir, 'js'), { recursive: true });
    fs.mkdirSync(path.join(phpDir, 'config'), { recursive: true });
    fs.mkdirSync(path.join(phpDir, 'api'), { recursive: true });

    // 1. HTML INDEX
    const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lp.name}</title>
  <meta name="description" content="${lp.subheadline}">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 antialiased min-h-screen flex flex-col justify-between selection:bg-blue-600 selection:text-white">

  <!-- Header -->
  <header class="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 py-3.5 px-4 sm:px-8">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-2 font-black text-lg sm:text-xl text-white tracking-tight">
        <span class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md">LP</span>
        <span>TEMPLATES<strong class="text-blue-500">BDS</strong></span>
      </a>
      <nav class="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-300">
        <a href="#tong-quan" class="hover:text-blue-400 transition">Tổng Quan</a>
        <a href="#san-pham" class="hover:text-blue-400 transition">Bảng Hàng VIP</a>
        <a href="#uu-dai" class="hover:text-blue-400 transition">Chính Sách</a>
        <a href="#lien-he" class="hover:text-blue-400 transition">Liên Hệ</a>
      </nav>
      <div class="flex items-center gap-3">
        <a href="tel:0919006030" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-2">
          <span>📞 0919 006 030</span>
        </a>
      </div>
    </div>
  </header>

  <main class="flex-1 w-full space-y-16 pb-20">

    <!-- Hero Section -->
    <section id="tong-quan" class="relative py-24 px-4 overflow-hidden border-b border-slate-800">
      <div class="absolute inset-0 z-0">
        <img src="${lp.heroImage}" alt="" class="w-full h-full object-cover opacity-20 filter blur-[1px]">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-black uppercase tracking-widest">
          <span class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          <span>${lp.badge}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight">
          ${lp.headline}
        </h1>

        <p class="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          ${lp.subheadline}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a href="#lien-he" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-105">
            Nhận Bảng Giá & Ưu Đãi Ngay
          </a>
          <a href="https://zalo.me/0983312219" target="_blank" class="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-2xl border border-slate-700 transition-all">
            Chat Zalo Trực Tiếp
          </a>
        </div>

        <!-- Quick Specs -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-10 max-w-4xl mx-auto">
          ${lp.specs.map(s => `
            <div class="bg-slate-800/80 backdrop-blur border border-slate-700/80 p-4 rounded-2xl text-center">
              <span class="text-[11px] font-bold text-slate-400 uppercase block">${s.label}</span>
              <span class="text-base sm:text-lg font-black text-white mt-0.5 block">${s.val}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Product Showcase -->
    <section id="san-pham" class="max-w-7xl mx-auto px-4 space-y-8">
      <div class="text-center space-y-2">
        <span class="text-blue-500 text-xs font-extrabold uppercase tracking-widest">DANH MỤC SẢN PHẨM</span>
        <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">GIỎ HÀNG ĐẶC QUYỀN ĐỢT 1</h2>
        <p class="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">Các vị trí đẹp nhất với chính sách giá gốc trực tiếp và hỗ trợ thủ tục pháp lý trọn gói.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${lp.items.length === 4 ? '4' : '3'} gap-6">
        ${lp.items.map(it => `
          <div class="bg-slate-800/90 border border-slate-700 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between group hover:border-blue-500 transition-all duration-300">
            <div class="relative overflow-hidden h-48">
              <img src="${it.img}" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute top-3 right-3 bg-blue-600 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase shadow">
                ${it.area}
              </div>
            </div>
            <div class="p-5 space-y-4">
              <div>
                <h3 class="font-bold text-base text-white group-hover:text-blue-400 transition">${it.title}</h3>
                <span class="text-xs text-slate-400 block mt-1">Sở hữu lâu dài · Sổ hồng sẵn</span>
              </div>
              <div class="flex items-center justify-between pt-3 border-t border-slate-700">
                <div>
                  <span class="text-[10px] text-slate-400 uppercase font-bold block">Giá niêm yết</span>
                  <span class="text-lg font-black text-blue-400">${it.price}</span>
                </div>
                <a href="#lien-he" class="px-4 py-2 bg-slate-700 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition">
                  Đặt Mua
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Contact Form Funnel -->
    <section id="lien-he" class="max-w-4xl mx-auto px-4">
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 text-center">
        <span class="px-3.5 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-black uppercase rounded-full tracking-widest inline-block">
          ĐĂNG KÝ TƯ VẤN TRỰC TIẾP
        </span>
        <h2 class="text-2xl sm:text-3xl font-black text-white uppercase">
          NHẬN TOÀN BỘ TÀI LIỆU & BẢNG GIÁ NGOẠI GIAO
        </h2>
        <p class="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
          Điền thông tin bên dưới, chuyên viên phân tích sẽ gửi trọn bộ hồ sơ quy hoạch và bảng giá chi tiết qua Zalo trong 5 phút.
        </p>

        <form action="api/contact.php" method="POST" class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left pt-2">
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-300 uppercase">Họ và tên *</label>
            <input type="text" name="name" required placeholder="Nguyễn Văn A" class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-blue-500">
          </div>
          <div class="space-y-1">
            <label class="text-[11px] font-bold text-slate-300 uppercase">Số điện thoại / Zalo *</label>
            <input type="tel" name="phone" required placeholder="0983xxxxxx" class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-blue-500">
          </div>
          <div class="sm:col-span-2 space-y-1">
            <label class="text-[11px] font-bold text-slate-300 uppercase">Nhu cầu quan tâm</label>
            <textarea name="message" rows="2" placeholder="Ví dụ: Cần tư vấn căn 2PN tầng cao view sông, tư vấn gói vay ngân hàng..." class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div class="sm:col-span-2 pt-2">
            <button type="submit" class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all hover:scale-[1.01]">
              Gửi Thông Tin Nhận Báo Giá Ngay
            </button>
          </div>
        </form>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="w-full bg-slate-950 border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
    <p class="font-bold text-slate-400">© ${new Date().getFullYear()} ${lp.name}. Nền tảng phân phối TEMPLATES BDS.</p>
    <p class="text-[11px]">Hotline CSKH 24/7: <a href="tel:0919006030" class="text-blue-500 font-bold">0919 006 030</a> — Zalo: <a href="https://zalo.me/0983312219" class="text-blue-500 font-bold">0983 312 219</a></p>
  </footer>

</body>
</html>`;
    fs.writeFileSync(path.join(htmlDir, 'index.html'), htmlContent, 'utf-8');

    // 2. CSS & JS
    fs.writeFileSync(path.join(htmlDir, 'css/style.css'), `/* Style for ${lp.code} */\nhtml { scroll-behavior: smooth; }`, 'utf-8');
    fs.writeFileSync(path.join(htmlDir, 'js/main.js'), `console.log('${lp.name} initialized');`, 'utf-8');

    // 3. PHP CONFIG & DATABASE
    const phpConfig = `<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', '${lp.code.replace(/-/g, '_')}_db');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Fallback mode without database
}
`;
    fs.writeFileSync(path.join(phpDir, 'config/db.php'), phpConfig, 'utf-8');

    const phpContactApi = `<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = strip_tags(trim($_POST['name'] ?? ''));
    $phone = strip_tags(trim($_POST['phone'] ?? ''));
    $message = strip_tags(trim($_POST['message'] ?? ''));

    if (!empty($name) && !empty($phone)) {
        require_once '../config/db.php';
        if (isset($pdo)) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, message) VALUES (?, ?, ?)");
            $stmt->execute([$name, $phone, $message]);
        }
        echo "<script>
            alert('🎉 Gửi thông tin thành công! Chuyên viên sẽ liên hệ lại với quý khách trong ít phút qua số: " . htmlspecialchars($phone) . "');
            window.location.href = '../index.php';
        </script>";
        exit;
    }
}
header('Location: ../index.php');
exit;
`;
    fs.writeFileSync(path.join(phpDir, 'api/contact.php'), phpContactApi, 'utf-8');

    const databaseSql = `-- CƠ SỞ DỮ LIỆU BẤT ĐỘNG SẢN: ${lp.name}
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS \`company_info\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`phone\` varchar(50) DEFAULT NULL,
  \`email\` varchar(100) DEFAULT NULL,
  \`address\` varchar(255) DEFAULT NULL,
  \`slogan\` varchar(255) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS \`contacts\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(255) NOT NULL,
  \`phone\` varchar(50) NOT NULL,
  \`message\` text DEFAULT NULL,
  \`created_at\` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS \`projects\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`title\` varchar(255) NOT NULL,
  \`price\` varchar(100) DEFAULT NULL,
  \`area\` varchar(100) DEFAULT NULL,
  \`type\` varchar(100) DEFAULT NULL,
  \`address\` varchar(255) DEFAULT NULL,
  \`image\` varchar(500) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO \`company_info\` (\`name\`, \`phone\`, \`email\`, \`address\`, \`slogan\`) VALUES
(${JSON.stringify(lp.name)}, '0919 006 030', 'contact@platformbds.vn', 'TP. Hồ Chí Minh & Hà Nội', ${JSON.stringify(lp.headline)});

${lp.items.map(it => `INSERT INTO \`projects\` (\`title\`, \`price\`, \`area\`, \`type\`, \`address\`, \`image\`) VALUES (${JSON.stringify(it.title)}, ${JSON.stringify(it.price)}, ${JSON.stringify(it.area)}, 'CAN_HO', 'TP. Hồ Chí Minh', ${JSON.stringify(it.img)});`).join('\n')}
`;
    fs.writeFileSync(path.join(phpDir, 'database.sql'), databaseSql, 'utf-8');

    // 4. PHP INDEX
    const phpIndex = `<?php
require_once 'config/db.php';
$companyName = '${lp.name}';
$hotline = '0919 006 030';
if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        $info = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($info) {
            $companyName = $info['name'];
            $hotline = $info['phone'];
        }
    } catch(Exception $e) {}
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo htmlspecialchars($companyName); ?></title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 antialiased min-h-screen flex flex-col justify-between">

  <header class="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 py-3.5 px-4 sm:px-8">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-2 font-black text-lg text-white">
        <span class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm">LP</span>
        <span><?php echo htmlspecialchars($companyName); ?></span>
      </a>
      <div class="flex items-center gap-3">
        <a href="tel:<?php echo preg_replace('/\\s+/', '', $hotline); ?>" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase rounded-xl shadow">
          📞 <?php echo htmlspecialchars($hotline); ?>
        </a>
      </div>
    </div>
  </header>

  <main class="flex-1 w-full space-y-16 pb-20">
    <section class="relative py-24 px-4 text-center border-b border-slate-800">
      <div class="max-w-5xl mx-auto space-y-6">
        <span class="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-black uppercase tracking-widest inline-block">
          ${lp.badge}
        </span>
        <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight uppercase">
          ${lp.headline}
        </h1>
        <p class="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto">
          ${lp.subheadline}
        </p>
      </div>
    </section>

    <!-- Form -->
    <section class="max-w-3xl mx-auto px-4">
      <div class="bg-slate-800 border border-slate-700 rounded-3xl p-8 text-center space-y-6">
        <h2 class="text-2xl font-black text-white uppercase">ĐĂNG KÝ NHẬN BÁO GIÁ & XEM NHÀ MẪU</h2>
        <form action="api/contact.php" method="POST" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div>
            <label class="text-[11px] font-bold text-slate-300 uppercase">Họ và tên *</label>
            <input type="text" name="name" required placeholder="Nguyễn Văn A" class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white">
          </div>
          <div>
            <label class="text-[11px] font-bold text-slate-300 uppercase">Số điện thoại *</label>
            <input type="tel" name="phone" required placeholder="0983xxxxxx" class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white">
          </div>
          <div class="sm:col-span-2">
            <label class="text-[11px] font-bold text-slate-300 uppercase">Ghi chú yêu cầu</label>
            <textarea name="message" rows="2" placeholder="Ghi chú thêm..." class="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-white"></textarea>
          </div>
          <div class="sm:col-span-2">
            <button type="submit" class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase rounded-2xl shadow">
              Gửi Thông Tin Ngay
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>

  <footer class="w-full bg-slate-950 border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
    <p>© <?php echo date('Y'); ?> <?php echo htmlspecialchars($companyName); ?>. Powered by PlatformBDS.vn</p>
  </footer>

</body>
</html>`;
    fs.writeFileSync(path.join(phpDir, 'index.php'), phpIndex, 'utf-8');

    // 5. Guides & README
    const guideContent = `# HƯỚNG DẪN CÀI ĐẶT ${lp.name.toUpperCase()} (PHP & MYSQL)

## 1. Cài đặt trên XAMPP / Laragon
1. Copy toàn bộ thư mục \`php\` vào thư mục \`htdocs\` (VD: \`C:/xampp/htdocs/${lp.code}\`).
2. Mở phpMyAdmin (\`http://localhost/phpmyadmin\`), tạo database mới tên: \`${lp.code.replace(/-/g, '_')}_db\`.
3. Chọn tab Import và nạp file \`database.sql\`.
4. Truy cập \`http://localhost/${lp.code}\` để xem website hoạt động!

## 2. Cài đặt trên Hosting cPanel
1. Mở File Manager và upload toàn bộ nội dung thư mục \`php\` vào \`public_html\`.
2. Tạo MySQL Database trên cPanel và import \`database.sql\`.
3. Sửa thông tin tài khoản Database trong \`config/db.php\`.
`;
    fs.writeFileSync(path.join(phpDir, 'HUONG_DAN_CAI_DAT_XAMPP_CPANEL.md'), guideContent, 'utf-8');

    const readmeContent = `# ${lp.name} — Trọn Bộ Landing Page BĐS Độc Lập

- **Mã mẫu (Slug):** \`${lp.code}\`
- **Công nghệ:** HTML5, CSS3, JavaScript Thuần & PHP/MySQL
- **Hỗ trợ:** Triển khai trực tiếp không cần Node.js hay máy chủ phức tạp.
`;
    fs.writeFileSync(path.join(targetFolder, 'README.md'), readmeContent, 'utf-8');

    // Copy Gemini guide if exists
    const guideSrc = path.join(ROOT_DIR, 'HUONG-DAN-LAY-KEY-GEMINI-AI.md');
    if (fs.existsSync(guideSrc)) {
      fs.copyFileSync(guideSrc, path.join(targetFolder, 'HUONG-DAN-LAY-KEY-GEMINI-AI.md'));
    }

    console.log(`✅ Đã xuất thành công: standalone-templates/${lp.code}`);
  }

  console.log('🎉 Hoàn tất xuất bản 7 Landing Page Standalone!');
}

generateLpPackages();
