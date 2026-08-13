import Link from "next/link";

import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import type { Project, ProjectTone } from "@/types/portfolio";

export const toneStyles: Record<ProjectTone, { text: string; bg: string; border: string; dot: string }> = {
  blue: { text: "text-cyan", bg: "bg-cyan", border: "hover:border-cyan/50", dot: "bg-cyan" },
  violet: { text: "text-violet", bg: "bg-violet", border: "hover:border-violet/50", dot: "bg-violet" },
  teal: { text: "text-mint", bg: "bg-mint", border: "hover:border-mint/50", dot: "bg-mint" },
  amber: { text: "text-amber", bg: "bg-amber", border: "hover:border-amber/50", dot: "bg-amber" },
  slate: { text: "text-dim", bg: "bg-dim", border: "hover:border-edge-hi", dot: "bg-dim" },
  rose: { text: "text-rose", bg: "bg-rose", border: "hover:border-rose/50", dot: "bg-rose" },
};

const statusStyles: Record<Project["status"], string> = {
  Completed: "text-mint",
  "Working MVP": "text-cyan",
  "In progress": "text-amber",
};

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const tone = toneStyles[project.tone];

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden border border-edge bg-panel transition duration-300 hover:-translate-y-1 ${tone.border} hover:bg-panel-hi`}
    >
      {/* accent rail that fills on hover */}
      <span
        className={`absolute left-0 top-0 h-full w-px ${tone.bg} opacity-30 transition-opacity duration-300 group-hover:opacity-100`}
        aria-hidden="true"
      />
      {/* light sweep on hover */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="hover-sweep absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100" />
      </span>

      <div className="flex items-center justify-between gap-4 border-b border-edge px-5 py-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim">
          <span className={tone.text}>[{String(project.order).padStart(2, "0")}]</span> {project.eyebrow}
        </span>
        <span
          className={`flex shrink-0 items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] ${statusStyles[project.status]}`}
        >
          <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display text-2xl sm:text-[1.75rem]">
          <Link href={`/projects/${project.slug}`} className="transition group-hover:text-mint">
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>

        <p className="mt-3.5 text-[0.9375rem] leading-7 text-text">{project.description}</p>

        {/* pipeline strip — the shape of the system at a glance */}
        <div className="mt-6" aria-hidden="true">
          <p className="label mb-2.5">pipeline</p>
          <div className="flex items-center">
            {project.pipeline.map((step, index) => (
              <div key={step} className="flex flex-1 items-center last:flex-none">
                <span
                  className={`size-1.5 shrink-0 rotate-45 ${tone.bg} opacity-45 transition duration-300 group-hover:opacity-100`}
                  style={{ transitionDelay: `${index * 55}ms` }}
                />
                {index < project.pipeline.length - 1 ? (
                  <span className="h-px flex-1 bg-edge-hi/70" />
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-2 truncate font-mono text-[0.6875rem] text-dim">
            {project.pipeline[0]} → {project.pipeline[project.pipeline.length - 1]}
          </p>
        </div>

        {!compact ? (
          <div className="mt-6 border-l border-edge-hi pl-4">
            <p className="label mb-2">my contribution</p>
            <p className="text-[0.8125rem] leading-6 text-text/90">{project.contribution}</p>
          </div>
        ) : null}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, compact ? 4 : 5).map((technology) => (
            <li
              key={technology}
              className="border border-edge bg-void/60 px-2 py-1 font-mono text-[0.6875rem] text-dim transition group-hover:border-edge-hi"
            >
              {technology}
            </li>
          ))}
          {project.technologies.length > (compact ? 4 : 5) ? (
            <li className="px-2 py-1 font-mono text-[0.6875rem] text-dim">
              +{project.technologies.length - (compact ? 4 : 5)}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-edge pt-4 sm:pt-5">
          <span className="font-mono text-xs font-semibold text-mint">
            read case study
            <ArrowRightIcon className="ml-1.5 inline size-3.5 transition duration-300 group-hover:translate-x-1" />
          </span>
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} source code on GitHub, opens in a new tab`}
            className="relative z-10 grid size-8 place-items-center border border-edge text-dim transition hover:border-mint hover:text-mint"
          >
            <GithubIcon className="size-3.5" />
            <ArrowUpRightIcon className="absolute -right-1 -top-1 size-3 bg-panel" />
          </a>
        </div>
      </div>
    </article>
  );
}
