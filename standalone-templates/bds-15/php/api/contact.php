<?php
header('Content-Type: application/json');
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $product_type = $_POST['product_type'] ?? '';
    $source = $_POST['source'] ?? 'website';

    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Email is required']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (email, product_type, source) VALUES (?, ?, ?)");
        $stmt->execute([$email, $product_type, $source]);
        echo json_encode(['success' => true, 'message' => 'Contact saved successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
