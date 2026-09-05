import unittest

from offline_export.wix_fallbacks import inject_fallback_script, local_fallback_path


class WixFallbackTests(unittest.TestCase):
    def test_local_fallback_path_preserves_wix_host_and_url_path(self):
        url = "https://static.parastorage.com/services/example/1.0.0/bundle.js"

        self.assertEqual(
            local_fallback_path(url),
            "assets/static.parastorage.com/services/example/1.0.0/bundle.js",
        )

    def test_injection_adds_a_single_fallback_handler_to_the_head(self):
        page = "<html><head><title>Example</title></head><body></body></html>"
        mapping = {
            "https://static.parastorage.com/services/example/1.0.0/bundle.js": (
                "assets/static.parastorage.com/services/example/1.0.0/bundle.js"
            )
        }

        injected = inject_fallback_script(page, mapping)

        self.assertIn('id="wix-cdn-fallback"', injected)
        self.assertIn("window.addEventListener(\"error\"", injected)
        self.assertEqual(inject_fallback_script(injected, mapping), injected)


if __name__ == "__main__":
    unittest.main()
