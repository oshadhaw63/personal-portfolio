/** Home-page sections, in page order. Numbers are shown in section labels. */
export const sections = [
  { id: "about", label: "About", number: "01" },
  { id: "skills", label: "Skills", number: "02" },
  { id: "work", label: "Work", number: "03" },
  { id: "experience", label: "Experience", number: "04" },
  { id: "education", label: "Education", number: "05" },
  { id: "achievements", label: "Achievements", number: "06" },
  { id: "learning", label: "Learning", number: "07" },
  { id: "contact", label: "Contact", number: "08" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

const primary: SectionId[] = ["about", "skills", "work", "experience", "education", "achievements", "contact"];

/** The shorter set shown in the desktop navigation pill. */
export const navigation = sections.filter((section) => primary.includes(section.id));

export function getSection(id: SectionId) {
  return sections.find((section) => section.id === id)!;
}
