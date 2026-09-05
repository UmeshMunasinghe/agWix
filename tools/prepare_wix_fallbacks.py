"""Cache direct Wix CDN assets and add a CDN-first local fallback."""

import argparse
import asyncio
import re
from pathlib import Path
from urllib.parse import urlparse

from offline_export.assets import download_asset
from offline_export.site_files import RENDERED_SITE_DIRECTORY, iter_html_files, read_text, write_text
from offline_export.wix_fallbacks import inject_fallback_script, local_fallback_path


DIRECT_ASSET_URL = re.compile(
    r'(?:src|href)="(https://(?:static|siteassets)\.parastorage\.com/[^"\s]+)"'
)


def is_wix_asset(url: str) -> bool:
    """Exclude public libraries hosted under Wix's generic unpkg mirror."""
    return "/unpkg/" not in urlparse(url).path


def direct_wix_urls(site_directory: Path) -> set[str]:
    """Return direct script and stylesheet URLs served by Wix infrastructure."""
    urls = set()
    for page in iter_html_files(site_directory):
        urls.update(DIRECT_ASSET_URL.findall(read_text(page)))
    return {url for url in urls if is_wix_asset(url)}


async def prepare_fallbacks(site_directory: Path) -> None:
    """Download missing mirrors, then inject a CDN-first fallback into every page."""
    urls = direct_wix_urls(site_directory)
    missing = []
    for url in sorted(urls):
        local_path = site_directory / local_fallback_path(url)
        if not local_path.is_file():
            downloaded = await download_asset(url, local_path, "Mozilla/5.0")
            if not downloaded:
                missing.append(url)

    if missing:
        raise RuntimeError("Could not cache Wix assets:\n" + "\n".join(missing))

    fallback_mapping = {url: local_fallback_path(url) for url in sorted(urls)}
    for page in iter_html_files(site_directory):
        write_text(page, inject_fallback_script(read_text(page), fallback_mapping))
        print(f"Added Wix CDN fallback to {page.name}")


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Cache Wix CDN assets and add local fallbacks to rendered pages."
    )
    parser.add_argument(
        "--site-dir",
        type=Path,
        default=RENDERED_SITE_DIRECTORY,
        help="Directory containing the rendered HTML files.",
    )
    return parser.parse_args()


if __name__ == "__main__":
    arguments = parse_arguments()
    asyncio.run(prepare_fallbacks(arguments.site_dir))
