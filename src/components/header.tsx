"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";
import { navigation, sections } from "@/lib/sections";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Scroll spy: the active section is the last one whose top has passed a
  // line a third of the way down the viewport.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);

      if (!isHome) {
        setActive(null);
        return;
      }

      const line = window.innerHeight * 0.35;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;

      for (const item of navigation) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= line) current = item.id;
      }

      setActive(atBottom ? navigation[navigation.length - 1].id : current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [isHome]);

  // Slide the dark pill under the active link.
  const placeIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    const track = trackRef.current;
    if (!indicator || !track) return;

    const link = active ? track.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;

    if (!link) {
      indicator.style.opacity = "0";
      return;
    }

    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    indicator.style.opacity = "1";
  }, [active]);

  useLayoutEffect(() => {
    placeIndicator();
    window.addEventListener("resize", placeIndicator);
    document.fonts?.ready.then(placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [placeIndicator]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled || open}>
      <div className="wrap flex h-full items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span className="grid size-9 place-items-center rounded-full bg-ink text-ink-fg">
            <span className="serif text-[1.05rem] leading-none">ow</span>
          </span>
          <span className="hidden text-[0.875rem] font-semibold tracking-tight sm:block">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <div ref={trackRef} className="nav-track">
            <span ref={indicatorRef} className="nav-indicator" style={{ opacity: 0 }} aria-hidden="true" />
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    data-id={item.id}
                    className="nav-link"
                    aria-current={active === item.id ? "true" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <a href={profile.cv} download className="pill min-h-10 px-4 text-[0.8125rem]">
            <DownloadIcon className="size-4" />
            Résumé
          </a>

          <button
            type="button"
            className="pill pill-icon min-h-10 w-10 lg:hidden"
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Sections" className="mobile-nav lg:hidden" hidden={!open}>
        <ol className="wrap py-4">
          {sections.map((section) => (
            <li key={section.id} className="border-b border-line last:border-b-0">
              <Link
                href={`/#${section.id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-3.5"
                aria-current={active === section.id ? "true" : undefined}
              >
                <span className="w-6 text-[0.6875rem] tabular-nums text-muted">{section.number}</span>
                <span className="text-[1.375rem] font-medium tracking-tight">{section.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
