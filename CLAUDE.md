# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment

This is a static website deployed to GitHub Pages at [whymedia.in](https://whymedia.in). Deployment is automatic — any push to `main` triggers the GitHub Actions workflow (`.github/workflows/static.yml`), which deploys the entire repository root.

There is no build step. To preview locally, open `index.html` directly in a browser or use any static file server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Architecture

The site is a single-page application contained almost entirely in `index.html`. There are no frameworks, bundlers, or package managers.

- **`index.html`** — All HTML structure and inline Tailwind config. Sections: Loading Screen, Navigation, Hero, Manifesto, Work Portfolio, Services, Results/Metrics, Process Timeline, Testimonials, Contact CTA, Footer.
- **`static/css/styles.css`** — Custom CSS for things Tailwind doesn't cover: cursor animation, loading screen, scroll animations, brand-specific utility classes.
- **`static/js/script.js`** — All interactivity: loading screen hide, custom cursor with trail effect, scroll-based fade-in animations, counter animations, portfolio filtering, mobile menu toggle.
- **`static/images/`** — General images used in portfolio/testimonials.
- **`static/brands/`** — Client brand logos shown in the work section.
- **`static/leaders/`** — Team/leadership photos.
- **`static/studio/`** — Studio/behind-the-scenes photos.
- **`static/distribution/`** — Distribution-related visuals.
- **`static/logo/`** — WhyMedia logo assets (primary: `WhyMedia.png`).

## Styling Conventions

- **Tailwind CSS** is loaded via CDN (`https://cdn.tailwindcss.com`) — no local install. Custom Tailwind theme is defined inline in `index.html` and duplicated at the top of `script.js`.
- **Brand colors**: Primary red `#FF3333` (`primary`), Dark `#0A0A0A` (`dark`), Grey `#9B9B9B`.
- **Fonts**: Inter (primary) and Caveat (accent/handwriting) loaded from Google Fonts.
- **Breakpoints**: Mobile < 768px, Tablet 768–1024px, Desktop > 1024px. Max content width: 1400px.
- Custom CSS classes (`.hero-bold`, `.cursor-dot`, `.fade-in`, etc.) are defined in `styles.css` and used throughout `index.html`.
