import type { Localized } from "./types";

export interface ProjectMediaItem extends Localized<string> {
  src: string;
}

export const projectMedia = {
  "finanzas-personales": [
    { src: "/images/projects/finance/budget-sanitized.webp", es: "Vista de presupuesto y distribución financiera con datos anonimizados.", en: "Budget and financial allocation view with anonymized data." },
    { src: "/images/projects/finance/evolution-sanitized.webp", es: "Vista de evolución patrimonial sin cifras ni fechas reales.", en: "Portfolio evolution view without real figures or dates." },
    { src: "/images/projects/finance/investments-sanitized.webp", es: "Vista de inversiones con activos, cotizaciones y resultados anonimizados.", en: "Investments view with anonymized assets, prices, and returns." },
    { src: "/images/projects/finance/history-sanitized.webp", es: "Historial patrimonial preparado sin fechas, notas ni valores reales.", en: "Portfolio history prepared without real dates, notes, or values." },
  ],
  wirin: [
    { src: "/images/projects/wirin/dashboard-sanitized.webp", es: "Panel bibliográfico de WIRIN con registros completamente anonimizados.", en: "WIRIN bibliography dashboard with fully anonymized records." },
    { src: "/images/projects/wirin/tasks-sanitized.webp", es: "Gestión de tareas de WIRIN con contenido ficticio de demostración.", en: "WIRIN task management with fictional demonstration content." },
    { src: "/images/projects/wirin/users-sanitized.webp", es: "Gestión de usuarios con identidades completamente ficticias.", en: "User management with entirely fictional identities." },
    { src: "/images/projects/wirin/statistics-sanitized.webp", es: "Panel estadístico sin métricas ni registros reales.", en: "Statistics dashboard without real metrics or records." },
    { src: "/images/projects/wirin/ranking-sanitized.webp", es: "Ranking de voluntariado con nombres y resultados neutralizados.", en: "Volunteer ranking with neutralized names and results." },
    { src: "/images/projects/wirin/bibliographies-sanitized.webp", es: "Gestión bibliográfica sin títulos, estudiantes ni fechas reales.", en: "Bibliography management without real titles, students, or dates." },
  ],
  "mi-carrera-tech": [
    { src: "/images/projects/career/dashboard-sanitized.webp", es: "Resumen académico con progreso, notas y exámenes neutralizados.", en: "Academic overview with neutralized progress, grades, and exams." },
    { src: "/images/projects/career/study-plan-sanitized.webp", es: "Plan de estudios con materias y estados ficticios.", en: "Study plan with fictional courses and statuses." },
    { src: "/images/projects/career/calendar-sanitized.webp", es: "Calendario académico sin fechas ni eventos reales.", en: "Academic calendar without real dates or events." },
    { src: "/images/projects/career/data-sanitized.webp", es: "Gestión de datos locales sin rutas ni registros privados.", en: "Local data management without private paths or records." },
  ],
} as const satisfies Record<string, readonly ProjectMediaItem[]>;

export type GallerySlug = keyof typeof projectMedia;
