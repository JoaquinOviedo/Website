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
    es: "Sistema colaborativo para hacer más accesible el material bibliográfico mediante digitalización y OCR.",
    en: "A collaborative system that makes bibliographic material more accessible through digitization and OCR.",
  },
  problem: {
    es: "Transformar material bibliográfico en contenidos accesibles requiere coordinar procesamiento, revisión humana y seguimiento.",
    en: "Turning bibliographic material into accessible content requires coordinated processing, human review, and status tracking.",
  },
  solution: {
    es: "Una plataforma web que integra digitalización, OCR, asignación de tareas, seguimiento y administración para coordinar el proceso completo.",
    en: "A web platform combining digitization, OCR, task assignment, tracking, and administration to coordinate the complete process.",
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
  demo: "https://wirinadapta.vercel.app",
  repositories: [
    { label: "Frontend", url: "https://github.com/lucasdbarrios/WIRIN-FrontEnd" },
    { label: "Landing", url: "https://github.com/thomasloader1/wirin-landing" },
  ],
  status: { es: "Proyecto académico", en: "Academic project" },
  learnings: {
    es: "Diseño de APIs, integración de OCR y coordinación de un flujo con distintos roles y estados.",
    en: "API design, OCR integration, and coordination of a workflow with multiple roles and states.",
  },
} satisfies Project;

