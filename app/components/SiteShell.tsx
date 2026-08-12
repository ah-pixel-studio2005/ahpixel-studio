"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "../data/site";
import { trackStudioEvent } from "../lib/events";

const navigation = {
  en: [["Work", "/work"], ["Services", "/services"], ["Studio", "/about"], ["Contact", "/contact"]],
  es: [["Proyectos", "/work"], ["Servicios", "/services"], ["Estudio", "/about"], ["Contacto", "/contact"]],
} as const;

type Language = keyof typeof navigation;
type ThemeMode = "light" | "dark" | "schedule";

export function Logo({ href = "/" }: { href?: string }) {
  return <a href={href} className="logo" aria-label="AHPixel Studio home"><Image className="logo-image" src="/ahpixel-logo.png" alt="" width={870} height={658} priority aria-hidden="true" /><span className="logo-name"><strong>AHPixel</strong><small>Studio</small></span></a>;
}

export function Arrow() { return <span className="arrow" aria-hidden="true">→</span>; }

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [themeMode, setThemeMode] = useState<ThemeMode>("schedule");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [themeOpen, setThemeOpen] = useState(false);
  const localizedHref = (href: string) => language === "en" ? href : `/es${href === "/" ? "" : href}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); setThemeOpen(false); } };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("ahpixel-theme");
    const initial: ThemeMode = saved === "light" || saved === "dark" || saved === "schedule" ? saved : "schedule";
    setThemeMode(initial);
  }, []);

  useEffect(() => {
    const apply = (mode: ThemeMode) => {
      const next = mode === "schedule" ? (new Date().getHours() >= 7 && new Date().getHours() < 19 ? "light" : "dark") : mode;
      document.documentElement.dataset.theme = next;
      document.documentElement.dataset.themeMode = mode;
      document.documentElement.style.colorScheme = next;
      setResolvedTheme(next);
    };
    apply(themeMode);
    const timer = window.setInterval(() => apply(themeMode), 60_000);
    return () => window.clearInterval(timer);
  }, [themeMode]);

  const switchTheme = (next: ThemeMode) => {
    localStorage.setItem("ahpixel-theme", next);
    setThemeMode(next);
    const resolved = next === "schedule" ? (new Date().getHours() >= 7 && new Date().getHours() < 19 ? "light" : "dark") : next;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.themeMode = next;
    document.documentElement.style.colorScheme = resolved;
    setResolvedTheme(resolved);
    setThemeOpen(false);
  };
  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (next) requestAnimationFrame(() => document.getElementById("mobile-menu")?.scrollTo({ top: 0 }));
  };

  useEffect(() => {
    const path = window.location.pathname;
    const locale: Language = path === "/es" || path.startsWith("/es/") ? "es" : "en";
    const normalizedPath = path.replace(/^\/(es|en)(?=\/|$)/, "") || "/";
    localStorage.setItem("ahpixel-language", locale);
    document.documentElement.lang = locale;
    const frame = requestAnimationFrame(() => {
      setLanguage(locale);
      setActivePath(normalizedPath === "/about" ? "/about" : normalizedPath.startsWith("/work") ? "/work" : normalizedPath.startsWith("/services") ? "/services" : normalizedPath.startsWith("/contact") ? "/contact" : "");
    });
    if (normalizedPath !== "/") return () => cancelAnimationFrame(frame);
    const sections = document.querySelectorAll<HTMLElement>("[data-home-section]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = (entry.target as HTMLElement).dataset.nav;
      setActivePath(target === "work" ? "/work" : target === "services" ? "/services" : target === "studio" ? "/about" : target === "start" ? "/contact" : "");
    }), { rootMargin: "-45% 0px -48%", threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  const switchLanguage = (next: Language) => {
    localStorage.setItem("ahpixel-language", next);
    const path = window.location.pathname.replace(/^\/(es|en)(?=\/|$)/, "") || "/";
    const destination = next === "es" ? `/es${path === "/" ? "" : path}` : path;
    window.location.assign(`${destination}${window.location.search}${window.location.hash}`);
  };

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll<HTMLElement>(".magnetic");
    const cleanups: Array<() => void> = [];
    targets.forEach(target => {
      let frame = 0;
      const move = (event: PointerEvent) => {
        const rect = target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 7;
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => { target.style.setProperty("--mx", `${x}px`); target.style.setProperty("--my", `${y}px`); });
      };
      const leave = () => { target.style.setProperty("--mx", "0px"); target.style.setProperty("--my", "0px"); };
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerleave", leave);
      cleanups.push(() => { target.removeEventListener("pointermove", move); target.removeEventListener("pointerleave", leave); if (frame) cancelAnimationFrame(frame); });
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);

  return <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Logo href={localizedHref("/")} />
      <nav className="desktop-nav" aria-label="Primary navigation">{navigation[language].map(([label, href]) => <a href={localizedHref(href)} key={href} className={activePath === href ? "active" : ""} aria-current={activePath === href ? "page" : undefined}>{label}</a>)}</nav>
      <LanguageSwitcher language={language} switchLanguage={switchLanguage} />
      <ThemeSwitcher language={language} mode={themeMode} resolved={resolvedTheme} open={themeOpen} setOpen={setThemeOpen} switchTheme={switchTheme} />
      <a href={localizedHref("/contact")} className="button button-primary header-cta">{language === "es" ? "Iniciar proyecto" : "Start a project"} <Arrow /></a>
      <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={toggleMenu}><i /><i /></button>
      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">{navigation[language].map(([label, href], index) => <a href={localizedHref(href)} key={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>)}</nav>
        <LanguageSwitcher language={language} switchLanguage={switchLanguage} mobile />
        <ThemeSwitcher language={language} mode={themeMode} resolved={resolvedTheme} open={themeOpen} setOpen={setThemeOpen} switchTheme={switchTheme} mobile />
        <a href={localizedHref("/contact")} className="button button-primary" onClick={() => setMenuOpen(false)}>{language === "es" ? "Iniciar proyecto" : "Start a project"} <Arrow /></a>
        <div className="menu-meta"><span>Web design · Development</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
      </div>
    </header>
    {children}
    <Footer language={language} localizedHref={localizedHref} />
  </>;
}

function ThemeSwitcher({ language, mode, resolved, open, setOpen, switchTheme, mobile = false }: { language: Language; mode: ThemeMode; resolved: "light" | "dark"; open: boolean; setOpen: (open: boolean) => void; switchTheme: (mode: ThemeMode) => void; mobile?: boolean }) {
  const labels = language === "es" ? {
    title: "Apariencia", light: "Claro", lightNote: "Siempre luminoso", dark: "Oscuro", darkNote: "Siempre nocturno", schedule: "Automático", scheduleNote: "Claro 07:00–19:00", current: "Tema actual",
  } : {
    title: "Appearance", light: "Light", lightNote: "Always bright", dark: "Dark", darkNote: "Always nocturnal", schedule: "Automatic", scheduleNote: "Light 07:00–19:00", current: "Current theme",
  };
  const choices: Array<[ThemeMode, string, string]> = [["light", labels.light, labels.lightNote], ["dark", labels.dark, labels.darkNote], ["schedule", labels.schedule, labels.scheduleNote]];
  return <div className={`theme-control ${mobile ? "theme-control-mobile" : ""}`}>
    {!mobile && <button className="theme-trigger" type="button" aria-label={`${labels.current}: ${mode === "schedule" ? labels.schedule : mode === "light" ? labels.light : labels.dark}`} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(!open)}><span className={`theme-symbol ${resolved}`} aria-hidden="true"><i/></span></button>}
    <div className={`theme-panel ${mobile || open ? "is-open" : ""}`}>
      <div className="theme-panel-head"><span>{labels.title}</span><small>{resolved === "light" ? labels.light : labels.dark}</small></div>
      <div className="theme-options" role="radiogroup" aria-label={labels.title}>{choices.map(([value, label, note]) => <button key={value} type="button" role="radio" aria-checked={mode === value} className={mode === value ? "active" : ""} onClick={() => switchTheme(value)}><span className={`theme-option-icon ${value}`} aria-hidden="true"><i/></span><span><strong>{label}</strong><small>{note}</small></span><b aria-hidden="true"/></button>)}</div>
    </div>
  </div>;
}

function LanguageSwitcher({ language, switchLanguage, mobile = false }: { language: Language; switchLanguage: (language: Language) => void; mobile?: boolean }) {
  return <div className={mobile ? "mobile-language-switcher" : "language-switcher"} aria-label="Language"><button type="button" className={language === "es" ? "active" : ""} aria-pressed={language === "es"} onClick={() => switchLanguage("es")}>ES</button><span>/</span><button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => switchLanguage("en")}>EN</button></div>;
}

function Footer({ language, localizedHref }: { language: Language; localizedHref: (href: string) => string }) {
  return <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand"><Logo href={localizedHref("/")} /><p>{language === "es" ? "Sitios web modernos creados con claridad, carácter y ejecución precisa." : "Modern websites built with clarity, character and precise execution."}</p></div>
      <nav aria-label="Footer navigation">{navigation[language].map(([label, href]) => <a href={localizedHref(href)} key={href}>{label}</a>)}</nav>
      <div className="footer-contact"><span>{language === "es" ? "Inicia una conversación" : "Start a conversation"}</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackStudioEvent("whatsapp_clicked", { source: "footer", language })}>WhatsApp <Arrow /></a><a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram <Arrow /></a></div>
    </div>
    <div className="footer-word" aria-hidden="true">AHPIXEL</div>
    <div className="footer-bottom"><span>© 2026 AHPixel Studio</span><span>{siteConfig.location} · {language === "es" ? "Trabajando para todo el mundo" : siteConfig.availability}</span></div>
  </footer>;
}
