<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../db/db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = isset($data['id']) ? (int)$data['id'] : 0;
$nev = trim($data['nev'] ?? '');
$tipus = trim($data['tipus'] ?? '');
$dijazott = isset($data['dijazott']) ? (int)$data['dijazott'] : 0;

if ($id <= 0 || $nev === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Hibás adatok']);
    exit;
}

$stmt = $dbh->prepare("UPDATE suti SET nev = ?, tipus = ?, dijazott = ? WHERE id = ?");
$stmt->execute([$nev, $tipus, $dijazott, $id]);

echo json_encode(['success' => true]);