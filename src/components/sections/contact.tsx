import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { SectionLabel } from "@/components/section-label";
import { profile } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="ink-section">
      <div className="wrap section">
        <div data-reveal>
          <SectionLabel id="contact" />
          <h2
            id="contact-title"
            className="mt-8 text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
          >
            Let&rsquo;s get
            <br />
            <span className="serif">in touch.</span>
          </h2>
        </div>

        <div
          data-reveal
          className="mt-14 grid gap-10 border-t hairline pt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16"
        >
          <div>
            <p className="ink-muted max-w-xl text-[1.0625rem] leading-8">
              The quickest way to reach me is email. I am happy to talk about internships, or about any of the projects
              above.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="serif mt-6 inline-block break-all text-[clamp(1.6rem,4.2vw,3.25rem)] leading-tight underline decoration-1 underline-offset-[0.2em] transition hover:opacity-80"
            >
              {profile.email}
            </a>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <div className="flex flex-wrap gap-2.5 lg:justify-end">
              <a href={`mailto:${profile.email}`} className="pill pill-solid">
                <MailIcon className="size-4" />
                Email me
              </a>
              <a href={profile.cv} download className="pill">
                <DownloadIcon className="size-4" />
                Download CV
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[0.875rem] lg:justify-end">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link-quiet inline-flex items-center gap-2"
                >
                  <GithubIcon className="size-4" />
                  github.com/{profile.githubHandle}
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="link-quiet inline-flex items-center gap-2"
                >
                  <LinkedinIcon className="size-4" />
                  linkedin.com/in/{profile.linkedinHandle}
                </a>
              </li>
            </ul>
            <p className="ink-muted text-[0.875rem]">{profile.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
