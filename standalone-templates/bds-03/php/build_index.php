<?php
$html = file_get_contents('e:/BĐS Template/standalone-templates/bds-03/html/index.html');

$phpHeader = <<<'PHP'
<?php
require_once 'config/db.php';

// Default company info
$company = [
    'name' => 'TEMPLATESBDS',
    'phone' => '0919 006 030',
    'email' => 'ntrungz0704@gmail.com',
    'address' => 'Hồ Chí Minh, Việt Nam',
    'slogan' => 'Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam',
    'zalo' => '0919006030'
];

$properties = [];
$projects = [];
$news = [];
$testimonials = [];

if (isset($pdo) && $pdo) {
    try {
        $stmt = $pdo->query('SELECT * FROM company_info LIMIT 1');
        $dbCompany = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($dbCompany) {
            $company = $dbCompany;
        }

        $stmt = $pdo->query('SELECT * FROM properties');
        $dbProps = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($dbProps)) {
            foreach ($dbProps as $p) {
                $properties[] = [
                    'id' => (int)$p['id'],
                    'title' => $p['title'],
                    'slug' => $p['slug'],
                    'category' => $p['category'],
                    'type' => $p['type'],
                    'price' => $p['price'],
                    'priceNum' => (float)$p['priceNum'],
                    'area' => $p['area'],
                    'areaNum' => (float)$p['areaNum'],
                    'location' => $p['location'],
                    'district' => $p['district'],
                    'province' => $p['province'],
                    'legal' => $p['legal'],
                    'badge' => $p['badge'],
                    'image' => $p['image'],
                    'gallery' => json_decode($p['gallery'], true) ?: [],
                    'date' => $p['date'],
                    'desc' => $p['description'],
                    'author' => [
                        'name' => $p['author_name'],
                        'phone' => $p['author_phone'],
                        'zalo' => $p['author_zalo'],
                        'avatar' => $p['author_avatar']
                    ]
                ];
            }
        }

        $stmt = $pdo->query('SELECT * FROM projects');
        $dbProj = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($dbProj)) {
            foreach ($dbProj as $p) {
                $projects[] = [
                    'id' => (int)$p['id'],
                    'title' => $p['title'],
                    'slug' => $p['slug'],
                    'scale' => $p['scale'],
                    'price' => $p['price'],
                    'priceNum' => (float)$p['priceNum'],
                    'location' => $p['location'],
                    'status' => $p['status'],
                    'image' => $p['image'],
                    'desc' => $p['description']
                ];
            }
        }

        $stmt = $pdo->query('SELECT * FROM news');
        $dbNews = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($dbNews)) {
            foreach ($dbNews as $n) {
                $news[] = [
                    'id' => (int)$n['id'],
                    'title' => $n['title'],
                    'slug' => $n['slug'],
                    'date' => $n['date'],
                    'author' => $n['author'],
                    'category' => $n['category'],
                    'image' => $n['image'],
                    'desc' => $n['description'],
                    'content' => json_decode($n['content'], true) ?: [],
                    'views' => (int)$n['views']
                ];
            }
        }

        $stmt = $pdo->query('SELECT * FROM testimonials');
        $dbTest = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($dbTest)) {
            foreach ($dbTest as $t) {
                $testimonials[] = [
                    'id' => (int)$t['id'],
                    'name' => $t['name'],
                    'role' => $t['role'],
                    'comment' => $t['comment'],
                    'avatar' => $t['avatar']
                ];
            }
        }
    } catch (Exception $e) {
        // Ignore and fallback
    }
}
?>
PHP;

$html = $phpHeader . "\n" . $html;

$replaceArray = function($varName, $phpVar) use (&$html) {
    $html = preg_replace('/const ' . $varName . ' = \[[^;]+\];/', "<?php if(!empty(" . $phpVar . ")): ?>\nconst " . $varName . " = <?= json_encode(" . $phpVar . ") ?>;\n<?php else: ?>\n$0\n<?php endif; ?>", $html);
};

$replaceArray('BDS03_PROPERTIES', '$properties');
$replaceArray('BDS03_PROJECTS', '$projects');
$replaceArray('BDS03_NEWS', '$news');
$replaceArray('TESTIMONIALS', '$testimonials');

// Replace company texts
$html = str_replace('0919 006 030', '<?= htmlspecialchars($company["phone"]) ?>', $html);
$html = str_replace('0919006030', '<?= htmlspecialchars($company["zalo"]) ?>', $html);
$html = str_replace('ntrungz0704@gmail.com', '<?= htmlspecialchars($company["email"]) ?>', $html);
$html = str_replace('Kho Mẫu Website Bất Động Sản Cao Cấp Số 1 Việt Nam', '<?= htmlspecialchars($company["slogan"]) ?>', $html);
$html = str_replace('TEMPLATESBDS', '<?= htmlspecialchars($company["name"]) ?>', $html);
$html = str_replace('Hồ Chí Minh, Việt Nam', '<?= htmlspecialchars($company["address"]) ?>', $html);

// Fix forms for API contact
$html = str_replace('<form onsubmit="handleConsultSubmit(event)" class="space-y-3 text-xs">', '<form action="api/contact.php" method="POST" class="space-y-3 text-xs">', $html);
$html = str_replace('<input type="text" placeholder="Họ và tên của bạn (*)..." required class="w-full', '<input type="text" name="name" placeholder="Họ và tên của bạn (*)..." required class="w-full', $html);
$html = str_replace('<input type="tel" placeholder="Số điện thoại / Zalo (*)..." required class="w-full', '<input type="tel" name="phone" placeholder="Số điện thoại / Zalo (*)..." required class="w-full', $html);
$html = str_replace('<textarea rows="3" placeholder="Khu vực hoặc mức giá bạn đang quan tâm..." class="w-full', '<textarea name="message" rows="3" placeholder="Khu vực hoặc mức giá bạn đang quan tâm..." class="w-full', $html);

$html = str_replace('<form onsubmit="handleConsultSubmit(event)" class="space-y-4 text-xs">', '<form action="api/contact.php" method="POST" class="space-y-4 text-xs">', $html);
$html = str_replace('<input type="text" placeholder="Nhập họ tên của bạn..." required class="w-full', '<input type="text" name="name" placeholder="Nhập họ tên của bạn..." required class="w-full', $html);
$html = str_replace('<input type="tel" placeholder="Nhập số điện thoại..." required class="w-full', '<input type="tel" name="phone" placeholder="Nhập số điện thoại..." required class="w-full', $html);
$html = str_replace('<textarea rows="4" placeholder="Bạn quan tâm loại đất nền, đất vườn hay cần thẩm định giá..." class="w-full', '<textarea name="message" rows="4" placeholder="Bạn quan tâm loại đất nền, đất vườn hay cần thẩm định giá..." class="w-full', $html);

file_put_contents('e:/BĐS Template/standalone-templates/bds-03/php/index.php', $html);
