"use client";

import { useEffect, useSyncExternalStore } from "react";
import { copy } from "@/content/copy";
import type { Locale } from "@/content/portfolio";

type Theme = "system" | "light" | "dark";
const DEFAULT_THEME: Theme = "system";

function getThemePreference(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
    ? storedTheme
    : DEFAULT_THEME;
}

function subscribeThemePreference(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("portfolio-theme", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("portfolio-theme", onChange);
  };
}

export function ThemeControl({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy[locale];
  const theme = useSyncExternalStore(
    subscribeThemePreference,
    getThemePreference,
    () => DEFAULT_THEME,
  );

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateDocumentTheme = () => {
      const dark = theme === "dark" || (theme === "system" && media.matches);
      document.documentElement.dataset.theme = dark ? "dark" : "light";
      document.documentElement.style.colorScheme = dark ? "dark" : "light";
    };
    updateDocumentTheme();
    if (theme === "system") media.addEventListener("change", updateDocumentTheme);
    return () => media.removeEventListener("change", updateDocumentTheme);
  }, [theme]);

  function applyTheme(next: Theme) {
    localStorage.setItem("theme", next);
    window.dispatchEvent(new Event("portfolio-theme"));
  }

  return (
    <div className={`theme-control${compact ? " compact" : ""}`} role="group" aria-label={t.theme} suppressHydrationWarning>
      {(["light", "system", "dark"] as Theme[]).map((option) => {
        const copyIndex = { system: 0, light: 1, dark: 2 }[option];
        const icon = { light: "☀", system: "◐", dark: "☾" }[option];
        return (
          <button
            key={option}
            type="button"
            className={theme === option ? "active" : ""}
            aria-label={t.themes[copyIndex]}
            aria-pressed={theme === option}
            title={t.themes[copyIndex]}
            onClick={() => applyTheme(option)}
          >
            <span aria-hidden="true">{icon}</span>
          </button>
        );
      })}
    </div>
  );
}
