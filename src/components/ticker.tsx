const items = [
  "available for software engineering internships",
  "galle · sri lanka",
  "cgpa 3.76 / 4.00",
  "dean's list × 2",
  "backend · full-stack · developer tooling",
  "6 documented projects",
  "university of moratuwa · cse",
  "c++ · typescript · python · java",
];

export function Ticker() {
  return (
    <div className="relative overflow-hidden border-b border-edge bg-panel/60 py-2.5">
      <div className="flex w-max anim-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 whitespace-nowrap px-6 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-dim"
              >
                <span className="size-1 shrink-0 bg-mint" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
