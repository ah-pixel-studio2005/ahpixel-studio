import { ShadowSurface } from "@/components/shared/ShadowSurface";
import LumenApp from "./LumenApp";
import css from "./styles.css?inline";

const targets: Record<string, string | undefined> = {
  "/demos/lumen": undefined,
  "/demos/lumen/treatments": "#treatments",
  "/demos/lumen/about": "#studio",
  "/demos/lumen/team": "#team",
  "/demos/lumen/contact": "#visit",
};

export default function LumenRoute({ path }: { path: string }) {
  return <ShadowSurface css={css} initialTarget={targets[path]} title="LUMEN Dental Studio | AHPixel Studio Concept"><LumenApp /></ShadowSurface>;
}
