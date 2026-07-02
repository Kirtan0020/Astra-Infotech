<?php
// Copy this file to config.php and fill in real values.
// config.php is gitignored — never commit real credentials.

return [
    'db' => [
        'host' => 'localhost',
        'name' => 'astra_cms',
        'user' => 'root',
        'pass' => '',
        'charset' => 'utf8mb4',
    ],
    'session_name' => 'astra_cms_session',
    // Used for local admin_users seeding only — change before deploying.
    'admin_username' => 'admin',
    'admin_password' => 'change-me',
];
