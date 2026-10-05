"use client";

import { useEffect } from "react";

/**
 * Marks every `[data-reveal]` element with `data-revealed` once it scrolls
 * into view. CSS owns the actual transition, so sections stay server
 * components and nothing is hidden when scripting is off.
 */
export function RevealObserver() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
