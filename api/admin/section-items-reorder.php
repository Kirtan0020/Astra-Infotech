<?php

require_once __DIR__ . '/../auth.php';

require_auth();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}
require_csrf();

$body = json_body();
$ids = $body['ids'] ?? [];
if (!is_array($ids) || count($ids) === 0) {
    json_error('ids array is required', 400);
}

$stmt = db()->prepare('UPDATE section_items SET sort_order = ? WHERE id = ?');
foreach (array_values($ids) as $order => $id) {
    $stmt->execute([$order, (int) $id]);
}

json_response(['ok' => true]);
