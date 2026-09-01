<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
    $product_type = $_POST['product_type'] ?? ($_POST['unit'] ?? '');
    $source = $_POST['source'] ?? 'Website';

    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng điền họ tên và số điện thoại.']);
        exit;
    }

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, message, product_type, source) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $message, $product_type, $source]);
    }

    echo json_encode(['success' => true, 'message' => 'Yêu cầu của bạn đã được gửi thành công.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
