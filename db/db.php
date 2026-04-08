<?php
try {
    $dbh = new PDO(
        'mysql:host=localhost;dbname=cukraszda;charset=utf8mb4',
        'root',
        '',
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
    );
} catch (PDOException $e) {
    die("DB connection error: " . $e->getMessage());
}
?>