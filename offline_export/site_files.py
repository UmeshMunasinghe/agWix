"""Shared, filesystem-safe helpers for the offline-site scripts."""

from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Iterator


PROJECT_ROOT = Path(__file__).resolve().parent.parent
RENDERED_SITE_DIRECTORY = PROJECT_ROOT / "rendered_site"


def iter_html_files(site_directory: Path = RENDERED_SITE_DIRECTORY) -> Iterator[Path]:
    """Yield HTML files below *site_directory* in deterministic order."""
    yield from sorted(site_directory.rglob("*.html"))


def read_text(path: Path) -> str:
    """Read UTF-8 content from *path*."""
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    """Atomically replace *path* with UTF-8 *content*."""
    with NamedTemporaryFile(
        "w", encoding="utf-8", dir=path.parent, delete=False
    ) as temporary_file:
        temporary_file.write(content)
        temporary_path = Path(temporary_file.name)
    temporary_path.replace(path)
