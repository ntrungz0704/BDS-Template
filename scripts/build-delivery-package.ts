/**
 * Delivery Package Generator for BUY_SOURCE Orders (PlatformBDS V2)
 * 
 * Generates an optimized, standalone Static HTML Delivery Package for Low-Tech customers:
 * - Creates public_html/ with pre-rendered index.html and assets
 * - Generates HUONG_DAN_CAI_DAT_TIENG_VIET.md (Step-by-step cPanel / Hosting guide)
 * - Generates LICENSE.txt (Official copyright license certificate)
 */

import fs from 'fs';
import path from 'path';

export interface PackageOptions {
  templateSlug: string;
  templateName: string;
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  hotline?: string;
  outputDir?: string;
}

export async function generateDeliveryPackage(options: PackageOptions): Promise<string> {
  const {
    templateSlug,
    templateName,
    customerName,
    customerEmail,
    orderNumber,
    hotline = '0983312219',
    outputDir = path.resolve(process.cwd(), 'uploads/packages'),
  } = options;

  const packageName = `BDS-${templateSlug.toUpperCase()}-${orderNumber}`;
  const targetDir = path.join(outputDir, packageName);
  const publicHtmlDir = path.join(targetDir, 'public_html');

  // Ensure directories exist
  fs.mkdirSync(publicHtmlDir, { recursive: true });
  fs.mkdirSync(path.join(publicHtmlDir, 'assets'), { recursive: true });
  fs.mkdirSync(path.join(publicHtmlDir, 'images'), { recursive: true });

  // 1. Generate standalone index.html
  const indexHtmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${customerName} — Bất Động Sản Cao Cấp</title>
  <meta name="description" content="Website Bất Động Sản chuyên nghiệp, chuẩn SEO, tối ưu trải nghiệm khách hàng.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              gold: '#C5A572',
              navy: '#0F172A',
              blue: '#2563EB',
            }
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, .font-heading { font-family: 'Playfair Display', serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col justify-between">

  <!-- Top Bar -->
  <header class="w-full bg-slate-900 border-b border-slate-800 text-xs py-2 px-6">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <span class="text-amber-400 font-bold tracking-wider">${customerName.toUpperCase()}</span>
      <div class="flex items-center gap-4">
        <a href="tel:${hotline.replace(/\s+/g, '')}" class="text-slate-300 hover:text-white font-mono font-bold">
          Hotline: ${hotline}
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="flex-1">
    <section class="relative py-20 px-6 max-w-7xl mx-auto text-center">
      <span class="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-800/60 inline-block mb-6">
        Giao Diện ${templateName}
      </span>
      <h1 class="text-4xl sm:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight mb-6">
        Không Gian Sống Đẳng Cấp & Đầu Tư Bất Động Sản Thịnh Vượng
      </h1>
      <p class="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-10">
        Chào mừng quý khách đến với ${customerName}. Chúng tôi mang đến những cơ hội đầu tư BĐS an toàn, sinh lời vượt trội cùng trải nghiệm an cư chuẩn thượng lưu.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="tel:${hotline.replace(/\s+/g, '')}" class="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold rounded-xl shadow-lg transition-all">
          Gọi Ngay: ${hotline}
        </a>
        <a href="https://zalo.me/${hotline.replace(/\s+/g, '')}" target="_blank" class="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all">
          Nhắn Tin Zalo
        </a>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="w-full bg-slate-900 border-t border-slate-800 py-8 px-6 text-center text-xs text-slate-500">
    <p>© ${new Date().getFullYear()} ${customerName}. Bản quyền giao diện thuộc về khách hàng theo Giấy phép Mã số #${orderNumber}.</p>
    <p class="mt-1">Powered by PlatformBDS.vn</p>
  </footer>

</body>
</html>`;

  fs.writeFileSync(path.join(publicHtmlDir, 'index.html'), indexHtmlContent, 'utf-8');

  // 2. Generate Vietnamese User Guide
  const guideContent = `# HƯỚNG DẪN CÀI ĐẶT WEBSITE BẤT ĐỘNG SẢN (TIẾNG VIỆT)

**Kính chào Quý khách hàng:** ${customerName}  
**Mẫu giao diện:** ${templateName} (\`${templateSlug}\`)  
**Mã đơn hàng:** #${orderNumber}  
**Đơn vị cung cấp:** PlatformBDS.vn  

---

## 🚀 HƯỚNG DẪN 3 BƯỚC UPLOAD LÊN HOSTING (CPANEL / DIRECTADMIN)

Website của Quý khách đã được biên dịch sẵn dưới dạng **Web Tĩnh Tốc Độ Cao (Static HTML/CSS/JS)**. Quý khách **KHÔNG CẦN CÀI ĐẶT Node.js hay Database** phức tạp.

### Bước 1: Chuẩn bị Hosting & Tên miền
- Đăng nhập vào bảng điều khiển Hosting của Quý khách (cPanel, DirectAdmin, Hostinger, AZDIGI, v.v.).
- Mở mục **File Manager (Trình quản lý tệp)**.
- Truy cập vào thư mục gốc của website (thông thường là \`public_html\` hoặc \`httpdocs\`).

### Bước 2: Upload các tệp trong thư mục \`public_html\`
- Mở thư mục \`public_html\` nằm bên trong gói giao diện này.
- Tải toàn bộ các tệp và thư mục (gồm \`index.html\`, \`assets/\`, \`images/\`) lên thư mục \`public_html\` trên hosting của Quý khách.

### Bước 3: Kiểm tra và hoàn tất
- Mở trình duyệt và truy cập vào tên miền của Quý khách (VD: \`https://domaincuaban.com\`).
- Website sẽ hiển thị ngay lập tức với tốc độ tải trang dưới 0.5 giây!

---

## 📞 HỖ TRỢ KỸ THUẬT MIỄN PHÍ
Nếu Quý khách cần hỗ trợ upload trực tiếp hoặc cấu hình trỏ tên miền:
- **Hotline 1:** 0919 006 030
- **Hotline 2 / Zalo CSKH:** 0983 312 219 (Hỗ trợ 24/7)
- **Website:** https://platformbds.vn
`;

  fs.writeFileSync(path.join(targetDir, 'HUONG_DAN_CAI_DAT_TIENG_VIET.md'), guideContent, 'utf-8');

  // 3. Generate LICENSE.txt
  const licenseContent = `================================================================================
                    GIẤY PHÉP BẢN QUYỀN SOURCE CODE (PLATFORMBDS)
================================================================================

MÃ BẢN QUYỀN (LICENSE ID): LIC-${orderNumber}-${Date.now()}
KHÁCH HÀNG SỞ HỮU: ${customerName} (${customerEmail})
MẪU GIAO DIỆN: ${templateName} (${templateSlug})
MÃ ĐƠN HÀNG: #${orderNumber}
NGÀY PHÁT HÀNH: ${new Date().toLocaleDateString('vi-VN')}

ĐIỀU KHOẢN SỬ DỤNG:
1. Khách hàng có toàn quyền triển khai và sử dụng gói mã nguồn này trên tên miền của mình.
2. Được phép tùy biến hình ảnh, màu sắc, nội dung, văn bản phục vụ hoạt động kinh doanh BĐS.
3. Không được tự ý sao chép gói giao diện này để bán lại cho bên thứ ba trên các sàn thương mại điện tử.

ĐƠN VỊ PHÁT HÀNH:
PlatformBDS.vn — Nền Tảng Website Bất Động Sản Số 1 Việt Nam
Hotline: 0919 006 030 / 0983 312 219
`;

  fs.writeFileSync(path.join(targetDir, 'LICENSE.txt'), licenseContent, 'utf-8');

  return targetDir;
}
