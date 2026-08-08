export const siteConfig = {
  name: "AHPixel Studio",
  siteUrl: "https://ahpixel-studio.sites.openai.com",
  email: "hello@ahpixel.studio",
  instagramLabel: "@ahpixel.studio",
  instagramUrl: "https://www.instagram.com/ahpixel.studio/",
  whatsappUrl: "https://wa.me/51999999999",
  contactEndpoint: "",
};

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
    cover: "/projects/vanta/og.png",
    desktopImages: ["/projects/vanta/desktop-hero.png", "/projects/vanta/desktop-process.png"],
    mobileImages: ["/projects/vanta/mobile-hero.png", "/projects/vanta/mobile-detail.png"],
    accent: "#C6A15B",
    liveUrl: "https://vanta-barber-club-concept.sites.openai.com",
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

