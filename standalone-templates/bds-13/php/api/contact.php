<?php
require_once 'config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
    $product_type = $_POST['product_type'] ?? '';
    $source = $_POST['source'] ?? '';

    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng nhập tên và số điện thoại.']);
        exit;
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, message, product_type, source) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $phone, $email, $message, $product_type, $source]);
            echo json_encode(['success' => true, 'message' => 'Gửi yêu cầu thành công. Chúng tôi sẽ liên hệ lại sớm nhất.']);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Có lỗi xảy ra, vui lòng thử lại sau.']);
        }
    } else {
        echo json_encode(['success' => true, 'message' => 'Gửi yêu cầu thành công (DB offline).']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
}
?>
