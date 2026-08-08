import { Icon } from "./Icon";
import { copy } from "@/content/copy";
import { projects, type Locale } from "@/content/portfolio";
import { withBasePath } from "@/lib/basePath";

export function ProjectsSection({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="projects section" id="proyectos" aria-labelledby="projects-title">
      <header className="section-heading split">
        <div>
          <p>03 /</p>
          <h2 id="projects-title">{t.projects}</h2>
        </div>
        <p>{t.projectsLead}</p>
      </header>
      {projects.filter((project) => project.featured).map((project) => {
        const projectPath = withBasePath(project.path[locale]);

        return (
          <article className={`project-card project-${project.slug}`} key={project.slug}>
            <div className={`project-visual visual-${project.slug}`}>
              <a className="project-preview" href={projectPath} aria-label={`${t.caseStudy}: ${project.title}`}>
                <span>{t.previewCase}</span>
                <div className="project-preview-window">
                  <i aria-hidden="true"><b /><b /><b /></i>
                  {project.image && (
                    <img src={withBasePath(project.image)} alt="" width="1792" height="1024" loading="lazy" decoding="async" />
                  )}
                </div>
                <strong>{t.caseStudy} <Icon name="arrow" /></strong>
              </a>
            </div>
            <div className="project-copy">
              <div className="tags">
                <span>{project.status[locale]}</span>
                <span>{project.year}</span>
                {project.aiAssisted && <span className="ai-tag">{t.ai}</span>}
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary[locale]}</p>
              <p className="project-contribution"><strong>{t.contribution}:</strong> {project.role[locale]}</p>
              <ul className="tech-list">
                {project.technologies.slice(0, 6).map((technology, index) => (
                  <li className={index < 2 ? "primary-tech" : undefined} key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="project-links">
                {project.caseStudy ? (
                  <a className="text-link" href={projectPath}>
                    {t.caseStudy} <Icon name="arrow" />
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
      })}
    </section>
  );
}
