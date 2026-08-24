const CACHE = 'app-v34';
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
  './videos/fettuccine.webm',
  './videos/fettuccine.mp4',
  './img/fettuccine-poster.jpg',
  './videos/pizza.webm',
  './videos/pizza.mp4',
  './img/pizza-poster.jpg',
  './videos/ensalada.webm',
  './videos/ensalada.mp4',
  './img/ensalada-poster.jpg',
  './videos/hamburguesa.webm',
  './videos/hamburguesa.mp4',
  './img/hamburguesa-poster.jpg',
  './style.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './audio/n1m1.mp3',
  './audio/n1m2.mp3',
  './audio/n1m3.mp3',
  './audio/n1m4.mp3',
  './audio/n1m5.mp3',
  './audio/n1m6.mp3',
  './audio/n1m7.mp3',
  './audio/n1m8.mp3',
  './audio/n2m1.mp3',
  './audio/n2m2.mp3',
  './audio/n2m3.mp3',
  './audio/n2m4.mp3',
  './audio/n2m5.mp3',
  './audio/n2m6.mp3',
  './audio/n2m7.mp3',
  './audio/n2m8.mp3',
  './audio/n2m9.mp3',
  './audio/n3m1.mp3',
  './audio/n3m2.mp3',
  './audio/n3m3.mp3',
  './audio/n3m4.mp3',
  './audio/n4m1.mp3',
  './audio/n4m2.mp3',
  './audio/n4m3.mp3',
  './audio/n4m4.mp3',
  './audio/n4m5.mp3',
  './audio/n4m6.mp3',
  './audio/n5m1.mp3',
  './audio/n5m2.mp3',
  './audio/n5m3.mp3',
  './audio/n5m4.mp3',
  './audio/n5m5.mp3',
  './audio/n5m6.mp3',
  './audio/n5m7.mp3'
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
          if (res && res.status === 200) {
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
