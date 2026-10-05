"use client";

import { useEffect, useRef } from "react";

import { profile } from "@/data/portfolio";

const MAX_ANGLE = 4.5;

/**
 * A badge hanging from a lanyard. On devices with a fine pointer it leans
 * gently toward the cursor and springs back when the pointer leaves the hero.
 * Touch devices and reduced-motion users get a still card.
 */
export function IdCard() {
  const swingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const swing = swingRef.current;
    const stage = swing?.closest<HTMLElement>("[data-badge-stage]");
    if (!swing || !stage) return;

    const canMove = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!canMove.matches) return;

    let angle = 0;
    let velocity = 0;
    let target = 0;
    let frame = 0;

    const step = () => {
      // Damped spring toward the target angle.
      velocity += (target - angle) * 0.045;
      velocity *= 0.86;
      angle += velocity;
      swing.style.transform = `rotate(${angle.toFixed(3)}deg)`;

      if (Math.abs(velocity) > 0.002 || Math.abs(target - angle) > 0.002) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
      }
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      const rect = swing.getBoundingClientRect();
      const pivot = rect.left + rect.width / 2;
      const reach = Math.max(window.innerWidth / 2, 1);
      const offset = Math.max(-1, Math.min(1, (event.clientX - pivot) / reach));
      target = offset * MAX_ANGLE;
      kick();
    };

    const onLeave = () => {
      target = 0;
      kick();
    };

    const onTap = () => {
      velocity += angle >= 0 ? -1.1 : 1.1;
      kick();
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    swing.addEventListener("pointerdown", onTap);

    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      swing.removeEventListener("pointerdown", onTap);
      swing.style.transform = "";
    };
  }, []);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <div className="badge-float">
      <div ref={swingRef} className="badge-swing">
        <div className="lanyard" aria-hidden="true" />
        <div className="lanyard-clip" aria-hidden="true" />

        <figure className="badge" aria-label={`Developer ID card for ${profile.name}`}>
          <div className="badge-slot" aria-hidden="true" />

          <div className="flex items-center justify-between text-[0.625rem] font-semibold uppercase tracking-[0.2em]">
            <span>Developer ID</span>
            <span className="text-[#5d5f77]">CSE · UoM</span>
          </div>

          <div className="badge-photo mt-3" aria-hidden="true">
            <span className="serif text-[4.75rem] leading-none text-[#151838]">ow</span>
          </div>

          <figcaption className="mt-4">
            <p className="text-[1.375rem] font-semibold leading-tight tracking-tight">
              {first} <span className="serif block text-[1.6rem] font-normal">{rest.join(" ")}</span>
            </p>
            <p className="mt-1.5 text-[0.75rem] text-[#5d5f77]">{profile.role}</p>
          </figcaption>

          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-[#ddd5c6] pt-3 text-[0.6875rem]">
            <div>
              <dt className="text-[0.5625rem] uppercase tracking-[0.16em] text-[#5d5f77]">Based in</dt>
              <dd className="mt-0.5 font-medium">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-[0.5625rem] uppercase tracking-[0.16em] text-[#5d5f77]">GitHub</dt>
              <dd className="mt-0.5 font-medium">@{profile.githubHandle}</dd>
            </div>
          </dl>

          <Barcode seed={profile.name} />
        </figure>
      </div>
    </div>
  );
}

/** Purely decorative bars, derived from the name so they never change. */
function Barcode({ seed }: { seed: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;

  for (let index = 0; x < 236; index += 1) {
    const code = seed.charCodeAt(index % seed.length) + index * 7;
    const width = (code % 3) + 1;
    const gap = ((code >> 2) % 3) + 1.5;
    bars.push({ x, w: width });
    x += width + gap;
  }

  return (
    <svg className="badge-barcode mt-4" viewBox="0 0 240 32" preserveAspectRatio="none" aria-hidden="true">
      {bars.map((bar) => (
        <rect key={bar.x} x={bar.x} y="0" width={bar.w} height="32" fill="currentColor" />
      ))}
    </svg>
  );
}
