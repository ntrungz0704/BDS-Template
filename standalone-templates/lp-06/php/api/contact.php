<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $product_type = $_POST['product'] ?? '';
    $source = $_POST['source'] ?? 'Website';

    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập tên và số điện thoại']);
        exit;
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$name, $phone, $email, $product_type, $source]);
            echo json_encode(['success' => true, 'message' => 'Đã tiếp nhận yêu cầu']);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Có lỗi xảy ra, vui lòng thử lại sau']);
        }
    } else {
        // Fallback if DB is unavailable
        echo json_encode(['success' => true, 'message' => 'Đã tiếp nhận yêu cầu (Fallback)']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
?>
