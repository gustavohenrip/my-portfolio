<p align="center">
  <img src="https://logodownload.org/wp-content/uploads/2017/05/ferrari-logo-5.png" width="120" alt="Ferrari Logo">
</p>

<h1 align="center">Ferrari | The Legend</h1>

<p align="center">
  <strong>An immersive storytelling experience about Ferrari's history</strong>
</p>

<p align="center">
  <a href="#preview">Preview</a> •
  <a href="#about">About</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#how-to-run">How to Run</a> •
  <a href="#structure">Structure</a>
</p>

<br>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP">
</p>

---

<br>

## Preview

The site opens with a cinematic preloader: the letters F-E-R-R-A-R-I reveal one by one while a progress bar climbs. After that you're dropped straight into a bold hero with the title "THE LEGEND" and the Enzo quote: "I have never built a car that was not a Ferrari."

Navigation is scroll-driven. As you move down the page you travel through Ferrari's timeline—from early days to modern Leclerc era—each section with its own transitions and micro-interactions.

<br>

## About

This started as a problem: how do you tell Ferrari's story without making yet another boring corporate page? The answer was to make the user feel the story.

I focused on the details—custom cursor behaviors, smooth section transitions, subtle parallax layers—and kept the experience tactile. Every scroll reveals a little reward.

**Main sections:**

| Section | What to expect |
|--------:|----------------|
| Hero    | Large title animation + Enzo quote |
| Origin  | The beginning, early stats and victories |
| Timeline| Timeline from 1929 to 2024 with archival photos |
| Supercars| Iconic cars (250 GTO, F40, LaFerrari...) |
| Racing  | Ferrari in F1 and legendary drivers |
| Legacy  | What Ferrari means today |

<br>

## Technologies

Kept the stack intentionally light—no heavy frameworks, no complex build step.

```
HTML5          → Semantic structure, clean markup
CSS3           → CSS variables, animations, grid & flexbox
JavaScript     → Vanilla JS (no jQuery), modular logic
GSAP           → ScrollTrigger-powered timelines and reveals
Lenis          → Smooth scrolling
Google Fonts   → Bebas Neue, Inter, Playfair Display
```

Why GSAP? Because it lets you create timelines and scroll interactions that would be impractical with pure CSS.

<br>

## How to Run

Quick and simple:

```bash
# Clone the repo
git clone https://github.com/your-username/ferrari-storytelling.git

# Enter the folder
cd ferrari-storytelling

# Install dependencies (just live-server)
npm install

# Start local server
npm run dev
```

The site will be served at `http://localhost:3000`.

If you prefer, open `index.html` directly in your browser—works fine for a quick look, but live-server gives a better dev experience with reloads.

<br>

## Structure

```
ferrari-storytelling/
│
├── index.html          # All the sections and layout
│
├── css/
│   └── style.css       # ~4000 lines of handcrafted CSS
│
├── js/
│   └── main.js         # Animation and interaction logic
│
├── images/             # Local assets
│
└── docs/               # Research and references
```

The CSS is large because it contains a lot of custom work: cursor, preloader, section-specific styles and responsive tweaks. I left it in a single file for easier iteration.

<br>

## Highlights

- Custom cursor — a small detail that dramatically improves feel.
- Real progress preloader — it waits for assets, not a fake timer.
- Scroll-revealed text — words and phrases reveal themselves in sequence.
- Parallax layers — subtle depth through multiple background speeds.
- Magnetic buttons — slight attraction effect near interactive elements.

I spent a lot of time polishing these micro-interactions—they're small, but they add up.

<br>

## Performance

What I did to help:
- Lazy-loaded images
- Minified CSS for production
- Preconnect for fonts
- Animations using transform & opacity for GPU acceleration

That said, the project is visually rich and can feel heavy on older devices. It's a deliberate trade-off for a premium feel.

<br>

## Credits

- Archival photos from Wikimedia Commons
- Ferrari logo and official imagery belong to Ferrari S.p.A.
- Fonts from Google Fonts
- GSAP and Lenis for animation and smooth scroll

<br>

---
