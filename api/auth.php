<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/response.php';

function start_admin_session(): void
{
    static $started = false;
    if ($started) {
        return;
    }
    $config = require __DIR__ . '/config.php';

    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        // Automatically secure-only once served over HTTPS (true in production;
        // stays off for local http://localhost dev, which has no HTTPS at all).
        'secure' => $isHttps,
    ]);
    session_name($config['session_name']);
    session_start();
    $started = true;
}

function current_admin(): ?array
{
    start_admin_session();
    if (empty($_SESSION['admin_id'])) {
        return null;
    }
    return [
        'id' => $_SESSION['admin_id'],
        'username' => $_SESSION['admin_username'],
    ];
}

function require_auth(): array
{
    $admin = current_admin();
    if ($admin === null) {
        json_error('Unauthorized', 401);
    }
    return $admin;
}

function require_csrf(): void
{
    start_admin_session();
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $expected = $_SESSION['csrf_token'] ?? '';
    if ($expected === '' || !hash_equals($expected, $token)) {
        json_error('Invalid CSRF token', 403);
    }
}

function issue_csrf_token(): string
{
    start_admin_session();
    $token = bin2hex(random_bytes(32));
    $_SESSION['csrf_token'] = $token;
    return $token;
}
