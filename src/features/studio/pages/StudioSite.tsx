"use client";

import { useEffect, useRef, useState } from "react";
import StudioContact from "@/features/studio/components/contact/StudioContact";
import BuildSystemCanvas, { type BuildSystemCanvasHandle } from "@/features/studio/components/canvas/BuildSystemCanvas";
import StudioFooter from "@/features/studio/components/layout/StudioFooter";

type Language = "es" | "en";
type Theme = "light" | "dark";

const content = {
  es: {
    nav: ["Servicios", "Diseños", "Soluciones", "Proceso", "Nosotros", "Contacto"], quote: "Cotizar proyecto", eyebrow: "DISEÑO Y DESARROLLO WEB · LIMA, PERÚ",
    heroA: "Haz que tu presencia", heroEm: "destaque", heroB: "desde el primer clic.",
    lead: "Diseñamos sitios claros, rápidos y preparados para convertir visitas en consultas reales.",
    primary: "Cotizar mi web", secondary: "Ver diseños", visual: "Diseño conceptual · responsive",
    trust: ["Diseño personalizado", "Responsive", "Alto rendimiento", "SEO técnico", "Desarrollo escalable", "Soporte"],
    servicesEyebrow: "TIPOS DE WEB", servicesTitle: "Una web para cada objetivo.", servicesLead: "Landing pages, sitios empresariales, webs profesionales y rediseños. Elige según lo que quieres conseguir.",
    services: [
      ["Landing page", "Una página enfocada en promocionar una oferta, servicio o lanzamiento.", "Lleva al visitante directamente hacia una acción."],
      ["Sitio empresarial", "Una presencia completa para presentar tu empresa, servicios y propuesta.", "Ordena la información y facilita que puedan conocerte y contactarte."],
      ["Web profesional", "Para especialistas que necesitan transmitir experiencia y confianza.", "Presenta tu perfil, servicios y evidencia con claridad."],
      ["Rediseño web", "Actualizamos una web que ya no representa lo que hoy es tu negocio.", "Mejora imagen, recorrido, rendimiento y contacto."],
    ],
    serviceDetail: "Qué puede incluir", serviceDetailItems: [["Mensaje y oferta central", "Formulario o WhatsApp", "Medición de conversiones"], ["Inicio, servicios y nosotros", "Casos, preguntas y contacto", "Base lista para crecer"], ["Perfil, experiencia y servicios", "Portafolio o evidencia", "Agenda o contacto directo"], ["Auditoría de la web actual", "Nueva jerarquía y diseño", "Optimización de velocidad"]],
    learn: "Ver detalles", projectsEyebrow: "DISEÑOS DESTACADOS", projectsTitle: "Dos estilos. Dos necesidades. Una misma atención al detalle.", projectsLead: "VANTA y LUMEN son conceptos creados por AHPixel para mostrar cómo el diseño cambia según el negocio.",
    vanta: ["VANTA BARBER CLUB", "Diseño conceptual · Barbería premium", "Una experiencia editorial que convierte precisión, atmósfera y carácter en una reserva clara.", "Dirección visual · Responsive · Reserva"],
    lumen: ["LUMEN DENTAL STUDIO", "Diseño conceptual · Clínica dental", "Una presencia serena que organiza tratamientos, transmite profesionalismo y facilita reservar una consulta.", "Claridad · Confianza · Mobile first"], viewCase: "Ver diseño",
    needsEyebrow: "ELIGE SEGÚN TU OBJETIVO", needsTitle: "¿Qué necesitas conseguir con tu web?", needsLead: "Parte del problema que quieres resolver. Te mostramos qué tipo de web puede encajar mejor y por qué.",
    needs: [["Quiero promocionar una oferta", "Cuando necesitas lanzar un servicio, campaña o propuesta puntual.", "Recomendación: Landing page"], ["Quiero presentar mejor mi empresa", "Cuando deben entender rápidamente quién eres, qué haces y cómo contactarte.", "Recomendación: Sitio empresarial"], ["Quiero generar más confianza", "Cuando tu experiencia y especialidad son la razón principal para elegirte.", "Recomendación: Web profesional"], ["Quiero renovar mi web actual", "Cuando el sitio se ve antiguo, carga lento o dificulta encontrar información.", "Recomendación: Rediseño web"]],
    solutionMore: ["Ideal para campañas, lanzamientos, anuncios o una oferta principal. Concentra el mensaje en una sola acción y evita distracciones.", "Ideal para empresas que necesitan explicar varias líneas de servicio, respaldar su experiencia y abrir un canal comercial claro.", "Ideal para consultores, especialistas y marcas personales cuyo principal activo es su experiencia, trayectoria o portafolio.", "Ideal cuando la web actual todavía tiene contenido útil, pero su imagen, velocidad o recorrido ya frenan al negocio."],
    fit: "Por qué encaja", contactSolution: "Conversar sobre esta solución",
    ecosystemEyebrow: "ECOSISTEMA AHPIXEL", ecosystemTitle: "Ideas convertidas en productos digitales completos.", ecosystemLead: "VANTA y LUMEN son conceptos propios creados para demostrar cómo una estrategia cambia según el negocio.", solutionCta: "Ver solución",
    whyEyebrow: "SOBRE AHPIXEL", whyTitle: "Diseñamos la web que tu negocio necesita mostrar hoy.", whyLead: "Combinamos comunicación, diseño y desarrollo para que cada página sea clara, responsive y fácil de usar. Sin cifras inventadas ni procesos innecesariamente complicados.",
    why: [["Dirección estratégica", "Definimos audiencia, mensaje y acción antes de diseñar pantallas."], ["Diseño personalizado", "Cada sistema visual responde al carácter real del negocio."], ["Enfoque comercial", "La jerarquía y el recorrido acercan al usuario a una decisión."], ["Desarrollo escalable", "Código limpio, responsive y preparado para crecer sin rehacerlo todo."], ["Rendimiento cuidado", "Imágenes, interacción y estructura optimizadas para cargar rápido."], ["Acompañamiento claro", "Decisiones explicadas, revisiones ordenadas y soporte después del lanzamiento."]],
    processEyebrow: "CÓMO TRABAJAMOS", processTitle: "Un proceso claro, de la conversación a la publicación.", process: ["Conversamos", "Definimos", "Diseñamos", "Desarrollamos", "Revisamos", "Publicamos", "Acompañamos"],
    processText: ["Conocemos tu negocio, público y objetivo.", "Ordenamos el contenido, las páginas y las acciones importantes.", "Creamos la dirección visual y la experiencia responsive.", "Convertimos el diseño en una web rápida y funcional.", "Probamos contenido, formularios, pantallas y detalles.", "Conectamos dominio, analítica y dejamos la web en línea.", "Te ayudamos con ajustes, mejoras y nuevas necesidades."],
    resultsEyebrow: "RESULTADOS QUE IMPORTAN", resultsTitle: "Una web debe verse bien. También debe hacer bien su trabajo.", results: [["Claridad", "La propuesta se entiende más rápido."], ["Confianza", "La marca se percibe seria y preparada."], ["Conversión", "Las acciones importantes son visibles y simples."], ["Escala", "La base puede crecer con el negocio."]],
    techEyebrow: "DESARROLLO Y RENDIMIENTO", techTitle: "Una base técnica preparada para funcionar y crecer.", faqEyebrow: "PREGUNTAS FRECUENTES", faqTitle: "Antes de cotizar, esto suele ser lo más importante.",
    faqs: [["¿Cuánto cuesta una web?", "Depende del alcance, cantidad de páginas, funciones y contenido. Después de una conversación breve te proponemos una solución y un presupuesto claros."], ["¿Cuánto tiempo demora?", "Una landing suele tomar menos tiempo que una web empresarial o plataforma. Definimos un cronograma realista antes de comenzar."], ["¿Incluyen dominio y hosting?", "Podemos ayudarte a elegir, configurar y conectar ambos. Los servicios quedan a nombre del cliente."], ["¿Puedo editar mi sitio?", "Sí. Cuando el proyecto lo necesita, dejamos una administración clara para actualizar contenido sin tocar código."], ["¿La web será mía?", "Sí. Al finalizar y completar el proyecto recibes el sitio y sus accesos correspondientes."], ["¿Hacen mantenimiento?", "Sí. Podemos acompañar actualizaciones, mejoras, monitoreo y nuevas funciones."], ["¿Trabajan con negocios de otros países?", "Sí. Trabajamos de forma remota desde Lima con empresas y profesionales de cualquier país."], ["¿Pueden rediseñar una web existente?", "Sí. Auditamos lo que funciona, detectamos fricción y reconstruimos la experiencia sin perder valor útil."]],
    finalEyebrow: "TU PRÓXIMA WEB PUEDE EMPEZAR AQUÍ", finalTitle: "Cuéntanos qué quieres conseguir.", finalLead: "Te recomendamos el tipo de web adecuado y preparamos una propuesta clara para tu proyecto.", finalButton: "Cotizar mi web",
    aboutGallery: ["Estrategia antes de diseñar", "Dirección visual con intención", "Experiencias pensadas para cada pantalla"],
  },
  en: {
    nav: ["Services", "Designs", "Solutions", "Process", "About", "Contact"], quote: "Request a quote", eyebrow: "WEB DESIGN + DEVELOPMENT · LIMA, PERU",
    heroA: "Make your presence", heroEm: "stand out", heroB: "from the very first click.", lead: "We design clear, fast websites built to turn visits into real inquiries.", primary: "Quote my website", secondary: "View designs", visual: "Concept design · responsive",
    trust: ["Custom design", "Responsive", "High performance", "Technical SEO", "Scalable development", "Support"],
    servicesEyebrow: "WEBSITE TYPES", servicesTitle: "A website for every goal.", servicesLead: "Landing pages, business websites, professional websites and redesigns. Choose based on what you want to achieve.",
    services: [["Landing page", "A focused page for promoting one offer, service or launch.", "Move visitors directly toward one action."], ["Business website", "A complete presence for your company, services and value proposition.", "Organize information and make it easier to know and contact you."], ["Professional website", "For specialists who need to communicate expertise and trust.", "Present your profile, services and proof clearly."], ["Website redesign", "We update a website that no longer represents the business you are today.", "Improve image, flow, performance and contact."]],
    serviceDetail: "What it can include", serviceDetailItems: [["Core message and offer", "Form or WhatsApp", "Conversion tracking"], ["Home, services and about", "Cases, questions and contact", "A foundation ready to grow"], ["Profile, expertise and services", "Portfolio or proof", "Booking or direct contact"], ["Current website audit", "New hierarchy and design", "Speed optimization"]],
    learn: "View details", projectsEyebrow: "FEATURED DESIGNS", projectsTitle: "Two styles. Two needs. The same attention to detail.", projectsLead: "VANTA and LUMEN are AHPixel concepts showing how design changes for each kind of business.",
    vanta: ["VANTA BARBER CLUB", "Concept design · Premium barbershop", "An editorial experience that turns precision, atmosphere and character into a clear booking path.", "Art direction · Responsive · Booking"], lumen: ["LUMEN DENTAL STUDIO", "Concept design · Dental clinic", "A calm presence that organizes treatments, communicates expertise and makes consultations easier to book.", "Clarity · Trust · Mobile first"], viewCase: "View design",
    needsEyebrow: "CHOOSE BY GOAL", needsTitle: "What should your website help you achieve?", needsLead: "Start with the problem you want to solve. We show you which website type may fit and why.",
    needs: [["I want to promote an offer", "When you need to launch one service, campaign or specific proposal.", "Recommendation: Landing page"], ["I want to present my company better", "When people must quickly understand who you are, what you do and how to contact you.", "Recommendation: Business website"], ["I want to build more trust", "When your expertise and specialty are the main reason to choose you.", "Recommendation: Professional website"], ["I want to renew my current website", "When it looks dated, loads slowly or makes information hard to find.", "Recommendation: Website redesign"]],
    solutionMore: ["Ideal for campaigns, launches, ads or one primary offer. It focuses the message on a single action and removes distractions.", "Ideal for companies that need to explain several service lines, support their experience and open a clear commercial channel.", "Ideal for consultants, specialists and personal brands whose main asset is their expertise, track record or portfolio.", "Ideal when the current website still has useful content, but its image, speed or journey is holding the business back."],
    fit: "Why it fits", contactSolution: "Discuss this solution",
    ecosystemEyebrow: "AHPIXEL ECOSYSTEM", ecosystemTitle: "Ideas turned into complete digital products.", ecosystemLead: "VANTA and LUMEN are original concepts showing how strategy changes with each business.", solutionCta: "View solution",
    whyEyebrow: "ABOUT AHPIXEL", whyTitle: "We design the website your business needs to present today.", whyLead: "We combine communication, design and development so every page is clear, responsive and easy to use. No invented metrics and no unnecessarily complicated process.",
    why: [["Strategic direction", "We define audience, message and action before designing screens."], ["Custom design", "Every visual system responds to the business's real character."], ["Commercial focus", "Hierarchy and flow move users toward a decision."], ["Scalable development", "Clean, responsive code ready to grow without rebuilding everything."], ["Careful performance", "Images, interaction and structure are optimized for fast loading."], ["Clear collaboration", "Explained decisions, organized reviews and support after launch."]],
    processEyebrow: "HOW WE WORK", processTitle: "A clear process, from conversation to publication.", process: ["Talk", "Define", "Design", "Develop", "Review", "Publish", "Support"], processText: ["We learn about your business, audience and goal.", "We organize content, pages and important actions.", "We create the visual direction and responsive experience.", "We turn the design into a fast, functional website.", "We test content, forms, screens and details.", "We connect the domain and analytics, then put the website online.", "We help with adjustments, improvements and new needs."],
    resultsEyebrow: "RESULTS THAT MATTER", resultsTitle: "A website should look good. It should also do its job well.", results: [["Clarity", "The offer is understood faster."], ["Trust", "The brand feels serious and prepared."], ["Conversion", "Important actions are visible and simple."], ["Scale", "The foundation can grow with the business."]],
    techEyebrow: "DEVELOPMENT AND PERFORMANCE", techTitle: "A technical foundation ready to work and grow.", faqEyebrow: "FREQUENTLY ASKED QUESTIONS", faqTitle: "Before requesting a quote, these are the common questions.",
    faqs: [["How much does a website cost?", "It depends on scope, pages, features and content. After a short conversation, we provide a clear solution and budget."], ["How long does it take?", "A landing page usually takes less time than a business website or platform. We set a realistic timeline before we begin."], ["Do you include domain and hosting?", "We can help choose, configure and connect both. The services remain in the client's name."], ["Can I edit my website?", "Yes. When needed, we provide a clear content management experience without touching code."], ["Will I own the website?", "Yes. Once the project is complete, you receive the website and its corresponding access."], ["Do you provide maintenance?", "Yes. We can support updates, improvements, monitoring and new features."], ["Do you work internationally?", "Yes. We work remotely from Lima with businesses and professionals worldwide."], ["Can you redesign an existing website?", "Yes. We audit what works, identify friction and rebuild the experience without losing useful value."]],
    finalEyebrow: "YOUR NEXT WEBSITE CAN START HERE", finalTitle: "Tell us what you want to achieve.", finalLead: "We recommend the right website type and prepare a clear proposal for your project.", finalButton: "Quote my website",
    aboutGallery: ["Strategy before design", "Purposeful visual direction", "Experiences made for every screen"],
  },
};

