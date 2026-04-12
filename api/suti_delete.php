<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../db/db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = isset($data['id']) ? (int)$data['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Hibás azonosító']);
    exit;
}

$stmt = $dbh->prepare("DELETE FROM suti WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(['success' => true]);