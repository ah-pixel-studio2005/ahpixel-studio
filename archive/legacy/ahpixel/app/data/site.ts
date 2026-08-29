const productionUrl = "https://ahpixel-studio.vercel.app";
const whatsappNumber = "51930978999";
const instagramUrl = "https://instagram.com/ahpixel.studio";
const directWhatsappMessage = "Hola AHPixel Studio, me gustaría consultar sobre una página web.";

export const siteConfig = {
  name: "AHPixel Studio",
  siteUrl: productionUrl,
  email: "ahpixel.studio@gmail.com",
  phoneDisplay: "+51 930 978 999",
  whatsappNumber,
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(directWhatsappMessage)}`,
  instagramLabel: "@ahpixel.studio",
  instagramUrl,
  location: "Lima, Peru",
  availability: "Working worldwide",
  contactEndpoint: "/api/inquiries",
} as const;

export const websiteTypes = [
  { value: "landing", label: "Landing Page", labelEs: "Landing Page" },
  { value: "business", label: "Business Website", labelEs: "Sitio Web Empresarial" },
  { value: "professional", label: "Professional Website", labelEs: "Sitio Web Profesional" },
  { value: "redesign", label: "Website Redesign", labelEs: "Rediseño Web" },
] as const;

export const businessTypes = [
  { value: "clinic", label: "Clinic", labelEs: "Clínica" },
  { value: "business", label: "Local Business", labelEs: "Negocio local" },
  { value: "professional", label: "Professional", labelEs: "Profesional independiente" },
  { value: "other", label: "Other", labelEs: "Otro" },
] as const;

export const projectGoals = [
  { value: "inquiries", label: "Get More Inquiries", labelEs: "Conseguir más consultas" },
  { value: "credibility", label: "Build Credibility", labelEs: "Generar confianza" },
  { value: "booking", label: "Increase Bookings", labelEs: "Aumentar reservas" },
  { value: "modernize", label: "Modernize The Brand", labelEs: "Modernizar la marca" },
] as const;

export const budgetOptions = [
  { value: "up-to-150", label: "Up to S/150", labelEs: "Hasta S/150" },
  { value: "150-250", label: "S/150 – S/250", labelEs: "S/150 – S/250" },
  { value: "250-400", label: "S/250 – S/400", labelEs: "S/250 – S/400" },
  { value: "not-sure", label: "Not sure yet", labelEs: "Aún no estoy seguro" },
] as const;

export type Project = {
  slug: string;
  title: string;
  number: string;
  year: string;
  industry: string;
  projectType: string;
  category: string;
  services: string[];
  description: string;
  cover: string;
  desktopImages: string[];
  mobileImages: string[];
  accent: string;
  liveUrl: string;
  conceptProject: boolean;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "vanta-barber-club",
    title: "Vanta Barber Club",
    number: "01",
    year: "2026",
    industry: "Barbershop / Grooming",
    projectType: "Concept Website",
    category: "Web Design / Frontend / Concept Project",
    services: ["Web Design", "Responsive Design", "Frontend Development"],
    description: "A premium barbershop concept focused on strong typography, cinematic imagery and a refined booking experience.",
    cover: "/projects/vanta/og.webp",
    desktopImages: ["/projects/vanta/desktop-hero.png", "/projects/vanta/desktop-process.png"],
    mobileImages: ["/projects/vanta/mobile-hero.png", "/projects/vanta/mobile-detail.png"],
    accent: "#C6A15B",
    liveUrl: "/demos/vanta",
    conceptProject: true,
    featured: true,
  },
  {
    slug: "lumen-dental-studio",
    title: "Lumen Dental Studio",
    number: "02",
    year: "2026",
    industry: "Dental / Healthcare",
    projectType: "Concept Website",
    category: "Web Design / Frontend / Concept Project",
    services: ["Web Design", "Responsive Design", "Frontend Development"],
    description: "A modern dental studio concept focused on trust, clarity and a calm digital patient experience.",
    cover: "/projects/lumen/desktop-hero.webp",
    desktopImages: ["/projects/lumen/desktop-hero.webp", "/projects/lumen/desktop-treatments.webp"],
    mobileImages: ["/projects/lumen/mobile-hero.webp", "/projects/lumen/mobile-treatments.webp"],
    accent: "#79B9AE",
    liveUrl: "/demos/lumen",
    conceptProject: true,
    featured: true,
  },
];

export const serviceSummaries = [
  { number: "01", title: "Landing Pages", text: "Focused websites built to convert visitors into inquiries and customers." },
  { number: "02", title: "Business Websites", text: "Professional multi-page websites designed to strengthen a company's digital presence." },
  { number: "03", title: "Professional Websites", text: "Web experiences for consultants, lawyers, clinics, creatives and independent professionals." },
  { number: "04", title: "Website Redesigns", text: "Modern redesigns for outdated websites that need better visuals, structure and usability." },
];

export function createWhatsappFollowUp(name: string, websiteType: string) {
  const message = `Hola AHPixel Studio 👋\nAcabo de enviar una consulta desde su página web.\n\nMi nombre es ${name}.\nEstoy interesado en: ${websiteType}.`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
