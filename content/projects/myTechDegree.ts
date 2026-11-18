import type { Project } from "@/content/types";

export const myTechDegreeProject = {
  slug: "mi-carrera-tech",
  path: { es: "/es/proyectos/mi-carrera-tech", en: "/en/projects/my-tech-degree" },
  featured: true,
  caseStudy: true,
  prototype: true,
  type: "personal",
  group: "personal-management",
  title: "Mi Carrera Tech",
  year: "2026",
  summary: {
    es: "Plan de estudios de Gestión de Tecnología en la UNLaM, con correlatividades, notas y calendario de exámenes.",
    en: "A tracker for UNLaM’s Technology Management degree, with course prerequisites, grades, and an exam calendar.",
  },
  problem: {
    es: "Necesitaba ver en un solo lugar qué materias podía cursar, qué exámenes tenía por delante y cuánto me faltaba para terminar la carrera.",
    en: "I needed one place to see which courses I could take, which exams were coming up, and what remained to complete my degree.",
  },
  solution: {
    es: "Un plan de estudios interactivo enlaza las correlatividades con el estado de cada materia. El panel resume el avance y el calendario reúne las fechas de evaluación a partir de los mismos registros.",
    en: "An interactive curriculum links prerequisites to each course’s status. The dashboard summarizes progress and the calendar draws exam dates from the same records.",
  },
  role: {
    es: "Definí el modelo del plan de estudios y los flujos para registrar cursadas, evaluaciones y avances.",
    en: "I defined the curriculum model and the workflows for tracking courses, exams, and progress.",
  },
  features: {
    es: [
      "Panel de avance con materias aprobadas y evaluaciones pendientes.",
      "Plan por año con estados, notas y correlativas que faltan para habilitar materias.",
      "Calendario de parciales, recuperatorios y finales.",
      "Importación y exportación de cursadas y fechas para compartirlas sin incluir las notas.",
      "Persistencia en JSON local, con descarga y restauración de respaldos.",
    ],
    en: [
      "Progress dashboard with completed courses and remaining assessments.",
      "Curriculum by year, with course status, grades, and outstanding prerequisites.",
      "Calendar for midterms, resits, and final exams.",
      "Import and export current courses and exam dates for sharing without including grades.",
      "Local JSON storage with downloadable, restorable backups.",
    ],
  },
  technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express"],
  image: "/images/projects/career/dashboard-sanitized.webp",
  repositories: [{ label: "GitHub", url: "https://github.com/JoaquinOviedo/App-de-Gestion-personal-para-Licenciatura-en-Gestion-de-Tecnologia-Unlam" }],
  status: { es: "Uso local", en: "Local app" },
  learnings: {
    es: "El modelo de correlatividades permite explicar por qué una materia sigue bloqueada. Separar las fechas compartibles de las notas permite coordinar la cursada sin exponer el progreso personal.",
    en: "The prerequisite model explains why a course is still locked. Separating shareable dates from grades lets students coordinate classes while keeping their progress private.",
  },
  aiAssisted: true,
  aiContribution: {
    es: "Usé IA para apoyar la implementación. Definí las reglas del seguimiento académico y revisé los flujos de cursada, calendario y respaldo.",
    en: "I used AI to support implementation. I defined the academic tracking rules and reviewed the course, calendar, and backup workflows.",
  },
} satisfies Project;

