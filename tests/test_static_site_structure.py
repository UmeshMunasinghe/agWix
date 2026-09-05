from pathlib import Path
import unittest


class StaticSiteStructureTests(unittest.TestCase):
    def test_shared_static_assets_exist(self):
        root = Path("rebuilt_site")

        self.assertTrue((root / "styles/site.css").is_file())
        self.assertTrue((root / "scripts/site.js").is_file())
        css = (root / "styles/site.css").read_text(encoding="utf-8")
        self.assertIn("--ink:", css)
        self.assertIn("--paper:", css)
        self.assertIn("--accent:", css)


if __name__ == "__main__":
    unittest.main()
