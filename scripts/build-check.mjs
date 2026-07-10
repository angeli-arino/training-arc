import { access, readdir, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "vite.config.ts",
  "src/main.tsx",
  "src/App.tsx",
  "src/features/body-scan/bodyScanLogic.ts",
  "src/styles/tokens.css",
  "dist/index.html",
  "dist/manifest.webmanifest",
  "dist/icons/training-arc-192.png",
  "dist/icons/training-arc-512.png",
];

await Promise.all(requiredFiles.map((file) => access(file)));

const [index, manifest, bodyScanLogic, tokens] = await Promise.all([
  readFile("dist/index.html", "utf8"),
  readFile("dist/manifest.webmanifest", "utf8"),
  readFile("src/features/body-scan/bodyScanLogic.ts", "utf8"),
  readFile("src/styles/tokens.css", "utf8"),
]);

if (/slider/i.test(bodyScanLogic) || /type=["']range["']/.test(index)) {
  throw new Error("Body Scan must not use sliders or range inputs.");
}

if (tokens.includes("#6B3FA0") || tokens.includes("#4B2A68")) {
  throw new Error("Purple/plum must not become a dominant palette colour.");
}

if (!index.includes("/training-arc/assets/") || !index.includes("apple-mobile-web-app-capable")) {
  throw new Error("Vite build output is missing Pages-safe assets or mobile metadata.");
}

if (index.includes("/training-arc/training-arc/")) {
  throw new Error("Vite build output has a double-prefixed GitHub Pages path.");
}

const parsedManifest = JSON.parse(manifest);
if (parsedManifest.start_url !== "/training-arc/" || parsedManifest.scope !== "/training-arc/") {
  throw new Error("Manifest start_url and scope must stay scoped to the GitHub Pages project path.");
}

if (!parsedManifest.icons.some((icon) => icon.sizes === "192x192" && icon.type === "image/png")) {
  throw new Error("Manifest needs a 192x192 PNG icon for install support.");
}

if (!parsedManifest.icons.some((icon) => icon.sizes === "512x512" && icon.type === "image/png")) {
  throw new Error("Manifest needs a 512x512 PNG icon for install support.");
}

const distFiles = await readdir("dist");
if (!distFiles.some((file) => /^sw.*\.js$/.test(file))) {
  throw new Error("Vite PWA did not generate a service worker.");
}

console.log("Build check passed: Vite output, PWA metadata, service worker, and palette guard passed.");
