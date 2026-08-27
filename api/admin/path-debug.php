<?php
// Temporary diagnostic script — delete after use.
require_once __DIR__ . '/../auth.php';
require_auth();

$siblingRoot = dirname(__DIR__, 2);
$publicDir = $siblingRoot . '/public';
$uploadsRootNew = is_dir($publicDir) ? $publicDir . '/uploads' : $siblingRoot . '/uploads';
$uploadsRootFlat = $siblingRoot . '/uploads';

json_response([
    'php_version' => PHP_VERSION,
    '__DIR__' => __DIR__,
    'siblingRoot' => $siblingRoot,
    'publicDir_exists' => is_dir($publicDir),
    'uploadsRootNew_computed' => $uploadsRootNew,
    'uploadsRootNew_exists' => is_dir($uploadsRootNew),
    'uploadsRootNew_writable' => is_dir($uploadsRootNew) ? is_writable($uploadsRootNew) : null,
    'uploadsRootFlat' => $uploadsRootFlat,
    'uploadsRootFlat_exists' => is_dir($uploadsRootFlat),
    'uploadsRootFlat_contents' => is_dir($uploadsRootFlat) ? scandir($uploadsRootFlat) : null,
    'index_html_sibling_check' => is_file($siblingRoot . '/index.html'),
    'opcache_enabled' => function_exists('opcache_get_status') ? (opcache_get_status(false) !== false) : 'n/a',
]);
