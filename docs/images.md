# Images — Phase 6

## Principles

- **3:2** aspect for cards, gallery, and product heroes
- **Lifestyle first** — people of mixed ages with equipment in use
- **AI is a bridge** — mark `imageSource: ai` until real photos replace assets
- **Optimise with Astro** — `astro:assets` / `<Image />` / `SmartImage` → AVIF + WebP
- **Lazy-load** below the fold; **priority** on LCP hero / product image

## Where assets live

```text
src/assets/
├── equipment/     # Product / lifestyle shots keyed by equipment id
└── lifestyle/     # Home hero and campaign images
public/
└── og-default.jpg # Fallback Open Graph image
```

## Wiring a photo to equipment

1. Add the file under `src/assets/equipment/{id}.jpg`
2. In the Markdown frontmatter:

```yaml
image: ../../assets/equipment/giant-jenga.jpg
imageSource: ai   # or photo when real
```

3. Rebuild — cards, product page, and gallery pick it up via the content schema `image()` helper.

## Components

| Component | Role |
|---|---|
| `SmartImage` | Optimized image or placeholder |
| `EquipmentCard` | Uses `SmartImage` for catalogue tiles |
| Hero `hasMedia` | Full-bleed lifestyle (home) |

## Replacing AI with real photos

Overwrite the asset file (same path) or update the frontmatter path. No page code changes. Set `imageSource: photo` when live photography is used.
