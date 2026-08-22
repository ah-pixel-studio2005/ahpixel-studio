"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import type { HomeLanguage } from "../../page";

const content={
  en:{details:{Clarity:["Information hierarchy","Obvious next step"],Typography:["Type scale","Hierarchy / rhythm"],Responsive:["375 → 1920","Adaptive layout"],Motion:["Purposeful feedback","Reduced-motion ready"],Performance:["Fast by default","Lean execution"],Structure:["Clear content paths","Reusable systems"],Detail:["Spacing / states","Consistent finish"],Accessibility:["Keyboard first","Readable contrast"]} as Record<string,string[]>,label:"Studio field",heading:<>Small studio.<br/>Obsessed with<br/><em>the details.</em></>,link:"Inside the studio ↗",selected:"Selected principle"},
  es:{details:{Claridad:["Jerarquía de información","Próximo paso evidente"],Tipografía:["Escala tipográfica","Jerarquía / ritmo"],Adaptabilidad:["375 → 1920","Diseño responsive"],Movimiento:["Respuesta con propósito","Movimiento reducido"],Rendimiento:["Rápido por defecto","Ejecución ligera"],Estructura:["Recorridos claros","Sistemas reutilizables"],Detalle:["Espaciado / estados","Acabado consistente"],Accesibilidad:["Navegación por teclado","Contraste legible"]} as Record<string,string[]>,label:"Laboratorio del estudio",heading:<>Estudio pequeño.<br/>Obsesionados con<br/><em>los detalles.</em></>,link:"Conoce el estudio ↗",selected:"Principio seleccionado"},
} as const;

export function StudioPlayground({ language }: { language: HomeLanguage }){
  const field=useRef<HTMLDivElement>(null);
  const frame=useRef<number | null>(null);
  const text=content[language];
  const words=Object.keys(text.details);
  const [activeIndex,setActiveIndex]=useState(1);
  const active=words[Math.min(activeIndex,words.length-1)];
  const prefix=language==="es"?"/es":"";
  useEffect(()=>()=>{if(frame.current)cancelAnimationFrame(frame.current)},[]);
  const move=(event:PointerEvent<HTMLDivElement>)=>{
    if(!field.current||matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches)return;
    const r=field.current.getBoundingClientRect();
    const x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;
    if(frame.current)cancelAnimationFrame(frame.current);
    frame.current=requestAnimationFrame(()=>{
      field.current?.style.setProperty("--point-move-x",`${x*12}px`);
      field.current?.style.setProperty("--point-move-y",`${y*12}px`);
    });
  };
  return <section id="studio" className="studio-playground" data-home-section="05" data-nav="studio">
    <div className="playground-heading"><span>05 / {text.label}</span><h2>{text.heading}</h2><a href={`${prefix}/about`}>{text.link}</a></div>
    <div ref={field} className="playground-field" onPointerMove={move}>
      <div className="playground-grid" aria-hidden="true"/><div className="playground-points" aria-hidden="true">{Array.from({length:12},(_,index)=><i key={index}/>)}</div>
      {words.map((word,index)=><button style={{"--word-index":index} as React.CSSProperties} className={active===word?"active":""} key={word} onPointerEnter={()=>setActiveIndex(index)} onFocus={()=>setActiveIndex(index)} onClick={()=>setActiveIndex(index)}>{word}<small>0{index+1}</small></button>)}
      <div className="playground-readout" aria-live="polite"><span>{text.selected}</span><strong>{active}</strong>{text.details[active].map(item=><p key={item}>{item}</p>)}<small>X {active.length*83} / Y 0420</small></div>
    </div>
  </section>;
}
