import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("professional content keeps both locales and safe CV state", async () => {
  const [portfolio, copy] = await Promise.all([readFile(new URL("../content/portfolio.ts", import.meta.url), "utf8"), readFile(new URL("../content/copy.ts", import.meta.url), "utf8")]);
  assert.match(copy, /es:\s*\{/); assert.match(copy, /en:\s*\{/);
  assert.match(copy, /principles: \["CONSTRUIR", "COMPRENDER", "HABILITAR"\]/);
  assert.doesNotMatch(portfolio, /<p>BUILD<\/p>/);
  assert.match(portfolio, /cv:\s*\{\s*es:/); assert.match(portfolio, /joaquin-oviedo-en\.pdf/);
  assert.doesNotMatch(portfolio, /\+5411/);
});

test("WIRIN records backend ownership and only verified public repositories", async () => {
  const source = await readFile(new URL("../content/portfolio.ts", import.meta.url), "utf8");
  assert.match(source, /main contribution was the backend/i);
  assert.match(source, /wirinadapta\.vercel\.app/);
  assert.match(source, /WIRIN-FrontEnd/);
  assert.match(source, /wirin-landing/);
  assert.doesNotMatch(source, /thomasloader1\/wirin-api/);
  assert.match(source, /aiAssisted:\s*true/);
});

test("the framework prototype stays bilingual, sanitized, and data-driven", async () => {
  const [prototype, component, styles] = await Promise.all([
    readFile(new URL("../content/frameworkPrototype.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/FrameworkPrototype.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(prototype, /Interactive conceptual prototype/);
  assert.match(prototype, /Prototipo conceptual interactivo/);
  assert.match(prototype, /información completamente ficticia/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /role="tablist"/);
  assert.match(component, /initiative-stages/);
  assert.match(component, /aria-current=.*step/);
  assert.match(component, /aria-expanded=\{expanded\}/);
  assert.match(component, /advanceInitiative/);
  assert.match(component, /setGalleryPage/);
  assert.match(component, /prototypeDark/);
  assert.match(component, /role="status"/);
  assert.match(component, /setIconVariant/);
  assert.match(component, /@fluentui\/react-icons/);
  assert.match(component, /icon-pagination/);
  assert.match(component, /iconVariants/);
  assert.match(prototype, /Historial y conversación/);
  assert.match(styles, /framework-dark \.standard-screen > footer \{ background:/);
  assert.match(styles, /grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(prototype, /YPF|Circo Studio/i);
});

test("theme selection uses accessible icon buttons and preserves system mode", async () => {
  const [source, layout] = await Promise.all([
    readFile(new URL("../components/Portfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(source, /DEFAULT_THEME: Theme = "system"/);
  assert.match(source, /\["light", "system", "dark"\]/);
  assert.match(source, /aria-pressed/);
  assert.match(layout, /prefers-color-scheme: dark/);
  assert.match(layout, /\?s:'system'/);
  assert.doesNotMatch(source, /<select[\s\S]*?applyTheme/);
  assert.doesNotMatch(source, /portfolio-palette|palette-control/);
  assert.doesNotMatch(layout, /dataset\.palette/);
});

test("language switching preserves the current section and deployment base path", async () => {
  const source = await readFile("components/Portfolio.tsx", "utf8");
  assert.match(source, /window\.location\.pathname\.replace/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /onClick=\{switchLanguage\}/);
});

test("each featured case study renders a bilingual interactive prototype", async () => {
  const [caseStudy, prototype] = await Promise.all([
    readFile("components/CaseStudy.tsx", "utf8"),
    readFile("components/ProjectPrototype.tsx", "utf8"),
  ]);
  assert.match(caseStudy, /ProjectPrototype/);
  assert.match(prototype, /FinancePrototype/);
  assert.match(prototype, /WirinPrototype/);
  assert.match(prototype, /CareerPrototype/);
  assert.match(prototype, /role="tablist"/);
  assert.doesNotMatch(prototype, /C:\\Users|Juan Perez|Joaquin/i);
});

test("WIRIN and finance use accessible sanitized image galleries", async () => {
  const [portfolio, gallery, caseStudy] = await Promise.all([
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("components/ProjectGallery.tsx", "utf8"),
    readFile("components/CaseStudy.tsx", "utf8"),
  ]);
  assert.match(portfolio, /className="project-preview"/);
  assert.doesNotMatch(portfolio, /<ProjectGallery/);
  assert.match(gallery, /aria-roledescription="carousel"/);
  assert.match(gallery, /loading="lazy"/);
  assert.match(gallery, /sanitized\.webp/);
  assert.match(gallery, /Open full-size screenshot/);
  assert.doesNotMatch(gallery, /ProjectPrototype/);
  assert.match(caseStudy, /<ProjectGallery slug=\{slug\}/);
  assert.match(caseStudy, /<ProjectPrototype slug=\{slug\}/);
  assert.match(caseStudy, /prototypeLead/);
  assert.match(gallery, /career\/dashboard-sanitized\.webp/);
  assert.match(gallery, /wirin\/bibliographies-sanitized\.webp/);
  assert.match(gallery, /finance\/history-sanitized\.webp/);
  assert.doesNotMatch(gallery, /autoplay|setInterval/);
});

test("all featured projects have localized recruiter-friendly case-study routes", async () => {
  const [content, sitemap, exporter] = await Promise.all([
    readFile("content/portfolio.ts", "utf8"),
    readFile("app/sitemap.ts", "utf8"),
    readFile("scripts/export-github-pages.mjs", "utf8"),
  ]);
  assert.equal((content.match(/caseStudy:\s*true/g) ?? []).length, 3);
  assert.match(content, /\/es\/proyectos\/finanzas-personales/);
  assert.match(content, /\/en\/projects\/personal-finance/);
  assert.match(content, /\/es\/proyectos\/mi-carrera-tech/);
  assert.match(content, /\/en\/projects\/my-tech-degree/);
  assert.match(sitemap, /projects\.flatMap/);
  for (const route of [
    "/es/proyectos/finanzas-personales",
    "/en/projects/personal-finance",
    "/es/proyectos/mi-carrera-tech",
    "/en/projects/my-tech-degree",
  ]) {
    assert.match(exporter, new RegExp(route));
  }
});

test("custom cursor is progressive and respects input preferences", async () => {
  const [cursor, portfolio, css] = await Promise.all([
    readFile("components/CustomCursor.tsx", "utf8"),
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("app/globals.css", "utf8"),
  ]);
  assert.match(portfolio, /<CustomCursor \/>/);
  assert.match(cursor, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(cursor, /prefers-reduced-motion: reduce/);
  assert.match(cursor, /requestAnimationFrame/);
  assert.match(css, /@media \(hover: hover\) and \(pointer: fine\) and \(prefers-reduced-motion: no-preference\)/);
  assert.match(css, /pointer-events: none/);
});

test("local time and opt-in weather preserve location privacy", async () => {
  const [context, portfolio] = await Promise.all([
    readFile("components/LocalContext.tsx", "utf8"),
    readFile("components/Portfolio.tsx", "utf8"),
  ]);
  assert.match(portfolio, /<LocalContext locale=\{locale\}/);
  assert.match(context, /Intl\.DateTimeFormat/);
  assert.match(context, /navigator\.geolocation\.getCurrentPosition/);
  assert.match(context, /latitude\.toFixed\(2\)/);
  assert.match(context, /api\.open-meteo\.com\/v1\/forecast/);
  assert.match(context, /current=temperature_2m,weather_code/);
  assert.doesNotMatch(context, /localStorage|sessionStorage/);
});

test("community highlights are bilingual and point to clean public evidence", async () => {
  const [portfolioComponent, copy] = await Promise.all([
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("content/copy.ts", "utf8"),
  ]);

  for (const postId of [
    "7454991014303342592",
    "7446915128865873920",
    "7399482208429948928",
    "7368291401576382464",
  ]) {
    assert.match(copy, new RegExp(postId));
  }

  assert.match(copy, /Ver publicación en LinkedIn/);
  assert.match(copy, /View post on LinkedIn/);
  assert.doesNotMatch(copy, /utm_(source|medium|campaign)=/);
  assert.match(portfolioComponent, /target="_blank" rel="noreferrer"/);
});

test("public assets use the deployment-aware base path helper", async () => {
  const [helper, portfolio, gallery, layout, manifest, workflow, exporter] = await Promise.all([
    readFile("lib/basePath.ts", "utf8"),
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("components/ProjectGallery.tsx", "utf8"),
    readFile("app/layout.tsx", "utf8"),
    readFile("app/manifest.ts", "utf8"),
    readFile(".github/workflows/deploy-pages.yml", "utf8"),
    readFile("scripts/export-github-pages.mjs", "utf8"),
  ]);

  assert.match(helper, /NEXT_PUBLIC_BASE_PATH/);
  assert.match(portfolio, /withBasePath\(profile\.photo\)/);
  assert.match(portfolio, /withBasePath\(project\.image\)/);
  assert.match(portfolio, /withBasePath\(profile\.cv\[locale\]!\)/);
  assert.match(gallery, /withBasePath\(slide\.src\)/);
  assert.match(layout, /absoluteAsset\("\/images\/joaquin-oviedo\.png"\)/);
  assert.match(manifest, /withBasePath\("\/images\/joaquin-oviedo\.png"\)/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH: \/Website/g);
  assert.match(exporter, /path\.startsWith\(`\$\{basePath\}\/`\)/);
});

test("public email is hidden from initial markup and revealed by user action", async () => {
  const [portfolioData, portfolioComponent, layout] = await Promise.all([
    readFile("content/portfolio.ts", "utf8"),
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("app/layout.tsx", "utf8"),
  ]);

  const completeEmail = "joaquin.oviedo.fernandez@gmail.com";
  for (const source of [portfolioData, portfolioComponent, layout]) {
    assert.equal(source.includes(completeEmail), false);
  }
  assert.match(portfolioComponent, /emailRevealed/);
  assert.match(portfolioComponent, /setEmailRevealed\(true\)/);
  assert.match(portfolioComponent, /getPublicEmail\(\)/);
});

test("the localized résumé is downloadable from the sticky header", async () => {
  const portfolioComponent = await readFile("components/Portfolio.tsx", "utf8");

  assert.match(portfolioComponent, /className="header-cv"/);
  assert.match(portfolioComponent, /href=\{withBasePath\(profile\.cv\[locale\]!\)\}/);
  assert.match(portfolioComponent, /aria-label=\{t\.downloadCv\}/);
  assert.match(portfolioComponent, /className="header-cv"[\s\S]*?download/);
});
