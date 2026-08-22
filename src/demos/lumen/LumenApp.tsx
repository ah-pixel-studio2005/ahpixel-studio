"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

type Language = "en" | "es";

const copy = {
  en: {
    nav: ["Treatments", "Studio", "Experience", "Visit"],
    book: "Book a consultation",
    eyebrow: "Modern dentistry · Miraflores, Lima",
    hero: <>Dentistry designed<br />around <em>how you feel.</em></>,
    intro: "Calm, considered dental care built on honest guidance, modern technology and time to listen.",
    explore: "Explore treatments",
    welcome: "A clearer kind of dental care.",
    welcomeText: "We created LUMEN for people who want excellent dentistry without the rush, confusion or clinical coldness. Every detail is designed to help you feel informed, comfortable and in control.",
    studioNote: "Natural light, quiet rooms and technology that stays in the background until it is needed.",
    suiteCaption: "Treatment suite · Miraflores",
    detailCaption: "Digital planning · Precise by design",
    treatmentsTitle: <>Care for today.<br /><em>Confidence for what comes next.</em></>,
    treatments: [
      ["01", "Preventive Care", "Check-ups, hygiene and tailored plans that protect long-term oral health."],
      ["02", "Restorative Dentistry", "Natural-looking solutions designed to restore comfort, strength and function."],
      ["03", "Cosmetic Dentistry", "Subtle, considered improvements shaped around your face and your goals."],
      ["04", "Clear Aligners", "Discreet orthodontic care with digital planning and predictable progress."],
    ],
    philosophy: "The best appointment is the one where you understand every step.",
    philosophyText: "Before treatment begins, we take time to explain what we see, what matters now and which options genuinely make sense for you.",
    precisionKicker: "Technology with a human purpose",
    precisionTitle: <>See more clearly.<br /><em>Decide with confidence.</em></>,
    precisionText: "Digital scans and considered planning help us explain every option with greater clarity — while keeping the conversation personal.",
    stepsTitle: "Your visit, thoughtfully considered.",
    steps: [["01", "Listen", "We begin with your concerns, history and what you want to feel differently."], ["02", "Understand", "Clear imaging and plain-language guidance make every option easier to evaluate."], ["03", "Care", "Treatment moves at a comfortable pace with follow-up that never feels generic."]],
    quote: "I felt listened to, never rushed, and understood exactly what we were doing and why.",
    visitTitle: <>A brighter visit<br />starts <em>here.</em></>,
    visitText: "Tell us what you need and our patient coordinator will help you choose the right appointment.",
    fields: ["Name", "Phone / WhatsApp", "Email", "What can we help with?"],
    submit: "Request appointment",
    success: "Thank you. We’ll be in touch shortly.",
    hours: "Mon — Fri 09:00 — 19:00 · Sat 09:00 — 14:00",
    concept: "Fictional concept website created for the AHPixel Studio portfolio.",
  },
  es: {
    nav: ["Tratamientos", "Estudio", "Experiencia", "Visítanos"],
    book: "Reservar consulta",
    eyebrow: "Odontología moderna · Miraflores, Lima",
    hero: <>Odontología pensada<br />en <em>cómo te sientes.</em></>,
    intro: "Atención dental tranquila y consciente, con orientación honesta, tecnología moderna y tiempo para escucharte.",
    explore: "Ver tratamientos",
    welcome: "Una forma más clara de cuidar tu sonrisa.",
    welcomeText: "Creamos LUMEN para personas que buscan excelente odontología sin prisas, confusión ni frialdad clínica. Cada detalle está pensado para que te sientas informado, cómodo y en control.",
    studioNote: "Luz natural, espacios tranquilos y tecnología que aparece solo cuando realmente aporta valor.",
    suiteCaption: "Sala de atención · Miraflores",
    detailCaption: "Planificación digital · Precisión consciente",
    treatmentsTitle: <>Cuidado para hoy.<br /><em>Confianza para lo que sigue.</em></>,
    treatments: [
      ["01", "Cuidado Preventivo", "Evaluaciones, higiene y planes personalizados para proteger tu salud bucal."],
      ["02", "Odontología Restauradora", "Soluciones naturales para recuperar comodidad, resistencia y función."],
      ["03", "Odontología Estética", "Mejoras sutiles y cuidadosas, diseñadas para tu rostro y tus objetivos."],
      ["04", "Alineadores Invisibles", "Ortodoncia discreta con planificación digital y progreso predecible."],
    ],
    philosophy: "La mejor cita es aquella en la que entiendes cada paso.",
    philosophyText: "Antes de comenzar, nos tomamos el tiempo de explicar qué vemos, qué importa ahora y qué opciones realmente tienen sentido para ti.",
    precisionKicker: "Tecnología con propósito humano",
    precisionTitle: <>Ver con claridad.<br /><em>Decidir con confianza.</em></>,
    precisionText: "El escaneo digital y una planificación cuidadosa nos permiten explicar cada alternativa con mayor claridad, sin perder el trato personal.",
    stepsTitle: "Tu visita, cuidada en cada detalle.",
    steps: [["01", "Escuchar", "Empezamos por tus inquietudes, tu historia y aquello que deseas mejorar."], ["02", "Comprender", "Imágenes claras y explicaciones sencillas te ayudan a evaluar cada opción."], ["03", "Cuidar", "El tratamiento avanza a un ritmo cómodo, con un seguimiento verdaderamente personal."]],
    quote: "Me escucharon, nunca sentí prisa y entendí perfectamente qué haríamos y por qué.",
    visitTitle: <>Una visita más clara<br />empieza <em>aquí.</em></>,
    visitText: "Cuéntanos qué necesitas y nuestra coordinadora te ayudará a elegir la cita adecuada.",
    fields: ["Nombre", "Teléfono / WhatsApp", "Correo", "¿Cómo podemos ayudarte?"],
    submit: "Solicitar cita",
    success: "Gracias. Nos comunicaremos contigo pronto.",
    hours: "Lun — Vie 09:00 — 19:00 · Sáb 09:00 — 14:00",
    concept: "Sitio conceptual ficticio creado para el portafolio de AHPixel Studio.",
  },
} as const;

