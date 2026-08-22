"use client";

import { useState } from "react";

type Language = "en" | "es";

const websiteTypes = [
  {
    number: "01", slug: "landing",
    en: {
      title: "LANDING PAGE", statement: "ONE OFFER. ONE PATH. ONE CLEAR ACTION.",
      intro: "A focused, high-impact page designed around a single campaign, service or launch. Every section moves the visitor toward one defined conversion.",
      ideal: "Campaigns, product launches, focused services and personal brands.",
      includes: ["Strategy and page structure", "Custom visual direction", "Responsive development", "Contact or conversion flow"],
      goal: "Lead generation", structure: "One focused page", action: "Contact / convert",
    },
    es: {
      title: "PÁGINA DE CAPTACIÓN", statement: "UNA OFERTA. UN CAMINO. UNA ACCIÓN CLARA.",
      intro: "Una página enfocada y de alto impacto, diseñada alrededor de una campaña, servicio o lanzamiento. Cada sección conduce al visitante hacia una conversión definida.",
      ideal: "Campañas, lanzamientos, servicios específicos y marcas personales.",
      includes: ["Estrategia y estructura", "Dirección visual personalizada", "Desarrollo adaptable", "Flujo de contacto o conversión"],
      goal: "Generar prospectos", structure: "Una página enfocada", action: "Contactar / convertir",
    },
  },
  {
    number: "02", slug: "business",
    en: {
      title: "BUSINESS WEBSITE", statement: "A COMPLETE DIGITAL HOME FOR THE BUSINESS.",
      intro: "A credible multi-page website that explains what the company does, why it matters and how a potential customer can take the next step.",
      ideal: "Growing companies, local businesses and service providers.",
      includes: ["Home, About, Services and Contact", "Additional business pages", "Responsive design system", "Clear inquiry pathways"],
      goal: "Credibility", structure: "Multi-page system", action: "Explore services",
    },
    es: {
      title: "WEB EMPRESARIAL", statement: "UN HOGAR DIGITAL COMPLETO PARA EL NEGOCIO.",
      intro: "Una web multipágina creíble que explica qué hace la empresa, por qué importa y cómo un cliente potencial puede dar el siguiente paso.",
      ideal: "Empresas en crecimiento, negocios locales y proveedores de servicios.",
      includes: ["Inicio, Nosotros, Servicios y Contacto", "Páginas adicionales", "Sistema de diseño adaptable", "Rutas claras de consulta"],
      goal: "Credibilidad", structure: "Sistema multipágina", action: "Explorar servicios",
    },
  },
  {
    number: "03", slug: "professional",
    en: {
      title: "PROFESSIONAL WEBSITE", statement: "EXPERTISE, PROOF AND TRUST — PROPERLY PRESENTED.",
      intro: "A refined platform that turns knowledge and experience into confidence. The structure gives expertise room to speak without creating friction.",
      ideal: "Consultants, clinics, lawyers, architects, real estate professionals and personal brands.",
      includes: ["Positioning-focused structure", "Service and profile presentation", "Professional visual identity", "Mobile-first booking or contact"],
      goal: "Trust and booking", structure: "Profile-led system", action: "Book a consultation",
    },
    es: {
      title: "WEB PROFESIONAL", statement: "EXPERIENCIA, PRUEBA Y CONFIANZA — BIEN PRESENTADAS.",
      intro: "Una plataforma refinada que convierte conocimiento y experiencia en confianza. La estructura deja que la especialidad hable sin crear fricción.",
      ideal: "Consultores, clínicas, abogados, arquitectos, profesionales inmobiliarios y marcas personales.",
      includes: ["Estructura enfocada en posicionamiento", "Presentación de perfil y servicios", "Identidad visual profesional", "Reserva o contacto pensado primero para móvil"],
      goal: "Confianza y reservas", structure: "Sistema centrado en perfil", action: "Reservar una consulta",
    },
  },
  {
    number: "04", slug: "redesign",
    en: {
      title: "WEBSITE REDESIGN", statement: "KEEP WHAT WORKS. REBUILD WHAT HOLDS IT BACK.",
      intro: "A strategic rebuild for a website that no longer represents the quality of the business. The result is sharper, faster and easier to navigate.",
      ideal: "Established brands with outdated visuals, structure, usability or performance.",
      includes: ["Visual identity refinement", "Responsive experience", "Navigation and content hierarchy", "Performance improvements"],
      goal: "Modernize", structure: "Before to after", action: "Improve the journey",
    },
    es: {
      title: "REDISEÑO WEB", statement: "CONSERVAR LO QUE FUNCIONA. RECONSTRUIR LO QUE FRENA.",
      intro: "Una reconstrucción estratégica para una web que ya no representa la calidad del negocio. El resultado es más claro, rápido y fácil de navegar.",
      ideal: "Marcas establecidas con diseño, estructura, usabilidad o rendimiento desactualizados.",
      includes: ["Refinamiento de identidad visual", "Experiencia adaptable", "Navegación y jerarquía de contenido", "Mejoras de rendimiento"],
      goal: "Modernizar", structure: "Antes y después", action: "Mejorar el recorrido",
    },
  },
];

