import { SectionLabel } from "@/components/section-label";
import { SkillsTable } from "@/components/skills-table";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section border-b border-line">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <div data-reveal>
            <SectionLabel id="skills" />
            <h2 id="skills-title" className="heading-lg mt-6 text-balance">
              The elements I <span className="serif text-accent">build with.</span>
            </h2>
          </div>
          <p data-reveal className="lede max-w-md text-pretty">
            A periodic table of the languages, frameworks, and tools on my CV, grouped by layer from languages to
            testing.
          </p>
        </div>

        <div data-reveal>
          <SkillsTable />
        </div>
      </div>
    </section>
  );
}
