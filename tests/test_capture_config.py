import unittest

from offline_export.capture_config import PAGES, page_output_name


class CaptureConfigTests(unittest.TestCase):
    def test_page_output_name_uses_index_for_the_site_root(self):
        self.assertEqual(
            page_output_name("https://umeshmunasinghe.wixsite.com/my-site"),
            "index.html",
        )

    def test_page_output_name_uses_final_path_segment_for_subpages(self):
        self.assertEqual(
            page_output_name("https://umeshmunasinghe.wixsite.com/my-site/about"),
            "about.html",
        )

    def test_pages_contains_the_root_page_once(self):
        self.assertEqual(PAGES.count("https://umeshmunasinghe.wixsite.com/my-site"), 1)


if __name__ == "__main__":
    unittest.main()
