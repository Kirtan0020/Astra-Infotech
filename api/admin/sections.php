<?php

require_once __DIR__ . '/../auth.php';

require_auth();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $pageId = (int) ($_GET['page_id'] ?? 0);
    if ($pageId <= 0) {
        json_error('page_id is required', 400);
    }
    $stmt = db()->prepare('SELECT * FROM sections WHERE page_id = ? ORDER BY sort_order ASC, id ASC');
    $stmt->execute([$pageId]);
    json_response(['sections' => array_map('cast_section', $stmt->fetchAll())]);
}

if ($method === 'POST') {
    require_csrf();
    $body = json_body();
    $pageId = (int) ($body['page_id'] ?? 0);
    $type = trim($body['type'] ?? '');
    if ($pageId <= 0 || $type === '') {
        json_error('page_id and type are required', 400);
    }

    $maxOrder = db()->prepare('SELECT COALESCE(MAX(sort_order), -1) FROM sections WHERE page_id = ?');
    $maxOrder->execute([$pageId]);
    $nextOrder = ((int) $maxOrder->fetchColumn()) + 1;

    $stmt = db()->prepare('INSERT INTO sections (page_id, type, sort_order, is_visible, data) VALUES (?, ?, ?, 1, ?)');
    $stmt->execute([
        $pageId,
        $type,
        (int) ($body['sort_order'] ?? $nextOrder),
        json_encode($body['data'] ?? new stdClass(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
    ]);

    $id = (int) db()->lastInsertId();
    $row = db()->prepare('SELECT * FROM sections WHERE id = ?');
    $row->execute([$id]);
    json_response(['section' => cast_section($row->fetch())], 201);
}

if ($method === 'PUT') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }
    $existing = db()->prepare('SELECT * FROM sections WHERE id = ?');
    $existing->execute([$id]);
    $section = $existing->fetch();
    if (!$section) {
        json_error('Section not found', 404);
    }

    $body = json_body();
    $stmt = db()->prepare('UPDATE sections SET type = ?, sort_order = ?, is_visible = ?, data = ? WHERE id = ?');
    $stmt->execute([
        $body['type'] ?? $section['type'],
        (int) ($body['sort_order'] ?? $section['sort_order']),
        isset($body['is_visible']) ? (int) (bool) $body['is_visible'] : $section['is_visible'],
        array_key_exists('data', $body)
            ? json_encode($body['data'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            : $section['data'],
        $id,
    ]);

    $row = db()->prepare('SELECT * FROM sections WHERE id = ?');
    $row->execute([$id]);
    json_response(['section' => cast_section($row->fetch())]);
}

if ($method === 'DELETE') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }
    db()->prepare('DELETE FROM sections WHERE id = ?')->execute([$id]);
    json_response(['ok' => true]);
}

json_error('Method not allowed', 405);

function cast_section(array $row): array
{
    $row['id'] = (int) $row['id'];
    $row['page_id'] = (int) $row['page_id'];
    $row['sort_order'] = (int) $row['sort_order'];
    $row['is_visible'] = (bool) $row['is_visible'];
    $row['data'] = json_decode($row['data'], true) ?? new stdClass();
    return $row;
}
