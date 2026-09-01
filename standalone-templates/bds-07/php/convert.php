<?php
$html = file_get_contents('e:\BĐS Template\standalone-templates\bds-07\html\index.html');

$phpHeader = <<<'PHP'
<?php
require_once 'config/db.php';

// Default company info
$company = [
    'name' => 'TEMPLATESBDS',
    'phone' => '0919 006 030',
    'email' => 'info@templatesbds.com',
    'address' => 'Làng Sinh Thái Pannamera, Xã Lộc Tân, TP. Bảo Lộc, Lâm Đồng',
    'slogan' => 'LÀNG SINH THÁI NGHỈ DƯỠNG',
    'zalo' => '0919006030'
];

$projects = [
    [
        'name' => 'Lô Đất Vườn Nghỉ Dưỡng Săn Mây View Đồi Thông Tuyệt Mỹ',
        'type' => 'Đất Vườn Săn Mây • Phân Khu Săn Mây A1',
        'area' => '250.0 m²',
        'direction' => 'Đông Nam',
        'price' => '890 Triệu VNĐ',
        'image_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
        'badge_text' => 'SUẤT NGOẠI GIAO'
    ],
    [
        'name' => 'Lô Góc 2 Mặt Tiền Suối Tự Nhiên & Đồi Chè Xanh Bát Ngát',
        'type' => 'Đất Vườn Sinh Thái • Phân Khu Ven Suối B2',
        'area' => '350.0 m²',
        'direction' => 'Nam - Đông Nam',
        'price' => '1.25 Tỷ VNĐ',
        'image_url' => 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
        'badge_text' => 'VIEW SUỐI HIẾM'
    ],
    [
        'name' => 'Nhà Vườn Bungalow Gỗ Mẫu Hoàn Thiện Full Sân Vườn',
        'type' => 'Bungalow Nghỉ Dưỡng • Phân Khu Trung Tâm C1',
        'area' => '300.0 m²',
        'direction' => 'Đông',
        'price' => '1.45 Tỷ VNĐ',
        'image_url' => 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
        'badge_text' => 'XÂY SẴN CHÌA KHÓA TRAO TAY'
    ],
    [
        'name' => 'Biệt Thự Vườn Sinh Thái Panorama View 360 Độ Đồi Chè',
        'type' => 'Biệt Thự Đồi • Phân Khu Sunset Villa',
        'area' => '500.0 m²',
        'direction' => 'Đông Bắc',
        'price' => '1.85 Tỷ VNĐ',
        'image_url' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        'badge_text' => 'VIEW PANORAMA 360'
    ]
];

if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch()) {
            $company = $row;
        }
        
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id ASC");
        $db_projects = $stmt->fetchAll();
        if ($db_projects) {
            $projects = $db_projects;
        }
    } catch (PDOException $e) {
        // Fallback to defaults
    }
}
?>
PHP;

$html = str_replace('0919 006 030', '<?= htmlspecialchars($company["phone"]) ?>', $html);
$html = str_replace('0919006030', '<?= htmlspecialchars($company["zalo"]) ?>', $html);
$html = str_replace('info@templatesbds.com', '<?= htmlspecialchars($company["email"]) ?>', $html);
$html = str_replace('Làng Sinh Thái Pannamera, Xã Lộc Tân, TP. Bảo Lộc, Lâm Đồng', '<?= htmlspecialchars($company["address"]) ?>', $html);

// We should be careful replacing TEMPLATESBDS because it might be in URLs or image alt text, but let's replace it in the text.
$html = str_replace('>TEMPLATESBDS<', '><?= htmlspecialchars($company["name"]) ?><', $html);
$html = str_replace(' TEMPLATESBDS', ' <?= htmlspecialchars($company["name"]) ?>', $html);
$html = str_replace('LÀNG SINH THÁI NGHỈ DƯỠNG', '<?= htmlspecialchars($company["slogan"]) ?>', $html);

// Now the projects grid block
$projectPHP = <<<'PHP'
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <?php foreach ($projects as $project): ?>
                    <div class="bg-white rounded-sm overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
                        <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
                            <img src="<?= htmlspecialchars($project['image_url']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#047857] text-white text-[10px] font-black uppercase shadow"><?= htmlspecialchars($project['badge_text']) ?></div>
                            <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#022C22]/90 text-amber-300 text-xs font-black backdrop-blur"><?= htmlspecialchars($project['price']) ?></div>
                        </div>
                        <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
                            <div>
                                <span class="text-[10px] uppercase font-bold text-slate-400 block"><?= htmlspecialchars($project['type']) ?></span>
                                <h4 class="font-extrabold text-sm text-slate-900 line-clamp-2 mt-1 group-hover:text-emerald-700 transition-colors"><?= htmlspecialchars($project['name']) ?></h4>
                            </div>
                            <div class="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-center text-xs">
                                <div><span class="text-[10px] text-slate-400 block font-medium">Diện tích</span><strong class="text-slate-800 font-extrabold"><?= htmlspecialchars($project['area']) ?></strong></div>
                                <div><span class="text-[10px] text-slate-400 block font-medium">Hướng đất</span><strong class="text-slate-800 font-extrabold"><?= htmlspecialchars($project['direction']) ?></strong></div>
                            </div>
                            <a href="#lead-form-section" class="block w-full py-2.5 bg-[#047857] hover:bg-[#065F46] text-white text-xs font-extrabold rounded-sm shadow transition-colors uppercase tracking-wider text-center">Xem Sổ Đỏ & Mặt Bằng</a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
PHP;

$pattern = '/<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">.*?<\/div>\s*<\/div>\s*<\/section>/s';
$html = preg_replace($pattern, $projectPHP, $html);

file_put_contents('e:\BĐS Template\standalone-templates\bds-07\php\index.php', $phpHeader . "\n" . $html);
echo "Done";
?>
