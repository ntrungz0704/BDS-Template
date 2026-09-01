<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $project = $_POST['projectInterested'] ?? '';
    $email = $_POST['email'] ?? '';
    $product_type = $_POST['product_type'] ?? '';
    $source = $_POST['source'] ?? '';

    if (empty($name) || empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'Vui lòng nhập họ tên và số điện thoại!']);
        exit;
    }

    try {
        if (isset($pdo)) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, project_interested) VALUES (?, ?, ?)");
            $stmt->execute([$name, $phone, $project]);
        }
        echo json_encode(['status' => 'success', 'message' => 'Yêu cầu tư vấn đã được gửi thành công.']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Lỗi kết nối CSDL: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