export default function WebsiteTypes({ language }: { language: Language }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = websiteTypes[activeIndex];
  const content = active[language];

  return (
    <>
      <section className="types-explorer technical-grid" id="services" aria-labelledby="types-title">
        <header className="types-explorer-header">
          <div>
            <p>{language === "es" ? "LO QUE REALMENTE CONSTRUIMOS" : "WHAT WE ACTUALLY BUILD"}</p>
            <h2 id="types-title">
              {language === "es" ? <>LA WEB CORRECTA<br />PARA EL <em>OBJETIVO CORRECTO.</em></> : <>THE RIGHT WEBSITE<br />FOR THE <em>RIGHT JOB.</em></>}
            </h2>
          </div>
          <p className="types-explorer-note">
            {language === "es"
              ? "El objetivo, la audiencia y la decisión definen la estructura. Selecciona o pasa el cursor sobre cada opción."
              : "The goal, audience and decision define the structure. Select or hover each option to explore it."}
          </p>
        </header>

        <div className="types-console">
          <div className="types-selector" role="tablist" aria-label={language === "es" ? "Tipos de sitio web" : "Website types"}>
            {websiteTypes.map((item, index) => {
              const selected = activeIndex === index;
              return (
                <button
                  type="button"
                  id={`website-type-tab-${item.slug}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="website-type-panel"
                  className={selected ? "is-active" : ""}
                  key={item.slug}
                  onPointerEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{item.number}</span>
                  <strong>{item[language].title}</strong>
                  <i aria-hidden="true">→</i>
                </button>
              );
            })}
          </div>

          <article className="types-live-panel" id="website-type-panel" role="tabpanel" aria-labelledby={`website-type-tab-${active.slug}`} aria-live="polite">
            <div className="type-product-meta">
              <span>{language === "es" ? "SISTEMA ACTIVO" : "ACTIVE SYSTEM"} / {active.number}</span>
              <span>{language === "es" ? "ESCRITORIO / ADAPTABLE" : "DESKTOP / RESPONSIVE"}</span>
            </div>
            <WebsiteTemplate type={active.slug} language={language} />
            <div className="types-live-content">
              <div className="types-live-summary">
                <span>{active.number} / {content.title}</span>
                <strong>{content.statement}</strong>
                <p>{content.intro}</p>
              </div>
              <div className="types-live-details">
                <div className="types-ideal">
                  <small>{language === "es" ? "IDEAL PARA" : "IDEAL FOR"}</small>
                  <p>{content.ideal}</p>
                </div>
                <ul>
                  {content.includes.map((include) => <li key={include}>{include}</li>)}
                </ul>
              </div>
            </div>
            <dl className="type-product-specs">
              <div><dt>{language === "es" ? "OBJETIVO" : "GOAL"}</dt><dd>{content.goal}</dd></div>
              <div><dt>{language === "es" ? "ESTRUCTURA" : "STRUCTURE"}</dt><dd>{content.structure}</dd></div>
              <div><dt>{language === "es" ? "ACCIÓN PRINCIPAL" : "PRIMARY ACTION"}</dt><dd>{content.action}</dd></div>
            </dl>
          </article>
        </div>
      </section>

      <section className="experience-outro technical-grid" id="start" aria-labelledby="outro-title">
        <div className="outro-kicker"><i /> {language === "es" ? "DISPONIBLE PARA PROYECTOS SELECCIONADOS" : "AVAILABLE FOR SELECTED PROJECTS"}</div>
        <h2 id="outro-title">
          {language === "es" ? <>¿QUÉ DEBERÍA<br /><em>LOGRAR</em> TU WEB?</> : <>WHAT SHOULD<br />YOUR WEBSITE <em>DO?</em></>}
        </h2>
        <p>{language === "es" ? "Cuéntanos qué necesita comunicar, mejorar o conseguir el negocio. Definiremos la estructura correcta antes de diseñar la superficie." : "Tell us what the business needs to communicate, improve or achieve. We will define the right structure before designing the surface."}</p>
        <a href={`mailto:ahpixel.studio@gmail.com?subject=${encodeURIComponent(language === "es" ? "Nuevo proyecto web" : "New website project")}`}>{language === "es" ? "INICIAR UN PROYECTO" : "START A PROJECT"} <span>↗</span></a>
        <div className="outro-scope">
          <span>{language === "es" ? "ALCANCE" : "SCOPE"} / 2026</span>
          <p>{language === "es" ? "Enfocados en webs promocionales, empresariales y profesionales de alta calidad. El comercio electrónico llegará después." : "Focused on high-quality marketing, business and professional websites. E-commerce comes later."}</p>
        </div>
        <div className="outro-word" aria-hidden="true">AHPIXEL</div>
      </section>
    </>
  );
}

function WebsiteTemplate({ type, language }: { type: string; language: Language }) {
  const typeLabelEs: Record<string, string> = {
    landing: "CAPTACIÓN",
    business: "EMPRESARIAL",
    professional: "PROFESIONAL",
    redesign: "REDISEÑO",
  };

  return (
    <div className={`website-template template-${type}`} aria-hidden="true">
      <div className="template-browserbar"><i /><i /><i /><span>AHP / {language === "es" ? typeLabelEs[type] : type.toUpperCase()}</span></div>
      <div className="template-page">
        <div className="template-nav"><b /><b /><span /></div>
        <div className="template-hero">
          <div className="template-copy"><small /><strong /><strong /><p /><button /></div>
          <div className="template-visual"><i /><i /><i /></div>
        </div>
        <div className="template-modules"><span /><span /><span /></div>
        <div className="template-proof"><i /><i /><i /><i /></div>
        <div className="template-profile"><i /><span><b /><b /><b /></span></div>
        <div className="template-before"><small>{language === "es" ? "ANTES" : "BEFORE"}</small><span /><span /><span /></div>
        <div className="template-after"><small>{language === "es" ? "DESPUÉS" : "AFTER"}</small><span /><span /><span /></div>
      </div>
      <div className="template-mobile"><span /><b /><b /><i /></div>
    </div>
  );
}
