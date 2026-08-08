export type Locale = "es" | "en";
export type ProjectType = "professional" | "academic" | "personal";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  path: Record<Locale, string>;
  featured: boolean;
  caseStudy?: boolean;
  type: ProjectType;
  title: string;
  summary: Record<Locale, string>;
  problem: Record<Locale, string>;
  solution: Record<Locale, string>;
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

const publicEmailParts = ["joaquin.oviedo.fernandez", "gmail.com"] as const;

export function getPublicEmail() {
  return `${publicEmailParts[0]}@${publicEmailParts[1]}`;
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
    image: "/images/projects/wirin/dashboard-sanitized.webp",
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
    path: { es: "/es/proyectos/finanzas-personales", en: "/en/projects/personal-finance" },
    featured: true,
    caseStudy: true,
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
    solution: {
      es: "Una herramienta local que reúne presupuesto, fondo de emergencia, inversiones e historial patrimonial en un único flujo, manteniendo el control de los datos en el dispositivo.",
      en: "A local tool that brings budgets, emergency funds, investments, and net-worth history into one flow while keeping control of the data on the device.",
    },
    role: {
      es: "Definí el problema, el alcance y las funciones necesarias para convertir necesidades financieras reales en una herramienta local de uso cotidiano.",
      en: "I defined the problem, scope, and necessary features to turn real financial needs into a practical local tool.",
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
    image: "/images/projects/finance/budget-sanitized.webp",
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
      es: "Usé IA para acelerar la implementación. Mi aporte estuvo en definir el producto, decidir qué funciones aportaban valor, revisar el comportamiento, detectar fallos y guiar iteraciones hasta obtener una aplicación funcional.",
      en: "I used AI to accelerate implementation. My contribution was defining the product, deciding which features added value, reviewing behavior, finding issues, and guiding iterations toward a functional application.",
    },
  },
  {
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
    image: "/images/projects/career/dashboard-sanitized.webp",
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
      es: "Usé IA para acelerar la implementación. Mi aporte estuvo en transformar una necesidad propia en producto, seleccionar funciones, evaluar su utilidad, detectar problemas y dirigir sucesivas mejoras.",
      en: "I used AI to accelerate implementation. My contribution was turning a personal need into a product, selecting features, evaluating their usefulness, finding problems, and directing successive improvements.",
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
