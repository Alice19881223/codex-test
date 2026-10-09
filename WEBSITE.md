# Lanarve product showcase

Run from `/workspace/codex-test`:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open the site through your development environment's port forwarding or serve this directory with any static website host. No build or package installation is required.

The site includes Who We Are, scented candles, reed diffusers, crystal diffusers, gift sets, and 30 fragrance directions with family/search filters and linked product details. Direct fragrance links use `#fragrance-1` through `#fragrance-30`.

Brand name: Lanarve. The illustration in `assets/still-life.svg` is original placeholder artwork, not brochure photography. Replace the hero and product images with the actual brochure assets before publication. Product pairings, gift contents and brand story are concept copy for review, not confirmed manufacturing claims. Add the real contact details and product specifications before commercial use. Google Fonts is optional; local system serif and sans-serif fonts work if the font service is unavailable.

The requested reference website could not be accessed from this environment (proxy returned 403), so the design is an independent interpretation of the brief.

## Brochure update

The crystal collection now includes 13 supplied product images, optimized as WebP, with English display names derived from the source filenames (subject to brand review). The hero, gift section and crystal details use these images. Candle and reed diffuser archives could not be downloaded because each exceeded the 32 MiB transfer limit; those categories retain illustrated placeholders.

Company name, address and two telephone contacts are supplied by the user. WhatsApp QR images are newly generated from `https://wa.me/8615968902361` and `https://wa.me/8618368239527`; they are not copies of the inline QR attachments. Confirm that the numbers are registered on WhatsApp. Email and Facebook/LinkedIn destinations have not been supplied and are omitted rather than invented. The uploaded legacy Word document yielded no readable body content.

## Reed diffuser image update

Added all four images from the downloadable 无火香薰3.zip, optimized as WebP, including the colour collection, seven-colour gift set and Rain Forest bottle/packaging. The reed category and product dialog now use actual supplied artwork. The other five archives in this batch exceed the 32 MiB download limit and have not been processed. English display names are translated from filenames and are subject to review.

## Bulk photo update

Processed 20 downloadable ZIP uploads, deduplicated exact source image bytes, and added 89 candle photos and 41 new reed diffuser photos. The reed gallery now contains 45 photos including the four earlier uploads. All photos are available through accessible Load More buttons, 12 at a time, with lazy loading and WebP compression. Display names are collection identifiers for review, not confirmed SKU names. Source filenames and SHA-256 hashes are recorded in `assets/photo-source-manifest.json`. Both uploaded copies of 无火香薰1.zip exceed the download limit and were not processed.
