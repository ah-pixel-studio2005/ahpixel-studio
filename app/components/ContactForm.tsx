"use client";

import { FormEvent, useEffect, useState } from "react";
import { Arrow } from "./SiteShell";
import { siteConfig } from "../data/site";

const typeMap:Record<string,string>={landing:"Landing Page",business:"Business Website",professional:"Professional Website",redesign:"Website Redesign"};
const industryMap:Record<string,string>={clinic:"Clinic",business:"Local Business",professional:"Professional",other:"Other"};
const goalMap:Record<string,string>={inquiries:"Get More Inquiries",credibility:"Build Credibility",booking:"Increase Bookings",modernize:"Modernize The Brand"};

export function ContactForm() {
  const [phase,setPhase]=useState(1);
  const [enhanced,setEnhanced]=useState(false);
  const [sent,setSent]=useState(false);
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [defaults,setDefaults]=useState({service:"",industry:"",goal:""});

  useEffect(()=>{
    const params=new URLSearchParams(location.search);
    const frame=requestAnimationFrame(()=>{
      setDefaults({service:typeMap[params.get("type")||""]||"",industry:industryMap[params.get("industry")||""]||"",goal:goalMap[params.get("goal")||""]||""});
      setEnhanced(true);
    });
    return()=>cancelAnimationFrame(frame);
  },[]);

  useEffect(()=>{
    if(phase!==2)return;
    const frame=requestAnimationFrame(()=>document.querySelector<HTMLInputElement>(".phased-inquiry [name=name]")?.focus());
    return()=>cancelAnimationFrame(frame);
  },[phase]);

  const projectErrors=(form:HTMLFormElement)=>{
    const data=new FormData(form),next:Record<string,string>={};
    if(!data.get("service"))next.service="Please select a website type.";
    if(!data.get("industry"))next.industry="Please select a business type.";
    if(!data.get("goal"))next.goal="Please select a primary goal.";
    if(!data.get("budget"))next.budget="Please select a budget range.";
    return next;
  };
  const continueToContact=(event:React.MouseEvent<HTMLButtonElement>)=>{
    const form=event.currentTarget.form!;const next=projectErrors(form);setErrors(next);if(Object.keys(next).length)return;setPhase(2);
  };
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();const form=event.currentTarget,data=new FormData(form),next=projectErrors(form);const email=String(data.get("email")||"").trim();
    if(!String(data.get("name")||"").trim())next.name="Please enter your name.";
    if(!email)next.email="Please enter your email.";else if(!/^\S+@\S+\.\S+$/.test(email))next.email="Please enter a valid email address.";
    if(!String(data.get("message")||"").trim())next.message="Please tell us a little about the project.";
    setErrors(next);setSent(false);if(Object.keys(next).length){if(next.service||next.industry||next.goal||next.budget)setPhase(1);return}setSent(true);form.reset();setPhase(1);
  };
  const error=(name:string)=>errors[name]?<small className="field-error" id={`${name}-error`}>{errors[name]}</small>:null;
  const invalid=(name:string)=>errors[name]?true:undefined;

  return <form className={`inquiry-form phased-inquiry ${enhanced?"is-enhanced":""}`} onSubmit={submit} action={siteConfig.contactEndpoint||undefined} noValidate>
    <div className="inquiry-progress" aria-label={`Inquiry phase ${phase} of 2`}><button type="button" className={phase===1?"active":"done"} onClick={()=>setPhase(1)}><span>01</span>Project</button><i/><button type="button" className={phase===2?"active":""} onClick={()=>phase===2&&setPhase(2)}><span>02</span>Contact</button></div>
    <fieldset className={`inquiry-phase ${phase===1?"active":""}`} aria-hidden={enhanced&&phase!==1}>
      <legend>Project basics</legend>
      <label><span>Website type *</span><select key={`service-${defaults.service}`} name="service" defaultValue={defaults.service} required aria-invalid={invalid("service")}><option value="" disabled>Select a website type</option>{Object.values(typeMap).map(value=><option key={value}>{value}</option>)}</select>{error("service")}</label>
      <label><span>Business type *</span><select key={`industry-${defaults.industry}`} name="industry" defaultValue={defaults.industry} required aria-invalid={invalid("industry")}><option value="" disabled>Select a business type</option>{Object.values(industryMap).map(value=><option key={value}>{value}</option>)}</select>{error("industry")}</label>
      <label><span>Main goal *</span><select key={`goal-${defaults.goal}`} name="goal" defaultValue={defaults.goal} required aria-invalid={invalid("goal")}><option value="" disabled>Select the main goal</option>{Object.values(goalMap).map(value=><option key={value}>{value}</option>)}</select>{error("goal")}</label>
      <label><span>Budget range *</span><select name="budget" defaultValue="" required aria-invalid={invalid("budget")}><option value="" disabled>Select a range</option><option>Under $300</option><option>$300 – $600</option><option>$600 – $1,000</option><option>$1,000+</option><option>Not sure</option></select>{error("budget")}</label>
      <button className="button button-primary phase-next" type="button" onClick={continueToContact}>Continue to contact <Arrow/></button>
    </fieldset>
    <fieldset className={`inquiry-phase ${phase===2?"active":""}`} aria-hidden={enhanced&&phase!==2}>
      <legend>Contact details</legend>
      <label><span>Name *</span><input name="name" autoComplete="name" required placeholder="Your name" aria-invalid={invalid("name")}/>{error("name")}</label>
      <label><span>Email *</span><input name="email" type="email" inputMode="email" autoComplete="email" required placeholder="you@company.com" aria-invalid={invalid("email")}/>{error("email")}</label>
      <label><span>Phone / WhatsApp</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+51 000 000 000"/></label>
      <label><span>Business / Company</span><input name="business" autoComplete="organization" placeholder="Company or brand name"/></label>
      <label className="full"><span>Tell us about your project *</span><textarea name="message" rows={5} required placeholder="What are you building, and what should the website help you achieve?" aria-invalid={invalid("message")}/>{error("message")}</label>
      <div className="form-submit full"><button className="phase-back" type="button" onClick={()=>setPhase(1)}>← Project basics</button><button className="button button-primary" type="submit">Send project inquiry <Arrow/></button></div>
    </fieldset>
    <p className="inquiry-status" aria-live="polite">{sent?"Thanks — your inquiry is ready for review. We’ll be in touch.":"Required fields are marked with *"}</p>
  </form>;
}
