# Adding a project

Use this checklist whenever a project is added or promoted. A new project should be defensible in an interview and should add stronger evidence than the weakest currently featured project.

## 1. Prepare verified content

Create `content/projects/<descriptiveName>.ts` and export one object that `satisfies Project`. Start from this shape:

```ts
import type { Project } from "@/content/types";

export const exampleProject = {
  slug: "example-project",
  path: { es: "/es/proyectos/proyecto-ejemplo", en: "/en/projects/example-project" },
  featured: false,
  caseStudy: true,
  type: "personal",
  title: "Project title",
  year: undefined,
  summary: { es: "…", en: "…" },
  problem: { es: "…", en: "…" },
  solution: { es: "…", en: "…" },
  role: { es: "…", en: "…" },
  features: { es: ["…"], en: ["…"] },
  technologies: ["TypeScript"],
  image: "/images/projects/example/cover.webp",
  repositories: [{ label: "GitHub", url: "https://github.com/…" }],
  status: { es: "Proyecto personal", en: "Personal project" },
  learnings: { es: "…", en: "…" },
  aiAssisted: false,
} satisfies Project;
```

Do not invent a year, outcome, contribution, repository, demo, or technology. Omit optional fields until verified. For team projects, distinguish the team solution from Joaquín's personal contribution.

## 2. Register the project

Import the record in `content/projects/index.ts` and add it to `projects` in the desired display order. `featured: true` places it on the landing page. Keep only three to five strong featured projects.

## 3. Add visual evidence

- Put optimized WebP or AVIF files under `public/images/projects/<slug>/`.
- Remove or replace real people, client records, dates, account values, private paths, and internal identifiers.
- Use a stable cover image in the project record.
- Add gallery entries to `content/projectMedia.ts`, including natural Spanish and English descriptions.
- Preserve the source image ratio; presentation CSS controls display size.
- Never use a screenshot merely to fill space. Each image should demonstrate a different useful capability.

## 4. Add localized routes

Create paired route files following the existing project routes under `app/es/proyectos/<slug>/page.tsx` and `app/en/projects/<slug>/page.tsx`. Each page should pass the canonical project slug and locale to the case-study renderer. Add unique localized metadata. Confirm the static exporter includes both paths; sitemap entries come from the project registry.

## 5. Optional prototype

Only add an interactive prototype if interaction communicates something that screenshots cannot. It must be explicitly labeled as a conceptual example, use fictional data, work with keyboard input, and remain collapsed below the recruiter-focused evidence. Register it in `components/ProjectPrototype.tsx`; do not put prototype state in project content.

## 6. AI transparency

Set `aiAssisted: true` only when assistance was substantial. Add `aiContribution` in both locales and describe verified human responsibility: product definition, constraints, evaluation, debugging, testing, integration, refactoring, UX decisions, or deployment. Do not claim contributions that cannot be supported.

## 7. Acceptance checklist

- The landing card contains one concise summary, one contribution, four to six technologies, a 16:9 preview, and a case-study CTA.
- Both localized routes render and preserve the language switch.
- Metadata, canonical URL, sitemap, and static export are correct.
- Gallery controls work by keyboard and do not autoplay.
- Images are readable on mobile and open at full size.
- No real or confidential records are visible.
- `npm run validate` succeeds.

