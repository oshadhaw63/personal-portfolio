import Image from "next/image";
import type { JSX } from "react";

import type { Project } from "@/types/portfolio";

type ProjectVisualProps = {
  project: Project;
  sizes: string;
  className?: string;
};

/**
 * The real screenshot when one exists; otherwise a schematic drawing of the
 * project type, clearly labelled as an illustration.
 */
export function ProjectVisual({ project, sizes, className = "" }: ProjectVisualProps) {
  const drawing = drawings[project.slug]?.();

  return (
    <div className={`visual-frame ${className}`}>
      <div className="visual-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="relative aspect-[16/10]">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={sizes}
            className="object-cover object-left-top"
          />
        ) : drawing ? (
          <>
            {drawing}
            <span className="absolute bottom-2.5 right-2.5 rounded-full border border-line bg-card px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.14em] text-muted">
              Illustration
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}

const svgProps = {
  viewBox: "0 0 320 200",
  className: "absolute inset-0 size-full",
  "aria-hidden": true,
  fill: "none",
} as const;

function RepoLensDrawing() {
  const nodes = [
    [150, 52],
    [222, 38],
    [276, 88],
    [126, 118],
    [204, 104],
    [256, 156],
    [162, 168],
  ];
  const edges = [
    [0, 1],
    [0, 4],
    [1, 2],
    [3, 4],
    [4, 2],
    [4, 5],
    [4, 6],
    [3, 6],
  ];

  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="72" height="180" rx="8" className="fill-card" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
        <rect
          key={row}
          x="20"
          y={24 + row * 18}
          width={row % 3 === 0 ? 46 : 36}
          height="6"
          rx="3"
          className="fill-line"
        />
      ))}
      {edges.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={nodes[from][0]}
          y1={nodes[from][1]}
          x2={nodes[to][0]}
          y2={nodes[to][1]}
          className="stroke-muted"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
      ))}
      {nodes.map(([x, y], index) =>
        index === 4 ? (
          <g key={index}>
            <circle cx={x} cy={y} r="16" className="fill-lavender" />
            <circle cx={x} cy={y} r="8" className="fill-ink" />
          </g>
        ) : (
          <circle key={index} cx={x} cy={y} r="6" className="fill-card stroke-fg" strokeWidth="1.3" />
        ),
      )}
    </svg>
  );
}

function UniAttendDrawing() {
  return (
    <svg {...svgProps}>
      <rect x="34" y="58" width="72" height="24" rx="12" className="fill-card stroke-line" />
      <circle cx="48" cy="70" r="5" className="fill-lavender" />
      <rect x="58" y="67" width="38" height="6" rx="3" className="fill-line" />
      <rect x="214" y="116" width="72" height="24" rx="12" className="fill-card stroke-line" />
      <circle cx="228" cy="128" r="5" className="fill-ink" />
      <rect x="238" y="125" width="38" height="6" rx="3" className="fill-line" />

      <rect x="124" y="12" width="72" height="176" rx="14" className="fill-card stroke-fg" strokeOpacity="0.35" />
      <rect x="148" y="19" width="24" height="5" rx="2.5" className="fill-line" />
      <circle cx="160" cy="62" r="14" className="fill-lavender" />
      <rect x="153" y="60" width="14" height="10" rx="2" className="fill-ink" />
      <path d="M156 60v-3a4 4 0 0 1 8 0v3" className="stroke-ink" strokeWidth="1.6" />
      <rect x="136" y="92" width="48" height="10" rx="5" className="fill-bg stroke-line" />
      <rect x="136" y="108" width="48" height="10" rx="5" className="fill-bg stroke-line" />
      <rect x="136" y="128" width="48" height="12" rx="6" className="fill-ink" />
      <rect x="146" y="152" width="28" height="4" rx="2" className="fill-line" />
    </svg>
  );
}

