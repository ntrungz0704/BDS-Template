<?php
// Cấu hình kết nối MySQL Database cho BĐS 24 — RealtyBuild Trang Tin BĐS Số 1 Việt Nam
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds_realtybuild_tech_portal';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    // Nếu chưa tạo database MySQL thì chạy dữ liệu demo mẫu
    $pdo = null;
}
