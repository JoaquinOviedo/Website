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
  const [prototype, component] = await Promise.all([
    readFile(new URL("../content/frameworkPrototype.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/FrameworkPrototype.tsx", import.meta.url), "utf8"),
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
  assert.match(component, /setIconBackground/);
  assert.match(prototype, /Historial y conversación/);
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
  assert.match(source, /professional-blue/);
  assert.match(source, /portfolio-palette/);
  assert.match(layout, /dataset\.palette/);
});

test("language switching preserves the current section and deployment base path", async () => {
  const source = await readFile("components/Portfolio.tsx", "utf8");
  assert.match(source, /window\.location\.pathname\.replace/);
  assert.match(source, /window\.location\.hash/);
  assert.match(source, /onClick=\{switchLanguage\}/);
});
