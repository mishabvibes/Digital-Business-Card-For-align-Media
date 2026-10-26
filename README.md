# Align Media digital card

Mobile-first Next.js / TypeScript site with a custom responsive design. Static export: no paid API, database or server required.

## Develop

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The optional `/preview-mobile.html` page shows a phone-sized preview with 360 / 390 / 430px controls.

## Production build

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS site URL, then:

```sh
npm run build
```

Deploy the generated `out/` directory to a static host. `npm run typecheck` checks TypeScript. Do not use `next start` for static export.

### Cloudflare Pages

Build command: `npm run build`. Output directory: `out`. Set `NEXT_PUBLIC_SITE_URL` to the final `https://…pages.dev` or custom domain. No API secrets required. Review hosting terms and quotas before launch.

### Vercel

Import this directory as a Next.js project. The build is compatible with static hosting on Vercel. Set `NEXT_PUBLIC_SITE_URL`; the production Vercel hostname is also detected automatically. Vercel Hobby is restricted to personal / non-commercial use, so this business requires an appropriate commercial plan.

## Implemented

- Home, Work, Academy and Connect with hash deep links and browser history
- Mobile bottom navigation and desktop profile sidebar
- Portfolio category filters and detail dialogs
- Service / course-specific WhatsApp drafts, English and Malayalam
- QR generation/download, native share and clipboard fallback
- Downloadable vCard, click-to-call, email, Instagram, LinkedIn and Google listing
- Accessible modal focus handling, inert background, Escape close, reduced motion
- Web manifest, home-screen icons and PNG social preview

No enquiries are stored or sent automatically. Visitors review and send their draft in WhatsApp. No analytics or external tracking are configured. Fonts load from Google Fonts with local system fallbacks. Add to Home Screen depends on browser support; offline mode and push notifications are not implemented.

## Content to replace before public launch

- The supplied blue and white Align Media logos are used throughout the card and app icons. The four clearly labelled portfolio concepts remain illustrative, not actual client work.
- Supply real portfolio images/videos, course syllabus, fees, batches and approved testimonials if desired.
- Phone/address were read from the public Google business listing; email was present in the public Facebook search result. Confirm these business contacts before launch.
- The supplied `alignmedia.rf.gd` could not be loaded and Google lists `alignmedias.com`; website navigation is intentionally omitted until the canonical domain is confirmed.
- Rating counts are intentionally not hard-coded.

Main content/links: `app/page.tsx`. Styling: `app/globals.css`. Metadata: `app/layout.tsx`. Saved contact: `public/align-media.vcf`. Replace contact information in both the page and vCard when updating it.

QRs and shared links use the current origin: localhost previews generate localhost links. Generate the final printable QR from the deployed site, not this local preview.

## Validation

Production build and TypeScript checks; browser checks for mobile navigation, portfolio filtering, selected-project enquiry, QR/share dialog, and responsive visual inspection. Real iOS/Android device and WhatsApp delivery testing remain manual launch checks.
