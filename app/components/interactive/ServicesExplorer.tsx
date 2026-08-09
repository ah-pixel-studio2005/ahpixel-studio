"use client";

import { PointerEvent, useState } from "react";
import { Arrow } from "../SiteShell";

const services = [
  { number:"01", title:"Landing page", goal:"Lead generation", structure:"1 focused page", action:"Contact", description:"A focused conversion path that turns one clear offer into action.", preview:"landing" },
  { number:"02", title:"Business website", goal:"Credibility", structure:"Multi-page", action:"Explore services", description:"A complete digital presence that explains the business with confidence.", preview:"business" },
  { number:"03", title:"Professional website", goal:"Trust & booking", structure:"Profile system", action:"Book a consultation", description:"Expertise, proof and a frictionless route from interest to inquiry.", preview:"professional" },
  { number:"04", title:"Website redesign", goal:"Modernize", structure:"Before → after", action:"Improve the journey", description:"A sharper hierarchy and interface built from what already works.", preview:"redesign" },
];

export function ServicesExplorer() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const nudge = (event:PointerEvent<HTMLButtonElement>) => {
    if (matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const r=event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--sx",`${((event.clientX-r.left)/r.width-.5)*6}px`);
    event.currentTarget.style.setProperty("--sy",`${((event.clientY-r.top)/r.height-.5)*4}px`);
  };
  const reset=(event:PointerEvent<HTMLButtonElement>)=>{event.currentTarget.style.setProperty("--sx","0px");event.currentTarget.style.setProperty("--sy","0px")};
  return <section id="services" className="services-explorer" data-home-section="03" data-nav="services">
    <div className="experience-heading"><span>03 / Services explorer</span><h2>What should<br/>your website do?</h2></div>
    <div className="services-console">
      <div className="service-selector" role="tablist" aria-label="Website service types">
        {services.map((item,index)=><button key={item.number} role="tab" aria-selected={active===index} aria-controls="service-preview" className={active===index?"active":""} onFocus={()=>setActive(index)} onPointerEnter={()=>setActive(index)} onPointerMove={nudge} onPointerLeave={reset} onClick={()=>setActive(index)} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();setActive(index)}if(event.key==="ArrowDown"||event.key==="ArrowRight"){event.preventDefault();setActive((index+1)%services.length)}if(event.key==="ArrowUp"||event.key==="ArrowLeft"){event.preventDefault();setActive((index-1+services.length)%services.length)}}}><span>{item.number}</span><strong>{item.title}</strong><Arrow/></button>)}
      </div>
      <div id="service-preview" className={`service-live-preview preview-${service.preview}`} role="tabpanel" aria-live="polite">
        <div className="preview-toolbar"><span>LIVE SYSTEM / {service.number}</span><i/><i/></div>
        <Wireframe type={service.preview}/>
        <div className="service-preview-copy"><p>{service.description}</p><dl><div><dt>Goal</dt><dd>{service.goal}</dd></div><div><dt>Structure</dt><dd>{service.structure}</dd></div><div><dt>Primary action</dt><dd>{service.action}</dd></div></dl></div>
        <span className="service-switch-pixel" aria-hidden="true"/>
      </div>
    </div>
  </section>;
}

function Wireframe({type}:{type:string}) {
  return <div className={`wireframe wireframe-${type}`} aria-hidden="true"><div className="wf-nav"><i/><i/><span/></div><div className="wf-main"><div className="wf-copy"><b/><b/><small/><button tabIndex={-1}/></div><div className="wf-visual"><i/><i/><i/></div></div><div className="wf-modules"><span/><span/><span/></div><div className="wf-before">Before</div><div className="wf-after">After</div></div>;
}
