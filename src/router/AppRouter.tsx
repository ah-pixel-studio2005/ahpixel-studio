import { useEffect, useState } from "react";
import "../ahpixel-commercial/commercial.css";
import CommercialHome from "../ahpixel-commercial/CommercialHome";
import VantaRoute from "../demos/vanta/VantaRoute";
import LumenRoute from "../demos/lumen/LumenRoute";

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

  return content;
}
