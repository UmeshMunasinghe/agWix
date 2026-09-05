"""Generate local fallbacks for Wix CDN assets."""

import json
import re
from urllib.parse import urlparse


FALLBACK_SCRIPT_ID = "wix-cdn-fallback"


def local_fallback_path(url: str) -> str:
    """Return the rendered-site-relative mirror path for a Wix CDN URL."""
    parsed = urlparse(url)
    return f"assets/{parsed.netloc}{parsed.path}"


def inject_fallback_script(html: str, fallback_mapping: dict[str, str]) -> str:
    """Insert an idempotent Wix CDN error handler immediately inside ``<head>``."""
    mapping = json.dumps(fallback_mapping, separators=(",", ":"))
    script = f'''<script id="{FALLBACK_SCRIPT_ID}">
(function() {{
  const fallbackAssets = {mapping};
  window.addEventListener("error", function(event) {{
    const asset = event.target;
    if (!asset || asset.dataset.wixFallbackAttempted) return;
    const url = asset.src || asset.href;
    const fallbackUrl = fallbackAssets[url];
    if (!fallbackUrl) return;
    asset.dataset.wixFallbackAttempted = "true";
    if (asset.tagName === "SCRIPT") asset.src = fallbackUrl;
    if (asset.tagName === "LINK") asset.href = fallbackUrl;
  }}, true);
}})();
</script>'''
    html = re.sub(
        rf'(<head>)\s*<script id="{FALLBACK_SCRIPT_ID}">.*?</script>\s*',
        r"\1",
        html,
        flags=re.DOTALL,
    )
    return html.replace("<head>", f"<head>\n{script}\n", 1)
