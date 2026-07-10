const CACHE_NAME = "training-arc-pwa-v1";
const CACHE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/training-arc-192.png",
  "./icons/training-arc-512.png",
  "./icons/training-arc-icon.svg",
  "./icons/training-arc-maskable.svg",
  "./src/main.js",
  "./src/bodyScanLogic.js",
  "./src/styles.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === "opaque") {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
