<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = isset($_POST['fullName']) ? htmlspecialchars($_POST['fullName']) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';
    $product_type = isset($_POST['product_type']) ? htmlspecialchars($_POST['product_type']) : '';
    $source = isset($_POST['source']) ? htmlspecialchars($_POST['source']) : '';

    if (empty($fullName) || empty($phone)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Name and phone are required"]);
        exit;
    }

    echo json_encode(["status" => "success", "message" => "Cảm ơn $fullName! Chúng tôi sẽ liên hệ lại sớm nhất."]);
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
