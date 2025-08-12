import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg"],
      manifest: {
        name: "English Learning App",
        short_name: "EnglishApp",
        description:
          "A React + Vite + Tailwind learning app with dashboard and products.",
        theme_color: "#0b0f1a",
        background_color: "#0b0f1a",
        display: "standalone",
        start_url: "/",
        icons: [{ src: "/vite.svg", sizes: "192x192", type: "image/svg+xml" }],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,txt}"],
        navigateFallback: "/index.html",
      },
    }),
  ],
});
