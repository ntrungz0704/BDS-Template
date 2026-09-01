# -*- coding: utf-8 -*-
import re

html_path = r"e:\BĐS Template\standalone-templates\bds-12\html\index.html"
php_path = r"e:\BĐS Template\standalone-templates\bds-12\php\index.php"

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("0919 006 030", "<?= $phone_display ?>")
content = content.replace("0919006030", "<?= $phone_link ?>")
content = content.replace("TEMPLATESBDS", "<?= $company_name ?>")
content = content.replace("info@templatebds.com", "<?= $email ?>")
content = content.replace("Xã Hạ Long, Huyện Vân Đồn, Quảng Ninh", "<?= $address ?>")
content = content.replace("THƯƠNG CẢNG QUỐC TẾ ĐẦU TIÊN VÀ DUY NHẤT TẠI VỊNH BÁI TỬ LONG", "<?= $slogan ?>")

js_array_pattern = re.compile(r"const BDS12_UNITS = (\[.*?\]);", re.DOTALL)
match = js_array_pattern.search(content)
if match:
    fallback_array = match.group(1)
    replacement = f"const BDS12_UNITS_FALLBACK = {fallback_array};\n    const BDS12_UNITS = <?= $bds_units_json !== 'null' ? $bds_units_json : 'BDS12_UNITS_FALLBACK' ?>;"
    content = content[:match.start()] + replacement + content[match.end():]

php_block = """<?php
require_once 'config/db.php';

$company_info = [
    'name' => 'TEMPLATESBDS',
    'phone' => '0919 006 030',
    'email' => 'info@templatebds.com',
    'address' => 'Xã Hạ Long, Huyện Vân Đồn, Quảng Ninh',
    'slogan' => 'THƯƠNG CẢNG QUỐC TẾ ĐẦU TIÊN VÀ DUY NHẤT TẠI VỊNH BÁI TỬ LONG',
    'zalo' => '0919006030'
];

$projects = [];

if ($pdo) {
    $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
    if ($row = $stmt->fetch()) {
        $company_info = $row;
    }

    $stmt = $pdo->query("SELECT * FROM projects");
    $projects = $stmt->fetchAll();
}

$phone_display = htmlspecialchars($company_info['phone'] ?? '');
$phone_link = preg_replace('/[^0-9]/', '', $company_info['phone'] ?? '');
$email = htmlspecialchars($company_info['email'] ?? '');
$address = htmlspecialchars($company_info['address'] ?? '');
$slogan = htmlspecialchars($company_info['slogan'] ?? '');
$company_name = htmlspecialchars($company_info['name'] ?? '');

$projects_json_arr = [];
if (!empty($projects)) {
    foreach ($projects as $p) {
        $specs = json_decode($p['specs'] ?? '[]', true) ?: [];
        $highlights = json_decode($p['highlights'] ?? '[]', true) ?: [];
        
        $projects_json_arr[] = [
            'id' => $p['category'],
            'type' => $p['type'],
            'category' => $p['category'],
            'name' => $p['name'],
            'area' => $p['area'],
            'landArea' => $p['land_area'],
            'constructionArea' => $p['construction_area'],
            'frontage' => $p['frontage'],
            'floors' => $p['floors'],
            'price' => $p['price'],
            'view' => $p['view'],
            'handover' => $p['handover'],
            'image' => $p['image'],
            'specs' => $specs,
            'description' => $p['description'],
            'highlights' => $highlights
        ];
    }
}

$bds_units_json = !empty($projects_json_arr) ? json_encode($projects_json_arr, JSON_UNESCAPED_UNICODE) : 'null';
?>
"""

content = php_block + content

with open(php_path, 'w', encoding='utf-8') as f:
    f.write(content)
