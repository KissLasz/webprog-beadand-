<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../db/db.php';

$stmt = $dbh->query("SELECT id, nev, tipus, dijazott FROM suti ORDER BY id ASC");
$sutik = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($sutik, JSON_UNESCAPED_UNICODE);