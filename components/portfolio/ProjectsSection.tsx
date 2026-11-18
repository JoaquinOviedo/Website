import { Icon } from "./Icon";
import { copy } from "@/content/copy";
import { projects, type Locale, type Project } from "@/content/portfolio";
import { withBasePath } from "@/lib/basePath";
import { technologyKey } from "@/lib/technology";

export function ProjectsSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const featured = projects.filter((project) => project.featured);
  const personalTools = featured.filter((project) => project.group === "personal-management");

  return (
    <section className="projects section" id="proyectos" aria-labelledby="projects-title">
      <header className="section-heading split">
        <div>
          <p>03 /</p>
          <h2 id="projects-title">{t.projects}</h2>
        </div>
        <p>{t.projectsLead}</p>
      </header>
      {featured.filter((project) => project.group !== "personal-management").map((project) => (
        <FeaturedProject key={project.slug} project={project} locale={locale} />
      ))}
      <section className="personal-projects" aria-labelledby="personal-projects-title">
        <header>
          <h3 id="personal-projects-title">{t.personalProjects}</h3>
          <p>{t.personalProjectsLead}</p>
        </header>
        <div className="personal-projects-grid">
          {personalTools.map((project) => (
            <article className="personal-tool-card" key={project.slug}>
              <h4><a href={withBasePath(project.path[locale])}>{project.title}</a></h4>
              <p>{project.summary[locale]}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function FeaturedProject({ project, locale }: { project: Project; locale: Locale }) {
  const t = copy[locale];
  const projectPath = withBasePath(project.path[locale]);
  const detailLabel = project.type === "academic" ? t.caseStudy : t.projectDetails;
  const isSimulator = project.group === "simulator";

  return (
    <article className={`project-card project-${project.slug}${isSimulator ? " project-spotlight" : ""}`}>
      {project.image && <div className={`project-visual visual-${project.slug}`}>
        <a className="project-preview" href={projectPath} aria-label={`${detailLabel}: ${project.title}`}>
          <div className="project-preview-window">
            {!isSimulator && <i aria-hidden="true"><b /><b /><b /></i>}
            <img
              src={withBasePath(project.image)}
              alt={project.imageDescription?.[locale] ?? ""}
              width={isSimulator ? 1200 : 1792}
              height={isSimulator ? 720 : 1024}
              loading="lazy"
              decoding="async"
            />
          </div>
        </a>
        {project.imageCredit && (
          <a className="project-image-credit" href={project.imageCredit.url}>{project.imageCredit.label}</a>
        )}
      </div>}
      <div className="project-copy">
        <div className="tags">
          <span>{project.status[locale]}</span>
          {project.year && <span>{project.year}</span>}
          {project.aiAssisted && (
            <span className="ai-tag">{project.aiAssisted === "throughout" ? t.aiThroughout : t.ai}</span>
          )}
        </div>
        <div className="project-title-row">
          {project.logo && (
            <span className="project-logo">
              <img className="logo-light" src={withBasePath(project.logo)} alt="" width="512" height="437" loading="lazy" decoding="async" />
              {project.logoDark && <img className="logo-dark" src={withBasePath(project.logoDark)} alt="" width="512" height="437" loading="lazy" decoding="async" />}
            </span>
          )}
          <h3 className={project.logo ? "sr-only" : undefined}>{project.title}</h3>
        </div>
        <p>{project.summary[locale]}</p>
        {project.type !== "personal" && (
          <p className="project-contribution"><strong>{t.contribution}:</strong> {project.role[locale]}</p>
        )}
        <ul className="tech-list">
          {project.technologies.slice(0, 6).map((technology, index) => (
            <li className={index < 2 ? "primary-tech" : undefined} data-tech={technologyKey(technology)} key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.caseStudy ? (
            <a className="text-link" href={projectPath}>
              {detailLabel} <Icon name="arrow" />
            </a>
          ) : project.repositories?.[0] ? (
            <a className="text-link" href={project.repositories[0].url} target="_blank" rel="noreferrer">
              {t.sourceCode} <Icon name="external" />
            </a>
          ) : null}
          {project.demo && (
            <a className="text-link muted" href={project.demo} target="_blank" rel="noreferrer">
              {t.demo} <Icon name="external" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
