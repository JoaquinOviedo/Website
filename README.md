# Joaquín Oviedo — Professional portfolio

Bilingual, accessible professional portfolio built with React, strict TypeScript, Next-compatible App Router APIs through Vinext, and static/public rendering optimized for low-cost deployment.

## Quick start

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal. Main routes are `/es`, `/en`, `/es/proyectos/wirin`, and `/en/projects/wirin`.

## Commands

- `npm run dev`: local development.
- `npm run lint`: ESLint including React and accessibility rules.
- `npm run typecheck`: strict TypeScript verification.
- `npm run test:unit`: content and configuration unit tests.
- `npm test`: production render smoke tests.
- `npm run build`: production build.
- `npm run validate`: lint, types, unit tests, build, and rendered HTML smoke tests.

## Architecture

- `app/` contains routes and search/social metadata.
- `components/` contains reusable UI and interaction logic.
- `content/portfolio.ts` contains typed professional data, projects, links, CV paths, and private development TODOs.
- `content/copy.ts` contains all visible Spanish and English strings.
- `content/frameworkPrototype.ts` contains the sanitized, bilingual data used by the interactive Power Apps design-system prototype.
- `public/` contains the real portrait, social card, and CV assets.
- `AGENTS.md` protects the product goal during future automated changes.
- `docs/CONTENT_GUIDE.md` explains safe content maintenance.

## Editing content

Edit facts only in `content/portfolio.ts` and translations in `content/copy.ts`. Every visible addition must have natural Spanish and English versions. Incomplete professional data stays out of production and is recorded in `pendingContent` or the maintenance guide.

Projects are typed and data-driven. Add a `Project` object with title, summary, problem, personal role, features, technologies, optional image/demo/repository, status, year, learning, type, and optional AI-assistance disclosure. Components do not need modification.

The interactive design-system showcase lives in `components/FrameworkPrototype.tsx`. Edit its labels, fictional table rows, color tokens, and icon catalog through `content/frameworkPrototype.ts`. Keep it conceptual: never paste internal application names, screenshots, real records, user identities, or proprietary code into the public prototype.

## CVs

The current Spanish and English PDFs live under `public/cv/` at stable URLs. Editable Harvard-style sources live under `documents/cv/`. Rebuild them with `scripts/build_cvs.py` and `scripts/build_cv_pdfs.py`, then update `profile.cvUpdated`. If a language is unavailable, keep its value `null` so the UI never produces a broken download.

## Contact form

The implemented fallback is intentionally functional without a backend: it validates the form, includes a honeypot field, and opens a prefilled `mailto:` draft. Copy `.env.example` to `.env.local` for deployment configuration. A future provider should be connected through a safe submission adapter; never expose Resend or private API keys in client variables.

## Analytics

Analytics are disabled by default. If privacy-friendly analytics are added, honor `NEXT_PUBLIC_ANALYTICS_DOMAIN`, document the provider, and restrict events to CV downloads, contact actions, successful submissions, project visits, and outbound professional links. Do not add cross-site tracking or unnecessary cookie banners.

### Local time and weather

The header shows the visitor's device time. Weather is opt-in: only after the visitor activates it does the browser request geolocation permission. Coordinates are rounded to two decimals, sent directly to the [Open-Meteo forecast API](https://open-meteo.com/en/docs) to retrieve current temperature and weather code, and are not persisted by the portfolio.

## Deployment

The initial target is GitHub Pages through `.github/workflows/deploy-pages.yml`; set `NEXT_PUBLIC_SITE_URL` to the Pages origin before publishing. When a custom `joaquinoviedo.com` or `.com.ar` domain is available, update that variable and the repository Pages configuration. Run `npm run validate` before every release. Do not execute an external deployment without explicit authorization.
