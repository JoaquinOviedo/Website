import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectFiles = [
  "../content/projects/wirin.ts",
  "../content/projects/personalFinance.ts",
  "../content/projects/myTechDegree.ts",
];

async function readProjectSources() {
  return (await Promise.all(projectFiles.map((path) => readFile(new URL(path, import.meta.url), "utf8")))).join("\n");
}

async function readHomepageSources() {
  return (await Promise.all([
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("components/portfolio/FocusSection.tsx", "utf8"),
    readFile("components/portfolio/ExperienceSection.tsx", "utf8"),
    readFile("components/portfolio/ProjectsSection.tsx", "utf8"),
  ])).join("\n");
}

test("professional content keeps both locales and safe CV state", async () => {
  const [portfolio, copy] = await Promise.all([readFile(new URL("../content/profile.ts", import.meta.url), "utf8"), readFile(new URL("../content/copy.ts", import.meta.url), "utf8")]);
  assert.match(copy, /es:\s*\{/); assert.match(copy, /en:\s*\{/);
  assert.doesNotMatch(copy, /HABILITAR|ENABLE|principles:/);
  assert.doesNotMatch(copy, /Diseñado y desarrollado|Designed and developed/);
  assert.match(portfolio, /cv:\s*\{\s*es:/); assert.match(portfolio, /joaquin-oviedo-en\.pdf/);
  assert.doesNotMatch(portfolio, /\+5411/);
  assert.match(copy, /aboutParagraphs: \[/);
  assert.match(copy, /involucrarme más allá de la implementación/);
  assert.match(copy, /taking ownership beyond the implementation itself/);
  assert.match(copy, /Uso IA como herramienta/);
  assert.match(copy, /Power Platform, \.NET, React y TypeScript/);
  assert.match(copy, /Power Platform, \.NET, React, and TypeScript/);
  assert.match(portfolio, /joaquin-oviedo-profile-v2\.webp/);
  assert.doesNotMatch(copy, /Me interesa especialmente el backend|particularly interested in backend work/);
});

test("professional experience includes Power Platform delivery and access governance", async () => {
  const [copy, experience, css] = await Promise.all([
    readFile("content/copy.ts", "utf8"),
    readFile("components/portfolio/ExperienceSection.tsx", "utf8"),
    readFile("app/globals.css", "utf8"),
  ]);
  assert.match(experience, /"Dataverse"/);
  assert.match(copy, /variables de entorno, flujos de Power Automate/);
  assert.match(copy, /environment variables, Power Automate flows/);
  assert.match(copy, /roles y permisos en Dataverse, SharePoint y grupos AD corporativos/);
  assert.match(copy, /roles and permissions across Dataverse, SharePoint, and corporate AD groups/);
  assert.match(copy, /registro evidencia con Azure DevOps Test & Feedback/);
  assert.match(copy, /capture evidence with Azure DevOps Test & Feedback/);
  assert.match(css, /data-tech="dataverse"/);
  assert.match(css, /data-tech="test-feedback"/);
});

test("WIRIN records backend ownership and only verified public repositories", async () => {
  const source = await readProjectSources();
  assert.match(source, /main contribution was the backend/i);
  assert.match(source, /wirinadapta\.vercel\.app/);
  assert.match(source, /WIRIN-FrontEnd/);
  assert.match(source, /wirin-landing/);
  assert.doesNotMatch(source, /thomasloader1\/wirin-api/);
  assert.match(source, /aiAssisted:\s*true/);
  assert.match(source, /Académico · Validación institucional en curso/);
  assert.match(source, /Academic · Institutional validation in progress/);
  assert.match(source, /biblioteca de la UNLaM/);
  assert.match(source, /logo: "\/images\/projects\/wirin\/logo\.webp"/);
  assert.match(source, /logoDark: "\/images\/projects\/wirin\/logo-dark\.webp"/);
  assert.doesNotMatch(source, /horas (como )?docente|teaching hours|paid|payment/i);
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
  assert.match(component, /function PrototypeSelect/);
  assert.match(component, /role="listbox"/);
  assert.match(component, /aria-selected={option === value}/);
  assert.doesNotMatch(component, /<select defaultValue=/);
  assert.doesNotMatch(component, /<i aria-hidden="true">0\{index \+ 1\}<\/i>/);
  assert.match(prototype, /Historial y conversación/);
  assert.match(styles, /framework-dark \.standard-screen > footer \{ background:/);
  assert.match(styles, /grid-template-columns: repeat\(5, minmax\(0, 1fr\)\)/);
  assert.doesNotMatch(prototype, /YPF|Circo Studio/i);
});

test("theme selection uses accessible icon buttons and preserves system mode", async () => {
  const [source, portfolio, caseStudy, layout] = await Promise.all([
    readFile(new URL("../components/ThemeControl.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/Portfolio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/CaseStudy.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(source, /DEFAULT_THEME: Theme = "system"/);
  assert.match(source, /\["light", "system", "dark"\]/);
  assert.match(source, /aria-pressed/);
  assert.match(layout, /prefers-color-scheme: dark/);
  assert.match(layout, /\?s:'system'/);
  assert.match(portfolio, /<ThemeControl locale=\{locale\}/);
  assert.match(caseStudy, /<ThemeControl locale=\{locale\} compact/);
  assert.doesNotMatch(source, /<select[\s\S]*?applyTheme/);
  assert.doesNotMatch(source, /portfolio-palette|palette-control/);
  assert.doesNotMatch(layout, /dataset\.palette/);
});

test("language switching preserves the current section and deployment base path", async () => {
  const source = await readFile("components/Portfolio.tsx", "utf8");
  assert.match(source, /window\.location\.pathname\.replace/);
  assert.match(source, /\$\{localizedPath\}\$\{window\.location\.search\}\$\{window\.location\.hash\}/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /window\.location\.assign/);
  assert.match(source, /onClick=\{switchLanguage\}/);
});

test("the first visit follows the browser language and later visits respect the saved preference", async () => {
  const redirect = await readFile("components/BrowserLanguageRedirect.tsx", "utf8");
  const home = await readFile("app/page.tsx", "utf8");

  assert.match(redirect, /localStorage\.getItem\("locale"\)/);
  assert.match(redirect, /navigator\.languages/);
  assert.match(redirect, /startsWith\("es"\)/);
  assert.match(redirect, /withBasePath\(`\/\$\{locale\}`\)/);
  assert.match(redirect, /window\.location\.replace/);
  assert.match(home, /<BrowserLanguageRedirect\s*\/>/);
});

test("browser tabs use a concise personal title and an adaptive vector mark", async () => {
  const [spanishPage, englishPage, layout, manifest, lightMark, darkMark] = await Promise.all([
    readFile("app/es/page.tsx", "utf8"),
    readFile("app/en/page.tsx", "utf8"),
    readFile("app/layout.tsx", "utf8"),
    readFile("app/manifest.ts", "utf8"),
    readFile("public/images/joaquin-oviedo-mark-light.svg", "utf8"),
    readFile("public/images/joaquin-oviedo-mark-dark.svg", "utf8"),
  ]);
  assert.match(spanishPage, /Joaquín Oviedo · Software Developer/);
  assert.match(englishPage, /Joaquín Oviedo · Software Developer/);
  assert.match(layout, /joaquin-oviedo-mark-light\.svg/);
  assert.match(layout, /joaquin-oviedo-mark-dark\.svg/);
  assert.match(layout, /media="\(prefers-color-scheme: light\)"/);
  assert.match(layout, /media="\(prefers-color-scheme: dark\)"/);
  assert.doesNotMatch(layout, /adaptive-favicon|MutationObserver/);
  assert.match(manifest, /joaquin-oviedo-mark-light\.svg/);
  assert.match(lightMark, /aria-label="JO\."/);
  assert.match(darkMark, /aria-label="JO\."/);
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
  const [portfolio, gallery, media, caseStudy] = await Promise.all([
    readHomepageSources(),
    readFile("components/ProjectGallery.tsx", "utf8"),
    readFile("content/projectMedia.ts", "utf8"),
    readFile("components/CaseStudy.tsx", "utf8"),
  ]);
  assert.match(portfolio, /className="project-preview"/);
  assert.doesNotMatch(portfolio, /<ProjectGallery/);
  assert.match(gallery, /aria-roledescription="carousel"/);
  assert.match(gallery, /loading="lazy"/);
  assert.doesNotMatch(media, /wirin\/presentation\.webp/);
  assert.match(media, /sanitized\.webp/);
  assert.match(gallery, /Open full-size screenshot/);
  assert.doesNotMatch(gallery, /ProjectPrototype/);
  assert.match(caseStudy, /<ProjectGallery slug=\{slug\}/);
  assert.match(caseStudy, /<ProjectPrototype slug=\{slug\}/);
  assert.match(caseStudy, /prototypeLead/);
  assert.match(media, /career\/dashboard-sanitized\.webp/);
  assert.match(media, /wirin\/bibliographies-sanitized\.webp/);
  assert.match(media, /finance\/history-sanitized\.webp/);
  assert.doesNotMatch(gallery, /autoplay|setInterval/);
  assert.doesNotMatch(caseStudy, /evidenceLead/);
  assert.match(caseStudy, /projectDetailsLabel/);
  assert.match(portfolio, /projectDetails/);
  assert.doesNotMatch(portfolio, /previewProject|previewCase/);
  assert.doesNotMatch(portfolio, /<strong>\{detailLabel\}/);
});

test("case studies prioritize recruiter scanning and defer interactive depth", async () => {
  const [caseStudy, portfolioData, css] = await Promise.all([
    readFile("components/CaseStudy.tsx", "utf8"),
    readProjectSources(),
    readFile("app/globals.css", "utf8"),
  ]);

  assert.doesNotMatch(caseStudy, /\{t\.solution\}|\{t\.technical\}/);
  assert.match(caseStudy, /\{t\.problem\}/);
  assert.match(caseStudy, /\{t\.contribution\}/);
  assert.match(caseStudy, /hasContribution/);
  assert.match(caseStudy, /personal-project/);
  assert.match(caseStudy, /outcome: "02", stack: "03", evidence: "04", prototype: "05"/);
  assert.match(caseStudy, /\{t\.outcome\}/);
  assert.match(caseStudy, /\{t\.stackAndProcess\}/);
  assert.match(caseStudy, /<details className="prototype-disclosure">/);
  assert.match(caseStudy, /className="disclosure-chevron"/);
  assert.match(caseStudy, /className="ai-tech"/);
  assert.match(portfolioData, /decidir qué funciones aportaban valor/);
  assert.match(portfolioData, /selecting features, evaluating their usefulness/);
  assert.match(css, /font-size: clamp\(3rem, 7\.5vw, 6\.6rem\)/);
  assert.match(css, /width: min\(860px, 100%\)/);
});

test("case studies keep AI disclosure compact and use technology border accents", async () => {
  const [caseStudy, css] = await Promise.all([
    readFile("components/CaseStudy.tsx", "utf8"),
    readFile("app/globals.css", "utf8"),
  ]);
  assert.match(caseStudy, /data-tech=\{technologyKey\(tech\)\}/);
  assert.match(caseStudy, /className="ai-tech"/);
  assert.doesNotMatch(caseStudy, /case-ai-note|aiTransparency/);
  assert.match(css, /\.tech-list li\[data-tech\]:hover/);
});

test("homepage keeps recruiter evidence compact and moves depth into case studies", async () => {
  const [portfolio, copy, css] = await Promise.all([
    readHomepageSources(),
    readFile("content/copy.ts", "utf8"),
    readFile("app/globals.css", "utf8"),
  ]);

  assert.match(portfolio, /project\.type !== "personal"/);
  assert.match(portfolio, /className="project-contribution"/);
  assert.match(portfolio, /className="project-logo"/);
  assert.doesNotMatch(portfolio, /portrait-note/);
  assert.match(portfolio, /<Icon name="linkedin" \/>/);
  assert.match(portfolio, /<Icon name="github" \/>/);
  assert.match(portfolio, /className=\{project\.logo \? "sr-only" : undefined\}/);
  assert.match(portfolio, /className="button primary" href="#experiencia"/);
  assert.match(copy, /viewExperience: "Ver experiencia"/);
  assert.match(copy, /viewExperience: "View experience"/);
  assert.doesNotMatch(copy, /viewProjects:/);
  assert.ok(
    portfolio.indexOf("<ExperienceSection locale={locale} />") < portfolio.indexOf("<ProjectsSection locale={locale} />"),
    "professional experience should appear before project evidence",
  );
  assert.ok(
    portfolio.indexOf('className="education section"') < portfolio.indexOf('className="about section"'),
    "formal education should appear before personal context",
  );
  assert.match(copy, /nav: \[\s*"Inicio",\s*"Experiencia",\s*"Proyectos",\s*"Educación",\s*"Sobre mí",\s*"Contacto",?\s*\]/);
  assert.match(copy, /nav: \["Home", "Experience", "Projects", "Education", "About", "Contact"\]/);
  assert.match(portfolio, /\["inicio", "experiencia", "proyectos", "educacion", "sobre-mi", "contacto"\]/);
  assert.match(portfolio, /focus-compact/);
  assert.match(portfolio, /index === 0 \? "about-intro"/);
  assert.match(portfolio, /index < 2 \? "primary-tech"/);
  assert.match(portfolio, /<details className="framework-disclosure">/);
  assert.match(portfolio, /className="disclosure-chevron"/);
  assert.doesNotMatch(portfolio, /t\.explorePrototype\} <Icon name="arrow"/);
  assert.doesNotMatch(portfolio, /experience-details|detailsText/);
  assert.match(portfolio, /communityItems\.map/);
  assert.doesNotMatch(portfolio, /communityItems\.slice/);
  assert.match(portfolio, /Apps24Regular/);
  assert.match(portfolio, /technologyKey\(technology\)/);
  assert.match(portfolio, /primaryExperienceTechnologies\.has\(technology\)/);
  assert.match(portfolio, /new Set\(\["Power Apps", "Dataverse", "SharePoint", "Power Automate"\]\)/);
  assert.match(portfolio, /className="section-heading contact-heading"/);
  assert.doesNotMatch(portfolio, /06 \/ CONTACT/);
  assert.match(portfolio, /className="focus-icon" aria-hidden="true"/);
  assert.match(copy, /focus: "Áreas y tecnologías"/);
  assert.match(copy, /focus: "Areas and technologies"/);
  assert.match(copy, /\["Power Apps", "Dataverse", "Power Automate", "SharePoint"\]/);
  assert.match(copy, /\["Relevamiento", "Priorizaci.n", "Delegaci.n", "Capacitaci.n"\]/);
  assert.match(copy, /\["Discovery", "Prioritization", "Delegation", "Training"\]/);
  assert.match(css, /\.focus-tech-list/);
  assert.match(css, /\.about-grid\.about-lead \{[\s\S]*?grid-template-columns: minmax\(0, \.85fr\) minmax\(0, 1\.15fr\)/);
  assert.match(css, /\.about-lead p:not\(\.about-intro\)[\s\S]*?border-left: 1px solid var\(--line\)/);
  assert.match(css, /\.tech-list li\.primary-tech/);
  assert.match(css, /data-tech="power-apps"/);
  assert.match(css, /--tech-accent: #8b4b9f/);
  assert.match(css, /\.focus-tech-list li\[data-tech\]:hover \{\s*border-color: var\(--tech-accent\);\s*\}/);
  assert.doesNotMatch(css, /\.tech-list li\[data-tech\]:hover[^}]*background:/);
  assert.doesNotMatch(css, /\.tech-list li\[data-tech\]:hover::before/);
  assert.match(css, /\.visual-finanzas-personales \{[\s\S]*?#18283d/);
  assert.match(css, /\.task-card-head/);
  assert.doesNotMatch(css, /\.task-card[^\n]*#ff6d70/);
  assert.match(css, /\.project-visual \{[\s\S]*?min-height: 390px/);
  assert.match(css, /\.education\.section \{[\s\S]*?padding-bottom:/);
  assert.match(css, /footer \{[\s\S]*?padding: \.7rem/);
  assert.match(css, /\.timeline \{[\s\S]*?border-top: 1px solid var\(--line\)/);
  assert.match(css, /\.community-block \{[\s\S]*?border-top: 1px solid var\(--line\)/);
  assert.doesNotMatch(css, /border-(?:top|bottom): 1px solid var\(--ink\)/);
});

test("all featured projects have localized recruiter-friendly case-study routes", async () => {
  const [content, sitemap, exporter] = await Promise.all([
    readProjectSources(),
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
    readHomepageSources(),
  ]);
  assert.match(portfolio, /<LocalContext locale=\{locale\}/);
  assert.match(context, /Intl\.DateTimeFormat/);
  assert.match(context, /navigator\.geolocation\.getCurrentPosition/);
  assert.match(context, /latitude\.toFixed\(2\)/);
  assert.match(context, /api\.open-meteo\.com\/v1\/forecast/);
  assert.match(context, /current=temperature_2m,weather_code/);
  assert.match(context, /weatherTone/);
  assert.match(context, /weather-\$\{weatherClass\}/);
  assert.match(context, /\{weather\.temperature\}°C/);
  assert.doesNotMatch(context, /localStorage|sessionStorage/);
});

test("community highlights are bilingual and point to clean public evidence", async () => {
  const [portfolioComponent, carousel, copy] = await Promise.all([
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("components/CommunityEvidenceCarousel.tsx", "utf8"),
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

  assert.match(copy, /Ver en LinkedIn/);
  assert.match(copy, /View on LinkedIn/);
  assert.match(portfolioComponent, /className="community-arrow"/);
  assert.match(portfolioComponent, /CommunityEvidenceCarousel/);
  assert.match(carousel, /withBasePath\(image\.src\)/);
  assert.match(carousel, /aria-roledescription="carousel"/);
  assert.match(copy, /label: "Imágenes"/);
  assert.match(copy, /label: "Images"/);
  assert.equal((copy.match(/\/images\/projects\/wirin\/jbdu-0[1-6]\.webp/g) ?? []).length, 12);
  assert.match(portfolioComponent, /aria-label={`\$\{t\.communityLink\}: \$\{title\}`}/);
  assert.doesNotMatch(portfolioComponent, /\{t\.communityLink\}\s*<span aria-hidden="true">↗<\/span>/);
  assert.doesNotMatch(portfolioComponent, /\{t\.contactLinkedin\}\s*<span aria-hidden="true"> ↗<\/span>/);
  assert.doesNotMatch(copy, /utm_(source|medium|campaign)=/);
  assert.match(portfolioComponent, /target="_blank" rel="noreferrer"/);
});

test("public assets use the deployment-aware base path helper", async () => {
  const [helper, portfolio, profile, gallery, layout, manifest, workflow, exporter] = await Promise.all([
    readFile("lib/basePath.ts", "utf8"),
    readHomepageSources(),
    readFile("content/profile.ts", "utf8"),
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
  assert.match(profile, /photo: "\/images\/joaquin-oviedo-profile-v2\.webp"/);
  assert.match(layout, /withBasePath\("\/images\/joaquin-oviedo-mark-light\.svg"\)/);
  assert.match(layout, /apple: absoluteAsset\("\/images\/joaquin-oviedo-icon\.png"\)/);
  assert.match(manifest, /withBasePath\("\/images\/joaquin-oviedo-mark-light\.svg"\)/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH: \/Website/g);
  assert.match(exporter, /path\.startsWith\(`\$\{basePath\}\/`\)/);
});

test("public email is hidden from initial markup and revealed by user action", async () => {
  const [portfolioData, portfolioComponent, layout] = await Promise.all([
    readFile("content/profile.ts", "utf8"),
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

test("contact delivery is provider-ready without exposing implementation details", async () => {
  const [portfolio, delivery, copy] = await Promise.all([
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("lib/contactDelivery.ts", "utf8"),
    readFile("content/copy.ts", "utf8"),
  ]);

  assert.match(portfolio, /deliverContactMessage/);
  assert.match(portfolio, /href=\{profile\.linkedin\}/);
  assert.match(portfolio, /\{t\.contactLinkedin\}/);
  assert.match(copy, /contactLinkedin: "LinkedIn"/);
  assert.match(delivery, /NEXT_PUBLIC_FORM_ENDPOINT/);
  assert.match(delivery, /kind: "mailto"/);
  assert.match(delivery, /getPublicEmail\(\)/);
  assert.doesNotMatch(portfolio, /Form provider|NEXT_PUBLIC_FORM_ENDPOINT/);
  assert.doesNotMatch(copy, /Sin proveedor configurado|Without a configured provider|dirección se mantiene oculta|address stays hidden/);
});

test("the localized résumé is downloadable from the sticky header", async () => {
  const [portfolioComponent, css] = await Promise.all([
    readFile("components/Portfolio.tsx", "utf8"),
    readFile("app/globals.css", "utf8"),
  ]);

  assert.match(portfolioComponent, /className="header-cv"/);
  assert.match(portfolioComponent, /href=\{withBasePath\(profile\.cv\[locale\]!\)\}/);
  assert.match(portfolioComponent, /aria-label=\{t\.downloadCv\}/);
  assert.match(portfolioComponent, /\{t\.downloadCv\} <Icon name="download" \/>/);
  assert.match(portfolioComponent, /className="header-cv"[\s\S]*?download/);
  assert.match(css, /\.header-cv\s*\{[\s\S]*?border-radius: 999px/);
  assert.match(css, /\.language\s*\{[\s\S]*?border-radius: 999px/);
});

test("verified Data Science training is secondary, bilingual, and evidence-linked", async () => {
  const [copy, portfolioComponent] = await Promise.all([
    readFile("content/copy.ts", "utf8"),
    readFile("components/Portfolio.tsx", "utf8"),
  ]);

  assert.match(copy, /Curso de Data Science/);
  assert.match(copy, /Data Science course/);
  assert.match(copy, /Universidad Tecnológica Nacional \(UTN\)/);
  assert.doesNotMatch(copy, /National Technological University/);
  assert.match(copy, /Noviembre de 2024/);
  assert.match(copy, /November 2024/);
  assert.match(portfolioComponent, /education-certification/);
  assert.match(portfolioComponent, /education-formal/);
  assert.match(portfolioComponent, /details\/certifications\//);
});

test("language proficiency is concise, bilingual, and does not claim an unverified certification", async () => {
  const [copy, portfolio] = await Promise.all([
    readFile("content/copy.ts", "utf8"),
    readFile("components/Portfolio.tsx", "utf8"),
  ]);

  assert.match(copy, /languages: "Idiomas"/);
  assert.match(copy, /"Español", "Nativo"/);
  assert.match(copy, /"Inglés", "Intermedio alto · comunicación laboral funcional"/);
  assert.match(copy, /"Portugués", "A2"/);
  assert.match(copy, /languages: "Languages"/);
  assert.match(copy, /"English", "Upper-intermediate · functional workplace communication"/);
  assert.match(copy, /"Portuguese", "A2"/);
  assert.doesNotMatch(copy, /\b(?:B2|C1|fluent)\b/i);
  assert.match(portfolio, /t\.languageItems\.map/);
});
