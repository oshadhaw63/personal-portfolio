import { ProjectLinks, TechList } from "@/components/project-showcase";
import { ProjectVisual } from "@/components/project-visual";
import type { Project } from "@/types/portfolio";

/** Stacked project card used below the desktop showcase breakpoint. */
export function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <article className="flex h-full flex-col rounded-[1.25rem] border border-line bg-card p-4 sm:p-5">
      <ProjectVisual project={project} sizes="(min-width: 640px) 45vw, 92vw" />

      <p className="eyebrow mt-5">
        <span className="eyebrow-num">
          {pad(index + 1)} / {pad(total)}
        </span>
        <span className="eyebrow-rule" aria-hidden="true" />
        <span>{project.kind}</span>
      </p>

      <h3 className="mt-3 text-[1.625rem] font-semibold leading-tight tracking-[-0.03em]">{project.title}</h3>
      <p className="mt-1 text-[0.8125rem] text-muted">
        {project.role} · {project.status}
      </p>
      <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{project.summary}</p>

      <details className="group mt-4 border-t border-line pt-3">
        <summary className="flex cursor-pointer list-none items-center justify-between py-1 text-[0.8125rem] font-medium [&::-webkit-details-marker]:hidden">
          Key features
          <span className="text-muted transition group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <ul className="mt-2 space-y-2 pb-1">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-[0.875rem] leading-6">
              <span className="mt-2.5 h-px w-3 shrink-0 bg-fg" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </details>

      <TechList technologies={project.technologies} className="mt-4" />
      <ProjectLinks project={project} className="mt-auto pt-6" />
    </article>
  );
}
