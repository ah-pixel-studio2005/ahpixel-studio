import Image from "next/image";
import { Project } from "../data/site";
import { Arrow } from "./SiteShell";

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <article className="project-showcase" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="project-info" data-reveal>
        <div className="project-topline"><span>{project.number}</span><small>{project.conceptProject ? "Concept project" : project.projectType}</small><small>{project.year}</small></div>
        <h3>{project.title}</h3>
        <ul>{project.services.map(service => <li key={service}>{service}</li>)}</ul>
        <p>{project.description}</p>
        <div className="project-actions"><a className="button button-secondary" href={`/work/${project.slug}`}>View case study <Arrow /></a><a className="text-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <Arrow /></a></div>
      </div>
      <a href={`/work/${project.slug}`} className="project-stage" aria-label={`View ${project.title} case study`} data-reveal>
        <span className="stage-note">Responsive presentation / 01</span>
        <div className="project-browser">
          <div className="browser-bar"><i /><i /><i /><span>VANTA / DESKTOP</span></div>
          <Image src={project.desktopImages[0]} alt={`${project.title} desktop website homepage`} width={1425} height={990} sizes="(max-width: 860px) 88vw, 58vw" />
        </div>
        <div className="project-phone"><Image src={project.mobileImages[0]} alt={`${project.title} mobile website homepage`} width={375} height={812} sizes="(max-width: 860px) 30vw, 12vw" /></div>
        <span className="project-view">View project <Arrow /></span>
      </a>
    </article>
  );
}
