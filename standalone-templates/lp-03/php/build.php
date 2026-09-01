<?php

$html = file_get_contents('../html/index.html');

$phpHeader = <<<'PHP'
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

PHP;

// Replacements
$replacements = [
    // Header
    '0919 006 030' => '<?= htmlspecialchars($company["phone"] ?? "0919 006 030") ?>',
    'SIMPLE PAGE' => '<?= htmlspecialchars($company["name"] ?? "SIMPLE PAGE") ?>',
    '"Đẳng Cấp Không Gian Sống — Khẳng Định Vị Thế Thượng Lưu"' => '<?= htmlspecialchars($company["slogan"] ?? "\"Đẳng Cấp Không Gian Sống — Khẳng Định Vị Thế Thượng Lưu\"") ?>',
    'admin@templatesbds.com' => '<?= htmlspecialchars($company["email"] ?? "admin@templatesbds.com") ?>',
    'Đại Lộ Trung Tâm Đô Thị Mới, Quận Nam Từ Liêm, Hà Nội / TP.HCM' => '<?= htmlspecialchars($company["address"] ?? "Đại Lộ Trung Tâm Đô Thị Mới, Quận Nam Từ Liêm, Hà Nội / TP.HCM") ?>',
    'https://zalo.me/0919 006 030' => '<?= htmlspecialchars($company["zalo"] ?? "https://zalo.me/0919006030") ?>',
    
    // Select options (for forms)
    '<option class="text-slate-900 bg-white font-medium" value="Căn Hộ 1 Phòng Ngủ (48.5 m²)">Căn Hộ 1 Phòng Ngủ (48.5 m²)</option>
                <option class="text-slate-900 bg-white font-medium" value="Căn Hộ 2 Phòng Ngủ (68m² - 75m²)" selected>Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)</option>
                <option class="text-slate-900 bg-white font-medium" value="Căn Hộ 3 Phòng Ngủ Master (92m² - 110m²)">Căn Hộ 3 Phòng Ngủ Master (92.0 m² - 110.0 m²)</option>
                <option class="text-slate-900 bg-white font-medium" value="Penthouse & Sky Villa (145m²)">Penthouse & Sky Villa (145.0 m²)</option>' => 
    '<?php foreach ($projects as $idx => $p): ?>
                <option class="text-slate-900 bg-white font-medium" value="<?= htmlspecialchars($p["full_name"]) ?>" <?= $idx === 1 ? "selected" : "" ?>><?= htmlspecialchars($p["full_name"]) ?></option>
                <?php endforeach; ?>',
                
    '<option class="text-slate-900 bg-white font-medium" value="Căn Hộ 1 Phòng Ngủ (48.5 m²)">Căn Hộ 1 Phòng Ngủ (48.5 m²)</option>
              <option class="text-slate-900 bg-white font-medium" value="Căn Hộ 2 Phòng Ngủ (68m² - 75m²)" selected>Căn Hộ 2 Phòng Ngủ (68.0 m² - 75.5 m²)</option>
              <option class="text-slate-900 bg-white font-medium" value="Căn Hộ 3 Phòng Ngủ Master (92m² - 110m²)">Căn Hộ 3 Phòng Ngủ Master (92.0 m² - 110.0 m²)</option>
              <option class="text-slate-900 bg-white font-medium" value="Penthouse & Sky Villa (145m²)">Penthouse & Sky Villa (145.0 m²)</option>' =>
    '<?php foreach ($projects as $idx => $p): ?>
              <option class="text-slate-900 bg-white font-medium" value="<?= htmlspecialchars($p["full_name"]) ?>" <?= $idx === 1 ? "selected" : "" ?>><?= htmlspecialchars($p["full_name"]) ?></option>
              <?php endforeach; ?>',
];

$html = str_replace(array_keys($replacements), array_values($replacements), $html);

// Handle the 10. GIỎ HÀNG section dynamically
$gioHangPattern = '/<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">.*?<\/div>\s*<\/div>\s*<\/section>/s';
$gioHangReplacement = <<<'HTML'
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
HTML;

$html = preg_replace($gioHangPattern, $gioHangReplacement, $html);

// Remove the `e.preventDefault();` from form submits if they are simulating.
// Wait, the user wants the form action to be `api/contact.php`. But the existing JS might simulate it. 
// "Form action is api/contact.php method POST".
// The existing JS has:
// fetch('api/contact.php', { method: 'POST', body: new FormData(this) })
// That's actually correct! It submits via AJAX, which is what we want for seamless UX. No need to remove e.preventDefault().

$finalContent = $phpHeader . ltrim($html);

file_put_contents('index.php', $finalContent);

echo "Done\n";

