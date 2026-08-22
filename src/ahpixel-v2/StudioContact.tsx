"use client";

import { FormEvent, useState } from "react";

type Language = "en" | "es";

const EMAIL = "ahpixel.studio@gmail.com";
const PHONE = "51997150226";
const INSTAGRAM = "https://instagram.com/ahpixel.studio";
const GITHUB = "https://github.com/ah-pixel-studio2005";

const copy = {
  es: {
    eyebrow: "CONTACTO / NUEVO PROYECTO",
    title: <>HABLEMOS DE TU<br /><em>PRÓXIMA WEB.</em></>,
    intro: "Cuéntanos qué necesita tu negocio. No hace falta tener un resumen del proyecto terminado: empezamos con una conversación clara.",
    location: "UBICACIÓN",
    locationValue: "Lima, Perú",
    locationNote: "Atención remota a nivel internacional",
    maps: "VER EN MAPA",
    channels: "CANALES DIRECTOS",
    email: "CORREO",
    whatsapp: "WHATSAPP",
    instagram: "INSTAGRAM",
    github: "GITHUB",
    form: "DETALLES DEL PROYECTO",
    name: "Nombre",
    company: "Empresa / marca",
    contactEmail: "Correo",
    phone: "Teléfono / WhatsApp",
    service: "Tipo de web",
    select: "Selecciona una opción",
    services: ["Página de captación", "Web empresarial", "Web profesional", "Rediseño web", "Aún no estoy seguro"],
    message: "¿Qué debe lograr la web?",
    messagePlaceholder: "Cuéntanos sobre tu negocio, objetivo y situación actual.",
    privacy: "Al enviar, se abrirá tu aplicación de correo con la información lista. No guardamos tus datos en esta web.",
    submit: "PREPARAR CONSULTA",
    prepared: "Consulta preparada. Si tu correo no se abrió, escríbenos directamente o continúa por WhatsApp.",
    fixed: "ESCRÍBENOS",
    footer: "Diseño y desarrollo web con dirección, carácter y propósito.",
    worldwide: "LIMA, PERÚ · TRABAJAMOS A NIVEL INTERNACIONAL",
    rights: "© 2026 AHPixel Studio. Todos los derechos reservados.",
  },
  en: {
    eyebrow: "CONTACT / NEW PROJECT",
    title: <>LET&apos;S TALK ABOUT<br />YOUR <em>NEXT WEBSITE.</em></>,
    intro: "Tell us what your business needs. You do not need a finished brief: we begin with a clear conversation.",
    location: "LOCATION",
    locationValue: "Lima, Peru",
    locationNote: "Remote service available worldwide",
    maps: "VIEW ON MAP",
    channels: "DIRECT CHANNELS",
    email: "EMAIL",
    whatsapp: "WHATSAPP",
    instagram: "INSTAGRAM",
    github: "GITHUB",
    form: "PROJECT DETAILS",
    name: "Name",
    company: "Company / brand",
    contactEmail: "Email",
    phone: "Phone / WhatsApp",
    service: "Website type",
    select: "Select an option",
    services: ["Landing page", "Business website", "Professional website", "Website redesign", "I am not sure yet"],
    message: "What should the website achieve?",
    messagePlaceholder: "Tell us about your business, goal and current situation.",
    privacy: "Submitting opens your email application with the information ready. We do not store your data on this website.",
    submit: "PREPARE INQUIRY",
    prepared: "Inquiry prepared. If your email did not open, email us directly or continue on WhatsApp.",
    fixed: "MESSAGE US",
    footer: "Web design and development with direction, character and purpose.",
    worldwide: "LIMA, PERU · AVAILABLE WORLDWIDE",
    rights: "© 2026 AHPixel Studio. All rights reserved.",
  },
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ChannelIcon({ type }: { type: "email" | "whatsapp" | "instagram" | "github" }) {
  const paths = {
    email: <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m4 7 8 6 8-6" /></>,
    whatsapp: <path d="M12 3a8.5 8.5 0 0 0-7.4 12.7L3.4 21l5.4-1.4A8.5 8.5 0 1 0 12 3Zm4 12.2c-.2.6-1.1 1.1-1.7 1.2-.5.1-1.2.1-2-.2-2.8-1-4.7-3.8-4.9-4.1-.1-.2-1.1-1.6-1.1-3 0-1.4.7-2.1 1-2.4.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.7 1.7c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.2.3-.1.5.2.3.6 1.1 1.4 1.7.9.8 1.8 1 2 1.1.2.1.4.1.5-.1l.8-1c.2-.2.4-.2.6-.1l1.6.8c.3.1.5.2.5.4.1.3-.1 1.3-.4 1.9Z" />,
    instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle className="icon-fill" cx="17.3" cy="6.8" r="1" /></>,
    github: <path d="M12 2.8a9.4 9.4 0 0 0-3 18.3c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-4.7 0-1 .4-1.9 1-2.5-.1-.3-.4-1.3.1-2.5 0 0 .8-.3 2.6 1a9.2 9.2 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.2.2 2.2.1 2.5.6.6 1 1.5 1 2.5 0 3.6-2.4 4.4-4.6 4.7.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.4 9.4 0 0 0 12 2.8Z" />,
  };

  return <svg className={`channel-icon channel-icon-${type}`} viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}

export default function StudioContact({ language }: { language: Language }) {
  const t = copy[language];
  const [prepared, setPrepared] = useState(false);
  const [completedFields, setCompletedFields] = useState(0);
  const whatsappMessage = language === "es"
    ? "Hola AHPixel Studio, me gustaría consultar sobre una página web."
    : "Hello AHPixel Studio, I would like to ask about a website project.";
  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = language === "es"
      ? `Consulta web — ${data.get("company") || data.get("name")}`
      : `Website inquiry — ${data.get("company") || data.get("name")}`;
    const body = language === "es"
      ? [
          `Nombre: ${data.get("name")}`,
          `Empresa / marca: ${data.get("company") || "—"}`,
          `Correo: ${data.get("email")}`,
          `Teléfono / WhatsApp: ${data.get("phone") || "—"}`,
          `Tipo de web: ${data.get("service")}`,
          "",
          "Objetivo del proyecto:",
          String(data.get("message")),
        ].join("\n")
      : [
          `Name: ${data.get("name")}`,
          `Company / brand: ${data.get("company") || "—"}`,
          `Email: ${data.get("email")}`,
          `Phone / WhatsApp: ${data.get("phone") || "—"}`,
          `Website type: ${data.get("service")}`,
          "",
          "Project goal:",
          String(data.get("message")),
        ].join("\n");

    setPrepared(true);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const updateProgress = (event: FormEvent<HTMLFormElement>) => {
    const controls = Array.from(event.currentTarget.elements).filter(
      (control): control is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
        control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement,
    );
    setCompletedFields(controls.filter((control) => control.value.trim() !== "" && control.checkValidity()).length);
  };

  return (
    <>
      <section className="studio-contact technical-grid" id="contact" aria-labelledby="contact-title" data-word={language === "es" ? "CONTACTO" : "CONTACT"}>
        <header className="contact-heading">
          <p><i /> {t.eyebrow}</p>
          <h2 id="contact-title">{t.title}</h2>
          <span>{t.intro}</span>
        </header>

        <div className="contact-grid">
          <aside className="contact-information">
            <article className="location-panel">
              <span>{t.location}</span>
              <strong>{t.locationValue}</strong>
              <p>{t.locationNote}</p>
              <div className="location-map" aria-hidden="true">
                <i className="map-orbit map-orbit-a" /><i className="map-orbit map-orbit-b" />
                <b>AHP</b><small>LIMA / PE</small>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Lima%2C%20Peru" target="_blank" rel="noopener noreferrer">{t.maps} <Arrow /></a>
            </article>

            <div className="contact-channels">
              <span>{t.channels}</span>
              <a href={`mailto:${EMAIL}`}><ChannelIcon type="email" /><small>{t.email}</small><strong>{EMAIL}</strong><Arrow /></a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><ChannelIcon type="whatsapp" /><small>{t.whatsapp}</small><strong>+51 997 150 226</strong><Arrow /></a>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><ChannelIcon type="instagram" /><small>{t.instagram}</small><strong>@ahpixel.studio</strong><Arrow /></a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer"><ChannelIcon type="github" /><small>{t.github}</small><strong>ah-pixel-studio2005</strong><Arrow /></a>
            </div>
          </aside>

          <form className="project-form" onSubmit={submit} onInput={updateProgress} onChange={updateProgress}>
            <div className="form-topline"><span>{t.form}</span><b>{String(completedFields).padStart(2, "0")} / 06</b></div>
            <div className="field-row">
              <label><span>{t.name} *</span><input name="name" autoComplete="name" required /></label>
              <label><span>{t.company}</span><input name="company" autoComplete="organization" /></label>
            </div>
            <div className="field-row">
              <label><span>{t.contactEmail} *</span><input name="email" type="email" inputMode="email" autoComplete="email" required /></label>
              <label><span>{t.phone}</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" /></label>
            </div>
            <label><span>{t.service} *</span><select name="service" defaultValue="" required><option value="" disabled>{t.select}</option>{t.services.map((service) => <option key={service}>{service}</option>)}</select></label>
            <label><span>{t.message} *</span><textarea name="message" rows={5} placeholder={t.messagePlaceholder} required /></label>
            <div className="form-submit">
              <p aria-live="polite">{prepared ? t.prepared : t.privacy}</p>
              <button type="submit">{t.submit} <Arrow /></button>
            </div>
          </form>
        </div>
      </section>

      <footer className="studio-footer">
        <div><strong>AHPixel</strong><span>STUDIO / 2026</span></div>
        <p>{t.footer}</p>
        <p>{t.worldwide}</p>
        <span>{t.rights}</span>
      </footer>

      <a className="fixed-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.whatsapp}: +51 997 150 226`}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.7 9.7 0 0 0-8.4 14.6L2.2 22l5.6-1.4A9.8 9.8 0 1 0 12 2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3.3.9.9-3.2-.2-.3A8 8 0 1 1 12 19.7Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.5.2-.4c.1-.2 0-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.1-.3-.2-.6-.3Z" /></svg>
        <span>{t.fixed}</span>
      </a>
    </>
  );
}
