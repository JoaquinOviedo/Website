import type { Metadata } from "next";
import { CaseStudy } from "@/components/CaseStudy";
import { photoSwipperFilterProject as project } from "@/content/projects/photoSwipperFilter";

export const metadata: Metadata = {
  title: project.title,
  description: project.summary.en,
  alternates: {
    canonical: project.path.en,
    languages: { "es-AR": project.path.es, en: project.path.en },
  },
};

export default function Page() {
  return <CaseStudy locale="en" slug={project.slug} />;
}
