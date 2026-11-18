import type { Project } from "@/content/types";

export const miEspacioProject = {
  slug: "mi-espacio",
  path: { es: "/es/proyectos/mi-espacio", en: "/en/projects/mi-espacio" },
  featured: true,
  caseStudy: true,
  type: "personal",
  group: "personal-management",
  title: "Mi espacio",
  summary: {
    es: "Planificador para Windows que conecta tareas, rutinas y calendario con objetivos a largo plazo.",
    en: "A Windows planner that connects tasks, routines, and the calendar with long-term goals.",
  },
  problem: {
    es: "Ideas, tareas y compromisos viven en lugares distintos. Eso dificulta estimar cuánto tiempo queda disponible y decidir qué conviene hacer ahora.",
    en: "Ideas, tasks, and commitments live in different places, making it hard to estimate available time and decide what to do next.",
  },
  solution: {
    es: "Mi espacio reúne el registro diario y la planificación. Las ideas pueden convertirse en decisiones y tareas. El calendario organiza fechas concretas y la semana habitual sirve de referencia para estimar disponibilidad.",
    en: "Mi espacio brings together daily logging and planning. Ideas can become decisions and tasks. The calendar handles specific dates, while a typical week provides a baseline for estimating availability.",
  },
  role: {
    es: "Definí los flujos de planificación, las reglas del calendario y los límites de las conexiones entre aplicaciones.",
    en: "I defined the planning workflows, calendar rules, and boundaries between connected apps.",
  },
  features: {
    es: [
      "Captura rápida de ideas, intereses, decisiones y compras, con seguimiento de tareas y rutinas.",
      "Calendario con planificación por arrastre y estimación de tiempo disponible.",
      "Integraciones locales de solo lectura con Mi Carrera Tech y Gestión financiera personal.",
      "Módulo Futuro para planificar destinos y metas, y comparar escenarios de gastos, ahorro y tiempo disponible.",
      "Base SQLite local con respaldo y restauración.",
    ],
    en: [
      "Quick capture for ideas, interests, decisions, and purchases, with task and routine tracking.",
      "Drag-and-drop scheduling and estimates of available time.",
      "Read-only local integrations with Mi Carrera Tech and the personal finance app.",
      "A Future module for planning destinations and goals and comparing expenses, savings, and available time.",
      "Local SQLite database with backup and restore.",
    ],
  },
  technologies: ["React", "TypeScript", "Node.js", "SQLite", "Vite"],
  status: { es: "Aplicación local para Windows", en: "Local Windows app" },
  learnings: {
    es: "Separar la semana habitual del calendario real permite comparar disponibilidad estimada con compromisos concretos. Los escenarios usan valores de referencia actuales para ayudar a decidir.",
    en: "Separating a typical week from the live calendar makes it possible to compare estimated availability with actual commitments. Scenarios use current figures as a baseline for decisions.",
  },
  aiAssisted: true,
  aiContribution: {
    es: "Usé IA para iterar sobre el diseño y la implementación. Definí prioridades, flujos y supuestos de cálculo, y revisé cómo se reflejaban en el producto.",
    en: "I used AI to iterate on the design and implementation. I set priorities, defined workflows and calculation assumptions, and reviewed how they worked in the product.",
  },
} satisfies Project;
