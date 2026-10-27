// Dystra Games - Script Principal

// ---------- 1. DATOS ----------
// Base de datos local de proyectos. Para agregar un juego, copia un bloque y cambia el id.
const listaProyectos = [
    {
        id: "sok",
        titulo: "Proyecto - SOK",
        estado: "En Desarrollo",
        motor: "Unity 6 HDRP",
        descripcion: "Actualmente estamos trabajando en nuestro primer título principal: una experiencia en mundo abierto medieval, con sistemas de combate dinámico, exploración y mecánicas avanzadas.",
        nota: "Próximamente: devlogs de desarrollo",
        destacado: true,   // true = aparece también en el inicio
        imagen: ""         // ruta de imagen, ej: "img/sok.jpg"
    }
];

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
                <a href="/" class="logo-text">Dystra Games</a>
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
                <span class="logo-text">Dystra Games</span>
                <button id="btn-close-menu" class="btn-close" aria-label="Cerrar menú">&times;</button>
            </div>
            <nav class="sidebar-nav">${enlaces('class="sidebar-link" ')}</nav>
        </aside>`;

    const pie = document.getElementById('layout-footer');
    if (pie) pie.outerHTML = `
        <footer id="contacto" class="footer-main">
            <div class="footer-container">
                <div class="footer-brand">
                    <span>Dystra Games Studio</span>
                    <p>© 2026 Dystra Games. Todos los derechos reservados.</p>
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
                    <p class="project-text">${p.descripcion}</p>
                </div>
                <div class="project-footer">
                    <span class="project-note">${p.nota}</span>
                    <a class="project-btn" href="/proyectos/${p.id}/">Ver más</a>
                </div>
            </div>
        </article>`).join('');
}

// Página de detalle: cada /proyectos/<id>/ tiene su HTML con data-proyecto="<id>".
// Aquí se lee ese id y se busca el proyecto en la lista.
function renderizarDetalle() {
    const contenedor = document.getElementById('detalle-proyecto');
    if (!contenedor) return;

    const id = document.body.dataset.proyecto;
    const p = listaProyectos.find(x => x.id === id);
    if (!p) { location.replace('/proyectos/'); return; }

    document.title = `${p.titulo} | Dystra Games`;
    contenedor.innerHTML = `
        <div class="project-media">${crearMedia(p)}</div>
        <div class="detail-body">
            <div class="project-meta">
                <span class="project-status">${p.estado}</span>
                <span class="project-engine">${p.motor}</span>
            </div>
            <h1 class="project-title">${p.titulo}</h1>
            <p class="project-text">${p.descripcion}</p>
            <div class="project-footer"><span class="project-note">${p.nota}</span></div>
        </div>`;
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