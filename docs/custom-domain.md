# Custom domain — thememorycrew.com

The site is configured for a **custom domain at the root** (`base: '/'`), not the GitHub project path `/the-memory-crew/`.

## Code (done)

| Setting | Value |
|---|---|
| `astro.config.mjs` `site` | `https://thememorycrew.com` |
| `astro.config.mjs` `base` | `/` |
| `trailingSlash` | `always` |
| `public/CNAME` | `thememorycrew.com` |

## DNS (required on your domain registrar)

GitHub Pages custom domain needs these records (replace if GitHub docs update):

**A records** for `@` / apex:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**Optional www:**

| Type | Name | Value |
|---|---|---|
| CNAME | `www` | `dre-pilipczuk.github.io` |

Then in GitHub → repo → Settings → Pages:

- Custom domain: `thememorycrew.com`
- Enable **Enforce HTTPS** once DNS has propagated

## Why occasions looked like 404s

With a custom domain configured on GitHub, the live site is expected at:

- `https://thememorycrew.com/occasions/weddings/`

Links were built as:

- `/the-memory-crew/occasions/weddings` (project-page base)

That path does not exist on the custom domain root → **404**.

Also: if DNS still points at a parking host (e.g. IONOS) instead of GitHub, GitHub will redirect `*.github.io` to the domain and you’ll see the wrong site entirely until DNS is updated.
