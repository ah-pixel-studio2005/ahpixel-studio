"use client";

import { useEffect, useRef, useState } from "react";
import StudioContact from "@/features/studio/components/contact/StudioContact";
import BuildSystemCanvas, { type BuildSystemCanvasHandle } from "@/features/studio/components/canvas/BuildSystemCanvas";

type Language = "es" | "en";
type Theme = "light" | "dark";

const content = {
  es: {
    nav: ["Servicios", "Proyectos", "Soluciones", "Proceso", "Nosotros", "Contacto"], quote: "Cotizar proyecto", eyebrow: "DISEÑO + DESARROLLO WEB · LIMA / GLOBAL",
    heroA: "Sitios web que convierten", heroEm: "claridad", heroB: "en crecimiento.",
    lead: "Diseñamos y desarrollamos experiencias digitales para empresas que necesitan comunicar mejor, generar confianza y convertir visitas en oportunidades reales.",
    primary: "Cotizar proyecto", secondary: "Ver proyectos", visual: "Proyectos reales · diseño adaptable",
    trust: ["Diseño personalizado", "Responsive", "Alto rendimiento", "SEO técnico", "Desarrollo escalable", "Soporte"],
    servicesEyebrow: "SERVICIOS PRINCIPALES", servicesTitle: "La solución web adecuada, sin complicaciones innecesarias.", servicesLead: "Primero entendemos el objetivo. Luego diseñamos el sistema que mejor puede cumplirlo.",
    services: [
      ["Landing Pages", "Una página enfocada en una campaña, servicio o lanzamiento.", "Convierte una oferta clara en una acción concreta."],
      ["Sitios empresariales", "Una presencia digital completa para explicar, posicionar y generar confianza.", "Ordena la información y facilita el contacto comercial."],
      ["Web profesional", "Una presencia de autoridad para especialistas, estudios y marcas personales.", "Convierte experiencia y evidencia en confianza y consultas."],
      ["Rediseño web", "Una reconstrucción estratégica para sitios que ya no representan al negocio.", "Mejora jerarquía, rendimiento y conversión sin perder valor útil."],
    ],
    learn: "Conocer solución", projectsEyebrow: "PROYECTOS DESTACADOS", projectsTitle: "Diseño con un trabajo concreto.", projectsLead: "Cada proyecto nace de una necesidad distinta. La estética acompaña a una estrategia clara.",
    vanta: ["VANTA BARBER CLUB", "Concept website · Barbería premium", "Una experiencia editorial que convierte precisión, atmósfera y carácter en una reserva clara.", "Dirección visual · Responsive · Conversión"],
    lumen: ["LUMEN DENTAL STUDIO", "Concept website · Salud y confianza", "Una presencia serena que organiza servicios, transmite profesionalismo y reduce la fricción al contactar.", "Claridad · Confianza · Mobile first"], viewCase: "Explorar proyecto",
    needsEyebrow: "LA SOLUCIÓN CORRECTA PARA CADA NECESIDAD", needsTitle: "No todas las empresas necesitan la misma web.", needsLead: "Estas son las cuatro situaciones más comunes. Te ayudamos a identificar cuál resuelve mejor tu objetivo actual.",
    needs: [["Landing page", "Cuando necesitas validar, lanzar o promocionar una oferta puntual.", "Campañas · Lanzamientos · Captación"], ["Web empresarial", "Cuando tu negocio necesita explicar bien quién es, qué hace y por qué confiar.", "Servicios · Posicionamiento · Contacto"], ["Web profesional", "Cuando tu experiencia, trayectoria y especialidad deben transmitir autoridad.", "Perfil · Servicios · Confianza"], ["Rediseño web", "Cuando tu sitio actual se quedó atrás o genera fricción.", "Auditoría · Antes y después · Optimización"]],
    ecosystemEyebrow: "ECOSISTEMA AHPIXEL", ecosystemTitle: "Ideas convertidas en productos digitales completos.", ecosystemLead: "VANTA y LUMEN son conceptos propios creados para demostrar cómo una estrategia cambia según el negocio.", solutionCta: "Ver solución",
    whyEyebrow: "POR QUÉ AHPIXEL", whyTitle: "Diseño y desarrollo trabajan juntos desde el inicio.", whyLead: "No entregamos una capa visual aislada. Construimos una experiencia coherente desde el mensaje hasta el rendimiento.",
    why: [["Dirección estratégica", "Definimos audiencia, mensaje y acción antes de diseñar pantallas."], ["Diseño personalizado", "Cada sistema visual responde al carácter real del negocio."], ["Enfoque comercial", "La jerarquía y el recorrido acercan al usuario a una decisión."], ["Desarrollo escalable", "Código limpio, responsive y preparado para crecer sin rehacerlo todo."], ["Rendimiento cuidado", "Imágenes, interacción y estructura optimizadas para cargar rápido."], ["Acompañamiento claro", "Decisiones explicadas, revisiones ordenadas y soporte después del lanzamiento."]],
    processEyebrow: "PROCESO", processTitle: "De la primera conversación al lanzamiento.", process: ["Descubrimiento", "Estrategia", "Diseño", "Desarrollo", "Revisión", "Lanzamiento", "Soporte"],
    processText: ["Entendemos negocio, público y objetivos.", "Ordenamos mensaje, estructura y recorrido.", "Creamos la dirección visual y la interfaz.", "Convertimos el diseño en un producto real.", "Probamos contenido, detalle y comportamiento.", "Publicamos, medimos y dejamos todo listo.", "Acompañamos mejoras, ajustes y evolución."],
    resultsEyebrow: "RESULTADOS QUE IMPORTAN", resultsTitle: "Una web debe verse bien. También debe hacer bien su trabajo.", results: [["Claridad", "La propuesta se entiende más rápido."], ["Confianza", "La marca se percibe seria y preparada."], ["Conversión", "Las acciones importantes son visibles y simples."], ["Escala", "La base puede crecer con el negocio."]],
    techEyebrow: "CAPACIDAD TÉCNICA", techTitle: "Tecnología al servicio de la experiencia.", faqEyebrow: "PREGUNTAS FRECUENTES", faqTitle: "Lo importante, respondido con claridad.",
    faqs: [["¿Cuánto cuesta una web?", "Depende del alcance, cantidad de páginas, funciones y contenido. Después de una conversación breve te proponemos una solución y un presupuesto claros."], ["¿Cuánto tiempo demora?", "Una landing suele tomar menos tiempo que una web empresarial o plataforma. Definimos un cronograma realista antes de comenzar."], ["¿Incluyen dominio y hosting?", "Podemos ayudarte a elegir, configurar y conectar ambos. Los servicios quedan a nombre del cliente."], ["¿Puedo editar mi sitio?", "Sí. Cuando el proyecto lo necesita, dejamos una administración clara para actualizar contenido sin tocar código."], ["¿La web será mía?", "Sí. Al finalizar y completar el proyecto recibes el sitio y sus accesos correspondientes."], ["¿Hacen mantenimiento?", "Sí. Podemos acompañar actualizaciones, mejoras, monitoreo y nuevas funciones."], ["¿Trabajan con negocios de otros países?", "Sí. Trabajamos de forma remota desde Lima con empresas y profesionales de cualquier país."], ["¿Pueden rediseñar una web existente?", "Sí. Auditamos lo que funciona, detectamos fricción y reconstruimos la experiencia sin perder valor útil."]],
    finalEyebrow: "TU PRÓXIMO SITIO PUEDE EMPEZAR AQUÍ", finalTitle: "Cuéntanos qué necesita tu negocio.", finalLead: "Te ayudamos a elegir una solución clara, viable y diseñada para crecer contigo.", finalButton: "Cotizar mi proyecto",
  },
  en: {
    nav: ["Services", "Projects", "Solutions", "Process", "About", "Contact"], quote: "Request a quote", eyebrow: "WEB DESIGN + DEVELOPMENT · LIMA / GLOBAL",
    heroA: "Websites that turn", heroEm: "clarity", heroB: "into growth.", lead: "We design and build digital experiences for companies that need to communicate better, build trust and turn visits into real opportunities.", primary: "Request a quote", secondary: "View projects", visual: "Real projects · responsive design",
    trust: ["Custom design", "Responsive", "High performance", "Technical SEO", "Scalable development", "Support"],
    servicesEyebrow: "CORE SERVICES", servicesTitle: "The right web solution, without unnecessary complexity.", servicesLead: "We understand the goal first. Then we design the system best suited to achieve it.",
    services: [["Landing Pages", "A focused page for a campaign, service or launch.", "Turn one clear offer into a concrete action."], ["Business websites", "A complete digital presence to explain, position and build trust.", "Organize information and enable commercial contact."], ["Professional websites", "An authority-led presence for experts, firms and personal brands.", "Turn expertise and proof into trust and inquiries."], ["Website redesign", "A strategic rebuild for websites that no longer represent the business.", "Improve hierarchy, performance and conversion without losing useful value."]],
    learn: "Explore service", projectsEyebrow: "FEATURED PROJECTS", projectsTitle: "Design with a concrete job.", projectsLead: "Every project begins with a different need. Aesthetics support a clear strategy.",
    vanta: ["VANTA BARBER CLUB", "Concept website · Premium barbershop", "An editorial experience that turns precision, atmosphere and character into a clear booking path.", "Art direction · Responsive · Conversion"], lumen: ["LUMEN DENTAL STUDIO", "Concept website · Health and trust", "A calm presence that organizes services, communicates expertise and removes friction from contact.", "Clarity · Trust · Mobile first"], viewCase: "Explore project",
    needsEyebrow: "THE RIGHT SOLUTION FOR EVERY NEED", needsTitle: "Not every company needs the same website.", needsLead: "These are the four most common scenarios. We help you identify which one best solves your current goal.",
    needs: [["Landing page", "When you need to validate, launch or promote one specific offer.", "Campaigns · Launches · Leads"], ["Business website", "When your company must clearly explain who it is, what it does and why to trust it.", "Services · Positioning · Contact"], ["Professional website", "When your experience, track record and specialty must communicate authority.", "Profile · Services · Trust"], ["Website redesign", "When your current website feels dated or creates friction.", "Audit · Before and after · Optimization"]],
    ecosystemEyebrow: "AHPIXEL ECOSYSTEM", ecosystemTitle: "Ideas turned into complete digital products.", ecosystemLead: "VANTA and LUMEN are original concepts showing how strategy changes with each business.", solutionCta: "View solution",
    whyEyebrow: "WHY AHPIXEL", whyTitle: "Design and development work together from day one.", whyLead: "We do not deliver an isolated visual layer. We build one coherent experience from message to performance.",
    why: [["Strategic direction", "We define audience, message and action before designing screens."], ["Custom design", "Every visual system responds to the business's real character."], ["Commercial focus", "Hierarchy and flow move users toward a decision."], ["Scalable development", "Clean, responsive code ready to grow without rebuilding everything."], ["Careful performance", "Images, interaction and structure are optimized for fast loading."], ["Clear collaboration", "Explained decisions, organized reviews and support after launch."]],
    processEyebrow: "PROCESS", processTitle: "From the first conversation to launch.", process: ["Discovery", "Strategy", "Design", "Development", "Review", "Launch", "Support"], processText: ["We understand the business, audience and goals.", "We organize message, structure and journey.", "We create art direction and interface.", "We turn the design into a real product.", "We test content, detail and behavior.", "We publish, measure and prepare the handoff.", "We support improvements, changes and growth."],
    resultsEyebrow: "RESULTS THAT MATTER", resultsTitle: "A website should look good. It should also do its job well.", results: [["Clarity", "The offer is understood faster."], ["Trust", "The brand feels serious and prepared."], ["Conversion", "Important actions are visible and simple."], ["Scale", "The foundation can grow with the business."]],
    techEyebrow: "TECHNICAL CAPABILITY", techTitle: "Technology serving the experience.", faqEyebrow: "FREQUENTLY ASKED QUESTIONS", faqTitle: "What matters, answered clearly.",
    faqs: [["How much does a website cost?", "It depends on scope, pages, features and content. After a short conversation, we provide a clear solution and budget."], ["How long does it take?", "A landing page usually takes less time than a business website or platform. We set a realistic timeline before we begin."], ["Do you include domain and hosting?", "We can help choose, configure and connect both. The services remain in the client's name."], ["Can I edit my website?", "Yes. When needed, we provide a clear content management experience without touching code."], ["Will I own the website?", "Yes. Once the project is complete, you receive the website and its corresponding access."], ["Do you provide maintenance?", "Yes. We can support updates, improvements, monitoring and new features."], ["Do you work internationally?", "Yes. We work remotely from Lima with businesses and professionals worldwide."], ["Can you redesign an existing website?", "Yes. We audit what works, identify friction and rebuild the experience without losing useful value."]],
    finalEyebrow: "YOUR NEXT WEBSITE CAN START HERE", finalTitle: "Tell us what your business needs.", finalLead: "We help you choose a clear, viable solution designed to grow with you.", finalButton: "Request my quote",
  },
};

