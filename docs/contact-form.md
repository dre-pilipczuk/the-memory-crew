# Contact form — Phase 8

**Status:** Implemented  
**Component:** `src/components/contact/ContactForm.astro`  
**Page:** `/contact`  
**Provider:** [Formspree](https://formspree.io) (no backend)

---

## Fields

| Field | Required | Notes |
|---|---|---|
| Name | yes | |
| Email | yes | |
| Phone | yes | |
| Event date | yes | `type="date"` |
| Postcode / area | yes | Free text |
| Equipment | no | Checkboxes from hire categories |
| Message | yes | Free text |

Honeypot: `_gotcha` (Formspree spam trap).

---

## Setup

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the form id (from `https://formspree.io/f/YOUR_ID`).
3. Locally:

```sh
cp .env.example .env
# edit .env
PUBLIC_FORMSPREE_ID=YOUR_ID
```

4. Restart `npm run dev`.

### GitHub Pages deploy

Add the same variable as a repository secret / Actions env for the build step so production embeds the id:

```yaml
# in .github/workflows/deploy.yml under the withastro/action step, e.g.
env:
  PUBLIC_FORMSPREE_ID: ${{ secrets.PUBLIC_FORMSPREE_ID }}
```

Create a repository secret named `PUBLIC_FORMSPREE_ID`.

Without the id, the form still renders but is disabled with a setup banner (site stays deployable).

---

## Behaviour

- Progressive enhancement: `fetch` + JSON for in-page success/error; native `POST` action as fallback target.
- Equipment checkboxes are joined into one string for the email body.
- Optional preselect: `/contact?equipment=garden-games` (category slug).

---

## Optional next steps

- Add `site.email` / `site.phone` when public details exist.
- Formspree redirect or autoresponder templates in the Formspree dashboard.
