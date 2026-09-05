# Offline Wix export utilities

This repository contains the rendered Wix pages and the small Python utilities
used to make them work offline.

## Setup

The HTML maintenance tools use Beautiful Soup. The capture tools also require
Playwright and its Chromium browser:

```bash
python3 -m pip install -r requirements.txt
python3 -m playwright install chromium
```

## Run from the project root

```bash
python3 -m tools.render_dynamic
python3 -m tools.render_dynamic_lazyload
python3 -m tools.download_all_assets
python3 -m tools.prepare_wix_fallbacks
python3 -m tools.fix_offline_links
python3 -m tools.fix_contact_scroll
python3 -m tools.fix_hamburger_menu
python3 -m tools.preserve_scroll_animations
python3 -m tools.sync_hamburger_menu
```

`tools.render_dynamic_lazyload` captures assets requested while the page scrolls;
use it when a page depends on lazy-loaded content. The `fix_*` and
`preserve_*` utilities edit the files under `rendered_site/`.

`tools.prepare_wix_fallbacks` keeps Wix CDN loading as the default and retries
the matching local mirror only when a Wix script or stylesheet fails to load.

## Safeguards

- Keep a copy of `rendered_site/` before running a modifying utility.
- Run scripts from the project root so their Python imports resolve.
- The shared helpers in `offline_export/site_files.py` discover HTML files in
  a stable order and replace files atomically.

## Tests

```bash
python3 -m unittest discover -s tests -v
```
