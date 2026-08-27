"use client";
/* Remote Unsplash assets are pre-sized and art-directed for the masonry crops. */
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useRef, useState } from "react";

type Locale = "en" | "es";

const WA_LINKS: Record<Locale, string> = {
  en: "https://wa.me/51999999999?text=Hello%20Vanta%2C%20I%27d%20like%20to%20book%20a%20session.",
  es: "https://wa.me/51999999999?text=Hola%20Vanta%2C%20quisiera%20reservar%20una%20cita.",
};

const galleryImages = [
  "/demos/vanta/hero.webp",
  "/demos/vanta/craft.webp",
  "/demos/vanta/studio.webp",
  "/demos/vanta/beard.webp",
  "/demos/vanta/tools.webp",
  "/demos/vanta/barber.webp",
  "/demos/vanta/beard.webp",
];

const copy = {
  en: {
    nav: [["Home", "home"], ["Services", "services"], ["About", "about"], ["Gallery", "gallery"], ["Reviews", "reviews"], ["Contact", "contact"]],
    book: "Book a session", openNav: "Open navigation", closeNav: "Close navigation", primaryNav: "Primary navigation", mobileNav: "Mobile navigation", footerNav: "Footer navigation",
    heroAlt: "Barber making a precision haircut in a dark, refined studio", heroEyebrow: "Premium barbershop · Est. 2026", heroTitle: "More than a haircut.", heroAccent: "A standard.", heroText: "Precision cuts, timeless style and a premium grooming experience crafted for the modern gentleman.", appointment: "Book your appointment", viewServices: "View services", daysShort: "MON — SAT", location: "LOCATION", scroll: "SCROLL",
    philosophy: "Our philosophy", craft: "Craft. Precision.", character: "Character.", introLead: "Vanta combines the discipline of traditional barbering with the ease and intention of a contemporary grooming experience.", introText: "Every detail matters—from the first consultation to the final finish. We create considered cuts that feel effortless, personal and unmistakably yours.", explore: "Explore our craft", introAlt: "Barber shaping a client's haircut with focused precision", standard: "THE VANTA STANDARD", detail: "PRECISION IN EVERY DETAIL",
    menu: "The menu", servicesTitle: "Our services", servicesIntro: "Thoughtful grooming, tailored to you. Every service includes a personal consultation and expert finish.", bookService: "Book", serviceNote: "All prices in USD · Sessions by appointment",
    services: [["01", "Signature Cut", "Precision haircut, consultation and styling.", "$25"], ["02", "Beard Sculpt", "Beard shaping, trimming and finishing.", "$18"], ["03", "Cut + Beard", "Full haircut and beard grooming experience.", "$38"], ["04", "Hot Towel Shave", "Traditional razor shave with hot towel treatment.", "$22"], ["05", "The Vanta Experience", "Haircut + beard + hot towel + styling.", "$50"]],
    aboutLabel: "About Vanta", aboutTitle: "Where tradition meets", aboutAccent: "modern style.", aboutLead: "Vanta was created for men who appreciate precision, detail and timeless style.", aboutText: "Every appointment is more than a haircut—it's a moment to reset, refine and leave sharper than you arrived.", barberAlt: "Professional barber refining a haircut", years: "Years experience", clients: "Clients", rating: "Rating",
    selectedWork: "Selected work", look: "The Vanta look", lookText: "Clean lines. Natural texture.", lookAccent: "A finish that feels like you.", galleryAlts: ["Precision scissor work", "Modern fade detail", "Vanta studio interior", "Beard refinement", "Tools of the craft", "A considered finish", "The hot towel ritual"], galleryTypes: ["cut", "fade", "interior", "beard", "tools", "finish", "ritual"],
    experienceLabel: "The experience", simple: "Simple by design.", sharp: "Sharp by nature.", processText: "No rush. No guesswork. Just a considered experience from the moment you book.", steps: [["01", "Book", "Choose your service and reserve your session."], ["02", "Experience", "Relax while your barber crafts the perfect look."], ["03", "Leave sharp", "Walk out confident, refined and ready."]],
    clientNotes: "Client notes", reviewsTitle: "What our clients say", stars: "5 out of 5 stars", testimonials: [["Best haircut I've had in years. Great atmosphere, attention to detail and zero rush.", "Daniel R.", "SIGNATURE CUT"], ["They listen, they take their time, and the result is consistently sharp. Exactly what I was looking for.", "Marco T.", "CUT + BEARD"], ["A calm space, impeccable service and a barber who understands what suits you. I'll be back.", "Andrés V.", "VANTA EXPERIENCE"]],
    ctaAlt: "Atmospheric premium barber shop interior", chair: "Your chair is waiting", ready: "Ready for your", nextCut: "next cut?", ctaText: "Book your session and experience the Vanta standard.", whatsapp: "Book on WhatsApp",
    visitLabel: "Visit & contact", visit: "Visit Vanta", find: "FIND US AT", directions: "Get directions", hours: "Opening hours", weekdays: "Monday — Friday", saturday: "Saturday", sunday: "Sunday", closed: "Closed", hoursNote: "Appointments recommended.", walkins: "Walk-ins subject to availability.",
    request: "Request a session", lets: "Let's get you", chairAccent: "in the chair.", contactText: "Tell us what you need and your preferred date. We'll confirm availability directly.", name: "Name", fullName: "Your full name", phone: "Phone / WhatsApp", email: "Email", service: "Service", selectService: "Select a service", date: "Preferred date", message: "Message", messagePlaceholder: "Anything we should know?", received: "Request received. We'll be in touch shortly.", reply: "We'll reply within business hours.", requestAppointment: "Request appointment",
    footerText: "Precision cuts, timeless style,", footerAccent: "the Vanta standard.", rights: "© 2026 Vanta Barber Club. All rights reserved.", concept: "Concept Website / Barbershop Web Design", by: "Website concept by",
  },
  es: {
    nav: [["Inicio", "home"], ["Servicios", "services"], ["Nosotros", "about"], ["Galería", "gallery"], ["Reseñas", "reviews"], ["Contacto", "contact"]],
    book: "Reservar una cita", openNav: "Abrir navegación", closeNav: "Cerrar navegación", primaryNav: "Navegación principal", mobileNav: "Navegación móvil", footerNav: "Navegación del pie de página",
    heroAlt: "Barbero realizando un corte de precisión en un estudio oscuro y refinado", heroEyebrow: "Barbería premium · Est. 2026", heroTitle: "Más que un corte.", heroAccent: "Un estándar.", heroText: "Cortes precisos, estilo atemporal y una experiencia premium creada para el hombre moderno.", appointment: "Reserva tu cita", viewServices: "Ver servicios", daysShort: "LUN — SÁB", location: "UBICACIÓN", scroll: "DESLIZA",
    philosophy: "Nuestra filosofía", craft: "Oficio. Precisión.", character: "Carácter.", introLead: "Vanta combina la disciplina de la barbería tradicional con la comodidad y la intención de una experiencia contemporánea.", introText: "Cada detalle importa: desde la primera consulta hasta el acabado final. Creamos cortes pensados para sentirse naturales, personales e inconfundiblemente tuyos.", explore: "Descubre nuestro oficio", introAlt: "Barbero dando forma a un corte con precisión", standard: "EL ESTÁNDAR VANTA", detail: "PRECISIÓN EN CADA DETALLE",
    menu: "El menú", servicesTitle: "Nuestros servicios", servicesIntro: "Cuidado personal pensado para ti. Cada servicio incluye asesoría personalizada y acabado profesional.", bookService: "Reservar", serviceNote: "Todos los precios en USD · Atención con cita",
    services: [["01", "Corte Signature", "Corte de precisión, asesoría y peinado.", "$25"], ["02", "Perfilado de Barba", "Diseño, recorte y acabado de barba.", "$18"], ["03", "Corte + Barba", "Experiencia completa de corte y cuidado de barba.", "$38"], ["04", "Afeitado con Toalla Caliente", "Afeitado tradicional con navaja y tratamiento de toalla caliente.", "$22"], ["05", "La Experiencia Vanta", "Corte + barba + toalla caliente + peinado.", "$50"]],
    aboutLabel: "Sobre Vanta", aboutTitle: "Donde la tradición encuentra", aboutAccent: "el estilo moderno.", aboutLead: "Vanta fue creado para hombres que valoran la precisión, el detalle y el estilo atemporal.", aboutText: "Cada cita es más que un corte: es un momento para reiniciar, refinar tu estilo y salir más impecable de lo que llegaste.", barberAlt: "Barbero profesional perfeccionando un corte", years: "Años de experiencia", clients: "Clientes", rating: "Calificación",
    selectedWork: "Trabajos seleccionados", look: "El estilo Vanta", lookText: "Líneas limpias. Textura natural.", lookAccent: "Un acabado que se siente tuyo.", galleryAlts: ["Trabajo preciso con tijera", "Detalle de fade moderno", "Interior del estudio Vanta", "Perfilado de barba", "Herramientas del oficio", "Un acabado cuidado", "El ritual de la toalla caliente"], galleryTypes: ["corte", "fade", "interior", "barba", "herramientas", "acabado", "ritual"],
    experienceLabel: "La experiencia", simple: "Simple por diseño.", sharp: "Impecable por naturaleza.", processText: "Sin prisa. Sin improvisar. Una experiencia cuidada desde el momento en que reservas.", steps: [["01", "Reserva", "Elige tu servicio y reserva tu cita."], ["02", "Disfruta", "Relájate mientras tu barbero crea el look perfecto."], ["03", "Sal impecable", "Sal con confianza, refinado y listo."]],
    clientNotes: "Opiniones de clientes", reviewsTitle: "Lo que dicen nuestros clientes", stars: "5 de 5 estrellas", testimonials: [["El mejor corte que he tenido en años. Gran ambiente, atención al detalle y sin apuros.", "Daniel R.", "CORTE SIGNATURE"], ["Escuchan, se toman su tiempo y el resultado siempre queda impecable. Exactamente lo que buscaba.", "Marco T.", "CORTE + BARBA"], ["Un espacio tranquilo, servicio impecable y un barbero que entiende lo que te favorece. Volveré.", "Andrés V.", "EXPERIENCIA VANTA"]],
    ctaAlt: "Interior de una barbería premium con una atmósfera elegante", chair: "Tu silla te espera", ready: "¿Listo para tu", nextCut: "próximo corte?", ctaText: "Reserva tu cita y vive el estándar Vanta.", whatsapp: "Reservar por WhatsApp",
    visitLabel: "Visítanos y contáctanos", visit: "Visita Vanta", find: "ENCUÉNTRANOS EN", directions: "Cómo llegar", hours: "Horario de atención", weekdays: "Lunes — Viernes", saturday: "Sábado", sunday: "Domingo", closed: "Cerrado", hoursNote: "Se recomienda reservar.", walkins: "Atención sin cita sujeta a disponibilidad.",
    request: "Solicita una cita", lets: "Es momento de", chairAccent: "tomar asiento.", contactText: "Cuéntanos qué necesitas y la fecha que prefieres. Confirmaremos la disponibilidad directamente contigo.", name: "Nombre", fullName: "Tu nombre completo", phone: "Teléfono / WhatsApp", email: "Correo", service: "Servicio", selectService: "Selecciona un servicio", date: "Fecha preferida", message: "Mensaje", messagePlaceholder: "¿Hay algo que debamos saber?", received: "Solicitud recibida. Nos comunicaremos contigo pronto.", reply: "Responderemos dentro del horario de atención.", requestAppointment: "Solicitar cita",
    footerText: "Cortes precisos, estilo atemporal,", footerAccent: "el estándar Vanta.", rights: "© 2026 Vanta Barber Club. Todos los derechos reservados.", concept: "Sitio conceptual / Diseño web para barbería", by: "Concepto web por",
  },
} as const;

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }
function Brand() { return <a className="brand" href="#home" aria-label="Vanta Barber Club"><strong>VANTA</strong><span>BARBER CLUB</span></a>; }

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const c = copy[locale];
  const waLink = WA_LINKS[locale];

  useEffect(() => {
    const saved = window.localStorage.getItem("vanta-locale");
    if (saved === "en" || saved === "es") setLocale(saved);
    else if (navigator.language.toLowerCase().startsWith("es")) setLocale("es");
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("vanta-locale", locale);
    setSent(false);
  }, [locale]);
  useEffect(() => {
    const nodes = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKeyDown); };
  }, []);
  useEffect(() => {
    rootRef.current?.classList.toggle("menu-open", menuOpen);
    return () => rootRef.current?.classList.remove("menu-open");
  }, [menuOpen]);

  const chooseLocale = (next: Locale) => { setLocale(next); setMenuOpen(false); };
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!event.currentTarget.checkValidity()) return; setSent(true); event.currentTarget.reset(); };
  const LanguageSwitch = ({ mobile = false }: { mobile?: boolean }) => <div className={`language-switch ${mobile ? "language-switch-mobile" : ""}`} role="group" aria-label="Language / Idioma"><button type="button" className={locale === "es" ? "active" : ""} aria-pressed={locale === "es"} onClick={() => chooseLocale("es")}>ES</button><span>/</span><button type="button" className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => chooseLocale("en")}>EN</button></div>;

  return (
    <main ref={rootRef}>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><Brand/><nav className="desktop-nav" aria-label={c.primaryNav}>{c.nav.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="header-actions"><LanguageSwitch/><a className="button button-small header-cta" href={waLink} target="_blank" rel="noreferrer">{c.book} <Arrow/></a></div><button className={`menu-toggle ${menuOpen ? "open" : ""}`} aria-label={menuOpen ? c.closeNav : c.openNav} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i/><i/></button><div id="mobile-navigation" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}><nav aria-label={c.mobileNav}>{c.nav.map(([label,id], index) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{index+1}</span>{label}</a>)}</nav><div className="mobile-menu-bottom"><LanguageSwitch mobile/><a className="button" href={waLink} target="_blank" rel="noreferrer">{c.book} <Arrow/></a></div></div></header>

      <section className="hero" id="home"><img className="hero-image" src="/demos/vanta/hero.webp" alt={c.heroAlt} fetchPriority="high" decoding="async"/><div className="hero-overlay"/><div className="hero-content"><p className="eyebrow hero-eyebrow"><span/>{c.heroEyebrow}</p><h1>{c.heroTitle}<br/><em>{c.heroAccent}</em></h1><div className="hero-bottom"><p>{c.heroText}</p><div className="hero-actions"><a className="button button-light" href={waLink} target="_blank" rel="noreferrer">{c.appointment} <Arrow/></a><a className="text-link" href="#services">{c.viewServices} <span>↓</span></a></div></div></div><div className="hero-meta"><div><span>{c.daysShort}</span><strong>09:00 — 20:00</strong></div><div><span>{c.location}</span><strong>LIMA, PERU</strong></div><span className="scroll-cue">{c.scroll} <i/></span></div></section>

      <section className="intro light-section section-pad" id="about"><div className="section-label" data-reveal><span>01</span>{c.philosophy}</div><div className="intro-grid"><h2 data-reveal>{c.craft}<br/><em>{c.character}</em></h2><div className="intro-copy" data-reveal><p className="lead">{c.introLead}</p><p>{c.introText}</p><a className="dark-link" href="#services">{c.explore} <Arrow/></a></div></div><figure className="wide-image" data-reveal><img src="/demos/vanta/craft.webp" alt={c.introAlt} loading="lazy"/><figcaption><span>{c.standard}</span><span>{c.detail}</span></figcaption></figure></section>

      <section className="services section-pad" id="services"><div className="section-label gold" data-reveal><span>02</span>{c.menu}</div><div className="section-heading" data-reveal><h2>{c.servicesTitle}</h2><p>{c.servicesIntro}</p></div><div className="service-list">{c.services.map(([num,title,desc,price]) => <article className="service-row" key={num} data-reveal><span className="service-num">{num}</span><h3>{title}</h3><p>{desc}</p><strong>{price}</strong><a href={waLink} target="_blank" rel="noreferrer" aria-label={`${c.bookService}: ${title}`}><Arrow/></a></article>)}</div><p className="service-note">{c.serviceNote}</p></section>

      <section className="about light-section section-pad"><div className="about-grid"><div className="about-image" data-reveal><img src="/demos/vanta/barber.webp" alt={c.barberAlt} loading="lazy"/><span className="vertical-note">EST. LIMA — 2026</span></div><div className="about-content"><div className="section-label" data-reveal><span>03</span>{c.aboutLabel}</div><h2 data-reveal>{c.aboutTitle} <em>{c.aboutAccent}</em></h2><p className="lead" data-reveal>{c.aboutLead}</p><p data-reveal>{c.aboutText}</p><div className="stats" data-reveal><div><strong>7+</strong><span>{c.years}</span></div><div><strong>2,500+</strong><span>{c.clients}</span></div><div><strong>4.9/5</strong><span>{c.rating}</span></div></div></div></div></section>

      <section className="gallery section-pad" id="gallery"><div className="section-label gold" data-reveal><span>04</span>{c.selectedWork}</div><div className="section-heading gallery-heading" data-reveal><h2>{c.look}</h2><p>{c.lookText}<br/>{c.lookAccent}</p></div><div className="gallery-grid">{galleryImages.map((src,i) => <figure key={`${src}-${i}`} className={`gallery-item item-${i+1}`} data-reveal><img src={src} alt={c.galleryAlts[i]} loading="lazy"/><figcaption><span>0{i+1}</span>{c.galleryTypes[i]}</figcaption></figure>)}</div></section>

      <section className="process light-section section-pad" id="experience"><div className="section-label" data-reveal><span>05</span>{c.experienceLabel}</div><div className="process-head" data-reveal><h2>{c.simple}<br/><em>{c.sharp}</em></h2><p>{c.processText}</p></div><div className="steps">{c.steps.map(([n,t,p]) => <article key={n} data-reveal><span>{n}</span><div className="step-line"/><h3>{t}</h3><p>{p}</p></article>)}</div></section>

      <section className="reviews section-pad" id="reviews"><div className="section-label gold" data-reveal><span>06</span>{c.clientNotes}</div><h2 data-reveal>{c.reviewsTitle}</h2><div className="review-grid">{c.testimonials.map(([quote,name,service],i) => <blockquote key={name} data-reveal><div className="stars" aria-label={c.stars}>★★★★★</div><p>“{quote}”</p><footer><span>0{i+1}</span><div><strong>— {name}</strong><small>{service}</small></div></footer></blockquote>)}</div></section>

      <section className="cta"><img src="/demos/vanta/studio.webp" alt={c.ctaAlt} loading="lazy"/><div className="cta-overlay"/><div className="cta-content" data-reveal><p className="eyebrow"><span/>{c.chair}</p><h2>{c.ready}<br/><em>{c.nextCut}</em></h2><p>{c.ctaText}</p><a className="button button-light" href={waLink} target="_blank" rel="noreferrer">{c.whatsapp} <Arrow/></a></div></section>

      <section className="visit light-section section-pad" id="contact"><div className="section-label" data-reveal><span>07</span>{c.visitLabel}</div><div className="visit-head" data-reveal><h2>{c.visit}</h2><p>Miraflores, Lima</p></div><div className="visit-grid"><div className="map" data-reveal><div className="map-lines"/><span className="map-pin">V</span><div className="map-address"><small>{c.find}</small><strong>Av. Example 245<br/>Miraflores, Lima</strong><a href="https://maps.google.com/?q=Miraflores+Lima" target="_blank" rel="noreferrer">{c.directions} <Arrow/></a></div></div><div className="hours" data-reveal><h3>{c.hours}</h3><div><span>{c.weekdays}</span><strong>09:00 — 20:00</strong></div><div><span>{c.saturday}</span><strong>09:00 — 18:00</strong></div><div><span>{c.sunday}</span><strong>{c.closed}</strong></div><p>{c.hoursNote}<br/>{c.walkins}</p></div></div><div className="contact-wrap"><div className="contact-intro" data-reveal><p className="eyebrow dark"><span/>{c.request}</p><h2>{c.lets}<br/><em>{c.chairAccent}</em></h2><p>{c.contactText}</p><a href="tel:+51999999999">+51 999 999 999</a><a href="mailto:hello@vantabarber.com">hello@vantabarber.com</a></div><form onSubmit={submit} data-reveal><label><span>{c.name} *</span><input name="name" autoComplete="name" required placeholder={c.fullName}/></label><label><span>{c.phone} *</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+51 000 000 000"/></label><label><span>{c.email} *</span><input name="email" type="email" inputMode="email" autoComplete="email" required placeholder="you@email.com"/></label><label><span>{c.service} *</span><select name="service" required defaultValue=""><option value="" disabled>{c.selectService}</option>{c.services.map(([,name]) => <option key={name}>{name}</option>)}</select></label><label><span>{c.date} *</span><input name="date" type="date" required/></label><label className="full"><span>{c.message}</span><textarea name="message" rows={3} placeholder={c.messagePlaceholder}/></label><div className="form-footer"><p aria-live="polite">{sent ? c.received : c.reply}</p><button className="button button-dark" type="submit">{c.requestAppointment} <Arrow/></button></div></form></div></section>

      <footer className="footer"><div className="footer-top"><Brand/><p>{c.footerText}<br/>{c.footerAccent}</p><nav aria-label={c.footerNav}>{c.nav.slice(0,4).concat([c.nav[5]]).map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <Arrow/></a><a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">TikTok <Arrow/></a></div></div><div className="footer-wordmark">VANTA</div><div className="footer-bottom"><span>{c.rights}</span><span>{c.concept}</span><span>{c.by} <strong>AHPixel Studio</strong></span></div></footer>
    </main>
  );
}

