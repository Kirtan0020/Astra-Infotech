<?php
// Temporary utility — clears PHP's opcode cache so freshly-deployed code
// takes effect immediately instead of waiting on a process restart. Delete
// after use.
require_once __DIR__ . '/../auth.php';
require_auth();

$result = [
    'opcache_available' => function_exists('opcache_reset'),
];

if (function_exists('opcache_reset')) {
    $result['opcache_reset_result'] = opcache_reset();
}

if (function_exists('opcache_get_status')) {
    $status = opcache_get_status(false);
    $result['opcache_enabled'] = $status !== false;
}

json_response($result);
