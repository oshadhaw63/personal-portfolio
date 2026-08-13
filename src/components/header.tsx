"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CommandPalette, type Command } from "@/components/command-palette";

const navigation = [
  { id: "about", href: "/#about", label: "about" },
  { id: "projects", href: "/#projects", label: "projects" },
  { id: "stack", href: "/#stack", label: "stack" },
  { id: "education", href: "/#education", label: "education" },
  { id: "contact", href: "/#contact", label: "contact" },
];

export function Header({ commands }: { commands: Command[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("about");
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === "undefined") return;

    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.01, 0.2, 0.5] },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-[var(--gutter)]">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Oshadha Wijayarathne, home"
        >
          <span className="grid size-8 place-items-center border border-edge-hi bg-panel font-mono text-[0.6875rem] font-bold text-mint transition group-hover:border-mint group-hover:bg-mint group-hover:text-void">
            OW
          </span>
          <span className="hidden font-mono text-xs text-dim sm:block">
            oshadha<span className="text-edge-hi">@</span>moratuwa
            <span className="text-dim/60">:~{isHome ? "" : pathname}</span>
            <span className="anim-blink ml-0.5 text-mint">_</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block px-3 py-2 font-mono text-xs transition ${
                      isActive ? "text-mint" : "text-dim hover:text-bright"
                    }`}
                  >
                    <span className="text-edge-hi">./</span>
                    {item.label}
                    {isActive ? (
                      <span className="absolute inset-x-2 -bottom-px h-px bg-mint" aria-hidden="true" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <CommandPalette commands={commands} />

          <a
            href="/oshadha-wijayarathne-cv.pdf"
            download
            className="hidden h-9 items-center gap-2 border border-mint/40 bg-mint/10 px-3 font-mono text-xs font-semibold text-mint transition hover:bg-mint hover:text-void sm:inline-flex"
          >
            cv.pdf
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="grid size-9 place-items-center border border-edge bg-panel text-text transition hover:border-edge-hi lg:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-edge bg-ink lg:hidden">
          <ul className="mx-auto max-w-[1400px] px-[var(--gutter)] py-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-edge/60 py-3 font-mono text-sm text-text last:border-0"
                >
                  <span>
                    <span className="text-edge-hi">./</span>
                    {item.label}
                  </span>
                  <span className="text-mint" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="/oshadha-wijayarathne-cv.pdf"
                download
                className="flex h-11 items-center justify-center border border-mint/40 bg-mint/10 font-mono text-sm font-semibold text-mint"
              >
                download cv.pdf
              </a>
            </li>
          </ul>
        </nav>
      ) : null}

      <div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-mint via-cyan to-iris"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  );
}
