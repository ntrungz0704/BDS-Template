<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $project = $_POST['project'] ?? '';
    $address = $_POST['address'] ?? '';
    $price = $_POST['price'] ?? '';
    $desc = $_POST['desc'] ?? '';
    
    // Validate required fields
    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng điền họ tên và số điện thoại.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare(\"INSERT INTO contacts (name, phone, email, project, address, price, description) VALUES (?, ?, ?, ?, ?, ?, ?)\");
        $stmt->execute([$name, $phone, $email, $project, $address, $price, $desc]);
        echo json_encode(['success' => true, 'message' => 'Đăng ký thành công!']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
