import asyncio
import os
from urllib.parse import urlparse

from playwright.async_api import async_playwright

from offline_export.assets import download_asset
from offline_export.capture_config import PAGES, page_output_name
from offline_export.site_files import RENDERED_SITE_DIRECTORY

OUTPUT_DIR = str(RENDERED_SITE_DIRECTORY)
ASSETS_DIR = os.path.join(OUTPUT_DIR, "assets")

os.makedirs(ASSETS_DIR, exist_ok=True)

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

            filename = page_output_name(url)
            save_path = os.path.join(OUTPUT_DIR, filename)
            with open(save_path, "w", encoding="utf-8") as f:
                f.write(content)

            print(f"Saved fully rendered HTML to {save_path}")
            await page.close()

            for asset_url in assets_to_download:
                p_asset = urlparse(asset_url)
                local_asset_path = os.path.join(ASSETS_DIR, p_asset.netloc, p_asset.path.lstrip('/'))
                await download_asset(asset_url, local_asset_path, "Mozilla/5.0")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(render_site())
