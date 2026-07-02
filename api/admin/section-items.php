<?php

require_once __DIR__ . '/../auth.php';

require_auth();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $sectionId = (int) ($_GET['section_id'] ?? 0);
    if ($sectionId <= 0) {
        json_error('section_id is required', 400);
    }
    $stmt = db()->prepare('SELECT * FROM section_items WHERE section_id = ? ORDER BY sort_order ASC, id ASC');
    $stmt->execute([$sectionId]);
    json_response(['items' => array_map('cast_item', $stmt->fetchAll())]);
}

if ($method === 'POST') {
    require_csrf();
    $body = json_body();
    $sectionId = (int) ($body['section_id'] ?? 0);
    if ($sectionId <= 0) {
        json_error('section_id is required', 400);
    }

    $maxOrder = db()->prepare('SELECT COALESCE(MAX(sort_order), -1) FROM section_items WHERE section_id = ?');
    $maxOrder->execute([$sectionId]);
    $nextOrder = ((int) $maxOrder->fetchColumn()) + 1;

    $stmt = db()->prepare('INSERT INTO section_items (section_id, sort_order, data) VALUES (?, ?, ?)');
    $stmt->execute([
        $sectionId,
        (int) ($body['sort_order'] ?? $nextOrder),
        json_encode($body['data'] ?? new stdClass(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
    ]);

    $id = (int) db()->lastInsertId();
    $row = db()->prepare('SELECT * FROM section_items WHERE id = ?');
    $row->execute([$id]);
    json_response(['item' => cast_item($row->fetch())], 201);
}

if ($method === 'PUT') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }
    $existing = db()->prepare('SELECT * FROM section_items WHERE id = ?');
    $existing->execute([$id]);
    $item = $existing->fetch();
    if (!$item) {
        json_error('Item not found', 404);
    }

    $body = json_body();
    $stmt = db()->prepare('UPDATE section_items SET sort_order = ?, data = ? WHERE id = ?');
    $stmt->execute([
        (int) ($body['sort_order'] ?? $item['sort_order']),
        array_key_exists('data', $body)
            ? json_encode($body['data'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            : $item['data'],
        $id,
    ]);

    $row = db()->prepare('SELECT * FROM section_items WHERE id = ?');
    $row->execute([$id]);
    json_response(['item' => cast_item($row->fetch())]);
}

if ($method === 'DELETE') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }
    db()->prepare('DELETE FROM section_items WHERE id = ?')->execute([$id]);
    json_response(['ok' => true]);
}

json_error('Method not allowed', 405);

function cast_item(array $row): array
{
    $row['id'] = (int) $row['id'];
    $row['section_id'] = (int) $row['section_id'];
    $row['sort_order'] = (int) $row['sort_order'];
    $row['data'] = json_decode($row['data'], true) ?? new stdClass();
    return $row;
}
