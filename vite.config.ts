import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "next/image": fileURLToPath(new URL("./src/shared/NextImage.tsx", import.meta.url)),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
          if (id.includes("/src/ahpixel-v2/")) return "ahpixel-v2";
          if (id.includes("/src/demos/vanta/")) return "demo-vanta";
          if (id.includes("/src/demos/lumen/")) return "demo-lumen";
          if (id.includes("/src/ahpixel/")) return "ahpixel";
        },
      },
    },
  },
});
