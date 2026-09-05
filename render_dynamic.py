import asyncio
import os
import re
from urllib.parse import urlparse, urljoin
from playwright.async_api import async_playwright
import urllib.request

PAGES = [
    "https://umeshmunasinghe.wixsite.com/my-site",
    "https://umeshmunasinghe.wixsite.com/my-site/about",
    "https://umeshmunasinghe.wixsite.com/my-site/services",
    "https://umeshmunasinghe.wixsite.com/my-site/projects",
    "https://umeshmunasinghe.wixsite.com/my-site/privacy-policy",
    "https://umeshmunasinghe.wixsite.com/my-site/accessibility-statement"
]

OUTPUT_DIR = "/home/umesh/codeCamp/agWix/rendered_site"
ASSETS_DIR = os.path.join(OUTPUT_DIR, "assets")

os.makedirs(ASSETS_DIR, exist_ok=True)

async def download_asset(url, save_path):
    if os.path.exists(save_path):
        return
    try:
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response, open(save_path, 'wb') as out_file:
            out_file.write(response.read())
    except Exception:
        pass

async def render_site():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1920, 'height': 1080})

        for url in PAGES:
            print(f"Rendering dynamic page: {url}")
            page = await context.new_page()
            
            assets_to_download = set()
            page.on("response", lambda res: assets_to_download.add(res.url) if any(res.url.endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.css', '.js', '.woff2', '.json']) else None)

            try:
                await page.goto(url, wait_until="networkidle", timeout=60000)
                await asyncio.sleep(5)
            except Exception as e:
                print(f"Page load warning for {url}: {e}")

            content = await page.content()

            parsed = urlparse(url)
            path_parts = [p for p in parsed.path.split('/') if p]
            if not path_parts or path_parts[-1] == "my-site":
                filename = "index.html"
            else:
                filename = f"{path_parts[-1]}.html"
            
            save_path = os.path.join(OUTPUT_DIR, filename)
            with open(save_path, "w", encoding="utf-8") as f:
                f.write(content)

            print(f"Saved fully rendered HTML to {save_path}")
            await page.close()

            for asset_url in assets_to_download:
                p_asset = urlparse(asset_url)
                local_asset_path = os.path.join(ASSETS_DIR, p_asset.netloc, p_asset.path.lstrip('/'))
                await download_asset(asset_url, local_asset_path)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(render_site())
