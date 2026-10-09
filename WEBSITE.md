# Lanarve home fragrance website

Serve `/workspace/codex-test` using any static website host. For local development:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

GitHub Pages uses the `gh-pages` branch and root directory. Pushing updates to that branch publishes them only if Pages is enabled in repository settings. Public deployment cannot currently be checked from this environment.

## Pages

- `index.html`: Who We Are, Mission, Vision and OEM/ODM capabilities. Company copy is supplied by the user. Layout follows the supplied Word document's banner, image/text section, mission/vision cards and closing call to action; reference screenshots are not used as Lanarve assets.
- `products.html`: category tabs and numbered pagination, 12 product images per page. Candles: 89 images/8 pages. Reed diffusers: 69 images/6 pages. Crystal diffusers: 13 images/2 pages. The final page shows the remaining images. Category/page are saved in query parameters, e.g. `products.html?category=reed&page=6`; reload and browser back/forward restore the selection.
- `gifts.html`: a curated selection from supplied gift product images, also paginated at 12 per page.
- `fragrance.html`: 30 concept fragrance directions, family/search filtering and linked product detail previews. Direct fragrance links use `fragrance.html#fragrance-1` through `#fragrance-30`. Suggested fragrance pairings are subject to catalogue confirmation.
- `contact.html`: company contact introduction, phone links, WhatsApp QR codes, Facebook and LinkedIn. Shared contacts also appear in each page footer.

`catalog.js` holds category/fragrance data and image catalogues. `app.js` initializes the features present on each page. `styles.css` contains shared responsive styles. No build step or package installation is needed. Optional Google Fonts have local serif/sans-serif fallbacks.

## Source assets and company details

Product images are supplied by the user and optimized as WebP. Exact duplicates were removed when importing. `assets/photo-source-manifest.json` records source filenames and hashes for the bulk candle/reed imports; the initial crystal and reed imports have separate product manifests. English collection names are translations or display identifiers for review, not confirmed SKU names. Image counts refer to photographs, which may include multiple views of a product.

Company name in the latest supplied copy: Lanarve (LanXin Ningbo Technology Development Co., Ltd.). Address: Zhenhai, Ningbo, Zhejiang Province, China. Telephone: +86 159 6890 2361 and +86 183 6823 9527. WhatsApp QR codes were generated for `https://wa.me/8615968902361` and `https://wa.me/8618368239527`; confirm the numbers are registered. Facebook and LinkedIn destinations are supplied by the user. Email and Instagram destinations are not yet supplied and are omitted.

Validation covers independent page loading, complete company copy, every product through pagination, final-page counts, URL persistence, mobile navigation/layout, gift details and fragrance filters/pairings. Older single-page/load-more test scripts no longer match the current design.

## Lifestyle banner and visual identity

The homepage hero now uses `assets/lanarve-lifestyle-hero.png`, an AI-generated lifestyle composition based on three supplied Lanarve product references. It depicts candle, reed diffuser and crystal diffuser products in a warm neutral interior. This is a styled brand visual, not a documentary product photograph. The original generated image remains under `/workspace/generated_images`.

`assets/lanarve-logo.svg` is the new scalable wordmark with an original L/V letter monogram. `assets/lanarve-mark.svg` provides the matching standalone mark and favicon. Colours match the website's warm brown/cream palette. Header branding is applied to every page. Banner/branding verified at 390, 768, 1024 and 1440 pixel viewport widths.
