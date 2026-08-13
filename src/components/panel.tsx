import type { ReactNode } from "react";

type PanelProps = {
  label: string;
  children: ReactNode;
  aside?: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** Draws the three "window" dots in the title bar. */
  chrome?: boolean;
  ticks?: boolean;
};

export function Panel({
  label,
  children,
  aside,
  className = "",
  bodyClassName = "",
  chrome = false,
  ticks = false,
}: PanelProps) {
  return (
    <section className={`relative border border-edge bg-panel ${ticks ? "ticks" : ""} ${className}`}>
      <header className="flex items-center gap-3 border-b border-edge bg-panel-hi/60 px-4 py-2.5">
        {chrome ? (
          <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-coral/70" />
            <span className="size-2 rounded-full bg-amber/70" />
            <span className="size-2 rounded-full bg-mint/70" />
          </span>
        ) : null}
        <span className="truncate font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-dim">
          {label}
        </span>
        {aside ? <span className="ml-auto shrink-0">{aside}</span> : null}
      </header>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
