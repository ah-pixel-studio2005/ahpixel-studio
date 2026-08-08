
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
  ["01", "Discover", "We understand your business, goals, audience and website requirements."],
  ["02", "Design", "We define structure, visual direction and user experience."],
  ["03", "Build", "We turn the approved direction into a fast, responsive website."],
  ["04", "Refine", "We test responsiveness, performance, interactions and details."],
  ["05", "Launch", "The finished website is prepared and published."],
];

export default function HomePage() {
  const featured = projects.filter(project => project.featured);
  return (
    <main>
      <section className="home-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="pixel-field" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <p className="eyebrow" data-reveal><span />Web design · Development · Digital experiences</p>
        <h1 data-reveal>We build webs<br />that mean <em>business.</em></h1>
        <div className="home-hero-bottom">
          <p data-reveal>AHPixel Studio designs and builds modern, fast and responsive websites for businesses that want a stronger digital presence.</p>
          <div className="hero-actions" data-reveal><a href="/work" className="button button-primary">View our work <Arrow /></a><a href="/contact" className="button button-quiet">Start a project <Arrow /></a></div>
        </div>
        <div className="hero-spec" aria-hidden="true"><span>AH / 001</span><span>DESIGN SYSTEM ONLINE</span><span>2026</span></div>
        <a className="scroll-note" href="#selected-work">Scroll to explore <span>↓</span></a>
      </section>

      <section className="work-section section-space" id="selected-work">
        <SectionHeader index="01" label="Selected work" />
        <div className="section-title-row" data-reveal><h2>Work with<br /><em>its own identity.</em></h2><p>Every project gets a visual language shaped around the business—not around a reusable agency template.</p></div>
        {featured.map(project => <ProjectPreview project={project} key={project.slug} />)}
      </section>

      <section className="services-preview section-space light-section">
        <SectionHeader index="02" label="What we build" dark />
        <div className="section-title-row on-light" data-reveal><h2>Useful websites.<br /><em>Built properly.</em></h2><p>Focused digital experiences for businesses and professionals ready to look as credible online as they are in real life.</p></div>
        <div className="service-list">
          {serviceSummaries.map(service => <article key={service.number} data-reveal><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href="/services" aria-label={`Learn about ${service.title}`}><Arrow /></a></article>)}
        </div>
        <div className="section-end"><TextLink href="/services">Explore services</TextLink></div>
      </section>

      <section className="process-section section-space">
        <SectionHeader index="03" label="Our process" />
        <div className="section-title-row" data-reveal><h2>From idea<br /><em>to live website.</em></h2><p>A clear, collaborative path from first conversation to a finished website ready to do its job.</p></div>
        <div className="process-track">
          {process.map(([number, title, text]) => <article key={number} data-reveal><span>{number}</span><i /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="why-section light-section">
        <div className="why-grid" aria-hidden="true" />
        <p className="eyebrow dark" data-reveal><span />A website is part of the business</p>
        <h2 data-reveal>Your website<br /><em>works before you do.</em></h2>
        <div className="why-copy" data-reveal><p>For many customers, your website is their first interaction with your business. It should communicate trust, explain what you offer and make the next step obvious.</p><div className="why-points"><span>Clear message</span><span>Professional image</span><span>Mobile experience</span><span>Faster contact</span></div></div>
      </section>

      <section className="about-preview section-space">
        <SectionHeader index="04" label="The studio" />
        <div className="about-statement"><h2 data-reveal>Small studio.<br /><em>Serious about details.</em></h2><div data-reveal><p>AHPixel Studio is an independent web design and development studio focused on modern digital experiences for businesses and professionals.</p><p>We combine thoughtful design, responsive development and attention to detail to build websites that look professional and feel effortless to use.</p><TextLink href="/about">About AHPixel</TextLink></div></div>
      </section>

      <section className="final-cta">
        <div className="cta-pixels" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="eyebrow" data-reveal><span />Have a project in mind?</p>
        <h2 data-reveal>Let&apos;s build<br /><em>something good.</em></h2>
        <p data-reveal>Tell us what you&apos;re building and let&apos;s see how AHPixel can help.</p>
        <div className="hero-actions" data-reveal><a href="/contact" className="button button-primary">Start a project <Arrow /></a><a href="/work" className="button button-quiet">View our work <Arrow /></a></div>
      </section>
    </main>
  );
}

