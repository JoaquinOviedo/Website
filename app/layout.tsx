import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joaquinoviedo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Joaquín Oviedo | Software Developer",
    template: "%s | Joaquín Oviedo",
  },
  description:
    "Desarrollador de software especializado en soluciones empresariales, backend y Power Platform.",
  icons: {
    icon: "/images/joaquin-oviedo.png",
    apple: "/images/joaquin-oviedo.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "Joaquín Oviedo",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#10251f",
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Joaquín Nicolás Oviedo",
        url: siteUrl,
        email: "mailto:joaquin.oviedo.fernandez@gmail.com",
        homeLocation: { "@type": "Country", name: "Argentina" },
        sameAs: [
          "https://www.linkedin.com/in/joaquin-oviedo/",
          "https://github.com/JoaquinOviedo",
        ],
        knowsAbout: [
          "Power Platform",
          "Backend development",
          ".NET",
          "React",
          "TypeScript",
          "Enterprise software",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Joaquín Oviedo — Software Developer",
        inLanguage: ["es", "en"],
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN ? (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </body>
    </html>
  );
}
