"""Shared HTML fragments for the human-maintained static site."""


NAVIGATION = (
    ("index.html", "Home"),
    ("about.html", "About"),
    ("services.html", "Services"),
    ("projects.html", "Projects"),
)


def render_header(active_page: str) -> str:
    """Return the shared accessible header with the active page marked."""
    links = "\n".join(
        f'<a href="{path}"{" aria-current=\"page\"" if path == active_page else ""}>{label}</a>'
        for path, label in NAVIGATION
    )
    return f'''<header class="site-header">
  <div class="site-header__inner">
    <a class="site-logo" href="index.html" aria-label="Moon Lion Media home">
      <img src="assets/images/new_logo.png" alt="Moon Lion Media">
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">Menu</button>
    <nav class="site-nav" id="site-navigation" aria-label="Primary navigation">
      {links}
      <a href="index.html#contact">Contact</a>
    </nav>
  </div>
</header>'''


def render_footer() -> str:
    """Return the current shared contact and legal footer."""
    return '''<footer class="site-footer">
  <div class="site-footer__inner">
    <div><strong>Moon Lion Media</strong><br>+94 71 158 2904<br>info@moonlionmedia.com<br>No 316/1, Thimbirigaskatuwa, Negombo.</div>
    <div><a href="privacy-policy.html">Privacy Policy</a><br><a href="accessibility-statement.html">Accessibility Statement</a><br>© 2026 by Paris Constructions. Powered by MoonLionMedia.</div>
  </div>
</footer>'''
