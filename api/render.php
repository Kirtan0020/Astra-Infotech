<?php
// Server-side head-tag injector — the SPA fallback route goes through this
// instead of serving index.html directly. Looks up the requested path in
// the CMS database and rewrites <title>/description/canonical/OG tags
// before the HTML reaches the browser, so crawlers and link-preview bots
// that don't execute JavaScript (WhatsApp, Facebook, etc.) still see the
// correct per-page metadata. Always stays in sync with live content —
// no build/redeploy needed when a page is edited in /admin.
//
// The React app still renders and re-applies the same tags client-side via
// react-helmet-async; this only fixes what non-JS clients see.

require_once __DIR__ . '/db.php';

function serve_static_index(): void
{
    $indexPath = __DIR__ . '/../index.html';
    header('Content-Type: text/html; charset=utf-8');
    readfile($indexPath);
    exit;
}

$indexPath = __DIR__ . '/../index.html';
if (!is_file($indexPath)) {
    http_response_code(500);
    exit('Site not built.');
}

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
// Normalize trailing slash (except root) so '/services/' and '/services' match.
if ($path !== '/' && str_ends_with($path, '/')) {
    $path = rtrim($path, '/');
}

try {
    $pdo = db();
    $stmt = $pdo->prepare('SELECT meta_title, meta_description, path FROM pages WHERE path = ? AND is_published = 1 LIMIT 1');
    $stmt->execute([$path]);
    $page = $stmt->fetch();

    $settingsStmt = $pdo->query("SELECT `key`, `value` FROM settings WHERE `key` IN ('site_url','site_name','default_og_image')");
    $settings = [];
    foreach ($settingsStmt->fetchAll() as $row) {
        $settings[$row['key']] = $row['value'];
    }
} catch (Throwable $e) {
    // DB unreachable — degrade to the plain static shell rather than error out.
    serve_static_index();
}

if (!$page) {
    serve_static_index();
}

$siteUrl = rtrim($settings['site_url'] ?? '', '/');
$siteName = $settings['site_name'] ?? '';
$ogImage = $settings['default_og_image'] ?? '';
$url = $siteUrl . $page['path'];

$title = htmlspecialchars($page['meta_title'], ENT_QUOTES, 'UTF-8');
$description = htmlspecialchars($page['meta_description'], ENT_QUOTES, 'UTF-8');
$urlEsc = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');
$siteNameEsc = htmlspecialchars($siteName, ENT_QUOTES, 'UTF-8');
$ogImageEsc = htmlspecialchars($ogImage, ENT_QUOTES, 'UTF-8');

$html = file_get_contents($indexPath);

$html = preg_replace('#<title>.*?</title>#s', "<title>{$title}</title>", $html, 1);

$headExtra = <<<HTML
    <meta name="description" content="{$description}" />
    <link rel="canonical" href="{$urlEsc}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="{$siteNameEsc}" />
    <meta property="og:title" content="{$title}" />
    <meta property="og:description" content="{$description}" />
    <meta property="og:url" content="{$urlEsc}" />
    <meta property="og:image" content="{$ogImageEsc}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{$title}" />
    <meta name="twitter:description" content="{$description}" />
    <meta name="twitter:image" content="{$ogImageEsc}" />
  </head>
HTML;

$html = preg_replace('#</head>#', $headExtra, $html, 1);

header('Content-Type: text/html; charset=utf-8');
echo $html;
