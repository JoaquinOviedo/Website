import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("professional content keeps both locales and safe CV state", async () => {
  const [portfolio, copy] = await Promise.all([readFile(new URL("../content/portfolio.ts", import.meta.url), "utf8"), readFile(new URL("../content/copy.ts", import.meta.url), "utf8")]);
  assert.match(copy, /es:\s*\{/); assert.match(copy, /en:\s*\{/);
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
  assert.doesNotMatch(prototype, /YPF|Circo Studio/i);
});
