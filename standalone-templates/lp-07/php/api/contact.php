<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $time = isset($_POST['time']) ? htmlspecialchars($_POST['time']) : '';
    $doc = isset($_POST['doc']) ? htmlspecialchars($_POST['doc']) : '';
    $product_type = isset($_POST['product_type']) ? htmlspecialchars($_POST['product_type']) : (isset($_POST['product']) ? htmlspecialchars($_POST['product']) : '');
    $source = isset($_POST['source']) ? htmlspecialchars($_POST['source']) : '';

    if (empty($name) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Vui lòng điền họ tên và số điện thoại.']);
        exit;
    }

    // Process contact data (e.g., save to DB, send email)
    // For now, we simulate success
    echo json_encode([
        'success' => true, 
        'message' => 'Đã tiếp nhận yêu cầu!',
        'data' => [
            'name' => $name,
            'phone' => $phone,
            'email' => $email,
            'time' => $time,
            'doc' => $doc,
            'product_type' => $product_type,
            'source' => $source
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
