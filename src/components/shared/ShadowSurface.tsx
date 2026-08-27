import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function ShadowSurface({ css, children, initialTarget, title }: { css: string; children: ReactNode; initialTarget?: string; title: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!host.current) return;
    const shadow = host.current.shadowRoot ?? host.current.attachShadow({ mode: "open" });
    shadow.replaceChildren();
    const style = document.createElement("style");
    style.textContent = css.replace(/:root/g, ":host").replace(/\bhtml\s*\{/g, ":host{").replace(/\bbody\s*\{/g, ".demo-document{");
    const root = document.createElement("div");
    root.className = "demo-document";
    root.style.minHeight = "100vh";
    shadow.append(style, root);
    const onClick = (event: Event) => {
      const anchor = (event.target as Element | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const target = shadow.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    shadow.addEventListener("click", onClick);
    setMount(root);
    return () => shadow.removeEventListener("click", onClick);
  }, [css]);

  useEffect(() => {
    document.title = title;
    if (!mount || !initialTarget) return;
    const scrollToTarget = () => {
      const target = mount.querySelector<HTMLElement>(initialTarget);
      if (!target) return;
      const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - margin, behavior: "auto" });
    };
    const frame = requestAnimationFrame(scrollToTarget);
    const retries = [120, 420, 900, 1600, 2600].map(delay => window.setTimeout(scrollToTarget, delay));
    const mutations = new MutationObserver(scrollToTarget);
    const resizes = new ResizeObserver(scrollToTarget);
    mutations.observe(mount, { childList: true, subtree: true });
    resizes.observe(mount);
    const stopObservers = window.setTimeout(() => {
      mutations.disconnect();
      resizes.disconnect();
    }, 3200);
    return () => {
      cancelAnimationFrame(frame);
      retries.forEach(window.clearTimeout);
      window.clearTimeout(stopObservers);
      mutations.disconnect();
      resizes.disconnect();
    };
  }, [initialTarget, mount, title]);

  return <div ref={host} className="isolated-demo-host">{mount && createPortal(children, mount)}</div>;
}
