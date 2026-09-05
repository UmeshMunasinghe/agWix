# Pixel-Equivalent Static Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Wix-generated site with readable static HTML, CSS, and JavaScript without any visual or behavioral change.

**Architecture:** Build the replacement in `rebuilt_site/` so the current `rendered_site/` remains an immutable visual reference throughout development. Six semantic HTML pages share one stylesheet and one small interaction script; only after visual validation passes is the rebuilt output promoted.

**Tech Stack:** HTML5, CSS custom properties, vanilla JavaScript, Python `unittest`, local HTTP server, Playwright or browser screenshots.

**Spec:** `docs/superpowers/specs/2026-09-05-static-site-rebuild-design.md`

## Global Constraints

- Preserve the current desktop and mobile UI exactly: layout, typography, colors, spacing, imagery, navigation, animation, and responsive breakpoints.
- Retain the six current pages and their content.
- Keep the contact form as UI only; it must not submit data.
- Keep current page URLs and `index.html#contact` navigation.
- The final site must contain no Wix, React, Thunderbolt, or external CDN URL.
- Do not modify `rendered_site/` until screenshot comparison accepts the rebuild.

---

### Task 1: Capture the immutable visual and content baseline

**Files:**
- Create: `tests/test_baseline_inventory.py`
- Create: `tests/baselines/desktop/`
- Create: `tests/baselines/mobile/`
- Create: `tools/capture_visual_baseline.py`

**Interfaces:**
- Produces: `PAGE_NAMES: tuple[str, ...]` in `tools/capture_visual_baseline.py` containing the six page names.
- Produces: one PNG per page in each baseline viewport directory.

- [ ] **Step 1: Write the failing page-inventory test**

```python
from pathlib import Path
from tools.capture_visual_baseline import PAGE_NAMES

def test_all_current_pages_have_baseline_html():
    rendered_site = Path("rendered_site")
    assert PAGE_NAMES == (
        "index.html", "about.html", "services.html", "projects.html",
        "privacy-policy.html", "accessibility-statement.html",
    )
    assert all((rendered_site / page).is_file() for page in PAGE_NAMES)
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `python3 -m unittest tests/test_baseline_inventory.py -v`

Expected: FAIL because `tools.capture_visual_baseline` does not exist.

- [ ] **Step 3: Implement the baseline capture command**

```python
PAGE_NAMES = (
    "index.html", "about.html", "services.html", "projects.html",
    "privacy-policy.html", "accessibility-statement.html",
)
VIEWPORTS = {"desktop": {"width": 1440, "height": 1100}, "mobile": {"width": 390, "height": 844}}
```

The command must start no web server itself. It receives `--base-url`, visits
each page at both viewports, waits for `networkidle`, and writes full-page PNGs
under `tests/baselines/<viewport>/`.

- [ ] **Step 4: Run the inventory test and capture screenshots**

Run: `python3 -m unittest tests/test_baseline_inventory.py -v && python3 -m tools.capture_visual_baseline --base-url http://localhost:8085`

Expected: PASS and twelve baseline images written.

- [ ] **Step 5: Commit the baseline**

```bash
git add tests/test_baseline_inventory.py tests/baselines tools/capture_visual_baseline.py
git commit -m "test: capture visual baseline for static rebuild"
```

### Task 2: Create a semantic shared site shell

**Files:**
- Create: `rebuilt_site/styles/site.css`
- Create: `rebuilt_site/scripts/site.js`
- Create: `rebuilt_site/assets/images/`
- Create: `tests/test_static_site_structure.py`

**Interfaces:**
- Produces: `renderHeader(activePage: str): str` and `renderFooter(): str` in `tools/build_static_site.py`.
- Produces: CSS custom properties `--ink`, `--paper`, and `--accent` in `rebuilt_site/styles/site.css`.

- [ ] **Step 1: Write the failing static-shell test**

```python
from pathlib import Path

def test_shared_static_assets_exist():
    root = Path("rebuilt_site")
    assert (root / "styles/site.css").is_file()
    assert (root / "scripts/site.js").is_file()
    css = (root / "styles/site.css").read_text(encoding="utf-8")
    assert "--ink:" in css and "--paper:" in css and "--accent:" in css
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `python3 -m unittest tests/test_static_site_structure.py -v`

Expected: FAIL because `rebuilt_site/styles/site.css` does not exist.

- [ ] **Step 3: Implement the shared CSS and JavaScript shell**

Create `site.css` with the current navy, cream, and gold values; desktop and
mobile header/footer layout; semantic section, card, form, and reveal classes.
Create `site.js` with `toggleMenu()`, hash-based contact scrolling, and an
`IntersectionObserver` that adds `is-visible` to `[data-reveal]`. The script
must not attach a submit handler to the contact form.

- [ ] **Step 4: Run the shell test**

Run: `python3 -m unittest tests/test_static_site_structure.py -v`

Expected: PASS.

- [ ] **Step 5: Commit the shared shell**

```bash
git add rebuilt_site/styles/site.css rebuilt_site/scripts/site.js tests/test_static_site_structure.py
git commit -m "feat: add static site shell"
```

### Task 3: Rebuild the home page and shared navigation

**Files:**
- Create: `rebuilt_site/index.html`
- Create: `tools/build_static_site.py`
- Test: `tests/test_static_site_structure.py`

**Interfaces:**
- Consumes: `renderHeader(activePage: str) -> str`, `renderFooter() -> str`.
- Produces: a complete `rebuilt_site/index.html` with `id="contact"`.

- [ ] **Step 1: Write the failing home-page test**

```python
from pathlib import Path

