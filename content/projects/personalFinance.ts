import type { Project } from "@/content/types";

export const personalFinanceProject = {
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
    es: ["Presupuesto en ARS y USD", "Seguimiento de inversiones", "Importación y exportación JSON", "Persistencia local"],
    en: ["ARS and USD budgeting", "Investment tracking", "JSON import and export", "Local persistence"],
  },
  technologies: ["React", "TypeScript", "Vite", "Zustand", "Tailwind CSS"],
  image: "/images/projects/finance/budget-sanitized.webp",
  repositories: [{ label: "GitHub", url: "https://github.com/JoaquinOviedo/App-de-Gestion-Financiera-Personal" }],
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
} satisfies Project;

