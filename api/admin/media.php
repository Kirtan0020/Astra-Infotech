<?php

require_once __DIR__ . '/../auth.php';

require_auth();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = db()->query('SELECT * FROM media ORDER BY uploaded_at DESC, id DESC')->fetchAll();
    json_response(['media' => array_map('cast_media', $rows)]);
}

if ($method === 'DELETE') {
    require_csrf();
    $id = (int) ($_GET['id'] ?? 0);
    if ($id <= 0) {
        json_error('id is required', 400);
    }

    $existing = db()->prepare('SELECT * FROM media WHERE id = ?');
    $existing->execute([$id]);
    $file = $existing->fetch();
    if (!$file) {
        json_error('Media not found', 404);
    }

    $absolute = realpath(__DIR__ . '/../../public' . $file['path']);
    $uploadsRoot = realpath(__DIR__ . '/../../public/uploads');
    if ($absolute !== false && $uploadsRoot !== false && str_starts_with($absolute, $uploadsRoot) && is_file($absolute)) {
        @unlink($absolute);
    }

    db()->prepare('DELETE FROM media WHERE id = ?')->execute([$id]);
    json_response(['ok' => true]);
}

json_error('Method not allowed', 405);

function cast_media(array $row): array
{
    $row['id'] = (int) $row['id'];
    $row['size_bytes'] = (int) $row['size_bytes'];
    $row['width'] = $row['width'] !== null ? (int) $row['width'] : null;
    $row['height'] = $row['height'] !== null ? (int) $row['height'] : null;
    return $row;
}
