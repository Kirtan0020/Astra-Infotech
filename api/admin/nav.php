<?php

require_once __DIR__ . '/../auth.php';

require_auth();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $menu = $_GET['menu'] ?? null;
    if ($menu !== null) {
        $stmt = db()->prepare('SELECT * FROM nav_links WHERE menu = ? ORDER BY sort_order ASC, id ASC');
        $stmt->execute([$menu]);
    } else {
        $stmt = db()->query('SELECT * FROM nav_links ORDER BY menu ASC, sort_order ASC, id ASC');
    }
    json_response(['navLinks' => array_map('cast_nav', $stmt->fetchAll())]);
}

if ($method === 'POST') {
    require_csrf();
    $body = json_body();
    $label = trim($body['label'] ?? '');
    $href = trim($body['href'] ?? '');
    $menu = in_array($body['menu'] ?? 'primary', ['primary', 'footer'], true) ? $body['menu'] : 'primary';

    if ($label === '' || $href === '') {
        json_error('label and href are required', 400);
    }

    $stmt = db()->prepare(
        'INSERT INTO nav_links (menu, parent_id, group_label, label, href, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $menu,
        !empty($body['parent_id']) ? (int) $body['parent_id'] : null,
        $body['group_label'] ?? null,
        $label,
        $href,
        (int) ($body['sort_order'] ?? 0),
    ]);

    $id = (int) db()->lastInsertId();
    $row = db()->prepare('SELECT * FROM nav_links WHERE id = ?');
    $row->execute([$id]);
    json_response(['navLink' => cast_nav($row->fetch())], 201);
}

if ($method === 'PUT') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }
    $existing = db()->prepare('SELECT * FROM nav_links WHERE id = ?');
    $existing->execute([$id]);
    $link = $existing->fetch();
    if (!$link) {
        json_error('Nav link not found', 404);
    }

    $body = json_body();
    $stmt = db()->prepare(
        'UPDATE nav_links SET menu = ?, parent_id = ?, group_label = ?, label = ?, href = ?, sort_order = ? WHERE id = ?'
    );
    $stmt->execute([
        in_array($body['menu'] ?? $link['menu'], ['primary', 'footer'], true) ? ($body['menu'] ?? $link['menu']) : $link['menu'],
        array_key_exists('parent_id', $body) ? (empty($body['parent_id']) ? null : (int) $body['parent_id']) : $link['parent_id'],
        array_key_exists('group_label', $body) ? $body['group_label'] : $link['group_label'],
        $body['label'] ?? $link['label'],
        $body['href'] ?? $link['href'],
        (int) ($body['sort_order'] ?? $link['sort_order']),
        $id,
    ]);

    $row = db()->prepare('SELECT * FROM nav_links WHERE id = ?');
    $row->execute([$id]);
    json_response(['navLink' => cast_nav($row->fetch())]);
}

if ($method === 'DELETE') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }
    db()->prepare('DELETE FROM nav_links WHERE id = ?')->execute([$id]);
    json_response(['ok' => true]);
}

json_error('Method not allowed', 405);

function cast_nav(array $row): array
{
    $row['id'] = (int) $row['id'];
    $row['parent_id'] = $row['parent_id'] !== null ? (int) $row['parent_id'] : null;
    $row['sort_order'] = (int) $row['sort_order'];
    return $row;
}
