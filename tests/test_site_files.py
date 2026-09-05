from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from offline_export.site_files import iter_html_files, write_text


class SiteFilesTests(unittest.TestCase):
    def test_iter_html_files_recursively_in_sorted_order(self):
        with TemporaryDirectory() as temporary_directory:
            site_directory = Path(temporary_directory)
            (site_directory / "nested").mkdir()
            (site_directory / "b.html").write_text("b", encoding="utf-8")
            (site_directory / "nested" / "a.html").write_text("a", encoding="utf-8")
            (site_directory / "ignore.txt").write_text("ignore", encoding="utf-8")

            files = list(iter_html_files(site_directory))

            self.assertEqual(
                [file.relative_to(site_directory).as_posix() for file in files],
                ["b.html", "nested/a.html"],
            )

    def test_write_text_replaces_existing_file_content(self):
        with TemporaryDirectory() as temporary_directory:
            destination = Path(temporary_directory) / "page.html"
            destination.write_text("old", encoding="utf-8")

            write_text(destination, "new")

            self.assertEqual(destination.read_text(encoding="utf-8"), "new")


if __name__ == "__main__":
    unittest.main()
