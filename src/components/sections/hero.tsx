import { ArrowUpRightIcon, DownloadIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import { IdCard } from "@/components/id-card";
import { SectionLabel } from "@/components/section-label";
import { profile } from "@/data/portfolio";
import { cssVars } from "@/lib/style";

const details = [
  { label: "Focus", value: profile.focus },
  { label: "Location", value: profile.location },
  { label: "Education", value: `B.Sc. Eng. (Hons) CSE, ${profile.university}` },
  { label: "Interests", value: profile.interests },
  { label: "Currently", value: profile.availability },
];

export function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section id="about" aria-labelledby="hero-title" className="border-b border-line" data-badge-stage>
      <div className="wrap hero-grid pb-16 pt-10 sm:pb-24 md:pt-14 lg:pt-16">
        {/* Intro */}
        <div className="md:pt-10 lg:pt-14">
          <SectionLabel id="about" className="rise" />

          <h1 id="hero-title" className="heading-xl rise mt-7" style={cssVars({ "--rise-delay": "80ms" })}>
            Hi, I&rsquo;m <span className="serif block text-accent">{first}</span>
            <span className="serif block text-accent">{rest.join(" ")}.</span>
          </h1>

          <p className="lede rise mt-8 max-w-xl text-pretty" style={cssVars({ "--rise-delay": "160ms" })}>
            {profile.intro}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-2.5" style={cssVars({ "--rise-delay": "240ms" })}>
            <a href={profile.cv} download className="pill pill-solid">
              <DownloadIcon className="size-4" />
              Download résumé
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="pill">
              <GithubIcon className="size-4" />
              GitHub
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="pill">
              <LinkedinIcon className="size-4" />
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Badge */}
        <div
          className="badge-stage rise -mt-4 [--strap:2.5rem] md:-mt-14 md:[--strap:6rem] lg:-mt-16 lg:[--strap:7.5rem]"
          style={cssVars({ "--rise-delay": "200ms" })}
        >
          <IdCard />
        </div>

        {/* Details */}
        <dl
          className="rise grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 md:col-span-2 md:grid-cols-3 lg:col-span-1 lg:mt-14 lg:grid-cols-1 lg:border-t-0 lg:pt-0"
          style={cssVars({ "--rise-delay": "320ms" })}
        >
          {details.map((detail) => (
            <div key={detail.label} className="lg:border-l lg:border-line lg:pl-5">
              <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">{detail.label}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-snug">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* About statement */}
      <div className="wrap grid gap-10 border-t border-line py-16 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <p data-reveal className="text-balance text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.15] tracking-[-0.025em]">
          I like the parts of engineering where <span className="serif text-accent">correctness</span> meets{" "}
          <span className="serif text-accent">product behaviour</span>.
        </p>
        <div
          data-reveal
          className="space-y-5 text-[1.0625rem] leading-8 text-muted"
          style={cssVars({ "--reveal-delay": "120ms" })}
        >
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a href="#work" className="text-link pt-1">
            See what I&rsquo;ve built
            <ArrowUpRightIcon className="size-4 rotate-90" />
          </a>
        </div>
      </div>
    </section>
  );
}
