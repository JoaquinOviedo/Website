# Product decisions

These decisions capture the current direction so future changes do not gradually turn the portfolio into a generic template or an oversized product demo.

## Recruiter-first information architecture

- The first visit should establish role, value, technical fit, evidence, and contact path quickly.
- The landing page is a summary. Project cards remain compact; galleries, detailed AI transparency, and interactive prototypes live in individual case studies.
- Three strong projects are more useful than many incomplete ones.
- Experience and contribution evidence matter more than decorative technology logos.
- The about section uses one concise, human paragraph. Avoid abstract principle lists when the same ideas can be stated concretely.
- The contribution/technology overview remains a compact band, not a full-height section. It provides technical fit before project evidence without slowing navigation.
- Experience details stay visible in the summary and contribution bullets; do not add a secondary "more context" disclosure unless it introduces genuinely new evidence.

## Visual language

- The professional blue palette is the single global accent system.
- Technology labels use the portfolio system rather than a wall of official brand colors. The two primary technologies per project receive additional emphasis.
- Motion is subtle and disabled when reduced motion is requested.
- The custom cursor is progressive enhancement for fine pointers only; it must never hide the native cursor on touch or reduced-motion devices.
- Theme defaults to system, supports explicit light and dark choices, and avoids a loading flash.

## Project evidence

- Screenshots use sanitized or fictional content and open at full size.
- Carousels are manual and accessible; no autoplay.
- Interactive project prototypes are conceptual demonstrations, not claims that they reproduce the released product.
- The Power Apps/Fluent showcase describes reusable patterns and process thinking without exposing YPF or Circo Studio interfaces or data.

## Content integrity

- Never infer seniority, metrics, dates, client impact, or ownership.
- Use qualitative outcomes only when supported: standardization, reuse, UX consistency, coordination, or reduced repetitive work.
- Keep incomplete facts in `content/pending.ts`.
- Public contact email remains assembled at runtime and hidden until the visitor requests it.

## Deployment and portability

- GitHub Pages is the current host and `/Website` is a deployment base path, not a permanent product URL.
- Every public asset must work both below `/Website` and later at a root custom domain.
- Analytics and third-party forms remain optional and disabled until explicitly configured.
