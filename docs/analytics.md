# Analytics

Privacy-friendly page analytics with **no cookies** and **no cookie banner**.

Component: `src/components/seo/Analytics.astro` (loaded from `Layout`, skipped on `noindex` pages like `/design-system`).

---

## Option A — Plausible (recommended)

Paid, simple, GDPR-friendly, UK-friendly.

1. Create a site at [plausible.io](https://plausible.io) for **`thememorycrew.com`**
2. Locally, add to `.env`:

```sh
PUBLIC_PLAUSIBLE_DOMAIN=thememorycrew.com
```

3. For production, add the same as a **GitHub Actions secret** (or repository variable) named `PUBLIC_PLAUSIBLE_DOMAIN`, and ensure the deploy workflow passes it (see below).

Dashboard: traffic, top pages, referrers, devices — no personal data stored by default.

---

## Option B — Cloudflare Web Analytics (free)

1. [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) → add site (can work without proxying DNS)
2. Copy the **beacon token**
3. Set:

```sh
PUBLIC_CF_BEACON_TOKEN=your-token-here
```

You can use **both** Plausible and Cloudflare if you set both vars (usually pick one).

---

## Why not Google Analytics?

GA4 typically needs a **cookie consent banner** under UK GDPR/PECR. Plausible/Cloudflare avoid that for basic traffic stats.

---

## Deploy env (GitHub Actions)

In `.github/workflows/deploy.yml`, the build step should include:

```yaml
env:
  PUBLIC_FORMSPREE_ID: ${{ secrets.PUBLIC_FORMSPREE_ID }}
  PUBLIC_PLAUSIBLE_DOMAIN: ${{ secrets.PUBLIC_PLAUSIBLE_DOMAIN }}
  # PUBLIC_CF_BEACON_TOKEN: ${{ secrets.PUBLIC_CF_BEACON_TOKEN }}
```

Add matching secrets under repo **Settings → Secrets and variables → Actions**.

Until Actions is healthy again, analytics will appear on the next successful deploy after secrets are set.

---

## Local testing

With only Formspree in `.env`, analytics scripts **do not** load (no domain/token).  
Add `PUBLIC_PLAUSIBLE_DOMAIN=localhost` only if you want to test the script tag locally (Plausible may ignore localhost traffic depending on plan/settings).
