<?php
header('Content-Type: application/json; charset=utf-8');

require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
// The form has "blockInterested" or "product_type"
$product_type = isset($_POST['blockInterested']) ? trim($_POST['blockInterested']) : (isset($_POST['product_type']) ? trim($_POST['product_type']) : '');
$source = isset($_POST['source']) ? trim($_POST['source']) : 'Form Đăng Ký - BDS-20';

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Vui lòng cung cấp họ tên và số điện thoại']);
    exit;
}

try {
    if (isset($pdo)) {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $product_type, $source]);
    }
    
    echo json_encode(['status' => 'success', 'message' => 'Cảm ơn bạn đã quan tâm. Chúng tôi sẽ liên hệ trong thời gian sớm nhất!']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Có lỗi xảy ra, vui lòng thử lại sau.']);
}
