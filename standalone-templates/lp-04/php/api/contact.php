<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = strip_tags(trim($_POST['name'] ?? ''));
    $phone = strip_tags(trim($_POST['phone'] ?? ''));
    $email = strip_tags(trim($_POST['email'] ?? ''));
    $product_type = strip_tags(trim($_POST['product_type'] ?? ''));
    $message = strip_tags(trim($_POST['message'] ?? ''));
    $source = strip_tags(trim($_POST['source'] ?? 'form'));

    if (!empty($name) && !empty($phone)) {
        require_once '../config/db.php';
        if (isset($pdo)) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, message, source) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $phone, $email, $product_type, $message, $source]);
        }
        echo "<script>
            alert('🎉 Tiếp nhận đăng ký VIP thành công! Chuyên viên Giám đốc khối sẽ liên hệ lại qua số: " . htmlspecialchars($phone) . " trong vòng 3 phút.');
            window.location.href = '../index.php';
        </script>";
        exit;
    }
}
header('Location: ../index.php');
exit;
