import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Gestión financiera personal — Caso de estudio",
  description: "Herramienta local para presupuesto, fondo de emergencia, inversiones y evolución patrimonial.",
  alternates: {
    canonical: "/es/proyectos/finanzas-personales",
    languages: { "es-AR": "/es/proyectos/finanzas-personales", en: "/en/projects/personal-finance" },
  },
};

export default function Page() {
  return <CaseStudy locale="es" slug="finanzas-personales" />;
}
