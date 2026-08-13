import type { ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
};

export function SectionHeading({ index, eyebrow, title, description, aside }: SectionHeadingProps) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-mint">
          {index} <span className="text-edge-hi">/</span> {eyebrow}
        </span>
        <span className="h-px flex-1 bg-edge" aria-hidden="true" />
        {aside ? (
          <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-dim sm:block">
            {aside}
          </span>
        ) : null}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <h2 className="display text-balance text-[clamp(1.9rem,4.6vw,3.25rem)]">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-pretty text-base leading-7 text-text sm:text-lg sm:leading-8">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
