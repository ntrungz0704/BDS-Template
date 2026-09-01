<?php
require_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $product_type = trim($_POST['product_type'] ?? '');
    $source = trim($_POST['source'] ?? 'Website');
    $message = trim($_POST['note'] ?? '');

    if (!empty($name) && !empty($phone)) {
        if (isset($pdo)) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, source, message) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $phone, $email, $product_type, $source, $message]);
        }
        
        // Since it's handled via JS fetch in the new template, we return JSON
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
        exit;
    }
}

header('Content-Type: application/json');
echo json_encode(['success' => false, 'message' => 'Invalid data']);
exit;
