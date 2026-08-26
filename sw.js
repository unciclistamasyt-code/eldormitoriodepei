const CACHE = 'app-v40';
// Desde v40: los videos de menu.html y el audio de golf.html ya NO viven en
// este repo — se movieron a un bucket público de Supabase Storage (más
// liviano, sin el límite de 30MB para entregar el zip completo del sitio).
// Por eso ya no aparecen en este precache: se cachean solos, la primera vez
// que se piden, gracias a la regla genérica de abajo (ver comentario sobre
// respuestas "opaque" en el handler de fetch).
const ASSETS = [
  './',
  './index.html',
  './ruleta.html',
  './checklist.html',
  './pomodoro.html',
  './ropa.html',
  './golf.html',
  './menu.html',
  './salud.html',
  './style.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (e.request.headers.has('range')) {
    // Range requests (used by <video>/<audio> for seeking/streaming) must hit
    // the network directly — serving a cached full-body response instead of a
    // real 206 Partial Content breaks media playback in Chrome/Safari.
    e.respondWith(fetch(e.request));
    return;
  }
  if (new URL(e.request.url).pathname.indexOf('/data/') !== -1) {
    // Datos de salud (health.json): cambian todos los días y salud.html ya
    // pide con cache:'no-store', pero por si acaso — red primero, con la
    // última copia cacheada como respaldo si no hay conexión.
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request)
        .then((res) => {
          // res.status === 200: recurso normal del mismo origen (GitHub Pages).
          // res.type === 'opaque': recurso de otro origen (ej. Supabase
          // Storage) pedido sin CORS explícito por <video>/<source>/<audio>
          // — el navegador no deja leer su status real (siempre da 0), pero
          // sí se puede guardar en caché igual para que funcione offline.
          if (res && (res.status === 200 || res.type === 'opaque')) {
            const clone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
