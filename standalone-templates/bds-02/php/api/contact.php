<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    $data = $_POST;
}

$type = $data['type'] ?? 'unknown';
$name = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';
$product_type = $data['product_type'] ?? '';
$source = $data['source'] ?? $type;

if (empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Phone number is required']);
    exit;
}

try {
    if (isset($pdo)) {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, message, product_type, source) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $message, $product_type, $source]);
    }
    
    echo json_encode(['success' => true, 'message' => 'Contact saved successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error saving contact']);
}
?>
