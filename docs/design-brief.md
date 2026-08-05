# Design Brief — The Memory Crew

**Status:** Approved decisions locked (2026-08-05)  
**Phase:** 1 – Design System  
**Principle:** Build a real product foundation. Every visual decision must scale from static brochure site → bookings → stock → payments without a redesign.

---

## 1. Product context

**What we are**  
Event hire for photo booths, garden games, giant LED letters, dance floors, gazebos and related equipment — serving weddings, birthdays, corporate events, schools and seasonal occasions.

**Service area (v1)**  
South Wales and Bristol. Expand later without changing brand language — only config and SEO schema.

**What we are not**  
A party-shop flyer. Not clip-art, not rainbow CTAs, not “fun fonts” fighting for attention.

**Product thesis**  
Visitors are planning a gathering. We supply the equipment that gets people of all ages playing, posing and celebrating together — so the day turns into memories that stick for years. The site should feel like a premium booking product even while Phase 1–9 is still brochure + form.

**Non-negotiables**
- Always deployable: `main` always builds and ships a working site
- Content-driven: new equipment/occasions = Markdown, not new page code
- Component-first: pages assemble UI; they do not invent styles
- Imagery-led: people + equipment in use carry emotion; UI stays quiet
- Accessible by default: contrast, focus, keyboard, reduced motion
- Honest visuals: AI placeholders allowed early; real photos replace them as stock is acquired

---

## 2. Brand

| Element | Decision | Status |
|---|---|---|
| **Company name** | The Memory Crew | Locked |
| **Tagline (primary)** | Bringing people together for memories that last | Locked |
| **Tagline (short)** | Gather. Play. Remember. | Optional — nav/footer/social |
| **Supporting line** | Event hire across South Wales and Bristol — equipment that gets every generation involved. | Locked |
| **Voice** | Warm, clear, capable. Friendly without being childish. Premium without being stiff. | Locked |
| **Tone in UI** | Short sentences. Concrete benefits. Prices when known. No hype adjectives. | Locked |
| **Logo** | Polaroid lockup — empty window + signature caption; tilt + squiggle on md/lg only. | Locked |
| **Favicon** | Polaroid frame only (no squiggle). | Locked |

**Why this tagline**  
It states the job: not “we rent stuff”, but *we use equipment to bring all ages together and create lasting memories*. “Gather. Play. Remember.” is the short form for tight UI spaces.

**Logo (locked)**  
See [`docs/brand-logo.md`](./brand-logo.md). Component: `src/components/brand/Logo.astro`.

---

## 3. Visual direction

### North star

**Closer to Apple / Airbnb than typical event-hire.**

| Attribute | We aim for | We avoid |
|---|---|---|
| Density | Generous whitespace | Cramped grids, banner clutter |
| Colour | Restrained palette + one warm accent | Neon primaries, gradients everywhere |
| Type | Two free families, clear hierarchy | Novelty display fonts, all-caps walls |
| Imagery | People of mixed ages + equipment in use | Clip-art, busy collages, generic office stock |
| UI chrome | Quiet cards, soft elevation | Heavy borders, skeuomorphism |
| Motion | Subtle, purposeful | Bounce, confetti, auto-carousels |

### Mood keywords

`clean` · `spacious` · `confident` · `warm` · `inclusive` · `photographic` · `editorial`

### Reference feel (not copy)

- Airbnb: trust, photography, clear CTAs, scannable cards  
- Apple: type hierarchy, product focus, breathing room  
- High-end wedding / event suppliers: cream/ink, soft contrast, calm luxury  

Adapted for hire: practical details (price from, delivery area, what’s included) stay highly visible — luxury layout, not luxury-only content.

---

## 4. Colour palette

CSS custom properties live in `src/styles/tokens.css`. Names are semantic so themes can evolve without renaming components.

### Core

| Token | Role | Value | Notes |
|---|---|---|---|
| `--color-canvas` | Page background | `#FAF9F7` | Warm off-white, not pure `#fff` |
| `--color-surface` | Cards, panels | `#FFFFFF` | Elevated surfaces |
| `--color-surface-muted` | Subtle sections | `#F3F1ED` | Alternating bands |
| `--color-ink` | Primary text | `#1A1A1A` | Near-black, softer than pure black |
| `--color-ink-muted` | Secondary text | `#5C5C5C` | Meta, captions |
| `--color-ink-subtle` | Tertiary / placeholders | `#8A8A8A` | Hints only |
| `--color-border` | Dividers, card edges | `#E8E4DE` | Warm grey |
| `--color-border-strong` | Focused inputs | `#C9C3BA` | Forms |

### Brand accent — Coral (locked)

Coral beats copper and teal for this brand: warmer and more celebratory than copper, more “gathering” than corporate teal, still controllable if we use a **muted** coral rather than neon beach-ball coral.

