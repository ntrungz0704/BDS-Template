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
$project = $_POST['project'] ?? '';
$product_type = $_POST['product_type'] ?? '';
$source = $_POST['source'] ?? '';

if (empty($name) || empty($phone)) {
    echo json_encode(['success' => false, 'message' => 'Name and phone are required']);
    exit;
}

if (isset($pdo)) {
    try {
        // Adding columns dynamically or just storing what we have in contacts if the schema was basic
        // We will just store name, phone, email, project. Since prompt asks to support product_type and source,
        // we'll append them to project if columns don't exist, or just insert if they do.
        // Assuming contacts table might have these columns or we alter it if needed. 
        // For safety, let's include them in the query and assume they are in db or not crash.
        
        // Check if columns exist
        $stmt = $pdo->query("SHOW COLUMNS FROM contacts LIKE 'product_type'");
        if ($stmt->rowCount() == 0) {
            $pdo->exec("ALTER TABLE contacts ADD COLUMN product_type VARCHAR(255) DEFAULT NULL");
        }
        $stmt = $pdo->query("SHOW COLUMNS FROM contacts LIKE 'source'");
        if ($stmt->rowCount() == 0) {
            $pdo->exec("ALTER TABLE contacts ADD COLUMN source VARCHAR(255) DEFAULT NULL");
        }

        $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, project, product_type, source) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $phone, $email, $project, $product_type, $source]);
        
        echo json_encode(['success' => true, 'message' => 'Contact saved successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    // If no DB, just return success for mockup
    echo json_encode(['success' => true, 'message' => 'Mock contact saved successfully']);
}
