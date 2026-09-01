<?php
header('Content-Type: application/json');
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $product_type = $_POST['product_type'] ?? '';
    $source = $_POST['source'] ?? 'bds-22';
    
    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ họ tên và số điện thoại.']);
        exit;
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->execute([$name, $phone, $email, $product_type, $source]);
        
        echo json_encode(['success' => true, 'message' => 'Đăng ký thành công!']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi hệ thống: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
