export type ProjectStatus = "Completed" | "Working MVP" | "In progress";
export type WorkMode = "Individual" | "Team of 2" | "Team of 4" | "Team of 20";
export type ProjectTone = "blue" | "violet" | "teal" | "amber" | "slate" | "rose";

export type Project = {
  slug: string;
  order: number;
  title: string;
  shortTitle: string;
  eyebrow: string;
  problem: string;
  description: string;
  contribution: string;
  decision: string;
  difficulty: string;
  learning: string;
  status: ProjectStatus;
  workMode: WorkMode;
  technologies: string[];
  repository: string;
  liveUrl?: string;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
  pipeline: string[];
  implemented: string[];
  limitations: string[];
  evidenceNote: string;
  tone: ProjectTone;
  featured: boolean;
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
  highlights: string[];
};
