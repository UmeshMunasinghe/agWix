from offline_export.site_files import iter_html_files, read_text, write_text

# Mapping of original URLs to local relative offline HTML files
URL_MAPPING = {
    "https://umeshmunasinghe.wixsite.com/my-site/about": "about.html",
    "https://umeshmunasinghe.wixsite.com/my-site/services": "services.html",
    "https://umeshmunasinghe.wixsite.com/my-site/projects": "projects.html",
    "https://umeshmunasinghe.wixsite.com/my-site/privacy-policy": "privacy-policy.html",
    "https://umeshmunasinghe.wixsite.com/my-site/accessibility-statement": "accessibility-statement.html",
    "https://umeshmunasinghe.wixsite.com/my-site": "index.html",
    "https://umeshmunasinghe.wixsite.com/my-site/": "index.html"
}

# Client-side JS link interceptor to prevent Wix dynamic router or lazy buttons from navigating out
LINK_INTERCEPTOR_SCRIPT = """
<script id="offline-link-interceptor">
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    function rewriteLink(href) {
      if (!href) return href;
      if (href === "https://umeshmunasinghe.wixsite.com/my-site" || href === "https://umeshmunasinghe.wixsite.com/my-site/") return "index.html";
      if (href.includes("umeshmunasinghe.wixsite.com/my-site/about")) return "about.html";
      if (href.includes("umeshmunasinghe.wixsite.com/my-site/services")) return "services.html";
      if (href.includes("umeshmunasinghe.wixsite.com/my-site/projects")) return "projects.html";
      if (href.includes("umeshmunasinghe.wixsite.com/my-site/privacy-policy")) return "privacy-policy.html";
      if (href.includes("umeshmunasinghe.wixsite.com/my-site/accessibility-statement")) return "accessibility-statement.html";
      return href;
    }

    // Intercept all clicks globally (handles static & lazy-loaded buttons)
    document.addEventListener("click", function(e) {
      var anchor = e.target.closest("a");
      if (anchor) {
        var href = anchor.getAttribute("href");
        if (href && href.includes("umeshmunasinghe.wixsite.com")) {
          e.preventDefault();
          var localTarget = rewriteLink(href);
          window.location.href = localTarget;
        }
      }
    }, true);
  });
})();
</script>
"""

def fix_links():
    for file_path in iter_html_files():
        content = read_text(file_path)

        # Replace static string references in HTML href attributes & data JSONs
        for orig_url, local_file in URL_MAPPING.items():
            content = content.replace(f'href="{orig_url}"', f'href="{local_file}"')
            content = content.replace(f'href="{orig_url}/"', f'href="{local_file}"')
            content = content.replace(orig_url, local_file)

        # Inject dynamic click interceptor for JS buttons if not present
        if "offline-link-interceptor" not in content:
            content = content.replace("</head>", f"{LINK_INTERCEPTOR_SCRIPT}\n</head>")

        write_text(file_path, content)
        print(f"Fixed offline links and injected interceptor in {file_path.name}")

if __name__ == "__main__":
    fix_links()
