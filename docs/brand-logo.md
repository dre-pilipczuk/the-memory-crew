# Brand logo — The Memory Crew

**Status:** Locked  

## Primary identity

**Polaroid lockup** — coral instant-photo frame with an empty cream window, plus a white signature-style caption stroke on the stock.

| Element | Spec |
|---|---|
| Frame | Coral `#D4645A`, rounded, thick bottom border |
| Photo window | Canvas cream `#FAF9F7`, empty (no people) |
| Caption | One irregular white path — handwriting / date on the stock |
| Wordmark | Stacked “THE” + “Memory Crew” in Inter |
| Tilt | ~−10° on the mark at md/lg; softens on hover |

## Size behaviour

| Size | Squiggle | Tilt | Typical use |
|---|---|---|---|
| `sm` | No | No | Navbar, footer |
| `md` / `lg` | Yes | Yes | Marketing, design system, large lockups |

Favicon (`public/favicon.svg`): frame only, no squiggle, no tilt.

## Implementation

| File | Role |
|---|---|
| `src/config/brand.ts` | `logoVariant = 'lockup-polaroid'` |
| `src/components/brand/Logo.astro` | Lockup + mark rendering |
| `src/assets/logo/mark-polaroid.svg` | Standalone SVG asset |
| `public/favicon.svg` | Browser tab icon |

## Rejected directions (kept for history only)

Crew blobs, brain-from-blobs, arches-M, TMC badge, aperture — explored in design system concepts under `src/assets/logo/concept-*.jpg`. Polaroid won for small-size clarity and “memories / photo” fit.
