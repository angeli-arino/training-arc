import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "manifest.webmanifest",
  "sw.js",
  "icons/training-arc-icon.svg",
  "icons/training-arc-maskable.svg",
  "src/main.js",
  "src/bodyScanLogic.js",
  "src/styles.css",
];

await Promise.all(requiredFiles.map((file) => access(file)));

const [index, manifest, serviceWorker, main, styles] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("manifest.webmanifest", "utf8"),
  readFile("sw.js", "utf8"),
  readFile("src/main.js", "utf8"),
  readFile("src/styles.css", "utf8"),
]);

if (/slider/i.test(main) || /type=["']range["']/.test(main)) {
  throw new Error("Body Scan must not use sliders or range inputs.");
}

if (styles.includes("#6B3FA0") || styles.includes("#4B2A68")) {
  throw new Error("Purple/plum must not become a dominant palette colour.");
}

if (!index.includes('rel="manifest"') || !index.includes("apple-mobile-web-app-capable")) {
  throw new Error("PWA metadata is missing from index.html.");
}

const parsedManifest = JSON.parse(manifest);
if (parsedManifest.start_url !== "." || parsedManifest.scope !== ".") {
  throw new Error("Manifest start_url and scope must stay relative for GitHub Pages.");
}

if (!main.includes('serviceWorker') || !main.includes('./sw.js')) {
  throw new Error("Service worker registration is missing or not relative.");
}

if (!serviceWorker.includes('CACHE_ASSETS') || serviceWorker.includes('"/src/')) {
  throw new Error("Service worker cache list must use project-relative asset paths.");
}

console.log("Build check passed: files exist, PWA metadata present, no sliders found, palette guard passed.");