def test_home_page_has_current_sections_and_non_submitting_form():
    page = Path("rebuilt_site/index.html").read_text(encoding="utf-8")
    for heading in ("Expert Roofing Solutions", "About Our Firm", "Our Services", "Testimonials", "Get in Touch"):
        assert heading in page
    assert 'id="contact"' in page
    assert '<form' in page
    assert 'action=' not in page
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `python3 -m unittest tests/test_static_site_structure.py -v`

Expected: FAIL because `rebuilt_site/index.html` does not exist.

- [ ] **Step 3: Implement the home page**

Use readable `header`, `nav`, `main`, `section`, `article`, `form`, and
`footer` elements. Copy the existing home-page text, use the matching current
images, preserve menu links and `index.html#contact`, and apply only shared
classes defined in `site.css`.

- [ ] **Step 4: Run the home-page test and visual comparison**

Run: `python3 -m unittest tests/test_static_site_structure.py -v`

Expected: PASS. Serve `rebuilt_site/`, capture desktop/mobile screenshots, and
compare them to `tests/baselines/desktop/index.png` and `tests/baselines/mobile/index.png`.

- [ ] **Step 5: Commit the home page**

```bash
git add rebuilt_site/index.html tools/build_static_site.py tests/test_static_site_structure.py
git commit -m "feat: rebuild static home page"
```

### Task 4: Rebuild the remaining content pages

**Files:**
- Create: `rebuilt_site/about.html`
- Create: `rebuilt_site/services.html`
- Create: `rebuilt_site/projects.html`
- Create: `rebuilt_site/privacy-policy.html`
- Create: `rebuilt_site/accessibility-statement.html`
- Test: `tests/test_static_site_structure.py`

**Interfaces:**
- Consumes: shared navigation, footer, `site.css`, and `site.js` from Tasks 2–3.
- Produces: five readable pages whose active navigation state matches the page name.

- [ ] **Step 1: Write the failing content-page test**

```python
from pathlib import Path

EXPECTED_HEADINGS = {
    "about.html": "The Roofing",
    "services.html": "Our Services",
    "projects.html": "Our Roofing Projects",
    "privacy-policy.html": "Privacy Policy",
    "accessibility-statement.html": "Accessibility Statement",
}

def test_content_pages_keep_current_primary_heading():
    for page_name, heading in EXPECTED_HEADINGS.items():
        page = Path("rebuilt_site", page_name).read_text(encoding="utf-8")
        assert f"<h1>{heading}</h1>" in page
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `python3 -m unittest tests/test_static_site_structure.py -v`

Expected: FAIL because the five HTML files do not exist.

- [ ] **Step 3: Implement the five semantic pages**

Copy all current visible text, legal text, headings, cards, gallery images, and
footer content. Give each page one `<h1>`, mark the matching navigation link
with `aria-current="page"`, and load only `styles/site.css` and `scripts/site.js`.

- [ ] **Step 4: Run tests and capture all page comparisons**

Run: `python3 -m unittest tests/test_static_site_structure.py -v`

Expected: PASS. Capture each page at both baseline viewports and compare each
new image with its same-name baseline counterpart.

- [ ] **Step 5: Commit the content pages**

```bash
git add rebuilt_site/*.html tests/test_static_site_structure.py
git commit -m "feat: rebuild static content pages"
```

### Task 5: Validate interactions and remove Wix output

**Files:**
- Modify: `rebuilt_site/scripts/site.js`
- Modify: `README.md`
- Delete: Wix-only files under `rendered_site/` after promotion
- Test: `tests/test_static_site_structure.py`

**Interfaces:**
- Consumes: all rebuilt pages and `site.js`.
- Produces: `rendered_site/` containing only the human-maintained static site.

- [ ] **Step 1: Write the failing final-site test**

```python
from pathlib import Path

def test_final_site_has_no_wix_or_cdn_dependencies():
    for path in Path("rebuilt_site").rglob("*"):
        if path.suffix not in {".html", ".css", ".js"}:
            continue
        content = path.read_text(encoding="utf-8")
        assert "wix" not in content.lower()
        assert "https://" not in content
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `python3 -m unittest tests/test_static_site_structure.py -v`

Expected: FAIL until all current references have been removed from the rebuilt files.

- [ ] **Step 3: Complete interaction and asset validation**

Verify menu open/close, keyboard close, all internal links, contact scrolling,
and reveal effects in `rebuilt_site/`. Fix only deviations from the baseline.

- [ ] **Step 4: Promote only after visual acceptance**

Replace the Wix files in `rendered_site/` with the accepted files from
`rebuilt_site/`. Update `README.md` with the simple local serve command and
the statement that the site has no third-party runtime dependencies.

- [ ] **Step 5: Run final verification**

Run: `python3 -m unittest discover -s tests -v && rg -n -i 'wix|thunderbolt|react|cdn' rendered_site --glob '*.html' --glob '*.css' --glob '*.js'`

Expected: all tests PASS and `rg` returns no matches.

- [ ] **Step 6: Commit the promoted static site**

```bash
git add rendered_site rebuilt_site README.md tests
git commit -m "feat: replace Wix export with static site"
```
