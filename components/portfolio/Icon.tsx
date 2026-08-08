export type PortfolioIconName = "arrow" | "external" | "copy" | "mail";

export function Icon({ name }: { name: PortfolioIconName }) {
  const glyph: Record<PortfolioIconName, string> = {
    arrow: "→",
    external: "↗",
    copy: "⎘",
    mail: "@",
  };

  return <span aria-hidden="true">{glyph[name]}</span>;
}

