"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

export type Command = {
  label: string;
  href: string;
  group: string;
  hint?: string;
  external?: boolean;
};

function score(command: Command, query: string) {
  if (!query) return 0;
  const haystack = `${command.label} ${command.group} ${command.hint ?? ""}`.toLowerCase();
  const needle = query.toLowerCase();
  if (haystack.startsWith(needle)) return 3;
  if (command.label.toLowerCase().includes(needle)) return 2;
  if (haystack.includes(needle)) return 1;

  // subsequence match, so "rpl" still finds "RepoLens"
  let index = 0;
  for (const character of haystack) {
    if (character === needle[index]) index += 1;
    if (index === needle.length) return 0.5;
  }
  return -1;
}

export function CommandPalette({ commands }: { commands: Command[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    if (!query) return commands;
    return commands
      .map((command) => ({ command, rank: score(command, query) }))
      .filter((entry) => entry.rank >= 0)
      .sort((a, b) => b.rank - a.rank)
      .map((entry) => entry.command);
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (command: Command | undefined) => {
      if (!command) return;
      close();
      if (command.external) {
        window.open(command.href, "_blank", "noreferrer");
        return;
      }
      router.push(command.href);
    },
    [close, router],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((value) => (value + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((value) => (value - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(results[active]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex h-9 items-center gap-2 border border-edge bg-panel px-3 font-mono text-xs text-dim transition hover:border-edge-hi hover:text-bright"
        aria-label="Open command palette"
      >
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="hidden sm:inline">Jump to…</span>
        <kbd className="ml-1 hidden border border-edge px-1.5 py-0.5 text-[0.625rem] text-dim group-hover:border-edge-hi sm:inline">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-void/85 backdrop-blur-sm"
            onClick={close}
            aria-label="Close command palette"
            tabIndex={-1}
          />

          <div className="ticks relative w-full max-w-xl border border-edge-hi bg-ink shadow-[0_40px_120px_-40px_rgba(0,0,0,.9)]">
            <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
              <span className="font-mono text-sm text-mint" aria-hidden="true">
                $
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="search sections, projects, links…"
                className="w-full bg-transparent font-mono text-sm text-bright outline-none placeholder:text-dim"
                aria-label="Search"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="border border-edge px-1.5 py-0.5 font-mono text-[0.625rem] text-dim">esc</kbd>
            </div>

            <ul ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <li className="px-4 py-6 text-center font-mono text-xs text-dim">
                  no matches for &ldquo;{query}&rdquo;
                </li>
              ) : (
                results.map((command, index) => (
                  <li key={command.href + command.label}>
                    <button
                      type="button"
                      onMouseMove={() => setActive(index)}
                      onClick={() => run(command)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left font-mono text-sm transition ${
                        index === active ? "bg-panel-hi text-bright" : "text-text"
                      }`}
                    >
                      <span
                        className={`w-16 shrink-0 text-[0.625rem] uppercase tracking-[0.14em] ${
                          index === active ? "text-mint" : "text-dim"
                        }`}
                      >
                        {command.group}
                      </span>
                      <span className="flex-1 truncate">{command.label}</span>
                      {command.hint ? (
                        <span className="hidden shrink-0 text-xs text-dim sm:block">{command.hint}</span>
                      ) : null}
                      <span className={index === active ? "text-mint" : "text-transparent"} aria-hidden="true">
                        ↵
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>

            <div className="flex items-center justify-between border-t border-edge px-4 py-2 font-mono text-[0.625rem] text-dim">
              <span>↑↓ navigate · ↵ open</span>
              <span>{results.length} result{results.length === 1 ? "" : "s"}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
