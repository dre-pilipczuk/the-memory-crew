# The Memory Crew

Event hire across South Wales and Bristol — equipment that brings people together for memories that last.

## Stack

- [Astro](https://astro.build) static site
- Design tokens and common components (Phase 1)
- Deployed to GitHub Pages on every push to `main`

## Development

```sh
npm install
npm run dev
```

| Command           | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Local dev server                            |
| `npm run build`   | Production build to `./dist/`               |
| `npm run preview` | Preview the production build                |

## Project structure

```text
src/
├── components/common/   # Button, Card, Container, Section, Hero, …
├── config/              # Site name, tagline, service area
├── layouts/
├── pages/
│   ├── index.astro      # Public home (minimal shell)
│   └── design-system.astro  # Internal token/component gallery
└── styles/              # tokens.css, global.css
docs/
└── design-brief.md      # Visual direction and product phases
```

## Design system

Open `/design-system` locally to review colour, type, and primitives.  
This route is **not** linked in public navigation.

## Docs

- [Design brief](./docs/design-brief.md)
- [Astro docs](https://docs.astro.build)
