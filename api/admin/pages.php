<?php

require_once __DIR__ . '/../auth.php';

require_auth();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = db()->query('SELECT * FROM pages ORDER BY sort_order ASC, id ASC')->fetchAll();
    json_response(['pages' => array_map('cast_page', $rows)]);
}

if ($method === 'POST') {
    require_csrf();
    $body = json_body();
    $slug = trim($body['slug'] ?? '');
    $path = trim($body['path'] ?? '');
    $title = trim($body['title'] ?? '');

    if ($slug === '' || $path === '' || $title === '') {
        json_error('slug, path and title are required', 400);
    }

    $layout = $body['layout'] ?? 'normal';
    if (!in_array($layout, ['normal', 'stacked'], true)) {
        $layout = 'normal';
    }

    $stmt = db()->prepare(
        'INSERT INTO pages (slug, path, title, meta_title, meta_description, layout, is_system, is_published, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)'
    );
    $stmt->execute([
        $slug,
        $path,
        $title,
        $body['meta_title'] ?? $title,
        $body['meta_description'] ?? '',
        $layout,
        !empty($body['is_published']) ? 1 : 1,
        (int) ($body['sort_order'] ?? 0),
    ]);

    $id = (int) db()->lastInsertId();
    $row = db()->prepare('SELECT * FROM pages WHERE id = ?');
    $row->execute([$id]);
    json_response(['page' => cast_page($row->fetch())], 201);
}

if ($method === 'PUT') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }

    $existing = db()->prepare('SELECT * FROM pages WHERE id = ?');
    $existing->execute([$id]);
    $page = $existing->fetch();
    if (!$page) {
        json_error('Page not found', 404);
    }

    $body = json_body();

    if ($page['is_system'] && isset($body['slug']) && $body['slug'] !== $page['slug']) {
        json_error('Cannot rename slug of a system page', 400);
    }

    $layout = $body['layout'] ?? $page['layout'];
    if (!in_array($layout, ['normal', 'stacked'], true)) {
        $layout = $page['layout'];
    }

    $stmt = db()->prepare(
        'UPDATE pages SET slug = ?, path = ?, title = ?, meta_title = ?, meta_description = ?, layout = ?, is_published = ?, sort_order = ? WHERE id = ?'
    );
    $stmt->execute([
        $body['slug'] ?? $page['slug'],
        $body['path'] ?? $page['path'],
        $body['title'] ?? $page['title'],
        $body['meta_title'] ?? $page['meta_title'],
        $body['meta_description'] ?? $page['meta_description'],
        $layout,
        isset($body['is_published']) ? (int) (bool) $body['is_published'] : $page['is_published'],
        (int) ($body['sort_order'] ?? $page['sort_order']),
        $id,
    ]);

    $row = db()->prepare('SELECT * FROM pages WHERE id = ?');
    $row->execute([$id]);
    json_response(['page' => cast_page($row->fetch())]);
}

if ($method === 'DELETE') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }

    $existing = db()->prepare('SELECT is_system FROM pages WHERE id = ?');
    $existing->execute([$id]);
    $page = $existing->fetch();
    if (!$page) {
        json_error('Page not found', 404);
    }
    if ($page['is_system']) {
        json_error('Cannot delete a system page', 400);
    }

    db()->prepare('DELETE FROM pages WHERE id = ?')->execute([$id]);
    json_response(['ok' => true]);
}

json_error('Method not allowed', 405);

function cast_page(array $row): array
{
    $row['id'] = (int) $row['id'];
    $row['is_system'] = (bool) $row['is_system'];
    $row['is_published'] = (bool) $row['is_published'];
    $row['sort_order'] = (int) $row['sort_order'];
    return $row;
}
