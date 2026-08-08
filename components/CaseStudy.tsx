import { copy } from "@/content/copy";
import { profile, projects, type Locale } from "@/content/portfolio";
import { ProjectGallery, type GallerySlug } from "@/components/ProjectGallery";
import { ProjectPrototype } from "@/components/ProjectPrototype";
import { ThemeControl } from "@/components/ThemeControl";
import { withBasePath } from "@/lib/basePath";
import { technologyKey } from "@/lib/technology";

export function CaseStudy({ locale, slug }: { locale: Locale; slug: GallerySlug }) {
  const t = copy[locale];
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://joaquinoviedo.dev";
  const localizedPath = project.path[locale];
  const otherLocale = locale === "es" ? "en" : "es";
  const detailLabel = project.type === "academic" ? t.caseStudyLabel : t.projectDetailsLabel;
  const hasContribution = project.type !== "personal";
  const sectionNumbers = hasContribution
    ? { outcome: "03", stack: "04", evidence: "05", prototype: "06" }
    : { outcome: "02", stack: "03", evidence: "04", prototype: "05" };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.summary[locale],
    applicationCategory: project.type === "academic" ? "EducationalApplication" : "ProductivityApplication",
    operatingSystem: "Web",
    url: project.demo ?? `${base}${localizedPath}`,
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
        <a href={withBasePath(`/${locale}`)}>{profile.name}</a>
        <div>
          <ThemeControl locale={locale} compact />
          <a href={withBasePath(project.path[otherLocale])} hrefLang={otherLocale}>{otherLocale.toUpperCase()}</a>
          <a href={`${withBasePath(`/${locale}`)}#proyectos`}>← {t.back}</a>
        </div>
      </nav>
      <article className={`case-article case-${project.slug}`}>
        <header className="case-hero">
          {project.logo && (
            <span className="case-project-logo">
              <img className="logo-light" src={withBasePath(project.logo)} alt="" width="512" height="437" />
              {project.logoDark && <img className="logo-dark" src={withBasePath(project.logoDark)} alt="" width="512" height="437" />}
            </span>
          )}
          <p className="eyebrow">
            <span />
            {detailLabel} · {project.status[locale]}{project.year ? ` · ${project.year}` : ""}
          </p>
          <h1 className={project.logo ? "sr-only" : undefined}>{project.title}</h1>
          <p>{project.summary[locale]}</p>
          <div className="cta-row">
            {project.demo && (
              <a className="button primary" href={project.demo} target="_blank" rel="noreferrer">
                {t.demo} ↗
              </a>
            )}
            <a className="button secondary" href={`${withBasePath(`/${locale}`)}#contacto`}>
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
        <div className={`case-grid${hasContribution ? "" : " personal-project"}`}>
          <section>
            <p>01 /</p>
            <h2>{t.problem}</h2>
            <p>{project.problem[locale]}</p>
          </section>
          {hasContribution && (
            <section>
              <p>02 /</p>
              <h2>{t.contribution}</h2>
              <p>{project.role[locale]}</p>
            </section>
          )}
          <section>
            <p>{sectionNumbers.outcome} /</p>
            <h2>{t.outcome}</h2>
            <p>{project.learnings[locale]}</p>
          </section>
          <section className="wide case-stack">
            <div>
              <p>{sectionNumbers.stack} /</p>
              <h2>{t.stackAndProcess}</h2>
            </div>
            <ul className="tech-list">
              {project.technologies.map((tech, index) => (
                <li className={index < 2 ? "primary-tech" : undefined} data-tech={technologyKey(tech)} key={tech}>{tech}</li>
              ))}
              {project.aiAssisted && <li className="ai-tech">{t.ai}</li>}
            </ul>
          </section>
        </div>
        <section className="case-evidence" aria-labelledby="case-evidence-title">
          <header>
            <p>{sectionNumbers.evidence} /</p>
            <h2 id="case-evidence-title">{t.evidence}</h2>
          </header>
          <ProjectGallery slug={slug} locale={locale} />
        </section>
        <section className="case-prototype" aria-labelledby="case-prototype-title">
          <header>
            <div>
              <p>{sectionNumbers.prototype} /</p>
              <h2 id="case-prototype-title">{t.prototypeTitle}</h2>
            </div>
            <p>{t.prototypeLead}</p>
          </header>
          <details className="prototype-disclosure">
            <summary>{t.explorePrototype} <span className="disclosure-chevron" aria-hidden="true" /></summary>
            <div className="prototype-disclosure-content">
              <ProjectPrototype slug={slug} locale={locale} />
            </div>
          </details>
        </section>
      </article>
    </main>
  );
}
