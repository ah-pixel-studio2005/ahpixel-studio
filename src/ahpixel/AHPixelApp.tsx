import { useEffect } from "react";
import { SiteShell } from "./app/components/SiteShell";
import HomePage from "./app/page";
import WorkPage from "./app/work/page";
import ServicesPage from "./app/services/page";
import AboutPage from "./app/about/page";
import ContactPage from "./app/contact/page";
import VantaCaseStudy from "./app/work/vanta-barber-club/page";
import LumenCaseStudy from "./app/work/lumen-dental-studio/page";
import SpanishWorkPage from "./app/es/work/page";
import SpanishServicesPage from "./app/es/services/page";
import SpanishAboutPage from "./app/es/about/page";
import SpanishContactPage from "./app/es/contact/page";

const titles: Record<string, string> = {
  "/": "AHPixel Studio | Web Design & Development",
  "/work": "Selected Work | AHPixel Studio",
  "/services": "Web Design Services | AHPixel Studio",
  "/about": "About AHPixel Studio",
  "/contact": "Start a Project | AHPixel Studio",
  "/work/vanta-barber-club": "VANTA Barber Club — AHPixel Studio",
  "/work/lumen-dental-studio": "LUMEN Dental Studio — AHPixel Studio",
};

const spanishTitles: Record<string, string> = {
  "/": "AHPixel Studio | Diseño y desarrollo web",
  "/work": "Proyectos seleccionados | AHPixel Studio",
  "/services": "Servicios de diseño web | AHPixel Studio",
  "/about": "Estudio | AHPixel Studio",
  "/contact": "Iniciar un proyecto | AHPixel Studio",
  "/work/vanta-barber-club": "VANTA Barber Club — AHPixel Studio",
  "/work/lumen-dental-studio": "LUMEN Dental Studio — AHPixel Studio",
};

function resolvePage(path: string) {
  const englishPath = path.replace(/^\/es(?=\/|$)/, "") || "/";
  const spanish = path === "/es" || path.startsWith("/es/");
  if (englishPath === "/work/vanta-barber-club") return <VantaCaseStudy />;
  if (englishPath === "/work/lumen-dental-studio") return <LumenCaseStudy />;
  if (englishPath === "/work") return spanish ? <SpanishWorkPage /> : <WorkPage />;
  if (englishPath === "/services") return spanish ? <SpanishServicesPage /> : <ServicesPage />;
  if (englishPath === "/about") return spanish ? <SpanishAboutPage /> : <AboutPage />;
  if (englishPath === "/contact") return spanish ? <SpanishContactPage /> : <ContactPage />;
  return <HomePage language={spanish ? "es" : "en"} />;
}

export default function AHPixelApp({ path }: { path: string }) {
  useEffect(() => {
    const normalized = path.replace(/^\/es(?=\/|$)/, "") || "/";
    const spanish = path === "/es" || path.startsWith("/es/");
    document.documentElement.lang = spanish ? "es" : "en";
    document.title = (spanish ? spanishTitles : titles)[normalized] ?? (spanish ? spanishTitles : titles)["/"];
    window.scrollTo({ top: 0 });
  }, [path]);
  return <SiteShell path={path}>{resolvePage(path)}</SiteShell>;
}
