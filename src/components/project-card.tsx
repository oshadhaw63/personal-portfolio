import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import type { Project, ProjectStatus } from "@/types/portfolio";

const statusDot: Record<ProjectStatus, string> = {
  Completed: "bg-emerald-500",
  "Working MVP": "bg-sky-500",
  "In progress": "bg-amber-500",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card group h-full p-6">
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>{project.kind}</span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${statusDot[project.status]}`} aria-hidden="true" />
          {project.status}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-semibold tracking-tight">
        <Link href={`/projects/${project.slug}`}>
          <span className="absolute inset-0" aria-hidden="true" />
          {project.title}
        </Link>
      </h3>

      <p className="mt-2.5 text-[0.9375rem] leading-7 text-muted">{project.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.technologies.slice(0, 4).map((technology) => (
          <li key={technology} className="tag">
            {technology}
          </li>
        ))}
        {project.technologies.length > 4 ? (
          <li className="tag">+{project.technologies.length - 4}</li>
        ) : null}
      </ul>

      <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-fg">
        Read more
        <ArrowRightIcon className="size-4 transition group-hover:translate-x-0.5" />
      </p>
    </article>
  );
}
