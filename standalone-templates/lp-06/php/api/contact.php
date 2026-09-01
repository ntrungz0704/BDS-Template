<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = strip_tags(trim($_POST['name'] ?? ''));
    $phone = strip_tags(trim($_POST['phone'] ?? ''));
    $message = strip_tags(trim($_POST['message'] ?? ''));

    if (!empty($name) && !empty($phone)) {
        require_once '../config/db.php';
        if (isset($pdo)) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, message) VALUES (?, ?, ?)");
            $stmt->execute([$name, $phone, $message]);
        }
        echo "<script>
            alert('🎉 Gửi thông tin thành công! Chuyên viên sẽ liên hệ lại với quý khách trong ít phút qua số: " . htmlspecialchars($phone) . "');
            window.location.href = '../index.php';
        </script>";
        exit;
    }
}
header('Location: ../index.php');
exit;
