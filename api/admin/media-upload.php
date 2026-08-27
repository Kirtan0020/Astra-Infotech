<?php

require_once __DIR__ . '/../auth.php';

require_auth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}
require_csrf();

if (empty($_FILES['file'])) {
    json_error('No file uploaded', 400);
}

$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    json_error('Upload failed (code ' . $file['error'] . ')', 400);
}

const MAX_BYTES = 8 * 1024 * 1024; // 8MB — keep hero/photo uploads web-reasonable
// SVG is deliberately excluded: it can carry embedded <script>/<foreignObject>
// content and would be a stored-XSS vector served straight back to browsers.
const ALLOWED_MIME = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];

if ($file['size'] > MAX_BYTES) {
    json_error('File is too large (max 8MB)', 400);
}

$mime = mime_content_type($file['tmp_name']);
if (!isset(ALLOWED_MIME[$mime])) {
    json_error('Unsupported file type — use JPG, PNG, or WebP', 400);
}
$ext = ALLOWED_MIME[$mime];

$info = @getimagesize($file['tmp_name']);
if ($info === false) {
    json_error('File is not a valid image', 400);
}
$width = $info[0];
$height = $info[1];

// __DIR__ is api/admin; two levels up is the repo root in local dev (where
// Vite serves public/ as the web root, so uploads must land in
// public/uploads for the browser to see them) but is public_html directly
// in production (dist/ was deployed flattened into public_html/ with no
// "public" wrapper — see DEPLOY.md — so uploads must live at
// public_html/uploads, not public_html/public/uploads). Checking whether a
// sibling "public" directory exists picks the right one in both cases
// without needing an explicit environment flag.
$siblingRoot = dirname(__DIR__, 2);
$uploadsRoot = is_dir($siblingRoot . '/public')
    ? $siblingRoot . '/public/uploads'
    : $siblingRoot . '/uploads';
$subdir = '/' . date('Y') . '/' . date('m');
$destDir = $uploadsRoot . $subdir;
if (!is_dir($destDir) && !mkdir($destDir, 0755, true) && !is_dir($destDir)) {
    json_error('Could not create upload directory', 500);
}

$safeName = preg_replace('/[^a-zA-Z0-9_-]/', '-', pathinfo($file['name'], PATHINFO_FILENAME));
$filename = $safeName . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$destPath = $destDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    json_error('Could not save uploaded file', 500);
}

$publicPath = '/uploads' . $subdir . '/' . $filename;

$stmt = db()->prepare(
    'INSERT INTO media (path, original_name, alt_text, mime_type, size_bytes, width, height) VALUES (?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([
    $publicPath,
    $file['name'],
    $_POST['alt_text'] ?? '',
    $mime,
    $file['size'],
    $width,
    $height,
]);

$id = (int) db()->lastInsertId();
$row = db()->prepare('SELECT * FROM media WHERE id = ?');
$row->execute([$id]);
$media = $row->fetch();
$media['id'] = (int) $media['id'];
$media['size_bytes'] = (int) $media['size_bytes'];
$media['width'] = $media['width'] !== null ? (int) $media['width'] : null;
$media['height'] = $media['height'] !== null ? (int) $media['height'] : null;

json_response(['media' => $media], 201);
