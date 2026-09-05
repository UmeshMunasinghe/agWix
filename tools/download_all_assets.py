import glob, re, os, urllib.request, hashlib
from urllib.parse import urlparse

os.makedirs("rendered_site/assets", exist_ok=True)
url_map = {}

asset_pattern = re.compile(r'https?://(?:static\.wixstatic\.com|static\.parastorage\.com|video\.wixstatic\.com|music\.wixstatic\.com)/[^\s"\'\'\(\)<>\\}]+', re.IGNORECASE)

all_urls = set()
for path in glob.glob("rendered_site/*.html"):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    # Unescape escaped slashes in JSON
    text_unescaped = text.replace("\\/", "/")
    matches = asset_pattern.findall(text_unescaped)
    for m in matches:
        clean = m.rstrip('",\';}')
        # Filter for downloadable asset types
        if any(clean.split("?")[0].lower().endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.mp4', '.webm', '.css', '.js', '.woff', '.woff2', '.ttf', '.otf', '.eot']):
            all_urls.add(clean)

print(f"Found {len(all_urls)} external static asset URLs (images, css, js, fonts).")

downloaded_count = 0
for url in sorted(all_urls):
    clean_url = url.split("?")[0]
    ext = os.path.splitext(clean_url)[1]
    if not ext or len(ext) > 5:
        ext = ".bin"

    url_hash = hashlib.md5(url.encode()).hexdigest()[:10]
    filename = f"asset_{url_hash}{ext}"
    local_path = os.path.join("rendered_site/assets", filename)
    rel_path = f"assets/{filename}"

    if not os.path.exists(local_path):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=10) as response, open(local_path, "wb") as out_file:
                out_file.write(response.read())
            downloaded_count += 1
        except Exception as e:
            print(f"Failed: {url[:60]}... ({e})")
            continue

    url_map[url] = rel_path
    # Also map backslash escaped variant
    url_map[url.replace("/", "\\/")] = f"assets\\/{filename}"

print(f"Downloaded {downloaded_count} new assets.")

# Update HTML files
for path in glob.glob("rendered_site/*.html"):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    for remote_url, local_url in url_map.items():
        content = content.replace(remote_url, local_url)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("Local asset replacement finished!")
