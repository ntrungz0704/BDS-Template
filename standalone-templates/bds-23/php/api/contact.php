<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../config/db.php';

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$project = isset($data['project']) ? trim($data['project']) : '';
$question = isset($data['question']) ? trim($data['question']) : '';
$product_type = isset($data['product_type']) ? trim($data['product_type']) : '';
$source = isset($data['source']) ? trim($data['source']) : '';

if (empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Số điện thoại là bắt buộc.']);
    exit;
}

if (isset($pdo)) {
    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, project, question) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $project, $question]);
        echo json_encode(['success' => true, 'message' => 'Đã lưu liên hệ thành công.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Lỗi lưu vào CSDL.']);
    }
} else {
    // Fallback if no DB
    echo json_encode(['success' => true, 'message' => 'Đã tiếp nhận liên hệ (chế độ không có DB).']);
}
?>
