"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Desktop project browser: one expanded panel, the rest collapsed into
 * vertical strips. Selecting a strip expands it and collapses the previous
 * panel. Arrow keys move between strips.
 */
export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const moveFocus = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    headings.current[active]?.focus({ preventScroll: true });
  }, [active]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    const faces = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-face]:not([tabindex='-1'])"),
    );
    const current = faces.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;
    event.preventDefault();
    const next = (current + (event.key === "ArrowRight" ? 1 : -1) + faces.length) % faces.length;
    faces[next]?.focus();
  };

  return (
    <div className="showcase" onKeyDown={onKeyDown}>
      {projects.map((project, index) => {
        const isActive = index === active;
        const panelId = `project-panel-${project.slug}`;

        return (
          <article key={project.slug} className="showcase-item" data-active={isActive} aria-label={project.title}>
            <button
              type="button"
              data-face
              className="showcase-face"
              aria-expanded={isActive}
              aria-controls={isActive ? panelId : undefined}
              aria-hidden={isActive}
              tabIndex={isActive ? -1 : 0}
              onClick={() => {
                moveFocus.current = true;
                setActive(index);
              }}
            >
              <span className="text-[0.6875rem] tabular-nums">{pad(index + 1)}</span>
              <span className="showcase-face-title">{project.title}</span>
              <span
                className="grid size-6 place-items-center rounded-full border border-line text-[0.875rem] leading-none"
                aria-hidden="true"
              >
                +
              </span>
            </button>

            {isActive ? (
              <div id={panelId} className="showcase-panel">
                <div className="grid h-full gap-8 p-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] xl:p-9">
                  <div className="flex flex-col">
                    <p className="eyebrow">
                      <span className="eyebrow-num">
                        {pad(index + 1)} / {pad(projects.length)}
                      </span>
                      <span className="eyebrow-rule" aria-hidden="true" />
                      <span>{project.kind}</span>
                    </p>

                    <h3
                      ref={(node) => {
                        headings.current[index] = node;
                      }}
                      tabIndex={-1}
                      className="mt-5 text-[clamp(2rem,3.2vw,2.875rem)] font-semibold leading-[1.02] tracking-[-0.035em] focus:outline-none"
                    >
                      {project.title}
                    </h3>

                    <p className="mt-4 text-[1rem] leading-7 text-muted">{project.summary}</p>

                    <p className="mt-6 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">
                      Key features
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {project.highlights.slice(0, 3).map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-[0.875rem] leading-6">
                          <span className="mt-2.5 h-px w-3 shrink-0 bg-fg" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 xl:hidden">
                      <p className="text-[0.875rem] text-muted">
                        {project.role} · {project.status}
                      </p>
                      <TechList technologies={project.technologies} className="mt-3" />
                    </div>

                    <ProjectLinks project={project} className="mt-auto pt-7" />
                  </div>

                  <div className="hidden flex-col gap-5 xl:flex">
                    <ProjectVisual project={project} sizes="(min-width: 1280px) 30rem, 40vw" />
                    <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4 text-[0.875rem]">
                      <div>
                        <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">Team</dt>
                        <dd className="mt-1">{project.role}</dd>
                      </div>
                      <div>
                        <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">Status</dt>
                        <dd className="mt-1">{project.status}</dd>
                      </div>
                    </dl>
                    <TechList technologies={project.technologies} />
                  </div>
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export function TechList({ technologies, className = "" }: { technologies: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {technologies.map((technology) => (
        <li key={technology} className="tag">
          {technology}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}>
      <Link href={`/projects/${project.slug}`} className="pill pill-solid min-h-10 text-[0.8125rem]">
        Case study
        <ArrowRightIcon className="size-4" />
        <span className="sr-only">: {project.title}</span>
      </Link>
      <a href={project.repository} target="_blank" rel="noreferrer" className="text-link">
        <GithubIcon className="size-4" />
        Source
        <span className="sr-only">code for {project.title} (opens in a new tab)</span>
      </a>
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link">
          Live demo
          <ArrowUpRightIcon className="size-4" />
          <span className="sr-only">of {project.title} (opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  );
}
