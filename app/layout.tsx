import type { Metadata, Viewport } from "next";
import { SiteShell } from "./components/SiteShell";
import { siteConfig } from "./data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: "AHPixel Studio | Web Design & Development", template: "%s" },
  description: "AHPixel Studio designs and builds modern, fast and responsive websites for businesses and professionals.",
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
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#07090D" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>;
}

