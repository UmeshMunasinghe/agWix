import os

RENDERED_DIR = "/home/umesh/codeCamp/agWix/rendered_site"

HAMBURGER_JS = """
<script id="offline-hamburger-menu-fix">
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    // 1. Inject styling for responsive mobile overlay
    var style = document.createElement('style');
    style.innerHTML = `
      .offline-menu-overlay {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background-color: #F1EFE9 !important;
        z-index: 99999 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 20px !important;
        box-sizing: border-box !important;
      }
      .offline-menu-overlay nav ul {
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 25px !important;
      }
      .offline-menu-overlay nav a {
        font-family: 'Syne', sans-serif !important;
        font-size: 26px !important;
        font-weight: 700 !important;
        color: #14242D !important;
        text-transform: uppercase !important;
        text-decoration: none !important;
      }
      .offline-menu-close {
        position: absolute !important;
        top: 25px !important;
        right: 25px !important;
        background: none !important;
        border: none !important;
        font-size: 36px !important;
        cursor: pointer !important;
        color: #14242D !important;
        line-height: 1 !important;
      }
    `;
    document.head.appendChild(style);

    // 2. Global event listener for hamburger button click
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

        // Create overlay
        var overlay = document.createElement("div");
        overlay.className = "offline-menu-overlay";

        var closeBtn = document.createElement("button");
        closeBtn.className = "offline-menu-close";
        closeBtn.innerHTML = "&times;";
        closeBtn.setAttribute("aria-label", "Close Menu");
        closeBtn.onclick = function() {
          overlay.remove();
        };

        var nav = document.createElement("nav");
        nav.innerHTML = `
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="index.html#contact">Contact</a></li>
          </ul>
        `;

        // Attach click listeners to nav items inside overlay
        nav.querySelectorAll("a").forEach(function(a) {
          a.onclick = function() {
            overlay.remove();
          };
        });

        overlay.appendChild(closeBtn);
        overlay.appendChild(nav);
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

                if "offline-hamburger-menu-fix" not in content:
                    content = content.replace("</head>", f"{HAMBURGER_JS}\n</head>")
                    with open(file_path, "w", encoding="utf-8") as file:
                        file.write(content)
                    print(f"Applied hamburger menu click fix to {f}")

if __name__ == "__main__":
    apply_hamburger_fix()
