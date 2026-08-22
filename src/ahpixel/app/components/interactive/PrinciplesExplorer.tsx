"use client";

import { useState } from "react";

const principles=[
  ["01","Clarity","A website should make the business and the next action immediately understandable."],
  ["02","Detail","Typography, spacing and interaction are tuned as one coherent system."],
  ["03","Performance","A polished experience still has to feel fast, stable and effortless."],
  ["04","Adaptability","Every layout and visual language responds to its own audience and context."],
];
export function PrinciplesExplorer(){const[active,setActive]=useState(0);return <div className={`principles-explorer principle-${active+1}`}><div className="principle-rows">{principles.map(([number,title,text],index)=><button key={number} className={active===index?"active":""} aria-expanded={active===index} onPointerEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)}><span>{number}</span><strong>{title}</strong><p>{text}</p><i>↗</i></button>)}</div><div className="principle-visual" aria-hidden="true"><div className="clarity-visual"><b/><b/><b/></div><div className="detail-visual">{Array.from({length:9},(_,i)=><i key={i}/>)}</div><div className="performance-visual"><i/><i/><i/><span>98</span></div><div className="adapt-visual"><i/><i/><i/></div><small>{principles[active][0]} / {principles[active][1]}</small></div></div>}
