<?php

require_once __DIR__ . '/../auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

start_admin_session();

$body = json_body();
$username = trim($body['username'] ?? '');
$password = (string) ($body['password'] ?? '');

if ($username === '' || $password === '') {
    json_error('Username and password are required', 400);
}

$stmt = db()->prepare('SELECT * FROM admin_users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user) {
    json_error('Invalid credentials', 401);
}

if ($user['locked_until'] !== null && strtotime($user['locked_until']) > time()) {
    json_error('Too many failed attempts. Try again later.', 429);
}

if (!password_verify($password, $user['password_hash'])) {
    $attempts = (int) $user['failed_attempts'] + 1;
    $lockedUntil = null;
    if ($attempts >= 5) {
        $lockedUntil = date('Y-m-d H:i:s', time() + 300); // 5-minute lockout
        $attempts = 0;
    }
    $stmt = db()->prepare('UPDATE admin_users SET failed_attempts = ?, locked_until = ? WHERE id = ?');
    $stmt->execute([$attempts, $lockedUntil, $user['id']]);
    json_error('Invalid credentials', 401);
}

db()->prepare('UPDATE admin_users SET failed_attempts = 0, locked_until = NULL WHERE id = ?')
    ->execute([$user['id']]);

session_regenerate_id(true);
$_SESSION['admin_id'] = (int) $user['id'];
$_SESSION['admin_username'] = $user['username'];
$csrf = issue_csrf_token();

json_response([
    'admin' => ['id' => (int) $user['id'], 'username' => $user['username']],
    'csrfToken' => $csrf,
]);
