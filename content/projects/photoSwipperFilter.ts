import type { Project } from "@/content/types";

export const photoSwipperFilterProject = {
  slug: "photo-swipper-filter",
  path: { es: "/es/proyectos/photo-swipper-filter", en: "/en/projects/photo-swipper-filter" },
  featured: true,
  caseStudy: true,
  type: "personal",
  group: "personal-management",
  title: "Photo Swipper Filter",
  summary: {
    es: "Filtrador local de fotos y videos que combina análisis de contenido, calidad y similitud para facilitar la selección.",
    en: "A local photo and video filter that uses content, image quality, and similarity to help sort a media library.",
  },
  problem: {
    es: "Revisar una biblioteca grande a mano lleva tiempo, sobre todo cuando se mezclan recuerdos, documentos, capturas y ráfagas.",
    en: "Reviewing a large library by hand takes time, especially when personal photos, documents, screenshots, and bursts are mixed together.",
  },
  solution: {
    es: "La herramienta combina la clasificación de contenido de CLIP con detección de rostros y reglas de calidad. Sugiere qué archivos priorizar, copia los resultados a carpetas separadas y deja un registro para revisar cada decisión.",
    en: "The tool combines CLIP content classification with face detection and image quality rules. It suggests which files to prioritize, copies the results into separate folders, and records the reasons for review.",
  },
  role: {
    es: "Definí qué señales ayudan a priorizar archivos y cómo revisar las decisiones del filtro.",
    en: "I defined which signals help prioritize files and how to review the filter’s decisions.",
  },
  features: {
    es: [
      "Análisis por lotes de fotos y fotogramas de video con CLIP.",
      "Detección de rostros con MediaPipe y señales de calidad como nitidez e iluminación.",
      "Agrupación temporal y comparación por similitud para identificar duplicados y ráfagas.",
      "Copia de los resultados sin mover los archivos originales y reporte CSV con categoría, puntuación y motivo.",
    ],
    en: [
      "Batch analysis of photos and video frames with CLIP.",
      "Face detection with MediaPipe and image quality signals such as sharpness and lighting.",
      "Time-based grouping and similarity matching to flag duplicates and bursts.",
      "Copies of the sorted results, with originals kept in place and a CSV report of categories, scores, and reasons.",
    ],
  },
  technologies: ["Python", "CLIP", "MediaPipe", "OpenCV", "FFmpeg"],
  status: { es: "Herramienta local", en: "Local tool" },
  learnings: {
    es: "Combinar señales visuales y reglas configurables permite ajustar el filtro. El reporte ayuda a entender por qué se priorizó cada archivo.",
    en: "Combining visual signals with configurable rules makes the filter tunable. The report shows why each file received its priority.",
  },
  aiAssisted: true,
  aiContribution: {
    es: "Usé IA como apoyo al desarrollo. En la herramienta, CLIP cumple otra función: analiza el contenido visual para orientar la clasificación.",
    en: "I used AI to support development. In the tool itself, CLIP serves a distinct purpose: it analyzes visual content to inform classification.",
  },
} satisfies Project;
