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
        linkVerMas: "#"
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
    sidebarLinks.forEach(link => {
        link.addEventListener('click', cerrarMenu);
    });

    // 2. Cargar Proyectos
    renderizarProyectos();

    // 3. Sombra dinámica en la barra superior
    const header = document.querySelector('.header-main');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
            header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
            header.style.boxShadow = 'none';
        }
    });
});

// Renderizar tarjetas con efecto Zoom y Aclarado al pasar el ratón
function renderizarProyectos() {
    const contenedor = document.getElementById('contenedor-proyectos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    listaProyectos.forEach(proyecto => {
        const tarjeta = document.createElement('div');
        
        tarjeta.className = "w-full bg-slate-900/50 border border-slate-800/90 rounded-2xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row gap-8 justify-between items-stretch transition-all duration-300 hover:scale-[1.01] hover:bg-slate-800/70 hover:border-slate-700 cursor-pointer";

        tarjeta.innerHTML = `
            <!-- LADO IZQUIERDO: Información -->
            <div class="flex-1 flex flex-col justify-between z-10">
                <div>
                    <div class="flex justify-between items-center mb-6">
                        <span class="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/30">
                            ${proyecto.estado}
                        </span>
                        <span class="text-xs font-mono text-slate-500">${proyecto.motor}</span>
                    </div>
                    
                    <h3 class="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                        ${proyecto.titulo}
                    </h3>
                    <p class="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                        ${proyecto.descripcion}
                    </p>
                </div>

                <div class="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span class="text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-md border border-slate-800">
                        ${proyecto.nota}
                    </span>
                    
                    <button onclick="verDetalleProyecto('${proyecto.id}')" class="w-full sm:w-auto px-6 py-2.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200">
                        VER MÁS
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}

function verDetalleProyecto(idProyecto) {
    console.log(`Cargando vista detallada para el proyecto: ${idProyecto}`);
}