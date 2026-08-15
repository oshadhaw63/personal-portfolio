import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { certifications, education, profile, projects, skillGroups } from "@/data/portfolio";

const facts = [
  { label: "University", value: "University of Moratuwa" },
  { label: "CGPA", value: "3.76 / 4.00" },
  { label: "Based in", value: profile.location },
];

export default function Home() {
  return (
    <main>
      {/* ------------------------------- hero ------------------------------- */}
      <section className="hero-wash border-b border-line">
        <div className="wrap py-20 sm:py-28">
          <p className="inline-flex items-center gap-2 text-sm text-muted">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Open to software engineering internships
          </p>

          <h1 className="mt-6 text-balance text-[clamp(2.5rem,7vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            {profile.name}
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              View projects
              <ArrowRightIcon className="size-4" />
            </a>
            <a href={`mailto:${profile.email}`} className="btn">
              <MailIcon className="size-4" />
              Get in touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile, opens in a new tab"
              className="btn px-3"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile, opens in a new tab"
              className="btn px-3"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>

          <dl className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs uppercase tracking-[0.12em] text-muted">{fact.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ----------------------------- projects ----------------------------- */}
      <section id="projects" className="section scroll-mt-16 border-b border-line">
        <div className="wrap">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Projects</h2>
            <p className="text-sm text-muted">Six things I have built, with what each one does and does not do.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ about ------------------------------- */}
      <section id="about" className="section scroll-mt-16 border-b border-line">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">About</h2>
            <div className="mt-6 space-y-5 text-[1.0625rem] leading-8 text-muted">
              <p>
                I like the parts of engineering where correctness meets product behaviour: modelling state
                transitions, drawing sensible service boundaries, tracing dependencies, and making a complicated
                workflow understandable to the person using it.
              </p>
              <p>
                Most of my work so far has been in university projects and team builds, ranging from a C++ matching
                engine to an authenticated mobile app and an operations backend. Each project page here says what is
                actually implemented, what is not, and which parts were mine.
              </p>
              <p>
                I am looking for an internship where I can contribute to maintainable software and learn from people
                who care about it.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.12em] text-muted">Skills</h3>
            <dl className="mt-6 space-y-5">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <dt className="text-sm font-medium">{group.category}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------------------- education ----------------------------- */}
      <section id="education" className="section scroll-mt-16 border-b border-line">
        <div className="wrap">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Education</h2>

          <ul className="mt-10 space-y-8">
            {education.map((item) => (
              <li key={item.institution} className="grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
                <p className="text-sm text-muted">{item.period}</p>
                <div>
                  <p className="font-medium">{item.institution}</p>
                  <p className="mt-1 text-[0.9375rem] text-muted">{item.credential}</p>
                  <p className="mt-1 text-[0.9375rem] text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-12 border-t border-line pt-8">
            <h3 className="text-xs uppercase tracking-[0.12em] text-muted">Certifications</h3>
            <ul className="mt-4 space-y-2">
              {certifications.map((certification) => (
                <li key={certification} className="text-[0.9375rem] text-muted">
                  {certification}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------- contact ------------------------------ */}
      <section id="contact" className="section scroll-mt-16">
        <div className="wrap">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get in touch</h2>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-8 text-muted">
            The quickest way to reach me is email. I am happy to talk about internships, or about any of the projects
            above.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <MailIcon className="size-4" />
              {profile.email}
            </a>
            <a href={profile.cv} download className="btn">
              Download CV
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="link-quiet">
                github.com/{profile.githubHandle}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-quiet">
                linkedin.com/in/{profile.linkedinHandle}
              </a>
            </li>
            <li className="text-muted">{profile.location}</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
