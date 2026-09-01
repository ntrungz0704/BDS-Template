<?php
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $unitType = trim($_POST['unitType'] ?? '');
    $product_type = trim($_POST['product_type'] ?? '');
    $source = trim($_POST['source'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (!empty($name) && !empty($phone)) {
        if (isset($pdo) && $pdo) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, unit_type, product_type, source, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $phone, $email, $unitType, $product_type, $source, $message]);
        }
        echo "<script>
            alert('🎉 Cảm ơn quý khách " . htmlspecialchars($name) . " (" . htmlspecialchars($phone) . "). Bảng giá gốc và chính sách chiết khấu đã được gửi qua Zalo!');
            window.location.href = '../index.php';
        </script>";
        exit;
    }
}
header('Location: ../index.php');
exit;
