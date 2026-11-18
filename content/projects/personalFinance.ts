import type { Project } from "@/content/types";

export const personalFinanceProject = {
  slug: "finanzas-personales",
  path: { es: "/es/proyectos/finanzas-personales", en: "/en/projects/personal-finance" },
  featured: true,
  caseStudy: true,
  prototype: true,
  type: "personal",
  group: "personal-management",
  title: "Gestión financiera personal",
  year: "2026",
  summary: {
    es: "Presupuesto en pesos y dólares, fondos por objetivo y seguimiento de inversiones en una aplicación local.",
    en: "A local app for budgeting in pesos and dollars, saving toward specific goals, and tracking investments.",
  },
  problem: {
    es: "Necesitaba planificar gastos, separar ahorros por destino y entender cómo cambiaba mi patrimonio sin reunir todos los datos en un servicio externo.",
    en: "I needed to plan expenses, set aside savings for different purposes, and understand changes in my net worth while keeping my records on my device.",
  },
  solution: {
    es: "La aplicación reúne presupuesto, fondos, cartera e historial. Separa el aporte previsto del saldo real y usa la cotización del dólar MEP como referencia para comparar montos en distintas monedas.",
    en: "The app brings together budgets, savings funds, investments, and net-worth history. It keeps planned contributions separate from actual balances and uses Argentina’s MEP exchange rate to compare amounts across currencies.",
  },
  role: {
    es: "Definí los flujos de presupuesto, ahorro y seguimiento patrimonial a partir de necesidades de uso cotidiano.",
    en: "I designed the budgeting, saving, and net-worth workflows around everyday needs.",
  },
  features: {
    es: [
      "Presupuesto mensual en ARS y USD, con categorías y desglose de gastos.",
      "Fondos independientes para emergencia, vacaciones, compras y gastos planificados.",
      "Simulación de cobertura del fondo de emergencia y cálculo de la reserva mensual para gastos recurrentes.",
      "Cartera consolidada con importación de posiciones, movimientos e historial patrimonial.",
      "Evolución del patrimonio con registros semanales y estimaciones de dividendos a partir de datos de mercado.",
      "Persistencia local y respaldo restaurable en JSON.",
    ],
    en: [
      "Monthly budgets in ARS and USD, with expense categories and breakdowns.",
      "Separate funds for emergencies, vacations, purchases, and planned expenses.",
      "Emergency fund coverage simulator and monthly savings estimates for recurring expenses.",
      "Consolidated portfolio with imports for holdings, transactions, and net-worth history.",
      "Weekly net-worth snapshots and dividend estimates based on market data.",
      "Local storage and restorable JSON backups.",
    ],
  },
  technologies: ["React", "TypeScript", "Vite", "Zustand", "Tailwind CSS"],
  image: "/images/projects/finance/budget-sanitized.webp",
  repositories: [{ label: "GitHub", url: "https://github.com/JoaquinOviedo/App-de-Gestion-Financiera-Personal" }],
  status: { es: "Uso local", en: "Local app" },
  learnings: {
    es: "Separar presupuesto, saldos y valuación evita contar el mismo dinero dos veces. Las estimaciones de dividendos se muestran como referencias y tienen una lectura distinta a la del historial patrimonial.",
    en: "Keeping budgets, balances, and valuations separate prevents double counting. Dividend estimates are projections and are presented separately from net-worth records.",
  },
  aiAssisted: true,
  aiContribution: {
    es: "Usé IA para acelerar la implementación. Definí los flujos y sus reglas, revisé los cálculos y guié las correcciones a partir del uso de la aplicación.",
    en: "I used AI to speed up implementation. I defined the workflows and rules, reviewed the calculations, and guided fixes based on how the app worked in use.",
  },
} satisfies Project;

