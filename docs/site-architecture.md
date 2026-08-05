# Site Architecture — The Memory Crew

**Status:** Locked (Phase 2)  
**Principle:** Structure first, pages later. Routes and nav are defined here and in `src/config/`; marketing pages land in Phase 5 once content collections (Phase 3) and domain components (Phase 4) exist.

---

## 1. Goals

1. **Scannable IA** — visitors find kit by *what they need* (Hire) or *why they’re celebrating* (Occasions).
2. **SEO room** — category, product, and occasion URLs each target distinct search intent.
3. **Content-driven growth** — new equipment or occasions = Markdown + frontmatter, not new route code (Phase 3).
4. **Stable URLs** — path shapes do not change when bookings/payments arrive in v2.
5. **Always deployable** — this phase adds config and docs only; no half-built public pages.

---

## 2. Information architecture

```text
Home
│
├── Hire                          ← kit by category
│   ├── Photo Booths
│   ├── Crazy Golf
│   ├── Garden Games
│   ├── Giant LED Letters
│   ├── Dance Floors
│   └── Gazebos
│       └── [Product]             ← individual equipment item
│
├── Occasions                     ← kit in context of the event
│   ├── Weddings
│   ├── Birthdays
│   ├── Corporate
│   ├── Schools
│   └── Christmas
│
├── Gallery
├── About
├── FAQ
└── Contact
```

**Why Occasions are first-class**  
Someone searching “wedding garden games South Wales” or planning a school fair thinks in *events*, not inventory SKUs. Occasion pages cross-link equipment and support local SEO without duplicating product detail pages.

**Internal only (not in public nav)**  
- `/design-system` — component gallery (Phase 1)

---

## 3. URL scheme (locked)

All paths below are **site-relative**. With GitHub Pages project hosting they are prefixed by `base` (`/the-memory-crew`). Use `withBase()` from `src/config/routes.ts` in components — never hardcode the base.

| Page | Path | Source (later) |
|---|---|---|
| Home | `/` | `pages/index.astro` |
| Hire hub | `/hire` | `pages/hire/index.astro` |
| Hire category | `/hire/{category}` | `pages/hire/[category]/index.astro` |
| Equipment item | `/hire/{category}/{slug}` | `pages/hire/[category]/[slug].astro` + content |
| Occasions hub | `/occasions` | `pages/occasions/index.astro` |
| Occasion | `/occasions/{slug}` | `pages/occasions/[slug].astro` + content |
| Gallery | `/gallery` | `pages/gallery.astro` |
| About | `/about` | `pages/about.astro` |
| FAQ | `/faq` | `pages/faq.astro` + content |
| Contact | `/contact` | `pages/contact.astro` |
| Design system | `/design-system` | internal; noindex in Phase 7 |

### Slug rules

- **kebab-case** only: `garden-games`, `giant-jenga`, `photo-booths`
- Category slugs are **stable IDs** (see `src/config/hire.ts`) — renaming a display title does not change the URL
- Equipment `slug` is unique **within** its category; full path is the public ID
- Occasion slugs are unique globally under `/occasions/`

### Why nest products under `/hire/{category}/{slug}`?

- Clear breadcrumb: Hire → Garden Games → Giant Jenga  
- Category pages rank for broader terms; products for specific kit  
- One content collection (`equipment`) with a `category` field still generates nested URLs in Astro

Avoid a parallel `/equipment/{slug}` tree — two URLs for one product creates SEO and booking confusion.

---

## 4. Taxonomies

### Hire categories

| Title | Slug | Notes |
|---|---|---|
| Photo Booths | `photo-booths` | Classic, mirror, etc. as items |
| Crazy Golf | `crazy-golf` | |
| Garden Games | `garden-games` | Jenga, Connect 4, etc. |
| Giant LED Letters | `giant-led-letters` | |
| Dance Floors | `dance-floors` | |
| Gazebos | `gazebos` | |

Order in this table = default nav and hub order. Add categories in config first, then content.

### Occasions

| Title | Slug |
|---|---|
| Weddings | `weddings` |
| Birthdays | `birthdays` |
| Corporate | `corporate` |
| Schools | `schools` |
| Christmas | `christmas` |

---

## 5. Navigation model

### Primary (header)

