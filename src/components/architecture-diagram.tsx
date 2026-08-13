/** `accentClass` must be a literal Tailwind class so the JIT scanner sees it. */
export function ArchitectureDiagram({
  steps,
  accentClass = "bg-mint",
}: {
  steps: string[];
  accentClass?: string;
}) {
  return (
    <ol
      className="flex flex-col md:flex-row md:items-stretch"
      role="img"
      aria-label={`System flow: ${steps.join(" then ")}`}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li key={step} className="flex flex-col md:min-w-0 md:flex-1 md:flex-row md:items-center">
            <div className="group relative flex-1 border border-edge bg-panel p-4 transition hover:border-edge-hi hover:bg-panel-hi md:min-w-0">
              <span
                className={`absolute left-0 top-0 h-px w-full ${accentClass} opacity-25 transition-opacity group-hover:opacity-90`}
                aria-hidden="true"
              />
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-dim">
                stage {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2.5 text-sm font-semibold leading-5 text-bright">{step}</p>
            </div>

            {!isLast ? (
              <>
                <span className="conn-y mx-auto h-5 w-px shrink-0 md:hidden" aria-hidden="true" />
                <span className="conn-x hidden h-px w-5 shrink-0 md:block" aria-hidden="true" />
              </>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
