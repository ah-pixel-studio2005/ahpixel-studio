import { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { PageHero, SectionHeader } from "../components/ui";
import { siteConfig } from "../data/site";
import { Arrow } from "../components/SiteShell";

export const metadata: Metadata = { title: "Start a Project | AHPixel Studio", description: "Tell AHPixel Studio about your website project, business goals and what you need.", alternates: { canonical: "/contact" } };

export default function ContactPage(){return <main><PageHero eyebrow="Contact / Project inquiry" title={<>Have a project<br /><em>in mind?</em></>} intro="Tell us about your business and what you need. We'll review the details and get back to you."/><section className="contact-section section-space light-section"><SectionHeader index="01" label="Project details" dark/><div className="contact-layout"><div className="contact-aside" data-reveal><h2>Good projects start<br />with a clear <em>conversation.</em></h2><p>You do not need a finished brief. Share what you know, what the website needs to achieve and where the current experience falls short.</p><div className="direct-links"><div><span>Email</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}<Arrow/></a></div><div><span>Instagram</span><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">{siteConfig.instagramLabel}<Arrow/></a></div><div><span>WhatsApp</span><a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Open chat<Arrow/></a></div></div></div><ContactForm/></div></section></main>}

