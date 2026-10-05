import type { SectionId } from "@/lib/sections";
import { getSection } from "@/lib/sections";

/** Small numbered uppercase label that opens every home-page section. */
export function SectionLabel({ id, label, className = "" }: { id: SectionId; label?: string; className?: string }) {
  const section = getSection(id);

  return (
    <p className={`eyebrow ${className}`}>
      <span className="eyebrow-num">{section.number}</span>
      <span className="eyebrow-rule" aria-hidden="true" />
      <span>{label ?? section.label}</span>
    </p>
  );
}
