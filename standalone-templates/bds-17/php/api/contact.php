<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $unitType = $_POST['unitType'] ?? '';
    $product_type = $_POST['product_type'] ?? $unitType;
    $source = $_POST['source'] ?? 'website';

    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập họ tên và số điện thoại!']);
        exit;
    }

    if (isset($pdo)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
            $stmt->execute([$name, $phone, $email, $product_type, $source]);
            echo json_encode(['success' => true, 'message' => 'Đăng ký thành công!']);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Lỗi cơ sở dữ liệu.']);
        }
    } else {
        // Fallback if no DB
        echo json_encode(['success' => true, 'message' => 'Đăng ký thành công (Offline)!']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
