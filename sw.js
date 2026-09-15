const CACHE = 'app-v48';
// v48: app nueva, ski.html — curso completo de esquí, de principiante a
// avanzado más un nivel de equipamiento/venta técnica (36 módulos, sin
// selector de perfil, un solo usuario, Sebas). Mismo patrón que golf.html:
// el audio pregrabado (voz Leticia) vive en Supabase Storage, bucket
// ski-audio, no en este repo — se cachea solo la primera vez que se pide,
// igual que ya pasa con el audio de golf.html. Se agregó un noveno ícono
// en la pantalla de inicio para entrar a esta app.
// Desde v40: los videos de menu.html y el audio de golf.html ya NO viven en
// este repo — se movieron a un bucket público de Supabase Storage (más
// liviano, sin el límite de 30MB para entregar el zip completo del sitio).
// Por eso ya no aparecen en este precache: se cachean solos, la primera vez
// que se piden, gracias a la regla genérica de abajo (ver comentario sobre
// respuestas "opaque" en el handler de fetch).
// v41: ropa.html ahora puede sincronizar el clóset con Supabase (tabla
// closet_items + fotos en el mismo bucket site-media/closet/) — solo se
// activa cuando se pega la Publishable key real en el archivo; mientras
// tanto la app sigue funcionando 100% local, igual que siempre. Se sube de
// versión solo para que el navegador tome la copia nueva de ropa.html.
// v42: salud.html tiene un nuevo "coach" de preguntas libres (mismo patrón
// gratis basado en palabras clave que ya usa ropa.html, sin IA real ni
// costo) — no toca datos ni caché, solo sube de versión para que el
// navegador tome la copia nueva de salud.html.
// v43: "registro reciente" en salud.html ahora también muestra horas
// dormidas, kcal comidas, kcal gastadas y pasos por día (antes solo
// mostraba peso + un dato suelto) — solo sube de versión para que el
// navegador tome la copia nueva de salud.html.
// v44: ropa.html suma 5 features nuevas — seguimiento de uso (con costo
// por uso opcional), calendario de outfits, recordatorio de piezas sin
// usar, armario cápsula y listas de empaque para viajes. IndexedDB de
// ropa.html sube de version 2 a 3 (dos stores nuevos, outfit_log y
// saved_sets — ninguno se sincroniza con Supabase, se quedan solo en el
// dispositivo). No cambia el handler de fetch, solo sube de versión para
// que el navegador tome la copia nueva de ropa.html.
// v45: dos ajustes a lo de v44 — (1) se quitó por completo el precio de
// compra / costo por uso de ropa.html (podía confundirse con otra cosa);
// la insignia de uso ahora solo muestra cuántas veces se usó cada prenda.
// (2) outfit_log y saved_sets ahora SÍ se sincronizan con Supabase (tablas
// nuevas, mismo patrón que closet_items — requiere correr una vez
// tools/uso_sets_sync/setup.sql), así que el uso/calendario/recordatorio/
// cápsula/empacar también se ven iguales en todos los dispositivos.
// IndexedDB de ropa.html sube de versión 3 a 4 (dos colas de reintento
// nuevas, log_outbox y sets_outbox, mismo patrón que la cola del clóset).
// No cambia el handler de fetch, solo sube de versión para que el
// navegador tome la copia nueva de ropa.html.
// v46: ropa.html tiene un tab nuevo, "favoritos" — fotos de outfits que
// realmente te pusiste (la foto completa del look, no una prenda suelta),
// con un puntaje de 1 a 5 estrellas y una nota opcional. Se puede ordenar
// por mejor puntuados o por más recientes. Se sincroniza con Supabase igual
// que el clóset (foto en Storage + fila en la tabla favorite_outfits nueva
// — requiere correr una vez tools/fav_sync/setup.sql). IndexedDB de
// ropa.html sube de versión 4 a 5 (dos stores nuevos, fav_outfits y
// fav_outbox). No cambia el handler de fetch, solo sube de versión para
// que el navegador tome la copia nueva de ropa.html.
// v47: app nueva, recetas.html — las 30 recetas de cenas estilo "bowl" del
// PDF que pasaste, más la que probaste hoy (bowl de atún, pepino y maíz al
// yogur), todas fijas dentro del archivo (no dependen de sincronizar
// nada para verse). Se puede calificar cada receta de 1 a 5 estrellas y
// dejar una sugerencia de texto para mejorarla, filtrar por proteína y
// ordenar por mejor calificadas, y agregar tus propias recetas nuevas
// desde el tab "agregar". Las calificaciones/sugerencias y las recetas que
// agregues se sincronizan con Supabase (tablas nuevas recipe_ratings y
// custom_recipes — requiere correr una vez tools/recetas_sync/setup.sql),
// igual que el resto de la app. Se agregó un ícono nuevo en la pantalla de
// inicio para entrar a esta app.
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
  './recetas.html',
  './ski.html',
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
  const reqPath = new URL(e.request.url).pathname;
  if (reqPath.indexOf('/data/') !== -1 || reqPath.indexOf('/rest/v1/') !== -1) {
    // Datos de salud (health.json) y, desde v41, la tabla closet_items de
    // Supabase (el clóset sincronizado): ambos cambian seguido y deben
    // reflejar siempre lo último — red primero, con la última copia
    // cacheada como respaldo si no hay conexión (nunca servir de caché
    // primero, o el clóset se vería desactualizado entre dispositivos).
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
