<?php

require_once __DIR__ . '/../auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

start_admin_session();
$_SESSION = [];
session_destroy();

json_response(['ok' => true]);
