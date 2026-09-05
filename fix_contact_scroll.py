import os

RENDERED_DIR = "/home/umesh/codeCamp/agWix/rendered_site"

SMOOTH_SCROLL_SCRIPT = """
<script id="offline-contact-scroll">
(function() {
  function handleAnchorScroll() {
    var hash = window.location.hash;
    if (hash === "#contact" || hash === "contact") {
      // Find form component, contact section or button to scroll to
      var target = document.querySelector("#comp-mlnflcdw") || document.querySelector("form") || document.querySelector("footer");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    handleAnchorScroll();

    // Global click handler for Get in Touch & Contact buttons
    document.addEventListener("click", function(e) {
      var btn = e.target.closest("a, button");
      if (btn) {
        var href = btn.getAttribute("href") || "";
        var text = (btn.textContent || "").trim().toLowerCase();
        
        if (href.includes("#contact") || text.includes("get in touch") || text.includes("contact")) {
          // If already on index page or index.html
          if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
            e.preventDefault();
            if (window.location.hash !== "#contact") {
              history.pushState(null, null, "#contact");
            }
            handleAnchorScroll();
          } else {
            e.preventDefault();
            window.location.href = "index.html#contact";
          }
        }
      }
    }, true);
  });

  window.addEventListener("hashchange", handleAnchorScroll);
})();
</script>
"""

def update_html():
    for root, _, files in os.walk(RENDERED_DIR):
        for f in files:
            if f.endswith(".html"):
                file_path = os.path.join(root, f)
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()

                # Ensure section/form container has ID contact
                if f == "index.html" and 'id="contact"' not in content:
                    content = content.replace('id="comp-mlnflcdw"', 'id="contact"')
                    content = content.replace('href="index.html#contact"', 'href="#contact"')

                if "offline-contact-scroll" not in content:
                    content = content.replace("</head>", f"{SMOOTH_SCROLL_SCRIPT}\n</head>")

                with open(file_path, "w", encoding="utf-8") as file:
                    file.write(content)
                print(f"Updated contact scroll handler in {f}")

if __name__ == "__main__":
    update_html()
