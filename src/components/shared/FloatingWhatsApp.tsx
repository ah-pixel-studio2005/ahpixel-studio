import { useEffect, useState } from "react";
import "./floating-whatsapp.css";
import { createWhatsAppUrl, studioContact } from "@/config/contact";

type FloatingWhatsAppProps = {
  phone?: string;
  message?: string;
  label?: string;
  title?: string;
  subtitle?: string;
};

export default function FloatingWhatsApp({
  phone = studioContact.phone,
  message = studioContact.whatsappMessage.es,
  label = "Contactar a AHPixel Studio por WhatsApp",
  title = "Solicitar asesoría",
  subtitle = "¡Escríbenos ahora!",
}: FloatingWhatsAppProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let showTimer: number | undefined;
    let hideTimer: number | undefined;

    // Start compact, wait 4s, then repeat a calm rhythm: 6s expanded,
    // followed by 4s compact before showing again.
    const showMessage = () => {
      setIsExpanded(true);
      hideTimer = window.setTimeout(() => {
        setIsExpanded(false);
        showTimer = window.setTimeout(showMessage, 4000);
      }, 6000);
    };

    showTimer = window.setTimeout(showMessage, 4000);

    return () => {
      if (showTimer !== undefined) window.clearTimeout(showTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <a
      className={`global-whatsapp${isExpanded ? " is-expanded" : ""}`}
      href={createWhatsAppUrl(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title="Escríbenos por WhatsApp"
    >
      <span className="global-whatsapp__copy">
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <span className="global-whatsapp__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 2a9.7 9.7 0 0 0-8.4 14.6L2.2 22l5.6-1.4A9.8 9.8 0 1 0 12 2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3.3.9.9-3.2-.2-.3A8 8 0 1 1 12 19.7Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.5.2-.4c.1-.2 0-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.1-.3-.2-.6-.3Z" />
        </svg>
      </span>
    </a>
  );
}
