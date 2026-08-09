import { Metadata } from "next";
import Image from "next/image";
import { projects } from "../../data/site";
import { Arrow } from "../../components/SiteShell";
import { SectionHeader } from "../../components/ui";
import { CaseStudyMotion } from "../../components/interactive/CaseStudyMotion";

const project = projects.find(item => item.slug === "vanta-barber-club")!;

export const metadata: Metadata = {
  title: "Vanta Barber Club — Web Design Concept | AHPixel Studio",
  description: "A premium barbershop website concept built around bold editorial typography, cinematic imagery and a frictionless mobile experience.",
  alternates: { canonical: "/work/vanta-barber-club" },
  openGraph: {
    title: "Vanta Barber Club — Web Design Concept | AHPixel Studio",
    description: "A fictional concept project by AHPixel Studio.",
    images: [{ url: "/projects/vanta/og.png", width: 1200, height: 630, alt: "Vanta Barber Club concept website" }],
  },
};

export default function VantaCaseStudy() {
  return <main className="case-study" style={{ "--case-accent": project.accent } as React.CSSProperties}>
    <CaseStudyMotion />
    <section className="case-hero">
      <div className="case-no">Project / {project.number}</div>
      <p className="eyebrow" data-reveal><span />Concept project · {project.year}</p>
      <h1 data-reveal>Vanta<br /><em>Barber Club</em></h1>
      <p className="case-lead" data-reveal>A premium barbershop website concept built around bold editorial typography, cinematic imagery and a frictionless mobile experience.</p>
      <div className="case-actions" data-reveal><a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">View live website <Arrow /></a><a className="button button-quiet" href="/work">Back to work <Arrow /></a></div>
    </section>

    <section className="case-meta light-section">
      <div><span>Project type</span><strong>{project.projectType}</strong></div><div><span>Industry</span><strong>{project.industry}</strong></div><div><span>Services</span><strong>{project.services.join(" / ")}</strong></div><div><span>Year</span><strong>{project.year}</strong></div>
    </section>

    <section className="case-overview section-space">
      <SectionHeader index="01" label="Overview" />
      <div className="case-copy"><h2 data-reveal>A concept built to feel<br /><em>like a real brand.</em></h2><p data-reveal>VANTA explores how a premium men&apos;s grooming business can use a strong digital identity to communicate craft, atmosphere and confidence. The experience balances visual impact with practical service information and clear booking pathways.</p></div>
    </section>

    <section className="case-image-wide" data-reveal><Image src={project.desktopImages[0]} alt="Vanta Barber Club desktop homepage" width={1425} height={990} sizes="90vw" /><span>Desktop / Homepage</span></section>

    <section className="case-direction section-space light-section">
      <SectionHeader index="02" label="The direction" dark />
      <div className="direction-grid"><h2 data-reveal>Masculine.<br />Premium.<br /><em>Editorial.</em></h2><div data-reveal><p>The visual system combines oversized serif typography, warm off-white space, restrained gold accents and dark cinematic photography.</p><ul><li>Timeless rather than trendy</li><li>Strong but never aggressive</li><li>Editorial hierarchy with practical clarity</li><li>A distinct identity across desktop and mobile</li></ul></div></div>
    </section>

    <section className="case-desktop section-space">
      <SectionHeader index="03" label="Desktop experience" />
      <div className="case-copy"><h2 data-reveal>Large type.<br /><em>Deliberate rhythm.</em></h2><p data-reveal>The desktop composition uses asymmetry and generous spacing to let the service, gallery and booking content feel curated rather than templated.</p></div>
      <div className="desktop-frame" data-reveal><div className="frame-bar"><i/><i/><i/><span>VANTA / DESKTOP</span></div><Image src={project.desktopImages[1]} alt="Vanta desktop experience and process section" width={1425} height={786} sizes="(max-width: 860px) 92vw, 84vw" /></div>
    </section>

    <section className="case-mobile light-section">
      <div className="case-mobile-copy"><SectionHeader index="04" label="Mobile experience" dark /><h2 data-reveal>Designed for the<br /><em>screen in your hand.</em></h2><p data-reveal>The mobile version is not a compressed desktop. Typography, spacing, navigation and imagery are recomposed to retain the same confidence at a smaller scale.</p></div>
      <div className="phone-pair" data-reveal><div><Image src={project.mobileImages[0]} alt="Vanta mobile homepage" width={375} height={812} sizes="(max-width: 860px) 42vw, 16vw" /></div><div><Image src={project.mobileImages[1]} alt="Vanta mobile responsive detail" width={375} height={750} sizes="(max-width: 860px) 42vw, 16vw" /></div></div>
    </section>

    <section className="case-details section-space">
      <SectionHeader index="05" label="Design details" />
      <div className="detail-grid">{[["01","Typography","High-contrast serif display type establishes a refined editorial tone."],["02","Gold accents","A muted bronze is reserved for emphasis, controls and signature moments."],["03","Dark imagery","Low-key photography creates atmosphere without compromising readability."],["04","Service layout","Pricing and service content remain quick to scan on every device."],["05","Gallery","An art-directed masonry composition gives the work its own rhythm."],["06","Booking flow","Repeated, consistent CTAs make the next step obvious without feeling pushy."]].map(([n,t,p])=><article key={n} data-reveal><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div>
    </section>

    <section className="case-result light-section">
      <SectionHeader index="06" label="The result" dark />
      <h2 data-reveal>A complete digital identity.<br /><em>Built from one clear idea.</em></h2>
      <p data-reveal>The finished concept feels premium, coherent and purposeful from first impression to booking form—while remaining performant and responsive.</p>
      <div className="concept-disclaimer" data-reveal><span>Important note</span><p>VANTA Barber Club is a fictional concept project created by AHPixel Studio for portfolio and design demonstration purposes. It is not presented as a paying client.</p></div>
      <a className="button button-dark" href={project.liveUrl} target="_blank" rel="noreferrer">View live website <Arrow /></a>
    </section>
  </main>;
}

