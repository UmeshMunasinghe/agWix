# Pixel-Equivalent Static Site Rebuild

## Goal

Replace Wix-generated HTML, JavaScript, CSS, and runtime dependencies with a
small, human-maintainable static site. The visual result must remain unchanged.

## Non-Negotiable Compatibility

- Preserve the current desktop and mobile UI exactly: layout, typography,
  colors, spacing, imagery, navigation, animation, and responsive breakpoints.
- Retain all six pages and their current content:
  `index`, `about`, `services`, `projects`, `privacy-policy`, and
  `accessibility-statement`.
- Preserve the contact form as UI only. It must not submit data.
- Keep existing page URLs and hash navigation such as `index.html#contact`.

## Target Structure

```text
rendered_site/
  index.html
  about.html
  services.html
  projects.html
  privacy-policy.html
  accessibility-statement.html
  assets/
    images/
    fonts/
  styles/
    site.css
  scripts/
    site.js
```

`site.css` owns all layout and responsive rules. `site.js` is limited to the
hamburger menu, contact scrolling, and scroll-reveal behavior. Each HTML page
contains semantic, readable markup and shares the same header/footer patterns.

## Migration Strategy

1. Capture baseline screenshots of every page at desktop and mobile viewports.
2. Identify only the images and fonts visibly used by each page; retain those
   assets with descriptive names.
3. Recreate the shared header, footer, navigation, page sections, cards, and
   form markup in readable HTML.
4. Recreate styling in one hand-authored stylesheet, using the current visual
   values as the source of truth rather than introducing a new design.
5. Add minimal JavaScript for existing UI interactions only.
6. Compare rebuilt pages with the baseline screenshots and correct visual
   differences before removing Wix output and libraries.

## Error Handling and Accessibility

- Navigation works without JavaScript.
- The mobile menu exposes its state to assistive technology and supports a
  keyboard-accessible close button.
- The form fields use labels but no submit action.
- Images retain meaningful alternative text from the current pages.

## Verification

- Compare screenshots for each page at desktop and mobile viewports.
- Confirm every internal navigation link resolves locally.
- Confirm the menu, contact link, and scroll-reveal effects work.
- Confirm no Wix, React, Thunderbolt, or external CDN URL remains in the final
  HTML, CSS, or JavaScript.
