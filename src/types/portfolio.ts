export type ProjectStatus = "Completed" | "Working MVP" | "In progress";

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  overview: string;
  role: string;
  status: ProjectStatus;
  technologies: string[];
  repository: string;
  liveUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
  highlights: string[];
  notes: string[];
};

export type Skill = {
  name: string;
  /** Two-character "element" symbol shown on the periodic-table tile. */
  symbol: string;
  /** Shorter label for the tile when the full name does not fit. */
  label?: string;
};

export type SkillGroup = {
  id: string;
  category: string;
  skills: Skill[];
};

export type EducationItem = {
  institution: string;
  credential: string;
  period: string;
  detail: string;
  coursework?: string[];
};

export type Activity = {
  role: string;
  organization: string;
};

export type Certification = {
  title: string;
  issuer: string;
};

export type Achievement = {
  value: number;
  decimals?: number;
  /** Text after the number, e.g. "/ 4.00". */
  suffix?: string;
  title: string;
  caption: string;
  icon: "cap" | "star" | "stack" | "people" | "letter";
};
