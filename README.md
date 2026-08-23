# luxshan2000.github.io

Personal academic and professional site for **Luxshan Thavarasa** — Software Engineer,
Machine Learning II at H2O.ai, and independent researcher in mechanistic interpretability
and multilingual speech processing for low-resource languages.

Live: <https://luxshan2000.github.io/>

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | The whole site — markup, CSS and JS in one self-contained file. No build step. |
| `llms.txt` | Plain-text profile for language models and AI answer engines. |
| `robots.txt` | Crawl rules; explicitly allows search engines and AI assistants. |
| `sitemap.xml` | Sitemap with image metadata. |
| `assets/` | Profile photo and favicon. |

## Sections

Research & engineering · Publications · Experience · Education · Selected projects ·
Skills · Awards & service · Contact

## Design notes

- **Type**: Spectral (display), Inter (body), IBM Plex Mono (labels and metadata).
- **Theme**: light/dark with a toggle in the floating dock; the choice persists in
  `localStorage` and falls back to `prefers-color-scheme`.
- **Portrait**: the photo is re-rendered on a canvas as a classic halftone — one dot per
  cell, dot radius carrying the tone, with auto-levels so midtones survive. Hover, tap or
  press Enter to resolve it back to the photograph. Pointer movement swirls the dots.
  If the canvas is tainted (opening the file over `file://`), it falls back to the plain
  photo.
- **Background**: an animated dot field, two soft spotlight beams, drifting glow orbs and
  a glow that follows the pointer. Adapted from Aceternity UI patterns (Dotted Glow
  Background, Spotlight New, Pixelated Canvas), reimplemented in vanilla CSS/JS.
- **Dock**: shrinks when scrolling down, returns to full size on the way up.
- Everything respects `prefers-reduced-motion`, and a `<noscript>` block keeps all
  content visible without JavaScript.

## SEO / AEO

Structured data (JSON-LD `@graph`) describes a `ProfilePage`, the `Person`, each
`ScholarlyArticle`, and the **EmoTa** `Dataset` (linked to its Hugging Face record).
`llms.txt` gives AI assistants a clean plain-text version, and `robots.txt` explicitly
welcomes both search crawlers and AI answer engines.

## Local development

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Serve over HTTP rather than opening the file directly — the halftone portrait reads
pixels from a canvas, which browsers block on `file://`.
