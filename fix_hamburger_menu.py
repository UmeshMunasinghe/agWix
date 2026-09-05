import os
import re

RENDERED_DIR = "/home/umesh/codeCamp/agWix/rendered_site"

HAMBURGER_JS = """
<script id="offline-hamburger-menu-fix">
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    var style = document.createElement('style');
    style.innerHTML = `
      .offline-menu-overlay {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: #F8F6F6 !important;
        z-index: 999999 !important;
        box-sizing: border-box !important;
        padding: 50px 80px 40px 100px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        overflow-y: auto !important;
      }
      .offline-menu-container {
        position: relative !important;
        width: 100% !important;
        max-width: 1200px !important;
        margin: 0 auto !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .offline-menu-overlay nav ul {
        list-style: none !important;
        padding: 0 !important;
        margin: 30px 0 35px 0 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 22px !important;
      }
      .offline-menu-overlay nav a {
        font-family: 'Syne', sans-serif !important;
        font-size: 32px !important;
        font-weight: 700 !important;
        color: #14242D !important;
        text-transform: uppercase !important;
        text-decoration: underline !important;
        letter-spacing: 0.05em !important;
        transition: color 0.2s !important;
      }
      .offline-menu-overlay nav a:hover {
        color: #FFC650 !important;
      }
      .offline-menu-close-btn {
        position: absolute !important;
        top: -10px !important;
        right: 0px !important;
        background: none !important;
        border: none !important;
        font-size: 48px !important;
        cursor: pointer !important;
        color: #14242D !important;
        line-height: 1 !important;
        font-weight: 300 !important;
      }
      .offline-menu-banner-img {
        width: 100% !important;
        max-height: 380px !important;
        object-fit: cover !important;
        border-radius: 4px !important;
        margin-top: 10px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
      }
    `;
    document.head.appendChild(style);

    document.addEventListener("click", function(e) {
      var burgerBtn = e.target.closest("button[aria-label='Menu'], .hamburger-open-button, button[data-testid='buttonContent']");
      if (burgerBtn && burgerBtn.querySelector('svg[data-type="shape"], #animated-icon')) {
        e.preventDefault();
        e.stopPropagation();

        var existingOverlay = document.querySelector(".offline-menu-overlay");
        if (existingOverlay) {
          existingOverlay.remove();
          return;
        }

        var overlay = document.createElement("div");
        overlay.className = "offline-menu-overlay";

        var container = document.createElement("div");
        container.className = "offline-menu-container";

        var closeBtn = document.createElement("button");
        closeBtn.className = "offline-menu-close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.setAttribute("aria-label", "Close Menu");
        closeBtn.onclick = function() {
          overlay.remove();
        };

        var nav = document.createElement("nav");
        nav.innerHTML = `
          <ul>
            <li><a href="index.html">HOME</a></li>
            <li><a href="about.html">ABOUT</a></li>
            <li><a href="services.html">SERVICES</a></li>
            <li><a href="projects.html">PROJECTS</a></li>
            <li><a href="index.html#contact">CONTACT</a></li>
          </ul>
        `;

        nav.querySelectorAll("a").forEach(function(a) {
          a.onclick = function() {
            overlay.remove();
          };
        });

        // Determine correct relative path to roof_banner.png based on page depth
        var imgPath = "assets/roof_banner.png";
        if (window.location.pathname.includes("/my-site/")) {
          imgPath = "../assets/roof_banner.png";
        }

        var bannerImg = document.createElement("img");
        bannerImg.className = "offline-menu-banner-img";
        bannerImg.src = imgPath;
        bannerImg.alt = "Roofing banner";

        container.appendChild(closeBtn);
        container.appendChild(nav);
        container.appendChild(bannerImg);
        overlay.appendChild(container);

        document.body.appendChild(overlay);
      }
    }, true);
  });
})();
</script>
"""

def apply_hamburger_fix():
    for root, _, files in os.walk(RENDERED_DIR):
        for f in files:
            if f.endswith(".html"):
                file_path = os.path.join(root, f)
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()

                content = re.sub(r'<script id="offline-hamburger-menu-fix">.*?</script>', '', content, flags=re.DOTALL)
                content = content.replace("</head>", f"{HAMBURGER_JS}\n</head>")

                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(content)
                print(f"Updated dynamic relative image path in {f}")

if __name__ == "__main__":
    apply_hamburger_fix()