export default function HomePage() {
  const rootRef = useRef<HTMLElement>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: .12 });
    rootRef.current?.querySelectorAll("[data-reveal]").forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [language]);

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };

  return <main ref={rootRef}>
    <header className="header">
      <a className="brand" href="#top" aria-label="LUMEN home"><strong>LUMEN</strong><span>Dental Studio</span></a>
      <nav className={menuOpen ? "nav open" : "nav"}>{t.nav.map((item, index) => <a onClick={() => setMenuOpen(false)} key={item} href={["#treatments", "#studio", "#experience", "#visit"][index]}>{item}</a>)}</nav>
      <div className="header-actions"><div className="language" aria-label="Language"><button className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button><i /> <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div><a className="book-link" href="#visit">{t.book}<span>↗</span></a><button className="menu" onClick={() => setMenuOpen(value => !value)} aria-label="Toggle menu"><i/><i/></button></div>
    </header>

    <section id="top" className="hero">
      <Image className="hero-image" src="/demos/lumen/lumen-clinic-hero.webp" alt="Dentist speaking calmly with a patient in a modern dental studio" fill priority unoptimized sizes="100vw" />
      <div className="hero-wash" />
      <div className="hero-copy" data-reveal><p className="eyebrow"><span />{t.eyebrow}</p><h1>{t.hero}</h1><p className="hero-intro">{t.intro}</p><div className="hero-actions"><a className="button primary" href="#visit">{t.book}<span>↗</span></a><a className="button quiet" href="#treatments">{t.explore}<span>↓</span></a></div></div>
      <div className="hero-meta"><span>Av. La Paz 438<br/>Miraflores, Lima</span><span>{t.hours}</span><span>01 / 06</span></div>
    </section>

    <section id="studio" className="welcome section">
      <div className="section-index">01 <span>The studio</span></div>
      <div className="welcome-grid"><h2 data-reveal>{t.welcome}</h2><div data-reveal><p>{t.welcomeText}</p><div className="stats"><span><strong>12+</strong>Years of care</span><span><strong>4.9</strong>Patient rating</span><span><strong>1:1</strong>Personal attention</span></div></div></div>
      <div className="studio-visuals">
        <figure className="studio-main" data-reveal><Image src="/demos/lumen/lumen-treatment-room.webp" alt="Warm, modern LUMEN dental treatment room" fill sizes="(max-width: 800px) 100vw, 68vw" /><figcaption><span>01</span>{t.suiteCaption}</figcaption></figure>
        <div className="studio-side" data-reveal><p>{t.studioNote}</p><figure><Image src="/demos/lumen/lumen-technology.webp" alt="Digital dental planning tools and clear aligner" fill sizes="(max-width: 800px) 52vw, 22vw" /></figure><span>{t.detailCaption}</span></div>
      </div>
    </section>

    <section id="treatments" className="treatments section">
      <div className="section-index light">02 <span>Treatments</span></div>
      <div className="treatment-heading"><h2 data-reveal>{t.treatmentsTitle}</h2><p data-reveal>{language === "en" ? "Thoughtful treatment plans, explained clearly and shaped around long-term health." : "Planes de tratamiento claros, personalizados y pensados para tu salud a largo plazo."}</p></div>
      <div className="treatment-list">{t.treatments.map(([number, title, text]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p><b>↗</b></article>)}</div>
    </section>

    <section id="team" className="philosophy section">
      <div className="philosophy-image" data-reveal><Image src="/demos/lumen/lumen-consultation.webp" alt="LUMEN dentist calmly explaining a treatment plan" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
      <div className="philosophy-copy" data-reveal><div className="section-index">03 <span>Our philosophy</span></div><blockquote>“{t.philosophy}”</blockquote><p>{t.philosophyText}</p><a href="#visit">Meet your care team <span>↗</span></a></div>
    </section>

    <section className="precision section">
      <div className="precision-copy" data-reveal><div className="section-index">04 <span>{t.precisionKicker}</span></div><h2>{t.precisionTitle}</h2><p>{t.precisionText}</p><ul><li>Digital scanning</li><li>Clear visual planning</li><li>Conservative approach</li></ul></div>
      <figure className="precision-image" data-reveal><Image src="/demos/lumen/lumen-technology.webp" alt="Clear aligner and digital dental planning technology" fill sizes="(max-width: 800px) 100vw, 40vw" /><figcaption>Precision / 01</figcaption></figure>
    </section>

    <section id="experience" className="experience section">
      <div className="section-index">05 <span>The experience</span></div><div className="experience-heading"><h2 data-reveal>{t.stepsTitle}</h2><p data-reveal>{language === "en" ? "From the first conversation to your follow-up, every step has a clear purpose." : "Desde la primera conversación hasta el seguimiento, cada etapa tiene un propósito claro."}</p></div>
      <figure className="experience-photo" data-reveal><Image src="/demos/lumen/lumen-treatment-room.webp" alt="Calm and naturally lit LUMEN dental studio" fill sizes="100vw" /><figcaption><span>LUMEN / SPACE 01</span><span>CALM BY DESIGN</span></figcaption></figure>
      <div className="steps">{t.steps.map(([number, title, text]) => <article key={number} data-reveal><span>{number}</span><div className="step-orbit"><i /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section className="testimonial section"><div className="section-index light">06 <span>Patient notes</span></div><div data-reveal><span className="quote-mark">“</span><blockquote>{t.quote}</blockquote><p>— Camila R. · Miraflores</p></div></section>

    <section id="visit" className="visit section">
      <div className="visit-copy"><div className="section-index">07 <span>Visit LUMEN</span></div><h2 data-reveal>{t.visitTitle}</h2><p data-reveal>{t.visitText}</p><div className="visit-details"><span>Av. La Paz 438<br/>Miraflores, Lima</span><span>{t.hours}</span><a href="tel:+51999000000">+51 999 000 000</a></div></div>
      <form onSubmit={submit} className="appointment" data-reveal>{sent ? <div className="success"><span>✓</span><h3>{t.success}</h3><button type="button" onClick={() => setSent(false)}>New request</button></div> : <><label>{t.fields[0]}<input required name="name" autoComplete="name" /></label><label>{t.fields[1]}<input required name="phone" inputMode="tel" autoComplete="tel" /></label><label>{t.fields[2]}<input required type="email" name="email" autoComplete="email" /></label><label>{t.fields[3]}<select required defaultValue=""><option value="" disabled>{language === "en" ? "Select a treatment" : "Selecciona un tratamiento"}</option>{t.treatments.map(([, title]) => <option key={title}>{title}</option>)}</select></label><label className="full">{language === "en" ? "Preferred date" : "Fecha preferida"}<input required type="date" name="date" /></label><button className="button primary full" type="submit">{t.submit}<span>↗</span></button></>}</form>
    </section>

    <footer className="footer"><div className="footer-brand"><strong>LUMEN</strong><span>Dental Studio</span></div><p>{t.concept}</p><div><a href="https://ahpixel-studio.vercel.app" target="_blank" rel="noopener noreferrer">Website concept by AHPixel Studio ↗</a><span>© 2026 LUMEN Dental Studio</span></div></footer>
  </main>;
}
