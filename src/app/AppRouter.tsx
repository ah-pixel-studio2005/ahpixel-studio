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
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
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
