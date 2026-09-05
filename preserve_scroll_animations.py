import os
import re

RENDERED_DIR = "/home/umesh/codeCamp/agWix/rendered_site"

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
    for root, _, files in os.walk(RENDERED_DIR):
        for f in files:
            if f.endswith('.html'):
                file_path = os.path.join(root, f)
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                if "offline-scroll-animations" not in content:
                    # Inject right before </head>
                    content = content.replace("</head>", f"{ANIMATION_INJECT_SCRIPT}\n</head>")
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(content)
                    print(f"Injected scroll animation preserver into {f}")

if __name__ == "__main__":
    inject_animation_preserver()
