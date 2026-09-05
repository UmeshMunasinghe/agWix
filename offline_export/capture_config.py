"""Configuration shared by the static and lazy-loading site captures."""

from urllib.parse import urlparse


PAGES = (
    "https://umeshmunasinghe.wixsite.com/my-site",
    "https://umeshmunasinghe.wixsite.com/my-site/about",
    "https://umeshmunasinghe.wixsite.com/my-site/services",
    "https://umeshmunasinghe.wixsite.com/my-site/projects",
    "https://umeshmunasinghe.wixsite.com/my-site/privacy-policy",
    "https://umeshmunasinghe.wixsite.com/my-site/accessibility-statement",
)


def page_output_name(url: str) -> str:
    """Return the offline HTML filename associated with a captured page URL."""
    path_parts = [part for part in urlparse(url).path.split("/") if part]
    if not path_parts or path_parts[-1] == "my-site":
        return "index.html"
    return f"{path_parts[-1]}.html"
