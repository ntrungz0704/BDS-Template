import re

with open(r'e:\BĐS Template\standalone-templates\bds-17\html\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

php_prefix = """<?php
require_once 'config/db.php';

// Fetch company info
$company = [
    'name' => 'BEVERLY HILLS HẠ LONG',
    'phone' => '0919 006 030',
    'email' => 'contact@beverlyhills.com',
    'address' => 'Đồi Hải Quân, Bãi Cháy, TP. Hạ Long',
    'slogan' => 'ĐỈNH CAO NGHỈ DƯỠNG THƯỢNG LƯU — BÃI CHÁY',
    'zalo' => '0919006030'
];

if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $company = array_merge($company, $row);
        }
    } catch (PDOException $e) {}
}

// Fetch projects
$projects = [];
if (isset($pdo)) {
    try {
        $stmt = $pdo->query("SELECT * FROM projects");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row['priceNum'] = (float)$row['priceNum'];
            $row['areaNum'] = (float)$row['areaNum'];
            $row['beds'] = (int)$row['beds'];
            $row['baths'] = (int)$row['baths'];
            $row['hot'] = $row['hot'] ? true : false;
            $row['featured'] = $row['featured'] ? true : false;
            if (!empty($row['specs'])) {
                $row['specs'] = json_decode($row['specs'], true);
            } else {
                $row['specs'] = [];
            }
            $row['id'] = $row['id_string'];
            $projects[] = $row;
        }
    } catch (PDOException $e) {}
}

$projects_json = empty($projects) ? '[]' : json_encode($projects, JSON_UNESCAPED_UNICODE);

$name = $company['name'];
$name_parts = explode(' ', $name);
if (count($name_parts) >= 3) {
    $last_two = array_splice($name_parts, -2);
    $first_part = htmlspecialchars(implode(' ', $name_parts));
    $second_part = htmlspecialchars(implode(' ', $last_two));
    $formatted_name = $first_part . ' <span class="text-slate-900">' . $second_part . '</span>';
} else {
    $formatted_name = htmlspecialchars($name);
}
?>
"""

content = php_prefix + content

# Phone
content = re.sub(r'0919\s006\s030', r'<?= htmlspecialchars($company[\'phone\']) ?>', content)
content = re.sub(r'0919006030', r'<?= htmlspecialchars($company[\'phone\']) ?>', content)

# Slogan
content = content.replace('ĐỈNH CAO NGHỈ DƯỠNG THƯỢNG LƯU — BÃI CHÁY', r'<?= htmlspecialchars($company[\'slogan\']) ?>')

# Name
content = content.replace('BEVERLY HILLS <span class="text-slate-900">HẠ LONG</span>', r'<?= $formatted_name ?>')
content = content.replace('BEVERLY HILLS HẠ LONG - <?= htmlspecialchars($company[\'slogan\']) ?>', r'<?= htmlspecialchars($company[\'name\']) ?> - <?= htmlspecialchars($company[\'slogan\']) ?>')

# Footer address
content = content.replace('Đồi Hải Quân, Bãi Cháy, TP. Hạ Long', r'<?= htmlspecialchars($company[\'address\']) ?>')

# Replace UNITS array
units_regex = re.compile(r'(const UNITS = )\[.*?\];', re.DOTALL)
if units_regex.search(content):
    fallback_js = "<?= $projects_json !== '[]' ? $projects_json : '[]' ?>;\n"
    # Wait, the fallback is if empty we use original array.
    # It's better to just extract the original array and use it as fallback.
    original_units_match = units_regex.search(content)
    original_units_str = original_units_match.group(0)
    
    new_units_code = f"const FALLBACK_UNITS = {original_units_str[14:]}\n"
    new_units_code += "    const DB_UNITS = <?= $projects_json ?>;\n"
    new_units_code += "    const UNITS = DB_UNITS.length > 0 ? DB_UNITS : FALLBACK_UNITS;\n"
    
    content = units_regex.sub(new_units_code.replace('\\', '\\\\'), content)

with open(r'e:\BĐS Template\standalone-templates\bds-17\php\index.php', 'w', encoding='utf-8') as f:
    f.write(content)
