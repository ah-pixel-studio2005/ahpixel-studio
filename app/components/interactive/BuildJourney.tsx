"use client";

import { useEffect, useRef, useState } from "react";

const steps=[
  ["01","Discover","We find the message, audience and action that matter."],
  ["02","Design","Notes become hierarchy, rhythm and a usable visual system."],
  ["03","Build","The layout gains responsive components and real behavior."],
  ["04","Refine","Spacing, states and breakpoints are tested with intent."],
  ["05","Launch","The complete experience is prepared to work in the real world."],
];

export function BuildJourney(){
  const [active,setActive]=useState(0);
  const root=useRef<HTMLElement>(null);
  useEffect(()=>{
    const nodes=root.current?.querySelectorAll<HTMLElement>("[data-build-step]");
    if(!nodes) return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.buildStep))}),{rootMargin:"-38% 0px -44%",threshold:.05});
    nodes.forEach(node=>observer.observe(node));
    return()=>observer.disconnect();
  },[]);
  return <section ref={root} id="process" className={`build-journey build-step-${active+1}`} data-home-section="04" data-nav="process">
    <div className="build-sticky"><span>04 / Build journey</span><h2>From idea<br/>to something <em>real.</em></h2><div className="build-progress" aria-hidden="true">{steps.map((step,index)=><i className={index<=active?"active":""} key={step[0]}/>)}</div><BuildVisual active={active}/></div>
    <div className="build-steps">{steps.map(([number,title,text],index)=><article key={number} data-build-step={index}><span>{number}</span><h3>{title}</h3><p>{text}</p><div className="mobile-build-visual"><BuildVisual active={index}/></div></article>)}</div>
  </section>;
}

function BuildVisual({active}:{active:number}){return <div className={`build-visual visual-state-${active+1}`} aria-label={`Website build visualization: ${steps[active][1]}`}><div className="build-browser-bar"><i/><i/><i/><span>BUILD / 0{active+1}</span></div><div className="build-notes"><i/><i/><i/></div><div className="build-layout"><header/><aside/><main><b/><b/><span/><span/><button/></main></div><div className="build-breakpoints"><i>375</i><i>768</i><i>1440</i></div><div className="build-ready">Ready to launch <b/></div></div>}
