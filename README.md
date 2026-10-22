# Lanarve static website

English B2B home fragrance catalogue for wholesale, private label and OEM/ODM enquiries.

## Build and checks

Requires Python 3 and Node 24 for browser tests. Product/page generation and staging use
Python's standard library; no application server or client-side rendering framework is needed.

```sh
npm ci
npm run build         # rebuild catalogues, product pages, navigation and SEO; stage _site/
npm run check         # local links, sitemap, schema, metadata, static scent content
npx playwright install chromium
npm run test:browser  # serves _site/ locally; desktop/mobile/no-JS and enquiry smoke checks
```

With an existing system Chromium, use `CHROMIUM_PATH=/usr/bin/chromium npm run test:browser`.
Browser tests intercept the WhatsApp draft navigation; they do not send messages.
For a simple local review: `python3 -m http.server 8000 --directory _site`.

## Source of truth

- `assets/*-products.json`: six product catalogues, supplied image identities and assignments.
- `assets/product-identities.json`, `scripts/product_records.py`: stable public SKUs and URLs.
- `assets/fragrances.json`: 39 suggested scent profiles; final supply/formulation is confirmed.
- `assets/product-specifications.json`, `assets/compliance-documents.json`: only confirmed facts.
- `assets/seo-config.json`: preferred production origin and already-supplied company contacts.
- `scripts/build-seo.py`: metadata, buyer content, static default scent, JSON-LD, sitemap/robots,
  restored fragrance library, private-label service page and URL/keyword review tables.
- `app.js`, `product.js`, `styles.css`: source assets. The versioning script emits immutable hashes.

Do not edit checked-in hashed files or generated product HTML as the only change. Run the build.

### Image authoring

Raw product images and JSON identity paths stay unchanged. The optional authoring command
`python3 scripts/optimize-images.py` uses Pillow (`requirements-images.txt`) to create checked-in
WebP variants and `assets/image-manifest.json`. No Pillow installation is needed in deployment.
Run it after importing new photographs and before rebuilding pages. The SEO pass also reserves
image dimensions, writes responsive sizes/srcset, prioritizes the first hero/main product image,
and lazy-loads secondary/hidden imagery. The gallery updates both src and srcset when switching.

## Deployment contract

Only `.github/workflows/deploy-pages.yml` on **main** can deploy to GitHub Pages. The review
workflow runs on pull requests and does not deploy. Work on a feature branch and open a PR;
merging or publishing requires the owner's separate authorization.

Actual HTTPS enforcement, custom domain and www/apex redirects belong to GitHub Pages/DNS.
Per-path `.htaccess`/`_redirects` files do not work on GitHub Pages. Existing HTML fallback
redirects remain, with a reviewable map; they are not advertised as HTTP 301 responses.

See [the SEO audit](docs/seo/AUDIT.md), [implementation/validation report](docs/seo/DELIVERY.md),
[keyword hypotheses](docs/seo/keyword-map.csv), [URL map](docs/seo/url-map.csv) and
[owner checklist](docs/seo/OWNER-CHECKLIST.md). Live network and Search Console limitations
are explicitly recorded. Source schema does not guarantee search rich results or rankings.
