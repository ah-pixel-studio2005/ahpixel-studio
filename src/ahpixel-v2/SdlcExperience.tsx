"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BuildSystemCanvas, { type BuildSystemCanvasHandle } from "./BuildSystemCanvas";
import WebsiteTypes from "./WebsiteTypes";
import StudioContact from "./StudioContact";

const vantaStates = [
  { number: "01", label: "DESKTOP", labelEs: "ESCRITORIO", note: "A clear first impression.", noteEs: "Una primera impresión clara." },
  { number: "02", label: "RESPONSIVE", labelEs: "ADAPTABLE", note: "The identity holds at every size.", noteEs: "La identidad se mantiene en cada tamaño." },
  { number: "03", label: "NAVIGATION", labelEs: "NAVEGACIÓN", note: "Every action stays within reach.", noteEs: "Cada acción permanece al alcance." },
  { number: "04", label: "SERVICES", labelEs: "SERVICIOS", note: "The offer becomes easy to understand.", noteEs: "La oferta se entiende con facilidad." },
  { number: "05", label: "GALLERY", labelEs: "GALERÍA", note: "The work carries the story.", noteEs: "El trabajo cuenta la historia." },
];

const buildStates = [
  {
    number: "01",
    label: "DISCOVER", labelEs: "DESCUBRIR",
    kicker: "FIND THE SIGNAL", kickerEs: "ENCONTRAR LA SEÑAL",
    copy: "We separate the useful signal from the noise: business, audience, problem and desired action.",
    copyEs: "Separamos la señal útil del ruido: negocio, audiencia, problema y acción deseada.",
    chips: ["BUSINESS", "AUDIENCE", "GOAL"], chipsEs: ["NEGOCIO", "AUDIENCIA", "OBJETIVO"],
  },
  {
    number: "02",
    label: "ALIGN", labelEs: "ALINEAR",
    kicker: "DEFINE THE DIRECTION", kickerEs: "DEFINIR LA DIRECCIÓN",
    copy: "Positioning, message and conversion priorities are aligned before a single screen is styled.",
    copyEs: "Alineamos posicionamiento, mensaje y prioridades de conversión antes de diseñar una pantalla.",
    chips: ["POSITION", "MESSAGE", "ACTION"], chipsEs: ["POSICIÓN", "MENSAJE", "ACCIÓN"],
  },
  {
    number: "03",
    label: "ARCHITECT", labelEs: "ESTRUCTURAR",
    kicker: "PLAN THE JOURNEY", kickerEs: "PLANEAR EL RECORRIDO",
    copy: "The page map, hierarchy and navigation turn strategy into a journey people can understand.",
    copyEs: "El mapa, la jerarquía y la navegación convierten la estrategia en un recorrido comprensible.",
    chips: ["SITEMAP", "HIERARCHY", "FLOW"], chipsEs: ["MAPA", "JERARQUÍA", "FLUJO"],
  },
  {
    number: "04",
    label: "DESIGN", labelEs: "DISEÑAR",
    kicker: "CREATE THE SYSTEM", kickerEs: "CREAR EL SISTEMA",
    copy: "Type, grid, color, photography and interface begin speaking one distinct visual language.",
    copyEs: "Tipografía, retícula, color, fotografía e interfaz comienzan a hablar un lenguaje visual propio.",
    chips: ["TYPE", "GRID", "ART DIRECTION"], chipsEs: ["TIPOGRAFÍA", "RETÍCULA", "DIRECCIÓN DE ARTE"],
  },
  {
    number: "05",
    label: "VALIDATE", labelEs: "VALIDAR",
    kicker: "HUMAN GATE", kickerEs: "DECISIÓN HUMANA",
    copy: "The direction is reviewed against the goal. Nothing moves forward merely because it looks good.",
    copyEs: "Revisamos la dirección contra el objetivo. Nada avanza sólo porque se vea bien.",
    chips: ["REVIEW", "DECISION", "APPROVAL"], chipsEs: ["REVISIÓN", "DECISIÓN", "APROBACIÓN"],
  },
  {
    number: "06", label: "BUILD", labelEs: "CONSTRUIR",
    kicker: "MAKE IT REAL", kickerEs: "HACERLO REAL",
    copy: "Reusable components connect into a fast, accessible and maintainable web experience.",
    copyEs: "Componentes reutilizables forman una experiencia web rápida, accesible y mantenible.",
    chips: ["COMPONENTS", "MOTION", "ACCESSIBILITY"], chipsEs: ["COMPONENTES", "MOVIMIENTO", "ACCESIBILIDAD"],
  },
  {
    number: "07", label: "PREVIEW", labelEs: "PREVISUALIZAR",
    kicker: "TEST THE REAL THING", kickerEs: "PROBAR LO REAL",
    copy: "The running website is tested as a product, not admired as a static design file.",
    copyEs: "Probamos la web funcionando como producto, no como una imagen estática de diseño.",
    chips: ["LIVE URL", "REAL CONTENT", "BROWSER"], chipsEs: ["URL REAL", "CONTENIDO", "NAVEGADOR"],
  },
  {
    number: "08", label: "REFINE", labelEs: "REFINAR",
    kicker: "REMOVE THE FRICTION", kickerEs: "ELIMINAR LA FRICCIÓN",
    copy: "Performance, behavior and details are examined until the interface feels clear and inevitable.",
    copyEs: "Rendimiento, comportamiento y detalles se revisan hasta que la interfaz se siente clara y natural.",
    chips: ["QA", "SPEED", "POLISH"], chipsEs: ["CALIDAD", "VELOCIDAD", "PULIDO"],
  },
  {
    number: "09", label: "ADAPT", labelEs: "ADAPTAR",
    kicker: "EVERY SCREEN", kickerEs: "CADA PANTALLA",
    copy: "The same hierarchy and identity are composed deliberately for desktop, tablet and mobile.",
    copyEs: "La misma jerarquía e identidad se componen con intención para escritorio, tablet y móvil.",
    chips: ["DESKTOP", "TABLET", "MOBILE"], chipsEs: ["ESCRITORIO", "TABLETA", "MÓVIL"],
  },
  {
    number: "10", label: "LAUNCH", labelEs: "PUBLICAR",
    kicker: "READY FOR THE WORLD", kickerEs: "LISTO PARA EL MUNDO",
    copy: "The website is deployed, measured and handed over with a clear purpose and a complete identity.",
    copyEs: "La web se publica, se mide y se entrega con un propósito claro y una identidad completa.",
    chips: ["DEPLOY", "ANALYTICS", "HANDOFF"], chipsEs: ["PUBLICACIÓN", "ANALÍTICA", "ENTREGA"],
  },
  {
    number: "11", label: "EVOLVE", labelEs: "EVOLUCIONAR",
    kicker: "THE LOOP STAYS OPEN", kickerEs: "EL CICLO SIGUE ABIERTO",
    copy: "Real use creates the next signal. The system can grow without losing clarity or character.",
    copyEs: "El uso real genera la siguiente señal. El sistema puede crecer sin perder claridad ni carácter.",
    chips: ["LEARN", "IMPROVE", "GROW"], chipsEs: ["APRENDER", "MEJORAR", "CRECER"],
  },
];

