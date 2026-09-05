from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from offline_export.assets import download_asset


class FakeResponse:
    def __init__(self, content: bytes):
        self.content = content

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        return False

    def read(self) -> bytes:
        return self.content


class AssetDownloadTests(unittest.IsolatedAsyncioTestCase):
    async def test_download_asset_writes_response_to_a_new_file(self):
        with TemporaryDirectory() as temporary_directory:
            destination = Path(temporary_directory) / "nested" / "asset.js"
            with patch(
                "offline_export.assets.urlopen",
                return_value=FakeResponse(b"asset content"),
            ):
                downloaded = await download_asset(
                    "https://example.test/asset.js", destination, "test-agent"
                )

            self.assertTrue(downloaded)
            self.assertEqual(destination.read_bytes(), b"asset content")

    async def test_download_asset_does_not_replace_an_existing_file(self):
        with TemporaryDirectory() as temporary_directory:
            destination = Path(temporary_directory) / "asset.js"
            destination.write_bytes(b"existing")

            with patch("offline_export.assets.urlopen") as urlopen:
                downloaded = await download_asset(
                    "https://example.test/asset.js", destination, "test-agent"
                )

            self.assertFalse(downloaded)
            urlopen.assert_not_called()
            self.assertEqual(destination.read_bytes(), b"existing")


if __name__ == "__main__":
    unittest.main()
