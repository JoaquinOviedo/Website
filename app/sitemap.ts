import type { MetadataRoute } from "next";
import { projects } from "@/content/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joaquinoviedo.dev";
  const homePages = ["/es", "/en"].map((url) => ({
    url: `${base}${url}`,
    lastModified: new Date("2026-08-08"),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));
  const caseStudies = projects.flatMap((project) =>
    (["es", "en"] as const).map((locale) => ({
      url: `${base}${project.path[locale]}`,
      lastModified: new Date("2026-08-08"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  return [...homePages, ...caseStudies];
}
