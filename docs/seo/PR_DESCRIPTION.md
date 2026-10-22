## Problem and result

Lanarve's static B2B catalogue had a shared description across 364 pages, incomplete headings/canonicals and no sitemap or structured entities. Product URLs already existed, but default scent details were mostly filled by JavaScript. Hidden menu and carousel PNGs also caused large initial transfers.

This change keeps product URLs and catalogue identities stable, generates buyer-focused metadata and static default scent content, adds a private-label/OEM/ODM page and full fragrance library, and provides a canonical sitemap, robots and Pages 404. Product/Organization/BreadcrumbList markup includes supported facts only: no invented offers, stock, ratings, reviews, specifications or certifications. Responsive WebP derivatives and a local licensed Manrope font preserve the brand presentation; enquiry links now use the canonical host.

## Review / validation

- Read source changes in `scripts/build-seo.py`, the generation/staging hooks and `docs/seo/DELIVERY.md`; root HTML and optimized images are generated, checked-in output.
- `npm run build`, `npm run check`, desktop/mobile/no-JS browser tests and repeat-build hash comparison pass.
- 365 final sitemap URLs; 288 existing product pages; 26 browser page/viewport checks plus fragrance, gallery and enquiry regressions. WhatsApp drafts are intercepted in tests and no messages are sent.
- Local cold-cache mobile lab resource bytes fell substantially on home, category and product examples. Exact method and before/after JSON are in `docs/seo/`; these are not live CWV or ranking claims.
- All keyword phrases in `keyword-map.csv` are hypotheses without invented volume/difficulty. Retained aliases and existing HTML fallback redirects are documented in `url-map.csv`; no arbitrary server 301 support is claimed for GitHub Pages.

## Limits / owner review

The preferred origin is `https://www.lanarve.com`; confirm TLS, Pages HTTPS enforcement, www/apex behavior and live 200/404 responses before merge. The environment proxy blocks direct live probes; Search Console data is not available. Product-specific specification/certification gaps are listed in `OWNER-CHECKLIST.md`.

**Review only: do not merge or deploy without the owner's explicit authorization.** The existing production workflow remains main-only. No DNS or production settings have been changed.
