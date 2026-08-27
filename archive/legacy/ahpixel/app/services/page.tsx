import { Metadata } from "next";

import { Arrow } from "../components/SiteShell";
import { PageHero, SectionHeader } from "../components/ui";

export const metadata: Metadata = { title: "Web Design Services | AHPixel Studio", description: "Landing pages, business websites, professional websites and strategic website redesigns.", alternates: { canonical: "/services" } };

const offers = [
  { n:"01", title:"Landing Page", intro:"A focused, high-impact page built around one clear goal.", ideal:"Campaigns, services, product launches and personal brands.", includes:["Strategy & page structure","Custom visual direction","Responsive development","Contact or conversion flow"] },
  { n:"02", title:"Business Website", intro:"A credible multi-page presence that explains the business clearly.", ideal:"Growing companies, local businesses and service providers.", includes:["Home, About, Services & Contact","Additional business pages","Responsive design system","Clear inquiry pathways"] },
  { n:"03", title:"Professional Website", intro:"A refined platform that turns expertise into trust.", ideal:"Lawyers, clinics, consultants, architects, real estate professionals and personal brands.", includes:["Positioning-focused structure","Service presentation","Professional visual identity","Mobile-first contact experience"] },
  { n:"04", title:"Website Redesign", intro:"A thoughtful rebuild for a website that no longer represents the business.", ideal:"Established brands with outdated visuals, structure or performance.", includes:["Visual identity refinement","Responsive experience","Navigation & content structure","Performance improvements"] },
];
const process = [["01","Discover"],["02","Design"],["03","Build"],["04","Refine"],["05","Launch"]];

export default function ServicesPage() {
  return <main><PageHero eyebrow="Services / What we do" title={<>We design.<br />We build.<br /><em>You grow.</em></>} intro="Clear, modern websites designed around real business needs—without unnecessary complexity." />
  <section className="offers section-space light-section"><SectionHeader index="01" label="Current services" dark /><div className="offer-list">{offers.map(o=><article key={o.n} data-reveal><div className="offer-title"><span>{o.n}</span><h2>{o.title}</h2></div><div className="offer-info"><p>{o.intro}</p><small>Ideal for</small><p>{o.ideal}</p></div><ul>{o.includes.map(i=><li key={i}>{i}</li>)}</ul></article>)}</div></section>
  <section className="services-process section-space"><SectionHeader index="02" label="How projects move" /><div className="section-title-row" data-reveal><h2>A clear path.<br /><em>No mystery.</em></h2><p>Each phase has a purpose, a decision and a tangible result.</p></div><div className="mini-process">{process.map(([n,t])=><div key={n} data-reveal><span>{n}</span><i/><strong>{t}</strong></div>)}</div></section>
  <section className="service-note-section light-section"><span>Scope note / 2026</span><h2 data-reveal>Focused on websites.<br /><em>E-commerce comes later.</em></h2><p data-reveal>We currently focus on high-quality marketing, business and professional websites. This lets every project receive the design attention and implementation quality it deserves.</p><a href="/contact" className="button button-dark" data-reveal>Discuss your project <Arrow /></a></section></main>;
}

