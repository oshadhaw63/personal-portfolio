import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  download?: boolean;
  external?: boolean;
  ariaLabel?: string;
  className?: string;
};

const variants = {
  primary:
    "border-mint bg-mint text-void hover:bg-transparent hover:text-mint",
  ghost:
    "border-edge-hi bg-panel text-text hover:border-mint hover:text-mint",
  quiet:
    "border-transparent bg-transparent text-dim hover:border-edge-hi hover:text-bright",
};

export function ButtonLink({
  href,
  children,
  variant = "ghost",
  download,
  external,
  ariaLabel,
  className = "",
}: ButtonLinkProps) {
  const classes = `group/btn inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-2.5 font-mono text-[0.8125rem] font-semibold transition duration-200 ${variants[variant]} ${className}`;

  if (external || download) {
    return (
      <a
        className={classes}
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
