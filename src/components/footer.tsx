import Link from "next/link";

import { ArrowUpRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { StatusBar } from "@/components/status-bar";
import { profile } from "@/data/portfolio";

const columns = [
  {
    title: "sections",
    links: [
      { label: "about", href: "/#about" },
      { label: "projects", href: "/#projects" },
      { label: "stack", href: "/#stack" },
      { label: "education", href: "/#education" },
      { label: "contact", href: "/#contact" },
    ],
  },
  {
    title: "case studies",
    links: [
      { label: "repolens", href: "/projects/repolens" },
      { label: "uniattend", href: "/projects/uniattend" },
      { label: "pharma control tower", href: "/projects/pharma-control-tower" },
      { label: "disaster response", href: "/projects/disaster-response-system" },
      { label: "flower exchange", href: "/projects/flower-exchange" },
      { label: "rpal interpreter", href: "/projects/rpal-interpreter" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-edge bg-ink">
      <div className="tex-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-[var(--gutter)] py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div>
            <p className="font-mono text-xs text-dim">
              oshadha<span className="text-edge-hi">@</span>moratuwa
              <span className="anim-blink ml-0.5 text-mint">_</span>
            </p>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-7 text-text">
              Computer Science &amp; Engineering undergraduate building backend systems, full-stack products,
              and developer tooling.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { href: profile.github, label: "GitHub", Icon: GithubIcon },
                { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={label}
                  className="grid size-9 place-items-center border border-edge text-dim transition hover:border-mint hover:text-mint"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="label">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-xs text-dim transition hover:text-mint"
                    >
                      <span className="text-edge-hi">./</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-edge pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] text-dim">
            © {new Date().getFullYear()} {profile.name} · built with next.js &amp; typescript
          </p>
          <a
            href={`${profile.github}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-dim transition hover:text-mint"
          >
            source on github <ArrowUpRightIcon className="size-3" />
          </a>
        </div>
      </div>

      {/* oversized wordmark, clipped by the footer edge */}
      <p
        className="pointer-events-none select-none whitespace-nowrap text-center font-sans text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.75] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_#141b28]"
        aria-hidden="true"
      >
        WIJAYARATHNE
      </p>

      <StatusBar />
    </footer>
  );
}