function DisasterDrawing() {
  return (
    <svg {...svgProps}>
      <rect x="10" y="10" width="62" height="180" rx="8" className="fill-card" />
      {[0, 1, 2, 3, 4, 5].map((row) => (
        <g key={row}>
          <circle cx="22" cy={30 + row * 24} r="3.5" className={row === 1 ? "fill-ink" : "fill-line"} />
          <rect x="30" y={27 + row * 24} width="32" height="6" rx="3" className="fill-line" />
        </g>
      ))}
      {[0, 1, 2].map((box) => (
        <rect key={box} x={80 + box * 78} y="10" width="72" height="30" rx="7" className="fill-card" />
      ))}
      <rect x="80" y="48" width="230" height="142" rx="8" className="fill-lavender" fillOpacity="0.55" />
      <path d="M80 120c40-20 70 10 110-8s70-30 120-6" className="stroke-fg" strokeOpacity="0.15" />
      <path d="M80 150c50-16 80 12 120-4s70-18 110 0" className="stroke-fg" strokeOpacity="0.15" />
      <path d="M80 90c30-14 60 6 100-10s80-18 130-4" className="stroke-fg" strokeOpacity="0.15" />
      {[
        [140, 96],
        [214, 132],
        [262, 82],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="12" className="fill-ink" fillOpacity="0.12" />
          <circle cx={x} cy={y} r="4.5" className="fill-ink" />
        </g>
      ))}
    </svg>
  );
}

function FlowerExchangeDrawing() {
  const bids = [118, 96, 84, 62, 48, 30];
  const asks = [104, 90, 70, 58, 40, 26];

  return (
    <svg {...svgProps}>
      <rect x="30" y="16" width="40" height="6" rx="3" className="fill-line" />
      <rect x="250" y="16" width="40" height="6" rx="3" className="fill-line" />
      <line x1="160" y1="12" x2="160" y2="140" className="stroke-fg" strokeOpacity="0.2" strokeDasharray="3 4" />
      {bids.map((width, row) => (
        <rect
          key={`b${row}`}
          x={154 - width}
          y={30 + row * 18}
          width={width}
          height="12"
          rx="3"
          className="fill-ink"
          fillOpacity={1 - row * 0.12}
        />
      ))}
      {asks.map((width, row) => (
        <rect key={`a${row}`} x="166" y={30 + row * 18} width={width} height="12" rx="3" className="fill-lavender" />
      ))}
      <path
        d="M24 184 52 176l28 4 28-14 28 6 28-18 28 8 28-10 28 6 28-16 22 4"
        className="stroke-fg"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RpalDrawing() {
  const nodes: [number, number, string][] = [
    [160, 32, "let"],
    [100, 82, "λ"],
    [220, 82, "γ"],
    [64, 134, "x"],
    [136, 134, "+"],
    [196, 134, "E"],
    [252, 134, "1"],
    [136, 180, "x"],
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
    [4, 7],
  ];

  return (
    <svg {...svgProps}>
      {edges.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={nodes[from][0]}
          y1={nodes[from][1]}
          x2={nodes[to][0]}
          y2={nodes[to][1]}
          className="stroke-muted"
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
      ))}
      {nodes.map(([x, y, label], index) => (
        <g key={index}>
          <circle
            cx={x}
            cy={y}
            r="14"
            className={index === 0 ? "fill-ink" : "fill-card stroke-fg"}
            strokeOpacity="0.4"
          />
          <text
            x={x}
            y={y + 5}
            textAnchor="middle"
            className={`serif ${index === 0 ? "fill-ink-fg" : "fill-fg"}`}
            fontSize="15"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const drawings: Record<string, () => JSX.Element> = {
  repolens: RepoLensDrawing,
  uniattend: UniAttendDrawing,
  "disaster-response-system": DisasterDrawing,
  "flower-exchange": FlowerExchangeDrawing,
  "rpal-interpreter": RpalDrawing,
};
