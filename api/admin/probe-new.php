<?php
// Temporary probe file for hosting-side existence check — delete after use.
header('Content-Type: text/plain');
echo "probe file reached — deployed 2026-08-27\n";
echo "__FILE__ = " . __FILE__ . "\n";
echo "__DIR__ = " . __DIR__ . "\n";
