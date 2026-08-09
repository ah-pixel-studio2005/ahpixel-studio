"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "../SiteShell";
import { projects } from "../../data/site";

const sceneMeta = [
  { label: "Concept project", title: "Vanta Barber Club", note: "Web design / Frontend" },
  { label: "Art direction", title: "Editorial by design", note: "Typography / Atmosphere" },
  { label: "Responsive experience", title: "Built for every screen", note: "375 → 1920" },
];

export function ProjectStage() {
  const root = useRef<HTMLElement>(null);
  const [scene, setScene] = useState(0);
  const project = projects[0];

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let frame = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const available = Math.max(1, rect.height - innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / available));
      node.style.setProperty("--project-progress", progress.toFixed(3));
      const next = progress < .34 ? 0 : progress < .7 ? 1 : 2;
      setScene(current => current === next ? current : next);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return <section ref={root} id="work" className={`project-scroll-stage scene-${scene + 1}`} data-home-section="02" data-nav="work">
    <div className="project-sticky">
      <div className="project-stage-meta" aria-live="polite">
        <span className="project-stage-count">0{scene + 1} / 03</span>
        <p>{sceneMeta[scene].label}</p>
        <h2>{sceneMeta[scene].title}</h2>
        <small>{sceneMeta[scene].note}</small>
        <div className="project-stage-dots" aria-hidden="true">{sceneMeta.map((_, index) => <i className={index <= scene ? "active" : ""} key={index}/>)}</div>
        <div className="project-stage-links"><a href={`/work/${project.slug}`}>View case study <Arrow /></a><a href={project.liveUrl} target="_blank" rel="noreferrer">Live website <Arrow /></a></div>
      </div>
      <div className="vanta-stage-canvas">
        <div className="vanta-scene vanta-scene-one"><div className="stage-browser-shell"><div className="browser-bar"><i/><i/><i/><span>VANTA / HOME</span></div><Image src={project.desktopImages[0]} alt="Vanta Barber Club homepage" width={1425} height={990} sizes="(max-width: 768px) 92vw, 62vw" /></div></div>
        <div className="vanta-scene vanta-scene-two"><div className="stage-browser-shell alternate"><div className="browser-bar"><i/><i/><i/><span>VANTA / ART DIRECTION</span></div><Image src={project.desktopImages[1]} alt="Vanta Barber Club art direction and process" width={1425} height={786} sizes="(max-width: 768px) 92vw, 58vw" /></div></div>
        <div className="vanta-scene vanta-scene-three"><div className="stage-mobile-pair"><div><Image src={project.mobileImages[0]} alt="Vanta mobile homepage" width={375} height={812} sizes="(max-width: 768px) 44vw, 16vw" /></div><div><Image src={project.mobileImages[1]} alt="Vanta responsive detail" width={375} height={750} sizes="(max-width: 768px) 44vw, 16vw" /></div></div></div>
        <span className="stage-coordinate">Project 01 / X 0768 / Y 0430</span>
      </div>
    </div>
    <div className="project-mobile-scenes">
      <MobileScene number="01" label="Vanta Barber Club" image={project.desktopImages[0]} alt="Vanta desktop homepage" />
      <MobileScene number="02" label="Art direction" image={project.desktopImages[1]} alt="Vanta art direction" />
      <div className="project-mobile-scene"><span>03 / Responsive experience</span><div className="mobile-vanta-pair"><Image src={project.mobileImages[0]} alt="Vanta mobile homepage" width={375} height={812}/><Image src={project.mobileImages[1]} alt="Vanta mobile detail" width={375} height={750}/></div><div className="mobile-stage-links"><a href={`/work/${project.slug}`}>View case study <Arrow/></a><a href={project.liveUrl} target="_blank" rel="noreferrer">Live website <Arrow/></a></div></div>
    </div>
  </section>;
}

function MobileScene({number,label,image,alt}:{number:string;label:string;image:string;alt:string}) {
  return <div className="project-mobile-scene"><span>{number} / {label}</span><div className="mobile-stage-browser"><Image src={image} alt={alt} width={1425} height={990}/></div></div>;
}
