// Dystra Games - Script Principal

// Base de datos local de proyectos
const listaProyectos = [
    {
        id: "sok",
        titulo: "Proyecto - SOK",
        estado: "En Desarrollo",
        motor: "Unity 6 HDRP",
        descripcion: "Actualmente estamos trabajando en nuestro primer título principal: una experiencia en mundo abierto medieval, con sistemas de combate dinámico, exploración y mecánicas avanzadas.",
        nota: "Próximamente: devlogs de desarrollo",
        linkVerMas: "#",
        // Cuando tengas imagen o video, escribe aquí la ruta. Ej: "img/sok.jpg"
        imagen: ""
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sitio web de Dystra Games cargado correctamente.');

    // 1. Configuración del Menú Lateral (Drawer)
    const btnMenu = document.getElementById('btn-menu');
    const btnCloseMenu = document.getElementById('btn-close-menu');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const overlayMenu = document.getElementById('overlay-menu');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    function abrirMenu() {
        sidebarMenu.classList.add('active');
        overlayMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita scroll cuando el menú está abierto
    }

    function cerrarMenu() {
        sidebarMenu.classList.remove('active');
        overlayMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (btnMenu) btnMenu.addEventListener('click', abrirMenu);
    if (btnCloseMenu) btnCloseMenu.addEventListener('click', cerrarMenu);
    if (overlayMenu) overlayMenu.addEventListener('click', cerrarMenu);

    // Cerrar el menú al hacer clic en cualquiera de sus enlaces
    sidebarLinks.forEach(link => link.addEventListener('click', cerrarMenu));

    // Cerrar el menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarMenu();
    });

    // 2. Cargar Proyectos
    renderizarProyectos();

    // 3. Fondo dinámico en la barra superior al hacer scroll
    const header = document.querySelector('.header-main');
    function actualizarHeader() {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', actualizarHeader, { passive: true });
    actualizarHeader();
});

// Renderizar tarjetas de proyectos
function renderizarProyectos() {
    const contenedor = document.getElementById('contenedor-proyectos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    listaProyectos.forEach(proyecto => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'project-card';

        const media = proyecto.imagen
            ? `<img src="${proyecto.imagen}" alt="${proyecto.titulo}" loading="lazy">`
            : '';

        tarjeta.innerHTML = `
            <!-- LADO IZQUIERDO: Imagen / Video -->
            <div class="project-media">${media}</div>

            <!-- LADO DERECHO: Información -->
            <div class="project-body">
                <div>
                    <div class="project-meta">
                        <span class="project-status">${proyecto.estado}</span>
                        <span class="project-engine">${proyecto.motor}</span>
                    </div>

                    <h3 class="project-title">${proyecto.titulo}</h3>
                    <p class="project-text">${proyecto.descripcion}</p>
                </div>

                <div class="project-footer">
                    <span class="project-note">${proyecto.nota}</span>
                    <button class="project-btn" onclick="verDetalleProyecto('${proyecto.id}')">Ver más</button>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}

function verDetalleProyecto(idProyecto) {
    console.log(`Cargando vista detallada para el proyecto: ${idProyecto}`);
}