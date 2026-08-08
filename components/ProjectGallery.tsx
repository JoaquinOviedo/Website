"use client";

import { useState } from "react";
import { ProjectPrototype } from "@/components/ProjectPrototype";
import type { Locale } from "@/content/portfolio";

const galleries = {
  "finanzas-personales": [
    { src: "/images/projects/finance/budget-sanitized.webp", es: "Vista de presupuesto y distribución financiera con datos anonimizados.", en: "Budget and financial allocation view with anonymized data." },
    { src: "/images/projects/finance/evolution-sanitized.webp", es: "Vista de evolución patrimonial sin cifras ni fechas reales.", en: "Portfolio evolution view without real figures or dates." },
  ],
  wirin: [
    { src: "/images/projects/wirin/dashboard-sanitized.webp", es: "Panel bibliográfico de WIRIN con registros completamente anonimizados.", en: "WIRIN bibliography dashboard with fully anonymized records." },
    { src: "/images/projects/wirin/tasks-sanitized.webp", es: "Gestión de tareas de WIRIN con contenido ficticio de demostración.", en: "WIRIN task management with fictional demonstration content." },
  ],
} as const;

type GallerySlug = keyof typeof galleries;

export function ProjectGallery({ slug, locale }: { slug: GallerySlug; locale: Locale }) {
  const slides = galleries[slug];
  const slideCount = slides.length + 1;
  const [current, setCurrent] = useState(0);
  const previous = () => setCurrent((index) => (index - 1 + slideCount) % slideCount);
  const next = () => setCurrent((index) => (index + 1) % slideCount);
  const labels = locale === "es"
    ? { previous: "Elemento anterior", next: "Elemento siguiente", gallery: "Galería del proyecto", slide: "Elemento", demo: "Demostración interactiva", prototype: "Prototipo conceptual de ejemplo. No representa la interfaz ni la versión final del proyecto." }
    : { previous: "Previous item", next: "Next item", gallery: "Project gallery", slide: "Item", demo: "Interactive demonstration", prototype: "Conceptual example prototype. It does not represent the project's final interface or release." };

  return (
    <div className="project-gallery" role="region" aria-roledescription="carousel" aria-label={labels.gallery}>
      <div className="project-gallery-frame" aria-live="polite">
        {slides.map((slide, index) => (
          <figure key={slide.src} hidden={index !== current}>
            <img src={slide.src} alt={slide[locale]} width="1792" height="1024" loading="lazy" decoding="async" />
            <figcaption>{slide[locale]}</figcaption>
          </figure>
        ))}
        <section className="project-gallery-prototype" hidden={current !== slides.length} aria-label={labels.prototype}>
          <p><strong>{labels.demo}</strong><span>{labels.prototype}</span></p>
          <ProjectPrototype slug={slug} locale={locale} />
        </section>
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
