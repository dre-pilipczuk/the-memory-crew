# Custom domain — thememorycrew.com

## Status

| Layer | Status |
|---|---|
| Site code (`base: '/'`, `CNAME`) | ✅ Done |
| GitHub Pages custom domain | ✅ Verified (you did this) |
| Deploy workflow | ✅ Publishes site |
| **DNS at IONOS** | ❌ Still points at IONOS parking (`217.160.0.242`) |

Until DNS points at GitHub, the domain will keep showing the IONOS “not set up” page even when Actions says the site is live.

---

## Fix DNS in IONOS (1&1)

1. Log in to [IONOS](https://www.ionos.co.uk/) (or ionos.com).
2. Open **Domains & SSL** → **thememorycrew.com** → **DNS**.
3. **Delete** existing apex records that send traffic to IONOS web hosting / parking, especially:
   - A `@` → `217.160.0.242` (or any other non-GitHub A)
   - AAAA `@` → `2001:8d8:…` (IONOS IPv6)
   - Any “webspace” / “parking” / “redirect to IONOS” records
4. **Add** these GitHub Pages records for the **root** domain:

### Apex (`@` / thememorycrew.com)

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| **A** | `@` | `185.199.108.153` | 3600 (or default) |
| **A** | `@` | `185.199.109.153` | 3600 |
| **A** | `@` | `185.199.110.153` | 3600 |
| **A** | `@` | `185.199.111.153` | 3600 |
| **AAAA** | `@` | `2606:50c0:8000::153` | 3600 |
| **AAAA** | `@` | `2606:50c0:8001::153` | 3600 |
| **AAAA** | `@` | `2606:50c0:8002::153` | 3600 |
| **AAAA** | `@` | `2606:50c0:8003::153` | 3600 |

### www (recommended)

| Type | Host / Name | Value |
|---|---|---|
| **CNAME** | `www` | `dre-pilipczuk.github.io` |

In IONOS, host is often `@` for root and `www` for the subdomain — not the full domain name.

5. Save. Wait 5 minutes to a few hours (sometimes up to 24–48h).
6. In GitHub → **Settings → Pages**:
   - Custom domain still `thememorycrew.com`
   - When DNS is correct, tick **Enforce HTTPS** (certificate can take a little while)

---

## How to check it worked

On your Mac:

```sh
dig thememorycrew.com +short
# should list the four 185.199.x.x addresses (not 217.160.0.242)

dig www.thememorycrew.com +short
# should show dre-pilipczuk.github.io (and then GitHub IPs)
```

Or open: https://dnschecker.org/#A/thememorycrew.com

When DNS is right, `https://thememorycrew.com/` should show The Memory Crew site, not IONOS.

---

## Code config (already in the repo)

| Setting | Value |
|---|---|
| `astro.config.mjs` `site` | `https://thememorycrew.com` |
| `astro.config.mjs` `base` | `/` |
| `trailingSlash` | `always` |
| `public/CNAME` | `thememorycrew.com` |

No further deploy is required just for DNS — once records propagate, the **already published** Pages site will answer on the domain.

---

## “404 Not Found nginx” after DNS is correct

DNS can be perfect and GitHub can still show a bare **nginx 404**. That usually means Pages is not serving the **Actions** build.

### Fix in GitHub (important)

1. Open the repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**  
   - **Not** “Deploy from a branch” (if that is set to `main` + `/`, GitHub looks for `index.html` in the repo root, finds none → nginx 404)
3. Custom domain: `thememorycrew.com` (verified)
4. **Actions** → **Deploy to GitHub Pages** → **Re-run** the latest successful workflow (or push to `main`)
5. Wait a few minutes, then open **http://thememorycrew.com/** (use http until Enforce HTTPS is available)
6. When the site loads, enable **Enforce HTTPS**

### Confirm DNS (should already be done)

```sh
dig thememorycrew.com +short @8.8.8.8
# 185.199.108.153 etc — not 217.160.0.242
```
