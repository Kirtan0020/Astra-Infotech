<?php

require_once __DIR__ . '/../auth.php';

$admin = require_auth();
$csrf = issue_csrf_token();

json_response(['admin' => $admin, 'csrfToken' => $csrf]);
