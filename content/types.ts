export type Locale = "es" | "en";
export type ProjectType = "professional" | "academic" | "personal";

export type Localized<T> = Record<Locale, T>;

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  path: Localized<string>;
  featured: boolean;
  caseStudy?: boolean;
  type: ProjectType;
  title: string;
  summary: Localized<string>;
  problem: Localized<string>;
  solution: Localized<string>;
  role: Localized<string>;
  features: Localized<string[]>;
  technologies: string[];
  image?: string;
  demo?: string;
  repositories?: ProjectLink[];
  status: Localized<string>;
  year?: string;
  learnings: Localized<string>;
  aiAssisted?: boolean;
  aiContribution?: Localized<string>;
}

