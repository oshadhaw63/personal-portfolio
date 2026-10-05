import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import { TechList } from "@/components/project-showcase";
import { ProjectVisual } from "@/components/project-visual";
import { getProject, profile, projects } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const pad = (value: number) => String(value).padStart(2, "0");

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="wrap pb-20 pt-10 sm:pb-28 sm:pt-14">
      <Link href="/#work" className="link-quiet text-[0.875rem]">
        ← Back to work
      </Link>

      <article className="mt-12">
        <header className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
          <div className="rise">
            <p className="eyebrow">
              <span className="eyebrow-num">
                {pad(index + 1)} / {pad(projects.length)}
              </span>
              <span className="eyebrow-rule" aria-hidden="true" />
              <span>{project.kind}</span>
            </p>

            <h1 className="heading-xl mt-6 text-balance">{project.title}</h1>

            <p className="lede mt-7 text-pretty">{project.overview}</p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <a href={project.repository} target="_blank" rel="noreferrer" className="pill pill-solid">
                <GithubIcon className="size-4" />
                Source code
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pill">
                  Live site
                  <ArrowUpRightIcon className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="rise" style={{ animationDelay: "120ms" }}>
            <ProjectVisual project={project} sizes="(min-width: 1024px) 34rem, 92vw" />
            <dl className="mt-5 grid grid-cols-2 gap-4 text-[0.875rem]">
              <div className="border-l border-line pl-4">
                <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">Team</dt>
                <dd className="mt-1">{project.role}</dd>
              </div>
              <div className="border-l border-line pl-4">
                <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">Status</dt>
                <dd className="mt-1">{project.status}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="mt-20 grid gap-14 border-t border-line pt-14 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="built-title">
            <h2 id="built-title" className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight">
              What I <span className="serif text-accent">built</span>
            </h2>
            <ol className="mt-7 space-y-5">
              {project.highlights.map((highlight, itemIndex) => (
                <li key={highlight} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 text-[1.0625rem] leading-8">
                  <span className="pt-1 text-[0.75rem] tabular-nums text-muted">{pad(itemIndex + 1)}</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="limits-title">
            <h2 id="limits-title" className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight">
              Scope and <span className="serif text-accent">limits</span>
            </h2>
            <ul className="mt-7 space-y-5">
              {project.notes.map((note) => (
                <li key={note} className="flex gap-4 text-[1.0625rem] leading-8 text-muted">
                  <span className="mt-4 h-px w-4 shrink-0 bg-muted" aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">Built with</h2>
            <TechList technologies={project.technologies} className="mt-4" />
          </section>
        </div>
      </article>

      <nav className="mt-20 border-t border-line pt-10" aria-label="Next project">
        <Link href={`/projects/${next.slug}`} className="group inline-block">
          <span className="eyebrow">Next project</span>
          <span className="mt-3 flex items-center gap-3 text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.035em]">
            <span className="serif text-accent">{next.title}</span>
            <ArrowRightIcon className="size-6 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </nav>
    </main>
  );
}
