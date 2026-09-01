import re

with open('e:/BĐS Template/standalone-templates/lp-05/html/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

php_head = """<?php
require_once 'config/db.php';

$company = [
    'name' => 'GOLDEN PARK TOWER CẦU GIẤY',
    'phone' => '0919 006 030',
    'email' => 'admin@templatesbds.com',
    'address' => 'Ngã tư Dương Đình Nghệ & Phạm Văn Bạch, KĐT Cầu Giấy, Yên Hòa, Cầu Giấy, Hà Nội',
    'slogan' => 'TỔ HỢP CĂN HỘ CAO CẤP & KHÁCH SẠN 5 SAO CẦU GIẤY',
    'zalo' => '0919006030'
];

$projects = [
    ['code' => 'CĂN SỐ 01', 'title' => 'Căn Hộ 2 Phòng Ngủ', 'description' => '2PN · 2WC · 2 Logia', 'price' => 'Giá: Từ 3.4 Tỷ', 'area' => '82.6 m²', 'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    ['code' => 'CĂN SỐ 02', 'title' => 'Căn Hộ 2PN + 1 Đa Năng', 'description' => '2PN + 1 · 2WC · Ban công lớn', 'price' => 'Giá: Từ 3.8 Tỷ', 'area' => '91.8 m²', 'image' => 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
    ['code' => 'CĂN SỐ 03', 'title' => 'Căn Hộ 3 Phòng Ngủ', 'description' => '3PN · 2WC · Bếp riêng', 'price' => 'Giá: Từ 4.2 Tỷ', 'area' => '100.2 m²', 'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    ['code' => 'CĂN SỐ 04', 'title' => 'Căn Hộ 3PN Góc Thoáng', 'description' => '3PN · 2WC · 2 Mặt thoáng', 'price' => 'Giá: Từ 4.5 Tỷ', 'area' => '105.6 m²', 'image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
    ['code' => 'CĂN SỐ 05', 'title' => 'Căn Hộ 3PN Master VIP', 'description' => '3PN · 3WC · Phòng thay đồ', 'price' => 'Giá: Từ 5.1 Tỷ', 'area' => '116.0 m²', 'image' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
    ['code' => 'CĂN SỐ 06', 'title' => 'Căn Hộ 3PN Panorama', 'description' => '3PN · 3WC · View công viên', 'price' => 'Giá: Từ 5.6 Tỷ', 'area' => '125.4 m²', 'image' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'],
    ['code' => 'CĂN SỐ 07', 'title' => 'Căn Hộ 4 Phòng Ngủ Luxury', 'description' => '4PN · 3WC · 3 Ban công', 'price' => 'Giá: Từ 6.2 Tỷ', 'area' => '132.5 m²', 'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
    ['code' => 'CĂN SỐ 08', 'title' => 'Duplex Thông Tầng', 'description' => '4PN · 4WC · Sân vườn riêng', 'price' => 'Giá: Từ 8.9 Tỷ', 'area' => '185.0 m²', 'image' => 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80'],
    ['code' => 'CĂN SỐ 09', 'title' => 'Penthouse Hoàng Gia', 'description' => '5PN · 5WC · Bể bơi chân mây', 'price' => 'Giá: Từ 12.5 Tỷ', 'area' => '235.0 m²', 'image' => 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80']
];

if (isset($pdo)) {
    try {
        $stmt = $pdo->query('SELECT * FROM company_info LIMIT 1');
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company = array_merge($company, array_filter($row));
        }

        $stmt = $pdo->query('SELECT * FROM projects ORDER BY id ASC');
        $db_projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($db_projects && count($db_projects) > 0) {
            $projects = $db_projects;
        }
    } catch (PDOException $e) {
        // Fallback to static data
    }
}
?>
"""

# Replace static values with variables
html = html.replace('GOLDEN PARK TOWER CẦU GIẤY', '<?= htmlspecialchars($company["name"]) ?>')
html = html.replace('GOLDEN PARK TOWER', '<?= htmlspecialchars($company["name"]) ?>')
html = html.replace('0919 006 030', '<?= htmlspecialchars($company["phone"]) ?>')
html = html.replace('0919006030', '<?= htmlspecialchars($company["zalo"]) ?>')
html = html.replace('admin@templatesbds.com', '<?= htmlspecialchars($company["email"]) ?>')
html = html.replace('Ngã tư Dương Đình Nghệ & Phạm Văn Bạch, KĐT Cầu Giấy, Yên Hòa, Cầu Giấy, Hà Nội', '<?= htmlspecialchars($company["address"]) ?>')
html = html.replace('TỔ HỢP CĂN HỘ CAO CẤP & KHÁCH SẠN 5 SAO CẦU GIẤY', '<?= htmlspecialchars($company["slogan"]) ?>')

# The hero select options
hero_options = """<?php foreach ($projects as $project): ?>
                                <option value="<?= htmlspecialchars($project['title'] . ' (' . $project['area'] . ')') ?>">
                                    <?= htmlspecialchars($project['code'] . ': ' . $project['title'] . ' (' . $project['area'] . ')') ?>
                                </option>
                                <?php endforeach; ?>"""

html = re.sub(r'<select id="hero-unit-select".*?</select>', 
              '<select id="hero-unit-select" name="unit_type" class="w-full px-3.5 py-2.5 bg-white text-slate-900 font-black border border-slate-300 outline-none transition-all duration-300">\n' + hero_options + '\n                            </select>',
              html, flags=re.DOTALL)

# Bottom select options
bottom_options = """<?php foreach ($projects as $project): ?>
                        <option value="<?= htmlspecialchars($project['title'] . ' (' . $project['area'] . ')') ?>">
                            <?= htmlspecialchars($project['code'] . ': ' . $project['title'] . ' (' . $project['area'] . ')') ?>
                        </option>
                        <?php endforeach; ?>"""
                        
html = re.sub(r'<select id="bottom-unit-select".*?</select>', 
              '<select id="bottom-unit-select" name="unit_type" class="px-4 py-3 bg-white text-slate-900 font-bold border border-slate-300 outline-none">\n' + bottom_options + '\n                    </select>',
              html, flags=re.DOTALL)


# Projects loop
projects_grid_regex = r'<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">.*?</div>\s*</div>\s*</section>'
projects_php = """<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($projects as $project): ?>
                <div class="bg-white border-2 border-slate-200 hover:border-[#C59B27] transition-all flex flex-col justify-between text-left group shadow-xs hover:shadow-lg">
                    <div class="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer" onclick="openLightbox('<?= htmlspecialchars($project['image']) ?>')">
                        <img src="<?= htmlspecialchars($project['image']) ?>" alt="<?= htmlspecialchars($project['title']) ?>" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <div class="absolute top-2 left-2 px-2.5 py-1 bg-[#0A2E28] text-amber-300 font-bold text-[10px]"><?= htmlspecialchars($project['code']) ?></div>
                        <div class="absolute top-2 right-2 px-2 py-1 bg-[#C53030] text-white font-bold text-[10px]"><?= htmlspecialchars($project['area']) ?></div>
                    </div>
                    <div class="p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-[#FFFDF9]">
                        <div class="space-y-1">
                            <h4 class="font-black text-sm text-[#0A2E28] group-hover:text-red-700 transition-colors"><?= htmlspecialchars($project['title']) ?></h4>
                            <p class="text-xs text-slate-600 font-medium"><?= htmlspecialchars($project['description']) ?></p>
                            <p class="text-sm font-black text-[#C53030]"><?= htmlspecialchars($project['price']) ?></p>
                        </div>
                        <button type="button" onclick="handleSelectUnit('<?= htmlspecialchars($project['title'] . ' (' . $project['area'] . ')') ?>')" class="w-full py-2 bg-[#0A2E28] hover:bg-[#C59B27] hover:text-slate-950 text-amber-300 font-black text-[11px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1">
                            <span>NHẬN BÁO GIÁ CĂN NÀY</span>
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>"""
    
html = re.sub(projects_grid_regex, projects_php, html, flags=re.DOTALL)

with open('e:/BĐS Template/standalone-templates/lp-05/php/index.php', 'w', encoding='utf-8') as f:
    f.write(php_head + html)
