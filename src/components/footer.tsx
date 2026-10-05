import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";

const socials = [
  { href: profile.github, label: "GitHub", Icon: GithubIcon, external: true },
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon, external: true },
  { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon, external: false },
];

export function Footer() {
  return (
    <footer className="ink-section">
      <div className="wrap flex flex-col gap-6 border-t hairline py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="ink-muted text-[0.8125rem]">
          © {new Date().getFullYear()}{" "}
          <span className="serif text-[1rem] text-[var(--contact-fg)]">{profile.name}</span>
        </p>

        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-1">
            {socials.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="link-quiet grid size-9 place-items-center rounded-full"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
          <a href="#main-content" className="link-quiet text-[0.8125rem]">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
