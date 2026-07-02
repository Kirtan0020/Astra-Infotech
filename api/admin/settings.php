<?php

require_once __DIR__ . '/../auth.php';

require_auth();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $rows = db()->query('SELECT `key`, `value` FROM settings ORDER BY `key` ASC')->fetchAll();
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['key']] = $row['value'];
    }
    json_response(['settings' => $settings]);
}

if ($method === 'POST') {
    require_csrf();
    $body = json_body();
    if (!is_array($body) || count($body) === 0) {
        json_error('At least one key/value pair is required', 400);
    }

    $stmt = db()->prepare(
        'INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)'
    );
    foreach ($body as $key => $value) {
        $stmt->execute([(string) $key, (string) $value]);
    }

    $rows = db()->query('SELECT `key`, `value` FROM settings ORDER BY `key` ASC')->fetchAll();
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['key']] = $row['value'];
    }
    json_response(['settings' => $settings]);
}

json_error('Method not allowed', 405);
