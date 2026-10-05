import { RevealObserver } from "@/components/reveal-observer";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Learning } from "@/components/sections/learning";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Work />
      <Experience />
      <Education />
      <Achievements />
      <Learning />
      <Contact />
      <RevealObserver />
    </main>
  );
}
