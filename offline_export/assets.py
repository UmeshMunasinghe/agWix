"""Asset download support shared by the site capture scripts."""

from pathlib import Path
from urllib.request import Request, urlopen


async def download_asset(url: str, destination: str | Path, user_agent: str) -> bool:
    """Download *url* unless *destination* already exists.

    Returns whether a download completed. Failures intentionally return ``False``
    to preserve the best-effort capture behavior of the existing scripts.
    """
    destination = Path(destination)
    if destination.exists():
        return False

    try:
        destination.parent.mkdir(parents=True, exist_ok=True)
        request = Request(url, headers={"User-Agent": user_agent})
        with urlopen(request, timeout=10) as response:
            destination.write_bytes(response.read())
    except Exception:
        return False
    return True
