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
    $stmt = $pdo->prepare('SELECT id, meta_title, meta_description, path FROM pages WHERE path = ? AND is_published = 1 LIMIT 1');
    $stmt->execute([$path]);
    $page = $stmt->fetch();

    $settingsStmt = $pdo->query('SELECT `key`, `value` FROM settings');
    $settings = [];
    foreach ($settingsStmt->fetchAll() as $row) {
        $settings[$row['key']] = $row['value'];
    }

    // FAQ items (if this page has a faq section) — surfaced as FAQPage JSON-LD
    // below so AI answer engines and search crawlers that don't execute
    // JavaScript can still read the actual Q&A content, not just the meta tags.
    $faqItems = [];
    if ($page) {
        $faqSectionStmt = $pdo->prepare(
            "SELECT id FROM sections WHERE page_id = ? AND type = 'faq' AND is_visible = 1 LIMIT 1"
        );
        $faqSectionStmt->execute([$page['id']]);
        $faqSection = $faqSectionStmt->fetch();
        if ($faqSection) {
            $faqItemStmt = $pdo->prepare('SELECT data FROM section_items WHERE section_id = ? ORDER BY sort_order ASC, id ASC');
            $faqItemStmt->execute([$faqSection['id']]);
            foreach ($faqItemStmt->fetchAll() as $itemRow) {
                $decoded = json_decode($itemRow['data'], true);
                if (!empty($decoded['q']) && !empty($decoded['a'])) {
                    $faqItems[] = $decoded;
                }
            }
        }
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

// Organization/ProfessionalService JSON-LD — on every page, so bots that
// only ever fetch one URL (not just the homepage) still see who Astra
// Infotech is, not just what the page says.
$sameAs = array_values(array_filter([
    $settings['social_twitter'] ?? '',
    $settings['social_linkedin'] ?? '',
    $settings['social_instagram'] ?? '',
    $settings['social_facebook'] ?? '',
    $settings['social_github'] ?? '',
]));
$orgJsonLd = [
    '@context' => 'https://schema.org',
    '@type' => 'ProfessionalService',
    'name' => $siteName,
    'url' => $siteUrl . '/',
    'logo' => $siteUrl . ($settings['logo_path'] ?? '/logo.png'),
    'image' => $siteUrl . ($settings['logo_path'] ?? '/logo.png'),
    'email' => $settings['email'] ?? '',
    'telephone' => $settings['phone'] ?? '',
    'areaServed' => 'Worldwide',
    'description' => 'Astra Infotech is a design & development studio offering web development, app development, UI/UX design, and branding.',
    'sameAs' => $sameAs,
];

// BreadcrumbList JSON-LD, mirroring the client-side logic in Seo.jsx.
$segments = array_values(array_filter(explode('/', $page['path'])));
$breadcrumbJsonLd = null;
if (count($segments) > 0) {
    $itemListElement = [
        ['@type' => 'ListItem', 'position' => 1, 'name' => $siteName, 'item' => $siteUrl],
    ];
    $accum = [];
    foreach ($segments as $i => $seg) {
        $accum[] = $seg;
        $itemListElement[] = [
            '@type' => 'ListItem',
            'position' => $i + 2,
            'name' => ucwords(str_replace('-', ' ', $seg)),
            'item' => $siteUrl . '/' . implode('/', $accum),
        ];
    }
    $breadcrumbJsonLd = [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => $itemListElement,
    ];
}

// FAQPage JSON-LD, when this page has FAQ items (see the query above).
$faqJsonLd = null;
if (count($faqItems) > 0) {
    $faqJsonLd = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => array_map(
            fn ($item) => [
                '@type' => 'Question',
                'name' => $item['q'],
                'acceptedAnswer' => ['@type' => 'Answer', 'text' => $item['a']],
            ],
            $faqItems
        ),
    ];
}

$jsonLdBlocks = array_filter([$orgJsonLd, $breadcrumbJsonLd, $faqJsonLd]);
$jsonLdScripts = implode(
    "\n",
    array_map(
        fn ($block) => '    <script type="application/ld+json">' . json_encode($block) . '</script>',
        $jsonLdBlocks
    )
);

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
{$jsonLdScripts}
  </head>
HTML;

$html = preg_replace('#</head>#', $headExtra, $html, 1);

header('Content-Type: text/html; charset=utf-8');
echo $html;
