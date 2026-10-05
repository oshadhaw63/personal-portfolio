"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { getCertificationsFor, getProjectsUsing, skillGroups } from "@/data/portfolio";
import { cssVars } from "@/lib/style";
import type { Skill } from "@/types/portfolio";

/*
 * Desktop geometry. Like the real table, the outer columns run full height
 * and the shorter middle groups sit on the floor, leaving a gap at the top
 * for the key.
 */
const COLUMN_ORDER = ["languages", "frontend", "data", "cloud", "testing", "auth", "backend"];
const FLOOR_ALIGNED = new Set(["data", "cloud", "testing"]);

type Element = Skill & {
  index: number;
  number: string;
  groupId: string;
  category: string;
  tint: number;
  col: number;
  row: number;
};

function buildElements(): Element[] {
  const rows = Math.max(...skillGroups.map((group) => group.skills.length));
  let index = 0;

  return skillGroups.flatMap((group, groupIndex) => {
    const position = COLUMN_ORDER.indexOf(group.id);
    const col = (position === -1 ? groupIndex : position) + 1;
    const firstRow = FLOOR_ALIGNED.has(group.id) ? rows - group.skills.length + 1 : 1;

    return group.skills.map((skill, skillIndex) => {
      index += 1;
      return {
        ...skill,
        index,
        number: String(index).padStart(2, "0"),
        groupId: group.id,
        category: group.category,
        tint: (groupIndex % 7) + 1,
        col,
        row: firstRow + skillIndex,
      };
    });
  });
}

const elements = buildElements();

export function SkillsTable() {
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<number | null>(null);
  const [preview, setPreview] = useState<number | null>(null);

  const shownIndex = preview ?? selected;
  const shown = shownIndex === null ? null : (elements.find((element) => element.index === shownIndex) ?? null);

  return (
    <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-14">
      {/* Filters */}
      <div
        role="group"
        aria-label="Filter skills by category"
        className="flex flex-wrap gap-2 lg:col-start-1 lg:row-start-1"
      >
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")} count={elements.length}>
          All
        </FilterPill>
        {skillGroups.map((group) => (
          <FilterPill
            key={group.id}
            active={filter === group.id}
            onClick={() => setFilter(filter === group.id ? "all" : group.id)}
            count={group.skills.length}
          >
            {group.category}
          </FilterPill>
        ))}
      </div>

      {/* Detail */}
      <aside
        aria-live="polite"
        className="rounded-[1.25rem] border border-line bg-card p-5 sm:p-6 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
      >
        {shown ? <SkillDetail element={shown} /> : <EmptyDetail total={elements.length} groups={skillGroups.length} />}
      </aside>

      {/* Table */}
      <div className="ptable lg:col-start-1 lg:row-start-2" onMouseLeave={() => setPreview(null)}>
        <div className="ptable-key hidden items-center gap-4 self-center px-3 lg:flex" aria-hidden="true">
          <div
            className="tile pointer-events-none w-[4.25rem] shrink-0"
            style={cssVars({ "--tile-bg": "var(--card)" })}
          >
            <span className="tile-num">01</span>
            <span className="tile-symbol text-[1.1rem]">Sy</span>
            <span className="tile-name">Name</span>
          </div>
          <p className="text-[0.6875rem] leading-relaxed text-muted">
            <span className="block font-medium uppercase tracking-[0.16em] text-fg">Key</span>
            Index, symbol, and skill. Columns are groups.
          </p>
        </div>

        {elements.map((element) => {
          const dim = filter !== "all" && filter !== element.groupId;
          const pressed = selected === element.index;

          return (
            <button
              key={element.index}
              type="button"
              className="tile"
              aria-pressed={pressed}
              aria-label={`${element.name}, ${element.category}`}
              data-dim={dim}
              data-preview={!pressed && preview === element.index}
              style={cssVars({
                "--tile-bg": `var(--tint-${element.tint})`,
                "--col": element.col,
                "--row": element.row,
              })}
              onMouseEnter={() => setPreview(element.index)}
              onFocus={() => setPreview(element.index)}
              onBlur={() => setPreview(null)}
              onClick={() => setSelected(pressed ? null : element.index)}
            >
              <span className="tile-num">{element.number}</span>
              <span className="tile-symbol">{element.symbol}</span>
              <span className="tile-name">{element.label ?? element.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`pill min-h-9 gap-2 px-3.5 text-[0.8125rem] ${active ? "pill-solid" : ""}`}
    >
      {children}
      <span className="text-[0.6875rem] tabular-nums opacity-60">{count}</span>
    </button>
  );
}

function EmptyDetail({ total, groups }: { total: number; groups: number }) {
  return (
    <div>
      <p className="eyebrow">Element detail</p>
      <p className="mt-5 text-[1.75rem] font-semibold leading-tight tracking-tight">
        {total} skills, <span className="serif text-accent">{groups} groups.</span>
      </p>
      <p className="mt-3 text-[0.9375rem] leading-7 text-muted">
        Everything here comes from my CV. Hover, focus, or tap a tile to see where I have used it.
      </p>
    </div>
  );
}

function SkillDetail({ element }: { element: Element }) {
  const used = getProjectsUsing(element.name);
  const certified = getCertificationsFor(element.name);

  return (
    <div key={element.index} className="swap-in">
      <div className="flex items-start gap-4 lg:flex-col">
        <div className="skill-detail-tile shrink-0">
          <span className="text-[0.6875rem] tabular-nums opacity-70">{element.number}</span>
          <span className="mt-auto text-[2.5rem] font-semibold leading-none tracking-[-0.04em]">{element.symbol}</span>
        </div>
        <div>
          <p className="eyebrow">{element.category}</p>
          <h3 className="mt-2 text-[1.5rem] font-semibold leading-tight tracking-tight">{element.name}</h3>
        </div>
      </div>

      <div className="mt-6 space-y-5 border-t border-line pt-5 text-[0.875rem]">
        {used.length > 0 ? (
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">Used in</p>
            <ul className="mt-2 space-y-1.5">
              {used.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="text-link">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {certified.length > 0 ? (
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted">Certification</p>
            <ul className="mt-2 space-y-1.5 leading-snug">
              {certified.map((certification) => (
                <li key={certification.title}>
                  {certification.title} <span className="text-muted">— {certification.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {used.length === 0 && certified.length === 0 ? (
          <p className="leading-6 text-muted">Listed under {element.category} in my CV.</p>
        ) : null}
      </div>
    </div>
  );
}