const serviceImages = ["/solutions/landing-page-es.png", "/solutions/business-website-es.png", "/solutions/professional-website-es.png", "/solutions/website-redesign-es.png"];

const pagePaths = ["/services", "/projects", "/solutions", "/process", "/about", "/contact"];

export default function StudioSite({ path = "/" }: { path?: string }) {
  const [language, setLanguageState] = useState<Language>(() => (window.localStorage.getItem("ahpixel-language") as Language | null) || "es");
  const [theme, setTheme] = useState<Theme>(() => (window.localStorage.getItem("ahpixel-theme") as Theme | null) || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const t = content[language];
  const currentPage = pagePaths.includes(path) ? path : "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setMenuOpen(false);
  }, [currentPage]);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => { const current = window.scrollY; setHeaderHidden(current > previous + 8 && current > 140 && !menuOpen); previous = current; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const setLanguage = (next: Language) => { setLanguageState(next); window.localStorage.setItem("ahpixel-language", next); };
  const switchTheme = () => { const next = theme === "light" ? "dark" : "light"; setTheme(next); window.localStorage.setItem("ahpixel-theme", next); };

  return <main className="commercial-site" data-theme={theme}>
    <header className={`commercial-nav${headerHidden ? " is-hidden" : ""}${menuOpen ? " is-open" : ""}`}>
      <a className="commercial-brand" href="/" aria-label="AHPixel Studio"><img src="/ahpixel-logo.png" alt="" /><span><b>AHPixel</b><small>STUDIO</small></span></a>
      <nav aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>{t.nav.map((item, index) => <a className={currentPage === pagePaths[index] ? "active" : ""} key={item} href={pagePaths[index]} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
      <div className="commercial-actions"><div className="commercial-language"><button className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button><span>/</span><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div><button className="theme-toggle" onClick={switchTheme} aria-label={theme === "light" ? "Activar modo oscuro" : "Activate light mode"}><span /></button><a className="nav-cta" href="/contact">{t.quote}<b>↗</b></a><button className="commercial-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Menú"><i /><i /></button></div>
    </header>
    <div className="commercial-page" key={currentPage}>
      {currentPage === "/" && <HomePage t={t} />}
      {currentPage === "/services" && <ServicesPage t={t} />}
      {currentPage === "/projects" && <ProjectsPage t={t} />}
      {currentPage === "/solutions" && <SolutionsPage t={t} />}
      {currentPage === "/process" && <ProcessPage t={t} language={language} />}
      {currentPage === "/about" && <AboutPage t={t} />}
      {currentPage === "/contact" && <StudioContact language={language} />}
      {currentPage !== "/contact" && <PageCta t={t} />}
    </div>
  </main>;
}

type PageContent = typeof content.es;

function HomePage({ t }: { t: PageContent }) { return <>
  <section className="commercial-hero" id="top"><div className="hero-ambient" aria-hidden="true"><i /><i /><i /></div><div className="hero-copy"><p className="section-kicker">{t.eyebrow}</p><h1>{t.heroA} <em>{t.heroEm}</em> {t.heroB}</h1><p className="hero-lead">{t.lead}</p><div className="hero-actions"><a className="button-primary" href="/contact">{t.primary}<span>↗</span></a><a className="button-secondary" href="/projects">{t.secondary}<span>↗</span></a></div></div><div className="hero-product" aria-label={t.visual}><div className="product-glow" /><figure className="product-desktop"><span className="browser-bar"><i /><i /><i /><b>VANTA / DESKTOP</b></span><img src="/vanta/desktop-hero-clean.png" alt="Vanta Barber Club en escritorio" /></figure><figure className="product-mobile"><img src="/vanta/mobile-hero-clean.png" alt="Inicio de Vanta Barber Club en móvil" /></figure><span className="product-caption"><i /> {t.visual}</span></div></section>
  <section className="trust-rail">{t.trust.map((item) => <span key={item}>{item}</span>)}</section>
  <section className="commercial-section services-section"><SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} lead={t.servicesLead} /><div className="service-grid">{t.services.map((service) => <ServiceCard key={service[0]} service={service} cta={t.learn} />)}</div></section>
  <section className="commercial-section projects-section"><SectionHeading eyebrow={t.projectsEyebrow} title={t.projectsTitle} lead={t.projectsLead} /><div className="project-stack"><ProjectCard data={t.vanta} image="/vanta/desktop-hero-clean.png" cta={t.viewCase} href="/demos/vanta" /><ProjectCard data={t.lumen} image="/demos/lumen/lumen-clinic-hero.webp" cta={t.viewCase} href="/demos/lumen" reverse /></div><SectionLink href="/projects" label={t.nav[1]} /></section>
</>; }

function ServicesPage({ t }: { t: PageContent }) { return <>
  <PageIntro eyebrow={t.servicesEyebrow} title={t.servicesTitle} lead={t.servicesLead} cta={t.quote} />
  <section className="commercial-section services-section"><div className="service-grid">{t.services.map((service) => <ServiceCard key={service[0]} service={service} cta={t.learn} />)}</div></section>
  <section className="commercial-section needs-section"><SectionHeading eyebrow={t.needsEyebrow} title={t.needsTitle} lead={t.needsLead} /><NeedsGrid t={t} /></section>
</>; }

function ProjectsPage({ t }: { t: PageContent }) { return <>
  <PageIntro eyebrow={t.projectsEyebrow} title={t.projectsTitle} lead={t.projectsLead} cta={t.quote} />
  <section className="commercial-section projects-section"><div className="project-stack"><ProjectCard data={t.vanta} image="/vanta/desktop-hero-clean.png" cta={t.viewCase} href="/demos/vanta" /><ProjectCard data={t.lumen} image="/demos/lumen/lumen-clinic-hero.webp" cta={t.viewCase} href="/demos/lumen" reverse /></div></section>
  <section className="commercial-section ecosystem-section"><SectionHeading eyebrow={t.ecosystemEyebrow} title={t.ecosystemTitle} lead={t.ecosystemLead} /><div className="ecosystem-grid"><EcosystemCard name="VANTA" type="BARBER CLUB" image="/vanta/desktop-hero-clean.png" description={t.vanta[2]} cta={t.solutionCta} href="/demos/vanta" /><EcosystemCard name="LUMEN" type="DENTAL STUDIO" image="/demos/lumen/lumen-clinic-hero.webp" description={t.lumen[2]} cta={t.solutionCta} href="/demos/lumen" /></div></section>
</>; }

function SolutionsPage({ t }: { t: PageContent }) { return <>
  <PageIntro eyebrow={t.needsEyebrow} title={t.needsTitle} lead={t.needsLead} cta={t.quote} />
  <section className="commercial-section needs-section"><NeedsGrid t={t} /></section>
  <section className="commercial-section results-section"><SectionHeading eyebrow={t.resultsEyebrow} title={t.resultsTitle} /><div className="results-grid">{t.results.map((item) => <article key={item[0]}><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></section>
  <TechSection t={t} />
</>; }

function ProcessPage({ t, language }: { t: PageContent; language: Language }) { return <>
  <PageIntro eyebrow={t.processEyebrow} title={t.processTitle} cta={t.quote} />
  <section className="commercial-section process-section"><ProcessOrbital steps={t.process} descriptions={t.processText} language={language} /><ol className="process-list">{t.process.map((item, index) => <li key={item}><div><h3>{item}</h3><p>{t.processText[index]}</p></div></li>)}</ol></section>
</>; }

function AboutPage({ t }: { t: PageContent }) { return <>
  <PageIntro eyebrow={t.whyEyebrow} title={t.whyTitle} lead={t.whyLead} cta={t.quote} />
  <section className="commercial-section why-section"><div className="why-grid">{t.why.map((item) => <article key={item[0]}><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></section>
  <TechSection t={t} />
  <section className="commercial-section faq-section"><SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} /><div className="faq-list">{t.faqs.map((item) => <details key={item[0]}><summary>{item[0]}<b>+</b></summary><p>{item[1]}</p></details>)}</div></section>
</>; }

function PageIntro({ eyebrow, title, lead, cta }: { eyebrow: string; title: string; lead?: string; cta: string }) { return <section className="page-intro"><div className="hero-ambient" aria-hidden="true"><i /><i /><i /></div><p className="section-kicker">{eyebrow}</p><h1>{title}</h1>{lead && <p>{lead}</p>}<a className="button-primary" href="/contact">{cta}<span>↗</span></a></section>; }
function PageCta({ t }: { t: PageContent }) { return <section className="final-cta"><div className="final-orbit" aria-hidden="true"><i /><i /><i /></div><p className="section-kicker">{t.finalEyebrow}</p><h2>{t.finalTitle}</h2><p>{t.finalLead}</p><a className="button-primary" href="/contact">{t.finalButton}<span>↗</span></a></section>; }
function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) { return <header className="commercial-heading"><p className="section-kicker">{eyebrow}</p><h2>{title}</h2>{lead && <p>{lead}</p>}</header>; }
function SectionLink({ href, label }: { href: string; label: string }) { return <a className="section-link" href={href}>{label}<span>↗</span></a>; }
function ServiceCard({ service, cta }: { service: string[]; cta: string }) { return <article className="service-card"><h3>{service[0]}</h3><p>{service[1]}</p><strong>{service[2]}</strong><a href="/contact">{cta}<span>↗</span></a></article>; }
function NeedsGrid({ t }: { t: PageContent }) { return <div className="needs-grid">{t.needs.map((item, index) => <article className="need-card" key={item[0]}><img src={serviceImages[index]} alt={`${item[0]} — ejemplo visual`} loading="lazy" /><div><h3>{item[0]}</h3><p>{item[1]}</p><small>{item[2]}</small><a href="/contact">{t.finalButton}<b>↗</b></a></div></article>)}</div>; }
function TechSection({ t }: { t: PageContent }) { return <section className="tech-section"><div><p className="section-kicker">{t.techEyebrow}</p><h2>{t.techTitle}</h2></div><div className="tech-list"><span>React</span><span>TypeScript</span><span>Vite</span><span>Cloudflare</span><span>SEO</span><span>Analytics</span></div></section>; }
function ProjectCard({ data, image, cta, href, reverse = false }: { data: string[]; image: string; cta: string; href: string; reverse?: boolean }) { return <article className={`project-card${reverse ? " reverse" : ""}`}><div className="project-visual"><img src={image} alt={data[0]} loading="lazy" /></div><div className="project-copy"><span>{data[1]}</span><h3>{data[0]}</h3><p>{data[2]}</p><small>{data[3]}</small><a href={href}>{cta}<b>↗</b></a></div></article>; }
function EcosystemCard({ name, type, image, description, cta, href }: { name: string; type: string; image: string; description: string; cta: string; href: string }) { return <article className="ecosystem-card"><img src={image} alt="" loading="lazy" /><div><span>{type}</span><h3>{name}</h3><p>{description}</p><a href={href}>{cta}<b>↗</b></a></div></article>; }

function ProcessOrbital({ steps, descriptions, language }: { steps: string[]; descriptions: string[]; language: Language }) {
  const [active, setActive] = useState(0);
  const canvasRef = useRef<BuildSystemCanvasHandle>(null);
  const manualStep = useRef<number | null>(null);
  const sceneStops = [0, 0.1, 0.2, 0.5, 0.7, 0.9, 1];
  const legend = language === "es"
    ? [["ESTRATEGIA", "define la dirección"], ["DISEÑO", "da forma a la experiencia"], ["CÓDIGO", "lo hace real"]]
    : [["STRATEGY", "defines direction"], ["DESIGN", "shapes the experience"], ["CODE", "makes it real"]];
  const rails = language === "es" ? ["ESTRATEGIA", "EXPERIENCIA", "PUBLICACIÓN"] : ["STRATEGY", "EXPERIENCE", "LAUNCH"];
  const activeLabel = language === "es" ? "PROCESO ACTIVO" : "ACTIVE PROCESS";

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();
    const segmentDuration = 5200;
    const animate = (now: number) => {
      const manual = manualStep.current;
      if (manual !== null) {
        canvasRef.current?.setProgress(sceneStops[manual]);
      } else {
        const elapsed = now - startedAt;
        const segment = Math.floor(elapsed / segmentDuration) % steps.length;
        const local = (elapsed % segmentDuration) / segmentDuration;
        const next = (segment + 1) % steps.length;
        const transition = Math.max(0, (local - 0.66) / 0.34);
        const eased = transition * transition * (3 - 2 * transition);
        const from = sceneStops[segment];
        const to = sceneStops[next];
        canvasRef.current?.setProgress(from + (to - from) * eased);
        setActive((current) => current === segment ? current : segment);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [steps.length]);

  const selectStep = (index: number) => {
    manualStep.current = index;
    setActive(index);
    canvasRef.current?.setProgress(sceneStops[index]);
    window.setTimeout(() => { manualStep.current = null; }, 5200);
  };

  return <div className="process-orbital" aria-live="polite">
    <div className="process-canvas-wrap" aria-hidden="true"><BuildSystemCanvas ref={canvasRef} /><span className="process-vignette" /></div>
    <div className="orbital-legend" aria-hidden="true">{legend.map(([title, copy], index) => <span key={title}><b>{title}</b>{copy}<i className={`legend-signal signal-${index + 1}`} /></span>)}</div>
    <div className="orbital-copy" key={`${language}-${active}`}><small>{activeLabel}</small><h3>{steps[active]}</h3><p>{descriptions[active]}</p></div>
    <div className="process-rails" aria-hidden="true">{rails.map((rail, index) => <span className={Math.min(2, Math.floor(active / 2.34)) === index ? "active" : ""} key={rail}>{rail}<i /></span>)}</div>
    <div className="orbital-stages" role="tablist" aria-label={language === "es" ? "Etapas del proceso" : "Process stages"}>{steps.map((step, index) => <button key={step} className={active === index ? "active" : ""} onClick={() => selectStep(index)} role="tab" aria-selected={active === index}><span>{step}</span></button>)}</div>
  </div>;
}
