import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/training-arc/",
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: [
        "icons/training-arc-icon.svg",
        "icons/training-arc-maskable.svg",
        "icons/training-arc-192.png",
        "icons/training-arc-512.png"
      ],
      manifest: {
        name: "Training Arc",
        short_name: "Training Arc",
        description:
          "A soft personal fitness companion for choosing Slay Day, Modify the Quest, Recovery Episode, or Peace Mode.",
        start_url: "/training-arc/",
        scope: "/training-arc/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#FFF7F2",
        theme_color: "#F86F9B",
        categories: ["health", "fitness", "lifestyle"],
        icons: [
          {
            src: "icons/training-arc-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "icons/training-arc-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/training-arc-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "icons/training-arc-maskable.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,webmanifest}"],
        navigateFallback: "/training-arc/index.html"
      },
      devOptions: {
        enabled: false
      }
    })
  ]
});
