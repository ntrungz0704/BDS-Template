<?php
require_once '../config/db.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $email = htmlspecialchars($_POST['email'] ?? '');
    $product_type = htmlspecialchars($_POST['product_type'] ?? ($_POST['unitType'] ?? ''));
    $source = htmlspecialchars($_POST['source'] ?? 'Website');

    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập họ tên và số điện thoại!']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt->execute([$name, $phone, $email, $product_type, $source]);
        
        echo json_encode(['success' => true, 'message' => 'Đăng ký thành công! Chuyên viên tư vấn sẽ sớm liên hệ với bạn.']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Có lỗi xảy ra, vui lòng thử lại sau.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Phương thức không được hỗ trợ']);
}
