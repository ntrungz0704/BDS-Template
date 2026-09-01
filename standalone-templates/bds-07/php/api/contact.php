<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$product_type = $_POST['productType'] ?? $_POST['type'] ?? '';
$price_expected = $_POST['price'] ?? '';
$address = $_POST['address'] ?? '';
$note = $_POST['note'] ?? '';
$source = $_POST['formType'] ?? 'quote'; // Default to quote if not specified

if ($pdo) {
    try {
        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, product_type, price_expected, address, note, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $product_type, $price_expected, $address, $note, $source]);
        
        echo json_encode(['success' => true, 'message' => 'Your request has been received.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error.']);
    }
} else {
    // If DB is unavailable, still return success to frontend
    echo json_encode(['success' => true, 'message' => 'Request received (fallback).']);
}
?>
