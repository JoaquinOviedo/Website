"use client";

import { useState } from "react";
import { projectMedia, type GallerySlug } from "@/content/projectMedia";
import type { Locale } from "@/content/portfolio";
import { withBasePath } from "@/lib/basePath";

export type { GallerySlug } from "@/content/projectMedia";

export function ProjectGallery({ slug, locale }: { slug: GallerySlug; locale: Locale }) {
  const slides = projectMedia[slug];
  const slideCount = slides.length;
  const [current, setCurrent] = useState(0);
  const previous = () => setCurrent((index) => (index - 1 + slideCount) % slideCount);
  const next = () => setCurrent((index) => (index + 1) % slideCount);
  const labels = locale === "es"
    ? { previous: "Captura anterior", next: "Captura siguiente", gallery: "Capturas del proyecto", slide: "Captura", open: "Abrir captura en tamaño completo" }
    : { previous: "Previous screenshot", next: "Next screenshot", gallery: "Project screenshots", slide: "Screenshot", open: "Open full-size screenshot" };

  return (
    <div className="project-gallery" role="region" aria-roledescription="carousel" aria-label={labels.gallery}>
      <div className="project-gallery-frame" aria-live="polite">
        {slides.map((slide, index) => (
          <figure key={slide.src} hidden={index !== current}>
            <a href={withBasePath(slide.src)} target="_blank" rel="noreferrer" aria-label={`${labels.open}: ${slide[locale]}`}>
              <img src={withBasePath(slide.src)} alt={slide[locale]} width="1792" height="1024" loading="lazy" decoding="async" />
            </a>
            <figcaption>{slide[locale]}</figcaption>
          </figure>
        ))}
      </div>
      <div className="project-gallery-controls">
        <button type="button" onClick={previous} aria-label={labels.previous}>←</button>
        <span aria-hidden="true">{current + 1} / {slideCount}</span>
        <div className="project-gallery-dots">
          {Array.from({ length: slideCount }, (_, index) => (
            <button type="button" key={index} className={index === current ? "active" : ""} aria-label={`${labels.slide} ${index + 1}`} aria-current={index === current ? "true" : undefined} onClick={() => setCurrent(index)} />
          ))}
        </div>
        <button type="button" onClick={next} aria-label={labels.next}>→</button>
      </div>
    </div>
  );
}
