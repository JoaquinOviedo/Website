"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/basePath";

type Locale = "es" | "en";

function getInitialLocale(): Locale {
  const storedLocale = localStorage.getItem("locale");
  if (storedLocale === "es" || storedLocale === "en") return storedLocale;

  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  return browserLanguages.some((language) => language.toLowerCase().startsWith("es"))
    ? "es"
    : "en";
}

export function BrowserLanguageRedirect() {
  useEffect(() => {
    const locale = getInitialLocale();
    window.location.replace(
      `${withBasePath(`/${locale}`)}${window.location.search}${window.location.hash}`,
    );
  }, []);

  return null;
}
