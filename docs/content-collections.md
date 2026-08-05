# Content Collections — Phase 3

**Status:** Implemented  
**Config:** `src/content.config.ts`  
**Helpers:** `src/lib/content.ts`  
**Content:** `src/content/{equipment,occasions,faq}/`

---

## Collections

### `equipment`

One Markdown file per hireable item. Filename (without `.md`) = entry `id` = URL slug.

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Display name |
| `description` | yes | Card / meta blurb |
| `category` | yes | Must match a slug in `src/config/hire.ts` |
| `priceFrom` | no | GBP guide price |
| `featured` | no | Default `false` — home / hub highlights |
| `order` | no | Sort within category (lower first) |
| `image` | no | Astro `image()` path, e.g. `../../assets/equipment/foo.jpg` |
| `imageSource` | no | `ai` \| `photo` \| `placeholder` (default) |
| `suitableFor` | no | Occasion slugs for cross-links |
| `whatsIncluded` | no | Bullet list for product page |
| `draft` | no | Hidden in production when `true` |

**URL:** `/hire/{category}/{id}`  
**Body:** Long-form product copy (Markdown).

### `occasions`

One file per event type. Prefer ids aligned with `src/config/occasions.ts` (`weddings`, etc.).

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `description` | yes | |
| `featured` | no | |
| `order` | no | |
| `image` / `imageSource` | no | Same as equipment |
| `recommendedCategories` | no | Hire category slugs |
| `recommendedEquipment` | no | Equipment entry ids |
| `draft` | no | |

**URL:** `/occasions/{id}`

### `faq`

One file per question. Answer is the Markdown body.

| Field | Required | Notes |
|---|---|---|
| `question` | yes | |
| `group` | no | `booking` \| `delivery` \| `setup` \| `pricing` \| `general` |
| `order` | no | |
| `draft` | no | |

**URL:** Rendered on `/faq` only (no per-question routes in v1).

---

## Adding content

1. Create `src/content/equipment/my-item.md` (or occasions/faq).
2. Fill frontmatter; keep `category` valid.
3. Write the body.
4. `npm run build` — schema errors fail the build (good).

No new route code required once Phase 5 dynamic pages exist.

---

## Query helpers

```ts
import {
  getAllEquipment,
  getEquipmentByCategory,
  getFeaturedEquipment,
  getAllOccasions,
  getAllFaq,
  equipmentPath,
  occasionPath,
} from '../lib/content';
```

Drafts are included in `astro dev` and excluded from production builds.

---

## Inventory (seed)

Seed content ships so collections are non-empty and the design-system inventory can be reviewed. Prices and copy are placeholders until real kit and photography land.
