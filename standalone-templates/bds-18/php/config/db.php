<?php
// Cấu hình kết nối MySQL Database cho BĐS 18 — Sàn Giao Dịch & Đấu Giá Bến Thành
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds_bds123_benthanh_portal';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    // Nếu chưa tạo database MySQL thì chạy dữ liệu demo mẫu
    $pdo = null;
}
