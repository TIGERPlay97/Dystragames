// Dystra Games - Script Principal

// ---------- 1. DATOS ----------
// La lista de juegos vive en /datos/proyectos.js (se carga antes que este archivo).
// La información extensa de cada juego vive en /proyectos/<id>/datos.js (const JUEGO).

// Menú: se escribe una sola vez y aparece igual en todas las páginas.
// "pagina" debe coincidir con el data-pagina del <body> para marcar la página actual.
const enlacesMenu = [
    { texto: "Inicio",    href: "/",           pagina: "inicio" },
    { texto: "Proyectos", href: "/proyectos/", pagina: "proyectos" },
    { texto: "Contacto",  href: "#contacto",      pagina: "contacto" }
];
const enlacesPie = [
    { texto: "Inicio",   href: "/" },
    { texto: "Juegos",   href: "/proyectos/" },
    { texto: "Contacto", href: "#contacto" }
];

// Logos (carpeta /img/logo/). Para cambiar el logo del encabezado, cambia solo esta ruta.
const LOGO_ENCABEZADO = "/img/logo/dystra-completo-blanco.svg";  // logo con texto
const LOGO_SIMBOLO    = "/img/logo/dystra-simbolo-blanco.svg";   // solo el símbolo

// ---------- 2. HEADER, MENÚ LATERAL Y PIE (se repiten en todas las páginas) ----------
function construirLayout() {
    const actual = document.body.dataset.pagina;
    const enlaces = (extra = '') => enlacesMenu.map(e =>
        `<a href="${e.href}" ${extra}${e.pagina === actual ? ' aria-current="page"' : ''}>${e.texto}</a>`
    ).join('');

    const header = document.getElementById('layout-header');
    if (header) header.outerHTML = `
        <header class="header-main">
            <div class="header-container">
                <a href="/" class="logo-link" aria-label="Dystra Games"><img class="logo-img" src="${LOGO_ENCABEZADO}" alt="Dystra Games"></a>
                <nav class="nav-desktop" aria-label="Principal">${enlaces()}</nav>
                <button id="btn-menu" class="btn-hamburger" aria-label="Abrir menú">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16"></path>
                    </svg>
                </button>
            </div>
        </header>
        <div id="overlay-menu" class="menu-overlay"></div>
        <aside id="sidebar-menu" class="sidebar-drawer" aria-label="Menú">
            <div class="sidebar-header">
                <img class="logo-img logo-img--menu" src="${LOGO_SIMBOLO}" alt="Dystra Games">
                <button id="btn-close-menu" class="btn-close" aria-label="Cerrar menú">&times;</button>
            </div>
            <nav class="sidebar-nav">${enlaces('class="sidebar-link" ')}</nav>
        </aside>`;

    const pie = document.getElementById('layout-footer');
    if (pie) pie.outerHTML = `
        <footer id="contacto" class="footer-main">
            <div class="footer-container">
                <div class="footer-brand">
                    <img class="footer-logo" src="${LOGO_SIMBOLO}" alt="">
                    <div>
                        <span>Dystra Games Studio</span>
                        <p>© 2026 Dystra Games. Todos los derechos reservados.</p>
                    </div>
                </div>
                <nav class="footer-nav" aria-label="Pie de página">
                    ${enlacesPie.map(e => `<a href="${e.href}">${e.texto}</a>`).join('')}
                </nav>
                <div class="footer-info"><span>Official Site</span></div>
            </div>
        </footer>`;
}

// ---------- 3. COMPORTAMIENTO ----------
function configurarMenu() {
    const sidebar = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('overlay-menu');
    if (!sidebar || !overlay) return;

    const abrir = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const cerrar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.getElementById('btn-menu').addEventListener('click', abrir);
    document.getElementById('btn-close-menu').addEventListener('click', cerrar);
    overlay.addEventListener('click', cerrar);
    sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrar));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
}

