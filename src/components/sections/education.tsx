import { SectionLabel } from "@/components/section-label";
import { education } from "@/data/portfolio";

function splitPeriod(period: string) {
  const [start, end] = period.split("—").map((part) => part.trim());
  return { start, end };
}

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section border-b border-line">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <div data-reveal>
            <SectionLabel id="education" />
            <h2 id="education-title" className="heading-lg mt-6 text-balance">
              Education &amp; <span className="serif text-accent">training.</span>
            </h2>
          </div>
          <p data-reveal className="lede max-w-md text-pretty">
            From A/Levels in Galle to Computer Science &amp; Engineering at the University of Moratuwa.
          </p>
        </div>

        <ol data-reveal className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-3 lg:gap-10">
          {education.map((item, index) => {
            const { start, end } = splitPeriod(item.period);
            const last = index === education.length - 1;

            return (
              <li key={item.institution} className="border-l border-line pl-6 lg:border-l-0 lg:pl-0">
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-[clamp(3.25rem,7vw,5.75rem)] font-semibold leading-none tracking-[-0.055em]">
                    {start}
                  </span>
                  {end ? <span className="serif text-[1.375rem] text-accent">— {end}</span> : null}
                </p>

                <div className="mt-6 hidden items-center lg:flex" aria-hidden="true">
                  <span className={`size-3 shrink-0 rounded-full ${last ? "bg-ink" : "border border-fg bg-bg"}`} />
                  <span className={`timeline-line-x h-px flex-1 bg-line ${last ? "" : "-mr-10"}`} />
                </div>

                <div className="mt-6">
                  <h3 className="text-[1.1875rem] font-semibold leading-snug tracking-tight">{item.institution}</h3>
                  <p className="serif mt-1 text-[1.25rem] leading-snug text-accent">{item.credential}</p>
                  <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{item.detail}</p>

                  {item.coursework ? (
                    <div className="mt-5">
                      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">Coursework</p>
                      <ul className="mt-2.5 flex flex-wrap gap-1.5">
                        {item.coursework.map((course) => (
                          <li key={course} className="tag">
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
