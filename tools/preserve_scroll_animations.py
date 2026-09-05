from offline_export.site_files import iter_html_files, read_text, write_text

# Injection script that triggers scroll animations dynamically as the user scrolls
ANIMATION_INJECT_SCRIPT = """
<script id="offline-scroll-animations">
(function() {
  document.addEventListener("DOMContentLoaded", function() {
    // 1. Force reveal any elements hidden by initial static DOM state
    var style = document.createElement('style');
    style.innerHTML = `
      /* Ensure hidden animations become visible on scroll or when in view */
      [data-motion], [data-animation], .comp-motion, [data-comp-animation] {
        transition: opacity 0.8s ease-out, transform 0.8s ease-out !important;
      }
      .offline-animated-in {
        opacity: 1 !important;
        transform: translate(0, 0) scale(1) !important;
        clip-path: none !important;
        visibility: visible !important;
      }
    `;
    document.head.appendChild(style);

    // 2. Intersection Observer to replay reveal/fade-in animations on scroll
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('offline-animated-in');
          // Trigger Wix native animation classes if present
          if (entry.target.dataset.motion) {
            entry.target.style.opacity = '1';
            entry.target.style.visibility = 'visible';
          }
        }
      });
    }, { threshold: 0.1 });

    // Target elements with animations or dynamic components
    var targets = document.querySelectorAll('[id^="comp-"], [data-motion], section, div[class*="comp-"]');
    targets.forEach(function(el) {
      observer.observe(el);
    });
  });
})();
</script>
"""

def inject_animation_preserver():
    for file_path in iter_html_files():
        content = read_text(file_path)

        if "offline-scroll-animations" not in content:
            # Inject right before </head>
            content = content.replace("</head>", f"{ANIMATION_INJECT_SCRIPT}\n</head>")
            write_text(file_path, content)
            print(f"Injected scroll animation preserver into {file_path.name}")

if __name__ == "__main__":
    inject_animation_preserver()
