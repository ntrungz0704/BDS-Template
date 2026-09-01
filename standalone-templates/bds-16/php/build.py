import re
import json

with open("e:/BĐS Template/standalone-templates/bds-16/html/index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replacements (only on the HTML string)
replacements = [
    (r"<title>EGA LAND - Trao Bạn Cuộc Sống Mơ Ước</title>", r"<title><?= htmlspecialchars($companyInfo['name']) ?> - <?= htmlspecialchars($companyInfo['slogan']) ?></title>"),
    (r"EGA <span class=\"text-\[\#D97706\]\">LAND</span>", r"<?= $firstName ?> <span class=\"text-[#D97706]\"><?= $restName ?></span>"),
    (r"TRAO BẠN CUỘC SỐNG MƠ ƯỚC", r"<?= htmlspecialchars(mb_strtoupper($companyInfo['slogan'], 'UTF-8')) ?>"),
    (r"EGA LAND — Bất Động Sản Toàn Quốc", r"<?= htmlspecialchars(mb_strtoupper($companyInfo['name'], 'UTF-8')) ?> — Bất Động Sản Toàn Quốc"),
    (r"1900\.636\.099", r"<?= htmlspecialchars($companyInfo['phone']) ?>"),
    (r"0919 006 030", r"<?= htmlspecialchars($companyInfo['zalo']) ?>"),
    (r"TẬP ĐOÀN BẤT ĐỘNG SẢN EGA LAND", r"TẬP ĐOÀN BẤT ĐỘNG SẢN <?= htmlspecialchars(mb_strtoupper($companyInfo['name'], 'UTF-8')) ?>"),
    (r"EGA Land là một trong những thương hiệu tiên phong", r"<?= htmlspecialchars($companyInfo['name']) ?> là một trong những thương hiệu tiên phong"),
    (r'"Trao bạn cuộc sống mơ ước"', r'"<?= htmlspecialchars($companyInfo[\'slogan\']) ?>"'),
    (r"Chuyên viên EGA Land", r"Chuyên viên <?= htmlspecialchars($companyInfo['name']) ?>"),
    (r"HƯỚNG DẪN MUA BÁN & THUÊ NHÀ ĐẤT TẠI EGA LAND", r"HƯỚNG DẪN MUA BÁN & THUÊ NHÀ ĐẤT TẠI <?= htmlspecialchars(mb_strtoupper($companyInfo['name'], 'UTF-8')) ?>"),
    (r"Lầu 3 - Tòa nhà Lữ Gia - Số 70 Lữ Gia - P\.15 - Q\.11 - TP\.HCM", r"<?= htmlspecialchars($companyInfo['address']) ?>"),
    (r"support@sapo\.vn", r"<?= htmlspecialchars($companyInfo['email']) ?>"),
]

for old, new_ in replacements:
    html = re.sub(old, new_, html, flags=re.IGNORECASE)

# Replace JS arrays
js_proj = r"const BDS16_PROPERTIES = \[\s*\{.*?\}\s*\];"
html = re.sub(js_proj, "const BDS16_PROPERTIES = <?= empty($projectsData) ? '[]' : json_encode($projectsData, JSON_UNESCAPED_UNICODE) ?>;", html, flags=re.DOTALL)

js_news = r"const BDS16_NEWS = \[\s*\{.*?\}\s*\];"
html = re.sub(js_news, "const BDS16_NEWS = <?= empty($newsData) ? '[]' : json_encode($newsData, JSON_UNESCAPED_UNICODE) ?>;", html, flags=re.DOTALL)

# Add PHP block at the top
php_block = """<?php
require_once 'config/db.php';

// Default company info fallback
$companyInfo = [
    'name' => 'EGA LAND',
    'phone' => '1900.636.099',
    'email' => 'support@sapo.vn',
    'address' => 'Lầu 3 - Tòa nhà Lữ Gia - Số 70 Lữ Gia - P.15 - Q.11 - TP.HCM',
    'slogan' => 'Trao Bạn Cuộc Sống Mơ Ước',
    'zalo' => '0919 006 030',
    'facebook' => '#',
    'youtube' => '#'
];

$projectsData = [];
$newsData = [];

if (isset($pdo) && $pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch()) {
            $companyInfo = array_merge($companyInfo, $row);
        }
        
        $stmtProj = $pdo->query("SELECT * FROM projects");
        while ($row = $stmtProj->fetch()) {
            $row['specs'] = json_decode($row['specs'], true) ?: [];
            $projectsData[] = $row;
        }

        $stmtNews = $pdo->query("SELECT * FROM news");
        while ($row = $stmtNews->fetch()) {
            $row['content'] = json_decode($row['content'], true) ?: [];
            $newsData[] = $row;
        }
    } catch (PDOException $e) {
        // Fallback
    }
}

// Name split for logo (EGA LAND -> EGA <span class="text-[#D97706]">LAND</span>)
$nameParts = explode(' ', $companyInfo['name']);
$firstName = htmlspecialchars(array_shift($nameParts) ?? '');
$restName = htmlspecialchars(implode(' ', $nameParts));
?>
"""

html = html.replace("<!DOCTYPE html>", php_block + "<!DOCTYPE html>")

# Write to php
with open("e:/BĐS Template/standalone-templates/bds-16/php/index.php", "w", encoding="utf-8") as f:
    f.write(html)
