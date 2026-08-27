"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeLanguage } from "../../page";

const stepsEn=[
  ["01","Discover","We find the message, audience and action that matter."],
  ["02","Design","Notes become hierarchy, rhythm and a usable visual system."],
  ["03","Build","The layout gains responsive components and real behavior."],
  ["04","Refine","Spacing, states and breakpoints are tested with intent."],
  ["05","Launch","The complete experience is prepared to work in the real world."],
];
const stepsEs=[
  ["01","Descubrir","Definimos el mensaje, la audiencia y la acción que realmente importan."],
  ["02","Diseñar","Las ideas se convierten en jerarquía, ritmo y un sistema visual fácil de usar."],
  ["03","Desarrollar","El diseño toma forma con componentes responsive y comportamiento real."],
  ["04","Refinar","Probamos espaciados, estados y tamaños de pantalla con intención."],
  ["05","Lanzar","Preparamos la experiencia completa para funcionar en el mundo real."],
];

export function BuildJourney({ language }: { language: HomeLanguage }){
  const [active,setActive]=useState(0);
  const [compact,setCompact]=useState(()=>typeof window!=="undefined"&&window.matchMedia("(max-width: 860px)").matches);
  const root=useRef<HTMLElement>(null);
  const spanish=language==="es";
  const steps=spanish?stepsEs:stepsEn;
  useEffect(()=>{
    const nodes=root.current?.querySelectorAll<HTMLElement>("[data-build-step]");
    if(!nodes) return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.buildStep))}),{rootMargin:"-38% 0px -44%",threshold:.05});
    nodes.forEach(node=>observer.observe(node));
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{const media=window.matchMedia("(max-width: 860px)");const update=()=>setCompact(media.matches);media.addEventListener("change",update);return()=>media.removeEventListener("change",update)},[]);
  return <section ref={root} id="process" className={`build-journey build-step-${active+1}`} data-home-section="04" data-nav="process">
    <div className="build-sticky"><span>04 / {spanish?"Proceso de desarrollo":"Build journey"}</span><h2>{spanish?<>De una idea<br/>a algo <em>real.</em></>:<>From idea<br/>to something <em>real.</em></>}</h2><div className="build-progress" aria-hidden="true">{steps.map((step,index)=><i className={index<=active?"active":""} key={step[0]}/>)}</div>{!compact&&<BuildVisual active={active} steps={steps} language={language}/>}</div>
    <div className="build-steps">{steps.map(([number,title,text],index)=><article key={number} data-build-step={index}><span>{number}</span><h3>{title}</h3><p>{text}</p>{compact&&<div className="mobile-build-visual"><BuildVisual active={index} steps={steps} language={language}/></div>}</article>)}</div>
  </section>;
}

function BuildVisual({active,steps,language}:{active:number;steps:string[][];language:HomeLanguage}){return <div className={`build-visual visual-state-${active+1}`} aria-label={`${language==="es"?"Visualización del desarrollo web":"Website build visualization"}: ${steps[active][1]}`}><div className="build-browser-bar"><i/><i/><i/><span>{language==="es"?"DESARROLLO":"BUILD"} / 0{active+1}</span></div><div className="build-notes"><i/><i/><i/></div><div className="build-layout"><header/><aside/><main><b/><b/><span/><span/><button/></main></div><div className="build-breakpoints"><i>375</i><i>768</i><i>1440</i></div><div className="build-ready">{language==="es"?"Listo para lanzar":"Ready to launch"} <b/></div></div>}
