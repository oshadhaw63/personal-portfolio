import { Panel } from "@/components/panel";
import { certifications, education } from "@/data/portfolio";

export function Education() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.75fr)]">
      <ol className="relative">
        {/* timeline rail */}
        <span
          className="absolute bottom-6 left-[7px] top-3 w-px bg-gradient-to-b from-mint via-edge-hi to-transparent"
          aria-hidden="true"
        />

        {education.map((item, index) => {
          // Short details read as a badge in the title bar; long ones belong in the body.
          const detailInHeader = item.detail.length <= 40;

          return (
          <li key={item.institution} className="relative pb-8 pl-8 last:pb-0">
            <span
              className={`absolute left-0 top-2.5 size-[15px] rotate-45 border ${
                index === 0 ? "border-mint bg-mint/20" : "border-edge-hi bg-panel"
              }`}
              aria-hidden="true"
            />

            <div className="group border border-edge bg-panel transition hover:border-edge-hi hover:bg-panel-hi">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge px-4 py-2.5">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mint">
                  {item.period}
                </span>
                {detailInHeader ? (
                  <span className="font-mono text-[0.6875rem] text-dim">{item.detail}</span>
                ) : null}
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-semibold leading-snug text-bright">{item.credential}</h3>
                <p className="mt-1 font-mono text-xs text-dim">{item.institution}</p>
                {!detailInHeader ? (
                  <p className="mt-3 text-[0.875rem] leading-6 text-text">{item.detail}</p>
                ) : null}

                {item.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-2.5 border-t border-edge pt-4">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-[0.875rem] leading-6 text-text">
                        <span className="mt-2 size-1 shrink-0 rotate-45 bg-mint" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
          );
        })}
      </ol>

      <Panel label="certifications.log" bodyClassName="p-4 sm:p-5" className="h-fit">
        <ul className="space-y-4">
          {certifications.map((certification, index) => {
            const [name, issuer] = certification.split(" — ");
            return (
              <li
                key={certification}
                className="grid grid-cols-[28px_1fr] gap-3 border-b border-edge pb-4 last:border-0 last:pb-0"
              >
                <span className="font-mono text-[0.6875rem] text-mint">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[0.875rem] leading-6 text-bright">{name}</p>
                  {issuer ? <p className="mt-1 font-mono text-[0.6875rem] text-dim">{issuer}</p> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
