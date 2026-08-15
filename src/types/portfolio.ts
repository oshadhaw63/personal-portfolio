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

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type EducationItem = {
  institution: string;
  credential: string;
  period: string;
  detail: string;
};
