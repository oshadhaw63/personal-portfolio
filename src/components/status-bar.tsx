"use client";

import { useEffect, useState } from "react";

/**
 * IDE-style status strip. The clock renders empty on the server and fills in
 * after mount so the markup stays deterministic.
 */
export function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Colombo",
      }).format(new Date());

    const update = () => setTime(format());
    const frame = window.requestAnimationFrame(update);
    const interval = window.setInterval(update, 15_000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="border-t border-edge bg-panel/70">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-5 gap-y-1 px-[var(--gutter)] py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-dim">
        <span className="flex items-center gap-1.5 text-mint">
          <span className="size-1.5 rounded-full bg-mint" aria-hidden="true" />
          main
        </span>
        <span>utf-8</span>
        <span>typescript</span>
        <span>next.js</span>
        <span className="ml-auto">
          colombo{" "}
          <span suppressHydrationWarning className="text-text">
            {time || "--:--"}
          </span>
        </span>
      </div>
    </div>
  );
}
