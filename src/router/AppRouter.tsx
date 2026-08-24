import { lazy, Suspense, useEffect, useState } from "react";
import "../ahpixel-commercial/commercial.css";
import CommercialHome from "../ahpixel-commercial/CommercialHome";

const VantaRoute = lazy(() => import("../demos/vanta/VantaRoute"));
const LumenRoute = lazy(() => import("../demos/lumen/LumenRoute"));

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
      : <CommercialHome />;

  return (
    <Suspense fallback={<div className="route-loader" role="status"><i /><span>AHPixel Studio</span><small>Cargando experiencia</small></div>}>
      {content}
    </Suspense>
  );
}
