<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $title = $_POST['title'] ?? null;
    $price = $_POST['price'] ?? null;
    $area = $_POST['area'] ?? null;
    $email = $_POST['email'] ?? null;
    
    // Determine if it's a contact form or newsletter form
    $type = !empty($email) && empty($name) ? 'newsletter' : 'contact';
    
    if (isset($pdo)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, title, price, area, email, type) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $phone, $title, $price, $area, $email, $type]);
            echo json_encode(['status' => 'success', 'message' => 'Your request has been submitted successfully.']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        // Fallback if no DB
        echo json_encode(['status' => 'success', 'message' => 'Your request has been received (offline mode).']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
