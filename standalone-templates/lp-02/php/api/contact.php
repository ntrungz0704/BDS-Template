<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = strip_tags(trim($_POST['fullName'] ?? $_POST['quickName'] ?? ''));
    $phone = strip_tags(trim($_POST['phone'] ?? $_POST['quickPhone'] ?? ''));
    $email = strip_tags(trim($_POST['email'] ?? ''));
    
    $position = strip_tags(trim($_POST['position'] ?? ''));
    $experience = strip_tags(trim($_POST['experience'] ?? ''));
    $birthYear = strip_tags(trim($_POST['birthYear'] ?? ''));
    
    $product_type = $position;
    if ($experience) {
        $product_type .= " - Exp: $experience";
    }
    
    $message = "Birth Year: $birthYear";
    
    $source = strip_tags(trim($_POST['formType'] ?? 'Website Form'));

    if (!empty($name) && !empty($phone)) {
        require_once '../config/db.php';
        if (isset($pdo)) {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, message, product_type, source) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $phone, $email, $message, $product_type, $source]);
        }
        echo "<script>
            alert('🎉 Gửi thông tin thành công! Chuyên viên sẽ liên hệ lại với bạn trong vòng 24 giờ qua số: " . htmlspecialchars($phone) . "');
            window.location.href = '../index.php';
        </script>";
        exit;
    }
}
header('Location: ../index.php');
exit;
