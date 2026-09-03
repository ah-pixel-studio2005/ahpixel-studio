import { createWhatsAppUrl, studioContact } from "@/config/contact";

type Language = "es" | "en";

const navigation = [
  ["/services", "Servicios", "Services"],
  ["/projects", "Diseños", "Designs"],
  ["/solutions", "Soluciones", "Solutions"],
  ["/process", "Proceso", "Process"],
  ["/about", "Nosotros", "About"],
  ["/contact", "Contacto", "Contact"],
] as const;

const socialLinks = [
  ["Instagram", "https://instagram.com/ahpixel.studio"],
  ["Facebook", "https://www.facebook.com/profile.php?id=61593409284726"],
  ["GitHub", "https://github.com/ah-pixel-studio2005"],
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number][0] }) {
  if (name === "Instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".9" className="social-icon__dot" /></svg>;
  if (name === "Facebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V4a23 23 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.8v8h3.3Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8a9.4 9.4 0 0 0-3 18.3c.5.1.6-.2.6-.5v-1.8c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.8.1-.6.3-1 .5-1.2-2-.2-4.1-1-4.1-4.5 0-1 .3-1.8.9-2.5-.1-.2-.4-1.2.1-2.5 0 0 .8-.2 2.6.9a9 9 0 0 1 4.8 0c1.8-1.1 2.6-.9 2.6-.9.5 1.3.2 2.3.1 2.5.6.7.9 1.5.9 2.5 0 3.5-2.1 4.3-4.1 4.5.3.3.6.9.6 1.7v2.5c0 .3.2.6.6.5A9.4 9.4 0 0 0 12 2.8Z" /></svg>;
}

const footerCopy = {
  es: {
    eyebrow: "DISEÑO Y DESARROLLO WEB · LIMA, PERÚ",
    title: "Hagamos una web que trabaje tan bien como se ve.",
    action: "Cuéntanos tu idea",
    navigation: "Explorar",
    contact: "Contacto directo",
    social: "Síguenos",
    availability: "Proyectos en Lima y trabajo remoto internacional.",
    rights: "Todos los derechos reservados.",
  },
  en: {
    eyebrow: "WEB DESIGN + DEVELOPMENT · LIMA, PERU",
    title: "Let’s build a website that works as well as it looks.",
    action: "Tell us your idea",
    navigation: "Explore",
    contact: "Direct contact",
    social: "Follow us",
    availability: "Projects in Lima and remote work worldwide.",
    rights: "All rights reserved.",
  },
} as const;

export default function StudioFooter({ language }: { language: Language }) {
  const t = footerCopy[language];
  const whatsappUrl = createWhatsAppUrl(studioContact.whatsappMessage[language]);

  return (
    <footer className="site-footer">
      <div className="site-footer__signal" aria-hidden="true"><i /><i /></div>
      <div className="site-footer__wordmark" aria-hidden="true">AHPIXEL</div>
      <div className="site-footer__lead">
        <div><p>{t.eyebrow}</p><h2>{t.title}</h2></div>
        <a className="site-footer__cta" href="/contact"><span>{t.action}</span><b aria-hidden="true">↗</b></a>
      </div>
      <div className="site-footer__directory">
        <div className="site-footer__identity">
          <a href="/" className="site-footer__brand" aria-label={language === "es" ? "AHPixel Studio — Inicio" : "AHPixel Studio — Home"}>
            <img src="/ahpixel-logo.webp" alt="" width="58" height="58" />
            <span><b>AHPixel</b><small>STUDIO</small></span>
          </a>
          <p>{t.availability}</p>
        </div>
        <nav aria-label={t.navigation}>
          <strong>{t.navigation}</strong>
          {navigation.map(([href, es, en]) => <a href={href} key={href}>{language === "es" ? es : en}</a>)}
        </nav>
        <div className="site-footer__contact">
          <strong>{t.contact}</strong>
          <a href={`mailto:${studioContact.email}`}>{studioContact.email}</a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{studioContact.phoneDisplay}</a>
          <span>{language === "es" ? "Lima, Perú" : "Lima, Peru"}</span>
        </div>
        <div className="site-footer__social">
          <strong>{t.social}</strong>
          <div className="site-footer__social-links">
            {socialLinks.map(([label, href]) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} key={label}><SocialIcon name={label} /></a>)}
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} AHPixel Studio. {t.rights}</span>
        <span>React · TypeScript · Vite</span>
      </div>
    </footer>
  );
}
