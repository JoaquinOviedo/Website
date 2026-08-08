import type { Metadata } from "next";
import { Portfolio } from "@/components/Portfolio";
export const metadata: Metadata = { title: { absolute: "Joaquín Oviedo · Software Developer" }, description: "Portfolio de Joaquín Oviedo: Power Platform, backend .NET, React y gestión de soluciones empresariales.", alternates: { canonical: "/es", languages: { "es-AR": "/es", en: "/en" } }, openGraph: { locale: "es_AR" } };
export default function Page() { return <Portfolio locale="es" />; }
