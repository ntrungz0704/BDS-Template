import re
import json

with open('html/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

php_header = """<?php
require_once 'config/db.php';

$company = [
    'name' => 'TEMPLATESBDS',
    'phone' => '0919 006 030',
    'phone_clean' => '0919006030',
    'email' => 'contact@templatesbds.com',
    'address' => 'Quận 9, TP. Thủ Đức, TP.HCM',
    'slogan' => 'Đại đô thị sinh thái Grand Riverside - Không gian sống chuẩn mực quốc tế.',
    'zalo' => '0919006030'
];

$projects_json = '[]';

if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM company_info LIMIT 1");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $company = [
                'name' => $row['name'],
                'phone' => $row['phone'],
                'phone_clean' => preg_replace('/[^0-9]/', '', $row['phone']),
                'email' => $row['email'],
                'address' => $row['address'],
                'slogan' => $row['slogan'],
                'zalo' => preg_replace('/[^0-9]/', '', $row['zalo'])
            ];
        }

        $stmt = $pdo->query("SELECT * FROM projects");
        $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($projects as &$p) {
            $p['gallery'] = json_decode($p['gallery']);
            $p['specs'] = json_decode($p['specs']);
            $p['amenities'] = json_decode($p['amenities']);
            $p['priceNum'] = (float)$p['priceNum'];
            $p['areaNum'] = (float)$p['areaNum'];
            $p['bedrooms'] = (int)$p['bedrooms'];
            $p['bathrooms'] = (int)$p['bathrooms'];
        }
        if ($projects) {
            $projects_json = json_encode($projects);
        }
    } catch (Exception $e) {
        // use fallback
    }
}
?>"""

# Replace projects JS array
html = re.sub(r'const BDS06_PROPERTIES = (\[.*?\]);', r'const BDS06_PROPERTIES = <?php echo $projects_json != "[]" ? $projects_json : \'\1\'; ?>;', html, flags=re.DOTALL)

# Replace company info in footer
html = re.sub(r'TEMPLATESBDS', r'<?= htmlspecialchars($company["name"]) ?>', html)
html = re.sub(r'0919 006 030', r'<?= htmlspecialchars($company["phone"]) ?>', html)
html = re.sub(r'0919006030', r'<?= htmlspecialchars($company["phone_clean"]) ?>', html)
html = re.sub(r'contact@templatesbds\.com', r'<?= htmlspecialchars($company["email"]) ?>', html)
html = re.sub(r'Quận 9, TP\. Thủ Đức, TP\.HCM', r'<?= htmlspecialchars($company["address"]) ?>', html)
html = re.sub(r'Đại đô thị sinh thái Grand Riverside - Không gian sống chuẩn mực quốc tế\.', r'<?= htmlspecialchars($company["slogan"]) ?>', html)

# The form action
html = html.replace('onsubmit="handleLeadSubmit(event)"', 'onsubmit="handleLeadSubmit(event)" action="api/contact.php" method="POST"')

# Add PHP Header
html = php_header + "\n" + html

with open('php/index.php', 'w', encoding='utf-8') as f:
    f.write(html)
