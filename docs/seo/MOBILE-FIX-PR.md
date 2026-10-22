## Problem and fix

After repeated SEO builds, candle and reed collection templates could inherit a landing page without catalog.js. The card click handler cancelled native navigation and then failed when looking up missing catalogue data. Product URLs themselves remained valid, but taps did not open them.

Use the existing HTML product href directly without a click interceptor. Restore catalogue data before app.js on catalogue grids for legacy query redirects, including repeat builds. Keep desktop hover image swapping and add a compact, accessible second-image toggle for touch devices, separate from the product link. Product identities, URLs and image pairings remain unchanged.

## Validation

Run npm run build, npm run check, and npm run test:browser. The browser regression now taps the first product on every catalogue grid, verifies touch image switching, desktop hover and navigation even when optional catalogue data fails to load. Tests only inspect/intercept enquiry drafts; no messages are sent.

Review before merge. A merge into main automatically deploys the production site.
