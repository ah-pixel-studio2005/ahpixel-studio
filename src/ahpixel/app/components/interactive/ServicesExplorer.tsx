"use client";

import { PointerEvent, useState } from "react";
import { Arrow } from "../SiteShell";
import type { HomeLanguage } from "../../page";

const servicesEn = [
  { number:"01", title:"Landing page", goal:"Lead generation", structure:"1 focused page", action:"Contact", description:"A focused conversion path that turns one clear offer into action.", preview:"landing" },
  { number:"02", title:"Business website", goal:"Credibility", structure:"Multi-page", action:"Explore services", description:"A complete digital presence that explains the business with confidence.", preview:"business" },
  { number:"03", title:"Professional website", goal:"Trust & booking", structure:"Profile system", action:"Book a consultation", description:"Expertise, proof and a frictionless route from interest to inquiry.", preview:"professional" },
  { number:"04", title:"Website redesign", goal:"Modernize", structure:"Before → after", action:"Improve the journey", description:"A sharper hierarchy and interface built from what already works.", preview:"redesign" },
];

const servicesEs = [
  { number:"01", title:"Landing page", goal:"Generar oportunidades", structure:"1 página enfocada", action:"Contactar", description:"Un recorrido de conversión enfocado que transforma una oferta clara en una acción.", preview:"landing" },
  { number:"02", title:"Sitio web empresarial", goal:"Credibilidad", structure:"Varias páginas", action:"Explorar servicios", description:"Una presencia digital completa que presenta el negocio con claridad y confianza.", preview:"business" },
  { number:"03", title:"Sitio web profesional", goal:"Confianza y reservas", structure:"Sistema de perfil", action:"Reservar una consulta", description:"Experiencia, respaldo y un recorrido sin fricción desde el interés hasta el contacto.", preview:"professional" },
  { number:"04", title:"Rediseño web", goal:"Modernizar", structure:"Antes → después", action:"Mejorar la experiencia", description:"Una jerarquía e interfaz más sólidas construidas a partir de lo que ya funciona.", preview:"redesign" },
];

export function ServicesExplorer({ language }: { language: HomeLanguage }) {
  const [active, setActive] = useState(0);
  const spanish = language === "es";
  const services = spanish ? servicesEs : servicesEn;
  const service = services[active];
  const nudge = (event:PointerEvent<HTMLButtonElement>) => {
    if (matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const r=event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--sx",`${((event.clientX-r.left)/r.width-.5)*6}px`);
    event.currentTarget.style.setProperty("--sy",`${((event.clientY-r.top)/r.height-.5)*4}px`);
  };
  const reset=(event:PointerEvent<HTMLButtonElement>)=>{event.currentTarget.style.setProperty("--sx","0px");event.currentTarget.style.setProperty("--sy","0px")};
  return <section id="services" className="services-explorer" data-home-section="03" data-nav="services">
    <div className="experience-heading"><span>03 / {spanish ? "Explorador de servicios" : "Services explorer"}</span><h2>{spanish ? <>¿Qué debe lograr<br/>tu sitio web?</> : <>What should<br/>your website do?</>}</h2></div>
    <div className="services-console">
      <div className="service-selector" role="tablist" aria-label={spanish ? "Tipos de servicios web" : "Website service types"}>
        {services.map((item,index)=><button key={item.number} role="tab" aria-selected={active===index} aria-controls="service-preview" className={active===index?"active":""} onFocus={()=>setActive(index)} onPointerEnter={()=>setActive(index)} onPointerMove={nudge} onPointerLeave={reset} onClick={()=>setActive(index)} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();setActive(index)}if(event.key==="ArrowDown"||event.key==="ArrowRight"){event.preventDefault();setActive((index+1)%services.length)}if(event.key==="ArrowUp"||event.key==="ArrowLeft"){event.preventDefault();setActive((index-1+services.length)%services.length)}}}><span>{item.number}</span><strong>{item.title}</strong><Arrow/></button>)}
      </div>
      <div id="service-preview" className={`service-live-preview preview-${service.preview}`} role="tabpanel" aria-live="polite">
        <div className="preview-toolbar"><span>{spanish ? "SISTEMA ACTIVO" : "LIVE SYSTEM"} / {service.number}</span><i/><i/></div>
        <Wireframe type={service.preview} language={language}/>
        <div className="service-preview-copy"><p>{service.description}</p><dl><div><dt>{spanish ? "Objetivo" : "Goal"}</dt><dd>{service.goal}</dd></div><div><dt>{spanish ? "Estructura" : "Structure"}</dt><dd>{service.structure}</dd></div><div><dt>{spanish ? "Acción principal" : "Primary action"}</dt><dd>{service.action}</dd></div></dl></div>
        <span className="service-switch-pixel" aria-hidden="true"/>
      </div>
    </div>
  </section>;
}

function Wireframe({type, language}:{type:string; language: HomeLanguage}) {
  return <div className={`wireframe wireframe-${type}`} aria-hidden="true"><div className="wf-nav"><i/><i/><span/></div><div className="wf-main"><div className="wf-copy"><b/><b/><small/><button tabIndex={-1}/></div><div className="wf-visual"><i/><i/><i/></div></div><div className="wf-modules"><span/><span/><span/></div><div className="wf-before">{language === "es" ? "Antes" : "Before"}</div><div className="wf-after">{language === "es" ? "Después" : "After"}</div></div>;
}
