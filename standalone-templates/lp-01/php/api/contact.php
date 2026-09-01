<?php
require_once '../config/db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $product_type = $_POST['unit_type'] ?? '';
    $source = $_POST['source'] ?? 'Website';

    if (empty($name) || empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'Vui lòng nhập tên và số điện thoại']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $product_type, $source]);
        echo json_encode(['status' => 'success', 'message' => 'Đăng ký thành công']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Lỗi kết nối cơ sở dữ liệu: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
