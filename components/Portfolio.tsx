"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type MouseEvent,
} from "react";
import { FrameworkPrototype } from "@/components/FrameworkPrototype";
import { CustomCursor } from "@/components/CustomCursor";
import { LocalContext } from "@/components/LocalContext";
import { FocusSection } from "@/components/portfolio/FocusSection";
import { Icon } from "@/components/portfolio/Icon";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { copy } from "@/content/copy";
import {
  getPublicEmail,
  profile,
  type Locale,
} from "@/content/portfolio";
import { withBasePath } from "@/lib/basePath";

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

export function Portfolio({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const otherLocale = locale === "es" ? "en" : "es";
  const theme = useSyncExternalStore(
    subscribeThemePreference,
    getThemePreference,
    () => DEFAULT_THEME,
  );
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
    const form = new FormData(event.currentTarget);
    if (form.get("website")) return;
    const next: Record<string, string> = {};
    for (const key of ["name", "email", "subject", "message"])
      if (!String(form.get(key) ?? "").trim()) next[key] = t.required;
    const email = String(form.get("email") ?? "");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = t.invalidEmail;
    setErrors(next);
    if (Object.keys(next).length) return;
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (endpoint) {
      setFormStatus("sending");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(Object.fromEntries(form)),
        });
        if (!response.ok) throw new Error("Form provider rejected the request");
        setFormStatus("success");
        event.currentTarget.reset();
        return;
      } catch {
        setFormStatus("error");
        return;
      }
    }
    const subject = encodeURIComponent(String(form.get("subject")));
    const body = encodeURIComponent(
      `${String(form.get("message"))}\n\n${String(form.get("name"))} <${email}>`,
    );
    setFormStatus("prepared");
    window.location.href = `mailto:${getPublicEmail()}?subject=${subject}&body=${body}`;
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
                  href={`#${["inicio", "proyectos", "experiencia", "sobre-mi", "educacion", "contacto"][index]}`}
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
          <div className="theme-control" role="group" aria-label={t.theme} suppressHydrationWarning>
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
              <a className="button primary" href="#proyectos">
                {t.viewProjects} <Icon name="arrow" />
              </a>
              <a className="button secondary" href="#contacto">
                {t.contact} <Icon name="arrow" />
              </a>
            </div>
            <div className="social-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Icon name="external" />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub <Icon name="external" />
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
            <div className="portrait-note">
              <span>01</span>
              <p>
                Power Platform
                <br />
                .NET · React · TypeScript
              </p>
            </div>
          </div>
        </section>

        <FocusSection locale={locale} />

        <ProjectsSection locale={locale} />

        <section
          className="experience section"
          id="experiencia"
          aria-labelledby="experience-title"
        >
          <header className="section-heading split">
            <div>
              <p>03 /</p>
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
                {t.expBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul className="tech-list">
                <li>Power Apps</li>
                <li>Power Automate</li>
                <li>SharePoint</li>
                <li>Azure DevOps</li>
                <li>Git</li>
                <li>PowerShell</li>
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
              <b>{t.explorePrototype} <Icon name="arrow" /></b>
            </summary>
            <aside className="framework-showcase" aria-label={t.frameworkEyebrow}>
              <FrameworkPrototype locale={locale} />
              <p className="framework-caption">{t.frameworkCaption}</p>
            </aside>
          </details>
        </section>

        <section
          className="about section"
          id="sobre-mi"
          aria-labelledby="about-title"
        >
          <header className="section-heading">
            <p>04 /</p>
            <h2 id="about-title">{t.about}</h2>
          </header>
          <div className="about-grid">
            <p className="about-lead">{t.aboutText}</p>
            <div className="principles">
              {t.principles.map((principle) => <p key={principle}>{principle}</p>)}
            </div>
          </div>
        </section>

        <section
          className="education section"
          id="educacion"
          aria-labelledby="education-title"
        >
          <header className="section-heading">
            <p>05 /</p>
            <h2 id="education-title">{t.education}</h2>
          </header>
          <div className="education-list">
            {t.educationItems.map(([degree, school, period]) => (
              <article key={degree}>
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
              <p>05.B /</p>
              <h3>{t.community}</h3>
              <p>{t.communityLead}</p>
            </div>
            <div className="community-list">
              {t.communityItems.slice(0, 3).map(([title, detail, href]) => (
                <article key={title}>
                  <span aria-hidden="true">↗</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{detail}</p>
                    <a href={href} target="_blank" rel="noreferrer">
                      {t.communityLink}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
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
            <p>{t.contactLead}</p>
            {emailRevealed ? (
              <div className="revealed-email">
                <a href={`mailto:${getPublicEmail()}`}>{getPublicEmail()}</a>
                <button className="copy-button" type="button" onClick={copyEmail}>
                  <Icon name="copy" /> {copied ? t.copied : t.copyEmail}
                </button>
              </div>
            ) : (
              <div className="protected-email">
                <p>{t.emailProtected}</p>
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
                  {t.downloadCv} <Icon name="arrow" />
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
              <div>
                <p>{t.formFallback}</p>
                <p>{t.privacy}</p>
              </div>
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
        <p>{t.footer}</p>
        <div>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.github}>GitHub</a>
        </div>
      </footer>
    </>
  );
}
