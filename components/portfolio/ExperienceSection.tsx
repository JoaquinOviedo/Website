import { FrameworkPrototype } from "@/components/FrameworkPrototype";
import { copy } from "@/content/copy";
import type { Locale } from "@/content/portfolio";
import { technologyKey } from "@/lib/technology";

const experienceTechnologies = [
  "Power Apps",
  "Dataverse",
  "SharePoint",
  "Power Automate",
  "Azure DevOps",
  "Test & Feedback",
  "Git",
] as const;
const primaryExperienceTechnologies = new Set(["Power Apps", "Dataverse", "SharePoint"]);

export function ExperienceSection({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="experience section" id="experiencia" aria-labelledby="experience-title">
      <header className="section-heading split">
        <div>
          <p>02 /</p>
          <h2 id="experience-title">{t.experience}</h2>
        </div>
        <p>{t.experienceLead}</p>
      </header>
      <article className="timeline">
        <div className="timeline-period">{t.current}</div>
        <div className="timeline-content">
          <p className="company">{t.company}</p>
          <h3>{t.role}</h3>
          <p className="summary">{t.expSummary}</p>
          <ul className="contributions">
            {t.expBullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <ul className="tech-list">
            {experienceTechnologies.map((technology) => (
              <li className={primaryExperienceTechnologies.has(technology) ? "primary-tech" : undefined} data-tech={technologyKey(technology)} key={technology}>
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </article>
      <details className="framework-disclosure">
        <summary>
          <span>
            <small>{t.frameworkEyebrow}</small>
            <strong>{t.frameworkTitle}</strong>
            <i>{t.frameworkText}</i>
          </span>
          <b>
            {t.explorePrototype}
            <span className="disclosure-chevron" aria-hidden="true" />
          </b>
        </summary>
        <aside className="framework-showcase" aria-label={t.frameworkEyebrow}>
          <FrameworkPrototype locale={locale} />
          <p className="framework-caption">{t.frameworkCaption}</p>
        </aside>
      </details>
    </section>
  );
}
