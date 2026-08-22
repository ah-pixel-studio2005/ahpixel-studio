import { Metadata } from "next";
import { projects } from "../data/site";
import { ProjectPreview } from "../components/ProjectPreview";
import { PageHero, SectionHeader } from "../components/ui";

export const metadata: Metadata = { title: "AHPixel Studio | Selected Work", description: "Selected web design and development projects by AHPixel Studio.", alternates: { canonical: "/work" } };

export default function WorkPage() {
  return <main><PageHero eyebrow="Portfolio / Selected projects" title={<>Selected digital<br /><em>experiences.</em></>} intro="A growing collection of websites shaped around each project's own character, goals and audience." /><section className="work-page section-space"><SectionHeader index="01" label="All projects" />{projects.map(project => <ProjectPreview project={project} key={project.slug} />)}<div className="coming-soon" data-reveal><span>Next / 03</span><h2>More projects<br /><em>coming soon.</em></h2><p>The portfolio is growing deliberately. New business, professional and industry-focused website concepts will be added here.</p></div></section></main>;
}

