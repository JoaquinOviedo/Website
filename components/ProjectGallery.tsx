"use client";

import { useState } from "react";
import type { Locale } from "@/content/portfolio";

const galleries = {
  "finanzas-personales": [
    { src: "/images/projects/finance/budget-sanitized.webp", es: "Vista de presupuesto y distribución financiera con datos anonimizados.", en: "Budget and financial allocation view with anonymized data." },
    { src: "/images/projects/finance/evolution-sanitized.webp", es: "Vista de evolución patrimonial sin cifras ni fechas reales.", en: "Portfolio evolution view without real figures or dates." },
    { src: "/images/projects/finance/investments-sanitized.webp", es: "Vista de inversiones con activos, cotizaciones y resultados anonimizados.", en: "Investments view with anonymized assets, prices, and returns." },
    { src: "/images/projects/finance/history-sanitized.webp", es: "Historial patrimonial preparado sin fechas, notas ni valores reales.", en: "Portfolio history prepared without real dates, notes, or values." },
  ],
  wirin: [
    { src: "/images/projects/wirin/dashboard-sanitized.webp", es: "Panel bibliográfico de WIRIN con registros completamente anonimizados.", en: "WIRIN bibliography dashboard with fully anonymized records." },
    { src: "/images/projects/wirin/tasks-sanitized.webp", es: "Gestión de tareas de WIRIN con contenido ficticio de demostración.", en: "WIRIN task management with fictional demonstration content." },
    { src: "/images/projects/wirin/users-sanitized.webp", es: "Gestión de usuarios con identidades completamente ficticias.", en: "User management with entirely fictional identities." },
    { src: "/images/projects/wirin/statistics-sanitized.webp", es: "Panel estadístico sin métricas ni registros reales.", en: "Statistics dashboard without real metrics or records." },
    { src: "/images/projects/wirin/ranking-sanitized.webp", es: "Ranking de voluntariado con nombres y resultados neutralizados.", en: "Volunteer ranking with neutralized names and results." },
    { src: "/images/projects/wirin/bibliographies-sanitized.webp", es: "Gestión bibliográfica sin títulos, estudiantes ni fechas reales.", en: "Bibliography management without real titles, students, or dates." },
  ],
  "mi-carrera-tech": [
    { src: "/images/projects/career/dashboard-sanitized.webp", es: "Resumen académico con progreso, notas y exámenes neutralizados.", en: "Academic overview with neutralized progress, grades, and exams." },
    { src: "/images/projects/career/study-plan-sanitized.webp", es: "Plan de estudios con materias y estados ficticios.", en: "Study plan with fictional courses and statuses." },
    { src: "/images/projects/career/calendar-sanitized.webp", es: "Calendario académico sin fechas ni eventos reales.", en: "Academic calendar without real dates or events." },
    { src: "/images/projects/career/data-sanitized.webp", es: "Gestión de datos locales sin rutas ni registros privados.", en: "Local data management without private paths or records." },
  ],
} as const;

export type GallerySlug = keyof typeof galleries;

export function ProjectGallery({ slug, locale }: { slug: GallerySlug; locale: Locale }) {
  const slides = galleries[slug];
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
            <a href={slide.src} target="_blank" rel="noreferrer" aria-label={`${labels.open}: ${slide[locale]}`}>
              <img src={slide.src} alt={slide[locale]} width="1792" height="1024" loading="lazy" decoding="async" />
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
