"use client";

import Image from "next/image";
import { PointerEvent, useRef } from "react";
import { Arrow } from "../SiteShell";
import { projects } from "../../data/site";

export function InteractiveHero() {
  const hero = useRef<HTMLElement>(null);
  const frame = useRef<HTMLAnchorElement>(null);
  const raf = useRef<number | null>(null);
  const project = projects[0];

  const move = (event: PointerEvent<HTMLElement>) => {
    if (!hero.current || !frame.current || matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = hero.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      frame.current?.style.setProperty("--hx", x.toFixed(3));
      frame.current?.style.setProperty("--hy", y.toFixed(3));
      frame.current?.style.setProperty("--hero-x", `${x * 12}px`);
      frame.current?.style.setProperty("--hero-y", `${y * 10}px`);
      frame.current?.style.setProperty("--hero-rx", `${y * -1.5}deg`);
      frame.current?.style.setProperty("--hero-ry", `${x * 1.8}deg`);
      hero.current?.style.setProperty("--gx", `${50 + x * 2}%`);
      hero.current?.style.setProperty("--gy", `${50 + y * 2}%`);
    });
  };

  const reset = () => {
    frame.current?.style.setProperty("--hx", "0");
    frame.current?.style.setProperty("--hy", "0");
    frame.current?.style.setProperty("--hero-x", "0px");
    frame.current?.style.setProperty("--hero-y", "0px");
    frame.current?.style.setProperty("--hero-rx", "0deg");
    frame.current?.style.setProperty("--hero-ry", "0deg");
  };

  return <section ref={hero} id="top" className="interactive-hero" data-home-section="01" data-nav="home" onPointerMove={move} onPointerLeave={reset}>
    <div className="interactive-hero-grid" aria-hidden="true" />
    <div className="interactive-hero-shell">
      <div className="interactive-hero-copy">
        <div className="interactive-hero-meta"><span>Web design / Development</span><span>Lima / Working worldwide</span></div>
        <h1><span>We build webs</span><span>that mean <em>business.</em></span></h1>
        <p>Modern websites for businesses that want a sharper, more credible digital presence.</p>
        <div className="interactive-hero-actions"><a className="button button-primary magnetic" href="#work">Explore the work <Arrow /></a><a className="button button-secondary" href="/contact">Start a project</a></div>
      </div>
      <a ref={frame} href={`/work/${project.slug}`} className="interactive-hero-stage" aria-label="Explore the Vanta Barber Club case study">
        <span className="interactive-stage-label">Selected work / 01</span>
        <div className="interactive-browser">
          <div className="browser-bar"><i/><i/><i/><span>VANTA / DESKTOP</span></div>
          <Image src={project.desktopImages[0]} alt="Vanta Barber Club desktop website" width={1425} height={990} priority sizes="(max-width: 768px) 90vw, 48vw" />
        </div>
        <div className="interactive-phone"><Image src={project.mobileImages[0]} alt="Vanta Barber Club mobile website" width={375} height={812} sizes="(max-width: 768px) 28vw, 11vw" /></div>
        <div className="interactive-pixels" aria-hidden="true"><i/><i/><i/><i/></div>
        <div className="interactive-stage-footer"><strong>VANTA</strong><span>Concept website · 2026</span></div>
      </a>
    </div>
    <div className="interactive-hero-foot"><span>Digital showroom / Active</span><span>Scroll to explore ↓</span></div>
  </section>;
}
