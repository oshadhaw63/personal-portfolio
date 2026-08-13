import { ButtonLink } from "@/components/button-link";
import { ArrowRightIcon, DownloadIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import { Panel } from "@/components/panel";
import { TypeOut } from "@/components/type-out";
import { profile } from "@/data/portfolio";

const bootLines = [
  { prompt: "$", text: "whoami", tone: "bright" as const },
  { text: "oshadha wijayarathne — cse undergraduate, university of moratuwa" },
  { prompt: "$", text: "cat focus.txt", tone: "bright" as const },
  { text: "backend engineering · full-stack products · developer tooling" },
  { prompt: "$", text: "git log --author=oshadha --oneline | wc -l", tone: "bright" as const },
  { text: "6 documented projects · every claim traced to source", tone: "mint" as const },
  { prompt: "$", text: "status", tone: "bright" as const },
  { text: "open to software engineering internships", tone: "mint" as const },
];

const readout = [
  { key: "cgpa", value: "3.76", unit: "/ 4.00" },
  { key: "dean's list", value: "02", unit: "semesters" },
  { key: "projects", value: "06", unit: "documented" },
  { key: "languages", value: "06", unit: "in production use" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-edge">
      {/* Background instrumentation */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="tex-grid anim-drift mask-fade-b absolute inset-0 opacity-70" />
        <div className="absolute -left-40 -top-52 size-[42rem] rounded-full bg-mint/[0.07] blur-[130px]" />
        <div className="absolute -right-32 top-24 size-[34rem] rounded-full bg-iris/[0.09] blur-[120px]" />
        <div className="tex-scan absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-[var(--gutter)] py-16 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center lg:gap-14 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2.5 border border-mint/25 bg-mint/[0.07] px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mint">
            <span className="anim-pulse-ring size-1.5 rounded-full bg-mint" aria-hidden="true" />
            available · se internship
          </p>

          <h1 className="display mt-7 text-[clamp(2.5rem,8.4vw,6.25rem)]">
            Oshadha
            <br />
            <span className="relative inline-block">
              Wijayarathne
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-mint via-cyan to-transparent"
                aria-hidden="true"
              />
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-dim">
            <span className="text-mint">software engineer</span>
            <span className="text-edge-hi" aria-hidden="true">/</span>
            <span>computer science &amp; engineering</span>
            <span className="text-edge-hi" aria-hidden="true">/</span>
            <span>galle, lk</span>
          </div>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-text sm:text-xl sm:leading-9">
            I build software from the <span className="text-bright">interface down to the infrastructure</span> —
            AST-driven developer tools, authenticated mobile flows, operational backends, and a C++ matching
            engine. Every project here is documented with what works, what does not, and which parts are mine.
          </p>

          <div className="mt-9 flex flex-wrap gap-2.5">
            <ButtonLink href="/#projects" variant="primary">
              view projects <ArrowRightIcon className="size-4 transition group-hover/btn:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={profile.cv} download>
              <DownloadIcon className="size-4" /> cv.pdf
            </ButtonLink>
            <ButtonLink href={profile.github} external ariaLabel="GitHub profile, opens in a new tab">
              <GithubIcon className="size-4" /> github
            </ButtonLink>
            <ButtonLink href={profile.linkedin} external ariaLabel="LinkedIn profile, opens in a new tab">
              <LinkedinIcon className="size-4" /> linkedin
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-3">
          <Panel
            label="oshadha@moratuwa: ~/portfolio"
            chrome
            ticks
            bodyClassName="p-4 sm:p-5"
            className="shadow-[0_40px_120px_-60px_rgba(79,230,164,.45)]"
            aside={
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mint">live</span>
            }
          >
            <TypeOut lines={bootLines} />
          </Panel>

          <dl className="grid grid-cols-2 gap-px border border-edge bg-edge">
            {readout.map((item) => (
              <div key={item.key} className="bg-panel px-4 py-3.5">
                <dt className="label">{item.key}</dt>
                <dd className="mt-2 font-mono text-2xl font-bold text-bright">
                  {item.value}
                  <span className="ml-1.5 font-sans text-[0.6875rem] font-medium tracking-normal text-dim">
                    {item.unit}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
