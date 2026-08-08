"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "../data/site";

const navigation = [["Work", "/work"], ["Services", "/services"], ["Studio", "/about"], ["Contact", "/contact"]];

export function Logo() {
  return <a href="/" className="logo" aria-label="AHPixel Studio home"><Image className="logo-image" src="/ahpixel-logo.png" alt="" width={870} height={658} priority aria-hidden="true" /><span className="logo-name"><strong>AHPixel</strong><small>Studio</small></span></a>;
}

export function Arrow() { return <span className="arrow" aria-hidden="true">→</span>; }

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.1 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  });

  return <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Logo />
      <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <a href="/contact" className="button button-primary header-cta">Start a project <Arrow /></a>
      <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">{navigation.map(([label, href], index) => <a href={href} key={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>)}</nav>
        <a href="/contact" className="button button-primary" onClick={() => setMenuOpen(false)}>Start a project <Arrow /></a>
        <div className="menu-meta"><span>Web design · Development</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
      </div>
    </header>
    {children}
    <Footer />
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand"><Logo /><p>Modern websites built with clarity, character and precise execution.</p></div>
      <nav aria-label="Footer navigation">{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className="footer-contact"><span>Start a conversation</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram <Arrow /></a></div>
    </div>
    <div className="footer-word" aria-hidden="true">AHPIXEL</div>
    <div className="footer-bottom"><span>© 2026 AHPixel Studio</span><span>Lima, Peru · Working worldwide</span></div>
  </footer>;
}
