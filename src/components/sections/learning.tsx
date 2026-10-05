import { SectionLabel } from "@/components/section-label";
import { certifications } from "@/data/portfolio";

export function Learning() {
  return (
    <section id="learning" aria-labelledby="learning-title" className="section border-b border-line">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div data-reveal>
          <SectionLabel id="learning" label="Certifications" />
          <h2 id="learning-title" className="heading-lg mt-6">
            Always <span className="serif text-accent">learning.</span>
          </h2>
          <p className="lede mt-6 max-w-sm text-pretty">Certifications and training outside the degree programme.</p>
        </div>

        <ol data-reveal className="border-t border-line">
          {certifications.map((certification, index) => (
            <li
              key={certification.title}
              className="cert-row grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-6 sm:py-7"
            >
              <span className="cert-index text-[0.75rem] tabular-nums text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[clamp(1.0625rem,1.8vw,1.3125rem)] font-semibold leading-snug tracking-tight">
                  {certification.title}
                </h3>
                <p className="serif mt-1 text-[1.1875rem] text-accent">{certification.issuer}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
