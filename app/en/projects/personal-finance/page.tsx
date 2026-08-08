import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "Personal finance management — Case study",
  description: "A local tool for budgeting, emergency funds, investments, and net-worth evolution.",
  alternates: {
    canonical: "/en/projects/personal-finance",
    languages: { "es-AR": "/es/proyectos/finanzas-personales", en: "/en/projects/personal-finance" },
  },
};

export default function Page() {
  return <CaseStudy locale="en" slug="finanzas-personales" />;
}
