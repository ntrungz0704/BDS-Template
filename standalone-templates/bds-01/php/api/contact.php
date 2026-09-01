<?php
header('Content-Type: application/json');
require_once '../config/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $product_type = $_POST['product_type'] ?? '';
    $source = $_POST['source'] ?? '';
    $message = $_POST['message'] ?? '';

    // Example of inserting to a database table if needed
    // if ($pdo) {
    //     $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source, message) VALUES (?, ?, ?, ?, ?, ?)");
    //     $stmt->execute([$name, $phone, $email, $product_type, $source, $message]);
    // }

    // Respond with success
    echo json_encode(['status' => 'success', 'message' => 'Thông tin của bạn đã được gửi thành công.']);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
}
?>
