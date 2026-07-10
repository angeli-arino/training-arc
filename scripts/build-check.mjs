import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "src/main.js",
  "src/bodyScanLogic.js",
  "src/styles.css",
];

await Promise.all(requiredFiles.map((file) => access(file)));

const [main, styles] = await Promise.all([
  readFile("src/main.js", "utf8"),
  readFile("src/styles.css", "utf8"),
]);

if (/slider/i.test(main) || /type=["']range["']/.test(main)) {
  throw new Error("Body Scan must not use sliders or range inputs.");
}

if (styles.includes("#6B3FA0") || styles.includes("#4B2A68")) {
  throw new Error("Purple/plum must not become a dominant palette colour.");
}

console.log("Build check passed: files exist, no sliders found, palette guard passed.");
