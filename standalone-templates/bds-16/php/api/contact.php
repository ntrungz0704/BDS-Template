<?php
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    
    $message = trim($_POST['message'] ?? '');
    $form_type = trim($_POST['form_type'] ?? '');
    $income = trim($_POST['income'] ?? '');
    
    // Determine product_type and source
    $product_type = $income ? "Income: $income" : '';
    $source = $form_type ? $form_type : 'unknown';

    if (!empty($name) || !empty($phone) || !empty($email)) {
        if (isset($pdo) && $pdo) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, message, product_type, source) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $phone, $email, $message, $product_type, $source]);
        }
        
        // For standard HTML form submissions
        echo "<script>
            alert('🎉 Gửi thông tin thành công! Chuyên viên sẽ liên hệ lại với quý khách trong ít phút.');
            window.location.href = '../index.php';
        </script>";
        exit;
    }
}
header('Location: ../index.php');
exit;
