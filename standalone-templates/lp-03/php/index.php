<?php
require_once 'config/db.php';
$companyName = 'LP #03 - Đất Nền Phân Lô F0 Sổ Đỏ Trao Tay';
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
        <a href="tel:<?php echo preg_replace('/\s+/', '', $hotline); ?>" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase rounded-xl shadow">
          📞 <?php echo htmlspecialchars($hotline); ?>
        </a>
      </div>
    </div>
  </header>

  <main class="flex-1 w-full space-y-16 pb-20">
    <section class="relative py-24 px-4 text-center border-b border-slate-800">
      <div class="max-w-5xl mx-auto space-y-6">
        <span class="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-black uppercase tracking-widest inline-block">
          SỔ ĐỎ TRAO TAY — CÔNG CHỨNG NGAY
        </span>
        <h1 class="text-3xl sm:text-5xl font-black text-white leading-tight uppercase">
          ĐẤT NỀN ĐÔ THỊ TRỌNG ĐIỂM GIÁ GỐC F0
        </h1>
        <p class="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto">
          Hạ tầng hoàn thiện 100%, đường nhựa 16m - 24m, công viên trường học hiện hữu, vị trí đắc địa liền kề cao tốc và trung tâm hành chính.
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
</html>