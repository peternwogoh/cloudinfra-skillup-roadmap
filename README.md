# Cloud Infrastructure Skill-Up Roadmap

An interactive, single-page website built from my personal 10-phase roadmap to
go from **Infrastructure Engineer → Solutions Architect → Consultant → Founder → CEO**,
and to build a cloud & automation consulting company.

**Live portfolio:** https://peternwogoh.github.io/resume-portfolio/

## Features

- **10 color-coded phases** on a vertical timeline, each with its own accent gradient.
- **Interactive skill tracking** — tick off skills as you master them. Progress is saved
  in your browser (`localStorage`) and drives per-phase progress bars plus an overall
  completion ring.
- **Certification roadmap** — earned credentials and a checkable "next up" list with its
  own progress meter.
- **Career journey** strip: the five stages the roadmap moves you through.
- **Light / dark themes** (dark by default), respects system preference, remembers your choice.
- **Responsive** and **reduced-motion** friendly.

## Tech

Plain HTML, CSS and vanilla JavaScript — no build step, no dependencies.

| File | Purpose |
|------|---------|
| `index.html` | Page shell + section markup |
| `assets/css/styles.css` | Aurora / glassmorphism theme, timeline, components |
| `assets/js/roadmap.js` | All roadmap content (data model) + rendering + interactivity |
| `CloudInfraSkillup-Roadmap.md` | The original source roadmap |

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Roadmap phases

1. Vision & mission
2. Core infrastructure foundations
3. Cloud platforms (Azure-first)
4. Infrastructure as Code & automation
5. Containers & orchestration
6. Observability & reliability
7. Security & networking
8. Architecture & solution design
9. Portfolio & proof of work
10. Business & consulting knowledge

Plus a full **certification track**.

---

© Peter Nwogoh
