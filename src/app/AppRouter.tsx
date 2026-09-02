import { useEffect, useState } from "react";
import "@/features/studio/styles/studio.css";
import StudioSite from "@/features/studio/pages/StudioSite";
import VantaRoute from "@/features/demos/vanta/VantaRoute";
import LumenRoute from "@/features/demos/lumen/LumenRoute";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";

function currentPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function AppRouter() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const syncPath = () => setPath(currentPath());
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname && url.hash) return;
      event.preventDefault();
      window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      syncPath();
    };
    window.addEventListener("popstate", syncPath);
    document.addEventListener("click", navigate);
    return () => { window.removeEventListener("popstate", syncPath); document.removeEventListener("click", navigate); };
  }, []);

  const content = path.startsWith("/demos/vanta")
    ? <VantaRoute path={path} />
    : path.startsWith("/demos/lumen")
      ? <LumenRoute path={path} />
      : <StudioSite path={path} />;

  return (
    <>
      {content}
      <FloatingWhatsApp />
    </>
  );
}
