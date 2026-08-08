import { copy } from "@/content/copy";
import { profile, projects, type Locale } from "@/content/portfolio";

export function CaseStudy({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const project = projects[0];
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joaquinoviedo.dev";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.summary[locale],
    applicationCategory: "AccessibilityApplication",
    operatingSystem: "Web",
    url: project.demo,
    author: { "@type": "Person", name: profile.name, url: base },
    inLanguage: locale,
  };
  return (
    <main className="case-page" id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav className="case-nav">
        <a href={`/${locale}`}>{profile.name}</a>
        <a href={`/${locale}#proyectos`}>← {t.back}</a>
      </nav>
      <article>
        <header className="case-hero">
          <p className="eyebrow">
            <span />
            {project.status[locale]} · {project.year}
          </p>
          <h1>{project.title}</h1>
          <p>{project.summary[locale]}</p>
          <div className="cta-row">
            {project.demo && (
              <a className="button primary" href={project.demo}>
                {t.demo} ↗
              </a>
            )}
            <a className="button secondary" href={`/${locale}#contacto`}>
              {t.contact} →
            </a>
          </div>
          {project.repositories && (
            <div className="case-repositories" aria-label={t.sourceCode}>
              <span>{t.sourceCode}</span>
              {project.repositories.map((repository) => (
                <a key={repository.url} href={repository.url} target="_blank" rel="noreferrer">
                  {repository.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>
        <div className="case-grid">
          <section>
            <p>01 /</p>
            <h2>{t.problem}</h2>
            <p>{project.problem[locale]}</p>
          </section>
          <section>
            <p>02 /</p>
            <h2>{t.solution}</h2>
            <p>
              {locale === "es"
                ? "Una plataforma web que integra digitalización, OCR, asignación de tareas, seguimiento y administración para coordinar el proceso completo."
                : "A web platform combining digitization, OCR, task assignment, tracking, and administration to coordinate the complete process."}
            </p>
          </section>
          <section>
            <p>03 /</p>
            <h2>{t.contribution}</h2>
            <p>{project.role[locale]}</p>
          </section>
          <section>
            <p>04 /</p>
            <h2>{t.technical}</h2>
            <ul>
              {project.features[locale].map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
          <section className="wide">
            <p>05 /</p>
            <h2>{t.outcome}</h2>
            <p>{project.learnings[locale]}</p>
            <ul className="tech-list">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