| Token | Value | Use |
|---|---|---|
| `--color-accent` | `#D4645A` | Primary buttons, links, key highlights |
| `--color-accent-hover` | `#B84F47` | Hover / active |
| `--color-accent-subtle` | `#F9EDEA` | Soft badges, selected chips, tinted bands |
| `--color-accent-ink` | `#FFFFFF` | Text on accent fills |

**Contrast:** white text on `#D4645A` is intended for button-sized UI (large text / UI components). Body links use accent on canvas; verify AA in implementation.

**Not using:** bright `#FF7F50` “classic coral”, hot pink, cyan, or rainbow multi-accent schemes.

### Semantic (forms, feedback — Phase 8+)

| Token | Value |
|---|---|
| `--color-success` | `#2F6F4E` |
| `--color-warning` | `#A15C12` |
| `--color-danger` | `#A33B2A` |
| `--color-info` | `#2B5F8A` |

### Photography overlays

Hero text on photos uses a scrim, not coloured filters:

- `--overlay-hero`: `linear-gradient(to top, rgba(26,26,26,0.55), rgba(26,26,26,0.15))`
- Prefer light text on dark scrim for lifestyle heroes

---

## 5. Typography

### Decision guide (why these, not others)

| Choice | Pick | Why |
|---|---|---|
| **Display + body** | **Inter** | Free, clean, product-like. One family for titles and UI keeps the site feeling smart and consistent (closer to Airbnb/Apple than a serif “wedding brochure”). Hierarchy comes from size and weight, not a second typeface. |
| **Loading** | Fontsource or self-hosted `font-face` | Subset Latin; `font-display: swap`; no runtime dependency on Google in production if we self-host. |

Inter is free for commercial use and available everywhere.

### Families (locked)

| Role | Family | Fallback |
|---|---|---|
| **Display / headings** | Inter (600) | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| **Body / UI** | Inter (400–500) | same |
| **Mono (rare)** | ui-monospace | system mono — order refs in v2 |

### Scale (mobile → desktop)

Modular scale ~1.25. Tokens only — no one-off sizes in components.

| Token | Mobile | Desktop | Use |
|---|---|---|---|
| `--text-xs` | 0.75rem | 0.75rem | Eyebrows, labels |
| `--text-sm` | 0.875rem | 0.875rem | Meta, captions |
| `--text-base` | 1rem | 1rem | Body |
| `--text-lg` | 1.125rem | 1.25rem | Lead paragraphs |
| `--text-xl` | 1.25rem | 1.5rem | Card titles |
| `--text-2xl` | 1.5rem | 1.875rem | Section titles |
| `--text-3xl` | 1.875rem | 2.25rem | Page titles |
| `--text-4xl` | 2.25rem | 3rem | Hero |
| `--text-5xl` | 2.75rem | 3.75rem | Home hero only |

### Weight & rhythm

- Body: 400; emphasis 500–600; display headings 500–600 (not ultra-black)
- Line height: body `1.6`; headings `1.15–1.25`
- Measure: body copy max ~65ch inside content columns
- Letter-spacing: slight negative on large display (`-0.02em`); never tracked-out novelty

---

## 6. Spacing, layout, radius, elevation

### Spacing scale

4px base. Use tokens only.

```
--space-1: 0.25rem   /* 4 */
--space-2: 0.5rem    /* 8 */
--space-3: 0.75rem   /* 12 */
--space-4: 1rem      /* 16 */
--space-5: 1.5rem    /* 24 */
--space-6: 2rem      /* 32 */
--space-7: 3rem      /* 48 */
--space-8: 4rem      /* 64 */
--space-9: 6rem      /* 96 */
--space-10: 8rem     /* 128 — section breathing */
```

### Layout

| Token | Value | Use |
|---|---|---|
| `--width-content` | `42rem` | Long-form text |
| `--width-container` | `72rem` | Main page container |
| `--width-wide` | `90rem` | Full-bleed photo grids |
| `--gutter` | `clamp(1rem, 4vw, 2rem)` | Side padding |

**Grid:** 12-column mental model; implement with CSS grid/flex in components — no Bootstrap.

**Section vertical rhythm:** default `padding-block: var(--space-9)` on desktop; `--space-7` on mobile.

### Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `0.375rem` | Chips, inputs |
| `--radius-md` | `0.75rem` | Buttons, small cards |
| `--radius-lg` | `1rem` | Cards, images |
| `--radius-xl` | `1.5rem` | Hero media, large panels |
| `--radius-full` | `9999px` | Pills, avatars |

### Shadows

