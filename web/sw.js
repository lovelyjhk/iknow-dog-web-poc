const CACHE_NAME = "iknow-dog-web-poc-v10";
const ASSETS = [
  "./",
  "./index.html",
  "./admin.html",
  "./privacy.html",
  "./terms.html",
  "./styles.css",
  "./app.js",
  "./triage-model.js",
  "./1.png",
  "./2.png",
  "./3.png",
  "./assets/illustrations/onboarding-dog-jump.svg",
  "./assets/illustrations/login-petting.svg",
  "./assets/illustrations/signup-doggie.svg",
  "./sample-nutrition-label.svg",
  "./manifest.webmanifest",
  "./icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match("./index.html"));
    }),
  );
});