const buildBeats = [
  "SIGNAL",
  "DIRECTION",
  "STRUCTURE",
  "SYSTEM",
  "APPROVAL",
  "COMPONENTS",
  "PREVIEW",
  "QA",
  "RESPONSIVE",
  "DEPLOY",
  "LIVE",
];

const buildBeatsEs = [
  "SEÑAL",
  "DIRECCIÓN",
  "ESTRUCTURA",
  "SISTEMA",
  "APROBACIÓN",
  "COMPONENTES",
  "PREVISUALIZACIÓN",
  "CALIDAD",
  "ADAPTABLE",
  "PUBLICACIÓN",
  "EN VIVO",
];

const desktopScreens = [
  "/vanta/desktop-hero-clean.png",
  "/vanta/desktop-services-clean.png",
  "/vanta/desktop-gallery-clean.png",
];

const mobileScreens = [
  "/vanta/mobile-hero-clean.png",
  "/vanta/mobile-menu-clean.png",
  "/vanta/mobile-services-clean.png",
  "/vanta/mobile-gallery-clean.png",
];

const lumenStates = [
  { number: "01", label: "DESKTOP", labelEs: "ESCRITORIO", note: "A calm, credible first impression.", noteEs: "Una primera impresión serena y confiable." },
  { number: "02", label: "RESPONSIVE", labelEs: "ADAPTABLE", note: "The same clarity on every screen.", noteEs: "La misma claridad en cada pantalla." },
  { number: "03", label: "NAVIGATION", labelEs: "NAVEGACIÓN", note: "Appointments and information stay close.", noteEs: "Las citas y la información permanecen cerca." },
  { number: "04", label: "TREATMENTS", labelEs: "TRATAMIENTOS", note: "Complex services become easy to scan.", noteEs: "Los servicios complejos se entienden con facilidad." },
  { number: "05", label: "TRUST", labelEs: "CONFIANZA", note: "Space, tone and proof reduce uncertainty.", noteEs: "El espacio, el tono y la evidencia reducen la duda." },
];

const portfolioProjects = {
  vanta: {
    number: "01",
    name: "VANTA BARBER CLUB",
    lines: ["VANTA", "BARBER", "CLUB"],
    typeEs: "SITIO WEB CONCEPTUAL",
    typeEn: "CONCEPT WEBSITE",
    demoUrl: "/demos/vanta",
    entryImage: "/vanta/desktop-hero-clean.png",
    desktopScreens,
    mobileScreens,
    shardImage: "/vanta/desktop-gallery-clean.png",
    states: vantaStates,
  },
  lumen: {
    number: "02",
    name: "LUMEN DENTAL STUDIO",
    lines: ["LUMEN", "DENTAL", "STUDIO"],
    typeEs: "SITIO WEB DE SALUD",
    typeEn: "HEALTHCARE WEBSITE",
    demoUrl: "/demos/lumen",
    entryImage: "/lumen/desktop-hero.webp",
    desktopScreens: [
      "/lumen/desktop-hero.webp",
      "/lumen/gallery-instruments-v2.webp",
      "/lumen/gallery-interior-v2.webp",
    ],
    mobileScreens: [
      "/lumen/mobile-hero.webp",
      "/lumen/mobile-treatments.webp",
      "/lumen/gallery-instruments-v2.webp",
      "/lumen/gallery-interior-v2.webp",
    ],
    shardImage: "/lumen/gallery-interior-v2.webp",
    states: lumenStates,
  },
} as const;

type ProjectKey = keyof typeof portfolioProjects;

