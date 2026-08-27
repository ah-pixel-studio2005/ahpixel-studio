import { Metadata } from "next";
import { InteractiveHero } from "./components/interactive/InteractiveHero";
import { ProjectStage } from "./components/interactive/ProjectStage";
import { ServicesExplorer } from "./components/interactive/ServicesExplorer";
import { BuildJourney } from "./components/interactive/BuildJourney";
import { StudioPlayground } from "./components/interactive/StudioPlayground";
import { ProjectStarter } from "./components/interactive/ProjectStarter";
import { SectionProgress } from "./components/interactive/SectionProgress";

export const metadata: Metadata = {
  title: "AHPixel Studio | Web Design & Development",
  description: "AHPixel Studio designs and builds modern, fast and responsive websites for businesses and professionals.",
  alternates: { canonical: "/" },
};

export type HomeLanguage = "en" | "es";

export default function HomePage({ language = "en" }: { language?: HomeLanguage }) {
  return <main className="interactive-home">
    <InteractiveHero language={language} />
    <ProjectStage language={language} />
    <ServicesExplorer language={language} />
    <BuildJourney language={language} />
    <StudioPlayground language={language} />
    <ProjectStarter language={language} />
    <SectionProgress language={language} />
  </main>;
}
