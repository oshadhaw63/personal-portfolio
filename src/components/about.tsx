import { Panel } from "@/components/panel";
import { ArrowUpRightIcon, GithubIcon, MailIcon, MapPinIcon } from "@/components/icons";
import { profile } from "@/data/portfolio";

type Block = { kind: "h1" | "h2" | "p" | "quote" | "blank"; text?: string };

const blocks: Block[] = [
  { kind: "h1", text: "# Oshadha Wijayarathne" },
  { kind: "blank" },
  {
    kind: "p",
    text: "I study Computer Science and Engineering at the University of Moratuwa. My work spans full-stack products, mobile identity flows, backend APIs, developer tools, networking, and systems-oriented coursework.",
  },
  { kind: "blank" },
  { kind: "h2", text: "## how I work" },
  { kind: "blank" },
  {
    kind: "p",
    text: "I enjoy the parts of engineering where correctness and product behaviour meet: modelling state transitions, designing clear service boundaries, tracing dependencies, protecting routes, and making complex workflows understandable.",
  },
  { kind: "blank" },
  { kind: "h2", text: "## what I am looking for" },
  { kind: "blank" },
  {
    kind: "p",
    text: "An internship where I can deepen those skills while contributing to maintainable software — backend, full-stack, platform, or developer tooling.",
  },
  { kind: "blank" },
  {
    kind: "quote",
    text: "> Every project on this site lists what is implemented, what is not, and which parts are mine.",
  },
];

const now = [
  { state: "building", text: "RepoLens — AST-based repository explorer", tone: "text-mint" },
  { state: "shipping", text: "UniAttend — Keycloak + PKCE mobile identity", tone: "text-cyan" },
  { state: "studying", text: "Semester 5 — CSE, University of Moratuwa", tone: "text-violet" },
  { state: "seeking", text: "Software engineering internship, 2026", tone: "text-amber" },
];

export function About() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
      <Panel
        label="~/about.md"
        chrome
        bodyClassName="p-0"
        aside={<span className="font-mono text-[0.625rem] text-dim">markdown</span>}
      >
        <div className="overflow-x-auto">
          <div className="min-w-full font-mono text-[0.8125rem]">
            {blocks.map((block, index) => {
              const number = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={index}
                  className="group flex gap-4 px-4 transition hover:bg-panel-hi/70 sm:px-5"
                >
                  <span
                    className="w-6 shrink-0 select-none py-1 text-right text-[0.6875rem] leading-6 text-edge-hi transition group-hover:text-dim"
                    aria-hidden="true"
                  >
                    {number}
                  </span>

                  {block.kind === "blank" ? (
                    <span className="py-1 leading-6">&nbsp;</span>
                  ) : block.kind === "h1" ? (
                    <span className="py-1 font-sans text-lg font-bold leading-6 tracking-tight text-mint">
                      {block.text}
                    </span>
                  ) : block.kind === "h2" ? (
                    <span className="py-1 text-[0.8125rem] font-bold leading-6 text-cyan">{block.text}</span>
                  ) : block.kind === "quote" ? (
                    <span className="border-l-2 border-mint/50 py-1 pl-3 font-sans text-[0.9375rem] italic leading-7 text-bright">
                      {block.text?.replace("> ", "")}
                    </span>
                  ) : (
                    <span className="py-1 font-sans text-[0.9375rem] leading-7 text-text">{block.text}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      <div className="space-y-6">
        <Panel label="now" bodyClassName="p-0">
          <ul>
            {now.map((item, index) => (
              <li
                key={item.text}
                className={`flex gap-3 px-4 py-3 sm:px-5 ${index > 0 ? "border-t border-edge" : ""}`}
              >
                <span
                  className={`w-16 shrink-0 pt-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] ${item.tone}`}
                >
                  {item.state}
                </span>
                <span className="text-[0.875rem] leading-6 text-text">{item.text}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel label="contact.json" bodyClassName="p-4 sm:p-5">
          <ul className="space-y-3.5 font-mono text-[0.8125rem]">
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-dim" />
              <span className="text-text">{profile.location}</span>
            </li>
            <li className="flex items-start gap-3">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-dim" />
              <a className="break-all text-text transition hover:text-mint" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <GithubIcon className="mt-0.5 size-4 shrink-0 text-dim" />
              <a
                className="inline-flex items-center gap-1 text-text transition hover:text-mint"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                oshadhaw63 <ArrowUpRightIcon className="size-3" />
              </a>
            </li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}