export default function SdlcExperience() {
  const [language, setLanguage] = useState<"en" | "es">("es");
  const [selectedProject, setSelectedProject] = useState<ProjectKey>("vanta");
  const [menuOpen, setMenuOpen] = useState(false);
  const currentProject = portfolioProjects[selectedProject];
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const entryRef = useRef<HTMLElement>(null);
  const vantaRef = useRef<HTMLElement>(null);
  const buildRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLSpanElement>(null);
  const buildCanvasRef = useRef<BuildSystemCanvasHandle>(null);
  const buildStepRef = useRef<HTMLSpanElement>(null);
  const buildBeatRef = useRef<HTMLElement>(null);
  const vantaScrollBoundsRef = useRef<{ start: number; end: number } | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === "es"
      ? "AHPixel Studio — Diseño y desarrollo web"
      : "AHPixel Studio — Web design and development";
  }, [language]);

  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let previousY = window.scrollY;
    let frame = 0;
    const updateHeader = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;
      if (currentY < 72) header.classList.remove("is-hidden");
      else if (delta > 7) header.classList.add("is-hidden");
      else if (delta < -7) header.classList.remove("is-hidden");
      previousY = currentY;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      const globalProgress = ScrollTrigger.create({
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          if (progressRef.current) {
            progressRef.current.textContent = `${Math.round(progress * 100)
              .toString()
              .padStart(2, "0")}%`;
          }
          gsap.set(progressLineRef.current, { scaleY: progress });
        },
      });

      const media = gsap.matchMedia();

      const createEntryTimeline = (mobile: boolean) => {
        gsap.set(".entry-vanta", {
          opacity: 0,
          scale: mobile ? 1.45 : 1.22,
          clipPath: mobile
            ? "inset(34% 8% 34% 8%)"
            : "inset(43% 34% 43% 34%)",
        });
        gsap.set(".entry-project-meta", { opacity: 0, y: 24 });

        return gsap
          .timeline({
            scrollTrigger: {
              trigger: entryRef.current,
              start: "top top",
              end: mobile ? "+=1200" : "+=1550",
              pin: ".entry-stage",
              scrub: mobile ? 0.7 : 1,
              anticipatePin: 1,
            },
          })
          .to(".entry-intro", { opacity: 1, duration: 0.45 }, 0)
          .to(".entry-world", { scale: 1.05, rotate: 5, duration: 0.7 }, 0)
          .to(".entry-intro", { opacity: 0, y: -42, duration: 0.3 }, 0.42)
          .to(".entry-world", { xPercent: mobile ? 0 : 18, scale: 1.32, opacity: 0.16, duration: 0.52 }, 0.42)
          .to(".entry-meta", { opacity: 0, y: -18, duration: 0.2 }, 0.48)
          .to(
            ".entry-vanta",
            {
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.25,
              ease: "power2.inOut",
            },
            0.58,
          )
          .fromTo(
            ".entry-scan",
            { xPercent: -110 },
            { xPercent: 110, duration: 0.9, ease: "none" },
            0.72,
          )
          .to(".entry-project-meta", { opacity: 1, y: 0, duration: 0.4 }, 0.92)
          .to(".entry-vanta", { scale: mobile ? 0.95 : 0.92, yPercent: mobile ? 3 : 1, duration: 0.52 }, 1.18)
          .to(".entry-vanta, .entry-project-meta", { opacity: 0, duration: 0.22 }, 1.58);
      };

      const createVantaTimeline = (mobile: boolean) => {
        gsap.set(".walk-stage", { transformPerspective: 1400, transformOrigin: "center center" });
        gsap.set(".walk-desktop", { opacity: 1, scale: mobile ? 1.16 : 0.92, xPercent: 0, yPercent: 0, rotationX: mobile ? 0 : 1.5, rotationY: mobile ? 0 : -2 });
        gsap.set(".walk-phone", {
          opacity: 0,
          xPercent: mobile ? 72 : 110,
          yPercent: mobile ? 24 : 10,
          scale: mobile ? 1.02 : 0.8,
          rotationY: mobile ? 0 : -18,
          rotationZ: mobile ? 0 : 2.5,
        });
        gsap.set(".desktop-screen", { opacity: 0 });
        gsap.set(".desktop-screen-0", { opacity: 1 });
        gsap.set(".mobile-screen", { opacity: 0 });
        gsap.set(".mobile-screen-0", { opacity: 1 });
        gsap.set(".vanta-state-copy", { opacity: 0, y: 30 });
        gsap.set(".vanta-state-copy-0", { opacity: 1, y: 0 });
        gsap.set(".vanta-marker", { opacity: 0.22, scaleX: 0.35, transformOrigin: "left center" });
        gsap.set(".vanta-marker-0", { opacity: 1, scaleX: 1 });
        gsap.set(".gallery-shard", { opacity: 0, scale: 0.72, rotation: (index) => index % 2 ? 7 : -7 });
        gsap.set(".vanta-bridge", { opacity: 0 });
        gsap.set(".bridge-line", { scaleX: 0, transformOrigin: "center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "vanta-walk",
            trigger: vantaRef.current,
            start: "top top",
            end: mobile ? "+=3700" : "+=4800",
            pin: ".vanta-stage",
            scrub: mobile ? 0.65 : 0.9,
            anticipatePin: 1,
            onRefresh: (self) => {
              vantaScrollBoundsRef.current = { start: self.start, end: self.end };
            },
          },
        });

        if (tl.scrollTrigger) {
          vantaScrollBoundsRef.current = {
            start: tl.scrollTrigger.start,
            end: tl.scrollTrigger.end,
          };
        }

        const switchCopy = (from: number, to: number, time: number) => {
          tl.to(`.vanta-state-copy-${from}`, { opacity: 0, y: -24, duration: 0.35 }, time)
            .to(`.vanta-state-copy-${to}`, { opacity: 1, y: 0, duration: 0.5 }, time + 0.18)
            .to(`.vanta-marker-${from}`, { opacity: 0.22, scaleX: 0.35, duration: 0.35 }, time)
            .to(`.vanta-marker-${to}`, { opacity: 1, scaleX: 1, duration: 0.5 }, time + 0.12);
        };

        switchCopy(0, 1, 1.2);
        tl.to(".walk-desktop", { xPercent: mobile ? -16 : -18, yPercent: -2, scale: mobile ? 0.8 : 0.72, rotationY: mobile ? 0 : 5, duration: 1.1 }, 1.05)
          .to(".walk-phone", { opacity: 1, xPercent: mobile ? 0 : 1, yPercent: mobile ? 13 : 6, scale: mobile ? .98 : .78, rotationY: 0, rotationZ: 0, duration: 1 }, 1.12)
          .to(".walk-grid-line-a", { scaleX: 1, duration: 0.8 }, 1.25);

        switchCopy(1, 2, 2.55);
        tl.to(".walk-desktop", { opacity: mobile ? 0.13 : 0.2, xPercent: mobile ? -48 : -28, yPercent: -4, scale: mobile ? 0.7 : 0.62, rotationY: mobile ? 0 : 8, duration: 0.9 }, 2.48)
          .to(".walk-phone", { xPercent: mobile ? -42 : -52, yPercent: 1, scale: mobile ? 1.08 : 1.02, rotationY: mobile ? 0 : -4, duration: 0.95 }, 2.48)
          .to(".mobile-screen-0", { opacity: 0, duration: 0.35 }, 2.56)
          .fromTo(".mobile-screen-1", { opacity: 0, clipPath: "inset(0 0 100% 0)", scale: 1.05 }, { opacity: 1, clipPath: "inset(0 0 0% 0)", scale: 1, duration: 0.55 }, 2.62);

        if (mobile) {
          tl.to(".vanta-eyebrow, .vanta-state-copy-wrap > h2", {
            opacity: 0,
            y: -22,
            duration: 0.45,
          }, 2.4);
        }

        switchCopy(2, 3, 3.85);
        tl.to(".walk-desktop", { opacity: 1, xPercent: mobile ? -10 : -8, yPercent: 1, scale: mobile ? 1 : 0.78, rotationY: mobile ? 0 : -3, duration: 1 }, 3.75)
          .to(".desktop-screen-0", { opacity: 0, duration: 0.4 }, 3.75)
          .fromTo(".desktop-screen-1", { opacity: 0, clipPath: "inset(0 0 100% 0)", scale: 1.04 }, { opacity: 1, clipPath: "inset(0 0 0% 0)", scale: 1, duration: 0.62 }, 3.84)
          .to(".walk-phone", { xPercent: mobile ? 0 : 4, yPercent: mobile ? 18 : 8, scale: mobile ? 0.9 : 0.72, rotationY: mobile ? 0 : 4, duration: 0.9 }, 3.75)
          .to(".mobile-screen-1", { opacity: 0, duration: 0.35 }, 3.78)
          .fromTo(".mobile-screen-2", { opacity: 0, clipPath: "inset(100% 0 0 0)" }, { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 0.55 }, 3.88);

        switchCopy(3, 4, 5.2);
        tl.to(".walk-desktop", { xPercent: mobile ? -10 : -11, yPercent: -1, scale: mobile ? .96 : .75, rotationY: mobile ? 0 : 3, duration: .9 }, 5.05)
          .to(".walk-phone", { xPercent: mobile ? 1 : 7, yPercent: mobile ? 15 : 8, scale: mobile ? .86 : .68, rotationY: mobile ? 0 : -4, duration: .9 }, 5.05)
          .to(".desktop-screen-1", { opacity: 0, duration: 0.4 }, 5.1)
          .fromTo(".desktop-screen-2", { opacity: 0, clipPath: "inset(0 50% 0 50%)", scale: 1.08 }, { opacity: 1, clipPath: "inset(0 0% 0 0%)", scale: 1, duration: 0.62 }, 5.16)
          .to(".mobile-screen-2", { opacity: 0, duration: 0.35 }, 5.12)
          .fromTo(".mobile-screen-3", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.52 }, 5.22)
          .to(".gallery-shard", { opacity: 1, scale: 1, rotation: 0, stagger: 0.09, duration: 0.68 }, 5.22);

        tl.to(".walk-desktop, .walk-phone, .gallery-shard", {
          opacity: 0,
          scale: 0.78,
          clipPath: "inset(48% 0% 48% 0%)",
          stagger: 0.05,
          duration: 1.15,
        }, 6.6)
          .to(".vanta-state-copy-4, .vanta-state-nav, .walk-micro", { opacity: 0, duration: 0.5 }, 6.65)
          .to(".bridge-line", { scaleX: 1, stagger: 0.1, duration: 0.75 }, 6.85)
          .to(".vanta-bridge", { opacity: 1, duration: 0.6 }, 7.05)
          .fromTo(".bridge-word", { yPercent: 105 }, { yPercent: 0, stagger: 0.08, duration: 0.75 }, 7.1)
          .to(".bridge-word-old", { opacity: 0, yPercent: -42, duration: 0.38 }, 7.92)
          .fromTo(".bridge-word-new", { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7 }, 8.48)
          .to(".bridge-word-new", { opacity: 0, yPercent: -24, duration: 0.38 }, 9.18)
          .to(".bridge-seed", { scale: 1.08, duration: 0.6, ease: "power1.inOut" }, 9.35)
          .to(".bridge-seed", { scale: mobile ? 3.2 : 4.2, opacity: 0, duration: 0.82, ease: "power2.in" }, 10.55)
          .to(".vanta-bridge > p", { opacity: 0, duration: 0.4 }, 10.72);

        return tl;
      };

      const createBuildTimeline = (mobile: boolean) => {
        gsap.set(".build-copy", { opacity: 0, y: 28 });
        gsap.set(".build-heading", { opacity: 1, y: 0 });
        gsap.set(".system-canvas-wrap", { opacity: 0, scale: 0.94 });
        gsap.set(".system-legend, .system-modes, .build-beat, .build-steps, .build-track, .build-status, .build-counter", { opacity: 0 });
        gsap.set(".build-step", { opacity: 0.22 });
        gsap.set(".build-step-0", { opacity: 1 });
        gsap.set(".system-mode", { opacity: 0.25 });
        gsap.set(".system-mode-0", { opacity: 1 });
        gsap.set(".system-track-fill", { scaleX: 0.2, transformOrigin: "left" });
        gsap.set(".build-scene-progress", { scaleX: 0, transformOrigin: "left" });
        buildCanvasRef.current?.setProgress(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: buildRef.current,
            start: "top top",
            end: mobile ? "+=6600" : "+=8200",
            pin: ".build-stage",
            scrub: mobile ? 0.65 : 0.85,
            anticipatePin: 1,
            onUpdate: ({ progress }) => {
              const systemProgress = Math.min(1, Math.max(0, (progress - 0.065) / 0.935));
              buildCanvasRef.current?.setProgress(systemProgress);
              const activeFloat = systemProgress * 10;
              const activeIndex = Math.min(10, Math.round(activeFloat));
              const step = systemProgress < 0.012 ? 0 : Math.min(11, activeIndex + 1);
              if (buildStepRef.current) {
                buildStepRef.current.textContent = `${String(step).padStart(2, "0")} / 11 · ${language === "es" ? "DESPLAZA" : "SCROLL"}`;
              }
              if (buildBeatRef.current) {
                const beats = language === "es" ? buildBeatsEs : buildBeats;
                buildBeatRef.current.textContent = beats[activeIndex];
              }
              root.querySelectorAll<HTMLElement>(".build-copy").forEach((element, index) => {
                gsap.set(element, { opacity: index === activeIndex ? 1 : 0, y: (index - activeFloat) * 22 });
              });
              root.querySelectorAll<HTMLElement>(".build-step").forEach((element, index) => {
                gsap.set(element, { opacity: index === activeIndex ? 1 : 0.22 });
              });
              const modeIndex = activeIndex < 3 ? 0 : activeIndex < 8 ? 1 : 2;
              root.querySelectorAll<HTMLElement>(".system-mode").forEach((element, index) => {
                gsap.set(element, { opacity: index === modeIndex ? 1 : 0.25 });
              });
              gsap.set(".system-track-fill", { scaleX: Math.max(0.025, systemProgress) });
            },
          },
        });

        tl.to(".build-heading", { opacity: 0, y: -20, duration: mobile ? 0.14 : 0.2 }, mobile ? 0.18 : 0.3)
          .to(".system-canvas-wrap", { opacity: 1, scale: 1, duration: mobile ? 0.35 : 0.58 }, mobile ? 0.32 : 0.5)
          .to(".system-legend, .system-modes, .build-beat, .build-steps, .build-track, .build-status, .build-counter", { opacity: 1, duration: 0.36 }, mobile ? 0.42 : 0.62)
          .to(".build-scene-progress", { scaleX: 1, duration: 7.6, ease: "none" }, 0)
          .to(".build-status", { color: "#23d3ff", duration: 0.35 }, 7.1);

        return tl;
      };

      media.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
        createEntryTimeline(false);
        createVantaTimeline(false);
        createBuildTimeline(false);
      });

      media.add("(max-width: 760px) and (prefers-reduced-motion: no-preference)", () => {
        createEntryTimeline(true);
        createVantaTimeline(true);
        createBuildTimeline(true);
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".entry-vanta, .entry-project-meta, .vanta-state-copy-0, .build-copy-0", {
          opacity: 1,
          clearProps: "transform,clipPath",
        });
      });

      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);

      gsap.from(".evidence-heading > *", {
        scrollTrigger: { trigger: ".studio-evidence", start: "top 78%", once: true },
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power2.out",
      });
      gsap.from(".evidence-metrics article", {
        scrollTrigger: { trigger: ".evidence-metrics", start: "top 82%", once: true },
        y: 34,
        opacity: 0,
        stagger: 0.09,
        duration: 0.72,
        ease: "power2.out",
      });
      gsap.from(".evidence-questions p", {
        scrollTrigger: { trigger: ".evidence-questions", start: "top 88%", once: true },
        x: 18,
        opacity: 0,
        stagger: 0.055,
        duration: 0.55,
        ease: "power2.out",
      });

      return () => {
        window.clearTimeout(refreshTimer);
        globalProgress.kill();
        media.revert();
      };
    }, rootRef);

    return () => context.revert();
  }, [language]);

  const jumpToVantaState = (index: number) => {
    const trigger = ScrollTrigger.getById("vanta-walk");
    const section = vantaRef.current;
    const stage = section?.querySelector<HTMLElement>(".vanta-stage");
    const pinSpacer = stage?.parentElement?.classList.contains("pin-spacer") ? stage.parentElement : null;
    const fallbackBounds = pinSpacer
      ? {
          start: section?.offsetTop ?? 0,
          end: (section?.offsetTop ?? 0) + Math.max(1, pinSpacer.offsetHeight - window.innerHeight),
        }
      : null;
    const storedBounds = vantaScrollBoundsRef.current;
    const bounds = fallbackBounds
      ?? (storedBounds && storedBounds.end > storedBounds.start
        ? storedBounds
        : trigger && trigger.end > trigger.start
        ? { start: trigger.start, end: trigger.end }
        : null);
    if (!bounds) return;
    const positions = [0.025, 0.145, 0.27, 0.395, 0.515];
    const top = bounds.start + (bounds.end - bounds.start) * positions[index];
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <main ref={rootRef} className="experience" id="top">
      <header ref={headerRef} className={`topbar${menuOpen ? " menu-open" : ""}`}>
        <a className="brand" href="#top" aria-label="AHPixel Studio — top">
          <Image src="/ahpixel-logo.png" alt="" width={74} height={56} priority />
          <span><strong>AHPixel</strong><small>STUDIO / V2</small></span>
        </a>
        <nav className="topbar-nav" id="primary-navigation" aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>
          <a href="#work" onClick={() => setMenuOpen(false)}>{language === "es" ? "PROYECTOS" : "WORK"}</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>{language === "es" ? "SERVICIOS" : "SERVICES"}</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>{language === "es" ? "ESTUDIO" : "STUDIO"}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{language === "es" ? "CONTACTO" : "CONTACT"}</a>
        </nav>
        <div className="topbar-actions">
          <div className="language-switch" aria-label={language === "es" ? "Seleccionar idioma" : "Select language"}>
            <button type="button" className={language === "es" ? "is-active" : ""} onClick={() => setLanguage("es")} aria-pressed={language === "es"}><span className="language-long">ESPAÑOL</span><span className="language-short">ES</span></button>
            <span>/</span>
            <button type="button" className={language === "en" ? "is-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}><span className="language-long">ENGLISH</span><span className="language-short">EN</span></button>
          </div>
          <a className="topbar-link" href="#contact">{language === "es" ? "INICIAR PROYECTO" : "START A PROJECT"} ↗</a>
          <button className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={menuOpen} aria-label={language === "es" ? "Abrir o cerrar navegación" : "Open or close navigation"} onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
        </div>
      </header>

      <aside className="document-progress" aria-label={language === "es" ? "Progreso de la experiencia" : "Experience progress"}>
        <span className="document-progress-value" ref={progressRef}>00%</span>
        <span className="document-progress-track"><span ref={progressLineRef} /></span>
        <span className="document-progress-label">{language === "es" ? "DESPLAZA / CREA" : "SCROLL / BUILD"}</span>
      </aside>

      <section ref={entryRef} className="entry-scene" aria-labelledby="entry-title">
        <div className="entry-stage scene-stage technical-grid">
          <div className="entry-meta meta-top"><i /> AHP / 001</div>
          <div className="entry-meta meta-left">{language === "es" ? "DISEÑO + DESARROLLO WEB" : "WEB DESIGN + DEVELOPMENT"}</div>
          <div className="entry-meta meta-right">LIMA / PE · {language === "es" ? "TRABAJAMOS A NIVEL INTERNACIONAL" : "AVAILABLE WORLDWIDE"}</div>
          <div className="entry-meta meta-bottom">{language === "es" ? "DESPLAZA PARA EXPLORAR" : "SCROLL TO EXPLORE"} ↓</div>

          <div className="entry-intro">
            <p><i /> {language === "es" ? "ESTRATEGIA · DISEÑO · DESARROLLO" : "STRATEGY · DESIGN · DEVELOPMENT"}</p>
            <h1 id="entry-title" className="entry-title">
              {language === "es" ? <>WEBS CREADAS PARA<br />MOVER <em>NEGOCIOS.</em></> : <>WEBSITES BUILT TO<br />MOVE <em>BUSINESS.</em></>}
            </h1>
            <div className="entry-intro-bottom">
              <p>{language === "es" ? "Convertimos una idea de negocio en una experiencia digital clara, distintiva y lista para producir resultados." : "We turn a business idea into a clear, distinctive digital experience built to produce results."}</p>
              <div className="entry-pills" aria-hidden="true"><span>01 / {language === "es" ? "SEÑAL" : "SIGNAL"}</span><span>02 / {language === "es" ? "SISTEMA" : "SYSTEM"}</span><span>03 / {language === "es" ? "EN VIVO" : "LIVE"}</span></div>
            </div>
          </div>

          <div className="entry-world" aria-hidden="true">
            <span className="world-orbit orbit-a" /><span className="world-orbit orbit-b" /><span className="world-orbit orbit-c" />
            <span className="world-core"><i /><i /><i /></span>
            <span className="world-node node-a" /><span className="world-node node-b" /><span className="world-node node-c" />
          </div>

          <div className="entry-vanta" aria-hidden="true">
            <Image src={currentProject.entryImage} alt="" fill sizes="100vw" priority />
            <span className="entry-vanta-shade" />
            <span className="entry-scan" />
          </div>

          <div className="entry-project-meta">
            <span>{language === "es" ? "PROYECTO" : "PROJECT"} / {currentProject.number}</span>
            <strong>{currentProject.name}</strong>
            <span>{language === "es" ? currentProject.typeEs : currentProject.typeEn}</span>
            <nav className="project-switcher entry-project-switcher" aria-label={language === "es" ? "Elegir proyecto" : "Choose project"}>
              {(Object.keys(portfolioProjects) as ProjectKey[]).map((projectKey) => {
                const project = portfolioProjects[projectKey];
                return <button key={projectKey} type="button" className={selectedProject === projectKey ? "is-active" : ""} onMouseEnter={() => setSelectedProject(projectKey)} onFocus={() => setSelectedProject(projectKey)} onClick={() => setSelectedProject(projectKey)}><b>{project.number}</b><span>{project.name}</span></button>;
              })}
            </nav>
            <a className="entry-open-link" href={currentProject.demoUrl} target="_blank" rel="noreferrer">
              {language === "es" ? "ABRIR SITIO" : "OPEN WEBSITE"}<b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>
      </section>

      <section className="studio-evidence technical-grid" id="studio" aria-labelledby="evidence-title" data-grid-label={language === "es" ? "SEÑAL / DIRECCIÓN / SISTEMA" : "SIGNAL / DIRECTION / SYSTEM"}>
        <div className="evidence-heading">
          <p>00 / {language === "es" ? "ANTES DE LA INTERFAZ" : "BEFORE THE INTERFACE"}</p>
          <h2 id="evidence-title">{language === "es" ? <>LA CLARIDAD ES<br />PARTE DEL <em>DISEÑO.</em></> : <>CLARITY IS PART<br />OF THE <em>DESIGN.</em></>}</h2>
          <span>{language === "es" ? "No comenzamos decorando páginas. Primero definimos qué debe comprender, sentir y hacer la persona que llega." : "We do not begin by decorating pages. First we define what a visitor must understand, feel and do."}</span>
        </div>
        <div className="evidence-metrics" aria-label={language === "es" ? "Principios de trabajo" : "Working principles"}>
          {[
            ["01", language === "es" ? "DIRECCIÓN" : "DIRECTION", language === "es" ? "Un objetivo que organiza cada decisión." : "One objective organizing every decision."],
            ["02", language === "es" ? "IDENTIDAD" : "IDENTITY", language === "es" ? "Un lenguaje visual que no parece plantilla." : "A visual language that never feels templated."],
            ["03", language === "es" ? "RECORRIDO" : "JOURNEY", language === "es" ? "Una estructura que reduce la duda." : "A structure that removes uncertainty."],
            ["04", language === "es" ? "RESULTADO" : "OUTCOME", language === "es" ? "Una web con un trabajo concreto." : "A website with a concrete job."],
          ].map(([number, title, copy]) => <article key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></article>)}
        </div>
        <div className="evidence-questions">
          <span>{language === "es" ? "EL SISTEMA RESPONDE" : "THE SYSTEM ANSWERS"}</span>
          <div>{[
            language === "es" ? "¿Para quién es?" : "Who is it for?",
            language === "es" ? "¿Qué debe comunicar?" : "What must it communicate?",
            language === "es" ? "¿Por qué deberían confiar?" : "Why should they trust it?",
            language === "es" ? "¿Qué acción importa?" : "Which action matters?",
            language === "es" ? "¿Cómo debe crecer?" : "How should it grow?",
          ].map((question, index) => <p key={question}><b>{String(index + 1).padStart(2, "0")}</b>{question}<i>↗</i></p>)}</div>
        </div>
      </section>

      <section ref={vantaRef} className="vanta-scene" id="work" aria-labelledby="vanta-title">
        <div className="vanta-stage scene-stage technical-grid">
          <div className="walk-micro walk-index">{language === "es" ? "PROYECTO" : "PROJECT"} / {currentProject.number}</div>
          <div className="walk-micro walk-size">{language === "es" ? "ESCRITORIO" : "DESKTOP"} / 1440 · {language === "es" ? "MÓVIL" : "MOBILE"} / 390</div>
          <div className="walk-micro walk-live">{language === "es" ? "EN VIVO / ADAPTABLE" : "LIVE / RESPONSIVE"}</div>

          <div className="vanta-state-copy-wrap">
            <nav className="project-switcher walkthrough-project-switcher" aria-label={language === "es" ? "Cambiar proyecto mostrado" : "Change displayed project"}>
              {(Object.keys(portfolioProjects) as ProjectKey[]).map((projectKey) => {
                const project = portfolioProjects[projectKey];
                return <button key={projectKey} type="button" className={selectedProject === projectKey ? "is-active" : ""} onMouseEnter={() => setSelectedProject(projectKey)} onFocus={() => setSelectedProject(projectKey)} onClick={() => setSelectedProject(projectKey)}><b>{project.number}</b><span>{project.name}</span></button>;
              })}
            </nav>
            <p className="vanta-eyebrow">{language === "es" ? "PROYECTO ACTIVO / MUCHOS ESTADOS" : "ACTIVE PROJECT / MANY STATES"}</p>
            <h2 id="vanta-title">{currentProject.lines.map((line, index) => <span key={line}>{line}{index < currentProject.lines.length - 1 && <br />}</span>)}</h2>
            {currentProject.states.map((state, index) => (
              <div className={`vanta-state-copy vanta-state-copy-${index}`} key={state.label}>
                <span>{language === "es" ? "ESTADO" : "STATE"} / {state.number}</span>
                <strong>{language === "es" ? state.labelEs : state.label}</strong>
                <p>{language === "es" ? state.noteEs : state.note}</p>
              </div>
            ))}
          </div>

          <div className="walk-stage" aria-label={language === "es" ? `Recorrido adaptable del sitio ${currentProject.name}` : `${currentProject.name} responsive website walkthrough`}>
            <span className="walk-grid-line walk-grid-line-a" />
            <div className="walk-desktop">
              {currentProject.desktopScreens.map((src, index) => (
                <Image
                  className={`desktop-screen desktop-screen-${index}`}
                  key={`desktop-${index}`}
                  src={src}
                  alt={index === 0 ? (language === "es" ? `Sitio web de escritorio de ${currentProject.name}` : `${currentProject.name} desktop website`) : ""}
                  fill
                  sizes="(max-width: 760px) 90vw, 70vw"
                  priority={index === 0}
                />
              ))}
            </div>
            <div className="walk-phone">
              <span className="phone-speaker" />
              {currentProject.mobileScreens.map((src, index) => (
                <Image
                  className={`mobile-screen mobile-screen-${index}`}
                  key={`mobile-${index}`}
                  src={src}
                  alt={index === 0 ? (language === "es" ? `Sitio web móvil de ${currentProject.name}` : `${currentProject.name} mobile website`) : ""}
                  fill
                  sizes="220px"
                />
              ))}
            </div>
            <div className={`gallery-shards gallery-shards-${selectedProject}`} aria-hidden="true">
              <span className="gallery-shard shard-a" style={{ backgroundImage: `url(${currentProject.shardImage})` }} />
              <span className="gallery-shard shard-b" style={{ backgroundImage: `url(${currentProject.shardImage})` }} />
              <span className="gallery-shard shard-c" style={{ backgroundImage: `url(${currentProject.shardImage})` }} />
            </div>
            <a className="walk-open-link" href={currentProject.demoUrl} target="_blank" rel="noreferrer">
              <span>{language === "es" ? "VER SITIO COMPLETO" : "VIEW FULL WEBSITE"}</span>
              <b aria-hidden="true">↗</b>
            </a>
          </div>

          <nav className="vanta-state-nav" aria-label={language === "es" ? `Estados del recorrido ${currentProject.name}` : `${currentProject.name} walkthrough states`}>
            {currentProject.states.map((state, index) => (
              <button type="button" className={`vanta-marker vanta-marker-${index}`} key={state.label} onClick={() => jumpToVantaState(index)} aria-label={`${language === "es" ? "Ver estado" : "View state"} ${state.number}: ${language === "es" ? state.labelEs : state.label}`}>
                <b>{state.number}</b>{language === "es" ? state.labelEs : state.label}
              </button>
            ))}
          </nav>

          <div className="vanta-bridge" aria-hidden="true">
            <span className="bridge-line line-a" />
            <span className="bridge-line line-b" />
            <span className="bridge-line line-c" />
            <p>{language === "es" ? "DEL PROYECTO / AL SISTEMA" : "FROM PROJECT / TO SYSTEM"}</p>
            <div className="bridge-title">
              <span className="bridge-word bridge-word-old">{language === "es" ? "UNA WEB NO ES" : "A WEBSITE IS NOT"}</span>
              <span className="bridge-word bridge-word-old">{language === "es" ? "SOLO UNA PÁGINA." : "JUST A PAGE."}</span>
              <span className="bridge-word bridge-word-new">{language === "es" ? <>ES LA PRIMERA<br />CONVERSACIÓN.</> : <>IT IS THE FIRST<br />CONVERSATION.</>}</span>
            </div>
            <span className="bridge-seed">AHP</span>
          </div>
        </div>
      </section>

      <section ref={buildRef} className="build-scene" aria-labelledby="build-title">
        <div className="build-stage scene-stage technical-grid">
          <span className="build-scene-progress" aria-hidden="true" />
          <div className="build-heading">
            <p>{language === "es" ? "EL SISTEMA DE CREACIÓN AHPixel" : "THE AHPixel BUILD SYSTEM"}</p>
            <h2 id="build-title">{language === "es" ? <>DE LA SEÑAL<br />A UNA <em>WEB REAL.</em></> : <>FROM SIGNAL<br />TO <em>LIVE WEBSITE.</em></>}</h2>
          </div>

          <div className="system-legend" aria-hidden="true">
            <span><b>{language === "es" ? "ESTRATEGIA" : "STRATEGY"}</b> {language === "es" ? "define la dirección" : "defines the direction"}</span>
            <span><b>{language === "es" ? "DISEÑO" : "DESIGN"}</b> {language === "es" ? "da forma a la experiencia" : "shapes the experience"}</span>
            <span><b>{language === "es" ? "CÓDIGO" : "CODE"}</b> {language === "es" ? "lo hace real" : "makes it real"}</span>
          </div>

          <div className="build-beat" aria-hidden="true">
            <span>{language === "es" ? "PROCESO /" : "PIPELINE /"}</span><strong ref={buildBeatRef}>{language === "es" ? "SEÑAL" : "SIGNAL"}</strong>
          </div>

          <div className="system-canvas-wrap" aria-label={language === "es" ? "Visualización del sistema de creación web AHPixel" : "Evolving AHPixel website build system visualization"}>
            <BuildSystemCanvas ref={buildCanvasRef} />
            <span className="system-vignette" />
          </div>

          <div className="build-copy-wrap">
            {buildStates.map((state, index) => (
              <article className={`build-copy build-copy-${index}`} key={state.label}>
                <span>{language === "es" ? "FASE" : "BUILD STATE"} / {state.number}</span>
                <small>{language === "es" ? state.kickerEs : state.kicker}</small>
                <h3>{language === "es" ? state.labelEs : state.label}</h3>
                <p>{language === "es" ? state.copyEs : state.copy}</p>
                <div className="build-copy-chips" aria-hidden="true">
                  {(language === "es" ? state.chipsEs : state.chips).map((chip) => <span key={chip}>{chip}</span>)}
                </div>
              </article>
            ))}
          </div>

          <nav className="system-modes" aria-label={language === "es" ? "Capas del sistema" : "Build system layers"}>
            <span className="system-mode system-mode-0">{language === "es" ? "ESTRATEGIA" : "STRATEGY"} <i /></span>
            <span className="system-mode system-mode-1">{language === "es" ? "EXPERIENCIA" : "EXPERIENCE"} <i /></span>
            <span className="system-mode system-mode-2">{language === "es" ? "PUBLICACIÓN" : "RELEASE"} <i /></span>
          </nav>

          <nav className="build-steps" aria-label={language === "es" ? "Fases del sistema de creación" : "Build system states"}>
            {buildStates.map((state, index) => (
              <span className={`build-step build-step-${index}`} key={state.label}>
                <b>{state.number}</b><i>{language === "es" ? state.labelEs : state.label}</i>
              </span>
            ))}
          </nav>

          <div className="build-track" aria-hidden="true"><span className="system-track-fill" /></div>
          <div className="build-status">{language === "es" ? "SISTEMA / ACTIVO" : "SYSTEM / ACTIVE"}</div>
          <div className="build-counter"><span ref={buildStepRef}>00 / 11 · {language === "es" ? "DESPLAZA" : "SCROLL"}</span></div>
        </div>
      </section>

      <WebsiteTypes language={language} />
      <StudioContact language={language} />
    </main>
  );
}
