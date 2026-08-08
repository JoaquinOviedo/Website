import type { Metadata } from "next"; import { CaseStudy } from "@/components/CaseStudy";
export const metadata: Metadata = { title: "WIRIN — Case study", description: "Bibliographic accessibility system built with .NET 8, Angular 17, and Azure OCR, now in institutional validation with the UNLaM library.", alternates: { canonical: "/en/projects/wirin", languages: { "es-AR": "/es/proyectos/wirin", en: "/en/projects/wirin" } } };
export default function Page(){ return <CaseStudy locale="en" slug="wirin" />; }
