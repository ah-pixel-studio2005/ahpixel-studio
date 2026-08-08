import Image from "next/image";
import { Project } from "../data/site";
import { Arrow } from "./SiteShell";

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <article className="project-feature" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="project-heading" data-reveal>
        <span className="project-index">{project.number}</span>
        <div>
          <div className="project-badges">{project.conceptProject && <span>Concept project</span>}<small>{project.year}</small></div>
          <h3>{project.title}</h3>
          <p className="project-category">{project.category}</p>
        </div>
        <p className="project-description">{project.description}</p>
      </div>
      <a href={`/work/${project.slug}`} className="project-visual" data-reveal aria-label={`View ${project.title} case study`}>
        <div className="project-browser"><span /><span /><span /><Image src={project.desktopImages[0]} alt={`${project.title} desktop website homepage`} width={1425} height={990} sizes="(max-width: 860px) 92vw, 72vw" /></div>
        <div className="project-phone"><Image src={project.mobileImages[0]} alt={`${project.title} mobile website homepage`} width={375} height={812} sizes="(max-width: 860px) 28vw, 15vw" /></div>
        <span className="project-cursor">View project <Arrow /></span>
      </a>
      <div className="project-actions" data-reveal>
        <a className="button button-outline" href={`/work/${project.slug}`}>View case study <Arrow /></a>
        <a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live website <Arrow /></a>
      </div>
    </article>
  );
}

