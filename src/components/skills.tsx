import { skillGroups } from "@/data/portfolio";

export function Skills() {
  const total = skillGroups.reduce((count, group) => count + group.skills.length, 0);

  return (
    <div className="border border-edge bg-panel">
      <div className="grid gap-3 border-b border-edge bg-panel-hi/60 px-4 py-2.5 sm:grid-cols-[minmax(150px,190px)_1fr] sm:gap-6 sm:px-5">
        <span className="label">domain</span>
        <span className="flex items-center justify-between gap-4">
          <span className="label hidden sm:block">tools</span>
          <span className="ml-auto font-mono text-[0.6875rem] text-mint">{total} entries</span>
        </span>
      </div>

      <dl>
        {skillGroups.map((group, index) => (
          <div
            key={group.category}
            className={`group grid gap-3 px-4 py-4 transition hover:bg-panel-hi sm:grid-cols-[minmax(150px,190px)_1fr] sm:gap-6 sm:px-5 sm:py-4 ${
              index > 0 ? "border-t border-edge" : ""
            }`}
          >
            <dt className="flex items-baseline gap-2.5">
              <span className="font-mono text-[0.6875rem] text-edge-hi transition group-hover:text-mint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-sm font-semibold text-bright">{group.category}</span>
              <span className="ml-auto font-mono text-[0.6875rem] text-dim sm:ml-0">
                ×{group.skills.length}
              </span>
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5" aria-label={`${group.category} skills`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-edge bg-void/50 px-2.5 py-1 font-mono text-[0.75rem] text-text transition hover:border-mint/60 hover:text-mint"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
