<?php
require_once '../config/db.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $product_type = $_POST['product_type'] ?? '';
    $source = $_POST['source'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Số điện thoại là bắt buộc.']);
        exit;
    }

    // Here you would usually insert into a leads table or send an email.
    // For now we just return success.
    
    // Example:
    // if ($pdo) {
    //     $stmt = $pdo->prepare("INSERT INTO leads (name, phone, email, product_type, source, message) VALUES (?, ?, ?, ?, ?, ?)");
    //     $stmt->execute([$name, $phone, $email, $product_type, $source, $message]);
    // }

    echo json_encode(['success' => true, 'message' => 'Đã gửi yêu cầu thành công. Chuyên viên sẽ liên hệ lại sớm nhất.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
