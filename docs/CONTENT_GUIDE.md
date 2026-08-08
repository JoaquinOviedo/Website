# Content and maintenance guide

## Where everything lives
Professional identity, links, and CV configuration live in `content/profile.ts`. Each project has a focused file under `content/projects/`, gallery evidence lives in `content/projectMedia.ts`, and pending facts live in `content/pending.ts`. All shared visible Spanish and English interface text lives in `content/copy.ts`. Pages and components should render those sources instead of duplicating facts. `content/portfolio.ts` is only a compatibility barrel.

## Adding a project
Follow `docs/ADDING_PROJECTS.md`. Create one typed project record, register it in `content/projects/index.ts`, and complete both languages, localized paths, problem, solution, role, evidence-quality links, and imagery. Set `featured: true` only for the best three to five projects. For substantial AI assistance, set `aiAssisted: true` and describe Joaquín's verified contribution in `aiContribution` for both languages.

## Project case studies
The landing page is an executive index: each featured project shows one clean preview, a short summary, and a link to its detail page. Do not place galleries or interactive prototypes inside landing cards. Localized route files live under `app/es/proyectos/` and `app/en/projects/`; both render the shared `components/CaseStudy.tsx` component. The detail order is recruiter-oriented: context, problem, solution, contribution, technical decisions, learning, full-width sanitized screenshots, and finally the clearly labeled conceptual prototype.

Screenshot definitions live in `content/projectMedia.ts`; `components/ProjectGallery.tsx` only renders them. Keep records, amounts, dates, names, paths, and other personal data sanitized. Screenshots must open at full size for detailed inspection. The prototype remains separate from the evidence gallery so it cannot be mistaken for the final product.

## Public asset paths
Images, CV files, manifest icons, and other files under `public/` must be rendered through `withBasePath` from `lib/basePath.ts`. GitHub Pages is hosted below `/Website`, while local development and a future custom domain use the root path. Keep `NEXT_PUBLIC_BASE_PATH: /Website` in the Pages workflow and never hardcode `/Website` inside content records or components.

## Replacing CVs
Place stable PDFs under `public/cv/`, keep the editable DOCX files under `documents/cv/`, then update `profile.cvUpdated` in `content/profile.ts`. The generator scripts are `scripts/build_cvs.py` and `scripts/build_cv_pdfs.py`. A missing language must remain `null`; the UI will show a non-clickable pending state instead of a broken link.

## Editing the Power Apps prototype
The public interactive showcase is implemented in `components/FrameworkPrototype.tsx`; its bilingual copy, fictional rows, palette, and icon catalog live in `content/frameworkPrototype.ts`. Preserve the “conceptual prototype” label and use invented generic records only. Do not add YPF branding, internal screenshots, application names, real users, confidential fields, or copied Power Apps source code.

## Editing talks and community highlights
The localized cards and their source links live in `communityItems` inside `content/copy.ts`. Every entry must link to public evidence, describe Joaquín's participation without inflating it, and be complete in both languages. Prefer the canonical LinkedIn post URL without tracking parameters; do not add reaction counts, long copied quotations, or claims that the source does not support.

## Form provider
The default contact flow validates locally and opens a prefilled email through `mailto:`. To connect Formspree, Resend, or a private API later, implement a server-side or provider-safe submission adapter; never expose a secret key through a `NEXT_PUBLIC_` variable. Keep the mail fallback available.

## Known pending content
- Confirm whether the formal job title differs from “Supervisor de Desarrollo y Desarrollador Power Platform”.
- Confirm or publish the WIRIN API repository; the supplied URL is not publicly accessible.
- Configure the future `joaquinoviedo.com` or `.com.ar` domain when acquired.

## Pre-release checklist
Review facts and confidentiality, validate both locales and themes, test keyboard navigation and form errors, check all external/CV links, run the validation suite, and verify responsive layouts at narrow mobile, tablet, and desktop widths.
