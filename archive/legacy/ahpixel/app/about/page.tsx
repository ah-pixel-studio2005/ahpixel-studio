import { Metadata } from "next";

import { Arrow } from "../components/SiteShell";
import { PageHero, SectionHeader } from "../components/ui";
import { PrinciplesExplorer } from "../components/interactive/PrinciplesExplorer";

export const metadata: Metadata = { title: "About AHPixel Studio | Design With Purpose", description: "An independent web design and development studio focused on clarity, detail, performance and adaptable visual systems.", alternates: { canonical: "/about" } };
export default function AboutPage(){return <main><PageHero eyebrow="About / AHPixel Studio" title={<>Design with purpose.<br /><em>Build with precision.</em></>} intro="A small independent studio creating thoughtful websites for businesses and professionals." />
<section className="philosophy section-space light-section"><SectionHeader index="01" label="Our approach" dark/><div className="philosophy-copy"><h2 data-reveal>Design should solve.<br /><em>Development should support it.</em></h2><div data-reveal><p>AHPixel brings design and frontend development together, so the idea survives the journey from screen composition to a responsive, working website.</p><p>We care about hierarchy, typography, speed, clear content and the small interactions that make a website feel considered.</p></div></div></section>
<section className="pillars principles-section section-space"><SectionHeader index="02" label="Interactive principles"/><PrinciplesExplorer/></section>
<section className="identity-section light-section"><p className="eyebrow dark" data-reveal><span/>One studio. Many visual languages.</p><h2 data-reveal>AHPixel does not believe<br />every website should <em>look like AHPixel.</em></h2><div data-reveal><p>Good studio work adapts. A barbershop can feel editorial and cinematic. A clinic can feel calm and precise. A technology business can feel fast and progressive.</p><p>VANTA’s cream, black and gold identity is intentionally unlike this studio website. That difference is the point: every project deserves a direction of its own.</p></div></section>
<section className="about-cta section-space"><span>Independent studio / Lima, Peru</span><h2 data-reveal>Have something<br /><em>worth building?</em></h2><a href="/contact" className="button button-primary" data-reveal>Start a project <Arrow/></a></section></main>}

