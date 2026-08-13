import { About } from "@/components/about";
import { ButtonLink } from "@/components/button-link";
import { Education } from "@/components/education";
import { Hero } from "@/components/hero";
import { ArrowUpRightIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from "@/components/icons";
import { Panel } from "@/components/panel";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Skills } from "@/components/skills";
import { Ticker } from "@/components/ticker";
import { profile, projects } from "@/data/portfolio";

const contactChannels = [
  { key: "email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
  { key: "github", value: "github.com/oshadhaw63", href: profile.github, Icon: GithubIcon, external: true },
  {
    key: "linkedin",
    value: "in/oshadha-wijayarathne",
    href: profile.linkedin,
    Icon: LinkedinIcon,
    external: true,
  },
  { key: "location", value: profile.location, Icon: MapPinIcon },
];

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <main>
      <Hero />
      <Ticker />

      {/* ------------------------------- about ------------------------------ */}
      <section id="about" className="scroll-mt-16 border-b border-edge bg-void">
        <div className="mx-auto max-w-[1400px] px-[var(--gutter)] py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="profile"
              title="Building systems from interface to infrastructure."
              description="Correctness and product behaviour are where I like to work: state machines, service boundaries, dependency graphs, and route protection — made legible to the people who use them."
              aside="~/about.md"
            />
          </Reveal>
          <Reveal delay={90} className="mt-12">
            <About />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ projects ---------------------------- */}
      <section id="projects" className="relative scroll-mt-16 overflow-hidden border-b border-edge bg-ink">
        <div className="tex-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px] px-[var(--gutter)] py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="selected work"
              title="Six projects, documented like engineering reports."
              description="Each case study separates verified implementation from limitations, and distinguishes my contribution from team-owned work."
              aside={`${projects.length} case studies`}
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 110} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-dim">
                systems, networking &amp; language fundamentals
              </span>
              <span className="h-px flex-1 bg-edge" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {otherProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 110} className="h-full">
                <ProjectCard project={project} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- stack ------------------------------ */}
      <section id="stack" className="scroll-mt-16 border-b border-edge bg-void">
        <div className="mx-auto max-w-[1400px] px-[var(--gutter)] py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              index="03"
              eyebrow="technical stack"
              title="Tools I have actually shipped or studied with."
              description="Grouped by context rather than ranked with arbitrary percentages — a bar chart of self-assessed skill tells you nothing useful."
              aside="registry"
            />
          </Reveal>
          <Reveal delay={90} className="mt-12">
            <Skills />
          </Reveal>
        </div>
      </section>

      {/* ----------------------------- education ---------------------------- */}
      <section id="education" className="scroll-mt-16 border-b border-edge bg-ink">
        <div className="mx-auto max-w-[1400px] px-[var(--gutter)] py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              index="04"
              eyebrow="education & training"
              title="Computer science foundations, reinforced by building."
              aside="timeline"
            />
          </Reveal>
          <Reveal delay={90} className="mt-12">
            <Education />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ contact ----------------------------- */}
      <section id="contact" className="relative scroll-mt-16 overflow-hidden bg-void">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="tex-grid mask-fade-tb absolute inset-0 opacity-50" />
          <div className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/[0.06] blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-[var(--gutter)] py-20 sm:py-28">
          <Reveal>
            <SectionHeading index="05" eyebrow="contact" title="Let’s talk about internships." aside="open" />
          </Reveal>

          <Reveal delay={90} className="mt-12">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.8fr)]">
              <Panel label="message" ticks bodyClassName="p-6 sm:p-9">
                <p className="font-mono text-sm text-mint">$ ./hire --role=software-engineering-intern</p>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-text sm:text-xl">
                  I’m looking for an internship where I can contribute to reliable backend, full-stack,
                  platform, or developer-tooling work — and keep learning from people who care about
                  maintainable software.
                </p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  <ButtonLink href={`mailto:${profile.email}`} variant="primary">
                    <MailIcon className="size-4" /> send an email
                  </ButtonLink>
                  <ButtonLink href={profile.cv} download>
                    <DownloadIcon className="size-4" /> download cv
                  </ButtonLink>
                </div>
              </Panel>

              <Panel label="channels" bodyClassName="p-0">
                <ul>
                  {contactChannels.map(({ key, value, href, Icon, external }, index) => {
                    const content = (
                      <>
                        <Icon className="size-4 shrink-0 text-dim transition group-hover:text-mint" />
                        <span className="w-20 shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
                          {key}
                        </span>
                        <span className="min-w-0 flex-1 truncate font-mono text-[0.8125rem] text-text transition group-hover:text-bright">
                          {value}
                        </span>
                        {href ? (
                          <ArrowUpRightIcon className="size-3.5 shrink-0 text-edge-hi transition group-hover:text-mint" />
                        ) : null}
                      </>
                    );

                    return (
                      <li key={key} className={index > 0 ? "border-t border-edge" : ""}>
                        {href ? (
                          <a
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className="group flex items-center gap-3 px-4 py-4 transition hover:bg-panel-hi sm:px-5"
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="group flex items-center gap-3 px-4 py-4 sm:px-5">{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Panel>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
