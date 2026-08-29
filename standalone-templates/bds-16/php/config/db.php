<?php
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'bds16_egaland';

$conn = @new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    // Graceful fallback
}
?>
