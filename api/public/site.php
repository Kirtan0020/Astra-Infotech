<?php

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../response.php';

$pdo = db();

$settingsRows = $pdo->query('SELECT `key`, `value` FROM settings')->fetchAll();
$settings = [];
foreach ($settingsRows as $row) {
    $settings[$row['key']] = $row['value'];
}

$navRows = $pdo->query(
    "SELECT * FROM nav_links WHERE menu = 'primary' ORDER BY sort_order ASC, id ASC"
)->fetchAll();
$navById = [];
foreach ($navRows as $row) {
    $navById[(int) $row['id']] = [
        'label' => $row['label'],
        'href' => $row['href'],
        'children' => [],
    ];
}
$navLinks = [];
foreach ($navRows as $row) {
    $id = (int) $row['id'];
    if ($row['parent_id'] !== null && isset($navById[(int) $row['parent_id']])) {
        $navById[(int) $row['parent_id']]['children'][] = $navById[$id];
    } else {
        $navLinks[] = &$navById[$id];
    }
}
array_walk_recursive_children($navLinks);
unset($link);

function array_walk_recursive_children(array &$links): void
{
    foreach ($links as &$link) {
        if (empty($link['children'])) {
            unset($link['children']);
        } else {
            array_walk_recursive_children($link['children']);
        }
    }
    unset($link);
}

$footerRows = $pdo->query(
    "SELECT * FROM nav_links WHERE menu = 'footer' ORDER BY group_label ASC, sort_order ASC, id ASC"
)->fetchAll();
$footerGroups = [];
foreach ($footerRows as $row) {
    $group = $row['group_label'] ?? '';
    if (!isset($footerGroups[$group])) {
        $footerGroups[$group] = ['title' => $group, 'links' => []];
    }
    $footerGroups[$group]['links'][] = ['label' => $row['label'], 'href' => $row['href']];
}
$footerLinks = array_values($footerGroups);

$pageRows = $pdo->query('SELECT * FROM pages WHERE is_published = 1 ORDER BY sort_order ASC, id ASC')->fetchAll();
$pages = [];
foreach ($pageRows as $pageRow) {
    $sectionStmt = $pdo->prepare('SELECT * FROM sections WHERE page_id = ? AND is_visible = 1 ORDER BY sort_order ASC, id ASC');
    $sectionStmt->execute([$pageRow['id']]);
    $sectionRows = $sectionStmt->fetchAll();

    $sections = [];
    foreach ($sectionRows as $sectionRow) {
        $itemStmt = $pdo->prepare('SELECT * FROM section_items WHERE section_id = ? ORDER BY sort_order ASC, id ASC');
        $itemStmt->execute([$sectionRow['id']]);
        $items = array_map(
            fn ($item) => json_decode($item['data'], true) ?? new stdClass(),
            $itemStmt->fetchAll()
        );

        $sections[] = [
            'type' => $sectionRow['type'],
            'data' => json_decode($sectionRow['data'], true) ?? new stdClass(),
            'items' => $items,
        ];
    }

    $pages[$pageRow['slug']] = [
        'slug' => $pageRow['slug'],
        'path' => $pageRow['path'],
        'title' => $pageRow['title'],
        'layout' => $pageRow['layout'],
        'meta' => [
            'title' => $pageRow['meta_title'],
            'description' => $pageRow['meta_description'],
            'path' => $pageRow['path'],
        ],
        'sections' => $sections,
    ];
}

json_response([
    'settings' => $settings,
    'navLinks' => $navLinks,
    'footerLinks' => $footerLinks,
    'pages' => $pages,
]);
