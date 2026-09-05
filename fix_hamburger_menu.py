import os
import re

RENDERED_DIR = "/home/umesh/codeCamp/agWix/rendered_site"

HAMBURGER_JS = """
<script id="offline-hamburger-menu-fix">
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    // Inject styling matching exact Wix original header menu dropdown layout
    var style = document.createElement('style');
    style.innerHTML = `
      .offline-menu-drawer {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        background-color: #F8F6F6 !important;
        z-index: 99999 !important;
        box-sizing: border-box !important;
        padding: 50px 80px 50px 100px !important;
        box-shadow: 0 4px 15px rgba(0,0,0,0.06) !important;
        border-bottom: 1px solid #E4DDD3 !important;
      }
      .offline-menu-drawer-content {
        position: relative !important;
        max-width: 1920px !important;
        margin: 0 auto !important;
      }
      .offline-menu-drawer nav ul {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 22px !important;
      }
      .offline-menu-drawer nav a {
        font-family: 'Syne', sans-serif !important;
        font-size: 26px !important;
        font-weight: 700 !important;
        color: #14242D !important;
        text-transform: uppercase !important;
        text-decoration: underline !important;
        letter-spacing: 0.05em !important;
        transition: color 0.2s !important;
      }
      .offline-menu-drawer nav a:hover {
        color: #FFC650 !important;
      }
      .offline-menu-close-btn {
        position: absolute !important;
        top: -10px !important;
        right: 0px !important;
        background: none !important;
        border: none !important;
        font-size: 46px !important;
        cursor: pointer !important;
        color: #14242D !important;
        line-height: 1 !important;
        font-weight: 300 !important;
      }
    `;
    document.head.appendChild(style);

    document.addEventListener("click", function(e) {
      var burgerBtn = e.target.closest("button[aria-label='Menu'], .hamburger-open-button, button[data-testid='buttonContent']");
      if (burgerBtn && burgerBtn.querySelector('svg[data-type="shape"], #animated-icon')) {
        e.preventDefault();
        e.stopPropagation();

        var header = document.querySelector("header") || document.body;
        var existingDrawer = document.querySelector(".offline-menu-drawer");
        
        if (existingDrawer) {
          existingDrawer.remove();
          return;
        }

        var drawer = document.createElement("div");
        drawer.className = "offline-menu-drawer";

        var drawerContent = document.createElement("div");
        drawerContent.className = "offline-menu-drawer-content";

        var closeBtn = document.createElement("button");
        closeBtn.className = "offline-menu-close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.setAttribute("aria-label", "Close Menu");
        closeBtn.onclick = function() {
          drawer.remove();
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
            drawer.remove();
          };
        });

        drawerContent.appendChild(closeBtn);
        drawerContent.appendChild(nav);
        drawer.appendChild(drawerContent);

        header.insertBefore(drawer, header.firstChild);
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
                print(f"Updated hamburger menu matching exact original layout in {f}")

if __name__ == "__main__":
    apply_hamburger_fix()
