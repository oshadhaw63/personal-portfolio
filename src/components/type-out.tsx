"use client";

import { useEffect, useRef, useState } from "react";

type Line = {
  prompt?: string;
  text: string;
  tone?: "mint" | "dim" | "bright" | "iris" | "amber";
};

const toneClass: Record<NonNullable<Line["tone"]>, string> = {
  mint: "text-mint",
  dim: "text-dim",
  bright: "text-bright",
  iris: "text-iris",
  amber: "text-amber",
};

/**
 * Types a fixed script of terminal lines. The full text is always present in
 * the DOM for assistive tech and for reduced-motion users; only the visual
 * character reveal is animated.
 */
export function TypeOut({ lines, speed = 9 }: { lines: Line[]; speed?: number }) {
  const [progress, setProgress] = useState({ line: 0, char: 0 });
  const [done, setDone] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced.current) {
      setDone(true);
      return;
    }

    let frame = 0;
    let line = 0;
    let char = 0;

    const tick = () => {
      const current = lines[line];
      if (!current) {
        setDone(true);
        return;
      }

      if (char < current.text.length) {
        char += 1;
      } else {
        line += 1;
        char = 0;
      }

      if (line >= lines.length) {
        setProgress({ line: lines.length, char: 0 });
        setDone(true);
        return;
      }

      setProgress({ line, char });
      frame = window.setTimeout(tick, char === 0 ? speed * 12 : speed);
    };

    frame = window.setTimeout(tick, 260);
    return () => window.clearTimeout(frame);
  }, [lines, speed]);

  return (
    <div className="font-mono text-[0.8125rem] leading-6 sm:text-sm">
      {lines.map((line, index) => {
        const visible = done || index < progress.line;
        const typing = !done && index === progress.line;
        if (!visible && !typing) {
          return (
            <p key={index} className="h-6" aria-hidden="true">
              &nbsp;
            </p>
          );
        }

        const shownText = typing ? line.text.slice(0, progress.char) : line.text;

        return (
          <p key={index} className="whitespace-pre-wrap break-words">
            {line.prompt ? <span className="text-mint">{line.prompt} </span> : null}
            <span className={line.tone ? toneClass[line.tone] : "text-text"}>{shownText}</span>
            {typing ? <span className="anim-blink ml-px inline-block text-mint">▌</span> : null}
          </p>
        );
      })}
      {done ? <span className="anim-blink inline-block text-mint">▌</span> : null}
    </div>
  );
}
