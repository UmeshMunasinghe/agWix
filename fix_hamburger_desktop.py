import os, glob
from bs4 import BeautifulSoup

site_dir = "/home/umesh/codeCamp/agWix/rendered_site"
desktop_html_path = "/home/umesh/Desktop/Home _ My Site.html"

# Load Desktop HTML to get exact menu structure
with open(desktop_html_path, "r", encoding="utf-8") as f:
    desktop_soup = BeautifulSoup(f.read(), "html.parser")

menu_template = desktop_soup.find("div", id="comp-mb7ogqrp_r_comp-ml6kj15o")
if not menu_template:
    print("Error: Could not find menu container in desktop HTML file.")
    exit(1)

# Injected CSS for perfect offline rendering, mobile visibility, scrolling, and toggle interaction
menu_css = """
<style id="offline-hamburger-custom-css">
/* Hamburger Open Button Fixes */
button.hamburger-open-button {
  cursor: pointer !important;
  pointer-events: auto !important;
  z-index: 10005 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: transparent !important;
  border: none !important;
}

button.hamburger-open-button svg {
  fill: #000000 !important;
  width: 28px !important;
  height: 28px !important;
}

/* Modal Drawer Overlay Fixes */
.hamburger-menu[role="dialog"] {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 99999 !important;
  background-color: #ffffff !important;
  display: none !important;
  flex-direction: column !important;
  overflow-y: auto !important;
}

.hamburger-menu[role="dialog"].offline-menu-open {
  display: flex !important;
}

/* Ensure backdrop covers screen when open */
._backdrop_15sgs_13.offline-menu-open {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 99998 !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  display: block !important;
}

/* Dialog content structure */
.hamburger-menu ._dialogContent_15sgs_22 {
  display: flex !important;
  flex-direction: column !important;
  min-height: 100% !important;
  width: 100% !important;
  position: relative !important;
  box-sizing: border-box !important;
  background: #ffffff !important;
}

/* Header with close button */
.hamburger-menu header._header_15sgs_54 {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: center !important;
  padding: 16px 24px !important;
  width: 100% !important;
  box-sizing: border-box !important;
  position: relative !important;
  z-index: 100001 !important;
}

button.hamburger-close-button {
  cursor: pointer !important;
  background: transparent !important;
  border: none !important;
  padding: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 100002 !important;
}

button.hamburger-close-button svg {
  fill: #000000 !important;
  width: 24px !important;
  height: 24px !important;
}

/* Main body in modal drawer */
.hamburger-menu main._main_15sgs_68 {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
  width: 100% !important;
  padding: 20px 32px !important;
  box-sizing: border-box !important;
}

/* Menu links styling */
.hamburger-menu ul._container_s6hzk_173 {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 30px 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
}

.hamburger-menu a[data-part="menu-item-link"] {
  font-family: Arial, sans-serif !important;
  font-size: 24px !important;
  font-weight: 500 !important;
  color: #111111 !important;
  text-decoration: none !important;
  display: block !important;
  transition: color 0.2s ease !important;
}

.hamburger-menu a[data-part="menu-item-link"]:hover {
  color: #555555 !important;
}

/* Background image styling inside drawer */
.hamburger-menu .hamburger-menu-content._content_15sgs_74 {
  margin-top: auto !important;
  width: 100% !important;
  overflow: hidden !important;
  border-radius: 8px !important;
}

.hamburger-menu ._image_8j9vj_1 img {
  width: 100% !important;
  height: auto !important;
  max-height: 250px !important;
  object-fit: cover !important;
  display: block !important;
}

/* Prevent body scroll when menu open */
body.offline-menu-active {
  overflow: hidden !important;
}
</style>
"""

# JavaScript handler for toggle clicks and link navigation
menu_js = """
<script id="offline-hamburger-js">
document.addEventListener("DOMContentLoaded", function() {
  function initHamburger() {
    var openBtn = document.querySelector(".hamburger-open-button");
    var closeBtn = document.querySelector(".hamburger-close-button");
    var dialog = document.querySelector(".hamburger-menu[role=\\"dialog\\"]");
    var backdrop = document.querySelector("._backdrop_15sgs_13");

    if (!openBtn || !dialog) return;

    function openMenu() {
      dialog.classList.add("offline-menu-open");
      if (backdrop) backdrop.classList.add("offline-menu-open");
      document.body.classList.add("offline-menu-active");
    }

    function closeMenu() {
      dialog.classList.remove("offline-menu-open");
      if (backdrop) backdrop.classList.remove("offline-menu-open");
      document.body.classList.remove("offline-menu-active");
    }

    openBtn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      openMenu();
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    }

    if (backdrop) {
      backdrop.addEventListener("click", function() {
        closeMenu();
      });
    }

    var menuLinks = dialog.querySelectorAll("a[data-part=\\"menu-item-link\\"]");
    menuLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        closeMenu();
      });
    });
  }

  initHamburger();
});
</script>
"""

# HTML Files mapping to their relative depth
pages = {
    "index.html": "./",
    "about.html": "./",
    "services.html": "./",
    "projects.html": "./",
    "privacy-policy.html": "./",
    "accessibility-statement.html": "./"
}

for page, rel_prefix in pages.items():
    file_path = os.path.join(site_dir, page)
    if not os.path.exists(file_path):
        continue

    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    # Clean existing injection if any
    for existing_tag in soup.find_all(id=["offline-hamburger-custom-css", "offline-hamburger-js"]):
        existing_tag.decompose()

    # Find header element or container to place menu
    header = soup.find("header", id="SITE_HEADER") or soup.find("header") or soup.find("body")

    # Prepare menu HTML copy from template
    page_menu = BeautifulSoup(str(menu_template), "html.parser").find("div")

    # Fix image source to point locally
    img_tag = page_menu.find("img")
    if img_tag:
        img_tag["src"] = rel_prefix + "assets/menu_bg.png"

    # Fix page links in menu template
    for a_tag in page_menu.find_all("a", attrs={"data-part": "menu-item-link"}):
        href = a_tag.get("href", "")
        if "about" in href:
            a_tag["href"] = rel_prefix + "about.html"
        elif "services" in href:
            a_tag["href"] = rel_prefix + "services.html"
        elif "projects" in href:
            a_tag["href"] = rel_prefix + "projects.html"
        elif "contact" in href:
            a_tag["href"] = rel_prefix + "index.html#contact"
        else:
            a_tag["href"] = rel_prefix + "index.html"

    # Remove previous menu container if existing
    existing_menu = soup.find(id="comp-mb7ogqrp_r_comp-ml6kj15o")
    if existing_menu:
        existing_menu.replace_with(page_menu)
    else:
        header.append(page_menu)

    # Append CSS and JS to head / body
    head_tag = soup.find("head")
    if head_tag:
        head_tag.append(BeautifulSoup(menu_css, "html.parser"))
    
    body_tag = soup.find("body")
    if body_tag:
        body_tag.append(BeautifulSoup(menu_js, "html.parser"))

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(str(soup))

    print(f"Updated hamburger menu in {page}")

print("All rendered_site pages updated successfully!")
