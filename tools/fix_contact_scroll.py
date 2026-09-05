from offline_export.site_files import iter_html_files, read_text, write_text

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
    for file_path in iter_html_files():
        filename = file_path.name
        content = read_text(file_path)

        # Ensure section/form container has ID contact
        if filename == "index.html" and 'id="contact"' not in content:
            content = content.replace('id="comp-mlnflcdw"', 'id="contact"')
            content = content.replace('href="index.html#contact"', 'href="#contact"')

        if "offline-contact-scroll" not in content:
            content = content.replace("</head>", f"{SMOOTH_SCROLL_SCRIPT}\n</head>")

        write_text(file_path, content)
        print(f"Updated contact scroll handler in {filename}")

if __name__ == "__main__":
    update_html()
