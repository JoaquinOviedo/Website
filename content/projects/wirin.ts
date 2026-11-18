import type { Project } from "@/content/types";

export const wirinProject = {
  slug: "wirin",
  path: { es: "/es/proyectos/wirin", en: "/en/projects/wirin" },
  featured: true,
  caseStudy: true,
  prototype: true,
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
    es: "Una plataforma web que organiza la asignación de tareas, el seguimiento y la administración del proceso de accesibilidad bibliográfica. El equipo está validando su utilidad con personal bibliotecario como paso previo a su implementación en la biblioteca de la UNLaM.",
    en: "A web platform for assigning tasks, tracking progress, and managing the bibliographic accessibility workflow. The team is validating its usefulness with library staff before its implementation at UNLaM's library.",
  },
  role: {
    es: "En el equipo, mi aporte principal fue el backend. Desarrollé la API, trabajé en la persistencia de datos y me encargué del despliegue en Azure.",
    en: "My main contribution to the team was the backend. I developed the API, worked on data persistence, and handled deployment on Azure.",
  },
  features: {
    es: ["Asignación de tareas a voluntarios", "Seguimiento de estados", "Administración de usuarios"],
    en: ["Volunteer task assignment", "Status tracking", "User administration"],
  },
  technologies: [".NET 8", "ASP.NET Core Web API", "Angular 17", "Entity Framework Core", "SQL Server", "PostgreSQL", "Azure"],
  image: "/images/projects/wirin/dashboard-sanitized.webp",
  logo: "/images/projects/wirin/logo.webp",
  logoDark: "/images/projects/wirin/logo-dark.webp",
  demo: "https://wirinadapta.vercel.app",
  repositories: [
    { label: "Frontend", url: "https://github.com/lucasdbarrios/WIRIN-FrontEnd" },
    { label: "Landing", url: "https://github.com/thomasloader1/wirin-landing" },
  ],
  status: {
    es: "Académico · Validación institucional en curso",
    en: "Academic · Institutional validation in progress",
  },
  learnings: {
    es: "Diseño de APIs, despliegue en Azure y validación de una solución académica con personal de biblioteca.",
    en: "API design, deployment on Azure, and validation of an academic project with library staff.",
  },
} satisfies Project;
