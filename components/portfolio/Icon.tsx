export type PortfolioIconName = "arrow" | "external" | "copy" | "mail" | "linkedin" | "github";

export function Icon({ name }: { name: PortfolioIconName }) {
  if (name === "linkedin" || name === "github") {
    const path = name === "linkedin"
      ? "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.1 20.45H3.54V9H7.1v11.45Z"
      : "M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.05 0 0 .96-.31 3.16 1.18a10.93 10.93 0 0 1 5.75 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.12 3.05.73.81 1.17 1.83 1.17 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z";

    return (
      <svg className="brand-icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false">
        <path fill="currentColor" d={path} />
      </svg>
    );
  }

  const glyph: Record<Exclude<PortfolioIconName, "linkedin" | "github">, string> = {
    arrow: "→",
    external: "↗",
    copy: "⎘",
    mail: "@",
  };

  return <span aria-hidden="true">{glyph[name]}</span>;
}
