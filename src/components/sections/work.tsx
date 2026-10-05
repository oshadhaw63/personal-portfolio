import { ProjectCard } from "@/components/project-card";
import { ProjectShowcase } from "@/components/project-showcase";
import { SectionLabel } from "@/components/section-label";
import { projects } from "@/data/portfolio";

const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

export function Work() {
  const count = words[projects.length] ?? String(projects.length);

  return (
    <section id="work" aria-labelledby="work-title" className="section border-b border-line">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <div data-reveal>
            <SectionLabel id="work" />
            <h2 id="work-title" className="heading-lg mt-6 text-balance">
              {count} things I&rsquo;ve <span className="serif text-accent">built.</span>
            </h2>
          </div>
          <p data-reveal className="lede max-w-md text-pretty">
            Each with what it does, what it does not do, and which parts were mine. Open a case study for the full
            story.
          </p>
        </div>

        <div data-reveal className="mt-14 hidden lg:block">
          <ProjectShowcase />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
