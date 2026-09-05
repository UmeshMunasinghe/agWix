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

    def test_home_page_has_current_sections_and_non_submitting_form(self):
        page = Path("rebuilt_site/index.html").read_text(encoding="utf-8")

        for heading in (
            "Expert Roofing",
            "Solutions",
            "About Our Firm",
            "Our Services",
            "Testimonials",
            "Get in Touch",
        ):
            self.assertIn(heading, page)
        self.assertIn('id="contact"', page)
        self.assertIn("<form", page)
        self.assertNotIn("action=", page)

    def test_all_internal_navigation_targets_exist(self):
        root = Path("rebuilt_site")
        expected_pages = (
            "index.html",
            "about.html",
            "services.html",
            "projects.html",
            "privacy-policy.html",
            "accessibility-statement.html",
        )

        for page_name in expected_pages:
            self.assertTrue((root / page_name).is_file(), page_name)

        for page_name in expected_pages:
            page = (root / page_name).read_text(encoding="utf-8")
            for target in ("index.html", "about.html", "services.html", "projects.html"):
                self.assertIn(f'href="{target}"', page, f"{page_name}: {target}")


if __name__ == "__main__":
    unittest.main()
