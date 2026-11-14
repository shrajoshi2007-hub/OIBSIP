# Personal Portfolio Website

A single-page, fully responsive portfolio built with plain HTML5, CSS3 and a little JavaScript. The design is dark and typographic: a giant condensed name sits behind a portrait, and the letters switch to outlines wherever they overlap the figure.

**Live site:** https://shrajoshi2007-hub.github.io/OIBSIP/WebDev-L1-Personal%20Portfolio/

---

## Features

- **Hero:** name, role title and a portrait placeholder, with an animated entrance (letters pop up, the portrait wipes in, captions fade in) and a subtle mouse parallax on desktop
- **About:** a short bio and quick facts
- **Skills:** a grid of outlined words that fill in on scroll to show comfort level
- **Projects:** three placeholder cards with title, description, tags and a GitHub link
- **Contact:** email (with a copy button), LinkedIn and GitHub icons
- **Navigation:** smooth scrolling, a highlighted current section and a full-screen mobile menu
- **Branding:** one colour palette and two fonts throughout
- **Responsive and accessible:** works from phone to widescreen, supports keyboard navigation and respects `prefers-reduced-motion`

---

## Tech stack

| Layer | Details |
| --- | --- |
| Markup | HTML5, semantic sections |
| Styling | CSS3 (custom properties, Grid, Flexbox, container queries, CSS masks) |
| Behaviour | Vanilla JavaScript (optional enhancements, no libraries) |
| Fonts | [Anton](https://fonts.google.com/specimen/Anton) and [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) via Google Fonts |

---

## Project structure

```
portfolio-site/
├── index.html   # page content and structure
├── style.css    # all styling and animations
├── script.js    # name splitting, portrait, menu, scroll effects
└── README.md

```
---

## Customising

All placeholders are marked with `EDIT` comments in `index.html`.

| What | Where |
| --- | --- |
| Your name | the `<h1 id="nameFill">` and its `aria-label` in the hero, plus the page `<title>`, footer and contact name |
| Role title | the `.bar__role` link in the header |
| Bio and facts | the About section |
| Skills | the `.skill` list items. Change the word, description, level label and `--target` (0% to 100%) |
| Projects | the three `.card` articles. Update the title, text, tags, GitHub link and the big letter in `.glyph` |
| Email and social links | the Contact section |
