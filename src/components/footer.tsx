import Link from "next/link";

import { profile } from "@/data/portfolio";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm link-quiet">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-sm link-quiet">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-sm link-quiet">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
