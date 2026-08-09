"use client";

import { useEffect, useState } from "react";

const labels=["Home","Work","Services","Process","Studio","Start"];
export function SectionProgress(){
  const [active,setActive]=useState(0);
  useEffect(()=>{const sections=document.querySelectorAll<HTMLElement>("[data-home-section]");const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(Math.max(0,Number((entry.target as HTMLElement).dataset.homeSection)-1))}),{rootMargin:"-42% 0px -48%",threshold:0});sections.forEach(section=>observer.observe(section));return()=>observer.disconnect()},[]);
  return <nav className="section-progress" aria-label="Homepage sections"><span>0{active+1}</span><i/><a href={`#${active===0?"top":labels[active].toLowerCase()}`} aria-label={`Current section: ${labels[active]}`}>{labels[active]}</a></nav>;
}
