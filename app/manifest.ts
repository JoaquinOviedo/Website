import type { MetadataRoute } from "next";
import { withBasePath } from "@/lib/basePath";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Joaquín Oviedo — Software Developer",
    short_name: "Joaquín Oviedo",
    description: "Portfolio profesional bilingüe de Joaquín Oviedo.",
    start_url: withBasePath("/es"),
    display: "standalone",
    background_color: "#f3f1ea",
    theme_color: "#153c32",
    icons: [
      {
        src: withBasePath("/images/joaquin-oviedo.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
