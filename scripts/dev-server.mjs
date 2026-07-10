import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || "127.0.0.1";
const root = process.cwd();

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
};

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", `http://localhost:${port}`);
  const requestedPath = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, requestedPath === "/" ? "index.html" : requestedPath);

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, "index.html");
  }

  response.setHeader("Content-Type", contentTypes[extname(filePath)] || "text/plain; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  createReadStream(filePath)
    .on("error", () => {
      response.statusCode = 500;
      response.end("Training Arc server could not read that file.");
    })
    .pipe(response);
});

server.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Training Arc dev server: http://${host}:${port}`);
});
