
import { Arrow } from "./SiteShell";

export function SectionHeader({ index, label, dark = false }: { index: string; label: string; dark?: boolean }) {
  return <div className={`section-kicker ${dark ? "on-light" : ""}`} data-reveal><span>{index}</span><b>{label}</b><i /></div>;
}

export function TextLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  if (external) return <a className="text-link" href={href} target="_blank" rel="noreferrer">{children}<Arrow /></a>;
  return <a className="text-link" href={href}>{children}<Arrow /></a>;
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid" aria-hidden="true" />
      <p className="eyebrow" data-reveal><span />{eyebrow}</p>
      <h1 data-reveal>{title}</h1>
      <p className="page-intro" data-reveal>{intro}</p>
      <div className="hero-coordinate" aria-hidden="true">X 0128 / Y 0768</div>
    </section>
  );
}

