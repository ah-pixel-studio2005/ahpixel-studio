import { Metadata } from "next";
import Image from "next/image";
import { projects } from "../../data/site";
import { Arrow } from "../../components/SiteShell";
import { SectionHeader } from "../../components/ui";
import { CaseStudyMotion } from "../../components/interactive/CaseStudyMotion";
import { TrackedLink } from "../../components/TrackedLink";

const project = projects.find(item => item.slug === "lumen-dental-studio")!;

export const metadata: Metadata = {
  title: "LUMEN Dental Studio — Healthcare Web Design Concept | AHPixel Studio",
  description: "A modern dental studio concept focused on trust, clarity and a calm digital patient experience.",
  alternates: { canonical: "/work/lumen-dental-studio", languages: { "en-US": "/work/lumen-dental-studio", "es-PE": "/es/work/lumen-dental-studio" } },
  openGraph: {
    title: "LUMEN Dental Studio — Healthcare Web Design Concept",
    description: "A fictional dental and healthcare concept project by AHPixel Studio.",
    images: [{ url: "/projects/lumen/desktop-hero.webp", width: 1536, height: 1024, alt: "LUMEN Dental Studio concept website" }],
  },
  twitter: { card: "summary_large_image", title: "LUMEN Dental Studio — AHPixel Studio", description: "A calm, modern healthcare website concept.", images: ["/projects/lumen/desktop-hero.webp"] },
};

export default function LumenCaseStudy() {
  return <main className="case-study lumen-case" style={{ "--case-accent": project.accent } as React.CSSProperties}>
    <CaseStudyMotion />
    <section className="case-hero">
      <div className="case-no">Project / {project.number}</div>
      <p className="eyebrow" data-reveal><span />Concept project · {project.year}</p>
      <h1 data-reveal>Lumen<br /><em>Dental Studio</em></h1>
      <p className="case-lead" data-reveal>A modern dental studio concept focused on trust, clarity and a calm digital patient experience.</p>
      <div className="case-actions" data-reveal>{project.liveUrl&&<TrackedLink eventName="live_demo_clicked" eventDetail={{project:project.slug,source:"case_study_top"}} className="button button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View live website <Arrow /></TrackedLink>}<a className="button button-quiet" href="/work">Back to work <Arrow /></a></div>
    </section>

    <section className="case-meta light-section"><div><span>Project type</span><strong>{project.projectType}</strong></div><div><span>Industry</span><strong>{project.industry}</strong></div><div><span>Services</span><strong>{project.services.join(" / ")}</strong></div><div><span>Year</span><strong>{project.year}</strong></div></section>

    <section className="case-overview section-space"><SectionHeader index="01" label="Overview" /><div className="case-copy"><h2 data-reveal>Healthcare without<br /><em>the clinical coldness.</em></h2><p data-reveal>LUMEN explores how a modern dental practice can communicate clinical confidence while making every digital touchpoint feel more human. The experience gives patients clear information, a reassuring visual language and an uncomplicated route to an appointment.</p></div></section>

    <section className="case-image-wide" data-reveal><Image src={project.desktopImages[0]} alt="LUMEN Dental Studio desktop homepage" width={1440} height={1000} sizes="90vw" /><span>Desktop / Homepage</span></section>

    <section className="case-direction section-space light-section"><SectionHeader index="02" label="Visual direction" dark /><div className="direction-grid"><h2 data-reveal>Bright.<br />Calm.<br /><em>Human.</em></h2><div data-reveal><p>The visual system pairs warm off-white space, desaturated teal and editorial serif typography to feel composed, trustworthy and distinctly non-corporate.</p><ul><li>Clinical clarity without sterile visual cues</li><li>Soft, architectural photography</li><li>Comfortable reading rhythm and generous space</li><li>Patient-first language at every stage</li></ul></div></div></section>

    <section className="case-desktop section-space"><SectionHeader index="03" label="Desktop experience" /><div className="case-copy"><h2 data-reveal>Information that feels<br /><em>easy to approach.</em></h2><p data-reveal>The desktop experience balances an emotional first impression with treatment information, trust signals and a direct appointment path.</p></div><div className="desktop-frame" data-reveal><div className="frame-bar"><i/><i/><i/><span>LUMEN / TREATMENTS</span></div><Image src={project.desktopImages[1]} alt="LUMEN treatment information architecture" width={1440} height={1000} sizes="(max-width:860px) 92vw,84vw" /></div></section>

    <section className="case-mobile light-section"><div className="case-mobile-copy"><SectionHeader index="04" label="Mobile experience" dark /><h2 data-reveal>Reassurance that<br /><em>travels with you.</em></h2><p data-reveal>Mobile typography, controls and content are recomposed for one-handed reading while preserving the calm identity and clear appointment flow.</p></div><div className="phone-pair" data-reveal><div><Image src={project.mobileImages[0]} alt="LUMEN mobile homepage" width={390} height={844} sizes="(max-width:860px) 42vw,16vw" /></div><div><Image src={project.mobileImages[1]} alt="LUMEN mobile treatment section" width={390} height={844} sizes="(max-width:860px) 42vw,16vw" /></div></div></section>

    <section className="case-details section-space"><SectionHeader index="05" label="Treatments / Information architecture" /><div className="detail-grid">{[["01","Clear treatment groups","Services are organized around patient goals rather than dense clinical terminology."],["02","Editorial typography","A warm serif creates character while the sans-serif system keeps functional content precise."],["03","Trust by design","Spacing, photography and language reduce friction without overstating claims."],["04","Responsive hierarchy","Headlines and controls are recomposed instead of simply reduced."],["05","Patient pathway","Repeated appointment cues provide direction without pressure."],["06","Bilingual experience","English and Spanish content serve both local and international patients."]].map(([n,t,p])=><article key={n} data-reveal><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div></section>

    <section className="case-result light-section"><SectionHeader index="06" label="Final result" dark /><h2 data-reveal>A healthcare experience<br /><em>built around clarity.</em></h2><p data-reveal>The finished concept feels professional, calm and useful from the first impression to the appointment request—while remaining fast and responsive.</p><div className="concept-disclaimer" data-reveal><span>Important note</span><p>LUMEN Dental Studio is a fictional concept project created for the AHPixel Studio portfolio. It is not presented as a paying client or real clinic.</p></div>{project.liveUrl&&<TrackedLink eventName="live_demo_clicked" eventDetail={{project:project.slug,source:"case_study_bottom"}} className="button button-dark" href={project.liveUrl} target="_blank" rel="noopener noreferrer">View live website <Arrow /></TrackedLink>}</section>
  </main>;
}
