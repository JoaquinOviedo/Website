import type { Project } from "@/content/types";

export const myTechDegreeProject = {
  slug: "mi-carrera-tech",
  path: { es: "/es/proyectos/mi-carrera-tech", en: "/en/projects/my-tech-degree" },
  featured: true,
  caseStudy: true,
  type: "personal",
  title: "Mi Carrera Tech",
  year: "2026",
  summary: {
    es: "Herramienta local para seguir materias, exámenes, notas y correlatividades de la Licenciatura en Gestión de Tecnología.",
    en: "A local tool for tracking courses, exams, grades, and prerequisites in the Technology Management degree.",
  },
  problem: {
    es: "Visualizar el avance académico y las próximas obligaciones sin depender de una plataforma genérica.",
    en: "Visualizing academic progress and upcoming obligations without relying on a generic platform.",
  },
  solution: {
    es: "Una aplicación local enfocada en visualizar el plan de estudios, el avance, las correlatividades y las próximas evaluaciones desde una estructura propia y editable.",
    en: "A focused local application for viewing the curriculum, progress, prerequisites, and upcoming assessments through an editable, purpose-built structure.",
  },
  role: {
    es: "Definí una herramienta a medida para organizar mi carrera: prioridades, flujos de consulta y funciones útiles para el seguimiento académico cotidiano.",
    en: "I defined a purpose-built tool for organizing my degree: priorities, information flows, and useful features for everyday academic tracking.",
  },
  features: {
    es: ["Dashboard de progreso", "Plan de estudios interactivo", "Calendario de exámenes", "Persistencia local en JSON"],
    en: ["Progress dashboard", "Interactive curriculum", "Exam calendar", "Local JSON persistence"],
  },
  technologies: ["React", "TypeScript", "Vite", "Node.js", "Express"],
  image: "/images/projects/career/dashboard-sanitized.webp",
  repositories: [{ label: "GitHub", url: "https://github.com/JoaquinOviedo/App-de-Gestion-personal-para-Licenciatura-en-Gestion-de-Tecnologia-Unlam" }],
  status: { es: "Proyecto personal · uso local", en: "Personal project · local use" },
  learnings: {
    es: "Diseño de una herramienta enfocada, persistencia local y modelado de correlatividades académicas.",
    en: "Focused product design, local persistence, and modeling of academic prerequisites.",
  },
  aiAssisted: true,
  aiContribution: {
    es: "Usé IA para acelerar la implementación. Mi aporte estuvo en transformar una necesidad propia en producto, seleccionar funciones, evaluar su utilidad, detectar problemas y dirigir sucesivas mejoras.",
    en: "I used AI to accelerate implementation. My contribution was turning a personal need into a product, selecting features, evaluating their usefulness, finding problems, and directing successive improvements.",
  },
} satisfies Project;

