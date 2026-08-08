import Image from "next/image";
import { Metadata } from "next";
import { projects, serviceSummaries } from "./data/site";
import { Arrow } from "./components/SiteShell";
import { ProjectPreview } from "./components/ProjectPreview";
import { SectionHeader, TextLink } from "./components/ui";

export const metadata: Metadata = {
  title: "AHPixel Studio | Web Design & Development",
  description: "AHPixel Studio designs and builds modern, fast and responsive websites for businesses and professionals.",
  alternates: { canonical: "/" },
};

const process = [
  ["01", "Discover", "Understand the business, audience and goal."],
  ["02", "Design", "Define structure, direction and user experience."],
  ["03", "Build", "Turn the approved direction into a responsive website."],
  ["04", "Refine", "Test the details, interactions and performance."],
  ["05", "Launch", "Prepare the finished website to go live."],
];

const values = ["Clear message", "Professional image", "Mobile experience", "Easier contact"];
const studioPoints = [["01", "Clarity"], ["02", "Detail"], ["03", "Performance"]];

export default function HomePage() {
  const featured = projects.filter(project => project.featured);
  const heroProject = featured[0];

  return (
    <main>
      <section className="home-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-shell">
          <div className="hero-copy">
            <div className="hero-label" data-reveal>
              <span>Web design / Development</span>
              <span>AHPixel Studio · Lima / Worldwide</span>
            </div>
            <h1 data-reveal>We build webs<br />that mean <em>business.</em></h1>
            <p className="hero-description" data-reveal>Modern websites for businesses that want a sharper, more credible digital presence.</p>
            <div className="hero-actions" data-reveal>
              <a href="/work" className="button button-primary">View work <Arrow /></a>
              <a href="/contact" className="button button-secondary">Start a project <Arrow /></a>
            </div>
          </div>
          <a className="hero-work" href={`/work/${heroProject.slug}`} aria-label={`View ${heroProject.title} case study`} data-reveal>
            <span className="hero-work-label">Selected work / 01</span>
            <div className="hero-browser">
              <div className="browser-bar"><i /><i /><i /><span>vanta / desktop</span></div>
              <Image src={heroProject.desktopImages[0]} alt="Vanta Barber Club website displayed in a browser frame" width={1425} height={990} priority sizes="(max-width: 860px) 88vw, 48vw" />
            </div>
            <div className="hero-phone">
              <Image src={heroProject.mobileImages[0]} alt="Vanta Barber Club mobile website" width={375} height={812} priority sizes="(max-width: 860px) 28vw, 11vw" />
            </div>
            <div className="hero-project-meta"><strong>VANTA</strong><span>Concept website · 2026</span></div>
            <div className="hero-pixels" aria-hidden="true"><i /><i /><i /></div>
          </a>
        </div>
        <div className="hero-footer"><span>Independent digital studio</span><span>Scroll to explore ↓</span></div>
      </section>

      <section className="work-section section-space" id="selected-work">
        <SectionHeader index="01" label="Selected work" />
        <div className="section-intro" data-reveal>
          <h2>Work built around<br />the business.</h2>
          <p>Every project receives its own visual language, structure and character.</p>
        </div>
        {featured.map(project => <ProjectPreview project={project} key={project.slug} />)}
      </section>

      <section className="services-preview section-space light-section">
        <SectionHeader index="02" label="Services" dark />
        <div className="compact-intro" data-reveal>
          <h2>What we build.</h2>
          <p>Focused websites designed around the goals of each business.</p>
        </div>
        <div className="service-list">
          {serviceSummaries.map(service => <article key={service.number} data-reveal><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href="/services" aria-label={`Learn about ${service.title}`}><Arrow /></a></article>)}
        </div>
        <div className="section-end"><TextLink href="/services">Explore services</TextLink></div>
      </section>

      <section className="process-section section-space">
        <SectionHeader index="03" label="Process" />
        <div className="compact-intro" data-reveal><h2>From idea to live.</h2><p>A clear path from first conversation to a website ready to work.</p></div>
        <div className="process-track">
          {process.map(([number, title, text]) => <article key={number} data-reveal><span>{number}</span><i /><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </section>

      <section className="why-section light-section">
        <div className="why-inner">
          <div data-reveal><p className="eyebrow dark"><span />Business value</p><h2>Your website<br />works <em>before you do.</em></h2></div>
          <div className="why-copy" data-reveal><p>For many customers, your website is their first interaction with your business. It should communicate trust, explain what you offer and make the next step obvious.</p><div className="why-points">{values.map((value, index) => <span key={value}><b>0{index + 1}</b>{value}</span>)}</div></div>
        </div>
      </section>

      <section className="about-preview section-space">
        <SectionHeader index="04" label="The studio" />
        <div className="about-statement">
          <h2 data-reveal>Small studio.<br /><em>Serious about details.</em></h2>
          <div className="about-copy" data-reveal><p>AHPixel Studio is an independent web design and development studio focused on modern digital experiences for businesses and professionals.</p><p>Thoughtful design and precise frontend work come together to create websites that look credible and feel effortless to use.</p><TextLink href="/about">About AHPixel</TextLink></div>
        </div>
        <div className="studio-points">{studioPoints.map(([n, title]) => <div key={n}><span>{n}</span><strong>{title}</strong></div>)}</div>
      </section>

      <section className="final-cta">
        <div className="cta-inner">
          <div className="cta-copy">
            <p className="cta-kicker" data-reveal><i aria-hidden="true" />Available for new projects</p>
            <h2 data-reveal><span>Got a project?</span><span>Let&apos;s build it</span><span>right.</span></h2>
            <p className="cta-body" data-reveal>Tell us what you need, what your business does and where you want to take it. We&apos;ll help shape the right website around it.</p>
            <div className="cta-actions" data-reveal><a href="/contact" className="button button-primary">Start a project <Arrow /></a><a className="cta-email" href="mailto:hello@ahpixel.studio">hello@ahpixel.studio</a></div>
          </div>
          <div className="cta-workspace" data-reveal>
            <div className="workspace-grid" aria-hidden="true" />
            <div className="workspace-label"><span>Project / 01</span><span>Responsive website</span></div>
            <div className="workspace-desktop"><Image src={heroProject.desktopImages[0]} alt="Vanta Barber Club responsive desktop website" width={1425} height={990} sizes="(max-width: 900px) 82vw, 44vw" /></div>
            <div className="workspace-phone"><Image src={heroProject.mobileImages[0]} alt="Vanta Barber Club mobile website" width={206} height={446} sizes="(max-width: 900px) 24vw, 10vw" /></div>
            <div className="workspace-meta"><strong>Vanta Barber Club</strong><span>Concept website · 2026</span></div>
            <div className="workspace-coordinates">X 0768&nbsp;&nbsp; Y 0430</div>
            <div className="workspace-pixels" aria-hidden="true"><i /><i /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
