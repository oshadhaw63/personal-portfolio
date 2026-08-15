import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowUpRightIcon, GithubIcon } from "@/components/icons";
import { getProject, profile, projects } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

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
    <main className="wrap py-14 sm:py-20">
      <Link href="/#projects" className="text-sm link-quiet">
        ← Back to projects
      </Link>

      <article className="mt-10 max-w-3xl">
        <p className="text-sm text-muted">
          {project.kind} · {project.role} · {project.status}
        </p>

        <h1 className="mt-3 text-balance text-[clamp(2rem,5.5vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {project.title}
        </h1>

        <p className="mt-6 text-pretty text-lg leading-8 text-muted">{project.overview}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={project.repository} target="_blank" rel="noreferrer" className="btn">
            <GithubIcon className="size-4" />
            Source code
          </a>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn">
              Live site
              <ArrowUpRightIcon className="size-4" />
            </a>
          ) : null}
        </div>

        {project.image ? (
          <figure className="mt-12 overflow-hidden rounded-xl border border-line">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={1600}
              height={900}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 48rem"
            />
          </figure>
        ) : null}

        <section className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.12em] text-muted">What I built</h2>
          <ul className="mt-5 space-y-3.5">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-[1.0625rem] leading-8">
                <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xs uppercase tracking-[0.12em] text-muted">Scope and limits</h2>
          <ul className="mt-5 space-y-3.5">
            {project.notes.map((note) => (
              <li key={note} className="flex gap-3 text-[1.0625rem] leading-8 text-muted">
                <span className="mt-3 size-1.5 shrink-0 rounded-full bg-line" aria-hidden="true" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="text-xs uppercase tracking-[0.12em] text-muted">Built with</h2>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => (
              <li key={technology} className="tag">
                {technology}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <nav className="mt-16 max-w-3xl border-t border-line pt-8" aria-label="Next project">
        <Link href={`/projects/${next.slug}`} className="group inline-block">
          <span className="text-xs uppercase tracking-[0.12em] text-muted">Next project</span>
          <span className="mt-2 block text-xl font-semibold tracking-tight transition group-hover:text-accent">
            {next.title} →
          </span>
        </Link>
      </nav>
    </main>
  );
}
