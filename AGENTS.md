# Portfolio maintenance guide

## Product north star
This repository is Joaquín Oviedo's bilingual professional portfolio. Optimize every change for recruiter clarity, professional credibility, accessibility, and easy maintenance. Never invent dates, metrics, roles, clients, responsibilities, results, or links. Do not expose confidential YPF or Circo Studio information.

## Architecture map
- `app/`: localized routes, metadata, sitemap, robots, and manifest. Every featured project has paired Spanish and English case-study routes.
- `components/`: presentation and interaction components.
- `content/`: the only source of professional facts and localized copy.
- `components/FrameworkPrototype.tsx` and `content/frameworkPrototype.ts`: sanitized interactive representation of the Power Apps design system; never turn it into a reproduction of internal applications.
- `public/cv/`: replaceable CV files; keep paths synchronized with `content/portfolio.ts`.
- `public/images/`: real public imagery only.
- `lib/basePath.ts`: required path helper for every public image, CV, icon, and localized internal route so GitHub Pages and a future root domain both work.
- `docs/CONTENT_GUIDE.md`: editing workflow and pending facts.

## Change rules
1. Update facts in `content/portfolio.ts`; update translated interface copy in `content/copy.ts`.
2. Keep Spanish and English complete in the same change.
3. Hide incomplete records rather than rendering TODO text publicly.
4. Preserve semantic HTML, keyboard behavior, focus visibility, reduced motion, and WCAG AA contrast.
5. Run `npm run validate` before handoff and inspect `/es`, `/en`, and all localized case-study routes.
6. Do not deploy, add tracking, publish phone/address, or connect third-party forms without explicit approval.
