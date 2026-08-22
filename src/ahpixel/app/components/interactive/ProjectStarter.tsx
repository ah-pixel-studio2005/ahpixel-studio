"use client";

import { Arrow } from "../SiteShell";
import { businessTypes, projectGoals, websiteTypes } from "../../data/site";
import type { HomeLanguage } from "../../page";

export function ProjectStarter({ language }: { language: HomeLanguage }){
  const spanish=language==="es";
  const label=(item:{label:string;labelEs:string})=>spanish?item.labelEs:item.label;
  return <section id="start" className="project-starter" data-home-section="06" data-nav="start"><div className="starter-meta"><span>06 / {spanish?"Inicio del proyecto":"Project starter"}</span><i aria-hidden="true"/>{spanish?"Disponibles para nuevos proyectos":"Available for new projects"}</div><h2>{spanish?<>¿Qué construiremos<br/>juntos?</>:<>What are we<br/>building next?</>}</h2><form action={spanish?"/es/contact":"/contact"} method="get" className="starter-sentence"><label><span>{spanish?"Necesito un":"I need a"}</span><select name="type" defaultValue="business">{websiteTypes.map(item=><option value={item.value} key={item.value}>{label(item)}</option>)}</select></label><label><span>{spanish?"Para":"For a"}</span><select name="industry" defaultValue="business">{businessTypes.map(item=><option value={item.value} key={item.value}>{label(item)}</option>)}</select></label><label><span>{spanish?"Que debe":"That should"}</span><select name="goal" defaultValue="inquiries">{projectGoals.map(item=><option value={item.value} key={item.value}>{label(item)}</option>)}</select></label><button className="button button-primary magnetic" type="submit">{spanish?"Iniciar mi proyecto":"Start my project"} <Arrow/></button></form><div className="starter-coordinate">{spanish?"Configurador de proyecto":"Brief composer"} / 01</div></section>
}
