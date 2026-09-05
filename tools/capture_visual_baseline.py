"""Capture fixed-viewport screenshots for the current site and its rebuild."""

import argparse
import asyncio
from pathlib import Path


PAGE_NAMES = (
    "index.html",
    "about.html",
    "services.html",
    "projects.html",
    "privacy-policy.html",
    "accessibility-statement.html",
)
VIEWPORTS = {
    "desktop": {"width": 1440, "height": 1100},
    "mobile": {"width": 390, "height": 844},
}


async def capture(base_url: str, output_directory: Path) -> None:
    """Capture every page at the fixed desktop and mobile viewports."""
    try:
        from playwright.async_api import async_playwright
    except ModuleNotFoundError as error:
        raise RuntimeError(
            "Playwright is required. Run: python3 -m pip install -r requirements.txt "
            "and python3 -m playwright install chromium"
        ) from error

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        for viewport_name, viewport in VIEWPORTS.items():
            context = await browser.new_context(viewport=viewport)
            for page_name in PAGE_NAMES:
                page = await context.new_page()
                await page.goto(
                    f"{base_url.rstrip('/')}/{page_name}",
                    wait_until="domcontentloaded",
                    timeout=60_000,
                )
                await page.wait_for_timeout(2_000)
                destination = output_directory / viewport_name / f"{Path(page_name).stem}.png"
                destination.parent.mkdir(parents=True, exist_ok=True)
                await page.screenshot(path=str(destination), full_page=True)
                await page.close()
            await context.close()
        await browser.close()


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Capture visual baseline screenshots.")
    parser.add_argument("--base-url", required=True)
    parser.add_argument("--output-dir", type=Path, default=Path("tests/baselines"))
    return parser.parse_args()


if __name__ == "__main__":
    arguments = parse_arguments()
    asyncio.run(capture(arguments.base_url, arguments.output_dir))
