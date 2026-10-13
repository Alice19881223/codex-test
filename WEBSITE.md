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

## Homepage lifestyle carousel

All homepage product feature images are lifestyle compositions. Three category-specific generated scenes (`lanarve-candle-scene.png`, `lanarve-reed-scene.png`, `lanarve-crystal-scene.png`) reference the user's products and retain Lanarve labels. The original combined lifestyle scene is used for Who We Are; Mission/Vision use candle/crystal scenes. Generated originals remain in `/workspace/generated_images`. These images are brand staging visuals, not catalogue specification photos.

The banner rotates every 6.5 seconds, supports category dots, previous/next and pause controls, and links to the matching category. Rotation pauses on hover, keyboard focus and background tabs, and defaults to paused for reduced-motion users. Without JavaScript the first scene remains visible. Homepage headings use simple sans-serif typography. Four original SVG line illustrations identify capabilities. Closing slogan: “Beautiful scents. Meaningful moments.”

## Rich editorial art direction and hover interaction

Six distinct generated compositions use a coordinated forest/olive, ivory, walnut and warm brass palette. The three editorial banners show varied vessels and tiered collections. Who We Are uses a lived-in interior vignette; Mission uses a fragrance worktable; Vision uses an overhead gift ensemble. All six images are staged brand artwork referencing supplied products rather than catalogue evidence of new SKUs.

Site typography is unified using Manrope with Arial fallback, retaining the logo's vector brand lettering. Desktop pointer movement translates the banner image slightly (maximum 11px horizontal / 7px vertical). Entering the banner speeds rotation from 6.5 to 3.5 seconds; pause controls remain available. Hover/focus on Who We Are crossfades the heading to “Thoughtful fragrance. Crafted for you.” Reduced-motion preferences disable parallax and automatic rotation. Verified with all six images, desktop/mobile/tablet layouts, carousel pause and hover behaviour, title transitions, unified fonts and retained product listings.

## Latest banner direction: warm palette and automatic motion

The three banner scenes now use `lanarve-candle-warm.png`, `lanarve-reed-warm.png`, and `lanarve-crystal-warm.png`, with ivory, beige, travertine, amber and walnut styling to coordinate with the website. They replace the green editorial banner backgrounds. The distinct lower-page compositions remain.

Latest behaviour supersedes the earlier pointer-driven description: banners automatically crossfade every 6.5 seconds and gently zoom/drift using CSS. Hover does not stop or accelerate rotation, and pointer movement is no longer required. The pause control stops both rotation and image drift. Keyboard focus/background-tab rotation pausing and reduced-motion defaults remain. Verified autoplay without pointer interaction, continued playback on hover, pause, reduced motion and responsive layout.

## Paired candle collection

The five 打包 archives add 34 visually reviewed pairs (68 optimized images) to the beginning of the candle catalogue. Each pair is one product: standalone image first, packaging image second. Cards crossfade on hover and support a touch/keyboard toggle; the product dialog displays both photographs in that order. The candle catalogue now contains 123 products across 11 pages, with 12 per page except the final page.

Seven supplied Halloween packaging views have no matching standalone image and are withheld at the user's request. One exact duplicate (source indexes 71/72) is recorded and excluded. Source names, hashes, pairing decisions and deferred indexes are retained in assets/paired-candle-source-manifest.json. Import recipe: scripts/import-paired-candles.py (requires the extracted source manifest).

## Paired gift collection

The four 包装 archives add 16 reviewed gift products with 32 photographs. assets/gift-products.json and the giftProducts catalogue preserve standalone-first, packaging-second ordering. Cards reuse the hover and touch preview; detail galleries use neutral product captions suitable for mixed candle/diffuser sets. The gift catalogue contains only these 16 new paired products across two static pages. Legacy gift imagery is removed from the catalogue and hero; old pages 3/4 redirect to the final current page. The two supplied packaging-only views (Christmas duo and seven-day fragrance set) are deferred from this new import until corresponding standalone photos are supplied. Pairing and source hashes are retained in assets/paired-gift-source-manifest.json. Import recipe: scripts/import-paired-gifts.py.

Gift collection pages use a full-width editorial banner with the existing Lanarve gifting lifestyle scene, forest gradient, cream typography and gentle motion. Catalogue rows still contain only the 16 newly uploaded paired gift products. Reduced-motion preferences disable the decorative movement. Mobile pagination remains below the products.

## Christmas theme

The Christmas navigation button links to christmas.html and christmas-2.html. The accessible October Christmas archives 打包3/4/5 add 13 visually reviewed pairs (26 optimized photographs), grouped as standalone first and packaging second. Cards use the existing hover and touch preview, and details display both views vertically. The second page contains the thirteenth product. Christmas data is separate from the candle and gift catalogues. Source pairing and hashes are in assets/paired-christmas-source-manifest.json; import recipe: scripts/import-paired-christmas.py. The originally oversized 打包1/2 archives were replaced by readable smaller uploads and have now been imported.

The supplemental Christmas archives 打包1/2/6/7 add 22 paired products (44 photos). The Christmas catalogue now contains 35 paired products (70 photos) across three pages: 12/12/11. A three-colour tree ornament set is deferred because the supplied packaging shot only shows a closed box; an extra ivory packaging variant is retained in the source manifest rather than listed as another product. Additional pairing and source hashes are recorded in assets/paired-christmas-additional-source-manifest.json. Reusable recipe: scripts/import-additional-christmas.py.

## Tablets and sachets

The Tablets & Sachets theme button links to sachets.html. The supplied two archives add ten reviewed pairs (20 optimized photographs): botanical/floral wax tablets, fabric fragrance sachets and a rose fragrance tablet. Each product defaults to standalone view, crossfades to packaging on hover and supports a touch toggle; detail galleries retain standalone-above-packaging order. The panda gift-set photo is deferred until its standalone photo is supplied. Catalogue data: assets/sachets-products.json; reviewed source pairing: assets/paired-sachets-source-manifest.json; recipe: scripts/import-paired-sachets.py. Navigation collapses on narrower screens to accommodate the expanded themes.

## Current Christmas entry and cache-safe assets

The current Christmas navigation and pagination use christmas-collection.html, christmas-collection-2.html and christmas-collection-3.html (35 paired products; 12/12/11). The introductory label explicitly states 35 designs to distinguish it from the legacy 13-product page cached by the user's browser or hosting layer. HTML now references immutable app/catalog/style filenames rather than relying on query-string versions. After any catalogue, script or CSS change, run `python3 scripts/version-site-assets.py` before publishing; otherwise an older immutable script could remain linked. These local and remote branch checks do not establish that a GitHub Pages build has completed.
