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
  console.log('🚀 BẮT ĐẦU QUY TRÌNH KIỂM THỬ TỰ ĐỘNG CHUYÊN SÂU 15 TEMPLATES BĐS');
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
  // PHẦN 1: KIỂM TRA MÃ NGUỒN VÀ LOGIC BỘ LỌC CỦA 15 TEMPLATES
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

  // 1.6 BDS-06 IndustrialTemplate (Grand Riverside Eco-Township)
  const t06Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/IndustrialTemplate.tsx');
  const t06Content = fs.readFileSync(t06Path, 'utf-8');
  assertTest('BDS-06: Có cấu trúc Đại Đô Thị Sinh Thái Grand Riverside Park 120ha', t06Content.includes('GRAND RIVERSIDE') && t06Content.includes('BDS06_PROPERTIES'));
  assertTest('BDS-06: Có sơ đồ phân khu Masterplan CAD & catalog căn hộ 4 dòng', t06Content.includes('renderMasterplanSection') && t06Content.includes('activeMasterplanTab'));
  assertTest('BDS-06: Có phân khu nhà phố & Shophouse đại lộ 30m sầm uất', t06Content.includes('renderLowRiseSection') && t06Content.includes('shophouse-khoi-de-dai-lo-30m'));
  assertTest('BDS-06: Có hệ thống 6 tiện ích đặc quyền 5 sao & 3 tour nội thất 3D', t06Content.includes('BDS06_AMENITIES') && t06Content.includes('renderAmenitiesSection'));
  assertTest('BDS-06: Có công thức tính lãi vay ngân hàng thời gian thực (Mortgage Calculator)', t06Content.includes('mortgageCalc') && t06Content.includes('loanPropertyPrice'));
  assertTest('BDS-06: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', t06Content.includes('0919 006 030') && t06Content.includes('UniversalTemplateFooter'));

  // 1.7 BDS-07 VillaTemplate (Pannamera Eco-Village Bảo Lộc)
  const t07Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/VillaTemplate.tsx');
  const t07Content = fs.readFileSync(t07Path, 'utf-8');
  assertTest('BDS-07: Có cấu trúc Làng Sinh Thái Pannamera Bảo Lộc săn mây 900m biển', t07Content.includes('PANNAMERA BẢO LỘC') && t07Content.includes('BDS07_PROPERTIES'));
  assertTest('BDS-07: Có biểu tượng Cối Xay Gió & Vườn hoa cẩm tú cầu', t07Content.includes('Cối Xay Gió') && t07Content.includes('Vườn hoa cẩm tú cầu'));
  assertTest('BDS-07: Có mẫu nhà vườn Bungalow gỗ Bắc Âu 2 tầng hoàn thiện', t07Content.includes('renderBungalowModelSection') && t07Content.includes('Bắc Âu'));
  assertTest('BDS-07: Có sơ đồ phân lô 3D đất vườn 250m² - 1000m²', t07Content.includes('renderMasterplanSection') && t07Content.includes('dat-vuon'));
  assertTest('BDS-07: Có máy tính lãi vay ngân hàng thời gian thực (Mortgage Calculator)', t07Content.includes('mortgageCalc') && t07Content.includes('loanPropertyPrice'));
  assertTest('BDS-07: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', t07Content.includes('0919 006 030') && t07Content.includes('UniversalTemplateFooter'));

  // 1.8 BDS-08 BDS08Template (Hưng Lộc Phát Land & NovaWorld Phan Thiết)
  const t08Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/BDS08Template.tsx');
  const t08Content = fs.readFileSync(t08Path, 'utf-8');
  assertTest('BDS-08: Có 6 dự án phân phối tiêu biểu (Phố Mỹ Gold City, Golden Star Q7, Green Star, Eco Green, Silver Star, Diamond Island)', 
    t08Content.includes('PHỐ MỸ GOLD CITY') && t08Content.includes('GOLDEN STAR') && t08Content.includes('BDS08_PROJECTS'));
  assertTest('BDS-08: Có sidebar tải báo giá VIP & box Có thể bạn quan tâm', 
    t08Content.includes('BDS08_SIDEBAR_INTERESTS') && t08Content.includes('CÓ THỂ BẠN QUAN TÂM'));
  assertTest('BDS-08: Có hồ sơ chuyên viên tư vấn Trần Thanh Phương - Hotline 0919 006 030', 
    t08Content.includes('Trần Thanh Phương') && t08Content.includes('0919 006 030'));
  assertTest('BDS-08: Có 3 cột tin tức, hoạt động công ty & vinh danh TOP 10 thương hiệu mạnh uy tín', 
    t08Content.includes('BDS08_NEWS_EVENTS') && t08Content.includes('TOP 10 thương hiệu mạnh'));
  assertTest('BDS-08: Có carousel đối tác và green footer banner NovaWorld Phan Thiết', 
    t08Content.includes('CCI FRANCE') && t08Content.includes('NovaWorld PHAN THIẾT'));
  assertTest('BDS-08: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', 
    t08Content.includes('0919 006 030') && t08Content.includes('UniversalTemplateFooter'));

  // 1.9 BDS-09 BDS09Template (An Viên Yacht & Sky Residence Nha Trang)
  const t09Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/BDS09Template.tsx');
  const t09Content = fs.readFileSync(t09Path, 'utf-8');
  assertTest('BDS-09: Có cấu trúc Tháp Đôi Biểu Tượng Nha Trang Hiện Đại & Bán Đảo An Viên', 
    t09Content.includes('BIỂU TƯỢNG CỦA') && t09Content.includes('NHA TRANG HIỆN ĐẠI') && t09Content.includes('AN VIÊN'));
  assertTest('BDS-09: Có danh mục 6 dòng căn hộ (Studio, 1PN, 2PN, 3PN, Sky Villa Penthouse, Dual Key)', 
    t09Content.includes('BDS09_UNITS') && t09Content.includes('skyvilla') && t09Content.includes('dualkey'));
  assertTest('BDS-09: Có 4 tiện ích sang trọng 5 sao (Grand Lobby, Sky Bar, Hồ bơi vô cực nối 2 tháp, Bến du thuyền)', 
    t09Content.includes('BDS09_AMENITIES') && t09Content.includes('Bến Du Thuyền Quốc Tế Marina'));
  assertTest('BDS-09: Có 5 lý do nên đầu tư tại Nha Trang và thư viện nội thất 6 ô', 
    t09Content.includes('BDS09_INVEST_REASONS') && t09Content.includes('BDS09_INTERIOR_GALLERY'));
  assertTest('BDS-09: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', 
    t09Content.includes('0919 006 030') && t09Content.includes('UniversalTemplateFooter'));

  // 1.10 BDS-10 BDS10Template (Danh Khôi Real Estate - DKRP)
  const t10Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/BDS10Template.tsx');
  const t10Content = fs.readFileSync(t10Path, 'utf-8');
  assertTest('BDS-10: Có cấu trúc DKRP Nhà Mới Của Bạn & Tập đoàn Danh Khôi 15+ năm', 
    t10Content.includes('NHÀ MỚI CỦA BẠN') && t10Content.includes('DKRP') && t10Content.includes('Danh Khôi'));
  assertTest('BDS-10: Có 3 dự án tiêu biểu (Astral City, Aria Đà Nẵng, Barya Citi)', 
    t10Content.includes('ASTRAL CITY') && t10Content.includes('ARIA ĐÀ NẴNG') && t10Content.includes('BARYA CITI'));
  assertTest('BDS-10: Có khối Tại sao chọn chúng tôi & form gửi yêu cầu báo giá mới nhất', 
    t10Content.includes('TẠI SAO CHỌN CHÚNG TÔI') && t10Content.includes('GỬI YÊU CẦU NHẬN BÁO GIÁ'));
  assertTest('BDS-10: Có 3 tin tức mới nhất & strip liên hệ ngay để được tư vấn', 
    t10Content.includes('ĐỌC NHỮNG TIN TỨC MỚI NHẤT') && t10Content.includes('Liên hệ ngay để được tư vấn'));
  assertTest('BDS-10: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', 
    t10Content.includes('0919 006 030') && t10Content.includes('UniversalTemplateFooter'));

  // 1.11 BDS-11 BDS11Template (Nhà Đất Miền Trung - Linkhouse Miền Trung)
  const t11Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/BDS11Template.tsx');
  const t11Content = fs.readFileSync(t11Path, 'utf-8');
  assertTest('BDS-11: Có cấu trúc Nhà Đất Miền Trung & Công ty BĐS Linkhouse Miền Trung', 
    t11Content.includes('NHÀ ĐẤT') && t11Content.includes('MIỀN TRUNG.VN') && t11Content.includes('LINKHOUSE MIỀN TRUNG'));
  assertTest('BDS-11: Có 6 tin BĐS nổi bật (Cẩm Lệ Riverside, Sơn Trà Ocean View, Nhơn Hội New City, Hải Vân, Mỹ Khê, Hòa Xuân)', 
    t11Content.includes('CẨM LỆ RIVERSIDE') && t11Content.includes('SƠN TRÀ OCEAN VIEW') && t11Content.includes('NHƠN HỘI NEW CITY'));
  assertTest('BDS-11: Có 3 dự án Căn hộ cao cấp & 3 Đất nền dự án FPT City, Nam Hòa Xuân', 
    t11Content.includes('FPT CITY') && t11Content.includes('HẢI CHÂU PLAZA') && t11Content.includes('THE SANG RESIDENCE'));
  assertTest('BDS-11: Có form liên hệ trực tiếp chủ đầu tư 2 cột & đối tác (Cocobay, Novaland, Sun Group, Vinhomes)', 
    t11Content.includes('LIÊN HỆ TRỰC TIẾP CHỦ ĐẦU TƯ') && t11Content.includes('COCOBAY') && t11Content.includes('NOVALAND'));
  assertTest('BDS-11: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', 
    t11Content.includes('0919 006 030') && t11Content.includes('UniversalTemplateFooter'));

  // 1.12 BDS-12 BDS12Template (Sonasea Vân Đồn Harbor City - CEO Group)
  const t12Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/BDS12Template.tsx');
  const t12Content = fs.readFileSync(t12Path, 'utf-8');
  assertTest('BDS-12: Có cấu trúc Sonasea Vân Đồn Harbor City 358.5 ha & CEO Group', 
    t12Content.includes('SONASEA') && t12Content.includes('VÂN ĐỒN') && t12Content.includes('CEO GROUP'));
  assertTest('BDS-12: Có 4 dòng sản phẩm (Singapore Shophouse, Wyndham Garden, Silk Path, Ocean Villa)', 
    t12Content.includes('BDS12_UNITS') && t12Content.includes('Singapore Shophouse') && t12Content.includes('Wyndham Garden'));
  assertTest('BDS-12: Có 6 tiện ích 5 sao & 8 mốc kết nối vàng Vịnh Bái Tử Long', 
    t12Content.includes('BDS12_AMENITIES') && t12Content.includes('Sân bay Quốc tế Vân Đồn') && t12Content.includes('Casino Quốc Tế'));
  assertTest('BDS-12: Có chính sách bán hàng chiết khấu 10% & 8 ảnh thực tế tiến độ thi công', 
    t12Content.includes('BDS12_PROGRESS_IMAGES') && t12Content.includes('CHÍNH SÁCH BÁN HÀNG ĐẶC BIỆT ĐỢT 1'));
  assertTest('BDS-12: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', 
    t12Content.includes('0919 006 030') && t12Content.includes('UniversalTemplateFooter'));

  // 1.13 BDS-13 BDS13Template (Đại Phát Land - BĐS Thủy Nguyên Hải Phòng)
  const t13Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/BDS13Template.tsx');
  const t13Content = fs.readFileSync(t13Path, 'utf-8');
  assertTest('BDS-13: Có cấu trúc Đại Phát Land & Bất Động Sản Thủy Nguyên Hải Phòng', 
    t13Content.includes('ĐẠI PHÁT') && t13Content.includes('LAND') && t13Content.includes('THỦY NGUYÊN'));
  assertTest('BDS-13: Có bộ lọc 6 tiêu chí (từ khóa, loại hình, khu vực, mức giá, diện tích, hướng)', 
    t13Content.includes('searchKeyword') && t13Content.includes('filterDistrict') && t13Content.includes('filterPrice'));
  assertTest('BDS-13: Có 2 dự án trọng điểm (Hoàng Huy New City, Belhomes Vsip) & 3 dự án mới nổi bật', 
    t13Content.includes('Hoàng Huy New City') && t13Content.includes('Belhomes Vsip') && t13Content.includes('Shophouse Hoàng Huy Grand Tower'));
  assertTest('BDS-13: Có 6 lý do chọn BĐS Thủy Nguyên & banner Tái định cư Bắc Sông Cấm', 
    t13Content.includes('VÌ SAO CHỌN BĐS THỦY NGUYÊN') && t13Content.includes('TÁI ĐỊNH CƯ BẮC SÔNG CẤM'));
  assertTest('BDS-13: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', 
    t13Content.includes('0919 006 030') && t13Content.includes('UniversalTemplateFooter'));

  // 1.14 BDS-14 BDS14Template (WintLand Real Estate Platform)
  const t14Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/BDS14Template.tsx');
  const t14Content = fs.readFileSync(t14Path, 'utf-8');
  assertTest('BDS-14: Có cấu trúc WintLand Real Estate Platform & Tìm kiếm BĐS mơ ước', 
    t14Content.includes('WINTLAND') && t14Content.includes('REAL ESTATE') && t14Content.includes('TÌM KIẾM BẤT ĐỘNG SẢN MƠ ƯỚC'));
  assertTest('BDS-14: Có bộ lọc 5 tiêu chí nền xanh lá (loại BĐS, thành phố, giá, diện tích, bán/thuê)', 
    t14Content.includes('filterType') && t14Content.includes('filterCity') && t14Content.includes('filterPrice'));
  assertTest('BDS-14: Có 4 trụ cột dịch vụ (Đa dạng nguồn hàng, Pháp lý minh bạch, Tư vấn tài chính, Hỗ trợ 24/7)', 
    t14Content.includes('Đa Dạng Nguồn Hàng') && t14Content.includes('Pháp Lý Minh Bạch') && t14Content.includes('Tư Vấn Tài Chính'));
  assertTest('BDS-14: Có 5 thị trường nổi bật (Huế, Đà Nẵng, Nha Trang, Hà Nội, TP.HCM) & form đăng tin', 
    t14Content.includes('THỊ TRƯỜNG NỔI BẬT NHẤT') && t14Content.includes('Huế') && t14Content.includes('Đà Nẵng'));
  assertTest('BDS-14: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', 
    t14Content.includes('0919 006 030') && t14Content.includes('UniversalTemplateFooter'));

  // 1.15 BDS-15 BDS15Template (Lupul Group Real Estate Investment)
  const t15Path = path.join(rootDir, 'apps/marketplace/src/components/demo/templates/BDS15Template.tsx');
  const t15Content = fs.readFileSync(t15Path, 'utf-8');
  assertTest('BDS-15: Có cấu trúc Lupul Group Real Estate & EcoLake biệt thự nghỉ dưỡng sinh thái', 
    t15Content.includes('LUPUL') && t15Content.includes('GROUP') && t15Content.includes('EcoLake'));
  assertTest('BDS-15: Có banner gói vay mua nhà an cư 5.99% & hotline 0982.078.203', 
    t15Content.includes('5.99%/NĂM') && t15Content.includes('0982.078.203'));
  assertTest('BDS-15: Có 4 dự án tiêu biểu & 3 banner EcoLake City, Palm Villa, Wyndham Gardens', 
    t15Content.includes('The Flora Avenue') && t15Content.includes('EcoLake City') && t15Content.includes('Wyndham Gardens'));
  assertTest('BDS-15: Có video đầu tư BĐS dòng tiền & 2 cột tư vấn chuyên gia phong thủy', 
    t15Content.includes('GÓC CHUYÊN GIA BẤT ĐỘNG SẢN') && t15Content.includes('TƯ VẤN PHÁP LÝ & PHONG THỦY'));
  assertTest('BDS-15: Header & Footer dùng chuẩn TEMPLATESBDS Admin với hotline 0919 006 030', 
    t15Content.includes('0919 006 030') && t15Content.includes('UniversalTemplateFooter'));

  console.log('\n─────────────────────────────────────────────────────────────');
  console.log('📁 PHẦN 2: KIỂM TRA FILE STANDALONE HTML5 & PHP CỦA 15 TEMPLATES');
  console.log('─────────────────────────────────────────────────────────────');

  const templateFolders = [
    'bds-01',
    'bds-02',
    'bds-03',
    'bds-04',
    'bds-05',
    'bds-06',
    'bds-07',
    'bds-08',
    'bds-09',
    'bds-10',
    'bds-11',
    'bds-12',
    'bds-13',
    'bds-14',
    'bds-15',
    'bds-16',
    'bds-17',
    'bds-18',
    'bds-19',
    'bds-20',
    'bds-21',
    'bds-22',
    'bds-23',
    'bds-24'
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
    assertTest(`${folder}: File database.sql chứa cấu trúc bảng properties & contacts/leads`, fs.existsSync(sqlFile) && fs.readFileSync(sqlFile, 'utf-8').includes('CREATE TABLE'));
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
    { url: 'http://localhost:3000/demo/bds-06', name: 'BDS-06 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-06/can-ho', name: 'BDS-06 Trang con Căn Hộ' },
    { url: 'http://localhost:3000/demo/bds-06/shophouse', name: 'BDS-06 Trang con Shophouse' },
    { url: 'http://localhost:3000/demo/bds-06/biet-thu', name: 'BDS-06 Trang con Biệt Thự' },
    { url: 'http://localhost:3000/demo/bds-06/tien-ich', name: 'BDS-06 Trang con Tiện Ích' },
    { url: 'http://localhost:3000/demo/bds-06/chinh-sach', name: 'BDS-06 Trang con Chính Sách' },
    { url: 'http://localhost:3000/demo/bds-06/tin-tuc', name: 'BDS-06 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-07', name: 'BDS-07 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-07/dat-vuon', name: 'BDS-07 Trang con Đất Vườn' },
    { url: 'http://localhost:3000/demo/bds-07/bungalow', name: 'BDS-07 Trang con Bungalow Gỗ' },
    { url: 'http://localhost:3000/demo/bds-07/biet-thu', name: 'BDS-07 Trang con Biệt Thự Đồi' },
    { url: 'http://localhost:3000/demo/bds-07/tien-ich', name: 'BDS-07 Trang con Tiện Ích' },
    { url: 'http://localhost:3000/demo/bds-07/thu-vien', name: 'BDS-07 Trang con Thư Viện' },
    { url: 'http://localhost:3000/demo/bds-07/tin-tuc', name: 'BDS-07 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-07/ky-gui', name: 'BDS-07 Trang con Ký Gửi' },
    { url: 'http://localhost:3000/demo/bds-08', name: 'BDS-08 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-08/gioi-thieu', name: 'BDS-08 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-08/du-an', name: 'BDS-08 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-08/tin-tuc', name: 'BDS-08 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-08/hoat-dong', name: 'BDS-08 Trang con Hoạt Động' },
    { url: 'http://localhost:3000/demo/bds-08/tuyen-dung', name: 'BDS-08 Trang con Tuyển Dụng' },
    { url: 'http://localhost:3000/demo/bds-08/lien-he', name: 'BDS-08 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-09', name: 'BDS-09 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-09/tong-quan', name: 'BDS-09 Trang con Tổng Quan' },
    { url: 'http://localhost:3000/demo/bds-09/vi-tri', name: 'BDS-09 Trang con Vị Trí' },
    { url: 'http://localhost:3000/demo/bds-09/mat-bang', name: 'BDS-09 Trang con Mặt Bằng' },
    { url: 'http://localhost:3000/demo/bds-09/san-pham', name: 'BDS-09 Trang con Sản Phẩm' },
    { url: 'http://localhost:3000/demo/bds-09/tien-ich', name: 'BDS-09 Trang con Tiện Ích' },
    { url: 'http://localhost:3000/demo/bds-09/ly-do-dau-tu', name: 'BDS-09 Trang con Lý Do Đầu Tư' },
    { url: 'http://localhost:3000/demo/bds-09/thu-vien', name: 'BDS-09 Trang con Thư Viện' },
    { url: 'http://localhost:3000/demo/bds-09/lien-he', name: 'BDS-09 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-10', name: 'BDS-10 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-10/gioi-thieu', name: 'BDS-10 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-10/du-an', name: 'BDS-10 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-10/tin-tuc', name: 'BDS-10 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-10/ky-gui', name: 'BDS-10 Trang con Ký Gửi' },
    { url: 'http://localhost:3000/demo/bds-10/lien-he', name: 'BDS-10 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-11', name: 'BDS-11 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-11/gioi-thieu', name: 'BDS-11 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-11/du-an', name: 'BDS-11 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-11/dat-nen', name: 'BDS-11 Trang con Đất Nền' },
    { url: 'http://localhost:3000/demo/bds-11/can-ho', name: 'BDS-11 Trang con Căn Hộ' },
    { url: 'http://localhost:3000/demo/bds-11/nha-pho', name: 'BDS-11 Trang con Nhà Phố' },
    { url: 'http://localhost:3000/demo/bds-11/thu-vien', name: 'BDS-11 Trang con Thư Viện' },
    { url: 'http://localhost:3000/demo/bds-11/lien-he', name: 'BDS-11 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-12', name: 'BDS-12 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-12/tong-quan', name: 'BDS-12 Trang con Tổng Quan' },
    { url: 'http://localhost:3000/demo/bds-12/vi-tri', name: 'BDS-12 Trang con Vị Trí' },
    { url: 'http://localhost:3000/demo/bds-12/tien-ich', name: 'BDS-12 Trang con Tiện Ích' },
    { url: 'http://localhost:3000/demo/bds-12/mat-bang', name: 'BDS-12 Trang con Mặt Bằng' },
    { url: 'http://localhost:3000/demo/bds-12/bang-gia', name: 'BDS-12 Trang con Bảng Giá' },
    { url: 'http://localhost:3000/demo/bds-12/tien-do', name: 'BDS-12 Trang con Tiến Độ' },
    { url: 'http://localhost:3000/demo/bds-12/lien-he', name: 'BDS-12 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-13', name: 'BDS-13 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-13/gioi-thieu', name: 'BDS-13 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-13/nha-dat-ban', name: 'BDS-13 Trang con Nhà Đất Bán' },
    { url: 'http://localhost:3000/demo/bds-13/nha-dat-cho-thue', name: 'BDS-13 Trang con Nhà Đất Cho Thuê' },
    { url: 'http://localhost:3000/demo/bds-13/du-an', name: 'BDS-13 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-13/ky-gui', name: 'BDS-13 Trang con Ký Gửi' },
    { url: 'http://localhost:3000/demo/bds-13/tin-tuc', name: 'BDS-13 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-13/lien-he', name: 'BDS-13 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-14', name: 'BDS-14 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-14/gioi-thieu', name: 'BDS-14 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-14/bat-dong-san-ban', name: 'BDS-14 Trang con BĐS Bán' },
    { url: 'http://localhost:3000/demo/bds-14/cho-thue', name: 'BDS-14 Trang con Cho Thuê' },
    { url: 'http://localhost:3000/demo/bds-14/du-an', name: 'BDS-14 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-14/dang-tin', name: 'BDS-14 Trang con Đăng Tin' },
    { url: 'http://localhost:3000/demo/bds-14/tin-tuc', name: 'BDS-14 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-14/lien-he', name: 'BDS-14 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-15', name: 'BDS-15 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-15/gioi-thieu', name: 'BDS-15 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-15/bat-dong-san-ban', name: 'BDS-15 Trang con BĐS Bán' },
    { url: 'http://localhost:3000/demo/bds-15/du-an', name: 'BDS-15 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-15/nha-dat-cho-thue', name: 'BDS-15 Trang con Cho Thuê' },
    { url: 'http://localhost:3000/demo/bds-15/phong-thuy', name: 'BDS-15 Trang con Phong Thủy' },
    { url: 'http://localhost:3000/demo/bds-15/tin-tuc', name: 'BDS-15 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-15/lien-he', name: 'BDS-15 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-16', name: 'BDS-16 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-16/gioi-thieu', name: 'BDS-16 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-16/nha-ban', name: 'BDS-16 Trang con Nhà Bán' },
    { url: 'http://localhost:3000/demo/bds-16/nha-cho-thue', name: 'BDS-16 Trang con Nhà Cho Thuê' },
    { url: 'http://localhost:3000/demo/bds-16/huong-dan', name: 'BDS-16 Trang con Hướng Dẫn' },
    { url: 'http://localhost:3000/demo/bds-16/tin-tuc', name: 'BDS-16 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-16/lien-he', name: 'BDS-16 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-17', name: 'BDS-17 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-17/tong-quan', name: 'BDS-17 Trang con Tổng Quan' },
    { url: 'http://localhost:3000/demo/bds-17/vi-tri', name: 'BDS-17 Trang con Vị Trí' },
    { url: 'http://localhost:3000/demo/bds-17/tien-ich', name: 'BDS-17 Trang con Tiện Ích' },
    { url: 'http://localhost:3000/demo/bds-17/mat-bang', name: 'BDS-17 Trang con Mặt Bằng' },
    { url: 'http://localhost:3000/demo/bds-17/can-ho-mau', name: 'BDS-17 Trang con Căn Hộ Mẫu' },
    { url: 'http://localhost:3000/demo/bds-17/chinh-sach', name: 'BDS-17 Trang con Chính Sách' },
    { url: 'http://localhost:3000/demo/bds-17/tien-do', name: 'BDS-17 Trang con Tiến Độ' },
    { url: 'http://localhost:3000/demo/bds-17/video', name: 'BDS-17 Trang con Video' },
    { url: 'http://localhost:3000/demo/bds-17/tin-tuc', name: 'BDS-17 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-17/lien-he', name: 'BDS-17 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-18', name: 'BDS-18 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-18/gioi-thieu', name: 'BDS-18 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-18/dich-vu', name: 'BDS-18 Trang con Dịch Vụ' },
    { url: 'http://localhost:3000/demo/bds-18/du-an', name: 'BDS-18 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-18/giai-thuong', name: 'BDS-18 Trang con Giải Thưởng' },
    { url: 'http://localhost:3000/demo/bds-18/bao-gia', name: 'BDS-18 Trang con Báo Giá' },
    { url: 'http://localhost:3000/demo/bds-18/tin-tuc', name: 'BDS-18 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-18/lien-he', name: 'BDS-18 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-19', name: 'BDS-19 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-19/tong-quan', name: 'BDS-19 Trang con Tổng Quan' },
    { url: 'http://localhost:3000/demo/bds-19/vi-tri', name: 'BDS-19 Trang con Vị Trí' },
    { url: 'http://localhost:3000/demo/bds-19/tien-ich', name: 'BDS-19 Trang con Tiện Ích' },
    { url: 'http://localhost:3000/demo/bds-19/can-ho-40', name: 'BDS-19 Trang con Căn Hộ 4.0' },
    { url: 'http://localhost:3000/demo/bds-19/mat-bang', name: 'BDS-19 Trang con Mặt Bằng' },
    { url: 'http://localhost:3000/demo/bds-19/tin-tuc', name: 'BDS-19 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-19/lien-he', name: 'BDS-19 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-20', name: 'BDS-20 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-20/tong-quan', name: 'BDS-20 Trang con Tổng Quan' },
    { url: 'http://localhost:3000/demo/bds-20/vi-tri', name: 'BDS-20 Trang con Vị Trí' },
    { url: 'http://localhost:3000/demo/bds-20/tien-ich', name: 'BDS-20 Trang con Tiện Ích' },
    { url: 'http://localhost:3000/demo/bds-20/khong-gian-xanh', name: 'BDS-20 Trang con Không Gian Xanh' },
    { url: 'http://localhost:3000/demo/bds-20/mat-bang', name: 'BDS-20 Trang con Mặt Bằng' },
    { url: 'http://localhost:3000/demo/bds-20/can-ho-mau', name: 'BDS-20 Trang con Căn Hộ Mẫu' },
    { url: 'http://localhost:3000/demo/bds-20/chinh-sach', name: 'BDS-20 Trang con Chính Sách' },
    { url: 'http://localhost:3000/demo/bds-20/tin-tuc', name: 'BDS-20 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-20/lien-he', name: 'BDS-20 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-21', name: 'BDS-21 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-21/gioi-thieu', name: 'BDS-21 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-21/bat-dong-san-ban', name: 'BDS-21 Trang con BĐS Bán' },
    { url: 'http://localhost:3000/demo/bds-21/cho-thue', name: 'BDS-21 Trang con Cho Thuê' },
    { url: 'http://localhost:3000/demo/bds-21/du-an', name: 'BDS-21 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-21/khu-vuc', name: 'BDS-21 Trang con Khu Vực' },
    { url: 'http://localhost:3000/demo/bds-21/dang-tin', name: 'BDS-21 Trang con Đăng Tin' },
    { url: 'http://localhost:3000/demo/bds-21/tin-tuc', name: 'BDS-21 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-21/lien-he', name: 'BDS-21 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-22', name: 'BDS-22 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-22/tong-quan', name: 'BDS-22 Trang con Tổng Quan' },
    { url: 'http://localhost:3000/demo/bds-22/vi-tri', name: 'BDS-22 Trang con Vị Trí' },
    { url: 'http://localhost:3000/demo/bds-22/tien-ich', name: 'BDS-22 Trang con Tiện Ích' },
    { url: 'http://localhost:3000/demo/bds-22/biet-thu-bien', name: 'BDS-22 Trang con Biệt Thự Biển' },
    { url: 'http://localhost:3000/demo/bds-22/condotel', name: 'BDS-22 Trang con Condotel' },
    { url: 'http://localhost:3000/demo/bds-22/chinh-sach', name: 'BDS-22 Trang con Chính Sách' },
    { url: 'http://localhost:3000/demo/bds-22/tin-tuc', name: 'BDS-22 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-22/lien-he', name: 'BDS-22 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-23', name: 'BDS-23 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-23/gioi-thieu', name: 'BDS-23 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-23/du-an', name: 'BDS-23 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-23/thu-vien', name: 'BDS-23 Trang con Thư Viện' },
    { url: 'http://localhost:3000/demo/bds-23/kien-thuc', name: 'BDS-23 Trang con Kiến Thức' },
    { url: 'http://localhost:3000/demo/bds-23/tuyen-dung', name: 'BDS-23 Trang con Tuyển Dụng' },
    { url: 'http://localhost:3000/demo/bds-23/tin-tuc', name: 'BDS-23 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-23/lien-he', name: 'BDS-23 Trang con Liên Hệ' },
    { url: 'http://localhost:3000/demo/bds-24', name: 'BDS-24 Trang chủ' },
    { url: 'http://localhost:3000/demo/bds-24/gioi-thieu', name: 'BDS-24 Trang con Giới Thiệu' },
    { url: 'http://localhost:3000/demo/bds-24/du-an', name: 'BDS-24 Trang con Dự Án' },
    { url: 'http://localhost:3000/demo/bds-24/do-thi-thong-minh', name: 'BDS-24 Trang con Đô Thị Thông Minh' },
    { url: 'http://localhost:3000/demo/bds-24/proptech-40', name: 'BDS-24 Trang con PropTech 4.0' },
    { url: 'http://localhost:3000/demo/bds-24/ban-do-quy-hoach', name: 'BDS-24 Trang con Bản Đồ Quy Hoạch' },
    { url: 'http://localhost:3000/demo/bds-24/tin-tuc', name: 'BDS-24 Trang con Tin Tức' },
    { url: 'http://localhost:3000/demo/bds-24/lien-he', name: 'BDS-24 Trang con Liên Hệ' },
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
