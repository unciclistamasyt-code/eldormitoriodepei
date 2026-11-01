const CACHE = 'app-v76';
// v76: rediseño visual "más parecido a las imágenes" que mandó el usuario
// (mockups de ChatGPT "GolfBetter" y "SnowPro"/"SkiPro"): se le agregó a los
// 3 cursos un lenguaje visual de app más pulido, inspirado en esos mockups
// pero sin copiarlos 1:1 (el usuario fue explícito en que eran solo
// referencia). Sin fotos reales — el código ya evita fotos a propósito
// ("Ilustraciones propias en SVG... así no dependen de conexión ni de
// derechos de terceros"), así que el hero usa un gradiente/patrón propio en
// vez de una foto de golfista/esquiador.
// - Hero banner nuevo arriba de la pantalla principal: eyebrow + título
//   grande en dos líneas (segunda línea en el color de marca del curso) +
//   subtítulo + botón pill "Seguir aprendiendo"/"Empezar a aprender" que
//   lleva directo al primer módulo sin completar (o a Repaso general si ya
//   está todo hecho).
// - Tarjeta "continuá donde ibas" (continue-card en ski/snowboard,
//   lesson-card en golf) rediseñada: ahora tiene un ícono en una tarjeta
//   redondeada tintada con el color de marca, una barra de progreso del
//   nivel actual con el porcentaje, y un botón pill "Continuar lección →"
//   — antes era solo texto + una flecha.
// - Grilla nueva "Explorar niveles": 4 tiles con ícono (el número de nivel
//   en una tarjeta tintada) + nombre corto, para saltar directo a un nivel
//   sin tener que bajar por toda la lista.
// - Fila nueva de 3 estadísticas con íconos (🏆 módulos completados, ⏱️
//   tiempo aprendido, 🔥 racha) — un resumen rápido al estilo "Your
//   Progress" del mockup, antes de las estadísticas más detalladas que ya
//   existían (que se mantienen más abajo, sin tocarlas).
// - golf.html: mismo patrón (hero/lesson-card/explore-grid/progress-row),
//   con un acento nuevo lima (--lime:#8ed64f) para el hero/CTAs/íconos,
//   separado del rojo de las banderitas de los diagramas (--flag), que no
//   se tocó. ski.html/snowboard.html reutilizan la variable --brand que ya
//   existía (azul hielo en ski, naranja/coral en snowboard) para que el
//   hero/tiles/continue-card respeten el acento de cada curso sin agregar
//   una paleta nueva.
// - No se tocó la navegación (sigue siendo una sola pantalla con vista de
//   lector superpuesta, como siempre) ni se agregó una barra de tabs
//   abajo como la del mockup — ese cambio de estructura no se pidió y
//   hubiera sido mucho más invasivo que un rediseño visual.
//
// v75: rediseño visual + funcional de los 3 cursos (golf, ski, snowboard),
// pedido por el usuario:
// - Modo oscuro en ski.html y snowboard.html (antes tenían su propio tema
//   claro "Duolingo" independiente del style.css del sitio; golf.html ya
//   era oscuro porque usa el style.css compartido). Se cambiaron los
//   valores de :root (--bg/--panel/--panel2/--line/--ink/--muted) a una
//   paleta oscura, se agregó color-scheme:dark, y se reemplazaron los
//   pocos colores hardcodeados que asumían fondo claro (pasos del
//   heatmap l1-l3, gradiente SVG de la montaña, sombra del botón
//   primario, gorro de nieve). Se introdujo una variable --brand nueva
//   para diferenciar el acento principal entre cursos sin tocar la
//   semántica de color del heatmap/checkpoints (que sigue usando
//   --ice/--coral literales): ski.html usa --brand:var(--ice) (azul
//   hielo) y snowboard.html usa --brand:var(--coral) (naranja), aplicado
//   solo en elementos de acento (continue-card, review-card, eyebrow,
//   score del quiz, flag/checkpoint de la cima). snowboard.html además
//   recibió una paleta base más cálida (marrón/negro) distinta de la de
//   ski (azul/negro) para que ambos cursos se sientan distintos.
// - Se quitó el aviso de texto "necesita internet la primera vez" de
//   golf.html (voiceHint y el selector de voz de respaldo) — el
//   comportamiento real de descarga-la-primera-vez-y-cachear no cambió
//   en nada, solo se simplificó el texto visible al usuario.
// - Control de velocidad de audio (0.75x/1x/1.25x/1.5x/2x) agregado a
//   los 3 cursos, con pastillas de selección debajo del botón de
//   escuchar. Afecta tanto el elemento <audio> real (.playbackRate)
//   como el fallback de voz del navegador (SpeechSynthesisUtterance.rate).
//   En golf.html afecta los 3 caminos de audio que tiene (audio
//   pregrabado ElevenLabs/Cartesia, Google Translate TTS en vivo, y la
//   voz del dispositivo). La preferencia se guarda en localStorage por
//   curso (ski_audioRate__Sebas, snowboard_audioRate__Sebas,
//   golf_audio_rate) y se aplica automáticamente al volver a abrir un
//   módulo.
// - golf.html: se agregó un dashboard de progreso equivalente al de
//   ski.html/snowboard.html — racha actual, racha récord, tira de la
//   semana (L-D), grilla de estadísticas, módulos completados por mes
//   (últimos 6 meses) y heatmap de actividad (últimos 140 días) — todo
//   derivado de los timestamps que ya guardaba progress.completed[id].at,
//   sin agregar ninguna clave nueva de localStorage. Se mantuvo la
//   estimación de fecha de finalización (courseForecast/etaText) que ya
//   existía, ahora mostrada dentro del panel de dashboard. No se replicó
//   la ilustración SVG de la montaña/escalador (es una metáfora
//   específica de ski/snow) — en su lugar golf tiene estadísticas
//   equivalentes sin esa pieza visual.
//
// v74: golf.html — se agregó el Nivel 6 ("Taller: clubmaking y fitting
// técnico", 6 módulos nuevos: swingweight, lie/loft, shafts a fondo, grips,
// banco de taller/reshaft, y cómo vender el servicio) y se regeneraron los
// 34 audios existentes con la voz Laura de Cartesia (antes ElevenLabs),
// más los 6 audios nuevos del Nivel 6 — los 40 mp3 viven en el mismo bucket
// de Supabase (site-media/audio/), mismo path que antes.
// v73: el usuario mandó directamente, como archivo adjunto en el chat, una
// foto real de un snowboarder carveando en nieve — así se resolvió el
// bloqueo de red descripto en el changelog de v72 (no hizo falta volver a
// intentar el fetch externo). Se guardó como icons/cards/snowboard.jpg, se
// agregó al precache de este archivo, y se cambió la entrada de
// snowboard.html en el array APPS de index.html de `icon` (SVG) a `img`
// (la foto real), siguiendo el mismo patrón que el resto de tarjetas del
// sitio. No se tocó snowboard.html ni ski.html en esta versión.
//
// v72: segunda parte del pedido de 4 partes (ver changelog de v71 para el
// pedido completo verbatim): curso de snowboard espejo. El usuario eligió
// (AskUserQuestion) "un curso espejo del de ski" como alcance, y para la
// tarjeta del menú principal eligió "buscá una foto libre de derechos en la
// web" — pero el entorno de esta sesión bloquea la descarga directa de
// imágenes externas vía fetch (solo permite dominios en una allowlist de
// red, y la herramienta de fetch de páginas no pudo traer los bytes de la
// foto de stock encontrada por restricción de "provenance"). Como solución
// práctica, se usó un ícono SVG simple (línea, estilo "Checklist" ya
// existente en este mismo index.html) en vez de una foto real para la
// tarjeta de Snowboard School — el usuario puede reemplazarlo más adelante
// subiendo una foto a icons/cards/snowboard.jpg y cambiando esa entrada de
// `icon` a `img` en index.html, o pasándome un link directo de imagen en el
// chat para que lo intente de nuevo.
//
// Se creó `snowboard.html` nuevo, replicando el mismo motor JS/CSS de
// ski.html (dashboard, progreso, quiz, audio con fallback a voz del
// navegador) pero con contenido 100% propio de snowboard: 32 módulos en 5
// niveles (Fundamentos y equipo: 6, Técnica de principiante: 6,
// Equipamiento y venta técnica: 9, Perfeccionamiento: 6, Avanzado y fuera
// de pista: 5), cubriendo vocabulario (nose/tail, toe/heel edge, stance
// regular/goofy, switch), postura y caídas, giros (J-turn, linking turns,
// carving), venta consultiva de tabla+binding+bota como sistema
// interdependiente (camber/rocker/híbrido, flex, shape twin/directional,
// ancho según talla de bota, sistemas de binding strap-in/rear-entry/
// step-on, sistemas de cordones traditional/speed-lace/BOA), park (jumps,
// boxes, switch), y avanzado/backcountry (seguridad en avalanchas DVA/
// sonda/pala, splitboarding, disciplinas de competición, tecnología
// moderna). Claves de localStorage separadas de ski.html
// (snowboard_progress_v1__Sebas, snowboard_activity_v1__Sebas) para no
// pisar el progreso del curso de ski. Audio pregrabado apuntando a un
// bucket nuevo de Supabase, 'snowboard-audio/' (todavía no creado — el
// curso cae al fallback de voz del navegador hasta que se genere y suba
// audio real, igual que le pasó a ski.html antes de tener audio Cartesia).
//
// Se agregó la tarjeta "Snowboard School" a `index.html` (array APPS) y
// `snowboard.html` al precache de este archivo. No se tocó ski.html en
// esta versión (el contenido de tuning de la v71 queda igual).
//
// Verificado con Node (32 módulos, 5 niveles, sin ids duplicados, todos
// los quizzes con exactamente 5 preguntas bien formadas) y revisado el
// texto completo con un escaneo de regex para detectar conjugaciones "vos"
// que se hubieran colado (se encontraron y corrigieron bastantes esta vez:
// tenés→tienes, querés→quieres, arrancás→arrancas, aplicás→aplicas,
// mirás→miras, podés→puedes, necesitás→necesitas, deslizás→deslizas,
// trabajás/acompañás→trabajas/acompañas, conocés→conoces (x3),
// pasás→pasas (x2), inclinás→inclinas (x2), caés/volvés→caes/vuelves,
// recordás→recuerdas, sabés→sabes, y los imperativos llevá/apoyá/
// empujate→lleva/apoya/empújate), para mantener consistencia de "tú" con
// el resto del sitio.
//
// Pendiente: audio de los 32 módulos (ver tarea de audio pendiente en
// claude/ski-app-updates.md, que ahora cubre tanto ski como snowboard);
// reemplazar el ícono de la tarjeta por una foto real si el usuario la
// consigue; el usuario debe crear el bucket 'snowboard-audio' en Supabase
// cuando llegue el momento de subir audio.
//
// v71: el usuario pidió (verbatim) "vamos hacer el audio denuevo de todo el
// curso con la nueva voz, al igual quiero mejorar el curso de ski con mas
// info especifica y tambien agregar snowboard, quiero cuestion de angulos a
// la hora de hacer tune up el base bevel, stone grinding y toda la
// informacion necesaria para volverme en un experto" — de las 4 partes de
// ese pedido, esta versión cubre la de contenido de tuning técnico (las
// otras 3 — audio regenerado, snowboard espejo, y cualquier otra mejora de
// info específica — quedan para versiones siguientes). Se agregó un NIVEL
// NUEVO completo, Nivel 6 "Taller: tuning técnico y stone grinding", con 6
// módulos (n6-m1 a n6-m6): qué es el bevel (base bevel vs side bevel, y la
// fórmula ángulo de canto = (90+base bevel)-side bevel); ángulos de side
// bevel por disciplina (recreativo, carving, slalom, GS, velocidad) y la
// regla práctica "1/3" (1° base / 3° side); el matiz más importante del
// nivel — afilar en casa sin guía de ángulo AUMENTA el bevel de base
// involuntariamente en vez de "afilar" en el sentido coloquial, y solo un
// stone grind lo resetea; herramientas de taller (guías de bevel, piedras
// diamante/gomosas, cortadores de sidewall, true bar); qué es un stone
// grind, en qué se diferencia de un belt grind y de un afilado de rutina, y
// qué problemas resuelve que un afilado simple no puede; y estructura
// (structure) + cómo armar el argumento de venta de servicio de taller
// (stone grind completo vs. afilado de rutina) según el síntoma real que
// reporte el cliente. Conteo de módulos del curso completo: 43 → 49.
//
// De paso, antes de escribir el nivel nuevo, se reconstruyeron en este
// archivo los 5 módulos "explicado fácil" de Discovery (n3-m12 a n3-m16,
// uno por modelo: 70, 74, 82 Sport, 82 Pro, 86 Pro) que se habían agregado
// en la v70 pero que todavía no estaban subidos al repositorio de GitHub —
// si ya los habías subido vos mismo a mano, este archivo los vuelve a
// incluir sin duplicar nada (reemplaza, no suma).
//
// v70: el usuario pidió (verbatim) "Agrega para discovery ya se un curso
// más de cada uno muy bien explicado como para niños con analogía para un
// vendedor nuevo que así no sepas de esto puedes vender pero al igual
// siempre nombrando términos correctos e información clara y no dejando
// nada afuera de cada modelo uno por uno de discovery" — 5 módulos nuevos,
// uno por cada modelo de Discovery (70, 74, 82 Sport, 82 Pro, 86 Pro),
// cada uno con una analogía simple (bicicleta de ruta vs. ciclocross vs.
// mountain bike para el ancho; bate de béisbol mixto vs. de madera entera
// para el núcleo; cinturón con pretensor para la fijación superior) pero
// siempre nombrando el término técnico correcto (sidecut, radio de giro,
// núcleo, fijación), sin omitir ningún dato ya conocido de cada modelo, y
// siendo honesto sobre los datos que Head no publicó (sidecut/radio del 70
// y 74). Conteo de módulos: 38 → 43 (Nivel 3: 11 → 16).
//
// v69: el usuario pidió (verbatim) "anade tambien al curso de skis toda su
// linea de downhill, los supershape y tips para venta y para que sirve cada
// uno, es los discoverys tambien detalla para que sirve cada uno" — dos
// cosas: (1) agregar al curso la línea de pista "Supershape e-" de Head
// (downhill/carving de alto rendimiento), con tips de venta y para qué
// sirve cada modelo; (2) detallar más a fondo, dentro del módulo Discovery
// ya existente, para qué sirve cada modelo de esa línea. Investigación
// (blisterreview.com, skiessentials.com, inthesnow.com, thegearpicker.com,
// head.com) confirmó: la línea Supershape tiene 5 modelos actuales, todos
// con prefijo "e-" desde hace unas temporadas (e-Original 66mm, e-Speed
// 68mm, e-Magnum 72mm, e-Rally 78mm, e-Titan 84mm — "Supershape Titan" a
// secas es nombre viejo del mismo e-Titan), con tecnología propia distinta
// a Discovery (titanal de 2 capas, grafeno, Crossforce Carbon Construction,
// Energy Management Circuit — sin Auxetic ni Superframe). Se agregó un
// módulo nuevo, `n3-m11` ("La línea de pista de Head: Supershape e-"), al
// final del Nivel 3, con los 5 modelos, su tecnología, y tips de venta
// concretos sobre cuándo recomendar Discovery vs. Supershape y qué ancho de
// Supershape según el cliente — mismo formato que el resto (prosa + quiz de
// 5 preguntas). Se expandió también el módulo `n3-m10` (Discovery): se
// agregaron specs reales (sidecut/radio) del 82 Sport, 82 Pro y 86 Pro, se
// sumó un párrafo sobre los modelos angostos 70 y 74 (aclarando que Head
// todavía no publicó sus specs técnicas, para no inventarlas frente a un
// cliente), se corrigió la mención a "Supershape Titan" por el nombre
// vigente "Supershape e-", y se agregó una quinta pregunta de quiz sobre no
// inventar specs no publicadas. De paso se corrigieron conjugaciones "vos"
// que habían quedado inconsistentes con el resto del curso (dominás→
// dominas, útil para vos→para ti, seguís→sigues, identificá→identifica,
// pensá→piensa, sabés→sabes, escuchás→escuchas) — el resto del curso usa
// "tú". El curso pasa de **37 a 38 módulos** (Nivel 3 pasa de 10 a 11) — se
// actualizaron las dos referencias hardcodeadas a "37 módulos"; el resto de
// los contadores ya se calculan dinámicamente desde `MODULES.length`.
// Verificado con Playwright: `MODULES.length` da 38, Nivel 3 tiene 11
// módulos, sin ids duplicados, los 5 quizzes de n3-m11 están bien formados,
// el módulo y su quiz abren y se ven correctamente, y no hay errores de
// consola. No se tocó `LEVELS`, ningún otro módulo existente, el sistema de
// audio pregrabado (el módulo nuevo n3-m11 no tiene audio pregrabado — cae
// al fallback de voz del navegador hasta que se genere uno, igual que pasó
// con n3-m10), ni ningún otro archivo del sitio.
// v68: el usuario pidió (verbatim) "hay un nuevo catalago de skis de head que
// me gustaria agregar al curso" — agregar al curso de `ski.html` la
// información del catálogo nuevo de la marca Head (temporada 2026-27). Se
// investigó en la web (freeskier.com y skiessentials.com) la línea nueva
// "Discovery" de Head, que reemplaza a la antigua línea "Shape": 9 modelos
// de 70-74mm (iniciación) a 82/86mm (Pro), con tres tecnologías nuevas de
// construcción (Superframe, tira de grafeno, y la novedad genuina de esta
// temporada, Auxetic) y ejemplos concretos de modelo (Discovery 82 Sport,
// 82 Pro, 86 Pro). Se agregó un módulo nuevo, `n3-m10` ("Catálogo nuevo: la
// línea Discovery de Head (2026-27)"), al final del Nivel 3 ("Equipamiento
// y venta técnica") de `ski.html` — mismo formato que los demás módulos
// (contenido en prosa + quiz de 5 preguntas), conectando el contenido
// nuevo con lo ya enseñado en el módulo de categorías de esquí y
// reforzando el hábito de venta consultiva (identificar qué reemplaza una
// línea nueva, qué cambió en la tecnología real, y a qué perfil de cliente
// le sirve) en vez de solo memorizar nombres de modelo. El curso pasa de
// 36 a **37 módulos** — se actualizaron las dos referencias hardcodeadas a
// "36 módulos" en el HTML/JS de `ski.html` (el saludo inicial y el mensaje
// de "curso completo"); el resto de los contadores (por nivel, por mes,
// etc.) ya se calculan dinámicamente desde `MODULES.length`, así que no
// hizo falta tocarlos. No se tocó `LEVELS`, el resto de los módulos, el
// sistema de audio pregrabado, ni ningún otro archivo del sitio.
// v67: el usuario pidió (verbatim) "hagamos lo mismo para los de menu" —
// aplicar a los 4 videos de fondo de `menu.html` (fettuccine, pizza,
// ensalada, hamburguesa) la misma técnica de poster + fundo suave que se
// agregó en v66 al hero de `nuevayork.html`. Esos videos ya tenían un
// atributo `poster="..."` nativo en el `<video>` apuntando a la foto
// correspondiente en Supabase, así que ya se veía algo instantáneo al
// abrir cada tarjeta — pero el video pasaba de golpe (sin transición) de
// esa portada a la reproducción real en cuanto cargaba. Se agregó, para
// cada uno de los 4 platos: (1) una `<img class="slide-poster">` con la
// misma foto de portada, puesta justo antes del `<video>` en el HTML y
// con `z-index` más bajo que el video y que el degradado `.slide-scrim`
// (que es un `<div>` aparte, no depende del video, así que el degradado
// para que se lea el texto sigue viéndose igual desde el primer instante,
// sin regresión); (2) el `<video class="slide-bg">` ahora arranca en
// `opacity: 0` con una transición CSS de 1s, y se le agregó la clase
// `is-ready` (que lo lleva a `opacity: 1`) por JS en cuanto dispara
// `playing`/`canplaythrough` — mismo patrón ya usado en el hero de NY. Se
// mantuvo el atributo `poster` nativo del `<video>` como respaldo. No se
// tocó el video en sí (mismos 4 archivos de Supabase, mismo bitrate), así
// que esto no afecta si algún video pesa o corta — es solo la transición
// de carga. Cambios solo en `menu.html` (CSS + HTML de las 4 tarjetas +
// un bloque chico de JS); nada de `nuevayork.html` se tocó en esta subida.
// v66: el usuario dijo (verbatim) "me quedo con la anterior pero me molesta
// que al abrir la pagina no arranque de una y se ve que es un video" — es
// decir, rechazó el arreglo de v65 (cambiar de video para evitar los
// tirones) y prefiere quedarse con el video anterior de v64 (el dron del
// Puente de Brooklyn de noche, más pesado y más lindo) aunque tenga algo
// de corte, pero quiere que el momento de carga de la página no se sienta
// como "esto es obviamente un video que todavía no cargó". Se hicieron dos
// cambios en nuevayork.html: (1) se volvió a cambiar el `src` del
// `<source>` del video al de v64 (Puente de Brooklyn, 5838621); (2) se
// agregó una imagen de portada (`<img class="hero-poster">`, el thumbnail
// real de ese mismo video en Pexels) que se ve instantánea de fondo desde
// el primer frame — el `<video>` ahora arranca en `opacity: 0` y se
// agregó JS que le suma la clase `is-ready` (con una transición CSS de 1s)
// en cuanto el video dispara el evento `playing` o `canplaythrough`, así
// que la portada se funde suavemente hacia el video real en vez de un
// flash negro o un salto brusco. El problema de fondo de los tirones (el
// archivo sigue siendo pesado, UHD a 30fps) no se resolvió — el usuario
// aceptó ese trade-off a cambio de quedarse con este video; si más
// adelante quiere resolverlo de raíz, la opción sigue siendo comprimir el
// archivo con ffmpeg y alojarlo en Supabase en vez de usar Pexels directo.
// v65: el usuario reportó (verbatim) "el video no va fluido se corta" — el
// video del hero de nuevayork.html (v64, dron del Puente de Brooklyn de
// noche) se veía con tirones/cortes en su dispositivo real. Causa más
// probable: ese archivo era UHD (2560x1440 a 30fps) — mucho más pesado de
// decodificar y de transmitir por la red de lo que hace falta para un
// video de fondo detrás de texto, y este contenedor no tiene forma de
// medir el bitrate real del archivo para confirmarlo con certeza (mismo
// bloqueo de red hacia videos.pexels.com que ya se documentó en v63/v64).
// Arreglo: se cambió el video por otro, más liviano en resolución real
// (1920x1080 a 24fps, en vez de 2560x1440 a 30fps) — de paso, esta nueva
// toma es nieve cayendo de verdad sobre casas históricas (brownstones)
// de Nueva York, así que además queda más "navideña" de lo que ya estaba
// (el efecto de nieve por CSS de v64 se dejó igual, ahora con nieve real
// de fondo se ve con más profundidad). Solo cambió el `src` del
// `<source>` del video (una línea) en nuevayork.html.
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
  './snowboard.html',
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
  './icons/cards/snowboard.jpg',
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
