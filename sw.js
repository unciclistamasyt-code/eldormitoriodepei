const CACHE = 'app-v24';
const ASSETS = [
  './',
  './index.html',
  './ruleta.html',
  './checklist.html',
  './pomodoro.html',
  './ropa.html',
  './golf.html',
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
