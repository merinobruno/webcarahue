# Carahue website

Buildless Spanish institutional website. Serve `dist` with any static HTTP server. No dependencies, backend, cookies, visitor storage, or analytics are required.

The specialty landing uses imagery from Carahue's published Instagram content. Source posts and image handling are recorded in [asset-sources.md](asset-sources.md).

## Vercel deployment

Production URL: https://www.ortopediacarahue.com. The apex domain redirects to `www` with HTTP 308. The `webcarahue` Vercel project is connected to `merinobruno/webcarahue`; pushes to `main` automatically deploy updates to the production domain. Use the repository root as Root Directory; `vercel.json` serves `dist` without installation or a build step.

cPanel manages DNS for the website. Its existing static copy is retained only as a fallback; routine updates do not require manual uploads. Website DNS: apex A `216.198.79.1`, `www` CNAME `6239a033b76fdbb7.vercel-dns-017.com`. HTTPS is active for both domain names.

Keep mail independent of the website: `mail` A `45.227.160.40`, MX `mail.ortopediacarahue.com` with priority `0`, and SPF `v=spf1 ip4:45.227.160.40 +mx ~all`. Preserve the existing DKIM records.

## Scope and behavior

- Responsive home page, company introduction, six specialty views with shareable hash URLs, official social links, FAQ, phone links, and area-specific WhatsApp routing.
- Contact controls open the existing official channels. The site does not claim to submit or store messages.
- Product categories shown in Sports are previously promoted categories, with explicit current-availability wording. This is not a stock or pricing catalogue.
- Sports includes six product lines with accent-insensitive name search, training/clothing filters, result counts, empty-state recovery, and official-channel availability links. Search and filters reset when navigating between routes.
- The whole `dist` directory plus this README is the independent rollback boundary. No other applications are modified.

## Sources

Verified November 5, 2026 by the coordinating agent:

- https://sensimat.com.ar/ — structural inspiration: specialty entry points, area-specific information, institutional content, contact routing. No Sensimat business claims, photographs, brands, or proprietary text are reused.
- https://www.instagram.com/carahuesrl/ — business areas, opening hours, phone numbers.
- https://linktr.ee/carahue — distributor description, 35+ years of experience, and official WhatsApp links (customer service, rentals, clients, hearing aids, surgery).
- Existing Carahue application design references — green `#006955`, dark green `#005443`, orange `#e2720e`, yellow `#f8b332`, light background `#f7f8f5`, text `#263e35`, muted text `#586d62`, borders `#dce5de`.
- Logo image from the existing Fichadas brand folder. Public marketing images from the existing Autorizaciones brand reference collection: references 13, 15, 18, 19, and 20. Photos remain original assets, framed through CSS; photography does not imply these are current staff or facilities. Brand artwork can include historic campaigns; the site states that availability and conditions must be confirmed.

The original website domain was not usable during research and is not linked. No unverified physical address, email, founding date, certification, exclusive partnership, or medical outcome is asserted.

## Verification

Run `node --check dist/app.js` and `node verify.mjs`. Browser QA should cover six specialty routes, browser back, mobile navigation, FAQ keyboard interaction, WhatsApp selection, catalog search/filter/empty-state/reset, image loading, and horizontal overflow. External messages should not be sent during QA.

## Instagram snapshot — November 8, 2026

News uses the three latest non-pinned posts verified on the live profile, including the collaborative Amplitone post. This is a manually curated snapshot; automatic Instagram integration is deferred.

- November 5: https://www.instagram.com/carahuesrl/p/DfXyExzD-nj/ — original 1440 × 1800 WebP.
- November 5: https://www.instagram.com/amplitone.centros.auditivos/reel/DfXRW51SjbP/ — original 361 × 640 reel cover; Carahue is a visible collaborator.
- October 31: https://www.instagram.com/carahuesrl/reel/DfKqwQFR5NO/ — original 361 × 640 reel cover.

Downloaded assets are copied unchanged, with native proportions and no cover upscaling. The favicon is the user's supplied 208 × 211 PNG, copied byte-for-byte under a new filename to avoid the previous icon cache.
