const CACHE = 'app-v57';
// v57: el usuario reportó que las fotos de nuevayork.html se veían "mala
// calidad" (borrosas), mostrando capturas de la tarjeta de Times Square como
// ejemplo. Causa: la primera versión usaba capturas de las miniaturas chicas
// del infobox de Wikipedia (~300-320px de ancho) agrandadas al doble para
// mostrarlas a 700px, lo que se veía pixelado. Arreglo: se volvió a sacar
// cada foto pero ahora navegando hasta la imagen en resolución original de
// Wikimedia Commons (miles de píxeles de ancho) antes de recortarla, así que
// ahora se reduce de una foto grande a 700px en vez de agrandar una chica.
// Se rehicieron así los 10 paisajes de icons/ny/*.jpg (Times Square, Central
// Park, Empire State, Puente de Brooklyn, Grand Central, High Line, Árbol de
// Rockefeller, Bryant Park, Union Square, Dyker Heights, Staten Island
// Ferry). Los nombres de archivo no cambiaron, solo el contenido de las
// fotos, así que se sube de versión el CACHE para que el service worker
// baje las nuevas en vez de servir las viejas borrosas desde caché. No
// cambia ningún HTML/CSS/JS de nuevayork.html ni de ninguna otra página.
// v56: app nueva, nuevayork.html — guía de viaje NYC para diciembre 2026,
// pedida por el usuario ("guia tipo viajera... actividades o lugares que si
// o si no puedes perderte, cosas curiosas, cosas gratis"). 4 pestañas
// (Imperdibles / Diciembre / Gratis / Curiosidades), fotos reales bajadas de
// Wikipedia (uso personal) para cada lugar, más la foto de la Estatua de la
// Libertad que mandó el usuario como 10ª tarjeta de index.html
// (icons/cards/nuevayork.jpg). Contenido de temporada (encendido del árbol
// de Rockefeller, mercados navideños, luces de Dyker Heights) verificado con
// búsqueda web contra fuentes de 2026 antes de publicarse, con nota de
// "confirma la fecha exacta cerca del viaje" en lo que puede variar año a
// año (fecha exacta del encendido del árbol, si el show de luces de Saks va
// a estar o no). Página 100% independiente (su propio <style>, sin depender
// de style.css ni de ninguna otra página), con la misma barra "⌂ Inicio"
// que ski.html. No toca el handler de `fetch` ni el IndexedDB/localStorage
// de ninguna página existente.
// v55: rediseño de ski.html — el usuario pidió cambiar colores/diseño a algo
// "más usado en el mundo de cursos online" (eligió el look "moderno tipo
// Duolingo": colorido, tarjetas redondeadas, iconos grandes, barras de
// progreso gruesas) y agregar una forma de volver al menú principal del
// sitio, que antes no existía en ski.html. Cambios: (1) paleta nueva clara
// (fondo blanco/gris muy claro, azul #1cb0f6 + verde #58cc02 como acentos,
// naranja #ff9600 para la racha, verde/rojo para correcto/incorrecto en el
// quiz) reemplazando el tema oscuro hielo/violeta/coral — se hizo cambiando
// solo los valores de las variables --ice/--violet/--coral/--bg/--panel/etc.
// en :root, así que cualquier CSS o JS que ya usaba var(--ice) etc. heredó
// el nuevo color sin tocarse; (2) tipografía cambiada de 'Space Grotesk' +
// 'IBM Plex Mono' a 'Nunito' (más redondeada/amigable, look de app de
// curso); (3) esquinas más redondeadas, bordes de 2px y sombra inferior
// tipo "botón 3D" en tarjetas/paneles/botones para el efecto gamificado;
// (4) se recolorearon los 9 valores hexadecimales sueltos de la ilustración
// SVG "Tu ascenso" (gradientes de montaña, gorro de nieve, bandera, sendero,
// checkpoints) que no habrían heredado el cambio de variables por estar
// escritos como color literal; (5) se agregó una barra fija arriba de
// ski.html con un botón "⌂ Inicio" que lleva a index.html (el menú
// principal del sitio) — visible en las 3 vistas (panel/lectura/quiz) — y
// se renombró el botón interno "Volver al inicio" a "Volver al panel" para
// no confundirlo ahora que existe un "Inicio" real. Ningún nombre de clase
// CSS ni de función JS cambió: LEVELS/MODULES, localStorage, el sistema de
// audio y el quiz siguen funcionando exactamente igual. Solo toca
// `ski.html`, no cambia el handler de `fetch` ni el IndexedDB/localStorage
// de ninguna otra página.
// v54: la pantalla de inicio (index.html) tenía mucho espacio vacío arriba y
// el título/rueda quedaban en el centro vertical de la pantalla — el usuario
// pidió que el título ("Ruleta", etc.) y la rueda estuvieran más arriba,
// centrados cerca de la parte superior en vez de flotar en medio de la
// pantalla con tanto espacio vacío encima. Se cambió `.wrap` de centrar
// verticalmente (`align-items: center`) a alinear arriba (`align-items:
// flex-start` + un poco de padding-top), se redujo la altura de `.stage`
// (de 74vh/560px a 58vh/460px) y se subieron los porcentajes de `.hub`
// (38%→24%) y `.ring` (62%→54%) dentro de esa caja más chica — el resultado
// es que el título y la rueda de tarjetas quedan agrupados cerca de arriba
// en vez de en medio de la pantalla. Solo CSS: la lógica de arrastre/inercia
// no cambia (usa posiciones fijas en px relativas a `.ring`, no depende de
// dónde esté `.ring` en la pantalla). Solo toca `index.html`, no cambia el
// handler de `fetch` ni el IndexedDB/localStorage de ninguna página.
// v53: recetas.html ahora muestra en pantalla (no solo en la consola) si la
// sincronización con Supabase falla, con el error real (ej. "HTTP 404" si
// la tabla no existe, "HTTP 401/403" si es un problema de permisos/RLS,
// "Failed to fetch" si no hay red o el dominio está bloqueado) — antes el
// mensaje "sincronizando..." se limpiaba solo aunque la sincronización
// hubiera fallado, así que un fallo pasaba desapercibido. Se agregó por el
// reporte de que una receta guardada en un PC no aparecía en otro. Solo
// toca `recetas.html`, no cambia el handler de `fetch` ni el IndexedDB de
// ninguna página.
// v52: fix a la rueda circular de index.html en navegador de escritorio (con
// mouse) — las tarjetas son enlaces <a>, y por default el navegador permite
// "arrastrar el link" de forma nativa al hacer mousedown+arrastrar sobre uno,
// lo cual competía con el arrastre propio de la rueda y rompía la rotación
// (en el celular no pasaba porque touchstart nunca dispara ese arrastre
// nativo). Se desactivó el arrastre nativo de las tarjetas
// (`draggable=false` + cancelar `dragstart`), se evitó la selección de texto
// mientras se arrastra, y se bloqueó el comportamiento default en
// mousedown. Solo toca `index.html`, no cambia el handler de `fetch` ni el
// IndexedDB/localStorage de ninguna página.
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
// v48: los 8 íconos de la pantalla de inicio (index.html) pasaron de una
// sola columna vertical a una cuadrícula de 2 columnas x 4 filas, para que
// se vean más agrupados y no en una sola línea larga. Solo cambia el CSS
// de index.html — mismos íconos, mismos enlaces, mismo orden. No toca el
// handler de fetch ni el IndexedDB de ninguna página.
// v49: la pantalla de inicio (index.html) cambió de cuadrícula a una
// "rueda circular" de tarjetas con foto (una foto representativa por app,
// menos checklist.html que se quedó con su ícono de siempre porque no
// había una foto clara para ella). Se arrastra para girar la rueda y se
// toca la tarjeta que queda al frente para entrar — pensado para el dedo,
// no para mouse/hover. Mismos 8 enlaces y mismo orden que antes. Se
// agregaron 7 fotos nuevas en icons/cards/ (optimizadas, ~190KB en total)
// al precache. No toca el handler de fetch ni el IndexedDB de ninguna
// página.
// v50: (versión corregida en v51 — ver abajo) se había agregado por error
// un esqui.html fabricado desde cero (4 niveles/20 módulos, motor de
// golf.html) porque no se encontró ningún rastro del curso de esquí real en
// este checkout. Sebastian confirmó que sí existía y mandó los archivos
// reales (ski.html, 5 niveles/36 módulos, con audio pregrabado real de
// Supabase bucket ski-audio) — nunca llegaron a subirse a GitHub el
// esqui.html falso, así que no hubo que revertir nada ahí.
// v51: se reemplaza el esqui.html fabricado por el ski.html real y
// completo que Sebastian recuperó (5 niveles — Fundamentos y equipo,
// Técnica de principiante, Equipamiento y venta técnica, Perfeccionamiento,
// Avanzado y fuera de pista — 36 módulos, un solo perfil "Sebas", panel de
// inicio tipo dashboard con racha/heatmap/gráfica mensual/"ascenso" en SVG,
// y audio pregrabado real (voz Leticia) en vez de solo voz en vivo). Este
// archivo tiene su propio diseño visual (paleta hielo/violeta, tipografías
// Space Grotesk/IBM Plex Mono) independiente de style.css — se dejó tal
// cual se recuperó, sin forzarlo al estilo del resto del sitio. La 9ª
// tarjeta de la rueda circular en index.html ahora apunta a ski.html (no
// esqui.html) y usa icons/cards/ski.jpg (misma foto del esquiador,
// renombrada para que coincida). Se quita esqui.html/esqui.jpg del
// precache y se agregan ski.html/ski.jpg. No toca el handler de fetch ni
// el IndexedDB/localStorage de ninguna página existente.
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
  './nuevayork.html',
  './style.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/cards/ruleta.jpg',
  './icons/cards/pomodoro.jpg',
  './icons/cards/ropa.jpg',
  './icons/cards/golf.jpg',
  './icons/cards/menu.jpg',
  './icons/cards/salud.jpg',
  './icons/cards/recetas.jpg',
  './icons/cards/ski.jpg',
  './icons/cards/nuevayork.jpg',
  './icons/ny/staten.jpg',
  './icons/ny/times.jpg',
  './icons/ny/central.jpg',
  './icons/ny/empire.jpg',
  './icons/ny/brooklyn.jpg',
  './icons/ny/rock.jpg',
  './icons/ny/highline.jpg',
  './icons/ny/grandc.jpg',
  './icons/ny/bryant.jpg',
  './icons/ny/dyker.jpg',
  './icons/ny/union.jpg'
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
