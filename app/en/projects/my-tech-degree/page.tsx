import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";

export const metadata: Metadata = {
  title: "My Tech Degree — Case study",
  description: "A local tool for tracking university courses, exams, grades, and prerequisites.",
  alternates: {
    canonical: "/en/projects/my-tech-degree",
    languages: { "es-AR": "/es/proyectos/mi-carrera-tech", en: "/en/projects/my-tech-degree" },
  },
};

export default function Page() {
  return <CaseStudy locale="en" slug="mi-carrera-tech" />;
}
