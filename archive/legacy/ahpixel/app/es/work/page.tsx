import type { Metadata } from "next";
import { projects } from "../../data/site";
import { ProjectPreview } from "../../components/ProjectPreview";
import { PageHero, SectionHeader } from "../../components/ui";

export const metadata: Metadata = { title: "Proyectos Seleccionados | AHPixel Studio", description: "Proyectos seleccionados de diseño y desarrollo web por AHPixel Studio.", alternates: { canonical: "/es/work", languages: { "es-PE": "/es/work", "en-US": "/work" } } };

export default function WorkPage() {
  return <main><PageHero eyebrow="Portafolio / Proyectos seleccionados" title={<>Experiencias digitales<br /><em>seleccionadas.</em></>} intro="Una colección creciente de sitios web creados según el carácter, los objetivos y el público de cada proyecto." /><section className="work-page section-space"><SectionHeader index="01" label="Todos los proyectos" />{projects.map(project => <ProjectPreview project={project} key={project.slug} />)}<div className="coming-soon" data-reveal><span>Siguiente / 03</span><h2>Más proyectos<br /><em>próximamente.</em></h2><p>El portafolio crece de forma intencional. Aquí aparecerán nuevos conceptos web para negocios, profesionales e industrias específicas.</p></div></section></main>;
}
