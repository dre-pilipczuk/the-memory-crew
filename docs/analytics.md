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

| Event | When | Parameters |
| --- | --- | --- |
| `PageView` | Every public page (via `Analytics.astro`) | — |
| `Lead` | Successful `/contact` form submit | `content_name: contact-enquiry` |
| `Lead` | Successful `/ibiza` form submit | `content_name: ibiza-reception` |

Both forms fire the **same standard event** (`Lead`). The `content_name` parameter is how you tell them apart — you do **not** need a separate custom event named `ibiza-reception` in Ads Manager.

### Ads Manager / Events Manager setup

**Minimum (enough to start ads):**

1. Confirm the Pixel is receiving **PageView** and **Lead** in [Events Manager](https://business.facebook.com/events_manager2) (Test events or Overview after a real submit).
2. When creating a campaign, optimise for the standard **Lead** conversion (or “Conversions” → Lead). Meta will optimise toward all Leads until you narrow them.

**Optional — optimise only for Ibiza enquiries:**

1. Events Manager → **Custom conversions** → Create
2. Event source: your Pixel
3. Rule: **Event** = `Lead` **and** **content_name** equals / contains `ibiza-reception`
4. Name it e.g. “Ibiza reception lead”
5. In the ad set, choose that custom conversion as the optimisation event (once it has enough volume)

**Optional — reporting only (no separate optimisation):**

- In Ads Manager reporting, add a breakdown or use Events Manager event details to inspect `content_name` on Lead events.
- Or create the same custom conversion purely for charts, while still optimising on all Leads early on (safer when volume is low).

Until you have a steady stream of Ibiza form submits, optimising on **all Leads** is usually fine; switch to the Ibiza-only custom conversion once Meta has enough conversion data.

### Verify

**Confirm the code is live (already deployed):** view source on `https://thememorycrew.com/` and search for your Pixel ID and `fbevents.js`. You should also see `fbq('track', 'PageView')`.

**Best check — Meta Pixel Helper (Chrome):**

1. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Use **Chrome**, disable ad blockers / Brave shields / Privacy Badger for the site
3. Open `https://thememorycrew.com/` → helper should show your Pixel ID (from Events Manager) and **PageView**
4. Submit `/ibiza` form → **Lead** with `content_name: ibiza-reception`

**Events Manager → Test events:**

1. Keep the Test events tab open
2. Prefer **Open website** from that page (don’t only type the URL in a random tab)
3. Use the same Chrome profile, ad blockers off, third-party cookies allowed
4. **PageView** should appear on load; **Lead** only after a successful form submit (not on button click alone)

If Helper / Network shows `facebook.com/tr` requests but Test events is empty, the pixel is still working — Test events is flaky. Check **Overview** / **Diagnostics** after 10–30 minutes.

**Common reasons Test events shows nothing:**

- Ad blocker or tracking protection blocking `connect.facebook.net` / `facebook.com/tr`
- Firefox / Safari strict privacy (use Chrome)
- Wrong Business Manager account / wrong dataset selected in Events Manager
- Testing Lead without a successful Formspree response (form must return OK)

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
