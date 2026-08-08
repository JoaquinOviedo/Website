import type { Project } from "@/content/types";

export const wirinProject = {
  slug: "wirin",
  path: { es: "/es/proyectos/wirin", en: "/en/projects/wirin" },
  featured: true,
  caseStudy: true,
  type: "academic",
  title: "WIRIN",
  year: "2025",
  summary: {
    es: "Sistema colaborativo de accesibilidad bibliográfica que actualmente se encuentra en validación con la biblioteca de la UNLaM.",
    en: "A collaborative bibliographic accessibility system currently being validated with the UNLaM library.",
  },
  problem: {
    es: "Transformar material bibliográfico en contenidos accesibles requiere coordinar procesamiento, revisión humana y seguimiento.",
    en: "Turning bibliographic material into accessible content requires coordinated processing, human review, and status tracking.",
  },
  solution: {
    es: "Una plataforma web que integra digitalización, OCR, asignación de tareas, seguimiento y administración. El equipo está relevando su utilidad con personal bibliotecario antes de una posible implementación formal.",
    en: "A web platform combining digitization, OCR, task assignment, tracking, and administration. The team is validating its usefulness with library staff before a potential formal implementation.",
  },
  role: {
    es: "Trabajo en equipo. Mi contribución principal fue el backend: API, persistencia, autenticación e integración de servicios.",
    en: "Team project. My main contribution was the backend: API, persistence, authentication, and service integration.",
  },
  features: {
    es: ["Procesamiento OCR", "Asignación de tareas a voluntarios", "Seguimiento de estados", "Administración de usuarios"],
    en: ["OCR processing", "Volunteer task assignment", "Status tracking", "User administration"],
  },
  technologies: [".NET 8", "ASP.NET Core Web API", "Angular 17", "Entity Framework Core", "SQL Server", "PostgreSQL", "Azure", "JWT"],
  image: "/images/projects/wirin/dashboard-sanitized.webp",
  logo: "/images/projects/wirin/logo.webp",
  logoDark: "/images/projects/wirin/logo-dark.webp",
  demo: "https://wirinadapta.vercel.app",
  repositories: [
    { label: "Frontend", url: "https://github.com/lucasdbarrios/WIRIN-FrontEnd" },
    { label: "Landing", url: "https://github.com/thomasloader1/wirin-landing" },
  ],
  status: {
    es: "Académico · validación institucional",
    en: "Academic · institutional validation",
  },
  learnings: {
    es: "Diseño de APIs, integración de OCR y evolución de una solución académica hacia la validación con usuarios institucionales reales.",
    en: "API design, OCR integration, and evolving an academic solution toward validation with real institutional users.",
  },
} satisfies Project;
