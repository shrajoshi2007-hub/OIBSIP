# AURELLE — Luxury Perfume Bottles Landing Page

A static, responsive landing page for a fictional perfume brand. Built with **HTML5 and CSS3 only** (no JavaScript), as a foundational layout exercise.

The design is inspired by a layered card layout: staggered product cards, soft lavender gradients, glowing pedestal edges and dark navy buttons.

**Live site:** https://shrajoshi2007-hub.github.io/OIBSIP/WebDev-L1-LandingPage/

## Project Structure

```
.
├── index.html        # Page markup
├── style.css         # All styling
├── README.md
└── images/
    ├── hero.svg      # Hero scene with three bottles
    ├── gold.svg      # Amber Oud bottle
    ├── rose.svg      # Rose Prism bottle
    └── sea.svg       # Ocean Mist bottle
```

## Getting Started

1. Download or clone the project and keep the folder structure as shown above.
2. Open `index.html` in any modern browser.

No build step, dependencies or server required.

## Feature Checklist

- [x] Sticky navigation bar with 4 links plus a call-to-action button
- [x] Hero section with headline, subheadline and call-to-action buttons
- [x] Multiple content sections: Collection, Scent Notes, Craft, Reviews
- [x] Footer with placeholder contact and social links
- [x] Consistent colour palette, defined as CSS variables in `:root`
- [x] Responsive layout using Flexbox and Grid (breakpoints at 900px and 560px)
- [x] No element overlap: `box-sizing: border-box` and intentional padding and margins
- [x] Readable typography with distinct heading and body sizes

## Design Notes

- **Palette:** navy `#070a2c`, lavender `#b9a6e6` / `#8f7ad0`, pink `#e070ff`, cream `#fff6f2`, gold `#d9b25f`. Change them in one place under `:root` in `style.css`.
- **Images:** the bottles are hand-built SVG illustrations with layered gradients for glass, liquid and metal. They scale without losing quality. To use real photos, add them to `images/` and update the `src` attributes in `index.html`.
- **Effects (CSS only):** floating hero bottle, scrolling ticker, card hover animations, film-grain overlay (an inline SVG noise texture) and a blurred navigation bar.
- **Accessibility:** images have alt text, and animations are disabled for users who prefer reduced motion.
- **Fonts:** uses system font stacks (Inter, Segoe UI and Playfair Display if installed, with fallbacks), so no external requests are made.

## Customising

- **Brand name and copy:** edit `index.html`.
- **Colours and spacing:** edit the variables and rules in `style.css`.
- **New bottle colours:** duplicate an SVG in `images/` and change the gradient `stop-color` values.