```
--shadow-sm: 0 1px 2px rgba(26, 26, 26, 0.04);
--shadow-md: 0 4px 16px rgba(26, 26, 26, 0.06);
--shadow-lg: 0 12px 40px rgba(26, 26, 26, 0.08);
```

Cards: border + `--shadow-sm` at rest; `--shadow-md` on hover (if interactive). Prefer border over shadow when in doubt.

### Borders

Default `1px solid var(--color-border)`. Interactive focus: visible accent ring (never remove outline without a replacement).

---

## 7. Component visual specs (Phase 1 set)

These are **design-system primitives** — no page-specific content.

### Button

| Variant | Style |
|---|---|
| **Primary** | Coral fill, white text, `--radius-md`, medium weight |
| **Secondary** | Surface fill, ink text, border |
| **Ghost** | Transparent, ink text, hover muted surface |
| **Link** | Inline coral text, underline on hover |

Sizes: `sm` / `md` / `lg`. Min tap target 44×44px.

### Card

- Surface background, `--radius-lg`, border, optional image top
- Padding `--space-5`
- Title + meta + optional price row
- Whole-card link hit area preferred for equipment tiles

### Container

- Centers content at `--width-container`
- Applies `--gutter`
- Optional `narrow` / `wide` variants

### Section

- Vertical padding from spacing scale
- Optional `muted` background band

### Hero

- Full-bleed or contained image
- Overlay scrim when text sits on photo
- Headline (display), supporting line, primary + secondary CTA
- Min height ~60–80vh on home; shorter on inner pages

### PageHeader

- Title + optional breadcrumb + short intro
- Calmer than Hero — used on category, About, FAQ, Contact

### Gallery (primitive)

- Responsive image grid (2 → 3 → 4 cols)
- Primary aspect: **3:2** for lifestyle/grids (locked); product detail may use 4:5 later
- Lazy-loaded; aspect-ratio boxes to prevent CLS

---

## 8. Iconography

- **Style:** Outline, 1.5–2px stroke, rounded joins — Lucide or similar (free)
- **Size tokens:** 16 / 20 / 24
- **Colour:** currentColor
- **Do not** mix filled cartoon icons with outline sets

---

## 9. Imagery principles

### Long-term (real photos)

| Type | Treatment |
|---|---|
| **Hero / lifestyle** | Mixed ages together, equipment *in use*, natural light, South Wales / Bristol-feeling settings when possible |
| **Product** | Clean readable shots as physical stock is acquired |
| **Avoid** | Watermarked random stock, harsh flash, cluttered backgrounds, mixed aspect ratios in one grid |

**Formats:** source high-res → Astro-optimised WebP/AVIF. Lazy-load below fold. Priority + dimensions on LCP hero.

### Interim — AI and placeholders (locked policy)

Buying kit as bookings come in means real product photography will lag the catalogue. That is fine if we are disciplined:

1. **Prefer AI lifestyle scenes** that match the brief: multi-generational groups, warm natural light, equipment as the social centre, no logos of other brands, no unreadable fake text in frame.
2. **Match the art direction:** coral does *not* need to dominate the photo; keep grading warm/neutral, not neon.
3. **Consistent aspect ratios** (3:2 grids) so swapping in real photos later is a file replace, not a layout rewrite.
4. **Label honestly in content metadata** where useful (`imageSource: ai | photo | placeholder`) so we can audit and replace.
5. **Never** use low-effort generic “party clip-art” AI, distorted hands as hero focus, or imagery that promises equipment we do not offer.
6. **Until an image exists:** `surface-muted` aspect-ratio blocks — better than the wrong picture.
7. **Replacement path:** as each physical product is bought and photographed, replace the AI asset in `src/assets` / content frontmatter; no component changes.

AI is a **bridge**, not the brand. The UI and copy should still read as a real local hire company serving South Wales and Bristol.

---

## 10. Motion & interaction

- Default transitions: `150–200ms` ease on colour, shadow, transform
- Hover lift on cards: `translateY(-2px)` max
- Respect `prefers-reduced-motion: reduce`
- No autoplay video in hero for v1
- Focus visible always

---

## 11. Accessibility bar

- WCAG AA contrast for text and interactive elements
- Semantic landmarks: `header`, `nav`, `main`, `footer`
- Form labels (Phase 8) always visible, not placeholder-only
- Skip link to main content
- Keyboard-operable FAQ accordion, menus, galleries

---

## 12. Site config (implementation target)

`src/config/site.ts` should encode:

```ts
name: 'The Memory Crew'
tagline: 'Bringing people together for memories that last'
taglineShort: 'Gather. Play. Remember.'
description: 'Event hire across South Wales and Bristol — photo booths, garden games, and more that get every generation involved.'
serviceArea: ['South Wales', 'Bristol']
// url: set when custom domain is live
```

---

## 13. Repository alignment

