import type { Metadata, Viewport } from "next";
import "./globals.css";
import { withBasePath } from "@/lib/basePath";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joaquinoviedo.dev";
const siteOrigin = new URL(siteUrl).origin;
const absoluteAsset = (path: string) => new URL(withBasePath(path), siteOrigin).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Joaquín Oviedo | Software Developer",
    template: "%s | Joaquín Oviedo",
  },
  description:
    "Desarrollador de software especializado en soluciones empresariales, backend y Power Platform.",
  icons: {
    apple: absoluteAsset("/images/joaquin-oviedo-icon.png"),
  },
  manifest: absoluteAsset("/manifest.webmanifest"),
  openGraph: {
    type: "website",
    siteName: "Joaquín Oviedo",
    images: [absoluteAsset("/og.png")],
  },
  twitter: { card: "summary_large_image", images: [absoluteAsset("/og.png")] },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#10251f",
};

const themeScript = `(function(){try{var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'||s==='system'?s:'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`;
const faviconScript = `(function(){var l=document.getElementById('adaptive-favicon');if(!l)return;var b='${withBasePath("/images/")}';var u=function(){l.href=b+'joaquin-oviedo-mark-'+(document.documentElement.dataset.theme==='dark'?'dark':'light')+'.svg'};u();new MutationObserver(u).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']})})()`;

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
        <link
          id="adaptive-favicon"
          rel="icon"
          type="image/svg+xml"
          href={withBasePath("/images/joaquin-oviedo-mark-light.svg")}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: faviconScript }} />
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
