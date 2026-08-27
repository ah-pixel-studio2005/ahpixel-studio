import type { Metadata } from "next";
import { ContactForm } from "../../components/ContactForm";
import { PageHero, SectionHeader } from "../../components/ui";
import { siteConfig } from "../../data/site";
import { Arrow } from "../../components/SiteShell";

export const metadata: Metadata = {
  title: "Inicia un Proyecto | AHPixel Studio",
  description: "Cuéntale a AHPixel Studio sobre tu proyecto web, tu negocio y tus objetivos.",
  alternates: { canonical: "/es/contact", languages: { "es-PE": "/es/contact", "en-US": "/contact" } },
};

export default function ContactPage() {
  return <main><PageHero eyebrow="Contacto / Consulta de proyecto" title={<>¿Tienes un proyecto<br /><em>en mente?</em></>} intro="Cuéntanos sobre tu negocio y lo que necesitas. Revisaremos los detalles y te responderemos." /><section className="contact-section section-space light-section"><SectionHeader index="01" label="Detalles del proyecto" dark /><div className="contact-layout"><div className="contact-aside" data-reveal><h2>Los buenos proyectos empiezan<br />con una conversación <em>clara.</em></h2><p>No necesitas tener un brief terminado. Comparte lo que sabes, qué debe lograr el sitio web y qué necesita mejorar la experiencia actual.</p><div className="direct-links"><div><span>Correo</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}<Arrow /></a></div><div><span>Instagram</span><a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">{siteConfig.instagramLabel}<Arrow /></a></div><div><span>WhatsApp</span><a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">Abrir chat<Arrow /></a></div></div></div><ContactForm language="es" /></div></section></main>;
}
