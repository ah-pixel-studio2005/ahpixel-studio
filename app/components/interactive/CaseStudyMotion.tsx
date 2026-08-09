"use client";

import { useEffect, useState } from "react";

export function CaseStudyMotion(){
  const[section,setSection]=useState(1);
  useEffect(()=>{
    const root=document.querySelector<HTMLElement>(".case-study");if(!root)return;root.classList.add("motion-enabled");
    const media=root.querySelectorAll<HTMLElement>(".case-image-wide,.desktop-frame,.phone-pair");
    const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("in-view",entry.isIntersecting)),{rootMargin:"0px 0px -12%",threshold:.12});media.forEach(item=>reveals.observe(item));
    const sections=root.querySelectorAll<HTMLElement>("section");const progress=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setSection([...sections].indexOf(entry.target)+1)}),{rootMargin:"-46% 0px -48%",threshold:0});sections.forEach(item=>progress.observe(item));
    let frame=0;const parallax=()=>{const pair=root.querySelector<HTMLElement>(".phone-pair");if(pair){const r=pair.getBoundingClientRect();pair.style.setProperty("--case-parallax",`${Math.max(-18,Math.min(18,(innerHeight/2-r.top-r.height/2)*.025))}px`)}frame=0};const scroll=()=>{if(!frame)frame=requestAnimationFrame(parallax)};addEventListener("scroll",scroll,{passive:true});parallax();
    return()=>{reveals.disconnect();progress.disconnect();removeEventListener("scroll",scroll);if(frame)cancelAnimationFrame(frame);root.classList.remove("motion-enabled")};
  },[]);
  return <div className="case-progress" aria-label={`Case study section ${section} of 9`}><span>{String(section).padStart(2,"0")}</span><i/><small>09</small></div>;
}
