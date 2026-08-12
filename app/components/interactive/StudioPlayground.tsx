"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";

const details:Record<string,string[]>={Clarity:["Information hierarchy","Obvious next step"],Typography:["Type scale","Hierarchy / rhythm"],Responsive:["375 → 1920","Adaptive layout"],Motion:["Purposeful feedback","Reduced-motion ready"],Performance:["Fast by default","Lean execution"],Structure:["Clear content paths","Reusable systems"],Detail:["Spacing / states","Consistent finish"],Accessibility:["Keyboard first","Readable contrast"]};
const words=Object.keys(details);

export function StudioPlayground(){
  const field=useRef<HTMLDivElement>(null);
  const frame=useRef<number | null>(null);
  const [active,setActive]=useState("Typography");
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
    <div className="playground-heading"><span>05 / Studio field</span><h2>Small studio.<br/>Obsessed with<br/><em>the details.</em></h2><a href="/about">Inside the studio ↗</a></div>
    <div ref={field} className="playground-field" onPointerMove={move}>
      <div className="playground-grid" aria-hidden="true"/><div className="playground-points" aria-hidden="true">{Array.from({length:12},(_,index)=><i key={index}/>)}</div>
      {words.map((word,index)=><button style={{"--word-index":index} as React.CSSProperties} className={active===word?"active":""} key={word} onPointerEnter={()=>setActive(word)} onFocus={()=>setActive(word)} onClick={()=>setActive(word)}>{word}<small>0{index+1}</small></button>)}
      <div className="playground-readout" aria-live="polite"><span>Selected principle</span><strong>{active}</strong>{details[active].map(item=><p key={item}>{item}</p>)}<small>X {active.length*83} / Y 0420</small></div>
    </div>
  </section>;
}
