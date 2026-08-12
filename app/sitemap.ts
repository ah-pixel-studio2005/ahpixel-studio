import type { MetadataRoute } from "next";
import { projects, siteConfig } from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/services", "/about", "/contact", "/es", "/es/work", "/es/services", "/es/about", "/es/contact"];
  return [
    ...routes.map(route => ({ url: `${siteConfig.siteUrl}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "monthly" as const : "yearly" as const, priority: route === "" ? 1 : .8 })),
    ...projects.flatMap(project => ["", "/es"].map(prefix => ({ url: `${siteConfig.siteUrl}${prefix}/work/${project.slug}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: .9 }))),
  ];
}

