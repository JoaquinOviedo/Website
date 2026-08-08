import type { Metadata } from "next";
import { Portfolio } from "@/components/Portfolio";
export const metadata: Metadata = { title: "Software developer and enterprise solutions", description: "Joaquín Oviedo's portfolio: Power Platform, .NET backend, React, and enterprise solution management.", alternates: { canonical: "/en", languages: { "es-AR": "/es", en: "/en" } }, openGraph: { locale: "en_US" } };
export default function Page() { return <Portfolio locale="en" />; }
