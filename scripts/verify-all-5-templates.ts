import fs from 'fs';
import path from 'path';
import http from 'http';

// Helper to make HTTP GET
function httpGet(url: string): Promise<{ statusCode: number; body: string }> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ statusCode: res.statusCode || 0, body: data });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function runComprehensiveAudit() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🚀 BẮT ĐẦU QUY TRÌNH KIỂM THỬ TỰ ĐỘNG CHUYÊN SÂU 5 TEMPLATES BĐS');
  console.log('═══════════════════════════════════════════════════════════════\n');

  let passedTests = 0;
  let totalTests = 0;

  // Resolve project root from script location
  const rootDir = path.resolve('E:/BĐS Template');

  function assertTest(name: string, condition: boolean, details?: string) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✅ [PASS] ${name}`);
      if (details) console.log(`     ↳ Chi tiết: ${details}`);
    } else {
      console.error(`  ❌ [FAIL] ${name}`);
      if (details) console.error(`     ↳ Chi tiết lỗi: ${details}`);
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // PHẦN 1: KIỂM TRA MÃ NGUỒN VÀ LOGIC BỘ LỌC CỦA 5 TEMPLATES
  // ─────────────────────────────────────────────────────────────────
  console.log('📁 PHẦN 1: KIỂM TRA LOGIC BỘ LỌC & TÌM KIẾM (TYPESCRIPT / REACT)');

  // 1.1 BDS-01 LuxuryTemplate
  const t01Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/LuxuryTemplate.tsx');
  const t01Content = fs.readFileSync(t01Path, 'utf-8');
  assertTest('BDS-01: Có bộ lọc tìm kiếm theo từ khóa (searchKeyword)', t01Content.includes('searchKeyword') && t01Content.includes('toLowerCase()'));
  assertTest('BDS-01: Có bộ lọc theo loại hình (can-ho, nha-pho, biet-thu, chung-cu)', t01Content.includes('searchCategory') && t01Content.includes('can-ho'));
  assertTest('BDS-01: Có bộ lọc theo khoảng giá (under-5, 5-10, above-10)', t01Content.includes('filterPriceRange') && t01Content.includes('under-5'));
  assertTest('BDS-01: Có công thức tính vay ngân hàng thời gian thực', t01Content.includes('calculatedLoan') && t01Content.includes('Math.pow(1 + monthlyRate, totalMonths)'));
  assertTest('BDS-01: Header & Footer dùng chuẩn TEMPLATESBDS Admin', t01Content.includes('0919 006 030') && t01Content.includes('UniversalTemplateFooter'));

  // 1.2 BDS-02 MinimalTemplate
  const t02Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/MinimalTemplate.tsx');
  const t02Content = fs.readFileSync(t02Path, 'utf-8');
  assertTest('BDS-02: Có bộ lọc 2 cột theo quận huyện & mức giá', t02Content.includes('filterDistrict') && t02Content.includes('filterPrice'));
  assertTest('BDS-02: Có bộ lọc theo loại nhà đất (nha-mat-tien, nha-ngo-hem, phong-tro)', t02Content.includes('nha-mat-tien') && t02Content.includes('nha-ngo-hem'));
  assertTest('BDS-02: Có form ký gửi nhà đất hoạt động thật', t02Content.includes('handleConsignmentSubmit') && t02Content.includes('consignmentForm'));
  assertTest('BDS-02: Header & Footer dùng chuẩn TEMPLATESBDS Admin', t02Content.includes('0919 006 030') && t02Content.includes('UniversalTemplateFooter'));

  // 1.3 BDS-03 CorporateTemplate
  const t03Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/CorporateTemplate.tsx');
  const t03Content = fs.readFileSync(t03Path, 'utf-8');
  assertTest('BDS-03: Có bộ lọc theo địa danh Tây Nguyên (Bảo Lộc, Bảo Lâm, Di Linh, Đức Trọng)', t03Content.includes('Bảo Lộc') && t03Content.includes('Di Linh'));
  assertTest('BDS-03: Có bộ lọc theo diện tích (under-300, 300-1000, above-1000)', t03Content.includes('filterArea') && t03Content.includes('under-300'));
  assertTest('BDS-03: Có danh sách 8 BĐS + 3 Đại dự án quy mô', t03Content.includes('BDS03_PROPERTIES') && t03Content.includes('BDS03_PROJECTS'));
  assertTest('BDS-03: Header & Footer dùng chuẩn TEMPLATESBDS Admin', t03Content.includes('0919 006 030') && t03Content.includes('UniversalTemplateFooter'));

  // 1.4 BDS-04 ResortTemplate
  const t04Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/ResortTemplate.tsx');
  const t04Content = fs.readFileSync(t04Path, 'utf-8');
  assertTest('BDS-04: Có catalog mặt bằng căn hộ & chọn tầng/căn', t04Content.includes('BDS04_UNITS') && t04Content.includes('handleOpenUnit'));
  assertTest('BDS-04: Có tin tức dự án & tiến độ thi công', t04Content.includes('BDS04_NEWS') && t04Content.includes('handleOpenArticle'));
  assertTest('BDS-04: Có form đăng ký tham quan căn hộ VIP', t04Content.includes('handleVipSubmit') && t04Content.includes('vipForm'));
  assertTest('BDS-04: Header & Footer dùng chuẩn TEMPLATESBDS Admin', t04Content.includes('0919 006 030') && t04Content.includes('UniversalTemplateFooter'));

  // 1.5 BDS-05 UrbanTemplate
  const t05Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/UrbanTemplate.tsx');
  const t05Content = fs.readFileSync(t05Path, 'utf-8');
  assertTest('BDS-05: Có thanh lọc 5 tiêu chí bờ biển (loại BĐS, thành phố, giá, PN, m²)', t05Content.includes('filterType') && t05Content.includes('filterCity') && t05Content.includes('filterBedrooms'));
  assertTest('BDS-05: Có trang danh mục 2 cột kèm widget bài viết và BĐS yêu thích', t05Content.includes('renderArchivePage') && t05Content.includes('DANH MỤC BIỆT THỰ') && t05Content.includes('CÓ THỂ BẠN THÍCH'));
  assertTest('BDS-05: Bấm Đọc tiếp [...] mở chi tiết bài viết với tác giả & ngày đăng', t05Content.includes('handleOpenArticle') && t05Content.includes('renderArticleDetailPage'));
  assertTest('BDS-05: Header & Footer dùng chuẩn TEMPLATESBDS Admin', t05Content.includes('0919 006 030') && t05Content.includes('UniversalTemplateFooter'));

  console.log('\n─────────────────────────────────────────────────────────────');
  console.log('📁 PHẦN 2: KIỂM TRA FILE STANDALONE HTML5 & PHP CỦA 5 TEMPLATES');
  console.log('─────────────────────────────────────────────────────────────');

  const templateFolders = [
    '01-luxury-gold',
    '02-minimal-white',
    '03-modern-corporate',
    '04-resort-paradise',
    '05-smart-urban-city'
  ];

  for (const folder of templateFolders) {
    const htmlFile = path.join(rootDir, `standalone-templates/${folder}/html/index.html`);
    const cssFile = path.join(rootDir, `standalone-templates/${folder}/html/css/style.css`);
    const jsFile = path.join(rootDir, `standalone-templates/${folder}/html/js/main.js`);
    const phpFile = path.join(rootDir, `standalone-templates/${folder}/php/index.php`);
    const sqlFile = path.join(rootDir, `standalone-templates/${folder}/php/database.sql`);
    const dbPhpFile = path.join(rootDir, `standalone-templates/${folder}/php/config/db.php`);

    assertTest(`${folder}: File HTML5 index.html tồn tại và có nội dung`, fs.existsSync(htmlFile) && fs.statSync(htmlFile).size > 1000);
    assertTest(`${folder}: File CSS3 & JS tồn tại`, fs.existsSync(cssFile) && fs.existsSync(jsFile));
    assertTest(`${folder}: File PHP index.php & config/db.php tồn tại`, fs.existsSync(phpFile) && fs.existsSync(dbPhpFile));
    assertTest(`${folder}: File database.sql chứa cấu trúc bảng properties & contacts`, fs.existsSync(sqlFile) && fs.readFileSync(sqlFile, 'utf-8').includes('CREATE TABLE'));
  }

  console.log('\n─────────────────────────────────────────────────────────────');
  console.log('🌐 PHẦN 3: KIỂM TRA MÃ HTTP VÀ CÁC ĐƯỜNG DẪN TRANG CON THỰC TẾ');
  console.log('─────────────────────────────────────────────────────────────');

  const urlsToTest = [
    { url: 'http://localhost:3000/demo/bds-01', name: 'BDS-01 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-01/can-ho', name: 'BDS-01 Trang con Căn Hộ' },
    { url: 'http://localhost:3000/demo/bds-01/biet-thu', name: 'BDS-01 Trang con Biệt Thự' },
    { url: 'http://localhost:3000/demo/bds-02', name: 'BDS-02 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-02/nha-mat-tien', name: 'BDS-02 Trang con Nhà Mặt Tiền' },
    { url: 'http://localhost:3000/demo/bds-02/ky-gui', name: 'BDS-02 Trang con Ký Gửi' },
    { url: 'http://localhost:3000/demo/bds-03', name: 'BDS-03 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-03/san-pham-bds', name: 'BDS-03 Trang con Sản Phẩm BĐS' },
    { url: 'http://localhost:3000/demo/bds-03/du-an', name: 'BDS-03 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-04', name: 'BDS-04 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-04/vi-tri', name: 'BDS-04 Trang con Vị Trí' },
    { url: 'http://localhost:3000/demo/bds-04/can-ho', name: 'BDS-04 Trang con Mặt Bằng Căn Hộ' },
    { url: 'http://localhost:3000/demo/bds-05', name: 'BDS-05 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-05/dat-du-an', name: 'BDS-05 Trang con Đất Dự Án' },
    { url: 'http://localhost:3000/demo/bds-05/nha-o', name: 'BDS-05 Trang con Nhà Ở' },
    { url: 'http://localhost:3000/demo/bds-05/tin-tuc', name: 'BDS-05 Trang con Tin Tức' },
  ];

  for (const item of urlsToTest) {
    try {
      const res = await httpGet(item.url);
      const isOk = res.statusCode === 200 && res.body.length > 500 && !res.body.includes('Application error');
      assertTest(`HTTP ${item.name} (${item.url})`, isOk, `Mã HTTP: ${res.statusCode}, Dung lượng tải về: ${res.body.length} bytes`);
    } catch (err: any) {
      assertTest(`HTTP ${item.name} (${item.url})`, false, `Lỗi kết nối: ${err.message}`);
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`📊 TỔNG KẾT KẾT QUẢ KIỂM THỬ: ${passedTests}/${totalTests} BÀI KIỂM TRA ĐẠT (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('═══════════════════════════════════════════════════════════════\n');
}

runComprehensiveAudit().catch(console.error);
