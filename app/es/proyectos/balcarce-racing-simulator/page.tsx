import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";
import { balcarceProject as project } from "@/content/projects/balcarce";

export const metadata: Metadata = {
  title: project.title,
  description: project.summary.es,
  alternates: {
    canonical: project.path.es,
    languages: { "es-AR": project.path.es, en: project.path.en },
  },
};

export default function Page() {
  return <CaseStudy locale="es" slug={project.slug} />;
}
