<?php
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $product_type = isset($_POST['product_type']) ? htmlspecialchars(trim($_POST['product_type'])) : (isset($_POST['service']) ? htmlspecialchars(trim($_POST['service'])) : 'Tư Vấn Đầu Tư BĐS');
    $source = isset($_POST['source']) ? htmlspecialchars(trim($_POST['source'])) : 'Website';
    
    // Check required fields
    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng điền đầy đủ họ tên và số điện thoại.']);
        exit;
    }
    
    try {
        // Assume contact_submissions has been updated to include product_type and source, or we reuse 'service' column for product_type. 
        // We will just insert into service column or check if table has product_type.
        // I will add them directly:
        $stmt = $pdo->prepare("INSERT INTO contact_submissions (name, phone, email, service, product_type, source) VALUES (:name, :phone, :email, :service, :product_type, :source)");
        $stmt->execute([
            ':name' => $name,
            ':phone' => $phone,
            ':email' => $email,
            ':service' => $product_type, // for backwards compat in table
            ':product_type' => $product_type,
            ':source' => $source
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Gửi yêu cầu thành công.']);
    } catch (PDOException $e) {
        // If columns don't exist, try the old insert
        try {
            $stmt = $pdo->prepare("INSERT INTO contact_submissions (name, phone, email, service) VALUES (:name, :phone, :email, :service)");
            $stmt->execute([
                ':name' => $name,
                ':phone' => $phone,
                ':email' => $email,
                ':service' => $product_type
            ]);
            echo json_encode(['success' => true, 'message' => 'Gửi yêu cầu thành công.']);
        } catch (PDOException $e2) {
            echo json_encode(['success' => false, 'message' => 'Có lỗi xảy ra, vui lòng thử lại sau.']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Phương thức không được hỗ trợ.']);
}
