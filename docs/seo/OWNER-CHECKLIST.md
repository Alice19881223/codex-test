# Information and account checks still needed

## Before merge

- Confirm the preferred public host is `https://www.lanarve.com`. The SEO config uses this HTTPS www origin. From an unrestricted network check certificate validity, Pages “Enforce HTTPS”, apex/HTTP redirects, page 200 responses and unknown-path 404. No DNS or production settings were changed.
- Review the new English category/service copy and distinct product metadata. Fragrance pairings remain suggestions from the existing library, not verified formulas.
- Current records have no supplied product-specific capacities, dimensions, materials or verified certificates. Provide approved specifications/document files before adding them. No prices, inventory, reviews, ratings, numerical MOQ or manufacturing-capacity claims are added. Existing user-supplied sampling terms remain as previously published, not new SEO claims.
- Confirm which private-label changes are available for each design and which export documents can actually be supplied by product and destination. Blanket qualification claims have been replaced with a request to confirm applicable documentation.
- Original product URLs, catalogue identity keys, sorting/pairing data and contacts remain unchanged. Review `url-map.csv` for retained aliases and existing HTML redirects; GitHub Pages cannot implement arbitrary per-path HTTP 301 rules from `_redirects` or `.htaccess`. A server/CDN would be needed for real route-level redirects.

## After an explicitly authorized production release

- Verify a Domain property in Google Search Console and submit `https://www.lanarve.com/sitemap.xml`.
- Inspect home, private-label, one category, one paginated series page and several SKUs. Compare submitted vs Google-selected canonical, raw/rendered HTML, crawl response and indexing eligibility.
- Check Page indexing, Sitemaps, Crawl stats, Manual actions and Security issues. Source-code audits cannot establish their status.
- Use actual GSC queries/impressions/CTR and, if available, a keyword tool to refine `keyword-map.csv`. Current phrases are hypotheses with no invented volume or difficulty data.
- Measure field Core Web Vitals through GSC/CrUX after enough traffic and time. The included local mobile lab runs do not predict rankings or certify real-user CWV.
- Validate representative Organization/Product/BreadcrumbList JSON-LD with the relevant validators. No Offer or rating is added; Product markup without supported commercial data does not promise shopping rich results.
