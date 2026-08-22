import { ShadowSurface } from "../../shared/ShadowSurface";
import VantaApp from "./VantaApp";
import css from "./styles.css?inline";

const targets: Record<string, string | undefined> = {
  "/demos/vanta": undefined,
  "/demos/vanta/services": "#services",
  "/demos/vanta/about": "#about",
  "/demos/vanta/gallery": "#gallery",
  "/demos/vanta/contact": "#contact",
};

export default function VantaRoute({ path }: { path: string }) {
  return <ShadowSurface css={css} initialTarget={targets[path]} title="VANTA Barber Club | AHPixel Studio Concept"><VantaApp /></ShadowSurface>;
}
