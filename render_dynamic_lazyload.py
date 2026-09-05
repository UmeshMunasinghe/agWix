import asyncio
import os
from urllib.parse import urlparse
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
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=10) as response, open(save_path, 'wb') as out_file:
            out_file.write(response.read())
    except Exception as e:
        pass

async def scroll_page_to_bottom(page):
    """Scroll down slowly to trigger lazy loading of images, scripts, network requests and components."""
    last_height = await page.evaluate("document.body.scrollHeight")
    while True:
        await page.evaluate("window.scrollBy(0, 500)")
        await asyncio.sleep(0.5)
        new_height = await page.evaluate("window.pageYOffset + window.innerHeight")
        max_height = await page.evaluate("document.body.scrollHeight")
        if new_height >= max_height:
            # Extra wait for lazy-loaded assets to finish fetching
            await asyncio.sleep(3)
            break

async def render_site():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 1920, 'height': 1080})

        for url in PAGES:
            print(f"Rendering & capturing lazy-loaded content for: {url}")
            page = await context.new_page()
            
            assets_to_download = set()
            
            # Intercept and log all network requests triggered dynamically
            def on_response(res):
                u = res.url
                # Capture static assets, lazy images, JSON APIs, thunderbolt components, fonts, scripts
                if any(ext in u.lower() for ext in ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.css', '.js', '.woff2', '.json']) or 'parastorage.com' in u or 'wixstatic.com' in u:
                    assets_to_download.add(u)

            page.on("response", on_response)

            try:
                await page.goto(url, wait_until="domcontentloaded", timeout=60000)
                await asyncio.sleep(2)
                
                # Perform full page scrolling to trigger all lazy-loaded content
                await scroll_page_to_bottom(page)
                
            except Exception as e:
                print(f"Warning during scroll/load for {url}: {e}")

            # Grab fully updated DOM after lazy loading completes
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

            print(f"Saved complete DOM (with lazy-loaded content) to {save_path}")
            await page.close()

            print(f"Downloading {len(assets_to_download)} lazy-loaded network assets...")
            for asset_url in assets_to_download:
                p_asset = urlparse(asset_url)
                # Keep domain/path structure locally
                local_asset_path = os.path.join(ASSETS_DIR, p_asset.netloc, p_asset.path.lstrip('/'))
                await download_asset(asset_url, local_asset_path)

        await browser.close()
        print("Completed capturing all lazy-loaded content!")

if __name__ == "__main__":
    asyncio.run(render_site())
