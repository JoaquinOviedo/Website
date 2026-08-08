import {
  Apps24Regular,
  Cloud24Regular,
  Code24Regular,
  Database24Regular,
} from "@fluentui/react-icons";
import { copy } from "@/content/copy";
import type { Locale } from "@/content/portfolio";

const focusIcons = [
  Apps24Regular,
  Code24Regular,
  Database24Regular,
  Cloud24Regular,
] as const;

export function FocusSection({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="focus section focus-compact" aria-labelledby="focus-title">
      <header className="section-heading">
        <p>01 /</p>
        <h2 id="focus-title">{t.focus}</h2>
      </header>
      <div className="focus-grid">
        {t.focusItems.map(([title, text, technologies], index) => {
          const FocusIcon = focusIcons[index] ?? Apps24Regular;

          return (
            <article key={title}>
              <FocusIcon className="focus-icon" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="focus-tech-list" aria-label={title}>
                {technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
