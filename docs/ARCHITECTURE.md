# Architecture and maintenance map

## Product boundary

This is a bilingual professional portfolio for recruiter evaluation. The landing page is the fast-scanning layer; localized case-study pages hold deeper evidence, galleries, AI disclosures, and optional conceptual prototypes. A change is successful only when it improves clarity without weakening factual accuracy, confidentiality, accessibility, or static deployment.

## Runtime flow

1. Localized routes under `app/es` and `app/en` choose a locale.
2. `content/` supplies typed facts and bilingual copy.
3. `components/Portfolio.tsx` composes the landing page; focused sections live in `components/portfolio/`.
4. `components/CaseStudy.tsx` renders a project from the shared `projects` registry.
5. `lib/basePath.ts` prefixes public assets and internal paths for GitHub Pages.
6. The export script produces the static route set used by the Pages workflow.

## Directory responsibilities

| Path | Responsibility |
| --- | --- |
| `app/` | Routes, localized metadata, sitemap, robots, manifest, global CSS entry point. |
| `components/` | Shared UI and interactive behavior. No professional facts should originate here. |
| `components/portfolio/` | Landing-page sections and small portfolio-only primitives. |
| `content/copy.ts` | Localized interface and narrative copy that is not project-specific. |
| `content/profile.ts` | Public profile, social links, portrait, CV paths, and email assembly. |
| `content/projects/` | One typed source file per project plus the ordered registry in `index.ts`. |
| `content/projectMedia.ts` | Sanitized gallery assets and bilingual alternative descriptions. |
| `content/types.ts` | Shared content contracts. |
| `content/pending.ts` | Private development reminders; never render these publicly. |
| `content/frameworkPrototype.ts` | Sanitized fictional data for the Power Apps design-system prototype. |
| `lib/contactDelivery.ts` | Typed contact-delivery boundary and mail fallback; future providers connect here. |
| `public/` | Deployable images, CV PDFs, icons, and other static assets. |
| `tests/` | Content invariants, accessibility-oriented source checks, and rendered smoke tests. |

`content/portfolio.ts` is intentionally a small compatibility barrel. New facts belong in the focused files above, not in that barrel.

## Dependency direction

Keep dependencies flowing in this direction:

`types → content records → presentation components → routes`

Content must not import React components. Reusable components may import content, but project records must remain serializable plain data. This keeps sitemap generation, static rendering, and future CMS migration straightforward.

## Known maintenance hotspots

- `app/globals.css` is large and cascade-sensitive after multiple visual iterations. Prefer editing an existing selector near its current responsibility. Split it only in a dedicated visual-regression change that preserves import order and verifies every breakpoint.
- `components/FrameworkPrototype.tsx` is intentionally self-contained because its state is coupled. Add prototype data to `content/frameworkPrototype.ts`; extract behavior only when a second consumer exists.
- `components/Portfolio.tsx` still owns global theme, language, contact form, and page composition. New independent landing sections belong in `components/portfolio/` rather than expanding this file.

## Required invariants

- Spanish and English remain complete in the same commit.
- Every public image or downloadable asset uses `withBasePath` or the corresponding metadata helper.
- Landing cards stay concise; detailed evidence stays in case studies.
- Screenshots are sanitized and contain no private names, values, internal application names, or proprietary code.
- AI assistance is disclosed through typed project data when applicable, without presenting AI as the author.
- No TODO or unconfirmed fact appears in production copy.
- New case-study routes must exist in both locales and be exported for GitHub Pages.

## Safe change sequence

1. Read `AGENTS.md`, this file, and the guide relevant to the requested area.
2. Change typed content before presentation when the request is factual.
3. Keep the landing-page scan path compact and move depth into a case study.
4. Run `npm run validate`.
5. Inspect `/es`, `/en`, and every changed localized case-study route at desktop and mobile widths.
6. Review `git diff` for accidental secrets, private paths, real records, and unrelated edits.
