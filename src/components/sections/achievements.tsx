import { CountUp } from "@/components/count-up";
import { CapIcon, LetterIcon, PeopleIcon, StackIcon, StarIcon } from "@/components/icons";
import { SectionLabel } from "@/components/section-label";
import { achievements } from "@/data/portfolio";
import { cssVars } from "@/lib/style";
import type { Achievement } from "@/types/portfolio";

const icons: Record<Achievement["icon"], typeof CapIcon> = {
  cap: CapIcon,
  star: StarIcon,
  stack: StackIcon,
  people: PeopleIcon,
  letter: LetterIcon,
};

export function Achievements() {
  const [feature, ...rest] = achievements;
  const FeatureIcon = icons[feature.icon];

  return (
    <section id="achievements" aria-labelledby="achievements-title" className="section border-b border-line">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <div data-reveal>
            <SectionLabel id="achievements" />
            <h2 id="achievements-title" className="heading-lg mt-6 text-balance">
              Moments I&rsquo;m <span className="serif text-accent">proud of.</span>
            </h2>
          </div>
          <p data-reveal className="lede max-w-md text-pretty">
            A few numbers from my studies and projects, each one taken from my CV.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <li
            data-reveal
            className="flex flex-col rounded-[1.5rem] bg-ink p-7 text-ink-fg sm:col-span-2 sm:p-9 lg:col-span-1 lg:row-span-2"
          >
            <FeatureIcon className="size-7 opacity-80" />
            <p className="mt-10 flex flex-wrap items-baseline gap-x-3 lg:mt-auto">
              <span className="text-[clamp(4.75rem,11vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
                <CountUp value={feature.value} decimals={feature.decimals} />
              </span>
              {feature.suffix ? (
                <span className="serif text-[clamp(1.5rem,3vw,2.25rem)] opacity-80">{feature.suffix}</span>
              ) : null}
            </p>
            <p className="mt-5 text-[1.125rem] font-semibold tracking-tight">{feature.title}</p>
            <p className="mt-1.5 max-w-xs text-[0.9375rem] leading-6 opacity-75">{feature.caption}</p>
          </li>

          {rest.map((achievement, index) => {
            const Icon = icons[achievement.icon];

            return (
              <li
                key={achievement.title}
                data-reveal
                style={cssVars({ "--reveal-delay": `${(index + 1) * 90}ms` })}
                className="flex flex-col rounded-[1.25rem] border border-line bg-card p-6 sm:p-7"
              >
                <Icon className="size-6 text-accent" />
                <p className="mt-8 text-[clamp(3.25rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]">
                  <CountUp value={achievement.value} decimals={achievement.decimals} />
                </p>
                <p className="mt-4 text-[1rem] font-semibold tracking-tight">{achievement.title}</p>
                <p className="mt-1 text-[0.875rem] leading-6 text-muted">{achievement.caption}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
