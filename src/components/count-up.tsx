"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  decimals?: number;
  duration?: number;
};

/**
 * Renders the real value on the server, then counts up to it once when the
 * number first enters the viewport. Screen readers only ever get the final
 * value. Frames write straight to the DOM so the count never re-renders React.
 */
export function CountUp({ value, decimals = 0, duration = 1100 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = value.toFixed(decimals);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Already on screen at load: leave the final value alone.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    let frame = 0;
    node.textContent = (0).toFixed(decimals);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          node.textContent = (value * eased).toFixed(decimals);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = value.toFixed(decimals);
    };
  }, [value, decimals, duration]);

  return (
    <span className="tabular-nums">
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
