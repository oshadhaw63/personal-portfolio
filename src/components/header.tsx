import Link from "next/link";

import { profile } from "@/data/portfolio";

const navigation = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-[0.9375rem] font-semibold tracking-tight">
          {profile.name}
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={profile.cv}
            download
            className="text-sm font-medium text-fg underline decoration-line underline-offset-[6px] transition hover:decoration-fg"
          >
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
