"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Arrow } from "../SiteShell";
import { projects } from "../../data/site";
import { TrackedLink } from "../TrackedLink";
import type { HomeLanguage } from "../../page";

function useCompactLayout() {
  const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 860px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 860px)");
    const update = () => setCompact(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return compact;
}

export function ProjectStage({ language }: { language: HomeLanguage }) {
  const [projectIndex, setProjectIndex] = useState(0);
  const [scene, setScene] = useState(0);
  const compact = useCompactLayout();
  const project = projects[projectIndex];
  const lumen = project.slug === "lumen-dental-studio";
  const spanish = language === "es";
  const prefix = spanish ? "/es" : "";
  const sceneMeta = spanish ? [
    { label: "Proyecto conceptual", title: project.title, note: lumen ? "Odontología / Salud" : "Barbería / Cuidado personal" },
    { label: "Dirección de arte", title: lumen ? "Calma por diseño" : "Editorial por diseño", note: lumen ? "Claridad / Confianza" : "Tipografía / Atmósfera" },
    { label: "Experiencia responsive", title: "Diseñado para cada pantalla", note: "375 → 1920" },
  ] : [
    { label: "Concept project", title: project.title, note: project.industry },
    { label: "Art direction", title: lumen ? "Calm by design" : "Editorial by design", note: lumen ? "Clarity / Trust" : "Typography / Atmosphere" },
    { label: "Responsive experience", title: "Built for every screen", note: "375 → 1920" },
  ];
  const labels = spanish ? {
    selected: "Proyectos seleccionados", views: "Vistas del proyecto", show: "Mostrar", caseStudy: "Ver caso de estudio",
    live: "Ver sitio web", previous: "Vista anterior", next: "Vista siguiente", project: "Proyecto",
    home: "INICIO", direction: "DIRECCIÓN DE ARTE", homepage: "página de inicio", mobileHomepage: "página de inicio móvil", detail: "detalle móvil",
  } : {
    selected: "Selected projects", views: "Project views", show: "Show", caseStudy: "View case study",
    live: "Live website", previous: "Previous project view", next: "Next project view", project: "Project",
    home: "HOME", direction: "ART DIRECTION", homepage: "homepage", mobileHomepage: "mobile homepage", detail: "mobile detail",
  };

  const selectProject = (index: number) => { setProjectIndex(index); setScene(0); };

  return <section id="work" className={`project-scroll-stage scene-${scene + 1} ${lumen ? "lumen-project-stage" : ""}`} data-home-section="02" data-nav="work">
    {!compact && <div className="project-sticky">
      <div className="project-stage-meta" aria-live="polite">
        <div className="featured-project-switch" aria-label={labels.selected}>{projects.map((item,index)=><button type="button" className={index===projectIndex?"active":""} onClick={()=>selectProject(index)} key={item.slug}><span>{item.number}</span>{item.title}</button>)}</div>
        <span className="project-stage-count">0{scene + 1} / 03</span>
        <p>{sceneMeta[scene].label}</p>
        <h2>{sceneMeta[scene].title}</h2>
        <small>{sceneMeta[scene].note}</small>
        <div className="project-stage-dots" aria-label={labels.views}>{sceneMeta.map((item,index)=><button type="button" className={index<=scene?"active":""} aria-label={`${labels.show} ${item.title}`} aria-pressed={index===scene} onClick={()=>setScene(index)} key={`${project.slug}-${item.label}`}/>)}</div>
        <div className="project-stage-links"><TrackedLink eventName="case_study_clicked" eventDetail={{project:project.slug,source:"home_stage"}} href={`${prefix}/work/${project.slug}`}>{labels.caseStudy} <Arrow /></TrackedLink>{project.liveUrl&&<TrackedLink eventName="live_demo_clicked" eventDetail={{project:project.slug,source:"home_stage"}} href={project.liveUrl} target="_blank" rel="noopener noreferrer">{labels.live} <Arrow /></TrackedLink>}</div>
      </div>
      <div className="vanta-stage-canvas">
        <button type="button" className="project-stage-arrow previous" onClick={()=>setScene(current=>Math.max(0,current-1))} disabled={scene===0} aria-label={labels.previous}><span aria-hidden="true">‹</span></button>
        <div className="vanta-scene vanta-scene-one"><div className="stage-browser-shell"><div className="browser-bar"><i/><i/><i/><span>{project.title.split(" ")[0].toUpperCase()} / {labels.home}</span></div><Image src={project.desktopImages[0]} alt={`${project.title} ${labels.homepage}`} width={1440} height={1000} sizes="62vw" /></div></div>
        <div className="vanta-scene vanta-scene-two"><div className="stage-browser-shell alternate"><div className="browser-bar"><i/><i/><i/><span>{project.title.split(" ")[0].toUpperCase()} / {labels.direction}</span></div><Image src={project.desktopImages[1]} alt={`${project.title} ${labels.direction.toLowerCase()}`} width={1440} height={1000} sizes="58vw" /></div></div>
        <div className="vanta-scene vanta-scene-three"><div className="stage-mobile-pair"><div><Image src={project.mobileImages[0]} alt={`${project.title} ${labels.mobileHomepage}`} width={390} height={844} sizes="16vw" /></div><div><Image src={project.mobileImages[1]} alt={`${project.title} ${labels.detail}`} width={390} height={844} sizes="16vw" /></div></div></div>
        <button type="button" className="project-stage-arrow next" onClick={()=>setScene(current=>Math.min(2,current+1))} disabled={scene===2} aria-label={labels.next}><span aria-hidden="true">›</span></button>
        <span className="stage-coordinate">{labels.project} {project.number} / X 0768 / Y 0430</span>
      </div>
    </div>}
    {compact && <div className="project-mobile-scenes">{projects.map(item=><article className="mobile-featured-project" key={item.slug}><span>{item.number} / {item.title}</span><div className="mobile-stage-browser"><Image src={item.desktopImages[0]} alt={`${item.title} ${labels.homepage}`} width={1440} height={1000}/></div><div className="mobile-vanta-pair"><Image src={item.mobileImages[0]} alt={`${item.title} ${labels.mobileHomepage}`} width={390} height={844}/><Image src={item.mobileImages[1]} alt={`${item.title} ${labels.detail}`} width={390} height={844}/></div><div className="mobile-stage-links"><TrackedLink eventName="case_study_clicked" eventDetail={{project:item.slug,source:"home_mobile_stage"}} href={`${prefix}/work/${item.slug}`}>{labels.caseStudy} <Arrow/></TrackedLink>{item.liveUrl&&<TrackedLink eventName="live_demo_clicked" eventDetail={{project:item.slug,source:"home_mobile_stage"}} href={item.liveUrl} target="_blank" rel="noopener noreferrer">{labels.live} <Arrow/></TrackedLink>}</div></article>)}</div>}
  </section>;
}
