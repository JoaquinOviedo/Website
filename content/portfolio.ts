export type Locale = "es" | "en";
export type ProjectType = "professional" | "academic" | "personal";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  featured: boolean;
  caseStudy?: boolean;
  type: ProjectType;
  title: string;
  summary: Record<Locale, string>;
  problem: Record<Locale, string>;
  role: Record<Locale, string>;
  features: Record<Locale, string[]>;
  technologies: string[];
  image?: string;
  demo?: string;
  repositories?: ProjectLink[];
  status: Record<Locale, string>;
  year?: string;
  learnings: Record<Locale, string>;
  aiAssisted?: boolean;
  aiContribution?: Record<Locale, string>;
}

export const profile = {
  name: "Joaquín Nicolás Oviedo",
  location: "Argentina",
  role: {
    es: "Supervisor de Desarrollo y Desarrollador Power Platform",
    en: "Development Supervisor & Power Platform Developer",
  },
  availability: {
    es: "Actualmente trabajando · abierto a nuevas oportunidades",
    en: "Currently employed · open to new opportunities",
  },
  email: "joaquin.oviedo.fernandez@gmail.com",
  linkedin: "https://www.linkedin.com/in/joaquin-oviedo/",
  github: "https://github.com/JoaquinOviedo",
  photo: "/images/joaquin-oviedo.png",
  cv: {
    es: "/cv/joaquin-oviedo-es.pdf",
    en: "/cv/joaquin-oviedo-en.pdf",
  },
  cvUpdated: { es: "2026-08-08", en: "2026-08-08" },
} as const;

export const projects: Project[] = [
  {
    slug: "wirin",
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
    role: {
      es: "Trabajo en equipo. Mi contribución principal fue el backend: API, persistencia, autenticación e integración de servicios.",
      en: "Team project. My main contribution was the backend: API, persistence, authentication, and service integration.",
    },
    features: {
      es: [
        "Procesamiento OCR",
        "Asignación de tareas a voluntarios",
        "Seguimiento de estados",
        "Administración de usuarios",
      ],
      en: [
        "OCR processing",
        "Volunteer task assignment",
        "Status tracking",
        "User administration",
      ],
    },
    technologies: [
      ".NET 8",
      "ASP.NET Core Web API",
      "Angular 17",
      "Entity Framework Core",
      "SQL Server",
      "PostgreSQL",
      "Azure",
      "JWT",
    ],
    image: "/images/projects/wirin-landing.jpg",
    demo: "https://wirinadapta.vercel.app",
    repositories: [
      {
        label: "Frontend",
        url: "https://github.com/lucasdbarrios/WIRIN-FrontEnd",
      },
      {
        label: "Landing",
        url: "https://github.com/thomasloader1/wirin-landing",
      },
    ],
    status: { es: "Proyecto académico", en: "Academic project" },
    learnings: {
      es: "Diseño de APIs, integración de OCR y coordinación de un flujo con distintos roles y estados.",
      en: "API design, OCR integration, and coordination of a workflow with multiple roles and states.",
    },
  },
  {
    slug: "finanzas-personales",
    featured: true,
    type: "personal",
    title: "Gestión financiera personal",
    year: "2026",
    summary: {
      es: "Aplicación local para centralizar presupuesto, fondo de emergencia, inversiones y evolución patrimonial.",
      en: "A local application for managing budgets, emergency funds, investments, and net-worth evolution.",
    },
    problem: {
      es: "Reunir información financiera personal dispersa sin trasladar los datos completos a un servicio externo.",
      en: "Consolidating scattered personal financial information without moving complete data to an external service.",
    },
    role: {
      es: "Proyecto personal de uso local desarrollado con asistencia de IA.",
      en: "Personal local-use project built with AI assistance.",
    },
    features: {
      es: [
        "Presupuesto en ARS y USD",
        "Seguimiento de inversiones",
        "Importación y exportación JSON",
        "Persistencia local",
      ],
      en: [
        "ARS and USD budgeting",
        "Investment tracking",
        "JSON import and export",
        "Local persistence",
      ],
    },
    technologies: ["React", "TypeScript", "Vite", "Zustand", "Tailwind CSS"],
    repositories: [
      {
        label: "GitHub",
        url: "https://github.com/JoaquinOviedo/App-de-Gestion-Financiera-Personal",
      },
    ],
    status: { es: "Proyecto personal · uso local", en: "Personal project · local use" },
    learnings: {
      es: "Modelado de información financiera, privacidad local y consolidación de datos de distintas fuentes.",
      en: "Financial information modeling, local privacy, and consolidation of data from multiple sources.",
    },
    aiAssisted: true,
    aiContribution: {
      es: "La IA asistió el desarrollo de esta herramienta de uso personal.",
      en: "AI assisted the development of this personal-use tool.",
    },
  },
  {
    slug: "mi-carrera-tech",
    featured: true,
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
    role: {
      es: "Proyecto personal de uso local desarrollado con asistencia de IA.",
      en: "Personal local-use project built with AI assistance.",
    },
    features: {
      es: [
        "Dashboard de progreso",
        "Plan de estudios interactivo",
        "Calendario de exámenes",
        "Persistencia local en JSON",
      ],
      en: [
        "Progress dashboard",
        "Interactive curriculum",
        "Exam calendar",
        "Local JSON persistence",
      ],
    },
    technologies: ["React", "TypeScript", "Vite", "Node.js", "Express"],
    repositories: [
      {
        label: "GitHub",
        url: "https://github.com/JoaquinOviedo/App-de-Gestion-personal-para-Licenciatura-en-Gestion-de-Tecnologia-Unlam",
      },
    ],
    status: { es: "Proyecto personal · uso local", en: "Personal project · local use" },
    learnings: {
      es: "Diseño de una herramienta enfocada, persistencia local y modelado de correlatividades académicas.",
      en: "Focused product design, local persistence, and modeling of academic prerequisites.",
    },
    aiAssisted: true,
    aiContribution: {
      es: "La IA asistió el desarrollo; la herramienta responde a necesidades reales de seguimiento de la carrera.",
      en: "AI assisted development; the tool addresses real degree-tracking needs.",
    },
  },
];

export const pendingContent = {
  public: false,
  items: [
    "Confirmar denominación contractual exacta del rol actual si difiere de Supervisor de Desarrollo.",
    "Precisar fecha, institución y tema de la charla organizada desde CEDIT.",
    "Confirmar o publicar el repositorio de la API de WIRIN: el enlace provisto no es accesible públicamente.",
    "Agregar capturas propias de los proyectos personales cuando estén disponibles.",
    "Reemplazar el dominio de GitHub Pages al adquirir joaquinoviedo.com o joaquinoviedo.com.ar.",
  ],
};
