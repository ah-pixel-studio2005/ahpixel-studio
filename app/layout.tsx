import type { Metadata, Viewport } from "next";
import { SiteShell } from "./components/SiteShell";
import { siteConfig } from "./data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "AHPixel Studio | Web Design & Development", template: "%s" },
  description: "AHPixel Studio designs and builds modern, fast and responsive websites for businesses and professionals.",
  alternates: { canonical: "/", languages: { "en-US": "/", "es-PE": "/es" } },
  keywords: ["web design", "web development", "responsive websites", "business websites", "landing pages", "AHPixel Studio"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AHPixel Studio",
    title: "AHPixel Studio | Web Design & Development",
    description: "Modern, fast and responsive websites for businesses and professionals.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AHPixel Studio — Web Design and Development" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AHPixel Studio | Web Design & Development",
    description: "Modern, fast and responsive websites for businesses and professionals.",
    images: ["/og.png"],
  },
  icons: { icon: "/ahpixel-logo.png", shortcut: "/ahpixel-logo.png", apple: "/ahpixel-logo.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#07090D" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeBoot = `(function(){try{var m=localStorage.getItem('ahpixel-theme')||'schedule';var h=new Date().getHours();var t=m==='schedule'?(h>=7&&h<19?'light':'dark'):m;document.documentElement.dataset.theme=t;document.documentElement.dataset.themeMode=m;document.documentElement.style.colorScheme=t}catch(e){}})()`;
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBoot }} /></head><body><SiteShell>{children}</SiteShell></body></html>;
}

