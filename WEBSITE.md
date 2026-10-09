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
