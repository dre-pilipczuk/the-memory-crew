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
├── config/              # Site, hire categories, occasions, nav, routes
├── content/             # equipment, occasions, faq (Markdown)
├── content.config.ts    # Collection schemas
├── lib/content.ts       # Query helpers
├── layouts/
├── pages/
│   ├── index.astro      # Public home (minimal shell)
│   └── design-system.astro  # Internal gallery + content inventory
└── styles/              # tokens.css, global.css
docs/
├── design-brief.md
├── site-architecture.md
└── content-collections.md
```

## Design system

Open `/design-system` locally to review colour, type, and primitives.  
This route is **not** linked in public navigation.

## Site architecture (Phase 2)

Public IA (pages land in Phase 5):

- **Hire** → categories → products at `/hire/{category}/{slug}`
- **Occasions** → `/occasions/{slug}`
- Gallery, About, FAQ, Contact

Taxonomies and nav live in `src/config/`. See [site architecture](./docs/site-architecture.md).

## Content (Phase 3)

Add hire items as Markdown under `src/content/equipment/`.  
Schemas and frontmatter rules: [content collections](./docs/content-collections.md).

## Docs

- [Design brief](./docs/design-brief.md)
- [Site architecture](./docs/site-architecture.md)
- [Content collections](./docs/content-collections.md)
- [Astro docs](https://docs.astro.build)
