from pathlib import Path
import unittest

from tools.capture_visual_baseline import PAGE_NAMES


class BaselineInventoryTests(unittest.TestCase):
    def test_all_current_pages_have_baseline_html(self):
        rendered_site = Path("rendered_site")

        self.assertEqual(
            PAGE_NAMES,
            (
                "index.html",
                "about.html",
                "services.html",
                "projects.html",
                "privacy-policy.html",
                "accessibility-statement.html",
            ),
        )
        self.assertTrue(all((rendered_site / page).is_file() for page in PAGE_NAMES))


if __name__ == "__main__":
    unittest.main()
