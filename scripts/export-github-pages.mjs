import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const output = join(root, "pages-dist");
const basePath = (process.env.PAGES_BASE_PATH ?? "/Website").replace(/\/$/, "");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(root, "dist", "client"), output, { recursive: true });

const workerUrl = pathToFileURL(join(root, "dist", "server", "index.js"));
workerUrl.searchParams.set("export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const routes = new Map([
  ["/es", "es/index.html"],
  ["/en", "en/index.html"],
  ["/es/proyectos/wirin", "es/proyectos/wirin/index.html"],
  ["/en/projects/wirin", "en/projects/wirin/index.html"],
  ["/es/proyectos/finanzas-personales", "es/proyectos/finanzas-personales/index.html"],
  ["/en/projects/personal-finance", "en/projects/personal-finance/index.html"],
  ["/es/proyectos/mi-carrera-tech", "es/proyectos/mi-carrera-tech/index.html"],
  ["/en/projects/my-tech-degree", "en/projects/my-tech-degree/index.html"],
  ["/robots.txt", "robots.txt"],
  ["/sitemap.xml", "sitemap.xml"],
  ["/manifest.webmanifest", "manifest.webmanifest"],
]);

function withBasePath(value) {
  if (!basePath || !value.includes("<")) return value;
  return value.replace(
    /(href|src|action)=(['"])(\/(?!\/)[^'"]*)/g,
    (match, attribute, quote, path) =>
      path === basePath || path.startsWith(`${basePath}/`)
        ? match
        : `${attribute}=${quote}${basePath}${path}`,
  );
}

for (const [route, destination] of routes) {
  const response = await worker.fetch(
    new Request(`http://localhost${route}`, { headers: { accept: route.endsWith(".html") || !route.includes(".") ? "text/html" : "*/*" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (!response.ok) throw new Error(`Could not export ${route}: HTTP ${response.status}`);
  const target = join(output, destination);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, withBasePath(await response.text()));
}

await writeFile(join(output, ".nojekyll"), "");
await writeFile(
  join(output, "index.html"),
  `<!doctype html><html lang="es"><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${basePath}/es"><title>Joaquín Oviedo</title><a href="${basePath}/es">Abrir portfolio</a></html>`,
);

console.log(`GitHub Pages export created at ${output}`);
