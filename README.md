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
├── components/
│   ├── common/          # Button, Card, Hero, CTA, FAQ, …
│   ├── layout/          # Navbar, Footer
│   ├── equipment/       # EquipmentCard, EquipmentGrid, PriceCard
│   └── gallery/         # GalleryGrid
├── config/              # Site, hire, occasions, nav, routes
├── content/             # equipment, occasions, faq (Markdown)
├── content.config.ts
├── lib/content.ts
├── layouts/Layout.astro # Site chrome + page shell
├── pages/               # Home, hire, occasions, gallery, about, faq, contact
└── styles/
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

## Images (Phase 6)

Put photos in `src/assets/equipment/` and reference them from frontmatter.  
Astro optimises to AVIF/WebP. See [images](./docs/images.md).

## Docs

- [Design brief](./docs/design-brief.md)
- [Site architecture](./docs/site-architecture.md)
- [Content collections](./docs/content-collections.md)
- [Images](./docs/images.md)
- [Astro docs](https://docs.astro.build)
