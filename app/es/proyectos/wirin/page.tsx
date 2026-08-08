import type { Metadata } from "next"; import { CaseStudy } from "@/components/CaseStudy";
export const metadata: Metadata = { title: "WIRIN — Caso de estudio", description: "Sistema académico de accesibilidad bibliográfica con .NET 8, Angular 17 y OCR de Azure.", alternates: { canonical: "/es/proyectos/wirin", languages: { "es-AR": "/es/proyectos/wirin", en: "/en/projects/wirin" } } };
export default function Page(){ return <CaseStudy locale="es" slug="wirin" />; }
