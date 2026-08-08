import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Mi Carrera Tech — Caso de estudio",
  description: "Herramienta local para seguir materias, exámenes, notas y correlatividades universitarias.",
  alternates: {
    canonical: "/es/proyectos/mi-carrera-tech",
    languages: { "es-AR": "/es/proyectos/mi-carrera-tech", en: "/en/projects/my-tech-degree" },
  },
};

export default function Page() {
  return <CaseStudy locale="es" slug="mi-carrera-tech" />;
}
