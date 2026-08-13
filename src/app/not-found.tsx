import Link from "next/link";

import { Panel } from "@/components/panel";

export default function NotFound() {
  return (
    <main className="relative grid min-h-[72vh] place-items-center overflow-hidden px-[var(--gutter)] py-20">
      <div className="tex-grid mask-fade-tb pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative w-full max-w-xl">
        <Panel label="~/error" chrome bodyClassName="p-5 sm:p-7" ticks>
          <p className="display text-[clamp(3.5rem,14vw,7rem)] text-coral">404</p>

          <div className="mt-6 space-y-1.5 font-mono text-[0.8125rem] leading-6">
            <p className="text-dim">
              <span className="text-mint">$</span> resolve --route
            </p>
            <p className="text-coral">error: route not found</p>
            <p className="text-dim">
              the page may have moved, or the project slug may be incorrect.
            </p>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex min-h-11 items-center gap-2 border border-mint bg-mint px-4 py-2.5 font-mono text-[0.8125rem] font-semibold text-void transition hover:bg-transparent hover:text-mint"
          >
            cd ~ <span aria-hidden="true">→</span>
          </Link>
        </Panel>
      </div>
    </main>
  );
}
