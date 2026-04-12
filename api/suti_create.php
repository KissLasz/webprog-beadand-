<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../db/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$nev = trim($data['nev'] ?? '');
$tipus = trim($data['tipus'] ?? '');
$dijazott = isset($data['dijazott']) ? (int)$data['dijazott'] : 0;

if ($nev === '') {
    http_response_code(400);
    echo json_encode(['error' => 'A név kötelező']);
    exit;
}

$stmt = $dbh->prepare("INSERT INTO suti (nev, tipus, dijazott) VALUES (?, ?, ?)");
$stmt->execute([$nev, $tipus, $dijazott]);

echo json_encode(['success' => true, 'id' => $dbh->lastInsertId()]);