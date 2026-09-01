<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $product_type = isset($_POST['unit_type']) ? htmlspecialchars(trim($_POST['unit_type'])) : '';
    $source = isset($_POST['form_type']) ? htmlspecialchars(trim($_POST['form_type'])) : 'unknown';

    if (empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'Phone number is required.']);
        exit;
    }

    if (empty($name)) {
        $name = 'Khách hàng';
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $product_type, $source]);

        echo json_encode([
            'status' => 'success', 
            'message' => 'Đã gửi yêu cầu thành công!'
        ]);
    } catch (PDOException $e) {
        error_log($e->getMessage());
        echo json_encode([
            'status' => 'error', 
            'message' => 'Đã xảy ra lỗi, vui lòng thử lại sau.'
        ]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
