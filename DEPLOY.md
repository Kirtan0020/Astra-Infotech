# Deploying to Hostinger

Domain: `astrainfotech.net`. Everything below assumes the standard Hostinger
shared-hosting hPanel (phpMyAdmin, File Manager, MySQL Databases).

## 1. Build the site

```
npm run build
```
Produces `dist/` — this is what goes live as the static frontend.

## 2. Create the production database

In hPanel → **Databases → MySQL Databases**, create a database + user — already done; the real
name/user/password are filled into `api/config.production.php` (gitignored, not in this doc).

Confirm the **database host** shown on that hPanel page (usually `localhost`, but Hostinger occasionally shows a different internal hostname) — `api/config.production.php` currently assumes `localhost`; edit it if hPanel shows something else.

## 3. Import the schema + real content

In hPanel → **Databases → phpMyAdmin**, open the new database, go to **Import**, and upload:

```
db/production-import.sql
```

This creates 6 tables (`pages`, `sections`, `section_items`, `media`, `settings`, `nav_links`) already filled with the site's real current content — no separate seed step needed.

Then, still in phpMyAdmin, run this SQL (**SQL** tab) to create the 7th table for admin login:

```sql
CREATE TABLE admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  failed_attempts INT UNSIGNED NOT NULL DEFAULT 0,
  locked_until DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## 4. Create your admin login (without typing the password anywhere but your own machine)

On your own computer (XAMPP's PHP works fine for this), run:

```
php -r "echo password_hash('YOUR-CHOSEN-PASSWORD', PASSWORD_BCRYPT);"
```

Copy the output (starts with `$2y$...`), then in phpMyAdmin's SQL tab run (replace both placeholders):

```sql
INSERT INTO admin_users (username, password_hash) VALUES ('admin', 'PASTE_THE_HASH_HERE');
```

That's your real production login — `astra-admin-local-2026` (the local dev password) is never used in production.

## 5. `api/config.php` for production

Already prepared as **`api/config.production.php`** with the real DB credentials filled in.
It's gitignored (never committed) — when you upload the `api/` folder in the next step,
upload this file too but **rename it to `config.php`** on the server (don't upload both).

## 6. Upload files

Via hPanel File Manager (or FTP/SFTP client) into `public_html/`:

```
public_html/
  (contents of dist/ — index.html, assets/, logo.png, robots.txt, sitemap.xml, .htaccess, etc.)
  api/                 ← the whole api/ folder from the repo, EXCEPT rename config.production.php
                          to config.php on the server (don't upload config.production.php as-is,
                          and don't upload the local api/config.php — that one has local XAMPP creds)
  uploads/              ← empty folder, must be writable (for future media-library uploads)
```

Do **not** upload `db/`, `scripts/`, `node_modules/`, or `src/` — only `dist/*` + `api/` + an empty `uploads/` folder are needed live.

## 7. Verify

- `https://astrainfotech.net/` loads and matches the local site.
- `https://astrainfotech.net/api/public/site.php` returns JSON (not a 404 or PHP error).
- `https://astrainfotech.net/admin/login` logs in with the username/password from step 4.
- Editing something in `/admin` and refreshing the public site shows the change — with no redeploy.

## Notes

- `.vscode/sftp.json` is set to SFTP (port 22) — check hPanel → Advanced → SSH Access to confirm your plan supports it; if not, use FTP (port 21) with the same File Manager credentials instead.
- If `/api/...` returns a 404, double check `.htaccess` uploaded correctly (it's a hidden file — some FTP clients/File Managers hide dotfiles by default). This applies to **three** `.htaccess` files: `public_html/.htaccess`, `public_html/api/.htaccess`, and `public_html/uploads/.htaccess` (the last two come from `api/.htaccess`/`api/scripts/.htaccess` and `public/uploads/.htaccess` in the repo) — all three matter for security, not just routing.

## Security hardening already in place

- HTTPS force-redirect, `X-Content-Type-Options`/`X-Frame-Options`/`Referrer-Policy` headers (`.htaccess` + set again in PHP as a fallback).
- Session cookie is `HttpOnly`, `SameSite=Lax`, and auto-`Secure` once served over HTTPS.
- CSRF token required on every admin mutation; bcrypt password hashing; 5 failed logins locks that account for 5 minutes.
- All SQL is parameterized (PDO prepared statements) — no string-built queries anywhere.
- Uploads: JPG/PNG/WebP only (SVG intentionally excluded — SVG can carry embedded scripts), 8MB cap, real MIME-type sniffed from file content (not filename), server-generated filenames, and the `uploads/` folder itself has PHP execution disabled via `.htaccess` so even a file that somehow got through can't run.
- Rich-text sections are sanitized with DOMPurify before rendering (blocks stored XSS via that one free-text field).
- PHP errors are never shown to visitors (`display_errors` off, exceptions caught and logged server-side, generic `{"error":"Internal server error"}` returned instead) — so a crash never leaks a DB password or file path.
- Internal PHP files (`db.php`, `auth.php`, `config.php`, etc.) and the CLI-only `api/scripts/` folder are denied direct web access via `.htaccess`, on top of already being harmless if hit directly.