```text
src/
├── components/
│   ├── common/          # Button, Card, Container, Section, …
│   ├── layout/          # Navbar, Footer (Phase 4)
│   ├── equipment/       # EquipmentCard, EquipmentGrid (Phase 4)
│   ├── gallery/
│   └── seo/
├── content/
│   ├── equipment/
│   ├── occasions/
│   └── faq/
├── layouts/
├── pages/
├── styles/              # tokens.css, global.css, reset
├── assets/
├── lib/
└── config/              # site name, nav, contact, business details
```

**Phase 1 implementation order**

1. `src/config/site.ts` — name, tagline, service area  
2. `src/styles/tokens.css` + global base styles (coral + Inter)  
3. Primitive components  
4. `/design-system` showcase — not linked in public nav  
5. Replace Astro Welcome on `/` with minimal branded shell (wordmark + tagline + service area)

---

## 14. Phase map

| Phase | Focus | Always shippable? |
|---|---|---|
| **0** Foundation | Repo, Astro, Pages, domain, HTTPS | ✅ in progress |
| **1** Design system | Brand, tokens, primitives | ✅ design-system page + calm home shell |
| **2** Architecture | IA, nav model, routes plan | ✅ docs + config |
| **3** Content collections | equipment, occasions, faq schemas | ✅ seed content + helpers |
| **4** Domain components | Navbar, cards, CTA, FAQ… | ✅ + public routes wired |
| **5** Pages | Home → product → contact | ✅ assembled from components |
| **6** Images | AI bridge → real assets + optimisation | ✅ seed AI + SmartImage |
| **7** SEO | sitemap, OG, schema, local area | ✅ |
| **8** Contact | Formspree (or similar) | no backend |
| **9** Polish | a11y, Lighthouse, motion | |
| **10** v2 | Ktor + Postgres + bookings + payments | separate app boundary |

**Phase 10:** Astro stays the public storefront. Booking/payments are an API + app surface, not a rewrite of the marketing site.

---

## 15. Decisions log

| # | Topic | Decision |
|---|---|---|
| 1 | Accent | **Muted coral** `#D4645A` (not copper, not teal, not neon coral) |
| 2 | Display font | **Inter** (same as body) — hierarchy via size/weight |
| 3 | Body font | **Inter** — free, consistent across devices (see §5) |
| 4 | Tagline | **Bringing people together for memories that last** · short: **Gather. Play. Remember.** |
| 5 | Service area | **South Wales and Bristol** |
| 6 | Logo | **Typeset wordmark** for now |
| 7 | Photos | **AI + placeholders OK** until kit is bought; real photos replace in place (§9) |

---

## 16. Success criteria for Phase 1

Phase 1 is done when:

- [x] Tokens documented and implemented in CSS (coral palette)
- [x] Inter loading correctly (titles + body)
- [x] Button, Card, Section, Hero, Container, PageHeader, Gallery primitives exist
- [x] `/design-system` showcases all primitives and states
- [x] Home shows wordmark, tagline, and service area — not the Astro starter
- [x] `npm run build` succeeds; deploy to Pages remains green
- [x] No hire/occasion marketing pages yet (intentionally)

---

## 17. Phase 2 success criteria

- [x] IA tree documented (`docs/site-architecture.md`)
- [x] URL scheme locked (`/hire/{category}/{slug}`, `/occasions/{slug}`, …)
- [x] Hire + occasion taxonomies in config
- [x] Primary + footer nav model in config
- [x] `withBase()` route helpers for GitHub Pages base path

## 18. Phase 3 success criteria

- [x] `src/content.config.ts` schemas for equipment, occasions, faq
- [x] Category enum tied to hire taxonomy
- [x] Seed Markdown content across categories
- [x] Query helpers in `src/lib/content.ts`
- [x] Design-system inventory lists live collection data
- [x] `npm run build` validates frontmatter

## 19. Phase 4–5 success criteria

- [x] Navbar + Footer in Layout
- [x] EquipmentCard, EquipmentGrid, PriceCard
- [x] SectionTitle, Breadcrumb, CTA, FAQAccordion, Testimonial, GalleryGrid
- [x] Public pages assemble components (hire, product, occasions, gallery, about, faq, contact)
- [x] `npm run build` green with content-driven routes

## 20. Phase 6–7 success criteria

- [x] Content `image()` schema + `SmartImage` (AVIF/WebP)
- [x] Seed AI lifestyle images on featured kit + home hero
- [x] Sitemap + robots.txt
- [x] Canonical, Open Graph, Twitter cards
- [x] LocalBusiness + BreadcrumbList + Product JSON-LD

## 21. Next action

**Phases 6–7 complete.** Next: Phase 8 – Contact form (Formspree or similar).
