import type { Metadata } from "next"; import { CaseStudy } from "@/components/CaseStudy";
export const metadata: Metadata = { title: "WIRIN — Caso de estudio", description: "Sistema de accesibilidad bibliográfica con .NET 8, Angular 17 y Azure OCR, en validación institucional con la biblioteca de la UNLaM.", alternates: { canonical: "/es/proyectos/wirin", languages: { "es-AR": "/es/proyectos/wirin", en: "/en/projects/wirin" } } };
export default function Page(){ return <CaseStudy locale="es" slug="wirin" />; }
