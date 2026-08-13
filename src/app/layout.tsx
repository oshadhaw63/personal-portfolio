import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import type { Command } from "@/components/command-palette";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { profile, projects } from "@/data/portfolio";

import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const code = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-code",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oshadha-wijayarathne.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Software Engineering Portfolio`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Software engineering portfolio of Oshadha Wijayarathne, a Computer Science and Engineering undergraduate at the University of Moratuwa.",
  keywords: [
    "Oshadha Wijayarathne",
    "software engineering portfolio",
    "University of Moratuwa",
    "computer science",
    "backend engineering",
    "full-stack engineering",
    "developer tools",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — Software Engineering Portfolio`,
    description:
      "Full-stack applications, backend systems, developer tools, and systems-oriented academic projects.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: profile.name,
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — Software Engineering Portfolio`,
    description:
      "Full-stack applications, backend systems, developer tools, and systems-oriented academic projects.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#04060a",
  colorScheme: "dark",
};

const commands: Command[] = [
  { label: "About", href: "/#about", group: "section", hint: "profile" },
  { label: "Projects", href: "/#projects", group: "section", hint: "selected work" },
  { label: "Stack", href: "/#stack", group: "section", hint: "tools" },
  { label: "Education", href: "/#education", group: "section", hint: "timeline" },
  { label: "Contact", href: "/#contact", group: "section", hint: "get in touch" },
  ...projects.map((project) => ({
    label: project.title,
    href: `/projects/${project.slug}`,
    group: "project",
    hint: project.eyebrow,
  })),
  { label: "GitHub", href: profile.github, group: "link", hint: "oshadhaw63", external: true },
  { label: "LinkedIn", href: profile.linkedin, group: "link", hint: "profile", external: true },
  { label: "Email", href: `mailto:${profile.email}`, group: "link", hint: profile.email, external: true },
  { label: "Download CV", href: profile.cv, group: "link", hint: "pdf", external: true },
];

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Galle",
      addressCountry: "LK",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.university,
    },
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <html lang="en" className={`${display.variable} ${code.variable}`}>
      <body className="min-h-screen bg-void text-text antialiased">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header commands={commands} />
        <div id="main-content">{children}</div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