const serviceMedia = [
  { key: "landing-page", esMax: 1568, esHeight: 1003, enMax: 1536, enHeight: 1024, esAlt: "Ejemplo en español de una landing page para gimnasio", enAlt: "Landing page concept for a fitness studio" },
  { key: "business-website", esMax: 1568, esHeight: 1003, enMax: 1536, enHeight: 1024, esAlt: "Ejemplo en español de un sitio empresarial de arquitectura", enAlt: "Business website concept for an architecture studio" },
  { key: "professional-website", esMax: 1672, esHeight: 941, enMax: 1536, enHeight: 1024, esAlt: "Ejemplo en español de una web profesional", enAlt: "Professional website concept" },
  { key: "website-redesign", esMax: 1672, esHeight: 941, enMax: 1536, enHeight: 1024, esAlt: "Ejemplo en español de un rediseño web antes y después", enAlt: "Before and after website redesign concept" },
];

const pagePaths = ["/services", "/projects", "/solutions", "/process", "/about", "/contact"];

export default function StudioSite({ path = "/" }: { path?: string }) {
  const [language, setLanguageState] = useState<Language>(() => window.localStorage.getItem("ahpixel-language") === "en" ? "en" : "es");
  const [theme, setTheme] = useState<Theme>(() => (window.localStorage.getItem("ahpixel-theme") as Theme | null) || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const t = content[language];
  const currentPage = pagePaths.includes(path) ? path : "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setMenuOpen(false);
  }, [currentPage]);

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => { const current = window.scrollY; setHeaderHidden(current > previous + 8 && current > 140 && !menuOpen); previous = current; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("ahpixel-language", next);
    window.dispatchEvent(new CustomEvent("ahpixel-language-change", { detail: next }));
  };
  const switchTheme = () => { const next = theme === "light" ? "dark" : "light"; setTheme(next); window.localStorage.setItem("ahpixel-theme", next); };

  return <main className="commercial-site" data-theme={theme} id="top">
    <header className={`commercial-nav${headerHidden ? " is-hidden" : ""}${menuOpen ? " is-open" : ""}`}>
      <a className="commercial-brand" href="/" aria-label="AHPixel Studio"><img src="/ahpixel-logo.webp" alt="" width="50" height="50" /><span><b>AHPixel</b><small>STUDIO</small></span></a>
      <nav aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>{t.nav.map((item, index) => <a className={currentPage === pagePaths[index] ? "active" : ""} key={item} href={pagePaths[index]} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
      <div className="commercial-actions"><div className="commercial-language"><button className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button><span>/</span><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div><button className="theme-toggle" onClick={switchTheme} aria-label={theme === "light" ? "Activar modo oscuro" : "Activate light mode"}><span /></button><a className="nav-cta" href="/contact">{t.quote}<b>↗</b></a><button className="commercial-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Menú"><i /><i /></button></div>
    </header>
    <div className="commercial-page" key={currentPage}>
      {currentPage === "/" && <HomePage t={t} language={language} />}
      {currentPage === "/services" && <ServicesPage t={t} language={language} />}
      {currentPage === "/projects" && <ProjectsPage t={t} language={language} />}
      {currentPage === "/solutions" && <SolutionsPage t={t} />}
      {currentPage === "/process" && <ProcessPage t={t} language={language} />}
      {currentPage === "/about" && <AboutPage t={t} />}
      {currentPage === "/contact" && <StudioContact language={language} />}
      {currentPage !== "/contact" && <PageCta t={t} />}
    </div>
    <StudioFooter language={language} />
  </main>;
}

type PageContent = typeof content.es;

function HomePage({ t, language }: { t: PageContent; language: Language }) { return <>
  <section className="commercial-hero"><div className="hero-ambient" aria-hidden="true"><i /><i /><i /></div><div className="hero-copy"><p className="section-kicker">{t.eyebrow}</p><h1><span className="hero-line-main">{t.heroA}</span><em>{t.heroEm}</em><span className="hero-line-tail">{t.heroB}</span></h1><p className="hero-lead">{t.lead}</p><div className="hero-actions"><a className="button-primary" href="/contact">{t.primary}<span>↗</span></a><a className="button-secondary" href="/projects">{t.secondary}<span>↗</span></a></div></div><div className="hero-product" aria-label={t.visual}><div className="product-glow" /><figure className="product-desktop"><span className="browser-bar"><i /><i /><i /><b>VANTA / DESKTOP</b></span><picture><source type="image/webp" srcSet="/responsive/designs/vanta-640.webp 640w, /responsive/designs/vanta-857.webp 857w" sizes="(max-width: 720px) 82vw, 55vw" /><img src="/responsive/designs/vanta-857.webp" alt={language === "es" ? "Diseño Vanta para barbería visto en escritorio" : "Vanta barbershop design on desktop"} width="857" height="397" fetchPriority="high" /></picture></figure><figure className="product-mobile"><img src="/responsive/designs/vanta-detail-mobile-375.webp" alt={language === "es" ? "Diseño Vanta adaptado a móvil" : "Vanta design adapted to mobile"} width="380" height="844" /></figure><span className="product-caption"><i /> {t.visual}</span></div></section>
  <section className="trust-rail">{t.trust.map((item) => <span key={item}>{item}</span>)}</section>
  <section className="commercial-section services-section"><SectionHeading eyebrow={t.servicesEyebrow} title={t.servicesTitle} lead={t.servicesLead} /><div className="service-grid">{t.services.map((service, index) => <ServiceCard key={service[0]} service={service} index={index} t={t} language={language} />)}</div></section>
  <section className="commercial-section projects-section"><SectionHeading eyebrow={t.projectsEyebrow} title={t.projectsTitle} lead={t.projectsLead} /><div className="project-stack"><ProjectCard data={t.vanta} kind="vanta" variant="home" cta={t.viewCase} href="/demos/vanta" language={language} /><ProjectCard data={t.lumen} kind="lumen" variant="home" cta={t.viewCase} href="/demos/lumen" language={language} reverse /></div><SectionLink href="/projects" label={t.nav[1]} /></section>
</>; }

function ServicesPage({ t, language }: { t: PageContent; language: Language }) { return <>
  <PageIntro eyebrow={t.servicesEyebrow} title={t.servicesTitle} lead={t.servicesLead} cta={t.quote} />
  <section className="commercial-section services-section"><div className="service-grid">{t.services.map((service, index) => <ServiceCard key={service[0]} service={service} index={index} t={t} language={language} />)}</div></section>
</>; }

function ProjectsPage({ t, language }: { t: PageContent; language: Language }) { return <>
  <PageIntro eyebrow={t.projectsEyebrow} title={t.projectsTitle} lead={t.projectsLead} cta={t.quote} />
  <section className="commercial-section projects-section"><div className="project-stack"><ProjectCard data={t.vanta} kind="vanta" variant="detail" cta={t.viewCase} href="/demos/vanta" language={language} /><ProjectCard data={t.lumen} kind="lumen" variant="detail" cta={t.viewCase} href="/demos/lumen" language={language} reverse /></div></section>
  <section className="commercial-section ecosystem-section"><SectionHeading eyebrow={t.ecosystemEyebrow} title={t.ecosystemTitle} lead={t.ecosystemLead} /><div className="ecosystem-grid"><EcosystemCard name="VANTA" type="BARBER CLUB" image="/demos/vanta/studio.webp" description={t.vanta[2]} cta={t.solutionCta} href="/demos/vanta" /><EcosystemCard name="LUMEN" type="DENTAL STUDIO" image="/demos/lumen/lumen-technology.webp" description={t.lumen[2]} cta={t.solutionCta} href="/demos/lumen" /></div></section>
</>; }

function SolutionsPage({ t }: { t: PageContent }) { return <>
  <PageIntro eyebrow={t.needsEyebrow} title={t.needsTitle} lead={t.needsLead} cta={t.quote} />
  <section className="commercial-section solutions-flow"><SolutionMatrix t={t} /></section>
  <section className="commercial-section results-section"><SectionHeading eyebrow={t.resultsEyebrow} title={t.resultsTitle} /><div className="results-grid">{t.results.map((item) => <article key={item[0]}><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></section>
  <TechSection t={t} />
</>; }

function ProcessPage({ t, language }: { t: PageContent; language: Language }) { return <>
  <PageIntro eyebrow={t.processEyebrow} title={t.processTitle} cta={t.quote} />
  <section className="commercial-section process-section"><ProcessOrbital steps={t.process} descriptions={t.processText} language={language} /><ol className="process-list">{t.process.map((item, index) => <li key={item}><div><h3>{item}</h3><p>{t.processText[index]}</p></div></li>)}</ol></section>
</>; }

function AboutPage({ t }: { t: PageContent }) { return <>
  <PageIntro eyebrow={t.whyEyebrow} title={t.whyTitle} lead={t.whyLead} cta={t.quote} />
  <section className="commercial-section about-story"><div className="about-gallery"><figure><img src="/demos/vanta/craft.webp" alt={t.aboutGallery[0]} width="900" height="1100" loading="lazy" /><figcaption>{t.aboutGallery[0]}</figcaption></figure><figure><img src="/demos/lumen/lumen-technology.webp" alt={t.aboutGallery[1]} width="1200" height="800" loading="lazy" /><figcaption>{t.aboutGallery[1]}</figcaption></figure><figure><img src="/responsive/designs/vanta-detail-mobile-375.webp" alt={t.aboutGallery[2]} width="380" height="844" loading="lazy" /><figcaption>{t.aboutGallery[2]}</figcaption></figure></div></section>
  <section className="commercial-section why-section"><div className="why-grid">{t.why.map((item) => <article key={item[0]}><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></section>
  <TechSection t={t} />
  <section className="commercial-section faq-section"><SectionHeading eyebrow={t.faqEyebrow} title={t.faqTitle} /><FaqList items={t.faqs} /></section>
</>; }

function PageIntro({ eyebrow, title, lead, cta }: { eyebrow: string; title: string; lead?: string; cta: string }) { return <section className="page-intro"><div className="hero-ambient" aria-hidden="true"><i /><i /><i /></div><p className="section-kicker">{eyebrow}</p><h1>{title}</h1>{lead && <p>{lead}</p>}<a className="button-primary" href="/contact">{cta}<span>↗</span></a></section>; }
function PageCta({ t }: { t: PageContent }) { return <section className="final-cta"><div className="final-orbit" aria-hidden="true"><i /><i /><i /></div><p className="section-kicker">{t.finalEyebrow}</p><h2>{t.finalTitle}</h2><p>{t.finalLead}</p><a className="button-primary" href="/contact">{t.finalButton}<span>↗</span></a></section>; }
function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) { return <header className="commercial-heading"><p className="section-kicker">{eyebrow}</p><h2>{title}</h2>{lead && <p>{lead}</p>}</header>; }
function SectionLink({ href, label }: { href: string; label: string }) { return <a className="section-link" href={href}>{label}<span>↗</span></a>; }
function ServicePicture({ index, language }: { index: number; language: Language }) {
  const media = serviceMedia[index];
  const suffix = language === "es" ? "es" : "en";
  const max = language === "es" ? media.esMax : media.enMax;
  const height = language === "es" ? media.esHeight : media.enHeight;
  const alt = language === "es" ? media.esAlt : media.enAlt;
  const base = `/responsive/solutions/${media.key}-${suffix}`;
  return <picture className="service-picture">
    <source type="image/webp" srcSet={`${base}-640.webp 640w, ${base}-1080.webp 1080w, ${base}-${max}.webp ${max}w`} sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 25vw" />
    <img src={`${base}-1080.webp`} alt={alt} width={max} height={height} loading="lazy" decoding="async" />
  </picture>;
}

function ServiceCard({ service, index, t, language }: { service: string[]; index: number; t: PageContent; language: Language }) {
  return <article className="service-card">
    <ServicePicture index={index} language={language} />
    <div className="service-card-copy"><h3>{service[0]}</h3><p>{service[1]}</p><strong>{service[2]}</strong>
      <details><summary>{t.learn}<span>+</span></summary><div><b>{t.serviceDetail}</b><ul>{t.serviceDetailItems[index].map((item) => <li key={item}>{item}</li>)}</ul><a href="/contact">{t.finalButton}<span>↗</span></a></div></details>
    </div>
  </article>;
}

function SolutionMatrix({ t }: { t: PageContent }) {
  return <div className="solution-matrix">{t.needs.map((item, index) => <article key={item[0]}>
    <span className="solution-signal" aria-hidden="true"><i /></span><div className="solution-question"><small>{t.needsEyebrow}</small><h3>{item[0]}</h3><p>{item[1]}</p><strong>{item[2]}</strong></div>
    <div className="solution-answer"><small>{t.fit}</small><h4>{t.services[index][0]}</h4><p>{t.solutionMore[index]}</p><ul>{t.serviceDetailItems[index].map((point) => <li key={point}>{point}</li>)}</ul><a href="/contact">{t.contactSolution}<b>↗</b></a></div>
  </article>)}</div>;
}

function FaqList({ items }: { items: string[][] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="faq-list">{items.map((item, index) => <article className={open === index ? "is-open" : ""} key={item[0]}>
    <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span>{item[0]}</span><b aria-hidden="true">+</b></button>
    <div className="faq-answer"><div><p>{item[1]}</p></div></div>
  </article>)}</div>;
}
function TechSection({ t }: { t: PageContent }) { return <section className="tech-section"><div><p className="section-kicker">{t.techEyebrow}</p><h2>{t.techTitle}</h2></div><div className="tech-list"><span>React</span><span>TypeScript</span><span>Vite</span><span>Cloudflare</span><span>SEO</span><span>Analytics</span></div></section>; }
function ProjectCard({ data, kind, variant, cta, href, language, reverse = false }: { data: string[]; kind: "vanta" | "lumen"; variant: "home" | "detail"; cta: string; href: string; language: Language; reverse?: boolean }) {
  const isVanta = kind === "vanta";
  const mainImage = isVanta
    ? variant === "home" ? "/responsive/designs/vanta-image.png" : "/responsive/designs/vanta-process-1080.webp"
    : variant === "home" ? "/responsive/designs/lumen-consultation-1080.webp" : "/responsive/designs/lumen-treatment-1080.webp";
  const mobileImage = isVanta
    ? variant === "home" ? "/responsive/designs/vanta-detail-mobile-375.webp" : "/responsive/designs/vanta-detail-mobile-375.webp"
    : variant === "home" ? "/demos/lumen/lumen-treatment-room.webp" : "/demos/lumen/lumen-clinic-hero.webp";
  const mainHeight = isVanta ? variant === "home" ? 761 : 596 : 720;
  const mobileSize = isVanta
    ? variant === "home" ? { width: 380, height: 844 } : { width: 375, height: 750 }
    : variant === "home" ? { width: 1800, height: 1200 } : { width: 1536, height: 1024 };
  return <article className={`project-card${reverse ? " reverse" : ""}`}><div className="project-visual">
    <picture><source type="image/webp" srcSet={`${mainImage.replace("1080", "640")} 640w, ${mainImage} 1080w`} sizes="(max-width: 720px) 92vw, 65vw" /><img src={mainImage} alt={language === "es" ? `Vista alternativa del diseño ${data[0]}` : `Alternative view of the ${data[0]} design`} width="1080" height={mainHeight} loading="lazy" decoding="async" /></picture>
    <span className="project-device"><img src={mobileImage} alt="" width={mobileSize.width} height={mobileSize.height} loading="lazy" /></span>
  </div><div className="project-copy"><span>{data[1]}</span><h3>{data[0]}</h3><p>{data[2]}</p><small>{data[3]}</small><a href={href}>{cta}<b>↗</b></a></div></article>;
}
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
