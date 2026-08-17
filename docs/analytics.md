# Analytics

Component: `src/components/seo/Analytics.astro` (loaded from `Layout`, skipped on `noindex` pages like `/design-system`).

Scripts only load when the matching env var is set.

---

## Option A — Plausible (privacy-friendly)

Paid, simple, GDPR-friendly, UK-friendly. **No cookies / no consent banner** for basic traffic stats.

1. Create a site at [plausible.io](https://plausible.io) for **`thememorycrew.com`**
2. Locally, add to `.env`:

```sh
PUBLIC_PLAUSIBLE_DOMAIN=thememorycrew.com
```

3. For production, add the same as a **GitHub Actions secret** named `PUBLIC_PLAUSIBLE_DOMAIN`.

---

## Option B — Cloudflare Web Analytics (free)

Privacy-friendly page stats. **No cookies / no consent banner** for basic traffic.

1. [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) → add site
2. Copy the **beacon token**
3. Set:

```sh
PUBLIC_CF_BEACON_TOKEN=your-token-here
```

You can use **both** Plausible and Cloudflare if you set both vars (usually pick one).

---

## Meta Pixel (Facebook / Instagram ads)

Required for Facebook Ads optimisation, retargeting, and conversion tracking.

1. In [Meta Events Manager](https://business.facebook.com/events_manager2) create a **Pixel** (or open an existing one)
2. Copy the **Pixel ID** (digits only)
3. Locally, add to `.env`:

```sh
PUBLIC_META_PIXEL_ID=123456789012345
```

4. For production, add a GitHub Actions secret **`PUBLIC_META_PIXEL_ID`** with the same value

### What fires

| Event | When |
| --- | --- |
| `PageView` | Every public page (via `Analytics.astro`) |
| `Lead` | Successful `/contact` form submit (`content_name: contact-enquiry`) |
| `Lead` | Successful `/ibiza` form submit (`content_name: ibiza-reception`) |

### Verify

1. Install the [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Visit `https://thememorycrew.com/` — expect **PageView**
3. Submit a test enquiry (or use Events Manager → Test events)

### Privacy note

Meta Pixel uses cookies and advertising identifiers. Under UK GDPR/PECR this is marketing tracking — if you grow beyond soft launch, plan a consent banner or documented legitimate-interest assessment. Plausible/Cloudflare alone do **not** require a banner for basic stats.

---

## Why not Google Analytics?

GA4 typically needs a **cookie consent banner** under UK GDPR/PECR. Plausible/Cloudflare avoid that for basic traffic stats. Meta Pixel is intentional for ads and is separate.

---

## Deploy env (GitHub Actions)

In `.github/workflows/deploy.yml`:

```yaml
env:
  PUBLIC_FORMSPREE_ID: ${{ secrets.PUBLIC_FORMSPREE_ID }}
  PUBLIC_PLAUSIBLE_DOMAIN: ${{ secrets.PUBLIC_PLAUSIBLE_DOMAIN }}
  PUBLIC_CF_BEACON_TOKEN: ${{ secrets.PUBLIC_CF_BEACON_TOKEN }}
  PUBLIC_META_PIXEL_ID: ${{ secrets.PUBLIC_META_PIXEL_ID }}
```

Add matching secrets under repo **Settings → Secrets and variables → Actions**.

---

## Local testing

With only Formspree in `.env`, analytics scripts **do not** load.  
Add `PUBLIC_META_PIXEL_ID=...` to `.env` and run `astro dev` to test with Pixel Helper (test traffic will appear in Events Manager).
