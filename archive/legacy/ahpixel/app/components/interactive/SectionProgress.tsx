"use client";

import { useEffect, useState } from "react";
import type { HomeLanguage } from "../../page";

const ids=["top","work","services","process","studio","start"];
const labels={en:["Home","Work","Services","Process","Studio","Start"],es:["Inicio","Proyectos","Servicios","Proceso","Estudio","Empezar"]};
export function SectionProgress({ language }: { language: HomeLanguage }){
  const [active,setActive]=useState(0);
  useEffect(()=>{const sections=document.querySelectorAll<HTMLElement>("[data-home-section]");const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(Math.max(0,Number((entry.target as HTMLElement).dataset.homeSection)-1))}),{rootMargin:"-42% 0px -48%",threshold:0});sections.forEach(section=>observer.observe(section));return()=>observer.disconnect()},[]);
  const current=labels[language][active];
  return <nav className="section-progress" aria-label={language==="es"?"Secciones de la página de inicio":"Homepage sections"}><span>0{active+1}</span><i/><a href={`#${ids[active]}`} aria-label={`${language==="es"?"Sección actual":"Current section"}: ${current}`}>{current}</a></nav>;
}
