import { SectionLabel } from "@/components/section-label";
import { activities } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section border-b border-line">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel id="experience" />
          <h2 id="experience-title" className="heading-lg mt-6 text-balance">
            Committees &amp; <span className="serif text-accent">activities.</span>
          </h2>
          <p className="lede mt-6 max-w-sm text-pretty">Alongside my projects, I have served on these committees.</p>
        </div>

        <ol data-reveal className="relative">
          <span className="timeline-line absolute bottom-10 left-[1.125rem] top-6 w-px bg-line" aria-hidden="true" />
          {activities.map((activity, index) => {
            const last = index === activities.length - 1;

            return (
              <li
                key={`${activity.role}-${activity.organization}`}
                className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-5 sm:gap-7"
              >
                <span className="relative z-[1] mt-1 grid size-9 place-items-center rounded-full border border-line bg-bg text-[0.6875rem] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={last ? "" : "mb-10 border-b border-line pb-10"}>
                  <p className="eyebrow">Committee role</p>
                  <h3 className="mt-3 text-[clamp(1.25rem,2.2vw,1.625rem)] font-semibold leading-snug tracking-tight">
                    {activity.role}
                  </h3>
                  <p className="serif mt-1.5 text-[clamp(1.2rem,2vw,1.5rem)] text-accent">{activity.organization}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
