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
- `content/profile.ts` contains public profile data, links, CV paths, and contact configuration.
- `content/projects/` contains one typed record per project and its ordered registry.
- `content/projectMedia.ts` contains sanitized gallery evidence and bilingual descriptions.
- `content/pending.ts` contains private development reminders that are never rendered.
- `content/portfolio.ts` is a compatibility barrel for existing imports.
- `content/copy.ts` contains all visible Spanish and English strings.
- `content/frameworkPrototype.ts` contains the sanitized, bilingual data used by the interactive Power Apps design-system prototype.
- `public/` contains the real portrait, social card, and CV assets.
- `AGENTS.md` protects the product goal during future automated changes.
- `docs/CONTENT_GUIDE.md` explains safe content maintenance.
- `docs/ARCHITECTURE.md` maps dependencies, folder ownership, and known hotspots.
- `docs/ADDING_PROJECTS.md` is the end-to-end project onboarding checklist and template.
- `docs/PRODUCT_DECISIONS.md` records the recruiter-first UX and privacy decisions to preserve.

## Editing content

Edit facts in their focused files under `content/` and translations in `content/copy.ts`. Every visible addition must have natural Spanish and English versions. Incomplete professional data stays out of production and is recorded in `content/pending.ts` or the maintenance guide.

Projects are typed and data-driven. Follow `docs/ADDING_PROJECTS.md`: create one record under `content/projects/`, register it in `content/projects/index.ts`, add sanitized media to `content/projectMedia.ts`, and create paired localized routes when it has a case study. The landing-page component does not need modification.

The interactive design-system showcase lives in `components/FrameworkPrototype.tsx`. Edit its labels, fictional table rows, color tokens, and icon catalog through `content/frameworkPrototype.ts`. Keep it conceptual: never paste internal application names, screenshots, real records, user identities, or proprietary code into the public prototype.

## CVs

The bilingual CV content is centralized in `scripts/cv_content.py`; update facts there instead of editing PDF and DOCX generators separately. `scripts/build_cvs.py` produces the editable Harvard/ATS-style sources under `documents/cv/`, while `scripts/build_cv_pdfs.py` writes the public PDFs to their stable URLs under `public/cv/` and mirrors verified copies to `output/pdf/`.

The Spanish version includes the professional portrait intentionally selected for the Argentine market. The English version is text-only and ATS-first. Both remain A4, one-column, one-page documents without tables, sidebars, headers, footers, skill bars, or unverifiable proficiency claims.

Rebuild and verify with the workspace Python runtime:

```powershell
python scripts/build_cvs.py
python scripts/build_cv_pdfs.py
python scripts/verify_cvs.py
```

After replacing the public CVs, update `profile.cvUpdated` in `content/profile.ts`. If a language is unavailable, keep its value `null` so the UI never produces a broken download.

## Contact form

The implemented fallback is intentionally functional without a backend: it validates the form, includes a honeypot field, and opens a prefilled `mailto:` draft. Copy `.env.example` to `.env.local` for deployment configuration. A future provider should be connected through a safe submission adapter; never expose Resend or private API keys in client variables.

## Analytics

Analytics are disabled by default. If privacy-friendly analytics are added, honor `NEXT_PUBLIC_ANALYTICS_DOMAIN`, document the provider, and restrict events to CV downloads, contact actions, successful submissions, project visits, and outbound professional links. Do not add cross-site tracking or unnecessary cookie banners.

### Local time and weather

The header shows the visitor's device time. Weather is opt-in: only after the visitor activates it does the browser request geolocation permission. Coordinates are rounded to two decimals, sent directly to the [Open-Meteo forecast API](https://open-meteo.com/en/docs) to retrieve current temperature and weather code, and are not persisted by the portfolio.

## Deployment

The initial target is GitHub Pages through `.github/workflows/deploy-pages.yml`; set `NEXT_PUBLIC_SITE_URL` to the Pages origin before publishing. When a custom `joaquinoviedo.com` or `.com.ar` domain is available, update that variable and the repository Pages configuration. Run `npm run validate` before every release. Do not execute an external deployment without explicit authorization.
