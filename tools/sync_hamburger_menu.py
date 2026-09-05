import os, glob
from bs4 import BeautifulSoup

from offline_export.site_files import RENDERED_SITE_DIRECTORY

site_dir = str(RENDERED_SITE_DIRECTORY)
index_path = os.path.join(site_dir, "index.html")

with open(index_path, "r", encoding="utf-8") as f:
    index_soup = BeautifulSoup(f.read(), "html.parser")

hamburger_script = index_soup.find("script", id="offline-hamburger-menu-fix")
if not hamburger_script:
    print("Error: offline-hamburger-menu-fix not found in index.html")
    exit(1)

script_str = str(hamburger_script)

for file_path in glob.glob(os.path.join(site_dir, "*.html")):
    if file_path.endswith("index.html"):
        continue

    with open(file_path, "r", encoding="utf-8") as f:
        page_soup = BeautifulSoup(f.read(), "html.parser")

    for tag in page_soup.find_all(id="offline-hamburger-menu-fix"):
        tag.decompose()

    body = page_soup.find("body")
    if body:
        body.append(BeautifulSoup(script_str, "html.parser"))

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(str(page_soup))

    print(f"Synchronized hamburger menu fix script to {os.path.basename(file_path)}")

print("All HTML pages synced successfully!")
