const CACHE = 'app-v64';
// v64: el usuario pidió (verbatim) "podemos hacer una toma de navidad la
// mas bonita que encuentres que me haga viajar" — o sea, cambiar el video
// del hero de nuevayork.html (v63, skyline aéreo al atardecer) por uno
// más bonito y con más espíritu navideño/de viaje. Se buscaron varias
// opciones reales de stock gratuito con escenas de Navidad en Nueva York
// (árbol de Rockefeller, nieve en Central Park, calles nevadas) pero las
// mejores tomas de esos temas específicos son de bancos de pago (Getty/
// Shutterstock/iStock) — lo gratuito disponible de esos temas puntuales
// era de calidad más floja (celular, vertical, multitudes borrosas). Se
// eligió en cambio un video real, de altísima calidad, del Puente de
// Brooklyn de noche iluminado con la ciudad de fondo (toma aérea/dron,
// 4K, Pexels, uso libre sin atribución) — el Puente de Brooklyn ya es la
// tarjeta "Imperdible" #1 de la propia guía, así que encaja perfecto
// como primera imagen de la página aunque no sea 100% "navideño". Para
// compensar eso y darle igual el toque de Navidad que pidió el usuario,
// se agregó un efecto de nieve cayendo (copos ❄/❅/❆ generados por JS,
// animados con CSS, sin ninguna imagen ni librería externa) encima del
// video y detrás del texto — así queda la sensación de nevada de
// diciembre sin depender de encontrar el video "perfecto" de archivo. Se
// cambió el `src` del `<source>` del video y se agregó el efecto de
// nieve (`.hero-snow`, CSS + un bloque de JS chico) en nuevayork.html;
// nada más de la página se tocó.
// v63: pedido del usuario — que nuevayork.html tenga un hero de video de
// pantalla completa como lo primero que se ve al abrir la página, con la
// plantilla que mandó (nav + título + botón), pero personalizado para el
// viaje real en vez del texto genérico de la plantilla, y con un video de
// Nueva York en vez del video de avión del ejemplo. Se agregó una nueva
// sección `.hero-video-section` al inicio de <body> de nuevayork.html:
// video de fondo a pantalla completa (autoplay+muted+loop+playsinline) con
// degradado oscuro encima, nav con logo "Nueva York", menú (Imperdibles/
// Diciembre/Gratis/Curiosidades, que activan la pestaña real y hacen
// scroll hacia ella) y el botón "⌂ Inicio" ya existente en el sitio, más
// un menú hamburguesa para móvil, título/subtítulo/botón "Ver la Guía"
// centrados con animación de aparición escalonada, y el mismo arreglo
// defensivo de autoplay que ya se usó en menu.html (v62) por si iOS
// bloquea el autoplay real. El video es un clip gratuito de stock
// (Pexels, "drone footage of New York City skyline" al atardecer, uso
// libre sin atribución) enlazado directo a su CDN — no se descargó ni se
// agregó al repo, así que no pesa nada al precache del service worker.
// No se pudo verificar la reproducción real del video desde este entorno
// porque el proxy de egress del sandbox bloquea videos.pexels.com (mismo
// tipo de bloqueo ya documentado con Supabase y con mixkit.co) — si el
// video no carga bien en el dispositivo real, avisar para cambiarlo por
// otro. No cambia ninguna otra página ni el handler de `fetch`.
// v62: el usuario reportó "en el de Menú los vídeos no avanzan" — en
// menu.html, el video de fondo del plato (ej. Fettuccine) se queda quieto
// mostrando solo la foto (poster) con el botón de play nativo encima, en
// vez de reproducirse solo. Los 4 <video> ya tenían autoplay+muted+
// playsinline, que en teoría alcanza para autoreproducir en iPhone, pero
// hay casos reales donde el navegador igual bloquea el autoplay: con
// "Reproducción automática de vistas previas de video" desactivado en
// Ajustes > Accesibilidad > Movimiento, con el Modo de bajo consumo
// activado, o simplemente si el video queda pausado al volver a la
// pestaña después de estar en segundo plano — en esos casos el atributo
// autoplay del HTML no es suficiente. Arreglo, solo en menu.html: además
// de autoplay, ahora se intenta reproducir cada video por código (1) al
// cargar la página, (2) cada vez que la pestaña vuelve a estar visible
// (evento visibilitychange/pageshow), y (3) en el primer toque en
// cualquier parte de la pantalla (el mismo toque que ya se usa para
// deslizar entre platos) — así, aunque el navegador haya bloqueado el
// autoplay real, ese primer toque hace que arranque. No cambia el HTML/
// CSS de menu.html, solo se agregó JS al final del <script> existente.
// No toca ninguna otra página ni el handler de `fetch`.
// v61: ARREGLO DE UN ERROR PROPIO, no un pedido nuevo del usuario. El
// usuario reportó "las imagenes se desaparecieron y baja el menu un poco"
// en la rueda de index.html: Ruleta, Pomodoro, Ropa, Golf, Menú, Salud,
// Recetas y Ski School perdieron su foto real y quedaron mostrando solo
// un color sólido. Causa encontrada revisando el repo real en GitHub: la
// entrega anterior (v60) se empaquetó copiando TODA la carpeta
// /root/project/site del entorno de trabajo en vez de solo los archivos
// que de verdad se habían tocado (nuevayork.html, sw.js, icons/ny/*) — y
// en ese entorno, icons/cards/ruleta.jpg, pomodoro.jpg, ropa.jpg,
// golf.jpg, menu.jpg, salud.jpg, recetas.jpg, ski.jpg, style.css,
// manifest.json e icons/icon-192.png, icon-512.png y
// apple-touch-icon.png eran versiones de relleno (placeholders, colores
// sólidos o CSS mínimo) usadas solo para poder probar el layout, no las
// fotos ni el CSS reales del usuario — nunca deberían haber salido de
// ese entorno. Al subir esa entrega, esas versiones de relleno
// reemplazaron a las reales en GitHub, incluyendo el style.css que
// comparten ruleta/checklist/pomodoro/ropa/golf/menu/salud/recetas
// (quedó reducido de 1844 a 503 bytes, perdiendo el reset de
// html/body, el padding de safe-area del notch, etc. — probable causa
// de que "el menu baje/se vea distinto") y manifest.json (perdió
// nombre, colores e íconos reales de la PWA). Arreglo: se recuperaron
// las 8 fotos, style.css, manifest.json y los 3 íconos reales
// directamente del historial de git de GitHub (commits de antes de la
// entrega dañada) y se restauraron con su contenido original — nada de
// esto se reconstruyó a mano ni se adivinó. icons/cards/nuevayork.jpg,
// nuevayork.html, sw.js (este changelog) e icons/ny/*.jpg (los arreglos
// reales de v60: liberty/brooklyn/rock) NO se tocan, siguen igual.
// v60: el usuario avisó de nuevo ("cambia estas a algo mejor") que 3 fotos
// puntuales seguían viéndose mal: Estatua de la Libertad, Puente de
// Brooklyn y Árbol de Rockefeller. El arreglo de v59 solo resolvía el
// ANCHO de las fotos para pantallas retina, pero había una segunda causa
// que v59 no cubría: la tarjeta usa CSS "aspect-ratio: 4/3" junto con
// "object-fit: cover", así que el navegador recorta la foto a un
// rectángulo 4:3 usando la dimensión (ancho O alto) que esté más
// ajustada según la forma original de la foto — no solo el ancho.
// brooklyn.jpg era un panorama 3:1 con muy poca ALTURA real, así que al
// recortarlo a 4:3 el navegador tenía que agrandar la altura y se veía
// borroso pese a tener ancho de sobra. rock.jpg era una foto vertical
// (retrato) del árbol con poco ANCHO real, mismo problema pero al revés.
// La de la Estatua de la Libertad reusaba la fotito de 399x501 que mandó
// el usuario para la ruedita del menú de index.html, demasiado chica para
// una tarjeta grande. Arreglo: se rehicieron brooklyn.jpg y rock.jpg como
// recortes horizontales reales en proporción 4:3 desde los archivos
// originales de Wikimedia (no un recorte "aproximado" a 4:3, sino uno
// calculado a esa proporción exacta), y se agregó una foto nueva
// icons/ny/liberty.jpg (recorte 4:3 desde una foto de la Estatua de la
// Libertad en alta resolución de Wikimedia, no la fotito chica del
// usuario) que ahora usa la tarjeta "Imperdibles" de nuevayork.html en vez
// de icons/cards/nuevayork.jpg. icons/cards/nuevayork.jpg (la foto propia
// del usuario) se deja intacta porque en la ruedita de index.html se ve a
// solo 82px y ahí sí se ve bien. No cambia ningún otro HTML/CSS/JS.
// v59: el usuario siguió viendo TODAS las fotos de nuevayork.html mal
// (mostró la de "The High Line" como ejemplo) a pesar del arreglo de v57.
// Causa real encontrada esta vez: las tarjetas se muestran hasta 612px de
// ancho en CSS (.view max-width 640px) y en una pantalla retina normal
// (2x o 3x, o sea casi cualquier celular moderno) eso pide entre 1200 y
// 1836 píxeles físicos — pero las fotos de v57 solo tenían 700px de ancho,
// así que el propio navegador las agrandaba y se veían borrosas, sin
// importar qué tan nítida fuera la foto original. Arreglo: se volvieron a
// recortar las 10 fotos de icons/ny/*.jpg directamente desde el archivo
// original de Wikimedia (no desde una captura de pantalla chica) a un
// ancho de ~1200-1250px (tope real de la herramienta de captura usada),
// 1.7-1.8× más grandes que antes — cubre bien pantallas 2x y la mayoría de
// 3x. Excepciones por resolución nativa límite del archivo original:
// empire.jpg (846px de ancho, el original de Wikipedia no da para más) y
// rock.jpg (666px de ancho, recorte vertical del árbol). De paso se
// cambió dyker.jpg por una foto real de las luces navideñas de Dyker
// Heights (antes era una casa sin luces, la única disponible en ese
// momento) y se subió central.jpg al mismo ancho ~1250px que el resto
// (seguía siendo la versión sin neblina de v58). Mismos nombres de
// archivo, por eso sube la versión de caché otra vez. No cambia ningún
// HTML/CSS/JS.
// v58: el usuario avisó que la foto de Central Park en nuevayork.html
// seguía viéndose mal (esta vez no por ser chica sino por la bruma/neblina
// del día en que se tomó la foto original de Wikipedia, que la hacía ver
// suave/lavada de fondo) y dio permiso explícito para cambiarla por otra si
// hacía falta. Se reemplazó por una foto distinta de Central Park desde la
// terraza del Rockefeller Center (día despejado, sin neblina, cielo azul
// nítido), recortada de la imagen original en Wikimedia Commons vía canvas
// del navegador para no perder resolución. Mismo nombre de archivo
// (icons/ny/central.jpg), por eso sube la versión de caché otra vez. No
// cambia ninguna otra foto ni ningún HTML/CSS/JS.
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
  './icons/ny/liberty.jpg',
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
