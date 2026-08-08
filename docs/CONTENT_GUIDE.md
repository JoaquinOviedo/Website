# Content and maintenance guide

## Where everything lives
Professional identity, links, CV configuration, projects, and pending facts live in `content/portfolio.ts`. All visible Spanish and English interface text lives in `content/copy.ts`. Pages and components should render those sources instead of duplicating facts.

## Adding a project
Add one typed `Project` object to `projects`. Complete both languages, use only verified contributions, and provide evidence-quality links or imagery. Set `featured: true` only for the best three to five projects. For substantial AI assistance, set `aiAssisted: true` and describe Joaquín's verified contribution in `aiContribution` for both languages.

## Replacing CVs
Place stable PDFs under `public/cv/`, keep the editable DOCX files under `documents/cv/`, then update `profile.cvUpdated`. The generator scripts are `scripts/build_cvs.py` and `scripts/build_cv_pdfs.py`. A missing language must remain `null`; the UI will show a non-clickable pending state instead of a broken link.

## Editing the Power Apps prototype
The public interactive showcase is implemented in `components/FrameworkPrototype.tsx`; its bilingual copy, fictional rows, palette, and icon catalog live in `content/frameworkPrototype.ts`. Preserve the “conceptual prototype” label and use invented generic records only. Do not add YPF branding, internal screenshots, application names, real users, confidential fields, or copied Power Apps source code.

## Editing talks and community highlights
The localized cards and their source links live in `communityItems` inside `content/copy.ts`. Every entry must link to public evidence, describe Joaquín's participation without inflating it, and be complete in both languages. Prefer the canonical LinkedIn post URL without tracking parameters; do not add reaction counts, long copied quotations, or claims that the source does not support.

## Form provider
The default contact flow validates locally and opens a prefilled email through `mailto:`. To connect Formspree, Resend, or a private API later, implement a server-side or provider-safe submission adapter; never expose a secret key through a `NEXT_PUBLIC_` variable. Keep the mail fallback available.

## Known pending content
- Confirm whether the formal job title differs from “Supervisor de Desarrollo y Desarrollador Power Platform”.
- Confirm or publish the WIRIN API repository; the supplied URL is not publicly accessible.
- Add original screenshots for the two local personal applications.
- Configure the future `joaquinoviedo.com` or `.com.ar` domain when acquired.

## Pre-release checklist
Review facts and confidentiality, validate both locales and themes, test keyboard navigation and form errors, check all external/CV links, run the validation suite, and verify responsive layouts at narrow mobile, tablet, and desktop widths.
