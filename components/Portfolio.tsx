"use client";

import {
  useEffect,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { LocalContext } from "@/components/LocalContext";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { FocusSection } from "@/components/portfolio/FocusSection";
import { Icon } from "@/components/portfolio/Icon";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ThemeControl } from "@/components/ThemeControl";
import { copy } from "@/content/copy";
import {
  getPublicEmail,
  profile,
  type Locale,
} from "@/content/portfolio";
import { withBasePath } from "@/lib/basePath";
import { deliverContactMessage } from "@/lib/contactDelivery";

export function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const otherLocale = locale === "es" ? "en" : "es";
  const [copied, setCopied] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "prepared" | "error"
  >("idle");

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem("locale", locale);
  }, [locale]);

  function switchLanguage(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const localizedPath = window.location.pathname.replace(
      /\/(es|en)(?=\/|$)/,
      `/${otherLocale}`,
    );
    window.location.assign(
      `${localizedPath}${window.location.search}${window.location.hash}`,
    );
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(getPublicEmail());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (form.get("website")) return;
    const next: Record<string, string> = {};
    for (const key of ["name", "email", "subject", "message"])
      if (!String(form.get(key) ?? "").trim()) next[key] = t.required;
    const email = String(form.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = t.invalidEmail;
    setErrors(next);
    if (Object.keys(next).length) return;

    setFormStatus("sending");
    try {
      const delivery = await deliverContactMessage({
        name: String(form.get("name")),
        email,
        subject: String(form.get("subject")),
        message: String(form.get("message")),
      });

      if (delivery.kind === "sent") {
        setFormStatus("success");
        formElement.reset();
        return;
      }

      setFormStatus("prepared");
      window.location.href = delivery.url;
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <>
      <CustomCursor />
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <a
          className="brand"
          href="#inicio"
          aria-label={`${profile.name} — ${t.nav[0]}`}
        >
          JO<span>.</span>
        </a>
        <nav aria-label="Principal">
          <ul>
            {t.nav.map((item, index) => (
              <li key={item}>
                <a
                  href={`#${["inicio", "experiencia", "proyectos", "educacion", "sobre-mi", "contacto"][index]}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <LocalContext locale={locale} />
          {profile.cv[locale] ? (
            <a
              className="header-cv"
              href={withBasePath(profile.cv[locale]!)}
              download
              aria-label={t.downloadCv}
              title={t.downloadCv}
            >
              CV <span aria-hidden="true">↓</span>
            </a>
          ) : null}
          <a
            className="language"
            href={withBasePath(`/${otherLocale}`)}
            hrefLang={otherLocale}
            aria-label={`${t.language}: ${otherLocale.toUpperCase()}`}
            onClick={switchLanguage}
          >
            {otherLocale.toUpperCase()}
          </a>
          <ThemeControl locale={locale} />
        </div>
      </header>

      <main id="main">
        <section className="hero section" id="inicio">
          <div className="hero-copy reveal">
            <p className="eyebrow">
              <span />
              {t.heroEyebrow}
            </p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-lead">{t.heroText}</p>
            <p className="availability"><span aria-hidden="true" />{t.availability}</p>
            <div className="cta-row">
              <a className="button primary" href="#experiencia">
                {t.viewExperience} <Icon name="arrow" />
              </a>
              <a className="button secondary" href="#contacto">
                {t.contact} <Icon name="arrow" />
              </a>
            </div>
            <div className="social-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" /> GitHub
              </a>
            </div>
          </div>
          <div className="portrait-wrap reveal" aria-label={profile.name}>
            <div className="portrait-frame">
              <img
                src={withBasePath(profile.photo)}
                alt={`${profile.name}, software developer`}
                width="460"
                height="460"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <FocusSection locale={locale} />

        <ExperienceSection locale={locale} />

        <ProjectsSection locale={locale} />

        <section
          className="education section"
          id="educacion"
          aria-labelledby="education-title"
        >
          <header className="section-heading">
            <p>04 /</p>
            <h2 id="education-title">{t.education}</h2>
          </header>
          <div className="education-list">
            {t.educationItems.map(([degree, school, period]) => (
              <article className="education-formal" key={degree}>
                <div>
                  <h3>{degree}</h3>
                  <p>{school}</p>
                </div>
                <p>{period}</p>
              </article>
            ))}
            <article className="education-certification">
              <div>
                <p className="education-kicker">{t.additionalTraining}</p>
                <h3>{t.dataScienceCourse[0]}</h3>
                <p>{t.dataScienceCourse[1]}</p>
                <a
                  href={`${profile.linkedin}details/certifications/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.credentialLink} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p>{t.dataScienceCourse[2]}</p>
            </article>
          </div>
          <div className="community-block">
            <div>
              <p>04.B /</p>
              <h3>{t.community}</h3>
              <p>{t.communityLead}</p>
            </div>
            <div className="community-list">
              {t.communityItems.map(([title, detail, href, media]) => (
                <article key={title}>
                  <a
                    className="community-arrow"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${t.communityLink}: ${title}`}
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                  <div>
                    <h4>{title}</h4>
                    <p>{detail}</p>
                    {media ? (
                      <details className="community-evidence">
                        <summary>{media.label}</summary>
                        <figure>
                          <a
                            href={withBasePath(media.src)}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={media.alt}
                          >
                            <img
                              src={withBasePath(media.src)}
                              alt={media.alt}
                              width="790"
                              height="1200"
                              loading="lazy"
                              decoding="async"
                            />
                          </a>
                          <figcaption>{media.caption}</figcaption>
                        </figure>
                      </details>
                    ) : null}
                    <a href={href} target="_blank" rel="noreferrer">
                      {t.communityLink}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="about section"
          id="sobre-mi"
          aria-labelledby="about-title"
        >
          <header className="section-heading">
            <p>05 /</p>
            <h2 id="about-title">{t.about}</h2>
          </header>
          <div className="about-grid about-lead">
            {t.aboutParagraphs.map((paragraph, index) => (
              <p className={index === 0 ? "about-intro" : undefined} key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          className="contact section"
          id="contacto"
          aria-labelledby="contact-title"
        >
          <div className="contact-intro">
            <p className="eyebrow">
              <span />
              06 / CONTACT
            </p>
            <h2 id="contact-title">{t.contactTitle}</h2>
            <p>
              {t.contactLead}{" "}
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                {t.contactLinkedin}
              </a>
              .
            </p>
            {emailRevealed ? (
              <div className="revealed-email">
                <a href={`mailto:${getPublicEmail()}`}>{getPublicEmail()}</a>
                <button className="copy-button" type="button" onClick={copyEmail}>
                  <Icon name="copy" /> {copied ? t.copied : t.copyEmail}
                </button>
              </div>
            ) : (
              <div className="protected-email">
                <button
                  className="reveal-email-button"
                  type="button"
                  onClick={() => setEmailRevealed(true)}
                >
                  <Icon name="mail" /> {t.revealEmail}
                </button>
              </div>
            )}
            <div className="cv-block">
              {profile.cv[locale] ? (
                <a
                  className="button primary"
                  href={withBasePath(profile.cv[locale]!)}
                  download
                >
                  {t.downloadCv} <Icon name="download" />
                </a>
              ) : (
                <span className="button disabled" aria-disabled="true">
                  {t.cvUnavailable}
                </span>
              )}
            </div>
          </div>
          <form onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="name">{t.name}</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="email">{t.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="error">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="field full">
              <label htmlFor="subject">{t.subject}</label>
              <input
                id="subject"
                name="subject"
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <span className="error">{errors.subject}</span>
              )}
            </div>
            <div className="field full">
              <label htmlFor="message">{t.message}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <span className="error">{errors.message}</span>
              )}
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="form-footer">
              <p>{t.privacy}</p>
              <button
                className="button primary"
                type="submit"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending" ? t.sending : t.send}{" "}
                <Icon name="mail" />
              </button>
            </div>
            <p
              className={`form-status ${formStatus === "error" ? "error" : ""}`}
              role="status"
              aria-live="polite"
            >
              {formStatus === "success"
                ? t.sent
                : formStatus === "prepared"
                  ? t.prepared
                  : formStatus === "error"
                    ? t.sendError
                    : ""}
            </p>
            <div aria-live="polite" className="sr-only">
              {copied ? t.copied : ""}
            </div>
          </form>
        </section>
      </main>
      <footer>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
        </div>
      </footer>
    </>
  );
}