| Label | Target | Behaviour |
|---|---|---|
| Hire | `/hire` | Desktop: mega/simple dropdown of categories. Mobile: expandable section. |
| Occasions | `/occasions` | Same pattern with occasion links. |
| Gallery | `/gallery` | Direct link |
| About | `/about` | Direct link |
| FAQ | `/faq` | Direct link |
| Contact | `/contact` | Emphasised as primary CTA button style |

**Not in primary nav:** Design system, legal (later), individual products.

### Secondary / utility

- Service area line (South Wales and Bristol) — header or footer, not a nav item
- Phone/email when Phase 8 fills `site.ts` — footer + optional header

### Footer

Columns (Phase 4 Footer component):

1. **Brand** — wordmark, tagline short, service area  
2. **Hire** — all categories  
3. **Occasions** — all occasions  
4. **Company** — Gallery, About, FAQ, Contact  

Later: privacy/cookies if analytics (Phase 9).

### Breadcrumbs (Phase 4–5)

| Context | Trail |
|---|---|
| Category | Home → Hire → {Category} |
| Product | Home → Hire → {Category} → {Product} |
| Occasion | Home → Occasions → {Occasion} |
| Other top-level | Home → {Page} |

---

## 6. Page roles (what each URL is for)

| Page | Job | Primary CTA |
|---|---|---|
| **Home** | Promise + trust + paths into Hire / Occasions / Contact | Contact or Browse hire |
| **Hire hub** | Overview of categories; who we serve | Browse a category |
| **Category** | List equipment in that category | Product or enquire |
| **Product** | What’s included, price from, suitability, gallery | Enquire / Contact |
| **Occasions hub** | Event types we support | Pick an occasion |
| **Occasion** | Narrative + recommended kit cross-links | Hire items / Contact |
| **Gallery** | Social proof via imagery | Contact |
| **About** | Who we are, area, how hire works | Contact |
| **FAQ** | Objections: delivery, deposit, weather, setup | Contact |
| **Contact** | Enquiry form (Phase 8) | Submit |

---

## 7. Content → route mapping (Phase 3 prep)

```text
src/content/equipment/*.md
  frontmatter: title, description, category (slug), priceFrom?, featured?, image?, …
  → /hire/{category}/{slug}

src/content/occasions/*.md
  frontmatter: title, description, recommendedCategories? / equipment?, image?, …
  → /occasions/{slug}

src/content/faq/*.md  (or single faq collection of Q&As)
  → rendered on /faq (no per-question public URL required in v1)
```

Equipment `category` **must** match a slug in `src/config/hire.ts`. Unknown categories fail the build or are rejected in the collection schema (Phase 3).

---

## 8. Cross-linking rules

- Product pages link up to category + related occasions (tags or manual refs)
- Occasion pages link **to** products/categories — they do not duplicate full product specs
- Home features a subset (`featured: true` equipment + key occasions)
- Contact is reachable from every page (nav CTA + footer)

---

## 9. Out of scope for Phase 2

- Building public pages other than existing home / design-system  
- Navbar/Footer components (Phase 4)  
- Content collections and sample Markdown (Phase 3)  
- Forms, SEO tags, sitemap (Phases 7–8)  
- Bookings, stock, payments (Phase 10)

---

## 10. Config map

| File | Responsibility |
|---|---|
| `src/config/site.ts` | Brand, service area, contact fields |
| `src/config/hire.ts` | Category taxonomy (order, titles, slugs, blurbs) |
| `src/config/occasions.ts` | Occasion taxonomy |
| `src/config/navigation.ts` | Primary + footer nav trees |
| `src/config/routes.ts` | Path builders + `withBase()` |

---

## 11. Success criteria (Phase 2)

- [x] IA tree documented and agreed
- [x] URL scheme locked (including nested product paths)
- [x] Hire and occasion taxonomies in config
- [x] Navigation model in config (ready for Navbar/Footer)
- [x] Route helpers respect GitHub Pages `base`
- [x] `npm run build` still green
- [x] No orphan public marketing pages

---

## 12. Phase 3 status

Content collections are implemented — see `docs/content-collections.md`.

## 13. Status

Phases 4–5 are implemented: domain components live under `src/components/`, and public routes assemble them from content collections.

## 14. Next

**Phase 6 — Images** · **Phase 7 — SEO** · **Phase 8 — Contact form**
