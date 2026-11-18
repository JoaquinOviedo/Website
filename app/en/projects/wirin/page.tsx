import type { Metadata } from "next"; import { CaseStudy } from "@/components/CaseStudy";
export const metadata: Metadata = { title: "WIRIN — Case study", description: "Bibliographic accessibility system built with .NET 8 and Angular 17 and deployed on Azure. The team is validating it with the UNLaM library.", alternates: { canonical: "/en/projects/wirin", languages: { "es-AR": "/es/proyectos/wirin", en: "/en/projects/wirin" } } };
export default function Page(){ return <CaseStudy locale="en" slug="wirin" />; }
