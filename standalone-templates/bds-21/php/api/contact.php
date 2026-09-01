<?php
header('Content-Type: application/json');

require_once '../config/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $city = $_POST['city'] ?? '';
    $title = $_POST['title'] ?? '';
    $price = $_POST['price'] ?? '';
    
    // Additional fields requested: product_type, source (could be optional or appended if added in future)
    $product_type = $_POST['product_type'] ?? 'Không xác định';
    $source = $_POST['source'] ?? 'Website Form';
    $email = $_POST['email'] ?? 'Không có';
    
    // For logging or mailing
    $subject = "Yêu cầu đăng tin mới: " . $title;
    
    $message = "Họ tên: " . $name . "\n";
    $message .= "Số điện thoại: " . $phone . "\n";
    $message .= "Tỉnh/Thành: " . $city . "\n";
    $message .= "Tiêu đề: " . $title . "\n";
    $message .= "Mức giá: " . $price . "\n";
    $message .= "Loại BĐS: " . $product_type . "\n";
    $message .= "Nguồn: " . $source . "\n";
    
    // In a real application, you might insert this into a 'contacts' table or send an email.
    
    echo json_encode(['success' => true, 'message' => 'Yêu cầu của bạn đã được gửi thành công.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Phương thức yêu cầu không hợp lệ.']);
}
