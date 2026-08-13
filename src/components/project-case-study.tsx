import Image from "next/image";
import Link from "next/link";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ButtonLink } from "@/components/button-link";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import { Panel } from "@/components/panel";
import { toneStyles } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const tone = toneStyles[project.tone];
  const nextProject = projects.find((item) => item.order === (project.order % projects.length) + 1);

  return (
    <main>
      {/* ------------------------------- masthead --------------------------- */}
      <section className="relative overflow-hidden border-b border-edge">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="tex-grid mask-fade-b absolute inset-0 opacity-60" />
          <div className="absolute -left-24 -top-40 size-[34rem] rounded-full bg-mint/[0.06] blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-[var(--gutter)] py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-dim">
            <Link href="/#projects" className="transition hover:text-mint">
              cd ..
            </Link>
            <span className="text-edge-hi" aria-hidden="true">
              |
            </span>
            <span>
              ~/projects/<span className="text-text">{project.slug}</span>
            </span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]">
                <span className={tone.text}>case study {String(project.order).padStart(2, "0")}</span>
                <span className="text-edge-hi"> / </span>
                <span className="text-dim">{project.eyebrow}</span>
              </p>

              <h1 className="display mt-6 text-balance text-[clamp(2.5rem,7.5vw,5.5rem)]">{project.title}</h1>

              <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-text sm:text-xl sm:leading-9">
                {project.description}
              </p>

              <div className="mt-9 flex flex-wrap gap-2.5">
                <ButtonLink
                  href={project.repository}
                  variant="primary"
                  external
                  ariaLabel={`${project.title} source code, opens in a new tab`}
                >
                  <GithubIcon className="size-4" /> inspect source <ArrowUpRightIcon className="size-3.5" />
                </ButtonLink>
                {project.liveUrl ? (
                  <ButtonLink
                    href={project.liveUrl}
                    external
                    ariaLabel={`${project.title} live site, opens in a new tab`}
                  >
                    open live project <ArrowUpRightIcon className="size-3.5" />
                  </ButtonLink>
                ) : null}
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px border border-edge bg-edge">
              <Meta label="status" value={project.status} valueClass={tone.text} />
              <Meta label="ownership" value={project.workMode} />
              <Meta label="stages" value={String(project.pipeline.length).padStart(2, "0")} />
              <Meta label="stack" value={String(project.technologies.length).padStart(2, "0")} />
            </dl>
          </div>

          <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="border border-edge bg-panel px-2.5 py-1 font-mono text-[0.6875rem] text-text"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-[var(--gutter)] py-16 sm:py-20">
        {/* ------------------------------ overview -------------------------- */}
        <section className="grid gap-5 lg:grid-cols-3" aria-labelledby="project-overview">
          <h2 id="project-overview" className="sr-only">
            Project overview
          </h2>
          {[
            { number: "01", label: "the problem", text: project.problem },
            { number: "02", label: "my contribution", text: project.contribution },
            { number: "03", label: "key decision", text: project.decision },
          ].map((card, index) => (
            <Reveal key={card.number} delay={index * 100} className="h-full">
              <article className="ticks relative h-full border border-edge bg-panel p-5 sm:p-6">
                <p className={`font-mono text-[0.6875rem] tracking-[0.2em] ${tone.text}`}>{card.number}</p>
                <h3 className="mt-4 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-bright">
                  {card.label}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-text">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </section>

        {/* ------------------------------- visual --------------------------- */}
        <Reveal className="mt-14">
          {project.image ? (
            <Panel
              label={`screenshot — ${project.slug}`}
              chrome
              bodyClassName="p-2 sm:p-3"
              aside={<span className="font-mono text-[0.625rem] text-dim">from repository</span>}
            >
              <Image
                className="h-auto w-full border border-edge"
                src={project.image.src}
                alt={project.image.alt}
                width={1918}
                height={881}
                priority
              />
              <p className="px-1 pb-1 pt-3 font-mono text-[0.6875rem] text-dim">{project.image.caption}</p>
            </Panel>
          ) : (
            <div className="tex-grid-fine flex min-h-40 items-center justify-center border border-dashed border-edge-hi bg-panel/40 p-8 text-center">
              <div>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-amber">
                  visual evidence pending
                </p>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-dim">
                  No repository screenshot is published for this project. A real application capture should
                  replace this clearly marked placeholder.
                </p>
              </div>
            </div>
          )}
        </Reveal>

        {/* ----------------------------- system flow ------------------------ */}
        <section className="mt-16" aria-labelledby="architecture">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-mint">
                04 <span className="text-edge-hi">/</span> how it works
              </span>
              <span className="h-px flex-1 bg-edge" aria-hidden="true" />
            </div>
            <h2 id="architecture" className="display mt-6 text-3xl sm:text-4xl">
              System flow
            </h2>
          </Reveal>
          <Reveal delay={90} className="mt-8">
            <ArchitectureDiagram steps={project.pipeline} accentClass={tone.bg} />
          </Reveal>
        </section>

        {/* -------------------- implemented vs limitations ------------------ */}
        <section className="mt-16 grid gap-5 lg:grid-cols-2" aria-labelledby="implemented">
          <Reveal className="h-full">
            <Panel
              label="implemented — verified against source"
              bodyClassName="p-0"
              className="h-full"
              aside={<span className="font-mono text-[0.625rem] text-mint">{project.implemented.length}</span>}
            >
              <ol>
                {project.implemented.map((item, index) => (
                  <li
                    key={item}
                    className={`grid grid-cols-[26px_1fr] gap-3 px-4 py-4 sm:px-5 ${
                      index > 0 ? "border-t border-edge" : ""
                    }`}
                  >
                    <span className="pt-0.5 font-mono text-xs text-mint" aria-hidden="true">
                      ✓
                    </span>
                    <p className="text-[0.875rem] leading-6 text-text">{item}</p>
                  </li>
                ))}
              </ol>
            </Panel>
          </Reveal>

          <Reveal delay={100} className="h-full">
            <h2 id="implemented" className="sr-only">
              What is implemented and what is not
            </h2>
            <Panel
              label="known limitations"
              bodyClassName="p-0"
              className="h-full"
              aside={<span className="font-mono text-[0.625rem] text-coral">{project.limitations.length}</span>}
            >
              <ul>
                {project.limitations.map((item, index) => (
                  <li
                    key={item}
                    className={`grid grid-cols-[26px_1fr] gap-3 px-4 py-4 sm:px-5 ${
                      index > 0 ? "border-t border-edge" : ""
                    }`}
                  >
                    <span className="pt-0.5 font-mono text-xs text-coral" aria-hidden="true">
                      !
                    </span>
                    <p className="text-[0.875rem] leading-6 text-text">{item}</p>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        </section>

        {/* --------------------------- reflection --------------------------- */}
        <section className="mt-5 grid gap-5 sm:grid-cols-2">
          <Reveal className="h-full">
            <Panel label="hardest part" bodyClassName="p-5 sm:p-6" className="h-full">
              <p className="text-[0.9375rem] leading-7 text-text">{project.difficulty}</p>
            </Panel>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <Panel label="what I learned" bodyClassName="p-5 sm:p-6" className="h-full">
              <p className="text-[0.9375rem] leading-7 text-bright">{project.learning}</p>
            </Panel>
          </Reveal>
        </section>

        <Reveal className="mt-5">
          <aside className="border border-mint/25 bg-mint/[0.05] p-5 sm:p-6">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mint">evidence note</p>
            <p className="mt-3 text-[0.875rem] leading-7 text-text">{project.evidenceNote}</p>
          </aside>
        </Reveal>

        {/* ---------------------------- pagination -------------------------- */}
        <nav
          className="mt-16 flex flex-col justify-between gap-4 border-t border-edge pt-8 sm:flex-row sm:items-center"
          aria-label="Project navigation"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-dim transition hover:text-mint"
          >
            <span aria-hidden="true">←</span> all projects
          </Link>
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group inline-flex items-center gap-2 font-mono text-xs text-mint"
            >
              next: {nextProject.shortTitle}
              <ArrowRightIcon className="size-3.5 transition group-hover:translate-x-1" />
            </Link>
          ) : null}
        </nav>
      </div>
    </main>
  );
}

function Meta({ label, value, valueClass = "text-bright" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="bg-panel px-4 py-3.5">
      <dt className="label">{label}</dt>
      <dd className={`mt-2 font-mono text-sm font-semibold ${valueClass}`}>{value}</dd>
    </div>
  );
}