// Enlaces internos sin "#" en la barra de direcciones:
// - href="#contacto"  -> baja suavemente a esa sección y NO cambia la dirección
// - enlace a la página en la que ya estás -> sube arriba sin recargar
function configurarEnlaces() {
    document.addEventListener('click', e => {
        const a = e.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href') || '';

        if (href.startsWith('#') && href.length > 1) {
            const destino = document.querySelector(href);
            if (destino) {
                e.preventDefault();
                destino.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (a.origin === location.origin && a.pathname === location.pathname && !a.search && !a.hash) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

function configurarHeaderScroll() {
    const header = document.querySelector('.header-main');
    if (!header) return;
    const actualizar = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', actualizar, { passive: true });
    actualizar();
}

// ---------- 4. PROYECTOS ----------
function crearMedia(p) {
    return p.imagen ? `<img src="${p.imagen}" alt="${p.titulo}" loading="lazy">` : '';
}

// Tarjetas: en el inicio solo los destacados, en Proyectos todos.
function renderizarProyectos() {
    const contenedor = document.getElementById('contenedor-proyectos');
    if (!contenedor) return;

    const soloDestacados = document.body.dataset.pagina === 'inicio';
    const lista = listaProyectos.filter(p => !soloDestacados || p.destacado);

    contenedor.innerHTML = lista.map(p => `
        <article class="project-card">
            <div class="project-media">${crearMedia(p)}</div>
            <div class="project-body">
                <div>
                    <div class="project-meta">
                        <span class="project-status">${p.estado}</span>
                        <span class="project-engine">${p.motor}</span>
                    </div>
                    <h3 class="project-title">${p.titulo}</h3>
                    <p class="project-text">${p.resumen}</p>
                </div>
                <div class="project-footer">
                    <span class="project-note">${p.nota}</span>
                    <a class="project-btn" href="/proyectos/${p.id}/">Ver más</a>
                </div>
            </div>
        </article>`).join('');
}

// ---------- Página de detalle ----------
// Cada /proyectos/<id>/ tiene su index.html (igual para todos) y su datos.js (const JUEGO).
// El id sale de la propia dirección: /proyectos/sok/ -> "sok".
function crearBloque(b) {
    switch (b.tipo) {
        case 'texto':
            return `<p class="bloque-texto">${b.contenido}</p>`;
        case 'imagen':
            return `<img class="bloque-imagen" src="${b.src}" alt="${b.alt || ''}" loading="lazy">`;
        case 'video':
            return crearVideo(b.src, b.titulo);
        default:
            return '';
    }
}

// Video de YouTube (o similar) con proporción 16:9. "src" es el enlace embed.
function crearVideo(src, titulo = 'Video') {
    return `<div class="bloque-video">
        <iframe src="${src}" title="${titulo}" loading="lazy" allowfullscreen
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>`;
}

function crearNovedad(n) {
    return `
        <article class="novedad">
            <div class="novedad-cabecera">
                <time>${n.fecha}</time>
                <h3>${n.titulo}</h3>
            </div>
            ${(n.bloques || []).map(crearBloque).join('')}
        </article>`;
}

function renderizarDetalle() {
    const contenedor = document.getElementById('detalle-proyecto');
    if (!contenedor) return;

    const id = location.pathname.split('/').filter(Boolean)[1];
    const p = listaProyectos.find(x => x.id === id);
    if (!p) { location.replace('/proyectos/'); return; }

    // JUEGO viene de /proyectos/<id>/datos.js. Si falta, la página se muestra igual con lo básico.
    const j = (typeof JUEGO !== 'undefined') ? JUEGO : {};
    const novedades = j.novedades || [];
    const galeria = j.galeria || [];

    document.title = `${p.titulo} | Dystra Games`;
    contenedor.innerHTML = `
        <div class="project-media">${crearMedia(p)}</div>
        <div class="detail-body">
            <div class="project-meta">
                <span class="project-status">${p.estado}</span>
                <span class="project-engine">${p.motor}</span>
            </div>
            <h1 class="project-title">${p.titulo}</h1>
            <p class="project-text">${j.descripcion || p.resumen}</p>
            <div class="project-footer"><span class="project-note">${p.nota}</span></div>
        </div>
        ${j.trailer ? crearVideo(j.trailer, p.titulo) : ''}
        ${galeria.length ? `<div class="galeria">${galeria.map(src => `<img src="${src}" alt="${p.titulo}" loading="lazy">`).join('')}</div>` : ''}
        ${novedades.length ? `<section class="novedades"><h2 class="detail-subtitulo">Novedades</h2>${novedades.map(crearNovedad).join('')}</section>` : ''}`;
}

// ---------- 5. INICIO ----------
// El orden importa: primero se dibuja el layout, luego se le conecta el comportamiento.
document.addEventListener('DOMContentLoaded', () => {
    construirLayout();
    configurarMenu();
    configurarEnlaces();
    configurarHeaderScroll();
    renderizarProyectos();
    renderizarDetalle();
});