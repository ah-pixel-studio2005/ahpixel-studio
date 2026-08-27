"use client";

import Image from "next/image";
import { PointerEvent, useRef } from "react";
import { Arrow } from "../SiteShell";
import { projects } from "../../data/site";
import type { HomeLanguage } from "../../page";

const copy = {
  en: {
    disciplines: "Web design / Development", location: "Lima / Working worldwide",
    headline: <>We build webs</>, headlineTwo: <>that mean <em>business.</em></>,
    intro: "Modern websites for businesses that want a sharper, more credible digital presence.",
    work: "Explore the work", start: "Start a project", selected: "Selected work / 01",
    caseLabel: "Explore the Vanta Barber Club case study", desktopAlt: "Vanta Barber Club desktop website",
    mobileAlt: "Vanta Barber Club mobile website", concept: "Concept website · 2026",
    showroom: "Digital showroom / Active", scroll: "Scroll to explore ↓",
  },
  es: {
    disciplines: "Diseño web / Desarrollo", location: "Lima / Trabajamos a nivel internacional",
    headline: <>Creamos webs</>, headlineTwo: <>que impulsan <em>negocios.</em></>,
    intro: "Sitios web modernos para empresas que buscan una presencia digital más sólida, clara y confiable.",
    work: "Ver proyectos", start: "Iniciar proyecto", selected: "Proyecto destacado / 01",
    caseLabel: "Explorar el caso de estudio de Vanta Barber Club", desktopAlt: "Sitio web de Vanta Barber Club en escritorio",
    mobileAlt: "Sitio web de Vanta Barber Club en móvil", concept: "Sitio conceptual · 2026",
    showroom: "Showroom digital / Activo", scroll: "Desliza para explorar ↓",
  },
} as const;

export function InteractiveHero({ language }: { language: HomeLanguage }) {
  const hero = useRef<HTMLElement>(null);
  const frame = useRef<HTMLAnchorElement>(null);
  const raf = useRef<number | null>(null);
  const project = projects[0];
  const text = copy[language];
  const prefix = language === "es" ? "/es" : "";

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
        <div className="interactive-hero-meta"><span>{text.disciplines}</span><span>{text.location}</span></div>
        <h1><span>{text.headline}</span><span>{text.headlineTwo}</span></h1>
        <p>{text.intro}</p>
        <div className="interactive-hero-actions"><a className="button button-primary magnetic" href="#work">{text.work} <Arrow /></a><a className="button button-secondary" href={`${prefix}/contact`}>{text.start}</a></div>
      </div>
      <a ref={frame} href={`${prefix}/work/${project.slug}`} className="interactive-hero-stage" aria-label={text.caseLabel}>
        <span className="interactive-stage-label">{text.selected}</span>
        <div className="interactive-browser">
          <div className="browser-bar"><i/><i/><i/><span>VANTA / DESKTOP</span></div>
          <Image src={project.desktopImages[0]} alt={text.desktopAlt} width={1425} height={990} priority sizes="(max-width: 768px) 90vw, 48vw" />
        </div>
        <div className="interactive-phone"><Image src={project.mobileImages[0]} alt={text.mobileAlt} width={375} height={812} sizes="(max-width: 768px) 28vw, 11vw" /></div>
        <div className="interactive-pixels" aria-hidden="true"><i/><i/><i/><i/></div>
        <div className="interactive-stage-footer"><strong>VANTA</strong><span>{text.concept}</span></div>
      </a>
    </div>
    <div className="interactive-hero-foot"><span>{text.showroom}</span><span>{text.scroll}</span></div>
  </section>;
}
